/**
 * Updates the top reading progress bar and HUD percentage pill based on scroll position.
 */
export function initScrollHud() {
  const bar = document.getElementById('reading-progress-bar');
  const text = document.getElementById('hud-progress-text');

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight =
      Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const pct = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));

    if (bar) {
      bar.style.width = `${pct}%`;
    }
    if (text) {
      text.textContent = `${pct}%`;
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
}