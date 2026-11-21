/**
 * Ambient interactive canvas:
 * - Constellation of electric quantum dots and interconnected nodes
 * - Adapts to light / dark theme dynamically
 * - Mouse attraction: pulls dots smoothly toward pointer within radius
 * - Spider web / lightning connection lines tethered directly to the cursor
 * - Data packets pulsing and travelling along active network edges
 * - Automatically pauses when tab is hidden or prefers-reduced-motion is active
 */

export function initAmbientCanvas(canvasElement = null) {
  const canvas = canvasElement || document.getElementById('ambient-canvas') || document.getElementById('hub-canvas');
  if (!canvas) return () => {};

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    canvas.style.display = 'none';
    return () => {};
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return () => {};

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let animationFrameId = null;
  let isVisible = true;

  const isLight = () => document.documentElement.getAttribute('data-theme') === 'light';

  // Scale particle density based on screen dimensions
  const count = Math.min(65, Math.max(26, Math.floor(width / 30)));
  const particles = [];
  const packets = [];
  let sincePacket = 0;
  const mouse = { x: null, y: null, radius: 180 };

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.6 + 0.9;
      this.baseAlpha = Math.random() * 0.4 + 0.28;
    }
    update() {
      // Mouse interaction: physical pull towards the pointer ("arañita" / attraction)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius && dist > 4) {
          const pull = (1 - dist / mouse.radius) * 0.04;
          this.vx += (dx / dist) * pull;
          this.vy += (dy / dist) * pull;
        }
      }

      this.vx *= 0.985;
      this.vy *= 0.985;
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) {
        this.vx *= -1;
        this.x = Math.max(0, Math.min(width, this.x));
      }
      if (this.y < 0 || this.y > height) {
        this.vy *= -1;
        this.y = Math.max(0, Math.min(height, this.y));
      }
    }
    draw() {
      const light = isLight();
      const color = light ? '59, 130, 246' : '6, 182, 212';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${this.baseAlpha * (light ? 0.5 : 0.75)})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  const handleResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  const handleMouseMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  const handleMouseLeave = () => {
    mouse.x = null;
    mouse.y = null;
  };

  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('pointermove', handleMouseMove, { passive: true });
  window.addEventListener('pointerleave', handleMouseLeave, { passive: true });

  const onVisibilityChange = () => {
    isVisible = document.visibilityState === 'visible';
    if (isVisible && !animationFrameId) {
      loop();
    }
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  const connectionDist = 130;

  function loop() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const light = isLight();
    const lineColor = light ? '59, 130, 246' : '56, 189, 248';
    const activeEdges = [];

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // Inter-particle network lines
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * (light ? 0.12 : 0.2);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${lineColor}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
          activeEdges.push([p1, p2]);
        }
      }
    }

    // Direct cursor attraction lines ("arañita" / spider web attraction to mouse)
    if (mouse.x !== null && mouse.y !== null) {
      const spiderColor = light ? '59, 130, 246' : '6, 182, 212';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * (light ? 0.48 : 0.72);
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(${spiderColor}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1.25;
          ctx.stroke();
        }
      }
    }

    // Generate traveling electric data packets between nodes
    sincePacket++;
    if (sincePacket > 22 && packets.length < 7 && activeEdges.length > 0) {
      sincePacket = 0;
      const [from, to] = activeEdges[Math.floor(Math.random() * activeEdges.length)];
      packets.push({ from, to, t: 0 });
    }

    // Draw packets in transit
    for (let i = packets.length - 1; i >= 0; i--) {
      const pkt = packets[i];
      pkt.t += 0.024;
      if (pkt.t >= 1) {
        packets.splice(i, 1);
        continue;
      }
      const px = pkt.from.x + (pkt.to.x - pkt.from.x) * pkt.t;
      const py = pkt.from.y + (pkt.to.y - pkt.from.y) * pkt.t;
      ctx.beginPath();
      ctx.arc(px, py, 2.3, 0, Math.PI * 2);
      ctx.fillStyle = light ? 'rgba(37, 99, 235, 0.92)' : 'rgba(16, 185, 129, 0.95)';
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(loop);
  }

  loop();

  return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('pointermove', handleMouseMove);
    window.removeEventListener('pointerleave', handleMouseLeave);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  };
}
