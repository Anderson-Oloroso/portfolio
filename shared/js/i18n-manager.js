import { PORTFOLIO_DATA } from '../data/portfolio-data.js';

const STORAGE_KEY = 'portfolio_lang_code';

const TRANSLATIONS = {
  es: {
    brandRole: 'Mejora continua · Hub',
    navAbout: 'Sobre Mí',
    navExperience: 'Experiencia',
    navSkills: 'Conocimientos',
    navProjects: 'Proyectos',
    navLife: 'Mi vida',
    navContact: 'Contacto',
    navAdventure: 'Aventura',
    questLabel: 'Núcleo',
    heroRole: PORTFOLIO_DATA.profile.roleEs,
    heroDescription: PORTFOLIO_DATA.profile.summaryEs,
    btnExploreProjects: 'Explorar Proyectos',
    btnDownloadCv: 'Descargar CV',
    quickStackLabel: 'Ecosistema:',
    aboutBadge: 'Trayectoria & Enfoque',
    aboutTitle: 'Perfil Profesional',
    aboutDesc: 'Desarrollo metódico orientado a resolver requerimientos reales con código limpio y mantenible.',
    aboutWhoTitle: '¿Quién soy?',
    aboutP1:
      'Soy Técnico en desarrollo de software, curioso, resiliente y apasionado por la tecnología. Mi enfoque abarca desde el diseño y estructuración de APIs REST y lógica de negocio en backend, hasta la arquitectura, normalización y optimización de bases de datos relacionales, contenerización con Docker y automatización de procesos.',
    aboutP2:
      'Cuento con experiencia en el diagnóstico y mantenimiento de sistemas, gestión de inventarios y registros digitales, complementado con un nivel de Inglés C1 para comunicación técnica fluida y una sólida proyección hacia la ciberseguridad y soluciones de software escalables.',
    spec1Title: 'Desarrollo de Software & APIs',
    spec1Desc:
      'Construcción de APIs REST modulares con Node.js y Express, asincronía, middlewares y validación robusta de solicitudes.',
    spec2Title: 'Modelado & Persistencia SQL',
    spec2Desc:
      'Diseño de esquemas relacionales, normalización, consultas optimizadas, procedimientos almacenados y PL/pgSQL en PostgreSQL y MySQL.',
    spec3Title: 'Automatización & DevOps',
    spec3Desc:
      'Contenedores con Docker, flujos de automatización con n8n, webhooks e integración de Prompt Engineering.',
    expBadge: 'Trayectoria profesional',
    expTitle: 'Experiencia laboral',
    expDesc: 'Experiencia en desarrollo backend, gestión ágil y soporte técnico.',
    skillsBadge: 'Tecnologías & Dominio',
    skillsTitle: 'Conocimientos adquiridos y herramientas usadas',
    skillsDesc: 'Stack tecnológico y herramientas aplicadas en proyectos de desarrollo y producción.',
    soft1: 'Resolución de problemas complejos y pensamiento analítico',
    soft2: 'Trabajo colaborativo y comunicación efectiva',
    soft3: 'Adaptabilidad rápida a nuevas tecnologías',
    soft4: 'Inglés Nivel C1 (Avanzado / Técnico)',
    projectsBadge: 'Repositorios & Código',
    projectsTitle: 'Proyectos Destacados',
    projectsDesc: 'Aplicaciones desarrolladas con buenas prácticas de software y código en GitHub.',
    filterAll: 'Todos',
    filterBackend: 'Backend & APIs',
    filterDb: 'Bases de Datos & SQL',
    filterDevops: 'DevOps & Automatización',
    btnMoreGithub: 'Ver más proyectos en GitHub',
    lifeBadge: 'Más allá del software',
    lifeTitle: 'Mi vida fuera del código',
    lifeDesc: 'También disfruto de actividades que me conectan con las personas, la naturaleza y nuevos retos.',
    hobbyStory: 'Espacios dinámicos, toma de decisiones rápida y trabajo en equipo.',
    contactBadge: 'Canales Directos',
    contactTitle: 'Información de Contacto',
    contactDesc: 'Disponible para oportunidades laborales, colaboraciones y proyectos de software.',
    contactEmailLabel: 'Correo',
    footerRole: 'Técnico en desarrollo de software · Código estructurado con HTML5, CSS3 y Vanilla JavaScript',
    footerRights: 'Todos los derechos reservados',
    btnViewRepo: 'Ver Repositorio'
  },
  en: {
    brandRole: 'Continuous improvement · Hub',
    navAbout: 'About Me',
    navExperience: 'Experience',
    navSkills: 'Skills',
    navProjects: 'Projects',
    navLife: 'My Life',
    navContact: 'Contact',
    navAdventure: 'Adventure',
    questLabel: 'Core',
    heroRole: PORTFOLIO_DATA.profile.roleEn,
    heroDescription: PORTFOLIO_DATA.profile.summaryEn,
    btnExploreProjects: 'Explore Projects',
    btnDownloadCv: 'Download CV',
    quickStackLabel: 'Ecosystem:',
    aboutBadge: 'Background & Focus',
    aboutTitle: 'Professional Profile',
    aboutDesc: 'Methodical software development focused on solving real requirements with clean, maintainable code.',
    aboutWhoTitle: 'Who am I?',
    aboutP1:
      'I am a Software Development Technician, curious, resilient, and passionate about technology. My work spans from designing and structuring REST APIs and backend business logic to relational database architecture, normalization and optimization, Docker containerization, and workflow automation.',
    aboutP2:
      'I bring hands-on experience in system diagnostics and maintenance, inventory management, and digital records, backed by C1 English proficiency for technical communication and a clear trajectory toward cybersecurity and scalable software solutions.',
    spec1Title: 'Software Development & APIs',
    spec1Desc:
      'Building modular REST APIs with Node.js and Express, asynchronous workflows, middlewares, and strict request validation.',
    spec2Title: 'Modeling & SQL Persistence',
    spec2Desc:
      'Relational schema design, normalization, query optimization, stored routines, and PL/pgSQL across PostgreSQL and MySQL.',
    spec3Title: 'Automation & DevOps',
    spec3Desc:
      'Docker containers, n8n automation workflows, webhooks, and Prompt Engineering integration.',
    expBadge: 'Work History',
    expTitle: 'Work Experience',
    expDesc: 'Experience in backend development, agile coordination, and technical support.',
    skillsBadge: 'Technologies & Domain',
    skillsTitle: 'Acquired Knowledge & Tools Used',
    skillsDesc: 'Technology stack and tooling applied across development and production projects.',
    soft1: 'Complex problem solving and analytical thinking',
    soft2: 'Collaborative teamwork and clear communication',
    soft3: 'Fast adaptability to emerging technologies',
    soft4: 'English Level C1 (Advanced / Technical)',
    projectsBadge: 'Repositories & Code',
    projectsTitle: 'Featured Projects',
    projectsDesc: 'Applications built with software engineering best practices and source code on GitHub.',
    filterAll: 'All',
    filterBackend: 'Backend & APIs',
    filterDb: 'Databases & SQL',
    filterDevops: 'DevOps & Automation',
    btnMoreGithub: 'View more projects on GitHub',
    lifeBadge: 'Beyond Software',
    lifeTitle: 'My Life Outside Code',
    lifeDesc: 'I also enjoy activities that connect me with people, nature, and new challenges.',
    hobbyStory: 'Dynamic spaces, fast decision-making, and teamwork.',
    contactBadge: 'Direct Channels',
    contactTitle: 'Contact Information',
    contactDesc: 'Available for job opportunities, collaborations, and software engineering projects.',
    contactEmailLabel: 'Email',
    footerRole: 'Software Development Technician · Structured with HTML5, CSS3 & Vanilla JavaScript',
    footerRights: 'All rights reserved',
    btnViewRepo: 'View Repository'
  }
};

export function resolveInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') {
      return saved;
    }
  } catch {
    // Ignore storage access errors
  }
  return 'es';
}

export function applyLanguage(lang, selectEl = null) {
  const normalized = lang === 'en' ? 'en' : 'es';
  document.documentElement.setAttribute('lang', normalized);

  try {
    localStorage.setItem(STORAGE_KEY, normalized);
  } catch {
    // Ignore storage write errors
  }

  const dict = TRANSLATIONS[normalized] || TRANSLATIONS.es;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && Object.prototype.hasOwnProperty.call(dict, key)) {
      el.textContent = dict[key];
    }
  });

  if (selectEl && selectEl.value !== normalized) {
    selectEl.value = normalized;
  }

  window.dispatchEvent(new CustomEvent('portfolio:langchange', { detail: { lang: normalized } }));
}

export function initI18nManager(selectEl = null) {
  const initial = resolveInitialLanguage();
  applyLanguage(initial, selectEl);

  if (!selectEl) return;

  selectEl.addEventListener('change', (e) => {
    const target = e.target;
    const nextLang = target instanceof HTMLSelectElement ? target.value : 'es';
    applyLanguage(nextLang, selectEl);
  });
}