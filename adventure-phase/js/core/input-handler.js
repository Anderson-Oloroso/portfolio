/**
 * Binds keyboard, pointer/canvas tap, and on-screen jump button controls.
 */
export function createInputHandler({ canvas, jumpBtn, onJump, onContinue }) {
  const triggerJump = (e) => {
    if (e) e.preventDefault();
    onJump();
  };

  const onKeyDown = (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
      e.preventDefault();
      onJump();
    } else if (e.code === 'Enter') {
      onContinue();
    }
  };

  window.addEventListener('keydown', onKeyDown);
  jumpBtn?.addEventListener('pointerdown', triggerJump);
  canvas?.addEventListener('pointerdown', triggerJump);

  return () => {
    window.removeEventListener('keydown', onKeyDown);
    jumpBtn?.removeEventListener('pointerdown', triggerJump);
    canvas?.removeEventListener('pointerdown', triggerJump);
  };
}