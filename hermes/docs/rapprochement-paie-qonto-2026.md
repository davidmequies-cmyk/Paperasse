# Rapprochement paie ↔ banque — exercice 2026 (Neshama Music)

> **Date du contrôle :** 05/08/2026
> **Sources — aucune donnée saisie à la main, tout est issu de ces fichiers :**
> - `recap paie 2026.pdf` — sPAIEctacle 7.20, récapitulatif des paies, édité le 05/08/26 (MDMProd 40 paies + MDM/Neshama 513 paies)
> - `livrepaie 2026.pdf` — livre de paie 2026, centralisation par analytique
> - Relevés Qonto **NESHAMA MUSIC** compte principal, 01/2026 → 07/2026 (7 relevés PDF) + opérations du 01 au 05/08/2026 (API)
> - Comptes externes rattachés à Qonto : **Société Générale** (55 opérations 2026) et **BoursoBank** (132 opérations 2026)
>
> ⚠️ **Hypothèse de lecture** : « contour » a été compris comme **Qonto** (aucun fichier, mail ou outil nommé « Contour » n'existe dans le Drive, la messagerie ou le dépôt). Le rapprochement est donc **paie ↔ trésorerie bancaire**. Si « contour » désigne autre chose (portail expert-comptable, autre logiciel), le travail est à refaire sur cette source.
>
> **Contrôle de fiabilité de l'extraction** : les 562 lignes extraites des relevés recollent **au centime** avec les totaux Entrées/Sorties imprimés sur chacun des 7 relevés. Aucune ligne perdue.

---

## 1. Ce que dit la paie (récap sPAIEctacle 2026)

### Neshama Music — SIRET 807 857 719 00023 — 513 paies

| Poste | Montant |
|---|---:|
| Salaire brut | 388 294,55 |
| Charges salariales | 83 318,25 |
| Charges patronales | 206 661,87 |
| **Total charges** | **289 980,12** |
| Net à payer avant impôt | 306 075,18 |
| Prélèvement à la source | 5 083,80 |
| **Net à payer après impôt** | **300 991,38** |
| Coût employeur | 596 384,70 |

**Sortie de trésorerie théorique de la paie 2026** = net après impôt 300 991,38 + PAS 5 083,80 + charges 289 980,12 = **596 055,30 €**
*(l'écart de 329,40 € avec le coût employeur affiché = part salariale des titres restaurant, marquée « - CE » donc hors coût employeur : cohérent.)*

### Ventilation par organisme (base du rapprochement)

| Organisme | Dû 2026 |
|---|---:|
| URSSAF (Urssaf 125 835,86 + chômage perm. 462,44 + CFP/TA 9 671,95) | 135 970,25 |
| France Travail — chômage intermittents | 44 795,88 |
| Audiens retraite (Arrco-Agirc) | 40 415,02 |
| Audiens prévoyance / santé / AGEPRO | 6 975,87 |
| Congés Spectacles | 57 872,63 |
| AFDAS | 467,50 |
| Médecine du travail intermittents | 28,61 |
| DGFiP — retenue à la source artistes fiscalement étrangers | 3 454,36 |
| **Total charges** | **289 980,12** |
| DGFiP — prélèvement à la source (hors charges) | 5 083,80 |

### MDMProd — SIRET 825 335 003 00042 — 40 paies

Brut 19 839,69 · charges 11 968,35 · net après impôt 15 382,65 · **coût employeur 27 492,30**.
👉 **Non rapproché** : MDMProd est une autre société, sa banque n'est pas connectée ici. Seul Neshama est vérifiable en l'état.

---

## 2. Salaires nets : paie vs virements bancaires

Tous les virements de paie portent un libellé normalisé « PAIE MDM *prénom nom* *mois* », ce qui permet de les affecter à leur période.

| | Montant | Nb virements |
|---|---:|---:|
| Virements « PAIE » périodes 2026 — Qonto (01/01 → 05/08) | 278 815,19 | 257 |
| Virements « PAIE » périodes 2026 — BoursoBank + SG (permanents) | 6 630,50 | 8 |
| **Total décaissé pour les périodes 2026** | **285 445,69** | **265** |
| Net à payer après impôt (récap 2026) | 300 991,38 | 513 paies |
| **Écart = reste à payer** | **15 545,69** | |

**Explication de l'écart** : la paie de juillet n'est pas terminée. Le 04/08, 13 virements seulement sont partis (5 595,04 €) — permanents et techniciens. **Le lot des artistes de juillet reste à passer.**

Pour mémoire, hors périmètre 2026 : **53 275,24 €** (42 virements) versés en janvier 2026 au titre de décembre 2025 (+ un rattrapage « février 2025 » de 2 063,85 €).

**Contrôles complémentaires :**
- ✅ **Aucun doublon** : pas un seul cas de même bénéficiaire + même période + même montant payé deux fois.
- ✅ 102 bénéficiaires distincts côté banque pour 513 bulletins — cohérent (plusieurs cachets par personne).
- ✅ Chaque virement de paie porte sa période dans le libellé (aucun virement non identifiable).

---

## 3. Cotisations : dû 2026 vs décaissé au 05/08/2026

Les paiements aux organismes sont décalés d'un à deux mois sur la paie. Le tableau ci-dessous ne retient donc **que les paiements dont la référence bancaire porte une période 2026** (les références URSSAF portent le mois, les prélèvements retraite portent `202601M`, `202602M`…).

| Organisme | Dû 2026 | Décaissé (périodes 2026) | Écart |
|---|---:|---:|---:|
| URSSAF | 135 970,25 | 128 882,00 | **7 088,25** |
| France Travail (chômage int.) | 44 795,88 | 42 204,44 | **2 591,44** |
| Audiens (retraite + prévoyance + Congés Spectacles) | 105 263,52 | 66 490,84 | **38 772,68** |
| AFDAS | 467,50 | 0,00 | **467,50** |
| Médecine du travail | 28,61 | 2 942,41 *(Thalie Santé, 06/07, via SG)* | n/s |
| DGFiP — retenue à la source artistes étrangers | 3 454,36 | 0,00 | **3 454,36** |
| DGFiP — PAS | 5 083,80 | 4 495,00 (janv.→juin) | **588,80** |

Décaissements totaux constatés toutes périodes confondues (2025 incluses) : URSSAF 162 018,00 · France Travail 60 293,30 · Audiens 118 127,19 · PAS 5 600,00.

### Contre-vérification globale

| | Montant |
|---|---:|
| Coût de trésorerie de la paie 2026 (§1) | 596 055,30 |
| Décaissé au 05/08 pour les périodes 2026 (salaires + organismes) | 527 517,97 |
| **Reste à décaisser** | **68 537,33** |

Ce reste se décompose exactement en : salaires de juillet 15 545,69 + Audiens 38 772,68 + URSSAF 7 088,25 + France Travail 2 591,44 + RAS artistes 3 454,36 + PAS juillet 588,80 + AFDAS 467,50 + médecine 28,61. **Les deux méthodes concordent : la paie et la banque se recollent, il n'y a pas de trou inexpliqué.**

---

## 4. Points à vérifier (par ordre d'enjeu)

### 🔴 1. Audiens — ~38 800 € d'écart, ce n'est pas seulement du décalage
Détail des paiements 2026 : retraite `202601M` (5 971,71), `202602M` (2 322,26), `202603M` (6 990,91) prélevés le **28/04** — puis **plus aucun prélèvement retraite identifié pour avril à juillet**. Côté Congés Spectacles, les prélèvements de mai (12 329,23), juin (11 454,95) et juillet (7 687,11 + 1 412,14) sont trop faibles pour couvrir un trimestre de CS (15,5 % sur ~370 k€ de base annuelle).
→ **À rapprocher des avis Audiens** (les libellés `AUDEN78493638.23158xx` ne disent pas à quel contrat ils se rattachent) : retraite avril→juillet et Congés Spectacles T2 semblent non réglés.

### 🟠 2. Retenue à la source artistes fiscalement étrangers — 3 454,36 € non identifiée
15 % sur 23 028,97 € (4 paies). Aucun versement DGFiP correspondant sur les trois comptes : les débits DGFiP/SIE sont uniquement TVA, IS et PAS.
→ Vérifier le dépôt et le paiement du **formulaire 2494** (exigible dans les 15 jours du mois suivant le versement).

### 🟠 3. Lydia Méquiès — mars et avril 2026 introuvables
Virements identifiés : janvier (09/02), février (03/03), mai (29/05), juin (12/07 + complément 109,80 le 13/07). **Mars et avril (≈ 1 000 € nets chacun) n'apparaissent sur aucun des trois comptes.** Les bulletins existent (analytique NSM : 6 paies « Tech - F »).
→ Soit versement par un autre canal, soit deux mois de salaire non versés.

### 🟠 4. URSSAF — échéancier et paiements fractionnés
Chaque mois est réglé en deux fois, à un mois d'écart (ex. février 26 : 8 350 € le 17/03 puis 19 684 € le 17/04). S'y ajoutent des paiements sur **périodes anciennes** — avril 2025 (1 723 € le 20/05), mai 2025 (1 723 € le 22/06), janvier 2026 (1 723 € le 21/07) — et un second compte URSSAF (réf. `…1549719944`) prélevé de **814 € tous les 20 du mois**.
→ Confirmer qu'il s'agit d'un **plan d'apurement** et vérifier s'il court des **majorations de retard**. 7 015,34 € de versements URSSAF ne portent aucune période (4 677 € le 25/03, 2 338,34 € le 20/02) : à identifier (cotisations ou majorations ?).

### 🟡 5. AFDAS 467,50 € — aucun paiement 2026
Peut être appelé annuellement ; à confirmer auprès de l'AFDAS.

### 🟡 6. Thalie Santé 2 942,41 € (06/07, compte SG)
La médecine du travail figure dans la paie pour 1 470,12 € (bloc AGEPRO/Audiens) + 28,61 €. Le montant prélevé est très supérieur : probable **régularisation ou adhésion annuelle**, à rapprocher de la facture.

### 🟡 7. Frontière d'exercice décembre 2025 / janvier 2026
Le livre de paie 2026 contient des analytiques **NOV25** (870 € brut) et **DEC25** (8 809,99 € brut), alors que les virements « décembre 2025 » (51 211,39 €) ont été traités ici comme relevant de 2025.
→ Si ces bulletins sont bien dans l'exercice 2026, l'écart « salaires » du §2 se réduit d'autant. À trancher sur le journal de paie mensuel.

### ⚪ 8. MDMProd — non contrôlable ici
27 492,30 € de coût employeur (40 paies) : aucun compte MDMProd n'est connecté. Rapprochement à faire séparément.

---

## 5. Conclusion

**La paie et la banque se recollent.** Aucun doublon, aucun virement de paie non identifiable, aucune sortie de trésorerie inexpliquée : les 596 055 € de coût de la paie 2026 se retrouvent intégralement, à 68 537 € près qui correspondent à des échéances non encore réglées au 05/08.

**Le vrai sujet n'est pas une erreur de paie, c'est un retard de règlement**, et il est concentré sur **Audiens (~38 800 €)**, avec en second rang la retenue à la source artistes étrangers (3 454 €) et deux mois de salaire d'une permanente à éclaircir.

Contexte de trésorerie à garder en tête : le solde du compte principal est descendu à **580,98 €** le 04/08 avant l'acompte Ponthieu de 30 000 €, et le lot des artistes de juillet n'est pas encore passé.

---

*Méthode reproductible : extraction des relevés PDF Qonto → contrôle de bouclage sur les totaux imprimés → classement par organisme et par période déclarée dans les libellés → confrontation au récapitulatif sPAIEctacle. Tous les montants cités sont vérifiables ligne à ligne dans les relevés.*
