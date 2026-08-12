import type { AnswerValue } from "@/lib/test-config";
import {
  STRESS_EMOTION_DIMENSION_ORDER,
  STRESS_EMOTION_DIMENSIONS,
  STRESS_EMOTION_QUESTIONS,
} from "./data";
import type {
  EmotionalCycleStage,
  EmotionalCycleStageKey,
  StressEmotionAnswerEvidence,
  StressEmotionDimensionKey,
  StressEmotionDimensionScore,
  StressEmotionProfileResult,
  StressResponsePattern,
} from "./types";

type ScoreMap = Record<StressEmotionDimensionKey, number>;

const cycleDefinitions: Record<
  EmotionalCycleStageKey,
  { label: string; description: string }
> = {
  notice: {
    label: "NOTICE",
    description: "Can you notice emotional change as it begins?",
  },
  understand: {
    label: "UNDERSTAND",
    description: "Can you identify what you are feeling and why?",
  },
  allow: {
    label: "ALLOW",
    description: "Can you let difficult emotions exist without immediately fighting them?",
  },
  regulate: {
    label: "REGULATE",
    description: "Can you retain choice over your response when emotion is strong?",
  },
  express: {
    label: "EXPRESS",
    description: "Can you communicate important emotions clearly enough to be understood?",
  },
  recover: {
    label: "RECOVER",
    description: "Can you reset and adapt after stress has passed?",
  },
};

function scoreResponse(response: AnswerValue, scoring: "direct" | "reverse") {
  return scoring === "direct" ? response : 8 - response;
}

function normalizeMean(mean: number) {
  return Math.round(((mean - 1) / 6) * 100);
}

function calculateConsistency(values: number[]) {
  if (values.length < 2) return 100;

  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const averageDistance =
    values.reduce((sum, value) => sum + Math.abs(value - mean), 0) /
    values.length;

  return Math.max(0, Math.round(100 - (averageDistance / 3) * 100));
}

function confidenceFromConsistency(consistency: number) {
  if (consistency >= 75) return "High";
  if (consistency >= 55) return "Moderate";
  return "Limited";
}

function bandForDimension(dimension: StressEmotionDimensionKey, score: number) {
  const meta = STRESS_EMOTION_DIMENSIONS[dimension];

  if (dimension === "stress_reactivity") {
    if (score <= 35) return "Low Stress Reactivity";
    if (score < 65) return "Moderate Stress Reactivity";
    return "High Stress Reactivity";
  }

  if (score <= 20) return `Strongly ${meta.lowLabel}`;
  if (score < 40) return meta.lowLabel;
  if (score <= 60) return "Contextual / Mixed";
  if (score < 80) return meta.highLabel;
  return `Strongly ${meta.highLabel}`;
}

function stressResponsePattern(scores: ScoreMap): StressResponsePattern {
  const reactivity = scores.stress_reactivity;
  const recovery = scores.stress_recovery;
  const highReactivity = reactivity >= 65;
  const lowReactivity = reactivity <= 45;
  const highRecovery = recovery >= 65;
  const lowRecovery = recovery <= 45;

  if (lowReactivity && highRecovery) {
    return {
      id: "steady_recovering",
      name: "Steady & Recovering",
      description:
        "Stress tends to create relatively limited disruption, and you appear able to return to baseline effectively.",
    };
  }
  if (highReactivity && highRecovery) {
    return {
      id: "responsive_recovering",
      name: "Responsive & Recovering",
      description:
        "Pressure may affect you strongly in the moment, while your responses suggest that you can recover relatively effectively once the stressful situation passes.",
    };
  }
  if (lowReactivity && lowRecovery) {
    return {
      id: "slow_burn_stress",
      name: "Slow-Burn Stress",
      description:
        "Stress may not always affect you dramatically at first, but its effects can remain active for longer once they accumulate.",
    };
  }
  if (highReactivity && lowRecovery) {
    return {
      id: "stress_sensitive",
      name: "Stress-Sensitive Pattern",
      description:
        "Pressure may affect you strongly and can take longer to settle afterward. This describes a tendency, not your current stress level.",
    };
  }

  return {
    id: "contextual_balanced",
    name: "Contextual / Balanced Response",
    description:
      "Your stress response appears more mixed or context-dependent across reactivity and recovery.",
  };
}

