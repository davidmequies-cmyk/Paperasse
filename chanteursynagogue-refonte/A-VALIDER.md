# À valider — refonte chanteursynagogue.art

> Tout ce qui est bloqué sur une décision ou une information de David, au 12/11/2026.
> Rangé par ce que ça coûte de ne pas y répondre. Les points 1 à 3 bloquent du travail déjà fait.

---

## 1. ⏳ Un clic « Publier » dans l'éditeur Wix

Le title et la meta description de `/offices-synagogue` sont **corrigés et enregistrés**, mais dans le
brouillon : l'API Wix refuse d'écrire directement sur la révision publique
(`DRAFT_SAVED_NOT_PUBLISHED`).

→ **Ouvrir l'éditeur Wix de chanteursynagogue.art et cliquer « Publier ».**

Tant que ce clic n'a pas eu lieu, Google continue d'afficher « Kippour, Shabbat » dans le résultat de
recherche. Je ne l'ai pas fait moi-même : une publication pousse en ligne **tous** les brouillons de
l'éditeur, y compris des modifications que je n'ai pas faites et que je ne peux pas voir.

---

## 2. 🔴 Le canonical — à vérifier avant toute autre action SEO

L'API SEO de Wix rapporte, pour **toutes** les pages, un `canonical` et un `og:url` en
`https://MDMProd.wixsite.com/website-3/…` au lieu de `https://www.chanteursynagogue.art/…`.

**Si ces balises sortent telles quelles dans le HTML livré, c'est le problème le plus grave du site** :
un canonical qui désigne un autre domaine dit à Google « la vraie page est ailleurs », ce qui peut
faire désindexer les pages du domaine propre. Ça pèse plus lourd que n'importe quel title ou schéma.

Ce n'est **pas** confirmé : la source de ces balises est « pattern par défaut », donc c'est peut-être un
reliquat d'avant le branchement du domaine, que le rendu corrige. Je n'ai pas pu trancher :
l'accès réseau sortant vers le site est bloqué dans cette session (DNS non résolu, et refus du proxy).

→ **Deux façons de répondre :**
- **La plus simple** : ouvrir `https://www.chanteursynagogue.art/offices-synagogue`, clic droit →
  « Code source de la page », chercher `canonical`, et me coller la ligne.
- **Ou** : j'ai créé un environnement « Paperasse — sites MDM » qui autorise l'accès à
  chanteursynagogue.art et mdmprod.fr. Il suffit de le choisir au lancement d'une prochaine session
  pour que je relève moi-même le HTML des 9 pages (c'est aussi ce qui débloque la phase 0 du brief).

---

## 3. ❓ `/a-propos` ou `/apropos` ?

Les deux orthographes circulent et **une seule peut être la bonne** :
- l'URL que tu m'as envoyée : `https://www.chanteursynagogue.art/a-propos`
- l'URL inscrite dans le schéma `Person` du site, et dans le relevé de l'API : `/apropos`

C'est important : le livrable `PAGE-APROPOS.md` est prêt à coller, et un schéma qui pointe vers une URL
qui n'existe pas est une erreur SEO silencieuse. Même remarque pour le maillage interne.

→ Quelle est la bonne ? (Et l'autre redirige-t-elle, ou tombe-t-elle en 404 ?)

---

## 4. ✅ Le bandeau de consentement — masquage retiré le 12/11

L'embed qui masquait le bandeau a été **désactivé** sur le site en ligne, sur ton accord explicite.

- embed `3b2f4c35-9d0b-47c4-9a96-ff1409e76b75`, nommé seulement « Personnalisé », position HEAD,
  toutes les pages → `enabled: false` (révision 1 → 2)
- Son contenu était **uniquement** ce CSS, rien d'autre :
  `#usercentrics-cmp-ui,#usercentrics-cmp,[id^="usercentrics"]{display:none!important}`
- Le code est conservé, seulement désactivé : réversible en une minute si besoin.
- Aucun autre embed actif ne masque le bandeau (vérifié sur les 25). Le second embed
  « Personnalisé » (`7106fcaa-…`) masquait tout le site mais était déjà désactivé.

⚠️ **Un contrôle visuel reste nécessaire.** Il n'y a aucun script Usercentrics parmi les embeds :
le bandeau est donc celui **intégré à Wix** (sa bannière cookies est fournie par Usercentrics),
ce qui explique qu'on l'ait masqué en CSS plutôt que désactivé. Le masquage est levé, mais le
bandeau ne réapparaîtra que s'il est **toujours activé dans les réglages de confidentialité du
site**. S'il y a aussi été coupé, rien ne s'affichera et le traceur Google Ads continuera de
partir sans consentement — c'est-à-dire le problème d'origine, intact.

→ Ouvrir le site en navigation privée et regarder si un bandeau apparaît. Si non :
Réglages Wix → Confidentialité / Bandeau de cookies → l'activer.
Je ne peux pas le vérifier d'ici (accès réseau sortant bloqué, cf. point 2).

---

## 5. ❓ Quatre affirmations de la FAQ, non vérifiées

La FAQ du site a déjà livré une information fausse (la préparation à la Torah). Elle n'est donc plus
une source fiable, et ces points sont repris sur le nouveau site **seulement si tu les confirmes** :

| # | Affirmation en ligne | Vrai ? |
|---|---|---|
| a | ~~David Méquiès est **chef de chœur**~~ | ✅ **VRAI — confirmé le 12/11** |
| b | Réserver **6 à 12 mois** à l'avance (et **4 à 8 semaines** en dernière minute) | |
| c | **Frais de déplacement** facturés hors Île-de-France | |
| d | Horaires d'ouverture **lun-ven 9h-20h, dim 10h-18h** | |
| e | « **plus de 35 ans** de carrière » vs « **depuis 1987** » (= 39 ans) — laquelle garder ? | |

Pour (d) : la vraie disponibilité (dimanche→jeudi soir, samedi soir en hiver) est plus précise **et**
plus vendeuse que des horaires de bureau. Je propose de remplacer.

Un sixième, mineur, relevé en lisant les metas : `/chanteur-bar-mitsva` annonce « **montée à la
Torah** ». Ce n'est pas la préparation de l'enfant (retirée le 12/11) mais le moment de la cérémonie
que tu accompagnes — a priori exact, mais c'est juste à côté de ce que tu as fait corriger.

---

## 6. ⚙️ Langue et pays du site Studio — bloque 4 services

Les 4 services Bookings ne sont pas créés sur le site Studio, et c'est volontaire : tant que le site
n'est pas réglé sur **français / France / Europe-Paris / EUR**, les horaires se figent en
`America/New_York`. Ce réglage n'est pas modifiable par API, il se fait dans le tableau de bord Wix.

→ Une fois fait, dis-le moi : je crée les 4 services dans la minute.

---

## Ce qui n'attend rien et avance

| Fait | État |
|---|---|
| 5 schémas SEO (LocalBusiness, Person+MusicGroup, FAQPage, ItemList, WebSite+Breadcrumb) | ✅ injectés sur le site Studio |
| Préparation à la Torah / Haftarot | ✅ retirée des deux sites |
| Mélodies marocaines/tunisiennes/algériennes | ✅ retirées des deux sites |
| Titles et metas réels des 11 pages | ✅ relevés — `donnees-live/titles-metas-pages.md` |
| 5 services Bookings, 89 médias, 25 embeds, robots.txt | ✅ sauvegardés — `donnees-live/` |
| Maquettes des 9 pages | ✅ à jour — https://claude.ai/artifact/GRmfnGzYoJDfu2kCu8jPc7 |
| Bookings installé + catégorie créée sur le site Studio | ✅ |
