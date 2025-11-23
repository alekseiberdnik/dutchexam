import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const errorEl = document.getElementById('form-error');
  const infoEl = document.getElementById('form-info');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = '';
    infoEl.textContent = '';

    const email = form.email.value.trim();
    const password = form.password.value;

    if (password.length < 6) {
      errorEl.textContent = 'Password must be at least 6 characters.';
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      errorEl.textContent = error.message;
      return;
    }

    infoEl.textContent = 'Check your email to confirm your account. After confirmation you can log in.';
  });
});
