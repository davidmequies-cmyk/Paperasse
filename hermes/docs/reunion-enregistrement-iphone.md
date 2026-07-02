# 🎙️ Enregistrer une réunion depuis l'iPhone / iPad → Hermès

> Objectif : capter l'audio d'une vraie réunion sur **iPhone ou iPad**, l'envoyer dans **`Drive/Hermes/reunions/`**, où **Hermès (Mac)** le **transcrit** (via l'API OpenAI/Whisper) et produit prépa / CR / analyse (agent 19).
> ⚠️ **Prévenir les participants** qu'on enregistre (obligatoire). 🚫 **Jamais un délibéré prud'homal** (secret du délibéré).

## Pré-requis (une fois)
1. Installer l'app **Google Drive** sur l'iPhone/iPad, et l'**activer dans Fichiers** (app Fichiers → … → Modifier → activer « Drive »).
2. Créer le dossier **`Hermes/reunions/`** dans le Drive.
3. Sur le Mac : Hermès configuré pour lire ce dossier et transcrire (clé OpenAI dans le `.env`).

---

## Méthode 1 — Dictaphone (la plus sûre, 0 réglage) ✅
Pour les réunions **physiques**. Le Dictaphone enregistre des heures sans souci.
1. Ouvrir **Dictaphone** (Voice Memos) → **●** pour lancer, parler, **■** pour arrêter.
2. Renommer l'enregistrement (ex. *« Réunion ALTAF 02-07 »*).
3. **⋯ → Enregistrer dans Fichiers → Google Drive → `Hermes/reunions/`**.
4. Écrire à Hermès sur Telegram : *« débriefe la réunion ALTAF »*.
*(iOS 18+ : le Dictaphone transcrit déjà en local — pratique, mais Hermès refait une transcription propre + l'analyse.)*

---

## Méthode 2 — Raccourci « Réunion MDM » (1 tap) ⚡
À créer une fois dans l'app **Raccourcis** (fonctionne iPhone **et** iPad). Étapes du raccourci :
1. **Enregistrer l'audio** (action « Record Audio » / « Enregistrer l'audio ») — laisser l'interface s'afficher pour taper **Stop** à la fin.
2. **Date** → formater en `AAAA-MM-JJ-HHmm`.
3. **Renommer** le fichier : `Reunion-[Date].m4a`.
4. **Enregistrer le fichier** (« Save File ») → destination **Google Drive → `Hermes/reunions/`** (décocher « Demander où enregistrer »).
5. *(option)* **Notification** ou message au bot Telegram d'Hermès : *« Nouvel audio réunion déposé »*.
→ Ajouter le raccourci à l'**écran d'accueil** / au **widget** : un tap lance l'enregistrement.

**Astuce « quasi-live »** : dans le raccourci, mettre une boucle qui enregistre **par tranches de 3-5 min** et dépose chaque tranche → Hermès transcrit au fil de l'eau et peut souffler sur Telegram (latence ~1 min).

---

## Méthode 3 — Réunion en visio (Zoom / Teams / Meet)
Pas besoin d'enregistreur : depuis l'iPhone/iPad, lancer l'**enregistrement cloud + transcription** de la plateforme. Hermès récupère la transcription (connecteur Zoom) → prépa + débrief. Idéal ALTAF / banque / notaire.

---

## Ce qu'Hermès fait ensuite (sur le Mac)
1. Détecte le nouvel audio dans `reunions/`.
2. **Transcrit** (OpenAI Whisper / gpt-4o-transcribe — clé du `.env`).
3. Produit **CR + actions (responsable/délai) + verbatim des engagements + analyse stratégique**, et dépose une **note datée dans `Entrées/`**.
4. Prépare les **brouillons de suivi** (mail, relance) — à valider (✅/✏️/❌).

## Limites (honnêteté)
- Le **live pur instantané** n'existe pas sur iOS (pas d'agent permanent) : le mode « souffleur » a ~1 min de latence.
- Enregistrer **un appel téléphonique classique** n'est pas permis nativement par iOS → passer par le haut-parleur + Dictaphone, ou par une visio.

---
*Lié : [`../prompts/agent-19-copilote-reunion.md`](../prompts/agent-19-copilote-reunion.md).*
