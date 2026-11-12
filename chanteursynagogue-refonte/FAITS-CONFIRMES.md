# Faits confirmés par David — source de vérité

> ⚠️ La FAQ du site en ligne a livré au moins une information **fausse** (la préparation de l'enfant à la
> Torah et aux Haftarot). Elle n'est donc plus une source fiable. **Ce fichier prime sur tout le reste**,
> y compris sur le brief et sur les schémas du site.
> Mis à jour le 12/11/2026.

## ✅ Confirmé par David

### Cérémonies en synagogue
- **Lundi et jeudi, et c'est tout.** Ce sont les jours de lecture de la Torah en semaine.
- ⛔ **PAS d'offices de Shabbat. PAS de Rosh Hashana. PAS de Kippour.**

### Disponibilité en soirée
- **Du dimanche au jeudi soir.**
- **Samedi soir en hiver également**, pour les galas, houppa et bar-mitsva.
  *(En hiver, Shabbat se termine tôt, ce qui rend la soirée du samedi possible.)*
  → formulation à confirmer : voir « à préciser » ci-dessous.

### Ne pas écrire / ne pas annoncer
- ⛔ La préparation de l'enfant à la lecture de la Torah et des Haftarot. **Retiré des deux sites le 12/11/2026.**
- ⛔ Les mélodies sépharades « marocaines, tunisiennes, algériennes ». **Retiré des deux sites le 12/11/2026**
  sur demande de David. Formulation retenue à la place : « la liturgie ashkénaze comme le répertoire sépharade ».

## ❓ À préciser avec David
- Le samedi soir en hiver : est-ce bien **« en hiver seulement »** (Shabbat finissant tôt), ou bien toute l'année ?
- « Chef de chœur » : exact ? (affirmé dans la FAQ du site)
- Délais de réservation « 6 à 12 mois » / « 4 à 8 semaines » : exact ?
- Frais de déplacement hors Île-de-France : exact ?
- Horaires d'ouverture annoncés dans le schéma (lun-ven 9h-20h, dim 10h-18h) : à remplacer par la vraie
  disponibilité ci-dessus, qui est bien plus précise et plus vendeuse.

## 🔴 Conséquence majeure : la page `/offices-synagogue` est à refondre

La page en ligne — **et sa balise title** — annoncent ce que David ne fait pas :
```
Chanteur pour offices de synagogue à Paris — Kippour, Shabbat | David Méquiès
```
Kippour et Shabbat sont **dans le title**, donc dans les résultats Google. C'est le même problème que les
Haftarot, mais à l'échelle d'une page entière : elle attire des demandes qu'il faudra décliner.

**Décision à prendre (elle a un coût SEO, voir plus bas) :**

Nouveau positionnement proposé — la page parle des cérémonies du lundi et du jeudi :
- **Title** : `Chanteur pour cérémonie en synagogue à Paris — lundi et jeudi | David Méquiès`
- **H1** : `Chanteur pour cérémonie religieuse en synagogue à Paris`
- **Réponse directe** :
  ```
  David Méquiès chante les cérémonies religieuses en synagogue à Paris depuis 1987,
  le lundi et le jeudi — les jours de lecture de la Torah. Chanteur de synagogue et
  pianiste, il interprète le répertoire liturgique dans les traditions ashkénaze et
  sépharade, à Paris, en Île-de-France et ailleurs sur demande.
  ```
- **Trois blocs** : les cérémonies du lundi · les cérémonies du jeudi · soirées et galas
  (du dimanche au jeudi, et samedi soir en hiver).
- **Retirer** : toute mention de Shabbat, Rosh Hashana, Kippour, Kol Nidré, Ne'ila.
- **Garder** l'URL `/offices-synagogue` : changer le slug coûterait le référencement acquis.
  Le mot « offices » dans l'URL reste acceptable — l'important est que le contenu, le title et
  les schémas disent la vérité.

### Le coût SEO, dit franchement
La page est probablement positionnée sur « chanteur Kippour » et « chanteur Shabbat ». Retirer ces mots
fera **perdre ce trafic**. Mais ce trafic ne peut pas se convertir, puisque la prestation n'existe pas :
il produit des appels à décliner et des visiteurs déçus. Les IA, elles, pénalisent les incohérences entre
ce qu'un site annonce et ce qu'il livre. **Mon avis : la précision vaut mieux que ce trafic-là.**
C'est néanmoins votre décision, pas la mienne.
