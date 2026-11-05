-- ============================================================================
-- Polski Hub — Supabase PostgreSQL Schema & Row-Level Security (RLS)
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================================

-- 1. USERS TABLE (1:1 profile linked to Supabase auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  native_language text not null default 'ru' check (native_language in ('en', 'ru', 'tr')),
  current_level text not null default 'A1.1' check (current_level in ('A1.1', 'A1.2', 'A2', 'B1', 'B2')),
  placement_score integer check (placement_score between 0 and 100),
  unlocked_up_to_order integer not null default 1,
  total_xp integer not null default 0,
  has_completed_onboarding boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. USER_PROGRESS TABLE (tracks each completed/unlocked lesson module per user)
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  module_id text not null,
  score integer not null default 0 check (score between 0 and 100),
  attempts integer not null default 1,
  is_completed boolean not null default true,
  completed_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, module_id)
);

create index if not exists idx_user_progress_user_id on public.user_progress (user_id);

-- 3. AUTO-CREATE PROFILE ROW ON AUTH SIGN-UP (Email/Password or Google OAuth)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, native_language, current_level)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'native_language', 'ru'),
    'A1.1'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. ROW-LEVEL SECURITY (RLS) POLICIES
alter table public.users enable row level security;
alter table public.user_progress enable row level security;

create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.users for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can view their own module progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own module progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own module progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

create policy "Users can delete their own module progress"
  on public.user_progress for delete
  using (auth.uid() = user_id);
