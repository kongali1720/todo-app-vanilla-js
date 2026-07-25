import { renderUI } from './ui.js';
import { initEvents } from './events.js';
import { loadTodos } from './storage.js';

function initApp() {
  loadTodos();
  renderUI();
  initEvents();
  console.log('✨ To-Do List siap digunakan!');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
