// Real Self vs Current Self - 18 Questions
// Maps to 9 dimensions (2 questions per dimension)

export type RealSelfDimension =
  | "self_awareness"
  | "alignment"
  | "authenticity"
  | "confidence"
  | "direction"
  | "emotional_clarity"
  | "action_consistency"
  | "internal_conflict"
  | "identity_suppression";

export interface RealSelfQuestion {
  id: number;
  text: string;
  dimension: RealSelfDimension;
}

export const REAL_SELF_QUESTIONS: RealSelfQuestion[] = [
  // Self Awareness (1-2)
  {
    id: 1,
    text: "I clearly understand who I am as a person.",
    dimension: "self_awareness",
  },
  {
    id: 2,
    text: "I know what truly matters to me in life.",
    dimension: "self_awareness",
  },

  // Alignment (3-4)
  {
    id: 3,
    text: "My actions reflect the person I want to become.",
    dimension: "alignment",
  },
  {
    id: 4,
    text: "I live in a way that feels true to myself.",
    dimension: "alignment",
  },

  // Authenticity (5-6)
  {
    id: 5,
    text: "I behave the same way regardless of who I am with.",
    dimension: "authenticity",
  },
  {
    id: 6,
    text: "I express my true thoughts and feelings honestly.",
    dimension: "authenticity",
  },

  // Confidence (7-8)
  {
    id: 7,
    text: "I trust myself when making important life decisions.",
    dimension: "confidence",
  },
  {
    id: 8,
    text: "I feel secure in who I am, even when others disagree.",
    dimension: "confidence",
  },

  // Direction (9-10)
  {
    id: 9,
    text: "I have a clear sense of where my life is going.",
    dimension: "direction",
  },
  {
    id: 10,
    text: "I know what I am working toward in the long term.",
    dimension: "direction",
  },

  // Emotional Clarity (11-12)
  {
    id: 11,
    text: "I understand my emotions without feeling overwhelmed by them.",
    dimension: "emotional_clarity",
  },
  {
    id: 12,
    text: "I can process my emotions without avoiding or suppressing them.",
    dimension: "emotional_clarity",
  },

  // Action Consistency (13-14)
  {
    id: 13,
    text: "I take actions that align with my intentions.",
    dimension: "action_consistency",
  },
  {
    id: 14,
    text: "I follow through on decisions I make for myself.",
    dimension: "action_consistency",
  },

  // Internal Conflict (15-16)
  {
    id: 15,
    text: "I often feel like different parts of me want different things.",
    dimension: "internal_conflict",
  },
  {
    id: 16,
    text: "I struggle between what I should do and what I actually want.",
    dimension: "internal_conflict",
  },

  // Identity Suppression (17-18)
  {
    id: 17,
    text: "I feel like I am not fully being myself in my daily life.",
    dimension: "identity_suppression",
  },
  {
    id: 18,
    text: "I adjust who I am to fit expectations around me.",
    dimension: "identity_suppression",
  },
];
