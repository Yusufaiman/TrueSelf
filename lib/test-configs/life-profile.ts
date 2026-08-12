import { registerTest, TestConfig } from "@/lib/test-config";
import {
  calculateLifeProfileResult,
  getLifeScoresForStorage,
} from "@/lib/life-profile/engine";
import { LIFE_QUESTIONS } from "@/lib/life-profile/data";

const answerOptions = [
  { value: 1 as const, label: "Strongly Disagree", color: "#EF4444" },
  { value: 2 as const, label: "Disagree", color: "#F97316" },
  { value: 3 as const, label: "Slightly Disagree", color: "#F59E0B" },
  { value: 4 as const, label: "Neutral / Depends", color: "#9CA3AF" },
  { value: 5 as const, label: "Slightly Agree", color: "#22C55E" },
  { value: 6 as const, label: "Agree", color: "#14B8A6" },
  { value: 7 as const, label: "Strongly Agree", color: "#06B6D4" },
];

const lifeProfileConfig: TestConfig = {
  id: "life-profile",
  title: "Life Profile",
  description:
    "Understand how your current life fits together across direction, alignment, experience, and future outlook.",
  path: "/assessment/life-profile",
  questions: LIFE_QUESTIONS.map((question) => ({
    id: question.id,
    text: question.text,
  })),
  answerOptions,
  scoring: (answers) => calculateLifeProfileResult(answers),
  generateResult: (score) => ({
    variant: "life-profile",
    result: score,
  }),
  persistence: {
    testType: "life_profile",
    buildScores: (score) => getLifeScoresForStorage(score),
    buildResult: (score) => ({
      title: score.primaryPattern.name,
      pattern: score.primaryPattern.name,
      dimensions: score.dimensions,
      stages: score.stages,
      lifeStrength: score.lifeStrength,
      attentionArea: score.attentionArea,
      primaryPattern: score.primaryPattern,
      secondaryPattern: score.secondaryPattern,
      lifeGaps: score.lifeGaps,
      lifeTensions: score.lifeTensions,
      lifeSupports: score.lifeSupports,
      priorityPath: score.priorityPath,
      currentStateSummary: score.currentStateSummary,
      confidence: score.confidence,
      confidenceNotes: score.confidenceNotes,
      assessmentVersion: score.assessmentVersion,
      completedAt: score.completedAt,
      answerEvidence: score.answerEvidence,
      category: "life",
      domain: "life",
    }),
  },
  startScreenContent: {
    title: "Life Assessment",
    guidelines: [
      "Answer based on your current life state, not who you have always been",
      "This assessment maps direction, alignment, experience, connection, satisfaction, and future outlook",
      "There is no single life score; the useful insight comes from comparing dimensions",
      "Life can change, so each completed attempt is saved as its own snapshot over time",
    ],
    estimatedTime: "8-10 minutes",
  },
};

registerTest(lifeProfileConfig);

export default lifeProfileConfig;
