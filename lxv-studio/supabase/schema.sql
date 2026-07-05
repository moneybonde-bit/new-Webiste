-- ============================================================
-- Luxavian Client Portal & CRM — Supabase schema (v2)
-- Idempotent: safe to re-run in the SQL editor after updates.
-- ============================================================

-- ---------- Profiles (mirrors auth.users) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text,
  company text,
  phone text,
  role text not null default 'client' check (role in ('client', 'admin', 'super_admin')),
  created_at timestamptz not null default now()
);

-- Migration for v1 installs (two-role check → three-role check).
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('client', 'admin', 'super_admin'));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, lower(new.email), coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Role helpers (used by every RLS policy) ----------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'super_admin')
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'super_admin'
  );
$$;

-- The signed-in user's email (magic-link users always have one, verified).
create or replace function public.jwt_email()
returns text
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', ''));
$$;

-- Defense in depth: even if an UPDATE slips through a policy, the role
-- column can only ever be changed by a super admin.
create or replace function public.guard_role_change()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_super_admin() then
    raise exception 'Only a super admin can change roles';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_guard_role on public.profiles;
create trigger profiles_guard_role
  before update on public.profiles
  for each row execute function public.guard_role_change();

-- ---------- Projects ----------
create sequence if not exists public.project_code_seq;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  status text not null default 'lead' check (status in (
    'lead','qualified','meeting','proposal','negotiation',
    'development','revision','launch','maintenance'
  )),
  client_email text not null,
  client_name text not null,
  client_company text,
  client_phone text,
  consultation jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_client_email_idx on public.projects (client_email);
create index if not exists projects_status_idx on public.projects (status);
create index if not exists projects_created_at_idx on public.projects (created_at desc);

-- ---------- Files ----------
create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  name text not null,
  category text not null default 'other' check (category in ('logo','images','documents','brand-guidelines','other')),
  size_bytes bigint not null default 0,
  content_type text not null default 'application/octet-stream',
  uploaded_by text not null default 'client' check (uploaded_by in ('client','admin')),
  path text not null,
  created_at timestamptz not null default now()
);

create index if not exists files_project_idx on public.files (project_id, created_at desc);

-- ---------- Meetings ----------
create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  title text not null,
  scheduled_at timestamptz not null,
  medium text not null default 'gmeet',
  link text,
  created_at timestamptz not null default now()
);

create index if not exists meetings_project_idx on public.meetings (project_id, scheduled_at);

-- ---------- Notes ----------
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  body text not null,
  internal boolean not null default false,
  author_name text not null default 'Luxavian',
  created_at timestamptz not null default now()
);

create index if not exists notes_project_idx on public.notes (project_id, created_at desc);

-- ---------- Notifications ----------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  recipient_email text not null,
  title text not null,
  body text not null default '',
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists notifications_recipient_idx
  on public.notifications (recipient_email, read, created_at desc);

