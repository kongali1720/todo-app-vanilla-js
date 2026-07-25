/**
 * ============================================
 * APP - Entry Point Aplikasi
 * ============================================
 */

import { renderUI } from './ui.js';
import { initEvents } from './events.js';
import { loadTodos } from './storage.js';

/**
 * Inisialisasi aplikasi
 */
function initApp() {
  // Load data dari storage
  loadTodos();
  
  // Render UI awal
  renderUI();
  
  // Setup event listener
  initEvents();
  
  console.log('✨ To-Do List Meriah siap digunakan!');
  console.log('📁 Struktur modular selesai.');
}

// Jalankan aplikasi saat DOM siap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
