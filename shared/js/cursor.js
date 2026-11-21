/**
 * Custom cursor module:
 * Exact dot + inertial ring + ambient glow.
 * Only activated on devices with fine pointer (mouse/trackpad) and without reduced motion.
 * The requestAnimationFrame loop stops when everything is at rest.
 */

const INTERACTIVE = 'a, button, [role="button"], summary, [data-cursor="link"], .btn, .project-link-btn, .filter-btn, .project-filter-btn, .inspect-btn, .inspector-close-btn, .terminal-dot, .cli-easter-btn, .hub-card, .adv-hud-btn, .adv-action-btn, .nav-link, .hud-pill, .quest-trigger-btn, .terminal-trigger-btn, .theme-toggle, .hub-theme-btn';
const CARD = '[data-spotlight], [data-tilt], .hobby-card, .project-card, .profile-card, .tilt-card, .life-spotlight-card, .tech-badge, .hub-card, .spec-box, .experience-card, .station-card';
const NATIVE = 'select, input, textarea';

export function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function hasFinePointer() {
  return window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export function lerp(from, to, amount) {
  return from + (to - from) * amount;
}

export function initCursor() {
  if (prefersReducedMotion() || !hasFinePointer()) return;

  const root = document.documentElement;
  const make = (className) => {
    const el = document.createElement('div');
    el.className = className;
    el.setAttribute('aria-hidden', 'true');
    return el;
  };

  const glow = make('cursor-glow');
  const ring = make('cursor-ring');
  const dot = make('cursor-dot');
  document.body.append(glow, ring, dot);
  root.classList.add('has-custom-cursor');

  let targetX = 0;
  let targetY = 0;
  let ringX = 0;
  let ringY = 0;
  let glowX = 0;
  let glowY = 0;
  let frame = 0;
  let seen = false;

  const render = () => {
    frame = 0;
    ringX = lerp(ringX, targetX, 0.2);
    ringY = lerp(ringY, targetY, 0.2);
    glowX = lerp(glowX, targetX, 0.08);
    glowY = lerp(glowY, targetY, 0.08);

    dot.style.translate = `${targetX}px ${targetY}px`;
    ring.style.translate = `${ringX.toFixed(2)}px ${ringY.toFixed(2)}px`;
    glow.style.translate = `${glowX.toFixed(2)}px ${glowY.toFixed(2)}px`;

    const settled =
      Math.abs(targetX - ringX) < 0.1 && Math.abs(targetY - ringY) < 0.1 &&
      Math.abs(targetX - glowX) < 0.1 && Math.abs(targetY - glowY) < 0.1;
    if (!settled) frame = requestAnimationFrame(render);
  };

  const request = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };

  document.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (!seen) {
      seen = true;
      ringX = glowX = targetX;
      ringY = glowY = targetY;
      root.classList.add('cursor-visible');
    }
    request();
  }, { passive: true });

  document.addEventListener('pointerover', (event) => {
    if (!(event.target instanceof Element)) return;
    const isNative = Boolean(event.target.closest(NATIVE));
    const isLink = !isNative && Boolean(event.target.closest(INTERACTIVE));
    const isCard = !isNative && !isLink && Boolean(event.target.closest(CARD));

    root.classList.toggle('cursor-native', isNative);
    ring.classList.toggle('is-link', isLink);
    ring.classList.toggle('is-card', isCard);
  }, { passive: true });

  document.addEventListener('pointerdown', () => ring.classList.add('is-down'));
  document.addEventListener('pointerup', () => ring.classList.remove('is-down'));

  root.addEventListener('mouseleave', () => root.classList.remove('cursor-visible'));
  root.addEventListener('mouseenter', () => {
    if (seen) root.classList.add('cursor-visible');
  });
}
