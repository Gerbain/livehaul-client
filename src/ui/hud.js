/**
 * ui/hud.js — Updates the HUD: company badges, vehicle list, status bar.
 */

const HUD = (() => {

  function updateCompanies(companies) {
    const bar = document.getElementById('companies-bar');
    if (!bar) return;
    bar.innerHTML = companies.map(c => `
      <div class="company-badge">
        <div class="company-dot" style="background:${c.color}"></div>
        <span>${c.name}</span>
        <span class="company-balance">€${_money(c.balance)}</span>
      </div>
    `).join('');
  }

  function updateVehicleList(vehicles) {
    const list = document.getElementById('vehicle-list');
    if (!list) return;
    if (!vehicles.length) {
      list.innerHTML = '<div style="color:#334155;font-size:13px">No vehicles</div>';
      return;
    }
    list.innerHTML = vehicles.map(v => `
      <div class="vehicle-card">
        <div class="vehicle-card-header">
          <div class="vehicle-color-dot" style="background:${v.color}"></div>
          <span class="vehicle-name">${v.label}</span>
          <span class="vehicle-status ${v.status}">${_statusLabel(v.status)}</span>
        </div>
        <div class="vehicle-coords">${v.lat.toFixed(4)}, ${v.lng.toFixed(4)}</div>
        <div class="vehicle-meta">${v.total_distance_km.toFixed(1)} km · ${v.total_deliveries} deliveries</div>
      </div>
    `).join('');
  }

  function updateTick(tick, gameTime, paused) {
    const t = document.getElementById('tick-display');
    const g = document.getElementById('game-time-display');
    if (t) t.textContent = `Tick ${tick}${paused ? ' ⏸' : ''}`;
    if (g && gameTime != null) {
      const h = Math.floor(gameTime / 3600) % 24;
      const m = Math.floor(gameTime / 60) % 60;
      g.textContent = `Game time ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    }
  }

  function _statusLabel(s) {
    return { idle: 'Idle', en_route: 'En Route', broken_down: 'Broken', waiting: 'Waiting' }[s] || s;
  }

  function _money(n) {
    return Number(n).toLocaleString('nl-BE', { maximumFractionDigits: 0 });
  }

  return { updateCompanies, updateVehicleList, updateTick };
})();
