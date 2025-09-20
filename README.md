
# DutchExam.online — MVP Static Bundle

This bundle contains a 2025-style static website with:
- Landing page (`index.html`) with Netlify Forms (AJAX), GA (`G-Y4884MKS1T`), and "Buy" buttons ready for Stripe Checkout
- Admin panel (`admin.html`) with **demo login** (admin / admin123) and localStorage CRUD for questions
- CSS (`assets/styles.css`) and JS (`scripts/*.js`) assets

> For production, wire the admin to Supabase Auth & RLS (instructions below).

## Stripe (Checkout)
1. In Stripe Dashboard → Products, create a product & price.
2. Create a Checkout link or a server endpoint that creates Checkout Sessions.
3. Replace `goToCheckout()` in `scripts/app.js` to redirect to your link (or fetch a session via Netlify Function).

## Netlify
- Deploy this folder. The subscribe form posts to Netlify Forms out-of-the-box.
- Add a `_redirects` if you later add a SPA router.

## Supabase — Admin users (SQL)

Use your existing schema. To explicitly store admin users, add:

```sql
-- Enable pgcrypto for password hashing if you need manual admin table (optional)
create extension if not exists pgcrypto;

-- Roles via profiles (recommended)
alter table if exists profiles add column if not exists role text check (role in ('student','editor','admin')) default 'student';

-- Promote an existing user to admin (replace UUID)
update profiles set role='admin' where user_id = '00000000-0000-0000-0000-000000000001';

-- Optional: a dedicated admins table with hashed passwords (if you can't create auth users yet)
create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

-- Seed demo admin (username: admin / password: admin123)
insert into admins (username, password_hash)
values ('admin', crypt('admin123', gen_salt('bf')))
on conflict (username) do nothing;

-- Function to verify login (server-side only; do not use from browser with anon key)
create or replace function check_admin_password(p_username text, p_password text)
returns boolean language sql stable as $$
  select crypt(p_password, password_hash) = password_hash from admins where username = p_username;
$$;
```

### Supabase Auth approach (preferred)
- Create a user `admin@dutchexam.online` via Auth → Users
- The trigger in your schema should auto-create a `profiles` row
- Promote that user to admin:
```sql
update profiles set role='admin'
where user_id = (select id from auth.users where email = 'admin@dutchexam.online' limit 1);
```

Then, update `admin.html` to use email/password with Supabase Auth and rely on RLS policies to allow inserts/updates on `exams/questions/...` only for `role IN ('editor','admin')`.

## Roadmap ideas to add
- User dashboard (attempt history, badges)
- Content tagging & filters (A2/B1, skill areas)
- Audio player for listening exams (HLS)
- i18n toggle (EN/NL)
- Accessibility: keyboard focus states & aria-live for feedback
- SEO: OpenGraph tags & social preview image
