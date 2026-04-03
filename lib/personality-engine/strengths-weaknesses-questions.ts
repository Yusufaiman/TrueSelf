// Your Strengths & Weaknesses Test - 16 Questions
// Maps to 8 traits (2 questions per trait)

export type StrengthsTrait =
  | "strategic_thinking"
  | "emotional_awareness"
  | "discipline"
  | "adaptability"
  | "decision_making"
  | "social_energy"
  | "consistency"
  | "risk_handling";

export interface StrengthsWeaknessesQuestion {
  id: number;
  text: string;
  trait: StrengthsTrait;
}

export const STRENGTHS_WEAKNESSES_QUESTIONS: StrengthsWeaknessesQuestion[] = [
  // Strategic Thinking (1-2)
  {
    id: 1,
    text: "I naturally think in long-term outcomes rather than short-term actions.",
    trait: "strategic_thinking",
  },
  {
    id: 2,
    text: "I tend to analyze situations before taking action.",
    trait: "strategic_thinking",
  },

  // Emotional Awareness (3-4)
  {
    id: 3,
    text: "I understand my emotions and why I feel the way I do.",
    trait: "emotional_awareness",
  },
  {
    id: 4,
    text: "I am aware of how my emotions affect my behavior.",
    trait: "emotional_awareness",
  },

  // Discipline (5-6)
  {
    id: 5,
    text: "I follow through on what I start, even when it becomes difficult.",
    trait: "discipline",
  },
  {
    id: 6,
    text: "I can stay consistent with my responsibilities without needing motivation.",
    trait: "discipline",
  },

  // Adaptability (7-8)
  {
    id: 7,
    text: "I adjust easily when situations change unexpectedly.",
    trait: "adaptability",
  },
  {
    id: 8,
    text: "I can let go of plans when something better comes along.",
    trait: "adaptability",
  },

  // Decision Making (9-10)
  {
    id: 9,
    text: "I can make decisions without getting stuck in overthinking.",
    trait: "decision_making",
  },
  {
    id: 10,
    text: "I trust my judgment when choosing between options.",
    trait: "decision_making",
  },

  // Social Energy (11-12)
  {
    id: 11,
    text: "I feel energized when interacting with people.",
    trait: "social_energy",
  },
  {
    id: 12,
    text: "I am comfortable expressing myself in social situations.",
    trait: "social_energy",
  },

  // Consistency (13-14)
  {
    id: 13,
    text: "I maintain a steady level of effort over time.",
    trait: "consistency",
  },
  {
    id: 14,
    text: "I rarely start things that I do not finish.",
    trait: "consistency",
  },

  // Risk Handling (15-16)
  {
    id: 15,
    text: "I am comfortable taking risks when there is potential benefit.",
    trait: "risk_handling",
  },
  {
    id: 16,
    text: "I can act even when the outcome is uncertain.",
    trait: "risk_handling",
  },
];

export type AnswerValue = 1 | 2 | 3 | 4 | 5;
