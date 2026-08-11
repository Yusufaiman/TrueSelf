import type {
  AxisDefinition,
  AxisKey,
  AxisPole,
  TrueSelf16Profile,
  TrueSelf16Question,
  TypeCode,
} from "./types";

export const AXES: Record<AxisKey, AxisDefinition> = {
  EI: {
    key: "EI",
    firstCode: "E",
    secondCode: "I",
    positiveCode: "E",
    negativeCode: "I",
    firstLabel: "Extraverted",
    secondLabel: "Introverted",
    summary: "Where your energy naturally gathers and recovers.",
  },
  SN: {
    key: "SN",
    firstCode: "S",
    secondCode: "N",
    positiveCode: "N",
    negativeCode: "S",
    firstLabel: "Sensing",
    secondLabel: "Intuitive",
    summary: "How you notice information and make sense of what is happening.",
  },
  TF: {
    key: "TF",
    firstCode: "T",
    secondCode: "F",
    positiveCode: "T",
    negativeCode: "F",
    firstLabel: "Thinking",
    secondLabel: "Feeling",
    summary: "What you trust most when judging a situation.",
  },
  JP: {
    key: "JP",
    firstCode: "J",
    secondCode: "P",
    positiveCode: "P",
    negativeCode: "J",
    firstLabel: "Judging",
    secondLabel: "Perceiving",
    summary: "How you prefer to organize action and commitment.",
  },
};

const q = (
  id: number,
  code: string,
  axis: AxisKey,
  keyedPole: AxisPole,
  facet: string,
  text: string,
  displayOrder: number,
): TrueSelf16Question => {
  const definition = AXES[axis];
  return {
    id,
    code,
    text,
    axis,
    keyedPole,
    positivePole: definition.positiveCode as AxisPole,
    negativePole: definition.negativeCode as AxisPole,
    facet,
    displayOrder,
    weight: 1,
    version: 1,
  };
};

