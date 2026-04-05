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
  test_type: "test_1" | "test_2" | "test_3" | "test_4";
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

export async function saveTestResult(
  testType: "test_1" | "test_2" | "test_3" | "test_4",
  scores: any,
  result: any,
) {
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

    console.log("Fetched results:", data?.length || 0);
    return (data as TestResult[]) || [];
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
