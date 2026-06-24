# Automatiser l'application du SEO dans Wix — via Claude Code local + navigateur

> Ce fichier contient **tout ce qu'il faut** pour qu'une session **Claude Code installée
> sur votre ordinateur** (avec un MCP de navigateur) applique automatiquement le pack SEO
> dans l'éditeur Wix — titres, méta-descriptions, contenus, pages de prestation.
>
> ⚠️ La session web actuelle ne peut PAS piloter de navigateur. Cette procédure se fait
> **sur votre machine**.

---

## 1. Prérequis (à faire une fois)

```bash
# 1. Installer Claude Code en local
npm install -g @anthropic-ai/claude-code

# 2. Récupérer ce dépôt (pour que la session ait accès au dossier seo/)
git clone https://github.com/davidmequies-cmyk/Paperasse.git
cd Paperasse
git checkout claude/seo-chanteursynagogue-art-1qlwqx

# 3. Ajouter un MCP de contrôle de navigateur (Playwright)
claude mcp add playwright npx '@playwright/mcp@latest'

# 4. Lancer Claude Code dans ce dossier
claude
```

**Avant de lancer le prompt :** dans le navigateur piloté (ou un profil Chrome connecté),
**connectez-vous à votre compte Wix** et ouvrez le tableau de bord du site
*Chanteur Synagogue David Méquiès*. L'agent réutilisera votre session connectée.

> 💡 Pourquoi un agent IA + navigateur plutôt qu'un script Playwright figé ? L'éditeur Wix
> est une application canvas complexe aux sélecteurs obfusqués et changeants : un script
> codé en dur casserait au moindre changement d'UI. Un agent qui **voit** la page et
> s'adapte est bien plus fiable.

---

## 2. LE PROMPT À COLLER (copier tout le bloc ci-dessous dans Claude Code local)

