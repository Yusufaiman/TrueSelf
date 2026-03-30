/**
 * TrueSelf Identity Assessment Questions (48 items)
 * 6 questions per dimension
 * Includes reverse-scored items for psychological validity
 */

import { DimensionScores } from "./types";

export type { DimensionScores };

export interface IdentityQuestion {
  id: number;
  text: string;
  dimension: keyof DimensionScores;
  reversed: boolean; // true = reverse scoring (5 becomes 1, 4 becomes 2, etc.)
}

export const IDENTITY_QUESTIONS: IdentityQuestion[] = [
  // Self-Awareness (6 questions)
  {
    id: 1,
    text: "I have a clear understanding of my strengths and weaknesses.",
    dimension: "selfAwareness",
    reversed: false,
  },
  {
    id: 2,
    text: "I often feel confused about why I do the things I do.",
    dimension: "selfAwareness",
    reversed: true,
  },
  {
    id: 3,
    text: "I know what values are most important to me.",
    dimension: "selfAwareness",
    reversed: false,
  },
  {
    id: 4,
    text: "I avoid thinking too deeply about who I really am.",
    dimension: "selfAwareness",
    reversed: true,
  },
  {
    id: 5,
    text: "I can accurately describe how others perceive me.",
    dimension: "selfAwareness",
    reversed: false,
  },
  {
    id: 6,
    text: "I'm often surprised by my own reactions and behaviors.",
    dimension: "selfAwareness",
    reversed: true,
  },

  // Authenticity (6 questions)
  {
    id: 7,
    text: "I feel comfortable being myself around most people.",
    dimension: "authenticity",
    reversed: false,
  },
  {
    id: 8,
    text: "I often hide my true thoughts and feelings to fit in.",
    dimension: "authenticity",
    reversed: true,
  },
  {
    id: 9,
    text: "My actions align with my core values.",
    dimension: "authenticity",
    reversed: false,
  },
  {
    id: 10,
    text: "I present a different version of myself depending on who I'm with.",
    dimension: "authenticity",
    reversed: true,
  },
  {
    id: 11,
    text: "People see the real me, not a facade.",
    dimension: "authenticity",
    reversed: false,
  },
  {
    id: 12,
    text: "I compromise my true self to gain approval from others.",
    dimension: "authenticity",
    reversed: true,
  },

  // External Influence (6 questions)
  {
    id: 13,
    text: "I make decisions based primarily on what others think.",
    dimension: "externalInfluence",
    reversed: false,
  },
  {
    id: 14,
    text: "I'm confident in my choices regardless of criticism.",
    dimension: "externalInfluence",
    reversed: true,
  },
  {
    id: 15,
    text: "My identity changes based on who I'm around.",
    dimension: "externalInfluence",
    reversed: false,
  },
  {
    id: 16,
    text: "I am resistant to peer pressure.",
    dimension: "externalInfluence",
    reversed: true,
  },
  {
    id: 17,
    text: "I often wonder what others think of me.",
    dimension: "externalInfluence",
    reversed: false,
  },
  {
    id: 18,
    text: "I trust my own judgment over others' opinions.",
    dimension: "externalInfluence",
    reversed: true,
  },

  // Identity Stability (6 questions)
  {
    id: 19,
    text: "Major life changes shake my sense of who I am.",
    dimension: "identityStability",
    reversed: true,
  },
  {
    id: 20,
    text: "I know who I am and that remains consistent across situations.",
    dimension: "identityStability",
    reversed: false,
  },
  {
    id: 21,
    text: "I feel lost when my circumstances change dramatically.",
    dimension: "identityStability",
    reversed: true,
  },
  {
    id: 22,
    text: "My core sense of self is grounded and stable.",
    dimension: "identityStability",
    reversed: false,
  },
  {
    id: 23,
    text: "I struggle to maintain a consistent sense of identity.",
    dimension: "identityStability",
    reversed: true,
  },
  {
    id: 24,
    text: "Even when things change, I know who I am.",
    dimension: "identityStability",
    reversed: false,
  },

  // Emotional Alignment (6 questions)
  {
    id: 25,
    text: "I feel disconnected from my own emotions.",
    dimension: "emotionalAlignment",
    reversed: true,
  },
  {
    id: 26,
    text: "My emotions generally align with my thoughts and actions.",
    dimension: "emotionalAlignment",
    reversed: false,
  },
  {
    id: 27,
    text: "I often feel numb or detached from my experiences.",
    dimension: "emotionalAlignment",
    reversed: true,
  },
  {
    id: 28,
    text: "I can honestly express what I feel.",
    dimension: "emotionalAlignment",
    reversed: false,
  },
  {
    id: 29,
    text: "My emotional life feels separate from who I really am.",
    dimension: "emotionalAlignment",
    reversed: true,
  },
  {
    id: 30,
    text: "I'm in touch with my emotional truth.",
    dimension: "emotionalAlignment",
    reversed: false,
  },

  // Decision Clarity (6 questions)
  {
    id: 31,
    text: "When making decisions, I know what matters most to me.",
    dimension: "decisionClarity",
    reversed: false,
  },
  {
    id: 32,
    text: "I'm often uncertain about what I really want.",
    dimension: "decisionClarity",
    reversed: true,
  },
  {
    id: 33,
    text: "My decisions reflect a clear sense of purpose.",
    dimension: "decisionClarity",
    reversed: false,
  },
  {
    id: 34,
    text: "I struggle to make decisions without input from others.",
    dimension: "decisionClarity",
    reversed: true,
  },
  {
    id: 35,
    text: "I have a clear direction for my life.",
    dimension: "decisionClarity",
    reversed: false,
  },
  {
    id: 36,
    text: "I drift through decisions without clear criteria.",
    dimension: "decisionClarity",
    reversed: true,
  },

  // Inner Consistency (6 questions)
  {
    id: 37,
    text: "I find myself wanting conflicting things.",
    dimension: "innerConsistency",
    reversed: true,
  },
  {
    id: 38,
    text: "My beliefs and actions are generally aligned.",
    dimension: "innerConsistency",
    reversed: false,
  },
  {
    id: 39,
    text: "I feel torn between different parts of myself.",
    dimension: "innerConsistency",
    reversed: true,
  },
  {
    id: 40,
    text: "My values guide my behavior consistently.",
    dimension: "innerConsistency",
    reversed: false,
  },
  {
    id: 41,
    text: "I'm aware of contradictions within myself.",
    dimension: "innerConsistency",
    reversed: true,
  },
  {
    id: 42,
    text: "There's harmony between different aspects of who I am.",
    dimension: "innerConsistency",
    reversed: false,
  },

  // Social Expression (6 questions)
  {
    id: 43,
    text: "I can comfortably express who I am in social situations.",
    dimension: "socialExpression",
    reversed: false,
  },
  {
    id: 44,
    text: "I feel self-conscious about revealing myself to others.",
    dimension: "socialExpression",
    reversed: true,
  },
  {
    id: 45,
    text: "People know the real me, not just a surface version.",
    dimension: "socialExpression",
    reversed: false,
  },
  {
    id: 46,
    text: "I keep most of myself hidden in social situations.",
    dimension: "socialExpression",
    reversed: true,
  },
  {
    id: 47,
    text: "I'm able to be vulnerable with people I trust.",
    dimension: "socialExpression",
    reversed: false,
  },
  {
    id: 48,
    text: "I struggle to show my true self to others.",
    dimension: "socialExpression",
    reversed: true,
  },
];