function calculateProcessingCycle(scores: ScoreMap) {
  return {
    notice: {
      key: "notice",
      label: cycleDefinitions.notice.label,
      score: scores.emotional_awareness,
      description: cycleDefinitions.notice.description,
    },
    understand: {
      key: "understand",
      label: cycleDefinitions.understand.label,
      score: scores.emotional_clarity,
      description: cycleDefinitions.understand.description,
    },
    allow: {
      key: "allow",
      label: cycleDefinitions.allow.label,
      score: scores.emotional_acceptance,
      description: cycleDefinitions.allow.description,
    },
    regulate: {
      key: "regulate",
      label: cycleDefinitions.regulate.label,
      score: scores.emotional_regulation,
      description: cycleDefinitions.regulate.description,
    },
    express: {
      key: "express",
      label: cycleDefinitions.express.label,
      score: scores.emotional_expression,
      description: cycleDefinitions.express.description,
    },
    recover: {
      key: "recover",
      label: cycleDefinitions.recover.label,
      score: Math.round((scores.stress_recovery + scores.coping_flexibility) / 2),
      description: cycleDefinitions.recover.description,
    },
  } as Record<EmotionalCycleStageKey, EmotionalCycleStage>;
}

function emotionalBottleneck(stages: Record<EmotionalCycleStageKey, EmotionalCycleStage>) {
  const sorted = Object.values(stages).sort((a, b) => b.score - a.score);
  const strength = sorted[0];
  const bottleneck = sorted[sorted.length - 1];

  return {
    strength,
    bottleneck: strength.score - bottleneck.score >= 12 ? bottleneck : null,
  };
}

function processingInsights(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.emotional_awareness >= 70 && scores.emotional_clarity >= 70) {
    items.push("You tend to notice emotional changes and can usually identify what you are experiencing.");
  }
  if (scores.emotional_awareness >= 70 && scores.emotional_clarity <= 50) {
    items.push("You may notice emotional changes quickly while needing more time to identify exactly what you are feeling.");
  }
  if (scores.emotional_acceptance >= 70 && scores.emotional_regulation >= 70) {
    items.push("You appear able to experience difficult emotions without necessarily allowing them to determine your response.");
  }
  if (scores.emotional_acceptance <= 50 && scores.emotional_regulation >= 70) {
    items.push("You may remain behaviorally controlled even while internally wanting uncomfortable emotions to disappear.");
  }
  if (scores.emotional_expression <= 50 && scores.emotional_regulation >= 70) {
    items.push("You may handle emotions relatively effectively while preferring to process much of them internally.");
  }

  return items.slice(0, 5);
}

function stressInsights(scores: ScoreMap, pattern: StressResponsePattern) {
  const items = [pattern.description];

  if (scores.stress_reactivity >= 65 && scores.stress_recovery >= 65) {
    items.push("Pressure may affect you strongly without necessarily affecting you for a long time.");
  }
  if (scores.stress_reactivity <= 45 && scores.stress_recovery <= 45) {
    items.push("Stress may not always feel intense immediately, but its effects may remain active for longer.");
  }
  if (scores.stress_reactivity >= 65 && scores.emotional_regulation <= 50) {
    items.push("When pressure rises, it may become harder to keep your normal response style online.");
  }
  if (scores.stress_recovery <= 50 && scores.coping_flexibility >= 70) {
    items.push("You may have flexible coping options while still needing more time for your system to settle.");
  }

  return items.slice(0, 5);
}

function copingInsights(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.coping_flexibility >= 70) {
    items.push("You may be able to adjust coping style depending on whether the moment needs action, distance, support, or recovery.");
  }
  if (scores.coping_flexibility <= 45) {
    items.push("Under stress, you may rely on familiar coping responses even when the situation needs something different.");
  }
  if (scores.emotional_expression >= 70 && scores.emotional_clarity >= 65) {
    items.push("When emotions matter interpersonally, naming them clearly may help other people understand what is happening.");
  }
  if (scores.emotional_expression <= 45 && scores.emotional_acceptance >= 65) {
    items.push("You may be able to allow feelings internally while still preferring privacy around emotional communication.");
  }

  return items.length ? items.slice(0, 4) : ["Your coping pattern appears mixed or context-dependent."];
}

