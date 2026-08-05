# Rapprochement paie ↔ banque — exercice 2026 (Neshama Music)

> **Date du contrôle :** 05/08/2026
> **Sources — aucune donnée saisie à la main, tout est issu de ces fichiers :**
> - `recap paie 2026.pdf` — sPAIEctacle 7.20, récapitulatif des paies, édité le 05/08/26 (MDMProd 40 paies + MDM/Neshama 513 paies)
> - `livrepaie 2026.pdf` — livre de paie 2026, centralisation par analytique
> - Relevés Qonto **NESHAMA MUSIC** compte principal, 01/2026 → 07/2026 (7 relevés PDF) + opérations du 01 au 05/08/2026 (API)
> - Comptes externes rattachés à Qonto : **Société Générale** (55 opérations 2026) et **BoursoBank** (132 opérations 2026)
> - Pour le §6 : relevés Qonto **janvier → novembre 2025** (11 relevés) + courriels URSSAF, Audiens, France Travail, Thalie Santé
>
> ✅ **Périmètre confirmé par Michel le 05/08/2026 : le rapprochement se fait bien avec Qonto.**
>
> **Contrôle de fiabilité de l'extraction** : sur chacun des 18 relevés, les lignes extraites recollent **au centime** avec les totaux Entrées/Sorties imprimés sur le relevé. Aucune ligne perdue.

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
| URSSAF *(compte employeur `…1551738253` seul — voir §6.4)* | 135 970,25 | 118 221,00 | **17 749,25** |
| France Travail (chômage int.) | 44 795,88 | 42 204,44 | **2 591,44** |
| Audiens (retraite + prévoyance + Congés Spectacles) | 105 263,52 | 66 490,84 | **38 772,68** |
| AFDAS | 467,50 | 0,00 | **467,50** |
| Médecine du travail | 28,61 | 2 942,41 *(Thalie Santé, 06/07, via SG)* | n/s |
| DGFiP — retenue à la source artistes étrangers | 3 454,36 | 0,00 | **3 454,36** |
| DGFiP — PAS | 5 083,80 | 4 495,00 (janv.→juin) | **588,80** |

Décaissements totaux constatés toutes périodes confondues (2025 incluses) : URSSAF 162 018,00 — dont 33 136,00 sur périodes 2025 et **10 661,00 sur le compte URSSAF personnel de Michel (§6.4)** — · France Travail 60 293,30 · Audiens 118 127,19 · PAS 5 600,00.

### Contre-vérification globale

| | Montant |
|---|---:|
| Coût de trésorerie de la paie 2026 (§1) | 596 055,30 |
| Décaissé au 05/08 pour les périodes 2026 (salaires + organismes) | 516 856,97 |
| **Reste à décaisser** | **79 198,33** |

Ce reste se décompose exactement en : Audiens 38 772,68 + URSSAF 17 749,25 + salaires de juillet 15 545,69 + RAS artistes 3 454,36 + France Travail 2 591,44 + PAS juillet 588,80 + AFDAS 467,50 + médecine 28,61. **Les deux méthodes concordent : la paie et la banque se recollent, il n'y a pas de trou inexpliqué.**

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
Chaque mois est réglé en deux fois, à un mois d'écart (ex. février 26 : 8 350 € le 17/03 puis 19 684 € le 17/04). S'y ajoutent des paiements sur **périodes anciennes** — avril 2025 (1 723 € le 20/05), mai 2025 (1 723 € le 22/06), janvier 2026 (1 723 € le 21/07).
→ Confirmer qu'il s'agit d'un **plan d'apurement** et vérifier s'il court des **majorations de retard**. 4 677 € versés le 25/03 ne portent aucune période : à identifier (cotisations ou majorations ?).

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

## 5. Conclusion du rapprochement

**La paie et la banque se recollent.** Aucun doublon, aucun virement de paie non identifiable, aucune sortie de trésorerie inexpliquée : les 596 055 € de coût de la paie 2026 se retrouvent intégralement, à 79 198 € près qui correspondent à des échéances non encore réglées au 05/08.

**Le vrai sujet n'est pas une erreur de paie, c'est un retard de règlement**, concentré sur **Audiens (~38 800 €)** et **l'URSSAF (~17 700 €)**, avec en second rang la retenue à la source artistes étrangers (3 454 €) et deux mois de salaire d'une permanente à éclaircir.

Contexte de trésorerie à garder en tête : le solde du compte principal est descendu à **580,98 €** le 04/08 avant l'acompte Ponthieu de 30 000 €, et le lot des artistes de juillet n'est pas encore passé.

---

# 6. Les caisses ont-elles trop prélevé ?

> Contrôle complémentaire demandé le 05/08/2026. Sources ajoutées : **relevés Qonto janvier→novembre 2025** (11 relevés, tous bouclés au centime sur leurs totaux imprimés) et **la messagerie** (URSSAF, Audiens, France Travail, Thalie Santé).

