// Real Self vs Current Self Scoring Engine

import { RealSelfDimension, REAL_SELF_QUESTIONS } from "./real-self-questions";

export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export interface DimensionScores {
  self_awareness: number;
  alignment: number;
  authenticity: number;
  confidence: number;
  direction: number;
  emotional_clarity: number;
  action_consistency: number;
  internal_conflict: number;
  identity_suppression: number;
}

export interface RealSelfResult {
  dimensions: DimensionScores;
  currentIdentity: string;
  realIdentity: string;
  gapLevel: string;
  message: string;
  flips?: string[];
}

const SCORE_MAP: Record<AnswerValue, number> = {
  1: -2, // strongly_disagree
  2: -1, // disagree
  3: 0, // neutral
  4: 1, // agree
  5: 2, // strongly_agree
};

const MAX_SCORE_PER_DIMENSION = 4; // 2 questions × max 2 points each

function calculateRawScores(
  answers: Record<number, AnswerValue>,
): DimensionScores {
  const rawScores: DimensionScores = {
    self_awareness: 0,
    alignment: 0,
    authenticity: 0,
    confidence: 0,
    direction: 0,
    emotional_clarity: 0,
    action_consistency: 0,
    internal_conflict: 0,
    identity_suppression: 0,
  };

  REAL_SELF_QUESTIONS.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      const score = SCORE_MAP[answer];
      rawScores[question.dimension] += score;
    }
  });

  return rawScores;
}

function normalizeScores(rawScores: DimensionScores): DimensionScores {
  const normalized: DimensionScores = {
    self_awareness: 0,
    alignment: 0,
    authenticity: 0,
    confidence: 0,
    direction: 0,
    emotional_clarity: 0,
    action_consistency: 0,
    internal_conflict: 0,
    identity_suppression: 0,
  };

  for (const key in rawScores) {
    const value = rawScores[key as RealSelfDimension];
    const normalized_value =
      ((value + MAX_SCORE_PER_DIMENSION) / (2 * MAX_SCORE_PER_DIMENSION)) * 100;
    normalized[key as RealSelfDimension] = Math.round(normalized_value);
  }

  return normalized;
}

function detectCurrentIdentity(d: DimensionScores): string {
  // Current = based on dysfunction/weakness patterns

  if (d.direction < 40 && d.alignment < 40) return "The Drifter";

  if (d.authenticity < 40 && d.identity_suppression > 60) return "The Masked";

  if (d.emotional_clarity < 40 && d.self_awareness < 50) return "The Detached";

  if (d.internal_conflict > 60) return "The Split";

  if (d.action_consistency < 40) return "The Observer";

  return "The Becoming";
}

function detectRealIdentity(d: DimensionScores): string {
  // Real = based on potential/strength patterns

  if (d.self_awareness > 70 && d.direction > 60) return "The Seeker";

  if (d.alignment > 70 && d.authenticity > 70) return "The Anchored";

  if (d.action_consistency > 70 && d.confidence > 60) return "The Pioneer";

  if (d.emotional_clarity > 70) return "The Sage";

  if (d.authenticity > 60 && d.identity_suppression < 40) return "The Creator";

  return "The Becoming";
}

function calculateGap(d: DimensionScores): string {
  let gapScore = 0;

  gapScore += 100 - d.alignment;
  gapScore += d.identity_suppression;
  gapScore += d.internal_conflict;

  const avg = gapScore / 3;

  if (avg > 70) return "High Gap";
  if (avg > 40) return "Moderate Gap";
  return "Low Gap";
}

function generateGapMessage(current: string, real: string): string {
  return `You are currently living as ${current}, but your deeper self aligns with ${real}.`;
}

function detectFlips(
  d: DimensionScores,
  current: string,
  real: string,
): string[] {
  const flips: string[] = [];

  // Core gap insight
  if (d.alignment < 50 && d.authenticity > 60) {
    flips.push(
      "You know who you are, but your behavior doesn't reflect it yet.",
    );
  }

  if (d.self_awareness > 60 && d.action_consistency < 40) {
    flips.push("Self-knowledge without action creates internal frustration.");
  }

  if (d.identity_suppression > 60 && d.confidence > 50) {
    flips.push(
      "You suppress yourself despite having the inner strength to be authentic.",
    );
  }

  if (d.internal_conflict > 60 && d.direction < 40) {
    flips.push(
      "Your conflict stems from unclear vision, not character weakness.",
    );
  }

  if (d.emotional_clarity > 60 && d.alignment < 50) {
    flips.push(
      "You understand yourself emotionally but haven't aligned your life to it.",
    );
  }

  return flips;
}

export function calculateRealSelfResult(
  answers: Record<number, AnswerValue>,
): RealSelfResult {
  const raw = calculateRawScores(answers);
  const d = normalizeScores(raw);

  const current = detectCurrentIdentity(d);
  const real = detectRealIdentity(d);
  const gap = calculateGap(d);
  const message = generateGapMessage(current, real);
  const flips = detectFlips(d, current, real);

  return {
    dimensions: d,
    currentIdentity: current,
    realIdentity: real,
    gapLevel: gap,
    message,
    flips,
  };
}
