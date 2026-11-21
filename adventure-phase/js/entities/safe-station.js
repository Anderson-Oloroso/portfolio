/**
 * Renders the safe station portal where the player stops without dying to read info.
 */
export function drawSafeStation(ctx, stationScreenX, groundY, accentColor = '#10b981') {
  const gateWidth = 56;
  const gateHeight = 128;
  const topY = groundY - gateHeight;

  ctx.save();

  // Safe zone floor pad
  ctx.fillStyle = 'rgba(16, 185, 129, 0.22)';
  ctx.fillRect(stationScreenX - 60, groundY - 4, 180, 8);

  // Portal arch
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;
  ctx.shadowColor = accentColor;
  ctx.shadowBlur = 18;
  ctx.strokeRect(stationScreenX, topY, gateWidth, gateHeight);

  // Inner energy core
  ctx.fillStyle = 'rgba(16, 185, 129, 0.14)';
  ctx.fillRect(stationScreenX + 6, topY + 6, gateWidth - 12, gateHeight - 12);

  // Label
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#10b981';
  ctx.font = '700 11px "Fira Code", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SAFE STATION', stationScreenX + gateWidth / 2, topY - 10);

  ctx.restore();
}