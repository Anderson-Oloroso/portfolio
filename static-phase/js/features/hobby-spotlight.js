import { PORTFOLIO_DATA } from '../../../shared/data/portfolio-data.js';

/**
 * Returns whether the page is currently in English mode.
 */
function isEnglish() {
  return document.documentElement.lang === 'en';
}

/**
 * Initializes the interactive hobby spotlight with real images, localized
 * stories, tags, and a keyboard/click-navigable hobby list.
 */
export function initHobbySpotlight() {
  const grid = document.getElementById('hobbies-grid');
  const dots = document.getElementById('hobby-dots-indicator');
  const bgEl = document.getElementById('hobby-spotlight-bg');
  const titleEl = document.getElementById('hobby-spotlight-title');
  const tagEl = document.getElementById('hobby-spotlight-tag');
  const storyEl = document.getElementById('hobby-spotlight-story');
  const counterEl = document.getElementById('hobby-spotlight-counter');
  const prevBtn = document.getElementById('hobby-prev-btn');
  const nextBtn = document.getElementById('hobby-next-btn');

  if (!grid || !PORTFOLIO_DATA.hobbies.length) return;

  let index = 0;
  const items = PORTFOLIO_DATA.hobbies;

  // Build hobby card list
  grid.innerHTML = items
    .map(
      (hobby, idx) => `
      <li class="hobby-card ${idx === 0 ? 'active-hobby' : ''}" data-hobby-index="${idx}" role="tab" tabindex="${idx === 0 ? '0' : '-1'}" aria-selected="${idx === 0}">
        <span>${hobby.label}</span>
      </li>
    `
    )
    .join('');

  // Build dot indicators
  if (dots) {
    dots.innerHTML = items
      .map(
        (_, idx) =>
          `<button type="button" class="hobby-dot ${idx === 0 ? 'is-active' : ''}" data-dot-index="${idx}" aria-label="Hobby ${idx + 1}"></button>`
      )
      .join('');
  }

  function updateSpotlight(hobby) {
    const en = isEnglish();

    // Background image
    if (bgEl && hobby.image) {
      bgEl.style.backgroundImage = `url('${hobby.image}')`;
    }

    if (titleEl) titleEl.textContent = en ? (hobby.labelEn || hobby.label) : hobby.label;
    if (tagEl) tagEl.textContent = en ? (hobby.tagEn || hobby.tag) : hobby.tag;
    if (storyEl) storyEl.textContent = en ? (hobby.storyEn || '') : (hobby.storyEs || '');
  }

  function selectHobby(nextIdx) {
    index = (nextIdx + items.length) % items.length;
    const current = items[index];

    if (counterEl) counterEl.textContent = `${index + 1} / ${items.length}`;

    // Update list cards
    const cards = grid.querySelectorAll('.hobby-card');
    cards.forEach((card, i) => {
      const active = i === index;
      card.classList.toggle('active-hobby', active);
      card.setAttribute('aria-selected', String(active));
      card.setAttribute('tabindex', active ? '0' : '-1');
    });

    // Update dot indicators
    dots?.querySelectorAll('.hobby-dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });

    updateSpotlight(current);
  }

  // Clicks on hobby list
  grid.addEventListener('click', (e) => {
    const card = e.target instanceof Element ? e.target.closest('.hobby-card') : null;
    if (!card) return;
    selectHobby(Number(card.getAttribute('data-hobby-index') || 0));
  });

  // Keyboard navigation on hobby list
  grid.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      selectHobby(index + 1);
      grid.querySelectorAll('.hobby-card')[index]?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      selectHobby(index - 1);
      grid.querySelectorAll('.hobby-card')[index]?.focus();
    }
  });

  // Clicks on dots
  dots?.addEventListener('click', (e) => {
    const dot = e.target instanceof Element ? e.target.closest('.hobby-dot') : null;
    if (!dot) return;
    selectHobby(Number(dot.getAttribute('data-dot-index') || 0));
  });

  // Prev / Next buttons
  prevBtn?.addEventListener('click', () => selectHobby(index - 1));
  nextBtn?.addEventListener('click', () => selectHobby(index + 1));

  // Auto-advance every 6 seconds
  let autoTimer = setInterval(() => selectHobby(index + 1), 6000);
  const spotlightEl = document.getElementById('hobby-spotlight');
  spotlightEl?.addEventListener('mouseenter', () => clearInterval(autoTimer));
  spotlightEl?.addEventListener('mouseleave', () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => selectHobby(index + 1), 6000);
  });

  // Re-render text when language changes
  window.addEventListener('portfolio:langchange', () => {
    const en = isEnglish();
    grid.querySelectorAll('.hobby-card').forEach((card, i) => {
      const h = items[i];
      card.querySelector('span').textContent = en ? (h.labelEn || h.label) : h.label;
    });
    updateSpotlight(items[index]);
  });

  // Initial render
  updateSpotlight(items[0]);
}