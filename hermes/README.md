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
| `/fiscal` | [Fiscalité & Comptabilité](prompts/agent-8-fiscal.md) | Claude + OpenAI |
| `/juridique` | [Juridique & Conformité](prompts/agent-9-juridique.md) | Claude |
| `/rh` | [RH & Social (permanents)](prompts/agent-10-rh.md) | Claude + OpenAI |
| `/prod` | [Production & Logistique](prompts/agent-11-production.md) | OpenAI + Gemini |
| `/devis` | [Commercial & Devis](prompts/agent-12-devis.md) | Claude + OpenAI |
| `/immo` | [Immobilier & Gestion locative](prompts/agent-13-immobilier.md) | Claude + OpenAI |
| `/assist` | [Assistant personnel & Administratif](prompts/agent-14-assistant.md) | OpenAI |
| `/subv` | [Subventions & Financements](prompts/agent-15-subventions.md) | Gemini + Claude |
| `/assur` | [Assurances & Sinistres](prompts/agent-16-assurances.md) | Claude |
| `/artiste` | [Booking artiste David Méquiès](prompts/agent-17-artiste.md) | Claude + Gemini |

Le **cadre commun** appliqué à tous les agents : [`prompts/00-preambule-commun.md`](prompts/00-preambule-commun.md).
Le **routeur** (langage naturel → bon agent) : [`prompts/00-routeur.md`](prompts/00-routeur.md).
Les **faits stables** (SIREN, tarifs, taux, coordonnées, rôle CPH, véhicule) : [`referentiel.md`](referentiel.md).
Les **gabarits** prêts à remplir (relances, contrats, e-mails) : [`templates/`](templates/).
Le **mode d'emploi** (phrases de déclenchement) : [`docs/mode-emploi.md`](docs/mode-emploi.md).
Les **procédures** (chaînes d'agents pour les tâches récurrentes) : [`docs/procedures.md`](docs/procedures.md).
La **sécurité** (anti-arnaque, protection des données) : [`docs/securite.md`](docs/securite.md).

> ⚖️ **Fonction de conseiller prud'homal** (Michel est juge) : ce n'est **pas** un agent Hermès. Voir le dossier [`../prudhommes/`](../prudhommes/) (sources officielles, méthode de délibération) et le sous-agent `conseiller-prudhommes`.

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
Optimisation (coût/latence/fiabilité, recherché sur le net) : [`docs/optimisation.md`](docs/optimisation.md). Jeu de tests : [`docs/evaluation.md`](docs/evaluation.md).

## Modèles

**Claude** (juridique, relances, synthèse DG/trésorerie — 1er choix), **OpenAI** (calculs/paie/structuration), **Gemini** (recherche/SEO/lecture de pièces jointes), **Copilot** (rédaction de secours), avec bascule automatique si le 1er choix est indisponible.

---

*Règles permanentes : ne rien inventer · sources officielles pour toute donnée chiffrée sensible · « Michel Méquiès » côté pro, « David Méquiès » réservé à la scène · pas de portage salarial · style court et factuel. Détail dans [`prompts/00-preambule-commun.md`](prompts/00-preambule-commun.md).*
