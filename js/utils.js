/**
 * ============================================
 * UTILS - Fungsi Bantuan
 * ============================================
 */

/**
 * Escape HTML untuk mencegah XSS
 * @param {string} text - Teks yang akan di-escape
 * @returns {string} Teks yang sudah aman
 */
export function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Format tanggal ke string lokal Indonesia
 * @param {Date} date - Objek Date
 * @returns {string} Tanggal terformat
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

/**
 * Generate ID unik sederhana
 * @returns {string} ID unik
 */
export function generateID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}

/**
 * Debounce function untuk menghemat performa
 * @param {Function} fn - Fungsi yang akan di-debounce
 * @param {number} delay - Waktu tunggu dalam ms
 * @returns {Function} Fungsi yang sudah di-debounce
 */
export function debounce(fn, delay = 300) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle function untuk membatasi eksekusi
 * @param {Function} fn - Fungsi yang akan di-throttle
 * @param {number} limit - Batas waktu dalam ms
 * @returns {Function} Fungsi yang sudah di-throttle
 */
export function throttle(fn, limit = 300) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
