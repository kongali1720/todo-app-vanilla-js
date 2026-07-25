import { getTodos, getTodoStats } from './todo.js';

export function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

export function generateID() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}

export function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function getCategoryLabel(cat) {
    const map = {
        personal: '👤 Personal',
        work: '💼 Work',
        study: '📚 Study',
        shopping: '🛒 Shopping',
        other: '📌 Other'
    };
    return map[cat] || cat;
}

export function getCategoryColor(cat) {
    const map = {
        personal: '#58a6ff',
        work: '#f0883e',
        study: '#3fb950',
        shopping: '#f7b731',
        other: '#8b949e'
    };
    return map[cat] || '#8b949e';
}

export function updateChart() {
    const stats = getTodoStats();
    const percent = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);
    
    const circle = document.getElementById('chart-circle');
    const label = document.getElementById('chart-percent');
    
    if (circle) {
        const circumference = 314.159;
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
    if (label) label.textContent = percent + '%';
}

export function updateFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const event = new CustomEvent('filter-change', { detail: { filter: btn.dataset.filter } });
            document.dispatchEvent(event);
        });
    });
}

export function isOverdue(deadline) {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
}

export function debounce(fn, delay = 300) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// ===== JAM & TANGGAL =====
export function startClock() {
    const clockDisplay = document.getElementById('clock-display');
    if (!clockDisplay) return;

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
}

export function updateDate() {
    const dateDisplay = document.getElementById('date-display');
    if (!dateDisplay) return;

    const now = new Date();
    const options = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    };
    dateDisplay.textContent = now.toLocaleDateString('id-ID', options);
}
