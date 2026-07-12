# -*- coding: utf-8 -*-
"""
Hermès GO1 — bot Telegram (pilote sur le Mac).

  iPhone (Telegram)  →  Hermès (ce bot, sur le Mac)  →  Claude Code / OpenAI / Gemini

Rôle : recevoir les messages de Michel, router vers le bon agent (commande /xxx
ou langage naturel), appeler le modèle prioritaire de l'agent (bascule auto si
indisponible), et appliquer le garde-fou de validation ✅/✏️/❌ avant toute
action externe.

Démarrage : `python bot.py` (le lanceur LANCER_GO1_HERMES.command s'en charge).
Secrets : lus depuis ~/Hermes/.env — jamais en dur, jamais dans le dépôt.
"""
from __future__ import annotations

import logging

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.constants import ParseMode
from telegram.ext import (
    Application,
    CallbackQueryHandler,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

import config
import garde_fou
import models
import prompts_loader as prompts
import router

logging.basicConfig(
    format="%(asctime)s  %(levelname)s  %(name)s  %(message)s",
    level=logging.INFO,
)
log = logging.getLogger("hermes")

DRAFTS = garde_fou.DraftStore()

TELEGRAM_LIMIT = 4096


# --- Sécurité : n'accepter que Michel --------------------------------------
def _authorized(update: Update) -> bool:
    allowed = config.allowed_user_ids()
    if not allowed:
        # Aucun ID configuré = on refuse tout (sécurité par défaut).
        return False
    user = update.effective_user
    return bool(user and user.id in allowed)


async def _deny(update: Update) -> None:
    uid = update.effective_user.id if update.effective_user else "?"
    if update.effective_message:
        await update.effective_message.reply_text(
            "⛔️ Accès refusé. Ce Hermès ne répond qu'à Michel.\n"
            f"Ton ID Telegram : `{uid}` — ajoute-le à TELEGRAM_ALLOWED_USER dans le .env.",
            parse_mode=ParseMode.MARKDOWN,
        )
    log.warning("Message refusé (user %s non autorisé)", uid)


# --- Découpage des longues réponses ----------------------------------------
async def _reply_long(message, text: str, reply_markup=None) -> None:
    chunks = [text[i : i + TELEGRAM_LIMIT] for i in range(0, len(text), TELEGRAM_LIMIT)] or [""]
    for idx, chunk in enumerate(chunks):
        markup = reply_markup if idx == len(chunks) - 1 else None
        await message.reply_text(chunk, reply_markup=markup)


# --- Commandes utilitaires --------------------------------------------------
async def cmd_ping(update: Update, _ctx: ContextTypes.DEFAULT_TYPE) -> None:
    if not _authorized(update):
        return await _deny(update)
    dispo = ", ".join(models.LABELS[m] for m in models.available_models()) or "aucun modèle"
    await update.message.reply_text(f"PONG ✅ Hermès est en ligne.\nModèles disponibles : {dispo}.")


async def cmd_agents(update: Update, _ctx: ContextTypes.DEFAULT_TYPE) -> None:
    if not _authorized(update):
        return await _deny(update)
    lines = ["*Agents Hermès* (commande → rôle)"]
    for a in router.AGENTS:
        prio = " → ".join(models.LABELS[m] for m in a.models)
        lines.append(f"/{a.command} — {a.name}  _( {prio} )_")
    lines.append("\nOu écris en langage naturel : je route automatiquement.")
    await update.message.reply_text("\n".join(lines), parse_mode=ParseMode.MARKDOWN)


async def cmd_aide(update: Update, _ctx: ContextTypes.DEFAULT_TYPE) -> None:
    if not _authorized(update):
        return await _deny(update)
    await update.message.reply_text(
        "🤖 *Hermès* — assistant du Groupe MDM.\n\n"
        "• Écris-moi en langage naturel (je choisis l'agent) ou utilise une commande.\n"
        "• `/agents` : liste des agents.  `/ping` : test.\n"
        "• Garde-fou : avant tout envoi/déclaration/paiement, je te présente un brouillon "
        "à *valider* (✅ / ✏️ / ❌). Rien n'est exécuté sans ton ✅.\n\n"
        "_Règles : ne rien inventer · sources officielles · « Michel Méquiès » · "
        "pas de portage salarial._",
        parse_mode=ParseMode.MARKDOWN,
    )


# --- Traitement principal ---------------------------------------------------
async def _handle_agent(update: Update, agent: router.Agent, question: str, note: str = "") -> None:
    message = update.effective_message
    if not question.strip():
        await message.reply_text(
            f"Agent *{agent.name}* prêt. Précise ta demande.", parse_mode=ParseMode.MARKDOWN
        )
        return

    await message.chat.send_action("typing")
    system = prompts.system_prompt_for(agent.file)
    result = await models.generate(system, question, agent.models)

    if not result.ok:
        await message.reply_text(f"⚠️ Impossible de répondre pour l'instant.\n{result.error}")
        return

    body = (note + "\n\n" if note else "") + result.text

    if garde_fou.needs_validation(result.text):
        action_type = garde_fou.guess_action_type(result.text)
        draft = DRAFTS.add(agent.command, action_type, result.text)
        keyboard = InlineKeyboardMarkup(
            [[
                InlineKeyboardButton("✅ Valider", callback_data=f"v:{draft.draft_id}"),
                InlineKeyboardButton("✏️ Modifier", callback_data=f"e:{draft.draft_id}"),
                InlineKeyboardButton("❌ Annuler", callback_data=f"x:{draft.draft_id}"),
            ]]
        )
        await _reply_long(message, body, reply_markup=keyboard)
    else:
        await _reply_long(message, body)


async def on_command_agent(update: Update, ctx: ContextTypes.DEFAULT_TYPE) -> None:
    if not _authorized(update):
        return await _deny(update)
    text = update.effective_message.text or ""
    agent = router.parse_command(text) or router.DEFAULT_AGENT
    question = router.strip_command(text)
    await _handle_agent(update, agent, question)


async def on_text(update: Update, _ctx: ContextTypes.DEFAULT_TYPE) -> None:
    if not _authorized(update):
        return await _deny(update)
    text = (update.effective_message.text or "").strip()
    agent, ambiguous = router.route_natural(text)
    note = ""
    if ambiguous:
        note = f"(Demande générale → agent {agent.name}. Utilise une /commande pour cibler.)"
    await _handle_agent(update, agent, text, note=note)


# --- Garde-fou : boutons de validation --------------------------------------
async def on_validation(update: Update, _ctx: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    if not _authorized(update):
        return
    action, _, draft_id = (query.data or "").partition(":")
    draft = DRAFTS.get(draft_id)
    if draft is None:
        await query.edit_message_reply_markup(reply_markup=None)
        await query.message.reply_text("⏳ Ce brouillon a expiré. Relance la demande.")
        return

    if action == "v":  # ✅ Valider
        draft.decided = "valide"
        garde_fou.audit(draft.agent, draft.action_type, "valide")
        footer = (
            "\n\n———\n✅ Validé par Michel. Décision journalisée.\n"
            "▶️ Exécution : à réaliser via les connecteurs (Gmail brouillon, Qonto…), "
            "qui restent à brancher — toujours derrière ce garde-fou."
        )
    elif action == "e":  # ✏️ Modifier
        draft.decided = "modifie"
        garde_fou.audit(draft.agent, draft.action_type, "modifie")
        footer = "\n\n———\n✏️ À modifier. Dis-moi ce qu'il faut changer, je régénère le brouillon."
    else:  # ❌ Annuler
        draft.decided = "annule"
        garde_fou.audit(draft.agent, draft.action_type, "annule")
        footer = "\n\n———\n❌ Annulé. Rien n'a été envoyé ni exécuté."

    # On édite le message qui portait les boutons : on repart de SON texte (qui peut
    # n'être que le dernier morceau d'une réponse découpée) et on retire les boutons.
    # Texte en clair (pas de Markdown) pour ne jamais casser sur un caractère spécial.
    original = query.message.text or ""
    new_text = (original + footer)[:TELEGRAM_LIMIT]
    try:
        await query.edit_message_text(new_text)
    except Exception:  # noqa: BLE001 — au pire on retire les boutons et on répond à part
        try:
            await query.edit_message_reply_markup(reply_markup=None)
        except Exception:  # noqa: BLE001
            pass
        await query.message.reply_text(footer.strip())


# --- Amorçage ---------------------------------------------------------------
def _preflight() -> None:
    config.load_env()
    ok, msg = prompts.is_config_ready()
    if not ok:
        raise SystemExit(f"❌ Configuration Hermès incomplète : {msg}")
    if not config.telegram_token():
        raise SystemExit(
            "❌ TELEGRAM_BOT_TOKEN manquant dans ~/Hermes/.env "
            "(crée un bot via @BotFather et colle le token)."
        )
    if not config.allowed_user_ids():
        log.warning(
            "TELEGRAM_ALLOWED_USER non défini : Hermès refusera TOUS les messages "
            "tant que ton ID Telegram n'y est pas (envoie /ping pour voir ton ID)."
        )
    dispo = ", ".join(models.LABELS[m] for m in models.available_models()) or "AUCUN"
    log.info("Modèles disponibles : %s", dispo)


def main() -> None:
    _preflight()
    app = Application.builder().token(config.telegram_token()).build()

    # Commandes utilitaires
    app.add_handler(CommandHandler("ping", cmd_ping))
    app.add_handler(CommandHandler("agents", cmd_agents))
    for c in ("aide", "help", "start"):
        app.add_handler(CommandHandler(c, cmd_aide))

    # Une entrée par commande d'agent (/dg, /paie, …)
    for cmd in router.BY_COMMAND:
        app.add_handler(CommandHandler(cmd, on_command_agent))

    # Boutons de validation puis langage naturel
    app.add_handler(CallbackQueryHandler(on_validation, pattern=r"^[vex]:"))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, on_text))

    log.info("Hermès démarre (polling Telegram)…")
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
