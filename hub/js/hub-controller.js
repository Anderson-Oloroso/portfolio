import { initThemeManager } from '../../shared/js/theme-manager.js';
import { initCursor } from '../../shared/js/cursor.js';
import { initAmbientCanvas } from '../../shared/js/ambient-canvas.js';

document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('hub-theme-toggle');
  const canvas = document.getElementById('hub-canvas');

  initThemeManager(themeBtn);
  initCursor();
  initAmbientCanvas(canvas);
});
