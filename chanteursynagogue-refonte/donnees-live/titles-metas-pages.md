# Titles & metas RÉELS du site en ligne — relevés par API le 12/11/2026

> Source : `GET /promote/seo/v1/item-seo-tags/STATIC_PAGE` sur le site live `b4b041af-…`.
> ⚠️ Correction d'une conclusion antérieure : les titles/metas par page **sont** lisibles par API.
> C'est l'endpoint *Resolve Static Page SEO Tags* qui renvoyait des valeurs générées — pas celui-ci.
> Ces valeurs sont la référence à recopier à l'identique sur le site Studio (contrainte n°1 : zéro régression SEO).

| URL | Page | itemId | Title (exact) | Meta description (exacte) |
|---|---|---|---|---|
| `/` | Accueil | `ax8fl` | Chanteur synagogue Paris, Houppa & Bar Mitsva \| David Méquiès | David Méquiès, chanteur de synagogue et pianiste, accompagne vos Houppa, Bar Mitsva et cérémonies juives avec une prestation vocale élégante à Paris. |
| `/apropos` | L'Art d'une Voix | `vroqy` | Chanteur de synagogue et pianiste pour cérémonies juives \| David Méquiès | David Méquiès met sa voix au service des cérémonies juives : synagogue, Houppa, Bar Mitsva, mariage juif et événements familiaux. |
| `/chanteur-houppa` | Houppa | `uscd1` | Chanteur pour Houppa à Paris — mariage juif \| David Méquiès | David Méquiès, chanteur et pianiste, sublime votre Houppa à Paris : chants liturgiques et mélodies juives pour un mariage juif émouvant et inoubliable. |
| `/chanteur-bar-mitsva` | Bar-Mitsva | `j7sw4` | Chanteur pour Bar-Mitsva & Bat-Mitsva à Paris \| David Méquiès | David Méquiès, chanteur et pianiste, accompagne vos Bar-Mitsva et Bat-Mitsva à Paris : montée à la Torah, chants liturgiques et fête, avec émotion. |
| `/offices-synagogue` | Offices | `tvhdw` | ~~Chanteur pour offices de synagogue à Paris — Kippour, Shabbat \| David Méquiès~~ → **Chanteur pour offices de synagogue à Paris — lundi et jeudi \| David Méquiès** | ~~…Rosh Hashana, Kippour, Shabbat…~~ → **David Méquiès, chanteur de synagogue à Paris, officie vos cérémonies en synagogue le lundi et le jeudi. Liturgie ashkénaze et sépharade depuis 1987.** ⏳ *enregistré dans le brouillon le 12/11, en attente d'une publication du site* |
| `/galerie` | Galerie | `pa75a` | Photos et vidéos chanteur synagogue, Houppa, Bar Mitsva | Découvrez les photos et vidéos de David Méquiès en synagogue, Houppa, Bar Mitsva et événements juifs avec chanteur, piano et musiciens. |
| `/book-online` | Réserver | `oiir3` | Réserver un chanteur pour Bar Mitsva, Houppa ou synagogue | Réservez David Méquiès pour une Houppa, Bar Mitsva, office ou cérémonie juive. Formules chanteur, pianiste, violoniste et saxophone. |
| `/contact` | Contact | `h51jq` | Contact chanteur synagogue Paris, Houppa et Bar Mitsva | Contactez David Méquiès pour organiser une prestation musicale en synagogue, Houppa, Bar Mitsva ou mariage juif à Paris et Île-de-France. |
| `/chanteur-synagogue-paris` | Page SEO hors menu | `ecy0o` | Chanteur de synagogue à Paris — Houppa, Bar-Mitsva, offices \| David Méquiès | David Méquiès met sa voix au service des cérémonies juives : synagogue, Houppa, Bar Mitsva, mariage juif et événements familiaux. |
| `—` | Page de remerciement (utilitaire) | `hfl7n` | Page de remerciement \| Chanteur Synagogue David Méquiès | — *(aucune)* |
| `—` | Page panier (utilitaire) | `nzabv` | Page panier \| Chanteur Synagogue David Méquiès | — *(aucune)* |

## Longueurs (contrôle)

| itemId | Title | Meta |
|---|---|---|
| `ax8fl` | 61 car. | 149 car. |
| `vroqy` | 72 car. | 129 car. |
| `uscd1` | 59 car. | 151 car. |
| `j7sw4` | 61 car. | 147 car. |
| `tvhdw` | 77 car. | 152 car. |
| `pa75a` | 55 car. | 135 car. |
| `oiir3` | 57 car. | 132 car. |
| `h51jq` | 54 car. | 137 car. |
| `ecy0o` | 75 car. | 129 car. |
| `hfl7n` | 55 car. | 0 car. |
| `nzabv` | 46 car. | 0 car. |

## ⚠️ À vérifier en view-source sur le site en ligne

L'API rapporte, pour **toutes** les pages, un `canonical` et un `og:url` en
`https://MDMProd.wixsite.com/website-3/…` au lieu de `https://www.chanteursynagogue.art/…`.
Leur source est `TAG_SOURCE_DEFAULT_PATTERN`, donc ce n'est peut-être qu'un défaut
antérieur au branchement du domaine, que le rendu corrige. **Mais si ces balises
sortent telles quelles dans le HTML livré, c'est grave** : un canonical qui désigne
un autre domaine invite Google à désindexer les pages du domaine propre.
Je ne peux pas le trancher d'ici (l'accès réseau sortant vers le site est bloqué).
→ Ouvrir une page en view-source et chercher `rel="canonical"`. Si le domaine wixsite
y figure, c'est à corriger avant toute autre action SEO : ça pèse plus lourd que
n'importe quel title.

## Autres anomalies relevées en passant

1. **Meta description dupliquée.** `/apropos` et `/chanteur-synagogue-paris` portent
   exactement la même : « David Méquiès met sa voix au service des cérémonies juives :
   synagogue, Houppa, Bar Mitsva, mariage juif et événements familiaux. » Deux pages
   qui se présentent de façon identique à Google se concurrencent. À différencier lors
   de la refonte (la page SEO doit viser « chanteur de synagogue à Paris », la page
   À propos le parcours et l'identité).

2. **`/chanteur-bar-mitsva` mentionne « montée à la Torah »** dans sa meta description.
   Ce n'est pas la préparation de l'enfant (retirée le 12/11) mais le moment de la
   cérémonie accompagné — a priori exact. Signalé parce que c'est juste à côté de la
   formulation que David a fait corriger : à confirmer d'un mot.
