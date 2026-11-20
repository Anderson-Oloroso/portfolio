# Portafolio personal

Portafolio interactivo con una fase estática y otra jugable. Los archivos de imágenes y el CV se agregan en sus respectivas carpetas.

```text
.
├── index.html
├── README.md
├── .gitignore
├── assets/
│   ├── cv/
│   └── img/
│       └── hobbies/
├── shared/
│   ├── css/
│   │   ├── tokens.css
│   │   └── base.css
│   ├── data/
│   │   └── portfolio-data.js
│   └── js/
│       ├── theme-manager.js
│       └── i18n-manager.js
├── hub/
│   ├── css/
│   │   └── hub.css
│   └── js/
│       ├── hub-canvas.js
│       └── hub-controller.js
├── static-phase/
│   ├── index.html
│   ├── css/
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── modals.css
│   └── js/
│       ├── vendor/
│       │   └── anime.min.js
│       ├── core/
│       │   ├── app.js
│       │   └── scroll-hud.js
│       └── features/
│           ├── project-filter.js
│           ├── hobby-spotlight.js
│           ├── cli-terminal.js
│           └── discovery-quest.js
└── adventure-phase/
    ├── index.html
    ├── css/
    │   ├── adventure-layout.css
    │   ├── backdrop-typography.css
    │   └── station-overlay.css
    ├── data/
    │   └── levels-config.js
    └── js/
        ├── core/
        │   ├── game-loop.js
        │   ├── physics.js
        │   └── input-handler.js
        ├── entities/
        │   ├── player-cube.js
        │   ├── obstacle-factory.js
        │   └── safe-station.js
        ├── rendering/
        │   ├── background-renderer.js
        │   └── particle-system.js
        └── ui/
            ├── station-modal.js
            └── adventure-hud.js
```