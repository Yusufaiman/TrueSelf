import type { GrowthDimensionKey, GrowthQuestion } from "./types";

export const GROWTH_DIMENSION_ORDER: GrowthDimensionKey[] = [
  "growth_mindset",
  "growth_self_awareness",
  "feedback_receptivity",
  "setback_recovery",
  "discomfort_tolerance",
  "adaptive_change",
  "self_discipline",
  "reflective_learning",
];

export const GROWTH_DIMENSIONS: Record<
  GrowthDimensionKey,
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
  growth_mindset: {
    label: "Growth Mindset",
    shortLabel: "Mindset",
    description:
      "Belief that abilities, skills, and personal patterns can develop with effort and better strategy.",
    lowLabel: "Trait-Stable",
    highLabel: "Development-Oriented",
    color: "#16a34a",
    soft: "#dcfce7",
  },
  growth_self_awareness: {
    label: "Growth Self-Awareness",
    shortLabel: "Self-Awareness",
    description:
      "Ability to recognize your own patterns, strengths, weaknesses, and contribution to outcomes.",
    lowLabel: "Less Self-Monitoring",
    highLabel: "Self-Observant",
    color: "#2563eb",
    soft: "#dbeafe",
  },
  feedback_receptivity: {
    label: "Feedback Receptivity",
    shortLabel: "Feedback",
    description:
      "Openness to constructive criticism, correction, and perspectives that challenge your self-view.",
    lowLabel: "Feedback-Protective",
    highLabel: "Feedback-Receptive",
    color: "#8b5cf6",
    soft: "#ede9fe",
  },
  setback_recovery: {
    label: "Setback Recovery",
    shortLabel: "Recovery",
    description:
      "Tendency to re-engage and move forward after failure, rejection, interruption, or setback.",
    lowLabel: "Longer Recovery Cycle",
    highLabel: "Recovery-Oriented",
    color: "#f97316",
    soft: "#ffedd5",
  },
  discomfort_tolerance: {
    label: "Discomfort Tolerance",
    shortLabel: "Discomfort",
    description:
      "Willingness to stay engaged with temporary discomfort, awkwardness, or beginner difficulty for growth.",
    lowLabel: "Comfort-Protective",
    highLabel: "Growth-Discomfort Tolerant",
    color: "#db2777",
    soft: "#fce7f3",
  },
  adaptive_change: {
    label: "Adaptive Change",
    shortLabel: "Adaptation",
    description:
      "Willingness to change behavior, habits, or strategy when evidence shows the old approach is not working.",
    lowLabel: "Consistency-Oriented",
    highLabel: "Adaptive",
    color: "#14b8a6",
    soft: "#ccfbf1",
  },
  self_discipline: {
    label: "Self-Discipline",
    shortLabel: "Discipline",
    description:
      "Ability to maintain important growth behavior when excitement, pressure, or motivation changes.",
    lowLabel: "Motivation-Dependent",
    highLabel: "Consistent Follow-Through",
    color: "#dc2626",
    soft: "#fee2e2",
  },
  reflective_learning: {
    label: "Reflective Learning",
    shortLabel: "Reflection",
    description:
      "Tendency to extract lessons from experience and use those lessons to improve future behavior.",
    lowLabel: "Experience-Forward",
    highLabel: "Reflective Learner",
    color: "#0891b2",
    soft: "#cffafe",
  },
};

const question = (
  id: number,
  code: string,
  text: string,
  dimension: GrowthDimensionKey,
  scoring: "direct" | "reverse",
  facet: string,
  displayOrder: number,
): GrowthQuestion => ({
  id,
  code,
  text,
  dimension,
  scoring,
  facet,
  displayOrder,
});

