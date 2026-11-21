const ACCENT_COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6'];

/**
 * Renders an animated grid and subtle floating geometric blocks on the hub canvas.
 * @param {HTMLCanvasElement | null} canvas
 * @returns {() => void} Cleanup function
 */
export function initHubCanvas(canvas) {
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = 0;
  let height = 0;
  let rafId = 0;
  let lastTime = performance.now();

  const blocks = Array.from({ length: 14 }, (_, idx) => ({
    x: Math.random() * 1200,
    y: Math.random() * 800,
    size: 14 + (idx % 4) * 7,
    vx: 10 + (idx % 3) * 6,
    vy: ((idx % 2 === 0 ? 1 : -1) * (6 + (idx % 4) * 3)),
    rot: (idx * 0.4) % (Math.PI * 2),
    vRot: (idx % 2 === 0 ? 0.35 : -0.35),
    color: ACCENT_COLORS[idx % ACCENT_COLORS.length],
    alpha: 0.14 + (idx % 3) * 0.05
  }));

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth || window.innerWidth;
    height = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawGrid(styles) {
    const step = 48;
    ctx.strokeStyle = styles.getPropertyValue('--grid-line').trim() || 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1;

    ctx.beginPath();
    for (let x = 0; x <= width; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }

  function render(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    const styles = getComputedStyle(document.documentElement);
    ctx.clearRect(0, 0, width, height);
    drawGrid(styles);

    for (const b of blocks) {
      if (!reducedMotion) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.rot += b.vRot * dt;

        if (b.x > width + b.size) b.x = -b.size;
        if (b.y > height + b.size) b.y = -b.size;
        if (b.y < -b.size) b.y = height + b.size;
      }

      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.globalAlpha = b.alpha;
      ctx.strokeStyle = b.color;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-b.size / 2, -b.size / 2, b.size, b.size);
      ctx.restore();
    }

    if (!reducedMotion) {
      rafId = requestAnimationFrame(render);
    }
  }

  resize();
  window.addEventListener('resize', resize);
  render(lastTime);

  return () => {
    window.removeEventListener('resize', resize);
    cancelAnimationFrame(rafId);
  };
}