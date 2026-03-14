-- ============================================
-- WithMe App — Supabase Database Setup
-- Run this entire file in Supabase SQL Editor
-- ============================================

-- Profiles (created automatically on signup)
create table if not exists profiles (
  id uuid references auth.users primary key,
  display_name text,
  email text,
  struggles text[],
  onboarded boolean default false,
  created_at timestamptz default now()
);

-- Circles (support groups)
create table if not exists circles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  struggle_type text,
  is_private boolean default false,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- Safely add columns if table already existed previously
alter table circles add column if not exists is_private boolean default false;
alter table circles add column if not exists created_by uuid references profiles(id);

-- Circle memberships
create table if not exists circle_members (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid references circles(id) on delete cascade,
  user_id uuid references profiles(id),
  joined_at timestamptz default now(),
  unique(circle_id, user_id)
);

-- Posts inside circles
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid references circles(id) on delete cascade,
  user_id uuid references profiles(id),
  content text not null,
  author_name text default 'Anonymous',
  is_anonymous boolean default true,
  created_at timestamptz default now()
);

-- Reactions on circle posts
create table if not exists post_reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references profiles(id),
  reaction_type text,
  created_at timestamptz default now(),
  unique(post_id, user_id, reaction_type)
);

-- Daily check-ins
create table if not exists check_ins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  check_in_date date not null,
  mood_score integer check (mood_score between 1 and 5),
  note text,
  created_at timestamptz default now(),
  unique(user_id, check_in_date)
);

-- Anonymous vents (global feed)
create table if not exists vents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  content text not null,
  created_at timestamptz default now()
);

-- Reactions on vents
create table if not exists vent_reactions (
  id uuid primary key default gen_random_uuid(),
  vent_id uuid references vents(id) on delete cascade,
  user_id uuid references profiles(id),
  reaction_type text,
  created_at timestamptz default now(),
  unique(vent_id, user_id, reaction_type)
);

-- ============================================
-- Row Level Security
-- ============================================
alter table profiles enable row level security;
alter table circles enable row level security;
alter table circle_members enable row level security;
alter table posts enable row level security;
alter table post_reactions enable row level security;
alter table check_ins enable row level security;
alter table vents enable row level security;
alter table vent_reactions enable row level security;

-- Public read policies
create policy "Public read circles" on circles for select using (true);
create policy "Public read members" on circle_members for select using (true);

-- Posts are only readable if the circle is public OR the user is a member
create policy "Read posts" on posts for select using (
  exists (select 1 from circles where id = circle_id and is_private = false) or
  exists (select 1 from circle_members where circle_id = posts.circle_id and user_id = auth.uid())
);

create policy "Public read post_reactions" on post_reactions for select using (true);
create policy "Public read checkins" on check_ins for select using (true);
create policy "Public read vents" on vents for select using (true);
create policy "Public read vent_reactions" on vent_reactions for select using (true);

-- Authenticated write policies
create policy "Own profile" on profiles for all using (auth.uid() = id);
create policy "Join circles" on circle_members for insert with check (auth.uid() = user_id);
create policy "Post in circles" on posts for insert with check (auth.uid() = user_id);
create policy "React to posts" on post_reactions for all using (auth.uid() = user_id);
create policy "Check in" on check_ins for all using (auth.uid() = user_id);
create policy "Create vent" on vents for insert with check (auth.uid() = user_id);
create policy "React to vents" on vent_reactions for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- Seed starter circles (Public)
-- ============================================
insert into circles (name, description, struggle_type, is_private) values
  ('Anxiety Support', 'A safe space for people dealing with anxiety, panic, and overthinking. You are not alone.', 'anxiety', false),
  ('Grief & Loss', 'For those navigating loss in all its forms — a person, a relationship, a dream.', 'grief', false),
  ('Burnout Recovery', 'You gave too much for too long. Let''s find our way back together.', 'burnout', false),
  ('Loneliness & Connection', 'For anyone who feels invisible or disconnected from the world.', 'loneliness', false),
  ('Low Mood', 'No pressure. No performance. Just presence and understanding.', 'depression', false),
  ('Relationship Pain', 'Heartbreak, conflict, trust issues — all of it is welcome here.', 'relationships', false),
  ('Health Anxiety', 'For those whose minds go to the worst-case health scenarios.', 'health', false),
  ('Big Life Changes', 'Job loss, moving, divorce, transitions — change is hard. We get it.', 'life_change', false)
on conflict do nothing;
