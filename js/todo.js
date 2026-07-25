import { loadTodos, saveTodos } from './storage.js';
import { generateID } from './utils.js';

let todos = loadTodos();
let currentFilter = 'all';

export function getTodos() {
    return [...todos];
}

export function getFilteredTodos() {
    if (currentFilter === 'all') return [...todos];
    if (currentFilter === 'active') return todos.filter(t => !t.completed);
    if (currentFilter === 'completed') return todos.filter(t => t.completed);
    return [...todos];
}

export function setFilter(filter) {
    currentFilter = filter;
}

export function getCurrentFilter() {
    return currentFilter;
}

export function getTodoStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    return { total, completed, pending: total - completed };
}

export function addTodo(text, category = 'personal', deadline = '') {
    const newTodo = {
        id: generateID(),
        text: text.trim(),
        category,
        deadline,
        completed: false,
        createdAt: new Date().toISOString()
    };
    todos.push(newTodo);
    saveTodos(todos);
    return newTodo;
}

export function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
    }
    return todo;
}

export function deleteTodo(id) {
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        saveTodos(todos);
        return true;
    }
    return false;
}

export function updateTodoText(id, newText) {
    const todo = todos.find(t => t.id === id);
    if (todo && newText.trim()) {
        todo.text = newText.trim();
        saveTodos(todos);
    }
    return todo;
}

export function clearAllTodos(confirmDelete = true) {
    if (confirmDelete && !window.confirm('🧹 Hapus semua tugas?')) {
        return false;
    }
    todos = [];
    saveTodos(todos);
    return true;
}

export function reorderTodos(newOrder) {
    todos = newOrder;
    saveTodos(todos);
}

export function getTodo(id) {
    return todos.find(t => t.id === id) || null;
}
