# 🧮 Mini-outil — Coût d'un cachet intermittent (technicien, annexe 8, 2026)

> Outil de **simulation** pour l'agent /paie. Tu donnes le **brut**, il sort le **net** et le **coût employeur**.
> ⚠️ **Estimation, pas un bulletin.** Barème CCNSVP (IDCC 3090) / annexe 8 / 2026, recoupé sur sources officielles. Les lignes **[À VÉRIFIER]** doivent être confirmées avant toute paie réelle. Ne jamais traiter un taux comme acquis (cf. `00-preambule-commun.md`).
> 🎭 **Cas artiste (annexe 10), abattements (taux réduits 30 % + DFS), cadre légal complet : voir [`../referentiel-paie-spectacle.md`](../referentiel-paie-spectacle.md).** NB : pour le **chômage**, plus de distinction cachet isolé/groupé depuis 2016 → **1 cachet = 12 h** (la règle 12 h/8 h ne subsiste que côté URSSAF pour les plafonds).

## 1. Mode d'emploi
1. Prendre le **brut** du cachet (ou salaire journalier).
2. Appliquer les **taux du barème** ci-dessous (§3).
3. **Net avant PAS** = brut − total charges salariales.
4. **Coût employeur** = brut + total charges patronales.
5. Choisir le bon scénario **maladie 7 % vs 13 %** (§4) et signaler les **[À VÉRIFIER]**.

## 2. Repères 2026
- **PMSS** = 4 005 €/mois · **PASS** = 48 060 €/an · plafond journalier SS = 220 €.
- Sur un cachet bas (ex. 200 €), tout est **sous plafond** → plafonnée = déplafonnée = brut.
- **Technicien = annexe 8** (les « taux réduits spectacle » sont réservés aux **artistes**, pas aux techniciens).
- **Cachet = CDDU**, le plus souvent ≤ 3 mois → chômage patronal **majoré +0,5 pt**.

## 3. Barème (taux en % du brut, sauf mention)

| Cotisation | Salarial | Patronal | Note / source |
|---|---:|---:|---|
| Maladie | — | **7 %** ou **13 %** | 7 % si rém. annuelle ≤ 2,5 SMIC, sinon 13 % (§4) — URSSAF |
| Vieillesse plafonnée | 6,90 % | 8,55 % | URSSAF |
| Vieillesse déplafonnée | 0,40 % | 2,11 % | URSSAF (hausse 2026) |
| Allocations familiales | — | 3,45 % | 5,25 % si rém. > 3,3 SMIC — URSSAF |
| Accidents du travail (AT-MP) | — | **~1,5 %** [À VÉRIFIER] | **Taux propre à ton établissement** (NAF 9001Z/9002Z, arrêté 30/12/2025) |
| CSG déductible | 6,80 % | — | assiette 98,25 % du brut |
| CSG non déductible | 2,40 % | — | assiette 98,25 % du brut |
| CRDS | 0,50 % | — | assiette 98,25 % du brut |
| FNAL (< 50 sal.) | — | 0,10 % | URSSAF |
| Contribution dialogue social | — | 0,016 % | URSSAF |
| CSA (solidarité autonomie) | — | 0,30 % | URSSAF |
| Chômage annexe 8 | 2,40 % | **9,00 %** (→ **9,50 %** si CDDU ≤ 3 mois) | 4,00 % droit commun + 5 pts intermittents (+0,5) — Unédic |
| AGS | — | 0,25 % | maintenu 2026 — AGS |
| Retraite compl. T1 (majoré spectacle) | ~3,56 % [À VÉRIFIER] | ~5,33 % [À VÉRIFIER] | ≈ 8,89 % total, réparti 60/40 — Audiens (droit commun = 3,15/4,72) |
| CEG T1 | 0,86 % | 1,29 % | Audiens/AGIRC-ARRCO |
| Prévoyance intermittents non-cadre | ~0,12 % [À VÉRIFIER] | ~0,34 % [À VÉRIFIER] | assiette plafond **journalier** SS — Audiens |
| Fonds collectif santé (non-cadre) | — | ~0,77 % [À VÉRIFIER] | Audiens (évolue en 2026) |
| Congés Spectacles | — | **15,50 %** | taux d'appel stable jusqu'au 31/03/2027 — Audiens/Congés Spectacles |
| AFDAS (formation) | — | 2,10 % (+0,10 % conv.) | + forfait conventionnel annuel ~50 € — AFDAS |
| Thalie Santé (ex-CMB, méd. travail) | — | ~0,35 % | passe en DSN au 01/01/2026 — Thalie Santé |
| CASC-SVP (IDCC 3090) | — | 0,50 % | propre au secteur privé — CASC-SVP |
| FCAP-SVP (IDCC 3090) | — | 0,10 % | mini 80 €/maxi 300 €/an (dispense si CSE) — FCAP-SVP |

