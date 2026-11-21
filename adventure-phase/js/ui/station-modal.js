import { renderTechIcon } from '../../../shared/data/portfolio-data.js';

/**
 * Controls the safe-station modal where gameplay pauses safely while reading.
 */
export function createStationModal({ onContinue }) {
  const overlay = document.getElementById('station-overlay');
  const badgeEl = document.getElementById('station-badge-text');
  const shapeTagEl = document.getElementById('station-shape-tag');
  const titleEl = document.getElementById('station-title');
  const subtitleEl = document.getElementById('station-subtitle');
  const contentEl = document.getElementById('station-content');
  const continueBtn = document.getElementById('station-continue-btn');
  const continueLabel = document.getElementById('station-continue-label');

  let isOpen = false;

  function open(level, levelIndex, totalLevels) {
    if (!overlay) return;
    isOpen = true;

    if (badgeEl) {
      badgeEl.textContent = `ZONA SEGURA · ESTACIÓN 0${levelIndex + 1} / 0${totalLevels}`;
    }
    if (shapeTagEl) {
      shapeTagEl.textContent = level.shapeLabel;
    }
    if (titleEl) {
      titleEl.textContent = level.station.title;
    }
    if (subtitleEl) {
      subtitleEl.textContent = level.station.subtitle;
    }
    if (continueLabel) {
      const isLast = levelIndex >= totalLevels - 1;
      continueLabel.textContent = isLast
        ? 'Reiniciar recorrido completo ↻'
        : 'Continuar al siguiente nivel →';
    }

    if (contentEl) {
      contentEl.innerHTML = level.station.items
        .map(
          (item) => `
          <article class="station-item">
            ${item.image ? `<div class="station-item-thumb"><img src="${item.image}" alt="${item.title}" loading="lazy"></div>` : ''}
            <h3 class="station-item-title">${item.title}</h3>
            ${item.meta ? `<div class="station-item-meta">${item.meta}</div>` : ''}
            ${item.desc ? `<p class="station-item-desc">${item.desc}</p>` : ''}
            ${
              item.chips
                ? `<div class="station-chips">${item.chips
                    .map((c) => {
                      const icon = renderTechIcon(c, '../');
                      return `<span class="station-chip">${icon}<span>${c}</span></span>`;
                    })
                    .join('')}</div>`
                : ''
            }
          </article>
        `
        )
        .join('');
    }

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    continueBtn?.focus();
  }

  function close() {
    if (!overlay || !isOpen) return;
    isOpen = false;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
  }

  continueBtn?.addEventListener('click', () => {
    close();
    onContinue();
  });

  return {
    open,
    close,
    get isOpen() {
      return isOpen;
    }
  };
}