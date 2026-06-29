#!/usr/bin/env bash
#
# install-claude-code.sh
# Installe Claude Code (CLI Anthropic) sur un VPS Linux (Debian/Ubuntu).
#
# Usage, sur le VPS :
#   chmod +x install-claude-code.sh
#   ./install-claude-code.sh
#
# Le script :
#   1. Installe les dépendances de base (curl, git, ca-certificates)
#   2. Installe Node.js LTS (via nvm, sans sudo, dans le home de l'utilisateur)
#   3. Installe le paquet @anthropic-ai/claude-code en global (npm)
#   4. Vérifie l'installation
#
# Conçu pour être lancé en utilisateur NON-root (recommandé). Si lancé en root,
# il fonctionne aussi mais installe nvm dans /root.

set -euo pipefail

# --- Réglages ---------------------------------------------------------------
NODE_VERSION="${NODE_VERSION:-22}"      # version Node.js (LTS recommandée : 20 ou 22)
NVM_VERSION="${NVM_VERSION:-v0.40.1}"   # version de l'installeur nvm

# --- Helpers ----------------------------------------------------------------
log()  { printf '\033[1;34m[claude-code]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[claude-code]\033[0m %s\n' "$*" >&2; }
err()  { printf '\033[1;31m[claude-code]\033[0m %s\n' "$*" >&2; }

require_cmd() { command -v "$1" >/dev/null 2>&1; }

# --- 0. Détection OS --------------------------------------------------------
if [ -f /etc/os-release ]; then
  . /etc/os-release
  log "Système détecté : ${PRETTY_NAME:-inconnu}"
else
  warn "Impossible de lire /etc/os-release — on continue quand même."
fi

# sudo seulement si on n'est pas root
SUDO=""
if [ "$(id -u)" -ne 0 ]; then
  if require_cmd sudo; then
    SUDO="sudo"
  else
    warn "Pas de sudo et pas root : l'installation des paquets système (apt) peut échouer."
  fi
fi

# --- 1. Dépendances système -------------------------------------------------
if require_cmd apt-get; then
  log "Installation des dépendances système (curl, git, ca-certificates, build-essential)…"
  $SUDO apt-get update -y
  $SUDO apt-get install -y curl git ca-certificates build-essential
else
  warn "apt-get introuvable. Assurez-vous d'avoir : curl, git, ca-certificates installés."
fi

# --- 2. Node.js via nvm -----------------------------------------------------
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

if [ ! -s "$NVM_DIR/nvm.sh" ]; then
  log "Installation de nvm ${NVM_VERSION}…"
  curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh" | bash
else
  log "nvm déjà présent dans $NVM_DIR"
fi

# shellcheck disable=SC1091
. "$NVM_DIR/nvm.sh"

log "Installation de Node.js ${NODE_VERSION} (LTS)…"
nvm install "$NODE_VERSION"
nvm alias default "$NODE_VERSION"
nvm use default

log "Node : $(node --version)  /  npm : $(npm --version)"

# --- 3. Claude Code ---------------------------------------------------------
log "Installation de @anthropic-ai/claude-code en global…"
npm install -g @anthropic-ai/claude-code

# --- 4. Vérification --------------------------------------------------------
if require_cmd claude; then
  log "✅ Claude Code installé : $(claude --version 2>/dev/null || echo 'version indisponible')"
else
  err "La commande 'claude' n'est pas dans le PATH de ce shell."
  warn "Ouvrez un nouveau shell, ou lancez : source \"$NVM_DIR/nvm.sh\""
fi

cat <<'EOF'

────────────────────────────────────────────────────────────
✅ Installation terminée.

Étapes suivantes :

1) Ouvrez un NOUVEAU shell (ou rechargez votre session) pour
   que 'node' et 'claude' soient bien dans le PATH :
      exec $SHELL -l

2) Authentification — deux options :

   Option A · Clé API Anthropic (recommandée sur un serveur headless)
      export ANTHROPIC_API_KEY="sk-ant-..."
      # Pour la rendre permanente :
      echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.bashrc

   Option B · Connexion via abonnement Claude (compte Pro/Max)
      claude            # affiche une URL à ouvrir dans votre navigateur

3) Lancez Claude Code dans n'importe quel projet :
      cd /chemin/vers/mon/projet
      claude

Astuce : pour le faire tourner sans interaction (cron, CI), utilisez
le mode non-interactif :  claude -p "votre prompt"
────────────────────────────────────────────────────────────
EOF
