# Portafolio Personal — Henrik Anderson Oloroso García

> Portafolio interactivo multi-fase: una página estática profesional, un hub de navegación y una fase de aventura tipo runner. Construido con HTML5, CSS3 y Vanilla JavaScript (ESM).

---

## 🗂️ Estructura del Proyecto

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
│   │   └── portfolio-data.js     ← Datos del portafolio (proyectos, stack, hobbies)
│   └── js/
│       ├── theme-manager.js      ← Alternador Sol/Luna (oscuro/claro)
│       ├── i18n-manager.js       ← Internacionalización ES/EN
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
│       │   └── anime.min.js
│       ├── core/
│       │   ├── app.js            ← Punto de entrada JS (DOMContentLoaded)
│       │   └── scroll-hud.js     ← Navbar scrolled + barra de progreso de lectura
│       └── features/
│           ├── project-filter.js  ← Renderizado y filtrado de proyectos
│           ├── hobby-spotlight.js ← Carrusel de hobbies con imágenes reales
│           ├── discovery-quest.js ← Sistema de 5 nodos tipo misión
│           └── cli-terminal.js   ← Terminal CLI interactiva
│
└── adventure-phase/
    ├── index.html
    ├── css/
    │   ├── adventure-layout.css
    │   └── station-overlay.css
    ├── data/
    │   └── levels-config.js
    └── js/
        └── ui/
            ├── adventure-hud.js
            └── station-modal.js
```

---

## 🚀 Características Principales

### 🎨 Visual & Efectos
| Característica | Descripción |
|---|---|
| **Cursor personalizado** | Punto + anillo + glow con efecto de inercia. Cambia estado al hover sobre links, cards y al hacer clic |
| **Ambient canvas** | Partículas cyan/azul que forman una red cuántica y son atraídas por el cursor |
| **Fondo de grilla** | Grid sutil CSS que refuerza la estética "tech" |
| **Tema Sol/Luna** | Alternador oscuro/claro con transición suave y persistencia en `localStorage` |

### 🌐 Internacionalización (ES/EN)
- Selector de idioma en el navbar
- Textos en `data-i18n` actualizados vía `i18n-manager.js`
- Datos localizados en `portfolio-data.js` (stack, hobbies, experiencia)
- El Protocolo Núcleo muestra etiquetas y detalles en el idioma activo

### 🗺️ Protocolo Núcleo (Discovery Quest)
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

### 📁 Proyectos
- Tarjetas con imagen de miniatura, badge de categoría y tags de tecnología
- Filtrado por categoría: Backend, Bases de Datos, DevOps, CLI/Python
- Modal "Ver Arquitectura" con descripción técnica detallada e imagen del proyecto
- Iconos de tecnología con Devicons, SimpleIcons y SVGs locales

### 🎯 Mi vida fuera del código
- Carrusel de 8 hobbies con **imagen de fondo real** (`assets/img/hobbies/`)
- Fondo del spotlight actualiza con la foto del hobby activo (efecto parallax leve)
- Avance automático cada 6 segundos (se pausa al hacer hover)
- Navegación por clic, flechas, dots o teclado (`ArrowLeft`/`ArrowRight`)
- Story y tag localizados (ES/EN)

### 💬 Terminal CLI
Terminal interactiva con comandos: `help`, `stack`, `projects`, `about`, `contact`, `clear`

---

## 🛠️ Stack Técnico del Portafolio

| Área | Tecnología |
|---|---|
| Lenguaje | Vanilla JavaScript (ES Modules) |
| Estilos | CSS3 con Custom Properties (design tokens) |
| Tipografía | Inter + Fira Code (Google Fonts) |
| Iconos | Devicons CDN, SimpleIcons CDN, SVGs inline |
| Animaciones | CSS Keyframes + `anime.min.js` (efectos hero) |
| Canvas | HTML5 Canvas API (ambient particles + hub 3D) |
| Hosting previsto | GitHub Pages |

---

## ⚙️ Configuración y Personalización

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

### Agregar un icono de tecnología
En `shared/data/portfolio-data.js`, agrega una entrada en `TECH_ICONS`:

```js
'Mi Tecnología': '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/..." class="tech-badge-icon" loading="lazy">',
```

---

## 📦 Fases del Portafolio

### Hub (`index.html`)
Portal de navegación con canvas 3D y acceso a las dos fases.

### Static Phase (`static-phase/index.html`)
Portafolio profesional completo con:
- Hero con foto y stack rápido
- Perfil profesional y experiencia
- Conocimientos con iconos de tecnología
- Proyectos con filtros y modal de arquitectura
- Mi vida fuera del código (carrusel con imágenes)
- Contacto (Gmail, LinkedIn, GitHub)
- Protocolo Núcleo (gamificación de 5 nodos)
- Terminal CLI interactiva

### Adventure Phase (`adventure-phase/index.html`)
Runner de plataformas donde cada estación es un proyecto del portafolio. Incluye ambient canvas de fondo.

---

## 📋 Convenciones

- **Ramas Git**: `develop` para desarrollo activo → `main` para producción/GitHub Pages
- **Imágenes**: Fotos propias en `assets/img/`, imágenes de proyectos en Unsplash o locales
- **CV**: Archivo PDF en `assets/cv/` (no se versiona en git por `.gitignore`)
- **Idiomas**: ES como idioma base, EN como alternativo vía selector

---

## 👤 Autor

**Henrik Anderson Oloroso García**  
Técnico en desarrollo de Software  
[GitHub](https://github.com/Anderson-Oloroso) · [LinkedIn](https://linkedin.com/in/Anderson-oloroso) · o.and871@gmail.com

---

*© 2026 Henrik Anderson Oloroso García — Todos los derechos reservados*
