import { loadTodos, saveTodos } from './storage.js';
import { generateID } from './utils.js';

let todos = loadTodos();
let filter = 'all';

export function getTodos() {
    if (filter === 'all') return [...todos];
    if (filter === 'active') return todos.filter(t => !t.done);
    if (filter === 'completed') return todos.filter(t => t.done);
    return [...todos];
}

export function getStats() {
    const total = todos.length;
    const done = todos.filter(t => t.done).length;
    return { total, done, pending: total - done };
}

export function setFilter(f) { filter = f; }

export function addTodo(text, category = 'personal', deadline = '') {
    const todo = { id: generateID(), text: text.trim(), category, deadline, done: false };
    todos.push(todo);
    saveTodos(todos);
    return todo;
}

export function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) { todo.done = !todo.done; saveTodos(todos); }
    return todo;
}

export function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos(todos);
}

export function clearAll() {
    if (!confirm('Hapus semua?')) return;
    todos = [];
    saveTodos(todos);
}
