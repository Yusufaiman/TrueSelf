import { DimensionScores, IdentityType } from "./types";

export interface Condition {
  dimension: keyof DimensionScores;
  min?: number;
  max?: number;
}

export interface Trait {
  type: "lowVariance" | "highVariance";
}

export interface IdentityPattern {
  type: IdentityType;
  conditions: Condition[];
  traits?: Trait[];
}

// IDENTITY PATTERNS - Redesigned with psychological specificity
// Balanced ranges that avoid both over-matching and under-matching
// Each type represents a unique psychological constellation
export const IDENTITY_PATTERNS: IdentityPattern[] = [
  // HIGH STABILITY TIER - Know who you are
  {
    type: "the-anchored",
    conditions: [
      { dimension: "selfAwareness", min: 70 },
      { dimension: "identityStability", min: 70 },
      { dimension: "externalInfluence", max: 50 }, // Independent
    ],
  },

  // ACTIVE GROWTH - Building new identity
  {
    type: "the-becoming",
    conditions: [
      { dimension: "identityStability", min: 45, max: 65 }, // Transitional
      { dimension: "selfAwareness", min: 55 },
      { dimension: "authenticity", min: 45 }, // Trying to be real
    ],
  },

  // AWARE CONTRADICTION - High awareness + low consistency
  {
    type: "the-split",
    conditions: [
      { dimension: "selfAwareness", min: 65 },
      { dimension: "innerConsistency", max: 45 },
    ],
  },

  // LOW AWARENESS + LOW CLARITY - Drifting
  {
    type: "the-drifter",
    conditions: [
      { dimension: "selfAwareness", max: 50 },
      { dimension: "decisionClarity", max: 50 },
      { dimension: "externalInfluence", min: 60 }, // Easily swayed
    ],
  },

  // MASK SELF + ADAPT TO OTHERS
  {
    type: "the-masked",
    conditions: [
      { dimension: "authenticity", max: 50 },
      { dimension: "externalInfluence", min: 55 }, // Influenced by others
    ],
  },

  // UNSTABLE + EXTERNAL DRIVEN
  {
    type: "the-shifter",
    conditions: [
      { dimension: "identityStability", max: 50 },
      { dimension: "externalInfluence", min: 65 },
    ],
  },

  // UNSTABLE + SELF-AWARE
  {
    type: "the-rebuilder",
    conditions: [
      { dimension: "identityStability", max: 55 },
      { dimension: "selfAwareness", min: 60 },
    ],
  },

  // LOW CLARITY + SEARCHING
  {
    type: "the-seeker",
    conditions: [
      { dimension: "decisionClarity", max: 55 },
      { dimension: "externalInfluence", min: 50 },
    ],
  },

  // HIGH AWARENESS + LOW EXPRESSION
  {
    type: "the-observer",
    conditions: [
      { dimension: "selfAwareness", min: 70 },
      { dimension: "socialExpression", max: 50 },
    ],
  },

  // EMOTIONALLY DISCONNECTED
  {
    type: "the-detached",
    conditions: [
      { dimension: "emotionalAlignment", max: 50 },
      { dimension: "socialExpression", max: 55 },
    ],
  },

  // CREATIVE + AUTHENTIC
  {
    type: "the-creator",
    conditions: [
      { dimension: "authenticity", min: 70 },
      { dimension: "emotionalAlignment", min: 70 },
    ],
  },

  // CARING FOR OTHERS
  {
    type: "the-caregiver",
    conditions: [
      { dimension: "emotionalAlignment", min: 70 },
      { dimension: "socialExpression", min: 70 },
    ],
  },

  // DEEPLY CONNECTED RELATIONSHIPS
  {
    type: "the-lover",
    conditions: [
      { dimension: "authenticity", min: 70 },
      { dimension: "emotionalAlignment", min: 70 },
      { dimension: "socialExpression", min: 75 },
    ],
  },

  // WISDOM + CONSISTENCY
  {
    type: "the-sage",
    conditions: [
      { dimension: "selfAwareness", min: 75 },
      { dimension: "innerConsistency", min: 70 },
    ],
  },

  // CLEAR DIRECTION
  {
    type: "the-pioneer",
    conditions: [
      { dimension: "decisionClarity", min: 70 },
      { dimension: "authenticity", min: 65 },
    ],
  },
];
