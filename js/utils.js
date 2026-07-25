export function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function generateID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}
