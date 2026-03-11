/**
 * config.js — LiveHaul client configuration.
 *
 * Auto-detects localhost in development.
 * On Pi: change SERVER_HOST to 'livehaul.local:8000' or your Pi IP.
 */

const CONFIG = {
  SERVER_HOST: window.location.hostname === 'localhost'
    ? 'localhost:8000'
    : `${window.location.hostname}:8000`,

  WS_RECONNECT_DELAY_MS: 2000,
  WS_MAX_RECONNECT_ATTEMPTS: 20,

  // Overridden by server snapshot on connect
  DEFAULT_CENTER: [50.8503, 4.3517],
  DEFAULT_ZOOM: 8,

  MARKER_SIZE: 14,
  SMOOTH_MOVE_MS: 900,
};