```
Tu es un agent qui pilote mon navigateur (MCP Playwright) pour appliquer des réglages SEO
sur mon site Wix « Chanteur Synagogue David Méquiès » (chanteursynagogue.art). Je suis déjà
connecté à Wix dans le navigateur. Les contenus de référence sont dans le dossier seo/ de
ce dépôt : lis-les avant d'agir :
- seo/plan-seo-chanteursynagogue.md  (titres + méta-descriptions, §2)
- seo/contenus-a-coller.md           (H1, textes, alt images, FAQ)
- seo/pages-prestations.md           (4 pages à créer)
- seo/blog-articles.md               (3 articles)

RÈGLES IMPÉRATIVES (sécurité) :
1. NE touche PAS au « Code personnalisé » (Paramètres → Code personnalisé) : les données
   structurées JSON-LD y sont déjà en place. N'ajoute AUCUN schéma (sinon doublon).
2. NE réactive PAS les embeds laissés désactivés (ancien schéma en double ; « redesign
   iframe »). N'y touche pas.
3. Travaille page par page. Après CHAQUE page, fais une pause et montre-moi une capture
   pour validation AVANT de passer à la suivante.
4. Ne publie qu'à la TOUTE FIN, après mon feu vert, via le bouton « Publier ».
5. Si l'interface ne correspond pas à ce que tu attends, ARRÊTE-toi et demande-moi.

TÂCHES, dans l'ordre :

A. TITRES + MÉTA-DESCRIPTIONS (priorité 1)
   Pour chaque page existante, ouvre ses réglages SEO (Éditeur : Pages & menu → page →
   ⚙️ → SEO de base ; OU Tableau de bord → Marketing & SEO → SEO → Pages). Renseigne la
   balise titre et la description SEO ci-dessous. Si un mode « automatique » est actif,
   désactive-le pour imposer la valeur personnalisée.

   • Accueil
     Titre : Chanteur de synagogue & pianiste juif à Paris | D. Méquiès
     Desc  : Chanteur de synagogue et pianiste juif à Paris depuis 1987. Houppa, bar-mitsva, offices de synagogue. Répertoire ashkénaze & sépharade. Devis gratuit.
   • Formules
     Titre : Formules duo, trio & quartet | Chanteur de synagogue Paris
     Desc  : Formules musicales pour vos cérémonies juives : chant seul, duo, trio ou quartet. Houppa, bar-mitsva, offices de synagogue. Sur devis, partout en France.
   • À propos (si la page existe)
     Titre : David Méquiès, hazzan & pianiste – 35 ans d'expérience
     Desc  : Chanteur de synagogue depuis 1987, David Méquiès accompagne houppa, bar-mitsva et offices avec un répertoire ashkénaze et sépharade. Découvrez son parcours.
   • Galerie / Vidéos (si elle existe)
     Titre : Vidéos & extraits musicaux | Chanteur de synagogue Méquiès
     Desc  : Écoutez David Méquiès, chanteur de synagogue et pianiste : extraits de houppa, bar-mitsva et offices. Répertoire juif ashkénaze & sépharade à Paris.
   • Contact (si elle existe)
     Titre : Contact & devis – Chanteur de synagogue à Paris | Méquiès
     Desc  : Contactez David Méquiès pour votre houppa, bar-mitsva ou office de synagogue à Paris et en Île-de-France. Devis gratuit sous 24 h.
   Pour toute autre page trouvée dans le menu, propose-moi un titre + une description sur
   le même modèle, et attends ma validation.

B. CONTENU DES PAGES (priorité 2)
   À partir de seo/contenus-a-coller.md, mets à jour le contenu visible :
   - Page d'accueil : un seul H1 « Chanteur de synagogue & pianiste juif à Paris »,
     puis l'intro (~320 mots) et les sections H2.
   - Page Formules : H1 + intro.
   - Renseigne les TEXTES ALTERNATIFS (alt) des images principales (tableau du fichier).
   Montre-moi chaque page avant de continuer.

C. PAGES DE PRESTATION (priorité 3) — uniquement si je confirme
   À partir de seo/pages-prestations.md, crée 4 nouvelles pages (Houppa, Bar-mitsva,
   Offices de synagogue, Répertoire) : titre SEO, description, H1, texte, liens internes.
   Ajoute-les au menu. Demande-moi confirmation AVANT de créer chaque page.

D. ARTICLES DE BLOG (priorité 4) — optionnel, si je confirme
   Si l'app Wix Blog est présente, crée les 3 articles de seo/blog-articles.md
   (titre SEO + description + corps). Sinon, signale-le-moi.

E. FINALISATION
   - Récapitule tout ce qui a été modifié.
   - Sur mon feu vert : clique « Publier ».
   - Rappelle-moi d'aller dans Google Search Console pour soumettre le sitemap et demander
     la réindexation des pages modifiées.

Commence par : (1) lister les fichiers seo/, (2) ouvrir le tableau de bord Wix dans le
navigateur, (3) me confirmer la liste réelle des pages du site avant d'agir.
```

---

## 3. Données de secours (si l'agent n'a pas accès au dossier seo/)

Si vous lancez la session **hors du dépôt**, l'agent n'aura pas les fichiers. Dans ce cas,
les **titres + descriptions** sont déjà entièrement inclus dans le prompt ci-dessus
(section A) — suffisant pour l'essentiel. Pour les contenus longs (textes des pages,
articles), copiez aussi le contenu des fichiers `contenus-a-coller.md`,
`pages-prestations.md` et `blog-articles.md` dans la conversation locale.

---

## 4. Garde-fous (résumé)

| ✅ À faire | ❌ À NE PAS faire |
|-----------|------------------|
| Titres + descriptions par page | Toucher au Code personnalisé / JSON-LD (déjà en place) |
| Contenu visible (H1, textes, alt) | Réactiver les embeds désactivés (doublon / iframe externe) |
| Créer les pages de prestation | Publier sans validation |
| Publier à la fin, après validation | Coller `donnees-structurees.html` (doublon de schéma) |

---

## 5. Après publication — vérifications

1. **Test des résultats enrichis** : https://search.google.com/test/rich-results
   (vérifier qu'il n'y a pas de doublon de schéma).
2. **Google Search Console** : soumettre `sitemap.xml`, demander la réindexation.
3. **Aperçu Google** : vérifier titres + descriptions sur 2-3 pages.
4. **PageSpeed** : https://pagespeed.web.dev (vérifier le mobile).
