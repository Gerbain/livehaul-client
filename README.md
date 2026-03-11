# livehaul-client

Browser frontend for **LiveHaul** — a real-world logistics management game.

Displays a live map with vehicle icons moving along real roads, updated in real time from the server. No build step — open `public/index.html` directly.

**Server repo:** [livehaul-server](https://github.com/gerbain/livehaul-server)

---

## Stack

| Component | Technology |
|---|---|
| Map | Leaflet.js + OpenStreetMap tiles |
| Real-time | Native WebSocket API |
| Styling | Vanilla CSS |
| Build | None — plain HTML/JS/CSS |

---

## Quick Start

```bash
git clone https://github.com/gerbain/livehaul-client
cd livehaul-client

# Open in browser
open public/index.html          # Mac
xdg-open public/index.html      # Linux
start public/index.html         # Windows
```

Make sure `livehaul-server` is running first.

---

## Connecting to the Server

`src/config.js` auto-detects localhost in development. For Pi play:

```javascript
// src/config.js
SERVER_HOST: 'livehaul.local:8000'
// or use your Pi's IP:
SERVER_HOST: '192.168.1.100:8000'
```

---

## Serving on the Network

To make the client accessible to other devices on your network:

```bash
# Serve from Pi (or any machine)
python -m http.server 3000 --directory public
# → http://livehaul.local:3000
```

Or add Nginx to serve it alongside the game server — see the server repo's Pi setup.

---

## Project Structure

```
livehaul-client/
├── public/
│   └── index.html        # Open this in your browser
├── src/
│   ├── config.js         # Server URL + client settings
│   ├── main.js           # Entry point
│   ├── map/
│   │   └── map.js        # Leaflet map + vehicle markers
│   ├── websocket/
│   │   └── client.js     # WS connection + auto-reconnect
│   └── ui/
│       └── hud.js        # Company badges, fleet list, status bar
└── assets/
    └── icons/            # Vehicle SVG icons (Phase 2)
```
