import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const errorEl = document.getElementById('form-error');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = '';

    const email = form.email.value.trim();
    const password = form.password.value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      errorEl.textContent = error.message;
      return;
    }

    window.location.href = '/app/dashboard.html';
  });
});
