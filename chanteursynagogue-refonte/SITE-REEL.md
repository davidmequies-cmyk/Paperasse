# ⚠️ LE VRAI SITE — à lire avant toute intervention

> Établi le 12/11/2026 par `GetSiteContext` sur les sites du compte, puis vérifié par Search Console.

## Le seul site qui sert www.chanteursynagogue.art

| | |
|---|---|
| **ID** | **`6011e245-b4cd-4356-b910-ed2b9fa10219`** |
| Nom dans Wix | « David Méquiès » |
| État | **Published · Premium · Custom Domain** |
| Éditeur | Wix **Studio** |
| Créé | 4 novembre 2026 — la refonte est donc **déjà en ligne** depuis cette date |
| Particularité | les schémas JSON-LD sont dans les **balises SEO par page** (API Item SEO Tags), plus dans des embeds |

## Les copies qui N'ont AUCUN effet public

| ID | Nom | État | Ce qu'on y a fait par erreur |
|---|---|---|---|
| `b4b041af-75e8-4305-ac2e-c153401e31b3` | Chanteur Synagogue David Méquiès | **Draft · Free**, jamais publié | Étiqueté « site live » à tort en début de projet. Toutes les corrections du 12/11 (title Offices, bandeau de consentement, horaires, brit mila, Chir Orchestra, suppression de 2 embeds, schémas FAQ) y ont été faites **sans aucun effet sur le site public**. |
| `22b2327e-f306-47ae-8670-216712ac4152` | David Méquiès — Pianiste & Chanteur | **Draft · Free**, locale en-US | « Site Studio de la refonte » des sessions précédentes. 5 schémas y ont été injectés : sans effet public. |

Indices qui auraient dû alerter plus tôt : le refus `DRAFT_SAVED_NOT_PUBLISHED` (« aucune révision
publiée »), le canonical en `MDMProd.wixsite.com/website-3`, et Search Console `DOMAIN_MISSING`.

→ **Toute intervention future se fait sur `6011e245-…`, et sur lui seul.**

## Audit du vrai site — 12/11/2026

**17 pages relevées, 5 embeds.** Contre `FAITS-CONFIRMES.md`, le site est **conforme** :
lundi/jeudi, depuis 1987, chef de chœur, brit mila, frais de déplacement, 6 à 12 mois.
Aucun Kippour, Shabbat, Shabbat Hatan, préparation à la Torah, ni mot interdit.
**Aucun embed actif ne masque le bandeau de consentement.**

Ce qui était donc **faux dans mes alertes**, puisque observé sur la mauvaise copie :
- le canonical : sur le vrai site il est en `https://www.chanteursynagogue.art/…` partout ✅
- le title Offices : déjà « Cérémonies en synagogue à Paris, lundi et jeudi » ✅
- l'URL À propos : c'est **`/a-propos`**, avec tiret ✅

### Corrections appliquées sur le vrai site (en ligne immédiatement)

