import { PORTFOLIO_DATA } from '../../shared/data/portfolio-data.js';

export const LEVELS_CONFIG = [
  {
    id: 'level-profile',
    code: 'LVL 01',
    name: 'PERFIL & ENFOQUE',
    kicker: 'STAGE 01 · SYSTEM CORE',
    backdropSub: 'BACKEND · APIS REST · SQL · DOCKER · CIBERSEGURIDAD',
    gradientKey: 'profile',
    accentColor: '#3b82f6',
    secondaryColor: '#06b6d4',
    shapeType: 'rectangle',
    shapeLabel: 'FORMA: BLOQUES & RECTÁNGULOS',
    length: 2300,
    stationX: 2050,
    obstacles: [
      { x: 520, w: 62, h: 42, shape: 'rectangle', label: 'APIs REST', points: '+100' },
      { x: 930, w: 76, h: 56, shape: 'rectangle', label: 'SQL 3FN', points: '+150' },
      { x: 1380, w: 68, h: 48, shape: 'rectangle', label: 'Docker', points: '+200' },
      { x: 1730, w: 54, h: 38, shape: 'rectangle', label: 'Inglés C1', points: '+250' }
    ],
    station: {
      title: 'Perfil Profesional — Henrik Anderson Oloroso',
      subtitle: 'Técnico en desarrollo de Software · Código limpio, escalable y metódico',
      items: [
        {
          title: '¿Quién soy?',
          meta: 'Backend · Persistencia · Automatización',
          desc: PORTFOLIO_DATA.profile.summaryEs
        },
        {
          title: 'Pilares Técnicos',
          meta: 'Enfoque Principal',
          chips: [
            'APIs REST (Node.js / Express)',
            'PostgreSQL & MySQL',
            'Docker & Contenedores',
            'n8n & Prompt Engineering',
            'Inglés Nivel C1'
          ]
        }
      ]
    }
  },
  {
    id: 'level-experience',
    code: 'LVL 02',
    name: 'EXPERIENCIA',
    kicker: 'STAGE 02 · PRODUCTION TRACK',
    backdropSub: 'CAMPUSLANDS GT · SCRUM MÁSTER · SOFTPLUS · OMS BACKEND',
    gradientKey: 'experience',
    accentColor: '#10b981',
    secondaryColor: '#3b82f6',
    shapeType: 'stepped-rect',
    shapeLabel: 'FORMA: MÓDULOS ESCALONADOS',
    length: 2450,
    stationX: 2200,
    obstacles: [
      { x: 540, w: 74, h: 44, shape: 'stepped-rect', label: 'Alba Health', points: '+150' },
      { x: 960, w: 80, h: 58, shape: 'stepped-rect', label: 'Scrum Master', points: '+200' },
      { x: 1410, w: 76, h: 48, shape: 'stepped-rect', label: 'OMS Backend', points: '+250' },
      { x: 1810, w: 70, h: 52, shape: 'stepped-rect', label: 'Redis & WS', points: '+300' }
    ],
    station: {
      title: 'Trayectoria & Experiencia Laboral',
      subtitle: 'Desarrollo backend en producción y coordinación ágil',
      items: PORTFOLIO_DATA.experience.map((exp) => ({
        title: exp.companyEs,
        meta: exp.roleEs,
        desc: exp.shortSummaryEs
      }))
    }
  },
  {
    id: 'level-stack',
    code: 'LVL 03',
    name: 'STACK DE TECNOLOGÍAS',
    kicker: 'LEVEL UP! · TECH CUBES ARENA',
    backdropSub: 'NODE.JS · EXPRESS · POSTGRESQL · MYSQL · DOCKER · PYTHON · N8N',
    gradientKey: 'stack',
    accentColor: '#06b6d4',
    secondaryColor: '#8b5cf6',
    shapeType: 'tech-cube',
    shapeLabel: 'FORMA: CUBOS DE TECNOLOGÍAS',
    length: 2850,
    stationX: 2600,
    obstacles: [
      { x: 480, w: 54, h: 54, shape: 'tech-cube', label: 'Node.js', points: '+100', color: '#10b981' },
      { x: 820, w: 54, h: 54, shape: 'tech-cube', label: 'Express', points: '+150', color: '#3b82f6' },
      { x: 1170, w: 54, h: 54, shape: 'tech-cube', label: 'PostgreSQL', points: '+200', color: '#06b6d4' },
      { x: 1520, w: 54, h: 54, shape: 'tech-cube', label: 'MySQL', points: '+250', color: '#f59e0b' },
      { x: 1870, w: 54, h: 54, shape: 'tech-cube', label: 'Docker', points: '+300', color: '#3b82f6' },
      { x: 2220, w: 54, h: 54, shape: 'tech-cube', label: 'Python / n8n', points: '+350', color: '#8b5cf6' }
    ],
    station: {
      title: 'Stack de Tecnologías & Dominio',
      subtitle: 'Herramientas, lenguajes y bases de datos aplicadas en proyectos reales',
      items: PORTFOLIO_DATA.stackGroups.map((group) => ({
        title: group.titleEs,
        meta: `${group.items.length} tecnologías`,
        chips: group.items
      }))
    }
  },
  {
    id: 'level-projects',
    code: 'LVL 04',
    name: 'PROYECTOS',
    kicker: 'STAGE 04 · CODE CHALLENGES',
    backdropSub: 'MINERVA-LIB · RATE LIMIT · HYDRA GYM · TECHZONE · TUTORBOT',
    gradientKey: 'projects',
    accentColor: '#f59e0b',
    secondaryColor: '#06b6d4',
    shapeType: 'triangle',
    shapeLabel: 'FORMA: TRIÁNGULOS & PICOS NEÓN',
    length: 2650,
    stationX: 2400,
    obstacles: [
      { x: 520, w: 48, h: 48, shape: 'triangle', label: 'Minerva-lib', points: '+150' },
      { x: 920, w: 52, h: 52, shape: 'triangle', label: 'Rate Limit', points: '+200' },
      { x: 1320, w: 50, h: 50, shape: 'triangle', label: 'HYDRA GYM', points: '+250' },
      { x: 1720, w: 52, h: 52, shape: 'triangle', label: 'TechZone', points: '+300' },
      { x: 2060, w: 48, h: 48, shape: 'triangle', label: 'TutorBot', points: '+350' }
    ],
    station: {
      title: 'Proyectos Destacados en GitHub',
      subtitle: 'Soluciones backend, bases de datos relacionales, CLI y automatización',
      items: PORTFOLIO_DATA.projects.map((proj) => ({
        title: proj.title,
        meta: proj.badge,
        desc: proj.summary,
        chips: proj.tags
      }))
    }
  },
  {
    id: 'level-life-contact',
    code: 'LVL 05',
    name: 'MÁS ALLÁ DEL CÓDIGO',
    kicker: 'FINAL STAGE · HORIZON & CONTACT',
    backdropSub: 'FUTSAL · CALISTENIA · LECTURA · NATURALEZA · CONTACTO DIRECTO',
    gradientKey: 'life',
    accentColor: '#8b5cf6',
    secondaryColor: '#f59e0b',
    shapeType: 'cloud',
    shapeLabel: 'FORMA: NUBES & PLATAFORMAS SUAVES',
    length: 2450,
    stationX: 2200,
    obstacles: [
      { x: 520, w: 86, h: 42, shape: 'cloud', label: 'Futsal', points: '+100' },
      { x: 950, w: 92, h: 44, shape: 'cloud', label: 'Calistenia', points: '+150' },
      { x: 1390, w: 88, h: 42, shape: 'cloud', label: 'Lectura', points: '+200' },
      { x: 1820, w: 94, h: 44, shape: 'cloud', label: 'Naturaleza', points: '+300' }
    ],
    station: {
      title: 'Mi Vida Fuera del Código & Contacto',
      subtitle: 'Equilibrio personal y canales directos para colaborar',
      items: [
        {
          title: 'Intereses & Energía',
          meta: '8 actividades fuera de pantalla',
          chips: PORTFOLIO_DATA.hobbies.map((h) => h.label)
        },
        {
          title: 'Canales Directos',
          meta: 'Disponible para proyectos y oportunidades',
          desc: `Correo: ${PORTFOLIO_DATA.profile.email} · LinkedIn: Anderson Oloroso · GitHub: Anderson-Oloroso`
        }
      ]
    }
  }
];