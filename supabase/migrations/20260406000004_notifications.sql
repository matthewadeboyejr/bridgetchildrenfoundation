-- Notifications System

-- Notifications Table
create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) for Notifications
alter table public.notifications enable row level security;

create policy "Users can manage own notifications" on public.notifications for all using (user_id = auth.uid());
