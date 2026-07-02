# Wix Bookings — les 5 services du site LIVE (extrait par API, 01/07/2026)

Site live : « Chanteur Synagogue David Méquiès » — siteId `b4b041af-75e8-4305-ac2e-c153401e31b3`.
⚠️ RÈGLE brief §7 : conserver ces services et leurs descriptions actuelles **sans les raccourcir**. « Répétition » reste masqué.

⚠️ POINT À ARBITRER (constat API) : le service « Consultation gratuite » est actuellement **masqué** (`hidden: true`) alors que le brief le met au cœur de la conversion (`/book-online`, 4 services dont la consultation). Avant publication : le rendre visible, ou confirmer qu'il reste accessible uniquement en lien direct.

---

## 1. Forfait Chanteur + Pianiste — visible
- id `107de691-7e7b-4190-abad-907e235426c0` · slug principal `forfait-chanteur-pianiste`
- Anciens slugs à préserver (redirections) : `forfait-pianiste-chanteur`, `forfait-seul`, `forfait-thématique`
- Tagline : « La formule essentielle pour votre cérémonie juive à Paris »
- Durée 120 min · prix « Sur demande » · approbation manuelle activée
- Description (INTÉGRALE, à reprendre telle quelle) :
> David Méquiès, chanteur de synagogue et pianiste juif à Paris, accompagne votre houppa, bar-mitsva, bat-mitsva ou office de synagogue. Avec 30 ans d'expérience, il maîtrise le répertoire ashkénaze et sépharade : Dodi Li, Erev Shel Shoshanim, Sheva Brachot, chants liturgiques de Kippour et de Rosh Hashana. Formule duo — idéale pour les cérémonies intimes et élégantes. Disponible à Paris, en Île-de-France et dans toute la France. Tarif sur devis selon la durée et le lieu de la cérémonie.

## 2. Forfait Chanteur + Pianiste + Violoniste — visible
- id `99d6266d-6944-442f-896c-c81668e25025` · slug principal `forfait-chanteur-pianiste-violoniste`
- Anciens slugs : `pianiste-chanteur-violoniste`, `forfait-à-deux`, `forfait-basique`
- Tagline : « La formule lyrique pour une cérémonie juive inoubliable »
- Durée 120 min · prix « Sur demande » · approbation manuelle activée
- Description (INTÉGRALE) :
> David Méquiès (chanteur de synagogue, pianiste) accompagné d'un violoniste professionnel pour vos cérémonies juives à Paris. Ce trio crée une atmosphère musicale lyrique et émouvante, idéale pour les houppas, bar-mitsvas et bat-mitsvas. Répertoire ashkénaze et sépharade adapté à votre tradition familiale. Disponible à Paris, en Île-de-France et partout en France. Tarif sur devis — contactez David Méquiès au 07.45.17.41.29 pour vérifier les disponibilités.

## 3. Forfait Chanteur + Pianiste + Violoniste + Saxophone — visible
- id `50c42ef2-dac1-4d58-875b-7eb07dfb6896` · slug principal `forfait-chanteur-pianiste-violoniste-saxophone`
- Anciens slugs : `pianiste-chanteur-violoniste-sax`, `forfait-à-trois`
- Tagline : « L'expérience musicale la plus complète pour votre cérémonie juive »
- Durée 120 min · prix « Sur demande » · approbation manuelle activée
- Description (INTÉGRALE) :
> La formule musicale ultime pour votre cérémonie juive : David Méquiès (chanteur de synagogue et pianiste) avec un violoniste et un saxophoniste professionnels. Ensemble de 3 musiciens pour une houppa, un bar-mitsva ou un gala communautaire d'exception. Répertoire liturgique ashkénaze et sépharade, chants traditionnels et musique israélienne contemporaine. Basé à Paris, disponible dans toute la France. Tarif sur devis.

## 4. Consultation gratuite — Houppa / Bar-Mitsva — ⚠️ actuellement MASQUÉ (`hidden: true`)
- id `a89d42ca-7989-475d-97db-cf2e79d446a8` · slug principal `consultation-gratuite-houppa-bar-mitsva`
- Ancien slug : `rdv-téléphonique`
- Tagline : « Discutez de votre projet avec David Méquiès »
- Durée 15 min · gratuit · lieu « Par téléphone ou Visio »
- Description (INTÉGRALE) :
> Réservez un appel téléphonique gratuit de 20 minutes avec David Méquiès pour discuter de votre cérémonie juive : houppa, bar-mitsva, bat-mitsva ou office de synagogue. David répondra à toutes vos questions sur le programme musical, les chants, les formules disponibles et les disponibilités. Sans engagement. Appelez aussi directement au 07.45.17.41.29.
- Note : la description dit « 20 minutes » mais la durée paramétrée est 15 min — harmoniser (sans réécrire le reste).

## 5. Répétition — masqué (à laisser masqué, conforme au brief)
- id `0403b3a7-3cb4-448d-b30d-95ab808de835` · slug `répétition` · 60 min · « Sur demande »
- Lieu : 15 allée Robert Estienne, 93320 Les Pavillons-sous-Bois

## Paramètres communs
- Politique par défaut : annulation/report autorisés jusqu'à 24 h avant, 1 participant max.
- Catégorie : « Forfaits ». Staff : 1 membre (David).
- Adresse business du brief pour le nouveau site : 61 rue de Lyon, 75012 Paris (l'ancienne adresse des Pavillons-sous-Bois apparaît encore sur « Répétition »).