/**
 * Response scoring helper
 * Converts 1-5 Likert responses to 0-100 scale
 * Accounts for reverse-scored items
 */
export function scoreResponse(response: number, reversed: boolean): number {
  const normalizedResponse = reversed ? 6 - response : response;
  return (normalizedResponse - 1) * 25; // 1-5 → 0-100
}

export function calculateDimensionScores(
  responses: Record<number, number>,
): DimensionScores {
  const dimensionScores: Record<keyof DimensionScores, number[]> = {
    selfAwareness: [],
    authenticity: [],
    externalInfluence: [],
    identityStability: [],
    emotionalAlignment: [],
    decisionClarity: [],
    innerConsistency: [],
    socialExpression: [],
  };

  IDENTITY_QUESTIONS.forEach((question) => {
    const response = responses[question.id];
    if (response !== undefined) {
      const score = scoreResponse(response, question.reversed);
      dimensionScores[question.dimension].push(score);
    }
  });

  // Calculate average for each dimension
  const averageScores: DimensionScores = {
    selfAwareness: dimensionScores.selfAwareness.length
      ? dimensionScores.selfAwareness.reduce((a, b) => a + b, 0) /
        dimensionScores.selfAwareness.length
      : 0,
    authenticity: dimensionScores.authenticity.length
      ? dimensionScores.authenticity.reduce((a, b) => a + b, 0) /
        dimensionScores.authenticity.length
      : 0,
    externalInfluence: dimensionScores.externalInfluence.length
      ? dimensionScores.externalInfluence.reduce((a, b) => a + b, 0) /
        dimensionScores.externalInfluence.length
      : 0,
    identityStability: dimensionScores.identityStability.length
      ? dimensionScores.identityStability.reduce((a, b) => a + b, 0) /
        dimensionScores.identityStability.length
      : 0,
    emotionalAlignment: dimensionScores.emotionalAlignment.length
      ? dimensionScores.emotionalAlignment.reduce((a, b) => a + b, 0) /
        dimensionScores.emotionalAlignment.length
      : 0,
    decisionClarity: dimensionScores.decisionClarity.length
      ? dimensionScores.decisionClarity.reduce((a, b) => a + b, 0) /
        dimensionScores.decisionClarity.length
      : 0,
    innerConsistency: dimensionScores.innerConsistency.length
      ? dimensionScores.innerConsistency.reduce((a, b) => a + b, 0) /
        dimensionScores.innerConsistency.length
      : 0,
    socialExpression: dimensionScores.socialExpression.length
      ? dimensionScores.socialExpression.reduce((a, b) => a + b, 0) /
        dimensionScores.socialExpression.length
      : 0,
  };

  return averageScores;
}
