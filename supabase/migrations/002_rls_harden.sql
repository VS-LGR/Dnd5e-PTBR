-- Harden RLS for projects that already ran an older 001_init.
-- Safe to re-run. Prefer running the full updated 001_init.sql on empty projects.

alter table public.profiles enable row level security;
alter table public.characters enable row level security;
alter table public.profiles force row level security;
alter table public.characters force row level security;

alter table public.characters
  drop constraint if exists characters_level_positive;
alter table public.characters
  add constraint characters_level_positive check (level >= 1 and level <= 20);

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_delete_own" on public.profiles;
drop policy if exists "characters_select_own" on public.characters;
drop policy if exists "characters_insert_own" on public.characters;
drop policy if exists "characters_update_own" on public.characters;
drop policy if exists "characters_delete_own" on public.characters;

create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  to authenticated
  using (auth.uid() = id);

create policy "characters_select_own"
  on public.characters for select
  to authenticated
  using (auth.uid() = user_id);

create policy "characters_insert_own"
  on public.characters for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "characters_update_own"
  on public.characters for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "characters_delete_own"
  on public.characters for delete
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.characters_immutable_owner()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' and new.user_id is distinct from old.user_id then
    raise exception 'characters.user_id is immutable';
  end if;
  return new;
end;
$$;

drop trigger if exists characters_immutable_owner on public.characters;
create trigger characters_immutable_owner
  before update on public.characters
  for each row execute function public.characters_immutable_owner();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke all on table public.profiles from anon;
revoke all on table public.characters from anon;
grant select, insert, update, delete on table public.profiles to authenticated;
grant select, insert, update, delete on table public.characters to authenticated;
