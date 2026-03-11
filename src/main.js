/**
 * main.js — LiveHaul client entry point.
 */

window.addEventListener('DOMContentLoaded', () => {
  console.log('[LiveHaul] Client starting');
  GameMap.init(CONFIG.DEFAULT_CENTER, CONFIG.DEFAULT_ZOOM);
  WSClient.connect();
});
