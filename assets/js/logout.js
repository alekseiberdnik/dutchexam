import { logout } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('logout-btn');
  btn?.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });
});