function supportPath(
  stages: Record<EmotionalCycleStageKey, EmotionalCycleStage>,
  bottleneck: EmotionalCycleStage | null,
  scores: ScoreMap,
) {
  const items: string[] = [];

  if (bottleneck?.key === "notice") {
    items.push("Pause earlier in the stress cycle and name the first body or thought signal you notice.");
  }
  if (bottleneck?.key === "understand") {
    items.push("Separate mixed emotions by asking: is this anger, disappointment, worry, shame, sadness, or something else?");
  }
  if (bottleneck?.key === "allow") {
    items.push("Practice letting an uncomfortable feeling exist briefly before trying to fix, suppress, or explain it.");
  }
  if (bottleneck?.key === "regulate") {
    items.push("Build a short pause between emotional activation and the next visible response.");
  }
  if (bottleneck?.key === "express") {
    items.push("Use simple emotional language earlier, before others have to guess what is happening.");
  }
  if (bottleneck?.key === "recover") {
    items.push("Create a recovery ritual that tells your system the stressful moment has actually ended.");
  }
  if (!bottleneck) {
    items.push("Your emotional processing cycle is fairly even; choose support based on the situation rather than one fixed weakness.");
  }
  if (scores.stress_reactivity >= 70) {
    items.push("Because pressure may activate you strongly, reduce competing demands before they stack too high.");
  }

  return items.slice(0, 5);
}

export function calculateStressEmotionProfileResult(
  answers: Record<number, AnswerValue>,
): StressEmotionProfileResult {
  const answerEvidence: StressEmotionAnswerEvidence[] =
    STRESS_EMOTION_QUESTIONS.map((question) => {
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

  const rawScores = {} as ScoreMap;
  const dimensions = {} as Record<
    StressEmotionDimensionKey,
    StressEmotionDimensionScore
  >;

  STRESS_EMOTION_DIMENSION_ORDER.forEach((dimension) => {
    const items = answerEvidence.filter((item) => item.dimension === dimension);
    const mean =
      items.reduce((sum, item) => sum + item.scoredResponse, 0) / items.length;
    const score = normalizeMean(mean);
    const consistency = calculateConsistency(items.map((item) => item.scoredResponse));
    const metadata = STRESS_EMOTION_DIMENSIONS[dimension];

    rawScores[dimension] = score;
    dimensions[dimension] = {
      key: dimension,
      label: metadata.label,
      score,
      band: bandForDimension(dimension, score),
      lowLabel: metadata.lowLabel,
      highLabel: metadata.highLabel,
      description: metadata.description,
      isLoadDimension: metadata.isLoadDimension,
      consistency,
      confidence: confidenceFromConsistency(consistency),
    };
  });

  const pattern = stressResponsePattern(rawScores);
  const processingCycle = calculateProcessingCycle(rawScores);
  const { strength, bottleneck } = emotionalBottleneck(processingCycle);
  const averageConsistency = Math.round(
    STRESS_EMOTION_DIMENSION_ORDER.reduce(
      (sum, dimension) => sum + dimensions[dimension].consistency,
      0,
    ) / STRESS_EMOTION_DIMENSION_ORDER.length,
  );

  return {
    dimensions,
    processingCycle,
    stressResponsePattern: pattern,
    emotionalStrength: strength,
    emotionalBottleneck: bottleneck,
    stressSensitivity: dimensions.stress_reactivity,
    processingInsights: processingInsights(rawScores),
    stressInsights: stressInsights(rawScores, pattern),
    copingInsights: copingInsights(rawScores),
    supportPath: supportPath(processingCycle, bottleneck, rawScores),
    confidence: confidenceFromConsistency(averageConsistency),
    confidenceNotes: [
      `Based on ${STRESS_EMOTION_QUESTIONS.length} stress and emotion responses across ${STRESS_EMOTION_DIMENSION_ORDER.length} dimensions.`,
      `Average response consistency: ${averageConsistency}%.`,
      "This profile describes self-reported emotional processing and stress-response tendencies; it does not diagnose anxiety, depression, ADHD, trauma, burnout, or any mental-health condition.",
    ],
    answerEvidence,
  };
}

export function getStressEmotionScoresForStorage(
  result: StressEmotionProfileResult,
) {
  return STRESS_EMOTION_DIMENSION_ORDER.reduce(
    (scores, dimension) => {
      scores[dimension] = result.dimensions[dimension].score;
      return scores;
    },
    {} as Record<string, number>,
  );
}
