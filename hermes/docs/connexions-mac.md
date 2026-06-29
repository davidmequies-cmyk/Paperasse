# 🔌 Branchements & améliorations côté Mac (Hermès)

Ces améliorations se configurent **dans Hermès sur le Mac** (je ne peux pas les activer à distance). Par ordre d'impact.

## 1. Brancher les vraies données (priorité n°1)
Donner à Hermès un accès **en lecture** aux sources réelles transforme la qualité des agents :

| Source | Sert à | Agents |
|---|---|---|
| **Qonto** | Soldes & transactions réels → trésorerie, impayés | `/treso`, `/dg`, `/relance` |
| **Gmail** (lecture) | Lire les demandes paie/contrats, factures | `/paie`, `/contrat`, `/relance` |
| **Google Agenda** | Prestations, échéances | `/dg`, `/treso` |
| **Google Drive** | Modèles de contrats, archivage | `/contrat`, `/dg` |

👉 Garder l'**écriture/envoi** derrière le garde-fou (validation Michel). Lecture d'abord.

## 2. Boutons de validation Telegram
Remplacer le ✅/✏️/❌ tapé à la main par de **vrais boutons** (inline keyboard) → validation en 1 clic, moins d'erreurs.

## 3. Journal d'audit
Hermès journalise chaque action validée : **date · agent · type d'action · contenu · décision**. Permet traçabilité et retour arrière.

## 4. Rapports automatiques (cron)
- **Chaque lundi** : `/treso` + `/relance` → point cash + impayés prioritaires.
- **Chaque matin 9h** : `/dg` → tableau de bord (déjà prévu).
- **Mensuel** : synthèse financière (Qonto).

## 5. Ajouter le modèle Claude
Renseigner la **clé API Anthropic** dans la config (variable d'environnement) et router `/contrat`, `/relance`, `/dg`, `/treso` vers Claude en 1er choix (voir préambule).

## 6. Mémoire / référentiel
Charger [`../referentiel.md`](../referentiel.md) au démarrage comme connaissance permanente, et le mettre à jour quand une donnée est confirmée.

---
*Les éléments 1 à 6 relèvent de la config d'Hermès sur le Mac. La partie « prompts / agents / référentiel / gabarits » est, elle, déjà prête dans ce dépôt.*
