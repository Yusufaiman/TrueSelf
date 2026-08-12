import type { AnswerValue } from "@/lib/test-config";
import {
  CAREER_DIMENSION_ORDER,
  CAREER_DIMENSIONS,
  CAREER_FIT_QUESTIONS,
} from "./data";
import type {
  CareerAnswerEvidence,
  CareerDimensionKey,
  CareerDimensionScore,
  CareerFamilyMatch,
  CareerFitResult,
  CareerOccupationMatch,
  CareerPatternResult,
} from "./types";

type ScoreMap = Record<CareerDimensionKey, number>;
type TargetMap = ScoreMap;
type WeightMap = Partial<Record<CareerDimensionKey, number>>;

const patternDefinitions = [
  {
    id: "builder",
    name: "The Builder",
    tagline: "Creative ownership, turning ideas into something real.",
    description:
      "You may be most engaged by work where you can create, experiment, solve difficult problems, and own the outcome.",
    target: {
      work_autonomy: 88,
      structure_preference: 45,
      social_work_orientation: 58,
      problem_complexity: 82,
      creative_orientation: 90,
      leadership_drive: 62,
      stability_orientation: 38,
      achievement_drive: 78,
    },
  },
  {
    id: "strategist",
    name: "The Strategist",
    tagline: "Systems, complexity, direction, and long-range decisions.",
    description:
      "You may thrive when work asks you to understand complicated systems, set direction, and solve problems with meaningful stakes.",
    target: {
      work_autonomy: 80,
      structure_preference: 58,
      social_work_orientation: 55,
      problem_complexity: 90,
      creative_orientation: 72,
      leadership_drive: 72,
      stability_orientation: 48,
      achievement_drive: 84,
    },
  },
  {
    id: "leader",
    name: "The Leader",
    tagline: "Responsibility, influence, coordination, and progress.",
    description:
      "You may be energized by roles where you influence direction, coordinate people, and take responsibility for collective outcomes.",
    target: {
      work_autonomy: 72,
      structure_preference: 62,
      social_work_orientation: 82,
      problem_complexity: 68,
      creative_orientation: 58,
      leadership_drive: 92,
      stability_orientation: 50,
      achievement_drive: 86,
    },
  },
  {
    id: "specialist",
    name: "The Specialist",
    tagline: "Deep expertise, complex problems, and mastery.",
    description:
      "You may prefer developing strong expertise and solving substantial problems without needing constant leadership or social intensity.",
    target: {
      work_autonomy: 70,
      structure_preference: 58,
      social_work_orientation: 35,
      problem_complexity: 92,
      creative_orientation: 58,
      leadership_drive: 35,
      stability_orientation: 58,
      achievement_drive: 82,
    },
  },
  {
    id: "connector",
    name: "The Connector",
    tagline: "People, collaboration, communication, and shared outcomes.",
    description:
      "You may find work more meaningful when it includes steady interaction, collaboration, and helping people move toward a shared result.",
    target: {
      work_autonomy: 58,
      structure_preference: 55,
      social_work_orientation: 92,
      problem_complexity: 58,
      creative_orientation: 55,
      leadership_drive: 62,
      stability_orientation: 55,
      achievement_drive: 66,
    },
  },
  {
    id: "organizer",
    name: "The Organizer",
    tagline: "Clarity, systems, reliability, and structured execution.",
    description:
      "You may do your best work in environments where expectations are clear, systems are reliable, and execution quality matters.",
    target: {
      work_autonomy: 48,
      structure_preference: 88,
      social_work_orientation: 58,
      problem_complexity: 48,
      creative_orientation: 35,
      leadership_drive: 62,
      stability_orientation: 82,
      achievement_drive: 58,
    },
  },
  {
    id: "explorer",
    name: "The Explorer",
    tagline: "Freedom, novelty, experimentation, and opportunity.",
    description:
      "You may be drawn toward work that gives you freedom to try new paths, tolerate uncertainty, and move toward fresh possibilities.",
    target: {
      work_autonomy: 92,
      structure_preference: 28,
      social_work_orientation: 58,
      problem_complexity: 72,
      creative_orientation: 86,
      leadership_drive: 52,
      stability_orientation: 18,
      achievement_drive: 70,
    },
  },
  {
    id: "operator",
    name: "The Operator",
    tagline: "Reliable systems, steady progress, and practical execution.",
    description:
      "You may find satisfaction in making systems work reliably, completing responsibilities, and producing clear outcomes.",
    target: {
      work_autonomy: 42,
      structure_preference: 82,
      social_work_orientation: 42,
      problem_complexity: 35,
      creative_orientation: 30,
      leadership_drive: 38,
      stability_orientation: 86,
      achievement_drive: 48,
    },
  },
] as const;

