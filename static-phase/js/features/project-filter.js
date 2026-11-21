import { PORTFOLIO_DATA } from '../../../shared/data/portfolio-data.js';

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
          ${group.items.map((tech) => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
      </div>
    `
    )
    .join('');
}

function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const list =
    filter === 'all'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === filter);

  grid.innerHTML = list
    .map(
      (proj) => `
      <article class="project-card" data-category="${proj.category}">
        <div class="project-card-header">
          <span class="project-badge">${proj.badge}</span>
          <h3 class="project-title">${proj.title}</h3>
        </div>
        <p class="project-summary">${proj.summary}</p>
        <div class="project-tags">
          ${proj.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <div class="project-actions">
          <a href="${proj.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">GitHub</a>
        </div>
      </article>
    `
    )
    .join('');
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