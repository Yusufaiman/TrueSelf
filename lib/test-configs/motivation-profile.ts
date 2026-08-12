import { registerTest, TestConfig } from "@/lib/test-config";
import {
  calculateMotivationProfileResult,
  getMotivationScoresForStorage,
} from "@/lib/motivation-profile/engine";
import { MOTIVATION_QUESTIONS } from "@/lib/motivation-profile/data";

const answerOptions = [
  { value: 1 as const, label: "Strongly Disagree", color: "#EF4444" },
  { value: 2 as const, label: "Disagree", color: "#F97316" },
  { value: 3 as const, label: "Slightly Disagree", color: "#F59E0B" },
  { value: 4 as const, label: "Neutral / Depends", color: "#9CA3AF" },
  { value: 5 as const, label: "Slightly Agree", color: "#22C55E" },
  { value: 6 as const, label: "Agree", color: "#14B8A6" },
  { value: 7 as const, label: "Strongly Agree", color: "#06B6D4" },
];

const motivationProfileConfig: TestConfig = {
  id: "motivation-profile",
  title: "Motivation Profile",
  description:
    "Discover what actually moves you to act, persist, and keep going.",
  path: "/assessment/motivation-profile",
  questions: MOTIVATION_QUESTIONS.map((question) => ({
    id: question.id,
    text: question.text,
  })),
  answerOptions,
  scoring: (answers) => calculateMotivationProfileResult(answers),
  generateResult: (score) => ({
    variant: "motivation-profile",
    result: score,
  }),
  persistence: {
    testType: "motivation_profile",
    buildScores: (score) => getMotivationScoresForStorage(score),
    buildResult: (score) => ({
      title: score.pattern.name,
      pattern: score.pattern.name,
      patternId: score.pattern.id,
      tagline: score.pattern.tagline,
      description: score.pattern.description,
      matchScore: score.pattern.matchScore,
      secondaryPattern: score.secondaryPattern,
      dimensions: score.dimensions,
      primaryDrivers: score.primaryDrivers,
      supportingDrivers: score.supportingDrivers,
      lowerInfluenceDrivers: score.lowerInfluenceDrivers,
      activationProfile: score.activationProfile,
      motivationTensions: score.motivationTensions,
      frictionProfile: score.frictionProfile,
      insights: score.insights,
      confidence: score.confidence,
      confidenceNotes: score.confidenceNotes,
      answerEvidence: score.answerEvidence,
      category: "motivation",
      domain: "motivation",
    }),
  },
  startScreenContent: {
    title: "Motivation Assessment",
    guidelines: [
      "Answer based on what usually increases or reduces your drive to act",
      "This does not measure laziness, discipline, or overall motivation level",
      "Several motivation sources can be strong at the same time",
      "Your result adds motivation signals to your unified TrueSelf profile",
    ],
    estimatedTime: "8-10 minutes",
  },
};

registerTest(motivationProfileConfig);

export default motivationProfileConfig;
