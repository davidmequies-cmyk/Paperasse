# Prompt à donner à Hermes (Claude Code sur le Mac)

> Copiez-collez le bloc ci-dessous dans **Claude Code sur votre Mac**, dans le
> projet où l'agent **Hermes** est disponible.
> Remplacez d'abord les valeurs entre `⟨ ⟩` par vos infos VPS.
> ⚠️ Ne mettez **jamais** de mot de passe ni de clé privée dans le prompt :
> utilisez une clé SSH déjà installée (`ssh-copy-id`) ou un alias dans `~/.ssh/config`.

---

```text
Utilise l'agent Hermes pour installer Claude Code sur mon VPS via SSH.

Connexion VPS :
- Hôte / IP : ⟨IP_OU_HOTE⟩
- Utilisateur SSH : ⟨UTILISATEUR⟩
- (j'ai déjà une clé SSH configurée pour cet hôte — n'utilise pas de mot de passe)

Étapes à exécuter sur le VPS :
1. Vérifie la connexion : ssh ⟨UTILISATEUR⟩@⟨IP_OU_HOTE⟩ "echo OK && cat /etc/os-release | head -1"
2. Récupère le script d'installation depuis mon dépôt GitHub :
   curl -fsSL https://raw.githubusercontent.com/davidmequies-cmyk/Paperasse/claude/claude-ia-vps-deploy-n69ibj/deploy/install-claude-code.sh -o ~/install-claude-code.sh
3. Lance-le :
   chmod +x ~/install-claude-code.sh && ~/install-claude-code.sh
4. Recharge le shell et vérifie : source ~/.nvm/nvm.sh && claude --version

Le script installe Node.js LTS (via nvm, sans toucher au système) puis
@anthropic-ai/claude-code, et vérifie l'installation.

Authentification (ne mets PAS la clé en clair dans un fichier versionné) :
- Configure la clé API sur le VPS :
  echo 'export ANTHROPIC_API_KEY="⟨MA_CLE_API⟩"' >> ~/.bashrc && source ~/.bashrc
  (ou, si tu préfères l'abonnement Claude, lance `claude` et suis l'URL de connexion)

À la fin :
- Confirme-moi la version de Node et de Claude Code installées.
- Donne-moi la commande pour relancer Claude Code sur le VPS (ex. `claude` dans un projet).
- Si quelque chose échoue, montre-moi la sortie d'erreur exacte avant de réessayer.
```

---

## Variante : le VPS n'a pas accès à Internet vers GitHub

Si le `curl` de l'étape 2 échoue (réseau restreint), remplacez l'étape 2 par un
envoi du script depuis le Mac :

```text
2bis. Copie le script depuis mon Mac vers le VPS :
      scp ~/Paperasse/deploy/install-claude-code.sh ⟨UTILISATEUR⟩@⟨IP_OU_HOTE⟩:~/
```
(adaptez le chemin local si le dépôt `Paperasse` est ailleurs sur le Mac).

## Rappel des valeurs à remplacer

| Placeholder | Quoi mettre |
|---|---|
| `⟨IP_OU_HOTE⟩` | l'adresse IP ou le nom d'hôte du VPS |
| `⟨UTILISATEUR⟩` | le compte SSH (ex. `david`, `ubuntu`, `root`) |
| `⟨MA_CLE_API⟩` | votre clé API Anthropic (`sk-ant-…`) — **uniquement sur le VPS**, jamais commitée |
