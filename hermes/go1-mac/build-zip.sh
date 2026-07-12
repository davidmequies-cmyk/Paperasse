#!/usr/bin/env bash
# ============================================================================
#  Construit GO1_HERMES_MAC.zip — le paquet Mac « un clic » d'Hermès.
#
#  Le zip contient, à sa racine :
#    LANCER_GO1_HERMES.command   (lanceur double-cliquable)
#    app/                        (bot Telegram + routeur + modèles + garde-fou)
#    config/                     (copie des prompts, référentiels, docs, gabarits)
#    .env.example                (modèle de secrets)
#    LISEZ-MOI.md
#
#  Décompressé dans ~/Downloads, il place LANCER_GO1_HERMES.command à la racine,
#  prêt pour :  cd ~/Downloads && unzip -o GO1_HERMES_MAC.zip && bash LANCER_GO1_HERMES.command
#
#  Usage : bash build-zip.sh [chemin/vers/sortie.zip]
# ============================================================================
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
REPO_ROOT="$(cd "$HERE/../.." && pwd)"          # …/Paperasse
HERMES="$REPO_ROOT/hermes"
OUT="${1:-$HERE/GO1_HERMES_MAC.zip}"
# Rendre le chemin de sortie ABSOLU : le zip est créé depuis un sous-shell qui
# se place dans $STAGE, donc un chemin relatif y atterrirait (puis serait effacé).
case "$OUT" in /*) ;; *) OUT="$(pwd)/$OUT" ;; esac

STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

echo "→ Assemblage du paquet…"

# 1. Lanceur + app + modèle .env + notice
cp "$HERE/LANCER_GO1_HERMES.command" "$STAGE/"
chmod +x "$STAGE/LANCER_GO1_HERMES.command"
cp -R "$HERE/app" "$STAGE/app"
cp "$HERE/.env.example" "$STAGE/.env.example"
[ -f "$HERE/LISEZ-MOI.md" ] && cp "$HERE/LISEZ-MOI.md" "$STAGE/LISEZ-MOI.md"

# Ne pas embarquer d'éventuels caches
find "$STAGE/app" -name '__pycache__' -type d -prune -exec rm -rf {} + 2>/dev/null || true

# 2. Config offline (source de vérité = le dépôt)
mkdir -p "$STAGE/config"
cp -R "$HERMES/prompts"   "$STAGE/config/prompts"
cp -R "$HERMES/templates" "$STAGE/config/templates" 2>/dev/null || true
cp -R "$HERMES/docs"      "$STAGE/config/docs"      2>/dev/null || true
cp -R "$HERMES/outils"    "$STAGE/config/outils"    2>/dev/null || true
cp "$HERMES/referentiel.md"                "$STAGE/config/referentiel.md"
cp "$HERMES/referentiel-paie-spectacle.md" "$STAGE/config/referentiel-paie-spectacle.md" 2>/dev/null || true

# 3. Zippe le contenu à la RACINE du zip
rm -f "$OUT"
( cd "$STAGE" && zip -q -r -X "$OUT" . -x '*.DS_Store' )

echo "✓ Paquet créé : $OUT"
if command -v du >/dev/null 2>&1; then echo "  Taille : $(du -h "$OUT" | cut -f1)"; fi
echo "  Contenu :"
unzip -l "$OUT" | awk 'NR>3 && $4!="" {print "   " $4}' | head -40
