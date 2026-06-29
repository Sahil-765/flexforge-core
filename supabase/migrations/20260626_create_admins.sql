create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

drop policy if exists "Public users cannot read admins" on public.admins;
create policy "Public users cannot read admins"
on public.admins
for select
to anon, public
using (false);

drop policy if exists "Public users cannot insert admins" on public.admins;
create policy "Public users cannot insert admins"
on public.admins
for insert
to anon, public
with check (false);

drop policy if exists "Public users cannot update admins" on public.admins;
create policy "Public users cannot update admins"
on public.admins
for update
to anon, public
using (false)
with check (false);

drop policy if exists "Public users cannot delete admins" on public.admins;
create policy "Public users cannot delete admins"
on public.admins
for delete
to anon, public
using (false);

drop policy if exists "Admins can manage admins" on public.admins;
create policy "Admins can manage admins"
on public.admins
for all
to authenticated
using ((auth.jwt() ->> 'role') = 'admin')
with check ((auth.jwt() ->> 'role') = 'admin');

create index if not exists admins_email_idx on public.admins (email);
