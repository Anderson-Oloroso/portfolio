import { PORTFOLIO_DATA } from '../../../shared/data/portfolio-data.js';

/**
 * Renders experience, stack groups, project cards, filter toolbar, and architecture modal.
 */
export function initProjectsAndSections() {
  renderExperience();
  renderStack();
  renderProjects(PORTFOLIO_DATA.projects);
  bindFilters();
  bindInspectorModal();
}

function renderExperience() {
  const container = document.getElementById('experience-list');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.experience
    .map(
      (item) => `
      <article class="experience-card">
        <h3 class="experience-company">${item.companyEs}</h3>
        <p class="experience-role">${item.roleEs}</p>
        <p class="experience-description">${item.descEs}</p>
      </article>
    `
    )
    .join('');
}

function renderStack() {
  const container = document.getElementById('stack-section-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.stackGroups
    .map(
      (group) => `
      <div class="stack-group-block">
        <h3 class="stack-group-title">${group.titleEs}</h3>
        <div class="badges-flex-container">
          ${group.items.map((tech) => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
      </div>
    `
    )
    .join('');
}

function renderProjects(list) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = list
    .map(
      (project) => `
      <article class="project-card" data-category="${project.categories.join(' ')}">
        <div class="project-thumbnail">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
          <span class="project-badge-tag">${project.badge}</span>
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-summary">${project.summary}</p>
          <div class="project-tags">
            ${project.tags.map((tag) => `<span class="project-pill">${tag}</span>`).join('')}
          </div>
          <div class="project-links">
            <button type="button" class="project-inspect-btn" data-project-id="${project.id}">Ver Arquitectura</button>
            <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn">Ver Repositorio</a>
          </div>
        </div>
      </article>
    `
    )
    .join('');
}

function bindFilters() {
  const buttons = document.querySelectorAll('.project-filter-btn');
  const grid = document.getElementById('projects-grid');
  if (!buttons.length || !grid) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') || 'all';
      buttons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', String(active));
      });

      const filtered =
        filter === 'all'
          ? PORTFOLIO_DATA.projects
          : PORTFOLIO_DATA.projects.filter((p) => p.categories.includes(filter));

      renderProjects(filtered);
    });
  });
}

function bindInspectorModal() {
  const modal = document.getElementById('project-inspector-modal');
  const backdrop = document.getElementById('project-inspector-backdrop');
  const closeBtn = document.getElementById('project-inspector-close');
  if (!modal) return;

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  document.addEventListener('click', (e) => {
    const target = e.target instanceof Element ? e.target.closest('.project-inspect-btn') : null;
    if (!target) return;
    const id = target.getAttribute('data-project-id');
    const project = PORTFOLIO_DATA.projects.find((p) => p.id === id);
    if (!project) return;

    document.getElementById('inspector-badge').textContent = project.badge;
    document.getElementById('inspector-title').textContent = project.title;
    document.getElementById('inspector-img').src = project.image;
    document.getElementById('inspector-img').alt = project.title;
    document.getElementById('inspector-overview').textContent = project.summary;
    document.getElementById('inspector-arch').textContent = project.architecture;
    document.getElementById('inspector-repo-link').href = project.repoUrl;
    document.getElementById('inspector-tags').innerHTML = project.tags
      .map((t) => `<span class="project-pill">${t}</span>`)
      .join('');

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  });

  backdrop?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);
}