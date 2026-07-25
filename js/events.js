/**
 * ============================================
 * EVENTS - Event Listener
 * ============================================
 */

import { addTodo, toggleTodo, deleteTodo, clearAllTodos } from './todo.js';
import { 
  renderUI, 
  getInputValue, 
  clearInput, 
  setInputError, 
  animateButton,
  focusInput 
} from './ui.js';

// DOM References
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const todoList = document.getElementById('todo-list');

/**
 * Inisialisasi semua event listener
 */
export function initEvents() {
  // Tombol Tambah
  addBtn.addEventListener('click', handleAddTodo);

  // Tombol Clear All
  clearBtn.addEventListener('click', handleClearAll);

  // Enter key pada input
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTodo();
    }
  });

  // Event delegation untuk toggle dan delete
  todoList.addEventListener('click', handleListClick);

  // Focus & Blur input
  todoInput.addEventListener('focus', () => {
    todoInput.parentElement.style.boxShadow = '0 0 0 4px #f7cba0';
  });
  
  todoInput.addEventListener('blur', () => {
    todoInput.parentElement.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.6)';
  });
}

/**
 * Handler tambah todo
 */
function handleAddTodo() {
  const text = getInputValue();
  
  if (text === '') {
    setInputError(true);
    return;
  }

  addTodo(text);
  clearInput();
  renderUI();
  animateButton('add-btn');
  focusInput();
}

/**
 * Handler clear all
 */
function handleClearAll() {
  const success = clearAllTodos(true);
  if (success) {
    renderUI();
    animateButton('clear-btn');
  }
}

/**
 * Handler click pada list (delegation)
 * @param {Event} e
 */
function handleListClick(e) {
  const target = e.target.closest('button, span');
  if (!target) return;

  const li = target.closest('li');
  if (!li) return;

  // Cari index dari data attribute
  const indexAttr = target.dataset.index;
  if (indexAttr === undefined) return;

  const index = parseInt(indexAttr, 10);

  // Toggle todo (klik pada span)
  if (target.tagName === 'SPAN') {
    toggleTodoByIndex(index);
    return;
  }

  // Delete todo (klik pada tombol hapus)
  if (target.closest('.delete-btn')) {
    deleteTodoByIndex(index);
  }
}

/**
 * Toggle todo berdasarkan index di array
 * @param {number} index
 */
function toggleTodoByIndex(index) {
  // Kita perlu mendapatkan ID dari todo di posisi index
  import('./todo.js').then(({ getTodos, toggleTodo }) => {
    const todos = getTodos();
    const todo = todos[index];
    if (todo) {
      toggleTodo(todo.id);
      renderUI();
    }
  });
}

/**
 * Delete todo berdasarkan index di array
 * @param {number} index
 */
function deleteTodoByIndex(index) {
  import('./todo.js').then(({ getTodos, deleteTodo }) => {
    const todos = getTodos();
    const todo = todos[index];
    if (todo) {
      deleteTodo(todo.id);
      renderUI();
    }
  });
}
