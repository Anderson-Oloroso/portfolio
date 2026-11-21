import { initThemeManager } from '../../../shared/js/theme-manager.js';
import { LEVELS_CONFIG, DIFFICULTY_CONFIGS } from '../../data/levels-config.js';
import { AdventureGameEngine } from '../core/game-loop.js';
import { createInputHandler } from '../core/input-handler.js';
import { createStationModal } from './station-modal.js';
import { GdSynthAudio } from '../audio/gd-synth-audio.js';

document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('adv-theme-toggle');
  const audioBtn = document.getElementById('adv-audio-toggle');
  const audioLabel = document.getElementById('adv-audio-label');
  const difficultySelector = document.getElementById('adv-difficulty-selector');
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
  const synthAudio = new GdSynthAudio();

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
    onJumpSound: (isOrb) => synthAudio.playJumpSfx(isOrb),
    onLevelChange: (level, idx, diff = DIFFICULTY_CONFIGS.medium) => {
      if (levelCodeEl) levelCodeEl.textContent = level.code;
      if (levelNameEl) levelNameEl.textContent = level.name;
      if (levelSelector) levelSelector.value = String(idx);
      if (backdropLayer) backdropLayer.setAttribute('data-gradient', level.gradientKey);
      if (backdropKicker) backdropKicker.textContent = level.kicker;
      if (backdropTitle) backdropTitle.textContent = level.name;
      if (backdropSub) backdropSub.textContent = level.backdropSub;
      synthAudio.setStage(level.trackIndex ?? idx, diff.tempoScale);
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

  difficultySelector?.addEventListener('change', (e) => {
    const diffKey = e.target.value || 'medium';
    engine.setDifficulty(diffKey);
    engine.restartCurrentLevel();
  });

  audioBtn?.addEventListener('click', () => {
    const nextState = !synthAudio.enabled;
    synthAudio.setEnabled(nextState);
    audioBtn.setAttribute('aria-pressed', String(!nextState));
    if (audioLabel) {
      audioLabel.textContent = nextState ? 'Audio: ON' : 'Audio: OFF';
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
      synthAudio.ensureContext();
      if (synthAudio.enabled && !synthAudio.timerId) {
        synthAudio.startLoop();
      }
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