export const GROWTH_QUESTIONS: GrowthQuestion[] = [
  question(1, "GRO-GM01", "When I am not good at something yet, I usually believe I can improve with the right effort and approach.", "growth_mindset", "direct", "Improvement Belief", 1),
  question(7, "GRO-SA01", "I can usually identify the personal habits or patterns that are holding me back.", "growth_self_awareness", "direct", "Pattern Awareness", 2),
  question(13, "GRO-FR01", "Even when feedback is uncomfortable, I try to consider whether there is something useful in it.", "feedback_receptivity", "direct", "Feedback Evaluation", 3),
  question(19, "GRO-SR01", "After a setback, I can usually find a way to start moving forward again.", "setback_recovery", "direct", "Re-Engagement", 4),
  question(25, "GRO-DT01", "I am willing to be temporarily uncomfortable if I believe the experience will help me grow.", "discomfort_tolerance", "direct", "Growth Discomfort", 5),
  question(31, "GRO-AC01", "When an approach repeatedly fails, I am willing to change how I do things.", "adaptive_change", "direct", "Strategy Adaptation", 6),
  question(37, "GRO-SD01", "I can continue doing something important even when I do not feel motivated to do it.", "self_discipline", "direct", "Motivation Independence", 7),
  question(43, "GRO-RL01", "After an important experience, I often think about what it taught me and what I should do differently next time.", "reflective_learning", "direct", "Experience Reflection", 8),
  question(32, "GRO-AC02", "Even when a familiar approach is not working well, I tend to keep using it because it feels natural to me.", "adaptive_change", "reverse", "Familiarity Attachment", 9),
  question(2, "GRO-GM02", "There are many abilities that I believe people either naturally have or simply do not.", "growth_mindset", "reverse", "Ability Fixedness", 10),
  question(38, "GRO-SD02", "When my motivation disappears, my consistency usually disappears with it.", "self_discipline", "reverse", "Motivation Dependence", 11),
  question(14, "GRO-FR02", "When someone criticizes something I have done, my first reaction is often to defend myself.", "feedback_receptivity", "reverse", "Defensive Response", 12),
  question(44, "GRO-RL02", "Once an experience is over, I usually move on without spending much time examining what I could learn from it.", "reflective_learning", "reverse", "Reflection Frequency", 13),
  question(26, "GRO-DT02", "If improving at something repeatedly makes me feel inadequate, I tend to pull away from it.", "discomfort_tolerance", "reverse", "Inadequacy Discomfort", 14),
  question(8, "GRO-SA02", "I sometimes repeat the same problems without clearly understanding my role in them.", "growth_self_awareness", "reverse", "Personal Contribution", 15),
  question(20, "GRO-SR02", "When an important effort fails, it can take me a long time before I feel ready to try again.", "setback_recovery", "reverse", "Recovery Time", 16),
  question(21, "GRO-SR03", "A disappointing outcome may affect me, but I can usually return to working toward what matters.", "setback_recovery", "direct", "Forward Recovery", 17),
  question(27, "GRO-DT03", "I can tolerate being a beginner at something even when I am noticeably worse than the people around me.", "discomfort_tolerance", "direct", "Beginner Tolerance", 18),
  question(9, "GRO-SA03", "When something repeatedly goes wrong for me, I tend to examine what I might be contributing to the pattern.", "growth_self_awareness", "direct", "Self-Examination", 19),
  question(45, "GRO-RL03", "When I make a mistake, I try to understand what led to it rather than only correcting the immediate problem.", "reflective_learning", "direct", "Mistake Analysis", 20),
  question(3, "GRO-GM03", "Struggling with something at first does not usually make me think I am incapable of becoming good at it.", "growth_mindset", "direct", "Early Struggle", 21),
  question(39, "GRO-SD03", "If I commit to an important routine, I can usually continue it even after the initial excitement fades.", "self_discipline", "direct", "Routine Persistence", 22),
  question(33, "GRO-AC03", "When I discover a better way of doing something, I am usually willing to replace my old method.", "adaptive_change", "direct", "Method Updating", 23),
  question(15, "GRO-FR03", "I can take useful advice from someone even when I disagree with parts of what they say.", "feedback_receptivity", "direct", "Selective Learning", 24),
  question(16, "GRO-FR04", "Feedback can be difficult for me to accept when I believe the other person does not fully understand my situation.", "feedback_receptivity", "reverse", "Feedback Resistance", 25),
  question(46, "GRO-RL04", "If a problem has already been resolved, I rarely feel the need to revisit why it happened.", "reflective_learning", "reverse", "Post-Problem Reflection", 26),
  question(34, "GRO-AC04", "Changing an established habit can feel harder to me than continuing with it, even when I know another approach may work better.", "adaptive_change", "reverse", "Habit Inertia", 27),
  question(10, "GRO-SA04", "It is often easier for me to notice what other people need to improve than what I need to improve myself.", "growth_self_awareness", "reverse", "Blind Spots", 28),
  question(22, "GRO-SR04", "One major failure can make me question whether continuing the effort is worth it.", "setback_recovery", "reverse", "Failure Persistence", 29),
  question(4, "GRO-GM04", "If I repeatedly struggle with something, I tend to assume it may simply not be one of my strengths.", "growth_mindset", "reverse", "Limitation Interpretation", 30),
  question(28, "GRO-DT04", "I tend to avoid development opportunities when I know they will make me feel exposed or uncomfortable.", "discomfort_tolerance", "reverse", "Vulnerability Avoidance", 31),
  question(40, "GRO-SD04", "I often start improvement efforts strongly but struggle to maintain them over time.", "self_discipline", "reverse", "Long-Term Consistency", 32),
  question(41, "GRO-SD05", "I can make myself complete important actions even when something easier or more enjoyable is available.", "self_discipline", "direct", "Delayed Gratification", 33),
  question(17, "GRO-FR05", "When several people point out the same weakness in me, I usually consider whether they may be seeing something I have missed.", "feedback_receptivity", "direct", "External Perspective", 34),
  question(5, "GRO-GM05", "I believe that many of my current limitations can change through learning, practice, or a better strategy.", "growth_mindset", "direct", "Development Potential", 35),
  question(35, "GRO-AC05", "I am willing to experiment with different approaches when my current behavior is not producing the outcome I want.", "adaptive_change", "direct", "Behavioral Experimentation", 36),
  question(11, "GRO-SA05", "I generally have a realistic sense of both the areas where I am strong and the areas where I still need development.", "growth_self_awareness", "direct", "Strength-Weakness Awareness", 37),
  question(23, "GRO-SR05", "After something goes badly, I usually begin thinking about what I can do next rather than staying focused only on what went wrong.", "setback_recovery", "direct", "Forward Orientation", 38),
  question(47, "GRO-RL05", "I often use lessons from previous experiences when deciding how to handle similar situations later.", "reflective_learning", "direct", "Lesson Application", 39),
  question(29, "GRO-DT05", "I am willing to practice something I am bad at if becoming better at it matters to me.", "discomfort_tolerance", "direct", "Difficult Practice", 40),
  question(48, "GRO-RL06", "I tend to focus more on what happens next than on analyzing what past experiences were trying to teach me.", "reflective_learning", "reverse", "Experience Review", 41),
  question(24, "GRO-SR06", "When I lose momentum because of a setback, rebuilding that momentum is often difficult for me.", "setback_recovery", "reverse", "Momentum Recovery", 42),
  question(30, "GRO-DT06", "When growth requires repeatedly doing something that feels awkward or difficult, I often lose interest in continuing.", "discomfort_tolerance", "reverse", "Discomfort Persistence", 43),
  question(42, "GRO-SD06", "I find it difficult to keep working toward a long-term goal when there is no immediate reward or pressure.", "self_discipline", "reverse", "Delayed Reward Persistence", 44),
  question(18, "GRO-FR06", "When feedback challenges how I see myself, I tend to question the feedback before questioning my own view.", "feedback_receptivity", "reverse", "Self-View Protection", 45),
  question(36, "GRO-AC06", "I sometimes continue doing things the same way even after realizing that the approach is part of the problem.", "adaptive_change", "reverse", "Behavioral Persistence", 46),
  question(6, "GRO-GM06", "Some personal weaknesses seem so deeply rooted that trying to change them would probably make little difference.", "growth_mindset", "reverse", "Personal Changeability", 47),
  question(12, "GRO-SA06", "I am sometimes surprised when someone points out a recurring pattern in my behavior that I had not noticed.", "growth_self_awareness", "reverse", "Pattern Recognition", 48),
].sort((a, b) => a.displayOrder - b.displayOrder);
