/**
 * ============================================
 * STORAGE - Manajemen LocalStorage
 * ============================================
 */

const STORAGE_KEY = 'todos';

/**
 * Load todos dari LocalStorage
 * @returns {Array} Array of todo objects
 */
export function loadTodos() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Gagal load todos:', error);
    return [];
  }
}

/**
 * Save todos ke LocalStorage
 * @param {Array} todos - Array of todo objects
 */
export function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Gagal save todos:', error);
  }
}

/**
 * Clear semua todos dari LocalStorage
 */
export function clearTodos() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Gagal clear todos:', error);
  }
}

/**
 * Cek apakah ada data di LocalStorage
 * @returns {boolean}
 */
export function hasTodos() {
  return localStorage.getItem(STORAGE_KEY) !== null;
}
