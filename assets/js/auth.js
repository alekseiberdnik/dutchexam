import { supabase } from './supabaseClient.js';

export async function getCurrentUserWithProfile() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return { user: null, profile: null };

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  return { user: session.user, profile };
}

export async function requireAuth(allowedRoles = null) {
  const { user, profile } = await getCurrentUserWithProfile();

  if (!user) {
    window.location.href = '/app/login.html';
    return null;
  }

  if (allowedRoles && (!profile || !allowedRoles.includes(profile.role))) {
    window.location.href = '/app/dashboard.html';
    return null;
  }

  return { user, profile };
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = '/';
}
