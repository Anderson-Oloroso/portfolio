import { PORTFOLIO_DATA } from '../../shared/data/portfolio-data.js';

export const DIFFICULTY_CONFIGS = {
  easy: {
    id: 'easy',
    label: 'Fácil',
    speedScale: 0.82,
    gravityScale: 0.9,
    jumpScale: 0.96,
    forgiveness: 11,
    tempoScale: 0.88
  },
  medium: {
    id: 'medium',
    label: 'Medio',
    speedScale: 1.0,
    gravityScale: 1.0,
    jumpScale: 1.0,
    forgiveness: 8,
    tempoScale: 1.0
  },
  hard: {
    id: 'hard',
    label: 'Difícil',
    speedScale: 1.2,
    gravityScale: 1.12,
    jumpScale: 1.06,
    forgiveness: 5,
    tempoScale: 1.16
  }
};

export const LEVELS_CONFIG = [
  {
    id: 'level-profile',
    code: 'LVL 01',
    name: 'PERFIL & ENFOQUE',
    kicker: 'STAGE 01 · SYSTEM ARCHITECTURE',
    backdropSub: 'BACKEND · APIS REST · SQL 3FN · DOCKER · CIBERSEGURIDAD',
    gradientKey: 'profile',
    accentColor: '#3b82f6',
    secondaryColor: '#06b6d4',
    cubeStyle: 'visor',
    trackIndex: 0,
    speedMultiplier: 1.0,
    shapeLabel: 'ESTILO: RACKS & NODOS DE DATOS',
    length: 3000,
    stationX: 2740,
    obstacles: [
      { x: 470, yOffset: 0, w: 56, h: 42, shape: 'server-rack', solidTop: true, label: 'REST API', points: '+100' },
      { x: 670, yOffset: 42, w: 145, h: 26, shape: 'data-bridge', solidTop: true, label: 'Express', points: '+150' },
      { x: 910, yOffset: 0, w: 34, h: 38, shape: 'crystal-spike', label: 'Bug 400' },
      { x: 1160, yOffset: 0, w: 62, h: 46, shape: 'server-rack', solidTop: true, label: 'SQL 3FN', points: '+200' },
      { x: 1330, yOffset: 92, w: 36, h: 36, shape: 'jump-orb', label: 'ORB' },
      { x: 1520, yOffset: 84, w: 165, h: 26, shape: 'data-bridge', solidTop: true, label: 'PostgreSQL', points: '+250' },
      { x: 1790, yOffset: 0, w: 36, h: 40, shape: 'crystal-spike', label: 'Latency' },
      { x: 2060, yOffset: 0, w: 64, h: 48, shape: 'server-rack', solidTop: true, label: 'Docker', points: '+300' },
      { x: 2320, yOffset: 0, w: 36, h: 40, shape: 'crystal-spike', label: 'Firewall' }
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
    kicker: 'STAGE 02 · DEPLOYMENT PIPELINE',
    backdropSub: 'CAMPUSLANDS GT · SCRUM MÁSTER · SOFTPLUS · OMS BACKEND',
    gradientKey: 'experience',
    accentColor: '#10b981',
    secondaryColor: '#34d399',
    cubeStyle: 'ring',
    trackIndex: 1,
    speedMultiplier: 1.03,
    shapeLabel: 'ESTILO: MÓDULOS & SIERRAS DE DESPLIEGUE',
    length: 3150,
    stationX: 2890,
    obstacles: [
      { x: 480, yOffset: 0, w: 86, h: 42, shape: 'stepped-rect', solidTop: true, label: 'Sprint 01', points: '+150' },
      { x: 740, yOffset: 0, w: 44, h: 44, shape: 'neon-saw', label: 'Hotfix' },
      { x: 990, yOffset: 0, w: 92, h: 46, shape: 'stepped-rect', solidTop: true, label: 'Alba Health', points: '+200' },
      { x: 1210, yOffset: 46, w: 155, h: 26, shape: 'data-bridge', solidTop: true, label: 'Firebase & QR', points: '+250' },
      { x: 1490, yOffset: 0, w: 46, h: 46, shape: 'neon-saw', label: 'Deadlock' },
      { x: 1750, yOffset: 0, w: 90, h: 46, shape: 'stepped-rect', solidTop: true, label: 'OMS Backend', points: '+300' },
      { x: 1930, yOffset: 96, w: 36, h: 36, shape: 'jump-orb', label: 'BOOST' },
      { x: 2130, yOffset: 84, w: 170, h: 26, shape: 'data-bridge', solidTop: true, label: 'Redis + WS', points: '+350' },
      { x: 2430, yOffset: 0, w: 44, h: 44, shape: 'neon-saw', label: 'Stress Test' },
      { x: 2660, yOffset: 0, w: 36, h: 40, shape: 'crystal-spike', label: 'Prod Gate' }
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
    kicker: 'LEVEL UP! · TECH CUBES OVERDRIVE',
    backdropSub: 'NODE.JS · EXPRESS · POSTGRESQL · MYSQL · DOCKER · PYTHON · N8N',
    gradientKey: 'stack',
    accentColor: '#06b6d4',
    secondaryColor: '#22d3ee',
    cubeStyle: 'circuit',
    trackIndex: 2,
    speedMultiplier: 1.06,
    shapeLabel: 'ESTILO: CUBOS TECH & CIRCUITOS',
    length: 3450,
    stationX: 3190,
    obstacles: [
      { x: 460, yOffset: 0, w: 54, h: 54, shape: 'tech-cube', solidTop: true, iconText: 'JS', label: 'JavaScript', points: '+100', color: '#f59e0b' },
      { x: 670, yOffset: 54, w: 54, h: 54, shape: 'tech-cube', solidTop: true, iconText: 'NODE', label: 'Node.js', points: '+150', color: '#10b981' },
      { x: 900, yOffset: 0, w: 34, h: 38, shape: 'crystal-spike', label: '' },
      { x: 1130, yOffset: 0, w: 54, h: 54, shape: 'tech-cube', solidTop: true, iconText: 'EX', label: 'Express', points: '+200', color: '#3b82f6' },
      { x: 1320, yOffset: 96, w: 36, h: 36, shape: 'jump-orb', label: 'ORB' },
      { x: 1520, yOffset: 84, w: 54, h: 54, shape: 'tech-cube', solidTop: true, iconText: 'PG', label: 'PostgreSQL', points: '+250', color: '#06b6d4' },
      { x: 1700, yOffset: 84, w: 54, h: 54, shape: 'tech-cube', solidTop: true, iconText: 'SQL', label: 'MySQL', points: '+300', color: '#f59e0b' },
      { x: 1940, yOffset: 0, w: 44, h: 44, shape: 'neon-saw', label: 'Query Lock' },
      { x: 2210, yOffset: 0, w: 54, h: 54, shape: 'tech-cube', solidTop: true, iconText: 'DKR', label: 'Docker', points: '+350', color: '#3b82f6' },
      { x: 2430, yOffset: 54, w: 54, h: 54, shape: 'tech-cube', solidTop: true, iconText: 'PY', label: 'Python', points: '+400', color: '#8b5cf6' },
      { x: 2690, yOffset: 0, w: 34, h: 40, shape: 'crystal-spike', label: '' },
      { x: 2920, yOffset: 0, w: 54, h: 54, shape: 'tech-cube', solidTop: true, iconText: 'n8n', label: 'n8n + AI', points: '+450', color: '#10b981' }
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
    kicker: 'STAGE 04 · HIGH SPEED REPOSITORIES',
    backdropSub: 'MINERVA-LIB · RATE LIMIT · HYDRA GYM · TECHZONE · TUTORBOT',
    gradientKey: 'projects',
    accentColor: '#f59e0b',
    secondaryColor: '#fbbf24',
    cubeStyle: 'diamond',
    trackIndex: 3,
    speedMultiplier: 1.09,
    shapeLabel: 'ESTILO: PICOS DOBLES & PLATAFORMAS AÉREAS',
    length: 3350,
    stationX: 3090,
    obstacles: [
      { x: 470, yOffset: 0, w: 34, h: 40, shape: 'crystal-spike', label: 'Minerva-lib' },
      { x: 512, yOffset: 0, w: 34, h: 40, shape: 'crystal-spike', label: '' },
      { x: 770, yOffset: 42, w: 165, h: 26, shape: 'data-bridge', solidTop: true, label: 'Rate Limit API', points: '+200' },
      { x: 1030, yOffset: 0, w: 44, h: 44, shape: 'neon-saw', label: '429 Too Many' },
      { x: 1250, yOffset: 94, w: 36, h: 36, shape: 'jump-orb', label: 'JUMP' },
      { x: 1440, yOffset: 84, w: 170, h: 26, shape: 'data-bridge', solidTop: true, label: 'HYDRA GYM CLI', points: '+250' },
      { x: 1720, yOffset: 0, w: 34, h: 40, shape: 'crystal-spike', label: 'TechZone' },
      { x: 1762, yOffset: 0, w: 34, h: 40, shape: 'crystal-spike', label: '' },
      { x: 2020, yOffset: 44, w: 160, h: 26, shape: 'data-bridge', solidTop: true, label: 'TutorBot n8n', points: '+350' },
      { x: 2320, yOffset: 0, w: 44, h: 44, shape: 'neon-saw', label: 'Webhook' },
      { x: 2580, yOffset: 0, w: 62, h: 48, shape: 'server-rack', solidTop: true, label: 'Python CLI', points: '+400' },
      { x: 2840, yOffset: 0, w: 36, h: 40, shape: 'crystal-spike', label: 'Release' }
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
    kicker: 'FINAL STAGE · SKY CLOUDS & CONTACT',
    backdropSub: 'FUTSAL · CALISTENIA · LECTURA · NATURALEZA · CONTACTO DIRECTO',
    gradientKey: 'life',
    accentColor: '#8b5cf6',
    secondaryColor: '#c084fc',
    cubeStyle: 'nova',
    trackIndex: 4,
    speedMultiplier: 1.05,
    shapeLabel: 'ESTILO: NUBES VOLUMÉTRICAS & ORBES DORADOS',
    length: 3050,
    stationX: 2790,
    obstacles: [
      { x: 480, yOffset: 40, w: 145, h: 36, shape: 'cloud', solidTop: true, label: 'Futsal', points: '+150' },
      { x: 760, yOffset: 88, w: 155, h: 36, shape: 'cloud', solidTop: true, label: 'Calistenia', points: '+200' },
      { x: 1010, yOffset: 0, w: 34, h: 38, shape: 'crystal-spike', label: 'Rutina' },
      { x: 1220, yOffset: 96, w: 36, h: 36, shape: 'jump-orb', label: 'AIR' },
      { x: 1420, yOffset: 88, w: 165, h: 38, shape: 'cloud', solidTop: true, label: 'Lectura & Verne', points: '+250' },
      { x: 1720, yOffset: 44, w: 155, h: 36, shape: 'cloud', solidTop: true, label: 'Naturaleza', points: '+300' },
      { x: 2020, yOffset: 0, w: 42, h: 42, shape: 'neon-saw', label: 'Adrenalina' },
      { x: 2270, yOffset: 48, w: 165, h: 38, shape: 'cloud', solidTop: true, label: 'Aventura', points: '+400' },
      { x: 2530, yOffset: 94, w: 36, h: 36, shape: 'jump-orb', label: 'FINAL' }
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