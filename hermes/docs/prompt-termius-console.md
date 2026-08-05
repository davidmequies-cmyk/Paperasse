# Prompt — réparer la console web Hermès (à coller dans Termius)

> À utiliser depuis une session SSH ouverte sur le VPS Hermès (Termius).
> Le prompt est autoportant : il contient le constat déjà établi, les commandes de
> diagnostic, et les règles de sécurité à respecter.

---

## Le prompt

```
Tu es administrateur système sur le VPS Hermès (Ubuntu). Je me connecte en SSH via
Termius. Problème à résoudre : LA CONSOLE WEB HERMÈS NE SE CHARGE PAS (page blanche /
erreur / adresse injoignable dans le navigateur).

CONSTAT DÉJÀ ÉTABLI (relevé le 05/08/2026, ne pas le refaire) :
- Les 4 services systemd sont tous "active" et "enabled" :
  hermes-api (API locale, écoute en localhost uniquement, contrôle des agents),
  hermes-bridge (pont Telegram),
  hermes-mcp-http (serveur MCP HTTP, backend local port 8765),
  hermes-cloudflared (tunnel Cloudflare).
- Le VPS a redémarré ce matin à 10:08 (uptime ~6 h au moment du constat).
- Le tunnel est en mode ÉPHÉMÈRE (cloudflared --url) : l'adresse publique
  *.trycloudflare.com CHANGE À CHAQUE REDÉMARRAGE. Elle a donc changé ce matin.
- Le tunnel expose uniquement le backend local 8765 (hermes-mcp-http).
- Sur ce backend, GET / renvoie 404 : aucune page HTML n'est servie à la racine.
- Charge CPU quasi nulle, RAM et disque largement disponibles : ce n'est pas une
  saturation de ressources.

HYPOTHÈSES À TESTER, DANS CET ORDRE :
1. L'adresse est morte : le lien de la console est un favori pointant sur l'ancienne
   adresse trycloudflare, invalidée par le redémarrage de 10:08.
2. La console n'est pas routée : elle est servie par un autre process/port (souvent
   hermes-api en localhost, ou un nginx/caddy) que le tunnel n'expose pas.
3. La console n'existe pas côté serveur : aucun fichier HTML / aucune route ne la sert
   (cohérent avec le 404 à la racine du 8765).

DIAGNOSTIC — commandes à exécuter, en lecture seule, et à me commenter :
  ss -tlnp                          # qui écoute, sur quels ports, en 127.0.0.1 vs 0.0.0.0
  systemctl cat hermes-api hermes-mcp-http hermes-cloudflared   # unités, ExecStart, ports
  journalctl -u hermes-cloudflared -n 50 --no-pager   # adresse publique courante du tunnel
  curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8765/
  # puis, pour chaque autre port trouvé par ss :
  curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:<PORT>/
  systemctl is-active nginx caddy apache2 2>/dev/null   # un reverse proxy existe-t-il ?
  ls -la /opt/hermes /srv/hermes /var/www 2>/dev/null   # où vivent les fichiers web ?
  find / -name '*.html' -path '*hermes*' -not -path '*/node_modules/*' 2>/dev/null | head

CE QUE J'ATTENDS DE TOI :
- D'abord un VERDICT en 3 lignes : quel composant sert la console, sur quel port, et
  pourquoi elle ne se charge pas (adresse morte / non routée / inexistante).
- Ensuite la correction minimale, expliquée AVANT d'être appliquée. Si l'adresse a
  seulement changé, donne-moi la nouvelle URL complète et arrête-toi là.
- Enfin, la correction durable : remplacer le tunnel éphémère par un tunnel Cloudflare
  NOMMÉ (adresse fixe qui survit aux redémarrages), avec le fichier de config et la
  commande exacts. Ne l'applique pas sans mon accord explicite.

RÈGLES IMPÉRATIVES :
- Tu ne modifies RIEN sans mon accord explicite : diagnostic d'abord, proposition
  ensuite, application seulement après mon "oui".
- Aucun secret en clair dans tes réponses : pas de contenu de .env, pas de token
  Cloudflare, pas de clé API, pas de chemin/URL contenant le segment secret du MCP.
- Les seuls services que tu peux redémarrer sont : hermes-api, hermes-bridge,
  hermes-mcp-http, hermes-cloudflared. Aucun autre, jamais.
- Pas de reboot du serveur. Pas de rm. Pas de modification de pare-feu.
- Si une commande échoue, tu me montres la sortie d'erreur telle quelle plutôt que de
  la contourner.
```

---

## Rappel de contexte

| Élément | Valeur constatée le 05/08/2026 |
|---|---|
| Services actifs | `hermes-api`, `hermes-bridge`, `hermes-mcp-http`, `hermes-cloudflared` (4/4 `active`) |
| Dernier redémarrage VPS | 05/08/2026 à 10:08 |
| Backend exposé par le tunnel | port local 8765 (`hermes-mcp-http`) |
| Réponse à `GET /` sur 8765 | `404 Not Found` |
| Mode du tunnel | éphémère (`--url`) → **l'adresse publique change à chaque redémarrage** |

La cause la plus probable est la conjonction des deux dernières lignes : le lien
mémorisé pointe sur une adresse périmée, et même à jour, la racine ne sert aucune page.
Le correctif durable est le **tunnel nommé** (adresse fixe), traité en fin de prompt.