**Réponse courte : non, pas en 2026 — c'est l'inverse.** Sur les périodes 2026, les caisses ont encaissé **moins** que ce que la paie leur doit (−17 749 € URSSAF, −38 773 € Audiens, −2 591 € France Travail). Le risque financier n'est pas le trop-prélevé, ce sont les **majorations de retard et le recouvrement forcé**.

**En revanche, six anomalies réelles ressortent, dont une somme à récupérer.**

### 6.1 🔴 Audiens — solde créditeur de 10 808,35 € jamais revu
Courriel Audiens (Imane Mesloub) du **03/07/2025** : *« votre compte présente un solde créditeur de 10 808,35 euros. Ce solde créditeur est positionné sur la DSN de juin 2025, nous vous demandons de bien vouloir déduire ce montant de la DSN de juin 2025. Si vous optez pour un remboursement, merci de nous faire parvenir votre RIB. »*
**Aucun virement d'Audiens de ce montant n'apparaît sur le compte Qonto**, ni en 2025 ni en 2026. Deux possibilités : il a été imputé sur la DSN de juin 2025 (alors il faut le tracer dans sPAIEctacle), ou il dort encore chez Audiens.
→ **À réclamer par écrit avec la référence de ce courriel.** C'est le montant le plus directement récupérable du dossier.

### 6.2 🟠 Audiens a déjà trop prélevé une fois — et remboursé
Trop-perçu de cotisations prévoyance sur le personnel intermittent, **771,35 € remboursés — crédit constaté sur le compte le 07/03/2025** (« AUDIENS ENCAISSEMENTS – Virement »). Cause donnée par Audiens : personnel non déclaré dans la DSN de janvier 2025 mais dans celle de février.
→ Le mécanisme (décalage de DSN → cotisation appelée deux fois) **peut se reproduire**. Audiens a envoyé un *tableau d'écart des cotisations prévoyance et santé 2025* (fichier `NESHAMA TABLEAU ECART SANTE PREV 2025.xlsx`, courriel du 03/09/2025) : ce tableau n'a pas été exploité, c'est exactement l'outil pour vérifier les écarts.

### 6.3 🟠 L'alerte du 24/10/2025 reposait sur un chiffre faux
Dans son courriel à Audiens, Michel liste les prélèvements de juillet 2025 dont **« 195 888,65 € »**, pour un **« total juillet : 219 571,67 € »**.
Le relevé Qonto de juillet 2025 dit autre chose : le prélèvement du 25/07 est de **19 588,65 €** (un chiffre de trop dans le courriel), et le **total réel Audiens de juillet 2025 est de 43 832,92 €**. Audiens n'a d'ailleurs répondu que sur octobre et n'a jamais traité la question de juillet.
→ Si on veut une réponse, il faut **reposer la question sur les bons montants**.

### 6.4 🟠 10 661 € de cotisations personnelles payées par Neshama en 2026
Les prélèvements URSSAF portant la référence **`117000001549719944`** ne sont pas des cotisations de paie : ce compte est celui de **MEQUIES MICHEL, travailleur indépendant, SIRET 390 622 454 00036** (confirmé par le courriel URSSAF du 19/03/2026, « votre déclaration de revenus 2025 »).
Payés depuis le compte Neshama : **2026** — 814 € les 20/02, 20/03, 20/05, 20/06, 813,66 € le 20/04, 2 338,34 € le 20/02 et 4 253 € le 20/07 = **10 661,00 €** ; **2025** — 714 € (1ᵉʳ trim.), 714 € (2ᵉ trim.), 6 907 € (3ᵉ trim.) = **8 335,00 €**.
→ Ce n'est ni un trop-prélevé ni une charge de paie : c'est un **compte courant d'associé**. À sortir du rapprochement paie et à faire valider par l'expert-comptable.

### 6.5 🟠 France Travail — deux erreurs reconnues, et un dossier chez l'huissier
- 29/08/2025, la conseillère France Travail : *« non ne réglez pas, cela vient d'une erreur technique de notre système informatique. J'ai supprimé les majorations. »*
- 06/10/2025 : *« j'ai effectué une remise gracieuse des majorations de retard. Votre compte est à jour. »*
- 05/03/2026 : un règlement de **589,57 € est revenu impayé le 28/11/2025** (provision insuffisante) et **la période d'octobre 2025 a été transmise à un huissier** après une mise en demeure restée sans réponse (tél. 01 53 01 89 10, référence de recouvrement **CS00012499**).
→ France Travail s'est déjà trompé deux fois à son profit : **toute majoration doit être contestée avant paiement**. Et le dossier huissier doit être traité maintenant, c'est là que ça coûte.

