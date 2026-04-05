-- =============================================================================
-- TrueSelf User Profiles Table - RECREATE (Drop & Rebuild)
-- =============================================================================
-- Use this if you get "policy already exists" error
-- This safely drops the old table and creates a fresh one

-- =============================================================================
-- 1. Drop existing user_profiles table (if exists)
-- =============================================================================

DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- =============================================================================
-- 2. Create fresh user_profiles table
-- =============================================================================

CREATE TABLE public.user_profiles (
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

-- Create indexes
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX idx_user_profiles_updated_at ON public.user_profiles(updated_at DESC);

-- =============================================================================
-- 3. Enable Row Level Security
-- =============================================================================

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 4. Create RLS Policies
-- =============================================================================

CREATE POLICY "Users can view their own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================================================
-- 5. Grant permissions
-- =============================================================================

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_profiles TO authenticated;

-- =============================================================================
-- Done! Table is ready
-- =============================================================================
