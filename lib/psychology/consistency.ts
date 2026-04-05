/**
 * Consistency Score Engine
 * Measures how consistent and coherent the psychological profile is
 */

import { GlobalDimension, GLOBAL_DIMENSIONS } from "./dimensions";

/**
 * Calculate consistency score based on dimension variance
 * High variance = low consistency; Low variance = high consistency
 * Returns 0-100 score
 */
export function calculateConsistencyScore(
  dimensions: Record<GlobalDimension, number>,
): number {
  const scores = Object.values(dimensions);
  if (scores.length === 0) return 50;

  // Calculate mean
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;

  // Calculate variance
  const variance =
    scores.reduce((acc, score) => acc + Math.pow(score - mean, 2), 0) /
    scores.length;

  // Calculate standard deviation
  const stdDev = Math.sqrt(variance);

  // Convert std dev to consistency score
  // stdDev of 0 = perfect consistency (but impossible)
  // stdDev of 50 = low consistency
  // Map stdDev to 0-100 consistency score
  const consistencyScore = Math.max(0, 100 - stdDev * 2);

  return Math.round(consistencyScore);
}

/**
 * Get consistency interpretation
 */
export function getConsistencyInterpretation(score: number): {
  level: "low" | "moderate" | "high";
  description: string;
} {
  if (score >= 75) {
    return {
      level: "high",
      description:
        "Your personality shows strong internal consistency. Your values, behaviors, and beliefs align well across situations.",
    };
  } else if (score >= 50) {
    return {
      level: "moderate",
      description:
        "Your personality shows reasonable consistency with some variation. You adapt to different contexts while maintaining core values.",
    };
  } else {
    return {
      level: "low",
      description:
        "Your personality shows high variability. You may express different aspects in different situations, which is normal but sometimes creates internal tension.",
    };
  }
}

/**
 * Find dimensions that deviate most from the mean
 */
export function findDeviatingDimensions(
  dimensions: Record<GlobalDimension, number>,
  threshold: number = 15,
): GlobalDimension[] {
  const scores = Object.values(dimensions);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;

  return GLOBAL_DIMENSIONS.filter(
    (dim) => Math.abs(dimensions[dim] - mean) > threshold,
  );
}

/**
 * Calculate dimensional polarization (how extreme are the highs and lows)
 */
export function calculatePolarization(
  dimensions: Record<GlobalDimension, number>,
): number {
  const scores = Object.values(dimensions);
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const range = max - min;

  // Map range 0-100 to polarization 0-100
  // 0 range = 0 polarization
  // 50+ range = 100 polarization
  return Math.min(100, Math.round((range / 50) * 100));
}
