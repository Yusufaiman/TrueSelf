/**
 * Utilities to convert GlobalProfile data to chart-ready formats
 */

import { GlobalDimension, GlobalProfile } from "@/lib/psychology/dimensions";

export interface SpiderChartData {
  name: string;
  value: number;
  fullMark: number;
}

export interface BarChartItem {
  label: string;
  value: number;
  color?: string;
}

export interface LineChartData {
  name: string;
  data: Array<{
    timestamp: string;
    dimension: string;
    value: number;
  }>;
}

/**
 * Convert dimensions to spider chart data
 */
export function dimensionsToSpiderChart(
  dimensions: Record<GlobalDimension, number>,
): SpiderChartData[] {
  const dimensionLabels: Record<GlobalDimension, string> = {
    selfAwareness: "Self Awareness",
    identityStability: "Identity Stability",
    authenticity: "Authenticity",
    emotionalAlignment: "Emotional Alignment",
    decisionClarity: "Decision Clarity",
    externalInfluence: "External Influence",
    innerConsistency: "Inner Consistency",
    socialExpression: "Social Expression",
    motivationStrength: "Motivation Strength",
    discipline: "Discipline",
    adaptability: "Adaptability",
    riskTolerance: "Risk Tolerance",
  };

  return Object.entries(dimensions).map(([key, value]) => ({
    name: dimensionLabels[key as GlobalDimension],
    value: Math.round(value),
    fullMark: 100,
  }));
}

/**
 * Get dimension scores as bar chart data
 */
export function dimensionsToBarChart(
  dimensions: Record<GlobalDimension, number>,
): BarChartItem[] {
  const dimensionLabels: Record<GlobalDimension, string> = {
    selfAwareness: "Self Awareness",
    identityStability: "Identity Stability",
    authenticity: "Authenticity",
    emotionalAlignment: "Emotional Alignment",
    decisionClarity: "Decision Clarity",
    externalInfluence: "External Influence",
    innerConsistency: "Inner Consistency",
    socialExpression: "Social Expression",
    motivationStrength: "Motivation Strength",
    discipline: "Discipline",
    adaptability: "Adaptability",
    riskTolerance: "Risk Tolerance",
  };

  return Object.entries(dimensions)
    .map(([key, value]) => ({
      label: dimensionLabels[key as GlobalDimension],
      value: Math.round(value),
    }))
    .sort((a, b) => b.value - a.value);
}

/**
 * Get top and bottom dimensions
 */
export function getTopAndBottomDimensions(
  dimensions: Record<GlobalDimension, number>,
  count: number = 3,
): {
  top: Array<{ dimension: GlobalDimension; score: number }>;
  bottom: Array<{ dimension: GlobalDimension; score: number }>;
} {
  const sorted = Object.entries(dimensions)
    .map(([dim, score]) => ({ dimension: dim as GlobalDimension, score }))
    .sort((a, b) => b.score - a.score);

  return {
    top: sorted.slice(0, count),
    bottom: sorted.slice(-count).reverse(),
  };
}

/**
 * Calculate dimensionscore distribution (category groups)
 */
export function getDimensionCategories(
  dimensions: Record<GlobalDimension, number>,
): {
  identity: number;
  motivation: number;
  performance: number;
  emotional: number;
} {
  return {
    identity: Math.round(
      (dimensions.selfAwareness +
        dimensions.identityStability +
        dimensions.authenticity) /
        3,
    ),
    motivation: Math.round(
      (dimensions.motivationStrength +
        dimensions.decisionClarity +
        dimensions.riskTolerance) /
        3,
    ),
    performance: Math.round(
      (dimensions.discipline +
        dimensions.adaptability +
        dimensions.innerConsistency) /
        3,
    ),
    emotional: Math.round(
      (dimensions.emotionalAlignment +
        dimensions.socialExpression +
        dimensions.externalInfluence) /
        3,
    ),
  };
}

/**
 * Get consistency interpretation with color
 */
export function getConsistencyColor(score: number): string {
  if (score >= 75) return "bg-green-50 border-green-200";
  if (score >= 50) return "bg-amber-50 border-amber-200";
  return "bg-red-50 border-red-200";
}

export function getConsistencyTextColor(score: number): string {
  if (score >= 75) return "text-green-700";
  if (score >= 50) return "text-amber-700";
  return "text-red-700";
}
