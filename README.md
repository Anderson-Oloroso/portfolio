# Portafolio Personal — Henrik Anderson Oloroso García

> Portafolio interactivo multi-fase: una página estática profesional, un hub de navegación 3D y una fase de aventura cyberpunk tipo runner (*Geometry Dash*). Construido con HTML5, CSS3 y Vanilla JavaScript (ESM).

---

## Estructura del Proyecto

```text
portfolio/
├── index.html                    ← Hub portal (punto de entrada)
├── README.md
├── .gitignore
│
├── assets/
│   ├── cv/
│   │   └── CV_Personalizado_Henrik_Anderson_Oloroso.pdf
│   └── img/
│       ├── Hnk.jpeg              ← Foto de perfil
│       ├── favicon.ico
│       ├── ia.svg                ← Icono Prompt Engineering
│       ├── tutorbot.jpg          ← Imagen del proyecto TutorBot
│       └── hobbies/
│           ├── futsal.jpg
│           ├── codm.jpg
│           ├── calisthenics.jpg
│           ├── reading.jpg
│           ├── walking.jpg
│           ├── family.jpg
│           ├── nature.jpg
│           └── adventure.jpg
│
├── shared/
│   ├── css/
│   │   ├── tokens.css            ← Design tokens (colores, tipografía, radios)
│   │   └── base.css              ← Estilos base, cursor, ambient-canvas
│   ├── data/
│   │   └── portfolio-data.js     ← Datos del portafolio (proyectos, stack, hobbies, experiencia)
│   └── js/
│       ├── theme-manager.js      ← Alternador Sol/Luna (oscuro/claro)
│       ├── i18n-manager.js       ← Internacionalización ES/EN con eventos dinámicos
│       ├── cursor.js             ← Cursor personalizado con efectos de inercia
│       └── ambient-canvas.js     ← Canvas de partículas cuánticas cyan
│
├── hub/
│   ├── css/
│   │   └── hub.css
│   └── js/
│       ├── hub-canvas.js         ← Canvas 3D del hub (Three.js)
│       └── hub-controller.js     ← Inicialización del hub
│
├── static-phase/
│   ├── index.html                ← Página estática del portafolio
│   ├── css/
│   │   ├── layout.css            ← Navbar, hero, secciones
│   │   ├── components.css        ← Cards, badges, modales, hobbies
│   │   └── modals.css            ← Inspector de proyecto, terminal CLI, quest modal
│   └── js/
│       ├── vendor/
│       │   └── anime.min.js      ← Motor ligero de animaciones y stagger
│       ├── core/
│       │   ├── app.js            ← Punto de entrada JS (DOMContentLoaded)
│       │   └── scroll-hud.js     ← Navbar scrolled + barra de progreso de lectura
│       └── features/
│           ├── project-filter.js  ← Renderizado y filtrado de proyectos/stack/experiencia
│           ├── hobby-spotlight.js ← Carrusel de hobbies con imágenes reales
│           ├── discovery-quest.js ← Sistema de 5 nodos tipo misión
│           └── cli-terminal.js   ← Terminal CLI interactiva
│
└── adventure-phase/
    ├── index.html                ← Fase de aventura cyberpunk (Runner)
    ├── css/
    │   ├── adventure-layout.css      ← HUD superior, controles y canvas principal
    │   ├── backdrop-typography.css   ← Paletas cyberpunk por nivel y tipografía gigante tipo amanecer
    │   └── station-overlay.css       ← Modal de estaciones de información del portafolio
    ├── data/
    │   └── levels-config.js          ← Configuración de los 5 niveles, obstáculos y dificultades
    └── js/
        ├── core/
        │   ├── physics.js            ← Motor de físicas, gravedad, saltos y colisiones
        │   ├── game-loop.js          ← Bucle de juego, cámara, dificultades y transición de etapas
        │   └── input-handler.js      ← Controles de teclado, ratón y táctiles
        ├── entities/
        │   ├── player-cube.js        ← Cubo del jugador con estilos y emblemas por nivel
        │   ├── obstacle-factory.js   ← Obstáculos temáticos (sierras, orbes, puentes, racks) con bases difuminadas
        │   └── safe-station.js       ← Puntos de control seguros por etapa
        ├── rendering/
        │   ├── background-renderer.js ← Renderizado de pista y suelo difuminado con perspectiva
        │   └── particle-system.js     ← Estelas de neón y partículas de impacto/salto
        └── ui/
            ├── adventure-hud.js       ← HUD, selector de dificultad/nivel y sintetizador electrónico por etapa
            └── station-modal.js       ← Modal interactivo al alcanzar cada estación
```

