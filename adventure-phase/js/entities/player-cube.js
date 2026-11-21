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

  jump() {
    if (!this.onGround) return false;
    this.vy = PHYSICS.jumpVelocity;
    this.onGround = false;
    return true;
  }

  update(dt, groundY) {
    this.vy += PHYSICS.gravity * dt;
    this.y += this.vy * dt;

    if (this.y >= groundY - this.size) {
      this.y = groundY - this.size;
      this.vy = 0;
      this.onGround = true;
      // Snap cleanly to nearest 90-degree angle upon landing
      const quarter = Math.PI / 2;
      this.rotation = Math.round(this.rotation / quarter) * quarter;
    } else {
      this.rotation += 5.4 * dt;
    }

    this.trail.push({ x: this.x + this.size / 2, y: this.y + this.size / 2, alpha: 0.55 });
    if (this.trail.length > 14) this.trail.shift();
    for (const t of this.trail) {
      t.x -= PHYSICS.runSpeed * dt * 0.45;
      t.alpha *= 0.9;
    }
  }

  draw(ctx, accentColor = '#06b6d4') {
    // Neon trail
    for (const t of this.trail) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, t.alpha);
      ctx.fillStyle = accentColor;
      ctx.fillRect(t.x - 6, t.y - 6, 12, 12);
      ctx.restore();
    }

    ctx.save();
    ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
    ctx.rotate(this.rotation);

    // Outer cube body
    ctx.fillStyle = '#11141d';
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 14;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);

    // Geometry Dash inspired inner face
    ctx.shadowBlur = 0;
    ctx.fillStyle = accentColor;
    ctx.fillRect(-9, -7, 6, 6);
    ctx.fillRect(3, -7, 6, 6);
    ctx.fillRect(-8, 4, 16, 4);

    ctx.restore();
  }
}