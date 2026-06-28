# 🎹 Refonte chanteursynagogue.art — Récapitulatif

Bonjour David, voici tout ce qui a été fait pendant la nuit.

## ✅ Positionnement corrigé
Vous êtes présenté comme **pianiste & chanteur** : accompagnement musical des bar/bat-mitsva, animation des houppa & mariages, concerts et animations. **Aucune mention de hazan ni d'offices** — partout corrigé.

## ✅ Ce qui a été créé
1. **Nouveau site Wix Studio** (brouillon, NON publié)
   - Nom : `chanteursyn-studio` · ID : `22b2327e-f306-47ae-8670-216712ac4152`
   - Base : modèle Studio « Artist » noir & blanc
   - Infos business à jour (nom, description corrigée)
2. **Site complet sur-mesure en HTML** (design noir & blanc, responsive)
   - Trilingue **FR / EN / HE** (sélecteur de langue, hébreu en RTL)
   - Sections : accueil, à propos (depuis 1987), 4 prestations, répertoire, galerie photos + vidéos, FAQ, contact
   - **SEO** : balises title/description/OG/Twitter, hreflang, mots-clés
   - **GEO** : données structurées schema.org (Person, LocalBusiness + MusicGroup, Service, FAQPage) — pour Google ET les IA (ChatGPT, Perplexity, Google AI)
   - Sur GitHub : branche `claude/chanteursynagogue-wix-redesign-68d7g7`
3. **Médias récupérés** : 106 fichiers (79 photos + 27 vidéos) de l'ancien site, importés dans le nouveau site Studio.

## ⏸️ Ce que je n'ai PAS fait (vos consignes)
- ❌ **Pas de publication**
- ❌ **Pas de bascule du domaine** `chanteursynagogue.art` (votre site actuel reste 100 % en ligne, intact)

Tout est **prêt en un clic** dès votre validation.

## 👉 À votre réveil — décisions
1. Voir l'aperçu du site (liens ci-dessous) et me dire ce que vous voulez ajuster.
2. Choisir la voie finale : site Studio (modèle) **ou** le design HTML importé dans Wix.
3. Quand vous validez : je publie + on planifie la bascule du domaine.

## 🔗 Liens
- Aperçu du design : _(lien ajouté après import)_
- Site Studio (éditeur) : tableau de bord Wix → « chanteursyn-studio »
- Code source : https://github.com/davidmequies-cmyk/Paperasse/tree/claude/chanteursynagogue-wix-redesign-68d7g7

## ✍️ À compléter par vous
- **Témoignages** : section prévue, à remplir avec de vrais avis (je n'invente pas d'avis).
- **Multilingue Wix** : le contenu EN/HE est prêt (fichier `COPY-FR-EN-HE.md`) ; pour un vrai multilingue Wix avec URLs séparées, activer l'app Wix Multilingual dans l'éditeur.
- **Réseaux sociaux** : me donner les liens (Instagram, YouTube…) pour les ajouter au site et au schema.

---

# 🔧 Session du 28/06/2026 — Améliorations techniques du site HTML

> Branche : `claude/cara-work-session-rb5xj3`. Toujours **rien publié**, rien sur le domaine.

## ⚠️ Le lien que vous m'avez envoyé
Le lien `scenes-popular-previous-hopefully.trycloudflare.com` (tunnel Cloudflare) **n'est pas accessible** depuis mon environnement : la politique réseau de la session bloque les connexions sortantes vers ce domaine (réponse « 403 / policy denial »). Je n'ai donc pas pu le consulter. J'ai travaillé directement sur le code source du site (`index.html`). Si vous vouliez que j'examine quelque chose sur ce lien, redonnez-le moi via un canal accessible (ex. : pousser le contenu sur GitHub) ou vérifiez la politique réseau de l'environnement.

## ✅ Ce qui a été amélioré (sans rien inventer comme contenu)
1. **Accessibilité (a11y)**
   - Lien « Aller au contenu » pour la navigation au clavier.
   - FAQ et menu : états `aria-expanded` corrects, fermeture par la touche **Échap**.
   - Visionneuse photo (lightbox) : vrai bouton de fermeture, fermeture par Échap, retour du focus sur la photo cliquée.
   - Contour de focus visible, respect de la préférence système « animations réduites ».
2. **Langue**
   - Le choix de langue est **mémorisé** (revisite = même langue) et **détecté** automatiquement d'après le navigateur.
   - Le **titre de l'onglet** et la **description SEO** changent aussi avec la langue (FR/EN/HE).
3. **SEO / partage**
   - Balise `robots` ajoutée, fichiers **`robots.txt`** et **`sitemap.xml`** créés.
   - Balises d'image de partage (`og:image` / `twitter:image`) ajoutées + correction d'un champ image invalide dans les données structurées.
   - ⚠️ **À faire (vous)** : déposer une image **1200×630 px** nommée `og-image.jpg` à la racine du site, pour que l'aperçu des partages (WhatsApp, Facebook…) s'affiche.

## 📌 Points à décider plus tard
- Les liens de langue du `sitemap.xml`/`hreflang` pointent vers `/en/` et `/he/` : ces URLs n'existeront que si on fait un vrai multilingue (app Wix Multilingual). Sur la version HTML actuelle, les langues se changent sur une seule page.
- Le formulaire de contact utilise `mailto:` (ouvre le logiciel mail). Pour recevoir les messages directement par email sans ça, prévoir un service de formulaire (ex. Formspree) — à voir ensemble.
