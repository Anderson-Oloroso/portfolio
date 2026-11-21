import { initThemeManager } from '../../../shared/js/theme-manager.js';
import { initScrollHud } from './scroll-hud.js';
import { initProjectsAndSections } from '../features/project-filter.js';
import { initHobbySpotlight } from '../features/hobby-spotlight.js';
import { initCliTerminal } from '../features/cli-terminal.js';
import { initDiscoveryQuest } from '../features/discovery-quest.js';

document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('theme-toggle');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  initThemeManager(themeBtn);
  initScrollHud();
  initProjectsAndSections();
  initHobbySpotlight();
  initCliTerminal();
  initDiscoveryQuest();

  hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navLinks?.classList.toggle('is-open', !expanded);
  });
});