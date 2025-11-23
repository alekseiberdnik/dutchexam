import { getCurrentUserWithProfile, logout } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
  const navAuth = document.querySelector('.nav-auth');
  if (!navAuth) return;

  const { user, profile } = await getCurrentUserWithProfile();
  if (!user) return;

  const nickname =
    (profile && (profile.nickname || (profile.full_name ? profile.full_name.split(' ')[0] : ''))) ||
    (user.email ? user.email.split('@')[0] : 'Account');

  navAuth.innerHTML = `
    <div class="nav-user">
      <button type="button" class="btn btn-outline nav-user-btn">${nickname}</button>
      <div class="nav-dropdown nav-dropdown-right nav-user-menu">
        <a href="/app/dashboard.html">Dashboard</a>
        <a href="/tests/quick.html">Quick test</a>
        <a href="/tests/deep.html">Deep test</a>
        <button type="button" class="btn nav-logout-btn" style="width:100%;margin-top:0.25rem;">Log out</button>
      </div>
    </div>
  `;

  const userBtn = document.querySelector('.nav-user-btn');
  const menu = document.querySelector('.nav-user-menu');
  const logoutBtn = document.querySelector('.nav-logout-btn');

  // simple click toggle on mobile
  userBtn?.addEventListener('click', () => {
    if (!menu) return;
    menu.classList.toggle('nav-dropdown-open');
  });

  logoutBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    await logout();
  });
});
