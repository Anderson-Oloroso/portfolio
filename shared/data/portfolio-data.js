export const PORTFOLIO_DATA = {
  profile: {
    name: 'Henrik Anderson Oloroso García',
    shortName: 'Anderson Oloroso',
    roleEs: 'Técnico en desarrollo de Software',
    roleEn: 'Software Development Technician',
    summaryEs:
      'Enfocado en el desarrollo de APIs REST, modelado y normalización de bases de datos relacionales, contenerización con Docker, Prompt Engineering y automatización de procesos. Con proyección hacia soluciones de software escalables y ciberseguridad.',
    summaryEn:
      'Focused on REST API development, relational database modeling and normalization, Docker containerization, Prompt Engineering, and process automation. Oriented toward scalable software solutions and cybersecurity.',
    githubUrl: 'https://github.com/Anderson-Oloroso',
    linkedinUrl: 'https://linkedin.com/in/Anderson-oloroso',
    email: 'o.and871@gmail.com',
    cvPath: '../assets/cv/CV_Personalizado_Henrik_Anderson_Oloroso.pdf'
  },

  experience: [
    {
      id: 'campuslands-gt',
      companyEs: 'Campuslands GT – 2026 – En desarrollo',
      companyEn: 'Campuslands GT – 2026 – In progress',
      roleEs: 'Desarrollador Backend – Scrum Máster',
      roleEn: 'Backend Developer – Scrum Master',
      shortSummaryEs:
        'Backend y gestión ágil de Alba (salud y adherencia farmacológica): Firebase, recordatorios dinámicos, detección de caídas y vinculación por QR.',
      descEs:
        'Desarrollo backend y gestión ágil de Alba, una plataforma de salud y adherencia farmacológica para adultos mayores, cuidadores y personal médico. Implementación de servicios con Firebase, recordatorios dinámicos, detección de caídas y vinculación de roles mediante códigos QR. Coordinación del equipo como Scrum Máster, facilitando la planificación y el seguimiento de tareas durante el desarrollo del proyecto.',
      descEn:
        'Backend development and agile leadership for Alba, a health and medication adherence platform for older adults, caregivers, and medical staff. Firebase services, dynamic reminders, fall detection, and QR role pairing.'
    },
    {
      id: 'softplus',
      companyEs: 'SoftPlus – 2026 - En desarrollo',
      companyEn: 'SoftPlus – 2026 - In progress',
      roleEs: 'Desarrollador Backend',
      roleEn: 'Backend Developer',
      shortSummaryEs:
        'OMS Backend (gestión de órdenes): normalización de base de datos, validaciones, manejo centralizado de errores, Redis, WebSocket, Docker y testing.',
      descEs:
        'OMS Backend – Sistema de gestión de órdenes: Desarrollo de Backend/API en el cual se realizó una implementación a la medida, normalizando una base de datos. En la cual se implementaron validaciones y manejo centralizado de errores utilizando modelos, redis, websocket, realtime; configuración del entorno de trabajo y despliegue con Docker y documentación de las pruebas en cada servicio con testing a la medida de cada api.',
      descEn:
        'OMS Backend – Order management system: custom API development, database normalization, validation, centralized error handling, Redis, WebSocket/realtime, Docker deployment, and tailored API testing.'
    }
  ],

  stackGroups: [
    {
      id: 'backend',
      titleEs: 'Backend & Lenguajes',
      titleEn: 'Backend & Languages',
      accent: '--accent-blue',
      items: ['Node.js', 'Express', 'JavaScript', 'Python']
    },
    {
      id: 'databases',
      titleEs: 'Bases de Datos & Administración',
      titleEn: 'Databases & Administration',
      accent: '--accent-emerald',
      items: ['PostgreSQL', 'PL/pgSQL', 'MySQL', 'pgAdmin 4', 'MySQL Workbench']
    },
    {
      id: 'devops',
      titleEs: 'DevOps, Testing & Herramientas',
      titleEn: 'DevOps, Testing & Tools',
      accent: '--accent-cyan',
      items: ['Docker', 'Git', 'GitHub', 'Postman', 'Insomnia', 'VS Code', 'PyCharm']
    },
    {
      id: 'frontend',
      titleEs: 'Frontend & Maquetación',
      titleEn: 'Frontend & Markup',
      accent: '--accent-amber',
      items: ['HTML5', 'CSS3', 'Bootstrap']
    },
    {
      id: 'automation',
      titleEs: 'Automatización & IA',
      titleEn: 'Automation & AI',
      accent: '--accent-violet',
      items: ['n8n', 'Telegram Bot API', 'Google Sheets API', 'Prompt Engineering']
    },
    {
      id: 'exploration',
      titleEs: 'En Exploración & Práctica Continua',
      titleEn: 'In Exploration & Continuous Practice',
      accent: '--accent-cyan',
      items: ['TypeScript', 'C++']
    }
  ],

  projects: [
    {
      id: 'minerva-lib',
      badge: 'Full Stack & Docker',
      categories: ['backend', 'databases', 'devops'],
      title: 'Minerva-lib — Sistema de gestión de libros para bibliotecas',
      summary:
        'Aplicación para gestionar libros mediante una API y una interfaz web con contenedorización en Docker.',
      tags: ['Node.js', 'Express', 'MySQL', 'Docker'],
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=700&auto=format&fit=crop',
      repoUrl: 'https://github.com/Anderson-Oloroso/minerva-lib.git',
      architecture:
        'API REST en Node.js y Express conectada a MySQL para gestión de catálogo y préstamos, empaquetada con Docker para entornos reproducibles.'
    },
    {
      id: 'countries-rate-limit',
      badge: 'API REST & DevOps',
      categories: ['backend', 'devops'],
      title: 'Countries Express Rate Limit — API REST de países',
      summary:
        'API con operaciones CRUD, validación de datos y límites de solicitudes. Datos almacenados en memoria y testeada con Postman e Insomnia.',
      tags: ['Node.js', 'Express', 'Docker', 'Rate Limit'],
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=700&auto=format&fit=crop',
      repoUrl: 'https://github.com/Anderson-Oloroso/countries-express-rate-limit.git',
      architecture:
        'Endpoints CRUD modulares con middlewares de validación y control de tasa de peticiones (rate limiting) desplegados en contenedor.'
    },
    {
      id: 'hydra-gym',
      badge: 'CLI & MySQL',
      categories: ['cli', 'databases'],
      title: 'HYDRA GYM CLI — Sistema de gestión para gimnasio',
      summary:
        'Aplicación interactiva de consola para administrar clientes, planes, membresías, nutrición e ingresos/egresos con cálculos avanzados.',
      tags: ['Node.js', 'JavaScript', 'MySQL', 'CLI'],
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=700&auto=format&fit=crop',
      repoUrl: 'https://github.com/Anderson-Oloroso/hydra-gym.git',
      architecture:
        'Aplicación de consola orientada a módulos con persistencia en MySQL para membresías, control nutricional y balance financiero.'
    },
    {
      id: 'tech-zone',
      badge: 'PostgreSQL & PL/pgSQL',
      categories: ['databases'],
      title: 'TechZone — Modelo de base de datos para tienda tecnológica',
      summary:
        'Proyecto de base de datos relacional para una empresa de tecnología, con definición de tablas, inserción, procedimientos almacenados y consultas.',
      tags: ['PostgreSQL', 'PL/pgSQL', 'RDBMS'],
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=700&auto=format&fit=crop',
      repoUrl: 'https://github.com/Anderson-Oloroso/tech-zone.git',
      architecture:
        'Esquema relacional normalizado en PostgreSQL con rutinas PL/pgSQL, reglas de integridad y consultas analíticas.'
    },
    {
      id: 'proyecto-tutorbot',
      badge: 'n8n & Telegram',
      categories: ['backend', 'devops'],
      title: 'TutorBot — Bot de tutorías académicas en Telegram',
      summary:
        'Automatización para gestionar solicitudes de tutorías y conectar estudiantes con tutores según su disponibilidad, con seguimiento integral.',
      tags: ['n8n', 'Telegram API', 'Webhooks'],
      image: '../assets/img/tutorbot.jpg',
      repoUrl: 'https://github.com/Anderson-Oloroso/proyecto-tutorbot.git',
      architecture:
        'Flujo orquestado en n8n mediante webhooks de Telegram para asignación de tutorías y registro estructurado.'
    },
    {
      id: 'inventario-tienda',
      badge: 'Python CLI',
      categories: ['cli'],
      title: 'Sistema de gestión de inventario — Python',
      summary:
        'Aplicación de consola para agregar, listar, actualizar y eliminar productos, además de calcular el valor total del inventario de forma ágil.',
      tags: ['Python', 'CLI', 'Inventarios'],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=700&auto=format&fit=crop',
      repoUrl: 'https://github.com/Anderson-Oloroso/inventario-tienda.git',
      architecture:
        'CLI estructurada en Python con operaciones CRUD de inventario y cálculo agregado de existencias y valoración.'
    }
  ],

  hobbies: [
    { id: 'futsal', label: 'Futsal', tag: 'Deporte & Sincronización' },
    { id: 'codm', label: 'Call of Duty: Mobile (CODM)', tag: 'Estrategia & Reflejos' },
    { id: 'calisthenics', label: 'Calistenia', tag: 'Disciplina & Control' },
    { id: 'reading', label: 'Leer', tag: 'Perspectiva & Profundidad' },
    { id: 'walking', label: 'Caminar', tag: 'Claridad & Desconexión' },
    { id: 'family', label: 'Compartir con familia y amigos', tag: 'Vínculos & Equilibrio' },
    { id: 'nature', label: 'Disfrutar de la naturaleza', tag: 'Calma & Observación' },
    { id: 'adventure', label: 'Aventuras llenas de adrenalina', tag: 'Reto & Energía' }
  ]
};