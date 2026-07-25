import { getTodos, getTodoStats } from './todo.js';
import { escapeHTML } from './utils.js';

const todoList = document.getElementById('todo-list');
const totalSpan = document.getElementById('total-count');
const doneSpan = document.getElementById('done-count');
const pendingSpan = document.getElementById('pending-count');

export function renderUI() {
  renderTodoList();
  updateStats();
}

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

export function createTodoElement(todo, index) {
  const li = document.createElement('li');
  if (todo.completed) li.classList.add('completed');
  const span = document.createElement('span');
  span.dataset.index = index;
  const icon = document.createElement('i');
  icon.className = todo.completed ? 'fas fa-check-circle' : 'far fa-circle';
  icon.style.color = todo.completed ? '#3fb950' : '#484f58';
  span.appendChild(icon);
  span.appendChild(document.createTextNode(' ' + escapeHTML(todo.text)));
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.dataset.index = index;
  deleteBtn.innerHTML = '<i class="fas fa-trash-can"></i>';
  li.appendChild(span);
  li.appendChild(deleteBtn);
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
  if (pendingSpan) pendingSpan.textContent = stats.pending;
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
