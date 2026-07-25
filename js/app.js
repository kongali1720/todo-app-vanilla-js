import { renderUI } from './ui.js';
import { initEvents } from './events.js';
import { loadTodos } from './storage.js';
import { startClock, updateDate } from './utils.js';

function initApp() {
    loadTodos();
    renderUI();
    initEvents();
    startClock();
    updateDate();
    console.log('✅ To-Do List siap!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
