-- Scholarship Programs and Applications

-- Scholarship Programs
create table public.scholarships (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  deadline timestamp with time zone,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Applications (Requires Authenticated Student Profile)
create table public.applications (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) on delete cascade not null,
  scholarship_id uuid references public.scholarships(id) on delete cascade not null,
  status text check (status in ('pending', 'under_review', 'approved', 'rejected')) default 'pending',
  academic_records jsonb, -- Store grades, certifications
  personal_statement text,
  references_info jsonb,
  submission_date timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Scholarships
alter table public.scholarships enable row level security;

create policy "Everyone can view active scholarships" on public.scholarships for select using (is_active = true);

create policy "Admins can manage scholarships" on public.scholarships for all using (
  public.is_admin()
);

-- RLS for Applications
alter table public.applications enable row level security;

create policy "Students can manage own applications" on public.applications for all using (student_id = auth.uid());

create policy "Admins can manage all applications" on public.applications for all using (
  public.is_admin()
);
