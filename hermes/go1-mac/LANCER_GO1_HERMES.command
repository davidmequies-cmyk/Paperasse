#!/usr/bin/env bash
# ============================================================================
#  🚀 GO1 — Lancer Hermès sur le Mac (premier démarrage & démarrages suivants)
#
#  Double-clic sur ce fichier (ou : bash LANCER_GO1_HERMES.command).
#  Installe/actualise Hermès dans ~/Hermes, prépare Python, les raccourcis
#  Claude/Codex, le .env, puis démarre le bot Telegram.
#
#  Idempotent : relançable autant de fois que tu veux.
# ============================================================================
set -uo pipefail

# --- Repères ----------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
HERMES_DIR="${HERMES_DIR:-$HOME/Hermes}"
VENV="$HERMES_DIR/.venv"
BIN_DIR="$HOME/.hermes/bin"
PY_MIN_MINOR=10   # exige Python 3.10+

bold(){ printf '\033[1m%s\033[0m\n' "$*"; }
ok(){   printf '\033[32m✓\033[0m %s\n' "$*"; }
warn(){ printf '\033[33m⚠\033[0m  %s\n' "$*"; }
die(){  printf '\033[31m✗ %s\033[0m\n' "$*" >&2; echo; read -r -p "Appuie sur Entrée pour fermer…" _; exit 1; }

clear 2>/dev/null || true
bold "════════════════════════════════════════════════"
bold "   🤖  HERMÈS — GO1 (Groupe MDM)"
bold "════════════════════════════════════════════════"
echo "Installation dans : $HERMES_DIR"
echo

# --- 1. Python 3.10+ --------------------------------------------------------
find_python(){
  for cand in python3.13 python3.12 python3.11 python3.10 python3; do
    if command -v "$cand" >/dev/null 2>&1; then
      local minor
      minor="$("$cand" -c 'import sys; print(sys.version_info.minor)' 2>/dev/null || echo 0)"
      if [ "$("$cand" -c 'import sys; print(sys.version_info.major)' 2>/dev/null || echo 0)" = "3" ] \
         && [ "${minor:-0}" -ge "$PY_MIN_MINOR" ]; then
        echo "$cand"; return 0
      fi
    fi
  done
  return 1
}

PY="$(find_python || true)"
if [ -z "${PY:-}" ]; then
  warn "Python 3.$PY_MIN_MINOR+ introuvable."
  if command -v brew >/dev/null 2>&1; then
    echo "→ Installation via Homebrew…"
    brew install python@3.12 && PY="$(find_python || true)"
  fi
fi
[ -n "${PY:-}" ] || die "Python 3.$PY_MIN_MINOR+ requis. Installe-le : https://www.python.org/downloads/  (ou 'brew install python')."
ok "Python : $("$PY" --version 2>&1)"

# --- 2. Installer / actualiser les fichiers d'Hermès ------------------------
mkdir -p "$HERMES_DIR" "$BIN_DIR" || die "Impossible de créer $HERMES_DIR"
# Code applicatif + config : on écrase à chaque lancement (pour recevoir les MàJ)…
if [ -d "$SCRIPT_DIR/app" ]; then
  rm -rf "$HERMES_DIR/app"; cp -R "$SCRIPT_DIR/app" "$HERMES_DIR/app"
  ok "Application copiée."
else
  [ -d "$HERMES_DIR/app" ] || die "Dossier 'app/' introuvable à côté du lanceur."
fi
if [ -d "$SCRIPT_DIR/config" ]; then
  rm -rf "$HERMES_DIR/config"; cp -R "$SCRIPT_DIR/config" "$HERMES_DIR/config"
  ok "Configuration (prompts, référentiels) copiée."
else
  warn "Dossier 'config/' absent du paquet — Hermès utilisera la config déjà présente si elle existe."
fi

# --- 3. Raccourcis Claude Code & Codex (cf. docs de connexion) --------------
if [ ! -x "$BIN_DIR/claudecode" ]; then
  cat > "$BIN_DIR/claudecode" <<'SHIM'
