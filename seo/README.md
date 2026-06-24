# SEO — chanteursynagogue.art

Pack d'optimisation SEO pour le site Wix **Chanteur Synagogue David Méquiès**.
Tout est prêt à appliquer dans l'éditeur Wix (les réglages SEO de Wix ne sont pas
modifiables par API, d'où ce format « copier-coller »).

> ### ✅ Actions déjà appliquées sur le site (2026-06-24)
> Le site avait déjà une config SEO avancée en « code personnalisé » avec 2 embeds utiles
> **désactivés**. Je les ai **réactivés** directement (via l'API Wix Custom Embeds) :
> 1. **« Open Graph + Twitter Card »** → ajoute `meta description`, `og:description`,
>    `twitter:description`, `og:locale`.
> 2. **« Meta tags SEO local – Paris »** → balises géo + `robots: max-image-preview:large`.
>
> ⚠️ Le site a **déjà** un JSON-LD complet (LocalBusiness, FAQ, Services, WebSite/Breadcrumb).
> **Ne re-collez pas** `donnees-structurees.html` (doublon). Voir le détail dans
> `plan-seo-chanteursynagogue.md` → « MISE À JOUR ».

## Fichiers

| Fichier | Contenu | Où l'utiliser dans Wix |
|---------|---------|------------------------|
| **`plan-seo-chanteursynagogue.md`** | Audit complet + **titres & méta-descriptions** par page + plan d'action (on-page, SEO local, suivi) | Pages & menu → (page) → ⚙️ → SEO de base |
| **`contenus-a-coller.md`** | **Textes optimisés** prêts à coller (accueil, formules, à propos), alt des images, FAQ | Éditeur de page + champs « alt » |
| **`donnees-structurees.html`** | **JSON-LD** enrichi (LocalBusiness/MusicGroup, Person, WebSite, FAQPage) + `og:locale` | Paramètres → Code personnalisé (head, toutes pages) |
| **`strategie-mots-cles.md`** | **Recherche de mots-clés** + analyse concurrentielle + cibles de backlinks | Référence stratégique (création de pages, blog, annuaires) |
| **`pages-prestations.md`** | **Contenu de 4 pages dédiées** (Houppa, Bar-mitsva, Offices, Répertoire) avec titres/méta/textes | Pages & menu → + Ajouter une page |
| **`blog-articles.md`** | **3 articles de blog** longue traîne prêts à publier | App Wix Blog → Créer un article |
| **`AUTOMATISATION-claude-local.md`** | **Prompt + procédure** pour qu'une session Claude Code locale (avec navigateur) applique tout automatiquement dans Wix | Claude Code en local + MCP Playwright |

## Checklist d'application (par ordre de priorité)

**Phase 1 — Rapide & fort impact (~30 min)**
1. [ ] Appliquer les **titres + descriptions** (`plan-...md` §2) sur chaque page existante.
2. [ ] Coller les **contenus** d'accueil & formules (`contenus-a-coller.md`) : H1, intro, sections, alt images.
3. [ ] Coller le **JSON-LD** (`donnees-structurees.html`) dans Paramètres → Code personnalisé.
4. [ ] **Publier** + Google Search Console : soumettre le sitemap, demander l'indexation.

**Phase 2 — Combler le retard concurrentiel (~1–2 h)**
5. [ ] Créer les **4 pages de prestation** (`pages-prestations.md`) : Houppa, Bar-mitsva, Offices, Répertoire.
6. [ ] Les ajouter au **menu** + **maillage interne** depuis l'accueil.

**Phase 3 — Notoriété & longue traîne (en continu)**
7. [ ] Publier les **3 articles de blog** (`blog-articles.md`).
8. [ ] Créer/optimiser la **fiche Google Business Profile**.
9. [ ] S'inscrire sur les **annuaires** du secteur (guide-jourj.com, jboost.fr — voir `strategie-mots-cles.md`).
10. [ ] Compléter les **réseaux sociaux** (`sameAs` du JSON-LD).

## Déjà optimal (rien à faire)
robots.txt, configuration SEO (404 propre), description du site, locale `fr-FR`,
vérification Google, Open Graph/Twitter, sitemap. Vérifié via l'API Wix le 2026-06-23.
