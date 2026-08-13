import type {
  AxisDefinition,
  AxisKey,
  AxisPole,
  EnneagramComponent,
  EnneagramCoreType,
  ExpressionAxisKey,
  ExpressionPole,
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
    layer: "core",
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

const eq = (
  id: number,
  code: string,
  expressionAxis: ExpressionAxisKey,
  expressionKeyedPole: ExpressionPole,
  facet: string,
  text: string,
  displayOrder: number,
): TrueSelf16Question => ({
  id,
  code,
  text,
  layer: "expression",
  expressionAxis,
  expressionKeyedPole,
  facet,
  displayOrder,
  weight: 1,
  version: 1,
});

const nq = (
  id: number,
  code: string,
  enneagramType: EnneagramCoreType,
  enneagramComponent: EnneagramComponent,
  facet: string,
  text: string,
  displayOrder: number,
): TrueSelf16Question => ({
  id,
  code,
  text,
  layer: "enneagram",
  enneagramType,
  enneagramComponent,
  facet,
  displayOrder,
  weight: 1,
  version: 1,
});

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

const expressionQuestions: TrueSelf16Question[] = [
  eq(49, "AO01", "AO", "A", "visible_initiative", "When I see a clear opening, I usually move before waiting for full permission.", 49),
  eq(50, "AO02", "AO", "O", "situational_observation", "In unfamiliar situations, I prefer to observe the room before making my move.", 50),
  eq(51, "AO03", "AO", "A", "directional_confidence", "I am comfortable taking visible space when I believe something needs direction.", 51),
  eq(52, "AO04", "AO", "O", "consequence_scanning", "Before acting, I often scan for context, timing, and possible consequences.", 52),
  eq(53, "AO05", "AO", "A", "fast_recovery", "I usually recover from uncertainty by choosing a direction and testing it.", 53),
  eq(54, "AO06", "AO", "O", "internal_evaluation", "I often need time to evaluate internally before I show a strong response.", 54),
  eq(55, "AO07", "AO", "A", "group_momentum", "When a group hesitates, I naturally become more proactive.", 55),
  eq(56, "AO08", "AO", "O", "receptive_timing", "I tend to be receptive first and decisive after I understand the situation.", 56),
  eq(57, "AO09", "AO", "A", "influence_trust", "I trust myself to influence a situation while it is still forming.", 57),
  eq(58, "AO10", "AO", "O", "terrain_reading", "I prefer to understand the emotional or practical terrain before stepping forward.", 58),
  eq(59, "CH01", "CH", "C", "position_holding", "When I strongly disagree, I usually maintain my position even if it creates tension.", 59),
  eq(60, "CH02", "CH", "H", "trust_preservation", "When disagreement could damage connection, I naturally adjust my delivery to preserve trust.", 60),
  eq(61, "CH03", "CH", "C", "internal_standards", "I prefer making decisions from internal standards rather than waiting for group consensus.", 61),
  eq(62, "CH04", "CH", "H", "social_calibration", "I often calibrate my response based on how people around me are likely to receive it.", 62),
  eq(63, "CH05", "CH", "C", "boundary_protection", "Protecting my boundaries matters even when others want me to soften my position.", 63),
  eq(64, "CH06", "CH", "H", "relational_alignment", "Relational alignment matters enough that I may slow down or adapt my original position.", 64),
  eq(65, "CH07", "CH", "C", "direct_clarity", "I am comfortable being direct when clarity is more useful than comfort.", 65),
  eq(66, "CH08", "CH", "H", "engagement_preservation", "I often look for a response that keeps people engaged rather than simply proving my point.", 66),
  eq(67, "CH09", "CH", "C", "pressure_resistance", "Once I know where I stand, social pressure rarely changes my core position.", 67),
  eq(68, "CH10", "CH", "H", "room_tone", "I naturally notice the tone of the room and adjust so people can stay connected.", 68),
];

const enneagramQuestions: TrueSelf16Question[] = [
  nq(69, "EN01", 1, "desire", "improvement", "I feel pulled to improve things until they meet a clear inner standard.", 69),
  nq(70, "EN02", 1, "fear", "carelessness", "I worry about being careless, irresponsible, or out of alignment with what is right.", 70),
  nq(71, "EN03", 1, "coping", "correction", "When stressed, I become more focused on what should be corrected or fixed.", 71),
  nq(72, "EN04", 1, "behavior", "standard_detection", "I notice mistakes quickly and feel responsible for raising the standard.", 72),
  nq(73, "EN05", 1, "desire", "properness", "Doing things properly can feel more important than doing them comfortably.", 73),
  nq(74, "EN06", 2, "desire", "helpfulness", "I feel most valuable when I know my presence or effort genuinely helps someone.", 74),
  nq(75, "EN07", 2, "fear", "unneeded", "I can feel unsettled when I seem unnecessary or emotionally unimportant to people I care about.", 75),
  nq(76, "EN08", 2, "coping", "overgiving", "Under pressure, I may give more support than I actually have energy for.", 76),
  nq(77, "EN09", 2, "behavior", "needs_tracking", "I naturally track what people need, even when they have not said it directly.", 77),
  nq(78, "EN10", 2, "desire", "connection_value", "Being wanted, appreciated, or needed can strongly affect my sense of connection.", 78),
  nq(79, "EN11", 3, "desire", "achievement", "I feel driven to turn effort into visible progress, success, or results.", 79),
  nq(80, "EN12", 3, "fear", "failure", "I dislike feeling unsuccessful, overlooked, or unable to prove my value through contribution.", 80),
  nq(81, "EN13", 3, "coping", "performance", "When pressured, I often push harder to perform rather than slow down and feel everything.", 81),
  nq(82, "EN14", 3, "behavior", "image_adjustment", "I can quickly adjust how I present myself based on what a situation rewards.", 82),
  nq(83, "EN15", 3, "desire", "recognition", "Recognition matters to me most when it reflects real competence or meaningful achievement.", 83),
  nq(84, "EN16", 4, "desire", "authentic_identity", "I need my life and choices to feel personally meaningful, not just functional.", 84),
  nq(85, "EN17", 4, "fear", "ordinary_unseen", "I can fear being emotionally unseen, ordinary, or disconnected from what makes me distinct.", 85),
  nq(86, "EN18", 4, "coping", "emotional_intensity", "When stressed, I may intensify, withdraw into feeling, or compare my life with an imagined ideal.", 86),
  nq(87, "EN19", 4, "behavior", "inner_difference", "I often notice what feels missing, different, or emotionally unresolved beneath the surface.", 87),
  nq(88, "EN20", 4, "desire", "self_expression", "Authentic self-expression can feel necessary for me to feel fully alive.", 88),
  nq(89, "EN21", 5, "desire", "understanding", "I feel safer when I understand something deeply before I have to act on it.", 89),
  nq(90, "EN22", 5, "fear", "overwhelm", "I dislike being overwhelmed by demands before I have enough knowledge or capacity.", 90),
  nq(91, "EN23", 5, "coping", "withdrawal", "When pressured, I may withdraw to think, research, or conserve my energy.", 91),
  nq(92, "EN24", 5, "behavior", "privacy", "I protect my private time and mental space because it helps me stay capable.", 92),
  nq(93, "EN25", 5, "desire", "competence", "Competence and self-sufficiency feel more reassuring than constant external support.", 93),
  nq(94, "EN26", 6, "desire", "security", "I often scan for what could go wrong so I can be prepared before it happens.", 94),
  nq(95, "EN27", 6, "fear", "unsupported", "I fear being unsupported, unsafe, or unprepared when something important goes wrong.", 95),
  nq(96, "EN28", 6, "coping", "reassurance", "Under pressure, I may seek reassurance, double-check decisions, or imagine backup plans.", 96),
  nq(97, "EN29", 6, "behavior", "trust_testing", "Trust matters deeply to me, but I may test it before fully relying on it.", 97),
  nq(98, "EN30", 6, "desire", "dependability", "Dependable people, plans, and systems help me relax and commit.", 98),
  nq(99, "EN31", 7, "desire", "freedom", "I feel most alive when I have freedom, options, and something interesting ahead.", 99),
  nq(100, "EN32", 7, "fear", "limitation", "I dislike feeling trapped, limited, or stuck in emotional heaviness for too long.", 100),
  nq(101, "EN33", 7, "coping", "reframing", "When stressed, I often look for a new possibility, plan, or positive angle.", 101),
  nq(102, "EN34", 7, "behavior", "option_generation", "My mind quickly generates alternatives when one path starts feeling too narrow.", 102),
  nq(103, "EN35", 7, "desire", "stimulation", "Novelty, movement, and future possibilities can restore my energy quickly.", 103),
  nq(104, "EN36", 8, "desire", "autonomy", "I feel strongly motivated to stay autonomous and protect what matters to me.", 104),
  nq(105, "EN37", 8, "fear", "controlled", "I dislike being controlled, weakened, or forced into dependence.", 105),
  nq(106, "EN38", 8, "coping", "force", "When pressured, I may become more direct, forceful, or protective.", 106),
  nq(107, "EN39", 8, "behavior", "boundary_testing", "I notice power dynamics quickly and prefer to know where the real boundaries are.", 107),
  nq(108, "EN40", 8, "desire", "strength", "Strength, honesty, and direct action feel more trustworthy than vague reassurance.", 108),
  nq(109, "EN41", 9, "desire", "peace", "I feel best when my inner state and environment are calm, steady, and low-pressure.", 109),
  nq(110, "EN42", 9, "fear", "disruption", "I dislike being pulled into conflict, pressure, or emotional disruption before I am ready.", 110),
  nq(111, "EN43", 9, "coping", "numbing", "When stressed, I may delay, disengage, or numb out instead of confronting something directly.", 111),
  nq(112, "EN44", 9, "behavior", "perspective_holding", "I can usually see multiple sides of a situation and prefer not to escalate tension unnecessarily.", 112),
  nq(113, "EN45", 9, "desire", "stability", "Comfort, stability, and peace can matter more to me than winning a disagreement.", 113),
];

export const TRUESELF_16_QUESTIONS: TrueSelf16Question[] = [
  ...questionsBySection,
  ...expressionQuestions,
  ...enneagramQuestions,
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
