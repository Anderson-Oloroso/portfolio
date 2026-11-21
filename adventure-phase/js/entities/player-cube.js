import { PHYSICS } from '../core/physics.js';

export class PlayerCube {
  constructor() {
    this.size = PHYSICS.playerSize;
    this.trail = [];
    this.reset(120, 300);
  }

  reset(x, groundY) {
    this.x = x;
    this.y = groundY - this.size;
    this.vy = 0;
    this.onGround = true;
    this.rotation = 0;
    this.trail = [];
  }

  jump(velocity = PHYSICS.baseJumpVelocity) {
    if (!this.onGround) return false;
    this.vy = velocity;
    this.onGround = false;
    return true;
  }

  update(dt, groundY, gravity = PHYSICS.baseGravity) {
    this.vy += gravity * dt;
    this.y += this.vy * dt;

    if (this.y >= groundY - this.size) {
      this.y = groundY - this.size;
      this.vy = 0;
      this.onGround = true;
      const quarter = Math.PI / 2;
      this.rotation = Math.round(this.rotation / quarter) * quarter;
    } else {
      this.rotation += 5.4 * dt;
    }

    this.trail.push({ x: this.x + this.size / 2, y: this.y + this.size / 2, alpha: 0.55 });
    if (this.trail.length > 14) this.trail.shift();
    for (const t of this.trail) {
      t.x -= PHYSICS.baseRunSpeed * dt * 0.45;
      t.alpha *= 0.9;
    }
  }

  draw(ctx, level = {}) {
    const primary = level.accentColor || '#06b6d4';
    const secondary = level.secondaryColor || '#3b82f6';
    const style = level.cubeStyle || 'visor';
    const half = this.size / 2;

    // Trail
    for (const t of this.trail) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, t.alpha);
      ctx.fillStyle = primary;
      ctx.fillRect(t.x - 6, t.y - 6, 12, 12);
      ctx.restore();
    }

    ctx.save();
    ctx.translate(this.x + half, this.y + half);
    ctx.rotate(this.rotation);

    // Outer shell
    ctx.fillStyle = '#0f131c';
    ctx.strokeStyle = primary;
    ctx.lineWidth = 2.6;
    ctx.shadowColor = primary;
    ctx.shadowBlur = 15;
    ctx.fillRect(-half, -half, this.size, this.size);
    ctx.strokeRect(-half, -half, this.size, this.size);

    ctx.shadowBlur = 0;

    if (style === 'visor') {
      // Stage 1: Cyber visor bar + twin eyes
      ctx.fillStyle = secondary;
      ctx.fillRect(-12, -8, 24, 7);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-8, -6, 4, 3);
      ctx.fillRect(4, -6, 4, 3);
      ctx.fillStyle = primary;
      ctx.fillRect(-8, 5, 16, 4);
    } else if (style === 'ring') {
      // Stage 2: Concentric energy ring
      ctx.strokeStyle = secondary;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = primary;
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (style === 'circuit') {
      // Stage 3: Tech circuit nodes & corners
      ctx.strokeStyle = secondary;
      ctx.lineWidth = 1.6;
      ctx.strokeRect(-11, -11, 22, 22);
      ctx.fillStyle = secondary;
      ctx.fillRect(-13, -13, 5, 5);
      ctx.fillRect(8, -13, 5, 5);
      ctx.fillRect(-13, 8, 5, 5);
      ctx.fillRect(8, 8, 5, 5);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-4, -4, 8, 8);
    } else if (style === 'diamond') {
      // Stage 4: Angled diamond core
      ctx.strokeStyle = secondary;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(12, 0);
      ctx.lineTo(0, 12);
      ctx.lineTo(-12, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = primary;
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Stage 5: Nova cross + core
      ctx.strokeStyle = secondary;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(10, 0);
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 10);
      ctx.stroke();
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}