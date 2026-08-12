import type { AnswerValue } from "@/lib/test-config";
import { IDENTITY_DIMENSIONS, IDENTITY_PROFILE_QUESTIONS } from "./data";
import type {
  IdentityAnswerEvidence,
  IdentityDimensionKey,
  IdentityDimensionScore,
  IdentityPatternResult,
  IdentityResult,
} from "./types";

const dimensionOrder: IdentityDimensionKey[] = [
  "self_clarity",
  "authenticity",
  "values_alignment",
  "social_adaptation",
  "external_influence",
  "identity_stability",
];

const patternDefinitions = [
  {
    id: "grounded_authentic",
    name: "The Grounded Authentic",
    tagline: "Clear, steady, and naturally aligned.",
    description:
      "You appear to know yourself relatively well and generally allow that self to show up consistently.",
    target: {
      self_clarity: 82,
      authenticity: 82,
      values_alignment: 78,
      social_adaptation: 45,
      external_influence: 35,
      identity_stability: 80,
    },
  },
  {
    id: "adaptive_authentic",
    name: "The Adaptive Authentic",
    tagline: "Flexible without losing yourself.",
    description:
      "You appear to maintain a real sense of self while adjusting your expression across different environments.",
    target: {
      self_clarity: 72,
      authenticity: 76,
      values_alignment: 70,
      social_adaptation: 82,
      external_influence: 45,
      identity_stability: 70,
    },
  },
  {
    id: "private_authentic",
    name: "The Private Authentic",
    tagline: "Clear inside, selective outside.",
    description:
      "You may know yourself clearly while choosing carefully who gets access to your more private self.",
    target: {
      self_clarity: 78,
      authenticity: 52,
      values_alignment: 78,
      social_adaptation: 58,
      external_influence: 42,
      identity_stability: 68,
    },
  },
  {
    id: "values_anchor",
    name: "The Values Anchor",
    tagline: "Identity organized around principles.",
    description:
      "Your identity appears strongly shaped by personal priorities, principles, and what feels internally meaningful.",
    target: {
      self_clarity: 72,
      authenticity: 66,
      values_alignment: 90,
      social_adaptation: 50,
      external_influence: 38,
      identity_stability: 70,
    },
  },
  {
    id: "social_navigator",
    name: "The Social Navigator",
    tagline: "Highly responsive to context.",
    description:
      "You naturally read social environments and adjust how different parts of you are expressed.",
    target: {
      self_clarity: 58,
      authenticity: 58,
      values_alignment: 58,
      social_adaptation: 88,
      external_influence: 58,
      identity_stability: 56,
    },
  },
  {
    id: "approval_navigator",
    name: "The Approval Navigator",
    tagline: "Sensitive to feedback and expectation.",
    description:
      "Approval, expectations, or social response may play a meaningful role in how you present and evaluate yourself.",
    target: {
      self_clarity: 48,
      authenticity: 44,
      values_alignment: 48,
      social_adaptation: 72,
      external_influence: 84,
      identity_stability: 44,
    },
  },
  {
    id: "contextual_self",
    name: "The Contextual Self",
    tagline: "Different settings bring out different selves.",
    description:
      "Different environments may bring out substantially different versions of you, and your identity may feel more context-sensitive.",
    target: {
      self_clarity: 45,
      authenticity: 48,
      values_alignment: 50,
      social_adaptation: 86,
      external_influence: 62,
      identity_stability: 36,
    },
  },
  {
    id: "self_explorer",
    name: "The Self-Explorer",
    tagline: "Still discovering what feels true.",
    description:
      "Your sense of identity appears active, flexible, and still developing rather than fully settled.",
    target: {
      self_clarity: 34,
      authenticity: 48,
      values_alignment: 44,
      social_adaptation: 58,
      external_influence: 58,
      identity_stability: 34,
    },
  },
] as const;

function scoreResponse(response: AnswerValue, scoring: "direct" | "reverse") {
  return scoring === "direct" ? response : 8 - response;
}

function normalizeMean(mean: number) {
  return Math.round(((mean - 1) / 6) * 100);
}

function developmentalBand(score: number) {
  if (score < 30) return "Emerging";
  if (score < 45) return "Developing";
  if (score <= 55) return "Mixed";
  if (score <= 70) return "Established";
  if (score <= 85) return "Strong";
  return "Very Strong";
}

