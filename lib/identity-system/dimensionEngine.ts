import { DimensionScores } from "./types";

export interface DimensionProfile {
  mean: number;
  variance: number;
  stability: number;
}

export type DimensionProfileSet = Record<
  keyof DimensionScores,
  DimensionProfile
>;

export function calculateDimensionProfile(scores: number[]): DimensionProfile {
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;

  const variance =
    scores.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
    scores.length;

  const stability = Math.max(0, 100 - variance);

  return {
    mean,
    variance,
    stability,
  };
}

export function buildDimensionProfiles(
  rawScores: Record<keyof DimensionScores, number[]>,
): DimensionProfileSet {
  const result = {} as DimensionProfileSet;

  (Object.keys(rawScores) as Array<keyof DimensionScores>).forEach((key) => {
    result[key] = calculateDimensionProfile(rawScores[key]);
  });

  return result;
}
