# Check-list de recette — refonte chanteursynagogue.art

## Phase 0 — Sauvegarde du site live (avant de construire)
- [x] Services Bookings — `donnees-live/bookings-services.md` (5 services, descriptions intégrales, anciens slugs).
- [x] Galerie — `donnees-live/galerie-seo.md` (89 médias, dont les 31 titres/descriptions SEO).
- [x] Custom embeds — `donnees-live/custom-embeds.md` (25 embeds verbatim) + tri dans `JSON-LD.md`.
- [x] robots.txt + token Search Console — `donnees-live/robots-et-reglages-seo.md`.
- [ ] **Reste à faire (seule tâche de sauvegarde restante, bloquante)** : ouvrir chaque page du site EN LIGNE
      (clic droit → code source) et recopier **title + meta description + texte intégral** des 9 pages dans
      `SPEC-PAGES.md`. Non extractible par API : l'API SEO Tags ne renvoie que des valeurs générées, pas celles
      saisies dans l'éditeur (test fait sur `/apropos`).

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
- [ ] **Bandeau de consentement visible et fonctionnel** (il est actuellement masqué par un embed sur le live)
      et tracking publicitaire déclenché seulement après acceptation — voir `JSON-LD.md` §4.
- [ ] Aucune rustine CSS de l'ancien site réinjectée (`JSON-LD.md` §3) : elles casseraient la mise en page Studio.
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
