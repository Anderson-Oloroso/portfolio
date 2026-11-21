/**
 * Draws the parallax grid floor and horizon line matching the active theme.
 */
export function drawTrackFloor(ctx, width, height, groundY, cameraX, accentColor) {
  // Ground fill
  ctx.save();
  ctx.fillStyle = 'rgba(11, 13, 19, 0.86)';
  ctx.fillRect(0, groundY, width, height - groundY);

  // Neon horizon line
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2.5;
  ctx.shadowColor = accentColor;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(width, groundY);
  ctx.stroke();

  // Scrolling floor tiles
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  const tile = 44;
  const offset = -(cameraX % tile);

  for (let x = offset; x < width; x += tile) {
    ctx.strokeRect(x, groundY + 4, tile, tile);
  }

  ctx.restore();
}