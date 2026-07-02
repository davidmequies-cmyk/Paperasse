# JSON-LD & balises head — blocs à réinjecter (custom embeds)

> Le brief impose de **réinjecter les custom embeds JSON-LD existants** du site actuel. Ils ne sont pas lisibles par API : la session éditeur doit les **recopier depuis le site actuel** (Paramètres → Custom Code, ou view-source des pages live) AVANT toute reconstruction, et les coller ici pour archivage.
> ⛔ Ne PAS réactiver l'ancien bloc global « Open Graph + Twitter Card » (il écrasait les descriptions par page).
> Les gabarits ci-dessous servent de **filet de secours** si un bloc existant est introuvable — à compléter avec les textes réels, jamais avec des données inventées.

## 1. LocalBusiness + Person (toutes pages)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.chanteursynagogue.art/#business",
      "name": "David Méquiès — Chanteur de synagogue et pianiste",
      "url": "https://www.chanteursynagogue.art/",
      "telephone": "+33745174129",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "61 rue de Lyon",
        "postalCode": "75012",
        "addressLocality": "Paris",
        "addressCountry": "FR"
      },
      "areaServed": ["Paris", "Île-de-France", "France"],
      "parentOrganization": {
        "@type": "Organization",
        "name": "Neshama Music",
        "identifier": "Licence spectacle PLATESV-R-2021-012818"
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.chanteursynagogue.art/#person",
      "name": "David Méquiès",
      "jobTitle": "Chanteur de synagogue et pianiste",
      "worksFor": { "@id": "https://www.chanteursynagogue.art/#business" },
      "knowsAbout": ["Houppa", "Bar-Mitsva", "Bat-Mitsva", "Offices de synagogue", "Répertoire ashkénaze", "Répertoire sépharade"],
      "sameAs": [
        "«URL fiche Google Business Profile»",
        "«URL YouTube»",
        "«URL Mariages.net»",
        "«URL Zankyou»"
      ]
    }
  ]
}
```
(`sameAs` : remplacer par les URLs réelles — GBP, YouTube, réseaux, annuaires. Ne rien laisser entre «».)

## 2. FAQPage (12 questions — RÉCUPÉRER le bloc existant du site live tel quel)
Le bloc actuel contient 12 Q/R validées : le recopier intégralement. Les FAQ affichées en HTML sur les pages doivent correspondre au schema (cohérence obligatoire).

## 3. WebSite / WebPage / BreadcrumbList
Recopier l'existant. Sinon gabarit : WebSite (name + url) ; par page, WebPage (name = title de la page, url) + BreadcrumbList Accueil → page.

## 4. ItemList des 4 services
Recopier l'existant. Les 4 services = les 3 forfaits + consultation gratuite (noms/URLs exacts dans `donnees-live/bookings-services.md`).

## 5. Meta SEO local Paris (geo, ICBM, robots)
Recopier depuis le site actuel (view-source de l'accueil), notamment : `geo.region`, `geo.placename`, `geo.position`, `ICBM`, `robots`.

## 6. Conversion Google Ads (page Contact)
Recopier l'extrait de code de l'événement de conversion depuis le site actuel (Custom Code) et le réinstaller sur /contact uniquement, à l'identique.

## 7. robots.txt
Autoriser explicitement : GPTBot, PerplexityBot, Google-Extended, ClaudeBot (ne pas les bloquer). Sitemap déclaré. 404 réelles (pas de partial route match).
