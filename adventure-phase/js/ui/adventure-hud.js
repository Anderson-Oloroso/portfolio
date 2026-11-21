import { initThemeManager } from '../../../shared/js/theme-manager.js';
import { LEVELS_CONFIG, DIFFICULTY_CONFIGS } from '../../data/levels-config.js';
import { AdventureGameEngine } from '../core/game-loop.js';
import { createInputHandler } from '../core/input-handler.js';
import { createStationModal } from './station-modal.js';

const STAGE_TRACKS = [
  { bpm: 124, wave: 'sawtooth', notes: [220, 261.63, 329.63, 440, 392, 329.63, 293.66, 261.63] },
  { bpm: 130, wave: 'square', notes: [246.94, 293.66, 369.99, 493.88, 440, 369.99, 329.63, 293.66] },
  { bpm: 138, wave: 'sawtooth', notes: [261.63, 329.63, 392, 523.25, 493.88, 392, 349.23, 329.63] },
  { bpm: 144, wave: 'square', notes: [293.66, 349.23, 440, 587.33, 523.25, 440, 392, 349.23] },
  { bpm: 128, wave: 'triangle', notes: [261.63, 329.63, 392, 493.88, 587.33, 493.88, 392, 329.63] }
];

function createStageSynth() {
  let ctx = null;
  let enabled = true;
  let trackIndex = 0;
  let tempoScale = 1;
  let stepIndex = 0;
  let timerId = null;

  function ensureContext() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        ctx = new AudioCtx();
      }
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }

  function stopLoop() {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function playStep() {
    if (!enabled || !ctx || ctx.state !== 'running') return;
    const track = STAGE_TRACKS[trackIndex];
    const freq = track.notes[stepIndex % track.notes.length];
    stepIndex++;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = track.wave;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.032, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.17);
  }

  function startLoop() {
    stopLoop();
    if (!enabled) return;
    const track = STAGE_TRACKS[trackIndex];
    const stepMs = Math.max(95, Math.round((60000 / track.bpm / 2) / tempoScale));
    timerId = window.setInterval(playStep, stepMs);
  }

  return {
    get enabled() {
      return enabled;
    },
    get isRunning() {
      return timerId !== null;
    },
    ensureContext,
    startLoop,
    setEnabled(value) {
      enabled = Boolean(value);
      if (!enabled) {
        stopLoop();
      } else {
        ensureContext();
        startLoop();
      }
    },
    setStage(nextTrackIdx, nextTempoScale = 1) {
      trackIndex = (nextTrackIdx ?? 0) % STAGE_TRACKS.length;
      tempoScale = nextTempoScale || 1;
      stepIndex = 0;
      if (enabled) {
        ensureContext();
        startLoop();
      }
    },
    playJumpSfx(isOrb = false) {
      if (!enabled) return;
      ensureContext();
      if (!ctx || ctx.state !== 'running') return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = isOrb ? 'triangle' : 'square';
      osc.frequency.setValueAtTime(isOrb ? 340 : 240, now);
      osc.frequency.exponentialRampToValueAtTime(isOrb ? 760 : 520, now + 0.12);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    }
  };
}

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
  const synthAudio = createStageSynth();

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
      if (synthAudio.enabled && !synthAudio.isRunning) {
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