---

## Características Principales

### Visual & Efectos
| Característica | Descripción |
|---|---|
| **Cursor personalizado** | Punto + anillo + glow con efecto de inercia. Cambia estado al hover sobre links, cards y al hacer clic |
| **Ambient canvas** | Partículas cyan/azul que forman una red cuántica y son atraídas por el cursor |
| **Fondo de grilla** | Grid sutil CSS que refuerza la estética "tech" |
| **Tema Sol/Luna** | Alternador oscuro/claro con transición suave y persistencia en `localStorage` |

### Internacionalización (ES/EN)
- Selector de idioma en el navbar (`Español` / `English`) con persistencia en `localStorage`
- Textos estáticos en `data-i18n` actualizados en tiempo real vía `i18n-manager.js`
- Re-renderizado dinámico de secciones (`experiencia`, `conocimientos`, `hobbies`, `Protocolo Núcleo`) mediante el evento `portfolio:langchange`

### Protocolo Núcleo (Discovery Quest)
Sistema de gamificación con **5 nodos ocultos** distribuidos en la página estática:

| Nodo | ID | Ubicación |
|---|---|---|
| 01 · Núcleo | `node-hero` | Sección Hero (badge de rol) |
| 02 · SQL | `node-stack` | Sección Conocimientos (badge de sección) |
| 03 · APIs | `node-project` | Sección Proyectos (badge de sección) |
| 04 · Balance | `node-hobby` | Sección Mi vida fuera del código |
| 05 · Terminal | `node-terminal` | Navbar, junto al botón CLI |

**Comportamiento:**
- Al hacer clic en un nodo, aparece un toast de confirmación y el nodo queda marcado visualmente (`is-unlocked` con glow cyan)
- El botón "Núcleo" en el navbar muestra el contador `0/5 → 5/5`
- El modal muestra progreso, dossier del nodo seleccionado y opción de reiniciar
- El estado visual de los nodos persiste durante la sesión

### Proyectos
- Tarjetas con imagen de miniatura, badge de categoría y tags de tecnología
- Filtrado por categoría: Backend, Bases de Datos, DevOps, CLI/Python
- Modal "Ver Arquitectura" con descripción técnica detallada e imagen del proyecto
- Iconos de tecnología con Devicons, SimpleIcons y SVGs locales

### Mi vida fuera del código
- Carrusel de 8 hobbies con **imagen de fondo real** (`assets/img/hobbies/`)
- Fondo del spotlight actualiza con la foto del hobby activo (efecto parallax leve)
- Avance automático cada 6 segundos (se pausa al hacer hover)
- Navegación por clic, flechas, dots o teclado (`ArrowLeft`/`ArrowRight`)
- Story y tag localizados (ES/EN)

### Terminal CLI
Terminal interactiva con comandos: `help`, `stack`, `projects`, `about`, `contact`, `clear`

---

## Fase de Aventura Cyberpunk (`adventure-phase/`)

Minijuego de plataformas estilo *Geometry Dash* donde cada nivel representa una sección del portafolio con identidad visual, física y audio propios:

| Nivel | Tema / Sección | Paleta de Pantalla | Estilo del Cubo | Obstáculos Destacados |
|---|---|---|---|---|
| **LVL 01** | Perfil & Enfoque | **Azul Eléctrico** (`#00e5ff`) | `visor` | Server racks, puentes de datos, pinchos cristal, orbes |
| **LVL 02** | Experiencia | **Verde Matrix** (`#00ff66`) | `ring` | Módulos escalonados, sierras de neón giratorias, puentes |
| **LVL 03** | Stack de Tecnologías | **Morado Cyberpunk** (`#c026ff`) | `circuit` | Cubos tecnológicos (`JS`, `NODE`, `EX`, `PG`, `SQL`, `DKR`, `PY`, `n8n`) |
| **LVL 04** | Proyectos | **Naranja Cyber** (`#ff6a00`) | `diamond` | Pinchos dobles, sierras, racks y puentes suspendidos |
| **LVL 05** | Más allá del código | **Magenta / Violeta Neón** (`#ff2a85`) | `nova` | Plataformas nube volumétricas, orbes y estación final |

