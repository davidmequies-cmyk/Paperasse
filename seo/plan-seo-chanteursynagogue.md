# Plan d'optimisation SEO — chanteursynagogue.art

> Site : **Chanteur Synagogue David Méquiès** (Wix)
> Activité : David Méquiès — chanteur de synagogue & pianiste juif à Paris (NESHAMA MUSIC)
> Date de l'audit : 2026-06-23

Ce document est un **audit complet + plan d'action prêt à appliquer**. Les valeurs
ci-dessous (titres, méta-descriptions, données structurées) sont à **copier-coller**
dans l'éditeur Wix, car ces réglages se gèrent page par page dans Wix et ne sont pas
modifiables par API.

---

> ## ⚠️ MISE À JOUR (2026-06-24) — à lire en premier
>
> En inspectant le **code personnalisé** du site (que le résolveur SEO de Wix ne montre
> pas), j'ai découvert que le site possède **déjà une configuration SEO avancée** via
> 10 « custom embeds ». Mon audit initial ci-dessous était donc **incomplet** sur deux points :
>
> **Corrections de l'audit :**
> - ❌ « Aucune méta-description » → en réalité, une balise existait mais via un embed
>   **désactivé**. ✅ **Je l'ai réactivé** : `meta description`, `og:description`,
>   `twitter:description` et `og:locale` sont désormais **actifs** sur le site.
> - ❌ « Schéma LocalBusiness pauvre » → **faux** : le site a déjà un JSON-LD riche
>   (LocalBusiness + Person/MusicGroup, **FAQPage** 12 Q/R, **Services** 4 forfaits,
>   **WebSite + BreadcrumbList**), tous actifs.
> - ✅ **J'ai aussi réactivé** l'embed « Meta tags SEO local – Paris » (balises géo +
>   `robots: max-image-preview:large`).
>
> **➡️ Conséquence importante :** le fichier `donnees-structurees.html` de ce dossier
> fait **doublon** avec le schéma déjà en place. **NE le collez PAS** tel quel (vous
> créeriez des données structurées en double). Gardez-le comme référence uniquement.
>
> **Ce qui reste vrai et utile dans ce plan :** les **titres** sont toujours génériques
> (`Accueil | …`) et les **méta-descriptions par page** ne sont pas personnalisées
> (une seule description site-wide via l'embed) → les recommandations §2 restent valables.
> Les **contenus** (`contenus-a-coller.md`), **pages de prestation** (`pages-prestations.md`)
> et **articles de blog** (`blog-articles.md`) restent 100 % pertinents.
>
> **Embeds laissés volontairement désactivés** (ne pas réactiver sans réflexion) :
> un ancien schéma JSON-LD en double, et un « redesign iframe » expérimental qui masque
> le site Wix pour charger un site externe (`david-mequies-prestige.surge.sh`).

---

## 1. État des lieux (audit technique réel)

Audit réalisé directement sur les balises SEO servies par le site (API Wix
« Resolve Static Page SEO Tags ») et sur les propriétés du site.

### ✅ Ce qui est déjà bien en place
- **Langue / pays** : `fr` / `FR`, fuseau `Europe/Paris` — correct.
- **Description du site** (Wix > Infos de l'entreprise) : riche et bien ciblée
  (« chanteur de synagogue et pianiste juif à Paris depuis 1987… houppa, bar-mitsva,
  offices… répertoire ashkénaze et sépharade… »).
- **`robots.txt`** : sain (`Allow: /`), avec le sitemap déclaré
  (`https://www.chanteursynagogue.art/sitemap.xml`).
- **Config SEO** : 404 propre (pas de « partial route match »), pas d'aplatissement
  d'URL forcé — conforme aux recommandations.
- **Vérification Google Search Console** : balise présente.
- **Open Graph + Twitter Card** : `og:title`, `og:image`, `twitter:card=summary_large_image` présents.
- **Données structurées** page d'accueil : `LocalBusiness` + `WebSite` (JSON-LD) présents.
- **Coordonnées entreprise** complètes : 61 Rue de Lyon, 75012 Paris ; tél. +33 7 45 17 41 29 ;
  e-mail contact@mdmprod.fr ; horaires renseignés.

### ⚠️ Problèmes identifiés (par ordre d'impact)

| # | Problème | Impact | Où corriger |
|---|----------|--------|-------------|
| 1 | **Aucune balise `<meta name="description">` sur les pages** (ni `og:description`, ni `twitter:description`) | 🔴 Élevé — Google génère lui-même un extrait, souvent peu vendeur ; CTR plus faible | Wix : SEO de chaque page → « Que voulez-vous que Google affiche ? » |
| 2 | **Titres génériques sans mots-clés** : `Accueil \| …`, `Formules \| …` | 🔴 Élevé — le `<title>` est le 1er signal on-page | Wix : SEO de chaque page → Balise titre |
| 3 | **Schéma `LocalBusiness` pauvre** : pas de téléphone, géo, logo, horaires, zone desservie, prestations, réseaux | 🟠 Moyen — limite les rich results / SEO local | Wix : Code personnalisé (JSON-LD) — voir `donnees-structurees.html` |
| 4 | **Pas de balise `og:locale`** (`fr_FR`) | 🟢 Faible | Code personnalisé |
| 5 | **Hiérarchie Hn et textes alternatifs (alt) des images** à vérifier/optimiser | 🟠 Moyen | Éditeur Wix, par page |

---

## 2. Titres & méta-descriptions à appliquer (copier-coller)

Règles respectées : **titre ≤ ~60 caractères**, **méta-description ≤ ~155 caractères**,
mot-clé principal en début de chaîne, 1 page = 1 intention.

> Dans Wix : **Pages & menu → (page) → ⚙️ → SEO de base**.
> Renseigner « Balise titre » et « Description SEO ». Ces deux champs alimentent à la
> fois le `<title>`, la `<meta description>` ET les balises Open Graph.

### Accueil  *(confirmée)*
- **Titre** : `Chanteur de synagogue & pianiste juif à Paris | D. Méquiès`
- **Description** :
  `Chanteur de synagogue et pianiste juif à Paris depuis 1987. Houppa, bar-mitsva, offices de synagogue. Répertoire ashkénaze & sépharade. Devis gratuit.`

### Formules  *(confirmée)*
- **Titre** : `Formules duo, trio & quartet | Chanteur de synagogue Paris`
- **Description** :
  `Formules musicales pour vos cérémonies juives : chant seul, duo, trio ou quartet. Houppa, bar-mitsva, offices de synagogue. Sur devis, partout en France.`

### À propos / Biographie  *(à appliquer si la page existe)*
- **Titre** : `David Méquiès, hazzan & pianiste – 35 ans d'expérience`
- **Description** :
  `Chanteur de synagogue depuis 1987, David Méquiès accompagne houppa, bar-mitsva et offices avec un répertoire ashkénaze et sépharade. Découvrez son parcours.`

### Vidéos / Galerie  *(à appliquer si la page existe)*
- **Titre** : `Vidéos & extraits musicaux | Chanteur de synagogue Méquiès`
- **Description** :
  `Écoutez David Méquiès, chanteur de synagogue et pianiste : extraits de houppa, bar-mitsva et offices. Répertoire juif ashkénaze & sépharade à Paris.`

### Témoignages / Avis  *(à appliquer si la page existe)*
- **Titre** : `Avis & témoignages | Chanteur de synagogue D. Méquiès`
- **Description** :
  `Les témoignages des familles ayant choisi David Méquiès pour leur houppa, bar-mitsva ou office de synagogue à Paris et en Île-de-France.`

### Contact  *(à appliquer si la page existe)*
- **Titre** : `Contact & devis – Chanteur de synagogue à Paris | Méquiès`
- **Description** :
  `Contactez David Méquiès pour votre houppa, bar-mitsva ou office de synagogue à Paris et en Île-de-France. Devis gratuit sous 24 h. ☎ 07 45 17 41 29.`

> ⚠️ Adaptez la liste à vos pages réelles. Le principe : **chaque page indexable doit
> avoir un titre et une description uniques**, avec un mot-clé différent par page pour
> éviter la cannibalisation.

---

## 3. Données structurées enrichies (JSON-LD)

Le schéma `LocalBusiness` actuel est minimal. Un schéma enrichi améliore l'éligibilité
aux résultats enrichis et le SEO local. Le bloc prêt à coller se trouve dans
**`donnees-structurees.html`**.

**Comment l'ajouter dans Wix :**
1. **Paramètres → Code personnalisé → + Ajouter du code**.
2. Coller le contenu de `donnees-structurees.html`.
3. Placer le code dans **`<head>`**, **« Toutes les pages »**, chargement **« Une fois »**.
4. Publier.

> Astuce : si Wix génère déjà un `LocalBusiness` sur l'accueil, le schéma ajouté le
> complète (Google fusionne les entités partageant le même `@id`/url). Vérifier ensuite
> avec le **Test des résultats enrichis** Google (search.google.com/test/rich-results)
> et l'**outil de test Schema.org**.

---

## 4. Optimisations « on-page » (dans l'éditeur)

1. **Un seul `<H1>` par page**, contenant le mot-clé principal. Exemple page d'accueil :
   *« Chanteur de synagogue & pianiste juif à Paris »* (et non « Bienvenue »).
2. **Textes alternatifs (alt) des images** : décrire avec mots-clés naturels,
   ex. *« David Méquiès chantant lors d'une houppa à la synagogue »*. Renommer aussi les
   fichiers images (`houppa-chanteur-synagogue-paris.jpg`) avant import.
3. **Sous-titres `<H2>/<H3>`** structurés autour des intentions de recherche :
   *Houppa*, *Bar-mitsva / Bat-mitsva*, *Offices de synagogue*, *Répertoire*,
   *Zone d'intervention (Paris, Île-de-France, France)*.
4. **Contenu texte** : viser **≥ 300–500 mots** sur l'accueil et les pages clés
   (Google a besoin de texte pour classer ; les sites Wix très visuels manquent souvent
   de contenu indexable). Intégrer naturellement : *hazzan, officiant, mariage juif,
   Rosh Hashana, Kippour, Shabbat, ashkénaze, sépharade*.
5. **Maillage interne** : depuis l'accueil, lier explicitement vers *Formules*, *Vidéos*,
   *Contact* avec des ancres descriptives (« Découvrir les formules », pas « cliquez ici »).
6. **Section FAQ** (zone à forte valeur SEO) — voir schéma `FAQPage` dans
   `donnees-structurees.html`. Questions suggérées :
   - *Intervenez-vous partout en France ?*
   - *Quelle est la différence entre les formules duo, trio et quartet ?*
   - *Proposez-vous un répertoire ashkénaze et sépharade ?*
   - *Comment réserver pour une houppa ou une bar-mitsva ?*

---

## 5. SEO local & notoriété (hors site)

1. **Google Business Profile** : créer / revendiquer la fiche « NESHAMA MUSIC — David Méquiès »
   (catégorie *Musicien* / *Service événementiel*), avec les mêmes NAP (Nom, Adresse,
   Téléphone) que le site → cohérence avec le schéma `LocalBusiness`. Levier #1 du SEO local.
2. **Cohérence NAP** sur tous les annuaires (PagesJaunes, annuaires de prestataires de
   mariage, communautés juives). Le nom, l'adresse et le `+33 7 45 17 41 29` doivent être
   identiques partout.
3. **Réseaux sociaux** : renseigner les URL réelles (Facebook « neshamamusic », Instagram,
   YouTube) dans le champ `sameAs` du JSON-LD (`donnees-structurees.html`).
4. **Backlinks de qualité** : référencement sur des plateformes de prestataires de
   cérémonies / mariages, partenaires (traiteurs cacher, salles de réception, synagogues),
   et plateformes vidéo (chaîne YouTube avec descriptions optimisées renvoyant vers le site).
5. **Avis clients** : collecter des avis Google → renforce la fiche et le `AggregateRating`
   du schéma une fois que des avis réels existent.

---

## 6. Suivi & vérification

- **Google Search Console** (déjà vérifiée) : soumettre le `sitemap.xml`, surveiller
  l'indexation, les requêtes et le CTR. Demander l'indexation des pages modifiées.
- **Test des résultats enrichis** : valider le JSON-LD après publication.
- **PageSpeed Insights** : viser un bon score mobile (les images Wix doivent être
  compressées / en `WebP`).
- **Réindexation** : après application des titres/descriptions, prévoir 1 à 3 semaines
  avant de voir l'effet dans les SERP.

---

## 7. Récapitulatif des priorités

| Priorité | Action | Effort |
|----------|--------|--------|
| 🔴 1 | Ajouter titres + méta-descriptions uniques sur chaque page (§2) | Faible |
| 🔴 2 | Ajouter le JSON-LD enrichi `LocalBusiness`/`MusicGroup` + `FAQPage` (§3) | Faible |
| 🟠 3 | Optimiser H1/H2, alt des images, étoffer le contenu texte (§4) | Moyen |
| 🟠 4 | Créer/optimiser la fiche Google Business Profile (§5) | Moyen |
| 🟢 5 | Maillage interne, réseaux sociaux, backlinks, avis (§4–5) | Continu |

*Note : la configuration technique modifiable par API (robots.txt, config SEO,
description du site) est déjà optimale — aucune intervention requise à ce niveau.*
