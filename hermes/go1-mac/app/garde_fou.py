# -*- coding: utf-8 -*-
"""
Garde-fou de validation (règle 3 du préambule).

Détecte quand la réponse d'un agent contient une demande de validation
(« VALIDATION REQUISE »), pour lui accrocher un clavier inline Telegram
✅ / ✏️ / ❌ (callback_data court, cf. docs/activation.md §2.2), et journalise
chaque décision dans le journal d'audit.

IMPORTANT : Hermès GO1 ne connecte AUCUN envoi externe réel (e-mail, DPAE/DSN,
paiement). Un ✅ enregistre la décision et confirme — l'exécution passe par les
connecteurs (Gmail, Qonto…) à brancher, toujours derrière ce garde-fou.
Rien n'est envoyé « en douce ».
"""
from __future__ import annotations

import json
import re
from dataclasses import dataclass
from datetime import datetime

import config

# Marqueur posé par le préambule commun dans les demandes de validation.
_VALIDATION_RE = re.compile(r"VALIDATION\s+REQUISE", re.IGNORECASE)


def needs_validation(text: str) -> bool:
    return bool(_VALIDATION_RE.search(text))


@dataclass
class Draft:
    draft_id: str
    agent: str
    action_type: str
    content: str
    decided: str = ""       # "" | "valide" | "modifie" | "annule"
    notes: str = ""


class DraftStore:
    """Mémoire courte des brouillons en attente de validation, indexés par id."""

    def __init__(self) -> None:
        self._items: dict[str, Draft] = {}
        self._counter = 0

    def add(self, agent: str, action_type: str, content: str) -> Draft:
        self._counter += 1
        draft = Draft(draft_id=str(self._counter), agent=agent, action_type=action_type, content=content)
        self._items[draft.draft_id] = draft
        return draft

    def get(self, draft_id: str) -> Draft | None:
        return self._items.get(draft_id)


def guess_action_type(text: str) -> str:
    """Extrait le « [type d'action] » de la ligne VALIDATION REQUISE si présent."""
    m = re.search(r"VALIDATION\s+REQUISE\s*[—\-:]*\s*(.+)", text, re.IGNORECASE)
    if m:
        return m.group(1).splitlines()[0].strip(" —-:*")[:80] or "action externe"
    return "action externe"


def audit(agent: str, action_type: str, decision: str, note: str = "") -> None:
    """Ajoute une ligne JSON au journal d'audit (date · agent · type · décision)."""
    entry = {
        "date": datetime.now().isoformat(timespec="seconds"),
        "agent": agent,
        "type": action_type,
        "decision": decision,
        "note": note,
    }
    try:
        config.AUDIT_LOG.parent.mkdir(parents=True, exist_ok=True)
        with config.AUDIT_LOG.open("a", encoding="utf-8") as fh:
            fh.write(json.dumps(entry, ensure_ascii=False) + "\n")
    except OSError:
        pass  # ne jamais casser une réponse à cause du journal
