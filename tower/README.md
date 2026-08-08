# 🗼 Tower — console Groupe MDM

Console locale à onglets. Un fichier HTML autonome : **double-clic, ça s'ouvre**, y compris
hors ligne. Aucune dépendance, aucun appel réseau, aucune donnée qui sort du poste.

```
tower/
├── index.html            # la coquille : barre d'onglets, routage, utilitaires
└── onglets/
    └── prudhommes.js     # ⚖️ onglet « Prud'hommes » (conseiller au CPH de Paris)
```

Ouvrir : `tower/index.html` (ou `open tower/index.html` sur Mac).
Raccourcis : `alt+1` … `alt+9` pour passer d'un onglet à l'autre. L'URL retient l'onglet
courant (`#/prudhommes`), les saisies sont conservées dans le navigateur (`localStorage`).

---

## ⚖️ L'onglet « Prud'hommes »

Poste de travail du conseiller prud'homme (CPH de Paris, Encadrement — Ch. 8). Huit sections,
adossées aux fiches du dossier [`../prudhommes/`](../prudhommes/) :

| Section | Ce qu'elle fait |
|---------|-----------------|
| 📋 **Audience** | Formation du jour (BCO / bureau de jugement / référé / départage) et ce qu'elle peut faire, check-list de préparation avec suivi, rappel du serment et du déport |
| ⏳ **Recevabilité** | Calcul de la date butoir de prescription (2 ans · 12 mois · 3 ans · 5 ans) et comparaison avec la date de saisine → recevable / prescrit |
| ⚖️ **Charge de la preuve** | Qui prouve quoi, texte par texte, et la grille de lecture du licenciement |
| 🧭 **Délibéré** | La grille en 8 temps en check-list, les trois biais à neutraliser, la checklist express avant de clore |
| 🧮 **Chiffrage** | Ancienneté, salaire de référence (moyennes 12 et 3 mois), fourchette L1235-3, plancher du licenciement nul, travail dissimulé |
| ✍️ **Rédaction** | Chefs de demande un par un, contrôle *ultra / infra petita*, génération de la trame de motivation et du « PAR CES MOTIFS » (copier / imprimer) |
| 🔗 **Sources** | Légifrance, Cour de cassation, Justice.fr, conventions collectives, articles réflexe, notes de droit personnelles |
| 🔥 **Garder la flamme** | Pourquoi le rôle compte, ce qui use et comment tenir |

### Deux règles qui gouvernent cet onglet

1. **Il ne connaît aucun chiffre de droit et n'en invente aucun.**
   Les fourchettes du barème `L1235-3` ne sont pas dans le code de l'outil : vous les lisez sur
   Légifrance (un bouton ouvre l'article), vous les saisissez, l'outil calcule — et **mémorise
   votre saisie vérifiée**, datée, dans votre propre table. Vous construisez votre barème
   vérifié, ligne après ligne, au lieu de faire confiance à un tableau recopié.
   Les durées de prescription affichées viennent des fiches du dépôt, avec leur article et leur
   lien : elles restent à vérifier à la date des faits.

2. **Secret du délibéré.** Tout reste dans le navigateur, rien ne part sur le réseau. Malgré
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
