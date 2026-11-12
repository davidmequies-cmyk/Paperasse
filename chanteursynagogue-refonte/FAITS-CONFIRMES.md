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
  ✅ **Confirmé par David le 12/11 : « samedi soir uniquement en hiver ».** Pas toute l'année.

### Compétences
- **Chef de chœur** : ✅ confirmé par David le 12/11. À mentionner dans le corps du texte, pas comme
  descripteur d'entité — celui-ci reste « chanteur de synagogue et pianiste », identique partout.

### Zone d'intervention et déplacement
- Paris et Île-de-France en premier lieu, puis toute la France et l'international.
- **Des frais de déplacement s'appliquent hors Île-de-France** : ✅ confirmé par David le 12/11.

### Ne pas écrire / ne pas annoncer
- ⛔ La préparation de l'enfant à la lecture de la Torah et des Haftarot. **Retiré des deux sites le 12/11/2026.**
- ⛔ Les mélodies sépharades « marocaines, tunisiennes, algériennes ». **Retiré des deux sites le 12/11/2026**
  sur demande de David. Formulation retenue à la place : « la liturgie ashkénaze comme le répertoire sépharade ».

## ❓ À préciser avec David
> Regroupées, avec les décisions en attente, dans **`A-VALIDER.md`**.

- Délais de réservation « 6 à 12 mois » / « 4 à 8 semaines » : exact ?
- Horaires d'ouverture annoncés dans le schéma (lun-ven 9h-20h, dim 10h-18h) : à remplacer par la vraie
  disponibilité ci-dessus, qui est bien plus précise et plus vendeuse.

## 🔴 Conséquence majeure : la page `/offices-synagogue` est à refondre

La page en ligne — **et sa balise title** — annoncent ce que David ne fait pas :
```
Chanteur pour offices de synagogue à Paris — Kippour, Shabbat | David Méquiès
```
Kippour et Shabbat sont **dans le title**, donc dans les résultats Google. C'est le même problème que les
Haftarot, mais à l'échelle d'une page entière : elle attire des demandes qu'il faudra décliner.

✅ **Title et meta corrigés le 12/11** (voir la section en bas de ce fichier) — en gardant le mot-clé
porteur « offices de synagogue à Paris » intact, et non la formulation proposée ci-dessous, qui perdait
le mot « offices ». ⏳ En attente d'un clic « Publier » dans l'éditeur.

Le reste du positionnement de la page (H1, contenu, blocs) reste à construire :

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

## Page Offices — title et meta corrigés (12/11/2026)

| | Avant | Après |
|---|---|---|
| Title | Chanteur pour offices de synagogue à Paris — **Kippour, Shabbat** \| David Méquiès | Chanteur pour offices de synagogue à Paris — **lundi et jeudi** \| David Méquiès |
| Meta | …officie vos offices : **Rosh Hashana, Kippour, Shabbat**… | …officie vos cérémonies en synagogue **le lundi et le jeudi**… |

Le mot-clé porteur (« offices de synagogue à Paris ») est conservé mot pour mot : seuls
les termes faux sont remplacés. Title 77 → 75 caractères, meta 152 → 148. L'écriture
s'est propagée automatiquement à `og:title`, `og:description`, `twitter:title` et
`twitter:description`.

⏳ **État : enregistré dans le brouillon, pas encore en ligne.** L'API a refusé la
révision publique (`DRAFT_SAVED_NOT_PUBLISHED`). Il reste **un clic « Publier » dans
l'éditeur Wix** du site chanteursynagogue.art pour que la correction soit visible.
Tant que ce clic n'a pas eu lieu, Google affiche encore « Kippour, Shabbat ».
Je n'ai pas publié le site moi-même : une publication pousse en ligne *tous* les
brouillons de l'éditeur, y compris des modifications que je n'ai pas faites.