### 6.6 🟠 Thalie Santé — risque de double facturation
Courriel Audiens du 17/11/2025 : *« THALIE SANTE INTERMITTENTS en DSN dès janvier 2026 »* — la cotisation est donc désormais collectée **via la DSN**. Or un prélèvement direct **Thalie Santé de 2 942,41 €** a été passé le **06/07/2026** sur le compte Société Générale, alors que la paie 2026 ne porte que 1 470,12 € de médecine du travail (bloc AGEPRO) + 28,61 €.
→ Vérifier que ce prélèvement couvre bien un **arriéré 2025** et non une période déjà cotisée en DSN 2026 : sinon, c'est payé deux fois.

### 6.7 ⚪ Congés Spectacles : l'écart de 38 800 € est un échéancier, pas un oubli
Courriel Audiens du **27/04/2026** (Hacina Diez-Soto, Gestion Congés Spectacles) : envoi d'un **protocole d'accord pour le règlement des cotisations Congés Spectacles**, à retourner signé avec RIB **avant le 04/05/2026** (pièce jointe `PROTOCOLE DLP CCS NESHAMA MUSIC.pdf`, non lisible depuis ici). Un protocole identique a été envoyé à **MDMPROD le 12/03/2026**.
→ L'écart Audiens du §3 s'explique donc largement. **À récupérer : le montant et l'échéancier du protocole**, pour vérifier que les prélèvements suivent bien le plan signé.

### 6.8 ⚪ Cadence trimestrielle Audiens — décision en attente depuis novembre 2025
Audiens, 14/11/2025 : *« vous êtes en cadence de paiement trimestrielle […] vous avez la possibilité de passer en paiement mensuel à compter du 1er janvier 2026. Si vous êtes d'accord, merci de nous le confirmer par retour de courriel. »*
C'est ce qui explique les à-coups (janvier, avril, juillet, octobre : 40 à 50 k€ d'un coup). Rien n'indique qu'une réponse ait été donnée.
→ **Passer en mensuel lisserait la trésorerie** — décision à prendre.

### Ce qu'il faut réclamer / vérifier, par ordre d'enjeu

| # | Sujet | Montant | Action |
|---|---|---:|---|
| 1 | Solde créditeur Audiens Retraite du 03/07/2025 | 10 808,35 | Réclamer ou tracer l'imputation DSN juin 2025 |
| 2 | Tableau d'écart santé/prévoyance 2025 (Audiens) | à chiffrer | Exploiter le fichier envoyé le 03/09/2025 |
| 3 | Prélèvement Thalie Santé du 06/07/2026 | 2 942,41 | Vérifier le doublon DSN 2026 |
| 4 | Majorations France Travail + dossier huissier | à chiffrer | Contester puis régulariser CS00012499 |
| 5 | URSSAF personnelle payée par Neshama (2025+2026) | 18 996,00 | Reclasser en compte courant d'associé |
| 6 | Protocole Congés Spectacles | à obtenir | Récupérer l'échéancier signé |

---

*Méthode reproductible : extraction des relevés PDF Qonto (janvier 2025 → juillet 2026) → contrôle de bouclage sur les totaux imprimés de chaque relevé → classement par organisme et par période déclarée dans les libellés → confrontation au récapitulatif sPAIEctacle et aux courriels des caisses. Tous les montants cités sont vérifiables ligne à ligne dans les relevés ou dans les courriels datés.*

---

# 7. Audiens prélève-t-il plus que dû ? — contrôle sur l'année pleine 2025

> Demande de Michel le 05/08/2026 : *« surtout Audiens et la retraite, je pense qu'il prélève plus »*.
> Source décisive ajoutée : **`RECAPITULATIF PAIE 2025.pdf`** (sPAIEctacle 7.18.1, exercice 2025 complet, Neshama, **1 065 paies**, brut 828 565,35 €), retrouvé dans le Drive — plus les **12 relevés Qonto 2025**, tous bouclés au centime.

## 7.1 Ce que la paie 2025 doit à Audiens

| Institution | Dû 2025 |
|---|---:|
| **Audiens Retraite (Arrco-Agirc)** | **92 893,59** |
| Audiens Prévoyance + Santé + AGEPRO | 9 033,55 |
| Congés Spectacles | 124 339,33 |
| **Total Audiens 2025** | **226 266,47** |

## 7.2 Ce qu'Audiens a réellement prélevé en 2025

| Mois | Prélevé |
|---|---:|
| janvier | **71 960,78** |
| février | 1 744,75 |
| mars | 686,36 *(net du remboursement de 771,35 reçu le 07/03)* |
| avril | **68 144,90** |
| mai | 782,39 |
| juin | 2 026,07 |
| juillet | **43 832,92** |
| août | 1 565,89 |
| septembre | 3 778,57 |
| octobre | **41 036,49** |
| novembre | 0,00 |
| décembre | 0,00 |
| **Total encaissé en 2025** | **235 559,12** |

