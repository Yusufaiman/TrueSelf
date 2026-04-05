# Dashboard Error: "Error fetching profile: {}"

## ✅ Status

The error has been **improved with better diagnostics**. Now you can see the actual error codes and messages.

---

## 📋 What This Error Means

The error occurs when the dashboard tries to load your psychological profile but something is wrong:

```
Error fetching profile: {}
  at fetchGlobalProfile (lib/psychology/database.ts:60:15)
  at async getUserGlobalProfile (lib/psychology/profileEngine.ts:58:12)
  at async fetchProfile (hooks/useGlobalProfile.ts:32:30)
```

This can happen for several reasons:

## 🔍 Most Likely Causes (in order)

### **1. ❌ Database Table Doesn't Exist** (MOST COMMON)

The `user_profiles` table hasn't been created in Supabase yet.

**Solution**: Run the SQL migration

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste code from `docs/DATABASE_SETUP.sql`
3. Click "Run" button
4. Check for success message

**Time**: 2 minutes

### **2. ❌ No Profile Data Yet** (NORMAL)

You haven't taken any tests yet, so there's no profile to display.

**Symptom**: Error code `PGRST116` (no rows found)  
**Solution**: This is NORMAL! The error will go away after you:

1. Take a test (any test in `/tests`)
2. Complete and submit it
3. The global profile will be calculated and saved
4. Go to `/dashboard` - it will now load

**Time**: 5 minutes to complete a test

### **3. ⚠️ Authentication Issue**

The user ID isn't being passed correctly to the database.

**Symptom**: Error when querying, or empty user_id  
**Solution**: Check:

- [ ] Signed in to the app (`/auth/login`)
- [ ] User is authenticated (check browser console)
- [ ] User ID is being passed to `useGlobalProfile` hook

### **4. 🔒 RLS Policy Issue**

Row-level security policies are blocking the query.

**Symptom**: Permission error when trying to query  
**Solution**:

- Go to Supabase Dashboard
- Click "Authentication" → "Policies"
- Verify `user_profiles` table has these policies:
  - "Users can view their own profile" (SELECT)
  - "Users can insert their own profile" (INSERT)
  - "Users can update their own profile" (UPDATE)

---

## 🔧 Improved Error Messages

After the update, you'll now see MORE DETAILED errors:

### Before (unhelpful):

```
Error fetching profile: {}
```

### After (helpful):

```
[Profile Error] Code: PGRST116, Message: "0 rows with this(these) pk value(s) exist", {
  userId: "abc-123...",
  errorDetails: {...}
}
```

OR

```
[Profile] No profile exists yet for user abc-123...
```

This tells you:

- The exact error code (e.g., `PGRST116`)
- What the error means (no rows found)
- Which user had the issue
- Full error details for debugging

---

## 🚀 Quick Fix Checklist

Follow this checklist to fix the error:

### Step 1: Create Database Table (5 min)

- [ ] Go to https://supabase.com/dashboard
- [ ] Select your project
- [ ] Click "SQL Editor"
- [ ] Create new query
- [ ] Copy-paste `docs/DATABASE_SETUP.sql`
- [ ] Click "Run"
- [ ] Check for ✅ success

### Step 2: Take a Test to Create Profile (5 min)

- [ ] Go to `/tests` in your app
- [ ] Pick any test (e.g., "Identity Profile")
- [ ] Complete the test
- [ ] Click "Submit"
- [ ] Wait for profile to save
- [ ] Go to `/dashboard`

### Step 3: Verify Dashboard Loads

- [ ] Navigate to `/dashboard`
- [ ] Should see:
  - [ ] Overview cards (4 metric boxes)
  - [ ] Spider chart with 12 dimensions
  - [ ] Insights text
  - [ ] Recommended tests

---

## 🧪 Testing Workflow

1. **Ensure authenticated**: `Sign in → Login page → Enter credentials`
2. **Check browser console**: Open DevTools (F12) → Console tab
3. **Look for new debug messages**:
   ```
   [Profile] Loaded profile for user abc-123... {
     dimensions: ['selfAwareness', 'identityStability', ...],
     consistencyScore: 68
   }
   ```
4. **If you see PGRST116**: This is NORMAL - you just need to take a test first

---

## 📊 Database Flow

```
User Profile Loading Flow:
├─ useGlobalProfile hook
│  └─ checks if userId exists
├─ getUserGlobalProfile()
│  └─ calls fetchGlobalProfile(userId)
├─ fetchGlobalProfile()
│  ├─ queries Supabase user_profiles table
│  ├─ WHERE user_id = userId
│  └─ Returns: GlobalProfile or null
├─ If error:
│  ├─ PGRST116 (no rows) → Return null (normal)
│  ├─ Other error → Log code + message
│  └─ Exception → Log stack trace
└─ useGlobalProfile state updates with data
```

---

## 🐛 Debugging Steps

If the error persists after running migration:

### 1. Check Supabase Tables

In SQL Editor, run:

```sql
-- Check if table exists
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('test_results', 'user_profiles');
```

Expected output:

```
table_name
-----------
test_results
user_profiles
```

### 2. Check RLS Policies

In SQL Editor, run:

```sql
-- Check if policies exist
SELECT policyname, cmd, qual FROM pg_policies
WHERE tablename = 'user_profiles';
```

Expected output: 4 policies (SELECT, INSERT, UPDATE)

### 3. Check User Authentication

In browser console, add this to test page:

```typescript
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
const {
  data: { user },
} = await supabase.auth.getUser();
console.log("Current user:", user?.id);
```

Should print your user ID, e.g.: `aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`

### 4. Test Database Query Directly

In SQL Editor, replace `YOUR_USER_ID` with your actual user ID:

```sql
SELECT * FROM user_profiles
WHERE user_id = 'YOUR_USER_ID';
```

- If returns a row → data exists ✓
- If returns 0 rows → No profile yet (take a test)
- If returns error → RLS or permissions issue

---

## 🎯 Success Indicators

You'll know it's working when:

✅ No errors in browser console  
✅ Dashboard shows profile data  
✅ Spider chart displays 12 colored axes  
✅ Consistency score shows 0-100  
✅ Insights text appears  
✅ `/dashboard/analytics` loads  
✅ Recommended tests display

---

## 📝 Error Codes Reference

| Code       | Meaning               | Solution                                 |
| ---------- | --------------------- | ---------------------------------------- |
| `PGRST116` | No rows found         | Normal if no profile yet - take a test   |
| `42P01`    | Table does not exist  | Run DATABASE_SETUP.sql migration         |
| `42501`    | Permission denied     | Check RLS policies in Supabase           |
| `42703`    | Column does not exist | Table schema mismatch - re-run migration |
| Other      | Database error        | Check Supabase logs for details          |

---

## 💡 Important Notes

1. **First time is normal** - If you see an error after first login, that's fine. You need to take a test first to create a profile.

2. **No hardcoded data** - The dashboard only shows data that actually exists. No dummy data.

3. **Async operations** - Profile calculation is async. After submitting a test, it may take 1-2 seconds to save.

4. **Improved error logs** - Check browser console (F12 → Console) for detailed messages with error codes.

---

## 🚀 Next Steps

1. **Run migration** (if not done): `docs/DATABASE_SETUP.sql`
2. **Take a test**: `/tests` → pick test → submit
3. **Check dashboard**: `/dashboard` → should load
4. **View analytics**: `/dashboard/analytics` → deep dive

If error persists, check the specific error code in the **Error Codes Reference** table above.

---

**Last Updated**: April 5, 2026  
**Build Status**: ✅ Passing
