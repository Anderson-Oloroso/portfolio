export const PHYSICS = {
  baseGravity: 2320,
  baseJumpVelocity: -790,
  baseOrbVelocity: -830,
  baseRunSpeed: 365,
  playerSize: 38,
  groundPadding: 92
};

export function checkCollision(a, b, forgiveness = 8) {
  return (
    a.x + forgiveness < b.x + b.w - forgiveness &&
    a.x + a.w - forgiveness > b.x + forgiveness &&
    a.y + forgiveness < b.y + b.h - forgiveness &&
    a.y + a.h - forgiveness > b.y + forgiveness
  );
}