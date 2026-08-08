/* ============================================================================
   Tower · onglet « Prud'hommes »
   Poste de travail du conseiller prud'homme (CPH de Paris, Encadrement Ch. 8).

   PRINCIPE DE CONCEPTION — à ne pas transgresser en faisant évoluer ce fichier :
   cet outil ne connaît AUCUN chiffre de droit et n'en invente aucun.
   Les durées de prescription reprises ici viennent des fiches du dépôt
   (prudhommes/03), avec leur article et leur lien : elles restent à vérifier
   à la source. Tout montant légal (fourchettes du barème L1235-3, fractions de
   l'indemnité légale…) est SAISI par le conseiller après lecture sur Légifrance ;
   l'outil se contente de calculer et de mémoriser cette saisie vérifiée.

   Secret du délibéré : tout reste dans le navigateur (localStorage), rien ne part
   sur le réseau. Ne jamais saisir de nom de partie ni le sens d'un vote.
   ============================================================================ */
(function () {
  var T = window.TOWER;
  var store = T.store('prudhommes.v1');
  var esc = T.esc;

  /* ------------------------------------------------------------------ état */
  var DEFAULT = {
    section: 'audience',
    audience: { date: '', formation: 'bj', chambre: 'Encadrement — Ch. 8', rg: '', prep: {} },
    presc: { type: 'rupture', depart: '', saisine: '' },
    delib: { etapes: {}, cloture: {} },
    chiffrage: {
      entree: '', rupture: '', brut12: '', brut3: '', prime: '',
      base: 'm12', baseManuelle: '',
      petite: false, bmin: '', bmax: '', verifieLe: '',
      nul: false, dissimule: ''
    },
    bareme: {},            // table personnelle vérifiée : "8|0" -> {min,max,date}
    chefs: [],
    dispositif: { interets: 'legal', execProv: 'droit', art700: '', art700Qui: 'defendeur', depens: 'defendeur' },
    notes: ''
  };

  var S = merge(DEFAULT, store.read({}));

  function merge(base, over) {
    var out = JSON.parse(JSON.stringify(base));
    Object.keys(over || {}).forEach(function (k) {
      if (out[k] && typeof out[k] === 'object' && !Array.isArray(out[k]) &&
          over[k] && typeof over[k] === 'object' && !Array.isArray(over[k])) {
        out[k] = merge(out[k], over[k]);
      } else if (over[k] !== undefined) {
        out[k] = over[k];
      }
    });
    return out;
  }
  function save() { store.write(S); }
  function get(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, S);
  }
  function set(path, val) {
    var ks = path.split('.'), last = ks.pop();
    var o = ks.reduce(function (a, k) { if (a[k] == null) a[k] = {}; return a[k]; }, S);
    o[last] = val; save();
  }

  /* -------------------------------------------------------------- helpers */
  function d(s) { if (!s) return null; var x = new Date(s + 'T00:00:00'); return isNaN(x.getTime()) ? null : x; }
  function fmtD(x) { return x ? x.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'; }
  function addMonths(x, n) {
    var y = x.getFullYear(), m = x.getMonth(), day = x.getDate();
    var t = new Date(y, m + n, 1);
    var lastDay = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
    t.setDate(Math.min(day, lastDay));
    return t;
  }
  function days(a, b) { return Math.round((b - a) / 86400000); }
  function eur(n) {
    if (!isFinite(n)) return '—';
    return n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });
  }
  function num(v) { var n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : NaN; }
  function anciennete(a, b) {
    if (!a || !b || b < a) return null;
    var m = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
    if (b.getDate() < a.getDate()) m--;
    return { annees: Math.floor(m / 12), mois: m % 12, totalMois: m };
  }
  function today() { return new Date().toISOString().slice(0, 10); }

  /* --------------------------------------------------------------- données
     Reprises telles quelles des fiches du dépôt (prudhommes/01, 03, 04),
     avec leur article et leur lien Légifrance : à vérifier à la date des faits. */
  var PRESCRIPTIONS = [
    { id: 'execution', label: "Exécution du contrat de travail", mois: 24, duree: '2 ans',
      depart: "jour où le demandeur a connu ou aurait dû connaître les faits",
      art: 'L1471-1', lien: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036762126' },
    { id: 'rupture', label: "Rupture du contrat (contester un licenciement)", mois: 12, duree: '12 mois',
      depart: "notification de la rupture",
      art: 'L1471-1', lien: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036762126' },
    { id: 'salaire', label: "Salaires, rappels de salaire, heures supplémentaires", mois: 36, duree: '3 ans',
      depart: "jour où le demandeur a connu ou aurait dû connaître les faits (porte sur les 3 dernières années, ou les 3 ans précédant la rupture)",
      art: 'L3245-1', lien: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000027566295' },
    { id: 'discrimination', label: "Discrimination", mois: 60, duree: '5 ans',
      depart: "révélation de la discrimination",
      art: 'L1134-5', lien: 'https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072050' },
    { id: 'harcelement', label: "Harcèlement moral ou sexuel (réparation du préjudice)", mois: 60, duree: '5 ans',
      depart: "révélation : jour où le salarié a connu l'ensemble des faits permettant de se dire victime (souvent le dernier acte allégué)",
      art: '2224 code civil', lien: 'https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006070721',
      reserve: "Exclu des délais courts de L1471-1. Pour une demande de <b>nullité de la rupture</b> fondée sur le harcèlement, la durée dépend de la nature exacte de la demande — voir Cass. soc., 4 sept. 2024, n° 22-22.860. Régime distinct si la demande répare un <b>dommage corporel</b> (art. 2226 C. civ.). <b>Qualifier la demande avant de retenir un délai.</b>" }
  ];

  var PREP = [
    "Lire la requête et les dernières conclusions de chaque partie",
    "Lister chaque chef de demande, séparément et chiffré",
    "Vérifier la compétence du CPH (L1411-1)",
    "Vérifier la prescription de chaque chef de demande",
    "Identifier la convention collective applicable (IDCC) et la lire sur le point litigieux",
    "Numéroter les pièces, repérer celles qui ne sont pas contestées",
    "Relire la fiche de fond du dépôt correspondant au litige",
    "Vérifier l'absence de tout lien créant un doute légitime → se déporter le cas échéant (L1442-11)"
  ];

  var FORMATIONS = {
    bco: { nom: "Bureau de conciliation et d'orientation (BCO)", compo: "1 conseiller salarié + 1 conseiller employeur",
      mission: "Entendre les parties et s'efforcer de les concilier (R1454-7 et s.). Peut ordonner des mesures (remise de documents, provisions) et orienter l'affaire vers la bonne formation. Conciliation totale → procès-verbal, l'affaire s'arrête (indemnité forfaitaire de conciliation selon barème lié à l'ancienneté, D1235-21 — montants à vérifier). Échec → renvoi au bureau de jugement." },
    bj: { nom: "Bureau de jugement (BJ)", compo: "composition paritaire, en nombre égal (formation classique : 2 + 2)",
      mission: "Statue définitivement sur le fond. Déroulé : appel de la cause → plaidoiries et observations → clôture des débats → mise en délibéré → prononcé à la date annoncée. Décision prise au délibéré, à huis clos, à la majorité." },
    ref: { nom: "Formation de référé", compo: "1 conseiller salarié + 1 conseiller employeur",
      mission: "Urgence et évidence : mesures provisoires, absence de contestation sérieuse, trouble manifestement illicite ou dommage imminent. Rend une ordonnance exécutoire mais provisoire — ne tranche pas le fond." },
    dep: { nom: "Audience de départage", compo: "les conseillers + un juge du tribunal judiciaire (juge départiteur) qui préside",
      mission: "Saisie en cas de partage des voix (L1454-2, R1454-29 et s.). Tenue en principe dans le mois du renvoi. En cas de partage au BCO, renvoi devant le bureau de jugement présidé par le départiteur." }
  };

  var ETAPES = [
    ["Cadrer le litige", "Qui demande quoi à qui ? Lister chaque chef de demande séparément : fondement juridique, montant, pièce qui le soutient."],
    ["Vérifier la recevabilité avant le fond", "Compétence (L1411-1), prescription de chaque chef. Un chef prescrit ou irrecevable : on le dit, et on n'examine pas son fond."],
    ["Établir les faits à partir des pièces", "Ce qui est prouvé par une pièce ≠ ce qui est affirmé dans des conclusions. Confronter les versions, repérer les pièces non contestées."],
    ["Identifier la règle applicable à la date des faits", "Code du travail (version en vigueur) + convention collective + jurisprudence de la chambre sociale. Vérifier à la source, jamais de mémoire."],
    ["Placer la charge de la preuve", "Pour chaque demande : qui doit prouver quoi ? Appliquer la règle du doute quand elle existe (L1235-1 : le doute profite au salarié)."],
    ["Subsumer : appliquer la règle aux faits", "Syllogisme — règle, faits établis, conséquence. Demande par demande : une demande peut prospérer et la voisine échouer."],
    ["Chiffrer", "Salaire de référence, ancienneté, barèmes et planchers. Distinguer ce qui est dû de plein droit des dommages-intérêts appréciés. Ni ultra ni infra petita."],
    ["Décider et formuler le dispositif", "Chaque demande : accueillie / rejetée / partiellement accueillie, avec le montant. Puis intérêts, exécution provisoire, article 700, dépens."]
  ];

  var CLOTURE = [
    "Chaque chef de demande a une réponse (rien d'oublié)",
    "Recevabilité et prescription vérifiées",
    "Charge de la preuve correctement placée",
    "Règle de droit vérifiée à la source et à la bonne date",
    "Convention collective examinée",
    "Montants recalculés, ni ultra ni infra petita",
    "Intérêts, exécution provisoire, article 700, dépens tranchés",
    "Motivation suffisante pour que le perdant comprenne pourquoi"
  ];

  var PREUVE = [
    ["Cause réelle et sérieuse du licenciement",
      "La charge ne pèse sur aucune partie en particulier : le juge forme sa conviction au vu des éléments fournis par les deux. <b>Si un doute subsiste, il profite au salarié.</b>", "L1235-1"],
    ["Licenciement pour faute grave", "C'est à l'<b>employeur</b> de prouver la faute grave, dont il se prévaut.", "jurisprudence ch. soc."],
    ["Heures supplémentaires", "Charge <b>partagée</b> : le salarié présente des éléments suffisamment précis ; l'employeur répond en produisant ses propres éléments — il lui incombe d'assurer le décompte du temps de travail.", "L3171-4"],
    ["Discrimination", "Le salarié présente des éléments laissant <b>supposer</b> une discrimination ; l'employeur prouve que sa décision repose sur des éléments objectifs étrangers à toute discrimination.", "L1134-1"],
    ["Harcèlement moral ou sexuel", "Mécanisme allégé comparable : le salarié présente des éléments ; l'employeur prouve l'absence de harcèlement ou la justification objective.", "L1154-1"]
  ];

  var SOURCES = [
    ["Légifrance — le droit en vigueur", "https://www.legifrance.gouv.fr", "Toujours lire la version « en vigueur » à la date du litige."],
    ["Code du travail (texte intégral)", "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072050", "L = loi · R = décret en Conseil d'État · D = décret simple."],
    ["Cour de cassation — chambre sociale", "https://www.courdecassation.fr", "L'interprétation qui fait autorité."],
    ["Justice.fr — le conseil de prud'hommes", "https://www.justice.fr/themes/cph", "La procédure expliquée par le ministère."],
    ["Service-public.fr", "https://www.service-public.fr", "Cadrer une notion avant d'aller lire l'article exact."],
    ["Code du travail numérique — conventions collectives", "https://code.travail.gouv.fr", "Un litige se tranche très souvent sur la convention collective applicable."]
  ];

  var ARTICLES = [
    ["Compétence du CPH", "L1411-1 et s.", "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072050"],
    ["Statut et déontologie du conseiller", "L1442-1 à L1442-19", "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006177897/"],
    ["Procédure (partie législative)", "L1451-1 à L1457-1", "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006160722/"],
    ["Procédure (partie réglementaire)", "R1451-1 à R1457-2", "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000018484833/"],
    ["Conciliation et jugement", "R1454-1 à R1454-32", "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000018484875/"],
    ["Sanctions du licenciement / barème", "L1235-1 à L1235-17", "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006177861/"],
    ["Barème d'indemnisation", "L1235-3", "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036762052"],
    ["Licenciement nul — plancher 6 mois", "L1235-3-1", "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036762026"],
    ["Prescriptions", "L1471-1", "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036762126"],
    ["Prescription des salaires", "L3245-1", "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000027566295"]
  ];

  var SENS = {
    '': '— à trancher —',
    accueilli: 'Accueilli',
    partiel: 'Partiellement accueilli',
    rejete: 'Rejeté (débouté)',
    prescrit: 'Irrecevable / prescrit'
  };

  /* ------------------------------------------------------------- rendu */
  var SECTIONS = [
    ['audience', '📋 Audience'],
    ['recevabilite', '⏳ Recevabilité'],
    ['preuve', '⚖️ Charge de la preuve'],
    ['delibere', '🧭 Délibéré'],
    ['chiffrage', '🧮 Chiffrage'],
    ['redaction', '✍️ Rédaction'],
    ['sources', '🔗 Sources'],
    ['flamme', '🔥 Garder la flamme']
  ];

  var root;

  function render(el) {
    root = el;
    el.innerHTML =
      '<div class="wrap">' +
        banner() +
        '<div class="btns no-print" id="ph-nav" style="margin:0 0 18px">' +
          SECTIONS.map(function (s) {
            return '<button type="button" class="btn' + (S.section === s[0] ? ' primary' : '') +
              '" data-sec="' + s[0] + '">' + esc(s[1]) + '</button>';
          }).join('') +
        '</div>' +
        '<div id="ph-body"></div>' +
      '</div>';

    el.querySelector('#ph-nav').addEventListener('click', function (e) {
      var b = e.target.closest('[data-sec]');
      if (!b) return;
      S.section = b.getAttribute('data-sec'); save();
      render(el);
    });

    /* Les écouteurs sont posés une seule fois sur le conteneur : body() ne
       remplace que son contenu, jamais le conteneur lui-même. */
    bind(el.querySelector('#ph-body'));
    body();
  }

  function banner() {
    return '<div class="note warn no-print" style="margin-top:18px">' +
      '<b>Secret du délibéré.</b> Tout ce que vous saisissez reste dans ce navigateur, ' +
      'sur cet ordinateur — rien n\'est envoyé nulle part. N\'y écrivez malgré tout ' +
      '<b>aucun nom de partie</b>, aucune pièce du dossier, et jamais le sens d\'un vote. ' +
      'Cet outil aide à la <i>méthode</i> et au <i>calcul</i> ; il ne décide pas.' +
      '<div class="btns"><button type="button" class="btn danger" id="ph-reset">Effacer toute la session</button>' +
      '<span class="muted" style="align-self:center">Réflexe fin de session : effacer.</span></div></div>';
  }

  function body() {
    var host = root.querySelector('#ph-body');
    host.innerHTML = ({
      audience: secAudience, recevabilite: secRecevabilite, preuve: secPreuve,
      delibere: secDelibere, chiffrage: secChiffrage, redaction: secRedaction,
      sources: secSources, flamme: secFlamme
    }[S.section] || secAudience)();

    refresh();

    var reset = root.querySelector('#ph-reset');
    if (reset) reset.onclick = function () {
      if (!confirm('Effacer toutes les saisies de l\'onglet Prud\'hommes (y compris votre table de barème vérifiée) ?')) return;
      store.clear();
      S = merge(DEFAULT, {});
      render(root);
    };
  }

  /* Liaison générique : tout élément [data-path] écrit dans l'état. */
  function bind(host) {
    host.addEventListener('input', onChange);
    host.addEventListener('change', onChange);
    host.addEventListener('click', onClick);
  }

  function onChange(e) {
    var el = e.target.closest('[data-path]');
    if (!el) return;
    var v = el.type === 'checkbox' ? el.checked : el.value;
    set(el.getAttribute('data-path'), v);
    if (el.getAttribute('data-rerender') === '1') { body(); return; }
    refresh();
  }

  function onClick(e) {
    var b = e.target.closest('[data-act]');
    if (!b) return;
    var act = b.getAttribute('data-act');

    if (act === 'chef-add') {
      S.chefs.push({ id: 'c' + Date.now(), intitule: '', fondement: '', demande: '', sens: '',
                     retenu: '', pieces: '', motif: '' });
      save(); body();
    } else if (act === 'chef-del') {
      var i = +b.getAttribute('data-i');
      if (confirm('Supprimer ce chef de demande ?')) { S.chefs.splice(i, 1); save(); body(); }
    } else if (act === 'bareme-save') {
      baremeSave(); body();
    } else if (act === 'bareme-load') {
      var k = b.getAttribute('data-key'), r = S.bareme[k];
      if (r) { S.chiffrage.bmin = r.min; S.chiffrage.bmax = r.max; S.chiffrage.verifieLe = r.date; save(); body(); }
    } else if (act === 'copy-trame') {
      T.copy(trame(), b);
    } else if (act === 'print') {
      window.print();
    }
  }

  /* Recalcule uniquement les zones de résultat de la section affichée. */
  function refresh() {
    var f = { recevabilite: calcPresc, chiffrage: calcChiffrage, redaction: calcRedaction,
              audience: calcAudience, delibere: calcDelibere }[S.section];
    if (f) f();
    root.querySelectorAll('.check').forEach(function (l) {
      var i = l.querySelector('input');
      if (i) l.classList.toggle('done', i.checked);
    });
  }

  /* ================================================================ 1. AUDIENCE */
  function secAudience() {
    var f = S.audience.formation;
    return '<div class="card">' +
      '<h2>La session</h2>' +
      '<p class="lead">Où l\'on est, dans quelle formation, et ce qui doit être fait avant de siéger.</p>' +
      '<div class="row">' +
        field('Date d\'audience', '<input type="date" data-path="audience.date" value="' + esc(S.audience.date) + '">') +
        field('Formation', select('audience.formation', f, [
          ['bco', 'BCO — conciliation et orientation'], ['bj', 'Bureau de jugement'],
          ['ref', 'Référé'], ['dep', 'Départage']], true)) +
        field('Chambre / section', '<input type="text" data-path="audience.chambre" value="' + esc(S.audience.chambre) + '">') +
        field('N° de RG <span class="muted">(numéro seul)</span>', '<input type="text" data-path="audience.rg" value="' + esc(S.audience.rg) + '" placeholder="ex. 26/01234">') +
      '</div>' +
      '<div class="note"><b>' + esc(FORMATIONS[f].nom) + '</b> — ' + esc(FORMATIONS[f].compo) + '.<br>' + esc(FORMATIONS[f].mission) + '</div>' +
      (f === 'bco' ? '<div class="note ok">Une conciliation réussie est souvent la meilleure issue pour les deux parties : rapide, négociée, sans aléa. Y consacrer une vraie énergie n\'est pas une formalité.</div>' : '') +
      (f === 'dep' ? '<div class="note ok">Le départage n\'est pas un échec : c\'est la garantie du paritarisme.</div>' : '') +
      '</div>' +

      '<div class="card">' +
      '<h2>Avant de siéger</h2>' +
      '<div id="ph-prep-kpi"></div>' +
      '<ul class="clean">' + PREP.map(function (t, i) {
        return '<li><label class="check"><input type="checkbox" data-path="audience.prep.p' + i + '"' +
          (S.audience.prep['p' + i] ? ' checked' : '') + '><span>' + esc(t) + '</span></label></li>';
      }).join('') + '</ul>' +
      '<div class="note warn"><b>Déport.</b> Si un lien — parenté, intérêt, relation d\'affaires, ancien employeur — crée un doute légitime sur votre impartialité dans une affaire précise, vous devez vous retirer du dossier (L1442-11). Mieux vaut se déporter que fragiliser une décision.</div>' +
      '</div>' +

      '<div class="card">' +
      '<h2>Le serment, en trois mots</h2>' +
      '<p class="lead" style="font-style:italic">« Je jure de remplir mes devoirs avec zèle et intégrité et de garder le secret des délibérations. » — art. L1442-13</p>' +
      '<table><tbody>' +
      '<tr><td><b>Zèle</b></td><td>Préparer les dossiers, siéger, ne pas se défausser.</td></tr>' +
      '<tr><td><b>Intégrité</b></td><td>Juger sans intérêt personnel, refuser tout cadeau, toute pression. Aucun mandat impératif : l\'organisation qui vous a porté ne décide pas à votre place (L1442-11).</td></tr>' +
      '<tr><td><b>Secret</b></td><td>Ce qui se dit au délibéré ne sort jamais de la salle. Pas d\'exception.</td></tr>' +
      '</tbody></table></div>';
  }

  function calcAudience() {
    var host = root.querySelector('#ph-prep-kpi');
    if (!host) return;
    var done = PREP.filter(function (_, i) { return S.audience.prep['p' + i]; }).length;
    var pct = Math.round(done / PREP.length * 100);
    host.innerHTML = '<div class="kpi"><div><div class="v">' + done + ' / ' + PREP.length + '</div><div class="l">points préparés</div></div>' +
      '<div><div class="v">' + pct + ' %</div><div class="l">' + (pct === 100 ? 'prêt à siéger' : 'en cours') + '</div></div></div>';
  }

  /* =========================================================== 2. RECEVABILITÉ */
  function secRecevabilite() {
    var p = PRESCRIPTIONS.filter(function (x) { return x.id === S.presc.type; })[0] || PRESCRIPTIONS[0];
    return '<div class="card">' +
      '<h2>Recevabilité — la prescription avant le fond</h2>' +
      '<p class="lead">Un dossier mêle souvent 12 mois, 2 ans, 3 ans et 5 ans selon les chefs de demande. On teste chaque chef séparément.</p>' +
      '<div class="row">' +
        field('Nature de la demande', select('presc.type', S.presc.type,
          PRESCRIPTIONS.map(function (x) { return [x.id, x.label + ' — ' + x.duree]; }), true)) +
        field('Point de départ du délai', '<input type="date" data-path="presc.depart" value="' + esc(S.presc.depart) + '">') +
        field('Date de saisine du CPH', '<input type="date" data-path="presc.saisine" value="' + esc(S.presc.saisine) + '">') +
      '</div>' +
      '<div class="note"><b>Délai : ' + esc(p.duree) + '</b> — ' + esc(p.art) +
        ' · <a href="' + esc(p.lien) + '" target="_blank" rel="noopener">vérifier sur Légifrance</a><br>' +
        '<b>Point de départ :</b> ' + esc(p.depart) + '</div>' +
      (p.reserve ? '<div class="note warn">' + p.reserve + '<br><a href="https://www.legifrance.gouv.fr/juri/id/JURITEXT000050192525/" target="_blank" rel="noopener">Cass. soc., 4 sept. 2024, n° 22-22.860</a></div>' : '') +
      '<div id="ph-presc-res"></div>' +
      '<div class="note warn"><b>Ce calcul est une aide, pas une réponse.</b> Il ne connaît ni les causes d\'<b>interruption</b> (art. 2240 et s. du code civil : reconnaissance, demande en justice…) ni de <b>suspension</b> du délai, ni les règles propres à certains chefs (report, délai butoir). Vérifier le texte en vigueur à la date des faits, et qualifier précisément la demande avant de retenir un délai.</div>' +
      '</div>' +

      '<div class="card"><h2>Les délais en un coup d\'œil</h2>' +
      '<table><thead><tr><th>Action</th><th>Délai</th><th>Point de départ</th><th>Texte</th></tr></thead><tbody>' +
      PRESCRIPTIONS.map(function (x) {
        return '<tr><td>' + esc(x.label) + '</td><td><b>' + esc(x.duree) + '</b></td><td class="muted">' + esc(x.depart) +
          '</td><td><a href="' + esc(x.lien) + '" target="_blank" rel="noopener">' + esc(x.art) + '</a></td></tr>';
      }).join('') +
      '</tbody></table>' +
      '<p class="muted" style="margin-top:12px">Source : fiche <span class="mono">prudhommes/03-procedure-prudhomale.md</span> du dépôt. Les fiches donnent les références ; le texte à jour se lit sur Légifrance.</p>' +
      '</div>';
  }

  function calcPresc() {
    var host = root.querySelector('#ph-presc-res');
    if (!host) return;
    var p = PRESCRIPTIONS.filter(function (x) { return x.id === S.presc.type; })[0];
    var dep = d(S.presc.depart), sai = d(S.presc.saisine);
    if (!p || !dep) { host.innerHTML = '<p class="muted">Renseignez le point de départ pour calculer la date butoir.</p>'; return; }
    var butoir = addMonths(dep, p.mois);
    var html = '<div class="kpi"><div><div class="v">' + fmtD(butoir) + '</div><div class="l">date butoir (' + esc(p.duree) + ')</div></div>';
    if (sai) {
      var reste = days(sai, butoir);
      var ok = sai <= butoir;
      html += '<div><div class="v" style="color:' + (ok ? 'var(--ok)' : 'var(--err)') + '">' + (ok ? 'Dans le délai' : 'Hors délai') + '</div>' +
        '<div class="l">saisine du ' + fmtD(sai) + '</div></div>' +
        '<div><div class="v">' + Math.abs(reste) + ' j</div><div class="l">' + (ok ? 'de marge' : 'de dépassement') + '</div></div>';
    }
    html += '</div>';
    if (sai) {
      html += sai <= butoir
        ? '<div class="note ok">Sous réserve de la qualification exacte de la demande et des causes d\'interruption ou de suspension, l\'action paraît <b>recevable</b> : saisine le ' + fmtD(sai) + ', butoir le ' + fmtD(butoir) + '.</div>'
        : '<div class="note err">L\'action paraît <b>prescrite</b> : le délai de ' + esc(p.duree) + ' courait du ' + fmtD(dep) + ' au ' + fmtD(butoir) + '. À examiner avant tout débat au fond — et à motiver comme tel dans le jugement.</div>';
    }
    host.innerHTML = html;
  }

  /* ================================================================ 3. PREUVE */
  function secPreuve() {
    return '<div class="card"><h2>Qui prouve quoi</h2>' +
      '<p class="lead">Le droit du travail répartit la preuve de façon spécifique. Se tromper de débiteur de la preuve, c\'est se tromper de jugement.</p>' +
      '<table><thead><tr><th>Question</th><th>Répartition</th><th>Texte</th></tr></thead><tbody>' +
      PREUVE.map(function (r) {
        return '<tr><td><b>' + esc(r[0]) + '</b></td><td>' + r[1] + '</td><td class="mono">' + esc(r[2]) + '</td></tr>';
      }).join('') + '</tbody></table>' +
      '<div class="note"><b>La règle à graver :</b> pour le bien-fondé du licenciement, <b>le doute profite au salarié</b> (L1235-1). Ce n\'est pas une faveur, c\'est la loi.</div>' +
      '</div>' +

      '<div class="card"><h2>Licenciement — grille de lecture</h2>' +
      '<table><tbody>' +
      '<tr><td><b>A. Procédure</b></td><td>Convocation à entretien préalable, entretien, notification motivée, délais. Une irrégularité de procédure n\'enlève pas nécessairement la cause réelle et sérieuse, mais peut donner lieu à indemnité (L1235-2).</td></tr>' +
      '<tr><td><b>B. Cause réelle et sérieuse</b></td><td><b>Réelle</b> = existante, exacte, objective (pas un prétexte). <b>Sérieuse</b> = assez grave pour justifier la rupture. Motif personnel (faute, insuffisance, inaptitude…) ou économique (L1233-3, périmètre strictement encadré).</td></tr>' +
      '<tr><td><b>C. Gravité de la faute</b></td><td>Faute simple → préavis et indemnité de licenciement dus. <b>Faute grave</b> → prive de préavis et d\'indemnité de licenciement. <b>Faute lourde</b> → faute grave + intention de nuire à l\'employeur.</td></tr>' +
      '<tr><td><b>D. Sans cause réelle et sérieuse</b></td><td>Indemnisation dans la fourchette de <b>L1235-3</b> selon l\'ancienneté (planchers spécifiques pour les entreprises de moins de onze salariés). <b>Licenciement nul</b> (discrimination, harcèlement, liberté fondamentale, maternité, lanceur d\'alerte…) → hors barème, plancher de 6 mois (L1235-3-1) et réintégration possible.</td></tr>' +
      '</tbody></table>' +
      '<div class="note warn">Toujours croiser avec la <b>convention collective</b> applicable (IDCC) : classification, préavis, indemnité conventionnelle, primes. Elle l\'emporte quand elle est plus favorable — <a href="https://code.travail.gouv.fr" target="_blank" rel="noopener">code.travail.gouv.fr</a></div>' +
      '</div>';
  }

  /* ============================================================== 4. DÉLIBÉRÉ */
  function secDelibere() {
    return '<div class="card"><h2>La grille en 8 temps</h2>' +
      '<p class="lead">Une décision juste n\'est pas une intuition habillée : c\'est un raisonnement traçable.</p>' +
      '<div id="ph-delib-kpi"></div>' +
      '<ul class="clean">' + ETAPES.map(function (e, i) {
        return '<li><label class="check"><input type="checkbox" data-path="delib.etapes.e' + i + '"' +
          (S.delib.etapes['e' + i] ? ' checked' : '') + '><span><b>' + (i + 1) + '. ' + esc(e[0]) + '</b><br>' +
          '<span class="muted">' + esc(e[1]) + '</span></span></label></li>';
      }).join('') + '</ul></div>' +

      '<div class="card"><h2>Trois biais à neutraliser</h2>' +
      '<table><thead><tr><th>Biais</th><th>Symptôme</th><th>Antidote</th></tr></thead><tbody>' +
      '<tr><td><b>Ancrage</b></td><td>La première impression colle à toute la lecture</td><td>Repartir des pièces, pas du ressenti d\'audience</td></tr>' +
      '<tr><td><b>Confirmation</b></td><td>On ne retient que ce qui conforte sa thèse</td><td>Chercher activement l\'élément qui contredit sa propre conviction</td></tr>' +
      '<tr><td><b>Camp</b></td><td>Réflexe « salarié contre employeur »</td><td>« Et si les rôles étaient inversés, jugerais-je pareil ? »</td></tr>' +
      '</tbody></table>' +
      '<div class="note">En formation paritaire, l\'objectif n\'est pas de gagner contre l\'autre collège mais de construire une décision solide. <b>Argumenter en droit</b> — texte + pièce — fait bouger les lignes ; une position de principe, non. Le désaccord d\'un collègue pointe souvent la faille du raisonnement.</div>' +
      '</div>' +

      '<div class="card"><h2>Checklist express avant de clore</h2>' +
      '<ul class="clean">' + CLOTURE.map(function (t, i) {
        return '<li><label class="check"><input type="checkbox" data-path="delib.cloture.c' + i + '"' +
          (S.delib.cloture['c' + i] ? ' checked' : '') + '><span>' + esc(t) + '</span></label></li>';
      }).join('') + '</ul>' +
      '<div id="ph-clot-kpi"></div></div>';
  }

  function calcDelibere() {
    var a = root.querySelector('#ph-delib-kpi'), b = root.querySelector('#ph-clot-kpi');
    if (a) {
      var n = ETAPES.filter(function (_, i) { return S.delib.etapes['e' + i]; }).length;
      a.innerHTML = '<div class="kpi"><div><div class="v">' + n + ' / 8</div><div class="l">temps parcourus</div></div></div>';
    }
    if (b) {
      var m = CLOTURE.filter(function (_, i) { return S.delib.cloture['c' + i]; }).length;
      b.innerHTML = m === CLOTURE.length
        ? '<div class="note ok">Les 8 vérifications sont faites. Le délibéré peut être clos.</div>'
        : '<div class="note warn">' + (CLOTURE.length - m) + ' vérification(s) restante(s) avant de clore.</div>';
    }
  }

  /* ============================================================== 5. CHIFFRAGE */
  function secChiffrage() {
    var c = S.chiffrage;
    var keys = Object.keys(S.bareme);
    return '<div class="card">' +
      '<h2>Bases de calcul</h2>' +
      '<p class="lead">Ancienneté et salaire de référence : tout le chiffrage en dépend.</p>' +
      '<div class="row">' +
        field('Entrée dans l\'entreprise', '<input type="date" data-path="chiffrage.entree" value="' + esc(c.entree) + '">') +
        field('Notification de la rupture', '<input type="date" data-path="chiffrage.rupture" value="' + esc(c.rupture) + '">') +
      '</div>' +
      '<div class="row" style="margin-top:12px">' +
        field('Brut des 12 derniers mois (€)', '<input type="number" step="0.01" min="0" data-path="chiffrage.brut12" value="' + esc(c.brut12) + '">') +
        field('Brut des 3 derniers mois (€)', '<input type="number" step="0.01" min="0" data-path="chiffrage.brut3" value="' + esc(c.brut3) + '">') +
        field('Prime annuelle (€) <span class="muted">au prorata</span>', '<input type="number" step="0.01" min="0" data-path="chiffrage.prime" value="' + esc(c.prime) + '">') +
        field('Base retenue pour les calculs', select('chiffrage.base', c.base, [
          ['m12', 'Moyenne des 12 derniers mois'], ['m3', 'Moyenne des 3 derniers mois (+ prime au prorata)'],
          ['manuel', 'Montant saisi à la main']], true)) +
      '</div>' +
      (c.base === 'manuel' ? '<div class="row" style="margin-top:12px">' +
        field('Salaire de référence retenu (€)', '<input type="number" step="0.01" min="0" data-path="chiffrage.baseManuelle" value="' + esc(c.baseManuelle) + '">') + '</div>' : '') +
      '<div id="ph-bases"></div>' +
      '<div class="note warn">L\'outil calcule les deux moyennes ; il ne dit pas laquelle retenir. La règle de détermination du salaire de référence (et le sort des primes) se lit à la source (<b>R1234-4</b> et convention collective applicable), et la solution la plus favorable au salarié n\'est pas automatique.</div>' +
      '</div>' +

      '<div class="card">' +
      '<h2>Licenciement sans cause réelle et sérieuse — L1235-3</h2>' +
      '<p class="lead">Cet outil <b>ne contient pas</b> le barème. Vous lisez la ligne correspondant à l\'ancienneté sur Légifrance, vous la saisissez, il calcule — et il mémorise votre saisie vérifiée pour la prochaine fois.</p>' +
      '<div class="btns" style="margin-top:0"><a class="btn" href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036762052" target="_blank" rel="noopener">Ouvrir L1235-3 sur Légifrance ↗</a>' +
      '<a class="btn ghost" href="https://www.courdecassation.fr/toutes-les-actualites/2022/05/11/bareme-dindemnisation-du-salarie-licencie-sans-cause-reelle-et" target="_blank" rel="noopener">Communiqué ch. soc. du 11 mai 2022 ↗</a></div>' +
      '<div class="row" style="margin-top:14px">' +
        field('Minimum lu (mois de salaire brut)', '<input type="number" step="0.5" min="0" data-path="chiffrage.bmin" value="' + esc(c.bmin) + '">') +
        field('Maximum lu (mois de salaire brut)', '<input type="number" step="0.5" min="0" data-path="chiffrage.bmax" value="' + esc(c.bmax) + '">') +
        field('Vérifié le', '<input type="date" data-path="chiffrage.verifieLe" value="' + esc(c.verifieLe || today()) + '">') +
      '</div>' +
      '<label class="check" style="margin-top:12px"><input type="checkbox" data-path="chiffrage.petite" data-rerender="1"' + (c.petite ? ' checked' : '') + '><span>Entreprise de <b>moins de onze salariés</b> (planchers spécifiques)</span></label>' +
      '<label class="check" style="margin-top:8px"><input type="checkbox" data-path="chiffrage.nul" data-rerender="1"' + (c.nul ? ' checked' : '') + '><span>Licenciement <b>nul</b> (discrimination, harcèlement, liberté fondamentale, maternité, lanceur d\'alerte…)</span></label>' +
      '<div id="ph-bareme"></div>' +
      '<div class="btns"><button type="button" class="btn primary" data-act="bareme-save">Mémoriser cette ligne vérifiée</button></div>' +
      (keys.length ? '<h3>Votre table vérifiée</h3><table><thead><tr><th>Ancienneté</th><th>Effectif</th><th>Min</th><th>Max</th><th>Vérifié le</th><th></th></tr></thead><tbody>' +
        keys.sort(function (x, y) { return parseInt(x, 10) - parseInt(y, 10); }).map(function (k) {
          var r = S.bareme[k], parts = k.split('|');
          return '<tr><td>' + esc(parts[0]) + ' an(s)</td><td>' + (parts[1] === '1' ? '&lt; 11' : '≥ 11') + '</td><td>' + esc(r.min) +
            ' mois</td><td>' + esc(r.max) + ' mois</td><td class="muted">' + esc(r.date) +
            '</td><td><button type="button" class="btn ghost" data-act="bareme-load" data-key="' + esc(k) + '">reprendre</button></td></tr>';
        }).join('') + '</tbody></table>' +
        '<p class="muted" style="margin-top:10px">Votre table, vos vérifications. Le droit change : une ligne vérifiée il y a un an se revérifie.</p>' : '') +
      '</div>' +

      '<div class="card"><h2>Autres chefs chiffrés</h2>' +
      '<div class="row">' +
        field('Travail dissimulé — indemnité forfaitaire (mois, L8223-1)', '<input type="number" step="1" min="0" data-path="chiffrage.dissimule" value="' + esc(c.dissimule) + '" placeholder="6 si l\'élément intentionnel est caractérisé">') +
      '</div>' +
      '<div id="ph-autres"></div>' +
      '<div class="note">Distinguer ce qui est <b>dû de plein droit</b> (préavis, indemnité légale ou conventionnelle de licenciement, congés payés) de ce qui relève de <b>dommages-intérêts appréciés</b>. Les fractions de l\'indemnité légale de licenciement se lisent à la source (R1234-2 et R1234-4) et se comparent à l\'indemnité conventionnelle.</div>' +
      '</div>';
  }

  function baseSalaire() {
    var c = S.chiffrage;
    if (c.base === 'manuel') return num(c.baseManuelle);
    if (c.base === 'm3') {
      var b3 = num(c.brut3); if (!isFinite(b3)) return NaN;
      var pr = num(c.prime); if (isFinite(pr)) b3 += pr / 4;
      return b3 / 3;
    }
    var b12 = num(c.brut12);
    return isFinite(b12) ? b12 / 12 : NaN;
  }

  function calcChiffrage() {
    var c = S.chiffrage;
    var host = root.querySelector('#ph-bases');
    if (host) {
      var anc = anciennete(d(c.entree), d(c.rupture));
      var m12 = isFinite(num(c.brut12)) ? num(c.brut12) / 12 : NaN;
      var b3 = num(c.brut3), pr = num(c.prime);
      var m3 = isFinite(b3) ? (b3 + (isFinite(pr) ? pr / 4 : 0)) / 3 : NaN;
      host.innerHTML = '<div class="kpi">' +
        '<div><div class="v">' + (anc ? anc.annees + ' an' + (anc.annees > 1 ? 's' : '') + (anc.mois ? ' ' + anc.mois + ' m' : '') : '—') +
          '</div><div class="l">ancienneté (années complètes)</div></div>' +
        '<div><div class="v">' + eur(m12) + '</div><div class="l">moyenne 12 mois</div></div>' +
        '<div><div class="v">' + eur(m3) + '</div><div class="l">moyenne 3 mois</div></div>' +
        '<div><div class="v" style="color:var(--gold)">' + eur(baseSalaire()) + '</div><div class="l">base retenue</div></div>' +
        '</div>' +
        (anc && anc.mois ? '<p class="muted">' + anc.annees + ' années complètes + ' + anc.mois + ' mois : vérifier l\'incidence du préavis sur l\'ancienneté retenue.</p>' : '');
    }

    var bar = root.querySelector('#ph-bareme');
    if (bar) {
      var sal = baseSalaire();
      if (c.nul) {
        bar.innerHTML = '<div class="note err"><b>Licenciement nul → le barème ne s\'applique pas.</b> ' +
          'Indemnité minimale de <b>6 mois</b> de salaire (L1235-3-1), et réintégration possible si le salarié la demande. ' +
          (isFinite(sal) ? 'Soit un plancher de <b>' + eur(sal * 6) + '</b> sur la base retenue.' : 'Renseignez le salaire de référence pour chiffrer le plancher.') +
          ' <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036762026" target="_blank" rel="noopener">Vérifier L1235-3-1</a></div>';
      } else {
        var mn = num(c.bmin), mx = num(c.bmax);
        if (!isFinite(mn) || !isFinite(mx) || !isFinite(sal)) {
          bar.innerHTML = '<p class="muted" style="margin-top:12px">Saisissez la fourchette lue sur Légifrance et le salaire de référence pour chiffrer.</p>';
        } else if (mn > mx) {
          bar.innerHTML = '<div class="note err">Le minimum saisi dépasse le maximum : relire la ligne du barème.</div>';
        } else {
          bar.innerHTML = '<div class="kpi">' +
            '<div><div class="v">' + eur(sal * mn) + '</div><div class="l">plancher — ' + mn + ' mois</div></div>' +
            '<div><div class="v">' + eur(sal * mx) + '</div><div class="l">plafond — ' + mx + ' mois</div></div>' +
            '</div><div class="note">Fourchette de ' + eur(sal * mn) + ' à ' + eur(sal * mx) +
            ' sur une base de ' + eur(sal) + ' brut' + (c.petite ? ' (entreprise de moins de onze salariés)' : '') +
            '. Le montant retenu dans cette fourchette <b>se motive</b> : ancienneté, âge, situation, préjudice établi par les pièces.</div>';
        }
      }
    }

    var au = root.querySelector('#ph-autres');
    if (au) {
      var moisD = num(c.dissimule), s2 = baseSalaire();
      au.innerHTML = (isFinite(moisD) && moisD > 0 && isFinite(s2))
        ? '<div class="kpi"><div><div class="v">' + eur(s2 * moisD) + '</div><div class="l">travail dissimulé — ' + moisD + ' mois (L8223-1)</div></div></div>' +
          '<p class="muted">L\'indemnité forfaitaire suppose que l\'<b>élément intentionnel</b> soit caractérisé : à motiver explicitement.</p>'
        : '';
    }
  }

  function baremeSave() {
    var c = S.chiffrage;
    var anc = anciennete(d(c.entree), d(c.rupture));
    var mn = num(c.bmin), mx = num(c.bmax);
    if (!anc) { alert('Renseignez les dates d\'entrée et de rupture : la ligne du barème se range par ancienneté.'); return; }
    if (!isFinite(mn) || !isFinite(mx)) { alert('Saisissez le minimum et le maximum lus sur Légifrance.'); return; }
    S.bareme[anc.annees + '|' + (c.petite ? '1' : '0')] = { min: mn, max: mx, date: c.verifieLe || today() };
    save();
  }

  /* ============================================================== 6. RÉDACTION */
  function secRedaction() {
    var dis = S.dispositif;
    return '<div class="card">' +
      '<h2>Chefs de demande</h2>' +
      '<p class="lead">Une demande = un raisonnement = une réponse. Rien d\'oublié (<i>infra petita</i>), rien au-delà du demandé (<i>ultra petita</i>).</p>' +
      '<div id="ph-petita"></div>' +
      (S.chefs.length ? S.chefs.map(chefCard).join('') : '<p class="muted">Aucun chef de demande. Ajoutez-les un par un — un dossier en compte souvent 5 à 15.</p>') +
      '<div class="btns"><button type="button" class="btn primary" data-act="chef-add">+ Ajouter un chef de demande</button></div>' +
      '</div>' +

      '<div class="card"><h2>Dispositif</h2>' +
      '<div class="row">' +
        field('Intérêts', select('dispositif.interets', dis.interets, [
          ['legal', 'Au taux légal'], ['aucun', 'Sans intérêts'], ['autre', 'À préciser dans le texte']])) +
        field('Exécution provisoire', select('dispositif.execProv', dis.execProv, [
          ['droit', 'De droit (dans les limites légales)'], ['ordonnee', 'Ordonnée'], ['non', 'Non ordonnée']])) +
        field('Article 700 CPC (€)', '<input type="number" step="0.01" min="0" data-path="dispositif.art700" value="' + esc(dis.art700) + '">') +
        field('Article 700 à la charge de', select('dispositif.art700Qui', dis.art700Qui, [
          ['defendeur', 'La partie défenderesse'], ['demandeur', 'La partie demanderesse'], ['aucun', 'Personne (demandes rejetées)']])) +
        field('Dépens à la charge de', select('dispositif.depens', dis.depens, [
          ['defendeur', 'La partie défenderesse'], ['demandeur', 'La partie demanderesse'], ['partage', 'Partagés']])) +
      '</div></div>' +

      '<div class="card"><h2>Trame de motivation</h2>' +
      '<p class="lead">Squelette de raisonnement à remplir et à retravailler — jamais à plaquer tel quel. Le contenu se construit sur le dossier.</p>' +
      '<div class="btns" style="margin-top:0">' +
        '<button type="button" class="btn primary" data-act="copy-trame">Copier la trame</button>' +
        '<button type="button" class="btn" data-act="print">Imprimer</button></div>' +
      '<textarea id="ph-trame" readonly style="min-height:420px; margin-top:14px" class="mono"></textarea>' +
      '<div class="note warn">Relecture avant signature : chaque chef du dispositif correspond à un motif · aucun montant non motivé · cohérence motifs ↔ dispositif · intérêts / exécution provisoire / 700 / dépens présents · <b>aucune mention couverte par le secret du délibéré</b> · le texte se comprend sans connaître le dossier de l\'intérieur.</div>' +
      '</div>' +

      '<div class="card"><h2>Formules-types neutres</h2>' +
      '<ul class="clean">' +
      '<li><b>Recevabilité</b> — « La demande au titre de … est soumise à la prescription de … (art. …). L\'action ayant été introduite le …, elle est recevable / prescrite. »</li>' +
      '<li><b>Charge de la preuve (licenciement)</b> — « En application de l\'article L1235-1, le juge forme sa conviction au vu des éléments fournis par les parties ; si un doute subsiste, il profite au salarié. »</li>' +
      '<li><b>Heures supplémentaires</b> — « Le salarié présente des éléments suffisamment précis (pièces …) ; l\'employeur, à qui il incombe d\'assurer le contrôle du temps de travail (art. L3171-4), produit / ne produit pas d\'éléments en réponse. En conséquence … »</li>' +
      '<li><b>Conclusion d\'un chef</b> — « En conséquence, le conseil fait droit / déboute … et condamne … à payer la somme de … €. »</li>' +
      '<li><b>Frais</b> — « Il serait inéquitable de laisser à la charge de … les frais non compris dans les dépens ; … est condamné à payer … € au titre de l\'article 700 du code de procédure civile. »</li>' +
      '</ul>' +
      '<p class="muted" style="margin-top:12px">Obligation de motivation : art. 455 du code de procédure civile — à vérifier sur Légifrance.</p>' +
      '</div>';
  }

  function chefCard(c, i) {
    return '<div class="card" style="background:var(--panel2); margin-top:14px">' +
      '<div class="row">' +
        field('Chef de demande n° ' + (i + 1), '<input type="text" data-path="chefs.' + i + '.intitule" value="' + esc(c.intitule) + '" placeholder="ex. rappel d\'heures supplémentaires">') +
        field('Fondement', '<input type="text" data-path="chefs.' + i + '.fondement" value="' + esc(c.fondement) + '" placeholder="ex. L3171-4 + CCN art. …">') +
      '</div>' +
      '<div class="row" style="margin-top:12px">' +
        field('Montant demandé (€)', '<input type="number" step="0.01" min="0" data-path="chefs.' + i + '.demande" value="' + esc(c.demande) + '">') +
        field('Sens', select('chefs.' + i + '.sens', c.sens, Object.keys(SENS).map(function (k) { return [k, SENS[k]]; }), true)) +
        field('Montant retenu (€)', '<input type="number" step="0.01" min="0" data-path="chefs.' + i + '.retenu" value="' + esc(c.retenu) + '">') +
      '</div>' +
      '<div class="row" style="margin-top:12px">' +
        field('Pièces déterminantes <span class="muted">(numéros seuls)</span>', '<input type="text" data-path="chefs.' + i + '.pieces" value="' + esc(c.pieces) + '" placeholder="ex. pièces 4, 7 et 12">') +
      '</div>' +
      '<div style="margin-top:12px">' +
        '<label>Motif — pourquoi cette solution</label>' +
        '<textarea data-path="chefs.' + i + '.motif" placeholder="Application de la règle aux faits établis : ce que le conseil retient, et pourquoi.">' + esc(c.motif) + '</textarea>' +
      '</div>' +
      '<div class="btns"><button type="button" class="btn danger ghost" data-act="chef-del" data-i="' + i + '">Supprimer ce chef</button></div>' +
      '</div>';
  }

  function calcRedaction() {
    var host = root.querySelector('#ph-petita');
    if (host) {
      var alertes = [];
      S.chefs.forEach(function (c, i) {
        var nom = c.intitule || ('chef n° ' + (i + 1));
        if (!c.sens) alertes.push(['warn', 'Le ' + nom + ' n\'est pas tranché — risque d\'<i>infra petita</i>.']);
        var dem = num(c.demande), ret = num(c.retenu);
        if (isFinite(dem) && isFinite(ret) && ret > dem)
          alertes.push(['err', 'Le ' + nom + ' : montant retenu supérieur au demandé — <i>ultra petita</i>.']);
        if (isFinite(ret) && ret > 0 && !String(c.motif).trim())
          alertes.push(['warn', 'Le ' + nom + ' est chiffré mais non motivé.']);
        if ((c.sens === 'accueilli' || c.sens === 'partiel') && !isFinite(ret))
          alertes.push(['warn', 'Le ' + nom + ' est accueilli sans montant retenu.']);
      });
      var tot = S.chefs.reduce(function (a, c) { var n = num(c.retenu); return a + (isFinite(n) ? n : 0); }, 0);
      host.innerHTML =
        (S.chefs.length ? '<div class="kpi"><div><div class="v">' + S.chefs.length + '</div><div class="l">chefs de demande</div></div>' +
          '<div><div class="v">' + S.chefs.filter(function (c) { return c.sens; }).length + '</div><div class="l">tranchés</div></div>' +
          '<div><div class="v">' + eur(tot) + '</div><div class="l">total retenu</div></div></div>' : '') +
        (alertes.length ? alertes.map(function (a) { return '<div class="note ' + a[0] + '">' + a[1] + '</div>'; }).join('')
          : (S.chefs.length ? '<div class="note ok">Chaque chef est tranché, chiffré et motivé.</div>' : ''));
    }
    var ta = root.querySelector('#ph-trame');
    if (ta) ta.value = trame();
  }

  function trame() {
    var a = S.audience, dis = S.dispositif;
    var L = [];
    L.push('CONSEIL DE PRUD\'HOMMES DE PARIS');
    L.push((a.chambre || '') + (a.formation ? ' — ' + FORMATIONS[a.formation].nom : ''));
    L.push('RG n° ' + (a.rg || '…') + (a.date ? '   ·   audience du ' + fmtD(d(a.date)) : ''));
    L.push('');
    L.push('RAPPEL DES FAITS ET DE LA PROCÉDURE');
    L.push('[Bref et neutre : contrat, fonctions, ancienneté, rémunération, événement litigieux, saisine, issue de la conciliation, demandes.]');
    L.push('');
    L.push('PRÉTENTIONS ET MOYENS DES PARTIES');
    L.push('[Chefs de demande chiffrés de chaque partie et principaux moyens.]');
    L.push('');
    L.push('MOTIFS');
    L.push('');

    if (!S.chefs.length) {
      L.push('SUR [chef de demande]');
      L.push('  (a) Règle de droit — …');
      L.push('  (b) Charge de la preuve — …');
      L.push('  (c) Éléments produits — pièces …');
      L.push('  (d) Application — …');
      L.push('  (e) En conséquence — …');
      L.push('');
    } else {
      S.chefs.forEach(function (c) {
        L.push('SUR ' + (c.intitule || '[chef de demande]').toUpperCase());
        L.push('  (a) Règle de droit — ' + (c.fondement || '…'));
        L.push('  (b) Charge de la preuve — …');
        L.push('  (c) Éléments produits — ' + (c.pieces || 'pièces …'));
        L.push('  (d) Application — ' + (c.motif || '…'));
        var dem = num(c.demande), ret = num(c.retenu);
        var fin;
        if (c.sens === 'accueilli') fin = 'le conseil fait droit à la demande' + (isFinite(ret) ? ' et alloue la somme de ' + eur(ret) : '');
        else if (c.sens === 'partiel') fin = 'le conseil fait partiellement droit à la demande' + (isFinite(ret) ? ' et alloue la somme de ' + eur(ret) : '') + (isFinite(dem) ? ' (demande : ' + eur(dem) + ')' : '');
        else if (c.sens === 'rejete') fin = 'le conseil déboute de ce chef de demande';
        else if (c.sens === 'prescrit') fin = 'la demande est déclarée irrecevable comme prescrite ; le fond n\'en est pas examiné';
        else fin = '[chef non tranché — à trancher]';
        L.push('  (e) En conséquence, ' + fin + '.');
        L.push('');
      });
    }

    L.push('PAR CES MOTIFS');
    L.push('');
    L.push('Le conseil de prud\'hommes de Paris, statuant publiquement, par jugement contradictoire et en premier ressort :');
    L.push('');
    S.chefs.forEach(function (c) {
      var lib = c.intitule || '[chef de demande]';
      var ret = num(c.retenu);
      if (c.sens === 'accueilli' || c.sens === 'partiel')
        L.push('— CONDAMNE [la partie défenderesse] à payer ' + (isFinite(ret) ? eur(ret) : '… €') + ' au titre ' + auTitre(lib) + ' ;');
      else if (c.sens === 'rejete') L.push('— DÉBOUTE de la demande au titre ' + auTitre(lib) + ' ;');
      else if (c.sens === 'prescrit') L.push('— DÉCLARE IRRECEVABLE comme prescrite la demande au titre ' + auTitre(lib) + ' ;');
      else L.push('— [statuer sur : ' + lib + '] ;');
    });
    if (dis.interets === 'legal') L.push('— DIT que les sommes porteront intérêts au taux légal [à compter de …] ;');
    if (dis.execProv === 'droit') L.push('— RAPPELLE que l\'exécution provisoire est de droit dans les limites prévues par la loi ;');
    else if (dis.execProv === 'ordonnee') L.push('— ORDONNE l\'exécution provisoire ;');
    var a700 = num(dis.art700);
    if (isFinite(a700) && a700 > 0 && dis.art700Qui !== 'aucun')
      L.push('— CONDAMNE [' + (dis.art700Qui === 'defendeur' ? 'la partie défenderesse' : 'la partie demanderesse') +
        '] à payer ' + eur(a700) + ' au titre de l\'article 700 du code de procédure civile ;');
    L.push('— CONDAMNE [' + (dis.depens === 'demandeur' ? 'la partie demanderesse' : dis.depens === 'partage' ? 'chaque partie pour moitié' : 'la partie défenderesse') + '] aux dépens.');
    L.push('');
    L.push('[Le dispositif doit pouvoir s\'exécuter seul, sans relire les motifs.]');
    return L.join('\n');
  }

  /* ================================================================ 7. SOURCES */
  function secSources() {
    return '<div class="card"><h2>Les sources qui font autorité</h2>' +
      '<p class="lead">On ne cite que ce qu\'on a lu à la source. Un commentaire, un forum, un résumé produit par une IA : utiles pour chercher, jamais pour fonder une décision.</p>' +
      '<table><tbody>' + SOURCES.map(function (s) {
        return '<tr><td><a href="' + esc(s[1]) + '" target="_blank" rel="noopener"><b>' + esc(s[0]) + '</b></a></td><td class="muted">' + esc(s[2]) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +

      '<div class="card"><h2>Articles réflexe</h2>' +
      '<table><thead><tr><th>Sujet</th><th>Articles</th></tr></thead><tbody>' +
      ARTICLES.map(function (r) {
        return '<tr><td>' + esc(r[0]) + '</td><td><a class="mono" href="' + esc(r[2]) + '" target="_blank" rel="noopener">' + esc(r[1]) + '</a></td></tr>';
      }).join('') + '</tbody></table>' +
      '<p class="muted" style="margin-top:12px">Les renumérotations existent : vérifier les numéros et le contenu à jour.</p></div>' +

      '<div class="card"><h2>Vérifier une règle — le réflexe en 4 temps</h2>' +
      '<ol><li><b>Identifier le texte de base</b> — l\'article du code du travail.</li>' +
      '<li><b>Lire la version en vigueur à la date des faits</b> sur Légifrance, pas une version abrogée.</li>' +
      '<li><b>Chercher l\'interprétation</b> — l\'arrêt de la chambre sociale sur le point précis.</li>' +
      '<li><b>Vérifier la convention collective</b> applicable : elle peut changer la solution.</li></ol>' +
      '<div class="note"><span class="mono">L</span> = partie législative · <span class="mono">R</span> = réglementaire (décret en Conseil d\'État) · <span class="mono">D</span> = décret simple. Procédure prud\'homale : <span class="mono">R1451-1 et s.</span> Statut du conseiller : <span class="mono">L1442-1 et s.</span></div>' +
      '</div>' +

      '<div class="card"><h2>Notes de droit <span class="muted">(jamais de dossier réel)</span></h2>' +
      '<p class="lead">Le point de droit que vous avez clarifié pour vous-même. Pas de nom, pas de fait d\'espèce, rien du délibéré.</p>' +
      '<textarea data-path="notes" placeholder="ex. forfait-jours : sans suivi effectif de la charge de travail, l\'accord est privé d\'effet — vérifier la jurisprudence récente.">' + esc(S.notes) + '</textarea>' +
      '</div>';
  }

  /* ================================================================ 8. FLAMME */
  function secFlamme() {
    return '<div class="card"><h2>Pourquoi ce rôle compte</h2>' +
      '<ul class="clean">' +
      '<li><b>Vous êtes la justice telle que les gens la rencontrent.</b> Pour un salarié licencié ou un employeur attaqué, le procès prud\'homal est souvent le seul contact direct avec un juge de toute leur vie. Ce qu\'ils en gardent, c\'est vous.</li>' +
      '<li><b>Vous jugez entre pairs.</b> Le paritarisme est une singularité française précieuse : des gens du terrain qui rendent la justice du travail parce qu\'ils savent ce qu\'est le travail. C\'est une force, pas un défaut.</li>' +
      '<li><b>Vos décisions ont des conséquences réelles</b> : un loyer payé, une dignité reconnue, une entreprise qui survit ou non. Rares sont les fonctions où l\'on pèse autant, concrètement, sur une vie.</li>' +
      '</ul></div>' +

      '<div class="card"><h2>Ce qui use — et comment tenir</h2>' +
      '<table><thead><tr><th>Ce qui pèse</th><th>Antidote concret</th></tr></thead><tbody>' +
      '<tr><td>La charge émotionnelle des dossiers</td><td>On est juge, pas sauveur : on rend justice selon le droit. C\'est suffisant, et c\'est beaucoup.</td></tr>' +
      '<tr><td>Le volume et les délais</td><td>Une méthode solide transforme la montagne en marches. Un dossier bien cadré va deux fois plus vite.</td></tr>' +
      '<tr><td>Le sentiment d\'imposture juridique</td><td>La formation continue est gratuite, officielle, faite pour ça. Personne ne naît juriste.</td></tr>' +
      '<tr><td>La solitude de la décision</td><td>On délibère à plusieurs. Le désaccord d\'un collègue n\'est pas une attaque, c\'est une vérification.</td></tr>' +
      '<tr><td>L\'appel qui réforme</td><td>Une réformation n\'est pas un échec personnel : c\'est le double degré qui fonctionne. En tirer un apprentissage.</td></tr>' +
      '</tbody></table></div>' +

      '<div class="card"><h2>Trois convictions pour durer</h2>' +
      '<div class="note ok"><b>Mieux vaut une décision bien motivée qu\'une décision parfaite.</b> La perfection paralyse. Un raisonnement clair, traçable, honnête : c\'est ça, juger bien.</div>' +
      '<div class="note ok"><b>Le doute fait partie du métier.</b> Un juge qui ne doute jamais devrait inquiéter. Le code lui-même le sait : le doute profite au salarié (L1235-1).</div>' +
      '<div class="note ok"><b>Chaque audience est une chance d\'être utile.</b> Pas un fardeau de plus : une occasion concrète de faire respecter le droit du travail, pour quelqu\'un qui en a besoin aujourd\'hui.</div>' +
      '<p style="margin-top:18px; font-style:italic">Vous ne « rendez pas des jugements ». Vous tenez, à votre place, l\'une des promesses les plus anciennes d\'une société juste : <b>que le travail soit traité avec droit et dignité.</b></p>' +
      '<p class="muted">Bon délibéré, conseiller.</p>' +
      '</div>';
  }

  /* « au titre de … » : élision devant voyelle ou h muet, et pas de doublon
     quand l'intitulé commence déjà par un article. */
  function auTitre(lib) {
    var s = String(lib).trim();
    if (/^(l'|le |la |les |du |de |des |d')/i.test(s)) return (/^(de |d')/i.test(s) ? '' : 'de ') + s;
    return (/^[aeiouyàâäéèêëîïôöùûü]/i.test(s) ? "de l'" : 'de ') + s;
  }

  /* ---------------------------------------------------------- petits rendus */
  function field(label, control) { return '<div><label>' + label + '</label>' + control + '</div>'; }
  function select(path, val, options, rerender) {
    return '<select data-path="' + path + '"' + (rerender ? ' data-rerender="1"' : '') + '>' +
      options.map(function (o) {
        return '<option value="' + esc(o[0]) + '"' + (String(val) === String(o[0]) ? ' selected' : '') + '>' + esc(o[1]) + '</option>';
      }).join('') + '</select>';
  }

  T.registerTab({
    id: 'prudhommes',
    label: 'Prud\'hommes',
    icon: '⚖️',
    accent: '#c9a227',
    render: render
  });
})();
