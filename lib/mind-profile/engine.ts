import type { AnswerValue } from "@/lib/test-config";
import {
  MIND_DIMENSION_ORDER,
  MIND_DIMENSIONS,
  MIND_QUESTIONS,
} from "./data";
import type {
  MindAnswerEvidence,
  MindDimensionKey,
  MindDimensionScore,
  MindPatternResult,
  MindProfileResult,
} from "./types";

type ScoreMap = Record<MindDimensionKey, number>;

const patternDefinitions = [
  {
    id: "analyst",
    name: "The Analyst",
    tagline: "Careful reasoning, evidence comparison, and internal logic.",
    description:
      "Your mind may prefer breaking ideas apart, checking reasoning, and understanding how conclusions are formed.",
    target: {
      analytical_processing: 92,
      intuitive_processing: 42,
      cognitive_flexibility: 60,
      depth_processing: 78,
      decision_deliberation: 82,
      uncertainty_tolerance: 48,
      learning_exploration: 62,
      mental_focus: 74,
    },
  },
  {
    id: "synthesizer",
    name: "The Synthesizer",
    tagline: "Connections, patterns, impressions, and whole-picture meaning.",
    description:
      "Your mind may quickly connect ideas and recognize larger patterns before every step is consciously explicit.",
    target: {
      analytical_processing: 58,
      intuitive_processing: 92,
      cognitive_flexibility: 76,
      depth_processing: 72,
      decision_deliberation: 50,
      uncertainty_tolerance: 72,
      learning_exploration: 80,
      mental_focus: 45,
    },
  },
  {
    id: "explorer",
    name: "The Explorer",
    tagline: "Curiosity, uncertainty, flexible learning, and idea movement.",
    description:
      "Your mind may be drawn toward questions, possibilities, and learning paths that expand beyond the original task.",
    target: {
      analytical_processing: 58,
      intuitive_processing: 78,
      cognitive_flexibility: 86,
      depth_processing: 72,
      decision_deliberation: 45,
      uncertainty_tolerance: 88,
      learning_exploration: 94,
      mental_focus: 38,
    },
  },
  {
    id: "strategist",
    name: "The Strategist",
    tagline: "Analysis and synthesis used for direction and decisions.",
    description:
      "Your mind may combine pattern recognition with structured evaluation before choosing a direction.",
    target: {
      analytical_processing: 84,
      intuitive_processing: 78,
      cognitive_flexibility: 72,
      depth_processing: 80,
      decision_deliberation: 76,
      uncertainty_tolerance: 65,
      learning_exploration: 72,
      mental_focus: 68,
    },
  },
  {
    id: "deep_diver",
    name: "The Deep Diver",
    tagline: "Depth, assumptions, mechanisms, and sustained investigation.",
    description:
      "Your mind may keep moving beneath the surface until the underlying structure of an idea becomes clear.",
    target: {
      analytical_processing: 78,
      intuitive_processing: 60,
      cognitive_flexibility: 62,
      depth_processing: 94,
      decision_deliberation: 78,
      uncertainty_tolerance: 55,
      learning_exploration: 84,
      mental_focus: 82,
    },
  },
  {
    id: "rapid_adapter",
    name: "The Rapid Adapter",
    tagline: "Fast adjustment, provisional decisions, and comfort with change.",
    description:
      "Your mind may move forward with workable information, adapt as context changes, and avoid over-waiting for certainty.",
    target: {
      analytical_processing: 52,
      intuitive_processing: 74,
      cognitive_flexibility: 90,
      depth_processing: 48,
      decision_deliberation: 28,
      uncertainty_tolerance: 88,
      learning_exploration: 70,
      mental_focus: 42,
    },
  },
  {
    id: "focused_reasoner",
    name: "The Focused Reasoner",
    tagline: "Sustained attention, structured thinking, and careful decisions.",
    description:
      "Your mind may be strongest when it can stay with one thread long enough to examine it carefully.",
    target: {
      analytical_processing: 82,
      intuitive_processing: 42,
      cognitive_flexibility: 48,
      depth_processing: 76,
      decision_deliberation: 84,
      uncertainty_tolerance: 38,
      learning_exploration: 52,
      mental_focus: 92,
    },
  },
  {
    id: "adaptive_thinker",
    name: "The Adaptive Thinker",
    tagline: "Balanced reasoning, flexible perspective, and contextual response.",
    description:
      "Your mind may shift between analysis, pattern recognition, depth, and practical movement depending on the situation.",
    target: {
      analytical_processing: 68,
      intuitive_processing: 68,
      cognitive_flexibility: 78,
      depth_processing: 66,
      decision_deliberation: 58,
      uncertainty_tolerance: 66,
      learning_exploration: 66,
      mental_focus: 60,
    },
  },
] as const;

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

