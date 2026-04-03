// Strengths & Weaknesses Scoring Engine

import {
  StrengthsTrait,
  STRENGTHS_WEAKNESSES_QUESTIONS,
} from "./strengths-weaknesses-questions";
import { buildTraitPattern, TraitPatternResult } from "./trait-pattern-engine";

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

export interface StrengthsWeaknessesResult extends TraitPatternResult {
  traits: TraitScores;
  title: string;
}

const SCORE_MAP: Record<AnswerValue, number> = {
  1: -2, // strongly_disagree
  2: -1, // disagree
  3: 0, // neutral
  4: 1, // agree
  5: 2, // strongly_agree
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

function calculateRawScores(answers: Record<number, AnswerValue>): TraitScores {
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
    const normalized_value =
      ((score + MAX_SCORE_PER_TRAIT) / (2 * MAX_SCORE_PER_TRAIT)) * 100;
    normalized[traitKey] = Math.round(normalized_value);
  });

  return normalized;
}

export function calculateStrengthsWeaknessesResult(
  answers: Record<number, AnswerValue>,
): StrengthsWeaknessesResult {
  const rawScores = calculateRawScores(answers);
  const traits = normalizeScores(rawScores);
  const patternResult = buildTraitPattern(traits);

  return {
    ...patternResult,
    traits,
    title: patternResult.pattern,
  };
}
