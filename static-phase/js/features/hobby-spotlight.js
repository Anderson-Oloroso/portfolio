import { PORTFOLIO_DATA } from '../../../shared/data/portfolio-data.js';

/**
 * Initializes the interactive hobby spotlight and selector list.
 */
export function initHobbySpotlight() {
  const grid = document.getElementById('hobbies-grid');
  const dots = document.getElementById('hobby-dots-indicator');
  const titleEl = document.getElementById('hobby-spotlight-title');
  const tagEl = document.getElementById('hobby-spotlight-tag');
  const counterEl = document.getElementById('hobby-spotlight-counter');
  const prevBtn = document.getElementById('hobby-prev-btn');
  const nextBtn = document.getElementById('hobby-next-btn');

  if (!grid || !PORTFOLIO_DATA.hobbies.length) return;

  let index = 0;
  const items = PORTFOLIO_DATA.hobbies;

  grid.innerHTML = items
    .map(
      (hobby, idx) => `
      <li class="hobby-card ${idx === 0 ? 'active-hobby' : ''}" data-hobby-index="${idx}" role="tab" tabindex="0" aria-selected="${idx === 0}">
        <span>${hobby.label}</span>
      </li>
    `
    )
    .join('');

  if (dots) {
    dots.innerHTML = items
      .map(
        (_, idx) =>
          `<button type="button" class="hobby-dot ${idx === 0 ? 'is-active' : ''}" data-dot-index="${idx}" aria-label="Hobby ${idx + 1}"></button>`
      )
      .join('');
  }

  function selectHobby(nextIdx) {
    index = (nextIdx + items.length) % items.length;
    const current = items[index];

    if (titleEl) titleEl.textContent = current.label;
    if (tagEl) tagEl.textContent = current.tag;
    if (counterEl) counterEl.textContent = `${index + 1} / ${items.length}`;

    grid.querySelectorAll('.hobby-card').forEach((card, i) => {
      const active = i === index;
      card.classList.toggle('active-hobby', active);
      card.setAttribute('aria-selected', String(active));
    });

    dots?.querySelectorAll('.hobby-dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });
  }

  grid.addEventListener('click', (e) => {
    const card = e.target instanceof Element ? e.target.closest('.hobby-card') : null;
    if (!card) return;
    selectHobby(Number(card.getAttribute('data-hobby-index') || 0));
  });

  dots?.addEventListener('click', (e) => {
    const dot = e.target instanceof Element ? e.target.closest('.hobby-dot') : null;
    if (!dot) return;
    selectHobby(Number(dot.getAttribute('data-dot-index') || 0));
  });

  prevBtn?.addEventListener('click', () => selectHobby(index - 1));
  nextBtn?.addEventListener('click', () => selectHobby(index + 1));
}