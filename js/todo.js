/**
 * ============================================
 * TODO - Operasi CRUD Data
 * ============================================
 */

import { loadTodos, saveTodos } from './storage.js';
import { generateID } from './utils.js';

// State
let todos = loadTodos();

/**
 * Get semua todos
 * @returns {Array}
 */
export function getTodos() {
  return [...todos];
}

/**
 * Get todo berdasarkan ID
 * @param {string} id - ID todo
 * @returns {object|null}
 */
export function getTodo(id) {
  return todos.find(todo => todo.id === id) || null;
}

/**
 * Tambah todo baru
 * @param {string} text - Teks tugas
 * @returns {object} Todo yang baru dibuat
 */
export function addTodo(text) {
  const newTodo = {
    id: generateID(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  saveTodos(todos);
  return newTodo;
}

/**
 * Toggle status completed todo
 * @param {string} id - ID todo
 * @returns {object|null} Todo yang di-update
 */
export function toggleTodo(id) {
  const todo = getTodo(id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
  }
  return todo;
}

/**
 * Hapus todo berdasarkan ID
 * @param {string} id - ID todo
 * @returns {boolean} True jika berhasil
 */
export function deleteTodo(id) {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    saveTodos(todos);
    return true;
  }
  return false;
}

/**
 * Hapus semua todos
 * @param {boolean} confirmDelete - Konfirmasi hapus
 * @returns {boolean} True jika berhasil
 */
export function clearAllTodos(confirmDelete = true) {
  if (confirmDelete && !window.confirm('🧹 Hapus semua tugas? Yuk mulai dari awal!')) {
    return false;
  }
  
  todos = [];
  saveTodos(todos);
  return true;
}

/**
 * Update teks todo
 * @param {string} id - ID todo
 * @param {string} newText - Teks baru
 * @returns {object|null} Todo yang di-update
 */
export function updateTodoText(id, newText) {
  const todo = getTodo(id);
  if (todo && newText.trim()) {
    todo.text = newText.trim();
    saveTodos(todos);
  }
  return todo;
}

/**
 * Dapatkan statistik todos
 * @returns {object} { total, completed, pending }
 */
export function getTodoStats() {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  return {
    total,
    completed,
    pending: total - completed
  };
}

/**
 * Reload todos dari storage (sinkronisasi)
 */
export function reloadTodos() {
  todos = loadTodos();
  return [...todos];
}
