/**
 * Client-side result utilities
 * Safe to use in Client Components
 */
import { createClient } from "@/utils/supabase/client";
import { processGlobalProfile } from "@/lib/psychology/profileEngine";
import type { TestResult as DimensionTestResult } from "@/lib/psychology/dimensions";

// Local type for database records
export interface TestResult {
  id: string;
  user_id: string;
  test_type: string;
  scores: Record<string, number>;
  result: {
    title: string;
    description?: string;
    pattern?: string;
    strengths?: string[] | Record<string, number>;
    weaknesses?: string[] | Record<string, number>;
    insights?: string[];
    identityResonance?: string[];
    relatedPersonalities?: string[];
    scores?: Record<string, number>;
    [key: string]: any;
  };
  created_at: string;
  updated_at?: string;
}

const inFlightSaveKeys = new Set<string>();

function stableStringify(value: any): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }

  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
    .join(",")}}`;
}

function resultFingerprint(result: TestResult) {
  const payload = result.result || {};
  const primaryIdentity =
    payload.typeCode || payload.title || payload.pattern || payload.primaryType || payload.label;
  const createdAt = new Date(result.created_at);
  const minuteBucket = Number.isNaN(createdAt.getTime())
    ? result.created_at
    : createdAt.toISOString().slice(0, 16);

  return [
    result.test_type,
    primaryIdentity,
    minuteBucket,
  ].join("|");
}

export function dedupeTestResults(results: TestResult[]) {
  const seen = new Set<string>();

  return results.filter((result) => {
    const fingerprint = resultFingerprint(result);
    if (seen.has(fingerprint)) {
      return false;
    }

    seen.add(fingerprint);
    return true;
  });
}

export async function saveTestResult(
  testType: string,
  scores: any,
  result: any,
) {
  const resultIdentity =
    result?.typeCode || result?.title || result?.pattern || result?.primaryType || result?.label;
  const saveKey = [
    testType,
    resultIdentity,
    stableStringify(scores || {}),
  ].join("|");

  if (inFlightSaveKeys.has(saveKey)) {
    console.warn("[Results] Duplicate save skipped while previous save is still in progress.");
    return null;
  }

  inFlightSaveKeys.add(saveKey);

  try {
    const supabase = createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("No user authenticated");
      return null;
    }

    // Insert result
    const { data, error } = await supabase
      .from("test_results")
      .insert([
        {
          user_id: user.id,
          test_type: testType,
          scores,
          result,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Error saving test result - Code:", error.code);
      console.error("Error saving test result - Message:", error.message);
      console.error("Error saving test result - Details:", error.details);
      console.error("Error saving test result - Hint:", error.hint);
      console.error("Error saving test result - Full:", JSON.stringify(error));
      return null;
    }

    // ✅ NEW: After test is saved, calculate and save global profile
    console.log("[Profile] Test saved! Calculating global profile...");
    try {
      // Fetch all test results for this user
      const { data: allResults, error: fetchError } = await supabase
        .from("test_results")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) {
        console.error("[Profile] Error fetching all results:", fetchError);
      } else if (allResults && allResults.length > 0) {
        // Convert database records to DimensionTestResult format
        const testResults: DimensionTestResult[] = allResults.map((r: any) => ({
          testId: r.id,
          testType: r.test_type,
          scores: r.scores || {},
          result: r.result || { title: "" },
          createdAt: r.created_at,
        }));

        // Calculate and save global profile
        const profile = await processGlobalProfile({
          userId: user.id,
          allTestResults: testResults,
        });

        if (profile) {
          console.log("[Profile] ✓ Global profile updated successfully!", {
            dimensions: Object.keys(profile.dimensions),
            consistencyScore: profile.consistencyScore,
          });
        } else {
          console.error("[Profile] Failed to process global profile");
        }
      }
    } catch (profileErr) {
      console.error("[Profile] Exception processing profile:", profileErr);
    }

    return data?.[0] || null;
  } catch (err) {
    console.error("Exception saving test result:", err);
    return null;
  } finally {
    inFlightSaveKeys.delete(saveKey);
  }
}

/**
 * Fetch all test results for current user (client)
 */
export async function getUserResults() {
  try {
    const supabase = createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error getting user:", userError);
      return [];
    }

    if (!user) {
      console.log("No authenticated user found");
      return [];
    }

    console.log("Fetching results for user:", user.id);

    // Fetch results
    const { data, error, status } = await supabase
      .from("test_results")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching results - Code:", error.code);
      console.error("Error fetching results - Message:", error.message);
      console.error("Error fetching results - Status:", status);
      console.error(
        "Error fetching results - Full Error:",
        JSON.stringify(error),
      );

      // Return empty array instead of failing
      return [];
    }

    const results = (data as TestResult[]) || [];
    const uniqueResults = dedupeTestResults(results);

    console.log("Fetched results:", results.length);
    console.log("Unique results:", uniqueResults.length);
    return uniqueResults;
  } catch (err: any) {
    console.error("Exception fetching results:", err);
    console.error("Exception details:", err.message || err);
    return [];
  }
}

/**
 * Get latest result for each test type (client)
 */
export async function getLatestResults() {
  try {
    const results = await getUserResults();
    const latestByType: Record<string, TestResult> = {};

    results.forEach((result) => {
      if (!latestByType[result.test_type]) {
        latestByType[result.test_type] = result;
      }
    });

    return latestByType;
  } catch (err) {
    console.error("Exception getting latest results:", err);
    return {};
  }
}

/**
 * Sign out user
 */
export async function signOut() {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
    return true;
  } catch (err) {
    console.error("Exception signing out:", err);
    return false;
  }
}
