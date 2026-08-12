import type { MindDimensionKey, MindQuestion } from "./types";

export const MIND_DIMENSION_ORDER: MindDimensionKey[] = [
  "analytical_processing",
  "intuitive_processing",
  "cognitive_flexibility",
  "depth_processing",
  "decision_deliberation",
  "uncertainty_tolerance",
  "learning_exploration",
  "mental_focus",
];

export const MIND_DIMENSIONS: Record<
  MindDimensionKey,
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
  analytical_processing: {
    label: "Analytical Processing",
    shortLabel: "Analysis",
    description:
      "How naturally you break information apart, compare evidence, and examine internal logic.",
    lowLabel: "Holistic",
    highLabel: "Analytical",
    color: "#2563eb",
    soft: "#dbeafe",
  },
  intuitive_processing: {
    label: "Intuitive Processing",
    shortLabel: "Synthesis",
    description:
      "How often patterns, connections, and impressions emerge before every reasoning step is explicit.",
    lowLabel: "Sequential",
    highLabel: "Intuitive",
    color: "#8b5cf6",
    soft: "#ede9fe",
  },
  cognitive_flexibility: {
    label: "Cognitive Flexibility",
    shortLabel: "Flexibility",
    description:
      "Readiness to reconsider, reframe, and change mental approach when new information appears.",
    lowLabel: "Consistent",
    highLabel: "Flexible",
    color: "#14b8a6",
    soft: "#ccfbf1",
  },
  depth_processing: {
    label: "Depth of Processing",
    shortLabel: "Depth",
    description:
      "Tendency to go beyond surface information into mechanisms, assumptions, and deeper implications.",
    lowLabel: "Practical",
    highLabel: "Deep",
    color: "#0891b2",
    soft: "#cffafe",
  },
  decision_deliberation: {
    label: "Decision Deliberation",
    shortLabel: "Deliberation",
    description:
      "How much reflection, comparison, and consequence-checking you prefer before committing.",
    lowLabel: "Rapid",
    highLabel: "Deliberative",
    color: "#f97316",
    soft: "#ffedd5",
  },
  uncertainty_tolerance: {
    label: "Uncertainty Tolerance",
    shortLabel: "Uncertainty",
    description:
      "Comfort operating with incomplete information, open questions, and unresolved possibilities.",
    lowLabel: "Clarity-Seeking",
    highLabel: "Uncertainty-Tolerant",
    color: "#16a34a",
    soft: "#dcfce7",
  },
  learning_exploration: {
    label: "Learning Exploration",
    shortLabel: "Learning",
    description:
      "Curiosity and tendency to independently explore knowledge beyond immediate requirements.",
    lowLabel: "Purpose-Driven",
    highLabel: "Exploratory",
    color: "#db2777",
    soft: "#fce7f3",
  },
  mental_focus: {
    label: "Mental Focus",
    shortLabel: "Focus",
    description:
      "Tendency to sustain attention on one mental thread despite competing inputs or interruptions.",
    lowLabel: "Broad Attention",
    highLabel: "Sustained Focus",
    color: "#64748b",
    soft: "#f1f5f9",
  },
};

const question = (
  id: number,
  code: string,
  text: string,
  dimension: MindDimensionKey,
  scoring: "direct" | "reverse",
  facet: string,
  displayOrder: number,
): MindQuestion => ({
  id,
  code,
  text,
  dimension,
  scoring,
  facet,
  displayOrder,
});