| Page | Changement |
|---|---|
| `/faq` (`j71cn`) | Schéma FAQPage : « les mélodies séfarades **marocaines, tunisiennes et algériennes** » → « les mélodies séfarades ». Le reste de la réponse et les 4 autres questions inchangés. |
| `/` (`c1dmp`) | Schéma : `"alternateName": "Chir Orchestra"` ajouté au nœud **PerformingGroup** (l'ensemble musical), seul nœud où un nom d'orchestre a sa place. Rien d'autre modifié. |

### Ce qui reste à faire, et que l'API ne permet pas

1. ✅ **Le texte visible de la page `/faq`** : corrigé par David dans l'éditeur Studio le 12/11.
   Schéma et texte affiché disent désormais la même chose.
2. ✅ **Google Search Console — configurée le 12/11/2026.** (Le statut `INVALID` lu plus tôt venait de
   la copie `b4b041af` ; sur le vrai site, la liaison n'avait jamais été faite.) David a autorisé son
   compte Google ; les six étapes sont enregistrées côté Google (liste des événements, 17h15–17h17 UTC) :

   | Étape | État |
   |---|---|
   | Compte Google connecté | ✅ `ACCOUNT_CONNECTED` |
   | Site vérifié (balise meta) | ✅ `SITE_VERIFIED` |
   | Propriété ajoutée | ✅ `SITE_ADDED` |
   | Plan du site envoyé | ✅ `SITEMAP_SUBMITTED` |
   | Réindexation de l'accueil demandée | ✅ `PAGE_INDEXING_REQUESTED` |
   | Réindexation du site entier demandée | ✅ `SITE_INDEXING_REQUESTED` |

   L'API n'accepte la demande page par page que pour l'accueil : `/faq` est couverte par la demande
   sur le site entier. Une demande acceptée ne garantit pas un délai ; Google repasse en général en
   quelques jours.

## Volontairement non fait

- **Ajouter « 4 à 8 semaines pour une cérémonie en synagogue » au schéma FAQ** du vrai site, alors que
  le fait est confirmé. Google exige que les données FAQ correspondent au texte **visible** de la page :
  un ajout dans le schéma seul créerait un écart sanctionnable. À faire d'abord dans le widget FAQ
  visible (éditeur), puis je l'ajoute au schéma.
- **Horaires de joignabilité** dans le schéma : le nœud du vrai site est de type `Organization`, qui
  n'accepte pas `openingHoursSpecification`. Leur bonne place est la fiche Google Business Profile.

## Vérification Search Console — 19/11/2026 (rappel programmé une semaine après)

Connexion `VALID`, site `READY`. Inspection des 9 pages principales :

| Page | Indexée | Dernier passage de Google | Canonical Google = déclaré | Données enrichies |
|---|---|---|---|---|
| `/` | ✅ | **15/11** — après les corrections | ✅ | — |
| `/faq` | ✅ | 08/11 — **avant** la correction du 12/11 | ✅ | ✅ |
| `/chanteur-bar-mitsva` | ✅ | 08/11 | ✅ | ✅ |
| `/a-propos` | ✅ | 04/11 | ✅ | ❌ **erreur** (voir ci-dessous) |
| `/chanteur-houppa` | ✅ | 04/11 | ✅ | ✅ |
| `/offices-synagogue` | ✅ | 30/10 — **avant la mise en ligne du 4/11** | ✅ | ✅ |
| `/galerie` | ✅ | 27/10 — avant le 4/11 | ✅ | ✅ |
| `/book-online` | ✅ | 17/09 — avant le 4/11 | ✅ | — |
| `/chanteur-synagogue-paris` | ✅ | 14/09 — avant le 4/11 | ✅ | — |

**Constats**
- Les 9 pages sont indexées, et Google retient partout la bonne adresse en `https://www.chanteursynagogue.art/…`.
- Seul l'accueil a été revu depuis le 12/11 : Google y a donc vu Chir Orchestra.
- `/faq` n'a pas été revue depuis la correction : Google garde la version avec les mélodies.
- 4 pages datent d'avant la mise en ligne du nouveau site (4/11). Google en garde **l'ancienne version** ;
  pour `/offices-synagogue`, c'est probablement l'ancien title « Kippour, Shabbat ».
- **Erreur sur `/a-propos`** : `Invalid object type for field "mainEntity"`. Dans le schéma ProfilePage
  de la page, `mainEntity` ne contient qu'une référence `{"@id": "…#person"}` ; Google veut un objet
  typé. Correctif proposé : `{"@type": "Person", "@id": "https://www.chanteursynagogue.art/#person",
  "name": "David Méquiès"}`. Défaut présent dans la construction du site, antérieur au 12/11.
  **Non corrigé** : en attente de l'accord de David.
- Plans du site traités le 16/11 et le 19/11, sans erreur (12 pages + 4 services). Leur compteur
  « indexées » affiche 0, alors que l'inspection page par page dit le contraire ; c'est
  l'inspection qui fait foi.
- Recherches, 12–18/11 : 7 requêtes, 1 à 2 affichages chacune, 0 clic. Trop tôt pour en tirer quoi que ce soit.
- Liens entrants repérés : chanteursynagogue.fr, davidmequies.com, chirorchestra.com, fiche Mappy.

**À faire par David** (l'API n'autorise la demande page par page que pour l'accueil) : dans Search
Console, inspecter `/faq`, `/offices-synagogue`, `/book-online`, `/chanteur-synagogue-paris`, `/galerie`
→ « Demander une indexation ».
