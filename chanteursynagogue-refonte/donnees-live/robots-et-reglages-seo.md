# robots.txt & réglages SEO site — extraits par API le 01/07/2026

## robots.txt actuel (défaut Wix, `default: true`, sous-domaine www)

```
User-agent: *
Allow: /
Disallow: *?lightbox=

# Optimization for Google Ads Bot
User-agent: AdsBot-Google-Mobile
User-agent: AdsBot-Google
Disallow: /_partials*
Disallow: /pro-gallery-webapp/v1/galleries/*

# Block PetalBot
User-agent: PetalBot
Disallow: /

# Crawl delay for overly enthusiastic bots
User-agent: dotbot
Crawl-delay: 10
User-agent: AhrefsBot
Crawl-delay: 10

Sitemap: https://www.chanteursynagogue.art/sitemap.xml
```

✅ **Conclusion GEO (brief §5)** : les crawlers IA (GPTBot, PerplexityBot, Google-Extended, ClaudeBot) sont **déjà autorisés** par le `User-agent: * / Allow: /` — aucun n'est bloqué. Sur le nouveau site : ne rien bloquer, conserver ce comportement par défaut.

## Réglages site capturés (via l'API SEO Tags)
- **google-site-verification** : `5YaNl1IBIMezxsq2LfyIVOyMSHoCq0jka6E9AaV2Sc4` — à conserver sur le nouveau site (sinon perte de la propriété Search Console).
- og:site_name : « Chanteur Synagogue David Méquiès » · fb:admins : `neshamamusic` · image OG par défaut : `468f0f_586d10372b7f43a7a93d02583c4dfd47~mv2.png`.

## ⚠️ Limite vérifiée : les titles/metas PAR PAGE ne sont PAS extractibles par API
Test effectué sur `/apropos` avec l'API Resolve Static Page SEO Tags : elle renvoie un title **généré par défaut** (« apropos | Chanteur Synagogue David Méquiès », `custom: false`), pas le title optimisé saisi dans l'éditeur (« Chanteur de synagogue et pianiste pour cérémonies juives | David Méquiès »).
→ **Reste à faire en phase 0 (session éditeur, seule tâche de sauvegarde restante)** : ouvrir chaque page du site EN LIGNE (view-source) et recopier title + meta description + texte des 9 pages dans `SPEC-PAGES.md`. Les 5 titles déjà validés figurent dans le brief.

## État de la sauvegarde phase 0 (récap)
| Élément | Statut |
|---|---|
| 5 services Bookings (descriptions intégrales, slugs) | ✅ extrait (`bookings-services.md`) |
| Galerie : 89 médias dont 31 titres/descriptions SEO | ✅ extrait (`galerie-seo.md`) |
| 25 custom embeds (JSON-LD, Ads, metas geo, CSS premium) | ✅ extrait (`custom-embeds.md`) |
| robots.txt + google-site-verification | ✅ extrait (ce fichier) |
| Titles + metas + textes des 9 pages | ⏳ à recopier depuis le site en ligne (session éditeur) |
