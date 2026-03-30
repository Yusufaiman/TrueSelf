/**
 * Profile Matching Algorithm
 * Matches user dimension scores against identity type profiles
 * Uses Euclidean distance with weighted tolerance bands
 */

import { IDENTITIES, DimensionScores, IdentityType, Identity } from "./types";

interface SimilarityResult {
  identityType: IdentityType;
  similarityScore: number; // 0-100
  matchedDimensions: number; // count of dimensions in tolerance band
  explanation: string;
}

interface IdentityMatch {
  primary: SimilarityResult;
  secondary: SimilarityResult;
  tertiary: SimilarityResult;
  allMatches: SimilarityResult[];
}

/**
 * Calculate tolerance band for each dimension
 * Tolerance increases slightly for lower target scores to allow more variation
 */
function getToleranceBand(
  targetScore: number
): { min: number; max: number } {
  const tolerance = 15; // ±15 within band is acceptable match
  return {
    min: Math.max(0, targetScore - tolerance),
    max: Math.min(100, targetScore + tolerance),
  };
}

/**
 * Calculate Euclidean distance between user scores and identity profile
 * Returns similarity score 0-100 (where 100 = perfect match)
 */
function calculateSimilarityScore(
  userScores: DimensionScores,
  identity: Identity
): { score: number; matchedDimensions: number } {
  let totalSquaredDifference = 0;
  let matchedDimensions = 0;

  identity.keyDimensions.forEach(({ dimension, targetScore }) => {
    const userScore = userScores[dimension];
    const band = getToleranceBand(targetScore);

    // Check if user score is in tolerance band
    if (userScore >= band.min && userScore <= band.max) {
      matchedDimensions++;
    }

    // Calculate squared difference for Euclidean distance
    const difference = userScore - targetScore;
    totalSquaredDifference += difference * difference;
  });

  // Euclidean distance
  const euclideanDistance = Math.sqrt(
    totalSquaredDifference / identity.keyDimensions.length
  );

  // Convert distance to similarity score (0-100)
  // Max distance is 100, so similarity = 100 - distance
  const similarityScore = Math.max(0, 100 - euclideanDistance);

  return { score: similarityScore, matchedDimensions };
}

/**
 * Generate explanation for why this identity matches
 */
function generateExplanation(
  identity: Identity,
  userScores: DimensionScores,
  matchedDimensions: number
): string {
  const primaryDimension = identity.keyDimensions.find(
    (d) => d.importance === "primary"
  );

  if (!primaryDimension) {
    return `Your profile aligns with ${identity.name}.`;
  }

  const userScore = userScores[primaryDimension.dimension];
  const targetScore = primaryDimension.targetScore;
  const band = getToleranceBand(targetScore);

  if (userScore >= band.min && userScore <= band.max) {
    return `Your ${primaryDimension.dimension} score (${Math.round(userScore)}/100) strongly aligns with ${identity.name}.`;
  } else if (userScore > band.max) {
    return `Your ${primaryDimension.dimension} is higher than typical for ${identity.name}, but other factors suggest alignment.`;
  } else {
    return `Your ${primaryDimension.dimension} is lower than typical for ${identity.name}, but you share other core patterns.`;
  }
}

/**
 * Main matching function
 * Returns primary, secondary, and tertiary identity matches ranked by similarity
 */
export function identifyType(userScores: DimensionScores): IdentityMatch {
  const results: SimilarityResult[] = [];

  // Score each identity
  Object.entries(IDENTITIES).forEach(([identityKey, identity]) => {
    const { score, matchedDimensions } = calculateSimilarityScore(
      userScores,
      identity
    );

    results.push({
      identityType: identityKey as IdentityType,
      similarityScore: Math.round(score),
      matchedDimensions,
      explanation: generateExplanation(identity, userScores, matchedDimensions),
    });
  });

  // Sort by similarity score (highest first)
  results.sort((a, b) => b.similarityScore - a.similarityScore);

  return {
    primary: results[0],
    secondary: results[1],
    tertiary: results[2],
    allMatches: results,
  };
}

/**
 * Prevent "The Becoming" bias
 * "The Becoming" should only be primary match if:
 * 1. selfAwareness >= 60 AND
 * 2. innerConsistency between 45-65 (not too high, not too low)
 */
export function validateBecomingMatch(
  match: IdentityMatch,
  userScores: DimensionScores
): IdentityMatch {
  if (match.primary.identityType !== "the-becoming") {
    return match; // Return as-is if not "The Becoming"
  }

  const selfAwarenessOk = userScores.selfAwareness >= 60;
  const innerConsistencyOk =
    userScores.innerConsistency >= 45 &&
    userScores.innerConsistency <= 65;

  if (!selfAwarenessOk || !innerConsistencyOk) {
    // "The Becoming" doesn't match criteria, demote it
    // Return secondary match as primary
    return {
      primary: match.secondary,
      secondary: match.tertiary,
      tertiary: match.allMatches[3],
      allMatches: match.allMatches,
    };
  }

  return match;
}

