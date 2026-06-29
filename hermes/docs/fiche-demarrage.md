# Hermès IA — Fiche de démarrage (Groupe MDM)

*À suivre dans l'ordre. À utiliser avec les prompts du dossier [`../prompts/`](../prompts/).*

> Astuce : Hermès se pilote en langage naturel via Telegram. Pour beaucoup d'étapes, il suffit de **lui écrire la consigne** (ex. « crée un agent… », « programme une tâche… »). Si Hermès demande une confirmation, réponds simplement.

---

## ÉTAPE 0 — Vérifier que tout est prêt (2 min)
- [ ] Hermès tourne sur le Mac et répond sur Telegram.
- [ ] Les 3 modèles sont connectés (OpenAI, Gemini, Copilot) avec leurs clés.
- [ ] Tu as les prompts des agents sous la main (`prompts/`).

Test : écris `ping` à Hermès sur Telegram → il doit répondre.

---

## ÉTAPE 1 — Installer le « cadre commun » (5 min) ⭐ le plus important
Copie le **PRÉAMBULE COMMUN** ([`prompts/00-preambule-commun.md`](../prompts/00-preambule-commun.md)) dans la **configuration globale / system prompt** de Hermès.
👉 C'est lui qui impose : ne rien inventer, sources officielles, « Michel Méquiès », **validation obligatoire avant tout envoi officiel**, style court et factuel.

Message à envoyer à Hermès :
> « Mémorise ce cadre permanent et applique-le à TOUTES tes réponses : [coller le préambule commun]. »

---

## ÉTAPE 2 — Créer les agents (commandes Telegram) (15 min)
Crée une commande par agent. Pour chacune, envoie à Hermès :
> « Crée un agent nommé **[nom]** déclenché par la commande **/[commande]**. Voici son rôle : [coller le prompt de l'agent]. »

| Ordre | Commande | Agent | Prompt |
|---|---|---|---|
| 1 | `/dg` | Direction Générale | [agent-5](../prompts/agent-5-direction-generale.md) |
| 2 | `/paie` | Paie intermittents | [agent-1](../prompts/agent-1-paie.md) |
| 3 | `/relance` | Relances / impayés | [agent-3](../prompts/agent-3-relances.md) |
| 4 | `/contrat` | Contrats | [agent-2](../prompts/agent-2-contrats.md) |
| 5 | `/seo` | SEO / Marketing | [agent-4](../prompts/agent-4-seo.md) |
| 6 (bonus) | `/com` | Communication | [agent-6](../prompts/agent-6-communication.md) |

---

## ÉTAPE 3 — Activer le GARDE-FOU de validation (5 min) ⭐ priorité sécurité
Message à envoyer à Hermès :
> « Règle permanente : avant toute action externe ou irréversible (envoi d'e-mail, déclaration DPAE/AEM/DSN, envoi de contrat, envoi de relance ou mise en demeure, publication sur un site, paiement), tu NE l'exécutes JAMAIS directement. Tu me présentes d'abord le résultat sur Telegram avec 3 options : ✅ Valider / ✏️ Modifier / ❌ Annuler. Tu n'agis qu'après mon ✅. »

---

## ÉTAPE 4 — Programmer les tâches automatiques (10 min)
Envoie ces consignes à Hermès (une par une) :

1. **Briefing du matin (Agent 5)**
   > « Chaque jour à 9h00, exécute l'agent /dg et envoie-moi le tableau de bord sur Telegram. »

2. **Scan paie quotidien (Agent 1)**
   > « Chaque jour à 9h30, exécute l'agent /paie sur les nouveaux e-mails/dossiers de paie reçus, et liste-moi les dossiers + les informations manquantes. Ne déclenche aucune déclaration. »

3. **Impayés du lundi (Agent 3)**
   > « Chaque lundi à 10h00, exécute l'agent /relance : liste les factures impayées par urgence et prépare les e-mails de relance à valider. N'envoie rien sans mon ✅. »

*(Contrats /contrat, SEO /seo et Com /com restent à la demande.)*

> ℹ️ **Note :** les horaires ci-dessus suivent le récapitulatif (`recap-agents.md`). Une version antérieure de cette fiche indiquait 7h00 / 9h30 / lundi 9h30 — à harmoniser selon ta préférence.

---

## ÉTAPE 5 — Tester chaque agent (10 min)
Envoie un cas réel ou fictif à chacun :
- `/dg` → « Fais le point du jour. »
- `/paie` → transfère un e-mail de demande de paie.
- `/relance` → « Voici une facture impayée : [détails]. »
- `/contrat` → « Prépare un contrat de cession pour [détails]. »
- `/seo` → « Audite la page d'accueil de paieintermittents.com. »

Vérifie que chacun respecte le format de sortie et te demande bien validation avant d'agir.

---

## ÉTAPE 6 — Connexions utiles (quand tu veux, en lecture d'abord)
À activer progressivement, **en lecture** au début (l'écriture/envoi passe par le garde-fou) :
- 📧 **Gmail** (lire les demandes paie/contrats, préparer des brouillons)
- 📅 **Agenda** (prestations, échéances)
- 📁 **Drive / dossier contrats** (modèles, archivage)
- 🌐 Accès **lecture** aux sites Wix (pour l'agent SEO)

---

*Récap de l'ordre : Étape 1 (cadre) → Étape 3 (garde-fou) → Étape 2 (les agents) → Étape 4 (les automatismes) → Étape 5 (tests). Le cadre et le garde-fou d'abord, c'est ce qui sécurise tout le reste.*