function bandForDimension(dimension: MindDimensionKey, score: number) {
  const meta = MIND_DIMENSIONS[dimension];

  if (score <= 20) return `Strongly ${meta.lowLabel}`;
  if (score < 40) return meta.lowLabel;
  if (score <= 60) return "Balanced";
  if (score < 80) return meta.highLabel;
  return `Strongly ${meta.highLabel}`;
}

function fit(scores: ScoreMap, target: ScoreMap) {
  const averageDistance =
    MIND_DIMENSION_ORDER.reduce(
      (sum, dimension) => sum + Math.abs(scores[dimension] - target[dimension]),
      0,
    ) / MIND_DIMENSION_ORDER.length;

  return Math.max(0, Math.round(100 - averageDistance));
}

function calculatePatterns(scores: ScoreMap) {
  return patternDefinitions
    .map((pattern) => ({
      pattern,
      matchScore: fit(scores, pattern.target),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
}

function toPatternResult(match: ReturnType<typeof calculatePatterns>[number]): MindPatternResult {
  return {
    id: match.pattern.id,
    name: match.pattern.name,
    tagline: match.pattern.tagline,
    description: match.pattern.description,
    matchScore: match.matchScore,
  };
}

function processingStyle(scores: ScoreMap) {
  if (scores.analytical_processing >= 70 && scores.intuitive_processing >= 70) {
    return "Integrated analytical-intuitive processing";
  }
  if (scores.analytical_processing >= 70) return "Analytical processor";
  if (scores.intuitive_processing >= 70) return "Intuitive synthesizer";
  return "Contextual processor";
}

function learningStyle(scores: ScoreMap) {
  if (scores.learning_exploration >= 70 && scores.depth_processing >= 70) {
    return "Deep exploratory learner";
  }
  if (scores.learning_exploration >= 70 && scores.mental_focus <= 45) {
    return "Broad exploratory learner";
  }
  if (scores.learning_exploration <= 45) return "Purpose-driven learner";
  return "Balanced learner";
}

function decisionStyle(scores: ScoreMap) {
  if (scores.decision_deliberation >= 70) return "Deliberative decision-maker";
  if (scores.decision_deliberation <= 40 && scores.uncertainty_tolerance >= 65) {
    return "Adaptive decision-maker";
  }
  if (scores.decision_deliberation <= 40) return "Rapid decision-maker";
  return "Balanced decision-maker";
}

function uncertaintyStyle(scores: ScoreMap) {
  if (scores.uncertainty_tolerance >= 70) return "Comfortable with open questions";
  if (scores.uncertainty_tolerance <= 40) return "Clarity-seeking";
  return "Moderately uncertainty-tolerant";
}

function cognitiveStrengths(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.analytical_processing >= 65) items.push("Breaking complex information into clearer parts");
  if (scores.intuitive_processing >= 65) items.push("Recognizing patterns and connections quickly");
  if (scores.cognitive_flexibility >= 65) items.push("Changing approach when new information appears");
  if (scores.depth_processing >= 65) items.push("Exploring ideas beyond the surface");
  if (scores.decision_deliberation >= 65) items.push("Thinking through consequences before committing");
  if (scores.uncertainty_tolerance >= 65) items.push("Working with incomplete information");
  if (scores.learning_exploration >= 65) items.push("Following curiosity into new knowledge");
  if (scores.mental_focus >= 65) items.push("Staying with demanding mental tasks");

  return items.length ? items.slice(0, 6) : ["Adapting your thinking style to the situation"];
}

function frictionPoints(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.analytical_processing >= 75 && scores.decision_deliberation >= 75) {
    items.push("You may sometimes keep analyzing after you already have enough information to move.");
  }
  if (scores.intuitive_processing >= 75 && scores.analytical_processing <= 45) {
    items.push("Some conclusions may arrive quickly, but others may need more explicit reasoning before acting on them.");
  }
  if (scores.learning_exploration >= 75 && scores.mental_focus <= 45) {
    items.push("Curiosity may pull your attention across many ideas before one thread is finished.");
  }
  if (scores.depth_processing >= 75 && scores.uncertainty_tolerance <= 45) {
    items.push("You may want deeper certainty before feeling ready to close an open question.");
  }
  if (scores.cognitive_flexibility <= 40 && scores.depth_processing >= 70) {
    items.push("A deeply developed explanation may become harder to revise once it feels coherent.");
  }

  return items.length ? items.slice(0, 5) : ["No strong cognitive friction pattern stood out from this assessment."];
}

function insights(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.analytical_processing >= 70 && scores.intuitive_processing >= 70) {
    items.push("You may form rapid connections and then test whether those connections hold up logically.");
  }
  if (scores.depth_processing >= 70 && scores.cognitive_flexibility >= 70) {
    items.push("You may explore ideas deeply without becoming permanently attached to one explanation.");
  }
  if (scores.decision_deliberation <= 45 && scores.uncertainty_tolerance >= 70) {
    items.push("You may be comfortable making workable decisions before every uncertainty has been resolved.");
  }
  if (scores.learning_exploration >= 70 && scores.mental_focus >= 70) {
    items.push("Curiosity may take you into many areas, but once something captures you, you can investigate it deeply.");
  }
  if (scores.learning_exploration >= 70 && scores.mental_focus <= 45) {
    items.push("Your curiosity may naturally move across ideas, topics, and connections rather than remaining on one path.");
  }

  return items.slice(0, 4);
}

