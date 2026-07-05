-- ============================================================
-- Luxavian Client Portal & CRM — Supabase schema
-- Run this in the Supabase SQL editor (or `supabase db push`).
-- ============================================================

-- ---------- Profiles (mirrors auth.users) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text,
  company text,
  phone text,
  role text not null default 'client' check (role in ('client', 'admin')),
  created_at timestamptz not null default now()
);

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

-- Helper used by every RLS policy below.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- The signed-in user's email (magic-link users always have one).
create or replace function public.jwt_email()
returns text
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', ''));
$$;

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

-- Anonymous visitors submit the consultation through this RPC only —
-- there is no table-level insert grant. It generates LX-YYYY-NNNNNN.
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
begin
  if p_email is null or p_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'A valid email is required';
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

-- ---------- Notes ----------
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  body text not null,
  internal boolean not null default false,
  author_name text not null default 'Luxavian',
  created_at timestamptz not null default now()
);

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

create index if not exists notifications_recipient_idx on public.notifications (recipient_email);

-- ---------- Activity ----------
create table if not exists public.activity (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  kind text not null,
  summary text not null,
  actor_name text not null default '',
  created_at timestamptz not null default now()
);

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
create policy "profiles: own row" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "profiles: update own" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid() and role = 'client');

-- Projects
create policy "projects: client reads own" on public.projects
  for select using (client_email = public.jwt_email() or public.is_admin());
create policy "projects: admin updates" on public.projects
  for update using (public.is_admin()) with check (public.is_admin());
create policy "projects: admin deletes" on public.projects
  for delete using (public.is_admin());

-- Files
create policy "files: read" on public.files
  for select using (public.is_admin() or public.owns_project(project_id));
create policy "files: insert" on public.files
  for insert with check (public.is_admin() or public.owns_project(project_id));
create policy "files: admin delete" on public.files
  for delete using (public.is_admin());

-- Meetings
create policy "meetings: read" on public.meetings
  for select using (public.is_admin() or public.owns_project(project_id));
create policy "meetings: admin write" on public.meetings
  for insert with check (public.is_admin());
create policy "meetings: admin update" on public.meetings
  for update using (public.is_admin());
create policy "meetings: admin delete" on public.meetings
  for delete using (public.is_admin());

-- Notes: clients only ever see non-internal notes on their own projects.
create policy "notes: read" on public.notes
  for select using (
    public.is_admin() or (public.owns_project(project_id) and internal = false)
  );
create policy "notes: admin insert" on public.notes
  for insert with check (public.is_admin());
create policy "notes: admin delete" on public.notes
  for delete using (public.is_admin());

-- Notifications
create policy "notifications: recipient reads" on public.notifications
  for select using (recipient_email = public.jwt_email() or public.is_admin());
create policy "notifications: admin insert" on public.notifications
  for insert with check (public.is_admin());
create policy "notifications: recipient marks read" on public.notifications
  for update using (recipient_email = public.jwt_email() or public.is_admin())
  with check (recipient_email = public.jwt_email() or public.is_admin());

-- Activity
create policy "activity: read" on public.activity
  for select using (public.is_admin() or public.owns_project(project_id));
create policy "activity: insert" on public.activity
  for insert with check (public.is_admin() or public.owns_project(project_id));

-- ============================================================
-- Storage: private bucket for project files
-- ============================================================
insert into storage.buckets (id, name, public)
values ('project-files', 'project-files', false)
on conflict (id) do nothing;

-- Object paths are '<project_id>/<uuid>-<filename>'.
create policy "project files: read" on storage.objects
  for select using (
    bucket_id = 'project-files'
    and (public.is_admin() or public.owns_project((split_part(name, '/', 1))::uuid))
  );
create policy "project files: upload" on storage.objects
  for insert with check (
    bucket_id = 'project-files'
    and (public.is_admin() or public.owns_project((split_part(name, '/', 1))::uuid))
  );
create policy "project files: admin delete" on storage.objects
  for delete using (bucket_id = 'project-files' and public.is_admin());

-- ============================================================
-- Promote an admin (run manually after that user signs in once):
--   update public.profiles set role = 'admin' where email = 'you@luxavian.id';
-- ============================================================
