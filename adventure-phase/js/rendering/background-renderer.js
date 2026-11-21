/**
 * Draws a soft, blurred base track and subtle perspective grid so bases feel diffused
 * and grounded without harsh visual clutter.
 */
export function drawTrackFloor(ctx, width, height, groundY, cameraX, accentColor, secondaryColor = '#06b6d4') {
  ctx.save();

  // Soft diffused glow band along the base line
  ctx.filter = 'blur(10px)';
  const bandGrad = ctx.createLinearGradient(0, groundY - 12, 0, Math.min(height, groundY + 48));
  bandGrad.addColorStop(0, accentColor);
  bandGrad.addColorStop(0.45, 'rgba(17, 20, 29, 0.55)');
  bandGrad.addColorStop(1, 'rgba(11, 13, 19, 0.15)');

  ctx.globalAlpha = 0.42;
  ctx.fillStyle = bandGrad;
  ctx.fillRect(-16, groundY - 8, width + 32, Math.max(40, height - groundY + 16));
  ctx.filter = 'none';

  // Diffused base fill
  const baseGrad = ctx.createLinearGradient(0, groundY, 0, height);
  baseGrad.addColorStop(0, 'rgba(17, 20, 29, 0.52)');
  baseGrad.addColorStop(1, 'rgba(11, 13, 19, 0.88)');
  ctx.globalAlpha = 0.85;
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, groundY, width, height - groundY);

  // Soft horizon beam
  ctx.globalAlpha = 0.65;
  ctx.strokeStyle = secondaryColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(width, groundY);
  ctx.stroke();

  // Faded scrolling base tiles
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 1;
  const tile = 52;
  const offset = -(cameraX % tile);

  for (let x = offset; x < width + tile; x += tile) {
    ctx.beginPath();
    ctx.moveTo(x, groundY);
    ctx.lineTo(x - 14, height);
    ctx.stroke();
  }

  for (let y = groundY + 24; y < height; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.restore();
}