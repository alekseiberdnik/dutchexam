import { loadGA } from './analytics.js';

const CONSENT_KEY = 'dutchexam_cookie_consent';

function createBanner() {
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <p>
      We use cookies to improve your experience and to analyze traffic.
      Read our <a href="/privacy.html">Privacy Policy</a>.
    </p>
    <div class="cookie-banner-actions">
      <button class="btn btn-outline" data-action="reject">Reject</button>
      <button class="btn btn-primary" data-action="accept">Accept</button>
    </div>
  `;
  banner.addEventListener('click', (e) => {
    const action = e.target.getAttribute('data-action');
    if (!action) return;
    if (action === 'accept') {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      loadGA();
    } else {
      localStorage.setItem(CONSENT_KEY, 'rejected');
    }
    banner.remove();
  });
  document.body.appendChild(banner);
}

export function initCookiesAndAnalytics() {
  const consent = localStorage.getItem(CONSENT_KEY);
  if (!consent) {
    createBanner();
    return;
  }
  if (consent === 'accepted') {
    loadGA();
  }
}

document.addEventListener('DOMContentLoaded', initCookiesAndAnalytics);
