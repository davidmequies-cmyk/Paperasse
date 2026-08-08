# 🗼 Tower — console Groupe MDM

Console locale à onglets. Un fichier HTML autonome : **double-clic, ça s'ouvre**, y compris
hors ligne. Aucune dépendance, aucun appel réseau, aucune donnée qui sort du poste.

```
tower/
├── index.html            # la coquille : barre d'onglets, routage, utilitaires
└── onglets/
    ├── hermes.js         # 🛰️ onglet « Hermès » — tour de contrôle de l'agent IA
    └── prudhommes.js     # ⚖️ onglet « Prud'hommes » (conseiller au CPH de Paris)
```

Ouvrir : `tower/index.html` (ou `open tower/index.html` sur Mac).
Raccourcis : `alt+1` … `alt+9` pour passer d'un onglet à l'autre. L'URL retient l'onglet
courant (`#/prudhommes`), les saisies sont conservées dans le navigateur (`localStorage`).

---

## 🛰️ L'onglet « Hermès » — tour de contrôle

Cockpit de l'agent IA du Groupe MDM. Il **prépare**, il ne déclenche rien : la règle
*Hermès prépare → Michel valide ✅ / ✏️ / ❌ → Hermès exécute* vaut aussi pour la console.

| Section | Ce qu'elle fait |
|---------|-----------------|
| 🛰️ **Pilotage** | Compteurs (agents, procédures, automatismes, procédures en cours), les 3 automatismes, la répartition des modèles, le rappel du cloisonnement prud'homal |
| 🎯 **Routeur** | Écrivez la demande en langage naturel → l'agent le plus spécifique, avec les mots reconnus ; détecte aussi les **signaux d'arnaque** et les sujets **hors périmètre** (fonction de juge). Puis compose le message prêt à coller, avec les rappels du préambule |
| 🤖 **Agents** | Les 20 agents filtrables : commande, rôle, modèle conseillé, phrase de déclenchement, lien vers le prompt |
| 🔗 **Procédures** | Les 8 runbooks (P1–P8) étape par étape, avec les **⏸️ validations** signalées et l'avancement mémorisé |
| 🔔 **Validation** | Génère le bloc `🔔 VALIDATION REQUISE` au format imposé, prêt à coller dans Telegram |
| 🛡️ **Sécurité** | Checklist e-mail / facture suspect : cochez les signaux, l'outil rend un verdict (STOP, signal majeur, suite à donner) ; règle du double canal, données interdites |
| 📒 **Référentiel** | Faits stables du Groupe (entités, SIREN, sièges, TVA, AT/MP, tarifs SpectaGestion, repères paie) avec bouton copier — les `[À VÉRIFIER]` restent marqués |

Tout est repris des fichiers de [`../hermes/`](../hermes/README.md) : prompts, `docs/procedures.md`,
`docs/securite.md`, `docs/mode-emploi.md`, `referentiel.md`. Rien n'y est inventé — si le
référentiel marque une valeur `[À VÉRIFIER]`, l'onglet la marque aussi.

---

## ⚖️ L'onglet « Prud'hommes »

Poste de travail du conseiller prud'homme (CPH de Paris, Encadrement — Ch. 8). Dix sections,
adossées aux fiches du dossier [`../prudhommes/`](../prudhommes/) :

