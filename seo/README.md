# SEO — chanteursynagogue.art

Pack d'optimisation SEO pour le site Wix **Chanteur Synagogue David Méquiès**.
Tout est prêt à appliquer dans l'éditeur Wix (les réglages SEO de Wix ne sont pas
modifiables par API, d'où ce format « copier-coller »).

## Fichiers

| Fichier | Contenu | Où l'utiliser dans Wix |
|---------|---------|------------------------|
| **`plan-seo-chanteursynagogue.md`** | Audit complet + **titres & méta-descriptions** par page + plan d'action (on-page, SEO local, suivi) | Pages & menu → (page) → ⚙️ → SEO de base |
| **`contenus-a-coller.md`** | **Textes optimisés** prêts à coller (accueil, formules, à propos), alt des images, FAQ | Éditeur de page + champs « alt » |
| **`donnees-structurees.html`** | **JSON-LD** enrichi (LocalBusiness/MusicGroup, Person, WebSite, FAQPage) + `og:locale` | Paramètres → Code personnalisé (head, toutes pages) |

## Démarrage rapide (≈ 30 min)

1. Appliquer les **titres + descriptions** (`plan-...md` §2) sur chaque page.
2. Coller les **contenus** (`contenus-a-coller.md`) : H1, intro, sections, alt.
3. Coller le **JSON-LD** (`donnees-structurees.html`) dans le code personnalisé.
4. **Publier**, puis dans Google Search Console : soumettre le sitemap et demander l'indexation.

## Déjà optimal (rien à faire)
robots.txt, configuration SEO (404 propre), description du site, locale `fr-FR`,
vérification Google, Open Graph/Twitter, sitemap. Vérifié via l'API Wix le 2026-06-23.
