# SMS de relance — vcita SMS Campaign

> 📌 **OPTION HORS PÉRIMÈTRE.** La campagne retenue est **e-mail uniquement**.
> Ce fichier est fourni au cas où vous décideriez d'ajouter un canal SMS plus tard.
>
> ⚠️ N'envoyer qu'à des contacts ayant consenti au démarchage par SMS.
> Garder chaque message < 160 caractères et inclure STOP au 36111.

---

## SMS 1 — J+5 (non-ouvreurs e-mail)

```
MDMProd gère vos coulisses : paie intermittents, événements, production.
Échange découverte 30 min : {{LIEN_RDV_COURT}}
STOP au 36111
```

## SMS 2 — J+9 (rappel RDV)

```
{{prénom}}, votre échange découverte MDMProd vous attend.
Réservez votre créneau : {{LIEN_RDV_COURT}}
STOP au 36111
```

## SMS 3 — J+14 (dernière relance)

```
Derniers créneaux ce mois-ci pour échanger avec MDMProd.
On en parle ? {{LIEN_RDV_COURT}}
STOP au 36111
```

---

**Notes**
- `{{LIEN_RDV_COURT}}` = version raccourcie du lien de RDV vcita (utiliser un
  raccourcisseur ou le lien court généré par vcita).
- `{{prénom}}` → champ `[First Name]` de vcita.
