const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load todos dari localStorage pas halaman dibuka
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => {
    createTodoElement(todo.text, todo.completed);
  });
}

// Simpan todos ke localStorage
function saveTodos() {
  const todos = [];
  todoList.querySelectorAll('li').forEach(li => {
    todos.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Buat elemen li baru dan append ke list
function createTodoElement(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Hapus';
  deleteBtn.className = 'delete-btn';

  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    todoList.removeChild(li);
    saveTodos();
  });

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTodos();
  });

  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

// Tambah todo baru
function addTodo() {
  const taskText = todoInput.value.trim();
  if (taskText === '') {
    alert('Tolong isi tugasnya dulu ya!');
    return;
  }

  createTodoElement(taskText);
  todoInput.value = '';
  todoInput.focus();
  saveTodos();
}

// Event klik tombol tambah
addBtn.addEventListener('click', addTodo);

// Event enter di input
todoInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') addTodo();
});

// Load todos saat pertama kali
loadTodos();
