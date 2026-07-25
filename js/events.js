import { addTodo, toggleTodo, deleteTodo, clearAllTodos } from './todo.js';
import { renderUI, getInputValue, clearInput, focusInput } from './ui.js';

const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const todoList = document.getElementById('todo-list');

export function initEvents() {
  addBtn.addEventListener('click', handleAddTodo);
  clearBtn.addEventListener('click', handleClearAll);
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTodo();
    }
  });
  todoList.addEventListener('click', handleListClick);
}

function handleAddTodo() {
  const text = getInputValue();
  if (text === '') return;
  addTodo(text);
  clearInput();
  renderUI();
  focusInput();
}

function handleClearAll() {
  const success = clearAllTodos(true);
  if (success) renderUI();
}

function handleListClick(e) {
  const target = e.target.closest('span, .delete-btn');
  if (!target) return;
  const index = parseInt(target.dataset.index);
  if (target.tagName === 'SPAN') {
    toggleTodoByIndex(index);
  } else if (target.closest('.delete-btn')) {
    deleteTodoByIndex(index);
  }
}

function toggleTodoByIndex(index) {
  import('./todo.js').then(({ getTodos, toggleTodo }) => {
    const todos = getTodos();
    const todo = todos[index];
    if (todo) {
      toggleTodo(todo.id);
      renderUI();
    }
  });
}

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
EOF# Buat folder css
mkdir -p css

# Buat file style.css
cat > css/style.css << 'EOF'
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    min-height: 100vh;
    background: #0d1117;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.container {
    max-width: 520px;
    width: 100%;
    background: #161b22;
    padding: 28px 24px;
    border-radius: 24px;
    border: 1px solid #30363d;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
}

.header-img {
    width: 100%;
    border-radius: 16px;
    margin-bottom: 18px;
    border: 2px solid #f0883e;
}

.title {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
}

.title i {
    color: #f0883e;
    margin-right: 8px;
}

.subtitle {
    text-align: center;
    color: #8b949e;
    font-size: 14px;
    margin: 4px 0 20px;
}

.input-wrapper {
    display: flex;
    gap: 10px;
    margin-bottom: 18px;
    background: #0d1117;
    padding: 6px 6px 6px 18px;
    border-radius: 50px;
    border: 1px solid #30363d;
}

#todo-input {
    flex: 1;
    padding: 12px 0;
    border: none;
    outline: none;
    background: transparent;
    color: #f0f6fc;
    font-size: 15px;
}

#todo-input::placeholder {
    color: #484f58;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
}

#add-btn {
    background: #f0883e;
    color: #0d1117;
}

#add-btn:hover {
    background: #f6994f;
}

#clear-btn {
    background: #21262d;
    color: #f0f6fc;
    border: 1px solid #30363d;
}

#clear-btn:hover {
    background: #30363d;
}

.stats {
    display: flex;
    justify-content: space-around;
    background: #0d1117;
    padding: 12px;
    border-radius: 16px;
    margin-bottom: 18px;
    border: 1px solid #21262d;
}

.stats span {
    color: #8b949e;
    font-size: 13px;
}

.stats .num {
    color: #f0f6fc;
    font-weight: 700;
}

.stats .num.done {
    color: #3fb950;
}

.stats .num.pending {
    color: #f0883e;
}

#todo-list {
    list-style: none;
    max-height: 340px;
    overflow-y: auto;
}

#todo-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #0d1117;
    border: 1px solid #21262d;
    border-radius: 50px;
    margin-bottom: 8px;
}

#todo-list li span {
    flex: 1;
    cursor: pointer;
    color: #f0f6fc;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
}

#todo-list li span i {
    font-size: 16px;
    color: #484f58;
}

#todo-list li.completed span {
    text-decoration: line-through;
    color: #484f58;
}

#todo-list li.completed span i {
    color: #3fb950;
}

.delete-btn {
    background: transparent;
    border: none;
    color: #484f58;
    font-size: 16px;
    cursor: pointer;
    padding: 4px 10px;
}

.delete-btn:hover {
    color: #f85149;
}

.empty {
    text-align: center;
    padding: 40px 10px;
    color: #484f58;
}

.empty i {
    font-size: 40px;
    color: #21262d;
    display: block;
    margin-bottom: 10px;
}

.footer {
    text-align: center;
    margin-top: 20px;
    padding-top: 14px;
    border-top: 1px solid #21262d;
    color: #484f58;
    font-size: 12px;
}

.footer i {
    color: #f85149;
}

@media (max-width: 480px) {
    .container { padding: 18px 14px; }
    .title { font-size: 22px; }
    .input-wrapper {
        flex-direction: column;
        background: transparent;
        border: none;
        padding: 0;
        gap: 8px;
    }
    #todo-input {
        background: #0d1117;
        border: 1px solid #21262d;
        border-radius: 50px;
        padding: 12px 18px;
    }
    .btn-group {
        display: flex;
        gap: 8px;
        justify-content: center;
    }
    .stats {
        flex-wrap: wrap;
        gap: 6px;
    }
}
