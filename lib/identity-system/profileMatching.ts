/**
 * Profile Matching Algorithm - V2 PATTERN-BASED ENGINE
 * Accurately matches user dimension scores to identity types using pattern matching
 * Eliminates Euclidean distance bias; uses psychological patterns with variance detection
 */

import { IDENTITIES, DimensionScores, IdentityType, Identity } from "./types";
import {
  buildDimensionProfiles,
  DimensionProfileSet,
  type DimensionProfile,
} from "./dimensionEngine";
import { matchIdentities } from "./matchingEngine";
import { calculateDimensionScoresRaw } from "./questions";

interface SimilarityResult {
  identityType: IdentityType;
  similarityScore: number; // 0-100
  matchedDimensions: number; // count of dimensions matching
  explanation: string;
}

interface IdentityMatch {
  primary: SimilarityResult;
  secondary: SimilarityResult;
  tertiary: SimilarityResult;
  allMatches: SimilarityResult[];
}

/**
 * Main matching function - V2 Pattern-based engine
 * Uses psychological pattern matching instead of distance-to-target scoring
 * Eliminates mathematical bias toward mid-range identities
 */
export function identifyType(userScores: DimensionScores): IdentityMatch {
  // V2: Convert averaged dimension scores to DimensionProfileSet
  // When we only have averaged scores (not raw arrays), we treat them as
  // profiles with perfect stability (no variance known)
  const dimensionProfiles: DimensionProfileSet = {
    selfAwareness: {
      mean: userScores.selfAwareness,
      variance: 0,
      stability: 100,
    },
    authenticity: {
      mean: userScores.authenticity,
      variance: 0,
      stability: 100,
    },
    externalInfluence: {
      mean: userScores.externalInfluence,
      variance: 0,
      stability: 100,
    },
    identityStability: {
      mean: userScores.identityStability,
      variance: 0,
      stability: 100,
    },
    emotionalAlignment: {
      mean: userScores.emotionalAlignment,
      variance: 0,
      stability: 100,
    },
    decisionClarity: {
      mean: userScores.decisionClarity,
      variance: 0,
      stability: 100,
    },
    innerConsistency: {
      mean: userScores.innerConsistency,
      variance: 0,
      stability: 100,
    },
    socialExpression: {
      mean: userScores.socialExpression,
      variance: 0,
      stability: 100,
    },
  };

  // Call V2 engine to get pattern-matched results
  const matchResults = matchIdentities(dimensionProfiles);

  // Convert V2 results to SimilarityResult format for compatibility
  const results: SimilarityResult[] = matchResults.all.map((match) => ({
    identityType: match.type,
    similarityScore: Math.round(match.score),
    matchedDimensions: match.matchedConditions,
    explanation: `Pattern match score: ${Math.round(match.score)}%`,
  }));

  return {
    primary: results[0],
    secondary: results[1],
    tertiary: results[2],
    allMatches: results,
  };
}

/**
 * PSYCHOLOGY-BASED MATCHING
 * Fair, unbiased scoring across all 15 identity types
 * No restrictions, no special handling - pure mathematical distance
 */

/**
 * Check for conflicted identities (The Split)
 * "The Split" indicates high selfAwareness with low innerConsistency
 * This is a valid identity pattern showing awareness of internal contradictions
 */
export function shouldSuggestSplit(userScores: DimensionScores): boolean {
  return userScores.selfAwareness >= 65 && userScores.innerConsistency <= 35;
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
  userScores: DimensionScores,
): CompleteIdentityResult {
  // Pure unbiased scoring - no special handling, no restrictions
  const match = identifyType(userScores);

  const primaryIdentity = IDENTITIES[match.primary.identityType];
  const secondaryIdentity = IDENTITIES[match.secondary.identityType];
  const tertiaryIdentity = IDENTITIES[match.tertiary.identityType];

  // Generate insights based on dimension scores
  const keyInsights: string[] = [];

  // High self-awareness insight
  if (userScores.selfAwareness >= 75) {
    keyInsights.push(
      "You have strong self-awareness—you understand yourself deeply.",
    );
  } else if (userScores.selfAwareness <= 25) {
    keyInsights.push(
      "Self-reflection might help you understand yourself better.",
    );
  }

  // Authenticity insight
  if (userScores.authenticity >= 75) {
    keyInsights.push(
      "You live authentically—your actions align with your core self.",
    );
  } else if (userScores.authenticity <= 25) {
    keyInsights.push(
      "Consider exploring what prevents you from being fully authentic.",
    );
  }

  // External influence insight
  if (userScores.externalInfluence >= 70) {
    keyInsights.push(
      "Others' opinions significantly influence your sense of self.",
    );
  } else if (userScores.externalInfluence <= 20) {
    keyInsights.push("You're remarkably resistant to external pressure.");
  }

  // Identity stability insight
  if (userScores.identityStability >= 80) {
    keyInsights.push("Your sense of self remains stable even through change.");
  } else if (userScores.identityStability <= 30) {
    keyInsights.push(
      "Your identity feels fragile or shifts with circumstances.",
    );
  }

  // Inner consistency insight - check for The Split pattern
  if (shouldSuggestSplit(userScores)) {
    keyInsights.push(
      "You're aware of genuine contradictions within yourself—this is The Split.",
    );
  } else if (userScores.innerConsistency <= 30) {
    keyInsights.push(
      "You experience internal conflict between different parts of yourself.",
    );
  }

  // Generate next steps based on primary type
  const nextSteps: string[] = [];

  if (primaryIdentity.id === "the-becoming") {
    nextSteps.push(
      "Document one small identity shift you're making right now.",
    );
    nextSteps.push(
      "Identify the core value driving your current transformation.",
    );
  } else if (primaryIdentity.id === "the-anchored") {
    nextSteps.push(
      "Explore one area where your anchored identity might limit growth.",
    );
    nextSteps.push("Consider: what would you do if you were less anchored?");
  } else if (primaryIdentity.id === "the-shifter") {
    nextSteps.push(
      "Notice who you are when you're alone—that's your core self.",
    );
    nextSteps.push("List 3 values that remain true across all contexts.");
  } else if (primaryIdentity.id === "the-masked") {
    nextSteps.push(
      "Identify one trusted person who might appreciate your real self.",
    );
    nextSteps.push("What would change if one person knew the real you?");
  } else if (primaryIdentity.id === "the-rebuilder") {
    nextSteps.push("Acknowledge the parts of yourself you're reconstructing.");
    nextSteps.push(
      "Notice what wisdom you're gaining through this rebuilding process.",
    );
  } else if (primaryIdentity.id === "the-split") {
    nextSteps.push("Write down the contradictions you're aware of—name them.");
    nextSteps.push(
      "Explore: can these contradictions coexist, or must one be resolved?",
    );
  } else {
    nextSteps.push(
      `Explore the core pattern of ${primaryIdentity.name}: ${primaryIdentity.corePattern.toLowerCase()}`,
    );
    nextSteps.push(
      `Notice how ${primaryIdentity.name}'s strengths show up in your life.`,
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
