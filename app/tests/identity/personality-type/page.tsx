"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  Brain,
  Zap,
  Heart,
  Users,
  Gauge,
  Lightbulb,
  Target,
  BarChart3,
  CheckCircle2,
  Clipboard,
  RotateCcw,
  TrendingUp,
  AlertCircle,
  Eye,
  Moon,
  Star,
  Sparkles,
  Activity,
  Compass,
} from "lucide-react";
import Link from "next/link";

type AnswerValue = 1 | 2 | 3 | 4 | 5;

// ==================== TYPES ====================

interface Question {
  id: number;
  text: string;
  weights: {
    logic?: number;
    intuition?: number;
    reflection?: number;
    decisiveness?: number;
    emotionalSensitivity?: number;
    emotionalControl?: number;
    socialEnergy?: number;
    socialDepth?: number;
    discipline?: number;
    impulsiveness?: number;
    riskTolerance?: number;
    flexibility?: number;
  };
  reverse?: boolean;
}

interface DimensionScores {
  logic: number;
  intuition: number;
  reflection: number;
  decisiveness: number;
  emotionalSensitivity: number;
  emotionalControl: number;
  socialEnergy: number;
  socialDepth: number;
  discipline: number;
  impulsiveness: number;
  riskTolerance: number;
  flexibility: number;
}

interface PersonalityResult {
  primaryType: string;
  primaryTypeId: string;
  secondaryType: string;
  secondaryTypeId: string;
  shadowType: string;
  shadowTypeId: string;
  growthType: string;
  growthTypeId: string;
  scores: DimensionScores;
  family: string;
}

// ==================== 40 QUESTIONS ====================

