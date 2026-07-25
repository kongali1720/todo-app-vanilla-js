import { getTodoStats } from './todo.js';

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

export function updateProgress() {
    const stats = getTodoStats();
    const percent = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);
    const circle = document.getElementById('progress-circle');
    const text = document.getElementById('progress-text');
    if (circle) {
        const circumference = 188.5;
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
    if (text) text.textContent = percent + '%';
}

export function startClock() {
    const clock = document.getElementById('clock');
    if (!clock) return;
    function update() {
        const now = new Date();
        clock.textContent = now.toTimeString().slice(0, 8);
    }
    update();
    setInterval(update, 1000);
}

export function updateDate() {
    const el = document.getElementById('date');
    if (!el) return;
    el.textContent = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

export function debounce(fn, delay = 300) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}
