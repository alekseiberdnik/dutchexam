import { supabase } from './supabaseClient.js';
import { requireAuth } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
  const auth = await requireAuth();
  if (!auth) return;

  const { user, profile } = auth;
  const nameEl = document.getElementById('user-email');
  const roleEl = document.getElementById('user-role');

  if (nameEl) nameEl.textContent = user.email;
  if (roleEl) roleEl.textContent = profile?.role ?? 'student';

  // simple stats
  const { data: attempts } = await supabase
    .from('attempts')
    .select('is_correct')
    .eq('user_id', user.id);

  const total = attempts?.length ?? 0;
  const correct = attempts?.filter(a => a.is_correct)?.length ?? 0;

  const totalEl = document.getElementById('stat-total');
  const correctEl = document.getElementById('stat-correct');

  if (totalEl) totalEl.textContent = String(total);
  if (correctEl) correctEl.textContent = total ? `${Math.round((correct / total) * 100)}%` : '–';
});
