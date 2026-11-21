import { PORTFOLIO_DATA } from '../data/portfolio-data.js';

const STORAGE_KEY = 'portfolio_lang_code';

const TRANSLATIONS = {
  es: {
    heroRole: PORTFOLIO_DATA.profile.roleEs,
    heroDescription: PORTFOLIO_DATA.profile.summaryEs
  },
  en: {
    heroRole: PORTFOLIO_DATA.profile.roleEn,
    heroDescription: PORTFOLIO_DATA.profile.summaryEn
  }
};

/**
 * Resolves the initial language from storage or defaults to Spanish.
 * @returns {'es' | 'en'}
 */
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

/**
 * Applies language strings to elements marked with [data-i18n] and updates <html lang>.
 * @param {'es' | 'en'} lang
 * @param {HTMLSelectElement | null} [selectEl]
 */
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
}

/**
 * Initializes language management and binds an optional <select id="language-select">.
 * @param {HTMLSelectElement | null} [selectEl]
 */
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