/**
 * Renders level obstacles & platforms with diffused bases so ground/platform bases
 * blend softly into the stage while preserving crisp top/foreground clarity.
 */
export function drawObstacle(ctx, obs, screenX, groundY, level, timeSec = 0) {
  const yOffset = obs.yOffset || 0;
  const bottomY = groundY - yOffset;
  const topY = bottomY - obs.h;
  const color = obs.color || level.accentColor || '#3b82f6';
  const secondary = level.secondaryColor || '#06b6d4';

  ctx.save();

  // Diffused base aura under every obstacle/platform
  ctx.save();
  ctx.filter = 'blur(8px)';
  ctx.globalAlpha = 0.36;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(screenX - 4, bottomY - 6, obs.w + 8, 12, 6);
  ctx.fill();
  ctx.restore();

  if (obs.shape === 'jump-orb') {
    const cx = screenX + obs.w / 2;
    const cy = topY + obs.h / 2;
    const pulse = 1 + Math.sin(timeSec * 8) * 0.14;
    const radius = (obs.w / 2) * pulse;

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(245, 158, 11, 0.35)';
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.58, 0, Math.PI * 2);
    ctx.fill();
  } else if (obs.shape === 'neon-saw') {
    const cx = screenX + obs.w / 2;
    const cy = topY + obs.h / 2;
    const outerR = obs.w / 2;
    const innerR = outerR * 0.66;
    const teeth = 10;

    ctx.translate(cx, cy);
    ctx.rotate(timeSec * 5.2);

    ctx.fillStyle = 'rgba(17, 20, 29, 0.88)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;

    ctx.beginPath();
    for (let i = 0; i < teeth * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (i * Math.PI) / teeth;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = secondary;
    ctx.beginPath();
    ctx.arc(0, 0, innerR * 0.45, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  } else if (obs.shape === 'crystal-spike') {
    ctx.fillStyle = 'rgba(17, 20, 29, 0.88)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.2;
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;

    ctx.beginPath();
    ctx.moveTo(screenX, bottomY);
    ctx.lineTo(screenX + obs.w / 2, topY);
    ctx.lineTo(screenX + obs.w, bottomY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(screenX + obs.w * 0.28, bottomY - 4);
    ctx.lineTo(screenX + obs.w / 2, topY + 10);
    ctx.lineTo(screenX + obs.w * 0.72, bottomY - 4);
    ctx.stroke();
  } else if (obs.shape === 'cloud') {
    ctx.fillStyle = 'rgba(23, 27, 38, 0.86)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;

    const r = obs.h * 0.46;
    ctx.beginPath();
    ctx.roundRect(screenX, topY + 8, obs.w, obs.h - 8, r);
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(screenX + obs.w * 0.32, topY + 10, r * 0.65, Math.PI, 0);
    ctx.arc(screenX + obs.w * 0.64, topY + 8, r * 0.78, Math.PI, 0);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = secondary;
    ctx.fillRect(screenX + 12, topY + 7, obs.w - 24, 3);
  } else if (obs.shape === 'data-bridge') {
    // Diffused lower base edge on suspended platform
    ctx.save();
    ctx.filter = 'blur(5px)';
    ctx.globalAlpha = 0.42;
    ctx.fillStyle = color;
    ctx.fillRect(screenX, bottomY - 5, obs.w, 6);
    ctx.restore();

    ctx.fillStyle = 'rgba(17, 20, 29, 0.85)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.fillRect(screenX, topY, obs.w, obs.h);
    ctx.strokeRect(screenX, topY, obs.w, obs.h);

    ctx.fillStyle = secondary;
    ctx.fillRect(screenX + 2, topY, obs.w - 4, 4);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 1;
    for (let tx = screenX + 12; tx < screenX + obs.w - 12; tx += 22) {
      ctx.beginPath();
      ctx.moveTo(tx, topY + 6);
      ctx.lineTo(tx + 12, bottomY - 4);
      ctx.stroke();
    }
  } else if (obs.shape === 'server-rack') {
    ctx.fillStyle = 'rgba(17, 20, 29, 0.88)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.fillRect(screenX, topY, obs.w, obs.h);
    ctx.strokeRect(screenX, topY, obs.w, obs.h);

    const rows = Math.max(2, Math.floor(obs.h / 16));
    for (let r = 0; r < rows; r++) {
      const ry = topY + 7 + r * 14;
      if (ry + 8 > bottomY) break;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.strokeRect(screenX + 6, ry, obs.w - 12, 9);

      const blink = Math.sin(timeSec * 6 + r) > 0;
      ctx.fillStyle = blink ? '#10b981' : secondary;
      ctx.fillRect(screenX + 10, ry + 3, 4, 3);
    }
  } else if (obs.shape === 'stepped-rect') {
    ctx.fillStyle = 'rgba(17, 20, 29, 0.88)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    const leftW = obs.w * 0.44;
    const rightW = obs.w * 0.56;
    ctx.fillRect(screenX, topY + 14, leftW, obs.h - 14);
    ctx.strokeRect(screenX, topY + 14, leftW, obs.h - 14);

    ctx.fillRect(screenX + leftW, topY, rightW, obs.h);
    ctx.strokeRect(screenX + leftW, topY, rightW, obs.h);

    ctx.fillStyle = secondary;
    ctx.fillRect(screenX + leftW + 2, topY, rightW - 4, 3);
  } else {
    ctx.fillStyle = 'rgba(17, 20, 29, 0.88)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.4;
    ctx.fillRect(screenX, topY, obs.w, obs.h);
    ctx.strokeRect(screenX, topY, obs.w, obs.h);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(screenX + 5, topY + 5, obs.w - 10, obs.h - 10);

    if (obs.iconText) {
      ctx.fillStyle = color;
      ctx.font = '800 13px "Fira Code", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(obs.iconText, screenX + obs.w / 2, topY + obs.h / 2 + 1);
      ctx.textBaseline = 'alphabetic';
    }
  }

  if (obs.label) {
    ctx.textAlign = 'center';
    ctx.font = '700 11px "Fira Code", monospace';
    ctx.fillStyle = '#f3f4f6';
    ctx.fillText(obs.label, screenX + obs.w / 2, topY - 16);
  }

  if (obs.points) {
    ctx.textAlign = 'center';
    ctx.font = '700 10px "Fira Code", monospace';
    ctx.fillStyle = color;
    ctx.fillText(obs.points, screenX + obs.w / 2, topY - 5);
  }

  ctx.restore();
}