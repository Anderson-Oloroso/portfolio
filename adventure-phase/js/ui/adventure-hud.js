import { initThemeManager } from '../../../shared/js/theme-manager.js';
import { LEVELS_CONFIG, DIFFICULTY_CONFIGS } from '../../data/levels-config.js';
import { AdventureGameEngine } from '../core/game-loop.js';
import { createInputHandler } from '../core/input-handler.js';
import { createStationModal } from './station-modal.js';

// 5 new original compositions (one per level) with bassline, lead melody, and synth pulse
const STAGE_TRACKS = [
  // Level 01 (Perfil): Midnight Grid — calm-yet-propulsive bass & fifths
  {
    bpm: 118,
    bassWave: 'triangle',
    leadWave: 'sine',
    bassNotes: [110, 110, 146.83, 146.83, 164.81, 164.81, 146.83, 130.81],
    leadNotes: [440, 523.25, 659.25, 587.33, 659.25, 783.99, 659.25, 523.25]
  },
  // Level 02 (Experiencia): Pipeline Sync — groovy syncopated bass & staccato lead
  {
    bpm: 126,
    bassWave: 'sawtooth',
    leadWave: 'triangle',
    bassNotes: [123.47, 185.0, 146.83, 220.0, 164.81, 246.94, 146.83, 123.47],
    leadNotes: [493.88, 0, 587.33, 739.99, 659.25, 587.33, 493.88, 369.99]
  },
  // Level 03 (Stack): Overclocked Cubes — bright retro arcade arpeggio
  {
    bpm: 134,
    bassWave: 'square',
    leadWave: 'sawtooth',
    bassNotes: [130.81, 130.81, 196.0, 196.0, 174.61, 174.61, 146.83, 196.0],
    leadNotes: [523.25, 659.25, 783.99, 1046.5, 880.0, 783.99, 659.25, 587.33]
  },
  // Level 04 (Proyectos): Crimson Voltage — fast driving ostinato
  {
    bpm: 140,
    bassWave: 'sawtooth',
    leadWave: 'square',
    bassNotes: [146.83, 146.83, 174.61, 220.0, 196.0, 174.61, 164.81, 146.83],
    leadNotes: [587.33, 698.46, 880.0, 783.99, 698.46, 587.33, 659.25, 440.0]
  },
  // Level 05 (Más allá del código): Cloud Horizon — warm synthwave pad & bell plucks
  {
    bpm: 122,
    bassWave: 'sine',
    leadWave: 'triangle',
    bassNotes: [130.81, 164.81, 196.0, 246.94, 220.0, 196.0, 164.81, 146.83],
    leadNotes: [659.25, 783.99, 987.77, 880.0, 783.99, 659.25, 587.33, 523.25]
  }
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

  function triggerTone(freq, wave, durationSec, peakGain, slideToFreq = null) {
    if (!ctx || ctx.state !== 'running' || !freq) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = wave;
    osc.frequency.setValueAtTime(freq, now);
    if (slideToFreq) {
      osc.frequency.exponentialRampToValueAtTime(slideToFreq, now + durationSec);
    }

    gain.gain.setValueAtTime(0.0008, now);
    gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.014);
    gain.gain.exponentialRampToValueAtTime(0.0006, now + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + durationSec + 0.02);
  }

  function playStep() {
    if (!enabled || !ctx || ctx.state !== 'running') return;
    const track = STAGE_TRACKS[trackIndex];
    const idx = stepIndex % track.bassNotes.length;
    const bassFreq = track.bassNotes[idx];
    const leadFreq = track.leadNotes[idx];

    // Kick-style low sweep on even steps
    if (idx % 2 === 0) {
      triggerTone(115, 'sine', 0.11, 0.045, 42);
    }

    triggerTone(bassFreq, track.bassWave, 0.18, 0.024);
    if (leadFreq > 0) {
      triggerTone(leadFreq, track.leadWave, 0.14, 0.018);
    }

    stepIndex++;
  }

  function startLoop() {
    stopLoop();
    if (!enabled) return;
    const track = STAGE_TRACKS[trackIndex];
    const stepMs = Math.max(90, Math.round((60000 / track.bpm / 2) / tempoScale));
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
      triggerTone(isOrb ? 360 : 250, isOrb ? 'triangle' : 'square', 0.12, 0.035, isOrb ? 780 : 540);
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