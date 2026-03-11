/**
 * websocket/client.js — WebSocket connection with auto-reconnect.
 */

const WSClient = (() => {
  let ws = null;
  let attempts = 0;

  function connect() {
    const url = `ws://${CONFIG.SERVER_HOST}/ws`;
    console.log(`[WS] Connecting to ${url}`);
    _status(false, 'Connecting...');

    ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('[WS] Connected');
      attempts = 0;
      _status(true, 'Connected');
    };

    ws.onmessage = ({ data }) => {
      try { _handle(JSON.parse(data)); }
      catch (e) { console.error('[WS] Parse error:', e); }
    };

    ws.onclose = () => { _status(false, 'Disconnected'); _reconnect(); };
    ws.onerror = (e) => console.error('[WS] Error:', e);
  }

  function _handle(msg) {
    if (msg.type === 'state_snapshot') {
      if (msg.map_config) {
        GameMap.init(
          [msg.map_config.center.lat, msg.map_config.center.lng],
          msg.map_config.zoom
        );
      }
    }
    if (msg.type === 'state_snapshot' || msg.type === 'game_tick') {
      GameMap.updateVehicles(msg.vehicles || []);
      HUD.updateCompanies(msg.companies || []);
      HUD.updateVehicleList(msg.vehicles || []);
      HUD.updateTick(msg.tick, msg.game_time, msg.paused);
    }
  }

  function _reconnect() {
    if (attempts >= CONFIG.WS_MAX_RECONNECT_ATTEMPTS) {
      _status(false, 'Cannot reach server');
      return;
    }
    const delay = CONFIG.WS_RECONNECT_DELAY_MS * Math.min(++attempts, 5);
    _status(false, `Reconnecting (${attempts})...`);
    setTimeout(connect, delay);
  }

  function _status(ok, label) {
    const dot = document.getElementById('ws-dot');
    const lbl = document.getElementById('ws-label');
    if (dot) dot.className = 'status-dot' + (ok ? ' connected' : '');
    if (lbl) lbl.textContent = label;
  }

  return { connect };
})();
