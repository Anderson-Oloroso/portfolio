const STORAGE_KEY = 'portfolio_theme_mode';
const ROOT = document.documentElement;

/**
 * Resolves the initial theme from storage or system preference.
 * @returns {'dark' | 'light'}
 */
export function resolveInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Storage access may be restricted in sandboxed contexts
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

/**
 * Applies the selected theme to the root element and persists it.
 * @param {'dark' | 'light'} theme
 * @param {HTMLButtonElement | null} [toggleBtn]
 */
export function applyTheme(theme, toggleBtn = null) {
  const normalized = theme === 'light' ? 'light' : 'dark';
  ROOT.setAttribute('data-theme', normalized);

  try {
    localStorage.setItem(STORAGE_KEY, normalized);
  } catch {
    // Ignore storage write failure
  }

  if (toggleBtn) {
    const isLight = normalized === 'light';
    toggleBtn.setAttribute('aria-pressed', String(isLight));
    toggleBtn.setAttribute(
      'aria-label',
      isLight ? 'Switch to dark mode' : 'Switch to light mode'
    );
    const labelEl = toggleBtn.querySelector('[data-theme-label]');
    if (labelEl) {
      labelEl.textContent = isLight ? 'Dark' : 'Light';
    }
  }
}

/**
 * Initializes theme state and binds an optional toggle button.
 * @param {HTMLButtonElement | null} [toggleBtn]
 */
export function initThemeManager(toggleBtn = null) {
  const initial = resolveInitialTheme();
  applyTheme(initial, toggleBtn);

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const current = ROOT.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next, toggleBtn);
  });
}