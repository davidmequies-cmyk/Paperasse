# Refonte chanteursynagogue.art — dossier d'exécution (Wix Studio)

> Brief : refonte premium en Wix Studio, **SEO existant intouchable** (contrainte n°1), GEO (visibilité IA), conversion vers la consultation gratuite.
> ⛔ Interdits absolus : hazan / hazzan / chantre / cantor. Formulation unique : « chanteur de synagogue et pianiste ».

## Contenu du dossier
- **`SPEC-PAGES.md`** — arborescence (9 URLs à conserver), titles validés, gabarit des pages prestations, règles GEO, DA, technique.
- **`JSON-LD.md`** — tri des 25 embeds du live : les 6 à réinjecter, ceux à laisser (rustines CSS de l'ancien site), et un **point de conformité RGPD** à traiter.
- **`CONTENU-SEO-GEO.md`** — la rédaction des 9 pages, prête à coller champ par champ dans Wix Studio.
- **`design/`** — maquettes des écrans (accueil, Houppa, Réserver, mobile), sources + disposition.
- **`RECETTE.md`** — check-list complète : sauvegarde préalable (bloquante), maquette, avant publication, après bascule.
- **`donnees-live/bookings-services.md`** — ✅ les 5 services Bookings extraits du site live par API (descriptions intégrales, slugs, anciens slugs).
- **`donnees-live/galerie-seo.md`** — ✅ les 89 médias de la galerie extraits par API, dont les **31 titres/descriptions SEO** à reprendre à l'identique.
- **`donnees-live/custom-embeds.md`** — ✅ les 25 embeds du live (schémas JSON-LD, metas geo, conversion Google Ads) récupérés verbatim.
- **`donnees-live/robots-et-reglages-seo.md`** — ✅ robots.txt (crawlers IA déjà autorisés) et token Search Console.

## Sites Wix concernés
| Rôle | Nom | siteId |
|---|---|---|
| **LIVE** (sert chanteursynagogue.art — ne pas toucher avant bascule) | Chanteur Synagogue David Méquiès | `b4b041af-75e8-4305-ac2e-c153401e31b3` |
| Brouillon Studio existant (créé le 29/06, positionnement PÉRIMÉ « sans offices » → à réviser selon le brief actuel) | David Méquiès — Pianiste & Chanteur | `22b2327e-f306-47ae-8670-216712ac4152` |
| Ancien site gratuit (mdmprod.wixsite.com — ignorer) | chanteursynagogue | `b68ae201-8703-4f3c-9278-b8f5985cf2b2` |

## Points d'arbitrage relevés (à trancher avant construction)
0. ⚠️ **Conformité** : sur le site actuel, un embed masque le bandeau de consentement aux cookies alors que la conversion Google Ads tourne sur la page Contact. À corriger sans attendre la bascule (`JSON-LD.md` §4).
1. **Consultation gratuite actuellement masquée** dans Bookings (`hidden: true`) alors qu'elle est le CTA n°1 du brief → la rendre visible ?
2. **Positionnement** : le brief actuel (07/2026) INCLUT les offices de synagogue ; l'ancien récap du dépôt (`RECAP-DAVID.md`, 06/2026) les excluait. Le brief fait foi ; le brouillon Studio du 29/06 et `COPY-FR-EN-HE.md` doivent être mis à jour en conséquence.
3. Description de la consultation dit « 20 minutes », durée paramétrée 15 min → harmoniser.
4. L'adresse « 15 allée Robert Estienne, Les Pavillons-sous-Bois » traîne encore sur le service Répétition ; le brief donne 61 rue de Lyon, 75012 Paris.

## Répartition des rôles
- **Session éditeur (« Claude in Chrome » sur le poste avec l'éditeur Wix Studio)** : recopier les titles/metas/textes des 9 pages en ligne (dernier point de la phase 0), puis construire dans Studio et publier. C'est la seule session capable d'agir dans l'éditeur.
- **Session web/API (celle-ci)** : extraction de données (fait), vérifications à distance après publication (curl des pages impossibles depuis ce conteneur, mais vérification Bookings/galerie/médias par API possible).

## Rappels non négociables
- Aucune bascule de domaine sans décision de David/Michel.
- Rien d'inventé (témoignages réels uniquement).
- Le site actuel reste en ligne, intact, jusqu'à la bascule.