#!/usr/bin/env bash
# Raccourci Claude Code pour Hermès. Charge le .env puis appelle `claude`.
# NB : tant qu'ANTHROPIC_API_KEY est exportée, Claude Code l'utilise (facturé au
# token). Pour rester sur le compte Max (0 €), faire `claude` puis /login, et
# NE PAS mettre ANTHROPIC_API_KEY dans le .env.
[ -f "$HOME/Hermes/.env" ] && set -a && . "$HOME/Hermes/.env" && set +a
exec claude "$@"
SHIM
  chmod +x "$BIN_DIR/claudecode"; ok "Raccourci claudecode créé."
fi
if [ ! -x "$BIN_DIR/codexcode" ]; then
  cat > "$BIN_DIR/codexcode" <<'SHIM'
#!/usr/bin/env bash
# Raccourci Codex (OpenAI) pour Hermès — exécutant dev. Charge le .env.
[ -f "$HOME/Hermes/.env" ] && set -a && . "$HOME/Hermes/.env" && set +a
exec codex exec "$@"
SHIM
  chmod +x "$BIN_DIR/codexcode"; ok "Raccourci codexcode créé."
fi

# --- 4. Environnement Python (venv + dépendances) ---------------------------
if [ ! -d "$VENV" ]; then
  echo "→ Création de l'environnement Python…"
  "$PY" -m venv "$VENV" || die "Échec de création du venv."
fi
# shellcheck disable=SC1091
. "$VENV/bin/activate"
echo "→ Installation des dépendances (peut prendre 1-2 min la 1ʳᵉ fois)…"
python -m pip install --quiet --upgrade pip >/dev/null 2>&1 || true
if ! python -m pip install --quiet -r "$HERMES_DIR/app/requirements.txt"; then
  die "Échec d'installation des dépendances Python (vérifie ta connexion)."
fi
ok "Dépendances Python installées."

# --- 5. Fichier .env (secrets) ----------------------------------------------
if [ ! -f "$HERMES_DIR/.env" ]; then
  cp "$SCRIPT_DIR/.env.example" "$HERMES_DIR/.env" 2>/dev/null \
    || cp "$HERMES_DIR/app/../.env.example" "$HERMES_DIR/.env" 2>/dev/null || true
  if [ ! -f "$HERMES_DIR/.env" ]; then
    # dernier recours : générer un .env minimal
    cat > "$HERMES_DIR/.env" <<'ENV'
TELEGRAM_BOT_TOKEN=
TELEGRAM_ALLOWED_USER=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.0-flash
ENV
  fi
  chmod 600 "$HERMES_DIR/.env"
  warn "Premier démarrage : il faut renseigner tes clés."
  echo "   J'ouvre le fichier $HERMES_DIR/.env dans TextEdit."
  echo "   Renseigne au minimum TELEGRAM_BOT_TOKEN et TELEGRAM_ALLOWED_USER, enregistre, reviens ici."
  open -e "$HERMES_DIR/.env" 2>/dev/null || true
  echo
  read -r -p "Quand c'est enregistré, appuie sur Entrée pour démarrer Hermès…" _
fi
chmod 600 "$HERMES_DIR/.env" 2>/dev/null || true

# Vérif token présent
if ! grep -qE '^TELEGRAM_BOT_TOKEN=.+' "$HERMES_DIR/.env"; then
  warn "TELEGRAM_BOT_TOKEN vide dans $HERMES_DIR/.env."
  echo "   Crée un bot avec @BotFather sur Telegram, colle le token, puis relance ce fichier."
  open -e "$HERMES_DIR/.env" 2>/dev/null || true
  die "Token Telegram manquant."
fi

# --- 6. Démarrage -----------------------------------------------------------
echo
bold "▶️  Démarrage d'Hermès…  (laisse cette fenêtre OUVERTE ; ⌃C pour arrêter)"
echo "   Astuce : depuis Telegram, envoie /ping à ton bot pour vérifier."
echo
export HERMES_DIR
cd "$HERMES_DIR/app" || die "Dossier app introuvable."
exec python bot.py
