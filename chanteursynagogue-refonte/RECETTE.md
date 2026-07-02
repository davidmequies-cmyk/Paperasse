# Check-list de recette — refonte chanteursynagogue.art

## Phase 0 — AVANT de construire (sauvegarde, bloquant)
- [ ] Recopier depuis le site LIVE (view-source page par page) : title + meta description + texte intégral des 9 pages → compléter `SPEC-PAGES.md`.
- [ ] Recopier les custom embeds existants (LocalBusiness+Person, FAQPage 12 Q/R, WebSite/WebPage/Breadcrumb, ItemList, metas geo/ICBM/robots, conversion Google Ads) → coller dans `JSON-LD.md`.
- [ ] Exporter/inventorier la galerie : fait ✅ (`donnees-live/galerie-seo.md`, 89 items dont 31 optimisés).
- [ ] Services Bookings : fait ✅ (`donnees-live/bookings-services.md`).

## Phase 1 — Maquette (validation AVANT bascule)
- [ ] Preview des pages clés : Accueil, /chanteur-houppa, /book-online.
- [ ] Validation par David/Michel (design + textes). Aucune bascule sans accord.

## Phase 2 — Avant publication (sur le site de build)
- [ ] Les 9 URLs strictement identiques (sinon 301 posée et testée).
- [ ] Titles + metas vérifiés **EN LIGNE** page par page. ⚠️ Piège Wix : cliquer HORS du champ SEO avant de publier, sinon l'édition est perdue.
- [ ] Schemas présents dans le code source (view-source) de chaque page.
- [ ] `grep` visuel : **0 occurrence** de hazan / hazzan / chantre / cantor (contenus, titles, metas, alt, schemas, noms de fichiers).
- [ ] Bookings fonctionnel : 4 services, descriptions intégrales, « Répétition » masqué, consultation réservable de bout en bout.
- [ ] Formulaire contact testé (réception réelle) + événement de conversion Google Ads présent sur /contact.
- [ ] Click-to-call permanent sur mobile + WhatsApp. Test réel sur téléphone.
- [ ] Galerie : 31 titres/descriptions SEO reportés à l'identique, alt sur toutes les images, filtres + lightbox OK.
- [ ] FAQ HTML visibles sur chaque page prestation, cohérentes avec le schema FAQPage.
- [ ] robots.txt : crawlers IA autorisés (GPTBot, PerplexityBot, Google-Extended, ClaudeBot).
- [ ] Mobile complet (breakpoints), contrastes AA, navigation clavier.
- [ ] Performance : images WebP, lazy loading, LCP < 2,5 s (PageSpeed Insights).
- [ ] Page `/chanteur-synagogue-paris` reconstruite, HORS menu, accessible par URL directe.
- [ ] 404 réelle sur URL inexistante (pas de partial route match).

## Phase 3 — Bascule & après publication
- [ ] Bascule du domaine (décision David/Michel uniquement).
- [ ] Vérification curl/en ligne des 9 pages (200, title/méta corrects, schemas présents).
- [ ] Sitemap soumis dans Search Console + demande de re-crawl des 9 URLs.
- [ ] Test Google Rich Results (FAQPage, LocalBusiness).
- [ ] Suivi Search Console à J+7 et J+30 : impressions/positions sur « chanteur synagogue paris », « chanteur houppa paris », « chanteur bar mitsva paris » — aucune chute tolérée sans action corrective.
