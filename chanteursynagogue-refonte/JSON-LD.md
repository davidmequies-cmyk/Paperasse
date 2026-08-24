# Embeds du site live — ce qui migre, ce qui reste

## ✅ FAIT le 24/08/2026 — les 5 schémas sont posés sur le site Studio
Les 5 blocs SEO ci-dessous ont été **récupérés intacts** (un par un, l'archive faite par lot était tronquée
et corrompue) puis **injectés par API dans le site Studio `22b2327e`**, actifs, en position HEAD. Vérifié.
Restent à poser plus tard : la conversion Google Ads (elle vise la page Contact, qui n'existe pas encore).

## ⚠️ CONTRADICTION MAJEURE À TRANCHER AVEC DAVID
Le site live dit, **deux fois dans ses propres schémas** :
> « cérémonies religieuses en synagogue **(lundi et jeudi)** »
> « Pour une cérémonie religieuse en synagogue (lundi ou jeudi), 4 à 8 semaines suffisent »

Or le brief de la refonte annonce des **offices de Shabbat, Rosh Hashana et Kippour**. Ce n'est pas un détail :
lundi et jeudi sont les jours de lecture de la Torah en semaine — les seuls où un accompagnement instrumental
est habituel. Shabbat et les grandes fêtes, non.
**Tant que David n'a pas tranché, la page `/offices-synagogue` ne doit pas être publiée en l'état.**
Deux possibilités : soit le brief élargit volontairement l'offre, soit la page Offices doit être recentrée sur
les cérémonies du lundi et du jeudi. La maquette porte déjà un encart « voix seule à la synagogue » marqué à confirmer.

## Autres écarts relevés dans les schémas (à corriger avant bascule)
- « plus de 35 ans d'expérience » (schémas) vs « depuis 1987 » = 39 ans en 2026. Harmoniser.
- La consultation gratuite est décrite « 30 minutes » dans le schéma Services, « 20 minutes » dans Bookings,
  et paramétrée à 15 minutes. Trois valeurs différentes — en choisir une.
- `sameAs` récupérés et utilisables : YouTube `@davidmequies`, Facebook `100073403876456`.


> ✅ **Les 25 embeds du site live ont été récupérés par API** et sont archivés verbatim dans
> [`donnees-live/custom-embeds.md`](donnees-live/custom-embeds.md). Il n'y a plus rien à recopier à la main.
> Ce fichier dit **lesquels réinjecter dans Wix Studio** — et surtout lesquels **ne pas** réinjecter.

## 1. À RÉINJECTER tels quels (6)

| Embed | Portée | Rôle |
|---|---|---|
| `Schema SEO - LocalBusiness + Person - David Méquiès` | toutes pages, HEAD | Entité principale (GEO) |
| `Schema FAQ - Houppa Bar-Mitsva - David Méquiès` | toutes pages, HEAD | FAQPage — doit rester cohérent avec les FAQ affichées |
| `Schema Services - Forfaits Musicaux - David Méquiès` | toutes pages, HEAD | ItemList des services |
| `Schema WebSite + BreadcrumbList - chanteursynagogue.art` | toutes pages, HEAD | WebSite / fil d'Ariane |
| `Meta tags SEO local - Paris - David Méquiès` | toutes pages, HEAD | geo, ICBM, robots |
| `Contact - Google Ads` | **page Contact uniquement** | Conversion `AW-935076516/085sCN2o0PwCEKTF8L0D` |

À vérifier au passage dans le schéma LocalBusiness : il annonce « plus de 35 ans d'expérience » alors que le
reste du site dit « depuis 1987 » (39 ans en 2026). Harmoniser sur « depuis 1987 ».

Ne pas oublier non plus le **token de propriété Search Console** relevé sur le live :
`google-site-verification = 5YaNl1IBIMezxsq2LfyIVOyMSHoCq0jka6E9AaV2Sc4` (voir `donnees-live/robots-et-reglages-seo.md`).

## 2. À NE PAS RÉINJECTER — consigne du brief (1)

- `Open Graph + Twitter Card - David Méquiès` — actif sur le live, mais il **écrase les descriptions par page**.
  Le brief l'exclut explicitement. Laisser Wix Studio gérer l'OG page par page.

## 3. À NE PAS RÉINJECTER — rustines de l'ancien site (9 actifs)

Ces embeds sont des **correctifs CSS/JS du site Wix classique actuel** : ils repositionnent des blocs,
masquent des vides, refont l'accueil et la galerie à la main. Les porter dans Wix Studio **casserait la
nouvelle mise en page** — Studio fait tout cela nativement (grille responsive, breakpoints, barre d'appel).

`CSS GLOBAL PREMIUM (menu/footer/typo/boutons/fonds)` · `Accueil REFONTE - bloc premium full-bleed` ·
`GALERIE REFONTE premium` · `BOOK-ONLINE REFONTE premium` · `CONTACT REFONTE premium` ·
`CSS mobile responsive` · `CSS global overflow-x (anti scroll latéral)` · `CSS bande haut /apropos` ·
`CSS fix vide mobile /apropos` · plus la `Barre mobile - Appeler/WhatsApp/Reserver` (à refaire en natif Studio).

## 4. ⚠️ À NE SURTOUT PAS RÉINJECTER — point de conformité

Un embed **actif**, nommé simplement « Personnalisé », masque la bannière de consentement aux cookies :

```html
<style>#usercentrics-cmp-ui,#usercentrics-cmp,[id^="usercentrics"]{display:none!important;visibility:hidden!important;}</style>
```

Or la conversion **Google Ads tourne sur la page Contact**. Masquer le bandeau de consentement pendant qu'un
traceur publicitaire s'exécute est un **manquement RGPD/CNIL** (consentement préalable obligatoire pour les
cookies publicitaires). À signaler à David : sur le nouveau site, le bandeau doit être **visible et
fonctionnel**, et le tracking ne doit se déclencher qu'après acceptation. À corriger aussi sur le site actuel
sans attendre la bascule.

## 5. Embeds désactivés (5) — archivés, rien à faire

`Personnalisé` (vide) · `Schema JSON-LD - David Méquiès` (ancienne version) · `Menu 3 entrées` ·
`Bandeau footer NAP + liens` · `CSS fix vide ACCUEIL` · `CSS accueil mobile (Option B)` ·
`Corrections textes et SEO` (récupéré incomplet — la réponse API a été tronquée ; vérifier dans le tableau de
bord s'il existe d'autres embeds après celui-ci).

## 6. robots.txt
Rien à changer : le live autorise déjà tous les crawlers, IA comprises (seul PetalBot est bloqué).
Sur le nouveau site, ne rien bloquer et déclarer le sitemap. Détail dans `donnees-live/robots-et-reglages-seo.md`.
