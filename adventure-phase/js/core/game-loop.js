import { PHYSICS, checkCollision } from './physics.js';
import { DIFFICULTY_CONFIGS } from '../../data/levels-config.js';
import { PlayerCube } from '../entities/player-cube.js';
import { drawObstacle } from '../entities/obstacle-factory.js';
import { drawSafeStation } from '../entities/safe-station.js';
import { drawTrackFloor } from '../rendering/background-renderer.js';
import { ParticleSystem } from '../rendering/particle-system.js';

export class AdventureGameEngine {
  constructor({ canvas, levels, onLevelChange, onProgress, onReachStation, onJumpSound }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.levels = levels;
    this.onLevelChange = onLevelChange;
    this.onProgress = onProgress;
    this.onReachStation = onReachStation;
    this.onJumpSound = onJumpSound;

    this.player = new PlayerCube();
    this.particles = new ParticleSystem();

    this.levelIndex = 0;
    this.difficultyKey = 'medium';
    this.cameraX = 0;
    this.state = 'RUNNING'; // RUNNING | STATION_PAUSED
    this.width = 0;
    this.height = 0;
    this.groundY = 0;
    this.elapsedSec = 0;
    this.shakeTimer = 0;
    this.triggeredOrbs = new Set();
    this.rafId = 0;
    this.lastTime = performance.now();

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loadLevel(0);
  }

  get difficulty() {
    return DIFFICULTY_CONFIGS[this.difficultyKey] || DIFFICULTY_CONFIGS.medium;
  }

