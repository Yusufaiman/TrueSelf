# Fixing the "Error saving test result" Issue

## Problem

You're seeing this error when trying to save a test result:
```
Error saving test result: {}
```

There are two potential causes:

### ❌ **Cause 1: Missing `scores` Column** (Most Likely)

The application code tries to save:
```javascript
{
  user_id: user.id,
  test_type: testType,
  scores: {...},        // ← This column was missing!
  result: {...},
  created_at: new Date().toISOString(),
}
```

But the original `test_results` table schema **didn't include** a `scores` column.

### ❌ **Cause 2: Table Doesn't Exist**

If you haven't run the DATABASE_SETUP.sql yet, the table doesn't exist at all.

---

## Solution

### Step 1: Drop the Old Table (If It Exists)

If you already created the table without the `scores` column, you need to delete it first.

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Click **New Query**
3. Run this:
   ```sql
   DROP TABLE IF EXISTS public.test_results;
   ```
4. You should see: ✅ **"Query executed successfully"**

### Step 2: Run the Updated Database Setup

Now run the updated `DATABASE_SETUP.sql` which includes the `scores` column:

1. Go to **SQL Editor** → **New Query**
2. Open `docs/DATABASE_SETUP.sql` from your project
3. Copy **all** the SQL code
4. Paste it in the Supabase SQL Editor
5. Click **Run**
6. You should see: ✅ **"Query executed successfully"**

### Step 3: Test in Your App

1. Go to [http://localhost:3000/tests/identity/who-you-really-are](http://localhost:3000/tests/identity/who-you-really-are)
2. Complete the test
3. Click "Get Your Results"
4. You should now be able to save without errors! 🎉

---

## What Changed

### Updated Table Schema

**Before:**
```sql
CREATE TABLE public.test_results (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  test_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  result JSONB NOT NULL
);
```

**After:**
```sql
CREATE TABLE public.test_results (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  test_type VARCHAR(50) NOT NULL,
  scores JSONB,              -- ← NEW!
  result JSONB NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

The `scores` column now exists and can store the test scoring data.

---

## Troubleshooting

### ❌ "Table already exists" Error

Solution: Run this first to drop the old table:
```sql
DROP TABLE IF EXISTS public.test_results;
```

Then run the full DATABASE_SETUP.sql again.

### ❌ Still Getting Error After Setup

1. **Clear your browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

2. **Restart dev server:**
   - Stop: `Ctrl+C` in terminal
   - Start: `npm run dev`

3. **Verify the table exists:**
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' AND table_name = 'test_results';
   ```

4. **Check the columns:**
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'test_results';
   ```

You should see:
- id (uuid)
- user_id (uuid)
- test_type (character varying)
- scores (jsonb)          ← ✅ Must exist!
- result (jsonb)
- created_at (timestamp with time zone)
- updated_at (timestamp with time zone)

### ❌ "Permission denied" Error

Check RLS policies are enabled:
1. Supabase Dashboard → **Authentication** → **Policies**
2. You should see 4 policies for `test_results`:
   - Users can view their own test results
   - Users can insert their own test results
   - Users can update their own test results
   - Users can delete their own test results

---

## Complete Workflow

After this fix, here's what happens:

1. ✅ User takes a test at `/tests/identity/who-you-really-are`
2. ✅ Test completes and shows results
3. ✅ Result is saved to `test_results` table:
   - `user_id` - who took the test
   - `test_type` - which test (test_1, test_2, etc)
   - `scores` - the scoring data
   - `result` - the full result including title, patterns, insights
4. ✅ User can view all results in `/dashboard`
5. ✅ User can see analytics and progress tracking

---

## Summary

| Issue | Cause | Solution |
|-------|-------|----------|
| "Error saving test result: {}" | Missing `scores` column | Drop old table + run updated DATABASE_SETUP.sql |
| Table doesn't exist | Never ran setup | Run DATABASE_SETUP.sql from `docs/` folder |
| RLS permission errors | Policies not enabled | Run DATABASE_SETUP.sql (creates policies) |

**One setup = All problems fixed!** ✅

Run the DATABASE_SETUP.sql from `docs/DATABASE_SETUP.sql` and you'll be good to go.
