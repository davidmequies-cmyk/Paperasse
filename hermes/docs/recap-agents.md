# Hermès IA — Mes agents Groupe MDM (récapitulatif)

*Agent autonome sur Mac, piloté par Telegram. Configuré le 17/06/2026.*

## Règles communes (valables pour tous)
- **Validation obligatoire** avant toute action externe/irréversible → Telegram : ✅ Valider / ✏️ Modifier / ❌ Annuler.
- **Ne rien inventer** ; vérifier les chiffres/taux sur sources officielles ; marquer `[À VÉRIFIER]` / `[À COMPLÉTER]`.
- **« Michel Méquiès »** côté pro ; **« David Méquiès »** uniquement pour la scène (chanteursynagogue.art).
- **Pas de portage salarial** ; style court, factuel, sans formule creuse.

---

## Les 6 agents

| Commande | Agent | Modèle | À quoi il sert |
|---|---|---|---|
| **/dg** | Direction Générale | OpenAI | Tableau de bord : Urgent · Finance · Clients · Juridique · Production · Stratégie. Priorise et propose des décisions. |
| **/paie** | Paie intermittents (SpectaGestion) | OpenAI (+ Gemini pour pièces jointes) | Analyse les dossiers, identifie artistes/techniciens, prépare DPAE/CDDU/bulletins/AEM/DSN, estime le coût employeur, détecte les risques. |
| **/relance** | Relances / impayés | Copilot | Classe les impayés par urgence, rédige les relances (4 niveaux jusqu'à mise en demeure), e-mails prêts à valider. |
| **/contrat** | Contrats spectacle / audiovisuel | Copilot | Choisit et rédige le bon contrat (cession, CDDU, coproduction, production déléguée…), signale risques et clauses à renforcer. |
| **/seo** | SEO / Marketing | Gemini | Audite et optimise les pages (titres, métas, mots-clés, FAQ SEO) de mdmprod.fr, paieintermittents.com, chanteursynagogue.art. |
| **/com** | Communication | Copilot (+ Gemini idées) | Rédige posts réseaux, newsletters et annonces (concerts/cérémonies David Méquiès, événements Neshama/MDMProd). |

---

## Automatismes programmés
- **09h00** (chaque jour) → **/dg** : briefing / tableau de bord sur Telegram.
- **09h30** (chaque jour) → **/paie** : nouveaux dossiers + infos manquantes (sans déclaration).
- **Lundi 10h00** → **/relance** : impayés par urgence + relances à valider.

*(/contrat, /seo, /com s'utilisent à la demande.)*

---

## Modèles
- **OpenAI** : raisonnement, calculs, structuration → /dg, /paie
- **Copilot** : rédaction longue / juridique → /contrat, /relance, /com
- **Gemini** : recherche, SEO, lecture de pièces jointes → /seo
- Bascule automatique sur un modèle disponible si l'un est indisponible.
- *(Claude/Anthropic : à ajouter plus tard si souhaité — clé API dans la config du Mac, idéal pour /contrat, /relance, /dg.)*

---

## Pour s'en servir
Sur Telegram : tape la commande (ex. `/paie`) suivie de ta demande, d'un e-mail transféré ou d'une pièce jointe. Hermès prépare → tu valides → il exécute.
