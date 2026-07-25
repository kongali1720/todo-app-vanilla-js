const KEY = 'todos';

export function loadTodos() {
    try {
        const data = localStorage.getItem(KEY);
        return data ? JSON.parse(data) : [];
    } catch { return []; }
}

export function saveTodos(todos) {
    try {
        localStorage.setItem(KEY, JSON.stringify(todos));
    } catch {}
}
