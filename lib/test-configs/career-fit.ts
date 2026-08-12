import { registerTest, TestConfig } from "@/lib/test-config";
import {
  calculateCareerFitResult,
  getCareerScoresForStorage,
} from "@/lib/career-fit/engine";
import { CAREER_FIT_QUESTIONS } from "@/lib/career-fit/data";

const answerOptions = [
  { value: 1 as const, label: "Strongly Disagree", color: "#EF4444" },
  { value: 2 as const, label: "Disagree", color: "#F97316" },
  { value: 3 as const, label: "Slightly Disagree", color: "#F59E0B" },
  { value: 4 as const, label: "Neutral / Depends", color: "#9CA3AF" },
  { value: 5 as const, label: "Slightly Agree", color: "#22C55E" },
  { value: 6 as const, label: "Agree", color: "#14B8A6" },
  { value: 7 as const, label: "Strongly Agree", color: "#06B6D4" },
];

const careerFitConfig: TestConfig = {
  id: "career-fit",
  title: "Career Fit",
  description:
    "Discover the work environments, career patterns, and role characteristics that fit how you prefer to work.",
  path: "/assessment/career-fit",
  questions: CAREER_FIT_QUESTIONS.map((question) => ({
    id: question.id,
    text: question.text,
  })),
  answerOptions,
  scoring: (answers) => calculateCareerFitResult(answers),
  generateResult: (score) => ({
    variant: "career-fit",
    result: score,
  }),
  persistence: {
    testType: "career_profile",
    buildScores: (score) => getCareerScoresForStorage(score),
    buildResult: (score) => ({
      title: score.pattern.name,
      pattern: score.pattern.name,
      patternId: score.pattern.id,
      tagline: score.pattern.tagline,
      description: score.pattern.description,
      matchScore: score.pattern.matchScore,
      secondaryPattern: score.secondaryPattern,
      dimensions: score.dimensions,
      workEnvironmentStyle: score.workEnvironmentStyle,
      problemStyle: score.problemStyle,
      responsibilityStyle: score.responsibilityStyle,
      growthStyle: score.growthStyle,
      bestFitEnvironments: score.bestFitEnvironments,
      careerFamilies: score.careerFamilies,
      occupationMatches: score.occupationMatches,
      strengths: score.strengths,
      drainers: score.drainers,
      frictionPoints: score.frictionPoints,
      insights: score.insights,
      confidence: score.confidence,
      confidenceNotes: score.confidenceNotes,
      answerEvidence: score.answerEvidence,
      category: "career",
      domain: "career",
    }),
  },
  startScreenContent: {
    title: "Career Fit Assessment",
    guidelines: [
      "Answer based on the kind of work environment that usually fits you best",
      "This measures preferences, not talent, qualifications, or guaranteed success",
      "Career matches describe similarity to modeled work characteristics",
      "Your result adds career signals to your unified TrueSelf profile",
    ],
    estimatedTime: "8-10 minutes",
  },
};

registerTest(careerFitConfig);

export default careerFitConfig;
