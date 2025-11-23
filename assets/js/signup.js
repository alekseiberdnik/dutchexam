import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const errorEl = document.getElementById('form-error');
  const infoEl = document.getElementById('form-info');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = '';
    infoEl.textContent = '';

    const firstName = form.first_name.value.trim();
    const lastName = form.last_name.value.trim();
    const nickname = form.nickname.value.trim();
    const email = form.email.value.trim();
    const confirmEmail = form.confirm_email.value.trim();
    const phone = form.phone.value.trim();
    const password = form.password.value;
    const agree = form.agree.checked;

    if (!firstName || !lastName || !nickname) {
      errorEl.textContent = 'Please fill in your first name, last name and nickname.';
      return;
    }

    if (email !== confirmEmail) {
      errorEl.textContent = 'Email and confirmation email do not match.';
      return;
    }

    if (!agree) {
      errorEl.textContent = 'Please confirm that you accept the Privacy Policy.';
      return;
    }

    if (password.length < 6) {
      errorEl.textContent = 'Password must be at least 6 characters.';
      return;
    }

    // Store profile data locally so we can update it after email confirmation
    try {
      const metaKey = `dex_signup_meta_${email}`;
      const meta = { firstName, lastName, nickname, phone, email };
      window.localStorage.setItem(metaKey, JSON.stringify(meta));
    } catch (err) {
      console.warn('Could not store signup metadata locally', err);
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://dutchexam.online/app/email-confirmed.html',
      },
    });

    if (error) {
      errorEl.textContent = error.message;
      return;
    }

    infoEl.textContent =
      'Check your email to confirm your account. After confirmation you will be redirected back to DutchExam.';
  });
});
