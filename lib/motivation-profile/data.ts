import type { MotivationDimensionKey, MotivationQuestion } from "./types";

export const MOTIVATION_DIMENSION_ORDER: MotivationDimensionKey[] = [
  "growth_mastery",
  "purpose_meaning",
  "autonomy_drive",
  "achievement_progress",
  "recognition_validation",
  "connection_contribution",
  "security_motivation",
  "challenge_activation",
];

export const MOTIVATION_DIMENSIONS: Record<
  MotivationDimensionKey,
  {
    label: string;
    shortLabel: string;
    description: string;
    lowLabel: string;
    highLabel: string;
    color: string;
    soft: string;
  }
> = {
  growth_mastery: {
    label: "Growth & Mastery",
    shortLabel: "Mastery",
    description:
      "How strongly improvement, learning, competence, and becoming more capable activate motivation.",
    lowLabel: "Sufficiency-Oriented",
    highLabel: "Mastery-Driven",
    color: "#16a34a",
    soft: "#dcfce7",
  },
  purpose_meaning: {
    label: "Purpose & Meaning",
    shortLabel: "Purpose",
    description:
      "How much meaning, significance, and believing something matters strengthen motivation.",
    lowLabel: "Task-Driven",
    highLabel: "Purpose-Driven",
    color: "#0891b2",
    soft: "#cffafe",
  },
  autonomy_drive: {
    label: "Autonomy Drive",
    shortLabel: "Autonomy",
    description:
      "How much choice, ownership, and personal agency increase your drive to act.",
    lowLabel: "Direction-Compatible",
    highLabel: "Autonomy-Motivated",
    color: "#2563eb",
    soft: "#dbeafe",
  },
  achievement_progress: {
    label: "Achievement & Progress",
    shortLabel: "Progress",
    description:
      "How much goals, milestones, completion, and visible progress create motivational momentum.",
    lowLabel: "Process-Oriented",
    highLabel: "Progress-Driven",
    color: "#f97316",
    soft: "#ffedd5",
  },
  recognition_validation: {
    label: "Recognition & Validation",
    shortLabel: "Recognition",
    description:
      "How much appreciation, feedback, and acknowledgment from others reinforce effort.",
    lowLabel: "Internally Referenced",
    highLabel: "Recognition-Responsive",
    color: "#db2777",
    soft: "#fce7f3",
  },
  connection_contribution: {
    label: "Connection & Contribution",
    shortLabel: "Contribution",
    description:
      "How much helping, belonging, shared goals, and impact on others activate motivation.",
    lowLabel: "Self-Directed",
    highLabel: "Contribution-Driven",
    color: "#14b8a6",
    soft: "#ccfbf1",
  },
  security_motivation: {
    label: "Security & Stability",
    shortLabel: "Security",
    description:
      "How strongly protecting certainty, stability, and a reliable future motivates action.",
    lowLabel: "Security-Independent",
    highLabel: "Security-Motivated",
    color: "#64748b",
    soft: "#f1f5f9",
  },
  challenge_activation: {
    label: "Challenge & Activation",
    shortLabel: "Challenge",
    description:
      "How much difficulty, challenge, demanding goals, and stakes increase motivational activation.",
    lowLabel: "Steady-Pace",
    highLabel: "Challenge-Activated",
    color: "#dc2626",
    soft: "#fee2e2",
  },
};

const question = (
  id: number,
  code: string,
  text: string,
  dimension: MotivationDimensionKey,
  scoring: "direct" | "reverse",
  facet: string,
  displayOrder: number,
): MotivationQuestion => ({
  id,
  code,
  text,
  dimension,
  scoring,
  facet,
  displayOrder,
});

