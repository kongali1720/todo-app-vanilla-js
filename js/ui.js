/**
 * ============================================
 * UI - Manipulasi DOM
 * ============================================
 */

import { getTodos, getTodoStats } from './todo.js';
import { escapeHTML } from './utils.js';

// DOM References
const todoList = document.getElementById('todo-list');
const totalSpan = document.getElementById('total-count');
const doneSpan = document.getElementById('done-count');

/**
 * Render seluruh UI
 */
export function renderUI() {
  renderTodoList();
  updateStats();
}

/**
 * Render daftar todos
 */
export function renderTodoList() {
  const todos = getTodos();
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

/**
 * Buat element todo
 * @param {object} todo - Data todo
 * @param {number} index - Index untuk event
 * @returns {HTMLLIElement}
 */
export function createTodoElement(todo, index) {
  const li = document.createElement('li');
  if (todo.completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.dataset.index = index;

  // Icon
  const icon = document.createElement('i');
  icon.className = todo.completed ? 'fas fa-check-circle' : 'far fa-circle';
  icon.style.color = todo.completed ? '#479f47' : '#dba16a';
  span.appendChild(icon);

  // Teks (di-escape untuk keamanan)
  const textNode = document.createTextNode(' ' + escapeHTML(todo.text));
  span.appendChild(textNode);

  // Tombol hapus
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.dataset.index = index;
  deleteBtn.innerHTML = '<i class="fas fa-trash-can"></i>';

  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

/**
 * Tampilkan state kosong
 */
export function showEmptyState() {
  todoList.innerHTML = `
    <div class="empty-message">
      <i class="fas fa-face-smile-wink"></i>
      Belum ada tugas, ayo tambahkan! 🚀
    </div>
  `;
}

/**
 * Update statistik
 */
export function updateStats() {
  const stats = getTodoStats();
  totalSpan.textContent = stats.total;
  doneSpan.textContent = stats.completed;
}

/**
 * Focus ke input
 */
export function focusInput() {
  const input = document.getElementById('todo-input');
  if (input) input.focus();
}

/**
 * Bersihkan input
 */
export function clearInput() {
  const input = document.getElementById('todo-input');
  if (input) input.value = '';
}

/**
 * Get nilai input
 * @returns {string}
 */
export function getInputValue() {
  const input = document.getElementById('todo-input');
  return input ? input.value.trim() : '';
}

/**
 * Set error state pada input
 * @param {boolean} isError
 */
export function setInputError(isError) {
  const input = document.getElementById('todo-input');
  if (!input) return;
  
  if (isError) {
    input.style.border = '2px solid #e0754a';
    input.style.background = '#2a1a1a';
    setTimeout(() => {
      input.style.border = 'none';
      input.style.background = 'transparent';
    }, 400);
  } else {
    input.style.border = 'none';
    input.style.background = 'transparent';
  }
}

/**
 * Animasi tombol
 * @param {string} btnId - ID tombol
 */
export function animateButton(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => btn.style.transform = 'scale(1)', 120);
}
