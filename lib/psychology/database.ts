/**
 * Database Operations for Global Profiles
 * Saves and retrieves user profiles from Supabase
 */

import { createClient } from "@/utils/supabase/client";
import { GlobalProfile } from "./dimensions";

export interface SaveProfileOptions {
  userId: string;
  profile: GlobalProfile;
}

/**
 * Save global profile to database
 */
export async function saveGlobalProfile(
  options: SaveProfileOptions,
): Promise<boolean> {
  try {
    const { userId, profile } = options;
    const supabase = createClient();

    const { error } = await supabase.from("user_profiles").upsert(
      {
        user_id: userId,
        dimensions: profile.dimensions,
        test_contributions: profile.testContributions,
        consistency_score: profile.consistencyScore,
        insights: profile.insights,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

    if (error) {
      console.error(
        `[Profile Save Error] Code: ${error.code}, Message: ${error.message}`,
        {
          userId,
          errorDetails: error,
        },
      );
      return false;
    }

    console.debug(`[Profile] Saved profile for user ${userId}`, {
      dimensions: Object.keys(profile.dimensions),
      consistencyScore: profile.consistencyScore,
    });
    return true;
  } catch (err) {
    console.error("[Profile Save Exception]", {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    return false;
  }
}

/**
 * Fetch user's global profile
 */
export async function fetchGlobalProfile(
  userId: string,
): Promise<GlobalProfile | null> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      // PGRST116 = no rows found (expected, user hasn't completed tests yet)
      if (error.code === "PGRST116") {
        console.debug(`[Profile] No profile exists yet for user ${userId}`);
        return null;
      }

      // Log actual error details
      console.error(
        `[Profile Error] Code: ${error.code}, Message: ${error.message}`,
        {
          userId,
          errorDetails: error,
        },
      );
      return null;
    }

    if (!data) {
      console.debug(`[Profile] No data returned for user ${userId}`);
      return null;
    }

    console.debug(`[Profile] Loaded profile for user ${userId}`, {
      dimensions: Object.keys(data.dimensions || {}),
      consistencyScore: data.consistency_score,
    });

    return {
      userId,
      dimensions: data.dimensions || {},
      testContributions: data.test_contributions || {},
      consistencyScore: data.consistency_score || 50,
      insights: data.insights || {
        summary: "",
        strengths: [],
        weaknesses: [],
        blindSpots: [],
      },
      lastUpdated: data.updated_at,
    };
  } catch (err) {
    console.error("[Profile Exception]", {
      userId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    return null;
  }
}

/**
 * Delete user's profile
 */
export async function deleteGlobalProfile(userId: string): Promise<boolean> {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("user_profiles")
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.error("Error deleting profile:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Exception deleting profile:", err);
    return false;
  }
}
