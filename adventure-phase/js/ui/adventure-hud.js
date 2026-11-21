import { initThemeManager } from '../../../shared/js/theme-manager.js';
import { LEVELS_CONFIG } from '../../data/levels-config.js';
import { AdventureGameEngine } from '../core/game-loop.js';
import { createInputHandler } from '../core/input-handler.js';
import { createStationModal } from './station-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('adv-theme-toggle');
  const canvas = document.getElementById('gd-canvas');
  const levelSelector = document.getElementById('adv-level-selector');
  const levelCodeEl = document.getElementById('adv-level-code');
  const levelNameEl = document.getElementById('adv-level-name');
  const backdropLayer = document.getElementById('adv-backdrop-layer');
  const backdropKicker = document.getElementById('adv-backdrop-kicker');
  const backdropTitle = document.getElementById('adv-backdrop-title');
  const backdropSub = document.getElementById('adv-backdrop-sub');
  const statusEl = document.getElementById('adv-station-status');
  const pctEl = document.getElementById('adv-progress-pct');
  const fillEl = document.getElementById('adv-progress-fill');
  const jumpBtn = document.getElementById('adv-btn-jump');
  const restartBtn = document.getElementById('adv-btn-restart');

  initThemeManager(themeBtn);

  if (levelSelector) {
    levelSelector.innerHTML = LEVELS_CONFIG.map(
      (lvl, idx) => `<option value="${idx}">${lvl.code} · ${lvl.name}</option>`
    ).join('');
  }

  let engine = null;

  const stationModal = createStationModal({
    onContinue: () => {
      engine?.continueFromStation();
    }
  });

  engine = new AdventureGameEngine({
    canvas,
    levels: LEVELS_CONFIG,
    onLevelChange: (level, idx) => {
      if (levelCodeEl) levelCodeEl.textContent = level.code;
      if (levelNameEl) levelNameEl.textContent = level.name;
      if (levelSelector) levelSelector.value = String(idx);
      if (backdropLayer) backdropLayer.setAttribute('data-gradient', level.gradientKey);
      if (backdropKicker) backdropKicker.textContent = level.kicker;
      if (backdropTitle) backdropTitle.textContent = level.name;
      if (backdropSub) backdropSub.textContent = level.backdropSub;
    },
    onProgress: (pct, statusText) => {
      if (pctEl) pctEl.textContent = `${pct}%`;
      if (fillEl) fillEl.style.width = `${pct}%`;
      if (statusEl) statusEl.textContent = statusText;
    },
    onReachStation: (level, idx, total) => {
      stationModal.open(level, idx, total);
    }
  });

  levelSelector?.addEventListener('change', (e) => {
    stationModal.close();
    const targetIdx = Number(e.target.value || 0);
    engine.loadLevel(targetIdx);
  });

  restartBtn?.addEventListener('click', () => {
    stationModal.close();
    engine.restartCurrentLevel();
  });

  createInputHandler({
    canvas,
    jumpBtn,
    onJump: () => {
      if (!stationModal.isOpen) {
        engine.jump();
      }
    },
    onContinue: () => {
      if (stationModal.isOpen) {
        stationModal.close();
        engine.continueFromStation();
      }
    }
  });

  engine.start();
});