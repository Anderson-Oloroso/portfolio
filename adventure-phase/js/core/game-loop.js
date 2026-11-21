import { PHYSICS, checkCollision } from './physics.js';
import { PlayerCube } from '../entities/player-cube.js';
import { drawObstacle } from '../entities/obstacle-factory.js';
import { drawSafeStation } from '../entities/safe-station.js';
import { drawTrackFloor } from '../rendering/background-renderer.js';
import { ParticleSystem } from '../rendering/particle-system.js';

export class AdventureGameEngine {
  constructor({ canvas, levels, onLevelChange, onProgress, onReachStation }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.levels = levels;
    this.onLevelChange = onLevelChange;
    this.onProgress = onProgress;
    this.onReachStation = onReachStation;

    this.player = new PlayerCube();
    this.particles = new ParticleSystem();

    this.levelIndex = 0;
    this.cameraX = 0;
    this.state = 'RUNNING'; // RUNNING | STATION_PAUSED
    this.width = 0;
    this.height = 0;
    this.groundY = 0;
    this.rafId = 0;
    this.lastTime = performance.now();

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loadLevel(0);
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = this.canvas.clientWidth || window.innerWidth;
    this.height = this.canvas.clientHeight || window.innerHeight - 68;
    this.canvas.width = Math.floor(this.width * dpr);
    this.canvas.height = Math.floor(this.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.groundY = Math.max(220, this.height - PHYSICS.groundPadding);
  }

  get currentLevel() {
    return this.levels[this.levelIndex];
  }

  loadLevel(index) {
    this.levelIndex = (index + this.levels.length) % this.levels.length;
    this.cameraX = 0;
    this.state = 'RUNNING';
    this.player.reset(120, this.groundY);
    this.onLevelChange?.(this.currentLevel, this.levelIndex);
    this.onProgress?.(0, 'En carrera · Salta los bloques');
  }

  restartCurrentLevel() {
    this.loadLevel(this.levelIndex);
    this.particles.burst(this.player.x + 18, this.player.y + 18, this.currentLevel.accentColor, 14);
  }

  jump() {
    if (this.state !== 'RUNNING') return;
    if (this.player.jump()) {
      this.particles.burst(
        this.player.x + this.player.size / 2,
        this.player.y + this.player.size,
        this.currentLevel.accentColor,
        8
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
    this.particles.update(dt);
    if (this.state !== 'RUNNING') return;

    const level = this.currentLevel;
    this.cameraX += PHYSICS.runSpeed * dt;
    this.player.update(dt, this.groundY);

    const playerWorldX = this.cameraX + this.player.x;
    const pct = Math.min(100, Math.max(0, Math.round((playerWorldX / level.stationX) * 100)));
    this.onProgress?.(pct, 'En carrera · Salta los bloques');

    // Check obstacles
    const playerBox = {
      x: playerWorldX,
      y: this.player.y,
      w: this.player.size,
      h: this.player.size
    };

    for (const obs of level.obstacles) {
      const obsBox = {
        x: obs.x,
        y: this.groundY - obs.h,
        w: obs.w,
        h: obs.h
      };

      if (checkCollision(playerBox, obsBox, 7)) {
        // Gentle checkpoint reset to start of current level
        this.particles.burst(this.player.x + 18, this.player.y + 18, '#f59e0b', 16);
        this.cameraX = 0;
        this.player.reset(120, this.groundY);
        this.onProgress?.(0, 'Reintento rápido · ¡Vuelve a saltar!');
        return;
      }
    }

    // Check arrival at safe station (player cannot die here)
    if (playerWorldX >= level.stationX) {
      this.state = 'STATION_PAUSED';
      this.player.y = this.groundY - this.player.size;
      this.player.vy = 0;
      this.player.onGround = true;
      this.particles.burst(this.player.x + 20, this.player.y + 10, '#10b981', 18);
      this.onProgress?.(100, 'Estación segura · Lectura activa');
      this.onReachStation?.(level, this.levelIndex, this.levels.length);
    }
  }

  render() {
    const level = this.currentLevel;
    this.ctx.clearRect(0, 0, this.width, this.height);

    drawTrackFloor(this.ctx, this.width, this.height, this.groundY, this.cameraX, level.accentColor);

    // Draw visible obstacles
    for (const obs of level.obstacles) {
      const screenX = obs.x - this.cameraX;
      if (screenX + obs.w < -40 || screenX > this.width + 60) continue;
      drawObstacle(this.ctx, obs, screenX, this.groundY, level);
    }

    // Draw safe station gate
    const stationScreenX = level.stationX - this.cameraX;
    if (stationScreenX < this.width + 120) {
      drawSafeStation(this.ctx, stationScreenX, this.groundY, '#10b981');
    }

    this.particles.draw(this.ctx);
    this.player.draw(this.ctx, level.accentColor);
  }
}