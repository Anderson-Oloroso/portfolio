const NODES = [
  { id: 'node-hero', label: '01 · Core', detail: 'REST APIs, relational modeling, Docker & automation.' },
  { id: 'node-stack', label: '02 · SQL', detail: 'PostgreSQL, PL/pgSQL, MySQL & schema normalization.' },
  { id: 'node-project', label: '03 · APIs', detail: 'Rate limiting, validations & reproducible containers.' },
  { id: 'node-hobby', label: '04 · Balance', detail: 'Discipline, movement, reading & outdoor clarity.' },
  { id: 'node-terminal', label: '05 · Shell', detail: 'Interactive inspection via CLI commands.' }
];

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

  function renderHud() {
    const count = unlocked.size;
    const total = NODES.length;
    const pct = Math.round((count / total) * 100);
    if (counterEl) counterEl.textContent = `${count}/${total}`;
    if (progressVal) progressVal.textContent = `${pct}% (${count}/${total})`;
    if (progressFill) progressFill.style.width = `${pct}%`;

    nodesGrid.innerHTML = NODES.map((n) => {
      const isDone = unlocked.has(n.id);
      return `<button type="button" class="quest-node-chip ${isDone ? 'is-unlocked' : ''}" data-select-node="${n.id}">${n.label}</button>`;
    }).join('');
  }

  function showToast(node) {
    if (!toast) return;
    document.getElementById('quest-toast-tag').textContent = `NODO DESENCRIPTADO [${unlocked.size}/${NODES.length}]`;
    document.getElementById('quest-toast-title').textContent = node.label;
    document.getElementById('quest-toast-lore').textContent = node.detail;
    toast.classList.add('is-visible');
    setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }

  document.addEventListener('click', (e) => {
    const nodeBtn = e.target instanceof Element ? e.target.closest('.core-node') : null;
    if (!nodeBtn) return;
    const id = nodeBtn.getAttribute('data-node-id');
    const found = NODES.find((n) => n.id === id);
    if (!found) return;

    unlocked.add(id);
    renderHud();
    showToast(found);
  });

  nodesGrid.addEventListener('click', (e) => {
    const chip = e.target instanceof Element ? e.target.closest('[data-select-node]') : null;
    if (!chip) return;
    const id = chip.getAttribute('data-select-node');
    const found = NODES.find((n) => n.id === id);
    if (!found) return;

    const isDone = unlocked.has(id);
    if (dossierTag) dossierTag.textContent = isDone ? '[DECRYPTED]' : '[LOCKED]';
    if (dossierTitle) dossierTitle.textContent = found.label;
    if (dossierDesc) dossierDesc.textContent = isDone ? found.detail : 'Locate and click this node in the portfolio to decrypt.';
  });

  const openModal = () => {
    renderHud();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  triggerBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  footerCloseBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  resetBtn?.addEventListener('click', () => {
    unlocked.clear();
    renderHud();
  });

  renderHud();
}