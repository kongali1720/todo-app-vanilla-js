const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const todoList = document.getElementById('todo-list');

// Load from localStorage on page load
window.onload = function() {
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  savedTodos.forEach(todo => addTodoToDOM(todo.text, todo.completed));
};

// Save todos to localStorage
function saveTodos() {
  const todos = [];
  document.querySelectorAll('#todo-list li').forEach(li => {
    todos.push({
      text: li.querySelector('.todo-text').textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Add todo item to DOM
function addTodoToDOM(text, completed = false) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;
  span.classList.add('todo-text');

  if (completed) {
    li.classList.add('completed');
  }

  li.appendChild(span);

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Hapus';
  delBtn.classList.add('delete-btn');
  li.appendChild(delBtn);

  // Toggle completed on clicking text
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTodos();
  });

  // Delete task on clicking delete button
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveTodos();
  });

  todoList.appendChild(li);
  saveTodos();
}

// Add new todo from input
function addTodo() {
  const text = todoInput.value.trim();
  if (text === '') {
    alert('Tolong isi tugasnya dulu ya!');
    return;
  }
  addTodoToDOM(text);
  todoInput.value = '';
  todoInput.focus();
}

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// Clear all todos
clearBtn.addEventListener('click', () => {
  if (confirm('Yakin mau hapus semua tugas?')) {
    todoList.innerHTML = '';
    saveTodos();
  }
});