const QUESTIONS: Question[] = [
  // Phase 1: Thinking Style (Q1-Q8)
  {
    id: 1,
    text: "I prefer making decisions based on logic and facts rather than gut feelings.",
    weights: { logic: 2, intuition: -1 },
    reverse: false,
  },
  {
    id: 2,
    text: "I trust my intuition when faced with uncertain situations.",
    weights: { intuition: 2, logic: -1 },
    reverse: false,
  },
  {
    id: 3,
    text: "I like to think things through before acting.",
    weights: { reflection: 2, impulsiveness: -1 },
    reverse: false,
  },
  {
    id: 4,
    text: "I often act on impulse without overthinking.",
    weights: { impulsiveness: 2, reflection: -1 },
    reverse: false,
  },
  {
    id: 5,
    text: "I naturally see patterns and connections others miss.",
    weights: { intuition: 2, logic: 1 },
    reverse: false,
  },
  {
    id: 6,
    text: "I prefer working with concrete, observable facts.",
    weights: { logic: 2, intuition: -1 },
    reverse: false,
  },
  {
    id: 7,
    text: "I get caught in analysis paralysis sometimes.",
    weights: { reflection: 2 },
    reverse: false,
  },
  {
    id: 8,
    text: "I can make quick decisions even with incomplete information.",
    weights: { decisiveness: 2, reflection: -1 },
    reverse: false,
  },

  // Phase 2: Decision Making (Q9-Q16)
  {
    id: 9,
    text: "Once I decide something, I commit fully.",
    weights: { decisiveness: 2, flexibility: -1 },
    reverse: false,
  },
  {
    id: 10,
    text: "I often change my mind when new information emerges.",
    weights: { flexibility: 2, decisiveness: -1 },
    reverse: false,
  },
  {
    id: 11,
    text: "I like to have all options open rather than narrow things down.",
    weights: { flexibility: 2, decisiveness: -1 },
    reverse: false,
  },
  {
    id: 12,
    text: "I feel uncomfortable with ambiguity; I prefer clear decisions.",
    weights: { decisiveness: 2, flexibility: -1 },
    reverse: false,
  },
  {
    id: 13,
    text: "I'm willing to take risks if the potential payoff is high.",
    weights: { riskTolerance: 2 },
    reverse: false,
  },
  {
    id: 14,
    text: "I prefer playing it safe to avoid failure.",
    weights: { riskTolerance: -2 },
    reverse: false,
  },
  {
    id: 15,
    text: "I make decisions based on my values, not just facts.",
    weights: { emotionalSensitivity: 1, logic: -1 },
    reverse: false,
  },
  {
    id: 16,
    text: "I can separate emotion from logic when deciding.",
    weights: { emotionalControl: 2, emotionalSensitivity: -1 },
    reverse: false,
  },

  // Phase 3: Emotional Response (Q17-Q24)
  {
    id: 17,
    text: "I feel emotions deeply and can be overwhelmed by them.",
    weights: { emotionalSensitivity: 2, emotionalControl: -1 },
    reverse: false,
  },
  {
    id: 18,
    text: "I rarely feel intensely emotional about things.",
    weights: { emotionalControl: 2, emotionalSensitivity: -1 },
    reverse: false,
  },
  {
    id: 19,
    text: "I can sense when someone is upset, even if they hide it.",
    weights: { emotionalSensitivity: 2, socialDepth: 1 },
    reverse: false,
  },
  {
    id: 20,
    text: "I struggle to understand why people get so emotional.",
    weights: { emotionalControl: 1, emotionalSensitivity: -2 },
    reverse: false,
  },
  {
    id: 21,
    text: "I tend to bottle up my emotions rather than express them.",
    weights: { emotionalControl: 2 },
    reverse: false,
  },
  {
    id: 22,
    text: "When stressed, I become withdrawn and introspective.",
    weights: { reflection: 1, emotionalSensitivity: 1 },
    reverse: false,
  },
  {
    id: 23,
    text: "I recover quickly from emotional setbacks.",
    weights: { emotionalControl: 2 },
    reverse: false,
  },
  {
    id: 24,
    text: "I often take things personally.",
    weights: { emotionalSensitivity: 2, emotionalControl: -1 },
    reverse: false,
  },

  // Phase 4: Social Behavior (Q25-Q32)
  {
    id: 25,
    text: "I gain energy from being around other people.",
    weights: { socialEnergy: 2 },
    reverse: false,
  },
  {
    id: 26,
    text: "I need significant time alone to recharge.",
    weights: { socialEnergy: -2 },
    reverse: false,
  },
  {
    id: 27,
    text: "I prefer deep conversations with a few people over large gatherings.",
    weights: { socialDepth: 2, socialEnergy: -1 },
    reverse: false,
  },
  {
    id: 28,
    text: "I'm comfortable being the center of attention.",
    weights: { socialEnergy: 2 },
    reverse: false,
  },
  {
    id: 29,
    text: "I struggle to maintain close, intimate relationships.",
    weights: { socialDepth: -2 },
    reverse: false,
  },
  {
    id: 30,
    text: "I connect easily with people and build relationships naturally.",
    weights: { socialEnergy: 1, socialDepth: 1 },
    reverse: false,
  },
  {
    id: 31,
    text: "I'm selective about my social circles; quality over quantity.",
    weights: { socialDepth: 2, socialEnergy: -1 },
    reverse: false,
  },
  {
    id: 32,
    text: "People find me approachable and easy to talk to.",
    weights: { socialEnergy: 1, emotionalSensitivity: 1 },
    reverse: false,
  },

  // Phase 5: Self-Control & Habits (Q33-Q40)
  {
    id: 33,
    text: "I follow through on my commitments consistently.",
    weights: { discipline: 2, impulsiveness: -1 },
    reverse: false,
  },
  {
    id: 34,
    text: "I struggle with procrastination and staying focused.",
    weights: { discipline: -2 },
    reverse: false,
  },
  {
    id: 35,
    text: "I thrive with structure and clear routines.",
    weights: { discipline: 2, flexibility: -1 },
    reverse: false,
  },
  {
    id: 36,
    text: "I prefer spontaneity and dislike rigid schedules.",
    weights: { flexibility: 2, discipline: -1 },
    reverse: false,
  },
  {
    id: 37,
    text: "I often abandon plans when something more interesting comes up.",
    weights: { impulsiveness: 2, discipline: -1 },
    reverse: false,
  },
  {
    id: 38,
    text: "I hold myself to high standards and expect the same from others.",
    weights: { discipline: 1, logic: 1 },
    reverse: false,
  },
  {
    id: 39,
    text: "I adapt well to unexpected changes.",
    weights: { flexibility: 2, discipline: -1 },
    reverse: false,
  },
  {
    id: 40,
    text: "I find it hard to break bad habits even when I want to.",
    weights: { discipline: -2 },
    reverse: false,
  },
];

const ANSWER_OPTIONS = [
  { value: 1 as AnswerValue, label: "Strongly Disagree", color: "#EF4444" },
  { value: 2 as AnswerValue, label: "Disagree", color: "#F97316" },
  { value: 3 as AnswerValue, label: "Neutral", color: "#9CA3AF" },
  { value: 4 as AnswerValue, label: "Agree", color: "#22C55E" },
  { value: 5 as AnswerValue, label: "Strongly Agree", color: "#14B8A6" },
];

// ==================== SCORING ENGINE ====================

/**
 * NEW SYMMETRIC ANSWER SCALE
 * =============================
 * 1 (Strongly Disagree) → -2
 * 2 (Disagree)          → -1
 * 3 (Neutral)           →  0
 * 4 (Agree)             → +1
 * 5 (Strongly Agree)    → +2
 *
 * This creates symmetric psychological scoring with:
 * - Center at 0 (neutral)
 * - Symmetrical extremes (-2, +2)
 * - No linear bias
 */
function convertAnswerToScore(answer: AnswerValue): number {
  const mapping: Record<AnswerValue, number> = {
    1: -2,
    2: -1,
    3: 0,
    4: 1,
    5: 2,
  };
  return mapping[answer];
}

/**
 * REBUILT SCORING ENGINE - Zero Bias System
 * ==========================================
 * Key improvements:
 * 1. All weights treated as positive (no distortion from negative weights)
 * 2. Reverse flag applies simple negation: -mappedValue
 * 3. Per-dimension max weight tracking (not fixed "100 * weight")
 * 4. True range normalization: ((score - min) / (max - min)) × 100
 * 5. Neutral answers (all 3s) → 50% across all dimensions
 *
 * This eliminates:
 * ✗ Weighting imbalance
 * ✗ Artificial inflation through "100 - score"
 * ✗ Dimensional bias from uneven question distribution
 */
