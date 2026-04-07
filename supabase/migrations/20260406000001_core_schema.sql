-- Core Database Migration: Extensions and User Profiles

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text unique,
  role text check (role in ('admin', 'student')) default 'student',
  avatar_url text,
  admission_year integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) for Profiles
alter table public.profiles enable row level security;

-- Policy to allow users to see their own profile
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);

-- Policy to allow users to update their own profile
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- ADMIN HELPER FUNCTION: Using "SECURITY DEFINER" to bypass RLS for role checks (Prevents Infinite Recursion)
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer set search_path = public;

-- Policy to allow admins to see all/manage all profiles
create policy "Admins can manage all profiles" on public.profiles for all using (
  public.is_admin()
);

-- Function to handle new user creation from Supabase Auth
drop function if exists public.handle_new_user() cascade;

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, role, admission_year)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.email, 
    'student',
    (new.raw_user_meta_data->>'admission_year')::integer
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call handle_new_user on signup
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
