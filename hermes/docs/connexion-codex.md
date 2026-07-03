# 🤖 Connecter Codex (OpenAI) à Hermès

> But : donner à Hermès un **exécutant technique/dev** — Codex — à qui déléguer le code, les scripts, l'automatisation, les corrections de dépôt. Claude reste le 1ᵉʳ choix pour le raisonnement (juridique, relances, paie, synthèse) ; **Codex = les mains sur le code**.

## Deux intégrations (complémentaires)

### 1. Codex sur GitHub — ✅ déjà actif
Le connecteur **Codex de GitHub** relit automatiquement les pull requests du dépôt `paperasse` (« Codex Review »). Rien à faire — c'est déjà branché. Utile comme **2ᵉ regard** sur chaque changement de config Hermès.

### 2. Codex CLI sur la machine d'Hermès (VPS et/ou Mac) — à installer
Permet à Hermès de **lancer Codex en local** pour coder/corriger, via ton **API OpenAI** (clé déjà dans le `.env`).

**Installer** (Terminal du VPS `/home/hermes/` et/ou du Mac) :
```bash
npm install -g @openai/codex
```
**Authentifier** — mode API (utilise la clé du `.env`, pas de login interactif) :
```bash
export OPENAI_API_KEY=...   # déjà dans le .env d'Hermès
codex exec "Réponds uniquement: PONG"   # test → doit répondre PONG
```
**Brancher Hermès** : créer un raccourci `~/.hermes/bin/codexcode` :
```bash
#!/usr/bin/env bash
[ -f "$HOME/Hermes/.env" ] && set -a && . "$HOME/Hermes/.env" && set +a
exec codex exec "$@"
```
`chmod +x ~/.hermes/bin/codexcode`. Hermès appelle alors `~/.hermes/bin/codexcode "<tâche de code>"`.

## Répartition (qui fait quoi)
- **Claude** (1ᵉʳ choix) : raisonnement, juridique, relances, contrats, /dg, /treso, **paie experte**, synthèse.
- **Codex** : écrire/corriger du code, scripts (ex. `reunion-transcrire.sh`), automatisations, refactors, revue de PR.
- **OpenAI (GPT)** : calculs, structuration, rédaction ; **Gemini** : recherche/PJ/SEO.
- Hermès **délègue à Codex** dès qu'une tâche est « du code » ; il présente le résultat, **rien n'est poussé/exécuté sans validation de Michel** (✅/✏️/❌).

## Coûts & sécurité
- Codex CLI facture sur ton **API OpenAI** (à l'usage) → **plafond de dépense** sur platform.openai.com. Toute dérive = 🚩.
- Clé `OPENAI_API_KEY` dans le **`.env` uniquement** (règle 9), jamais dans un chat/prompt/dépôt.
- Codex a un accès **shell/fichiers** puissant : le cantonner au dossier du projet, ne jamais lui donner de secret en clair, valider avant tout `push`/commande sensible.

---
*Voir aussi : [`connexion-claude-max.md`](connexion-claude-max.md) · [`../prompts/00-preambule-commun.md`](../prompts/00-preambule-commun.md).*
