# PROMPT — Refonte complète de chanteursynagogue.art (migration Wix Studio)

> Brief d'origine transmis par David le 01/07/2026 — fait foi sur tout document antérieur.

Tu es directeur artistique et intégrateur Wix Studio senior. Refonds intégralement le site **chanteursynagogue.art** en Wix Studio. Design premium, mais **le SEO existant est intouchable** : c'est la contrainte n°1.

## 1. Contexte & identité
- Artiste : **David Méquiès**, **chanteur de synagogue et pianiste** à Paris, actif depuis 1987 (plus de 30 ans d'expérience). Marque : **NESHAMA** (Neshama Music, licence spectacle PLATESV-R-2021-012818).
- ⛔ **INTERDIT ABSOLU** : les mots « hazan », « hazzan », « chantre », « cantor » — nulle part (contenus, titles, metas, alt, schemas, noms de fichiers). Formulation unique : « chanteur de synagogue et pianiste ».
- Prestations : Houppa (mariage juif), Bar-Mitsva / Bat-Mitsva, offices de synagogue (Shabbat, Rosh Hashana, Kippour), concerts. Répertoires ashkénaze et sépharade.
- Formules : Chanteur + Pianiste / + Violoniste / + Violoniste + Saxophone, + consultation gratuite. Devis personnalisé.
- Zone : Paris, Île-de-France, France, international.
- Coordonnées : 61 rue de Lyon, 75012 Paris — 07 45 17 41 29.
- Positionnement : **haut de gamme, émotion, tradition + modernité**. Concurrent à surclasser visuellement : musi-k.fr (site daté).

## 2. Objectifs de la refonte
1. Image premium (l'actuel site Wix classique doit devenir un site Studio digne d'un artiste de scène international).
2. Conversion : chaque page pousse vers **réservation de la consultation gratuite** (Wix Bookings) et le téléphone (click-to-call).
3. **Zéro régression SEO** (site en cours de montée vers la 1ère place sur « chanteur synagogue Paris »).

## 3. Arborescence — URLs À CONSERVER À L'IDENTIQUE
Reprendre exactement ces slugs (aucun changement d'URL ; si un changement est techniquement inévitable, redirection 301 obligatoire) :
- `/` Accueil
- `/apropos` — « L'Art d'une Voix »
- `/galerie`
- `/contact`
- `/book-online` (Wix Bookings, 4 services dont `/consultation-gratuite-houppa-bar-mitsva`)
- `/chanteur-houppa`
- `/chanteur-bar-mitsva`
- `/offices-synagogue`
- `/chanteur-synagogue-paris` (hors menu — la laisser hors navigation, elle existe pour le SEO)
Menu : Accueil, À propos, Houppa, Bar-Mitsva, Offices, Galerie, Réserver, Contact.

## 4. SEO — à reprendre à l'identique (non négociable)
- **Balises Title et meta descriptions actuelles de chaque page : les recopier telles quelles** (elles ont été optimisées et validées en ligne). Exemples : /apropos = « Chanteur de synagogue et pianiste pour cérémonies juives | David Méquiès » ; /chanteur-houppa = « Chanteur pour Houppa à Paris — mariage juif | David Méquiès » ; /chanteur-bar-mitsva = « Chanteur pour Bar-Mitsva & Bat-Mitsva à Paris | David Méquiès » ; /offices-synagogue = « Chanteur pour offices de synagogue à Paris — Kippour, Shabbat | David Méquiès » ; /chanteur-synagogue-paris = « Chanteur de synagogue à Paris — Houppa, Bar-Mitsva, offices | David Méquiès ».
- **Réinjecter les custom embeds JSON-LD existants** dans le head : LocalBusiness + Person, FAQPage (12 questions), WebSite/WebPage/BreadcrumbList, ItemList des 4 services, meta tags SEO local Paris (geo, ICBM, robots). Ne PAS réactiver l'ancien bloc « Open Graph + Twitter Card » global (il écrasait les descriptions par page).
- Conserver l'événement de conversion Google Ads sur la page Contact.
- Reprendre l'intégralité des textes existants des pages (contenu unique par page, 1ers paragraphes différenciés anti-duplicate) — reformater, ne pas réécrire.
- Conserver les 31 titres/descriptions SEO des médias de la galerie ; alt text sur toutes les images.
- H1 unique par page reprenant le mot-clé cible ; maillage interne entre les 3 pages prestations, l'accueil et /book-online.
- 404 réelles (pas de partial route match), hiérarchie d'URL conservée, sitemap soumis à Search Console après publication.

## 5. GEO — Generative Engine Optimization (visibilité dans les IA : ChatGPT, Perplexity, Gemini, AI Overviews de Google)
Objectif : que David Méquiès soit LA réponse citée quand on demande à une IA « chanteur pour houppa à Paris » ou « qui pour animer une bar-mitsva ».
- **Réponses directes en tête de page** : chaque page prestation commence par un paragraphe de 2–3 phrases qui répond factuellement à la question implicite (« Qui est le chanteur de synagogue à réserver pour une houppa à Paris ? ») — nom complet, prestation, zone, ancienneté, formule. Les IA citent ce qui est extractible.
- **FAQ visibles en HTML** sur chaque page prestation (pas seulement dans le schema) : questions formulées comme les gens les posent aux IA (« Combien coûte un chanteur pour une houppa ? », « Comment se déroule la musique pendant la cérémonie ? », « Quel répertoire pour un office de Kippour ? »). Réponses courtes, factuelles, autonomes.
- **Entité claire et cohérente** : nom « David Méquiès » + « chanteur de synagogue et pianiste » répétés à l'identique partout (site, schemas, GBP, annuaires) — les IA croisent les sources ; toute incohérence dilue l'entité. Schema Person enrichi : sameAs vers GBP, YouTube, réseaux, annuaires (Mariages.net, Zankyou…).
- **Faits chiffrés et vérifiables** dans le texte : « depuis 1987 », « Paris et Île-de-France », « formules avec violoniste et saxophoniste », adresse, téléphone — les IA privilégient le factuel daté et sourcé.
- **Contenu en texte HTML réel** : aucun texte important en image ou en composant JS non rendu ; les crawlers IA lisent le HTML brut.
- Autoriser les crawlers IA dans robots.txt (GPTBot, PerplexityBot, Google-Extended, ClaudeBot) — ne PAS les bloquer.
- Structure question → réponse dans les intertitres H2/H3 (« Comment réserver ? », « Quelles synagogues à Paris ? »).
- Renforcer les citations externes (annuaires, avis Google, articles communautaires) : les IA s'appuient sur la corroboration multi-sources — c'est la prolongation de la campagne de backlinks existante.

## 6. Direction artistique
- Ambiance : élégance sobre et chaleureuse — bleu nuit profond, ivoire/crème, accents dorés discrets. Éviter le kitsch et les clichés.
- Typo : une serif de caractère pour les titres (esprit affiche de concert), une sans-serif lisible pour le corps.
- Hero plein écran à l'accueil : vidéo de David en cérémonie (muette, autoplay, fallback image), titre « David Méquiès — Chanteur de synagogue et pianiste », sous-titre « Houppa · Bar-Mitsva · Offices — Paris & international », double CTA « Consultation gratuite » + « 07 45 17 41 29 ».
- Sections accueil : présentation (texte SEO existant), 3 cartes prestations (vers les pages dédiées), bandeau « depuis 1987 » avec chiffres clés, galerie vidéo/photo en avant, témoignages, avis Google (lien : https://g.page/r/CRDZnjS_DFddEBM/review), FAQ, CTA final.
- Pages prestations : hero vidéo dédié, texte existant restructuré (intertitres H2/H3), déroulé de la cérémonie, mini-FAQ, témoignage, CTA réservation.
- Galerie : grille moderne filtrable (Houppa / Bar-Mitsva / Offices / Concerts), lightbox vidéo.

## 7. Technique & performance
- Wix Studio : grille responsive, breakpoints desktop/tablette/mobile soignés (majorité du trafic mobile).
- **Mobile** : click-to-call permanent (bouton flottant ou header sticky), WhatsApp si possible, formulaire court.
- Performance : images WebP compressées, lazy loading, pas d'animations lourdes, viser un LCP < 2,5 s.
- Wix Bookings conservé avec les 4 services et leurs descriptions actuelles (200–350 mots, ne pas raccourcir). Service « Répétition » reste masqué.
- Accessibilité : contrastes AA, alt systématiques, navigation clavier.
- Multilingue : prévoir la structure pour un ajout EN ultérieur (ne pas activer maintenant).

## 8. Livraison
1. Maquette/preview des pages clés (Accueil, Houppa, Réserver) pour validation AVANT bascule.
2. Check-list de recette avant publication : URLs identiques, titles/metas vérifiés EN LIGNE page par page (⚠️ dans Wix, cliquer hors du champ SEO avant de publier, sinon l'édition est perdue), schemas présents dans le code source, 0 occurrence de hazan/chantre, Bookings fonctionnel, formulaire testé, mobile testé.
3. Après publication : re-crawl Search Console + vérification curl des 9 pages.
