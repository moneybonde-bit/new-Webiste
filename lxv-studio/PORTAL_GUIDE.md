# Luxavian Client Portal & Admin CRM

The consultation flow no longer hands leads off to WhatsApp. Submitting the
form creates a **Project** with a unique code (`LX-2026-000001`), opens a
personal **client dashboard**, and drops the lead into the **admin CRM
pipeline**.

## Routes

| Route | Who | What |
| --- | --- | --- |
| `/consultation` | public | Multi-step brief → creates the project & workspace |
| `/portal/login` | client | Passwordless magic-link sign-in (email only) |
| `/portal` | client | Dashboard: status, timeline, progress, files, meetings, notes, activity, support |
| `/admin/login` | staff | Magic-link sign-in for admins |
| `/admin` | admin | Metrics & analytics overview |
| `/admin/pipeline` | admin | Drag-and-drop kanban (Lead → … → Maintenance) |
| `/admin/leads` · `/admin/clients` · `/admin/projects` | admin | Searchable lists |
| `/admin/projects/:id` | admin | Project detail: status updates, internal notes, files, meeting scheduler, activity |
| `/admin/team` | super admin | Role management (Client / Admin / Super Admin) |

## Architecture

Clean, layered, and module-ready — pages never talk to the database directly:

```
src/portal/
├── domain/          # Entities & pipeline config (persistence-agnostic)
│   ├── types.ts     #   Project, FileAsset, Meeting, Note, Notification, Activity…
│   └── pipeline.ts  #   The 9 pipeline stages + progress helpers
├── data/            # Data-access boundary
│   ├── repository.ts          # PortalRepository interface (the only contract pages use)
│   ├── supabaseRepository.ts  # Production: Postgres + RLS + Storage + Edge Functions
│   ├── demoRepository.ts      # Zero-config localStorage backend
│   └── index.ts               # getRepository() factory (env-driven)
├── auth/            # Magic-link auth context + route guards
├── components/      # Reusable UI (shells, timeline, upload, notifications…)
├── lib/             # Presentation helpers
└── pages/           # Client portal + admin CRM screens
```

Adding a future module (Invoices, Contracts, Payments, Tickets, Knowledge
Base) means: new entity in `domain/`, new methods on `PortalRepository`
(implemented in both backends), a table + RLS block in `supabase/schema.sql`,
and a page — no refactoring of existing code.

## Demo mode (default)

With no env vars set, the portal runs fully client-side: data persists in
`localStorage`, "magic link" signs you in instantly, and a banner marks the
mode. Any email that first signs in at `/admin/login` becomes the demo admin.

## Going live with Supabase

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full step-by-step production
checklist (Supabase project, SQL, auth, redirect URLs, Cloudflare env vars,
first super admin, and a verification run-through).

## Roles (RBAC)

| Role | Access |
| --- | --- |
| `client` | Own projects only (`/portal`) |
| `admin` | Full CRM (`/admin/*` except Team) |
| `super_admin` | CRM + `/admin/team` role management + project deletion |

Role changes are enforced in the database (RLS + a trigger that blocks role
edits by non-super-admins), not just in the UI. Bootstrap the first super
admin via SQL; manage everyone else from `/admin/team`.

## Security model

- Anonymous visitors can only call the `submit_consultation` RPC — there are
  no table-level insert grants for the public role.
- Clients see only rows tied to their signed-in email (projects, files,
  meetings, non-internal notes, their notifications); enforced by RLS, not
  by the UI.
- Internal notes never leave the database for non-admins.
- Files live in a private bucket; downloads use short-lived signed URLs.

## SPA hosting note

`/portal` and `/admin` are client-side routes — make sure your host rewrites
unknown paths to `index.html` (Cloudflare Pages: add a `_redirects` with
`/* /index.html 200`, or keep `not_found_handling = "single-page-application"`).
