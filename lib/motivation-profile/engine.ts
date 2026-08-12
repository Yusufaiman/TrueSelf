import type { AnswerValue } from "@/lib/test-config";
import {
  MOTIVATION_DIMENSION_ORDER,
  MOTIVATION_DIMENSIONS,
  MOTIVATION_QUESTIONS,
} from "./data";
import type {
  MotivationAnswerEvidence,
  MotivationDimensionKey,
  MotivationDimensionScore,
  MotivationDriver,
  MotivationPatternResult,
  MotivationProfileResult,
} from "./types";

type ScoreMap = Record<MotivationDimensionKey, number>;

const patternDefinitions = [
  {
    id: "mastery_seeker",
    name: "The Mastery Seeker",
    tagline: "Improvement, capability, and becoming better.",
    description:
      "You may be most energized when effort helps you grow, learn, and become more capable.",
    target: {
      growth_mastery: 94,
      purpose_meaning: 62,
      autonomy_drive: 68,
      achievement_progress: 76,
      recognition_validation: 42,
      connection_contribution: 50,
      security_motivation: 38,
      challenge_activation: 78,
    },
  },
  {
    id: "purpose_driver",
    name: "The Purpose Driver",
    tagline: "Meaning, significance, and worthwhile effort.",
    description:
      "You may stay motivated longest when the work connects to something you believe genuinely matters.",
    target: {
      growth_mastery: 70,
      purpose_meaning: 94,
      autonomy_drive: 62,
      achievement_progress: 62,
      recognition_validation: 35,
      connection_contribution: 82,
      security_motivation: 42,
      challenge_activation: 55,
    },
  },
  {
    id: "independent_pursuer",
    name: "The Independent Pursuer",
    tagline: "Choice, ownership, and self-directed momentum.",
    description:
      "You may become most motivated when the goal feels genuinely yours and you have room to choose your path.",
    target: {
      growth_mastery: 76,
      purpose_meaning: 72,
      autonomy_drive: 94,
      achievement_progress: 70,
      recognition_validation: 30,
      connection_contribution: 45,
      security_motivation: 35,
      challenge_activation: 72,
    },
  },
  {
    id: "achiever",
    name: "The Achiever",
    tagline: "Goals, milestones, visible progress, and completion.",
    description:
      "You may build momentum when progress is visible and goals turn into concrete accomplishments.",
    target: {
      growth_mastery: 68,
      purpose_meaning: 52,
      autonomy_drive: 55,
      achievement_progress: 94,
      recognition_validation: 68,
      connection_contribution: 45,
      security_motivation: 55,
      challenge_activation: 76,
    },
  },
  {
    id: "contributor",
    name: "The Contributor",
    tagline: "Helping, shared goals, responsibility, and impact on others.",
    description:
      "You may be energized when your effort supports people, strengthens belonging, or contributes to something beyond yourself.",
    target: {
      growth_mastery: 58,
      purpose_meaning: 82,
      autonomy_drive: 45,
      achievement_progress: 55,
      recognition_validation: 55,
      connection_contribution: 94,
      security_motivation: 55,
      challenge_activation: 45,
    },
  },
  {
    id: "recognition_responder",
    name: "The Recognition Responder",
    tagline: "Appreciation, feedback, and acknowledged effort.",
    description:
      "You may gain extra energy when effort is noticed, appreciated, and reflected back by people who matter.",
    target: {
      growth_mastery: 58,
      purpose_meaning: 50,
      autonomy_drive: 42,
      achievement_progress: 78,
      recognition_validation: 94,
      connection_contribution: 62,
      security_motivation: 45,
      challenge_activation: 58,
    },
  },
  {
    id: "security_builder",
    name: "The Security Builder",
    tagline: "Stability, safety, preparation, and protecting the future.",
    description:
      "You may act with more consistency when effort creates security, reduces risk, or protects long-term stability.",
    target: {
      growth_mastery: 45,
      purpose_meaning: 48,
      autonomy_drive: 42,
      achievement_progress: 58,
      recognition_validation: 35,
      connection_contribution: 52,
      security_motivation: 94,
      challenge_activation: 35,
    },
  },
  {
    id: "challenge_chaser",
    name: "The Challenge Chaser",
    tagline: "Difficulty, stakes, stretch, and proving capability.",
    description:
      "You may become more activated when the goal is demanding enough to test what you can handle.",
    target: {
      growth_mastery: 82,
      purpose_meaning: 55,
      autonomy_drive: 70,
      achievement_progress: 78,
      recognition_validation: 45,
      connection_contribution: 38,
      security_motivation: 28,
      challenge_activation: 94,
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

function bandForDimension(dimension: MotivationDimensionKey, score: number) {
  const meta = MOTIVATION_DIMENSIONS[dimension];

  if (score <= 20) return `Strongly ${meta.lowLabel}`;
  if (score < 40) return meta.lowLabel;
  if (score <= 60) return "Moderate Influence";
  if (score < 80) return meta.highLabel;
  return `Strongly ${meta.highLabel}`;
}

function fit(scores: ScoreMap, target: ScoreMap) {
  const averageDistance =
    MOTIVATION_DIMENSION_ORDER.reduce(
      (sum, dimension) => sum + Math.abs(scores[dimension] - target[dimension]),
      0,
    ) / MOTIVATION_DIMENSION_ORDER.length;

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

function toPatternResult(match: ReturnType<typeof calculatePatterns>[number]): MotivationPatternResult {
  return {
    id: match.pattern.id,
    name: match.pattern.name,
    tagline: match.pattern.tagline,
    description: match.pattern.description,
    matchScore: match.matchScore,
  };
}

function rankedDrivers(dimensions: Record<MotivationDimensionKey, MotivationDimensionScore>) {
  return MOTIVATION_DIMENSION_ORDER.map((dimension) => ({
    key: dimension,
    label: dimensions[dimension].label,
    score: dimensions[dimension].score,
    band: dimensions[dimension].band,
  })).sort((a, b) => b.score - a.score);
}

function activationProfile(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.autonomy_drive >= 70 && scores.growth_mastery >= 70) {
    items.push("Self-directed growth: choice becomes more energizing when it helps you improve.");
  }
  if (scores.purpose_meaning >= 70 && scores.connection_contribution >= 70) {
    items.push("Meaningful contribution: effort may sustain longer when it serves people or something larger than yourself.");
  }
  if (scores.achievement_progress >= 70 && scores.recognition_validation >= 70) {
    items.push("Visible achievement: progress matters, and acknowledgment can reinforce that momentum.");
  }
  if (scores.achievement_progress >= 70 && scores.recognition_validation <= 45) {
    items.push("Internally measured achievement: reaching goals appears motivating even without much external recognition.");
  }
  if (scores.challenge_activation >= 70 && scores.growth_mastery >= 70) {
    items.push("Mastery through challenge: difficult goals may become engaging when they help you grow.");
  }
  if (scores.purpose_meaning >= 70 && scores.achievement_progress >= 70) {
    items.push("Meaningful achievement: progress may matter most when the destination feels worthwhile.");
  }

  return items.slice(0, 5);
}

function motivationTensions(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.autonomy_drive >= 75 && scores.security_motivation >= 75) {
    items.push("Independent stability: you may want freedom, but not necessarily instability.");
  }
  if (scores.challenge_activation >= 75 && scores.security_motivation >= 75) {
    items.push("Structured challenge: difficult goals may appeal more when there is a reliable foundation around them.");
  }
  if (scores.purpose_meaning >= 75 && scores.achievement_progress <= 45) {
    items.push("Meaning may matter more than milestones; progress systems might need to connect back to why the goal matters.");
  }
  if (scores.recognition_validation >= 75 && scores.autonomy_drive >= 75) {
    items.push("You may value acknowledgment, but still want the work to feel self-owned rather than externally controlled.");
  }
  if (scores.connection_contribution >= 75 && scores.autonomy_drive >= 75) {
    items.push("You may be moved by helping others while still needing enough choice over how you contribute.");
  }

  return items.length ? items.slice(0, 5) : ["No strong motivational tension stood out from this assessment."];
}

function frictionProfile(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.growth_mastery >= 75) {
    items.push("Repetitive tasks with no skill development may lose energy quickly.");
  }
  if (scores.purpose_meaning >= 75) {
    items.push("Useful tasks can still feel flat if the deeper reason is unclear.");
  }
  if (scores.autonomy_drive >= 75) {
    items.push("Overly controlled environments may reduce initiative even when the goal is reasonable.");
  }
  if (scores.achievement_progress >= 75) {
    items.push("Long efforts with invisible progress may need milestones to stay motivating.");
  }
  if (scores.recognition_validation >= 75) {
    items.push("Unacknowledged effort may become discouraging even when you care about the work.");
  }
  if (scores.security_motivation >= 75) {
    items.push("High uncertainty may make action harder unless there is a clear protective reason.");
  }

  return items.length ? items.slice(0, 5) : ["Your motivation appears less dependent on one obvious friction point."];
}

function insights(scores: ScoreMap, drivers: MotivationDriver[]) {
  const items: string[] = [];
  const top = drivers[0];
  const second = drivers[1];

  if (top && second) {
    items.push(`Your strongest current driver appears to be ${top.label}, supported by ${second.label}.`);
  }
  if (scores.recognition_validation <= 40 && scores.achievement_progress >= 70) {
    items.push("Progress itself may matter more to you than being publicly praised for it.");
  }
  if (scores.security_motivation <= 40 && scores.challenge_activation >= 70) {
    items.push("Uncertainty may not automatically reduce motivation when the challenge feels worth pursuing.");
  }
  if (scores.connection_contribution >= 70 && scores.purpose_meaning <= 55) {
    items.push("People may activate motivation even when the task itself does not feel deeply meaningful.");
  }
  if (scores.autonomy_drive <= 45 && scores.purpose_meaning >= 70) {
    items.push("Meaning may motivate you even when the path is externally defined.");
  }

  return items.slice(0, 5);
}

export function calculateMotivationProfileResult(
  answers: Record<number, AnswerValue>,
): MotivationProfileResult {
  const answerEvidence: MotivationAnswerEvidence[] = MOTIVATION_QUESTIONS.map(
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
  const dimensions = {} as Record<MotivationDimensionKey, MotivationDimensionScore>;

  MOTIVATION_DIMENSION_ORDER.forEach((dimension) => {
    const items = answerEvidence.filter((item) => item.dimension === dimension);
    const mean =
      items.reduce((sum, item) => sum + item.scoredResponse, 0) / items.length;
    const score = normalizeMean(mean);
    const consistency = calculateConsistency(items.map((item) => item.scoredResponse));
    const metadata = MOTIVATION_DIMENSIONS[dimension];

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
  const drivers = rankedDrivers(dimensions);
  const averageConsistency = Math.round(
    MOTIVATION_DIMENSION_ORDER.reduce(
      (sum, dimension) => sum + dimensions[dimension].consistency,
      0,
    ) / MOTIVATION_DIMENSION_ORDER.length,
  );

  return {
    pattern: toPatternResult(patternMatches[0]),
    secondaryPattern: toPatternResult(patternMatches[1]),
    dimensions,
    primaryDrivers: drivers.slice(0, 3),
    supportingDrivers: drivers.slice(3, 6),
    lowerInfluenceDrivers: drivers.slice(6),
    activationProfile: activationProfile(rawScores),
    motivationTensions: motivationTensions(rawScores),
    frictionProfile: frictionProfile(rawScores),
    insights: insights(rawScores, drivers),
    confidence: confidenceFromConsistency(averageConsistency),
    confidenceNotes: [
      `Based on ${MOTIVATION_QUESTIONS.length} motivation responses across ${MOTIVATION_DIMENSION_ORDER.length} independent driver systems.`,
      `Average response consistency: ${averageConsistency}%.`,
      "This profile identifies what tends to activate motivation; it does not measure laziness, discipline, or overall motivation level.",
    ],
    answerEvidence,
  };
}

export function getMotivationScoresForStorage(result: MotivationProfileResult) {
  return MOTIVATION_DIMENSION_ORDER.reduce(
    (scores, dimension) => {
      scores[dimension] = result.dimensions[dimension].score;
      return scores;
    },
    {} as Record<string, number>,
  );
}
