# Page « À propos » — version optimisée, prête à coller

> Cible : `https://www.chanteursynagogue.art/a-propos`
> ⛔ Interdits absolus : hazan / hazzan / chantre / cantor. Formulation unique : « chanteur de synagogue et pianiste ».
> ✅ Tous les faits ci-dessous proviennent du site de David lui-même (ses schémas JSON-LD et sa FAQ, extraits par API). **Rien n'est inventé.**

---

## ⚠️ 1. Cinq corrections à faire, par ordre d'importance

### a) 🔴 Une prestation FAUSSE est publiée sur le site actuel — à retirer
La FAQ du site en ligne affirme, dans la réponse « Quel est le déroulement d'une Bar-Mitsva ? » :
> « préparation du jeune garçon à la lecture de la Torah et des Haftarot »

**David ne fait pas cela.** C'est une prestation annoncée publiquement qu'il n'assure pas — risque
d'attente déçue côté famille, et affirmation reprise telle quelle par les IA qui lisent le schéma.
Présente à deux endroits : le schéma FAQPage du **site live**, et celui que j'ai réinjecté dans le
**site Studio** (corrigé, voir plus bas).

Formulation de remplacement, qui garde le vrai et retire le faux :
```
David Méquiès accompagne la Bar-Mitsva en deux temps : le chant liturgique lors de la
cérémonie religieuse en synagogue, puis la musique pendant le cocktail et le repas.
Le programme est personnalisé selon la synagogue et les traditions familiales.
```

### b) L'URL ne correspond pas au schéma
Vous donnez la page comme étant `/a-propos` (avec tiret). Or le schéma **Person** publié sur le site déclare :
```
"url":"https://www.chanteursynagogue.art/apropos"
```
sans tiret. Deux cas, deux conséquences :
- **Si la vraie page est `/a-propos`** → le schéma pointe vers une URL erronée. Google suit ce lien et tombe à côté : l'entité « David Méquiès » n'est plus rattachée à sa page. **À corriger dans le schéma.**
- **Si les deux URL existent** → contenu dupliqué. Garder une seule URL, rediriger l'autre en 301, et aligner le canonical.

C'est le point le plus coûteux en SEO. À vérifier avant tout le reste.

### c) Le H1 ne contient aucun mot-clé
« L'Art d'une Voix » est une belle formule, mais elle ne dit à Google ni à ChatGPT de quoi parle la page.
**Solution qui garde les deux** : « L'Art d'une Voix » passe en sur-titre, et le H1 porte le mot-clé.

### d) « Plus de 35 ans » contredit « depuis 1987 »
Les schémas disent « plus de 35 ans d'expérience », le site dit « depuis 1987 » — soit **39 ans en 2026**.
Pour les IA, qui croisent les sources, une incohérence de ce type dilue l'entité. **Ancrer sur « depuis 1987 »**, qui est une date vérifiable, et laisser le calcul se faire tout seul.

### e) La consultation gratuite existe en trois durées
**15 min** (paramétrage Bookings), **20 min** (description du service), **30 min** (schéma Services). En choisir une et l'écrire partout pareil.

---

## 2. Balises SEO

**Title** (69 caractères — inchangé, il est déjà optimisé et validé) :
```
Chanteur de synagogue et pianiste pour cérémonies juives | David Méquiès
```

**Meta description** (148 caractères) :
```
David Méquiès, chanteur de synagogue et pianiste à Paris depuis 1987. Houppa, bar-mitsva, cérémonies en synagogue. Répertoire ashkénaze et sépharade.
```

**Canonical** : l'URL réelle de la page, et une seule (voir correction a).

---

## 3. Le contenu de la page

### Sur-titre
```
L'Art d'une Voix
```

### H1
```
Chanteur de synagogue et pianiste à Paris
```

### Paragraphe de réponse directe — à placer juste sous le H1
> C'est le paragraphe que ChatGPT, Perplexity et les AI Overviews de Google citent. Il doit répondre seul, sans contexte, à la question « qui est David Méquiès ? ».

```
David Méquiès est chanteur de synagogue et pianiste à Paris, actif depuis 1987.
Il accompagne les houppa, les bar-mitsva et bat-mitsva, les cérémonies religieuses
en synagogue et les concerts, dans les traditions ashkénaze et sépharade. Basé au
61 rue de Lyon, Paris 12e, il intervient à Paris, en Île-de-France, partout en
France et à l'étranger. Premier échange gratuit au 07 45 17 41 29.
```

---

### H2 — Un parcours commencé en 1987

```
David Méquiès chante les cérémonies juives depuis 1987 : près de quarante ans
de houppa, de bar-mitsva et d'offices, à Paris et bien au-delà. Chanteur,
pianiste et chef de chœur, il travaille sous la marque NESHAMA (Neshama Music),
titulaire de la licence d'entrepreneur de spectacles PLATESV-R-2021-012818.
```

