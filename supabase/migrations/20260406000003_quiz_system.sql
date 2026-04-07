-- Quiz Registration System (Public)

-- Quiz Registrations Table
create table public.quiz_registrations (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text not null,
  phone text,
  school_name text not null,
  current_class text not null,
  interest_in_science text not null,
  last_class_position text not null,
  number_of_student_in_class text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Quiz Registrations
alter table public.quiz_registrations enable row level security;

-- Allow public to insert registrations
create policy "Public can register for quiz" on public.quiz_registrations for insert with check (true);

-- Allow admins to view all registrations
create policy "Admins can view quiz registrations" on public.quiz_registrations for select using (
  public.is_admin()
);
