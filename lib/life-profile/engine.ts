import type { AnswerValue } from "@/lib/test-config";
import {
  LIFE_ASSESSMENT_VERSION,
  LIFE_DIMENSION_ORDER,
  LIFE_DIMENSIONS,
  LIFE_QUESTIONS,
} from "./data";
import type {
  LifeAnswerEvidence,
  LifeDimensionKey,
  LifeDimensionScore,
  LifeInsight,
  LifePattern,
  LifeProfileResult,
  LifeStageKey,
  LifeStageScore,
} from "./types";

type ScoreMap = Record<LifeDimensionKey, number>;

const stageDefinitions: Record<LifeStageKey, { label: string; description: string }> = {
  direction: {
    label: "DIRECTION",
    description: "Do you know where you are going, and do you feel able to influence how you get there?",
  },
  alignment: {
    label: "ALIGNMENT",
    description: "Does your actual daily life support what matters to you?",
  },
  experience: {
    label: "EXPERIENCE",
    description: "Does the life you are living currently feel meaningful, satisfying, and connected?",
  },
  future: {
    label: "FUTURE",
    description: "Can you see a future worth moving toward?",
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

function bandForDimension(dimension: LifeDimensionKey, score: number) {
  const meta = LIFE_DIMENSIONS[dimension];

  if (score <= 20) return `Strongly ${meta.lowLabel}`;
  if (score < 40) return meta.lowLabel;
  if (score <= 60) return "Mixed / In Transition";
  if (score < 80) return meta.highLabel;
  return `Strongly ${meta.highLabel}`;
}

function calculateStages(scores: ScoreMap): Record<LifeStageKey, LifeStageScore> {
  return {
    direction: {
      key: "direction",
      label: stageDefinitions.direction.label,
      score: Math.round((scores.life_direction + scores.personal_agency) / 2),
      description: stageDefinitions.direction.description,
    },
    alignment: {
      key: "alignment",
      label: stageDefinitions.alignment.label,
      score: Math.round((scores.lifestyle_alignment + scores.life_balance) / 2),
      description: stageDefinitions.alignment.description,
    },
    experience: {
      key: "experience",
      label: stageDefinitions.experience.label,
      score: Math.round(
        (scores.meaning_fulfillment +
          scores.life_satisfaction +
          scores.connection_belonging) /
          3,
      ),
      description: stageDefinitions.experience.description,
    },
    future: {
      key: "future",
      label: stageDefinitions.future.label,
      score: scores.future_outlook,
      description: stageDefinitions.future.description,
    },
  };
}

function sortedDimensions(dimensions: Record<LifeDimensionKey, LifeDimensionScore>) {
  return LIFE_DIMENSION_ORDER.map((dimension) => dimensions[dimension]).sort(
    (a, b) => b.score - a.score,
  );
}

function patternMatch(
  scores: ScoreMap,
  stages: Record<LifeStageKey, LifeStageScore>,
): LifePattern[] {
  const patterns: LifePattern[] = [
    {
      id: "intentional_builder",
      name: "The Intentional Builder",
      tagline: "Clear direction, strong agency, and future momentum.",
      description:
        "You appear to know what you want to move toward and experience yourself as someone who can shape at least part of that path.",
      matchScore: Math.round(
        (scores.life_direction + scores.personal_agency + scores.future_outlook) / 3,
      ),
    },
    {
      id: "meaning_seeker",
      name: "The Meaning Seeker",
      tagline: "You are looking for life to feel more personally significant.",
      description:
        "Your current life may be asking for deeper purpose, clearer significance, or a stronger connection between effort and meaning.",
      matchScore: Math.round(
        (100 - scores.meaning_fulfillment + 100 - scores.life_direction + scores.future_outlook) / 3,
      ),
    },
    {
      id: "aligned_liver",
      name: "The Aligned Liver",
      tagline: "Daily life and personal priorities are moving in the same direction.",
      description:
        "Your responses suggest that the way you live may already reflect important priorities, with meaningful experience supporting it.",
      matchScore: Math.round(
        (scores.lifestyle_alignment + scores.meaning_fulfillment + scores.life_satisfaction) / 3,
      ),
    },
    {
      id: "hopeful_explorer",
      name: "The Hopeful Explorer",
      tagline: "Future possibility is present while direction is still forming.",
      description:
        "You may be able to see meaningful possibilities ahead while still deciding which direction deserves your focus.",
      matchScore: Math.round(
        (scores.future_outlook + 100 - scores.life_direction + scores.personal_agency) / 3,
      ),
    },
    {
      id: "grounded_connector",
      name: "The Grounded Connector",
      tagline: "Connection, satisfaction, and balance support the present.",
      description:
        "Your current life may feel most supported through meaningful connection, present appreciation, and manageable rhythms.",
      matchScore: Math.round(
        (scores.connection_belonging + scores.life_satisfaction + scores.life_balance) / 3,
      ),
    },
    {
      id: "driven_builder",
      name: "The Driven Builder",
      tagline: "Direction is strong, but sustainability may need attention.",
      description:
        "You may be investing heavily in a direction that matters, while your current energy distribution may be carrying some cost.",
      matchScore: Math.round(
        (scores.life_direction + scores.personal_agency + 100 - scores.life_balance) / 3,
      ),
    },
    {
      id: "rebalancer",
      name: "The Rebalancer",
      tagline: "The next step may be making life more sustainable and aligned.",
      description:
        "Meaning or direction may be present, but your current routines, balance, or daily priorities may need restructuring.",
      matchScore: Math.round(
        (stages.direction.score + stages.experience.score + 100 - stages.alignment.score) / 3,
      ),
    },
    {
      id: "life_explorer",
      name: "The Life Explorer",
      tagline: "This chapter may be about discovering what deserves your energy.",
      description:
        "Your current life profile suggests exploration rather than a fixed life conclusion. That can be a valid transition state.",
      matchScore: Math.round(
        (100 - scores.life_direction + scores.personal_agency + scores.future_outlook) / 3,
      ),
    },
  ];

  return patterns.sort((a, b) => b.matchScore - a.matchScore);
}

function buildLifeGaps(scores: ScoreMap, stages: Record<LifeStageKey, LifeStageScore>) {
  const gaps: LifeInsight[] = [];

  if (stages.direction.score >= 70 && stages.alignment.score <= 55) {
    gaps.push({
      id: "direction_life_gap",
      title: "Direction-Life Gap",
      description:
        "You appear relatively clear about where you want to go, while your current routines and distribution of time may not yet fully support that direction.",
    });
  }

  if (scores.meaning_fulfillment >= 70 && scores.life_satisfaction <= 55) {
    gaps.push({
      id: "meaning_satisfaction_gap",
      title: "Meaningful but Unsatisfied",
      description:
        "Parts of your life may feel deeply worthwhile even though your life as a whole is not yet where you want it to be.",
    });
  }

  if (scores.life_satisfaction <= 55 && scores.future_outlook >= 70) {
    gaps.push({
      id: "hopeful_transition",
      title: "Hopeful Transition",
      description:
        "Your present life may not yet feel where you want it to be, while you still see meaningful possibilities ahead.",
    });
  }

  if (scores.life_direction >= 70 && scores.personal_agency <= 55) {
    gaps.push({
      id: "constrained_direction",
      title: "Constrained Direction",
      description:
        "You may know where you want to go while feeling that current circumstances limit how much influence you have over getting there.",
    });
  }

  return gaps;
}

function buildLifeTensions(scores: ScoreMap, stages: Record<LifeStageKey, LifeStageScore>) {
  const tensions: LifeInsight[] = [];

  if (scores.personal_agency >= 70 && scores.life_direction <= 55) {
    tensions.push({
      id: "open_exploration",
      title: "Open Exploration",
      description:
        "You appear to feel capable of shaping your life while still exploring which direction deserves that ability.",
    });
  }

  if (scores.lifestyle_alignment >= 70 && scores.life_balance <= 55) {
    tensions.push({
      id: "meaningful_overextension",
      title: "Meaningful Overextension",
      description:
        "Your daily effort may strongly reflect what matters to you, but the current way you are sustaining it may demand too much energy.",
    });
  }

  if (scores.connection_belonging >= 70 && scores.life_satisfaction <= 55) {
    tensions.push({
      id: "relational_support",
      title: "Relational Support",
      description:
        "Meaningful relationships may be an important source of strength even while other areas of your life feel less satisfying.",
    });
  }

  if (stages.experience.score >= 70 && stages.alignment.score <= 55) {
    tensions.push({
      id: "meaning_before_structure",
      title: "Meaning Before Structure",
      description:
        "Your current life may contain meaningful experiences while the practical structure around them still needs adjustment.",
    });
  }

  return tensions;
}

function buildLifeSupports(scores: ScoreMap) {
  const supports: LifeInsight[] = [];

  if (scores.life_direction >= 70) {
    supports.push({
      id: "direction_support",
      title: "Clear Direction",
      description:
        "Direction appears to be one of the stronger supports in your current life profile.",
    });
  }
  if (scores.meaning_fulfillment >= 70) {
    supports.push({
      id: "meaning_support",
      title: "Meaningful Engagement",
      description:
        "Your current life appears to contain parts that feel worthwhile and personally meaningful.",
    });
  }
  if (scores.connection_belonging >= 70) {
    supports.push({
      id: "connection_support",
      title: "Connection & Belonging",
      description:
        "Meaningful connection may be an important stabilizing part of your current life.",
    });
  }
  if (scores.future_outlook >= 70) {
    supports.push({
      id: "future_support",
      title: "Future Possibility",
      description:
        "You appear able to see meaningful possibilities worth moving toward.",
    });
  }

  return supports;
}

function buildPriorityPath(attentionArea: LifeDimensionScore, gaps: LifeInsight[]) {
  const items: string[] = [];

  if (attentionArea.key === "life_direction") {
    items.push("Clarify the next chapter before trying to optimize every part of life at once.");
  }
  if (attentionArea.key === "meaning_fulfillment") {
    items.push("Identify which current responsibilities or relationships feel worthwhile, then protect more space for them.");
  }
  if (attentionArea.key === "life_balance") {
    items.push("Look at where one area of life is consuming energy that another important area needs.");
  }
  if (attentionArea.key === "personal_agency") {
    items.push("Separate what is genuinely outside your control from the small decisions you can still influence.");
  }
  if (attentionArea.key === "life_satisfaction") {
    items.push("Name the biggest gap between your current life and the life you would prefer to be living.");
  }
  if (attentionArea.key === "connection_belonging") {
    items.push("Prioritize one form of connection where you can be known more fully, not only socially present.");
  }
  if (attentionArea.key === "lifestyle_alignment") {
    items.push("Compare your weekly time with your stated priorities and choose one mismatch to reduce.");
  }
  if (attentionArea.key === "future_outlook") {
    items.push("Focus on a near-future possibility that feels meaningful enough to move toward, even if the whole future is not clear.");
  }

  if (gaps.some((gap) => gap.id === "direction_life_gap")) {
    items.push("Because direction is clearer than alignment, the practical next step may be restructuring routines rather than searching for a new identity.");
  }

  return items.slice(0, 5);
}

function buildCurrentStateSummary(
  pattern: LifePattern,
  strength: LifeDimensionScore,
  attentionArea: LifeDimensionScore,
) {
  return `${pattern.name} patterns suggest your current life is most supported by ${strength.label.toLowerCase()}, while ${attentionArea.label.toLowerCase()} may be worth attention in this season.`;
}

export function calculateLifeProfileResult(
  answers: Record<number, AnswerValue>,
): LifeProfileResult {
  const answerEvidence: LifeAnswerEvidence[] = LIFE_QUESTIONS.map((question) => {
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
  const dimensions = {} as Record<LifeDimensionKey, LifeDimensionScore>;

  LIFE_DIMENSION_ORDER.forEach((dimension) => {
    const items = answerEvidence.filter((item) => item.dimension === dimension);
    const mean =
      items.reduce((sum, item) => sum + item.scoredResponse, 0) / items.length;
    const score = normalizeMean(mean);
    const consistency = calculateConsistency(items.map((item) => item.scoredResponse));
    const metadata = LIFE_DIMENSIONS[dimension];

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
  const rankedDimensions = sortedDimensions(dimensions);
  const lifeStrength = rankedDimensions[0];
  const attentionArea = rankedDimensions[rankedDimensions.length - 1];
  const patterns = patternMatch(rawScores, stages);
  const primaryPattern = patterns[0];
  const secondaryPattern = patterns[1];
  const lifeGaps = buildLifeGaps(rawScores, stages);
  const lifeTensions = buildLifeTensions(rawScores, stages);
  const lifeSupports = buildLifeSupports(rawScores);
  const averageConsistency = Math.round(
    LIFE_DIMENSION_ORDER.reduce(
      (sum, dimension) => sum + dimensions[dimension].consistency,
      0,
    ) / LIFE_DIMENSION_ORDER.length,
  );

  return {
    dimensions,
    stages,
    lifeStrength,
    attentionArea,
    primaryPattern,
    secondaryPattern,
    lifeGaps,
    lifeTensions,
    lifeSupports,
    priorityPath: buildPriorityPath(attentionArea, lifeGaps),
    currentStateSummary: buildCurrentStateSummary(
      primaryPattern,
      lifeStrength,
      attentionArea,
    ),
    confidence: confidenceFromConsistency(averageConsistency),
    confidenceNotes: [
      `Based on ${LIFE_QUESTIONS.length} current-life responses across ${LIFE_DIMENSION_ORDER.length} dimensions.`,
      `Average response consistency: ${averageConsistency}%.`,
      "Life is a current-state profile. Retaking this assessment later can show how direction, balance, satisfaction, connection, and alignment change over time.",
    ],
    assessmentVersion: LIFE_ASSESSMENT_VERSION,
    completedAt: new Date().toISOString(),
    answerEvidence,
  };
}

export function getLifeScoresForStorage(result: LifeProfileResult) {
  const dimensionScores = LIFE_DIMENSION_ORDER.reduce(
    (scores, dimension) => {
      scores[dimension] = result.dimensions[dimension].score;
      return scores;
    },
    {} as Record<string, number>,
  );

  return {
    ...dimensionScores,
    direction_stage: result.stages.direction.score,
    alignment_stage: result.stages.alignment.score,
    experience_stage: result.stages.experience.score,
    future_stage: result.stages.future.score,
  };
}
