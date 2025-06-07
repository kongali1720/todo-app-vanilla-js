// Ambil elemen penting
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Fungsi tambah tugas baru
function addTodo() {
  const taskText = todoInput.value.trim();
  if (taskText === '') {
    alert('Tolong isi tugasnya dulu ya!');
    return;
  }

  // Buat elemen li
  const li = document.createElement('li');
  li.textContent = taskText;

  // Tambah tombol hapus
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Hapus';
  deleteBtn.className = 'delete-btn';

  // Event hapus tugas
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // supaya event li tidak kebakar
    todoList.removeChild(li);
  });

  // Event toggle selesai
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  todoInput.value = '';
  todoInput.focus();
}

// Event klik tombol tambah
addBtn.addEventListener('click', addTodo);

// Event enter di input supaya bisa submit
todoInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});
