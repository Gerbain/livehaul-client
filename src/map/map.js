/**
 * map/map.js — Leaflet map and vehicle marker management.
 */

const GameMap = (() => {
  let map = null;
  const markers = {};

  function init(center, zoom) {
    if (map) return;
    map = L.map('map', {
      center: center || CONFIG.DEFAULT_CENTER,
      zoom:   zoom   || CONFIG.DEFAULT_ZOOM,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    console.log('[Map] Initialised');
  }

  function _icon(color) {
    return L.divIcon({
      className: 'vehicle-marker-icon',
      html: `<div class="vehicle-dot" style="background:${color}"></div>`,
      iconSize:   [CONFIG.MARKER_SIZE, CONFIG.MARKER_SIZE],
      iconAnchor: [CONFIG.MARKER_SIZE / 2, CONFIG.MARKER_SIZE / 2],
    });
  }

  function updateVehicles(vehicles) {
    const seen = new Set();
    vehicles.forEach(v => {
      seen.add(v.id);
      const pos = [v.lat, v.lng];
      if (markers[v.id]) {
        markers[v.id].setLatLng(pos);
        markers[v.id].setTooltipContent(_tooltip(v));
      } else {
        const m = L.marker(pos, { icon: _icon(v.color), title: v.label }).addTo(map);
        m.bindTooltip(_tooltip(v), { permanent: false, direction: 'top', offset: [0, -10] });
        markers[v.id] = m;
      }
    });
    Object.keys(markers).forEach(id => {
      if (!seen.has(id)) { markers[id].remove(); delete markers[id]; }
    });
  }

  function _tooltip(v) {
    return `<strong>${v.label}</strong><br>${v.status === 'en_route' ? '🚛 En route' : '⏸ Idle'}<br>${v.total_distance_km.toFixed(1)} km`;
  }

  return { init, updateVehicles };
})();
