export const PHYSICS = {
  gravity: 2550,
  jumpVelocity: -810,
  orbVelocity: -840,
  baseRunSpeed: 425,
  playerSize: 38,
  groundPadding: 92
};

/**
 * Axis-aligned bounding box overlap check with slight forgiveness margin.
 */
export function checkCollision(a, b, forgiveness = 6) {
  return (
    a.x + forgiveness < b.x + b.w - forgiveness &&
    a.x + a.w - forgiveness > b.x + forgiveness &&
    a.y + forgiveness < b.y + b.h - forgiveness &&
    a.y + a.h - forgiveness > b.y + forgiveness
  );
}