/**
 * Score Aggregation Engine
 * Builds global profile from multiple test results
 */

import {
  GlobalDimension,
  GlobalProfile,
  GLOBAL_DIMENSIONS,
  TestResult,
} from "./dimensions";
import { TEST_DIMENSION_MAP } from "./testMappings";
import { normalizeScore, weightedAverageScores } from "./normalization";
import { calculateConsistencyScore } from "./consistency";
import { generateGlobalInsights } from "./insights";

export interface AggregationInput {
  testResults: TestResult[];
  userId: string;
}

/**
 * Main function: Build global profile from test results
 */
export function buildGlobalProfile(input: AggregationInput): GlobalProfile {
  const { testResults, userId } = input;

  // Initialize dimensions
  const dimensionAggregates: Record<GlobalDimension, number[]> = {} as Record<
    GlobalDimension,
    number[]
  >;
  const testContributions: Record<
    string,
    Partial<Record<GlobalDimension, number>>
  > = {};

  GLOBAL_DIMENSIONS.forEach((dim) => {
    dimensionAggregates[dim] = [];
  });

  // Process each test result
  for (const result of testResults) {
    const testId = result.testId || result.testType;
    const mapping = TEST_DIMENSION_MAP[testId];

    if (!mapping) {
      console.warn(`No dimension mapping found for test: ${testId}`);
      continue;
    }

    const testContribution: Partial<Record<GlobalDimension, number>> = {};

    // Calculate average score for this test
    const testScores = Object.values(result.scores);
    const avgTestScore =
      testScores.length > 0
        ? Math.round(testScores.reduce((a, b) => a + b, 0) / testScores.length)
        : 50;

    // Apply dimension mappings
    for (const [dimension, weight] of Object.entries(mapping)) {
      const normalizedScore = avgTestScore; // Already normalized
      const weightedScore = normalizedScore * weight;

      dimensionAggregates[dimension as GlobalDimension].push(weightedScore);
      testContribution[dimension as GlobalDimension] =
        Math.round(weightedScore);
    }

    testContributions[testId] = testContribution;
  }

  // Calculate final dimension scores
  const dimensions: Record<GlobalDimension, number> = {} as Record<
    GlobalDimension,
    number
  >;

  GLOBAL_DIMENSIONS.forEach((dim) => {
    const scores = dimensionAggregates[dim];
    if (scores.length > 0) {
      dimensions[dim] = Math.round(
        scores.reduce((a, b) => a + b, 0) / scores.length,
      );
    } else {
      dimensions[dim] = 50; // Default neutral score
    }
  });

  // Calculate consistency score
  const consistencyScore = calculateConsistencyScore(dimensions);

  // Generate insights
  const insights = generateGlobalInsights({ dimensions, consistencyScore });

  return {
    userId,
    dimensions,
    testContributions,
    consistencyScore,
    insights,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Update profile with a single new test result
 */
export function updateGlobalProfile(
  currentProfile: GlobalProfile,
  newTestResult: TestResult,
): GlobalProfile {
  // Combine current test contributions with new result
  const allResults: TestResult[] = [];

  // Reconstruct results from testContributions (simplified)
  // For production, you'd get actual results from database
  const updatedInput: AggregationInput = {
    testResults: [newTestResult],
    userId: currentProfile.userId,
  };

  // Rebuild with new test
  return buildGlobalProfile(updatedInput);
}
