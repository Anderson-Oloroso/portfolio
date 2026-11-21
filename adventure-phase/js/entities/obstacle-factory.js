/**
 * Draws level obstacles according to the station theme:
 * - 'tech-cube': Glowing technology blocks with name & floating score
 * - 'rectangle': Solid monolithic blocks
 * - 'stepped-rect': Stepped architectural modules
 * - 'triangle': Neon spikes
 * - 'cloud': Soft floating cloud platforms
 */
export function drawObstacle(ctx, obs, screenX, groundY, level) {
  const topY = groundY - obs.h;
  const color = obs.color || level.accentColor || '#3b82f6';

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;

  if (obs.shape === 'triangle') {
    ctx.fillStyle = 'rgba(17, 20, 29, 0.92)';
    ctx.beginPath();
    ctx.moveTo(screenX, groundY);
    ctx.lineTo(screenX + obs.w / 2, topY);
    ctx.lineTo(screenX + obs.w, groundY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (obs.shape === 'cloud') {
    ctx.fillStyle = 'rgba(23, 27, 38, 0.92)';
    const r = obs.h / 2;
    ctx.beginPath();
    ctx.roundRect(screenX, topY + 6, obs.w, obs.h - 6, r);
    ctx.fill();
    ctx.stroke();
  } else if (obs.shape === 'stepped-rect') {
    ctx.fillStyle = 'rgba(17, 20, 29, 0.92)';
    ctx.fillRect(screenX, topY + 12, obs.w * 0.45, obs.h - 12);
    ctx.strokeRect(screenX, topY + 12, obs.w * 0.45, obs.h - 12);
    ctx.fillRect(screenX + obs.w * 0.45, topY, obs.w * 0.55, obs.h);
    ctx.strokeRect(screenX + obs.w * 0.45, topY, obs.w * 0.55, obs.h);
  } else {
    // 'tech-cube' and 'rectangle'
    ctx.fillStyle = 'rgba(17, 20, 29, 0.94)';
    ctx.fillRect(screenX, topY, obs.w, obs.h);
    ctx.strokeRect(screenX, topY, obs.w, obs.h);

    // Inner bevel frame
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    ctx.lineWidth = 1;
    ctx.strokeRect(screenX + 5, topY + 5, obs.w - 10, obs.h - 10);
  }

  // Floating badge & points above obstacle
  ctx.shadowBlur = 0;
  ctx.textAlign = 'center';
  ctx.font = '700 11px "Fira Code", monospace';
  ctx.fillStyle = '#f3f4f6';
  ctx.fillText(obs.label, screenX + obs.w / 2, topY - 18);

  if (obs.points) {
    ctx.font = '700 10px "Fira Code", monospace';
    ctx.fillStyle = color;
    ctx.fillText(obs.points, screenX + obs.w / 2, topY - 6);
  }

  ctx.restore();
}