const careerFamilies = [
  {
    id: "technology_product",
    name: "Technology & Product",
    examples: ["Software development", "Product management", "AI/product strategy", "Systems design"],
    why: "Matches profiles that like complexity, ownership, experimentation, and improving how systems work.",
    target: {
      work_autonomy: 76,
      structure_preference: 52,
      social_work_orientation: 55,
      problem_complexity: 88,
      creative_orientation: 78,
      leadership_drive: 55,
      stability_orientation: 48,
      achievement_drive: 78,
    },
    weights: {
      problem_complexity: 1.4,
      creative_orientation: 1.2,
      work_autonomy: 1.1,
      achievement_drive: 1.1,
    },
  },
  {
    id: "business_strategy",
    name: "Business & Strategy",
    examples: ["Strategy", "Consulting", "Business development", "Entrepreneurship"],
    why: "Fits people who enjoy ownership, complex decisions, growth, and influencing direction.",
    target: {
      work_autonomy: 82,
      structure_preference: 48,
      social_work_orientation: 72,
      problem_complexity: 82,
      creative_orientation: 70,
      leadership_drive: 78,
      stability_orientation: 35,
      achievement_drive: 86,
    },
    weights: {
      leadership_drive: 1.3,
      achievement_drive: 1.2,
      problem_complexity: 1.2,
      work_autonomy: 1.1,
    },
  },
  {
    id: "creative_design",
    name: "Creative & Design",
    examples: ["UX", "Product design", "Creative strategy", "Brand strategy"],
    why: "Matches people who need originality, experimentation, and room to shape how ideas become experiences.",
    target: {
      work_autonomy: 76,
      structure_preference: 42,
      social_work_orientation: 62,
      problem_complexity: 70,
      creative_orientation: 92,
      leadership_drive: 48,
      stability_orientation: 35,
      achievement_drive: 68,
    },
    weights: {
      creative_orientation: 1.6,
      work_autonomy: 1.1,
      problem_complexity: 1.1,
    },
  },
  {
    id: "people_leadership",
    name: "People & Leadership",
    examples: ["Management", "Training", "Organizational development", "People operations"],
    why: "Fits work that requires collaboration, communication, responsibility, and shared outcomes.",
    target: {
      work_autonomy: 65,
      structure_preference: 60,
      social_work_orientation: 88,
      problem_complexity: 58,
      creative_orientation: 52,
      leadership_drive: 88,
      stability_orientation: 55,
      achievement_drive: 76,
    },
    weights: {
      social_work_orientation: 1.4,
      leadership_drive: 1.4,
      achievement_drive: 1.1,
    },
  },
  {
    id: "operations_systems",
    name: "Operations & Systems",
    examples: ["Operations", "Project coordination", "Quality systems", "Process improvement"],
    why: "Fits people who like clarity, structure, reliability, and improving execution quality.",
    target: {
      work_autonomy: 55,
      structure_preference: 84,
      social_work_orientation: 55,
      problem_complexity: 58,
      creative_orientation: 45,
      leadership_drive: 58,
      stability_orientation: 76,
      achievement_drive: 62,
    },
    weights: {
      structure_preference: 1.5,
      stability_orientation: 1.2,
      problem_complexity: 1.1,
    },
  },
] as const;

