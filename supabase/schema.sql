-- Wellness Connector MVP schema
-- Run in the Supabase SQL editor after enabling Google and Facebook OAuth.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  avatar_url text,
  auth_provider text not null check (auth_provider in ('google', 'facebook')),
  wellness_archetype text check (
    wellness_archetype in ('grounded', 'social', 'creative', 'movement', 'builder')
  ),
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null,
  date_time timestamptz not null,
  location text not null,
  format text not null check (format in ('In-person', 'Online', 'Hybrid')),
  price numeric(10, 2) not null default 0 check (price >= 0),
  host_name text not null,
  host_id uuid references public.profiles(id) on delete set null,
  is_sponsored boolean not null default false,
  sponsor_name text,
  is_community boolean not null default false,
  booking_url text,
  accessibility_notes text,
  comfort_level text,
  beginner_friendly boolean not null default true,
  max_attendees integer check (max_attendees > 0),
  status text not null default 'pending' check (
    status in ('pending', 'active', 'paused', 'rejected')
  ),
  created_at timestamptz not null default now()
);

create table if not exists public.saved_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, event_id)
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, event_id)
);

create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  archetype text not null check (
    archetype in ('grounded', 'social', 'creative', 'movement', 'builder')
  ),
  answers_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.event_reports (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  reporter_id uuid references public.profiles(id) on delete set null,
  reason text not null,
  status text not null default 'open' check (status in ('open', 'reviewed', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.saved_events enable row level security;
alter table public.subscriptions enable row level security;
alter table public.quiz_results enable row level security;
alter table public.event_reports enable row level security;

create policy "Profiles are readable by their owner"
  on public.profiles for select using (auth.uid() = id);
create policy "Profiles are editable by their owner"
  on public.profiles for update using (auth.uid() = id);

create policy "Active events are public"
  on public.events for select using (status = 'active' or auth.uid() = host_id);
create policy "Signed-in members can submit events"
  on public.events for insert with check (auth.uid() = host_id);
create policy "Hosts can update their own events"
  on public.events for update using (auth.uid() = host_id);

create policy "Members manage their saved events"
  on public.saved_events for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "Members manage their subscriptions"
  on public.subscriptions for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "Members manage their quiz results"
  on public.quiz_results for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "Members can submit reports"
  on public.event_reports for insert with check (
    reporter_id is null or auth.uid() = reporter_id
  );

-- Create a profile row after the first OAuth sign-in.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name, email, avatar_url, auth_provider)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', 'Wellness member'),
    coalesce(new.email, ''),
    new.raw_user_meta_data ->> 'avatar_url',
    case when new.raw_app_meta_data ->> 'provider' = 'facebook' then 'facebook' else 'google' end
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
