-- Supabase schema for MaximizeHub

create table if not exists subjects (
  id uuid primary key default uuid_generate_v4(),
  name text not null
);

create table if not exists resources (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  subject text not null,
  topic text not null,
  level text not null,
  campus text not null,
  type text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists mcqs (
  id uuid primary key default uuid_generate_v4(),
  question text not null,
  options jsonb not null,
  correct_answer text not null,
  explanation text not null,
  subject text not null,
  topic text not null,
  level text not null,
  campus text not null,
  created_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key,
  email text,
  role text not null default 'student'
);

-- Enable row level security and policies for admin-only write operations.

alter table resources enable row level security;
alter table mcqs enable row level security;
alter table users enable row level security;

create policy "Allow read public resources" on resources
  for select using (true);

create policy "Allow insert admin resources" on resources
  for insert using (auth.role() = 'authenticated');

create policy "Allow delete admin resources" on resources
  for delete using (auth.role() = 'authenticated');

create policy "Allow read public mcqs" on mcqs
  for select using (true);

create policy "Allow insert admin mcqs" on mcqs
  for insert using (auth.role() = 'authenticated');

create policy "Allow read users" on users
  for select using (auth.role() = 'authenticated');

create policy "Allow insert users" on users
  for insert using (auth.role() = 'authenticated');