export const MIND_QUESTIONS: MindQuestion[] = [
  question(1, "AP01", "When facing a complicated problem, I naturally break it into smaller parts.", "analytical_processing", "direct", "Decomposition", 1),
  question(2, "IP01", "I sometimes recognize that something fits before I can fully explain why.", "intuitive_processing", "direct", "Intuitive Recognition", 2),
  question(3, "CF01", "When new evidence challenges my view, I can usually reconsider my position.", "cognitive_flexibility", "direct", "Belief Updating", 3),
  question(4, "DP01", "When something interests me, I want to understand why it works rather than only knowing that it works.", "depth_processing", "direct", "Mechanism Seeking", 4),
  question(5, "DD01", "Before making an important decision, I prefer considering several possible outcomes.", "decision_deliberation", "direct", "Outcome Evaluation", 5),
  question(6, "UT01", "I can continue working on a problem even when I do not yet understand exactly where it will lead.", "uncertainty_tolerance", "direct", "Ambiguity Comfort", 6),
  question(7, "LE01", "I often explore a topic further even after I have learned everything I originally needed.", "learning_exploration", "direct", "Extended Exploration", 7),
  question(8, "MF01", "When I am mentally engaged in something, I can stay focused on it for a long period.", "mental_focus", "direct", "Sustained Attention", 8),
  question(9, "DP02", "Once I understand enough to use something effectively, I usually feel little need to explore it further.", "depth_processing", "reverse", "Sufficient Understanding", 9),
  question(10, "MF02", "My attention often shifts to a new idea before I have finished thinking through the previous one.", "mental_focus", "reverse", "Attention Switching", 10),
  question(11, "IP02", "I rarely trust an initial impression until I can explain exactly how I reached it.", "intuitive_processing", "reverse", "Explicit Reasoning", 11),
  question(12, "UT02", "I find it difficult to move forward when too many important details remain uncertain.", "uncertainty_tolerance", "reverse", "Clarity Need", 12),
  question(13, "AP02", "If a conclusion seems reasonable overall, I rarely feel the need to examine exactly how it was reached.", "analytical_processing", "reverse", "Reasoning Examination", 13),
  question(14, "LE02", "If information has no clear use for me, I rarely feel motivated to learn more about it.", "learning_exploration", "reverse", "Utility Orientation", 14),
  question(15, "DD02", "Once an option seems good enough, I usually prefer deciding rather than continuing to analyze it.", "decision_deliberation", "reverse", "Decision Speed", 15),
  question(16, "CF02", "Once I have found an explanation that makes sense to me, I prefer not to keep considering alternatives.", "cognitive_flexibility", "reverse", "Alternative Consideration", 16),
  question(17, "CF03", "If one approach to a problem is not working, I can usually shift to a very different approach.", "cognitive_flexibility", "direct", "Strategy Switching", 17),
  question(18, "AP03", "I tend to compare different pieces of evidence before deciding which explanation makes the most sense.", "analytical_processing", "direct", "Evidence Comparison", 18),
  question(19, "LE03", "Discovering an interesting question often makes me want to investigate it even when nobody expects me to.", "learning_exploration", "direct", "Self-Directed Curiosity", 19),
  question(20, "IP03", "Connections between different ideas sometimes become obvious to me without deliberate step-by-step analysis.", "intuitive_processing", "direct", "Pattern Integration", 20),
  question(21, "MF03", "I can usually stay with a mentally demanding task even when other interesting things compete for my attention.", "mental_focus", "direct", "Distraction Resistance", 21),
  question(22, "DD03", "I tend to compare the advantages and disadvantages of important options before committing to one.", "decision_deliberation", "direct", "Option Comparison", 22),
  question(23, "DP03", "I often find myself asking what lies underneath an explanation or idea.", "depth_processing", "direct", "Underlying Meaning", 23),
  question(24, "UT03", "I am comfortable keeping several possible explanations open while I gather more information.", "uncertainty_tolerance", "direct", "Open Possibilities", 24),
  question(25, "UT04", "I prefer reaching a clear conclusion quickly rather than leaving an important question unresolved.", "uncertainty_tolerance", "reverse", "Closure Preference", 25),
  question(26, "IP04", "I am uncomfortable relying on a conclusion unless I can trace the reasoning behind it clearly.", "intuitive_processing", "reverse", "Traceable Reasoning", 26),
  question(27, "DD04", "I often make important choices once I have a reasonable first option rather than searching extensively for alternatives.", "decision_deliberation", "reverse", "Early Commitment", 27),
  question(28, "CF04", "I find it difficult to abandon a way of thinking once I have invested significant effort in it.", "cognitive_flexibility", "reverse", "Mental Switching", 28),
  question(29, "LE04", "I generally prefer learning what is necessary for my current goal rather than exploring related topics.", "learning_exploration", "reverse", "Goal-Directed Learning", 29),
  question(30, "AP04", "I am usually satisfied with an explanation that works without examining whether every part of it is logically consistent.", "analytical_processing", "reverse", "Logical Consistency", 30),
  question(31, "MF04", "When several interesting ideas appear at once, I find it difficult to keep my attention on only one of them.", "mental_focus", "reverse", "Competing Ideas", 31),
  question(32, "DP04", "I prefer getting the main point quickly rather than spending a long time exploring its deeper implications.", "depth_processing", "reverse", "Processing Depth", 32),
  question(33, "LE05", "I enjoy following connections between topics even when they lead me beyond what I originally intended to learn.", "learning_exploration", "direct", "Cross-Domain Exploration", 33),
  question(34, "DP05", "Understanding the assumptions behind an idea is important to me when I am trying to understand it properly.", "depth_processing", "direct", "Assumption Analysis", 34),
  question(35, "UT05", "I can make a provisional decision even when I know some relevant information is still missing.", "uncertainty_tolerance", "direct", "Incomplete Information", 35),
  question(36, "MF05", "After a minor interruption, I can usually return to the same line of thought without losing much momentum.", "mental_focus", "direct", "Attention Recovery", 36),
  question(37, "CF05", "I enjoy examining an issue from perspectives that are very different from my own.", "cognitive_flexibility", "direct", "Perspective Shifting", 37),
  question(38, "IP05", "When I encounter new information, I often get an early sense of the larger pattern it belongs to.", "intuitive_processing", "direct", "Holistic Patterning", 38),
  question(39, "AP05", "When two ideas contradict each other, I naturally want to understand where the inconsistency comes from.", "analytical_processing", "direct", "Contradiction Detection", 39),
  question(40, "DD05", "When a decision could have significant consequences, I prefer giving myself time to think it through.", "decision_deliberation", "direct", "Reflection", 40),
  question(41, "MF06", "I often move between different tasks or ideas because staying mentally fixed on one thing for too long feels difficult.", "mental_focus", "reverse", "Cognitive Switching", 41),
  question(42, "DD06", "Continuing to think after I already have a workable answer usually feels unnecessary to me.", "decision_deliberation", "reverse", "Closure Speed", 42),
  question(43, "AP06", "I generally prefer understanding the overall conclusion rather than analyzing all the reasoning behind it.", "analytical_processing", "reverse", "Analytical Detail", 43),
  question(44, "LE06", "Once I have the answer I need, I usually move on rather than generating additional questions about the topic.", "learning_exploration", "reverse", "Inquiry Continuation", 44),
  question(45, "IP06", "I prefer building an understanding one clear step at a time rather than relying on an overall impression.", "intuitive_processing", "reverse", "Sequential Understanding", 45),
  question(46, "CF06", "When I strongly believe something, alternative interpretations usually feel more distracting than useful.", "cognitive_flexibility", "reverse", "Perspective Openness", 46),
  question(47, "DP06", "If information does not affect the practical conclusion, I usually see little value in examining it more deeply.", "depth_processing", "reverse", "Practical Sufficiency", 47),
  question(48, "UT06", "Situations without a clear answer tend to bother me until I can resolve them.", "uncertainty_tolerance", "reverse", "Resolution Need", 48),
].sort((a, b) => a.displayOrder - b.displayOrder);
