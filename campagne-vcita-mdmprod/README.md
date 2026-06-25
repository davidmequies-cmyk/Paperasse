# Campagne promotionnelle vcita — MDMProd

Package de campagne marketing **prêt à déployer dans vcita** pour promouvoir les
services de **MDMProd** (https://www.mdmprod.fr).

> MDMProd accompagne depuis 2014 les structures du spectacle, maisons de luxe et
> grands acteurs culturels sur trois métiers : **externalisation de la paie des
> intermittents du spectacle**, **organisation de spectacles & événements** et
> **production audiovisuelle**. Références : Hermès, LVMH, Moët & Chandon, SNCF,
> Paris Aéroport (ADP), Mauboussin, Chaussea…

---

## 1. Objectif de la campagne

| Élément | Choix |
|---|---|
| **Périmètre** | **Offre globale MDMProd** — les 3 métiers (paie, événements, audiovisuel) |
| **Objectif** | Générer des prises de rendez-vous (échange découverte, sans engagement) |
| **Audience** | Compagnies, producteurs, salles, festivals, services événementiels de grandes maisons |
| **Canal** | **E-mail uniquement** — séquence de 4 |
| **Offre** | Pas de promotion chiffrée — campagne de notoriété/valeur, CTA = prise de RDV |
| **CTA principal** | « Réserver un échange découverte (30 min) » (lien de prise de RDV vcita) |
| **KPI** | Taux d'ouverture, clics CTA, RDV réservés, demandes de contact |

La promesse centrale : **« Vous créez. Nous gérons le reste. »** — un seul
partenaire pour tout le « hors-scène », fort de 10 ans d'expertise et de
références premium (Hermès, LVMH, SNCF, Paris Aéroport…).

> 📌 **SMS hors périmètre.** La campagne retenue est **e-mail uniquement**. Les
> SMS de relance (`sms/relances-sms.md`) sont fournis en **option** si vous
> souhaitez ajouter un canal plus tard.

## 2. Contenu du package

```
campagne-vcita-mdmprod/
├── README.md                     ← ce fichier (stratégie + guide vcita)
├── emails/
│   ├── 01-accroche.md            ← e-mail 1 : problème/promesse
│   ├── 02-preuve.md              ← e-mail 2 : références & preuve sociale
│   ├── 03-services.md            ← e-mail 3 : panorama des 3 services
│   └── 04-relance.md             ← e-mail 4 : dernière relance / urgence douce
├── sms/
│   └── relances-sms.md           ← 3 SMS courts de relance
├── assets/
│   └── objets-et-segments.md     ← objets A/B, preview text, segments, UTM
└── CHANGELOG.md
```

Chaque e-mail contient : **objet (A/B)**, **texte de pré-en-tête**, **corps en
HTML-friendly markdown**, et le **libellé du bouton CTA**.

## 3. Déploiement dans vcita — pas à pas

vcita → **Marketing** → **Campaigns**.

1. **Créer le lien de prise de RDV** (à coller dans tous les CTA)
   - vcita → *Scheduling* → créer un service « Échange découverte — 30 min, sans engagement ».
   - Copier l'URL de réservation publique. Elle remplace `{{LIEN_RDV}}` dans les e-mails.

2. **Importer / segmenter les contacts**
   - vcita → *Clients* → importer le fichier prospects.
   - Créer les tags décrits dans `assets/objets-et-segments.md`
     (`prospect-paie`, `prospect-evenementiel`, `client-existant`).

3. **Créer la campagne e-mail (séquence)**
   - *Marketing → Campaigns → Create campaign → Email*.
   - Pour chaque e-mail `emails/0X-*.md` : copier l'**objet**, le **pré-en-tête**
     et le **corps**. Insérer le bouton CTA avec le libellé indiqué pointant vers
     `{{LIEN_RDV}}`.
   - Espacement recommandé : **J+0, J+3, J+7, J+12**.

4. **Personnalisation (champs vcita)**
   - Remplacer les marqueurs : `{{prénom}}` → `[First Name]`,
     `{{structure}}` → `[Business Name]`, `{{LIEN_RDV}}` → URL de réservation.

5. **SMS de relance** (option vcita SMS, audience J+5 / J+9 non-ouvreurs)
   - *Marketing → Campaigns → SMS* : coller depuis `sms/relances-sms.md`.

6. **Tracking**
   - Activer le suivi d'ouverture/clics vcita.
   - Ajouter les paramètres UTM (voir `assets/objets-et-segments.md`) sur les liens
     pour retrouver les conversions dans Google Analytics.

7. **Test & envoi**
   - Envoyer un e-mail test à soi-même, vérifier rendu mobile + liens.
   - Programmer l'envoi (mardi ou jeudi, 9h–10h recommandé pour le B2B).

## 4. Conformité

- **RGPD** : n'adresser que des contacts B2B opt-in / intérêt légitime documenté.
  Inclure le lien de désinscription (automatique dans vcita) et l'adresse postale
  de l'expéditeur (obligatoire) — déjà prévus en pied d'e-mail.
- **Mentions** : expéditeur identifiable, objet non trompeur.

## 5. Mesure & itération

Après le 1ᵉʳ cycle, comparer les variantes d'objet A/B, garder la gagnante, et
réinjecter les non-répondeurs dans une relance unique à J+20.
