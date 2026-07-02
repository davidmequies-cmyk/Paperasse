# Spec page par page — refonte chanteursynagogue.art (Wix Studio)

> Contrainte n°1 : **zéro régression SEO**. URLs identiques, titles/metas recopiés tels quels, textes existants repris (reformatés, pas réécrits).
> ⛔ Interdits absolus partout (texte, title, meta, alt, schema, fichiers) : « hazan », « hazzan », « chantre », « cantor ». Formulation unique : **« chanteur de synagogue et pianiste »**.
> Note : les contenus actuels utilisent aussi « officiant » — ce mot n'est PAS interdit, il est déjà dans les 31 titres SEO médias, le conserver.

## 0. Table des URLs (AUCUN changement de slug ; sinon 301 obligatoire)

| URL | Page | Menu | Title (validé, à recopier) |
|---|---|---|---|
| `/` | Accueil | Accueil | ⚠️ relever le title actuel EN LIGNE avant refonte |
| `/apropos` | « L'Art d'une Voix » | À propos | Chanteur de synagogue et pianiste pour cérémonies juives \| David Méquiès |
| `/chanteur-houppa` | Prestation Houppa | Houppa | Chanteur pour Houppa à Paris — mariage juif \| David Méquiès |
| `/chanteur-bar-mitsva` | Prestation Bar-Mitsva | Bar-Mitsva | Chanteur pour Bar-Mitsva & Bat-Mitsva à Paris \| David Méquiès |
| `/offices-synagogue` | Prestation Offices | Offices | Chanteur pour offices de synagogue à Paris — Kippour, Shabbat \| David Méquiès |
| `/galerie` | Galerie | Galerie | ⚠️ relever le title actuel en ligne |
| `/book-online` | Réserver (Bookings) | Réserver | ⚠️ relever le title actuel en ligne |
| `/contact` | Contact | Contact | ⚠️ relever le title actuel en ligne |
| `/chanteur-synagogue-paris` | Page SEO **hors menu** | — | Chanteur de synagogue à Paris — Houppa, Bar-Mitsva, offices \| David Méquiès |

⚠️ **Étape obligatoire avant toute construction** (session éditeur) : ouvrir chaque page du site EN LIGNE (view-source) et recopier dans ce fichier le **title exact + meta description exacte + texte intégral** des 4 pages marquées ⚠️ et des méta descriptions de toutes les pages. Les 5 titles fournis ci-dessus viennent du brief (validés). Ne JAMAIS reconstruire une page sans avoir son title/méta/texte sauvegardés ici.

## 1. Gabarit commun des pages prestations (houppa / bar-mitsva / offices)
1. **Hero vidéo dédié** — H1 unique avec le mot-clé cible (ex. « Chanteur pour Houppa à Paris »).
2. **Paragraphe réponse directe (GEO)** — 2–3 phrases factuelles en tête : qui (David Méquiès, chanteur de synagogue et pianiste), quoi (la prestation), où (Paris, Île-de-France, France, international), depuis quand (1987), formules (+ violoniste / + saxophone), consultation gratuite. Extractible tel quel par les IA.
3. **Texte existant** de la page, restructuré en H2/H3 formulés en questions (« Comment se déroule la cérémonie ? », « Quel répertoire ? », « Comment réserver ? ») — reformater, ne pas réécrire.
4. **Déroulé de la cérémonie** (étapes).
5. **Mini-FAQ HTML visible** (3–5 questions formulées comme on les pose à une IA, réponses courtes autonomes). Exemples : « Combien coûte un chanteur pour une houppa ? » (→ devis personnalisé, formules duo/trio/quatuor, consultation gratuite) ; « Quel répertoire pour un office de Kippour ? » ; « Le répertoire peut-il être ashkénaze ou sépharade ? ».
6. **Témoignage** (réel uniquement — rien d'inventé).
7. **CTA final** : « Consultation gratuite » (→ /book-online) + tel 07 45 17 41 29 (click-to-call).
8. **Maillage interne** : liens croisés vers les 2 autres prestations + accueil + /book-online.

## 2. Accueil `/`
Hero plein écran : vidéo cérémonie muette autoplay (fallback image) · H1 « David Méquiès — Chanteur de synagogue et pianiste » · sous-titre « Houppa · Bar-Mitsva · Offices — Paris & international » · double CTA « Consultation gratuite » + « 07 45 17 41 29 ».
Sections : présentation (texte SEO existant) → 3 cartes prestations → bandeau « depuis 1987 » + chiffres clés → galerie vidéo/photo → témoignages → avis Google (https://g.page/r/CRDZnjS_DFddEBM/review) → FAQ → CTA final.

## 3. `/apropos` — « L'Art d'une Voix »
Texte existant intégral reformaté. H1 avec mot-clé. Photo/vidéo de scène. Encadré entité : nom, « chanteur de synagogue et pianiste », depuis 1987, NESHAMA (licence PLATESV-R-2021-012818), 61 rue de Lyon 75012 Paris.

## 4. `/galerie`
Grille moderne filtrable (Houppa / Bar-Mitsva / Offices / Concerts), lightbox vidéo. **Reprendre les 31 titres/descriptions SEO des médias à l'identique** → voir `donnees-live/galerie-seo.md` (inventaire complet extrait du live, fichiers médias identifiés). Alt sur toutes les images.

## 5. `/book-online`
Wix Bookings, services et descriptions actuels **sans raccourcir** → voir `donnees-live/bookings-services.md`. « Répétition » reste masqué. ⚠️ Arbitrer la visibilité de « Consultation gratuite » (actuellement masquée alors que c'est le CTA principal).

## 6. `/contact`
Formulaire court + adresse 61 rue de Lyon 75012 Paris + tel + WhatsApp. **Conserver l'événement de conversion Google Ads** (à recopier depuis le site actuel : Paramètres → Custom Code / balises). Click-to-call permanent sur mobile (bouton flottant ou header sticky).

## 7. `/chanteur-synagogue-paris` (page SEO, HORS menu)
La reconstruire à l'identique (texte existant), la laisser hors navigation. Elle est accessible par les moteurs via sitemap + maillage discret (footer ou liens contextuels).

## 8. GEO — rappels transverses
- Entité unique : « David Méquiès » + « chanteur de synagogue et pianiste » à l'identique partout (site, schemas, GBP, annuaires).
- Faits chiffrés dans le texte : depuis 1987, Paris/Île-de-France, formules violoniste/saxophone, adresse, téléphone.
- Tout texte important en HTML réel (jamais en image / JS non rendu).
- robots.txt : **autoriser** GPTBot, PerplexityBot, Google-Extended, ClaudeBot.
- Intertitres H2/H3 en forme de questions.

## 9. Technique
- Breakpoints desktop/tablette/mobile soignés (trafic majoritairement mobile).
- Images WebP compressées, lazy loading, LCP < 2,5 s, pas d'animations lourdes.
- Accessibilité : contrastes AA, alt systématiques, navigation clavier.
- Multilingue : structure prête pour EN, non activé.
- DA : bleu nuit profond, ivoire/crème, accents dorés discrets ; serif de caractère (titres, esprit affiche de concert) + sans-serif lisible (corps). Pas de kitsch.
