import { supabase } from './supabaseClient.js';

async function applySignupMetadata() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user || !user.email) return;

    const key = `dex_signup_meta_${user.email}`;
    const raw = window.localStorage.getItem(key);
    if (!raw) return;

    const meta = JSON.parse(raw);
    const fullName = `${meta.firstName || ''} ${meta.lastName || ''}`.trim();

    await supabase
      .from('profiles')
      .update({
        full_name: fullName || null,
        nickname: meta.nickname || null,
        phone: meta.phone || null,
      })
      .eq('id', user.id);

    window.localStorage.removeItem(key);
  } catch (err) {
    console.warn('Could not apply signup metadata', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applySignupMetadata();
});
