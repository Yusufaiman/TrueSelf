-- =============================================================================
-- TrueSelf Database Setup
-- =============================================================================
-- This script sets up the test_results table with RLS policies for Supabase
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/[YOUR_PROJECT]/sql

-- =============================================================================
-- 1. Create test_results table
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_type VARCHAR(50) NOT NULL,
  scores JSONB,
  result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create index for user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_test_results_user_id ON public.test_results(user_id);

-- Create index for created_at for ordering
CREATE INDEX IF NOT EXISTS idx_test_results_created_at ON public.test_results(created_at DESC);

-- Create index for test_type
CREATE INDEX IF NOT EXISTS idx_test_results_test_type ON public.test_results(test_type);

-- =============================================================================
-- 2. Enable Row Level Security (RLS)
-- =============================================================================

ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 3. Create RLS Policies
-- =============================================================================

-- Policy: Users can only SELECT their own test results
CREATE POLICY "Users can view their own test results"
  ON public.test_results
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can only INSERT their own test results
CREATE POLICY "Users can insert their own test results"
  ON public.test_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only UPDATE their own test results
CREATE POLICY "Users can update their own test results"
  ON public.test_results
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can only DELETE their own test results
CREATE POLICY "Users can delete their own test results"
  ON public.test_results
  FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================================================
-- 4. Create user_profiles table for global psychology profiles
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

-- Enable Row Level Security (RLS) for user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only SELECT their own profile
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can only INSERT their own profile
CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can only UPDATE their own profile
CREATE POLICY "Users can update their own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_profiles TO authenticated;

-- =============================================================================
-- 5. Grant permissions to authenticated users
-- =============================================================================

GRANT SELECT, INSERT, UPDATE, DELETE ON public.test_results TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- =============================================================================
-- 6. Optional: Insert sample data for testing
-- =============================================================================

-- Insert sample test result (you'll need to replace the user_id with a real user)
-- Uncomment and modify the user_id before running:
/*
INSERT INTO public.test_results (user_id, test_type, result)
VALUES (
  'YOUR_USER_ID_HERE',
  'test_1',
  jsonb_build_object(
    'title', 'Identity Profile',
    'description', 'Sample identity test result',
    'pattern', 'The Individual'
  )
);
*/

-- =============================================================================
-- 7. Setup Instructions
-- =============================================================================
/*
1. Go to https://supabase.com/dashboard/projects
2. Select your TrueSelf project
3. Click "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy and paste the SQL above (all of it)
6. Click "Run" button
7. Both tables (test_results and user_profiles) are now created with RLS policies

Tables Created:
- test_results: Stores individual test submissions
- user_profiles: Stores aggregated global psychology profiles (12 dimensions)

To test:
- Navigate to /dashboard in your app
- Sign in with your test account
- Dashboard will initially show "Loading..." or empty state (no profile yet)
- Take a test and submit it
- The global profile will be calculated and saved to user_profiles
- Dashboard will then display the unified psychological profile

Expected Flow:
1. User takes test → saved to test_results
2. Test completion triggers processGlobalProfile()
3. Global profile calculated across all dimensions
4. Profile saved to user_profiles
5. Dashboard fetches and displays user_profiles data
6. Shows spider chart, insights, recommendations

Troubleshooting:
- Check Supabase SQL Editor for any error messages
- Ensure the auth.users table exists (it should be created by Supabase automatically)
- Verify RLS is enabled: go to Authentication > Policies tab
- Make sure your user is authenticated when querying
- Verify both tables exist: go to Database > Tables and look for test_results and user_profiles
- Check console logs for detailed error messages (now includes error codes)

If you see "Error fetching profile: {Code: PGRST116}":
- This is NORMAL if you haven't taken any tests yet
- The profile will be created after you complete your first test
- See "Expected Flow" above

Database Queries:
- View all profiles: SELECT * FROM user_profiles;
- View specific user profile: SELECT * FROM user_profiles WHERE user_id = 'YOUR_USER_ID';
- View test results: SELECT * FROM test_results WHERE user_id = 'YOUR_USER_ID';
*/