/**
 * Check for conflicted identities (The Split)
 * "The Split" indicates high selfAwareness but low innerConsistency
 */
export function shouldSuggestSplit(
  userScores: DimensionScores
): boolean {
  return (
    userScores.selfAwareness >= 65 &&
    userScores.innerConsistency <= 35
  );
}

/**
 * Get complete identity info with recommendations
 */
export interface CompleteIdentityResult {
  primary: {
    type: IdentityType;
    name: string;
    description: string;
    corePattern: string;
    similarityScore: number;
  };
  secondary: {
    type: IdentityType;
    name: string;
    description: string;
    similarityScore: number;
  };
  tertiary: {
    type: IdentityType;
    name: string;
    description: string;
    similarityScore: number;
  };
  dimensionScores: DimensionScores;
  keyInsights: string[];
  nextSteps: string[];
}

export function getCompleteResult(
  userScores: DimensionScores
): CompleteIdentityResult {
  let match = identifyType(userScores);
  match = validateBecomingMatch(match, userScores);

  const primaryIdentity = IDENTITIES[match.primary.identityType];
  const secondaryIdentity = IDENTITIES[match.secondary.identityType];
  const tertiaryIdentity = IDENTITIES[match.tertiary.identityType];

  // Generate insights based on dimension scores
  const keyInsights: string[] = [];

  // High self-awareness insight
  if (userScores.selfAwareness >= 75) {
    keyInsights.push(
      "You have strong self-awareness—you understand yourself deeply."
    );
  } else if (userScores.selfAwareness <= 25) {
    keyInsights.push(
      "Self-reflection might help you understand yourself better."
    );
  }

  // Authenticity insight
  if (userScores.authenticity >= 75) {
    keyInsights.push(
      "You live authentically—your actions align with your core self."
    );
  } else if (userScores.authenticity <= 25) {
    keyInsights.push(
      "Consider exploring what prevents you from being fully authentic."
    );
  }

  // External influence insight
  if (userScores.externalInfluence >= 70) {
    keyInsights.push(
      "Others' opinions significantly influence your sense of self."
    );
  } else if (userScores.externalInfluence <= 20) {
    keyInsights.push("You're remarkably resistant to external pressure.");
  }

  // Identity stability insight
  if (userScores.identityStability >= 80) {
    keyInsights.push("Your sense of self remains stable even through change.");
  } else if (userScores.identityStability <= 30) {
    keyInsights.push(
      "Your identity feels fragile or shifts with circumstances."
    );
  }

  // Inner consistency insight
  if (userScores.innerConsistency <= 30 && userScores.selfAwareness >= 65) {
    keyInsights.push(
      "You're aware of genuine contradictions within yourself—this is The Split."
    );
  }

  // Generate next steps based on primary type
  const nextSteps: string[] = [];

  if (primaryIdentity.id === "the-becoming") {
    nextSteps.push("Document one small identity shift you're making right now.");
    nextSteps.push(
      "Identify the core value driving your current transformation."
    );
  } else if (primaryIdentity.id === "the-anchored") {
    nextSteps.push(
      "Explore one area where your anchored identity might limit growth."
    );
    nextSteps.push("Consider: what would you do if you were less anchored?");
  } else if (primaryIdentity.id === "the-shifter") {
    nextSteps.push(
      "Notice who you are when you're alone—that's your core self."
    );
    nextSteps.push("List 3 values that remain true across all contexts.");
  } else if (primaryIdentity.id === "the-masked") {
    nextSteps.push(
      "Identify one trusted person who might appreciate your real self."
    );
    nextSteps.push("What would change if one person knew the real you?");
  } else {
    nextSteps.push(
      `Explore the core pattern of ${primaryIdentity.name}: ${primaryIdentity.corePattern.toLowerCase()}`
    );
    nextSteps.push(
      `Notice how ${primaryIdentity.name}'s strengths show up in your life.`
    );
  }

  return {
    primary: {
      type: match.primary.identityType,
      name: primaryIdentity.name,
      description: primaryIdentity.description,
      corePattern: primaryIdentity.corePattern,
      similarityScore: match.primary.similarityScore,
    },
    secondary: {
      type: match.secondary.identityType,
      name: secondaryIdentity.name,
      description: secondaryIdentity.description,
      similarityScore: match.secondary.similarityScore,
    },
    tertiary: {
      type: match.tertiary.identityType,
      name: tertiaryIdentity.name,
      description: tertiaryIdentity.description,
      similarityScore: match.tertiary.similarityScore,
    },
    dimensionScores: userScores,
    keyInsights,
    nextSteps,
  };
}
