const STORAGE_KEY = 'todos';

export function loadTodos() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

export function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {}
}

export function clearTodos() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
