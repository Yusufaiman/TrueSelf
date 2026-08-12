import type { StressEmotionDimensionKey, StressEmotionQuestion } from "./types";

export const STRESS_EMOTION_DIMENSION_ORDER: StressEmotionDimensionKey[] = [
  "emotional_awareness",
  "emotional_clarity",
  "emotional_regulation",
  "stress_reactivity",
  "stress_recovery",
  "emotional_expression",
  "emotional_acceptance",
  "coping_flexibility",
];

export const STRESS_EMOTION_DIMENSIONS: Record<
  StressEmotionDimensionKey,
  {
    label: string;
    shortLabel: string;
    description: string;
    lowLabel: string;
    highLabel: string;
    color: string;
    soft: string;
    isLoadDimension?: boolean;
  }
> = {
  emotional_awareness: {
    label: "Emotional Awareness",
    shortLabel: "Awareness",
    description: "Ability to notice emotional changes and internal emotional signals.",
    lowLabel: "Less Attuned",
    highLabel: "Emotionally Aware",
    color: "#2563eb",
    soft: "#dbeafe",
  },
  emotional_clarity: {
    label: "Emotional Clarity",
    shortLabel: "Clarity",
    description: "Ability to identify, differentiate, and understand emotional experience.",
    lowLabel: "Emotionally Mixed",
    highLabel: "Emotionally Clear",
    color: "#0891b2",
    soft: "#cffafe",
  },
  emotional_regulation: {
    label: "Emotional Regulation",
    shortLabel: "Regulation",
    description: "Ability to retain choice over behavior when emotions become strong.",
    lowLabel: "Reactive Response",
    highLabel: "Regulated Response",
    color: "#16a34a",
    soft: "#dcfce7",
  },
  stress_reactivity: {
    label: "Stress Reactivity",
    shortLabel: "Reactivity",
    description: "How strongly pressure, competing demands, and disruption activate you internally.",
    lowLabel: "Lower Reactivity",
    highLabel: "Higher Reactivity",
    color: "#dc2626",
    soft: "#fee2e2",
    isLoadDimension: true,
  },
  stress_recovery: {
    label: "Stress Recovery",
    shortLabel: "Recovery",
    description: "How readily your system returns toward baseline after stressful experiences.",
    lowLabel: "Longer Recovery",
    highLabel: "Effective Recovery",
    color: "#14b8a6",
    soft: "#ccfbf1",
  },
  emotional_expression: {
    label: "Emotional Expression",
    shortLabel: "Expression",
    description: "Comfort communicating emotionally relevant information to other people.",
    lowLabel: "Emotionally Private",
    highLabel: "Emotionally Expressive",
    color: "#db2777",
    soft: "#fce7f3",
  },
  emotional_acceptance: {
    label: "Emotional Acceptance",
    shortLabel: "Acceptance",
    description:
      "Ability to allow uncomfortable emotions to exist without immediately suppressing, escaping, or judging them.",
    lowLabel: "Control-Oriented",
    highLabel: "Emotionally Accepting",
    color: "#8b5cf6",
    soft: "#ede9fe",
  },
  coping_flexibility: {
    label: "Coping Flexibility",
    shortLabel: "Coping",
    description: "Ability to adapt coping responses according to what the situation requires.",
    lowLabel: "Habitual Coping",
    highLabel: "Flexible Coping",
    color: "#f97316",
    soft: "#ffedd5",
  },
};

const question = (
  id: number,
  code: string,
  text: string,
  dimension: StressEmotionDimensionKey,
  scoring: "direct" | "reverse",
  facet: string,
  displayOrder: number,
): StressEmotionQuestion => ({
  id,
  code,
  text,
  dimension,
  scoring,
  facet,
  displayOrder,
});

