# Profile Save Error - Root Cause & Solution

## 🔴 The Problem

**Error**: "Error saving profile: {}"

**Root Cause**: The `profiles` table doesn't exist in Supabase yet. When you tried to save your profile, the app tried to insert data into a table that wasn't created.

---

## ✅ The Fix (3 Steps)

### Step 1: Create the Profiles Table

1. Open **[Supabase Dashboard](https://supabase.com/dashboard/projects)**
2. Select your **TrueSelf project**
3. Click **"SQL Editor"** → **"New Query"**
4. Copy this SQL and run it:

```sql
DROP TABLE IF EXISTS public.profiles CASCADE;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_created_at
  ON public.profiles(created_at DESC);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
```

Expected output:

```
Query executed successfully (0 rows affected)
```

### Step 2: Verify Table Creation

1. Go to **Table Editor** in Supabase sidebar
2. Look for the `profiles` table (should be there, 0 rows)
3. Check columns: `id`, `name`, `avatar_url`, `bio`, `created_at`, `updated_at`

### Step 3: Test Profile Save

1. Go to **http://localhost:3000/dashboard/profile**
2. Enter a display name
3. Click **"Save Changes"**
4. ✅ You should see: "Profile updated successfully!"
5. Check **Supabase Table Editor** → `profiles` → 1 row should be there

---

## 🔧 What I Improved

I enhanced error handling in ProfilePage to provide:

✅ **Better diagnostics** - Now shows specific error codes (e.g., "PGRST116: table not found")  
✅ **Helpful messages** - Tells you exactly what's wrong ("Profiles table not found")  
✅ **Tagged console logs** - All logs start with `[Profile]` for easy filtering  
✅ **Graceful fallback** - App still loads even if table doesn't exist yet

---

## 🐛 Debug with Console Logs

If you hit any errors, open DevTools (`F12`) and look for `[Profile]` messages:

```javascript
[Profile] Attempting to save profile for user: abc-123...
[Profile] Supabase error: { code: "PGRST116", message: "..." }
[Profile] ✓ Profile saved successfully!
```

---

## 📝 Troubleshooting

| Issue                                    | Fix                                              |
| ---------------------------------------- | ------------------------------------------------ |
| Still getting "Error saving profile: {}" | Make sure the SQL ran without errors in Supabase |
| "table does not exist" error             | Run the SQL above                                |
| "permission denied" error                | RLS policies might need fixing (re-run the SQL)  |
| Table exists but save fails              | Check browser console for specific error code    |

---

## 📖 Full Guide

See [PROFILE_SAVE_ERROR_FIX.md](./PROFILE_SAVE_ERROR_FIX.md) for complete diagnostic guide with:

- How the profile save flow works
- Connection troubleshooting
- RLS policy verification
- Advanced debugging steps

---

**Status**: ✅ Code improved, ready for table creation setup
