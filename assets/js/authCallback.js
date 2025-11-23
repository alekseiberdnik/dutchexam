import { supabase } from './supabaseClient.js';

async function handleAuthCallback() {
  const url = window.location.href;
  if (!url.includes('code=')) return;

  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(url);
    if (error) {
      console.error('Auth callback error', error);
      return;
    }

    // Clean URL so code/type params disappear
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('code');
    cleanUrl.searchParams.delete('type');
    cleanUrl.searchParams.delete('redirect_to');
    window.history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search);
  } catch (err) {
    console.error('Unexpected auth callback error', err);
  }
}

handleAuthCallback();
