# Hermès IA — Groupe MDM

Agent IA autonome de Michel Méquiès, tournant sur Mac et piloté **en langage naturel via Telegram**. Hermès orchestre plusieurs agents spécialisés pour le **Groupe MDM** (MDMProd, Neshama Music, SpectaGestion / PaieIntermittents.com).

> ⚠️ **Dépôt privé.** Ne jamais y committer de relevés bancaires, contrats signés, ni clés API. Les secrets vont dans un `.env` (exclu par `.gitignore`).

## Principe

```
Hermès prépare  →  Michel valide (✅ / ✏️ / ❌)  →  Hermès exécute
```

Aucune action externe ou irréversible (envoi d'e-mail, déclaration DPAE/AEM/DSN, envoi de contrat, relance/mise en demeure, publication, paiement) n'est exécutée sans validation explicite sur Telegram.

## Les agents

| Commande | Agent | Modèle conseillé |
|---|---|---|
| `/dg` | [Direction Générale](prompts/agent-5-direction-generale.md) | Claude + OpenAI |
| `/paie` | [Paie intermittents (SpectaGestion)](prompts/agent-1-paie.md) | OpenAI + Gemini |
| `/relance` | [Relances / impayés](prompts/agent-3-relances.md) | Claude |
| `/contrat` | [Contrats spectacle / audiovisuel](prompts/agent-2-contrats.md) | Claude |
| `/seo` | [SEO / Marketing](prompts/agent-4-seo.md) | Gemini |
| `/com` | [Communication](prompts/agent-6-communication.md) | Copilot + Gemini |
| `/treso` | [Trésorerie / Finance](prompts/agent-7-tresorerie.md) | Claude + OpenAI |

Le **cadre commun** appliqué à tous les agents : [`prompts/00-preambule-commun.md`](prompts/00-preambule-commun.md).
Les **faits stables** (SIREN, tarifs, taux, coordonnées) : [`referentiel.md`](referentiel.md).
Les **gabarits** prêts à remplir (relances, contrats) : [`templates/`](templates/).

## Automatismes

- **09h00** chaque jour → `/dg` (tableau de bord)
- **09h30** chaque jour → `/paie` (nouveaux dossiers + infos manquantes, sans déclaration)
- **Lundi 10h00** → `/relance` (impayés par urgence + relances à valider)

## Structure du dépôt

```
hermes/
├── README.md
├── referentiel.md  # source de vérité : SIREN, tarifs, taux paie, coordonnées
├── prompts/        # le cadre commun + le prompt de chaque agent (1 à 7)
├── templates/      # gabarits prêts à remplir (relances, contrats)
├── docs/           # fiche de démarrage, récap, branchements Mac
└── .gitignore
```

## Démarrage

Voir [`docs/fiche-demarrage.md`](docs/fiche-demarrage.md). Ordre conseillé :
**cadre commun → garde-fou de validation → création des agents → automatismes → tests.**
Pour aller plus loin (Qonto, Gmail, boutons Telegram, journal d'audit…) : [`docs/connexions-mac.md`](docs/connexions-mac.md).

## Modèles

**Claude** (juridique, relances, synthèse DG/trésorerie — 1er choix), **OpenAI** (calculs/paie/structuration), **Gemini** (recherche/SEO/lecture de pièces jointes), **Copilot** (rédaction de secours), avec bascule automatique si le 1er choix est indisponible.

---

*Règles permanentes : ne rien inventer · sources officielles pour toute donnée chiffrée sensible · « Michel Méquiès » côté pro, « David Méquiès » réservé à la scène · pas de portage salarial · style court et factuel. Détail dans [`prompts/00-preambule-commun.md`](prompts/00-preambule-commun.md).*