-- ---------- Activity ----------
create table if not exists public.activity (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  kind text not null,
  summary text not null,
  actor_name text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists activity_project_idx on public.activity (project_id, created_at desc);

-- ============================================================
-- RPCs (SECURITY DEFINER — the only write paths that bypass RLS,
-- each with its own explicit authorization check)
-- ============================================================

-- Anonymous visitors submit the consultation through this RPC only —
-- there is no table-level insert grant. Generates LX-YYYY-NNNNNN and
-- rate-limits submissions per email to blunt spam.
create or replace function public.submit_consultation(
  p_name text,
  p_email text,
  p_company text,
  p_phone text,
  p_consultation jsonb
)
returns public.projects
language plpgsql
security definer set search_path = public
as $$
declare
  v_code text;
  v_project public.projects;
  v_recent int;
begin
  if p_email is null or p_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'A valid email is required';
  end if;
  if p_name is null or length(trim(p_name)) < 2 then
    raise exception 'A name is required';
  end if;

  select count(*) into v_recent
  from public.projects
  where client_email = lower(trim(p_email))
    and created_at > now() - interval '24 hours';
  if v_recent >= 5 then
    raise exception 'Submission limit reached — please contact us directly';
  end if;

  v_code := 'LX-' || to_char(now(), 'YYYY') || '-' ||
            lpad(nextval('public.project_code_seq')::text, 6, '0');
  insert into public.projects (code, name, client_email, client_name, client_company, client_phone, consultation)
  values (
    v_code,
    coalesce(nullif(trim(p_company), ''), split_part(trim(p_name), ' ', 1) || '''s Project'),
    lower(trim(p_email)),
    trim(p_name),
    nullif(trim(p_company), ''),
    nullif(trim(p_phone), ''),
    coalesce(p_consultation, '{}'::jsonb)
  )
  returning * into v_project;

  insert into public.activity (project_id, kind, summary, actor_name)
  values (v_project.id, 'project_created', 'Project ' || v_code || ' created from consultation', trim(p_name));

  return v_project;
end;
$$;

grant execute on function public.submit_consultation(text, text, text, text, jsonb) to anon, authenticated;

-- Atomic status change: update + activity + client notification in one
-- transaction, so the dashboard never sees a status without its trail.
create or replace function public.update_project_status(
  p_project_id uuid,
  p_status text,
  p_actor text
)
returns public.projects
language plpgsql
security definer set search_path = public
as $$
declare
  v_project public.projects;
  v_labels jsonb := '{
    "lead": ["Lead", "Consultation received — we''re reviewing your brief."],
    "qualified": ["Qualified", "Your project is a fit and has been prioritized."],
    "meeting": ["Meeting", "Discovery call to align on scope and goals."],
    "proposal": ["Proposal", "A tailored proposal is being prepared for you."],
    "negotiation": ["Negotiation", "Finalizing scope, timeline, and investment."],
    "development": ["Development", "Design and build in progress."],
    "revision": ["Revision", "Refinements based on your feedback."],
    "launch": ["Launch", "Going live — final checks and deployment."],
    "maintenance": ["Maintenance", "Ongoing care, updates, and support."]
  }'::jsonb;
begin
  if not public.is_admin() then
    raise exception 'Admins only';
  end if;
  if v_labels -> p_status is null then
    raise exception 'Invalid status %', p_status;
  end if;

  update public.projects
  set status = p_status, updated_at = now()
  where id = p_project_id
  returning * into v_project;
  if v_project.id is null then
    raise exception 'Project not found';
  end if;

  insert into public.activity (project_id, kind, summary, actor_name)
  values (p_project_id, 'status_changed',
          'Status moved to ' || (v_labels -> p_status ->> 0), coalesce(p_actor, 'Luxavian'));

  insert into public.notifications (project_id, recipient_email, title, body)
  values (p_project_id, v_project.client_email,
          'Your project is now in ' || (v_labels -> p_status ->> 0),
          v_labels -> p_status ->> 1);

  return v_project;
end;
$$;

grant execute on function public.update_project_status(uuid, text, text) to authenticated;

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.files enable row level security;
alter table public.meetings enable row level security;
alter table public.notes enable row level security;
alter table public.notifications enable row level security;
alter table public.activity enable row level security;

-- Does the signed-in client own this project?
create or replace function public.owns_project(p_project_id uuid)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.projects
    where id = p_project_id and client_email = public.jwt_email()
  );
$$;

-- Profiles
drop policy if exists "profiles: own row" on public.profiles;
create policy "profiles: own row" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles: update own" on public.profiles;
create policy "profiles: update own" on public.profiles
  for update using (id = auth.uid() or public.is_super_admin())
  with check (id = auth.uid() or public.is_super_admin());
  -- role changes additionally guarded by the profiles_guard_role trigger

-- Projects
drop policy if exists "projects: client reads own" on public.projects;
create policy "projects: client reads own" on public.projects
  for select using (client_email = public.jwt_email() or public.is_admin());
drop policy if exists "projects: admin updates" on public.projects;
create policy "projects: admin updates" on public.projects
  for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "projects: admin deletes" on public.projects;
drop policy if exists "projects: super admin deletes" on public.projects;
create policy "projects: super admin deletes" on public.projects
  for delete using (public.is_super_admin());

-- Files
drop policy if exists "files: read" on public.files;
create policy "files: read" on public.files
  for select using (public.is_admin() or public.owns_project(project_id));
drop policy if exists "files: insert" on public.files;
create policy "files: insert" on public.files
  for insert with check (public.is_admin() or public.owns_project(project_id));
drop policy if exists "files: admin delete" on public.files;
create policy "files: admin delete" on public.files
  for delete using (public.is_admin());

-- Meetings
drop policy if exists "meetings: read" on public.meetings;
create policy "meetings: read" on public.meetings
  for select using (public.is_admin() or public.owns_project(project_id));
drop policy if exists "meetings: admin write" on public.meetings;
create policy "meetings: admin write" on public.meetings
  for insert with check (public.is_admin());
drop policy if exists "meetings: admin update" on public.meetings;
create policy "meetings: admin update" on public.meetings
  for update using (public.is_admin());
drop policy if exists "meetings: admin delete" on public.meetings;
create policy "meetings: admin delete" on public.meetings
  for delete using (public.is_admin());

-- Notes: clients only ever see non-internal notes on their own projects.
drop policy if exists "notes: read" on public.notes;
create policy "notes: read" on public.notes
  for select using (
    public.is_admin() or (public.owns_project(project_id) and internal = false)
  );
drop policy if exists "notes: admin insert" on public.notes;
create policy "notes: admin insert" on public.notes
  for insert with check (public.is_admin());
drop policy if exists "notes: admin delete" on public.notes;
create policy "notes: admin delete" on public.notes
  for delete using (public.is_admin());

-- Notifications
drop policy if exists "notifications: recipient reads" on public.notifications;
create policy "notifications: recipient reads" on public.notifications
  for select using (recipient_email = public.jwt_email() or public.is_admin());
drop policy if exists "notifications: admin insert" on public.notifications;
create policy "notifications: admin insert" on public.notifications
  for insert with check (public.is_admin());
drop policy if exists "notifications: recipient marks read" on public.notifications;
create policy "notifications: recipient marks read" on public.notifications
  for update using (recipient_email = public.jwt_email() or public.is_admin())
  with check (recipient_email = public.jwt_email() or public.is_admin());

-- Activity
drop policy if exists "activity: read" on public.activity;
create policy "activity: read" on public.activity
  for select using (public.is_admin() or public.owns_project(project_id));
drop policy if exists "activity: insert" on public.activity;
create policy "activity: insert" on public.activity
  for insert with check (public.is_admin() or public.owns_project(project_id));

-- ============================================================
-- Storage: private bucket for project files (50 MB per object)
-- ============================================================
insert into storage.buckets (id, name, public, file_size_limit)
values ('project-files', 'project-files', false, 52428800)
on conflict (id) do update set file_size_limit = excluded.file_size_limit;

-- Object paths are '<project_id>/<uuid>-<filename>'.
drop policy if exists "project files: read" on storage.objects;
create policy "project files: read" on storage.objects
  for select using (
    bucket_id = 'project-files'
    and (public.is_admin() or public.owns_project((split_part(name, '/', 1))::uuid))
  );
drop policy if exists "project files: upload" on storage.objects;
create policy "project files: upload" on storage.objects
  for insert with check (
    bucket_id = 'project-files'
    and (public.is_admin() or public.owns_project((split_part(name, '/', 1))::uuid))
  );
drop policy if exists "project files: admin delete" on storage.objects;
create policy "project files: admin delete" on storage.objects
  for delete using (bucket_id = 'project-files' and public.is_admin());

-- ============================================================
-- Bootstrap your first super admin (run AFTER that user has signed
-- in once via magic link — the trigger will have created their profile):
--
--   update public.profiles set role = 'super_admin'
--   where email = 'you@luxavian.id';
--
-- Further role changes can then be done from /admin/team in the UI.
-- ============================================================
