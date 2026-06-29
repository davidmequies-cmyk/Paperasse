# ⚙️ Optimisation d'Hermès — guide (recherché sur le net, juin 2026)

Recommandations concrètes pour rendre Hermès plus **fiable, rapide et économique**, tirées des bonnes pratiques 2026 (agents IA, orchestration, routage, UX Telegram). Sources en bas.

Légende : 🟢 = côté config (déjà fait / faisable dans ce dépôt) · 🔌 = à implémenter sur le Mac.

---

## A. Architecture & routage
- 🟢 **Agents spécialisés** plutôt qu'un agent généraliste — meilleure précision. *Règle clé : 3 à 5 outils par agent, qu'il maîtrise bien* (au-delà, la sélection d'outil se dégrade). → Garder chaque agent (`/paie`, `/contrat`, etc.) focalisé.
- 🔌 **Routage hybride** : garder le **déterministe** (commandes `/xxx` = règle fixe, <1 ms) **et** ajouter un **routeur LLM léger** pour le langage naturel (« fais-moi le point cash » → `/treso`). Le routage est **bon marché** (<50 ms) face à l'inférence (2-15 s) → un mini-routeur en amont coûte presque rien.
- 🟢 **Délégation** : `/dg` peut appeler les autres agents et consolider (déjà prévu).

## B. Coût & latence (gros gains)
- 🔌 **Prompt caching** du **préambule + référentiel** (contenu stable, réutilisé à chaque appel) → **-45 à -80 % de coût** et time-to-first-token réduit. Disponible chez OpenAI, Anthropic, Google. Mettre le contenu **stable en tête** du prompt (sinon le cache est inefficace).
- 🔌 **Routage par complexité** : requêtes simples → modèle **économique** ; raisonnement juridique/paie → **Claude/GPT frontier**. Un routeur multi-modèles peut **égaler la qualité du meilleur modèle à coût moindre**.
- 🔌 **Batching** des tâches non urgentes (scan paie quotidien, audit SEO) → tarifs batch.
- 💡 Combiné (cache + routage) : **-40 à -70 % de coût/latence** sans perte de qualité.

## C. Fiabilité & garde-fous
- 🟢 **Human-in-the-loop** sur les actions à enjeu (paie, contrats, paiements) — déjà en place (✅/✏️/❌). C'est aussi une **exigence de supervision humaine** (esprit EU AI Act art. 14) pour les décisions sensibles.
- 🟢 **Jeu de tests (évaluation)** : voir [`evaluation.md`](evaluation.md) — vérifier le comportement des agents avant de modifier un prompt.
- 🔌 **Déploiement progressif** : pour un gros changement de prompt, tester en parallèle (shadow) sur quelques cas réels avant de remplacer.
- 🔌 **Fallback modèle** : bascule auto si le 1er choix est indisponible (déjà spécifié dans le préambule).

## D. UX Telegram
- 🔌 **Boutons inline** pour la validation (✅ Valider / ✏️ Modifier / ❌ Annuler) au lieu de texte → 1 clic, pas de message parasite (les callbacks n'envoient pas de message).
- 🔌 **`callback_data` court** (ASCII) ; stocker l'état complet côté base, indexé par un ID court.
- 🔌 **Éditer le message** existant quand on met à jour (plus rapide et plus propre que renvoyer un nouveau message).
- 🔌 Max **2-4 boutons par ligne** ; paginer si beaucoup d'options.

## E. Mémoire / connaissance (RAG léger)
- 🟢 **Référentiel central** (`referentiel.md`) = source de vérité chargée en permanence (déjà fait). Le garder **court et stable** (idéal pour le cache).
- 🔌 Quand la base grossira (modèles de contrats, historique), passer à une **recherche (RAG)** plutôt que tout mettre dans le prompt.

## F. Observabilité
- 🔌 **Journal d'audit** : chaque action validée (date · agent · type · contenu · décision) → traçabilité + analyse des erreurs.
- 🔌 **Métriques** : coût/appel, latence, taux de validation ✅ vs ✏️/❌ (mesure la qualité des brouillons).

---

## 🎯 Feuille de route priorisée
1. 🔌 **Prompt caching préambule + référentiel** (gain coût immédiat).
2. 🔌 **Boutons inline Telegram** (UX du garde-fou).
3. 🔌 **Routage par complexité** (cheap vs frontier) + routeur LLM pour le langage naturel.
4. 🔌 **Journal d'audit + métriques**.
5. 🟢 **Jeu de tests** (`evaluation.md`) et versionnage des prompts (déjà sur GitHub).

*Points 🟢 : prêts dans ce dépôt. Points 🔌 : à câbler dans Hermès sur le Mac (voir aussi `connexions-mac.md`).*

---

## Sources
- Anthropic / pratiques agents — *Best practices for building effective AI agents and multi-agent systems* (Medium/Online Inference)
- *Building Production-Ready AI Agents in 2026* (MLflow)
- *AI Agent Routing: Tutorial & Best Practices* (Patronus AI)
- *Multi-Agent Orchestration* (Augment Code, Dataiku)
- *LLM Cost Optimization in 2026: Routing, Caching, and Batching* (Mavik Labs) · *Reduce LLM Cost and Latency 2026* (Maxim) · *LLM Model Routing 2026* (Digital Applied)
- *Telegram Bots — Features & Inline Keyboards* (core.telegram.org) · *Telegram Inline Keyboard Guide 2026*
