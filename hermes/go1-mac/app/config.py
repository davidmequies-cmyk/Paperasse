# -*- coding: utf-8 -*-
"""
Configuration centrale d'Hermès GO1.

Tout se lit depuis l'environnement (chargé depuis ~/Hermes/.env par le
lanceur ou par load_env() ci-dessous). Aucun secret n'est écrit en dur.
"""
from __future__ import annotations

import os
from pathlib import Path

# --- Emplacements -----------------------------------------------------------
# Base d'installation d'Hermès sur le Mac (créée par le lanceur).
HERMES_DIR = Path(os.environ.get("HERMES_DIR", str(Path.home() / "Hermes")))
# Dossier de configuration (prompts, référentiels, gabarits) fourni avec le paquet.
CONFIG_DIR = Path(os.environ.get("HERMES_CONFIG_DIR", str(HERMES_DIR / "config")))
PROMPTS_DIR = CONFIG_DIR / "prompts"
# Journal d'audit (une ligne JSON par décision validée).
AUDIT_LOG = Path(os.environ.get("HERMES_AUDIT_LOG", str(HERMES_DIR / "audit.log")))
# Raccourci Claude Code (compte Max en priorité, cf. docs/connexion-claude-max.md).
CLAUDE_BIN = os.environ.get("CLAUDE_BIN", str(Path.home() / ".hermes" / "bin" / "claudecode"))


def load_env(env_path: Path | None = None) -> None:
    """Charge un fichier .env simple (KEY=VALEUR) dans os.environ.

    N'écrase pas une variable déjà positionnée. Ignore les lignes vides et les
    commentaires. Évite d'ajouter python-dotenv comme dépendance.
    """
    path = env_path or (HERMES_DIR / ".env")
    if not path.exists():
        return
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


# --- Secrets & options (lus après load_env) ---------------------------------
def get(name: str, default: str = "") -> str:
    return os.environ.get(name, default).strip()


# Telegram
def telegram_token() -> str:
    return get("TELEGRAM_BOT_TOKEN")


def allowed_user_ids() -> set[int]:
    """IDs Telegram autorisés (Michel). Vide = personne (sécurité par défaut)."""
    raw = get("TELEGRAM_ALLOWED_USER") or get("TELEGRAM_ALLOWED_USERS")
    ids: set[int] = set()
    for chunk in raw.replace(";", ",").split(","):
        chunk = chunk.strip()
        if chunk.isdigit():
            ids.add(int(chunk))
    return ids


# Modèles
def anthropic_key() -> str:
    return get("ANTHROPIC_API_KEY")


def openai_key() -> str:
    return get("OPENAI_API_KEY")


def gemini_key() -> str:
    return get("GEMINI_API_KEY") or get("GOOGLE_API_KEY")


def openai_model() -> str:
    return get("OPENAI_MODEL", "gpt-4o")


def gemini_model() -> str:
    return get("GEMINI_MODEL", "gemini-2.0-flash")


def claude_model() -> str:
    # Vide = laisser le défaut du compte Claude (Max). Sinon forcer (--model).
    return get("CLAUDE_MODEL")
