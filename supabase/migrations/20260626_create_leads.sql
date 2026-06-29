create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  message text,
  preferred_plan text,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  page_url text,
  referrer text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

drop policy if exists "Public users cannot read leads" on public.leads;
create policy "Public users cannot read leads"
on public.leads
for select
to anon, public
using (false);

drop policy if exists "Public users cannot update leads" on public.leads;
create policy "Public users cannot update leads"
on public.leads
for update
to anon, public
using (false)
with check (false);

drop policy if exists "Public users cannot insert leads" on public.leads;
create policy "Public users cannot insert leads"
on public.leads
for insert
to anon, public
with check (false);

drop policy if exists "Admins can manage leads" on public.leads;
create policy "Admins can manage leads"
on public.leads
for all
to authenticated
using ((auth.jwt() ->> 'role') = 'admin')
with check ((auth.jwt() ->> 'role') = 'admin');

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_status_idx on public.leads (status);
