# Runbook « à faire » — vcita (UI) + Google Ads

> Tout ce qui ne peut PAS être automatisé (réglages vcita = UI uniquement,
> Google Ads = hors session). À dérouler d'une traite, connecté à vcita.
> Garde-fous : **ne pas toucher au budget** ; **1 conversion = 1 demande réelle**.

---

## 1. Accusé de réception automatique (demande de Michel)

**Où :** vcita → *Paramètres (Settings)* → *Notifications clients* / *Réponses
automatiques* → message envoyé après un message via le formulaire
(objet actuel « Nous vous remercions de votre message », exp. `reply@vcita.com`).

**Remplacer tout le corps par** (vcita ajoute déjà « Bonjour Prénom, » en tête —
donc pas de « Bonjour » ; pas de délai « 48 h ») :

```
Votre message a bien été reçu, merci. Nous revenons vers vous très rapidement.

Pour toute question : 01 82 28 99 60.

L’équipe Groupe MDM
```

❗ Ne rien changer d'autre (bouton, autres notifications). Enregistrer.

---

## 2. Réglage sync Google ↔ vcita (en attente dans le fil Hermès)

**Où :** vcita → *Paramètres › Calendrier › Synchronisation Google*
(reconnecter Google si demandé).

- ✅ **Cocher** : Travail, Réunions, RDV téléphoniques, Prestations
- ❌ **Décocher** : Santé, Maison & Touques, Famille, Loisirs, Immobilier
  (+ le groupe « anciens agendas » s'il reste coché)

But : les RDV perso (ex. Dr Mastey 05/11, expertise 27/10) ne doivent plus
bloquer de créneaux réservables. Après enregistrement, prévenir Hermès
(« fait ») pour relancer le contrôle quotidien.

---

## 3. Campagne e-mail « offre globale » (le package)

**Où :** vcita → *Marketing* → *Campaigns* → *New campaign* (e-mail).

1. Créer d'abord le service **« Échange découverte — 30 min, sans engagement »**
   (*Scheduling*) et copier son **URL publique** → c'est `{{LIEN_RDV}}`.
2. Monter **4 e-mails** en séquence, contenu prêt dans `emails/` :
   - `01-accroche.md` — J+0
   - `02-preuve.md` — J+3
   - `03-services.md` — J+7
   - `04-relance.md` — J+12
3. Pour chaque e-mail : coller **objet (test A/B)**, **pré-en-tête**, **corps**,
   **bouton CTA** → `{{LIEN_RDV}}` (+ UTM, voir `assets/objets-et-segments.md`).
4. Remplacer les marqueurs : `{{prénom}}` = `[First Name]`,
   `{{structure}}` = `[Business Name]`, `{{LIEN_RDV}}` = l'URL ci-dessus.
   (Désinscription : gérée automatiquement par vcita.)
5. Segment/tag : `prospect`. Cadence J+0/3/7/12.

---

## 4. Vérification conversion → Google Ads (le point sensible)

Dérouler `verification-parcours.md`. L'essentiel :

- Déclencheur de conversion = **soumission du formulaire / confirmation de RDV**,
  **jamais** un clic ni un chargement de page.
- Page « merci » atteignable **uniquement** après soumission réelle.
- « Comptabiliser les conversions » = **« Une »** (lead), pas « Chaque ».
- Dédoublonnage au rechargement (identifiant de transaction).
- Test réel : 1 demande test → doit remonter **1 seule** conversion (~24 h) ;
  un simple clic ne compte rien. Contrôle via **Google Tag Assistant**.
- ❌ Ne pas modifier **budget ni enchères**.

---

### Récap des fichiers du package
| Fichier | Contenu |
|---|---|
| `emails/01..04` | Les 4 e-mails prêts à coller |
| `assets/objets-et-segments.md` | Objets A/B, segments, UTM, marqueurs |
| `verification-parcours.md` | Checklist conversion détaillée |
| `sms/relances-sms.md` | Option SMS (hors périmètre) |
| `README.md` | Stratégie + guide de déploiement |
