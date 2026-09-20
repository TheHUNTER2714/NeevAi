-- ==============================================================================
-- LearnLens AI (ShikshaLens) — Supabase PostgreSQL Schema
-- Project: sonicflow (Ref: ydzsrsxsjokajziimbxz)
-- For Foundational Literacy & Numeracy (FLN) & Teaching at the Right Level (TaRL)
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. SCHOOLS & TEACHERS
create table if not exists schools (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  udise_code text,
  district text not null,
  state text not null,
  created_at timestamp with time zone default now()
);

create table if not exists teachers (
  id uuid primary key default uuid_generate_v4(),
  school_id uuid references schools(id) on delete set null,
  name text not null,
  email text unique,
  phone text,
  school_name text not null,
  district text not null,
  state text not null,
  created_at timestamp with time zone default now()
);

-- 2. CLASSES
create table if not exists classes (
  id uuid primary key default uuid_generate_v4(),
  teacher_id uuid references teachers(id) on delete cascade,
  name text not null, -- e.g. "Class 3 - Section A"
  grade text not null, -- e.g. "Grade 3"
  section text not null, -- e.g. "A"
  academic_year text default '2025-2026',
  created_at timestamp with time zone default now()
);

-- 3. STUDENTS
create table if not exists students (
  id uuid primary key default uuid_generate_v4(),
  class_id uuid references classes(id) on delete cascade,
  roll_no integer not null,
  name text not null,
  name_hi text,
  age integer default 8,
  gender text default 'other',
  status text default 'unassessed', -- 'on_track', 'attention', 'intervention', 'excelling', 'unassessed'
  current_level text default 'Grade 1.0',
  current_level_hi text default 'कक्षा 1.0',
  tarl_group text default 'Group A — Beginner',
  tarl_group_hi text default 'समूह क — शुरुआती',
  attendance text default '90%',
  primary_gap text,
  primary_gap_hi text,
  secondary_gap text,
  secondary_gap_hi text,
  skills jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

-- 4. ASSESSMENTS (FLN & TaRL Screeners)
create table if not exists assessments (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references students(id) on delete cascade,
  test_date timestamp with time zone default now(),
  literacy_score integer default 0,
  numeracy_score integer default 0,
  wcpm integer default 0,
  accuracy integer default 0,
  math_problem text default '52 - 27',
  student_math_answer text,
  detected_misconception text,
  cognitive_diagnosis text,
  recommended_tarl_group text,
  raw_answers jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

-- 5. LEARNING IMPROVEMENT CYCLES
-- Assess -> Analyze -> Identify Gaps -> Intervene -> Reassess -> Measure
create table if not exists learning_cycles (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references students(id) on delete cascade,
  cycle_name text not null, -- e.g. "Cycle 1: 2-Digit Subtraction with Regrouping"
  baseline_score integer not null,
  baseline_level text not null,
  target_gap text not null,
  intervention_applied text not null, -- e.g. "10-Rupee Note & Coin Exchange Game (15-min station)"
  intervention_date timestamp with time zone default now(),
  reassessment_score integer,
  reassessment_level text,
  reassessment_date timestamp with time zone,
  growth_percentage integer,
  status text default 'in_progress', -- 'in_progress', 'gap_closed', 'needs_further_support'
  created_at timestamp with time zone default now()
);

-- Row Level Security (RLS) policies for open access / demo use
alter table schools enable row level security;
alter table teachers enable row level security;
alter table classes enable row level security;
alter table students enable row level security;
alter table assessments enable row level security;
alter table learning_cycles enable row level security;

create policy "Allow anonymous read access" on schools for select using (true);
create policy "Allow anonymous read access" on teachers for select using (true);
create policy "Allow anonymous read access" on classes for select using (true);
create policy "Allow anonymous read access" on students for select using (true);
create policy "Allow anonymous read access" on assessments for select using (true);
create policy "Allow anonymous read access" on learning_cycles for select using (true);

create policy "Allow anonymous insert access" on teachers for insert with check (true);
create policy "Allow anonymous insert access" on classes for insert with check (true);
create policy "Allow anonymous insert access" on students for insert with check (true);
create policy "Allow anonymous insert access" on assessments for insert with check (true);
create policy "Allow anonymous insert access" on learning_cycles for insert with check (true);
