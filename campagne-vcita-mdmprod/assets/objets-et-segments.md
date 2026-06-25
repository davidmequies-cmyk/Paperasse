# Objets, segments & tracking

> Périmètre : **offre globale MDMProd**, **e-mail uniquement**, **sans promo chiffrée**.

## 1. Banque d'objets A/B (à tester dans vcita)

| # | Objet A | Objet B |
|---|---------|---------|
| E1 | Tout ce qui se passe en coulisses, MDMProd s'en occupe | {{prénom}}, un seul partenaire pour la paie, vos événements et vos productions |
| E2 | Hermès, LVMH, SNCF… nous confient leurs coulisses | {{prénom}}, ils nous ont fait confiance (et voici pourquoi) |
| E3 | Paie, événements, production : MDMProd gère tout le « hors-scène » | {{prénom}}, 3 façons dont MDMProd vous fait gagner du temps |
| E4 | {{prénom}}, on garde votre créneau découverte ? | Une dernière chose avant de vous laisser tranquille |

**Bonnes pratiques objet :** < 50 caractères, 0–1 emoji max, éviter les mots
déclencheurs de spam (« gratuit » en majuscules, « !!! », « promo »).

## 2. Segments / tags vcita

| Tag vcita | Définition | Séquence reçue |
|---|---|---|
| `prospect` | Structures spectacle / marques susceptibles d'externaliser le « hors-scène » | E1 → E2 → E3 → E4 |
| `prospect-evenementiel` | Marques / services événementiels (production, galas) | accent sur E3 |
| `client-existant` | Clients actuels (faire connaître les autres pôles) | E3 uniquement, ton adapté |

## 3. Cadencement (e-mail uniquement)

| E-mail | Jour | Cible |
|---|---|---|
| E1 Accroche | J+0 | `prospect` |
| E2 Preuve | J+3 | non-réservés |
| E3 Services | J+7 | `prospect` + `prospect-evenementiel` |
| E4 Relance | J+12 | non-ouvreurs / non-cliqueurs |

> SMS (`sms/relances-sms.md`) = **option hors périmètre**, à activer plus tard
> si ajout d'un canal mobile.

## 4. Paramètres UTM (à ajouter sur {{LIEN_RDV}})

```
?utm_source=vcita&utm_medium=email&utm_campaign=mdmprod_offre_globale_2026&utm_content=e1_accroche
```

Faire varier `utm_content` par e-mail : `e1_accroche`, `e2_preuve`,
`e3_services`, `e4_relance`.

## 5. Marqueurs à remplacer avant envoi

| Marqueur | Remplacer par |
|---|---|
| `{{prénom}}` | champ vcita `[First Name]` |
| `{{structure}}` | champ vcita `[Business Name]` |
| `{{LIEN_RDV}}` | URL publique du service « Échange découverte » vcita |
| `{{LIEN_DESINSCRIPTION}}` | géré automatiquement par vcita (token de désinscription) |