function calculateDimensions(answers: (AnswerValue | null)[]): DimensionScores {
  const dimensionRawScores: DimensionScores = {
    logic: 0,
    intuition: 0,
    reflection: 0,
    decisiveness: 0,
    emotionalSensitivity: 0,
    emotionalControl: 0,
    socialEnergy: 0,
    socialDepth: 0,
    discipline: 0,
    impulsiveness: 0,
    riskTolerance: 0,
    flexibility: 0,
  };

  // Track TOTAL WEIGHT for each dimension (not 100 * weight)
  const dimensionTotalWeights: Record<string, number> = {};
  for (const dim in dimensionRawScores) {
    dimensionTotalWeights[dim] = 0;
  }

  // STEP 1: Process each answer
  answers.forEach((answer, index) => {
    if (answer === null) return;

    const question = QUESTIONS[index];

    // Map answer to symmetric scale (-2 to +2)
    let mappedValue = convertAnswerToScore(answer);

    // Apply reverse flag (negates the mapped value)
    if (question.reverse) {
      mappedValue = -mappedValue;
    }

    // STEP 2: Apply weights to each dimension
    Object.entries(question.weights).forEach(([dim, weight]) => {
      // Use absolute value of weight (removes negative weight distortion)
      const absWeight = Math.abs(weight);

      // Calculate contribution
      // For negative original weights, apply sign correction
      const contribution =
        weight < 0 ? mappedValue * absWeight * -1 : mappedValue * absWeight;

      dimensionRawScores[dim as keyof DimensionScores] += contribution;
      dimensionTotalWeights[dim] += absWeight;
    });
  });

  // STEP 3: Normalize using TRUE RANGE
  const normalized: DimensionScores = {
    logic: 0,
    intuition: 0,
    reflection: 0,
    decisiveness: 0,
    emotionalSensitivity: 0,
    emotionalControl: 0,
    socialEnergy: 0,
    socialDepth: 0,
    discipline: 0,
    impulsiveness: 0,
    riskTolerance: 0,
    flexibility: 0,
  };

  for (const dim in normalized) {
    const totalWeight = dimensionTotalWeights[dim];

    if (totalWeight === 0) {
      // No questions for this dimension - default to center
      normalized[dim as keyof DimensionScores] = 50;
      continue;
    }

    // Calculate min and max possible for this dimension
    const minPossible = totalWeight * -2; // lowest answer × total weight
    const maxPossible = totalWeight * 2; // highest answer × total weight

    // Get raw score for this dimension
    const rawScore = dimensionRawScores[dim as keyof DimensionScores];

    // Normalize to 0-100 using true range
    // Formula: ((rawScore - minPossible) / (maxPossible - minPossible)) × 100
    const range = maxPossible - minPossible;
    const normalizedScore = ((rawScore - minPossible) / range) * 100;

    // Ensure within bounds (should naturally be 0-100, but cap for safety)
    normalized[dim as keyof DimensionScores] = Math.round(
      Math.max(0, Math.min(100, normalizedScore)),
    );
  }

  // VALIDATION: Check for neutral baseline (all 3s should be ~50 across all dimensions)
  // This validates that our system produces balanced scoring
  if (
    answers.every((a) => a === 3) &&
    Object.values(normalized).some((score) => Math.abs(score - 50) > 2)
  ) {
    console.warn(
      "⚠️ Scoring bias detected: Neutral answers should produce ~50% for all dimensions.",
      normalized,
    );
  }

  return normalized;
}

// ==================== PERSONALITY TYPE MAPPING ====================

const PERSONALITY_TYPES: Record<string, any> = {
  "strategic-architect": {
    id: "strategic-architect",
    name: "The Strategic Architect",
    family: "thinkers",
    tagline: "You think deeply, plan carefully, and build systems.",
    description:
      "Your mind works in frameworks. You analyze situations carefully, anticipate consequences, and build solid strategies. You trust structure, logic, and your own careful thinking.",
  },
  "silent-analyst": {
    id: "silent-analyst",
    name: "The Silent Analyst",
    family: "thinkers",
    tagline: "You observe, analyze, and understand deeply.",
    description:
      "You prefer to watch and think rather than talk and act. Your superpower is observation—you notice what others miss.",
  },
  "emotional-navigator": {
    id: "emotional-navigator",
    name: "The Emotional Navigator",
    family: "feelers",
    tagline: "You feel deeply and connect authentically.",
    description:
      "You navigate the emotional landscape with grace. You sense what others feel and create space for authentic connection.",
  },
  "relentless-executor": {
    id: "relentless-executor",
    name: "The Relentless Executor",
    family: "doers",
    tagline: "You make decisions and make things happen.",
    description:
      "You turn intentions into action. You're disciplined, decisive, and driven to move forward.",
  },
  "adaptive-chameleon": {
    id: "adaptive-chameleon",
    name: "The Adaptive Chameleon",
    family: "adapters",
    tagline: "You adjust, flow, and find balance.",
    description:
      "You're naturally flexible and able to adapt to any situation. You find balance in complexity.",
  },
  "overthinking-prisoner": {
    id: "overthinking-prisoner",
    name: "The Overthinking Prisoner",
    family: "strugglers",
    tagline: "You think deeply but struggle to decide.",
    description:
      "Your mind is brilliant but sometimes gets stuck in analysis. You're your own biggest obstacle.",
  },
};

