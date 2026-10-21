# Vérification du parcours — vcita → Google Ads

> Checklist de contrôle à dérouler soi-même (aucun accès automatisé requis).
> **Objectif :** valider que le tunnel fonctionne de bout en bout et que la
> conversion ne se déclenche QUE sur une vraie demande.

## 🚧 Garde-fous (à respecter pendant les tests)

- ❌ **Ne pas modifier le budget ni les enchères** Google Ads.
- ✅ **1 conversion = 1 « demande envoyée » réelle** (formulaire soumis / RDV
  confirmé). Un **clic** sur l'annonce ou sur un lien **ne doit jamais** compter
  comme une demande.

---

## A. Réglages vcita à revérifier

- [ ] Formulaire de contact / prise de RDV **publié** et lien actif (`{{LIEN_RDV}}`)
- [ ] Service « Échange découverte (30 min) » visible et réservable
- [ ] **Accusé de réception automatique** : texte validé par Michel
      (« Votre message a bien été reçu, merci… » / tél. 01 82 28 99 60 /
      « L'équipe Groupe MDM ») — bon **objet** et bon **expéditeur**
- [ ] **Page / message de confirmation** après soumission (c'est l'étape qui
      doit déclencher la conversion — voir section C)
- [ ] **Notification interne** reçue côté MDM quand une demande arrive

## B. Parcours complet (test de bout en bout)

1. [ ] Depuis l'**annonce Google Ads** (ou un aperçu), arriver sur la landing
2. [ ] Remplir le **formulaire vcita** / réserver un créneau **de test**
3. [ ] Le client reçoit le bon **accusé de réception** (texte + expéditeur)
4. [ ] MDM reçoit la **notification interne**
5. [ ] La **page de confirmation** s'affiche bien

## C. Suivi de conversion (le point sensible)

- [ ] La conversion se déclenche sur la **soumission/confirmation**, **pas** au
      chargement de page ni sur un clic
- [ ] Si balise sur une page « merci » : cette page n'est **atteignable
      qu'après** une soumission réelle (pas d'URL directe partageable)
- [ ] Si event GTM / gtag : déclencheur = **form submit / confirmation**, pas
      « click » ni « page view »
- [ ] Paramètre **« Comptabiliser les conversions »** = **« Une »** (lead),
      pas « Chaque »
- [ ] **Dédoublonnage** : recharger la page « merci » ne recompte pas
      (identifiant de transaction / orderId)
- [ ] **Test réel** : faire 1 demande test → vérifier qu'elle remonte comme
      **1 seule conversion** dans Google Ads (délai jusqu'à ~24 h)
- [ ] Vérifier qu'un **simple clic** sur le lien/annonce **ne compte rien**
- [ ] Contrôle avec **Google Tag Assistant** / aperçu GTM pour confirmer le
      déclenchement au bon moment

## D. À NE PAS toucher pendant les vérifications

- [ ] Budget quotidien / stratégie d'enchères
- [ ] Ciblage et audiences (hors scope de ce contrôle)
- [ ] Les autres notifications / boutons vcita non concernés
