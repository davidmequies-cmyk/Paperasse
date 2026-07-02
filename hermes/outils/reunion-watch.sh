#!/usr/bin/env bash
# ============================================================================
#  Hermès — Copilote de réunion : surveillance + transcription + analyse
#  Surveille le dossier des enregistrements déposés depuis l'iPhone/iPad,
#  transcrit chaque nouvel audio (OpenAI Whisper), puis lance l'analyse
#  réunion (agent 19) via Claude Code, et dépose le compte-rendu.
#
#  Installation (une fois) :
#    chmod +x reunion-watch.sh
#    ./reunion-watch.sh            # tourne en continu (ou via launchd)
#  Dépendances : bash, curl, jq, fswatch (brew install jq fswatch),
#    ~/.hermes/bin/claudecode (Claude), OPENAI_API_KEY dans l'env/.env.
# ============================================================================
set -euo pipefail

# --- Config (adapter si besoin) --------------------------------------------
HERMES_DIR="${HERMES_DIR:-$HOME/Documents/Claude/Projects/Hermes}"
WATCH_DIR="${WATCH_DIR:-$HERMES_DIR/reunions}"
ENTREES_DIR="${ENTREES_DIR:-$HERMES_DIR/Entrées}"
AGENT_PROMPT="${AGENT_PROMPT:-$HERMES_DIR/prompts/agent-19-copilote-reunion.md}"
CLAUDE_BIN="${CLAUDE_BIN:-$HOME/.hermes/bin/claudecode}"
WHISPER_MODEL="${WHISPER_MODEL:-whisper-1}"   # ou gpt-4o-transcribe
# Charger les secrets depuis le .env d'Hermès si présent
[ -f "$HERMES_DIR/.env" ] && set -a && . "$HERMES_DIR/.env" && set +a

mkdir -p "$WATCH_DIR" "$ENTREES_DIR"
: "${OPENAI_API_KEY:?OPENAI_API_KEY manquant (mettre dans $HERMES_DIR/.env)}"

log(){ printf '%s  %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }

process_file(){
  local audio="$1"
  case "${audio##*.}" in m4a|mp3|wav|mp4|aac|caf) ;; *) return 0 ;; esac
  [ -f "$audio.done" ] && return 0                 # déjà traité
  # attendre la fin de copie/sync (taille stable)
  local s1 s2; s1=$(stat -f%z "$audio" 2>/dev/null || echo 0); sleep 4
  s2=$(stat -f%z "$audio" 2>/dev/null || echo 0); [ "$s1" = "$s2" ] || return 0

  local base txt cr; base="$(basename "${audio%.*}")"
  txt="$WATCH_DIR/$base.transcript.txt"
  cr="$ENTREES_DIR/$(date +%Y-%m-%d)-reunion-$base.md"
  log "🎙️  Transcription : $base"

  # 1) Transcription Whisper
  curl -s https://api.openai.com/v1/audio/transcriptions \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -F model="$WHISPER_MODEL" -F response_format=text \
    -F file="@$audio" > "$txt" || { log "❌ transcription KO"; return 0; }

  # 2) Analyse réunion (agent 19) via Claude Code
  log "🧠  Analyse réunion → $cr"
  {
    cat "$AGENT_PROMPT" 2>/dev/null || true
    printf '\n\n---\nTRANSCRIPTION DE LA RÉUNION (%s) :\n\n' "$base"
    cat "$txt"
    printf '\n\n---\nProduis le COMPTE-RENDU structuré (décisions, actions responsable+délai, points en suspens), le VERBATIM des engagements, une ANALYSE stratégique (rapport de force, non-dits, contre-arguments), et des BROUILLONS de suivi à valider. Rappelle en tête que rien n\x27est envoyé sans validation de Michel.\n'
  } | "$CLAUDE_BIN" -p --output-format text > "$cr" 2>/dev/null \
      || { log "❌ analyse KO (Claude)"; return 0; }

  touch "$audio.done"
  log "✅  Compte-rendu prêt : $cr"
  # 3) (option) notifier Michel — décommenter en renseignant le bot Telegram
  # curl -s "https://api.telegram.org/bot$TELEGRAM_TOKEN/sendMessage" \
  #   --data-urlencode chat_id="$TELEGRAM_CHAT_ID" \
  #   --data-urlencode text="🎙️ CR réunion prêt : $base (à valider)" >/dev/null || true
}

# Rattraper les fichiers déjà présents puis surveiller en continu
log "👀 Surveillance de $WATCH_DIR"
for f in "$WATCH_DIR"/*; do [ -f "$f" ] && process_file "$f"; done
if command -v fswatch >/dev/null 2>&1; then
  fswatch -0 "$WATCH_DIR" | while IFS= read -r -d '' f; do process_file "$f"; done
else
  log "ℹ️ fswatch absent — mode sondage (toutes les 30 s). brew install fswatch pour l'instantané."
  while true; do for f in "$WATCH_DIR"/*; do [ -f "$f" ] && process_file "$f"; done; sleep 30; done
fi
