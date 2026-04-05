/**
 * Profile Engine - Main Orchestrator
 * Coordinates all profile building, updating, and analysis
 */

import { GlobalProfile, TestResult } from "./dimensions";
import { buildGlobalProfile, updateGlobalProfile } from "./aggregation";
import { applyBiasCorrections } from "./antibiasSystem";
import { saveGlobalProfile, fetchGlobalProfile } from "./database";

export interface ProfileEngineInput {
  userId: string;
  newTestResult?: TestResult;
  allTestResults: TestResult[];
}

/**
 * Main entry point: Build or update user's global profile
 */
export async function processGlobalProfile(
  input: ProfileEngineInput,
): Promise<GlobalProfile | null> {
  try {
    const { userId, allTestResults } = input;

    // Build profile from all results
    let profile = buildGlobalProfile({
      testResults: allTestResults,
      userId,
    });

    // Apply bias corrections to dimensions
    profile.dimensions = applyBiasCorrections(profile.dimensions);

    // Save to database
    const saved = await saveGlobalProfile({
      userId,
      profile,
    });

    if (!saved) {
      console.error("Failed to save profile to database");
      return null;
    }

    return profile;
  } catch (err) {
    console.error("Error processing global profile:", err);
    return null;
  }
}

/**
 * Get user's current global profile
 */
export async function getUserGlobalProfile(
  userId: string,
): Promise<GlobalProfile | null> {
  try {
    return await fetchGlobalProfile(userId);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return null;
  }
}

/**
 * Batch process multiple test results at once
 */
export async function batchProcessProfiles(
  inputs: ProfileEngineInput[],
): Promise<Map<string, GlobalProfile | null>> {
  const results = new Map<string, GlobalProfile | null>();

  for (const input of inputs) {
    const profile = await processGlobalProfile(input);
    results.set(input.userId, profile);
  }

  return results;
}

/**
 * Export profile for analysis
 */
export function exportProfileForAnalysis(profile: GlobalProfile): object {
  return {
    user_id: profile.userId,
    dimensions: profile.dimensions,
    consistency_score: profile.consistencyScore,
    test_contributions: profile.testContributions,
    insights: profile.insights,
    last_updated: profile.lastUpdated,
  };
}
