const NODES = [
  {
    id: 'node-hero',
    label: '01 · Core',
    labelEs: '01 · Núcleo',
    detail: 'REST APIs, relational modeling, Docker & automation.',
    detailEs: 'APIs REST, modelado relacional, Docker y automatización.'
  },
  {
    id: 'node-stack',
    label: '02 · SQL',
    labelEs: '02 · SQL',
    detail: 'PostgreSQL, PL/pgSQL, MySQL & schema normalization.',
    detailEs: 'PostgreSQL, PL/pgSQL, MySQL y normalización de esquemas.'
  },
  {
    id: 'node-project',
    label: '03 · APIs',
    labelEs: '03 · APIs',
    detail: 'Rate limiting, validations & reproducible containers.',
    detailEs: 'Rate limiting, validaciones y contenedores reproducibles.'
  },
  {
    id: 'node-hobby',
    label: '04 · Balance',
    labelEs: '04 · Balance',
    detail: 'Discipline, movement, reading & outdoor clarity.',
    detailEs: 'Disciplina, movimiento, lectura y claridad al aire libre.'
  },
  {
    id: 'node-terminal',
    label: '05 · Shell',
    labelEs: '05 · Terminal',
    detail: 'Interactive inspection via CLI commands.',
    detailEs: 'Inspección interactiva mediante comandos CLI.'
  }
];

/**
 * Returns whether the page is currently in English mode.
 */
function isEnglish() {
  return document.documentElement.lang === 'en';
}

/**
 * Syncs the visual `is-unlocked` class on all `.core-node` buttons in the DOM.
 * This ensures that nodes that have already been clicked remain visually marked
 * even after the modal is opened/closed multiple times.
 */
function syncNodeDOM(unlocked) {
  document.querySelectorAll('.core-node[data-node-id]').forEach((btn) => {
    const id = btn.getAttribute('data-node-id');
    btn.classList.toggle('is-unlocked', unlocked.has(id));
    btn.setAttribute('aria-pressed', String(unlocked.has(id)));
  });
}

/**
 * Initializes the 5-node core decryption modal and toast notifications.
 */
export function initDiscoveryQuest() {
  const modal = document.getElementById('quest-modal');
  const triggerBtn = document.getElementById('quest-trigger');
  const closeBtn = document.getElementById('quest-modal-close');
  const footerCloseBtn = document.getElementById('quest-footer-close');
  const backdrop = document.getElementById('quest-backdrop');
  const resetBtn = document.getElementById('quest-reset-btn');
  const nodesGrid = document.getElementById('quest-nodes-grid');
  const counterEl = document.getElementById('quest-nav-counter');
  const progressVal = document.getElementById('quest-progress-val');
  const progressFill = document.getElementById('quest-progress-fill');
  const dossierTag = document.getElementById('dossier-status-tag');
  const dossierTitle = document.getElementById('dossier-node-title');
  const dossierDesc = document.getElementById('dossier-node-desc');
  const toast = document.getElementById('quest-toast');

  if (!modal || !nodesGrid) return;

  const unlocked = new Set();

  function getLabel(node) {
    return isEnglish() ? node.label : node.labelEs;
  }

  function getDetail(node) {
    return isEnglish() ? node.detail : node.detailEs;
  }

  function renderHud() {
    const count = unlocked.size;
    const total = NODES.length;
    const pct = Math.round((count / total) * 100);
    if (counterEl) counterEl.textContent = `${count}/${total}`;
    if (progressVal) progressVal.textContent = `${pct}% (${count}/${total})`;
    if (progressFill) progressFill.style.width = `${pct}%`;

    nodesGrid.innerHTML = NODES.map((n) => {
      const isDone = unlocked.has(n.id);
      return `<button type="button" class="quest-node-chip ${isDone ? 'is-unlocked' : ''}" data-select-node="${n.id}">${getLabel(n)}</button>`;
    }).join('');

    syncNodeDOM(unlocked);
  }

  function showToast(node) {
    if (!toast) return;
    const toastTag = document.getElementById('quest-toast-tag');
    const toastTitle = document.getElementById('quest-toast-title');
    const toastLore = document.getElementById('quest-toast-lore');
    if (toastTag) toastTag.textContent = `NODO DESENCRIPTADO [${unlocked.size}/${NODES.length}]`;
    if (toastTitle) toastTitle.textContent = getLabel(node);
    if (toastLore) toastLore.textContent = getDetail(node);
    toast.classList.add('is-visible');
    setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }

  // Click on any .core-node button anywhere in the page
  document.addEventListener('click', (e) => {
    const nodeBtn = e.target instanceof Element ? e.target.closest('.core-node[data-node-id]') : null;
    if (!nodeBtn) return;
    const id = nodeBtn.getAttribute('data-node-id');
    const found = NODES.find((n) => n.id === id);
    if (!found) return;

    const wasNew = !unlocked.has(id);
    unlocked.add(id);
    renderHud();
    if (wasNew) showToast(found);
  });

  // Click on a chip inside the quest modal dossier panel
  nodesGrid.addEventListener('click', (e) => {
    const chip = e.target instanceof Element ? e.target.closest('[data-select-node]') : null;
    if (!chip) return;
    const id = chip.getAttribute('data-select-node');
    const found = NODES.find((n) => n.id === id);
    if (!found) return;

    const isDone = unlocked.has(id);
    if (dossierTag) dossierTag.textContent = isDone ? '[DECRYPTED]' : '[LOCKED]';
    if (dossierTitle) dossierTitle.textContent = getLabel(found);
    if (dossierDesc) {
      dossierDesc.textContent = isDone
        ? getDetail(found)
        : (isEnglish()
            ? 'Locate and click this node in the portfolio to decrypt.'
            : 'Encuentra y haz clic en este nodo en el portafolio para desencriptarlo.');
    }
  });

  const openModal = () => {
    renderHud();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    // Reset dossier to initial hint state
    if (dossierTag) dossierTag.textContent = '[SELECCIONA UN NODO]';
    if (dossierTitle) dossierTitle.textContent = 'Detalles del Fragmento';
    if (dossierDesc) dossierDesc.textContent = 'Haz clic en cualquier nodo para inspeccionar su estado.';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  triggerBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  footerCloseBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  // Keyboard trap: Escape closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  resetBtn?.addEventListener('click', () => {
    unlocked.clear();
    renderHud();
    if (dossierTag) dossierTag.textContent = '[SELECCIONA UN NODO]';
    if (dossierTitle) dossierTitle.textContent = 'Detalles del Fragmento';
    if (dossierDesc) dossierDesc.textContent = 'Haz clic en cualquier nodo para inspeccionar su estado.';
  });

  // Re-render HUD labels when language changes
  window.addEventListener('portfolio:langchange', () => renderHud());

  renderHud();
}