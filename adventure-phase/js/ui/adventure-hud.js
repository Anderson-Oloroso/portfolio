import { initThemeManager } from '../../../shared/js/theme-manager.js';
import { LEVELS_CONFIG, DIFFICULTY_CONFIGS } from '../../data/levels-config.js';
import { AdventureGameEngine } from '../core/game-loop.js';
import { createInputHandler } from '../core/input-handler.js';
import { createStationModal } from './station-modal.js';

const LEVEL_SOUND_PRESETS = [
  // Level 01: Electric blue pulse + deep sub
  {
    bpm: 112,
    filterFreq: 780,
    delayTime: 0.24,
    feedback: 0.24,
    bassWave: 'sine',
    synthWave: 'triangle',
    bassFreqs: [110, 110, 146.83, 130.81],
    pulseFreqs: [440, 0, 523.25, 659.25, 587.33, 0, 523.25, 440]
  },
  // Level 02: Matrix green filtered rhythm
  {
    bpm: 120,
    filterFreq: 960,
    delayTime: 0.19,
    feedback: 0.22,
    bassWave: 'triangle',
    synthWave: 'sine',
    bassFreqs: [123.47, 164.81, 146.83, 185.0],
    pulseFreqs: [493.88, 587.33, 0, 739.99, 659.25, 587.33, 493.88, 0]
  },
  // Level 03: Cyberpunk purple spatial delay
  {
    bpm: 128,
    filterFreq: 1180,
    delayTime: 0.28,
    feedback: 0.28,
    bassWave: 'sine',
    synthWave: 'triangle',
    bassFreqs: [130.81, 196.0, 174.61, 196.0],
    pulseFreqs: [523.25, 0, 783.99, 659.25, 880.0, 783.99, 0, 659.25]
  },
  // Level 04: Cyber orange driving electronic pulse
  {
    bpm: 134,
    filterFreq: 1050,
    delayTime: 0.17,
    feedback: 0.2,
    bassWave: 'triangle',
    synthWave: 'sawtooth',
    bassFreqs: [146.83, 146.83, 174.61, 196.0],
    pulseFreqs: [587.33, 698.46, 880.0, 0, 783.99, 698.46, 587.33, 659.25]
  },
  // Level 05: Neon violet atmospheric electronic close
  {
    bpm: 116,
    filterFreq: 860,
    delayTime: 0.3,
    feedback: 0.26,
    bassWave: 'sine',
    synthWave: 'sine',
    bassFreqs: [130.81, 164.81, 196.0, 220.0],
    pulseFreqs: [659.25, 0, 783.99, 987.77, 880.0, 0, 783.99, 659.25]
  }
];

