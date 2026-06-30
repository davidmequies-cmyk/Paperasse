# Hermès IA — Mes agents Groupe MDM (récapitulatif)

*Agent autonome sur Mac, piloté par Telegram. Configuré le 17/06/2026.*

## Règles communes (valables pour tous)
- **Validation obligatoire** avant toute action externe/irréversible → Telegram : ✅ Valider / ✏️ Modifier / ❌ Annuler.
- **Ne rien inventer** ; vérifier les chiffres/taux sur sources officielles ; marquer `[À VÉRIFIER]` / `[À COMPLÉTER]`.
- **« Michel Méquiès »** côté pro ; **« David Méquiès »** uniquement pour la scène (chanteursynagogue.art).
- **Pas de portage salarial** ; style court, factuel, sans formule creuse.

---

## Les 17 agents

| Commande | Agent | Modèle | À quoi il sert |
|---|---|---|---|
| **/dg** | Direction Générale | Claude (+ OpenAI) | Tableau de bord : Urgent · Finance · Clients · Juridique · Production · Stratégie. Priorise et propose des décisions. |
| **/paie** | Paie intermittents (SpectaGestion) | OpenAI (+ Gemini pour pièces jointes) | Analyse les dossiers, identifie artistes/techniciens, prépare DPAE/CDDU/bulletins/AEM/DSN, estime le coût employeur, détecte les risques. |
| **/relance** | Relances / impayés | Claude | Classe les impayés par urgence, rédige les relances (4 niveaux jusqu'à mise en demeure), e-mails prêts à valider. |
| **/contrat** | Contrats spectacle / audiovisuel | Claude | Choisit et rédige le bon contrat (cession, CDDU, coproduction, production déléguée…), signale risques et clauses à renforcer. |
| **/seo** | SEO / Marketing | Gemini | Audite et optimise les pages (titres, métas, mots-clés, FAQ SEO) de mdmprod.fr, paieintermittents.com, chanteursynagogue.art. |
| **/com** | Communication | Copilot (+ Gemini idées) | Rédige posts réseaux, newsletters et annonces (concerts/cérémonies David Méquiès, événements Neshama/MDMProd). |
| **/treso** | Trésorerie / Finance | Claude (+ OpenAI) | Soldes, entrées/sorties, projection 30/60/90 j, alertes de tension, actions cash prioritaires (s'appuie sur Qonto). |
| **/fiscal** | Fiscalité & Comptabilité | Claude + OpenAI | TVA, IS, CFE, contrôle fiscal, liaison Pennylane/expert-comptable. |
| **/juridique** | Juridique & Conformité | Claude | Litiges (prud'hommes, copro), RGPD, licences, veille — hors rédaction de contrats. |
| **/rh** | RH & Social (permanents) | Claude + OpenAI | CDI/CDD hors intermittents, embauche, obligations employeur, ruptures. |
| **/prod** | Production & Logistique | OpenAI + Gemini | Planning, plateau, prestataires, régie, budget de production, feuille de route. |
| **/devis** | Commercial & Devis | Claude + OpenAI | Qualification, devis prêts à envoyer, suivi du pipeline commercial. |
| **/immo** | Immobilier & Gestion locative | Claude + OpenAI | Financements (prêts/courtier), rentabilité locative, baux, échéances. |
| **/assist** | Assistant perso & Admin | OpenAI | Agenda, courriers, démarches, rappels, mails courants. |
| **/subv** | Subventions & Financements | Gemini + Claude | Veille appels à projets (CNM, CNC, DRAC…), éligibilité, montage de dossiers. |
| **/assur** | Assurances & Sinistres | Claude | Contrats, échéances, déclaration/suivi de sinistres, contestation de refus. |
| **/artiste** | Booking artiste David Méquiès | Claude + Gemini | Cérémonies (bar/bat-mitsva, houppa, mariages), devis cérémonie, agenda, répertoire. |

---

## Automatismes programmés
- **09h00** (chaque jour) → **/dg** : briefing / tableau de bord sur Telegram.
- **09h30** (chaque jour) → **/paie** : nouveaux dossiers + infos manquantes (sans déclaration).
- **Lundi 10h00** → **/relance** : impayés par urgence + relances à valider.

- **Lundi (matin)** → **/treso** : point cash + impayés prioritaires.

*(/contrat, /seo, /com, /treso s'utilisent aussi à la demande.)*

---

## Modèles
- **Claude** : juridique, relances, synthèse DG/trésorerie → /contrat, /relance, /dg, /treso *(1er choix)*
- **OpenAI** : calculs paie, structuration → /paie, /dg
- **Gemini** : recherche, SEO, lecture de pièces jointes → /seo, /paie
- **Copilot** : rédaction de secours → /com
- Bascule automatique sur un modèle disponible si le 1er choix est indisponible.

## Nouveautés (améliorations)
- 📒 **Référentiel central** (`referentiel.md`) : faits stables réutilisés par tous les agents.
- 🗂️ **Gabarits** (`templates/`) : relances (4 niveaux) + contrats prêts à remplir.
- 💰 **Agent /treso** : pilotage de la trésorerie.
- 🚩 **Règle anti-arnaque** : signalement des e-mails/factures suspects.
- 🔌 **Branchements Mac** (`docs/connexions-mac.md`) : Qonto, Gmail, boutons Telegram, journal d'audit.

---

## Pour s'en servir
Sur Telegram : tape la commande (ex. `/paie`) suivie de ta demande, d'un e-mail transféré ou d'une pièce jointe. Hermès prépare → tu valides → il exécute.
