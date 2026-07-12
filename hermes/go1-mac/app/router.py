# -*- coding: utf-8 -*-
"""
Routeur déterministe : commande /xxx OU langage naturel  ->  agent + modèles.

Reprend la table de routage de hermes/prompts/00-routeur.md et la répartition
des modèles de hermes/README.md. Le routage déterministe (mots-clés / commande)
passe d'abord ; le LLM ne sert qu'à répondre dans le rôle choisi.
"""
from __future__ import annotations

import re
from dataclasses import dataclass, field


@dataclass(frozen=True)
class Agent:
    command: str            # ex. "dg"
    name: str               # libellé humain
    file: str               # fichier prompt dans config/prompts/
    models: tuple[str, ...] # priorité de modèles : "claude" | "openai" | "gemini"
    keywords: tuple[str, ...] = field(default_factory=tuple)


# Ordre = ordre d'affichage dans /agents. Modèles d'après le README Hermès.
AGENTS: tuple[Agent, ...] = (
    Agent("dg", "Direction Générale", "agent-5-direction-generale.md", ("claude", "openai"),
          ("point du jour", "priorites", "priorités", "tableau de bord", "fais le point", "point du")),
    Agent("treso", "Trésorerie / Finance", "agent-7-tresorerie.md", ("claude", "openai"),
          ("cash", "tresorerie", "trésorerie", "solde", "echeance", "échéance", "a payer", "à payer", "encaisser")),
    Agent("paie", "Paie intermittents", "agent-1-paie.md", ("openai", "gemini", "claude"),
          ("paie", "cachet", "cddu", "dpae", "dsn", "aem", "intermittent", "bulletin")),
    Agent("paiexpert", "Expert paie intermittent", "agent-18-expert-paie-intermittent.md", ("claude", "openai"),
          ("abattement", "annexe 8", "annexe 10", "congés spectacles", "conges spectacles", "audiens", "expert paie")),
    Agent("fiscal", "Fiscalité & Comptabilité", "agent-8-fiscal.md", ("claude", "openai"),
          ("tva", "impot", "impôt", "is", "cfe", "controle fiscal", "contrôle fiscal", "pennylane", "expert-comptable", "expert comptable")),
    Agent("relance", "Relances / impayés", "agent-3-relances.md", ("claude", "openai"),
          ("impaye", "impayé", "relance", "mise en demeure", "recouvrement", "facture impayee", "facture impayée")),
    Agent("devis", "Commercial & Devis", "agent-12-devis.md", ("claude", "openai"),
          ("devis", "prospect", "chiffrage", "proposition commerciale", "chiffrer")),
    Agent("contrat", "Contrats spectacle / audiovisuel", "agent-2-contrats.md", ("claude", "openai"),
          ("contrat", "cession", "coproduction", "coprod", "prestation", "rediger un contrat", "rédiger un contrat")),
    Agent("juridique", "Juridique & Conformité", "agent-9-juridique.md", ("claude", "openai"),
          ("litige", "prud'hommes", "prudhommes", "rgpd", "licence", "cgv", "avocat", "contentieux")),
    Agent("rh", "RH & Social (permanents)", "agent-10-rh.md", ("claude", "openai"),
          ("salarie permanent", "salarié permanent", "cdi", "cdd", "embauche", "rupture", "rh")),
    Agent("prod", "Production & Logistique", "agent-11-production.md", ("openai", "gemini", "claude"),
          ("prestation", "planning", "plateau", "technique", "prestataire", "production", "logistique")),
    Agent("immo", "Immobilier & Gestion locative", "agent-13-immobilier.md", ("claude", "openai"),
          ("immo", "achat immo", "pret", "prêt", "courtier", "location", "touques", "bail", "rentabilite", "rentabilité")),
    Agent("assur", "Assurances & Sinistres", "agent-16-assurances.md", ("claude", "openai"),
          ("assurance", "sinistre", "garantie", "franchise")),
    Agent("subv", "Subventions & Financements", "agent-15-subventions.md", ("gemini", "claude"),
          ("subvention", "aide", "appel a projets", "appel à projets", "mecenat", "mécénat", "cnm", "cnc", "drac")),
    Agent("seo", "SEO / Marketing", "agent-4-seo.md", ("gemini", "openai"),
          ("seo", "referencement", "référencement", "mots-cles", "mots-clés", "page web", "meta", "méta")),
    Agent("com", "Communication", "agent-6-communication.md", ("gemini", "openai"),
          ("post reseaux", "post réseaux", "newsletter", "annonce", "communication", "reseaux sociaux", "réseaux sociaux")),
    Agent("artiste", "Booking artiste David Méquiès", "agent-17-artiste.md", ("claude", "gemini"),
          ("ceremonie", "cérémonie", "bar-mitsva", "bat-mitsva", "houppa", "mariage", "concert", "david mequies", "david méquiès")),
    Agent("halakha", "Grand Rabbin — Posek séfarade (Constantine)", "agent-20-rabbin-halakha.md", ("claude", "gemini"),
          ("halakha", "psak", "minhag", "chabbat", "cacherout", "avelout", "deuil", "sefarade", "séfarade")),
    Agent("reunion", "Copilote de réunion", "agent-19-copilote-reunion.md", ("claude", "openai"),
          ("reunion", "réunion", "compte-rendu", "compte rendu", "retranscription", "ordre du jour")),
    Agent("assist", "Assistant personnel & Administratif", "agent-14-assistant.md", ("openai", "claude"),
          ("agenda", "rdv", "courrier admin", "demarche", "démarche", "rappel", "tri de mails", "tri de mail")),
)

BY_COMMAND: dict[str, Agent] = {a.command: a for a in AGENTS}
# Alias pratiques.
BY_COMMAND.setdefault("expertpaie", BY_COMMAND["paiexpert"])
DEFAULT_AGENT = BY_COMMAND["dg"]

_CMD_RE = re.compile(r"^/([a-zA-Z_]+)(?:@\w+)?\b")


def parse_command(text: str) -> Agent | None:
    """Si le texte commence par /commande connue, renvoie l'agent."""
    m = _CMD_RE.match(text.strip())
    if not m:
        return None
    return BY_COMMAND.get(m.group(1).lower())


def route_natural(text: str) -> tuple[Agent, bool]:
    """Routage par mots-clés. Renvoie (agent, ambigu).

    ambigu = True quand aucun mot-clé ne matche (on retombe sur /dg mais on le signale).
    """
    low = " " + text.lower() + " "
    best: Agent | None = None
    best_score = 0
    for agent in AGENTS:
        score = sum(1 for kw in agent.keywords if kw in low)
        if score > best_score:
            best, best_score = agent, score
    if best is None or best_score == 0:
        return DEFAULT_AGENT, True
    return best, False


def strip_command(text: str) -> str:
    """Retire la /commande de tête pour ne garder que la demande."""
    return _CMD_RE.sub("", text.strip(), count=1).strip()
