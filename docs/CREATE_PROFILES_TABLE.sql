-- =============================================================================
-- TrueSelf Profiles Table - User Profile Information
-- =============================================================================
-- Run this in Supabase SQL Editor to create the profiles table
-- Stores user profile information (name, avatar, bio)

-- =============================================================================
-- 1. Create profiles table
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at DESC);

-- =============================================================================
-- 2. Enable Row Level Security (RLS)
-- =============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 3. Create RLS Policies
-- =============================================================================

CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- =============================================================================
-- 4. Grant permissions to authenticated users
-- =============================================================================

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;

-- =============================================================================
-- Setup Instructions
-- =============================================================================
/*
1. Go to https://supabase.com/dashboard/projects
2. Select your TrueSelf project
3. Click "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy and paste the SQL above (all of it)
6. Click "Run" button
7. Done! The profiles table is now created with RLS policies

The profiles table stores:
- id: User ID (same as auth.users.id)
- name: Display name
- avatar_url: URL to user's avatar image
- bio: Optional bio/description
- created_at: When profile was created
- updated_at: When profile was last updated

After creating this table:
1. Go to /dashboard/profile in your app
2. Update your profile with display name and bio
3. Data will be saved to the profiles table
*/