> ⚠️ **CET** (0,35 %) et **APEC** : seulement si **cadre** ou brut > 1 PMSS → en général **non** pour un technicien au cachet.
> ⚠️ **FNAS** : ne s'applique **pas** (c'est la CCNEAC / secteur subventionné, IDCC 1285).

## 4. Scénario maladie (le seul écart notable)
- **7 %** (cas standard d'un cachet isolé, rém. annuelle ≤ 2,5 SMIC chez l'employeur).
- **13 %** si le salarié cumule > 2,5 SMIC/an chez le même employeur → **+12 € de coût patronal** pour 200 € brut.

## 5. Réduction générale 2026 (RGDU)
La **Réduction Générale Dégressive Unique** (jusqu'à 3 SMIC) **diminue le coût patronal réel** sur les bas salaires comme un cachet. Calcul **annualisé** (un cachet = forfait d'heures) → à paramétrer dans le logiciel de paie. **Non déduite** dans l'exemple ci-dessous → le coût réel est **plutôt inférieur**.

## 6. DFS (option, désactivée par défaut)
Déduction forfaitaire spécifique : abattement sur l'**assiette** des cotisations (plafond **7 600 €/an**), **en extinction jusqu'en 2032** (−1 pt/an pour les fonctions techniques/musiciens). Si appliquée (accord du salarié) : **net plus élevé + coût employeur réduit** d'~20 % sur les postes assujettis. CSG/CRDS toujours au taux plein. Le taux 2026 par fonction est **[À VÉRIFIER]** sur le BOSS.

## 7. Exemple chiffré — cachet 200 € brut (maladie 7 %, CDDU ≤ 3 mois, sans DFS)

| | Montant |
|---|---:|
| Brut | 200,00 € |
| – Total charges salariales (≈ 24 %) | ≈ −47,5 € |
| **= NET avant prélèvement à la source** | **≈ 152 €** |
| + Total charges patronales (≈ 59 %) | ≈ +118 € |
| **= COÛT EMPLOYEUR** | **≈ 318 €** |

**Règle de poche :** pour mettre **~150 € net** dans la poche d'un technicien, un cachet de **200 € brut** coûte **~318 €** (fourchette **318–330 €** selon maladie 7/13 % et ton taux AT-MP ; un peu moins après réduction générale).

## 8. À confirmer avant un bulletin réel
1. **Ton taux AT-MP** (compte AT/MP URSSAF de l'établissement).
2. **Retraite T1 majorée spectacle** + **prévoyance/fonds collectif Audiens** : lire les PDF « Paramètres et taux 2026 » et « FP-Taux retraite » sur audiens.org.
3. **DFS** applicable ou non (fonction + accord salarié).
4. **Réduction générale (RGDU)** : à calculer sur l'annuel.
5. **Artiste (annexe 10)** ≠ technicien : si artiste, taux chômage + taux réduits + DFS diffèrent.

---
*Sources officielles : urssaf.fr · unedic.org / francetravail.fr · audiens.org · conges-spectacles.com · afdas.com · thalie-sante.org · legifrance.gouv.fr (PMSS : arrêté du 22/12/2025 ; AT-MP : arrêté du 30/12/2025). Taux recoupés sur ≥ 3 sources concordantes ; lignes [À VÉRIFIER] non lues directement sur la page officielle (accès automatique bloqué) → à valider par capture navigateur pour un dossier officiel. Dernière mise à jour : 2026-06-30.*
