/**
 * Insight Generation Engine
 * Creates human-readable, multi-dimensional interpretations of global profile
 */

import { GlobalDimension, GLOBAL_DIMENSIONS } from "./dimensions";
import { detectContradictions } from "./contradictions";

export interface ProfileInsights {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  blindSpots: string[];
  recommendations: string[];
}

/**
 * Generate comprehensive insights from global profile
 */
export function generateGlobalInsights(profile: {
  dimensions: Record<GlobalDimension, number>;
  consistencyScore: number;
}): ProfileInsights {
  const { dimensions, consistencyScore } = profile;

  // Get top 3 dimensions and bottom 3
  const sortedDimensions = GLOBAL_DIMENSIONS.sort(
    (a, b) => dimensions[b] - dimensions[a],
  );
  const topDimensions = sortedDimensions.slice(0, 3);
  const bottomDimensions = sortedDimensions.slice(-3).reverse();

  // Generate summary
  const summary = generateSummary(dimensions, consistencyScore);

  // Generate strengths
  const strengths = generateStrengths(topDimensions, dimensions);

  // Generate weaknesses
  const weaknesses = generateWeaknesses(bottomDimensions, dimensions);

  // Detect blind spots from contradictions
  const contradictions = detectContradictions(dimensions);
  const blindSpots = generateBlindSpots(contradictions, bottomDimensions);

  // Generate recommendations
  const recommendations = generateRecommendations(
    dimensions,
    contradictions,
    bottomDimensions,
  );

  return {
    summary,
    strengths,
    weaknesses,
    blindSpots,
    recommendations,
  };
}

/**
 * Generate summary statement
 */
function generateSummary(
  dimensions: Record<GlobalDimension, number>,
  consistencyScore: number,
): string {
  const avg = Math.round(
    Object.values(dimensions).reduce((a, b) => a + b, 0) /
      GLOBAL_DIMENSIONS.length,
  );
  const topDim = Object.entries(dimensions).sort((a, b) => b[1] - a[1])[0][0];

  if (consistencyScore >= 75) {
    return `You're a highly self-integrated person with strong ${topDim}. Your values and behaviors align consistently across situations, giving you a clear sense of direction.`;
  } else if (consistencyScore >= 50) {
    return `You have a balanced personality with distinct strengths in ${topDim}. You adapt to different contexts while maintaining core values, though some areas need integration.`;
  } else {
    return `You show complexity and adaptability, especially in ${topDim}. Different contexts bring out different aspects of your personality—this is normal but may create internal tension.`;
  }
}

/**
 * Generate strength statements
 */
function generateStrengths(
  topDimensions: GlobalDimension[],
  dimensions: Record<GlobalDimension, number>,
): string[] {
  const strengthMap: Record<GlobalDimension, string> = {
    selfAwareness:
      "You have strong self-awareness, understanding your patterns and motivations deeply",
    identityStability:
      "Your identity is stable and coherent, giving you confidence in who you are",
    authenticity:
      "You live authentically, staying true to your values even under pressure",
    emotionalAlignment:
      "Your emotions and actions are well-aligned, creating internal harmony",
    decisionClarity:
      "You make decisions with clarity, knowing what you want and why",
    externalInfluence:
      "You're grounded in your own values and not easily swayed by others",
    innerConsistency:
      "Your different aspects work together harmoniously, creating coherence",
    socialExpression:
      "You express yourself openly and authentically with others",
    motivationStrength:
      "You have strong drive and motivation toward your goals",
    discipline: "You follow through consistently on your commitments and goals",
    adaptability:
      "You adapt flexibly to new situations while maintaining your core",
    riskTolerance:
      "You're comfortable with uncertainty and not afraid to take calculated risks",
  };

  return topDimensions.map((dim) => strengthMap[dim]);
}

/**
 * Generate weakness statements
 */
function generateWeaknesses(
  bottomDimensions: GlobalDimension[],
  dimensions: Record<GlobalDimension, number>,
): string[] {
  const weaknessMap: Record<GlobalDimension, string> = {
    selfAwareness:
      "You may lack clarity about your own patterns and motivations",
    identityStability:
      "Your identity feels uncertain; you may struggle with knowing who you really are",
    authenticity:
      "You may compromise your true values to fit in or please others",
    emotionalAlignment: "There's a gap between your feelings and your actions",
    decisionClarity:
      "Decision-making is challenging; you may feel uncertain about your choices",
    externalInfluence:
      "You're significantly influenced by others' opinions and expectations",
    innerConsistency:
      "Different aspects of your personality don't always work together smoothly",
    socialExpression:
      "You may struggle to express yourself authentically with others",
    motivationStrength:
      "You lack strong drive toward your goals or feel unmotivated",
    discipline: "Following through on commitments is challenging for you",
    adaptability:
      "You struggle to adjust when plans change or new situations arise",
    riskTolerance:
      "Uncertainty makes you uncomfortable; you prefer control and predictability",
  };

  return bottomDimensions.map((dim) => weaknessMap[dim]);
}

/**
 * Generate blind spot insights
 */
function generateBlindSpots(
  contradictions: any[],
  bottomDimensions: GlobalDimension[],
): string[] {
  const blindSpots: string[] = [];

  if (contradictions.length > 0) {
    blindSpots.push(...contradictions.slice(0, 2).map((c) => c.insight));
  }

  if (bottomDimensions.includes("selfAwareness")) {
    blindSpots.push(
      "You may have blind spots about how others perceive you—ask for feedback regularly",
    );
  }

  if (
    bottomDimensions.includes("emotionalAlignment") &&
    bottomDimensions.includes("selfAwareness")
  ) {
    blindSpots.push(
      "You may not realize how your unexpressed emotions affect your behavior",
    );
  }

  return blindSpots.slice(0, 3);
}

/**
 * Generate personalized recommendations
 */
function generateRecommendations(
  dimensions: Record<GlobalDimension, number>,
  contradictions: any[],
  bottomDimensions: GlobalDimension[],
): string[] {
  const recommendations: string[] = [];

  // Focus on bottom dimensions
  if (bottomDimensions.includes("selfAwareness")) {
    recommendations.push(
      "Practice daily reflection: spend 10 minutes journaling about your thoughts and behaviors",
    );
  }

  if (bottomDimensions.includes("discipline")) {
    recommendations.push(
      "Build discipline gradually: start with one small habit and add others as it becomes automatic",
    );
  }

  if (bottomDimensions.includes("adaptability")) {
    recommendations.push(
      "Embrace small changes intentionally: practice flexibility in low-stakes situations",
    );
  }

  // Address major contradictions
  if (contradictions.length > 0) {
    recommendations.push(contradictions[0].message);
  }

  if (dimensions.identityStability < 50 && dimensions.authenticity < 50) {
    recommendations.push(
      "Clarify your core values: identify 3-5 non-negotiable principles that guide your life",
    );
  }

  return recommendations.slice(0, 3);
}
