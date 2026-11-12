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
2. **Google Search Console : connexion `INVALID`.** Le compte Google relié au site ne répond plus.
   À reconnecter depuis le tableau de bord Wix (Marketing & SEO → Google Search Console).
   Sans ça, impossible d'inspecter les URL ou de demander une réindexation.

### Pages relevées

`/` · `/a-propos` · `/chanteur-houppa` · `/chanteur-bar-mitsva` · `/offices-synagogue` ·
`/chanteur-synagogue-paris` · `/book-online` · `/galerie` · `/faq` · `/mentions-legales` ·
`/politique-confidentialite` · `/accessibilite` · pages utilitaires (panier, remerciement — en `noindex`).
