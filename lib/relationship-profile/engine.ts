import type { AnswerValue } from "@/lib/test-config";
import {
  CONFLICT_RELATIONSHIP_DIMENSIONS,
  PRIMARY_RELATIONSHIP_DIMENSIONS,
  RELATIONSHIP_DIMENSIONS,
  RELATIONSHIP_STYLE_QUESTIONS,
} from "./data";
import type {
  RelationshipAnswerEvidence,
  RelationshipDimensionKey,
  RelationshipDimensionScore,
  RelationshipPatternResult,
  RelationshipStyleResult,
} from "./types";

const dimensionOrder: RelationshipDimensionKey[] = [
  ...PRIMARY_RELATIONSHIP_DIMENSIONS,
  ...CONFLICT_RELATIONSHIP_DIMENSIONS,
];

const patternDefinitions = [
  {
    id: "secure_connector",
    name: "The Secure Connector",
    tagline: "Close, steady, and communicative.",
    description:
      "You appear comfortable building meaningful connection while maintaining enough trust and security for relationships to feel stable.",
    target: {
      emotional_closeness: 82,
      communication_openness: 80,
      trust_orientation: 78,
      relational_independence: 68,
      care_expression: 78,
      relationship_security: 82,
      conflict_direct: 72,
      conflict_avoidance: 28,
      conflict_accommodation: 48,
      conflict_escalation: 24,
    },
  },
  {
    id: "independent_connector",
    name: "The Independent Connector",
    tagline: "Connected without losing autonomy.",
    description:
      "You may value meaningful relationships while strongly preserving your own direction, interests, and personal space.",
    target: {
      emotional_closeness: 62,
      communication_openness: 68,
      trust_orientation: 62,
      relational_independence: 88,
      care_expression: 62,
      relationship_security: 70,
      conflict_direct: 62,
      conflict_avoidance: 38,
      conflict_accommodation: 36,
      conflict_escalation: 32,
    },
  },
  {
    id: "deep_bond_builder",
    name: "The Deep Bond Builder",
    tagline: "Depth, care, and emotional investment.",
    description:
      "You appear to invest deeply in important relationships and may prefer fewer connections that feel emotionally meaningful.",
    target: {
      emotional_closeness: 90,
      communication_openness: 72,
      trust_orientation: 78,
      relational_independence: 48,
      care_expression: 88,
      relationship_security: 72,
      conflict_direct: 56,
      conflict_avoidance: 42,
      conflict_accommodation: 62,
      conflict_escalation: 32,
    },
  },
  {
    id: "careful_opener",
    name: "The Careful Opener",
    tagline: "Trust grows gradually.",
    description:
      "You may take time before allowing people into your inner world, while still being capable of meaningful care once trust is earned.",
    target: {
      emotional_closeness: 45,
      communication_openness: 58,
      trust_orientation: 42,
      relational_independence: 70,
      care_expression: 62,
      relationship_security: 56,
      conflict_direct: 52,
      conflict_avoidance: 54,
      conflict_accommodation: 44,
      conflict_escalation: 28,
    },
  },
  {
    id: "harmony_keeper",
    name: "The Harmony Keeper",
    tagline: "Careful with tension, oriented toward peace.",
    description:
      "You may prioritize preserving connection and emotional calm, sometimes delaying direct disagreement to keep the relationship steady.",
    target: {
      emotional_closeness: 62,
      communication_openness: 48,
      trust_orientation: 58,
      relational_independence: 46,
      care_expression: 76,
      relationship_security: 58,
      conflict_direct: 38,
      conflict_avoidance: 76,
      conflict_accommodation: 82,
      conflict_escalation: 22,
    },
  },
  {
    id: "direct_resolver",
    name: "The Direct Resolver",
    tagline: "Clear, direct, and repair-oriented.",
    description:
      "You appear more likely to address issues directly and clarify problems before they build into larger distance.",
    target: {
      emotional_closeness: 60,
      communication_openness: 86,
      trust_orientation: 64,
      relational_independence: 70,
      care_expression: 60,
      relationship_security: 66,
      conflict_direct: 90,
      conflict_avoidance: 18,
      conflict_accommodation: 38,
      conflict_escalation: 28,
    },
  },
  {
    id: "adaptive_partner",
    name: "The Adaptive Partner",
    tagline: "Responsive to what the relationship needs.",
    description:
      "You appear able to adjust between care, autonomy, communication, and compromise depending on the relationship context.",
    target: {
      emotional_closeness: 66,
      communication_openness: 68,
      trust_orientation: 62,
      relational_independence: 66,
      care_expression: 70,
      relationship_security: 62,
      conflict_direct: 62,
      conflict_avoidance: 46,
      conflict_accommodation: 64,
      conflict_escalation: 32,
    },
  },
  {
    id: "guarded_independent",
    name: "The Guarded Independent",
    tagline: "Autonomy first, closeness gradually.",
    description:
      "You may protect your independence and allow closeness more gradually, especially when trust has not yet been established.",
    target: {
      emotional_closeness: 34,
      communication_openness: 48,
      trust_orientation: 35,
      relational_independence: 88,
      care_expression: 45,
      relationship_security: 48,
      conflict_direct: 54,
      conflict_avoidance: 50,
      conflict_accommodation: 22,
      conflict_escalation: 34,
    },
  },
] as const;

