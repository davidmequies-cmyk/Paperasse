# Installer Claude Code sur votre VPS

Ce dossier contient un script pour installer **Claude Code** (le CLI d'Anthropic)
sur un VPS Linux Debian/Ubuntu, ainsi que ce guide pas-à-pas.

> ℹ️ Pourquoi un script et pas une installation directe depuis ici ?
> L'assistant qui a généré ces fichiers tourne dans un conteneur isolé, sans
> accès à votre VPS. Vous lancez donc le script vous-même via SSH — c'est plus
> sûr (aucune clé SSH ni secret ne transite par un environnement tiers) et
> reproductible.

---

## 1. Se connecter au VPS

```bash
ssh utilisateur@IP_DU_VPS
```

> Conseil : faites l'installation avec un utilisateur **non-root** dédié.
> Si vous n'en avez pas encore :
> ```bash
> sudo adduser david
> sudo usermod -aG sudo david
> su - david
> ```

## 2. Récupérer le script

Deux possibilités :

**A. Cloner le dépôt** (si Git est dispo sur le VPS) :
```bash
git clone https://github.com/davidmequies-cmyk/Paperasse.git
cd Paperasse/deploy
```

**B. Copier juste le script** depuis votre machine locale :
```bash
scp deploy/install-claude-code.sh utilisateur@IP_DU_VPS:~/
```

## 3. Lancer l'installation

```bash
chmod +x install-claude-code.sh
./install-claude-code.sh
```

Le script installe : dépendances système → Node.js LTS (via nvm, sans toucher
au système) → `@anthropic-ai/claude-code`. Il vérifie l'installation à la fin.

Pour choisir une autre version de Node :
```bash
NODE_VERSION=20 ./install-claude-code.sh
```

## 4. Recharger le shell

```bash
exec $SHELL -l
claude --version
```

## 5. Authentification

Deux méthodes au choix.

### Option A — Clé API Anthropic (recommandée sur serveur)

C'est l'idéal sur un VPS « headless » (sans navigateur). Créez une clé sur
<https://console.anthropic.com/> puis :

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
# Permanent :
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.bashrc
source ~/.bashrc
```

> 🔐 Ne committez jamais votre clé API dans Git. Gardez-la dans `~/.bashrc`,
> un gestionnaire de secrets, ou un fichier `.env` ignoré par Git.

### Option B — Abonnement Claude (Pro / Max)

```bash
claude
```
Claude Code affiche une URL. Ouvrez-la dans le navigateur de **votre machine
locale** (pas du serveur), connectez-vous, puis collez le code de retour dans
le terminal du VPS.

## 6. Utilisation

```bash
cd ~/mon-projet
claude                       # mode interactif
claude -p "résume ce repo"   # mode non-interactif (scripts, cron, CI)
```

---

## Faire tourner Claude Code en continu / en tâche de fond (optionnel)

Pour un agent qui doit tourner sans session SSH ouverte, utilisez **tmux** ou
**systemd**.

### tmux (simple)
```bash
sudo apt-get install -y tmux
tmux new -s claude
claude
# Détacher : Ctrl-b puis d   ·   Rattacher : tmux attach -t claude
```

### systemd (service permanent, exemple non-interactif)
Créez `/etc/systemd/system/claude-agent.service` :
```ini
[Unit]
Description=Claude Code agent
After=network-online.target

[Service]
Type=simple
User=david
WorkingDirectory=/home/david/mon-projet
Environment=ANTHROPIC_API_KEY=sk-ant-...
ExecStart=/home/david/.nvm/versions/node/<VERSION>/bin/claude -p "tâche à exécuter"
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
Puis :
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now claude-agent
journalctl -u claude-agent -f
```
> Remplacez `<VERSION>` par la sortie de `nvm which default`.

---

## Dépannage

| Problème | Solution |
|---|---|
| `claude: command not found` | `exec $SHELL -l` puis réessayer ; vérifiez `nvm use default`. |
| `apt-get` échoue (pas de sudo) | Lancez le script en root, ou installez `curl git` au préalable. |
| Erreur d'authentification | Vérifiez `echo $ANTHROPIC_API_KEY` ou relancez `claude` pour vous reconnecter. |
| Node trop ancien | Claude Code requiert Node 18+. Le script installe Node 22 par défaut. |
