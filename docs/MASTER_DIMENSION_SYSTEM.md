# Master Dimension System - Implementation Guide

## Overview

The Master Dimension System unifies all 40+ tests into ONE consistent psychological model using 12 global dimensions.

## 📁 File Structure

```
lib/psychology/
├── dimensions.ts          ← Core types & constants
├── normalization.ts       ← Score 0-100 normalization
├── testMappings.ts        ← Test → Dimension mappings
├── aggregation.ts         ← Score aggregation engine
├── antibiasSystem.ts      ← Prevent bias & dominance
├── consistency.ts         ← Consistency score calculation
├── contradictions.ts      ← Contradiction detection
├── insights.ts            ← Insight generation
├── database.ts            ← Supabase operations
├── profileEngine.ts       ← Main orchestrator
└── migration.ts           ← Database setup script
```

## 🎯 The 12 Global Dimensions

1. **selfAwareness** - Understanding your own patterns
2. **identityStability** - Coherence of your core identity
3. **authenticity** - Living aligned with true values
4. **emotionalAlignment** - Integration of emotions with actions
5. **decisionClarity** - Clear decision-making process
6. **externalInfluence** - Degree influenced by others
7. **innerConsistency** - Harmony between different aspects
8. **socialExpression** - How you express yourself to others
9. **motivationStrength** - Drive toward goals
10. **discipline** - Follow-through and commitment
11. **adaptability** - Flexibility with change
12. **riskTolerance** - Comfort with uncertainty

## 🔄 Data Flow

```
User Takes Test
    ↓
saveTestResult() → Database
    ↓
Fetch All User Results
    ↓
buildGlobalProfile() → Aggregate scores
    ↓
applyBiasCorrections() → Prevent patterns from dominating
    ↓
generateGlobalInsights() → Create interpretation
    ↓
saveGlobalProfile() → Store in user_profiles table
    ↓
Display in Dashboard
```

## 🚀 Integration Steps

### Step 1: Create Database Table

Run this SQL in Supabase:

```sql
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

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_profiles TO authenticated;
```

### Step 2: Update Test Save Handler

In your test completion handler, add:

```typescript
import { processGlobalProfile } from "@/lib/psychology/profileEngine";
import { getUserResults } from "@/utils/supabase/client-results";

// After saving individual test result
const allResults = await getUserResults();
const profile = await processGlobalProfile({
  userId: user.id,
  allTestResults: allResults,
  newTestResult: testResult,
});

if (profile) {
  console.log("Global profile updated:", profile);
}
```

### Step 3: Display Profile in Dashboard

Create new dashboard page:

```typescript
import { getUserGlobalProfile } from "@/lib/psychology/profileEngine";

export function GlobalProfileCard() {
  const [profile, setProfile] = useState<GlobalProfile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const prof = await getUserGlobalProfile(user.id);
      setProfile(prof);
    };
    loadProfile();
  }, [user.id]);

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div>
      <h2>Your Global Profile</h2>
      <div className="dimensions-grid">
        {Object.entries(profile.dimensions).map(([dim, score]) => (
          <div key={dim}>
            <p>{dim}: {score}/100</p>
            <ProgressBar value={score} />
          </div>
        ))}
      </div>
      <div className="insights">
        <h3>Insights</h3>
        <p>{profile.insights.summary}</p>
        <h4>Strengths</h4>
        <ul>
          {profile.insights.strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

## 🔒 Anti-Bias Safeguards

✅ **No Dimension Dominance** - No dimension > 30% of total score
✅ **Variance Check** - Low variance penalizes unclear patterns
✅ **Distribution Balancing** - Redistribution if one dimension dominates
✅ **Contradiction Detection** - Flags conflicting patterns
✅ **Consistency Scoring** - Measures profile coherence

## 📊 Example Output

```json
{
  "userId": "user-123",
  "dimensions": {
    "selfAwareness": 78,
    "identityStability": 65,
    "authenticity": 72,
    "emotionalAlignment": 52,
    "decisionClarity": 68,
    "externalInfluence": 45,
    "innerConsistency": 70,
    "socialExpression": 65,
    "motivationStrength": 88,
    "discipline": 40,
    "adaptability": 62,
    "riskTolerance": 75
  },
  "consistencyScore": 61,
  "insights": {
    "summary": "You're a motivated, risk-tolerant person with strong self-awareness...",
    "strengths": [
      "You have strong drive and motivation toward your goals",
      "You're grounded in your own values and not easily swayed by others",
      "You're comfortable with uncertainty and willing to take calculated risks"
    ],
    "weaknesses": [
      "Following through on commitments is challenging for you",
      "There's a gap between your feelings and your actions",
      "You may compromise your true values to fit in or please others"
    ],
    "blindSpots": [
      "You have strong motivation but struggle with follow-through",
      "Your identity is stable but may not feel like your true self"
    ]
  },
  "lastUpdated": "2026-04-05T10:30:00Z"
}
```

## 🔧 Configuration

### Adding New Dimensions

1. Add to `GlobalDimension` type in `dimensions.ts`
2. Add description to `DIMENSION_DESCRIPTIONS`
3. Update test mappings in `testMappings.ts`
4. Add logic to `insights.ts` for interpretation

### Adding New Test

1. Create mapping in `testMappings.ts`
2. Ensure weights sum to 1.0
3. Test with `validateMappingWeights()`

## 📈 Scaling to 40+ Tests

The system is designed for scale:

- ✅ Modular mapping system (add test = add 1 entry)
- ✅ Normalized scores (all 0-100)
- ✅ Consistent aggregation algorithm
- ✅ No hardcoded limits
- ✅ Efficient vector calculations

Add more tests by adding entries to `TEST_DIMENSION_MAP` in `testMappings.ts`.

## 🐛 Debugging

Monitor these logs:

```typescript
// Check dimension contributions
console.log(profile.testContributions);

// Check bias corrections
const biasCheck = checkForBias(profile.dimensions);
console.log(biasCheck.issues);

// Check contradictions
const contradictions = detectContradictions(profile.dimensions);
console.log(contradictions);
```

## 📝 License & Attribution

This system is proprietary to TrueSelf. All psychological dimensions and mappings are custom-designed for this platform.

---

**Status:** ✅ Production Ready | 📦 12 Global Dimensions | 🔒 Anti-Bias Enabled | 🚀 40+ Test Ready
