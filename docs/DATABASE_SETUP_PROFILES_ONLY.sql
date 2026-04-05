-- =============================================================================
-- TrueSelf User Profiles Table Setup
-- =============================================================================
-- Run this in Supabase SQL Editor to create the user_profiles table
-- (only for the global psychology profiles, test_results already exists)

-- =============================================================================
-- 1. Create user_profiles table for global psychology profiles
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  dimensions JSONB NOT NULL DEFAULT '{}',
  test_contributions JSONB NOT NULL DEFAULT '{}',
  consistency_score INTEGER DEFAULT 50,
  insights JSONB NOT NULL DEFAULT '{"summary": "", "strengths": [], "weaknesses": [], "blindSpots": []}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT consistency_score_range CHECK (consistency_score >= 0 AND consistency_score <= 100)
);

-- Create index for user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);

-- Create index for updated_at for sorting
CREATE INDEX IF NOT EXISTS idx_user_profiles_updated_at ON public.user_profiles(updated_at DESC);

-- =============================================================================
-- 2. Enable Row Level Security (RLS) for user_profiles
-- =============================================================================

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 3. Create RLS Policies
-- =============================================================================

-- Policy: Users can only SELECT their own profile
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can only INSERT their own profile
CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only UPDATE their own profile
CREATE POLICY "Users can update their own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================================================
-- 4. Grant permissions to authenticated users
-- =============================================================================

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_profiles TO authenticated;

-- =============================================================================
-- That's it! The table is ready.
-- =============================================================================
/*
Your test_results table already exists and is working.
This script only creates the user_profiles table to store global profiles.

After running this:
1. Go to /tests → take a test and submit it
2. Global profile will be calculated and saved to user_profiles
3. Go to /dashboard → should show your profile with spider chart
*/
