# 🔌 Connecter l'abonnement Claude Max à Hermès

> Objectif : que Hermès (sur le Mac) utilise **Claude** comme 1ᵉʳ choix (juridique, relances, synthèse, paie) en s'appuyant sur l'abonnement **Claude Max** de Michel.
> ⚠️ Point clé : **Max ≠ clé API.** L'abonnement Max couvre les applis Claude **et Claude Code**, mais ne donne pas de clé API. La clé API (console.anthropic.com) est une **facturation séparée, à l'usage**.

## Les deux options

| | **Option A — Claude Code (inclus dans Max)** ✅ recommandé | Option B — Clé API (hors Max) |
|---|---|---|
| Coût | inclus dans l'abonnement Max (quotas Max) | facturé au token, en plus |
| Connexion | login avec ton compte Claude | clé `ANTHROPIC_API_KEY` dans `.env` |
| Usage Hermès | Hermès appelle la commande `claude -p "…"` | Hermès appelle l'API Anthropic |
| Limites | fenêtres d'usage Max (se rechargent) | pas de fenêtre, mais chaque appel coûte |

## Option A — brancher Claude Code sur le Mac (utilise ton Max)

**1. Installer Claude Code** (Terminal du Mac) :
```bash
npm install -g @anthropic-ai/claude-code
# ou : brew install --cask claude-code
```

**2. Se connecter avec le compte Max** :
```bash
claude
# puis dans l'interface : /login → choisir « Claude account » (compte Claude.ai/Max)
```
→ Un navigateur s'ouvre, tu t'identifies avec **ton compte Claude Max**. C'est tout : pas de clé à copier.

**3. Tester en mode commande (headless)** — c'est ce mode que Hermès utilisera :
```bash
claude -p "Réponds uniquement: PONG"
```
Si tu vois `PONG`, la connexion Max fonctionne.

**4. Brancher Hermès** : dans la config d'Hermès, déclarer un « modèle Claude » qui exécute :
```bash
claude -p "<prompt de l'agent + question>" --output-format text
```
- Les prompts des agents (préambule + agent) sont dans `hermes/prompts/` (aussi sur le Drive).
- Router vers Claude en 1ᵉʳ choix : /juridique, /relance, /contrat, /dg, /treso, /assur, **/paie (expert)** — cf. `00-preambule-commun.md`.
- Prévoir la **bascule** (OpenAI/Gemini) si la fenêtre d'usage Max est épuisée (Claude Code renvoie alors une erreur de limite).

**5. (Facultatif) Modèle** : `claude -p --model claude-sonnet-5 "…"` pour forcer un modèle ; sinon le défaut du compte s'applique.

## Option B — clé API (si tu veux un canal indépendant des fenêtres Max)
1. Créer une clé sur **console.anthropic.com** (facturation à l'usage, carte requise).
2. La mettre dans le **`.env`** d'Hermès : `ANTHROPIC_API_KEY=sk-ant-…` — **jamais dans le dépôt** (règle sécurité).
3. Hermès appelle l'API Anthropic (endpoint `/v1/messages`).

## Recommandation
- **Commencer par l'option A** (0 € de plus, incluse dans Max).
- Si Hermès consomme beaucoup et bute sur les fenêtres Max → ajouter l'option B en **secours payant**, ou basculer sur OpenAI/Gemini le temps que la fenêtre se recharge.

## Sécurité (rappel règle 9)
- Le login Claude Code est stocké localement sur le Mac (trousseau) — ne pas le partager.
- Une clé API est un **secret** : `.env` uniquement, jamais en clair dans un chat/dépôt, révoquer si doute.

---
*Voir aussi : [`connexions-mac.md`](connexions-mac.md) (autres branchements) · [`../prompts/00-preambule-commun.md`](../prompts/00-preambule-commun.md) (répartition des modèles).*
