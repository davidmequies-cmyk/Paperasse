# -*- coding: utf-8 -*-
"""
Chargement du cadre commun, du routeur, des référentiels et des 20 agents
depuis le dossier de configuration (config/prompts + config/referentiel*).

Le prompt système envoyé au modèle place le contenu STABLE en tête
(préambule + référentiels) pour profiter du prompt caching des fournisseurs
(cf. docs/optimisation.md), puis le rôle de l'agent choisi.
"""
from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from config import CONFIG_DIR, PROMPTS_DIR


def _read(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8").strip()
    except FileNotFoundError:
        return ""


@lru_cache(maxsize=1)
def preambule() -> str:
    return _read(PROMPTS_DIR / "00-preambule-commun.md")


@lru_cache(maxsize=1)
def routeur() -> str:
    return _read(PROMPTS_DIR / "00-routeur.md")


@lru_cache(maxsize=1)
def referentiels() -> str:
    parts = []
    for name in ("referentiel.md", "referentiel-paie-spectacle.md"):
        txt = _read(CONFIG_DIR / name)
        if txt:
            parts.append(txt)
    return "\n\n---\n\n".join(parts)


@lru_cache(maxsize=64)
def agent_prompt(agent_file: str) -> str:
    return _read(PROMPTS_DIR / agent_file)


# --- Bloc stable partagé (mis en tête → cache fournisseur) -------------------
@lru_cache(maxsize=1)
def stable_prefix() -> str:
    """Préambule + référentiels : identique d'un appel à l'autre."""
    blocks = [preambule()]
    ref = referentiels()
    if ref:
        blocks.append("# Référentiel permanent (faits stables — ne rien réinventer)\n\n" + ref)
    return "\n\n===\n\n".join(b for b in blocks if b)


def system_prompt_for(agent_file: str) -> str:
    """Prompt système complet : bloc stable + rôle de l'agent."""
    role = agent_prompt(agent_file)
    parts = [stable_prefix()]
    if role:
        parts.append("# Rôle de l'agent actif (prime sur le reste sauf garde-fou)\n\n" + role)
    return "\n\n===\n\n".join(parts)


def is_config_ready() -> tuple[bool, str]:
    """Vérifie que le minimum vital est présent."""
    if not preambule():
        return False, f"préambule introuvable dans {PROMPTS_DIR}"
    return True, "ok"
