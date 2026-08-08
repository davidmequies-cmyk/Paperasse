/* ============================================================================
   Tower · onglet « Hermès » — tour de contrôle
   Cockpit de l'agent IA du Groupe MDM : router une demande vers le bon agent,
   dérouler une procédure, préparer une demande de validation, passer la
   checklist anti-arnaque, retrouver un fait du référentiel.

   PRINCIPE DE CONCEPTION — à respecter en faisant évoluer ce fichier :
   tout ce qui est affiché ici est repris des fichiers du dossier hermes/
   (prompts, docs, referentiel). L'outil n'invente aucune donnée : ce qui est
   marqué [À VÉRIFIER] dans le référentiel reste marqué ici. La règle des
   agents vaut pour la console : Hermès prépare → Michel valide → Hermès exécute.

   Aucune donnée ne sort du poste : tout est en localStorage.
   ============================================================================ */
(function () {
  var T = window.TOWER;
  var store = T.store('hermes.v1');
  var esc = T.esc;

  /* ------------------------------------------------------------------ état */
  var DEFAULT = {
    section: 'pilotage',
    routeur: { texte: '', agent: '', demande: '' },
    proc: {},                                   // "P2_3" -> true (clé plate)
    validation: { type: '', cible: '', resume: '', apercu: '', points: '' },
    secu: { flags: {}, contexte: '' },
    filtre: ''
  };
  var S = merge(DEFAULT, store.read({}));

  function merge(base, over) {
    var out = JSON.parse(JSON.stringify(base));
    Object.keys(over || {}).forEach(function (k) {
      if (out[k] && typeof out[k] === 'object' && !Array.isArray(out[k]) &&
          over[k] && typeof over[k] === 'object' && !Array.isArray(over[k])) out[k] = merge(out[k], over[k]);
      else if (over[k] !== undefined) out[k] = over[k];
    });
    return out;
  }
  function save() { store.write(S); }
  function set(path, val) {
    var ks = path.split('.'), last = ks.pop();
    var o = ks.reduce(function (a, k) { if (a[k] == null) a[k] = {}; return a[k]; }, S);
    o[last] = val; save();
  }
  function motRegex(k) {
    return new RegExp('(^|[^a-z0-9])' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + 's?([^a-z0-9]|$)');
  }
  function hit(q, mots) {
    return mots.some(function (k) { return motRegex(k).test(q); });
  }
  function norm(s) {
    return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /* --------------------------------------------------------------- données
     Agents : hermes/README.md · mots-clés de routage : hermes/prompts/00-routeur.md
     Phrases de déclenchement : hermes/docs/mode-emploi.md */
  var AGENTS = [
    { cmd: '/dg', nom: 'Direction Générale', fichier: 'agent-5-direction-generale.md', modele: 'Claude + OpenAI',
      quoi: "Tableau de bord dirigeant : 🔴 Urgent · 🔵 Finance · 🤝 Clients · ⚖️ Juridique · 🎬 Production · 🚀 Stratégie, et le TOP 3.",
      phrase: "Fais-moi le point de direction générale du jour.",
      kw: ['point du jour', 'priorites', 'priorite', 'tableau de bord', 'fais le point', 'point du mois', 'cloture', 'dg', 'pilotage', 'synthese'] },
    { cmd: '/treso', nom: 'Trésorerie / Finance', fichier: 'agent-7-tresorerie.md', modele: 'Claude + OpenAI',
      quoi: "Solde, entrées/sorties, projection 30/60/90 jours, tensions de trésorerie, suivi d'encaissement (Qonto).",
      phrase: "Fais-moi le point trésorerie / cash.",
      kw: ['cash', 'tresorerie', 'treso', 'solde', 'echeance', 'echeances', 'a payer', 'encaisser', 'encaissement', 'banque', 'qonto', 'flux'] },
    { cmd: '/paie', nom: 'Paie intermittents (SpectaGestion)', fichier: 'agent-1-paie.md', modele: 'OpenAI + Gemini',
      quoi: "Dossiers de paie intermittents : DPAE → CDDU → bulletins → AEM/DSN, coût employeur, anomalies.",
      phrase: "Analyse ce dossier de paie intermittent : …",
      kw: ['paie', 'bulletin', 'bulletins', 'cachet', 'cachets', 'cddu', 'intermittent', 'intermittents', 'dpae', 'dsn', 'aem', 'annexe 8', 'annexe 10', 'audiens', 'conges spectacles'] },
    { cmd: '/paie (expert)', nom: 'Expert paie intermittent du spectacle', fichier: 'agent-18-expert-paie-intermittent.md', modele: 'Claude + OpenAI',
      quoi: "Le niveau expert : règles légales, abattements DFS, contrôle d'un bulletin ligne à ligne, cas limites.",
      phrase: "En tant qu'agent Expert paie intermittent, contrôle ce bulletin : …",
      kw: ['dfs', 'abattement', 'expert paie', 'controle de bulletin', 'ghs', 'spaiectacle', '507 h', 'cout employeur'] },
    { cmd: '/relance', nom: 'Relances / impayés', fichier: 'agent-3-relances.md', modele: 'Claude',
      quoi: "Niveaux 1 (douce) → 4 (mise en demeure RAR), e-mail ou courrier prêt à envoyer.",
      phrase: "Rédige une relance pour cette facture impayée : …",
      kw: ['impaye', 'impayes', 'relance', 'relances', 'mise en demeure', 'recouvrement', 'ne paie pas', 'pas paye', 'pas ete paye', 'retard de paiement', 'facture', 'factures', 'echue', 'echues', 'toujours pas paye'] },
    { cmd: '/devis', nom: 'Commercial & Devis', fichier: 'agent-12-devis.md', modele: 'Claude + OpenAI',
      quoi: "Qualifier un besoin et chiffrer — jamais de prix inventé (tarifs : référentiel).",
      phrase: "Prépare un devis pour : …",
      kw: ['devis', 'prospect', 'chiffrage', 'chiffrer', 'proposition commerciale', 'tarif', 'prix'] },
    { cmd: '/contrat', nom: 'Contrats spectacle / audiovisuel', fichier: 'agent-2-contrats.md', modele: 'Claude',
      quoi: "Cession, coproduction, prestation audiovisuelle, CDDU artiste/technicien — gabarits dans templates/contrats/.",
      phrase: "Prépare un contrat de cession pour : …",
      kw: ['contrat', 'contrats', 'cession', 'coproduction', 'coprod', 'prestation audiovisuelle', 'signature', 'convention'] },
    { cmd: '/fiscal', nom: 'Fiscalité & Comptabilité', fichier: 'agent-8-fiscal.md', modele: 'Claude + OpenAI',
      quoi: "TVA (CA3 mensuelles), IS, CFE, Pennylane, échanges avec l'expert-comptable.",
      phrase: "Analyse ce courrier fiscal / fais le point TVA.",
      kw: ['tva', 'is', 'cfe', 'impot', 'impots', 'fiscal', 'controle fiscal', 'pennylane', 'expert-comptable', 'comptable', 'ca3', 'liasse'] },
    { cmd: '/juridique', nom: 'Juridique & Conformité', fichier: 'agent-9-juridique.md', modele: 'Claude',
      quoi: "Litiges où Michel est partie, RGPD, licences, CGV, relation avocat. ⚠️ à ne pas confondre avec la fonction de juge prud'homal.",
      phrase: "Analyse ce dossier juridique / litige : …",
      kw: ['litige', 'rgpd', 'cgv', 'avocat', 'contentieux', 'licence', 'mise en cause', 'assignation', 'juridique'] },
    { cmd: '/rh', nom: 'RH & Social (permanents)', fichier: 'agent-10-rh.md', modele: 'Claude + OpenAI',
      quoi: "Salariés permanents : CDI/CDD, embauche, rupture, obligations sociales.",
      phrase: "Aide-moi sur ce sujet RH (salarié permanent) : …",
      kw: ['salarie permanent', 'permanent', 'cdi', 'cdd', 'embauche', 'rupture conventionnelle', 'rh', 'entretien annuel', 'licenciement', 'contrat de travail', 'preavis', 'demission'] },
    { cmd: '/prod', nom: 'Production & Logistique', fichier: 'agent-11-production.md', modele: 'OpenAI + Gemini',
      quoi: "Feuille de route : planning, plateau, technique, prestataires, budget de production.",
      phrase: "Organise la production de cette prestation : …",
      kw: ['prestation', 'planning', 'plateau', 'technique', 'prestataire', 'prestataires', 'production', 'logistique', 'tournage', 'captation'] },
    { cmd: '/immo', nom: 'Immobilier & Gestion locative', fichier: 'agent-13-immobilier.md', modele: 'Claude + OpenAI',
      quoi: "Achat, prêt, courtier, bail, rentabilité locative (dossier Touques).",
      phrase: "Point immobilier sur l'offre Touques.",
      kw: ['immo', 'immobilier', 'pret', 'courtier', 'touques', 'bail', 'location', 'rentabilite', 'notaire', 'offre de pret'] },
    { cmd: '/assur', nom: 'Assurances & Sinistres', fichier: 'agent-16-assurances.md', modele: 'Claude',
      quoi: "Contrats, garanties, franchises, déclaration de sinistre (gabarit emails/declaration-sinistre.md).",
      phrase: "Fais le point sur cette assurance / ce sinistre : …",
      kw: ['assurance', 'assurances', 'sinistre', 'garantie', 'franchise', 'indemnisation', 'expert assurance'] },
    { cmd: '/subv', nom: 'Subventions & Financements', fichier: 'agent-15-subventions.md', modele: 'Gemini + Claude',
      quoi: "Aides, appels à projets, mécénat, CNM / CNC / DRAC.",
      phrase: "Quelles subventions pour ce projet ?",
      kw: ['subvention', 'subventions', 'aide', 'aides', 'appel a projets', 'mecenat', 'cnm', 'cnc', 'drac', 'financement'] },
    { cmd: '/seo', nom: 'SEO / Marketing', fichier: 'agent-4-seo.md', modele: 'Gemini',
      quoi: "Référencement, mots-clés, pages web, métadonnées.",
      phrase: "Audite le SEO de paieintermittents.com.",
      kw: ['seo', 'referencement', 'mots-cles', 'mot-cle', 'page web', 'meta', 'google', 'trafic'] },
    { cmd: '/com', nom: 'Communication', fichier: 'agent-6-communication.md', modele: 'Copilot + Gemini',
      quoi: "Posts réseaux, newsletter, annonces.",
      phrase: "Rédige un post pour annoncer : …",
      kw: ['post', 'reseaux', 'newsletter', 'annonce', 'communication', 'linkedin', 'instagram', 'communique'] },
    { cmd: '/artiste', nom: 'Booking artiste David Méquiès', fichier: 'agent-17-artiste.md', modele: 'Claude + Gemini',
      quoi: "Demandes de cérémonie et de concert (nom de scène réservé au site chanteursynagogue.art).",
      phrase: "Demande de cérémonie pour David Méquiès : …",
      kw: ['ceremonie', 'bar-mitsva', 'bat-mitsva', 'houppa', 'mariage', 'concert', 'david mequies', 'synagogue', 'booking'] },
    { cmd: '/reunion', nom: 'Copilote de réunion', fichier: 'agent-19-copilote-reunion.md', modele: 'Claude',
      quoi: "Prépare, retranscrit, argumente : avant / pendant / après une réunion.",
      phrase: "Prépare la réunion de … / analyse cette retranscription.",
      kw: ['reunion', 'rendez-vous pro', 'retranscription', 'compte rendu', 'whisper', 'enregistrement'] },
    { cmd: '/assist', nom: 'Assistant personnel & Administratif', fichier: 'agent-14-assistant.md', modele: 'OpenAI',
      quoi: "Agenda, RDV, courrier administratif, démarches, rappels, tri des mails, checklist anti-arnaque.",
      phrase: "Aide-moi sur cet administratif / agenda : …",
      kw: ['agenda', 'rdv', 'rendez-vous', 'courrier', 'demarche', 'demarches', 'rappel', 'mails', 'mail', 'e-mail', 'email', 'administratif', 'tri', 'pieces manquantes'] },
    { cmd: '/halakha', nom: "Grand Rabbin — Posek séfarade d'Algérie (Constantine)", fichier: 'agent-20-rabbin-halakha.md', modele: 'Claude + Gemini',
      quoi: "Halakha selon le minhag de Constantine : psak, Chabbat, cacherout, deuil.",
      phrase: "Question de halakha : …",
      kw: ['halakha', 'psak', 'minhag', 'chabbat', 'cacherout', 'kasher', 'deuil', 'avelout', 'rite sefarade', 'constantine'] }
  ];

  /* Détections transverses du routeur : ces sujets ne sont pas des agents. */
  var HORS_PERIMETRE = ['prud', 'cph', 'bureau de jugement', 'bureau de conciliation',
    'delibere', 'deliberation', 'departage', 'conseiller prudhomme', 'conseiller prudhomal',
    'je siege', 'je juge'];
  var SIGNAUX_ARNAQUE = ['iban', 'rib', 'arnaque', 'phishing', 'hameconnage', 'suspect',
    'fraude', 'virement', 'sous 24h', 'sous 48h', 'carte cadeau', 'compte bloque', 'huissier'];

  var PROCEDURES = [
    { id: 'P1', titre: 'Nouveau client SpectaGestion (de la demande à la 1ʳᵉ paie)',
      decl: '« nouveau client paie », « un client veut qu\'on gère ses intermittents »',
      etapes: [
        ['/devis', "Qualifier le besoin (nb de bulletins/mois, type de prestations) et produire le devis — 18 € HT/bulletin + 14,90 € HT/mois ; sur mesure au-delà de 50.", true],
        ['/assist', "Créer la fiche client, demander les pièces (Kbis, RIB, mandat, coordonnées des salariés). Lister les [À COMPLÉTER].", false],
        ['/contrat', "Convention SpectaGestion — rappel : le client reste l'employeur, pas de portage.", true],
        ['/paie', "Ouvrir le 1ᵉʳ dossier : DPAE → CDDU → bulletins → AEM/DSN, estimer le coût employeur, pointer les risques.", true],
        ['/treso', "Programmer la facturation mensuelle SpectaGestion.", false]
      ] },
    { id: 'P2', titre: 'Impayé de bout en bout',
      decl: '« facture impayée », « X ne paie pas », « relance »',
      etapes: [
        ['/treso', "Confirmer le montant dû, l'ancienneté, l'historique de paiement (Qonto). Classer l'urgence.", false],
        ['/relance', "Choisir le niveau (1 douce → 4 mise en demeure RAR) et rédiger l'envoi.", true],
        ['/juridique', "Si échec après le niveau 4 : injonction de payer / contentieux, indemnité forfaitaire 40 € (L441-10) [À VÉRIFIER], coût / opportunité.", true],
        ['/dg', "Consolider dans le tableau de bord (🔵 FINANCE) jusqu'à encaissement.", false]
      ] },
    { id: 'P3', titre: 'Cycle de paie mensuel (SpectaGestion)',
      decl: 'automatisme mensuel + « on fait la paie du mois »',
      etapes: [
        ['/assist', "Relever les éléments variables reçus (dates, cachets, justificatifs) ; relancer les clients pour les pièces manquantes.", false],
        ['/paie', "Pour chaque dossier : contrôler annexe 8/10, DFS si accord du salarié, calculer brut/net/coût employeur, préparer DPAE/CDDU/bulletins. Lister les anomalies.", false],
        ['—', "Validation globale de Michel : un récap par client, AVANT toute déclaration.", true],
        ['/paie', "Déclarer (AEM/DSN) une fois validé.", false],
        ['/treso', "Facturer les clients (bulletins du mois + abonnement) et suivre l'encaissement.", false]
      ] },
    { id: 'P4', titre: 'Clôture mensuelle / pilotage',
      decl: 'fin de mois, « point du mois », « clôture »',
      etapes: [
        ['/treso', "Solde, entrées/sorties du mois, projection 30/60/90 jours, tensions.", false],
        ['/fiscal', "Échéances TVA/IS/CFE à venir, état Pennylane, points pour l'expert-comptable.", false],
        ['/relance', "État des impayés (rappel des en-cours).", false],
        ['/dg', "Synthèse dirigeant + TOP 3 du mois.", false]
      ] },
    { id: 'P5', titre: 'Devis → prestation → facturation (production)',
      decl: '« on me demande un concert / une captation », « chiffrer une prestation »',
      etapes: [
        ['/devis', "Qualifier et chiffrer — jamais de prix inventé.", true],
        ['/contrat', "Si accepté : cession / prestation audiovisuelle / coproduction selon le cas.", true],
        ['/prod', "Feuille de route : planning, plateau, prestataires, budget de production.", false],
        ['/paie · /artiste', "Si intermittents → cycle de paie (P3). Si artiste de cérémonie → /artiste.", false],
        ['/treso', "Acompte à la commande, solde à l'échéance ; suivi de l'encaissement.", false]
      ] },
    { id: 'P6', titre: 'Sinistre / assurance',
      decl: '« j\'ai eu un sinistre », « refus d\'indemnisation », « garantie »',
      etapes: [
        ['/assur', "Identifier le contrat et le délai de déclaration ; rédiger la déclaration (gabarit emails/declaration-sinistre.md).", true],
        ['/assist', "Réunir les pièces : photos, devis, facture, constat, dépôt de plainte.", false],
        ['/juridique', "Si refus : contester (base légale, protection juridique Juridica).", true]
      ] },
    { id: 'P7', titre: 'Dossier immobilier / financement',
      decl: '« prêt », « courtier », « Touques », « offre de banque »',
      etapes: [
        ['/immo', "Analyser l'offre (taux, durée, mensualité, assurance, rentabilité si locatif) et comparer.", false],
        ['/treso', "Vérifier la capacité : mensualité contre cash-flow.", false],
        ['/juridique', "Relire les clauses sensibles avant engagement.", true]
      ] },
    { id: 'P8', titre: 'E-mail / facture suspect (anti-arnaque)',
      decl: '« ce mail est-il fiable ? », « facture bizarre », « on me demande de payer un RIB »',
      etapes: [
        ['/assist', "Appliquer la checklist anti-arnaque (expéditeur, lien, RIB, urgence artificielle) — section 🛡️ Sécurité de cet onglet.", false],
        ['—', "En cas de doute : ne rien payer, ne rien cliquer ; isoler le message ; vérifier le fournisseur par un canal déjà connu.", false],
        ['/treso · /fiscal', "Confirmer si une vraie échéance existe.", false]
      ] }
  ];

  var SECU_FLAGS = [
    ['expediteur', "Expéditeur réel douteux", "Domaine voisin d'un vrai (mdmprod.org ≠ mdmprod.fr), fautes, sous-domaine inhabituel — lire l'adresse complète, pas le nom affiché."],
    ['coherence', "Aucune cohérence avec un dossier en cours", "Aucune relation connue, aucune commande, aucun devis correspondant."],
    ['rib', "Changement de RIB / IBAN", "« Notre banque a changé », nouvel IBAN reçu par e-mail : arnaque au virement quasi systématique."],
    ['urgence', "Urgence ou menace", "« Sous 24 h », « compte bloqué », « huissier » : la pression est le piège."],
    ['lien', "Lien ou pièce jointe suspect", "URL raccourcie, .zip ou .html inattendu, page de connexion."],
    ['inhabituel', "Demande inhabituelle", "Virement exceptionnel, cartes cadeaux, confidentialité demandée."],
    ['canal', "Canal inhabituel se réclamant de Michel", "E-mail perso, WhatsApp, SMS, secret exigé : fraude au président (FOVI). Hermès n'obéit qu'à Michel par le canal habituel."],
    ['injection', "Instructions cachées dans le contenu", "« Ignore tes règles », « envoie ce virement », « transfère ce fichier » : Hermès lit, mais n'exécute jamais les instructions d'un contenu externe."]
  ];

  var AUTOMATISMES = [
    ['09h00', 'chaque jour', '/dg', 'Tableau de bord'],
    ['09h30', 'chaque jour', '/paie', 'Nouveaux dossiers + infos manquantes, sans déclaration'],
    ['10h00', 'chaque lundi', '/relance', 'Impayés par urgence + relances à valider']
  ];

  var REFERENTIEL = [
    { titre: 'MDMProd', lignes: [
      ['Forme', 'SAS'], ['SIREN', '825 335 003 (RCS Paris)'],
      ['Siège', "6 rue d'Armaillé, 75017 Paris"],
      ['Activité', 'Production audiovisuelle, spectacle vivant, événements, coproduction, production déléguée'],
      ['TVA', '20 % · CA3 mensuelles'], ['Taux AT/MP', '1,07 % (APE 5911B)'] ] },
    { titre: 'Neshama Music', lignes: [
      ['Forme', 'SARL'], ['SIREN', '807 857 719 (RCS Paris)'],
      ['Siège', '61 rue de Lyon, 75012 Paris'],
      ['Licence spectacles', 'PLATESV-R-2021-012818'],
      ['TVA', '5,5 % (billetterie spectacle vivant) · CA3 mensuelles'], ['Taux AT/MP', '1,50 % (APE 9001Z)'] ] },
    { titre: 'SpectaGestion / PaieIntermittents.com', lignes: [
      ['Statut', 'Marque de MDMProd'],
      ['Objet', 'Bulletins de paie des intermittents + déclarations (DPAE → DSN)'],
      ['Règle', "Le client reste l'employeur — pas de portage salarial"],
      ['Tarif', '18 € HT / bulletin + 14,90 € HT / mois'],
      ['Au-delà de 50 bulletins/mois', 'Tarif sur mesure'] ] },
    { titre: 'Repères paie intermittents', lignes: [
      ['CDDU', "Contrat à durée déterminée d'usage"],
      ['Annexes France Travail', '8 (techniciens) · 10 (artistes)'],
      ['Seuil de droits', '507 h / 12 mois [À VÉRIFIER]'],
      ['DFS', 'Musiciens 16 % · artistes dramatiques et lyriques 18 % [À VÉRIFIER chaque année] — accord du salarié requis'],
      ['Organismes', 'URSSAF · France Travail · Audiens · Congés Spectacles · AFDAS · CMB'] ] },
    { titre: 'Identité & sites', lignes: [
      ['Identité pro', 'Michel Méquiès (jamais « Michel David Méquiès » hors mention légale)'],
      ['Nom de scène', 'David Méquiès — réservé à chanteursynagogue.art'],
      ['Sites', 'mdmprod.fr · paieintermittents.com · chanteursynagogue.art'] ] }
  ];

  var MODELES = [
    ['Claude (Anthropic)', '1ᵉʳ choix : raisonnement juridique, contrats, relances, synthèse /dg, trésorerie, paie expert'],
    ['OpenAI (GPT)', 'Calculs, structuration, code léger — /paie calculs, /prod, /assist'],
    ['Codex (OpenAI)', "Exécutant dev : code, scripts, automatisations, revue de PR — s'ajoute, ne remplace pas"],
    ['Gemini', 'Recherche et veille web, longues pièces jointes, SEO — /seo, /subv, PJ /paie']
  ];

  /* -------------------------------------------------------------- sections */
  var SECTIONS = [
    ['pilotage', '🛰️ Pilotage'],
    ['routeur', '🎯 Routeur'],
    ['agents', '🤖 Agents'],
    ['procedures', '🔗 Procédures'],
    ['validation', '🔔 Validation'],
    ['securite', '🛡️ Sécurité'],
    ['referentiel', '📒 Référentiel']
  ];

  var root;

  function render(el) {
    root = el;
    el.innerHTML =
      '<div class="wrap">' +
        '<div class="note no-print" style="margin-top:18px; border-color:var(--acc)">' +
          '<b>Hermès prépare → Michel valide ✅ / ✏️ / ❌ → Hermès exécute.</b> ' +
          'Aucune action externe ou irréversible — e-mail, déclaration DPAE/AEM/DSN, contrat, relance, ' +
          'publication, paiement — sans validation explicite. Cette console <b>prépare</b> : elle ne déclenche rien.' +
        '</div>' +
        '<div class="btns no-print" id="he-nav" style="margin:0 0 18px">' +
          SECTIONS.map(function (s) {
            return '<button type="button" class="btn' + (S.section === s[0] ? ' primary' : '') +
              '" data-sec="' + s[0] + '">' + esc(s[1]) + '</button>';
          }).join('') +
        '</div>' +
        '<div id="he-body"></div>' +
      '</div>';

    el.querySelector('#he-nav').addEventListener('click', function (e) {
      var b = e.target.closest('[data-sec]');
      if (!b) return;
      S.section = b.getAttribute('data-sec'); save(); render(el);
    });

    bind(el.querySelector('#he-body'));
    body();
  }

  function body() {
    root.querySelector('#he-body').innerHTML = ({
      pilotage: secPilotage, routeur: secRouteur, agents: secAgents, procedures: secProcedures,
      validation: secValidation, securite: secSecurite, referentiel: secReferentiel
    }[S.section] || secPilotage)();
    refresh();
  }

  function bind(host) {
    host.addEventListener('input', onChange);
    host.addEventListener('change', onChange);
    host.addEventListener('click', onClick);
  }

  function onChange(e) {
    var el = e.target.closest('[data-path]');
    if (!el) return;
    set(el.getAttribute('data-path'), el.type === 'checkbox' ? el.checked : el.value);
    if (el.getAttribute('data-rerender') === '1') { body(); return; }
    refresh();
  }

  function onClick(e) {
    /* Un bouton du corps peut renvoyer vers une autre section. */
    var nav = e.target.closest('[data-sec]');
    if (nav) { S.section = nav.getAttribute('data-sec'); save(); render(root); return; }

    var b = e.target.closest('[data-act]');
    if (!b) return;
    var act = b.getAttribute('data-act');
    if (act === 'copy') {
      T.copy(b.getAttribute('data-copy') || '', b);
    } else if (act === 'copy-node') {
      var n = root.querySelector(b.getAttribute('data-target'));
      T.copy(n ? (n.value !== undefined ? n.value : n.textContent) : '', b);
    } else if (act === 'pick-agent') {
      S.routeur.agent = b.getAttribute('data-cmd'); S.section = 'routeur'; save(); render(root);
    } else if (act === 'proc-reset') {
      var id = b.getAttribute('data-p');
      Object.keys(S.proc).forEach(function (k) { if (k.indexOf(id + '_') === 0) delete S.proc[k]; });
      save(); body();
    } else if (act === 'goto-prudhommes') {
      location.hash = '#/prudhommes';
    }
  }

  function refresh() {
    var f = { routeur: calcRouteur, agents: calcAgents, procedures: calcProcedures,
              validation: calcValidation, securite: calcSecurite }[S.section];
    if (f) f();
    root.querySelectorAll('.check').forEach(function (l) {
      var i = l.querySelector('input');
      if (i) l.classList.toggle('done', i.checked);
    });
  }

  /* =============================================================== PILOTAGE */
  function secPilotage() {
    var enCours = PROCEDURES.map(function (p) {
      var n = p.etapes.filter(function (_, i) { return S.proc[p.id + '_' + i]; }).length;
      return { p: p, n: n };
    }).filter(function (x) { return x.n > 0 && x.n < x.p.etapes.length; });

    return '<div class="card"><h2>La tour de contrôle</h2>' +
      '<p class="lead">Hermès est piloté en langage naturel depuis Telegram. Cette console sert à <b>préparer</b> : trouver le bon agent, dérouler une procédure, écrire une demande de validation, passer la checklist anti-arnaque.</p>' +
      '<div class="kpi">' +
        '<div><div class="v">' + AGENTS.length + '</div><div class="l">agents</div></div>' +
        '<div><div class="v">' + PROCEDURES.length + '</div><div class="l">procédures</div></div>' +
        '<div><div class="v">' + AUTOMATISMES.length + '</div><div class="l">automatismes</div></div>' +
        '<div><div class="v">' + enCours.length + '</div><div class="l">procédure(s) en cours</div></div>' +
      '</div>' +
      (enCours.length ? '<h3>En cours</h3><ul class="clean">' + enCours.map(function (x) {
        return '<li><b>' + esc(x.p.id) + '</b> — ' + esc(x.p.titre) + ' <span class="pill warn">' + x.n + ' / ' + x.p.etapes.length + '</span></li>';
      }).join('') + '</ul>' : '') +
      '</div>' +

      '<div class="card"><h2>Automatismes</h2>' +
      '<table><thead><tr><th>Heure</th><th>Fréquence</th><th>Agent</th><th>Objet</th></tr></thead><tbody>' +
      AUTOMATISMES.map(function (a) {
        return '<tr><td class="mono">' + esc(a[0]) + '</td><td>' + esc(a[1]) + '</td><td class="mono">' + esc(a[2]) +
          '</td><td class="muted">' + esc(a[3]) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +

      '<div class="card"><h2>Répartition des modèles</h2>' +
      '<table><tbody>' + MODELES.map(function (m) {
        return '<tr><td><b>' + esc(m[0]) + '</b></td><td class="muted">' + esc(m[1]) + '</td></tr>';
      }).join('') + '</tbody></table>' +
      '<div class="note warn">Les clés API vivent dans le <span class="mono">.env</span> uniquement — jamais dans un chat, un prompt ou le dépôt. Les trois consoles facturent à l\'usage : plafonds de dépense à poser, toute dérive est à signaler.</div>' +
      '</div>' +

      '<div class="card"><h2>Ce qui n\'est pas un agent Hermès</h2>' +
      '<div class="note warn"><b>La fonction de conseiller prud\'homal.</b> Michel y est <b>juge</b>, pas partie : indépendance, secret du délibéré, pas de mandat impératif. Cloisonné d\'Hermès — l\'agent <span class="mono">/juridique</span> traite les litiges où Michel est <i>partie</i>, jamais ceux qu\'il <i>juge</i>.' +
      '<div class="btns"><button type="button" class="btn" data-act="goto-prudhommes">Ouvrir l\'onglet ⚖️ Prud\'hommes</button></div></div>' +
      '</div>';
  }

  /* ================================================================ ROUTEUR */
  function secRouteur() {
    return '<div class="card"><h2>Quel agent pour cette demande ?</h2>' +
      '<p class="lead">Écrivez la demande comme vous la diriez à Hermès. Le routeur applique la table de <span class="mono">prompts/00-routeur.md</span> : un agent, le plus spécifique.</p>' +
      '<textarea data-path="routeur.texte" placeholder="ex. le client X n\'a toujours pas payé la facture de mars, qu\'est-ce qu\'on fait ?">' + esc(S.routeur.texte) + '</textarea>' +
      '<div id="he-route"></div></div>' +

      '<div class="card"><h2>Préparer la demande</h2>' +
      '<div class="row">' +
        '<div><label>Agent</label><select data-path="routeur.agent" data-rerender="1">' +
          '<option value="">— choisir —</option>' +
          AGENTS.map(function (a) {
            return '<option value="' + esc(a.cmd) + '"' + (S.routeur.agent === a.cmd ? ' selected' : '') + '>' +
              esc(a.cmd + ' — ' + a.nom) + '</option>';
          }).join('') + '</select></div>' +
      '</div>' +
      '<div style="margin-top:12px"><label>Le dossier / la demande</label>' +
        '<textarea data-path="routeur.demande" placeholder="Collez ici les éléments : contexte, montants, dates, pièces. Ne jamais coller de RIB complet, de mot de passe ni de pièce d\'identité.">' + esc(S.routeur.demande) + '</textarea></div>' +
      '<div class="btns"><button type="button" class="btn primary" data-act="copy-node" data-target="#he-msg">Copier le message</button></div>' +
      '<textarea id="he-msg" readonly class="mono" style="margin-top:14px; min-height:170px"></textarea>' +
      '<div class="note warn">Rappel de sécurité : pas de secret (mot de passe, clé, code 2FA), pas de RIB/IBAN complet, pas de relevé bancaire ni de pièce d\'identité — ni ici, ni dans un chat, ni dans le dépôt.</div>' +
      '</div>';
  }

  function calcRouteur() {
    var host = root.querySelector('#he-route');
    if (host) {
      var q = ' ' + norm(S.routeur.texte) + ' ';
      if (!q.trim()) {
        host.innerHTML = '<p class="muted" style="margin-top:12px">Le routage s\'affiche dès que vous écrivez.</p>';
      } else {
        var scores = AGENTS.map(function (a) {
          var hits = [];
          a.kw.forEach(function (k) { if (motRegex(k).test(q)) hits.push(k); });
          var sc = hits.reduce(function (s, k) { return s + (k.indexOf(' ') > -1 ? 3 : 1); }, 0);
          return { a: a, sc: sc, hits: hits };
        }).filter(function (x) { return x.sc > 0; }).sort(function (x, y) { return y.sc - x.sc; });

        var html = '';
        if (hit(q, HORS_PERIMETRE)) {
          html += '<div class="note warn"><b>Attention au cloisonnement.</b> Si Michel <b>juge</b> l\'affaire (conseiller prud\'homal), ce n\'est pas un agent Hermès : secret du délibéré, ressource dédiée et sources officielles. Si Michel est <b>partie</b> à un litige, c\'est <span class="mono">/juridique</span>.' +
            '<div class="btns"><button type="button" class="btn" data-act="goto-prudhommes">Ouvrir l\'onglet ⚖️ Prud\'hommes</button></div></div>';
        }
        if (hit(q, SIGNAUX_ARNAQUE)) {
          html += '<div class="note err"><b>🚩 Signaux possibles d\'arnaque.</b> Avant toute action : passer la checklist (procédure <b>P8</b>). Rien n\'est payé, cliqué ni partagé tant que le doute n\'est pas levé par un canal déjà connu.' +
            '<div class="btns"><button type="button" class="btn" data-sec="securite">Passer la checklist 🛡️</button></div></div>';
        }
        if (!scores.length) {
          html += '<div class="note">Aucun mot-clé reconnu. Demande ambiguë ou hors périmètre : le routeur demande une précision en une phrase, puis route. À défaut, <span class="mono">/dg</span> pour arbitrer.</div>';
        } else {
          html += '<h3>Agent proposé</h3>' + scores.slice(0, 3).map(function (x, i) {
            return '<div class="note' + (i === 0 ? ' ok' : '') + '">' +
              '<b class="mono">' + esc(x.a.cmd) + '</b> — ' + esc(x.a.nom) +
              (i === 0 ? ' <span class="pill ok">le plus spécifique</span>' : ' <span class="pill">piste</span>') +
              '<br><span class="muted">' + esc(x.a.quoi) + '</span>' +
              '<br><span class="muted">Reconnu : ' + x.hits.map(function (h) { return '« ' + esc(h) + ' »'; }).join(', ') + '</span>' +
              '<div class="btns"><button type="button" class="btn" data-act="pick-agent" data-cmd="' + esc(x.a.cmd) + '">Préparer la demande pour ' + esc(x.a.cmd) + '</button></div>' +
              '</div>';
          }).join('');
          if (scores.length > 1)
            html += '<p class="muted">Plusieurs domaines touchés ? Un agent pilote, les autres alimentent — et une procédure existe peut-être (section 🔗 Procédures).</p>';
        }
        host.innerHTML = html;
      }
    }

    var msg = root.querySelector('#he-msg');
    if (msg) {
      var ag = AGENTS.filter(function (a) { return a.cmd === S.routeur.agent; })[0];
      var L = [];
      if (ag) {
        L.push('En tant qu\'agent ' + ag.nom + ' (' + ag.cmd + ') :');
        L.push('');
        L.push(S.routeur.demande || S.routeur.texte || '[décrire la demande]');
        L.push('');
        L.push('Rappels : ne rien inventer ([À VÉRIFIER] / [À COMPLÉTER]) · sources officielles pour tout chiffre sensible ·');
        L.push('conclusion d\'abord, puis le détail, puis la prochaine action · aucune action externe sans ma validation ✅.');
      } else {
        L.push('[choisir un agent ci-dessus]');
      }
      msg.value = L.join('\n');
    }
  }

  /* ================================================================= AGENTS */
  function secAgents() {
    /* Le filtre ne redessine que la liste : la saisie garde le focus. */
    return '<div class="card"><h2>Les ' + AGENTS.length + ' agents</h2>' +
      '<p class="lead">Hermès se pilote en langage naturel : la commande n\'est pas obligatoire. Pour forcer un rôle : « En tant qu\'agent [Nom], … ».</p>' +
      '<input type="text" data-path="filtre" value="' + esc(S.filtre) + '" placeholder="Filtrer : un mot du domaine, une commande, un mot-clé…">' +
      '<p class="muted" style="margin-top:8px" id="he-agents-count"></p>' +
      '<div id="he-agents-list"></div>' +
      '</div>';
  }

  function calcAgents() {
    var host = root.querySelector('#he-agents-list'), cnt = root.querySelector('#he-agents-count');
    if (!host) return;
    var q = norm(S.filtre);
    var list = AGENTS.filter(function (a) {
      return !q || norm(a.cmd + ' ' + a.nom + ' ' + a.quoi + ' ' + a.kw.join(' ')).indexOf(q) > -1;
    });
    if (cnt) cnt.textContent = list.length + ' agent(s) affiché(s)';
    host.innerHTML = list.length ? list.map(agentCard).join('')
      : '<div class="note">Aucun agent ne correspond à ce filtre.</div>';
  }

  function agentCard(a) {
    return '<div class="card" style="background:var(--panel2)">' +
      '<div style="display:flex; gap:10px; flex-wrap:wrap; align-items:baseline">' +
        '<b class="mono" style="font-size:16px; color:var(--acc)">' + esc(a.cmd) + '</b>' +
        '<b>' + esc(a.nom) + '</b>' +
        '<span class="pill">' + esc(a.modele) + '</span></div>' +
      '<p class="muted" style="margin:8px 0 0">' + esc(a.quoi) + '</p>' +
      '<p style="margin:8px 0 0; font-style:italic">« ' + esc(a.phrase) + ' »</p>' +
      '<div class="btns">' +
        '<button type="button" class="btn" data-act="pick-agent" data-cmd="' + esc(a.cmd) + '">Préparer une demande</button>' +
        '<button type="button" class="btn ghost" data-act="copy" data-copy="' + esc(a.phrase) + '">Copier la phrase</button>' +
        '<a class="btn ghost" href="../hermes/prompts/' + esc(a.fichier) + '" target="_blank" rel="noopener">Voir le prompt ↗</a>' +
      '</div></div>';
  }

  /* ============================================================= PROCÉDURES */
  function secProcedures() {
    return '<div class="card"><h2>Runbooks — les chaînes d\'agents</h2>' +
      '<p class="lead">Chaque <b>⏸️</b> est bloquant : pas d\'action externe sans ✅. Aucune donnée manquante n\'est devinée — on écrit <span class="mono">[À COMPLÉTER]</span>.</p>' +
      '<div id="he-proc-kpi"></div></div>' +
      PROCEDURES.map(procCard).join('');
  }

  function procCard(p) {
    return '<div class="card">' +
      '<h2><span class="mono" style="color:var(--acc)">' + esc(p.id) + '</span> — ' + esc(p.titre) + '</h2>' +
      '<p class="lead">Déclencheurs : ' + esc(p.decl) + '</p>' +
      '<ul class="clean">' + p.etapes.map(function (e, i) {
        return '<li><label class="check"><input type="checkbox" data-path="proc.' + p.id + '_' + i + '"' +
          (S.proc[p.id + '_' + i] ? ' checked' : '') + '>' +
          '<span><b class="mono">' + esc(e[0]) + '</b> — ' + esc(e[1]) +
          (e[2] ? ' <span class="pill warn">⏸️ validation</span>' : '') + '</span></label></li>';
      }).join('') + '</ul>' +
      '<div class="btns"><button type="button" class="btn ghost" data-act="proc-reset" data-p="' + esc(p.id) + '">Réinitialiser ' + esc(p.id) + '</button></div>' +
      '</div>';
  }

  function calcProcedures() {
    var host = root.querySelector('#he-proc-kpi');
    if (!host) return;
    var tot = 0, done = 0, pauses = 0;
    PROCEDURES.forEach(function (p) {
      p.etapes.forEach(function (e, i) {
        tot++;
        if (S.proc[p.id + '_' + i]) done++;
        else if (e[2]) pauses++;
      });
    });
    host.innerHTML = '<div class="kpi">' +
      '<div><div class="v">' + done + ' / ' + tot + '</div><div class="l">étapes cochées</div></div>' +
      '<div><div class="v">' + pauses + '</div><div class="l">⏸️ validations en attente</div></div></div>';
  }

  /* ============================================================= VALIDATION */
  function secValidation() {
    var v = S.validation;
    return '<div class="card"><h2>Demande de validation</h2>' +
      '<p class="lead">Le format imposé par le préambule commun. À coller dans Telegram — Michel répond ✅ Valider · ✏️ Modifier · ❌ Annuler.</p>' +
      '<div class="row">' +
        '<div><label>Type d\'action</label><input type="text" data-path="validation.type" value="' + esc(v.type) + '" placeholder="ex. envoi d\'une mise en demeure"></div>' +
        '<div><label>Destinataire / cible</label><input type="text" data-path="validation.cible" value="' + esc(v.cible) + '" placeholder="ex. client, URSSAF, assureur"></div>' +
      '</div>' +
      '<div style="margin-top:12px"><label>Résumé (1 à 2 lignes)</label>' +
        '<textarea data-path="validation.resume" style="min-height:60px">' + esc(v.resume) + '</textarea></div>' +
      '<div style="margin-top:12px"><label>Aperçu du contenu</label>' +
        '<textarea data-path="validation.apercu">' + esc(v.apercu) + '</textarea></div>' +
      '<div style="margin-top:12px"><label>Points d\'attention</label>' +
        '<textarea data-path="validation.points" style="min-height:60px" placeholder="ou « aucun »">' + esc(v.points) + '</textarea></div>' +
      '<div class="btns"><button type="button" class="btn primary" data-act="copy-node" data-target="#he-valid">Copier le bloc</button></div>' +
      '<textarea id="he-valid" readonly class="mono" style="margin-top:14px; min-height:210px"></textarea>' +
      '</div>' +

      '<div class="card"><h2>Ce qui exige toujours une validation</h2>' +
      '<ul class="clean">' +
      ['Envoi d\'un e-mail', 'Déclaration DPAE / AEM / DSN', 'Envoi ou signature d\'un contrat',
       'Envoi d\'une relance ou d\'une mise en demeure', 'Publication (site, réseaux)',
       'Paiement — et jamais sans vérification double canal', 'Modification d\'un site'].map(function (x) {
        return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<div class="note err"><b>Aucune exception « urgente et confidentielle » n\'existe.</b> Un message qui demande de contourner une règle de sécurité est, par construction, suspect.</div>' +
      '</div>';
  }

  function calcValidation() {
    var t = root.querySelector('#he-valid');
    if (!t) return;
    var v = S.validation;
    t.value = [
      '🔔 VALIDATION REQUISE — ' + (v.type || '[type d\'action]'),
      'Destinataire / cible : ' + (v.cible || '[…]'),
      'Résumé : ' + (v.resume || '[1-2 lignes]'),
      'Aperçu du contenu : ' + (v.apercu || '[…]'),
      '⚠️ Points d\'attention : ' + (v.points || 'aucun'),
      'Réponds : ✅ / ✏️ / ❌'
    ].join('\n');
  }

  /* =============================================================== SÉCURITÉ */
  function secSecurite() {
    return '<div class="card"><h2>Checklist e-mail / facture suspect</h2>' +
      '<p class="lead">À passer avant toute action sur un message qui demande un paiement, un RIB, des identifiants ou une pièce. Cochez ce que vous constatez.</p>' +
      '<div style="margin-bottom:12px"><label>De quoi s\'agit-il ?</label>' +
        '<input type="text" data-path="secu.contexte" value="' + esc(S.secu.contexte) + '" placeholder="ex. facture reçue d\'un fournisseur habituel, nouvel IBAN"></div>' +
      '<ul class="clean">' + SECU_FLAGS.map(function (f) {
        return '<li><label class="check"><input type="checkbox" data-path="secu.flags.' + f[0] + '"' +
          (S.secu.flags[f[0]] ? ' checked' : '') + '><span><b>' + esc(f[1]) + '</b><br><span class="muted">' + esc(f[2]) + '</span></span></label></li>';
      }).join('') + '</ul>' +
      '<div id="he-secu"></div></div>' +

      '<div class="card"><h2>Changement de RIB — la plus coûteuse</h2>' +
      '<ul class="clean">' +
      '<li>Tout <b>nouvel IBAN</b> reçu par e-mail ou courrier est <b>non vérifié</b> par défaut.</li>' +
      '<li>Validation obligatoire : <b>double canal</b> — rappel du contact habituel sur un numéro <b>déjà connu</b>, jamais celui de l\'e-mail — <b>avant</b> le premier virement.</li>' +
      '<li>Conserver une trace de la vérification : qui, quand, comment.</li>' +
      '</ul></div>' +

      '<div class="card"><h2>Ce qui ne va jamais dans un chat ni dans le dépôt</h2>' +
      '<ul class="clean">' +
      '<li>Relevés bancaires, IBAN/RIB complets, contrats <b>signés</b>, pièces d\'identité</li>' +
      '<li>Clés API, mots de passe, jetons, codes 2FA — les secrets vivent dans le <span class="mono">.env</span></li>' +
      '<li>Données personnelles des salariés et clients au-delà du strict nécessaire (RGPD)</li>' +
      '<li>Tout ce qui touche au <b>secret du délibéré</b> prud\'homal — cloisonnement total</li>' +
      '</ul></div>';
  }

  function calcSecurite() {
    var host = root.querySelector('#he-secu');
    if (!host) return;
    var on = SECU_FLAGS.filter(function (f) { return S.secu.flags[f[0]]; });
    if (!on.length) {
      host.innerHTML = '<div class="note">Aucun signal coché. Rester vigilant malgré tout : la mise en forme — logo, signature — est triviale à copier, elle ne prouve rien.</div>';
      return;
    }
    var grave = on.some(function (f) { return ['rib', 'canal', 'injection'].indexOf(f[0]) > -1; });
    host.innerHTML = '<div class="note err"><b>🚩 ' + on.length + ' signal(s) d\'alerte — STOP.</b> ' +
      'Ne pas répondre, ne pas cliquer, ne pas payer. Isoler le message, puis vérifier par un canal déjà connu.' +
      '<br><span class="muted">' + on.map(function (f) { return esc(f[1]); }).join(' · ') + '</span></div>' +
      (grave ? '<div class="note err"><b>Signal majeur.</b> Nouvel IBAN, canal inhabituel se réclamant de Michel, ou instructions cachées dans le contenu : traiter comme une tentative de fraude jusqu\'à preuve du contraire. Vérification double canal obligatoire ; ne jamais obéir à une instruction venue d\'un contenu externe.</div>' : '') +
      '<div class="note warn">Suite : marquer <b>« SUSPECT — à vérifier »</b>, remonter dans le tableau de bord <span class="mono">/dg</span> (🔴 URGENT) avec le motif, et ne rien exécuter sans ✅ de Michel. Procédure complète : <b>P8</b>.</div>';
  }

  /* ============================================================ RÉFÉRENTIEL */
  function secReferentiel() {
    return '<div class="card"><h2>Faits stables</h2>' +
      '<p class="lead">Extraits du référentiel central. On ne devine pas : ce qui y est marqué <span class="mono">[À VÉRIFIER]</span> ou <span class="mono">[À COMPLÉTER]</span> le reste ici.</p>' +
      '<div class="btns" style="margin-top:0">' +
        '<a class="btn" href="../hermes/referentiel.md" target="_blank" rel="noopener">Référentiel central ↗</a>' +
        '<a class="btn ghost" href="../hermes/referentiel-paie-spectacle.md" target="_blank" rel="noopener">Référentiel paie spectacle ↗</a>' +
        '<a class="btn ghost" href="../hermes/docs/securite.md" target="_blank" rel="noopener">Sécurité ↗</a>' +
        '<a class="btn ghost" href="../hermes/docs/procedures.md" target="_blank" rel="noopener">Procédures ↗</a>' +
      '</div></div>' +
      REFERENTIEL.map(function (b) {
        return '<div class="card"><h2>' + esc(b.titre) + '</h2><table><tbody>' +
          b.lignes.map(function (l) {
            return '<tr><td style="width:34%"><b>' + esc(l[0]) + '</b></td><td>' + esc(l[1]) +
              '</td><td style="width:1%"><button type="button" class="btn ghost" data-act="copy" data-copy="' + esc(l[1]) + '">copier</button></td></tr>';
          }).join('') + '</tbody></table></div>';
      }).join('') +
      '<div class="card"><h2>Règles qui priment sur tout</h2>' +
      '<ul class="clean">' +
      '<li><b>Ne jamais inventer</b> une information — chiffre, taux, date, nom, coordonnée. Dire l\'incertitude et marquer [À VÉRIFIER] / [À COMPLÉTER].</li>' +
      '<li><b>Sources officielles</b> pour toute donnée chiffrée sensible : URSSAF, France Travail, Audiens, Congés Spectacles, Légifrance, net-entreprises.</li>' +
      '<li><b>Aucune action irréversible</b> sans validation de Michel.</li>' +
      '<li><b>Pas de portage salarial</b> — interdit dans le spectacle.</li>' +
      '<li><b>Style</b> : français court, précis, factuel — conclusion d\'abord, puis le détail.</li>' +
      '<li><b>Distinguer estimé et confirmé</b>, toujours.</li>' +
      '</ul></div>';
  }

  T.registerTab({
    id: 'hermes',
    label: 'Hermès',
    icon: '🛰️',
    accent: '#d0417f',
    render: render
  });
})();