const occupationMatches = [
  {
    id: "product_manager",
    name: "Product Manager",
    family: "Technology & Product",
    why: "Combines ownership, problem framing, collaboration, and creative decision-making.",
    possibleFriction: "Can become draining if stakeholder management overwhelms actual product thinking.",
    target: {
      work_autonomy: 78,
      structure_preference: 58,
      social_work_orientation: 88,
      problem_complexity: 82,
      creative_orientation: 78,
      leadership_drive: 78,
      stability_orientation: 45,
      achievement_drive: 82,
    },
    weights: {
      social_work_orientation: 1.3,
      problem_complexity: 1.2,
      leadership_drive: 1.2,
    },
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    family: "Business & Strategy",
    why: "Rewards autonomy, creativity, uncertainty tolerance, ownership, and growth drive.",
    possibleFriction: "May require more uncertainty and sustained pressure than stability-oriented profiles prefer.",
    target: {
      work_autonomy: 95,
      structure_preference: 32,
      social_work_orientation: 74,
      problem_complexity: 84,
      creative_orientation: 90,
      leadership_drive: 88,
      stability_orientation: 18,
      achievement_drive: 90,
    },
    weights: {
      work_autonomy: 1.3,
      stability_orientation: 1.4,
      creative_orientation: 1.2,
      leadership_drive: 1.2,
    },
  },
  {
    id: "software_product_developer",
    name: "Software Product Developer",
    family: "Technology & Product",
    why: "Fits complex problem-solving with room to build, improve, and own technical outcomes.",
    possibleFriction: "May feel isolating if you need high people interaction every day.",
    target: {
      work_autonomy: 76,
      structure_preference: 52,
      social_work_orientation: 34,
      problem_complexity: 92,
      creative_orientation: 72,
      leadership_drive: 38,
      stability_orientation: 58,
      achievement_drive: 76,
    },
    weights: {
      problem_complexity: 1.5,
      creative_orientation: 1.1,
      social_work_orientation: 1.1,
    },
  },
  {
    id: "ux_product_designer",
    name: "UX / Product Designer",
    family: "Creative & Design",
    why: "Blends creative exploration, problem solving, user empathy, and iterative improvement.",
    possibleFriction: "Can be frustrating if the environment is too rigid or gives little room for experimentation.",
    target: {
      work_autonomy: 72,
      structure_preference: 48,
      social_work_orientation: 68,
      problem_complexity: 76,
      creative_orientation: 92,
      leadership_drive: 42,
      stability_orientation: 45,
      achievement_drive: 68,
    },
    weights: {
      creative_orientation: 1.5,
      problem_complexity: 1.2,
      social_work_orientation: 1.1,
    },
  },
  {
    id: "operations_manager",
    name: "Operations Manager",
    family: "Operations & Systems",
    why: "Fits structured responsibility, coordination, reliable systems, and measurable execution.",
    possibleFriction: "May feel too procedural for profiles with very high novelty and low structure preference.",
    target: {
      work_autonomy: 62,
      structure_preference: 86,
      social_work_orientation: 70,
      problem_complexity: 58,
      creative_orientation: 42,
      leadership_drive: 76,
      stability_orientation: 76,
      achievement_drive: 62,
    },
    weights: {
      structure_preference: 1.4,
      leadership_drive: 1.2,
      stability_orientation: 1.2,
    },
  },
  {
    id: "research_specialist",
    name: "Research / Technical Specialist",
    family: "Technology & Product",
    why: "Fits deep expertise, difficult problems, analysis, and mastery without needing constant management responsibility.",
    possibleFriction: "May not satisfy you if you strongly need social interaction or visible leadership ownership.",
    target: {
      work_autonomy: 72,
      structure_preference: 56,
      social_work_orientation: 30,
      problem_complexity: 94,
      creative_orientation: 62,
      leadership_drive: 30,
      stability_orientation: 58,
      achievement_drive: 84,
    },
    weights: {
      problem_complexity: 1.6,
      achievement_drive: 1.2,
      leadership_drive: 1.1,
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

function bandForDimension(dimension: CareerDimensionKey, score: number) {
  const meta = CAREER_DIMENSIONS[dimension];

  if (score <= 20) return `Strongly ${meta.lowLabel}`;
  if (score < 40) return meta.lowLabel;
  if (score <= 60) return "Balanced";
  if (score < 80) return meta.highLabel;
  return `Strongly ${meta.highLabel}`;
}

function weightedFit(
  scores: ScoreMap,
  target: TargetMap,
  weights: WeightMap = {},
) {
  const weightedDistance = CAREER_DIMENSION_ORDER.reduce((sum, dimension) => {
    const weight = weights[dimension] ?? 1;
    return sum + Math.abs(scores[dimension] - target[dimension]) * weight;
  }, 0);
  const totalWeight = CAREER_DIMENSION_ORDER.reduce(
    (sum, dimension) => sum + (weights[dimension] ?? 1),
    0,
  );

  return Math.max(0, Math.round(100 - weightedDistance / totalWeight));
}

function calculatePatterns(scores: ScoreMap) {
  return patternDefinitions
    .map((pattern) => ({
      pattern,
      matchScore: weightedFit(scores, pattern.target),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
}

function toPatternResult(match: ReturnType<typeof calculatePatterns>[number]): CareerPatternResult {
  return {
    id: match.pattern.id,
    name: match.pattern.name,
    tagline: match.pattern.tagline,
    description: match.pattern.description,
    matchScore: match.matchScore,
  };
}

function calculateCareerFamilies(scores: ScoreMap): CareerFamilyMatch[] {
  return careerFamilies
    .map((family) => ({
      id: family.id,
      name: family.name,
      examples: [...family.examples],
      why: family.why,
      fit: weightedFit(scores, family.target, family.weights),
    }))
    .sort((a, b) => b.fit - a.fit)
    .slice(0, 5);
}

function calculateOccupationMatches(scores: ScoreMap): CareerOccupationMatch[] {
  return occupationMatches
    .map((occupation) => ({
      id: occupation.id,
      name: occupation.name,
      family: occupation.family,
      why: occupation.why,
      possibleFriction: occupation.possibleFriction,
      fit: weightedFit(scores, occupation.target, occupation.weights),
    }))
    .sort((a, b) => b.fit - a.fit)
    .slice(0, 5);
}

function workEnvironmentStyle(scores: ScoreMap) {
  if (scores.work_autonomy >= 70 && scores.structure_preference >= 65) {
    return "Self-directed but organized";
  }
  if (scores.work_autonomy >= 70 && scores.structure_preference <= 45) {
    return "Dynamic and self-directed";
  }
  if (scores.work_autonomy <= 45 && scores.structure_preference >= 65) {
    return "Guided and structured";
  }
  return "Balanced and context-aware";
}

function problemStyle(scores: ScoreMap) {
  if (scores.problem_complexity >= 70 && scores.creative_orientation >= 70) {
    return "Complex and exploratory";
  }
  if (scores.problem_complexity >= 70) return "Analytical complexity-seeker";
  if (scores.creative_orientation >= 70) return "Creative experimenter";
  return "Clear execution-oriented";
}

function responsibilityStyle(scores: ScoreMap) {
  if (scores.leadership_drive >= 70) return "Ownership-oriented";
  if (scores.leadership_drive <= 40) return "Individual contributor-oriented";
  return "Shared-responsibility oriented";
}

function growthStyle(scores: ScoreMap) {
  if (scores.achievement_drive >= 70 && scores.stability_orientation <= 45) {
    return "High-growth and opportunity-tolerant";
  }
  if (scores.achievement_drive >= 70) return "Growth and mastery-oriented";
  if (scores.stability_orientation >= 70) return "Steady and sustainable";
  return "Lifestyle-balanced";
}

function bestFitEnvironments(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.work_autonomy >= 65) items.push("Outcome-based roles with freedom over execution.");
  if (scores.structure_preference >= 65) items.push("Clear expectations, deadlines, and reliable workflows.");
  if (scores.structure_preference <= 40) items.push("Flexible environments where priorities can adapt.");
  if (scores.social_work_orientation >= 65) items.push("Teams with meaningful discussion, collaboration, or client interaction.");
  if (scores.social_work_orientation <= 40) items.push("Focused work blocks with space for independent contribution.");
  if (scores.problem_complexity >= 65) items.push("Problem-solving heavy work with real complexity.");
  if (scores.creative_orientation >= 65) items.push("Room to experiment, build, and improve approaches.");
  if (scores.leadership_drive >= 65) items.push("Ownership over decisions, direction, or outcomes.");
  if (scores.stability_orientation >= 65) items.push("Stable organizations with predictable income and continuity.");
  if (scores.achievement_drive >= 65) items.push("A visible path for mastery, growth, and meaningful challenge.");

  return items.slice(0, 6);
}

function strengths(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.work_autonomy >= 65) items.push("Self-direction");
  if (scores.structure_preference >= 65) items.push("Organized execution");
  if (scores.social_work_orientation >= 65) items.push("Collaborative engagement");
  if (scores.problem_complexity >= 65) items.push("Complex problem-solving");
  if (scores.creative_orientation >= 65) items.push("Experimentation and originality");
  if (scores.leadership_drive >= 65) items.push("Ownership and direction-setting");
  if (scores.stability_orientation >= 65) items.push("Long-term career steadiness");
  if (scores.achievement_drive >= 65) items.push("Mastery and progression");

  return items.length ? items.slice(0, 6) : ["Context-sensitive career adaptability"];
}

function drainers(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.work_autonomy >= 70) {
    items.push("Heavy micromanagement or roles with little freedom over execution may feel restrictive.");
  }
  if (scores.structure_preference <= 40) {
    items.push("Rigid procedures and excessive predefined steps may reduce engagement.");
  }
  if (scores.structure_preference >= 70) {
    items.push("Chaotic environments with unclear priorities may drain focus.");
  }
  if (scores.problem_complexity >= 70 || scores.creative_orientation >= 70) {
    items.push("Highly repetitive work with little room for problem-solving may become less engaging.");
  }
  if (scores.stability_orientation >= 70) {
    items.push("Prolonged financial or career uncertainty may require extra adjustment.");
  }
  if (scores.social_work_orientation <= 40) {
    items.push("Constant meetings or people-intensive work may interrupt your best focus.");
  }

  return items.length ? items.slice(0, 5) : ["No strong work-environment drainer stood out from this assessment."];
}

function frictionPoints(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.work_autonomy >= 75 && scores.structure_preference >= 75) {
    items.push("You may want freedom over execution while also needing clear systems and expectations.");
  }
  if (scores.leadership_drive >= 75 && scores.stability_orientation >= 75) {
    items.push("You may want influence and advancement, but still prefer a secure environment for taking those steps.");
  }
  if (scores.creative_orientation >= 75 && scores.stability_orientation >= 75) {
    items.push("You may enjoy innovation but feel cautious when creative paths involve too much uncertainty.");
  }
  if (scores.social_work_orientation >= 75 && scores.problem_complexity >= 75) {
    items.push("You may need collaboration that adds real thinking value, not just constant social activity.");
  }
  if (scores.achievement_drive >= 75 && scores.structure_preference <= 35) {
    items.push("Growth goals may move faster when you add just enough structure to finish what you start.");
  }

  return items.length ? items.slice(0, 4) : ["Your career preferences appear relatively coherent across the measured dimensions."];
}

function insights(scores: ScoreMap) {
  const items: string[] = [];

  if (scores.work_autonomy >= 70 && scores.problem_complexity >= 70) {
    items.push("You may work best when trusted with outcomes rather than step-by-step instructions.");
  }
  if (scores.creative_orientation >= 70 && scores.stability_orientation <= 45) {
    items.push("Opportunity and experimentation may matter more to you than a fully predictable path.");
  }
  if (scores.structure_preference >= 70 && scores.work_autonomy >= 70) {
    items.push("You may not dislike structure; you may simply want to help shape it yourself.");
  }
  if (scores.social_work_orientation >= 70 && scores.leadership_drive >= 70) {
    items.push("Your career energy may rise when people, direction, and shared outcomes intersect.");
  }
  if (scores.achievement_drive <= 45 && scores.stability_orientation >= 60) {
    items.push("Career satisfaction may be tied more to sustainability and lifestyle fit than constant advancement.");
  }

  return items.slice(0, 4);
}

export function calculateCareerFitResult(
  answers: Record<number, AnswerValue>,
): CareerFitResult {
  const answerEvidence: CareerAnswerEvidence[] = CAREER_FIT_QUESTIONS.map(
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
  const dimensions = {} as Record<CareerDimensionKey, CareerDimensionScore>;

  CAREER_DIMENSION_ORDER.forEach((dimension) => {
    const items = answerEvidence.filter((item) => item.dimension === dimension);
    const mean =
      items.reduce((sum, item) => sum + item.scoredResponse, 0) / items.length;
    const score = normalizeMean(mean);
    const consistency = calculateConsistency(items.map((item) => item.scoredResponse));
    const metadata = CAREER_DIMENSIONS[dimension];

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
    CAREER_DIMENSION_ORDER.reduce(
      (sum, dimension) => sum + dimensions[dimension].consistency,
      0,
    ) / CAREER_DIMENSION_ORDER.length,
  );

  return {
    pattern: toPatternResult(patternMatches[0]),
    secondaryPattern: toPatternResult(patternMatches[1]),
    dimensions,
    workEnvironmentStyle: workEnvironmentStyle(rawScores),
    problemStyle: problemStyle(rawScores),
    responsibilityStyle: responsibilityStyle(rawScores),
    growthStyle: growthStyle(rawScores),
    bestFitEnvironments: bestFitEnvironments(rawScores),
    careerFamilies: calculateCareerFamilies(rawScores),
    occupationMatches: calculateOccupationMatches(rawScores),
    strengths: strengths(rawScores),
    drainers: drainers(rawScores),
    frictionPoints: frictionPoints(rawScores),
    insights: insights(rawScores),
    confidence: confidenceFromConsistency(averageConsistency),
    confidenceNotes: [
      `Based on ${CAREER_FIT_QUESTIONS.length} career preference responses across ${CAREER_DIMENSION_ORDER.length} dimensions.`,
      `Average response consistency: ${averageConsistency}%.`,
      "Career fit describes preferred work characteristics, not ability, qualifications, or guaranteed success.",
    ],
    answerEvidence,
  };
}

export function getCareerScoresForStorage(result: CareerFitResult) {
  return CAREER_DIMENSION_ORDER.reduce(
    (scores, dimension) => {
      scores[dimension] = result.dimensions[dimension].score;
      return scores;
    },
    {} as Record<string, number>,
  );
}
