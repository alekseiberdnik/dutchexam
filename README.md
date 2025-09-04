
# DutchExam.online — deploy checklist (Netlify)

## 1) Repository
- Push the contents of this folder to your GitHub repository (main branch).
- Ensure the directory structure:
  - `index.html`, `tests.html`, `test-quick.html`, `test-extended.html`, `test-in-depth.html`
  - `assets/` (brand.css, tests.css, consent.css, logo.svg, hero-illustration.svg, icon-512.png, apple-touch-icon.png, og-image.png)
  - `favicon.ico`
  - `privacy.html`

## 2) Netlify
- Create a new site from Git (connect your repo).
- Build settings: **no build command** (static site), **publish directory**: root of the repo.
- Forms: Netlify Forms autodetects the form named `subscribe`.
- Domain: connect `dutchexam.online` and `inburg.nl` (alias/redirect).

## 3) Google Analytics (GA4)
- Add your Measurement ID (e.g., G-XXXXXXX). Two options:
  1. Quick inline:
     ```html
     <script>window.GA_MEASUREMENT_ID="G-XXXXXXX";</script>
     ```
     Place it in `<head>` of `index.html` (or before `</body>`).
  2. Netlify environment variable (optional progressive enhancement):
     - Add a `<script>` that reads `window.GA_MEASUREMENT_ID` from an injected snippet or server-side render (for fully static, option #1 is recommended).

- Consent Mode v2 is enabled by default with **analytics denied** until user consents.
- Tracked events:
  - `start_test` — when user begins a test (CTA click heuristic).
  - `select_content` — CTA clicks (subscribe button).
  - `generate_lead` — successful Netlify form submission.
  - `complete_test` — heuristic when results are displayed.

## 4) i18n
- Language switcher is present on all pages (EN/NL/RU).
- To extend translations, search for `data-i18n` keys and update dictionaries in the shared script.

## 5) QA after deploy
- Test the subscribe form (should appear in Netlify > Forms).
- Open with `?lang=nl` or `?lang=ru` if you want to force language (or use the selector).
- Check favicon and social preview (share your homepage — OG image should show).

## 6) Future work
- Replace heuristics for `complete_test` with explicit event dispatch from test logic.
- Move legacy inline styles from test pages fully into `assets/brand.css` / `assets/tests.css`.
- Connect ESP (Mailchimp/ConvertKit) via Netlify Functions or direct API.
