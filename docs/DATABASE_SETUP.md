# TrueSelf Database Setup Guide

## Problem

You're seeing this error in the console:

```
Error fetching results - Code: "PGRST205"
Error fetching results - Message: "Could not find the table 'public.test_results' in the schema cache"
Error fetching results - Status: 404
```

This means the `test_results` table doesn't exist in your Supabase PostgreSQL database.

---

## Solution: Create the Database Table

### Step 1: Open Supabase SQL Editor

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/projects)
2. Click on your **TrueSelf** project
3. In the left sidebar, click **SQL Editor**
4. Click **New Query** button (top right)

### Step 2: Copy the SQL Setup Script

Open the file: `docs/DATABASE_SETUP.sql` in your project

Copy **all the SQL code** from that file.

### Step 3: Paste and Run

1. In the Supabase SQL Editor, paste the code into the query box
2. Click the **Run** button (or press `Cmd+Enter` / `Ctrl+Enter`)
3. You should see: ✅ **"Query executed successfully"**

### Step 4: Verify the Table Was Created

1. Go to **SQL Editor** → **New Query**
2. Run this verification query:
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public' AND table_name = 'test_results';
   ```
3. You should see one row with `test_results` in the result

---

## What Was Created

The SQL script creates:

### 1. **test_results Table**

```
- id: UUID (auto-generated)
- user_id: UUID (links to auth.users)
- test_type: VARCHAR(50) (e.g., "test_1", "test_2")
- created_at: TIMESTAMP (automatic)
- updated_at: TIMESTAMP (auto-updated)
- result: JSONB (stores test result data as JSON)
```

### 2. **Indexes** (for performance)

- `user_id` - Fast lookups by user
- `created_at` - Fast ordering by date
- `test_type` - Fast filtering by test type

### 3. **Row Level Security (RLS) Policies**

- Users can only see/modify **their own** test results
- Automatically enforced by Supabase
- No one can access another user's data

---

## Testing the Setup

### Test in Your App

1. Go to [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
2. Sign in with your test account
3. Go to [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
4. The errors should be gone
5. You'll see "No test results yet" message (until you take a test)

### Manually Insert Sample Data (Optional)

If you want to test with sample data:

1. Go to **SQL Editor** → **New Query**
2. First, get a real user_id:
   ```sql
   SELECT id, email FROM auth.users LIMIT 1;
   ```
3. Copy that user ID
4. Run this insert:

   ```sql
   INSERT INTO public.test_results (user_id, test_type, result)
   VALUES (
     'YOUR_USER_ID_HERE',
     'test_1',
     jsonb_build_object(
       'title', 'Who You Really Are',
       'description', 'Sample identity profile',
       'pattern', 'The Individualist'
     )
   );
   ```

5. Refresh your dashboard - you should now see this test result!

---

## Troubleshooting

### ❌ "Syntax Error" when running SQL

- Make sure you copied the **entire** SQL script
- Check that special characters copied correctly
- Try running smaller sections first

### ❌ "Permission denied" error

- Make sure you're using a Supabase admin account
- Go to **Settings** → **Access Control** if issues persist

### ❌ Table created but still getting 404 error

1. Verify RLS is enabled:
   - Go to **Authentication** → **Policies**
   - You should see 4 policies for `test_results`

2. Clear browser cache:
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

3. Restart dev server:
   - Stop: `Ctrl+C` in terminal
   - Start: `npm run dev`

### ❌ Still getting errors?

Check the Supabase logs:

1. Go to **Logs** in sidebar
2. Click **API** tab
3. Look for requests to `/rest/v1/test_results`
4. See the actual error response

---

## File Structure

```
project/
├── docs/
│   └── DATABASE_SETUP.sql    ← The setup script
├── utils/supabase/
│   └── client-results.ts     ← Queries this table
├── components/dashboard/
│   ├── OverviewPage.tsx      ← Displays results
│   ├── MyResultsPage.tsx
│   ├── AnalyticsPage.tsx
│   └── ProgressPage.tsx
```

---

## Next Steps

Once the table is created:

1. ✅ Dashboard loads without errors
2. 🎯 Users can save test results when they complete a test
3. 📊 View results in dashboard
4. 📈 Track progress over time
5. 🔒 All data is secure (RLS policies enforce user isolation)

---

## Database Schema Reference

### test_results Table

| Column       | Type        | Description                            |
| ------------ | ----------- | -------------------------------------- |
| `id`         | UUID        | Primary key                            |
| `user_id`    | UUID        | Foreign key to auth.users              |
| `test_type`  | VARCHAR(50) | Test identifier (test_1, test_2, etc.) |
| `created_at` | TIMESTAMP   | When result was created                |
| `updated_at` | TIMESTAMP   | When result was last updated           |
| `result`     | JSONB       | Test result data (flexible JSON)       |

### Sample Result Data

```json
{
  "title": "Who You Really Are",
  "description": "Your core identity profile",
  "pattern": "The Individual",
  "score": 85,
  "traits": ["authentic", "independent", "thoughtful"]
}
```

---

## Security

✅ **Row Level Security (RLS) Enabled**

- Each user can only access their own test results
- Database enforces this at the query level
- Impossible for users to access other users' data

✅ **Encrypted in Transit**

- All data sent over HTTPS/SSL
- Supabase provides automatic encryption

✅ **Encrypted at Rest** (Supabase Pro)

- Data stored encrypted in PostgreSQL
- Available with Professional plan

---

## Support

If you encounter issues:

1. Check [Supabase Docs](https://supabase.com/docs)
2. Check [PostgreSQL Error Codes](https://www.postgresql.org/docs/current/errcodes-appendix.html)
3. Review the SQL script in `docs/DATABASE_SETUP.sql`

---

**Status:** Follow these steps and your dashboard will work! 🚀
