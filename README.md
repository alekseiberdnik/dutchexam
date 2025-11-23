# DutchExam.online &mdash; MVP frontend

DutchExam.online is a small SaaS-style project that helps learners prepare for the Dutch
integration exam (inburgering), starting with **Reading (Lezen)** and **Knowledge of Dutch Society (KNM)**.

This repository contains the **static frontend MVP**:

- Landing page & marketing content
- Public pages (tests overview, About, FAQ, Terms, Privacy)
- Auth screens (email + password via Supabase)
- Simple dashboard for learners
- Lightweight editor and admin views
- Test runner that loads questions from Supabase and tracks attempts

During the MVP phase all tests are free. Payments (Stripe / Adyen) will be added later.

---

## Tech stack

- **HTML5 + CSS3 + vanilla JavaScript**
- **Supabase** for auth and database
- **Netlify** for hosting (`dutchexam.online`)
- **Google Analytics 4** with a cookie consent banner

No build step is required: everything is served as static files.

---

## Project structure

```text
/
├─ index.html               # Landing page
├─ about.html               # About DutchExam.online
├─ faq.html                 # FAQ for learners
├─ terms.html               # Terms of use
├─ privacy.html             # Privacy Policy
├─ cookies.html             # Cookie Policy
├─ tests/
│  ├─ quick.html            # Marketing page for 15-min quick test
│  └─ deep.html             # Marketing page for 45-min deep test
├─ app/
│  ├─ login.html            # Log in (Supabase email+password)
│  ├─ signup.html           # Sign up
│  ├─ dashboard.html        # Learner dashboard with basic stats
│  ├─ practice.html         # Test runner (loads questions from Supabase)
│  ├─ editor.html           # Question editor (role: editor/admin)
│  └─ admin.html            # Admin overview of users & test sets (role: admin)
└─ assets/
   ├─ css/
   │  ├─ base.css           # Global resets, typography, theme variables
   │  ├─ layout.css         # Layout, header/footer, sections, test hero, responsiveness
   │  └─ components.css     # Buttons, forms, cookie banner, test UI
   └─ js/
      ├─ analytics.js       # GA4 loader
      ├─ cookies.js         # Cookie banner + analytics consent
      ├─ supabaseClient.js  # Supabase client (URL + anon key)
      ├─ auth.js            # Helpers for auth + role checks
      ├─ login.js           # Login form behaviour
      ├─ signup.js          # Signup form behaviour
      ├─ dashboard.js       # Load basic stats for dashboard
      ├─ practice.js        # Test runner with timer and attempts
      ├─ editor.js          # Create new questions
      ├─ admin.js           # Basic admin view of users and test sets
      └─ logout.js          # Small helper to sign out
```

---

## Environment / configuration

Most configuration is currently hard-coded for the MVP:

- **Supabase project URL** and **anon key** are set in  
  `assets/js/supabaseClient.js`  
  (these should match the keys in your Supabase project).
- **GA4 Measurement ID** is set in  
  `assets/js/analytics.js` (`G-Y4884MKS1T`).
- Cookie consent is handled via `localStorage` by `cookies.js`.

On Netlify you can later switch to environment variables and inject them at build time
if you move to a bundler / framework.

---

## Supabase schema (summary)

The frontend expects the following core tables (already created in your project):

- `profiles`  
  - `id` (`uuid`, PK, same as `auth.users.id`)  
  - `role` (`text`, default `'student'`), e.g. `student`, `editor`, `admin`

- `questions`  
  - `id` (`uuid`)  
  - `skill` (`text`, e.g. `Reading` or `KNM`)  
  - `category` (`text`)  
  - `type` (`text`, e.g. `multiple_choice`)  
  - `question_text` (`text`)  
  - `choices` (`jsonb` or `text` with JSON array)  
  - `correct_answer` (`text`)  
  - `explanation` (`text`)  
  - `difficulty` (`text`)  
  - `is_published` (`boolean`)  
  - `created_by` (`uuid`, references `auth.users`)

- `test_sets`  
  - `id` (`uuid`)  
  - `name` (`text`) &mdash; e.g. `Quick Test`, `Deep Test`  
  - `description` (`text`)  
  - `duration_minutes` (`int`)  
  - `is_active` (`boolean`)

- `test_set_questions`  
  - `id` (`uuid`)  
  - `set_id` (`uuid`, references `test_sets.id`)  
  - `question_id` (`uuid`, references `questions.id`)  
  - `question_order` (`int`)

- `attempts`  
  - `id` (`uuid`)  
  - `user_id` (`uuid`, references `auth.users.id`)  
  - `question_id` (`uuid`, references `questions.id`)  
  - `user_answer` (`text`)  
  - `is_correct` (`boolean`)

Row-level security policies ensure that:

- users can only see/update their own profile and attempts
- editors/admins can manage questions
- any logged-in user can see published questions through the test runner

---

## Flows

### Learner flow

1. Visit `dutchexam.online`.
2. Choose a test (quick / deep) or click **Sign up**.
3. Create an account (email + password via Supabase).
4. Go to **Dashboard** (`/app/dashboard.html`).
5. Start a session:
   - Quick test: `/app/practice.html?set=quick`
   - Deep test: `/app/practice.html?set=deep`
6. The test runner:
   - loads the corresponding `test_sets` row,
   - fetches all `questions` via `test_set_questions`,
   - starts a timer based on `duration_minutes`,
   - writes each answer to `attempts`.

### Editor flow

1. Log in with a user whose `profiles.role` is `editor` or `admin`.
2. Open `/app/editor.html`.
3. Use the form to add questions; choices are entered one per line.
4. Questions are saved into `questions` with `created_by = user.id`.

### Admin flow

1. Log in with role `admin`.
2. Open `/app/admin.html`.
3. View a simple table of users (from `profiles`) and test sets (from `test_sets`).

---

## Running locally

Because this is a static site, you just need any simple HTTP server so that ES modules
and relative paths work correctly.

From the project root:

```bash
# Python 3
python -m http.server 4173

# or Node
npx serve .
```

Then open:

- `http://localhost:8000/` or `http://localhost:4173/` for the landing page,
- `http://localhost:8000/app/login.html` to log in etc.

Make sure your Supabase **Redirect URLs** include your local dev URL.

---

## Deploying to Netlify

1. Push this project to your GitHub repo (e.g. `alekseiberdnik/dutchexam`).
2. In Netlify:
   - Connect the repo.
   - Build command: **none**.
   - Publish directory: `/` (root).
3. Ensure your custom domain `dutchexam.online` points to the Netlify site.
4. In Supabase auth settings:
   - Set `Site URL` to `https://dutchexam.online`.
   - Add redirect URLs:
     - `https://dutchexam.online/*`
     - `https://dutchexam.netlify.app/*` (if you keep the default domain)

---

## Roadmap notes

- Add Stripe-based subscriptions once the company is set up (webhooks already planned).
- Extend the dashboard with detailed per-skill analytics.
- Add AI-powered feedback for writing tasks.
- Migrate to a React/Next.js frontend while keeping Supabase as the backend.

This README describes the current MVP implementation so future contributors understand
both the product and technical foundations.
