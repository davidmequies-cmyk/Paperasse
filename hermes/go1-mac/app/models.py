# -*- coding: utf-8 -*-
"""
Adaptateurs modèles + bascule automatique.

- Claude (1er choix) : via le raccourci Claude Code `~/.hermes/bin/claudecode`
  (compte Max en priorité, cf. docs/connexion-claude-max.md). Aucun coût token
  tant qu'on est sur le login Max.
- OpenAI (GPT) : API /v1/chat/completions (clé du .env).
- Gemini : API generativelanguage (clé du .env).

Chaque appel renvoie un ModelResult. `generate()` essaie la liste de priorité
de l'agent puis, en secours, tous les autres modèles disponibles, et signale
la bascule (règle du préambule : « signaler la bascule dans la réponse »).
"""
from __future__ import annotations

import asyncio
import os
import shutil
from dataclasses import dataclass

import httpx

import config

TIMEOUT = 120.0
GLOBAL_ORDER = ("claude", "openai", "gemini")  # ordre de secours par défaut


@dataclass
class ModelResult:
    ok: bool
    text: str
    model: str          # "claude" | "openai" | "gemini"
    error: str = ""


# --- Disponibilité ----------------------------------------------------------
def claude_available() -> bool:
    bin_path = config.CLAUDE_BIN
    if os.path.isfile(bin_path) and os.access(bin_path, os.X_OK):
        return True
    # Le shim charge le .env et appelle `claude` ; on accepte aussi `claude` direct.
    return shutil.which("claude") is not None


def openai_available() -> bool:
    return bool(config.openai_key())


def gemini_available() -> bool:
    return bool(config.gemini_key())


AVAILABILITY = {
    "claude": claude_available,
    "openai": openai_available,
    "gemini": gemini_available,
}

LABELS = {"claude": "Claude", "openai": "OpenAI", "gemini": "Gemini"}


# --- Appels par fournisseur -------------------------------------------------
async def call_claude(system: str, user: str) -> ModelResult:
    """Appelle Claude Code en mode headless (texte). Combine system+user car
    `claude -p` prend un prompt unique ; on préfixe le cadre système."""
    bin_path = config.CLAUDE_BIN
    cmd = [bin_path] if (os.path.isfile(bin_path) and os.access(bin_path, os.X_OK)) else ["claude"]
    prompt = f"{system}\n\n=== DEMANDE DE MICHEL ===\n{user}"
    args = cmd + ["-p", prompt, "--output-format", "text"]
    model = config.claude_model()
    if model:
        args += ["--model", model]
    try:
        proc = await asyncio.create_subprocess_exec(
            *args,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        out, err = await asyncio.wait_for(proc.communicate(), timeout=TIMEOUT)
        if proc.returncode != 0:
            return ModelResult(False, "", "claude", (err or b"").decode(errors="replace")[:400] or "code retour non nul")
        text = (out or b"").decode(errors="replace").strip()
        if not text:
            return ModelResult(False, "", "claude", "réponse vide")
        return ModelResult(True, text, "claude")
    except asyncio.TimeoutError:
        return ModelResult(False, "", "claude", "timeout Claude Code")
    except FileNotFoundError:
        return ModelResult(False, "", "claude", "claude introuvable (installer Claude Code)")
    except Exception as exc:  # noqa: BLE001
        return ModelResult(False, "", "claude", f"{type(exc).__name__}: {exc}")


async def call_openai(system: str, user: str) -> ModelResult:
    key = config.openai_key()
    if not key:
        return ModelResult(False, "", "openai", "OPENAI_API_KEY manquant")
    payload = {
        "model": config.openai_model(),
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "temperature": 0.2,
    }
    try:
        async with httpx.AsyncClient(timeout=TIMEOUT) as client:
            r = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {key}"},
                json=payload,
            )
        if r.status_code != 200:
            return ModelResult(False, "", "openai", f"HTTP {r.status_code}: {r.text[:200]}")
        data = r.json()
        text = data["choices"][0]["message"]["content"].strip()
        return ModelResult(True, text, "openai")
    except Exception as exc:  # noqa: BLE001
        return ModelResult(False, "", "openai", f"{type(exc).__name__}: {exc}")


async def call_gemini(system: str, user: str) -> ModelResult:
    key = config.gemini_key()
    if not key:
        return ModelResult(False, "", "gemini", "GEMINI_API_KEY manquant")
    model = config.gemini_model()
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"
    payload = {
        "systemInstruction": {"parts": [{"text": system}]},
        "contents": [{"role": "user", "parts": [{"text": user}]}],
        "generationConfig": {"temperature": 0.2},
    }
    try:
        async with httpx.AsyncClient(timeout=TIMEOUT) as client:
            r = await client.post(url, json=payload)
        if r.status_code != 200:
            return ModelResult(False, "", "gemini", f"HTTP {r.status_code}: {r.text[:200]}")
        data = r.json()
        cand = (data.get("candidates") or [{}])[0]
        parts = (cand.get("content") or {}).get("parts") or []
        text = "".join(p.get("text", "") for p in parts).strip()
        if not text:
            return ModelResult(False, "", "gemini", "réponse vide")
        return ModelResult(True, text, "gemini")
    except Exception as exc:  # noqa: BLE001
        return ModelResult(False, "", "gemini", f"{type(exc).__name__}: {exc}")


DISPATCH = {"claude": call_claude, "openai": call_openai, "gemini": call_gemini}


def _priority_chain(preferred: tuple[str, ...]) -> list[str]:
    """Liste ordonnée, sans doublon, des modèles à tenter : préférés puis secours."""
    chain: list[str] = []
    for m in list(preferred) + list(GLOBAL_ORDER):
        if m not in chain and m in DISPATCH:
            chain.append(m)
    return chain


def available_models() -> list[str]:
    return [m for m in GLOBAL_ORDER if AVAILABILITY[m]()]


async def generate(system: str, user: str, preferred: tuple[str, ...]) -> ModelResult:
    """Essaie chaque modèle de la chaîne jusqu'à succès. Signale toute bascule."""
    chain = _priority_chain(preferred)
    usable = [m for m in chain if AVAILABILITY[m]()]
    if not usable:
        return ModelResult(
            False, "", "aucun",
            "Aucun modèle disponible : configure au moins une clé (OPENAI_API_KEY / "
            "GEMINI_API_KEY) ou installe Claude Code (voir docs/connexion-claude-max.md).",
        )
    first = usable[0]
    errors: list[str] = []
    for i, m in enumerate(usable):
        res = await DISPATCH[m](system, user)
        if res.ok:
            if m != first:
                res.text = (
                    f"⤵️ _Bascule automatique vers {LABELS[m]} "
                    f"({LABELS[first]} indisponible)._\n\n" + res.text
                )
            return res
        errors.append(f"{LABELS[m]}: {res.error}")
    return ModelResult(False, "", first, " | ".join(errors))
