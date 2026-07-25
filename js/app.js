import { renderUI } from './ui.js';
import { initEvents } from './events.js';
import { loadTodos } from './storage.js';
import { updateChart, updateFilters, startClock, updateDate } from './utils.js';

function initApp() {
    loadTodos();
    renderUI();
    initEvents();
    updateChart();
    updateFilters();
    startClock();
    updateDate();
    console.log('✨ To-Do List Pro siap digunakan!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
