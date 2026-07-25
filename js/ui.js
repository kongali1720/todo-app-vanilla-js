import { getFilteredTodos, getTodoStats } from './todo.js';
import { escapeHTML, formatDate, getCategoryLabel, getCategoryColor, isOverdue, updateChart } from './utils.js';

const todoList = document.getElementById('todo-list');
const totalSpan = document.getElementById('total-count');
const doneSpan = document.getElementById('done-count');
const pendingSpan = document.getElementById('pending-count');

export function renderUI() {
    renderTodoList();
    updateStats();
    updateChart();
}

export function renderTodoList() {
    const todos = getFilteredTodos();
    todoList.innerHTML = '';

    if (todos.length === 0) {
        showEmptyState();
        return;
    }

    todos.forEach((todo, index) => {
        const element = createTodoElement(todo, index);
        todoList.appendChild(element);
    });
}

export function createTodoElement(todo, index) {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.draggable = true;
    if (todo.completed) li.classList.add('completed');

    // Row utama
    const row = document.createElement('div');
    row.className = 'todo-row';

    const span = document.createElement('span');
    span.dataset.id = todo.id;

    const icon = document.createElement('i');
    icon.className = todo.completed ? 'fas fa-check-circle' : 'far fa-circle';
    span.appendChild(icon);
    span.appendChild(document.createTextNode(' ' + escapeHTML(todo.text)));

    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.dataset.id = todo.id;
    del.innerHTML = '<i class="fas fa-trash-can"></i>';

    row.appendChild(span);
    row.appendChild(del);

    // Meta (category + deadline)
    const meta = document.createElement('div');
    meta.className = 'todo-meta';

    if (todo.category) {
        const catSpan = document.createElement('span');
        catSpan.className = 'category';
        catSpan.style.borderColor = getCategoryColor(todo.category);
        catSpan.textContent = getCategoryLabel(todo.category);
        meta.appendChild(catSpan);
    }

    if (todo.deadline) {
        const dlSpan = document.createElement('span');
        dlSpan.className = 'deadline' + (isOverdue(todo.deadline) && !todo.completed ? ' overdue' : '');
        dlSpan.innerHTML = '<i class="fas fa-calendar-alt"></i> ' + formatDate(todo.deadline);
        meta.appendChild(dlSpan);
    }

    li.appendChild(row);
    li.appendChild(meta);

    // Drag event
    li.addEventListener('dragstart', handleDragStart);
    li.addEventListener('dragend', handleDragEnd);
    li.addEventListener('dragover', handleDragOver);
    li.addEventListener('drop', handleDrop);

    // Double click edit
    span.addEventListener('dblclick', handleDoubleClick);

    return li;
}

export function showEmptyState() {
    todoList.innerHTML = `
        <div class="empty">
            <i class="fas fa-face-smile-wink"></i>
            <p>Belum ada tugas, ayo tambahkan!</p>
        </div>
    `;
}

export function updateStats() {
    const stats = getTodoStats();
    totalSpan.textContent = stats.total;
    doneSpan.textContent = stats.completed;
    pendingSpan.textContent = stats.pending;
}

export function getInputValue() {
    const input = document.getElementById('todo-input');
    return input ? input.value.trim() : '';
}

export function clearInput() {
    const input = document.getElementById('todo-input');
    if (input) input.value = '';
}

export function focusInput() {
    const input = document.getElementById('todo-input');
    if (input) input.focus();
}

// ===== DRAG & DROP =====
let dragSourceId = null;

function handleDragStart(e) {
    dragSourceId = this.dataset.id;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.id);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    const targetId = this.dataset.id;
    const sourceId = dragSourceId;
    
    if (sourceId && targetId && sourceId !== targetId) {
        import('./todo.js').then(({ getTodos, reorderTodos }) => {
            const todos = getTodos();
            const sourceIndex = todos.findIndex(t => t.id === sourceId);
            const targetIndex = todos.findIndex(t => t.id === targetId);
            
            if (sourceIndex !== -1 && targetIndex !== -1) {
                const [moved] = todos.splice(sourceIndex, 1);
                todos.splice(targetIndex, 0, moved);
                reorderTodos(todos);
                renderUI();
            }
        });
    }
    dragSourceId = null;
}

// ===== DOUBLE CLICK EDIT =====
function handleDoubleClick(e) {
    const span = this;
    const li = span.closest('li');
    const id = li.dataset.id;
    const currentText = span.textContent.trim();

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.style.cssText = `
        flex: 1;
        background: #0d1117;
        border: 1px solid #f0883e;
        border-radius: 8px;
        padding: 4px 8px;
        color: #f0f6fc;
        font-size: 15px;
        outline: none;
    `;

    span.innerHTML = '';
    span.appendChild(input);
    input.focus();
    input.select();

    const finishEdit = () => {
        const newText = input.value.trim();
        if (newText && newText !== currentText) {
            import('./todo.js').then(({ updateTodoText }) => {
                updateTodoText(id, newText);
                renderUI();
            });
        } else {
            renderUI();
        }
    };

    input.addEventListener('blur', finishEdit);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            input.blur();
        }
        if (e.key === 'Escape') {
            renderUI();
        }
    });
}
