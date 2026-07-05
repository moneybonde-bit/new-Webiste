# Luxavian — Production Deployment Checklist

Your stack: **Vite SPA on Cloudflare Workers** (`luxavianv1`, already wired to
this repo with `not_found_handling: single-page-application`) + **Supabase**
(auth, database, storage, edge functions). Follow these steps in order —
after step 6 the demo banner disappears and everything runs on real data.

---

## 1. Create the Supabase project

1. Go to <https://supabase.com/dashboard> → **New project**.
2. Name: `luxavian` · Region: **Southeast Asia (Singapore)** (closest to Palu) ·
   set a strong database password (store it in a password manager; the app never uses it).
3. Wait ~2 minutes for provisioning.

## 2. Execute the SQL

1. Dashboard → **SQL Editor** → **New query**.
2. Paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql) → **Run**.
   It's idempotent — safe to re-run after future updates.
3. Optional (dev/staging only): run [`supabase/seed.sql`](./supabase/seed.sql)
   for three sample projects. **Do not run in production.**

## 3. Configure Authentication (magic links)

1. Dashboard → **Authentication → Sign In / Up**: ensure **Email** is enabled.
   Magic links work out of the box; no password settings needed.
2. **Authentication → Emails**: customize the "Magic Link" template with your
   branding (optional but recommended).
3. Production email: the built-in sender is rate-limited (~2/hour). Before real
   traffic, configure **Authentication → Emails → SMTP** with your own sender
   (Resend SMTP works: host `smtp.resend.com`, user `resend`, password = API key).

## 4. Configure Redirect URLs

Dashboard → **Authentication → URL Configuration**:

- **Site URL**: `https://luxavian.it.com`
- **Redirect URLs** — add all of:
  ```
  https://luxavian.it.com/portal
  https://luxavian.it.com/admin
  http://localhost:3000/portal
  http://localhost:3000/admin
  ```

## 5. Configure Storage

Nothing to do — `schema.sql` already created the private `project-files`
bucket (50 MB/object limit) and its access policies. Verify under
**Storage**: the bucket exists and is **not** public.

## 6. Configure Cloudflare environment variables

The Workers build must see the variables **at build time**:

1. Cloudflare dashboard → **Workers & Pages → luxavianv1 → Settings →
   Variables and Secrets** → add (type *Text* is fine, they're public values):
   - `VITE_SUPABASE_URL` = your project URL (Supabase → Settings → API)
   - `VITE_SUPABASE_ANON_KEY` = the `anon` key (same page — never the `service_role` key)
2. Make sure they're available to the **build environment** (Build settings →
   Variables), not only runtime — Vite inlines them during `vite build`.

## 7. Deploy

Merging to `main` auto-deploys via the existing Git integration. To force it:

```bash
git commit --allow-empty -m "chore: trigger production build" && git push
```

Or deploy manually from `lxv-studio/`:

```bash
VITE_SUPABASE_URL=https://YOURREF.supabase.co \
VITE_SUPABASE_ANON_KEY=eyJ... \
npm run build && npx wrangler deploy
```

Optional — status-change emails (dashboard notifications work without this):

```bash
npm i -g supabase
supabase login
supabase link --project-ref YOURREF
supabase functions deploy notify-status-change
supabase secrets set RESEND_API_KEY=re_xxx \
  NOTIFY_FROM="Luxavian <hello@luxavian.id>" \
  PORTAL_URL=https://luxavian.it.com/portal
```

## 8. Create the first admin

1. Visit `https://luxavian.it.com/admin/login`, enter **your** email, click the
   magic link — this creates your profile (as a client, so `/admin` bounces you; expected).
2. Supabase → **SQL Editor**:
   ```sql
   update public.profiles set role = 'super_admin'
   where email = 'moneybonde@gmail.com';
   ```
3. Sign out and back in (or just reload) — you now have full CRM access, and
   can promote further staff from **/admin/team** in the UI.

## 9. Verify production

Run through this once, in order:

- [ ] `https://luxavian.it.com/portal` shows **no yellow demo banner**
- [ ] Submit `/consultation` with a second email you control → success screen shows a project code (`LX-…`)
- [ ] Supabase → Table Editor → `projects` contains that row with all consultation answers
- [ ] The magic link arrives at the second email and opens the client dashboard with the real project
- [ ] `/admin` (your account): metrics show 1 lead; the project appears in the **Pipeline** Lead column
- [ ] Drag the card to **Qualified** → the client account's bell shows the notification (and an email arrives if step 7's function is deployed)
- [ ] Upload a file as the client → it appears in the admin project detail and downloads via the button
- [ ] Schedule a meeting in admin → it appears on the client dashboard
- [ ] Sign in with a third (uninvolved) email at `/portal` → it sees **no** projects (RLS check)
- [ ] `/admin` with that third account → redirected to `/portal` (RBAC check)

If every box ticks, you're live. 🚀