function descriptiveBand(score: number) {
  if (score < 30) return "Minimal";
  if (score < 45) return "Low";
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
  scores: Record<IdentityDimensionKey, number>,
): IdentityPatternResult {
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

function coreSocialAlignment(scores: Record<IdentityDimensionKey, number>) {
  const { authenticity, social_adaptation, external_influence, identity_stability } =
    scores;

  if (authenticity >= 70 && identity_stability >= 65) {
    return {
      level: "High" as const,
      description:
        "Your outward expression appears fairly close to your internal sense of self, even when you adapt to context.",
    };
  }

  if (authenticity < 45 && (social_adaptation >= 65 || external_influence >= 65)) {
    return {
      level: "Low" as const,
      description:
        "There may be a meaningful distance between who you experience yourself to be and what others usually see.",
    };
  }

  return {
    level: "Moderate" as const,
    description:
      "You appear to retain parts of your internal identity while adjusting expression in some environments.",
  };
}

function expressionGap(scores: Record<IdentityDimensionKey, number>) {
  const { authenticity, social_adaptation, external_influence } = scores;

  if (authenticity <= 45 && (social_adaptation >= 65 || external_influence >= 60)) {
    return {
      level: "High" as const,
      description:
        "There appears to be a substantial difference between your internal self and your typical social expression. This can reflect privacy, safety, culture, or social awareness, not fakeness.",
    };
  }

  if (authenticity < 65 && (social_adaptation >= 60 || external_influence >= 60)) {
    return {
      level: "Moderate" as const,
      description:
        "You may selectively adjust or withhold parts of yourself depending on the environment.",
    };
  }

  return {
    level: "Low" as const,
    description:
      "What others see is generally close to how you experience yourself internally.",
  };
}

function internalGrounding(scores: Record<IdentityDimensionKey, number>) {
  const grounding =
    (scores.self_clarity +
      scores.values_alignment +
      scores.identity_stability +
      (100 - scores.external_influence)) /
    4;

  if (grounding >= 70) {
    return {
      level: "Strong" as const,
      description:
        "Your self-definition appears strongly guided by internal clarity, values, and continuity.",
    };
  }

  if (grounding >= 50) {
    return {
      level: "Moderate" as const,
      description:
        "You appear to have some internal grounding, while context and feedback may still shape parts of your self-concept.",
    };
  }

  return {
    level: "Emerging" as const,
    description:
      "Your internal grounding may still be developing, especially when expectations or social feedback are strong.",
  };
}

function buildInsights(scores: Record<IdentityDimensionKey, number>) {
  const insights: string[] = [];

  if (scores.self_clarity >= 70 && scores.authenticity >= 70) {
    insights.push("You appear to know yourself and express that self with relatively strong consistency.");
  }

  if (scores.self_clarity >= 70 && scores.authenticity < 60) {
    insights.push("You may know yourself more clearly than you usually reveal to others.");
  }

  if (scores.social_adaptation >= 70 && scores.authenticity >= 65) {
    insights.push("Your social flexibility does not appear to require abandoning your sense of self.");
  }

  if (scores.external_influence >= 70) {
    insights.push("Feedback, expectations, or approval may carry significant weight in how you evaluate yourself.");
  }

  if (scores.values_alignment >= 75) {
    insights.push("Your identity appears meaningfully shaped by values, priorities, and personal principles.");
  }

  if (scores.identity_stability <= 45) {
    insights.push("Your sense of self may feel more changeable across environments or life transitions.");
  }

  return insights.slice(0, 4);
}

function strongestLabels(scores: Record<IdentityDimensionKey, number>) {
  return dimensionOrder
    .map((key) => ({ key, score: scores[key], label: IDENTITY_DIMENSIONS[key].label }))
    .sort((a, b) => b.score - a.score);
}

export function calculateIdentityResult(
  answers: Record<number, AnswerValue>,
): IdentityResult {
  const answerEvidence: IdentityAnswerEvidence[] = IDENTITY_PROFILE_QUESTIONS.map(
    (question) => {
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
    },
  );

  const rawDimensionScores = {} as Record<IdentityDimensionKey, number>;
  const dimensions = {} as Record<IdentityDimensionKey, IdentityDimensionScore>;

  dimensionOrder.forEach((dimension) => {
    const items = answerEvidence.filter((item) => item.dimension === dimension);
    const mean =
      items.reduce((sum, item) => sum + item.scoredResponse, 0) / items.length;
    const score = normalizeMean(mean);
    const consistency = calculateConsistency(items.map((item) => item.scoredResponse));
    const metadata = IDENTITY_DIMENSIONS[dimension];

    rawDimensionScores[dimension] = score;
    dimensions[dimension] = {
      key: dimension,
      label: metadata.label,
      score,
      band:
        dimension === "external_influence" || dimension === "social_adaptation"
          ? descriptiveBand(score)
          : developmentalBand(score),
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
  const confidence = confidenceFromConsistency(averageConsistency);
  const strongest = strongestLabels(rawDimensionScores);

  return {
    pattern: calculatePattern(rawDimensionScores),
    dimensions,
    coreSocialAlignment: coreSocialAlignment(rawDimensionScores),
    expressionGap: expressionGap(rawDimensionScores),
    internalGrounding: internalGrounding(rawDimensionScores),
    coreSelf: strongest
      .filter((item) =>
        ["self_clarity", "values_alignment", "identity_stability"].includes(
          item.key,
        ),
      )
      .slice(0, 3)
      .map((item) => item.label),
    socialSelf: strongest
      .filter((item) =>
        ["social_adaptation", "external_influence", "authenticity"].includes(
          item.key,
        ),
      )
      .slice(0, 3)
      .map((item) => item.label),
    groundingSignals: strongest
      .filter((item) => item.score >= 65)
      .slice(0, 3)
      .map((item) => `${item.label} (${item.score}%)`),
    adaptationSignals: strongest
      .filter((item) =>
        ["social_adaptation", "external_influence", "authenticity"].includes(
          item.key,
        ),
      )
      .slice(0, 3)
      .map((item) => `${item.label} (${item.score}%)`),
    insights: buildInsights(rawDimensionScores),
    confidence,
    confidenceNotes: [
      `Average response consistency: ${averageConsistency}%`,
      "Neutral or context-dependent answers are valid and reduce certainty only when patterns are unclear.",
    ],
    answerEvidence,
  };
}

export function getIdentityScoresForStorage(result: IdentityResult) {
  return Object.fromEntries(
    dimensionOrder.map((dimension) => [
      dimension,
      result.dimensions[dimension].score,
    ]),
  );
}
