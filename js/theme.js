/**
 * ============================================
 * THEME - Manajemen Tema (Dark/Light)
 * ============================================
 */

const THEME_KEY = 'todo-theme';
const DARK_CLASS = 'dark-theme';

/**
 * Load tema dari LocalStorage
 * @returns {string} 'dark' atau 'light'
 */
export function loadTheme() {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === 'dark' || theme === 'light') {
      return theme;
    }
    // Default: dark (sesuai dengan dark.css)
    return 'dark';
  } catch (error) {
    console.error('Gagal load theme:', error);
    return 'dark';
  }
}

/**
 * Simpan tema ke LocalStorage
 * @param {string} theme - 'dark' atau 'light'
 */
export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Gagal save theme:', error);
  }
}

/**
 * Terapkan tema ke body
 * @param {string} theme - 'dark' atau 'light'
 */
export function applyTheme(theme) {
  const body = document.body;
  
  if (theme === 'dark') {
    body.classList.add(DARK_CLASS);
  } else {
    body.classList.remove(DARK_CLASS);
  }
  
  saveTheme(theme);
}

/**
 * Toggle tema (dark/light)
 * @returns {string} Tema baru
 */
export function toggleTheme() {
  const currentTheme = loadTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  return newTheme;
}

/**
 * Inisialisasi tema saat aplikasi dimuat
 */
export function initTheme() {
  const theme = loadTheme();
  applyTheme(theme);
}
