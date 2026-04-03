import { DimensionProfileSet } from "./dimensionEngine";
import { IDENTITY_PATTERNS, IdentityPattern } from "./patternEngine";
import { IdentityType } from "./types";

export interface MatchResult {
  type: IdentityType;
  score: number;
  matchedConditions: number;
  totalConditions: number;
}

export interface IdentityMatchResult {
  primary: MatchResult;
  secondary: MatchResult;
  tertiary: MatchResult;
  all: MatchResult[];
}

function evaluateIdentity(
  profile: DimensionProfileSet,
  pattern: IdentityPattern,
): { score: number; matched: number; total: number } {
  let score = 0;
  let total = 0;

  // Evaluate conditions
  pattern.conditions.forEach((condition) => {
    const value = profile[condition.dimension].mean;

    let conditionMet = true;

    if (condition.min !== undefined && value < condition.min) {
      conditionMet = false;
    }

    if (condition.max !== undefined && value > condition.max) {
      conditionMet = false;
    }

    if (conditionMet) {
      score += 1;
    }

    total += 1;
  });

  // Evaluate traits (variance-based)
  pattern.traits?.forEach((trait) => {
    const avgVariance =
      Object.values(profile)
        .map((d) => d.variance)
        .reduce((a, b) => a + b, 0) / 8;

    let traitMet = false;

    if (trait.type === "lowVariance" && avgVariance < 250) {
      traitMet = true;
    } else if (trait.type === "highVariance" && avgVariance > 400) {
      traitMet = true;
    }

    if (traitMet) {
      score += 1;
    }

    total += 1;
  });

  return {
    score: (score / total) * 100,
    matched: score,
    total,
  };
}

export function matchIdentities(
  profile: DimensionProfileSet,
): IdentityMatchResult {
  const results: MatchResult[] = [];

  // Evaluate all identities
  IDENTITY_PATTERNS.forEach((pattern) => {
    const { score, matched, total } = evaluateIdentity(profile, pattern);

    results.push({
      type: pattern.type,
      score,
      matchedConditions: matched,
      totalConditions: total,
    });
  });

  // ANTI-BIAS NORMALIZATION
  // Subtract average from all scores to prevent mid-range dominance
  const avgScore = results.reduce((a, b) => a + b.score, 0) / results.length;

  results.forEach((r) => {
    r.score = r.score - avgScore;
  });

  // Sort by score (highest first)
  results.sort((a, b) => b.score - a.score);

  const primary = results[0];
  const secondary = results[1];
  const tertiary = results[2];

  return {
    primary,
    secondary,
    tertiary,
    all: results,
  };
}
