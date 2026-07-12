# 🤖 Hermès GO1 — le paquet « un clic » pour le Mac

GO1 = **premier lancement** d'Hermès sur le Mac. Ce paquet transforme la
configuration du dépôt (les 20 agents, le cadre commun, le routeur, les
référentiels) en un **bot Telegram** qui tourne sur ton Mac.

```
iPhone (Telegram)  →  Hermès (ce bot, sur le Mac)  →  Claude Code · OpenAI · Gemini
```

---

## 🟢 Démarrer en 3 étapes

1. **Décompresser & lancer** — dans le Terminal :
   ```bash
   cd ~/Downloads && unzip -o GO1_HERMES_MAC.zip && bash LANCER_GO1_HERMES.command
   ```
   *(ou double-clic sur `LANCER_GO1_HERMES.command` dans le Finder.)*

2. **Créer le bot Telegram** (une seule fois) :
   - Sur Telegram, écris à **@BotFather** → `/newbot` → choisis un nom → il te donne un **token**.
   - Le lanceur ouvre `~/Hermes/.env` : colle le token dans `TELEGRAM_BOT_TOKEN=`.
   - Mets aussi ton **ID Telegram** dans `TELEGRAM_ALLOWED_USER=` (demande-le à **@userinfobot**). Hermès ne répondra **qu'à toi**.
   - Enregistre, reviens au Terminal, **Entrée**.

3. **Tester** : sur Telegram, écris `/ping` à ton bot → il répond `PONG ✅`.

---

## 🔌 Brancher les modèles

Hermès route chaque agent vers son modèle conseillé, avec **bascule automatique**
si l'un est indisponible. Il faut au moins **un** moyen d'appeler un modèle :

| Modèle | Comment | Coût |
|---|---|---|
| **Claude** *(1ᵉʳ choix)* | Claude Code sur le compte **Max** : `claude` puis `/login`. Le lanceur a déjà créé le raccourci `~/.hermes/bin/claudecode`. | inclus dans Max (0 €) |
| **OpenAI (GPT)** | `OPENAI_API_KEY=` dans `~/Hermes/.env` | à l'usage |
| **Gemini** | `GEMINI_API_KEY=` dans `~/Hermes/.env` | à l'usage |

> Détails : `config/docs/connexion-claude-max.md` et `config/docs/connexion-codex.md`.
> ⚠️ Ne mets **pas** `ANTHROPIC_API_KEY` si tu veux rester sur le compte Max (sinon Claude Code facture au token).

---

## 💬 Utilisation

- **Langage naturel** : écris ta demande, Hermès choisit l'agent (routeur par mots-clés).
- **Commandes** : `/dg`, `/treso`, `/paie`, `/relance`, `/contrat`, `/fiscal`, `/juridique`,
  `/devis`, `/rh`, `/prod`, `/immo`, `/assur`, `/subv`, `/seo`, `/com`, `/artiste`,
  `/halakha`, `/reunion`, `/assist`, `/paiexpert`.
- **Utilitaires** : `/agents` (liste), `/ping` (test), `/aide`.

### 🛡️ Garde-fou de validation (essentiel)
Avant toute **action externe** (e-mail, DPAE/AEM/DSN, contrat, relance/mise en
demeure, publication, paiement), Hermès **ne l'exécute jamais directement** : il
présente un brouillon avec trois boutons **✅ Valider / ✏️ Modifier / ❌ Annuler**.
Chaque décision est journalisée dans `~/Hermes/audit.log`.

> ⚠️ **GO1 ne branche encore aucun envoi réel** (Gmail, Qonto…). Un ✅ enregistre
> la décision et confirme ; l'exécution effective passera par des connecteurs à
> ajouter, **toujours derrière ce garde-fou**. Rien n'est envoyé « en douce ».

---

## 📁 Ce que le lanceur installe

```
~/Hermes/
├── app/            # le bot (copié/actualisé à chaque lancement)
├── config/         # prompts, référentiels, docs, gabarits (copie du dépôt)
├── .env            # tes secrets (perms 600, jamais dans le dépôt)
├── .venv/          # environnement Python
└── audit.log       # journal des validations
~/.hermes/bin/
├── claudecode      # raccourci Claude Code (charge le .env)
└── codexcode       # raccourci Codex (exécutant dev)
```

Le lanceur est **idempotent** : relance-le quand tu veux (mises à jour, redémarrage).

---

## 🛠️ Prérequis & dépannage

- **Python 3.10+** requis (le lanceur le détecte ; propose `brew install python` si absent).
- *« Python introuvable »* → installe depuis python.org, relance le `.command`.
- *« command cannot be opened » (Gatekeeper)* → clic droit sur le fichier → **Ouvrir**, ou
  `Réglages Système → Confidentialité et sécurité → Ouvrir quand même`.
- *Hermès répond « Accès refusé »* → ton ID n'est pas dans `TELEGRAM_ALLOWED_USER`. Le message affiche ton ID : copie-le dans `~/Hermes/.env`, relance.
- *« Aucun modèle disponible »* → connecte Claude Code (`claude` → `/login`) **ou** mets une clé OpenAI/Gemini dans `.env`.
- **Arrêter Hermès** : `⌃C` dans la fenêtre du Terminal.

---

## 🔁 Reconstruire le paquet (dev)

Depuis le dépôt : `bash hermes/go1-mac/build-zip.sh` → régénère `GO1_HERMES_MAC.zip`
(rembarque la dernière version des prompts et référentiels).

---

*Cadre : ne rien inventer · sources officielles · « Michel Méquiès » · pas de
portage salarial · validation avant tout envoi. Voir `config/prompts/00-preambule-commun.md`.*
