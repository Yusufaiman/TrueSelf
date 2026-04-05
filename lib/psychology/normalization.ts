/**
 * Score Normalization System
 * Converts different test scales to unified 0-100 scale
 */

/**
 * Normalize any score to 0-100 scale
 * @param value - The raw score value
 * @param min - Minimum possible value (inclusive)
 * @param max - Maximum possible value (inclusive)
 * @returns Normalized score 0-100
 */
export function normalizeScore(
  value: number,
  min: number,
  max: number,
): number {
  // Clamp value to min-max range
  const clamped = Math.max(min, Math.min(max, value));

  // Handle edge case where min === max
  if (min === max) {
    return 50; // Return middle value if no range
  }

  // Normalize to 0-100
  const normalized = ((clamped - min) / (max - min)) * 100;

  // Round to nearest integer
  return Math.round(normalized);
}

/**
 * Normalize multiple scores at once
 */
export function normalizeScores(
  scores: Record<string, number>,
  ranges: Record<string, { min: number; max: number }>,
): Record<string, number> {
  const normalized: Record<string, number> = {};

  for (const [key, value] of Object.entries(scores)) {
    const range = ranges[key];
    if (range) {
      normalized[key] = normalizeScore(value, range.min, range.max);
    } else {
      // If no range provided, assume 0-100
      normalized[key] = Math.round(Math.max(0, Math.min(100, value)));
    }
  }

  return normalized;
}

/**
 * Average multiple normalized scores
 */
export function averageScores(scores: number[]): number {
  if (scores.length === 0) return 50;
  const sum = scores.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / scores.length);
}

/**
 * Weighted average of scores
 */
export function weightedAverageScores(
  scoreWeightPairs: Array<{ score: number; weight: number }>,
): number {
  const totalWeight = scoreWeightPairs.reduce(
    (acc, pair) => acc + pair.weight,
    0,
  );
  if (totalWeight === 0) return 50;

  const weightedSum = scoreWeightPairs.reduce(
    (acc, pair) => acc + pair.score * pair.weight,
    0,
  );

  return Math.round(weightedSum / totalWeight);
}
