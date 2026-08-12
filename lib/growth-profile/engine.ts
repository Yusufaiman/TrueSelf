import type { AnswerValue } from "@/lib/test-config";
import {
  GROWTH_DIMENSION_ORDER,
  GROWTH_DIMENSIONS,
  GROWTH_QUESTIONS,
} from "./data";
import type {
  GrowthAnswerEvidence,
  GrowthDimensionKey,
  GrowthDimensionScore,
  GrowthProfileResult,
  GrowthStageKey,
  GrowthStageScore,
} from "./types";

type ScoreMap = Record<GrowthDimensionKey, number>;

const stageDefinitions: Record<
  GrowthStageKey,
  { label: string; description: string; dimensions: [GrowthDimensionKey, GrowthDimensionKey] }
> = {
  see: {
    label: "SEE",
    description: "Can you see what is happening and learn from it?",
    dimensions: ["growth_self_awareness", "reflective_learning"],
  },
  accept: {
    label: "ACCEPT",
    description:
      "Can you accept that improvement is possible and receive information that challenges you?",
    dimensions: ["growth_mindset", "feedback_receptivity"],
  },
  adapt: {
    label: "ADAPT",
    description: "Can you change behavior when growth becomes uncomfortable?",
    dimensions: ["adaptive_change", "discomfort_tolerance"],
  },
  continue: {
    label: "CONTINUE",
    description:
      "Can you keep going when motivation drops or something goes wrong?",
    dimensions: ["self_discipline", "setback_recovery"],
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

function bandForDimension(dimension: GrowthDimensionKey, score: number) {
  const meta = GROWTH_DIMENSIONS[dimension];

  if (score <= 20) return `Strongly ${meta.lowLabel}`;
  if (score < 40) return meta.lowLabel;
  if (score <= 60) return "Developing / Contextual";
  if (score < 80) return meta.highLabel;
  return `Strongly ${meta.highLabel}`;
}

function calculateStages(scores: ScoreMap): Record<GrowthStageKey, GrowthStageScore> {
  return (Object.keys(stageDefinitions) as GrowthStageKey[]).reduce(
    (stages, key) => {
      const stage = stageDefinitions[key];
      const score = Math.round(
        (scores[stage.dimensions[0]] + scores[stage.dimensions[1]]) / 2,
      );

      stages[key] = {
        key,
        label: stage.label,
        score,
        description: stage.description,
      };

      return stages;
    },
    {} as Record<GrowthStageKey, GrowthStageScore>,
  );
}

function growthPattern(strength: GrowthStageScore, bottleneck: GrowthStageScore) {
  return `${strength.label}-led, ${bottleneck.label}-bottlenecked Growth`;
}

function cycleInsight(strength: GrowthStageScore, bottleneck: GrowthStageScore) {
  const strengthText: Record<GrowthStageKey, string> = {
    see: "recognizing patterns and extracting lessons from experience",
    accept: "believing improvement is possible and considering challenging feedback",
    adapt: "changing approach even when growth feels uncomfortable",
    continue: "re-engaging and following through after motivation or momentum drops",
  };
  const bottleneckText: Record<GrowthStageKey, string> = {
    see: "noticing the pattern clearly enough before trying to change it",
    accept: "receiving uncomfortable information or believing change is realistic",
    adapt: "turning insight into different behavior when the old approach feels familiar",
    continue: "maintaining action when motivation fades or setbacks interrupt progress",
  };

  return `Your growth cycle appears strongest at ${strengthText[strength.key]}. The main place to watch is ${bottleneckText[bottleneck.key]}.`;
}

function strengths(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.growth_mindset >= 65) items.push("Seeing abilities and patterns as developable");
  if (scores.growth_self_awareness >= 65) items.push("Recognizing your own repeated patterns");
  if (scores.feedback_receptivity >= 65) items.push("Extracting useful information from feedback");
  if (scores.setback_recovery >= 65) items.push("Re-engaging after disappointment or failure");
  if (scores.discomfort_tolerance >= 65) items.push("Staying with growth discomfort");
  if (scores.adaptive_change >= 65) items.push("Changing approach when evidence asks for it");
  if (scores.self_discipline >= 65) items.push("Following through when motivation changes");
  if (scores.reflective_learning >= 65) items.push("Turning experience into future lessons");

  return items.length ? items.slice(0, 6) : ["Context-sensitive growth awareness"];
}

function bottleneckSignals(scores: ScoreMap, bottleneck: GrowthStageScore) {
  const items: string[] = [];

  if (bottleneck.key === "see") {
    items.push("Growth may slow when the pattern is not visible enough to name.");
    items.push("Reflection and self-observation may need more structure before action begins.");
  }
  if (bottleneck.key === "accept") {
    items.push("Growth may slow when feedback feels too tied to self-protection.");
    items.push("It may help to separate uncomfortable information from personal worth.");
  }
  if (bottleneck.key === "adapt") {
    items.push("Growth may slow when insight does not become changed behavior.");
    items.push("The next step may be small experiments, not perfect transformation.");
  }
  if (bottleneck.key === "continue") {
    items.push("Growth may slow when momentum drops after setbacks or fading motivation.");
    items.push("Your system may need consistency supports that do not depend on feeling ready.");
  }

  if (scores.self_discipline <= 45) {
    items.push("Follow-through may become more motivation-dependent than you want.");
  }
  if (scores.discomfort_tolerance <= 45) {
    items.push("Discomfort may end the growth attempt before the new pattern has time to form.");
  }

  return items.slice(0, 5);
}

function developmentPath(scores: ScoreMap, bottleneck: GrowthStageScore) {
  const items: string[] = [];

  if (bottleneck.key === "see") {
    items.push("Track one repeated pattern for a week before trying to change it.");
  }
  if (bottleneck.key === "accept") {
    items.push("Ask what part of feedback could be useful, even if the whole message is imperfect.");
  }
  if (bottleneck.key === "adapt") {
    items.push("Choose one behavior experiment that is small enough to repeat this week.");
  }
  if (bottleneck.key === "continue") {
    items.push("Build a minimum version of the habit that can survive low motivation days.");
  }
  if (scores.reflective_learning >= 70 && scores.self_discipline <= 55) {
    items.push("Convert insight into a visible next action immediately after reflection.");
  }
  if (scores.growth_self_awareness >= 70 && scores.adaptive_change <= 55) {
    items.push("When you notice a pattern, define one replacement behavior before moving on.");
  }

  return items.slice(0, 5);
}

function insights(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.growth_self_awareness >= 70 && scores.reflective_learning >= 70) {
    items.push("You may be strong at seeing patterns and turning experience into insight.");
  }
  if (scores.adaptive_change >= 70 && scores.discomfort_tolerance >= 70) {
    items.push("You may be willing to change behavior even when the change feels uncomfortable.");
  }
  if (scores.growth_mindset >= 70 && scores.feedback_receptivity >= 70) {
    items.push("You may find it easier to receive feedback when it feels connected to possible improvement.");
  }
  if (scores.self_discipline <= 50 && scores.growth_mindset >= 70) {
    items.push("You may believe change is possible, while still needing stronger systems to keep action consistent.");
  }
  if (scores.setback_recovery <= 50 && scores.reflective_learning >= 70) {
    items.push("You may learn from setbacks before you fully regain momentum from them.");
  }

  return items.slice(0, 5);
}

