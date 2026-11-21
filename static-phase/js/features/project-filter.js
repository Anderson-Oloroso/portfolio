import { PORTFOLIO_DATA, renderTechIcon } from '../../../shared/data/portfolio-data.js';

function isEnglish() {
  return document.documentElement.lang === 'en';
}

function renderExperience() {
  const container = document.getElementById('experience-list');
  if (!container) return;

  const en = isEnglish();
  container.innerHTML = PORTFOLIO_DATA.experience
    .map(
      (item) => `
      <article class="experience-card">
        <h3 class="experience-company">${en ? item.companyEn : item.companyEs}</h3>
        <p class="experience-role">${en ? item.roleEn : item.roleEs}</p>
        <p class="experience-description">${en ? item.descEn : item.descEs}</p>
      </article>
    `
    )
    .join('');
}

function renderStack() {
  const container = document.getElementById('stack-section-container');
  if (!container) return;

  const en = isEnglish();
  container.innerHTML = PORTFOLIO_DATA.stackGroups
    .map(
      (group) => `
      <div class="stack-group-block">
        <h3 class="stack-group-title">${en ? group.titleEn : group.titleEs}</h3>
        <div class="badges-flex-container">
          ${group.items
            .map((tech) => {
              const iconHtml = renderTechIcon(tech, '../');
              const slug = tech.toLowerCase().replace(/[^a-z0-9]/g, '');
              return `
              <div class="tech-badge badge-${slug}">
                ${iconHtml}
                <span>${tech}</span>
              </div>
            `;
            })
            .join('')}
        </div>
      </div>
    `
    )
    .join('');

  initBadgeGlint();
}

export function initBadgeGlint() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const badges = Array.from(document.querySelectorAll('#conocimientos .tech-badge'));
  if (!badges.length) return;

  function fireGlint(badge) {
    if (!badge.isConnected) return;
    const glint = document.createElement('span');
    glint.className = 'badge-glint';

    const gx = (15 + Math.random() * 70).toFixed(1) + '%';
    const gy = (20 + Math.random() * 60).toFixed(1) + '%';
    glint.style.setProperty('--gx', gx);
    glint.style.setProperty('--gy', gy);

    badge.appendChild(glint);
    glint.addEventListener('animationend', () => glint.remove(), { once: true });
    setTimeout(() => glint.remove(), 800);
  }

  function scheduleGlint(badge) {
    const delay = 3000 + Math.random() * 4000;
    setTimeout(() => {
      if (badge.isConnected) {
        fireGlint(badge);
        scheduleGlint(badge);
      }
    }, delay);
  }

  badges.forEach((badge) => {
    const initDelay = Math.random() * 5000;
    setTimeout(() => scheduleGlint(badge), initDelay);
  });
}

function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const list =
    filter === 'all'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter(
          (p) => (p.categories && p.categories.includes(filter)) || p.category === filter
        );

  grid.innerHTML = list
    .map(
      (proj) => `
      <article class="project-card" data-category="${(proj.categories || [proj.category]).join(' ')}">
        <div class="project-thumbnail">
          <img src="${proj.image}" alt="${proj.title}" loading="lazy">
          <span class="project-badge-tag">${proj.badge}</span>
        </div>
        <div class="project-content">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-summary">${proj.summary}</p>
          <div class="project-tags">
            ${proj.tags.map((tag) => `<span class="project-pill">${tag}</span>`).join('')}
          </div>
          <div class="project-links">
            <button type="button" class="project-inspect-btn" data-project-id="${proj.id}" aria-label="Inspeccionar arquitectura de ${proj.title}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Ver Arquitectura</span>
            </button>
            <a href="${proj.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="Ver repositorio de ${proj.title}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              <span>Ver Repositorio</span>
            </a>
          </div>
        </div>
      </article>
    `
    )
    .join('');

  bindProjectInspectors();
}

function bindProjectInspectors() {
  const modal = document.getElementById('project-inspector-modal');
  const backdrop = document.getElementById('project-inspector-backdrop');
  const closeBtn = document.getElementById('project-inspector-close');
  const inspectButtons = document.querySelectorAll('.project-inspect-btn');

  if (!modal) return;

  const openInspector = (projectId) => {
    const proj = PORTFOLIO_DATA.projects.find((p) => p.id === projectId);
    if (!proj) return;

    const titleEl = document.getElementById('inspector-title');
    const badgeEl = document.getElementById('inspector-badge');
    const imgEl = document.getElementById('inspector-img');
    const overviewEl = document.getElementById('inspector-overview');
    const archEl = document.getElementById('inspector-arch');
    const tagsEl = document.getElementById('inspector-tags');
    const repoBtn = document.getElementById('inspector-repo-link');

    if (titleEl) titleEl.textContent = proj.title;
    if (badgeEl) badgeEl.textContent = proj.badge;
    if (imgEl) {
      imgEl.src = proj.image;
      imgEl.alt = proj.title;
    }
    if (overviewEl) overviewEl.textContent = proj.summary;
    if (archEl) archEl.textContent = proj.architecture || proj.summary;

    if (tagsEl) {
      tagsEl.innerHTML = proj.tags
        .map((tag) => `<span class="project-pill">${tag}</span>`)
        .join('');
    }

    if (repoBtn) {
      repoBtn.href = proj.repoUrl;
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  const closeInspector = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  inspectButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project-id');
      if (id) openInspector(id);
    });
  });

  backdrop?.addEventListener('click', closeInspector);
  closeBtn?.addEventListener('click', closeInspector);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeInspector();
    }
  });
}

export function initProjectsAndSections() {
  renderExperience();
  renderStack();
  renderProjects('all');

  const filterButtons = document.querySelectorAll('.project-filter-btn');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter') || 'all';
      filterButtons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      renderProjects(category);
    });
  });

  // Cada vez que cambias el selector de idioma, se dispara 'portfolio:langchange'
  // y aquí volvemos a dibujar Experiencia y Stack en el idioma elegido.
  window.addEventListener('portfolio:langchange', () => {
    renderExperience();
    renderStack();
  });
}