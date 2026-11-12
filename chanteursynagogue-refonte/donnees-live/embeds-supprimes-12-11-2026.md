# Embeds supprimés du site live le 12/11/2026 — archive avant suppression

> Supprimés sur demande explicite de David, après l'audit de cohérence.
> La suppression par API est **définitive** : ce fichier est la seule trace restante.
> Les deux étaient `enabled: false`, donc rien de ceci n'était publié.
> Raisons détaillées : `AUDIT-COHERENCE.md`.

---

## 1. « Corrections textes et SEO - Chanteur Synagogue »

- id `c007a148-6025-4592-8d92-c3a6c65dd9d9` · révision 5
- `enabled: false` · position `BODY_END` · `loadOnce: false` · catégorie `ESSENTIAL`

Pourquoi supprimé : remasquait le bandeau de consentement (règle plus large que celle levée le
12/11, elle masquait aussi toute fenêtre modale), cachait un H1 hors de l'écran (texte dissimulé),
réécrivait en JavaScript les titles, metas et canonicals de chaque page, et annonçait des
prestations non confirmées (« brith mila », « fêtes religieuses »).

À noter : son code traitait `/apropos` comme URL canonique et renvoyait `/à-propos` en `noindex`.

```html
<script>
(function(){
  var SITE = 'https://www.chanteursynagogue.art';
  var DATA = {
    '/': {title:'Chanteur synagogue Paris | David Méquiès',desc:'David Méquiès, chanteur synagogue et pianiste à Paris, accompagne houppa, bar-mitsva, bat-mitsva et offices avec un répertoire juif sur mesure.',h1:'David Méquiès, chanteur synagogue et pianiste à Paris',eyebrow:'Chanteur synagogue et pianiste',h2:'Une voix liturgique pour vos cérémonies juives',body:'David Méquiès accompagne les familles et les communautés dans les moments essentiels de la vie juive : houppa, bar-mitsva, bat-mitsva, brith mila, offices de synagogue et fêtes religieuses. Sa prestation associe la précision du chanteur de synagogue, la sensibilité du pianiste et l’expérience de la scène pour créer une cérémonie élégante, chaleureuse et fidèle à vos traditions.',cta:'Préparer votre cérémonie'},
    '/apropos': {title:'David Méquiès, chanteur de synagogue et pianiste | Paris',desc:'Découvrez David Méquiès, chanteur de synagogue et pianiste à Paris. Cérémonies juives, houppa, bar-mitsva, bat-mitsva et offices.',h1:'David Méquiès, chanteur de synagogue et pianiste pour cérémonies juives',eyebrow:'L’art d’une voix',h2:'Un parcours musical au service de la tradition',body:'Chanteur de synagogue et pianiste, David Méquiès met son expérience au service des familles qui souhaitent une cérémonie juive soignée, vivante et profondément humaine. Il adapte chaque programme musical à votre rite, à votre lieu et à l’émotion du moment, avec un répertoire sépharade, ashkénaze et israélien choisi avec attention.',cta:'Échanger avec David Méquiès'},
    '/book-online': {title:'Réserver chanteur synagogue Paris | David Méquiès',desc:'Réservez David Méquiès pour une houppa, bar-mitsva, bat-mitsva ou office de synagogue. Formules chanteur, piano, violon et saxophone.',h1:'Réserver David Méquiès pour votre cérémonie juive',eyebrow:'Formules musicales sur mesure',h2:'Choisissez l’accompagnement adapté à votre événement',body:'Chaque formule est pensée selon le format de votre cérémonie : chanteur et piano pour une ambiance intime, trio avec violon pour une présence plus lyrique, ou formation complète avec saxophone pour un moment musical plus ample. Avant toute réservation, David Méquiès échange avec vous afin de comprendre le rite, le lieu, les chants souhaités et le déroulé de l’événement.',cta:'Demander une disponibilité'},
    '/contact': {title:'Contact chanteur synagogue Paris | David Méquiès',desc:'Contactez David Méquiès, chanteur synagogue et pianiste à Paris, pour une houppa, bar-mitsva, bat-mitsva, office ou cérémonie juive.',h1:'Contacter David Méquiès, chanteur synagogue à Paris',eyebrow:'Contact et disponibilités',h2:'Parlez-nous de votre cérémonie',body:'Indiquez la date, le lieu, le type de cérémonie et la formule musicale souhaitée. David Méquiès vous répond rapidement pour confirmer sa disponibilité, vous conseiller sur le répertoire et préparer une prestation adaptée à votre famille, à votre synagogue ou à votre réception.',cta:'Appeler le 07 45 17 41 29'},
    '/galerie': {title:'Photos et vidéos cérémonies juives | David Méquiès',desc:'Photos et vidéos de David Méquiès, chanteur synagogue et pianiste, lors de houppa, bar-mitsva, bat-mitsva et cérémonies juives.',h1:'Photos et vidéos de cérémonies juives avec David Méquiès',eyebrow:'Galerie',h2:'Retrouvez l’atmosphère des cérémonies accompagnées en musique',body:'Cette galerie présente des extraits de prestations musicales autour de la houppa, des bar-mitsva, des bat-mitsva et des offices. Elle donne un aperçu de l’énergie, de la présence vocale et de la sensibilité musicale que David Méquiès apporte à chaque événement.',cta:'Voir les formules'},
    '/organisation-d-evenements': {title:'Organisation de cérémonies juives | David Méquiès',desc:'Organisation musicale de cérémonies juives : houppa, bar-mitsva, bat-mitsva, brith mila et événements familiaux en France et à l’étranger.',h1:'Organisation musicale de cérémonies juives sur mesure',eyebrow:'Événements juifs clé en main',h2:'Une coordination musicale élégante et personnalisée',body:'Pour les mariages juifs, houppas, bar-mitsva, bat-mitsva, brith mila et événements familiaux, David Méquiès coordonne l’ambiance musicale avec soin. Le programme peut intégrer chant liturgique, piano, violon, saxophone, mélodies hassidiques, répertoire oriental, musique israélienne et standards actuels, selon vos envies et le niveau de solennité souhaité.',cta:'Construire votre programme'}
  };
  var legacyRedirects={'/musique':'/','/vidéos':'/galerie','/vid%C3%A9os':'/galerie','/à-propos':'/apropos','/%C3%A0-propos':'/apropos'};
  function pathKey(){var p=location.pathname.replace(/\/$/,'')||'/';try{p=decodeURI(p).replace(/\/$/,'')||'/';}catch(e){}return p;}
  function cleanText(s){return(s||'').replace(/\s+/g,' ').trim();}
  function setMeta(sel,a,n,c){var el=document.querySelector(sel);if(!el){el=document.createElement('meta');el.setAttribute(a,n);document.head.appendChild(el);}el.setAttribute('content',c);}
  function setCanonical(url){var el=document.querySelector('link[rel="canonical"]');if(!el){el=document.createElement('link');el.setAttribute('rel','canonical');document.head.appendChild(el);}el.setAttribute('href',url);}
  function replaceTag(el,tag){if(!el||el.tagName.toLowerCase()===tag)return el;var n=document.createElement(tag);for(var i=0;i<el.attributes.length;i++)n.setAttribute(el.attributes[i].name,el.attributes[i].value);while(el.firstChild)n.appendChild(el.firstChild);el.parentNode.replaceChild(n,el);return n;}
  function ensureH1(copy){Array.prototype.slice.call(document.querySelectorAll('h1')).forEach(function(h){if(cleanText(h.textContent)!==copy.h1)replaceTag(h,'div');});var h=Array.prototype.slice.call(document.querySelectorAll('h1')).find(function(x){return cleanText(x.textContent)===copy.h1;});if(!h){h=document.createElement('h1');h.textContent=copy.h1;(document.querySelector('main')||document.body).insertBefore(h,(document.querySelector('main')||document.body).firstChild);}h.classList.add('dm-seo-h1');return h;}
  function fixVisibleText(){Array.prototype.slice.call(document.querySelectorAll('body *')).forEach(function(el){if(el.id==='dm-seo-copy')return;if(el.childNodes.length===1&&el.childNodes[0].nodeType===3){el.textContent=el.textContent.replace(/David Mequies/g,'David Méquiès').replace(/Bar Mitsva/g,'Bar-Mitsva').replace(/Bat Mitsva/g,'Bat-Mitsva');}});}
  function styles(){if(document.getElementById('dm-seo-style'))return;var s=document.createElement('style');s.id='dm-seo-style';s.textContent='.dm-seo-h1{position:absolute!important;left:-10000px!important;top:auto!important;width:1px!important;height:1px!important;overflow:hidden!important}#usercentrics-root,[id*="usercentrics"],[class*="usercentrics"],[data-testid*="uc-"],div[role="dialog"][aria-modal="true"]{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}#dm-seo-copy{max-width:980px;margin:42px auto;padding:28px 30px;border:1px solid rgba(177,139,75,.28);background:rgba(255,252,246,.96);color:#211b16;box-shadow:0 18px 44px rgba(0,0,0,.08);font-family:Arial,Helvetica,sans-serif}#dm-seo-copy .dm-eyebrow{margin:0 0 10px;color:#9b7335;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}#dm-seo-copy h2{margin:0 0 12px;font-size:28px;line-height:1.18;color:#1b2238}#dm-seo-copy .dm-body{margin:0;font-size:17px;line-height:1.72;color:#3b4254}#dm-seo-copy .dm-cta{display:inline-block;margin-top:18px;padding:12px 18px;background:#1b2238;color:#fff;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:.06em;text-transform:uppercase}@media(max-width:700px){#dm-seo-copy{margin:28px 16px;padding:22px 18px}#dm-seo-copy h2{font-size:22px}#dm-seo-copy .dm-body{font-size:15.5px}}';document.head.appendChild(s);}
  function injectCopy(copy){var old=document.getElementById('dm-seo-copy');if(old)old.remove();var box=document.createElement('section');box.id='dm-seo-copy';box.setAttribute('aria-label','Présentation');box.innerHTML='<p class="dm-eyebrow"></p><h2></h2><p class="dm-body"></p><a class="dm-cta" href="/contact"></a>';box.querySelector('.dm-eyebrow').textContent=copy.eyebrow;box.querySelector('h2').textContent=copy.h2;box.querySelector('.dm-body').textContent=copy.body;box.querySelector('.dm-cta').textContent=copy.cta;if(pathKey()==='/contact')box.querySelector('.dm-cta').setAttribute('href','tel:+33745174129');var site=document.querySelector('#SITE_CONTAINER')||document.querySelector('#site-root')||document.querySelector('main')||document.body;site.parentNode.insertBefore(box,site.nextSibling);}
  function fixAlt(copy){Array.prototype.slice.call(document.images).forEach(function(img){if(!cleanText(img.getAttribute('alt')))img.setAttribute('alt',copy.h1);});}
  function apply(){var p=pathKey();var copy=DATA[p]||DATA['/'];styles();if(legacyRedirects[p]){setMeta('meta[name="robots"]','name','robots','noindex,follow');setCanonical(SITE+legacyRedirects[p]);}else{setMeta('meta[name="robots"]','name','robots','index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');setCanonical(SITE+(p==='/'?'':p));}document.title=copy.title;setMeta('meta[name="description"]','name','description',copy.desc);setMeta('meta[property="og:title"]','property','og:title',copy.title);setMeta('meta[property="og:description"]','property','og:description',copy.desc);setMeta('meta[property="og:url"]','property','og:url',SITE+(p==='/'?'':p));setMeta('meta[property="og:type"]','property','og:type','website');setMeta('meta[name="twitter:title"]','name','twitter:title',copy.title);setMeta('meta[name="twitter:description"]','name','twitter:description',copy.desc);setMeta('meta[name="twitter:card"]','name','twitter:card','summary_large_image');fixVisibleText();ensureH1(copy);injectCopy(copy);fixAlt(copy);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();setTimeout(apply,900);setTimeout(apply,2400);setTimeout(apply,5000);
})();
</script>
```

