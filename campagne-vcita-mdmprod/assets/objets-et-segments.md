# Objets, segments & tracking

## 1. Banque d'objets A/B (à tester dans vcita)

| # | Objet A | Objet B |
|---|---------|---------|
| E1 | La paie de vos intermittents, sans la paperasse | {{prénom}}, et si la paie du spectacle devenait simple ? |
| E2 | Hermès, LVMH, SNCF… nous confient leur paie spectacle | {{prénom}}, ils nous ont fait confiance (et voici pourquoi) |
| E3 | Paie, événements, production : MDMProd gère tout le « hors-scène » | {{prénom}}, 3 façons dont MDMProd vous fait gagner du temps |
| E4 | {{prénom}}, on garde votre créneau diagnostic ? | Dernière chance : votre diagnostic paie offert |

**Bonnes pratiques objet :** < 50 caractères, 0–1 emoji max, éviter les mots
déclencheurs de spam (« gratuit » en majuscules, « !!! », « promo »).

## 2. Segments / tags vcita

| Tag vcita | Définition | Séquence reçue |
|---|---|---|
| `prospect-paie` | Structures cherchant à externaliser la paie intermittents | E1 → E2 → E4 (+ SMS) |
| `prospect-evenementiel` | Marques / services événementiels (production, galas) | E3 ciblé |
| `client-existant` | Clients actuels (upsell autres services) | E3 uniquement, ton adapté |

## 3. Cadencement

| E-mail | Jour | Cible |
|---|---|---|
| E1 Accroche | J+0 | `prospect-paie` |
| E2 Preuve | J+3 | non-réservés |
| E3 Services | J+7 | `prospect-paie` + `prospect-evenementiel` |
| E4 Relance | J+12 | non-ouvreurs / non-cliqueurs |
| SMS 1/2/3 | J+5 / J+9 / J+14 | non-ouvreurs ayant consenti SMS |

## 4. Paramètres UTM (à ajouter sur {{LIEN_RDV}})

```
?utm_source=vcita&utm_medium=email&utm_campaign=paie_intermittents_2026&utm_content=e1_accroche
```

Faire varier `utm_content` par e-mail : `e1_accroche`, `e2_preuve`,
`e3_services`, `e4_relance`, et `sms1`/`sms2`/`sms3` (avec `utm_medium=sms`).

## 5. Marqueurs à remplacer avant envoi

| Marqueur | Remplacer par |
|---|---|
| `{{prénom}}` | champ vcita `[First Name]` |
| `{{structure}}` | champ vcita `[Business Name]` |
| `{{LIEN_RDV}}` | URL publique du service « Diagnostic paie » vcita |
| `{{LIEN_RDV_COURT}}` | version raccourcie du lien de RDV |
| `{{LIEN_DESINSCRIPTION}}` | géré automatiquement par vcita (token de désinscription) |
