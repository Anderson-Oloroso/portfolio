import { PORTFOLIO_DATA } from '../../shared/data/portfolio-data.js';

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
    speedMultiplier: 1.08,
    shapeLabel: 'ESTILO: RACKS & NODOS DE DATOS',
    length: 3100,
    stationX: 2820,
    obstacles: [
      { x: 460, yOffset: 0, w: 58, h: 46, shape: 'server-rack', solidTop: true, label: 'REST API', points: '+100' },
      { x: 640, yOffset: 46, w: 130, h: 28, shape: 'data-bridge', solidTop: true, label: 'Express', points: '+150' },
      { x: 840, yOffset: 0, w: 36, h: 42, shape: 'crystal-spike', label: 'Bug 400' },
      { x: 1080, yOffset: 0, w: 64, h: 52, shape: 'server-rack', solidTop: true, label: 'SQL 3FN', points: '+200' },
      { x: 1230, yOffset: 95, w: 34, h: 34, shape: 'jump-orb', label: 'ORB' },
      { x: 1410, yOffset: 88, w: 150, h: 26, shape: 'data-bridge', solidTop: true, label: 'PostgreSQL', points: '+250' },
      { x: 1620, yOffset: 0, w: 40, h: 46, shape: 'crystal-spike', label: 'Latency' },
      { x: 1662, yOffset: 0, w: 40, h: 46, shape: 'crystal-spike', label: '' },
      { x: 1930, yOffset: 0, w: 66, h: 54, shape: 'server-rack', solidTop: true, label: 'Docker', points: '+300' },
      { x: 2150, yOffset: 54, w: 140, h: 26, shape: 'data-bridge', solidTop: true, label: 'Inglés C1', points: '+350' },
      { x: 2430, yOffset: 0, w: 42, h: 48, shape: 'crystal-spike', label: 'Firewall' }
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
    secondaryColor: '#3b82f6',
    speedMultiplier: 1.15,
    shapeLabel: 'ESTILO: MÓDULOS & SIERRAS DE DESPLIEGUE',
    length: 3350,
    stationX: 3060,
    obstacles: [
      { x: 470, yOffset: 0, w: 84, h: 44, shape: 'stepped-rect', solidTop: true, label: 'Sprint 01', points: '+150' },
      { x: 690, yOffset: 0, w: 48, h: 48, shape: 'neon-saw', label: 'Hotfix' },
      { x: 920, yOffset: 0, w: 92, h: 52, shape: 'stepped-rect', solidTop: true, label: 'Alba Health', points: '+200' },
      { x: 1120, yOffset: 52, w: 145, h: 26, shape: 'data-bridge', solidTop: true, label: 'Firebase & QR', points: '+250' },
      { x: 1350, yOffset: 0, w: 50, h: 50, shape: 'neon-saw', label: 'Deadlock' },
      { x: 1600, yOffset: 0, w: 90, h: 50, shape: 'stepped-rect', solidTop: true, label: 'OMS Backend', points: '+300' },
      { x: 1770, yOffset: 105, w: 34, h: 34, shape: 'jump-orb', label: 'BOOST' },
      { x: 1960, yOffset: 92, w: 165, h: 26, shape: 'data-bridge', solidTop: true, label: 'Redis + WS', points: '+350' },
      { x: 2210, yOffset: 0, w: 48, h: 48, shape: 'neon-saw', label: 'Stress Test' },
      { x: 2470, yOffset: 0, w: 96, h: 54, shape: 'stepped-rect', solidTop: true, label: 'Docker CI', points: '+400' },
      { x: 2700, yOffset: 0, w: 38, h: 44, shape: 'crystal-spike', label: 'Prod Gate' }
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
    secondaryColor: '#8b5cf6',
    speedMultiplier: 1.22,
    shapeLabel: 'ESTILO: CUBOS TECH & CIRCUITOS',
    length: 3650,
    stationX: 3360,
    obstacles: [
      { x: 450, yOffset: 0, w: 56, h: 56, shape: 'tech-cube', solidTop: true, iconText: 'JS', label: 'JavaScript', points: '+100', color: '#f59e0b' },
      { x: 640, yOffset: 56, w: 56, h: 56, shape: 'tech-cube', solidTop: true, iconText: 'NODE', label: 'Node.js', points: '+150', color: '#10b981' },
      { x: 840, yOffset: 0, w: 36, h: 42, shape: 'crystal-spike', label: '' },
      { x: 1050, yOffset: 0, w: 56, h: 56, shape: 'tech-cube', solidTop: true, iconText: 'EX', label: 'Express', points: '+200', color: '#3b82f6' },
      { x: 1230, yOffset: 102, w: 34, h: 34, shape: 'jump-orb', label: 'ORB' },
      { x: 1420, yOffset: 88, w: 56, h: 56, shape: 'tech-cube', solidTop: true, iconText: 'PG', label: 'PostgreSQL', points: '+250', color: '#06b6d4' },
      { x: 1580, yOffset: 88, w: 56, h: 56, shape: 'tech-cube', solidTop: true, iconText: 'SQL', label: 'MySQL', points: '+300', color: '#f59e0b' },
      { x: 1780, yOffset: 0, w: 48, h: 48, shape: 'neon-saw', label: 'Query Lock' },
      { x: 2040, yOffset: 0, w: 56, h: 56, shape: 'tech-cube', solidTop: true, iconText: 'DKR', label: 'Docker', points: '+350', color: '#3b82f6' },
      { x: 2230, yOffset: 56, w: 56, h: 56, shape: 'tech-cube', solidTop: true, iconText: 'PY', label: 'Python', points: '+400', color: '#8b5cf6' },
      { x: 2450, yOffset: 0, w: 38, h: 44, shape: 'crystal-spike', label: '' },
      { x: 2490, yOffset: 0, w: 38, h: 44, shape: 'crystal-spike', label: '' },
      { x: 2740, yOffset: 0, w: 56, h: 56, shape: 'tech-cube', solidTop: true, iconText: 'n8n', label: 'n8n + AI', points: '+450', color: '#10b981' },
      { x: 2940, yOffset: 56, w: 56, h: 56, shape: 'tech-cube', solidTop: true, iconText: 'TS', label: 'TypeScript', points: '+500', color: '#06b6d4' }
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
    secondaryColor: '#06b6d4',
    speedMultiplier: 1.26,
    shapeLabel: 'ESTILO: PICOS DOBLES & PLATAFORMAS AÉREAS',
    length: 3450,
    stationX: 3160,
    obstacles: [
      { x: 460, yOffset: 0, w: 38, h: 46, shape: 'crystal-spike', label: 'Minerva-lib' },
      { x: 500, yOffset: 0, w: 38, h: 46, shape: 'crystal-spike', label: '' },
      { x: 740, yOffset: 48, w: 155, h: 26, shape: 'data-bridge', solidTop: true, label: 'Rate Limit API', points: '+200' },
      { x: 960, yOffset: 0, w: 48, h: 48, shape: 'neon-saw', label: '429 Too Many' },
      { x: 1180, yOffset: 98, w: 34, h: 34, shape: 'jump-orb', label: 'JUMP' },
      { x: 1360, yOffset: 90, w: 165, h: 26, shape: 'data-bridge', solidTop: true, label: 'HYDRA GYM CLI', points: '+250' },
      { x: 1600, yOffset: 0, w: 38, h: 46, shape: 'crystal-spike', label: 'TechZone' },
      { x: 1640, yOffset: 0, w: 38, h: 46, shape: 'crystal-spike', label: '' },
      { x: 1680, yOffset: 0, w: 38, h: 46, shape: 'crystal-spike', label: '' },
      { x: 1940, yOffset: 46, w: 150, h: 26, shape: 'data-bridge', solidTop: true, label: 'TutorBot n8n', points: '+350' },
      { x: 2210, yOffset: 0, w: 50, h: 50, shape: 'neon-saw', label: 'Webhook' },
      { x: 2470, yOffset: 0, w: 66, h: 52, shape: 'server-rack', solidTop: true, label: 'Python CLI', points: '+400' },
      { x: 2720, yOffset: 0, w: 40, h: 46, shape: 'crystal-spike', label: 'Release' }
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
    secondaryColor: '#f59e0b',
    speedMultiplier: 1.16,
    shapeLabel: 'ESTILO: NUBES VOLUMÉTRICAS & ORBES DORADOS',
    length: 3100,
    stationX: 2820,
    obstacles: [
      { x: 470, yOffset: 42, w: 135, h: 38, shape: 'cloud', solidTop: true, label: 'Futsal', points: '+150' },
      { x: 740, yOffset: 94, w: 145, h: 38, shape: 'cloud', solidTop: true, label: 'Calistenia', points: '+200' },
      { x: 960, yOffset: 0, w: 38, h: 42, shape: 'crystal-spike', label: 'Rutina' },
      { x: 1180, yOffset: 105, w: 34, h: 34, shape: 'jump-orb', label: 'AIR' },
      { x: 1370, yOffset: 96, w: 155, h: 40, shape: 'cloud', solidTop: true, label: 'Lectura & Verne', points: '+250' },
      { x: 1650, yOffset: 46, w: 145, h: 38, shape: 'cloud', solidTop: true, label: 'Naturaleza', points: '+300' },
      { x: 1930, yOffset: 0, w: 46, h: 46, shape: 'neon-saw', label: 'Adrenalina' },
      { x: 2180, yOffset: 54, w: 160, h: 40, shape: 'cloud', solidTop: true, label: 'Aventura', points: '+400' },
      { x: 2470, yOffset: 102, w: 34, h: 34, shape: 'jump-orb', label: 'FINAL' }
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