const questionsBySection: TrueSelf16Question[] = [
  q(1, "EI01", "EI", "E", "social_initiation", "I usually feel comfortable starting conversations with people I don't know well.", 1),
  q(2, "EI02", "EI", "I", "social_recovery", "After spending a long time around people, I usually need time alone to feel mentally recharged.", 7),
  q(3, "EI03", "EI", "E", "external_processing", "Talking through an idea often helps me understand what I actually think about it.", 12),
  q(4, "EI04", "EI", "I", "internal_processing", "I prefer to fully form my thoughts before sharing them with other people.", 18),
  q(5, "EI05", "EI", "E", "stimulation", "An active environment with people and activity around me often increases my energy.", 21),
  q(6, "EI06", "EI", "I", "solitude", "I feel most mentally refreshed after having uninterrupted time to myself.", 27),
  q(7, "EI07", "EI", "E", "participation", "In group situations, I naturally become involved rather than waiting to be drawn into the conversation.", 33),
  q(8, "EI08", "EI", "I", "social_observation", "I tend to observe a social environment for a while before becoming actively involved.", 38),
  q(9, "EI09", "EI", "E", "expressiveness", "I usually express my reactions outwardly as I experience them.", 41),
  q(10, "EI10", "EI", "I", "internal_expression", "Even when I have strong reactions, I often keep them internally until I have processed them.", 45),
  q(11, "EI11", "EI", "E", "social_breadth", "I enjoy having a relatively wide circle of people I interact with regularly.", 46),
  q(12, "EI12", "EI", "I", "social_depth", "I prefer a smaller number of deeper interactions over maintaining many social connections.", 48),
  q(13, "SN01", "SN", "S", "concrete_learning", "When learning something new, I prefer starting with concrete examples before exploring the bigger idea.", 2),
  q(14, "SN02", "SN", "N", "pattern_recognition", "I naturally look for patterns and connections that are not immediately obvious.", 5),
  q(15, "SN03", "SN", "S", "evidence_orientation", "I trust information more when I can observe or verify it directly.", 16),
  q(16, "SN04", "SN", "N", "possibility_orientation", "I often become interested in what something could become, even when the idea is not yet practical.", 19),
  q(17, "SN05", "SN", "S", "detail_awareness", "I tend to notice specific details that other people sometimes overlook.", 22),
  q(18, "SN06", "SN", "N", "big_picture_thinking", "I am usually more interested in the overall meaning of something than in every individual detail.", 25),
  q(19, "SN07", "SN", "S", "proven_methods", "When solving a problem, I prefer methods that have already shown that they work.", 28),
  q(20, "SN08", "SN", "N", "experimentation", "I enjoy experimenting with completely new approaches even when a reliable method already exists.", 31),
  q(21, "SN09", "SN", "S", "practical_orientation", "Instructions are easier for me when they are specific and practical.", 34),
  q(22, "SN10", "SN", "N", "abstract_thinking", "Abstract theories and hypothetical possibilities can hold my attention even without an immediate practical use.", 39),
  q(23, "SN11", "SN", "S", "present_reality", "I usually focus first on what is actually happening rather than what might happen.", 43),
  q(24, "SN12", "SN", "N", "future_possibilities", "My mind frequently moves from what is happening now to different possibilities for what could happen next.", 47),
  q(25, "TF01", "TF", "T", "logical_evaluation", "When making an important decision, I first consider which option makes the most logical sense.", 4),
  q(26, "TF02", "TF", "F", "human_impact", "When making an important decision, I naturally consider how each option will affect the people involved.", 8),
  q(27, "TF03", "TF", "T", "truth_vs_harmony", "I would rather point out a flaw in an idea than support it simply to maintain harmony.", 9),
  q(28, "TF04", "TF", "F", "harmony", "When disagreement is unnecessary, preserving a good relationship matters more to me than proving my point.", 14),
  q(29, "TF05", "TF", "T", "impartiality", "I try to apply the same principles when judging similar situations, regardless of who is involved.", 17),
  q(30, "TF06", "TF", "F", "contextual_empathy", "I believe personal circumstances can justify treating similar situations differently.", 23),
  q(31, "TF07", "TF", "T", "critical_evaluation", "Constructive criticism is valuable to me even when it may initially make someone uncomfortable.", 26),
  q(32, "TF08", "TF", "F", "interpersonal_consideration", "Before giving criticism, I naturally think about how the other person is likely to experience it.", 29),
  q(33, "TF09", "TF", "T", "reason_orientation", "In difficult choices, I am usually more persuaded by strong reasoning than by personal sentiment.", 32),
  q(34, "TF10", "TF", "F", "values_orientation", "A decision can feel wrong to me even when it is logically defensible if it conflicts with something I deeply value.", 36),
  q(35, "TF11", "TF", "T", "analytical_judgment", "During disagreements, I naturally focus on identifying which argument is more internally consistent.", 42),
  q(36, "TF12", "TF", "F", "empathic_judgment", "During disagreements, understanding why each person feels the way they do is often as important to me as determining who is logically correct.", 44),
  q(37, "JP01", "JP", "J", "planning", "I feel more comfortable when important tasks are planned before I begin working on them.", 3),
  q(38, "JP02", "JP", "P", "emergent_planning", "I often prefer figuring out my approach as I go rather than deciding everything beforehand.", 6),
  q(39, "JP03", "JP", "J", "closure", "Having an important decision settled usually gives me a sense of relief.", 11),
  q(40, "JP04", "JP", "P", "optionality", "I prefer keeping important options open until I have enough reason to commit to one.", 13),
  q(41, "JP05", "JP", "J", "routine", "A predictable routine usually helps me stay productive.", 15),
  q(42, "JP06", "JP", "P", "flexibility", "Too much routine can make me feel restricted, even when the routine is efficient.", 20),
  q(43, "JP07", "JP", "J", "organization", "I naturally break larger responsibilities into steps, schedules, or clear milestones.", 24),
  q(44, "JP08", "JP", "P", "adaptability", "I often work best when I have freedom to change priorities depending on what happens.", 30),
  q(45, "JP09", "JP", "J", "completion", "I prefer completing one important responsibility before opening several new possibilities.", 35),
  q(46, "JP10", "JP", "P", "open_exploration", "I am comfortable having several unfinished possibilities active at the same time.", 37),
  q(47, "JP11", "JP", "J", "predictability", "Unexpected changes to an established plan usually disrupt my momentum.", 40),
  q(48, "JP12", "JP", "P", "spontaneous_adaptation", "When circumstances suddenly change, adapting the plan often feels more natural than trying to restore the original one.", 10),
];