export const STRESS_EMOTION_QUESTIONS: StressEmotionQuestion[] = [
  question(1, "SEM-EA01", "I usually notice when my emotional state begins to change.", "emotional_awareness", "direct", "Emotional Detection", 1),
  question(2, "SEM-EC01", "When I feel strongly about something, I can usually identify what emotion I am experiencing.", "emotional_clarity", "direct", "Emotion Identification", 2),
  question(3, "SEM-ER01", "Even when I feel strongly about something, I can usually choose how I respond.", "emotional_regulation", "direct", "Response Control", 3),
  question(4, "SEM-STR01", "When several demands build up at once, I can become mentally or emotionally overwhelmed.", "stress_reactivity", "direct", "Overload", 4),
  question(5, "SEM-SRC01", "After a stressful situation ends, I can usually settle back into my normal state reasonably quickly.", "stress_recovery", "direct", "Return to Baseline", 5),
  question(6, "SEM-EE01", "When an emotion matters to a relationship, I can usually communicate what I am feeling.", "emotional_expression", "direct", "Emotional Communication", 6),
  question(7, "SEM-EAC01", "I can allow myself to experience an uncomfortable emotion without immediately trying to get rid of it.", "emotional_acceptance", "direct", "Emotional Willingness", 7),
  question(8, "SEM-CF01", "If one way of handling stress is not helping, I can usually try a different approach.", "coping_flexibility", "direct", "Strategy Switching", 8),
  question(9, "SEM-ER02", "When my emotions become intense, they can strongly influence what I say or do before I have time to think.", "emotional_regulation", "reverse", "Emotional Reactivity", 9),
  question(10, "SEM-SRC02", "Even after a stressful situation is over, it can stay with me mentally or emotionally for a long time.", "stress_recovery", "reverse", "Residual Stress", 10),
  question(11, "SEM-EA02", "Sometimes I only realize that something affected me emotionally after my behavior has already changed.", "emotional_awareness", "reverse", "Delayed Awareness", 11),
  question(12, "SEM-CF02", "When I am stressed, I tend to rely on the same coping response even when it is not helping much.", "coping_flexibility", "reverse", "Coping Rigidity", 12),
  question(13, "SEM-EC02", "I sometimes know that I feel bad without being able to tell whether I am angry, disappointed, worried, or something else.", "emotional_clarity", "reverse", "Emotional Differentiation", 13),
  question(14, "SEM-STR02", "Even when several things go wrong at once, my internal state usually remains relatively steady.", "stress_reactivity", "reverse", "Stress Stability", 14),
  question(15, "SEM-EAC02", "When I feel an emotion I dislike, I often wish I could shut it off immediately.", "emotional_acceptance", "reverse", "Emotional Suppression", 15),
  question(16, "SEM-EE02", "Even with people I trust, I often keep difficult emotions to myself.", "emotional_expression", "reverse", "Emotional Privacy", 16),
  question(17, "SEM-EAC03", "I can accept that difficult emotions are sometimes a normal part of an important experience.", "emotional_acceptance", "direct", "Emotion Normalization", 17),
  question(18, "SEM-EA03", "I can usually tell when an emotion is starting to become stronger inside me.", "emotional_awareness", "direct", "Intensity Awareness", 18),
  question(19, "SEM-STR03", "Pressure can noticeably affect how clearly I think or how calmly I respond.", "stress_reactivity", "direct", "Cognitive Disruption", 19),
  question(20, "SEM-EE03", "I can usually put important feelings into words when another person needs to understand what is happening with me.", "emotional_expression", "direct", "Verbal Expression", 20),
  question(21, "SEM-CF03", "I can usually recognize when a stressful situation needs action and when it is better to step back and recover first.", "coping_flexibility", "direct", "Context Sensitivity", 21),
  question(22, "SEM-EC03", "I can usually understand what triggered an important emotional reaction in me.", "emotional_clarity", "direct", "Trigger Understanding", 22),
  question(23, "SEM-SRC03", "Once the source of pressure is gone, I can usually shift my attention away from it without too much difficulty.", "stress_recovery", "direct", "Mental Reset", 23),
  question(24, "SEM-ER03", "When I become emotionally activated, I can usually create some space before deciding what to do next.", "emotional_regulation", "direct", "Emotional Pause", 24),
  question(25, "SEM-SRC04", "I often keep replaying stressful situations in my mind after there is nothing more I need to do about them.", "stress_recovery", "reverse", "Stress Carryover", 25),
  question(26, "SEM-EAC04", "I sometimes become frustrated with myself simply for feeling an emotion that I think I should not be feeling.", "emotional_acceptance", "reverse", "Emotional Self-Judgment", 26),
  question(27, "SEM-CF04", "Once I start dealing with stress in a certain way, changing my approach can be difficult even if the situation changes.", "coping_flexibility", "reverse", "Strategy Persistence", 27),
  question(28, "SEM-ER04", "In emotionally intense moments, I sometimes react in ways that I later wish I had handled differently.", "emotional_regulation", "reverse", "Immediate Reaction", 28),
  question(29, "SEM-EE04", "I often find it easier to hide an uncomfortable feeling than to explain it to someone.", "emotional_expression", "reverse", "Emotional Withholding", 29),
  question(30, "SEM-EA04", "I can go through part of my day without noticing how much my emotions are affecting me.", "emotional_awareness", "reverse", "Ongoing Awareness", 30),
  question(31, "SEM-STR04", "I can usually handle a demanding situation without feeling strongly activated inside.", "stress_reactivity", "reverse", "Pressure Stability", 31),
  question(32, "SEM-EC04", "My emotions can sometimes feel mixed together in a way that makes it difficult to understand what I am actually feeling.", "emotional_clarity", "reverse", "Mixed Emotions", 32),
  question(33, "SEM-EC05", "Even when I have several feelings at once, I can often separate them enough to understand what is going on.", "emotional_clarity", "direct", "Emotional Complexity", 33),
  question(34, "SEM-CF05", "Different stressful situations often require different ways of coping, and I can adjust accordingly.", "coping_flexibility", "direct", "Adaptive Coping", 34),
  question(35, "SEM-ER05", "I can usually keep a strong emotion from completely taking over how I handle a situation.", "emotional_regulation", "direct", "Behavioral Regulation", 35),
  question(36, "SEM-SRC05", "After a demanding period, I am usually able to regain my normal mental and emotional rhythm.", "stress_recovery", "direct", "Recovery", 36),
  question(37, "SEM-EA05", "I tend to notice physical or mental signals that tell me I am becoming emotionally affected.", "emotional_awareness", "direct", "Internal Signals", 37),
  question(38, "SEM-EAC05", "I can acknowledge an uncomfortable feeling without assuming that having the feeling itself is a problem.", "emotional_acceptance", "direct", "Non-Judgment", 38),
  question(39, "SEM-EE05", "When something has affected me emotionally, I can usually communicate it without expecting the other person to guess.", "emotional_expression", "direct", "Explicit Expression", 39),
  question(40, "SEM-STR05", "When responsibilities pile up faster than I can deal with them, I feel the pressure strongly.", "stress_reactivity", "direct", "Demand Sensitivity", 40),
  question(41, "SEM-EE06", "I sometimes say that I am fine because explaining what I actually feel seems harder.", "emotional_expression", "reverse", "Concealment", 41),
  question(42, "SEM-STR06", "Unexpected problems rarely create much internal tension for me.", "stress_reactivity", "reverse", "Disruption Stability", 42),
  question(43, "SEM-SRC06", "Stress can continue affecting my mood or concentration long after the immediate situation has passed.", "stress_recovery", "reverse", "Extended Impact", 43),
  question(44, "SEM-EC06", "I sometimes remain unsure about why something affected me emotionally even after I have had time to think about it.", "emotional_clarity", "reverse", "Cause Clarity", 44),
  question(45, "SEM-CF06", "I tend to handle most stressful situations in a similar way regardless of what caused them.", "coping_flexibility", "reverse", "Strategy Generalization", 45),
  question(46, "SEM-ER06", "When I am very upset, it becomes difficult for me to respond as thoughtfully as I normally would.", "emotional_regulation", "reverse", "Regulation Under Intensity", 46),
  question(47, "SEM-EA06", "People sometimes notice that I am emotionally affected before I recognize it myself.", "emotional_awareness", "reverse", "External Detection", 47),
  question(48, "SEM-EAC06", "When a difficult feeling appears, my first instinct is often to distract myself from it or push it away.", "emotional_acceptance", "reverse", "Emotional Avoidance", 48),
].sort((a, b) => a.displayOrder - b.displayOrder);