// Type matching formulas
function calculateTypeScores(scores: DimensionScores): Record<string, number> {
  return {
    "strategic-architect":
      scores.logic * 0.3 +
      scores.reflection * 0.25 +
      scores.discipline * 0.25 +
      scores.decisiveness * 0.2 -
      scores.impulsiveness * 0.1,
    "silent-analyst":
      scores.logic * 0.3 +
      scores.reflection * 0.3 +
      (100 - scores.socialEnergy) * 0.2 +
      scores.emotionalControl * 0.2,
    "emotional-navigator":
      scores.emotionalSensitivity * 0.35 +
      scores.emotionalControl * 0.25 +
      scores.socialDepth * 0.25 +
      scores.intuition * 0.15,
    "relentless-executor":
      scores.discipline * 0.3 +
      scores.decisiveness * 0.3 +
      scores.emotionalControl * 0.2 +
      scores.riskTolerance * 0.2,
    "adaptive-chameleon":
      scores.flexibility * 0.35 +
      scores.socialDepth * 0.25 +
      scores.emotionalControl * 0.2 +
      scores.intuition * 0.2,
    "overthinking-prisoner":
      scores.reflection * 0.35 +
      (100 - scores.decisiveness) * 0.35 +
      (100 - scores.discipline) * 0.2 +
      scores.emotionalSensitivity * 0.1,
  };
}

function getPersonalityResult(scores: DimensionScores): PersonalityResult {
  const typeScores = calculateTypeScores(scores);
  const sortedTypes = Object.entries(typeScores).sort(([, a], [, b]) => b - a);

  const primaryTypeId = sortedTypes[0][0];
  const secondaryTypeId = sortedTypes[1][0];

  // Shadow type logic (opposite of primary)
  let shadowTypeId = "overthinking-prisoner";
  if (primaryTypeId === "overthinking-prisoner") {
    shadowTypeId = "relentless-executor";
  }

  // Growth type logic
  let growthTypeId = "strategic-architect";
  const primaryFamily = PERSONALITY_TYPES[primaryTypeId].family;
  if (primaryFamily === "strugglers") {
    growthTypeId = "emotional-navigator";
  }

  return {
    primaryType: PERSONALITY_TYPES[primaryTypeId].name,
    primaryTypeId,
    secondaryType: PERSONALITY_TYPES[secondaryTypeId].name,
    secondaryTypeId,
    shadowType: PERSONALITY_TYPES[shadowTypeId].name,
    shadowTypeId,
    growthType: PERSONALITY_TYPES[growthTypeId].name,
    growthTypeId,
    scores,
    family: PERSONALITY_TYPES[primaryTypeId].family,
  };
}

// ==================== MAIN COMPONENT ====================