function createElectronicStageAudio() {
  let ctx = null;
  let masterGain = null;
  let filterNode = null;
  let delayNode = null;
  let feedbackGain = null;

  let enabled = true;
  let presetIndex = 0;
  let tempoScale = 1;
  let step = 0;
  let timerId = null;

  function ensureGraph() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      ctx = new AudioCtx();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.22;

      filterNode = ctx.createBiquadFilter();
      filterNode.type = 'lowpass';
      filterNode.frequency.value = 900;
      filterNode.Q.value = 2.2;

      delayNode = ctx.createDelay(1.0);
      delayNode.delayTime.value = 0.22;

      feedbackGain = ctx.createGain();
      feedbackGain.gain.value = 0.22;

      // Dry path
      filterNode.connect(masterGain);

      // Wet echo path
      filterNode.connect(delayNode);
      delayNode.connect(feedbackGain);
      feedbackGain.connect(delayNode);
      delayNode.connect(masterGain);

      masterGain.connect(ctx.destination);
    }

    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    applyPresetParams();
  }

  function applyPresetParams() {
    if (!ctx || !filterNode || !delayNode || !feedbackGain) return;
    const preset = LEVEL_SOUND_PRESETS[presetIndex] || LEVEL_SOUND_PRESETS[0];
    const now = ctx.currentTime;
    filterNode.frequency.setTargetAtTime(preset.filterFreq, now, 0.08);
    delayNode.delayTime.setTargetAtTime(preset.delayTime, now, 0.08);
    feedbackGain.gain.setTargetAtTime(preset.feedback, now, 0.08);
  }

  function stopLoop() {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function triggerPulse(freq, wave, durationSec, peakGain, slideFreq = null) {
    if (!enabled || !ctx || ctx.state !== 'running' || !freq || !filterNode) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();

    osc.type = wave;
    osc.frequency.setValueAtTime(freq, now);
    if (slideFreq) {
      osc.frequency.exponentialRampToValueAtTime(slideFreq, now + durationSec);
    }

    env.gain.setValueAtTime(0.0005, now);
    env.gain.linearRampToValueAtTime(peakGain, now + 0.018);
    env.gain.exponentialRampToValueAtTime(0.0004, now + durationSec);

    osc.connect(env);
    env.connect(filterNode);

    osc.start(now);
    osc.stop(now + durationSec + 0.03);
  }

  function playStep() {
    if (!enabled || !ctx || ctx.state !== 'running') return;
    const preset = LEVEL_SOUND_PRESETS[presetIndex] || LEVEL_SOUND_PRESETS[0];

    // Deep electronic sub thump every 2 steps
    if (step % 2 === 0) {
      const bassFreq = preset.bassFreqs[Math.floor(step / 2) % preset.bassFreqs.length];
      triggerPulse(bassFreq, preset.bassWave, 0.24, 0.16, bassFreq * 0.88);
    }

    // Filtered electronic synth pluck
    const leadFreq = preset.pulseFreqs[step % preset.pulseFreqs.length];
    if (leadFreq > 0) {
      triggerPulse(leadFreq, preset.synthWave, 0.18, 0.085);
    }

    step++;
  }

  function startLoop() {
    stopLoop();
    if (!enabled) return;
    const preset = LEVEL_SOUND_PRESETS[presetIndex] || LEVEL_SOUND_PRESETS[0];
    const stepMs = Math.max(95, Math.round((60000 / preset.bpm / 2) / tempoScale));
    timerId = window.setInterval(playStep, stepMs);
  }

  return {
    get enabled() {
      return enabled;
    },
    get isRunning() {
      return timerId !== null;
    },
    unlock() {
      if (!enabled) return;
      ensureGraph();
      if (!timerId) {
        startLoop();
      }
    },
    setEnabled(value) {
      enabled = Boolean(value);
      if (!enabled) {
        stopLoop();
      } else {
        ensureGraph();
        startLoop();
      }
    },
    setStage(nextIdx, nextTempoScale = 1) {
      presetIndex = (nextIdx ?? 0) % LEVEL_SOUND_PRESETS.length;
      tempoScale = nextTempoScale || 1;
      step = 0;
      if (enabled) {
        ensureGraph();
        startLoop();
      }
    },
    playJumpSfx(isOrb = false) {
      if (!enabled) return;
      ensureGraph();
      triggerPulse(
        isOrb ? 320 : 210,
        'sine',
        0.13,
        0.12,
        isOrb ? 680 : 440
      );
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
  const stageAudio = createElectronicStageAudio();

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
    onJumpSound: (isOrb) => stageAudio.playJumpSfx(isOrb),
    onLevelChange: (level, idx, diff = DIFFICULTY_CONFIGS.medium) => {
      if (levelCodeEl) levelCodeEl.textContent = level.code;
      if (levelNameEl) levelNameEl.textContent = level.name;
      if (levelSelector) levelSelector.value = String(idx);
      if (backdropLayer) backdropLayer.setAttribute('data-gradient', level.gradientKey);
      if (backdropKicker) backdropKicker.textContent = level.kicker;
      if (backdropTitle) backdropTitle.textContent = level.name;
      if (backdropSub) backdropSub.textContent = level.backdropSub;
      stageAudio.setStage(level.trackIndex ?? idx, diff.tempoScale || 1);
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
    const diffCfg = DIFFICULTY_CONFIGS[diffKey] || DIFFICULTY_CONFIGS.medium;
    stageAudio.setStage(engine.levelIndex, diffCfg.tempoScale || 1);
    engine.restartCurrentLevel();
  });

  audioBtn?.addEventListener('click', () => {
    const nextState = !stageAudio.enabled;
    stageAudio.setEnabled(nextState);
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
      stageAudio.unlock();
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