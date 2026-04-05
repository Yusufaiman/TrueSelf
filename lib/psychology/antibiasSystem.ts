/**
 * Anti-Bias System
 * Prevents certain patterns from dominating and ensures fair score distribution
 */

import { GlobalDimension, GLOBAL_DIMENSIONS } from "./dimensions";

export interface BiasCheckResult {
  hasDominantDimension: boolean;
  hasLowVariance: boolean;
  issues: string[];
  adjustedDimensions?: Record<GlobalDimension, number>;
}

/**
 * Check for distribution bias
 * Ensures no single dimension dominates >30% of total score
 */
export function checkDistributionBias(
  dimensions: Record<GlobalDimension, number>,
): BiasCheckResult {
  const totalScore = Object.values(dimensions).reduce((a, b) => a + b, 0);
  const avgScore = totalScore / GLOBAL_DIMENSIONS.length;
  const maxAllowed = avgScore * 1.3; // Allow 30% above average

  const issues: string[] = [];
  let hasDominantDimension = false;
  let maxDimension: GlobalDimension | null = null;
  let maxValue = 0;

  for (const [dim, score] of Object.entries(dimensions)) {
    if (score > maxAllowed) {
      hasDominantDimension = true;
      issues.push(
        `Dimension "${dim}" dominates with score ${score} (allowed max: ${Math.round(maxAllowed)})`,
      );
    }
    if (score > maxValue) {
      maxValue = score;
      maxDimension = dim as GlobalDimension;
    }
  }

  const result: BiasCheckResult = {
    hasDominantDimension,
    hasLowVariance: false,
    issues,
  };

  if (hasDominantDimension && maxDimension) {
    // Apply correction: slightly reduce dominant dimension
    const adjusted = { ...dimensions };
    adjusted[maxDimension] = Math.max(0, adjusted[maxDimension] - 5);

    // Redistribute the reduction to lower dimensions
    const redistribute = 5 / (GLOBAL_DIMENSIONS.length - 1);
    for (const dim of GLOBAL_DIMENSIONS) {
      if (dim !== maxDimension && adjusted[dim] < 95) {
        adjusted[dim] = Math.min(100, adjusted[dim] + redistribute);
      }
    }

    result.adjustedDimensions = adjusted;
  }

  return result;
}

/**
 * Check for low variance (all dimensions too similar)
 * This indicates the test pattern wasn't distinctive enough
 */
export function checkVariance(
  dimensions: Record<GlobalDimension, number>,
): BiasCheckResult {
  const scores = Object.values(dimensions);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance =
    scores.reduce((acc, score) => acc + Math.pow(score - mean, 2), 0) /
    scores.length;
  const stdDev = Math.sqrt(variance);

  const issues: string[] = [];
  let hasLowVariance = false;

  // If standard deviation < 10, variance is too low
  if (stdDev < 10) {
    hasLowVariance = true;
    issues.push(
      `Result shows low distinctiveness (std dev: ${stdDev.toFixed(1)}). Patterns may be unclear.`,
    );
  }

  return {
    hasDominantDimension: false,
    hasLowVariance,
    issues,
  };
}

/**
 * Comprehensive bias check
 */
export function checkForBias(
  dimensions: Record<GlobalDimension, number>,
): BiasCheckResult {
  const distributionCheck = checkDistributionBias(dimensions);
  const varianceCheck = checkVariance(dimensions);

  const combined: BiasCheckResult = {
    hasDominantDimension: distributionCheck.hasDominantDimension,
    hasLowVariance: varianceCheck.hasLowVariance,
    issues: [...distributionCheck.issues, ...varianceCheck.issues],
    adjustedDimensions: distributionCheck.adjustedDimensions,
  };

  return combined;
}

/**
 * Apply bias corrections if needed
 */
export function applyBiasCorrections(
  dimensions: Record<GlobalDimension, number>,
): Record<GlobalDimension, number> {
  const biasCheck = checkForBias(dimensions);

  if (biasCheck.adjustedDimensions) {
    return biasCheck.adjustedDimensions;
  }

  if (biasCheck.hasLowVariance) {
    // Add small random variation to break ties
    const adjusted = { ...dimensions };
    for (const dim of GLOBAL_DIMENSIONS) {
      // Add ±2 random variation
      const variation = (Math.random() - 0.5) * 4;
      adjusted[dim] = Math.max(0, Math.min(100, adjusted[dim] + variation));
    }
    return adjusted;
  }

  return dimensions;
}