export default function PersonalityTypeTest() {
  const [stage, setStage] = useState<
    "intro" | "questions" | "loading" | "result"
  >("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(AnswerValue | null)[]>(
    Array(QUESTIONS.length).fill(null),
  );
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [showRestartModal, setShowRestartModal] = useState(false);

  const handleAnswer = useCallback(
    (value: AnswerValue) => {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = value;
      setAnswers(newAnswers);
    },
    [answers, currentQuestion],
  );

  const handleNext = useCallback(() => {
    if (answers[currentQuestion] === null) return;
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  }, [currentQuestion, answers]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }, [currentQuestion]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (stage !== "questions") return;
      if (e.key === "Enter") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    },
    [stage, handleNext, handlePrevious],
  );

  const handleSubmit = useCallback(() => {
    setStage("loading");
    setTimeout(() => {
      const dimensions = calculateDimensions(answers);
      const personalityResult = getPersonalityResult(dimensions);
      setResult(personalityResult);
      setStage("result");
    }, 1500);
  }, [answers]);

  const handleRestart = useCallback(() => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setCurrentQuestion(0);
    setResult(null);
    setShowRestartModal(false);
    setStage("intro");
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // ========== STAGE: INTRO ==========
  if (stage === "intro") {
    return (
      <div className="flex items-center justify-center min-h-screen px-6 py-12 bg-white">
        <div className="max-w-xl w-full rounded-3xl border border-slate-200 shadow-sm bg-white px-8 md:px-10 py-10 md:py-12 text-center">
          {/* Icon Container */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-blue-50">
              <Clipboard size={32} className="text-blue-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mt-5">
            Test guidelines
          </h1>

          {/* Guidelines List */}
          <div className="mt-5 space-y-4 text-sm md:text-base text-slate-600">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={20}
                style={{ color: "#5CE1E6" }}
                className="shrink-0 mt-0.5"
              />
              <p className="text-left">
                Answer each statement based on your personal opinion
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={20}
                style={{ color: "#5CE1E6" }}
                className="shrink-0 mt-0.5"
              />
              <p className="text-left">
                You cannot skip questions, but you can return to them later
              </p>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={() => setStage("questions")}
            className="w-full mt-6 px-6 py-3.5 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Start test
          </button>

          {/* Info Text */}
          <p className="text-xs text-slate-500 mt-4">
            Takes approximately 5 minutes to complete
          </p>
        </div>
      </div>
    );
  }

  // ========== STAGE: QUESTIONS ==========
  if (stage === "questions") {
    const question = QUESTIONS[currentQuestion];
    const currentAnswer = answers[currentQuestion];
    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Restart Modal */}
          {showRestartModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Restart test?
                </h2>
                <p className="text-slate-600 mb-8">
                  You will lose your current progress.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowRestartModal(false)}
                    className="px-4 py-2 rounded-lg border-2 border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setCurrentQuestion(0);
                      setAnswers(Array(QUESTIONS.length).fill(null));
                      setShowRestartModal(false);
                    }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg transition"
                  >
                    Restart
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Top Controls: Back + Restart */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              {currentQuestion > 0 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              )}
            </div>
            <button
              onClick={() => setShowRestartModal(true)}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              <RotateCcw size={16} />
              Restart
            </button>
          </div>

          {/* Progress Section */}
          <div className="mb-10">
            {/* Progress Text */}
            <div className="flex justify-between items-center mb-3 text-sm">
              <span className="text-gray-600">{Math.round(progress)}%</span>
              <span className="text-gray-600">
                Step {currentQuestion + 1} of {QUESTIONS.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundImage:
                    "linear-gradient(to right, #3b82f6, #06b6d4)",
                }}
              />
            </div>
          </div>

          {/* Question - Moved ABOVE Answer Scale */}
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed">
              {question.text}
            </h2>
          </div>

          {/* Instruction Text */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600">
              Choose how accurately each statement reflects you.
            </p>
          </div>

          {/* Answer Scale - PERFECTLY LINEAR */}
          <div className="flex justify-between items-center gap-2 mb-12 px-4">
            {ANSWER_OPTIONS.map((option) => (
              <div
                key={option.value}
                className="flex flex-col items-center gap-3"
              >
                {/* Circle Button */}
                <button
                  onClick={() => handleAnswer(option.value)}
                  className="flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all border-gray-300 hover:border-gray-400 hover:scale-110 bg-white"
                  style={
                    currentAnswer === option.value
                      ? {
                          borderColor: option.color,
                          boxShadow: `0 0 0 2px white, 0 0 0 4px ${option.color}`,
                        }
                      : {}
                  }
                  title={option.label}
                >
                  {/* Inner dot when selected */}
                  {currentAnswer === option.value && (
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: option.color }}
                    />
                  )}
                </button>

                {/* Label */}
                <span className="text-xs text-gray-600 text-center whitespace-normal max-w-[55px]">
                  {option.label}
                </span>
              </div>
            ))}
          </div>

          {/* Navigation Button */}
          <button
            onClick={handleNext}
            disabled={currentAnswer === null}
            className={`w-full py-3 rounded-lg font-medium transition-all ${
              currentAnswer === null
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md hover:shadow-lg hover:scale-105"
            }`}
          >
            {currentQuestion === QUESTIONS.length - 1
              ? "Complete Test"
              : "Next"}
          </button>

          {/* Keyboard Hint */}
          {currentAnswer !== null && (
            <p className="text-xs text-slate-400 text-center mt-3">
              Press Enter to continue
            </p>
          )}

          {/* Progress indicator dots - Match Test 1 style */}
          <div className="flex justify-center gap-1 mt-10">
            {QUESTIONS.map((_, index) => (
              <div
                key={index}
                className="h-2 rounded-full transition-all"
                style={{
                  width: index <= currentQuestion ? "24px" : "8px",
                  backgroundColor:
                    index <= currentQuestion ? "#4399E6" : "#D1D5DB",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ========== STAGE: LOADING ==========
  if (stage === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6 animate-pulse">
            <Brain size={40} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Analyzing your answers
          </h2>
          <p className="text-slate-600">Creating your personality profile...</p>
        </div>
      </div>
    );
  }

  // Helper: Get trait interpretation
  const getTraitInterpretation = (label: string, score: number): string => {
    const level = score < 40 ? "Low" : score < 65 ? "Balanced" : "High";
    const interpretations: Record<string, Record<string, string>> = {
      Logic: {
        Low: "You prioritize feelings and relationships over pure analysis.",
        Balanced: "You balance reasoning with other perspectives and values.",
        High: "You rely on facts and reasoning to understand the world.",
      },
      Intuition: {
        Low: "You prefer concrete evidence and proven methods.",
        Balanced:
          "You blend instinct with evidence to make sense of situations.",
        High: "You rely on pattern recognition and gut feelings often.",
      },
      Decisiveness: {
        Low: "You take time before committing to decisions.",
        Balanced:
          "You decide with reasonable confidence when you have enough information.",
        High: "You make choices quickly and commit fully.",
      },
      "Emotional Control": {
        Low: "Your emotions influence your reactions noticeably.",
        Balanced: "You manage your emotions while still feeling them deeply.",
        High: "You stay composed under pressure.",
      },
      "Emotional Sensitivity": {
        Low: "You're less affected by emotional nuance.",
        Balanced: "You feel emotions and can tune into others' feelings.",
        High: "You feel deeply and notice emotional subtleties.",
      },
      "Social Energy": {
        Low: "You prefer small groups or one-on-one time.",
        Balanced: "You engage socially but also need recovery time.",
        High: "You energize around people and thrive in social settings.",
      },
      Discipline: {
        Low: "You struggle with sustained effort on routine tasks.",
        Balanced: "You can maintain focus on goals you care about.",
        High: "You follow through consistently on commitments.",
      },
      Flexibility: {
        Low: "You prefer established systems and clear structures.",
        Balanced: "You adapt when needed while maintaining your core values.",
        High: "You adjust easily to changing circumstances.",
      },
    };
    return (
      interpretations[label]?.[level] ||
      "You show a balanced approach to this trait."
    );
  };

  // Helper: Get decision style insights
  const getDecisionStyle = (scores: DimensionScores): string[] => {
    const insights: string[] = [];
    if (scores.decisiveness > 65)
      insights.push(
        "You prefer to decide quickly rather than deliberate endlessly.",
      );
    else if (scores.decisiveness < 40)
      insights.push("You take time to consider options before committing.");
    if (scores.reflection > 65)
      insights.push("You think deeply about implications before acting.");
    if (scores.logic > 65 && scores.intuition < 50)
      insights.push("You trust facts and evidence in your decisions.");
    if (scores.intuition > 65 && scores.logic < 50)
      insights.push("You rely on your gut feelings and pattern recognition.");
    if (scores.flexibility > 65)
      insights.push("You adjust decisions based on new information easily.");
    return insights.length > 0
      ? insights
      : [
          "You balance analysis with action in your decision-making.",
          "You make choices that feel both thoughtful and authentic.",
        ];
  };

  // Helper: Get blindspots
  const getBlindspots = (scores: DimensionScores): string[] => {
    const blindspots: string[] = [];
    if (scores.reflection > 70 && scores.decisiveness < 50)
      blindspots.push("You mistake thinking for progress—action matters.");
    if (scores.discipline > 70 && scores.flexibility < 45)
      blindspots.push(
        "Your structure can become rigid when the world changes.",
      );
    if (scores.emotionalControl > 70 && scores.emotionalSensitivity < 45)
      blindspots.push(
        "You may not notice others' unspoken needs because you focus on logic.",
      );
    if (scores.socialEnergy > 70)
      blindspots.push(
        "Your constant engagement can exhaust those who recharge alone.",
      );
    if (scores.impulsiveness > 60)
      blindspots.push("You can act before fully considering consequences.");
    return blindspots.length > 0
      ? blindspots
      : [
          "Your strengths can become weaknesses if overused.",
          "You might not recognize when your approach needs adjusting.",
        ];
  };

  // Helper: Get actionable steps
  const getActionableSteps = (scores: DimensionScores): string[] => {
    const steps: string[] = [];
    if (scores.reflection > 65 && scores.decisiveness < 50)
      steps.push(
        "Make one decision this week without waiting for perfect information.",
      );
    if (scores.discipline > 70)
      steps.push(
        "Deliberately practice flexibility—do something unplanned this week.",
      );
    if (scores.emotionalControl > 70)
      steps.push("Check in with one person about how they're really feeling.");
    if (scores.socialEnergy > 70)
      steps.push(
        "Schedule alone time intentionally—it's not selfish, it's necessary.",
      );
    if (scores.impulsiveness > 60)
      steps.push("Pause for 10 seconds before making important decisions.");
    if (scores.logic > 70 && scores.emotionalSensitivity < 50)
      steps.push("Ask someone how they feel before giving them advice.");
    return steps.slice(0, 5);
  };

  // Helper: Get growth direction
  const getGrowthDirection = (scores: DimensionScores): string => {
    if (scores.reflection > 70 && scores.decisiveness < 50) {
      return "Your growth happens when you trust your instincts enough to act. You don't need to know everything before moving forward.";
    }
    if (scores.discipline > 75 && scores.flexibility < 40) {
      return "You grow fastest when you allow flexibility into your structure. The ability to adjust is not weakness—it's wisdom.";
    }
    if (scores.emotionalControl > 75 && scores.emotionalSensitivity < 45) {
      return "Your next level is learning to lead with both mind and heart. People connect with you more when they see more of you.";
    }
    if (scores.socialEnergy > 70 && scores.socialDepth < 50) {
      return "Your growth path goes deeper. From broad connection to meaningful depth—quality over quantity transforms everything.";
    }
    return "You grow by trusting your strengths while staying curious about your edges. You're already on the path.";
  };

  // Helper: Get pressure response
  const getPressureResponse = (scores: DimensionScores): string => {
    if (scores.reflection > 70 && scores.decisiveness < 50) {
      return "When overwhelmed, you over-analyze options and struggle to move forward. Your remedy: Set a decision deadline and commit.";
    }
    if (scores.discipline > 75) {
      return "Under pressure, you become rigid and controlling. Your remedy: Breathe, delegate, and trust others.";
    }
    if (scores.emotionalControl > 75) {
      return "When stressed, you shut down emotionally and become unreachable. Your remedy: Express what you're feeling, even partially.";
    }
    if (scores.socialEnergy > 70) {
      return "Under pressure, you overcommit and burn out. Your remedy: Say no to one thing you can't sustain.";
    }
    return "You handle pressure reasonably well, but you have your breaking point. Recognize the pattern early.";
  };

  // Helper: Get advantages
  const getAdvantages = (scores: DimensionScores): string[] => {
    const advantages: string[] = [];
    if (scores.logic > 65)
      advantages.push(
        "Strategic Clarity: You cut through noise to what matters.",
      );
    if (scores.intuition > 65)
      advantages.push("Pattern Recognition: You sense what others miss.");
    if (scores.reflection > 65)
      advantages.push(
        "Thoughtfulness: You consider implications others overlook.",
      );
    if (scores.emotionalSensitivity > 65)
      advantages.push("Emotional Awareness: You pick up on unspoken needs.");
    if (scores.discipline > 65)
      advantages.push(
        "Follow-Through: You deliver what you promise consistently.",
      );
    if (scores.flexibility > 65)
      advantages.push(
        "Adaptability: You thrive when others struggle with change.",
      );
    return advantages.slice(0, 4);
  };

  // ========== STAGE: RESULT ==========
  if (stage === "result" && result) {
    const primaryType = PERSONALITY_TYPES[result.primaryTypeId];
    const secondaryType = PERSONALITY_TYPES[result.secondaryTypeId];
    const shadowType = PERSONALITY_TYPES[result.shadowTypeId];
    const growthType = PERSONALITY_TYPES[result.growthTypeId];

    const decisionStyle = getDecisionStyle(result.scores);
    const blindspots = getBlindspots(result.scores);
    const advantages = getAdvantages(result.scores);
    const actionableSteps = getActionableSteps(result.scores);
    const pressureResponse = getPressureResponse(result.scores);
    const growthDirection = getGrowthDirection(result.scores);

    const dimensionsList = [
      { label: "Logic", value: result.scores.logic },
      { label: "Intuition", value: result.scores.intuition },
      { label: "Decisiveness", value: result.scores.decisiveness },
      { label: "Emotional Control", value: result.scores.emotionalControl },
      {
        label: "Emotional Sensitivity",
        value: result.scores.emotionalSensitivity,
      },
      { label: "Social Energy", value: result.scores.socialEnergy },
      { label: "Discipline", value: result.scores.discipline },
      { label: "Flexibility", value: result.scores.flexibility },
    ];

    return (
      <div className="min-h-screen bg-slate-50 py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Top Badge */}
          <div className="flex justify-center mb-6">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
              Personality Profile
            </span>
          </div>

          {/* Main Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              You are
            </h1>
            <h2
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ color: "#4399E6" }}
            >
              {primaryType.name}
            </h2>
            <p className="text-lg md:text-xl text-slate-500 italic mb-4">
              "{primaryType.tagline}"
            </p>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {primaryType.description}
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="w-full max-w-md mx-auto h-48 rounded-xl bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center mb-12">
            <p className="text-slate-400 text-sm">Result image placeholder</p>
          </div>

          {/* Dimensions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {dimensionsList.map((dim, idx) => {
              const percentage = Math.min(
                100,
                Math.max(0, Math.round((dim.value / 100) * 100)),
              );

              const colorMap: Record<
                string,
                { color: string; light: string; text: string }
              > = {
                Logic: {
                  color: "bg-blue-500",
                  light: "bg-blue-50",
                  text: "text-blue-600",
                },
                Intuition: {
                  color: "bg-purple-500",
                  light: "bg-purple-50",
                  text: "text-purple-600",
                },
                Decisiveness: {
                  color: "bg-cyan-500",
                  light: "bg-cyan-50",
                  text: "text-cyan-600",
                },
                "Emotional Control": {
                  color: "bg-indigo-500",
                  light: "bg-indigo-50",
                  text: "text-indigo-600",
                },
                "Emotional Sensitivity": {
                  color: "bg-pink-500",
                  light: "bg-pink-50",
                  text: "text-pink-600",
                },
                "Social Energy": {
                  color: "bg-amber-500",
                  light: "bg-amber-50",
                  text: "text-amber-600",
                },
                Discipline: {
                  color: "bg-emerald-500",
                  light: "bg-emerald-50",
                  text: "text-emerald-600",
                },
                Flexibility: {
                  color: "bg-orange-500",
                  light: "bg-orange-50",
                  text: "text-orange-600",
                },
              };

              const colors = colorMap[dim.label] || {
                color: "bg-slate-500",
                light: "bg-slate-50",
                text: "text-slate-600",
              };

              return (
                <div
                  key={idx}
                  className={`${colors.light} border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-200`}
                >
                  {/* Top Row: Icon + Label + Percentage */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-900">
                      {dim.label}
                    </span>
                    <span
                      className={`${colors.light} px-3 py-1 rounded-lg text-slate-900 font-bold text-lg`}
                    >
                      {percentage}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 rounded-full bg-white border border-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${colors.color}`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* What's Really Going On */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={20} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                What's really going on
              </h3>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 leading-relaxed">
                {result.scores.reflection > 70 &&
                result.scores.decisiveness < 45
                  ? "You're caught between thinking and doing. Your mind is constantly analyzing. This analytical depth is a gift—you see nuances others miss. But it can freeze you into indecision."
                  : result.scores.discipline > 75 &&
                      result.scores.flexibility < 40
                    ? "You've built systems and structures that work. You're reliable and consistent. But these same structures can become rigid, limiting your adaptability when the world changes."
                    : result.scores.emotionalControl > 75 &&
                        result.scores.emotionalSensitivity > 60
                      ? "You feel deeply inside but present calmly outside. This creates an internal separation—others think you're unmoved when you're actually full of feeling. Integration is your growth edge."
                      : result.scores.socialEnergy > 70 &&
                          result.scores.socialDepth > 65
                        ? "You bring people together naturally. You're energizing and present. But make sure the connections go deep enough to feel meaningful to you, not just surface-level."
                        : "You're navigating the normal human complexity: wanting both connection and solitude, both stability and growth, both authenticity and adaptation."}
              </p>
            </div>
          </div>

          {/* How You Make Decisions */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-12">
            <div className="flex items-center gap-2 mb-3">
              <Compass size={20} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                How you make decisions
              </h3>
            </div>
            <div className="space-y-2">
              {decisionStyle.map((insight, idx) => (
                <p key={idx} className="text-sm text-slate-700">
                  • {insight}
                </p>
              ))}
            </div>
          </div>

          {/* Your Blindspots */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={20} className="text-red-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                What you might not realize
              </h3>
            </div>
            <div className="space-y-3">
              {blindspots.map((blindspot, idx) => (
                <div
                  key={idx}
                  className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3 items-start"
                >
                  <AlertCircle
                    size={16}
                    className="text-red-500 mt-0.5 flex-shrink-0"
                  />
                  <p className="text-sm text-slate-700">{blindspot}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Your Hidden Strengths */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-emerald-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                Your hidden strengths
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {advantages.map((advantage, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-start gap-2"
                >
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 mt-0.5 flex-shrink-0"
                  />
                  <p className="text-xs text-slate-700 font-medium">
                    {advantage.split(":")[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Under Pressure */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 mb-12">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={20} className="text-white" />
              <h3 className="text-lg font-semibold">If nothing changes</h3>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              {pressureResponse}
            </p>
          </div>

          {/* Actionable Steps */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={20} className="text-indigo-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                What you should start doing
              </h3>
            </div>
            <div className="space-y-3">
              {actionableSteps.map((action, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 items-start"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                    <span className="text-xs font-bold text-blue-600">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="pt-0.5 flex-1">
                    <p className="text-sm text-slate-700">{action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Type */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Your secondary type
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              You also embody elements of...
            </p>
            <h4 className="font-bold text-lg text-slate-900 mb-2">
              {secondaryType.name}
            </h4>
            <p className="text-sm text-slate-700">
              {secondaryType.description}
            </p>
          </div>

          {/* Shadow Type */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Your shadow type
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Under stress, you may become...
            </p>
            <h4 className="font-bold text-lg text-slate-900 mb-2">
              {shadowType.name}
            </h4>
            <p className="text-sm text-slate-700">{shadowType.description}</p>
          </div>

          {/* Growth Type */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-12">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Your growth type
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              You're evolving toward...
            </p>
            <h4 className="font-bold text-lg text-slate-900 mb-2">
              {growthType.name}
            </h4>
            <p className="text-sm text-slate-700">{growthType.description}</p>
          </div>

          {/* Closing Statement */}
          <div
            className="rounded-2xl p-8 mb-8 text-center"
            style={{ backgroundColor: "#4399E6" }}
          >
            <p className="text-white text-lg font-semibold italic">
              "{growthDirection}"
            </p>
          </div>

          {/* CTA Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Want to understand yourself deeper?
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Unlock deeper insights about your patterns
            </p>
            <button
              onClick={handleRestart}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Retake Test
            </button>
          </div>
        </div>

        {/* Restart Modal */}
        {showRestartModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-sm mx-4 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Restart Test?
              </h3>
              <p className="text-slate-700 mb-6">
                Your current result will be lost. This test will take about 5
                minutes to complete.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRestartModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-300 transition"
                >
                  Keep My Result
                </button>
                <button
                  onClick={() => {
                    setShowRestartModal(false);
                    handleRestart();
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Yes, Restart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
