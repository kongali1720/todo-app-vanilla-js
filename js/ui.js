import { getTodos, getStats } from './todo.js';
import { escapeHTML, formatDate, getCategoryLabel, updateProgress } from './utils.js';

const list = document.getElementById('todo-list');
const totalEl = document.getElementById('total');
const doneEl = document.getElementById('done');
const pendingEl = document.getElementById('pending');

export function renderUI() {
    renderList();
    updateStats();
    updateProgress();
}

function renderList() {
    const todos = getTodos();
    list.innerHTML = '';
    if (todos.length === 0) {
        list.innerHTML = `<div class="empty"><i class="fas fa-face-smile-wink"></i> Belum ada tugas</div>`;
        return;
    }
    todos.forEach((todo) => {
        const li = document.createElement('li');
        if (todo.done) li.classList.add('completed');

        const span = document.createElement('span');
        span.dataset.id = todo.id;
        const icon = document.createElement('i');
        icon.className = todo.done ? 'fas fa-check-circle' : 'far fa-circle';
        span.appendChild(icon);
        span.appendChild(document.createTextNode(' ' + escapeHTML(todo.text)));

        // Meta
        const meta = document.createElement('div');
        meta.className = 'meta';
        if (todo.category) {
            const cat = document.createElement('span');
            cat.textContent = getCategoryLabel(todo.category);
            meta.appendChild(cat);
        }
        if (todo.deadline) {
            const dl = document.createElement('span');
            dl.textContent = '📅 ' + formatDate(todo.deadline);
            meta.appendChild(dl);
        }

        const del = document.createElement('button');
        del.className = 'delete-btn';
        del.dataset.id = todo.id;
        del.innerHTML = '<i class="fas fa-trash"></i>';

        li.appendChild(span);
        li.appendChild(meta);
        li.appendChild(del);
        list.appendChild(li);
    });
}

function updateStats() {
    const stats = getStats();
    totalEl.textContent = stats.total;
    doneEl.textContent = stats.done;
    pendingEl.textContent = stats.pending;
}

export function getInput() {
    const input = document.getElementById('todo-input');
    return input ? input.value.trim() : '';
}

export function clearInput() {
    const input = document.getElementById('todo-input');
    if (input) input.value = '';
}