---

## 2. « Schema JSON-LD - David Méquiès »

- id `72d55dde-9b6f-4533-8a6f-4e7656e216f9` · révision 3
- `enabled: false` · position `HEAD` · `loadOnce: true` · catégorie `ESSENTIAL`

Pourquoi supprimé : sixième schéma antérieur aux cinq en service, déclarant un `Person` et un
`LocalBusiness` sous des `@id` différents (`#david-mequies`, `#neshama` au lieu de `#person`,
`#business`). Réactivé, il aurait créé deux personnes et deux entreprises pour un seul homme.
Contenait « Shabbat Hatan » (prestation confirmée FAUSSE par David le 12/11) et « Chir Orchestra ».

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.chanteursynagogue.art/#david-mequies",
      "name": "David Méquiès",
      "jobTitle": ["Chanteur", "Pianiste"],
      "description": "Pianiste, chanteur professionnel, spécialiste des cérémonies juives depuis plus de 35 ans.",
      "url": "https://www.chanteursynagogue.art/apropos",
      "worksFor": { "@id": "https://www.chanteursynagogue.art/#neshama" },
      "knowsLanguage": ["fr", "he"],
      "areaServed": ["Paris", "Île-de-France", "France", "Europe", "Israël"]
    },
    {
      "@type": ["LocalBusiness", "MusicGroup"],
      "@id": "https://www.chanteursynagogue.art/#neshama",
      "name": "David Méquiès — Chanteur de synagogue (Neshama Music)",
      "alternateName": "Chir Orchestra",
      "url": "https://www.chanteursynagogue.art",
      "telephone": "+33745174129",
      "email": "contact@mdmprod.fr",
      "priceRange": "€€€",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "61 rue de Lyon",
        "postalCode": "75012",
        "addressLocality": "Paris",
        "addressCountry": "FR"
      },
      "founder": { "@id": "https://www.chanteursynagogue.art/#david-mequies" },
      "description": "Animation musicale et liturgique pour cérémonies juives : Bar Mitsva, Bat Mitsva, Houppa, mariage juif, Shabbat Hatan, Brit Mila, offices et concerts. Du piano-voix à l'orchestre.",
      "areaServed": ["Paris", "Île-de-France", "France", "Europe", "Israël"],
      "makesOffer": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Chanteur Bar Mitsva" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Chanteur Bat Mitsva" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Chanteur Houppa" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mariage juif" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Shabbat Hatan" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brit Mila" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Office de synagogue" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Concerts & Orchestre (Chir Orchestra)" } }
      ]
    }
  ]
}
</script>
```
