# Audit de cohérence du site en ligne — 12/11/2026

> ✅ **SUITE DONNÉE LE MÊME JOUR.** Les deux embeds décrits ci-dessous ont été **supprimés
> définitivement** sur demande de David ; leur contenu est archivé dans
> `embeds-supprimes-12-11-2026.md`. Shabbat Hatan est confirmé faux ; la brit mila est confirmée
> vraie et a été **ajoutée** aux schémas des deux sites (live rév. 13, Studio rév. 3).
> Ce qui suit est conservé comme compte rendu de ce qui a été trouvé et pourquoi.

> Balayage de **tous** les embeds du site live et du site Studio, confronté à `FAITS-CONFIRMES.md`.
> Objectif : vérifier qu'après les corrections de la journée, plus rien de faux n'est publié —
> et repérer ce qui pourrait le redevenir.

## ✅ Ce qui est publié aujourd'hui est exact

Aucune affirmation fausse ne sort dans le HTML du site. Les corrections de la journée sont en place :
préparation à la Torah retirée, mélodies marocaines/tunisiennes/algériennes retirées, Shabbat et
Kippour purgés des schémas actifs, horaires corrigés, masquage du bandeau de consentement levé.

## 🔴 Deux embeds désactivés sont des mines

Ils ne s'exécutent pas (`enabled: false`), donc **rien de tout cela n'est en ligne**. Mais ils sont
nommés de façon engageante, et quelqu'un qui les réactiverait en pensant bien faire casserait
silencieusement le travail de la journée.

### 1. « Corrections textes et SEO - Chanteur Synagogue » — `c007a148-…` (rév. 5, BODY_END)

Le nom donne envie de l'activer. C'est le plus dangereux des deux. Ce qu'il fait réellement :

| Ce que fait le script | Pourquoi c'est un problème |
|---|---|
| `[id*="usercentrics"] … {display:none!important}` **et** `div[role="dialog"][aria-modal="true"]` | **Remasque le bandeau de consentement**, en plus large que l'embed désactivé ce matin : il masque aussi n'importe quelle fenêtre modale du site. Annule la correction RGPD. |
| Injecte un `<h1>` puis le cache : `position:absolute;left:-10000px` | Un titre écrit pour les robots mais invisible pour les visiteurs. C'est du **texte dissimulé**, ce que Google sanctionne. |
| Réécrit en JavaScript `title`, `description`, `og:*`, `twitter:*` **et le `canonical`** de chaque page | Écraserait les balises corrigées par API, dont le title de `/offices-synagogue`. Et un title posé en JS n'est pas toujours celui qu'indexe un robot : le site dirait deux choses à la fois. |
| Annonce « brith mila », « offices de synagogue et **fêtes religieuses** », « mélodies hassidiques, répertoire oriental » | Prestations **jamais confirmées**, et « fêtes religieuses » contredit directement lundi/jeudi. |
| Référence une page `/organisation-d-evenements` | Absente des 9 URLs du projet. |

→ **Recommandation : le supprimer**, pas seulement le laisser désactivé. Un embed désactivé qui
s'appelle « Corrections SEO » finira par être réactivé par quelqu'un.
Je ne l'ai pas supprimé : effacer un travail existant ne m'appartient pas.

**Une information utile en tombe quand même** : son code traite `/apropos` comme l'URL canonique et
renvoie les variantes accentuées (`/à-propos`) vers elle en `noindex`. C'est un indice sérieux pour
la question `/a-propos` vs `/apropos` — sans être une preuve de l'état actuel du site.

### 2. « Schema JSON-LD - David Méquiès » — `72d55dde-…` (rév. 3, HEAD)

Un **sixième** schéma, antérieur aux cinq en service. S'il était réactivé en même temps qu'eux :

- Il déclare un `Person` et un `LocalBusiness` sous des `@id` **différents** (`#david-mequies`,
  `#neshama`) de ceux des schémas actifs (`#person`, `#business`). Résultat : **deux personnes et
  deux entreprises** pour un seul homme. C'est exactement l'inverse du but recherché — une IA ne
  saurait plus laquelle citer.
- Il propose deux services non confirmés : **« Shabbat Hatan »** et **« Brit Mila »**.
- Il introduit un nom de marque absent partout ailleurs : **« Chir Orchestra »**.
- Il élargit la zone à « Europe » et « Israël ».

## ❓ Deux questions que l'audit soulève

1. **Fais-tu les Shabbat Hatan et les Brit Mila ?** Ils figurent dans ces deux embeds désactivés,
   nulle part ailleurs. Si oui, ce sont deux prestations que le site **n'annonce pas** — donc des
   demandes perdues. Si non, c'est à supprimer définitivement.
2. **« Chir Orchestra »** est-il un nom encore utilisé ? S'il l'est, il devrait figurer en
   `alternateName` du schéma actif ; sinon il doit disparaître.

## ⚠️ Une incohérence mineure, non corrigée

Trois schémas **actifs** disent « plus de 35 ans d'expérience » alors que le site dit « depuis
1987 », soit 39 ans : `LocalBusiness`, `Person`, et `WebSite`. Les deux énoncés sont vrais, mais
pour une IA qui croise les sources, un chiffre flou à côté d'une date précise dilue l'entité.

→ Je recommande d'ancrer partout sur **« depuis 1987 »**, une date vérifiable qui vieillit toute
seule. **Non modifié** : c'est une décision de formulation sur du texte public, pas une erreur
factuelle, et elle revient à David.

## Méthode

Balayage des 25 embeds du site live et des 5 du site Studio, par API, contre la liste des mots et
affirmations proscrits (`hazan`, `hazzan`, `chantre`, `cantor`, Haftarot, mélodies
marocaines/tunisiennes/algériennes, Shabbat, Kippour, Rosh Hashana, Kol Nidré, Ne'ila, anciens
horaires, « 35 ans »). Les deux embeds dont l'archive locale était tronquée ont été rechargés
individuellement, pour ne rien conclure à partir de données coupées.