**Mecánicas y atmósfera:**
- **Tipografía de fondo estilo amanecer:** Títulos gigantes con máscara de degradado vertical que difumina suavemente la base de las letras hacia el horizonte.
- **Bases difuminadas:** Suelo y plataformas con halo difuminado (`blur` + degradados) para separar el primer plano del fondo.
- **Dificultades (`Fácil / Medio / Difícil`):** Escala velocidad, gravedad, impulso de salto, margen de colisión y tempo del audio.
- **Paisajes sonoros electrónicos (Web Audio API):** Generador sin dependencias externas con filtros *lowpass*, ecos (*delay*) y pulsos graves únicos por nivel (`Audio: ON/OFF`).
- **Estaciones Seguras:** Puntos de control al final de cada etapa que pausan la partida para leer la información del portafolio antes de continuar.

---

## Stack Técnico del Portafolio

| Área | Tecnología |
|---|---|
| Lenguaje | Vanilla JavaScript (ES Modules) |
| Estilos | CSS3 con Custom Properties (design tokens) |
| Tipografía | Inter + Fira Code (Google Fonts) |
| Iconos | Devicons CDN, SimpleIcons CDN, SVGs inline |
| Animaciones | CSS Keyframes + `anime.min.js` (efectos hero) |
| Canvas | HTML5 Canvas 2D API (runner & partículas) + Three.js (hub 3D) |
| Audio | Web Audio API (sintetizador electrónico filtrado por nivel) |
| Hosting previsto | GitHub Pages |

---

## Ejecución Local

Dado que el proyecto utiliza módulos nativos de JavaScript (`type="module"`), ejecútalo mediante un servidor HTTP local desde la raíz:

```bash
npx serve .
# o con Python
python -m http.server 8080
```

---

## Configuración y Personalización

### Agregar o editar proyectos
Edita el array `projects` en [`shared/data/portfolio-data.js`](shared/data/portfolio-data.js):

```js
{
  id: 'mi-proyecto',
  badge: 'API REST',
  categories: ['backend', 'devops'],   // Puede tener varias categorías
  title: 'Nombre del proyecto',
  summary: 'Descripción breve.',
  tags: ['Node.js', 'Docker'],
  image: 'https://example.com/img.jpg', // URL o ruta local '../assets/img/nombre.jpg'
  repoUrl: 'https://github.com/Anderson-Oloroso/mi-proyecto.git',
  architecture: 'Descripción técnica detallada de la arquitectura.'
}
```

### Agregar imágenes de hobbies
Coloca los archivos `.jpg` en `assets/img/hobbies/` y referencia la ruta en el campo `image` de cada hobby en `portfolio-data.js`:

```js
{ id: 'nuevo-hobby', label: 'Nombre', image: '../assets/img/hobbies/nombre.jpg', ... }
```

### Personalizar niveles de aventura
Edita `LEVELS_CONFIG` y `DIFFICULTY_CONFIGS` en [`adventure-phase/data/levels-config.js`](adventure-phase/data/levels-config.js) para ajustar paletas, estilos de cubo, distribución de obstáculos o parámetros de velocidad.

---

## Convenciones

- **Ramas Git**: `develop` para desarrollo activo → `main` para producción/GitHub Pages (`feat/...`, `fix/...`, `docs/...`)
- **Imágenes**: Fotos propias en `assets/img/`, imágenes de proyectos en Unsplash o locales
- **CV**: Archivo PDF en `assets/cv/` (no se versiona en git por `.gitignore`)
- **Idiomas**: ES como idioma base, EN como alternativo vía selector

---

## Autor

**Henrik Anderson Oloroso García**  
Técnico en desarrollo de Software  
[GitHub](https://github.com/Anderson-Oloroso) · [LinkedIn](https://linkedin.com/in/Anderson-oloroso) · o.and871@gmail.com

---

*© 2026 Henrik Anderson Oloroso García — Todos los derechos reservados*