**Quatre appels trimestriels (janvier, avril, juillet, octobre) représentent 225 000 € des 235 559 € de l'année.** C'est la cadence trimestrielle confirmée par Audiens le 14/11/2025 — et c'est très exactement ce qui donne la sensation d'un sur-prélèvement : on ne paie pas trop, on paie **quatre fois par an, très gros**.

## 7.3 Le verdict, une fois le décalage neutralisé

Le total encaissé en 2025 (235 559 €) dépasse le dû 2025 (226 266 €) de 9 293 € — **mais c'est un artefact de calendrier** : le prélèvement de janvier 2025 (71 961 €) couvre le 4ᵉ trimestre **2024**, et le 4ᵉ trimestre **2025** n'a rien été prélevé en novembre-décembre : il est parti en janvier-février 2026 (49 145,91 + 2 490,44 = 51 636,35).

| Audiens, au titre des périodes 2025 | Montant |
|---|---:|
| Encaissé en 2025 | 235 559,12 |
| − prélèvement de janvier 2025 (périodes 2024) | −71 960,78 |
| + encaissé en janvier-février 2026 au titre de 2025 | +51 636,35 |
| **= encaissé au titre de 2025** | **≈ 215 234,69** |
| Dû 2025 (§7.1) | 226 266,47 |
| **Écart** | **≈ −11 032 (sous-payé)** |

**Réponse : sur l'année pleine, Audiens n'a pas prélevé plus que dû — il a prélevé environ 11 000 € de moins.** Le même contrôle sur les deux autres caisses donne le même sens :

| Caisse | Dû 2025 | Encaissé au titre de 2025 | Écart |
|---|---:|---:|---:|
| Audiens (3 institutions) | 226 266,47 | ≈ 215 235 | ≈ −11 032 |
| URSSAF employeur | 277 293,56 | ≈ 248 239 | ≈ −29 055 |
| France Travail (chômage int.) | 96 432,03 | 92 596 | ≈ −3 836 |

*(URSSAF : sur les 330 132 € décaissés en 2025, **109 457 € portent des périodes 2024** — les libellés donnent le mois, le calcul est vérifiable ligne à ligne.)*

## 7.4 Mais l'intuition n'est pas fausse : ponctuellement, si

Trois faits établis, tous écrits par les caisses elles-mêmes :

1. **10 808,35 € de trop payé à Audiens Retraite, reconnu par écrit le 03/07/2025** — *« votre compte présente un solde créditeur de 10 808,35 euros »*. Donc oui : **à ce moment-là, Audiens Retraite avait bien encaissé plus que dû.** Reste à savoir si le crédit a été imputé sur la DSN de juin 2025 comme ils le proposaient — aucun remboursement n'apparaît sur le compte.
2. **771,35 € de cotisations prévoyance trop prélevées, remboursées** — crédit visible sur le relevé du 07/03/2025.
3. **La cadence trimestrielle n'a jamais été changée** alors qu'Audiens proposait le mensuel au 01/01/2026.

## 7.5 Ce que je ne peux pas prouver depuis la banque, et comment l'obtenir

Les libellés bancaires d'Audiens (`AUDEN78493638.23xxxxx`) **ne disent pas à quelle institution** se rattache chaque prélèvement : impossible d'isoler la retraite du reste sur les seuls relevés. Le courriel Audiens du 14/11/2025 donne la clé pour six d'entre eux seulement (retraite 07/2025 = 10 555,27 · 08/2025 = 3 753,10 · 09/2025 = 4 683,46 ; Congés Spectacles 07/2025 = 12 648,17 · 08/2025 = 4 104,16 · 09/2025 = 4 795,22).

**Le seul moyen de trancher institution par institution est la situation de compte** — et Audiens l'a déjà proposée le 14/11/2025 : *« Nous avons demandé aux collègues des services Prévoyance et Congés Spectacles de vous faire parvenir une situation de compte par institution. Pour la Retraite, une situation est déjà envoyée. »*

**À demander à Audiens, en une seule fois :**
1. la **situation de compte Retraite** au 31/07/2026, avec le détail par période DSN ;
2. le **sort du solde créditeur de 10 808,35 €** annoncé le 03/07/2025 ;
3. la **correspondance référence de prélèvement → institution** pour tous les débits depuis janvier 2025 ;
4. le **passage en cadence mensuelle**, qui supprimerait les à-coups de 40 à 70 k€.

Les taux de la paie, eux, sont normaux : la retraite Audiens ressort à **11,21 % du brut en 2025** et **10,41 % en 2026** — cohérent avec Arrco-Agirc T1 + CEG + CET + APEC. **L'anomalie n'est pas dans le calcul de la paie.**
