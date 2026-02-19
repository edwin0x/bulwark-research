create type public.engagement_status as enum ('submitted', 'researching', 'analyzing', 'complete');

create type public.research_lens as enum (
  'bootstrapper', 'vc_scale', 'lifestyle', 'side_project', 'agency_productized', 'open_source'
);

create table public.engagements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  idea_description text not null,
  research_lens public.research_lens not null,
  target_market text,
  known_competitors text,
  specific_questions text,
  geography_focus text,
  status public.engagement_status not null default 'submitted',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.engagements enable row level security;

create policy "Users can read own engagements"
  on public.engagements for select using (auth.uid() = user_id);

create policy "Users can insert own engagements"
  on public.engagements for insert with check (auth.uid() = user_id);

create or replace function public.handle_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger on_engagement_updated
  before update on public.engagements
  for each row execute function public.handle_updated_at();

create index idx_engagements_user_created on public.engagements (user_id, created_at desc);