export const MOTIVATION_QUESTIONS: MotivationQuestion[] = [
  question(1, "MOT-GM01", "Seeing myself become more capable at something makes me want to keep going.", "growth_mastery", "direct", "Competence Growth", 1),
  question(7, "MOT-PM01", "I can work very hard when I believe what I am doing genuinely matters.", "purpose_meaning", "direct", "Meaningful Effort", 2),
  question(13, "MOT-AU01", "I become more motivated when I have meaningful control over how I pursue a goal.", "autonomy_drive", "direct", "Control", 3),
  question(19, "MOT-AP01", "Seeing clear progress toward a goal makes me want to push further.", "achievement_progress", "direct", "Progress Feedback", 4),
  question(25, "MOT-RV01", "Knowing that my effort is genuinely recognized makes me more motivated to continue.", "recognition_validation", "direct", "Recognition", 5),
  question(31, "MOT-CC01", "I become more motivated when I know my effort will genuinely help someone else.", "connection_contribution", "direct", "Helping Impact", 6),
  question(37, "MOT-SS01", "Protecting my future stability can motivate me to work even when the work itself is not exciting.", "security_motivation", "direct", "Future Security", 7),
  question(43, "MOT-CA01", "A difficult challenge often makes me more determined to succeed.", "challenge_activation", "direct", "Challenge Response", 8),
  question(20, "MOT-AP02", "Tracking progress or reaching milestones does little to increase my motivation.", "achievement_progress", "reverse", "Milestone Impact", 9),
  question(2, "MOT-GM02", "Once I can do something well enough, becoming significantly better at it rarely motivates me.", "growth_mastery", "reverse", "Mastery Intensity", 10),
  question(38, "MOT-SS02", "Avoiding future uncertainty is rarely a strong reason for me to take action.", "security_motivation", "reverse", "Uncertainty Prevention", 11),
  question(14, "MOT-AU02", "Having freedom over how I do something usually does not change how motivated I feel.", "autonomy_drive", "reverse", "Freedom Impact", 12),
  question(32, "MOT-CC02", "Knowing that other people benefit from my effort usually does not make me work any harder.", "connection_contribution", "reverse", "Contribution Impact", 13),
  question(44, "MOT-CA02", "When a goal becomes significantly harder than expected, my motivation usually drops quickly.", "challenge_activation", "reverse", "Difficulty Persistence", 14),
  question(8, "MOT-PM02", "Whether something feels personally meaningful has little effect on how motivated I am to do it.", "purpose_meaning", "reverse", "Meaning Dependence", 15),
  question(26, "MOT-RV02", "Whether other people notice my effort has very little effect on my motivation.", "recognition_validation", "reverse", "Internal Reference", 16),
  question(27, "MOT-RV03", "Receiving sincere appreciation for something I worked hard on can increase my motivation significantly.", "recognition_validation", "direct", "Appreciation", 17),
  question(45, "MOT-CA03", "I often become more engaged when a task requires me to stretch beyond what feels easy.", "challenge_activation", "direct", "Stretch Motivation", 18),
  question(3, "MOT-GM03", "Learning a difficult skill can feel rewarding to me even before it produces any external benefit.", "growth_mastery", "direct", "Learning Reward", 19),
  question(33, "MOT-CC03", "Working toward something with people I care about can make me more committed to the goal.", "connection_contribution", "direct", "Shared Goals", 20),
  question(15, "MOT-AU03", "I put more energy into something when I feel that the decision to pursue it is genuinely mine.", "autonomy_drive", "direct", "Ownership", 21),
  question(9, "MOT-PM03", "Knowing the deeper reason behind a goal makes it easier for me to stay committed to it.", "purpose_meaning", "direct", "Purpose Connection", 22),
  question(21, "MOT-AP03", "Completing one meaningful goal often gives me energy to pursue the next one.", "achievement_progress", "direct", "Goal Momentum", 23),
  question(39, "MOT-SS03", "Building a reliable foundation for my future gives me a strong reason to stay disciplined.", "security_motivation", "direct", "Stability Building", 24),
  question(10, "MOT-PM04", "I can stay equally motivated toward a goal even when I see little personal significance in it.", "purpose_meaning", "reverse", "Significance Need", 25),
  question(16, "MOT-AU04", "I can be just as motivated when someone else determines exactly how I should approach a task.", "autonomy_drive", "reverse", "External Direction", 26),
  question(28, "MOT-RV04", "I can stay just as motivated even when my contributions receive little acknowledgment from others.", "recognition_validation", "reverse", "Recognition Independence", 27),
  question(40, "MOT-SS04", "The possibility of losing stability usually does not motivate me much more than the possibility of gaining something new.", "security_motivation", "reverse", "Loss Prevention", 28),
  question(4, "MOT-GM04", "If improving a skill will not noticeably change the outcome, I usually see little reason to keep developing it.", "growth_mastery", "reverse", "Improvement Value", 29),
  question(22, "MOT-AP04", "I do not need a clear sense of progress to remain motivated over a long period.", "achievement_progress", "reverse", "Progress Dependence", 30),
  question(46, "MOT-CA04", "I am usually more motivated by achievable, comfortable goals than by goals that seriously test my abilities.", "challenge_activation", "reverse", "Difficulty Preference", 31),
  question(34, "MOT-CC04", "Whether I feel connected to the people affected by my work makes little difference to my motivation.", "connection_contribution", "reverse", "Relational Motivation", 32),
  question(35, "MOT-CC05", "I can push myself further when I know other people are depending on my contribution.", "connection_contribution", "direct", "Responsibility to Others", 33),
  question(5, "MOT-GM05", "The feeling that I am getting better at something is a strong source of motivation for me.", "growth_mastery", "direct", "Progress in Ability", 34),
  question(23, "MOT-AP05", "Breaking a large goal into visible milestones usually helps me stay motivated.", "achievement_progress", "direct", "Milestone Motivation", 35),
  question(47, "MOT-CA05", "The chance to prove to myself that I can handle something difficult can strongly motivate me.", "challenge_activation", "direct", "Self-Challenge", 36),
  question(11, "MOT-PM05", "I become more invested in an effort when it connects to something I consider important.", "purpose_meaning", "direct", "Personal Significance", 37),
  question(41, "MOT-SS05", "Knowing that my effort can create greater long-term security makes it easier for me to persist.", "security_motivation", "direct", "Security Reward", 38),
  question(29, "MOT-RV05", "Positive feedback can give me extra energy to keep improving what I am doing.", "recognition_validation", "direct", "Positive Feedback", 39),
  question(17, "MOT-AU05", "Having room to make my own choices makes it easier for me to stay engaged.", "autonomy_drive", "direct", "Choice", 40),
  question(42, "MOT-SS06", "I am rarely motivated to work harder simply to make my situation safer or more predictable.", "security_motivation", "reverse", "Safety Motivation", 41),
  question(30, "MOT-RV06", "I rarely need acknowledgment from other people to feel motivated by my efforts.", "recognition_validation", "reverse", "Validation Independence", 42),
  question(18, "MOT-AU06", "Whether I choose the approach myself or simply follow someone else's method makes little difference to my motivation.", "autonomy_drive", "reverse", "Self-Direction Impact", 43),
  question(6, "MOT-GM06", "I am usually satisfied once I reach a functional level of ability, even if there is much more I could master.", "growth_mastery", "reverse", "Competence Sufficiency", 44),
  question(48, "MOT-CA06", "When the difficulty of something keeps increasing, I usually become less interested in pursuing it.", "challenge_activation", "reverse", "Challenge Persistence", 45),
  question(36, "MOT-CC06", "I am generally no more motivated by a goal just because it contributes to something larger than myself.", "connection_contribution", "reverse", "Collective Contribution", 46),
  question(12, "MOT-PM06", "If the outcome is useful enough, I usually do not need to feel that the work itself has any deeper meaning.", "purpose_meaning", "reverse", "Utility vs Meaning", 47),
  question(24, "MOT-AP06", "Whether I can clearly see how far I have progressed usually makes little difference to my effort.", "achievement_progress", "reverse", "Visible Progress", 48),
].sort((a, b) => a.displayOrder - b.displayOrder);