function scoreResponse(response: AnswerValue, scoring: "direct" | "reverse") {
  return scoring === "direct" ? response : 8 - response;
}

function normalizeMean(mean: number) {
  return Math.round(((mean - 1) / 6) * 100);
}

function band(score: number) {
  if (score < 30) return "Low";
  if (score < 45) return "Lower";
  if (score <= 55) return "Moderate";
  if (score <= 70) return "Noticeable";
  if (score <= 85) return "High";
  return "Very High";
}

function confidenceFromConsistency(consistency: number) {
  if (consistency >= 75) return "High";
  if (consistency >= 55) return "Moderate";
  return "Limited";
}

function calculateConsistency(values: number[]) {
  if (values.length < 2) return 100;

  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const averageDistance =
    values.reduce((sum, value) => sum + Math.abs(value - mean), 0) /
    values.length;

  return Math.max(0, Math.round(100 - (averageDistance / 3) * 100));
}

function calculatePattern(
  scores: Record<RelationshipDimensionKey, number>,
): RelationshipPatternResult {
  const matches = patternDefinitions.map((pattern) => {
    const averageDistance =
      dimensionOrder.reduce(
        (sum, dimension) =>
          sum + Math.abs(scores[dimension] - pattern.target[dimension]),
        0,
      ) / dimensionOrder.length;

    return {
      pattern,
      matchScore: Math.max(0, Math.round(100 - averageDistance)),
    };
  });

  const best = matches.sort((a, b) => b.matchScore - a.matchScore)[0];

  return {
    id: best.pattern.id,
    name: best.pattern.name,
    tagline: best.pattern.tagline,
    description: best.pattern.description,
    matchScore: best.matchScore,
  };
}

function closenessStyle(scores: Record<RelationshipDimensionKey, number>) {
  if (scores.emotional_closeness >= 70 && scores.trust_orientation >= 65) {
    return "Open";
  }
  if (scores.emotional_closeness <= 45 || scores.trust_orientation <= 45) {
    return "Private / Selective";
  }
  return "Gradual";
}

function communicationStyle(scores: Record<RelationshipDimensionKey, number>) {
  if (scores.communication_openness >= 70 && scores.conflict_direct >= 65) {
    return "Direct";
  }
  if (scores.communication_openness <= 45 || scores.conflict_avoidance >= 65) {
    return "Reserved";
  }
  return "Measured";
}

function independenceStyle(scores: Record<RelationshipDimensionKey, number>) {
  if (scores.relational_independence >= 72) return "Autonomous";
  if (scores.relational_independence <= 45 && scores.emotional_closeness >= 60) {
    return "Connection-Oriented";
  }
  return "Interdependent";
}

function conflictStyle(scores: Record<RelationshipDimensionKey, number>) {
  const direct = scores.conflict_direct;
  const avoidance = scores.conflict_avoidance;
  const accommodation = scores.conflict_accommodation;
  const escalation = scores.conflict_escalation;

  if (direct >= 70 && avoidance <= 45 && escalation <= 55) {
    return "Direct Resolver";
  }
  if (accommodation >= 65 && avoidance >= 55 && escalation <= 55) {
    return "Harmony Preserver";
  }
  if (avoidance >= 65 && direct <= 55) {
    return "Reflective Avoider";
  }
  if (direct >= 65 && escalation >= 65 && avoidance <= 55) {
    return "Forceful Challenger";
  }
  if (direct >= 60 && accommodation >= 50 && escalation <= 55) {
    return "Adaptive Resolver";
  }
  return "Mixed / Contextual";
}

function relationshipNeeds(scores: Record<RelationshipDimensionKey, number>) {
  const needs: string[] = [];

  if (scores.communication_openness >= 65) {
    needs.push("Clear communication and fewer unspoken expectations.");
  }
  if (scores.emotional_closeness >= 70) {
    needs.push("Room for emotional depth, honesty, and personal sharing.");
  }
  if (scores.relational_independence >= 70) {
    needs.push("Respect for autonomy, personal space, and individual direction.");
  }
  if (scores.relationship_security <= 50) {
    needs.push("Consistent reassurance and clarity when distance or uncertainty appears.");
  }
  if (scores.trust_orientation <= 50) {
    needs.push("Trust that is built gradually through consistent behaviour.");
  }
  if (scores.conflict_direct >= 65) {
    needs.push("Constructive disagreement instead of pretending issues are not there.");
  }

  return needs.slice(0, 5);
}

function strengths(scores: Record<RelationshipDimensionKey, number>) {
  const items: string[] = [];

  if (scores.communication_openness >= 65) items.push("Communicating what matters");
  if (scores.care_expression >= 65) items.push("Showing care visibly");
  if (scores.relational_independence >= 65) items.push("Maintaining individuality");
  if (scores.relationship_security >= 65) items.push("Staying steady through distance");
  if (scores.trust_orientation >= 65) items.push("Allowing earned trust");
  if (scores.conflict_direct >= 65 && scores.conflict_escalation <= 55) {
    items.push("Addressing conflict constructively");
  }

  return items.length ? items.slice(0, 5) : ["Context-sensitive relationship awareness"];
}