  setDifficulty(diffKey) {
    if (!DIFFICULTY_CONFIGS[diffKey]) return;
    this.difficultyKey = diffKey;
    this.onLevelChange?.(this.currentLevel, this.levelIndex, this.difficulty);
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = this.canvas.clientWidth || window.innerWidth;
    this.height = this.canvas.clientHeight || window.innerHeight - 68;
    this.canvas.width = Math.floor(this.width * dpr);
    this.canvas.height = Math.floor(this.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.groundY = Math.max(230, this.height - PHYSICS.groundPadding);
  }

  get currentLevel() {
    return this.levels[this.levelIndex];
  }

  loadLevel(index) {
    this.levelIndex = (index + this.levels.length) % this.levels.length;
    this.cameraX = 0;
    this.state = 'RUNNING';
    this.triggeredOrbs.clear();
    this.player.reset(120, this.groundY);
    this.onLevelChange?.(this.currentLevel, this.levelIndex, this.difficulty);
    this.onProgress?.(0, `Modo ${this.difficulty.label} · Salta y encadena plataformas`);
  }

  restartCurrentLevel() {
    this.loadLevel(this.levelIndex);
    this.particles.burst(this.player.x + 18, this.player.y + 18, this.currentLevel.accentColor, 16);
  }

  jump() {
    if (this.state !== 'RUNNING') return;

    const level = this.currentLevel;
    const diff = this.difficulty;
    const playerWorldX = this.cameraX + this.player.x;
    const playerBox = {
      x: playerWorldX - 14,
      y: this.player.y - 14,
      w: this.player.size + 28,
      h: this.player.size + 28
    };

    for (let i = 0; i < level.obstacles.length; i++) {
      const obs = level.obstacles[i];
      if (obs.shape !== 'jump-orb' || this.triggeredOrbs.has(i)) continue;
      const obsTopY = this.groundY - (obs.yOffset || 0) - obs.h;
      const orbBox = { x: obs.x, y: obsTopY, w: obs.w, h: obs.h };

      if (checkCollision(playerBox, orbBox, 0)) {
        this.triggeredOrbs.add(i);
        this.player.vy = PHYSICS.baseOrbVelocity * diff.jumpScale;
        this.player.onGround = false;
        this.shakeTimer = 0.1;
        this.onJumpSound?.(true);
        this.particles.burst(this.player.x + 19, this.player.y + 19, '#f59e0b', 18);
        return;
      }
    }

    if (this.player.jump(PHYSICS.baseJumpVelocity * diff.jumpScale)) {
      this.onJumpSound?.(false);
      this.particles.burst(
        this.player.x + this.player.size / 2,
        this.player.y + this.player.size,
        level.accentColor,
        10
      );
    }
  }

  continueFromStation() {
    if (this.state !== 'STATION_PAUSED') return;
    this.loadLevel(this.levelIndex + 1);
  }

  start() {
    this.lastTime = performance.now();
    const tick = (now) => {
      const dt = Math.min((now - this.lastTime) / 1000, 0.05);
      this.lastTime = now;
      this.update(dt);
      this.render();
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  update(dt) {
    this.elapsedSec += dt;
    if (this.shakeTimer > 0) {
      this.shakeTimer = Math.max(0, this.shakeTimer - dt);
    }

    this.particles.update(dt);
    if (this.state !== 'RUNNING') return;

    const level = this.currentLevel;
    const diff = this.difficulty;
    const speed = PHYSICS.baseRunSpeed * (level.speedMultiplier || 1) * diff.speedScale;
    const gravity = PHYSICS.baseGravity * diff.gravityScale;
    const prevPlayerBottom = this.player.y + this.player.size;

    this.cameraX += speed * dt;
    this.player.update(dt, this.groundY, gravity);

    const playerWorldX = this.cameraX + this.player.x;
    const pct = Math.min(100, Math.max(0, Math.round((playerWorldX / level.stationX) * 100)));
    this.onProgress?.(pct, `${diff.label} · ${level.shapeLabel}`);

    const playerBox = {
      x: playerWorldX,
      y: this.player.y,
      w: this.player.size,
      h: this.player.size
    };

    for (const obs of level.obstacles) {
      if (obs.shape === 'jump-orb') continue;

      const obsBottomY = this.groundY - (obs.yOffset || 0);
      const obsTopY = obsBottomY - obs.h;
      const obsBox = {
        x: obs.x,
        y: obsTopY,
        w: obs.w,
        h: obs.h
      };

      if (!checkCollision(playerBox, obsBox, diff.forgiveness)) continue;

      const isLandingOnTop =
        obs.solidTop &&
        this.player.vy >= 0 &&
        prevPlayerBottom <= obsTopY + 18;

      if (isLandingOnTop) {
        this.player.y = obsTopY - this.player.size;
        this.player.vy = 0;
        this.player.onGround = true;
        const quarter = Math.PI / 2;
        this.player.rotation = Math.round(this.player.rotation / quarter) * quarter;
        continue;
      }

      this.shakeTimer = 0.2;
      this.particles.burst(this.player.x + 18, this.player.y + 18, '#f59e0b', 22);
      this.cameraX = 0;
      this.triggeredOrbs.clear();
      this.player.reset(120, this.groundY);
      this.onProgress?.(0, `Reintento (${diff.label}) · ¡Inténtalo de nuevo!`);
      return;
    }

    if (playerWorldX >= level.stationX) {
      this.state = 'STATION_PAUSED';
      this.player.y = this.groundY - this.player.size;
      this.player.vy = 0;
      this.player.onGround = true;
      this.particles.burst(this.player.x + 20, this.player.y + 10, '#10b981', 22);
      this.onProgress?.(100, 'Estación segura · Lectura activa');
      this.onReachStation?.(level, this.levelIndex, this.levels.length);
    }
  }

  render() {
    const level = this.currentLevel;
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.shakeTimer > 0) {
      const mag = this.shakeTimer * 26;
      this.ctx.translate((Math.random() - 0.5) * mag, (Math.random() - 0.5) * mag);
    }

    const pulseAlpha = 0.06 + Math.abs(Math.sin(this.elapsedSec * 4.5)) * 0.08;
    this.ctx.fillStyle = level.accentColor;
    this.ctx.globalAlpha = pulseAlpha;
    this.ctx.fillRect(0, this.groundY - 4, this.width, 4);
    this.ctx.globalAlpha = 1;

    drawTrackFloor(this.ctx, this.width, this.height, this.groundY, this.cameraX, level.accentColor);

    for (const obs of level.obstacles) {
      const screenX = obs.x - this.cameraX;
      if (screenX + obs.w < -60 || screenX > this.width + 80) continue;
      drawObstacle(this.ctx, obs, screenX, this.groundY, level, this.elapsedSec);
    }

    const stationScreenX = level.stationX - this.cameraX;
    if (stationScreenX < this.width + 140) {
      drawSafeStation(this.ctx, stationScreenX, this.groundY, '#10b981');
    }

    this.particles.draw(this.ctx);
    this.player.draw(this.ctx, level);
    this.ctx.restore();
  }
}