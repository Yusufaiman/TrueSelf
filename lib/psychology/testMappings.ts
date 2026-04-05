/**
 * Test to Global Dimension Mappings
 * Maps each test's scores to global dimensions with weights
 * Each test's weights MUST sum to 1.0
 */

import { GlobalDimension } from "./dimensions";

export interface TestDimensionMapping {
  [dimension: string]: number;
}

export const TEST_DIMENSION_MAP: Record<string, TestDimensionMapping> = {
  // Identity Tests
  test_1_identity: {
    selfAwareness: 0.35,
    identityStability: 0.3,
    authenticity: 0.2,
    innerConsistency: 0.15,
  },

  // Personality Type Test
  test_2_personality: {
    selfAwareness: 0.25,
    emotionalAlignment: 0.25,
    decisionClarity: 0.25,
    socialExpression: 0.25,
  },

  // Motivation/Drivers Test
  test_3_motivation: {
    motivationStrength: 0.4,
    decisionClarity: 0.2,
    externalInfluence: 0.2,
    riskTolerance: 0.2,
  },

  // Strengths & Weaknesses Test
  test_4_strengths: {
    discipline: 0.25,
    adaptability: 0.25,
    emotionalAlignment: 0.25,
    decisionClarity: 0.25,
  },

  // Relationships Test
  test_5_relationships: {
    socialExpression: 0.3,
    emotionalAlignment: 0.3,
    authenticity: 0.2,
    externalInfluence: 0.2,
  },

  // Career Test
  test_6_career: {
    motivationStrength: 0.3,
    discipline: 0.25,
    adaptability: 0.25,
    riskTolerance: 0.2,
  },

  // Life Direction Test
  test_7_life_direction: {
    decisionClarity: 0.35,
    authenticity: 0.3,
    motivationStrength: 0.2,
    innerConsistency: 0.15,
  },

  // Mindset Test
  test_8_mindset: {
    adaptability: 0.3,
    emotionalAlignment: 0.25,
    riskTolerance: 0.25,
    selfAwareness: 0.2,
  },

  // Emotional Health Test
  test_9_emotional: {
    emotionalAlignment: 0.35,
    selfAwareness: 0.3,
    innerConsistency: 0.2,
    identityStability: 0.15,
  },

  // Life Patterns Test
  test_10_patterns: {
    selfAwareness: 0.35,
    innerConsistency: 0.3,
    identityStability: 0.2,
    adaptability: 0.15,
  },

  // Money Test
  test_11_money: {
    decisionClarity: 0.3,
    discipline: 0.3,
    externalInfluence: 0.2,
    riskTolerance: 0.2,
  },

  // Reality Check Test
  test_12_reality: {
    selfAwareness: 0.4,
    authenticity: 0.25,
    innerConsistency: 0.2,
    identityStability: 0.15,
  },
};

/**
 * Get dimension mapping for a specific test
 */
export function getTestMapping(testId: string): TestDimensionMapping {
  return TEST_DIMENSION_MAP[testId] || {};
}

/**
 * Validate that all weights in a mapping sum to 1.0 (with tolerance)
 */
export function validateMappingWeights(mapping: TestDimensionMapping): boolean {
  const sum = Object.values(mapping).reduce((acc, val) => acc + val, 0);
  const tolerance = 0.01; // Allow 1% tolerance due to rounding
  return Math.abs(sum - 1.0) <= tolerance;
}

/**
 * Get all tests that contribute to a specific dimension
 */
export function getTestsForDimension(
  dimension: GlobalDimension,
): Array<{ testId: string; weight: number }> {
  const tests: Array<{ testId: string; weight: number }> = [];

  for (const [testId, mapping] of Object.entries(TEST_DIMENSION_MAP)) {
    if (mapping[dimension]) {
      tests.push({ testId, weight: mapping[dimension] });
    }
  }

  return tests;
}
