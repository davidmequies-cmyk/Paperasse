# 🔗 Procédures Hermès — runbooks (chaînes d'agents)

> Ces procédures **enchaînent plusieurs agents** pour les tâches récurrentes du Groupe MDM.
> Hermès suit les étapes dans l'ordre, **s'arrête à chaque ⏸️ pour validation de Michel** (✅/✏️/❌), et ne devine jamais une donnée manquante (`[À COMPLÉTER]`).
> But : passer de 17 agents isolés à un **système coordonné**.

---

## P1 — Nouveau client SpectaGestion (de la demande à la 1ʳᵉ paie)
**Déclencheurs :** « nouveau client paie », « un client veut qu'on gère ses intermittents ».
1. **/devis** — qualifier le besoin (nb de bulletins/mois, type de prestations), produire le devis (18 € HT/bulletin + 14,90 € HT/mois ; sur mesure > 50). ⏸️
2. **/assist** — créer la fiche client, demander les pièces (Kbis, RIB, mandat, coordonnées des salariés). Lister les `[À COMPLÉTER]`.
3. **/contrat** — convention SpectaGestion (rappel : **le client reste l'employeur**, pas de portage). ⏸️ envoi.
4. **/paie** — ouvrir le 1ᵉʳ dossier : DPAE → CDDU → bulletins → AEM/DSN, estimer le coût employeur, pointer les risques. ⏸️ **avant toute déclaration**.
5. **/treso** — programmer la facturation mensuelle SpectaGestion.

## P2 — Impayé de bout en bout
**Déclencheurs :** « facture impayée », « X ne paie pas », « relance ».
1. **/treso** — confirmer le montant dû, l'ancienneté, l'historique de paiement (Qonto). Classer l'urgence.
2. **/relance** — choisir le niveau (1 douce → 4 mise en demeure RAR) ; rédiger l'e-mail/courrier prêt. ⏸️ envoi.
3. *Si échec après niveau 4* → **/juridique** : évaluer injonction de payer / contentieux, indemnité forfaitaire 40 € (L441-10) [À VÉRIFIER], coût/opportunité. ⏸️
4. **/dg** — consolider dans le tableau de bord (rubrique 🔵 FINANCE) jusqu'à encaissement.

## P3 — Cycle de paie mensuel (SpectaGestion)
**Déclencheur :** automatisme mensuel + « on fait la paie du mois ».
1. **/assist** — relever les éléments variables reçus (dates, cachets, justificatifs) ; relancer les clients pour les pièces manquantes.
2. **/paie** — pour chaque dossier : contrôler annexe 8/10, DFS si accord salarié, calculer brut/net/coût employeur, préparer DPAE/CDDU/bulletins. Lister les anomalies.
3. ⏸️ **Validation globale de Michel** (un récap par client) **avant déclarations**.
4. **/paie** — déclarer (AEM/DSN) une fois validé.
5. **/treso** — facturer les clients (bulletins du mois + abonnement) ; suivre l'encaissement.

## P4 — Clôture mensuelle / pilotage
**Déclencheur :** fin de mois, « point du mois », « clôture ».
1. **/treso** — solde, entrées/sorties du mois, projection 30/60/90 j, tensions.
2. **/fiscal** — échéances TVA/IS/CFE à venir, état Pennylane, points pour l'expert-comptable.
3. **/relance** — état des impayés (rappel des en-cours).
4. **/dg** — synthèse dirigeant : 🔴 Urgent · 🔵 Finance · 🤝 Clients · ⚖️ Juridique · 🎬 Production · 🚀 Stratégie + **TOP 3 du mois**.

## P5 — Devis → prestation → facturation (production)
**Déclencheurs :** « on me demande un concert/une captation », « chiffrer une prestation ».
1. **/devis** — qualifier + chiffrer (jamais de prix inventé). ⏸️ envoi.
2. *Si accepté* → **/contrat** — cession / prestation audiovisuelle / coproduction selon le cas. ⏸️ signature.
3. **/prod** — feuille de route : planning, plateau, prestataires, budget de production.
4. *Si intermittents* → **/paie** (voir P3). *Si artiste cérémonie* → **/artiste**.
5. **/treso** — acompte à la commande, solde à l'échéance ; suivi encaissement.

## P6 — Sinistre / assurance
**Déclencheurs :** « j'ai eu un sinistre », « refus d'indemnisation », « garantie ».
1. **/assur** — identifier le contrat et le **délai de déclaration** ; rédiger la déclaration (gabarit `emails/declaration-sinistre.md`). ⏸️ envoi.
2. **/assist** — réunir les pièces (photos, devis, facture, constat, dépôt de plainte).
3. *Si refus* → **/juridique** — contester (base légale, protection juridique Juridica). ⏸️

## P7 — Dossier immobilier / financement
**Déclencheurs :** « prêt », « courtier », « Touques », « offre de banque ».
1. **/immo** — analyser l'offre (taux, durée, mensualité, assurance, rentabilité si locatif). Comparer.
2. **/treso** — vérifier la capacité (mensualité vs cash-flow).
3. **/juridique** — relire les clauses sensibles avant engagement. ⏸️ signature.

## P8 — E-mail / facture suspect (anti-arnaque) → voir [`securite.md`](securite.md)
**Déclencheurs :** « ce mail est-il fiable ? », « facture bizarre », « on me demande de payer un RIB ».
1. **/assist** — appliquer la **checklist anti-arnaque** (expéditeur, lien, RIB, urgence artificielle).
2. *Doute* → ne **rien** payer/cliquer ; isoler le message ; vérifier le fournisseur par un canal connu.
3. **/treso** ou **/fiscal** selon le cas — confirmer si une vraie échéance existe.

---

## Règles d'orchestration
- **Un agent pilote, les autres alimentent.** Le `/dg` peut déclencher une procédure et consolider les retours.
- **Chaque ⏸️ est bloquant** : pas d'action externe sans ✅ de Michel.
- **Données :** toujours puiser dans [`../referentiel.md`](../referentiel.md) avant de demander ; marquer `[À COMPLÉTER]` sinon.
- **Toutes mes boîtes mail :** quand une étape lit des e-mails, interroger **toutes** les boîtes (consigne permanente).
- **Traçabilité :** journaliser chaque procédure lancée (date, étapes, validations) — voir `connexions-mac.md` (journal d'audit).