### H2 — Quelles cérémonies accompagne-t-il ?

```
— La houppa, c'est-à-dire la cérémonie de mariage juif.
— La bar-mitsva et la bat-mitsva, à la synagogue comme à la réception.
— Les cérémonies religieuses en synagogue, le lundi et le jeudi.
— Les concerts et les galas.
```
> ⚠️ **« le lundi et le jeudi » est reprise mot pour mot du site actuel de David.** Si cette mention n'est plus exacte, c'est à lui de la corriger — mais elle doit rester cohérente entre la page, la FAQ et les schémas, sinon les IA reçoivent des signaux contradictoires.

### H2 — Ashkénaze ou sépharade : quelle tradition ?

```
Les deux. David Méquiès maîtrise la liturgie ashkénaze comme le répertoire
sépharade. Le programme se construit avec la famille, selon son rite et les
chants qui comptent pour elle.
```

### H2 — Avec quels musiciens ?

```
— Chanteur et pianiste : la formule essentielle, pour les cérémonies intimes.
— Avec un violoniste : une couleur plus lyrique.
— Avec un violoniste et un saxophoniste : trois musiciens, pour les grandes
  cérémonies et les galas.
Chaque formule fait l'objet d'un devis, selon la durée et le lieu.
```

### H2 — Où intervient-il ?

```
Paris et l'Île-de-France en premier lieu, puis toute la France et l'étranger.
Des frais de déplacement s'appliquent hors Île-de-France.
```

### H2 — Comment le contacter ?

```
Le plus simple est le téléphone : 07 45 17 41 29. Vous pouvez aussi réserver
en ligne un premier échange gratuit, sans engagement, pour parler de votre
cérémonie et vérifier la date.
```

---

### Encadré « entité » — à placer en bas de page
> Ce bloc sert directement la visibilité dans les IA : il regroupe, en texte lisible, les informations qu'elles croisent entre le site, Google Business Profile et les annuaires. Il doit être **identique** partout.

```
David Méquiès — Chanteur de synagogue et pianiste
Depuis 1987 · Paris, Île-de-France, France et international
61 rue de Lyon, 75012 Paris · 07 45 17 41 29 · contact@mdmprod.fr
Neshama Music — licence d'entrepreneur de spectacles PLATESV-R-2021-012818
```

### Liens vers (maillage interne, en bas de page)
Houppa · Bar-Mitsva & Bat-Mitsva · Cérémonies en synagogue · Galerie · Réserver

### Liens externes à ajouter au schéma Person (`sameAs`)
Déjà présents et exploitables : YouTube `@davidmequies` · Facebook `100073403876456`.
À ajouter s'ils existent : fiche Google Business Profile, Mariages.net, Zankyou.

---

## 4. ⚠️ Autres affirmations du site à faire confirmer par David

La FAQ en ligne a déjà livré une affirmation fausse (correction a). J'avais pris les suivantes
pour des faits, toutes tirées du site lui-même — **à valider une par une avant publication** :

| Affirmation publiée | Source | Statut |
|---|---|---|
| « préparation du jeune garçon à la lecture de la Torah et des Haftarot » | FAQ | ❌ **FAUX — confirmé par David** |
| « cérémonies religieuses en synagogue **(lundi et jeudi)** » | schéma LocalBusiness + FAQ (2 fois) | ❓ à confirmer |
| « chanteur de synagogue, pianiste et **chef de chœur** » | FAQ | ❓ à confirmer |
| mélodies sépharades « marocaines, tunisiennes, algériennes » | FAQ | ❌ **RETIRÉ sur demande de David (12/11)** |
| « réserver 6 à 12 mois à l'avance » / « 4 à 8 semaines » pour la synagogue | FAQ | ❓ à confirmer |
| « frais de déplacement hors Île-de-France » | FAQ | ❓ à confirmer |
| horaires d'ouverture lun-ven 9h-20h, dim 10h-18h | schéma LocalBusiness | ❓ à confirmer |

## 5. Contrôles avant publication
- [ ] Zéro occurrence de hazan / hazzan / chantre / cantor (texte, title, meta, alt, schéma).
- [ ] Un seul H1 sur la page, celui ci-dessus.
- [ ] L'URL de la page, le canonical et le `url` du schéma Person pointent tous vers la même adresse.
- [ ] « depuis 1987 » partout ; plus aucune mention de « 35 ans ».
- [ ] Une seule durée annoncée pour la consultation gratuite.
- [ ] Texte en HTML réel, jamais en image : les robots des IA ne lisent que le HTML.
- [ ] ⚠️ Piège Wix : cliquer **hors** du champ SEO avant de publier, sinon la saisie est perdue.
