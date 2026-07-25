import { loadTodos, saveTodos } from './storage.js';
import { generateID } from './utils.js';

let todos = loadTodos();

export function getTodos() {
  return [...todos];
}

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

export function clearAllTodos(confirmDelete = true) {
  if (confirmDelete && !window.confirm('🧹 Hapus semua tugas?')) {
    return false;
  }
  todos = [];
  saveTodos(todos);
  return true;
}

export function getTodoStats() {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  return { total, completed, pending: total - completed };
}