function frictionPoints(scores: Record<RelationshipDimensionKey, number>) {
  const items: string[] = [];

  if (scores.relational_independence >= 75 && scores.emotional_closeness <= 50) {
    items.push("Others may sometimes read your need for space as emotional distance.");
  }
  if (scores.conflict_avoidance >= 65) {
    items.push("Important concerns may stay unspoken longer than is useful.");
  }
  if (scores.conflict_accommodation >= 70) {
    items.push("You may preserve harmony before saying what you actually need.");
  }
  if (scores.conflict_escalation >= 65) {
    items.push("Conflict may become more intense when you feel strongly misunderstood.");
  }
  if (scores.relationship_security <= 45) {
    items.push("Small signs of distance may feel more significant than they actually are.");
  }
  if (scores.care_expression <= 45) {
    items.push("People may not always know how much you care unless it is expressed more clearly.");
  }

  return items.length ? items.slice(0, 5) : ["No strong friction pattern stood out from this assessment."];
}

function insights(scores: Record<RelationshipDimensionKey, number>) {
  const items: string[] = [];

  if (scores.emotional_closeness >= 70 && scores.relational_independence >= 70) {
    items.push("You may value both emotional depth and a strong sense of individuality.");
  }
  if (scores.trust_orientation <= 50 && scores.care_expression >= 65) {
    items.push("You may show care before you fully allow yourself to trust.");
  }
  if (scores.communication_openness >= 70 && scores.conflict_avoidance >= 60) {
    items.push("You can communicate clearly, but tension may still make timing difficult.");
  }
  if (scores.relationship_security >= 70 && scores.conflict_direct >= 65) {
    items.push("Security and direct repair may help you keep relationships stable through disagreement.");
  }
  if (scores.conflict_accommodation >= 70 && scores.relational_independence <= 55) {
    items.push("You may sometimes give ground to preserve closeness, even when your own preference matters.");
  }

  return items.slice(0, 4);
}

function careStyle(score: number) {
  if (score >= 70) return "Expressive Care";
  if (score <= 45) return "Reserved Care";
  return "Moderate Care Expression";
}

export function calculateRelationshipResult(
  answers: Record<number, AnswerValue>,
): RelationshipStyleResult {
  const answerEvidence: RelationshipAnswerEvidence[] =
    RELATIONSHIP_STYLE_QUESTIONS.map((question) => {
      const rawResponse = answers[question.id] ?? 4;
      return {
        questionId: question.id,
        questionCode: question.code,
        rawResponse,
        scoredResponse: scoreResponse(rawResponse, question.scoring),
        dimension: question.dimension,
        scoring: question.scoring,
        facet: question.facet,
      };
    });

  const rawScores = {} as Record<RelationshipDimensionKey, number>;
  const dimensions = {} as Record<
    RelationshipDimensionKey,
    RelationshipDimensionScore
  >;

  dimensionOrder.forEach((dimension) => {
    const items = answerEvidence.filter((item) => item.dimension === dimension);
    const mean =
      items.reduce((sum, item) => sum + item.scoredResponse, 0) / items.length;
    const score = normalizeMean(mean);
    const consistency = calculateConsistency(items.map((item) => item.scoredResponse));
    const metadata = RELATIONSHIP_DIMENSIONS[dimension];

    rawScores[dimension] = score;
    dimensions[dimension] = {
      key: dimension,
      label: metadata.label,
      score,
      band: band(score),
      description: metadata.description,
      consistency,
      confidence: confidenceFromConsistency(consistency),
    };
  });

  const averageConsistency = Math.round(
    dimensionOrder.reduce(
      (sum, dimension) => sum + dimensions[dimension].consistency,
      0,
    ) / dimensionOrder.length,
  );

  return {
    pattern: calculatePattern(rawScores),
    dimensions,
    closenessStyle: closenessStyle(rawScores),
    communicationStyle: communicationStyle(rawScores),
    independenceStyle: independenceStyle(rawScores),
    conflictStyle: conflictStyle(rawScores),
    relationshipNeeds: relationshipNeeds(rawScores),
    careStyle: careStyle(rawScores.care_expression),
    strengths: strengths(rawScores),
    frictionPoints: frictionPoints(rawScores),
    insights: insights(rawScores),
    confidence: confidenceFromConsistency(averageConsistency),
    confidenceNotes: [
      `Average response consistency: ${averageConsistency}%`,
      "Relationship scores describe tendencies, not relationship health or compatibility with a specific person.",
    ],
    answerEvidence,
  };
}

export function getRelationshipScoresForStorage(result: RelationshipStyleResult) {
  return Object.fromEntries(
    dimensionOrder.map((dimension) => [
      dimension,
      result.dimensions[dimension].score,
    ]),
  );
}
