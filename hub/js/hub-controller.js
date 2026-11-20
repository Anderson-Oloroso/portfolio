import { initThemeManager } from '../../shared/js/theme-manager.js';
import { initHubCanvas } from './hub-canvas.js';

document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('hub-theme-toggle');
  const canvas = document.getElementById('hub-canvas');

  initThemeManager(themeBtn);
  initHubCanvas(canvas);
});