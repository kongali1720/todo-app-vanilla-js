import { addTodo, toggleTodo, deleteTodo, clearAll, setFilter } from './todo.js';
import { renderUI, getInput, clearInput } from './ui.js';

export function initEvents() {
    document.getElementById('add-btn').addEventListener('click', handleAdd);
    document.getElementById('clear-btn').addEventListener('click', () => { clearAll(); renderUI(); });
    document.getElementById('todo-input').addEventListener('keypress', e => {
        if (e.key === 'Enter') handleAdd();
    });
    document.getElementById('todo-list').addEventListener('click', handleClick);

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setFilter(btn.dataset.filter);
            renderUI();
        });
    });
}

function handleAdd() {
    const text = getInput();
    if (!text) return;
    const category = document.getElementById('category-select').value;
    const deadline = document.getElementById('deadline-input').value;
    addTodo(text, category, deadline);
    clearInput();
    document.getElementById('deadline-input').value = '';
    renderUI();
}

function handleClick(e) {
    const target = e.target.closest('span, .delete-btn');
    if (!target) return;
    const id = target.dataset.id;
    if (!id) return;
    if (target.tagName === 'SPAN') {
        toggleTodo(id);
        renderUI();
    } else if (target.closest('.delete-btn')) {
        deleteTodo(id);
        renderUI();
    }
}
