import { supabase } from './supabaseClient.js';
import { requireAuth } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
  const auth = await requireAuth(['admin']);
  if (!auth) return;

  const usersEl = document.getElementById('admin-users');
  const setsEl = document.getElementById('admin-sets');

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id,email,role,created_at')
    .order('created_at', { ascending: true });

  if (usersEl && profiles) {
    usersEl.innerHTML = profiles.map(p => `
      <tr>
        <td>${p.email || p.id}</td>
        <td>${p.role || 'student'}</td>
        <td>${new Date(p.created_at).toLocaleDateString()}</td>
      </tr>
    `).join('');
  }

  const { data: sets } = await supabase
    .from('test_sets')
    .select('*')
    .order('duration_minutes', { ascending: true });

  if (setsEl && sets) {
    setsEl.innerHTML = sets.map(s => `
      <tr>
        <td>${s.name}</td>
        <td>${s.duration_minutes} min</td>
        <td>${s.is_active ? 'Active' : 'Inactive'}</td>
      </tr>
    `).join('');
  }
});
