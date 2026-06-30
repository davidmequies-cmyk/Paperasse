# 🚀 Activation d'Hermès — checklist complète

Deux parties : **(1)** ce qui s'active **en parlant à Hermès** (Telegram, tout de suite) · **(2)** ce qui se **code dans Hermès** (Mac / dev). Cocher au fur et à mesure.

---

## Partie 1 — En parlant à Hermès (Telegram)

> Faire dans l'ordre. Les fichiers à coller sont dans `hermes/` (Drive ou GitHub).

- [ ] **1. Mémoriser le référentiel**
  > « Mémorise ce référentiel permanent et utilise-le avant de demander ou calculer quoi que ce soit : [coller `referentiel.md`] »

- [ ] **2. Mettre à jour le cadre commun** (inclut Claude + anti-arnaque)
  > « Remplace ton cadre permanent par celui-ci et applique-le à TOUTES tes réponses : [coller `prompts/00-preambule-commun-v3.md`] »

- [ ] **3. Créer l'agent Trésorerie**
  > « Crée un agent **/treso** avec ce rôle : [coller `prompts/agent-7-tresorerie.md`] »

- [ ] **4. Programmer la tâche trésorerie**
  > « Chaque lundi à 10h, exécute /treso et envoie-moi le point cash + impayés à valider. »

- [ ] **5. (rappel) Garde-fou de validation** — déjà actif ; vérifier qu'il demande ✅/✏️/❌ avant toute action externe.

- [ ] **6. Tester** avec le jeu de tests `docs/evaluation.md`.

---

## Partie 2 — À coder dans Hermès (Mac / dev)

### 2.1 Prompt caching (priorité — coût)
- Placer le **contenu stable en tête** de chaque prompt : `préambule commun` + `référentiel` (ils ne changent pas d'un appel à l'autre).
- Activer le **cache** du fournisseur : Anthropic (`cache_control` sur les blocs système), OpenAI / Google (cache automatique des préfixes).
- Gain attendu : **−45 à −80 %** sur les tokens d'entrée répétés.

### 2.2 Boutons inline Telegram (UX garde-fou)
- Remplacer le ✅/✏️/❌ tapé par un **inline keyboard** sous le message de validation.
- `callback_data` **court** (ex. `v:123`, `e:123`, `x:123`) ; stocker le brouillon complet en base, indexé par l'ID.
- À la réception du callback : **éditer le message** (pas en renvoyer un nouveau).

### 2.3 Routage par complexité (coût/latence)
- Requête simple / formattage → **modèle économique**.
- Raisonnement juridique, paie, synthèse DG/treso → **Claude / GPT frontier**.
- Routage déterministe d'abord (mots-clés / commande), routeur LLM léger en secours pour le langage naturel.

### 2.4 Journal d'audit + métriques
- Logger chaque action validée : `date · agent · type · contenu · décision (✅/✏️/❌)`.
- Suivre : coût/appel, latence, **taux ✅ vs ✏️/❌** (qualité des brouillons).

---

## État
- ✅ **Config prête** (prompts, référentiel, /treso, gabarits, anti-arnaque) — dépôt + Drive.
- ⏳ **Partie 1** : à coller dans Hermès (vous).
- ⏳ **Partie 2** : à coder dans Hermès (Mac / dev) — spec dans `optimisation.md` + `connexions-mac.md`.
