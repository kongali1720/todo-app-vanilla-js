import { addTodo, toggleTodo, deleteTodo, clearAllTodos, setFilter } from './todo.js';
import { renderUI, getInputValue, clearInput, focusInput } from './ui.js';

const todoInput = document.getElementById('todo-input');
const categorySelect = document.getElementById('category-select');
const deadlineInput = document.getElementById('deadline-input');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const todoList = document.getElementById('todo-list');

export function initEvents() {
    addBtn.addEventListener('click', handleAddTodo);
    clearBtn.addEventListener('click', handleClearAll);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTodo();
        }
    });
    todoList.addEventListener('click', handleListClick);

    // Filter event
    document.addEventListener('filter-change', (e) => {
        setFilter(e.detail.filter);
        renderUI();
    });

    // Keyboard shortcut: Ctrl+Z untuk undo (bonus)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            // Bisa ditambah undo nanti
        }
    });
}

function handleAddTodo() {
    const text = getInputValue();
    if (text === '') return;
    
    const category = categorySelect ? categorySelect.value : 'personal';
    const deadline = deadlineInput ? deadlineInput.value : '';
    
    addTodo(text, category, deadline);
    clearInput();
    if (deadlineInput) deadlineInput.value = '';
    renderUI();
    focusInput();
}

function handleClearAll() {
    const success = clearAllTodos(true);
    if (success) renderUI();
}

function handleListClick(e) {
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