export function calculateGrowthProfileResult(
  answers: Record<number, AnswerValue>,
): GrowthProfileResult {
  const answerEvidence: GrowthAnswerEvidence[] = GROWTH_QUESTIONS.map(
    (question) => {
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
    },
  );

  const rawScores = {} as ScoreMap;
  const dimensions = {} as Record<GrowthDimensionKey, GrowthDimensionScore>;

  GROWTH_DIMENSION_ORDER.forEach((dimension) => {
    const items = answerEvidence.filter((item) => item.dimension === dimension);
    const mean =
      items.reduce((sum, item) => sum + item.scoredResponse, 0) / items.length;
    const score = normalizeMean(mean);
    const consistency = calculateConsistency(items.map((item) => item.scoredResponse));
    const metadata = GROWTH_DIMENSIONS[dimension];

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

  const stages = calculateStages(rawScores);
  const sortedStages = Object.values(stages).sort((a, b) => b.score - a.score);
  const growthStrength = sortedStages[0];
  const growthBottleneck = sortedStages[sortedStages.length - 1];
  const averageConsistency = Math.round(
    GROWTH_DIMENSION_ORDER.reduce(
      (sum, dimension) => sum + dimensions[dimension].consistency,
      0,
    ) / GROWTH_DIMENSION_ORDER.length,
  );

  return {
    dimensions,
    stages,
    growthStrength,
    growthBottleneck,
    growthPattern: growthPattern(growthStrength, growthBottleneck),
    cycleInsight: cycleInsight(growthStrength, growthBottleneck),
    strengths: strengths(rawScores),
    bottleneckSignals: bottleneckSignals(rawScores, growthBottleneck),
    developmentPath: developmentPath(rawScores, growthBottleneck),
    insights: insights(rawScores),
    confidence: confidenceFromConsistency(averageConsistency),
    confidenceNotes: [
      `Based on ${GROWTH_QUESTIONS.length} growth responses across ${GROWTH_DIMENSION_ORDER.length} development dimensions.`,
      `Average response consistency: ${averageConsistency}%.`,
      "This profile describes how you respond to growth, feedback, setbacks, and change; it is not a clinical resilience diagnosis.",
    ],
    answerEvidence,
  };
}

export function getGrowthScoresForStorage(result: GrowthProfileResult) {
  return GROWTH_DIMENSION_ORDER.reduce(
    (scores, dimension) => {
      scores[dimension] = result.dimensions[dimension].score;
      return scores;
    },
    {} as Record<string, number>,
  );
}