| Section | Ce qu'elle fait |
|---------|-----------------|
| 📋 **Audience** | Formation du jour (BCO / bureau de jugement / référé / départage) et ce qu'elle peut faire, check-list de préparation avec suivi, rappel du serment et du déport |
| ⏳ **Recevabilité** | Calcul de la date butoir de prescription (2 ans · 12 mois · 3 ans · 5 ans) et comparaison avec la date de saisine → recevable / prescrit |
| ⚖️ **Charge de la preuve** | Qui prouve quoi, texte par texte, et la grille de lecture du licenciement |
| 🧠 **Décision** | Cinq chemins de qualification (faute, économique, nullité, heures sup / rappel de salaire, requalification–prise d'acte–résiliation) : ce qu'il faut établir, qui le prouve, ce qui en découle, et **ce qui fait casser une décision** |
| 🧭 **Délibéré** | La grille en 8 temps en check-list, les trois biais à neutraliser, la checklist express avant de clore |
| 🧮 **Chiffrage** | Ancienneté, salaire de référence (moyennes 12 et 3 mois), fourchette L1235-3, plancher du licenciement nul, travail dissimulé |
| ✍️ **Rédaction** | Chefs de demande un par un, contrôle *ultra / infra petita*, génération de la trame de motivation et du « PAR CES MOTIFS » (copier / imprimer) |
| 📚 **Bibliothèque** | La **carte du droit** par matière : compétence et procédure, statut du conseiller, prescriptions, licenciement, preuve, temps de travail, harcèlement et discrimination, rédaction — chaque référence avec son lien. Plus les arrêts repère et vos notes de droit |
| 🔎 **Recherche** | Recherche restreinte aux sites officiels (Légifrance, Cour de cassation, code.travail, Justice.fr, Service-public), accès direct par n° d'article, n° de pourvoi ou convention collective, et génération de la question à poser au sous-agent `conseiller-prudhommes` qui, lui, interroge les sources **en direct** |
| 🔥 **Garder la flamme** | Pourquoi le rôle compte, ce qui use et comment tenir |

### Trois règles qui gouvernent cet onglet

1. **Il ne connaît aucun chiffre de droit et n'en invente aucun.**
   Les fourchettes du barème `L1235-3` ne sont pas dans le code de l'outil : vous les lisez sur
   Légifrance (un bouton ouvre l'article), vous les saisissez, l'outil calcule — et **mémorise
   votre saisie vérifiée**, datée, dans votre propre table. Vous construisez votre barème
   vérifié, ligne après ligne, au lieu de faire confiance à un tableau recopié.
   Les durées de prescription affichées viennent des fiches du dépôt, avec leur article et leur
   lien : elles restent à vérifier à la date des faits.

2. **Il contient la carte du droit, pas le droit.**
   La bibliothèque ne recopie aucun texte de loi et ne cite aucun arrêt de mémoire : elle
   range, par matière, les **références déjà vérifiées dans les fiches du dépôt**, avec le lien
   pour aller lire le texte en vigueur à la date des faits. Ce qui n'y est pas ne s'invente pas —
   la section 🔎 Recherche l'envoie chercher à la source, et le sous-agent
   `conseiller-prudhommes` fait la vérification en direct. Un outil hors ligne qui prétendrait
   connaître « toutes les lois et toutes les affaires » serait périmé le jour de son écriture.

3. **Secret du délibéré.** Tout reste dans le navigateur, rien ne part sur le réseau. Malgré
   cela : aucun nom de partie, aucune pièce, jamais le sens d'un vote. Un bouton
   « Effacer toute la session » est présent en haut de l'onglet — réflexe de fin de session.

---

## ➕ Ajouter un onglet

1. Créer `tower/onglets/mon-onglet.js` :

```js
(function () {
  TOWER.registerTab({
    id: 'mon-onglet',          // → #/mon-onglet
    label: 'Mon onglet',
    icon: '🧰',
    accent: '#d0417f',         // couleur du soulignement (optionnel)
    render: function (el) {
      el.innerHTML = '<div class="wrap"><div class="card"><h2>Bonjour</h2></div></div>';
    }
  });
})();
```

2. Ajouter la ligne `<script src="onglets/mon-onglet.js"></script>` en bas de `index.html`.

Utilitaires fournis par la coquille : `TOWER.store('cle')` (lecture/écriture/effacement dans
`localStorage`), `TOWER.esc(texte)`, `TOWER.copy(texte, bouton)`. Classes CSS prêtes à l'emploi :
`wrap`, `card`, `row`, `btn`, `note`, `kpi`, `check`, `pill`, `mono`, `muted`.

---

*Dépôt privé. Ne jamais committer de pièces de dossier, de noms de parties, ni rien de couvert
par le secret du délibéré.*