function developmentPath(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.mental_focus <= 45) {
    items.push("Use external structure to protect one important thinking thread long enough to complete it.");
  }
  if (scores.uncertainty_tolerance <= 45) {
    items.push("Practice separating decisions that need certainty from decisions that only need a provisional next step.");
  }
  if (scores.decision_deliberation >= 75) {
    items.push("Set a decision threshold before analysis begins, so reflection has a clear stopping point.");
  }
  if (scores.cognitive_flexibility <= 45) {
    items.push("When an explanation feels complete, deliberately generate one alternative before locking it in.");
  }
  if (scores.depth_processing >= 75 && scores.learning_exploration >= 75) {
    items.push("Turn deep curiosity into finished outputs by choosing which questions deserve full investigation.");
  }

  return items.length ? items.slice(0, 5) : ["Keep noticing which thinking modes help you in different contexts."];
}

export function calculateMindProfileResult(
  answers: Record<number, AnswerValue>,
): MindProfileResult {
  const answerEvidence: MindAnswerEvidence[] = MIND_QUESTIONS.map((question) => {
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
  const dimensions = {} as Record<MindDimensionKey, MindDimensionScore>;

  MIND_DIMENSION_ORDER.forEach((dimension) => {
    const items = answerEvidence.filter((item) => item.dimension === dimension);
    const mean =
      items.reduce((sum, item) => sum + item.scoredResponse, 0) / items.length;
    const score = normalizeMean(mean);
    const consistency = calculateConsistency(items.map((item) => item.scoredResponse));
    const metadata = MIND_DIMENSIONS[dimension];

    rawScores[dimension] = score;
    dimensions[dimension] = {
      key: dimension,
      label: metadata.label,
      score,
      band: bandForDimension(dimension, score),
      lowLabel: metadata.lowLabel,
      highLabel: metadata.highLabel,
      description: metadata.description,
      consistency,
      confidence: confidenceFromConsistency(consistency),
    };
  });

  const patternMatches = calculatePatterns(rawScores);
  const averageConsistency = Math.round(
    MIND_DIMENSION_ORDER.reduce(
      (sum, dimension) => sum + dimensions[dimension].consistency,
      0,
    ) / MIND_DIMENSION_ORDER.length,
  );

  return {
    pattern: toPatternResult(patternMatches[0]),
    secondaryPattern: toPatternResult(patternMatches[1]),
    dimensions,
    processingStyle: processingStyle(rawScores),
    learningStyle: learningStyle(rawScores),
    decisionStyle: decisionStyle(rawScores),
    uncertaintyStyle: uncertaintyStyle(rawScores),
    cognitiveStrengths: cognitiveStrengths(rawScores),
    frictionPoints: frictionPoints(rawScores),
    insights: insights(rawScores),
    developmentPath: developmentPath(rawScores),
    confidence: confidenceFromConsistency(averageConsistency),
    confidenceNotes: [
      `Based on ${MIND_QUESTIONS.length} cognitive-style responses across ${MIND_DIMENSION_ORDER.length} independent dimensions.`,
      `Average response consistency: ${averageConsistency}%.`,
      "This is a cognitive style profile, not an IQ test, ADHD screen, or clinical diagnosis.",
    ],
    answerEvidence,
  };
}

export function getMindScoresForStorage(result: MindProfileResult) {
  return MIND_DIMENSION_ORDER.reduce(
    (scores, dimension) => {
      scores[dimension] = result.dimensions[dimension].score;
      return scores;
    },
    {} as Record<string, number>,
  );
}
