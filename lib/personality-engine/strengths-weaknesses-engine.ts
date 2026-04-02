// Strengths & Weaknesses Scoring Engine

import { StrengthsTrait, STRENGTHS_WEAKNESSES_QUESTIONS } from "./strengths-weaknesses-questions";

export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export interface TraitScores {
  strategic_thinking: number;
  emotional_awareness: number;
  discipline: number;
  adaptability: number;
  decision_making: number;
  social_energy: number;
  consistency: number;
  risk_handling: number;
}

export interface StrengthsWeaknessesResult {
  traits: TraitScores;
  strengths: StrengthsTrait[];
  weaknesses: StrengthsTrait[];
  blindspots: StrengthsTrait[];
  flips: string[];
  personality: string;
  title: string;
}

const SCORE_MAP: Record<AnswerValue, number> = {
  1: -2, // strongly_disagree
  2: -1, // disagree
  3: 0,  // neutral
  4: 1,  // agree
  5: 2,  // strongly_agree
};

const MAX_SCORE_PER_TRAIT = 4; // 2 questions × max 2 points each

const TRAIT_LABELS: Record<StrengthsTrait, string> = {
  strategic_thinking: "Strategic Thinking",
  emotional_awareness: "Emotional Awareness",
  discipline: "Discipline",
  adaptability: "Adaptability",
  decision_making: "Decision Making",
  social_energy: "Social Energy",
  consistency: "Consistency",
  risk_handling: "Risk Handling",
};

function calculateRawScores(
  answers: Record<number, AnswerValue>,
): TraitScores {
  const rawScores: TraitScores = {
    strategic_thinking: 0,
    emotional_awareness: 0,
    discipline: 0,
    adaptability: 0,
    decision_making: 0,
    social_energy: 0,
    consistency: 0,
    risk_handling: 0,
  };

  STRENGTHS_WEAKNESSES_QUESTIONS.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      const score = SCORE_MAP[answer];
      rawScores[question.trait] += score;
    }
  });

  return rawScores;
}

function normalizeScores(rawScores: TraitScores): TraitScores {
  const normalized: TraitScores = {
    strategic_thinking: 0,
    emotional_awareness: 0,
    discipline: 0,
    adaptability: 0,
    decision_making: 0,
    social_energy: 0,
    consistency: 0,
    risk_handling: 0,
  };

  Object.entries(rawScores).forEach(([trait, score]) => {
    const traitKey = trait as StrengthsTrait;
    // normalized = ((score + max) / (2 * max)) * 100
    const normalized_value = ((score + MAX_SCORE_PER_TRAIT) / (2 * MAX_SCORE_PER_TRAIT)) * 100;
    normalized[traitKey] = Math.round(normalized_value);
  });

  return normalized;
}

function analyzeTraits(traits: TraitScores): {
  strengths: StrengthsTrait[];
  weaknesses: StrengthsTrait[];
  blindspots: StrengthsTrait[];
} {
  const strengths: StrengthsTrait[] = [];
  const weaknesses: StrengthsTrait[] = [];
  const blindspots: StrengthsTrait[] = [];

  Object.entries(traits).forEach(([trait, value]) => {
    const traitKey = trait as StrengthsTrait;
    if (value >= 70) {
      strengths.push(traitKey);
    } else if (value <= 40) {
      weaknesses.push(traitKey);
    } else {
      blindspots.push(traitKey);
    }
  });

  return { strengths, weaknesses, blindspots };
}

function detectFlips(traits: TraitScores): string[] {
  const insights: string[] = [];

  if (traits.strategic_thinking >= 70 && traits.decision_making <= 40) {
    insights.push(
      "You think deeply, but struggle to act on your decisions. This can lead to analysis paralysis.",
    );
  }

  if (traits.emotional_awareness >= 70 && traits.consistency <= 40) {
    insights.push(
      "You understand emotions well, but struggle to maintain consistency. Your actions may not align with your awareness.",
    );
  }

  if (traits.adaptability >= 70 && traits.strategic_thinking <= 40) {
    insights.push(
      "You adapt easily, but may lack long-term direction. You excel in the moment but struggle with planning.",
    );
  }

  if (traits.discipline >= 70 && traits.adaptability <= 40) {
    insights.push(
      "You are highly disciplined, but may be too rigid in your approach. You might resist necessary changes.",
    );
  }

  if (traits.social_energy >= 70 && traits.emotional_awareness <= 40) {
    insights.push(
      "You are socially energetic, but may not always understand your emotional impact on others.",
    );
  }

  if (traits.decision_making >= 70 && traits.risk_handling <= 40) {
    insights.push(
      "You make decisions confidently, but struggle with uncertainty. You prefer structured outcomes.",
    );
  }

  return insights;
}

function mapToPersonality(traits: TraitScores): string {
  if (traits.strategic_thinking >= 70 && traits.discipline >= 70) {
    return "The Strategic Architect";
  }

  if (traits.emotional_awareness >= 70 && traits.social_energy >= 60) {
    return "The Emotional Navigator";
  }

  if (traits.decision_making >= 70 && traits.risk_handling >= 60) {
    return "The Action Taker";
  }

  if (traits.decision_making <= 40 && traits.strategic_thinking >= 60) {
    return "The Overthinking Prisoner";
  }

  if (traits.consistency >= 70 && traits.discipline >= 70) {
    return "The Relentless Executor";
  }

  if (traits.adaptability >= 70 && traits.social_energy >= 70) {
    return "The Adaptive Connector";
  }

  return "The Balanced Mind";
}

export function calculateStrengthsWeaknessesResult(
  answers: Record<number, AnswerValue>,
): StrengthsWeaknessesResult {
  const rawScores = calculateRawScores(answers);
  const traits = normalizeScores(rawScores);
  const { strengths, weaknesses, blindspots } = analyzeTraits(traits);
  const flips = detectFlips(traits);
  const personality = mapToPersonality(traits);

  return {
    traits,
    strengths,
    weaknesses,
    blindspots,
    flips,
    personality,
    title: `You operate as ${personality}`,
  };
}