export const TRUESELF_16_QUESTIONS: TrueSelf16Question[] = [
  ...questionsBySection,
].sort((a, b) => a.displayOrder - b.displayOrder);

const sharedNextSteps = [
  "Notice when your strongest preference helps you and when it narrows you.",
  "Practice the opposite side of your weakest axis in one low-stakes situation.",
  "Retake the assessment after a major life or work transition.",
];

export const TRUESELF_16_PROFILES: Record<TypeCode, TrueSelf16Profile> = {
  ISTJ: {
    code: "ISTJ",
    name: "Steady Organizer",
    tagline: "Reliable, grounded, and quietly exacting.",
    description:
      "You bring order to life through responsibility, consistency, and practical judgment.",
    strengths: ["Dependability", "Clear standards", "Follow-through"],
    blindSpots: ["Rigidity", "Over-reliance on precedent", "Slow adaptation"],
    growthPath: ["Build room for change before change is forced."],
    relationshipStyle:
      "You show care through loyalty, reliability, and doing what you promised.",
    workStyle:
      "You thrive when expectations, systems, and responsibilities are clear.",
    suggestedNextSteps: sharedNextSteps,
  },
  ISFJ: {
    code: "ISFJ",
    name: "Loyal Protector",
    tagline: "Attentive, steady, and deeply considerate.",
    description:
      "You notice what people need and create stability through practical care.",
    strengths: ["Supportiveness", "Memory for detail", "Commitment"],
    blindSpots: ["Self-neglect", "Avoiding conflict", "Silent resentment"],
    growthPath: ["Let your needs become visible before you are depleted."],
    relationshipStyle:
      "You build trust through care, consistency, and emotional attentiveness.",
    workStyle:
      "You do best in environments where service, quality, and trust matter.",
    suggestedNextSteps: sharedNextSteps,
  },
  INFJ: {
    code: "INFJ",
    name: "Insight Guide",
    tagline: "Private, perceptive, and purpose-driven.",
    description:
      "You read patterns beneath the surface and want your life to serve something meaningful.",
    strengths: ["Insight", "Empathy", "Long-range purpose"],
    blindSpots: ["Over-idealizing", "Emotional overload", "Withdrawing too long"],
    growthPath: ["Turn private insight into clear, grounded action."],
    relationshipStyle:
      "You seek depth, sincerity, and mutual growth rather than surface connection.",
    workStyle:
      "You thrive when vision, values, and focused independence meet.",
    suggestedNextSteps: sharedNextSteps,
  },
  INTJ: {
    code: "INTJ",
    name: "Strategic Architect",
    tagline: "Independent, analytical, and future-oriented.",
    description:
      "You see systems, map long-term outcomes, and prefer plans that make sense.",
    strengths: ["Strategy", "Pattern analysis", "Self-direction"],
    blindSpots: ["Impatience", "Emotional distance", "Over-control"],
    growthPath: ["Let useful feedback refine the system, not threaten it."],
    relationshipStyle:
      "You show respect through honesty, competence, and long-term consistency.",
    workStyle:
      "You excel when solving complex problems with autonomy and clear goals.",
    suggestedNextSteps: sharedNextSteps,
  },
  ISTP: {
    code: "ISTP",
    name: "Practical Problem Solver",
    tagline: "Calm, observant, and hands-on.",
    description:
      "You understand things by testing them directly and solving what is in front of you.",
    strengths: ["Troubleshooting", "Composure", "Practical independence"],
    blindSpots: ["Emotional avoidance", "Low patience for theory", "Detachment"],
    growthPath: ["Explain your process so others can trust what you see."],
    relationshipStyle:
      "You value freedom, honesty, and low-pressure connection.",
    workStyle:
      "You perform best where real problems need fast, practical solutions.",
    suggestedNextSteps: sharedNextSteps,
  },
  ISFP: {
    code: "ISFP",
    name: "Gentle Adventurer",
    tagline: "Sensitive, grounded, and quietly expressive.",
    description:
      "You live by inner values and notice beauty, tone, and authenticity in the moment.",
    strengths: ["Authenticity", "Taste", "Gentle presence"],
    blindSpots: ["Avoiding structure", "Taking things personally", "Under-speaking"],
    growthPath: ["Give your values a visible shape through action."],
    relationshipStyle:
      "You connect through warmth, acceptance, and respect for individuality.",
    workStyle:
      "You thrive where craft, meaning, and autonomy are protected.",
    suggestedNextSteps: sharedNextSteps,
  },
  INFP: {
    code: "INFP",
    name: "Idealistic Mediator",
    tagline: "Reflective, imaginative, and values-led.",
    description:
      "You are guided by meaning, personal truth, and a deep sense of what could be better.",
    strengths: ["Imagination", "Empathy", "Inner conviction"],
    blindSpots: ["Avoiding practical constraints", "Overthinking", "Inconsistency"],
    growthPath: ["Protect your ideals by making them practical enough to live."],
    relationshipStyle:
      "You seek emotional honesty, gentleness, and room to be fully yourself.",
    workStyle:
      "You do best when your work connects to values, creativity, or human meaning.",
    suggestedNextSteps: sharedNextSteps,
  },
  INTP: {
    code: "INTP",
    name: "Logical Explorer",
    tagline: "Curious, precise, and mentally independent.",
    description:
      "You investigate ideas deeply and enjoy understanding how concepts fit together.",
    strengths: ["Analysis", "Original thinking", "Intellectual honesty"],
    blindSpots: ["Delayed execution", "Emotional abstraction", "Low structure"],
    growthPath: ["Choose one useful idea and bring it into the real world."],
    relationshipStyle:
      "You connect through honesty, curiosity, and space for independent thought.",
    workStyle:
      "You thrive in complex problem spaces with room to question assumptions.",
    suggestedNextSteps: sharedNextSteps,
  },
  ESTP: {
    code: "ESTP",
    name: "Bold Operator",
    tagline: "Bold, practical, and action-first.",
    description:
      "You read the moment quickly, act with confidence, and learn through direct experience.",
    strengths: ["Adaptability", "Presence", "Courage"],
    blindSpots: ["Impulsiveness", "Short-term focus", "Under-planning"],
    growthPath: ["Slow down just enough to protect what matters long term."],
    relationshipStyle:
      "You bring energy, honesty, and a preference for direct interaction.",
    workStyle:
      "You excel in dynamic environments with quick feedback and visible stakes.",
    suggestedNextSteps: sharedNextSteps,
  },
  ESFP: {
    code: "ESFP",
    name: "Energetic Entertainer",
    tagline: "Warm, lively, and tuned into the moment.",
    description:
      "You bring people into the present and create energy through expression and responsiveness.",
    strengths: ["Social warmth", "Adaptability", "Emotional presence"],
    blindSpots: ["Avoiding hard planning", "Distraction", "People-pleasing"],
    growthPath: ["Give your spontaneity a few anchors so it can last."],
    relationshipStyle:
      "You connect through enthusiasm, affection, and shared experience.",
    workStyle:
      "You thrive where people, movement, and practical impact are part of the work.",
    suggestedNextSteps: sharedNextSteps,
  },
  ENFP: {
    code: "ENFP",
    name: "Enthusiastic Explorer",
    tagline: "Energetic, imaginative, and people-centered.",
    description:
      "You see potential everywhere and want life to feel alive, meaningful, and open.",
    strengths: ["Idea generation", "Encouragement", "Creative energy"],
    blindSpots: ["Scattered follow-through", "Overcommitting", "Restlessness"],
    growthPath: ["Choose which possibilities deserve your sustained devotion."],
    relationshipStyle:
      "You seek mutual inspiration, emotional openness, and freedom to grow.",
    workStyle:
      "You do best in creative, human-centered spaces with variety and autonomy.",
    suggestedNextSteps: sharedNextSteps,
  },
  ENTP: {
    code: "ENTP",
    name: "Inventive Challenger",
    tagline: "Inventive, quick, and debate-friendly.",
    description:
      "You test assumptions, generate alternatives, and enjoy turning ideas in new directions.",
    strengths: ["Innovation", "Verbal agility", "Strategic questioning"],
    blindSpots: ["Finishing", "Provoking too much", "Ignoring emotional impact"],
    growthPath: ["Build discipline around the ideas worth keeping."],
    relationshipStyle:
      "You connect through mental energy, honesty, play, and exploration.",
    workStyle:
      "You thrive where new thinking, strategy, and experimentation are rewarded.",
    suggestedNextSteps: sharedNextSteps,
  },
  ESTJ: {
    code: "ESTJ",
    name: "Practical Director",
    tagline: "Organized, direct, and execution-focused.",
    description:
      "You turn goals into plans, plans into action, and action into measurable results.",
    strengths: ["Leadership", "Accountability", "Operational clarity"],
    blindSpots: ["Over-directing", "Impatience", "Missing emotional nuance"],
    growthPath: ["Use your structure to support people, not just outcomes."],
    relationshipStyle:
      "You show commitment through reliability, protection, and practical support.",
    workStyle:
      "You excel in roles that need decisions, systems, and follow-through.",
    suggestedNextSteps: sharedNextSteps,
  },
  ESFJ: {
    code: "ESFJ",
    name: "Supportive Connector",
    tagline: "Warm, responsible, and socially attentive.",
    description:
      "You create belonging by noticing needs, organizing support, and keeping people connected.",
    strengths: ["Care coordination", "Loyalty", "Social awareness"],
    blindSpots: ["Approval-seeking", "Over-responsibility", "Avoiding disruption"],
    growthPath: ["Let care include honesty, boundaries, and your own needs."],
    relationshipStyle:
      "You build closeness through consistency, generosity, and shared rituals.",
    workStyle:
      "You thrive in cooperative environments where people and standards both matter.",
    suggestedNextSteps: sharedNextSteps,
  },
  ENFJ: {
    code: "ENFJ",
    name: "Inspiring Mentor",
    tagline: "Charismatic, empathic, and purpose-led.",
    description:
      "You understand people quickly and want to help them move toward their better selves.",
    strengths: ["Leadership through empathy", "Motivation", "Vision for people"],
    blindSpots: ["Over-involvement", "Neglecting self", "Carrying others"],
    growthPath: ["Guide people without becoming responsible for their choices."],
    relationshipStyle:
      "You seek depth, growth, reciprocity, and emotional honesty.",
    workStyle:
      "You do best when leading, teaching, or building alignment around a mission.",
    suggestedNextSteps: sharedNextSteps,
  },
  ENTJ: {
    code: "ENTJ",
    name: "Commanding Strategist",
    tagline: "Strategic, assertive, and outcome-driven.",
    description:
      "You organize people and systems around ambitious goals and long-range direction.",
    strengths: ["Executive clarity", "Strategic leadership", "High standards"],
    blindSpots: ["Intensity", "Dismissiveness", "Moving faster than trust"],
    growthPath: ["Make space for emotional buy-in, not just logical agreement."],
    relationshipStyle:
      "You value competence, loyalty, honesty, and shared ambition.",
    workStyle:
      "You thrive when setting direction, solving scale problems, and leading execution.",
    suggestedNextSteps: sharedNextSteps,
  },
};
