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
-- 4. Grant permissions to authenticated users
-- =============================================================================

GRANT SELECT, INSERT, UPDATE, DELETE ON public.test_results TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- =============================================================================
-- 5. Optional: Insert sample data for testing
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
-- Setup Instructions
-- =============================================================================
/*
1. Go to https://supabase.com/dashboard/projects
2. Select your TrueSelf project
3. Click "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy and paste the SQL above (all of it)
6. Click "Run" button
7. Done! The table is now created with RLS policies

To test:
- Navigate to /dashboard in your app
- Sign in with your test account
- The dashboard should now load test results (or show empty state if no results)

Troubleshooting:
- Check Supabase SQL Editor for any error messages
- Ensure the auth.users table exists (it should be created by Supabase automatically)
- Verify RLS is enabled: go to Authentication > Policies tab
- Make sure your user is authenticated when querying
*/
