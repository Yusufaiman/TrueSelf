# Profile Save Error: Diagnostic & Fix Guide

## 🔴 Error: "Error saving profile: {}"

This guide will help you diagnose and fix the profile save error in the TrueSelf dashboard.

---

## 1️⃣ What's Likely Happening?

The error `"Error saving profile: {}"` means one of these:

| Issue                  | Symptom                                          | Fix                                                            |
| ---------------------- | ------------------------------------------------ | -------------------------------------------------------------- |
| **No profiles table**  | Error message includes "relation does not exist" | Run [CREATE_PROFILES_TABLE.sql](#step-1-create-profiles-table) |
| **RLS policy blocked** | Error includes "permission denied" or "policy"   | Check RLS policies in Supabase                                 |
| **Wrong user context** | Error includes "user_id mismatch"                | Verify you're logged in                                        |

---

## 2️⃣ Diagnose the Problem

### 📊 Check Console Logs

Open your browser DevTools (`F12` or `Ctrl+Shift+K`) and:

1. Go to the **Console** tab
2. Try to save your profile again
3. Look for messages starting with `[Profile]`:

```
[Profile] Attempting to save profile for user: abc-123...
[Profile] Supabase error: {
  code: "PGRST116",
  message: "relation \"public.profiles\" does not exist",
  details: null,
  hint: null
}
```

#### ✅ Possible Diagnoses

**If you see "relation ... does not exist":**

- Jump to [Step 1: Create Profiles Table](#step-1-create-profiles-table)

**If you see "permission denied" or "policy":**

- Jump to [Step 2: Check RLS Policies](#step-2-check-rls-policies)

**If you see "PGRST116" (no rows found):**

- This is NORMAL! The table exists but is empty. Let me see you try to save again and watch for new errors.

**If error is empty `{}`:**

- This indicates a connection issue. Jump to [Step 3: Connection Check](#step-3-connection-check)

---

## Step 1: Create Profiles Table

### ✅ Prerequisites

- Supabase account with TrueSelf project
- Access to SQL Editor

### 🚀 Action

1. Go to **[Supabase Dashboard](https://supabase.com/dashboard/projects)**
2. Select your **TrueSelf project**
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**
5. Copy the SQL from [CREATE_PROFILES_TABLE.sql](./CREATE_PROFILES_TABLE.sql)
6. Paste into the editor
7. Click **"Run"** button

### Expected Result

```
Query executed successfully (0 rows affected)
```

### ✅ Verify It Worked

1. Click **"Table Editor"** in the sidebar
2. You should see a new table: **`profiles`**
3. The table should be empty (0 rows)
4. Check the columns:
   - `id` (UUID)
   - `name` (text)
   - `avatar_url` (text)
   - `bio` (text)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

### 🧪 Test the Save

1. Go back to the app (`http://localhost:3000/dashboard/profile`)
2. Enter a display name (e.g., "John Doe")
3. Click **"Save Changes"**
4. Check console for `[Profile] ✓ Profile saved successfully!`

---

## Step 2: Check RLS Policies

If you're getting "permission denied" errors:

### 🔍 Verify Policies

1. Go to Supabase Dashboard → **"SQL Editor"**
2. Run this query:

```sql
SELECT * FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY policyname;
```

### Expected Result

You should see 3 policies:

1. `Users can view their own profile` (SELECT)
2. `Users can insert their own profile` (INSERT)
3. `Users can update their own profile` (UPDATE)

### ❌ If policies are missing

Re-run the [CREATE_PROFILES_TABLE.sql](./CREATE_PROFILES_TABLE.sql) file. It will recreate them.

---

## Step 3: Connection Check

If the error message is completely empty `{}`:

### 🔍 Check Backend Connection

1. Open browser DevTools → **Network** tab
2. Try to save profile
3. Look for request to `supabase` with status:
   - ✅ **200** or **204**: OK (connection works, different issue)
   - ❌ **500** or **timeout**: Backend error
   - ❌ **401** or **403**: Authentication error

### ❓ If connection fails

Check that:

- `NEXT_PUBLIC_SUPABASE_URL` is set in `.env.local`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set in `.env.local`
- You're logged in to the app
- Your Supabase project is active (not paused)

---

## 🛠️ How Profile Save Works

```
User clicks "Save Changes"
           ↓
Frontend collects: { name, bio, avatar_url }
           ↓
Sends UPSERT to Supabase profiles table
           ↓
Database checks RLS policy:
  - Is user authenticated? ✓
  - Does user_id match auth.uid()? ✓
           ↓
Saves to database
           ↓
Console logs: "[Profile] ✓ Profile saved successfully!"
           ↓
User sees: "Profile updated successfully!"
```

---

## 📝 Improved Error Messages

After the fix, errors will be more helpful:

| Before                          | After                                                             |
| ------------------------------- | ----------------------------------------------------------------- |
| `{}`                            | `PGRST116: relation "public.profiles" does not exist`             |
| `Error saving profile: unknown` | `23502: null value in column "name" violates not-null constraint` |

---

## 🚀 Next Steps After Fix

✅ Profile save works!

Now:

1. **Update your profile** with a display name and bio
2. **Refresh the page** to verify data persists
3. **Check Supabase Table Editor**:
   - Go to "Table Editor" → "profiles"
   - You should see your profile row with your name and bio

---

## ❓ Still Having Issues?

### Check These:

1. **Console for `[Profile]` logs**
   - Copy the entire error object
   - Share in the error report

2. **Verify Supabase project**
   - Is the project active (not paused)?
   - Are you connected to the right project?

3. **Verify authentication**
   - Are you logged in to TrueSelf?
   - Does `/dashboard` load?

4. **Clear cache**
   ```bash
   npm run dev
   # Clear browser cache (Ctrl+Shift+Delete in Chrome)
   # Reload page
   ```

---

## 📚 Related Files

- [CREATE_PROFILES_TABLE.sql](./CREATE_PROFILES_TABLE.sql) - Migration to create table
- [DATABASE_RESET_PROFILES.sql](./DATABASE_RESET_PROFILES.sql) - Drop and recreate (use if needed)
- [components/dashboard/ProfilePage.tsx](../components/dashboard/ProfilePage.tsx) - Profile component

---

**Last Updated**: April 5, 2026  
**Status**: Production debugging guide ✓
