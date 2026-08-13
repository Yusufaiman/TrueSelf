import type { ExpressionSuffix, TypeCode } from "./types";

export type TrueSelf64Expression = {
  suffix: ExpressionSuffix;
  code: `${TypeCode}-${ExpressionSuffix}`;
  archetype: string;
  description: string;
  tendency: string;
  chips: string[];
};

export type ExpressionSuffixDefinition = {
  label: string;
  axisLabel: string;
  summary: string;
  traits: string[];
};

export const EXPRESSION_SUFFIXES: Record<ExpressionSuffix, ExpressionSuffixDefinition> = {
  AC: {
    label: "Assertive + Independent",
    axisLabel: "Assured / Controlled",
    summary:
      "This expression tends to show confidence, directness, independence, and stronger control over direction.",
    traits: ["Confident", "Independent", "Decisive", "Direct", "Self-directed"],
  },
  AH: {
    label: "Assertive + Harmonizing",
    axisLabel: "Assured / Harmonizing",
    summary:
      "This expression tends to show confidence with stronger cooperation, social awareness, and adaptive influence.",
    traits: ["Confident", "People-aware", "Expressive", "Collaborative", "Adaptive"],
  },
  OC: {
    label: "Observant + Independent",
    axisLabel: "Observant / Controlled",
    summary:
      "This expression tends to show caution, analysis, internal reactivity, precision, and independent evaluation.",
    traits: ["Analytical", "Cautious", "Private", "Precise", "Self-questioning"],
  },
  OH: {
    label: "Observant + Harmonizing",
    axisLabel: "Observant / Harmonizing",
    summary:
      "This expression tends to show sensitivity, reflection, responsiveness, and stronger awareness of relational context.",
    traits: ["Reflective", "Sensitive", "Responsive", "Context-aware", "Relationally tuned"],
  },
};

export const EXPRESSION_CONDITION_COPY: Record<
  ExpressionSuffix,
  Array<{ title: string; text: string }>
> = {
  AC: [
    { title: "When secure", text: "Decisive -> focused -> self-directed -> ready to act." },
    { title: "When challenged", text: "More forceful, faster to take control, and less patient with hesitation." },
    { title: "When stressed", text: "May become rigid, dismissive, or overly attached to being right." },
    { title: "When growing", text: "Uses confidence with patience, listening, and more flexible collaboration." },
  ],
  AH: [
    { title: "When secure", text: "Expressive -> collaborative -> persuasive -> socially energizing." },
    { title: "When challenged", text: "Works harder to keep momentum while still holding people together." },
    { title: "When stressed", text: "May scatter between the best direction and maintaining alignment with others." },
    { title: "When growing", text: "Influences clearly without over-adapting to the room." },
  ],
  OC: [
    { title: "When secure", text: "Observant -> precise -> analytical -> carefully self-directed." },
    { title: "When challenged", text: "Questions assumptions harder and looks for weak points before moving." },
    { title: "When stressed", text: "May overthink, delay, isolate, or keep rechecking the same concern." },
    { title: "When growing", text: "Turns careful analysis into timely action and clearer communication." },
  ],
  OH: [
    { title: "When secure", text: "Reflective -> receptive -> adaptive -> emotionally aware." },
    { title: "When challenged", text: "Reads context carefully and may adjust before making a direct move." },
    { title: "When stressed", text: "May become emotionally reactive, conflict-avoidant, or unclear about their own position." },
    { title: "When growing", text: "Balances sensitivity with directness, boundaries, and grounded choices." },
  ],
};

export const EXPRESSION_STRENGTHS: Record<ExpressionSuffix, string[]> = {
  AC: [
    "Decisive direction",
    "Independent execution",
    "Clear standards",
    "Boundary strength",
    "Confident action",
  ],
  AH: [
    "Collaborative influence",
    "Persuasive communication",
    "Social calibration",
    "Adaptive leadership",
    "Shared momentum",
  ],
  OC: [
    "Careful analysis",
    "Precision",
    "Risk detection",
    "Independent judgment",
    "Depth before action",
  ],
  OH: [
    "Context sensitivity",
    "Emotional nuance",
    "Responsive adaptation",
    "Relationship awareness",
    "Reflective growth",
  ],
};

export const EXPRESSION_BLIND_SPOTS: Record<ExpressionSuffix, Array<{ title: string; text: string }>> = {
  AC: [
    { title: "Over-control", text: "Confidence may become pressure to decide too quickly or dominate direction." },
    { title: "Low receptivity", text: "Directness can make softer signals from others easier to miss." },
    { title: "Certainty bias", text: "A strong position may feel settled before enough context has been gathered." },
  ],
  AH: [
    { title: "Overextension", text: "Enthusiasm around people and possibilities may lead to too many commitments." },
    { title: "Social calibration", text: "Responsiveness to others can occasionally make the actual position less clear." },
    { title: "Approval drift", text: "Influence can blur into maintaining alignment longer than necessary." },
  ],
  OC: [
    { title: "Analysis loops", text: "The search for accuracy may delay visible movement." },
    { title: "Private pressure", text: "Concerns may stay internal until they become heavier than they need to be." },
    { title: "Defensive precision", text: "Questioning may be useful, but can sound like rejection when tone is not clear." },
  ],
  OH: [
    { title: "Conflict avoidance", text: "Sensitivity to context may make direct disagreement harder than it needs to be." },
    { title: "Emotional absorption", text: "The atmosphere around them can affect decisions more than expected." },
    { title: "Unclear boundaries", text: "Adapting to others may hide personal needs until frustration builds." },
  ],
};

const makeExpressions = (
  type: TypeCode,
  items: Record<ExpressionSuffix, Omit<TrueSelf64Expression, "suffix" | "code" | "chips"> & { chips?: string[] }>,
): TrueSelf64Expression[] =>
  (["AC", "AH", "OC", "OH"] as const).map((suffix) => ({
    suffix,
    code: `${type}-${suffix}`,
    archetype: items[suffix].archetype,
    description: items[suffix].description,
    tendency: items[suffix].tendency,
    chips: items[suffix].chips ?? EXPRESSION_SUFFIXES[suffix].traits,
  }));

export const TRUESELF_64_EXPRESSIONS: Record<TypeCode, TrueSelf64Expression[]> = {
  INTJ: makeExpressions("INTJ", {
    AC: {
      archetype: "The Strategic Architect",
      description:
        "Highly independent and decisive. Builds long-term strategies confidently and prefers controlling direction rather than waiting for circumstances to decide it.",
      tendency: "Independent, strategic, decisive",
    },
    AH: {
      archetype: "The Strategic Guide",
      description:
        "Visionary but measured with people. Uses long-term thinking while remaining aware of cooperation, relationships, and collective direction.",
      tendency: "Visionary, cooperative, measured",
    },
    OC: {
      archetype: "The Critical Architect",
      description:
        "Highly analytical, private, and demanding of accuracy. Tends to examine possibilities repeatedly before trusting a conclusion or committing to action.",
      tendency: "Analytical, private, accuracy-driven",
    },
    OH: {
      archetype: "The Reflective Visionary",
      description:
        "Deeply introspective and future-focused. Carefully considers both consequences and human impact before deciding what direction feels right.",
      tendency: "Reflective, future-focused, consequence-aware",
    },
  }),
  INTP: makeExpressions("INTP", {
    AC: {
      archetype: "The Independent Theorist",
      description:
        "Intellectually self-assured and highly independent. Enjoys constructing original explanations without needing much external validation.",
      tendency: "Independent, theoretical, self-assured",
    },
    AH: {
      archetype: "The Collaborative Thinker",
      description:
        "Curious and analytical but more willing to exchange ideas, explore perspectives, and develop understanding through intellectual interaction.",
      tendency: "Curious, interactive, perspective-seeking",
    },
    OC: {
      archetype: "The Precision Analyst",
      description:
        "Constantly questions assumptions and searches for logical inconsistencies. May delay conclusions because there is always another possibility to examine.",
      tendency: "Precise, questioning, internally critical",
    },
    OH: {
      archetype: "The Reflective Scholar",
      description:
        "Thoughtful, cautious, and internally analytical. Explores ideas deeply while remaining sensitive to complexity and alternative perspectives.",
      tendency: "Thoughtful, cautious, complexity-aware",
    },
  }),
  ENTJ: makeExpressions("ENTJ", {
    AC: {
      archetype: "The Commanding Strategist",
      description:
        "Assertive, ambitious, and execution-focused. Naturally takes control of situations and pushes ideas toward measurable outcomes.",
      tendency: "Assertive, ambitious, execution-focused",
    },
    AH: {
      archetype: "The Strategic Leader",
      description:
        "Goal-oriented while highly aware of people and organizational dynamics. Leads by aligning others around a clear direction.",
      tendency: "Goal-oriented, people-aware, aligning",
    },
    OC: {
      archetype: "The Calculated Commander",
      description:
        "Ambitious but more cautious and analytical. Challenges plans repeatedly before committing resources or taking major risks.",
      tendency: "Calculated, analytical, risk-aware",
    },
    OH: {
      archetype: "The Deliberate Leader",
      description:
        "Strategic and achievement-oriented while carefully considering consequences, stakeholders, and long-term stability.",
      tendency: "Strategic, stakeholder-aware, deliberate",
    },
  }),
  ENTP: makeExpressions("ENTP", {
    AC: {
      archetype: "The Bold Innovator",
      description:
        "Confidently challenges conventions, experiments with possibilities, and enjoys disrupting ineffective systems with new approaches.",
      tendency: "Independent, challenging, decisive",
    },
    AH: {
      archetype: "The Charismatic Inventor",
      description:
        "Generates ideas through interaction and naturally draws others into possibilities. Innovation becomes something social and collaborative.",
      tendency: "Social, persuasive, collaborative",
    },
    OC: {
      archetype: "The Restless Experimenter",
      description:
        "Constantly questions assumptions and explores alternatives. Can become mentally restless because every answer creates another possibility.",
      tendency: "Analytical, questioning, internally critical",
    },
    OH: {
      archetype: "The Adaptive Explorer",
      description:
        "Curious, flexible, and highly responsive to changing people and circumstances. Explores possibilities while continuously recalibrating direction.",
      tendency: "Reflective, receptive, context-sensitive",
    },
  }),
  INFJ: makeExpressions("INFJ", {
    AC: {
      archetype: "The Conviction Advocate",
      description:
        "Quiet but internally decisive. Pursues meaningful visions with strong personal conviction and is willing to stand apart when necessary.",
      tendency: "Convicted, quiet, internally decisive",
    },
    AH: {
      archetype: "The Insightful Guide",
      description:
        "Combines deep intuition with strong interpersonal awareness. Naturally helps people understand themselves and move toward meaningful change.",
      tendency: "Insightful, interpersonal, growth-oriented",
    },
    OC: {
      archetype: "The Introspective Seeker",
      description:
        "Constantly examines meaning, motives, and future implications. Can become highly self-reflective when reality does not match internal ideals.",
      tendency: "Introspective, ideal-driven, searching",
    },
    OH: {
      archetype: "The Empathic Visionary",
      description:
        "Highly reflective and emotionally perceptive. Searches for meaning while carefully considering how choices affect other people.",
      tendency: "Reflective, empathic, meaning-focused",
    },
  }),
  INFP: makeExpressions("INFP", {
    AC: {
      archetype: "The Independent Idealist",
      description:
        "Strongly guided by personal values and willing to protect individuality even when those values conflict with external expectations.",
      tendency: "Independent, value-led, self-protective",
    },
    AH: {
      archetype: "The Gentle Idealist",
      description:
        "Values authenticity while naturally encouraging acceptance and emotional understanding between people.",
      tendency: "Authentic, gentle, understanding",
    },
    OC: {
      archetype: "The Inner Dreamer",
      description:
        "Deeply introspective and emotionally complex. Frequently examines whether life, identity, and decisions genuinely reflect inner values.",
      tendency: "Introspective, emotionally complex, identity-aware",
    },
    OH: {
      archetype: "The Sensitive Mediator",
      description:
        "Highly receptive to emotional nuance and multiple perspectives. Often seeks authenticity without creating unnecessary interpersonal conflict.",
      tendency: "Receptive, nuanced, conflict-aware",
    },
  }),
  ENFJ: makeExpressions("ENFJ", {
    AC: {
      archetype: "The Purposeful Influencer",
      description:
        "Confidently mobilizes people around meaningful goals. Comfortable taking responsibility when a group needs direction.",
      tendency: "Purposeful, influential, responsible",
    },
    AH: {
      archetype: "The Inspirational Mentor",
      description:
        "Naturally reads people, builds connection, and motivates others toward growth through encouragement and shared purpose.",
      tendency: "Inspirational, connective, encouraging",
    },
    OC: {
      archetype: "The Driven Advocate",
      description:
        "Strongly invested in positive impact but may continually evaluate whether they are doing enough or leading people correctly.",
      tendency: "Impact-driven, evaluative, responsible",
    },
    OH: {
      archetype: "The Empathic Mentor",
      description:
        "Highly responsive to people's emotional needs and carefully adjusts leadership to preserve understanding and connection.",
      tendency: "Empathic, adaptive, emotionally aware",
    },
  }),
  ENFP: makeExpressions("ENFP", {
    AC: {
      archetype: "The Fearless Explorer",
      description:
        "Enthusiastically pursues possibilities and authentic experiences with little hesitation about challenging conventional paths.",
      tendency: "Fearless, authentic, possibility-driven",
    },
    AH: {
      archetype: "The Inspirational Explorer",
      description:
        "Generates enthusiasm through ideas, people, and possibilities. Often helps others imagine futures they had not considered.",
      tendency: "Enthusiastic, imaginative, connective",
    },
    OC: {
      archetype: "The Searching Idealist",
      description:
        "Constantly explores possibilities while questioning which path truly represents identity, purpose, and potential.",
      tendency: "Searching, idealistic, self-questioning",
    },
    OH: {
      archetype: "The Empathic Explorer",
      description:
        "Curious and possibility-driven but highly responsive to interpersonal dynamics and emotional meaning.",
      tendency: "Empathic, curious, emotionally responsive",
    },
  }),
  ISTJ: makeExpressions("ISTJ", {
    AC: {
      archetype: "The Steady Organizer",
      description:
        "Independent, disciplined, and confident in established methods. Prefers clear responsibility and dependable execution.",
      tendency: "Independent, disciplined, dependable",
    },
    AH: {
      archetype: "The Dependable Coordinator",
      description:
        "Structured and responsible while attentive to how systems affect the people depending on them.",
      tendency: "Structured, responsible, people-aware",
    },
    OC: {
      archetype: "The Meticulous Inspector",
      description:
        "Highly attentive to errors, standards, and potential problems. Often verifies details before considering work complete.",
      tendency: "Meticulous, standards-focused, verifying",
    },
    OH: {
      archetype: "The Conscientious Guardian",
      description:
        "Responsible and careful, with heightened concern about obligations and how decisions may affect others.",
      tendency: "Conscientious, careful, obligation-aware",
    },
  }),
  ISFJ: makeExpressions("ISFJ", {
    AC: {
      archetype: "The Quiet Protector",
      description:
        "Caring but internally firm. Protects responsibilities and people without requiring recognition or social approval.",
      tendency: "Quiet, firm, protective",
    },
    AH: {
      archetype: "The Devoted Caregiver",
      description:
        "Creates stability through practical support, reliability, and close attention to the needs of others.",
      tendency: "Devoted, supportive, attentive",
    },
    OC: {
      archetype: "The Vigilant Supporter",
      description:
        "Highly conscientious about responsibilities and frequently checks whether important needs or details have been overlooked.",
      tendency: "Vigilant, conscientious, detail-checking",
    },
    OH: {
      archetype: "The Gentle Guardian",
      description:
        "Sensitive, dependable, and strongly aware of interpersonal needs. Often works quietly to maintain security and harmony.",
      tendency: "Gentle, dependable, harmony-aware",
    },
  }),
  ESTJ: makeExpressions("ESTJ", {
    AC: {
      archetype: "The Executive Organizer",
      description:
        "Direct, decisive, and highly execution-oriented. Naturally establishes structure, accountability, and measurable standards.",
      tendency: "Direct, decisive, execution-oriented",
    },
    AH: {
      archetype: "The Community Director",
      description:
        "Organizes people effectively while maintaining awareness of group cohesion, responsibility, and shared expectations.",
      tendency: "Organized, cohesive, responsible",
    },
    OC: {
      archetype: "The Exacting Manager",
      description:
        "Strongly focused on standards and results but more likely to scrutinize risks, mistakes, and operational weaknesses.",
      tendency: "Exacting, risk-aware, standards-focused",
    },
    OH: {
      archetype: "The Responsible Administrator",
      description:
        "Structured and duty-oriented while carefully considering how decisions influence stability and people around them.",
      tendency: "Structured, duty-oriented, stability-aware",
    },
  }),
  ESFJ: makeExpressions("ESFJ", {
    AC: {
      archetype: "The Confident Host",
      description:
        "Socially proactive, organized, and comfortable taking responsibility for creating positive shared experiences.",
      tendency: "Socially proactive, organized, confident",
    },
    AH: {
      archetype: "The Community Builder",
      description:
        "Naturally connects people and creates belonging through warmth, practical support, and social awareness.",
      tendency: "Warm, connective, belonging-oriented",
    },
    OC: {
      archetype: "The Conscientious Connector",
      description:
        "Highly attentive to social expectations and whether responsibilities toward others are being fulfilled properly.",
      tendency: "Conscientious, socially attentive, responsible",
    },
    OH: {
      archetype: "The Harmony Keeper",
      description:
        "Sensitive to interpersonal atmosphere and naturally works to maintain cooperation, inclusion, and emotional stability.",
      tendency: "Harmony-focused, inclusive, emotionally stabilizing",
    },
  }),
  ISTP: makeExpressions("ISTP", {
    AC: {
      archetype: "The Independent Operator",
      description:
        "Calm, self-reliant, and confident handling practical problems independently. Prefers action over unnecessary discussion.",
      tendency: "Self-reliant, practical, calm",
    },
    AH: {
      archetype: "The Adaptive Specialist",
      description:
        "Technically independent but flexible around people. Easily adjusts methods when circumstances or team needs change.",
      tendency: "Technical, flexible, adaptive",
    },
    OC: {
      archetype: "The Precision Troubleshooter",
      description:
        "Carefully analyzes how things work and notices inconsistencies others may miss before taking practical action.",
      tendency: "Precise, analytical, practical",
    },
    OH: {
      archetype: "The Cautious Improviser",
      description:
        "Adaptable and observant but more sensitive to uncertainty and consequences before deciding how to respond.",
      tendency: "Observant, cautious, adaptive",
    },
  }),
  ISFP: makeExpressions("ISFP", {
    AC: {
      archetype: "The Free Spirit",
      description:
        "Quietly confident in personal preferences and resistant to being forced into identities or lifestyles that feel unnatural.",
      tendency: "Quietly confident, authentic, independent",
    },
    AH: {
      archetype: "The Warm Creator",
      description:
        "Expresses individuality through experience and creativity while remaining strongly receptive to people and emotional atmosphere.",
      tendency: "Creative, receptive, warm",
    },
    OC: {
      archetype: "The Introspective Artist",
      description:
        "Highly aware of personal emotion and aesthetic meaning, often examining whether choices genuinely represent the inner self.",
      tendency: "Introspective, aesthetic, emotionally aware",
    },
    OH: {
      archetype: "The Gentle Individualist",
      description:
        "Sensitive, flexible, and authenticity-driven while carefully avoiding unnecessary disruption to others.",
      tendency: "Sensitive, flexible, authenticity-driven",
    },
  }),
  ESTP: makeExpressions("ESTP", {
    AC: {
      archetype: "The Bold Operator",
      description:
        "Confident, direct, competitive, and comfortable acting quickly when opportunities or challenges appear.",
      tendency: "Bold, direct, competitive",
    },
    AH: {
      archetype: "The Social Adventurer",
      description:
        "Energetic and action-oriented while naturally using social awareness, charm, and adaptability to navigate situations.",
      tendency: "Energetic, charming, adaptive",
    },
    OC: {
      archetype: "The Tactical Challenger",
      description:
        "Action-oriented but more calculating, continuously assessing leverage, risks, and alternative moves before committing.",
      tendency: "Tactical, calculating, risk-aware",
    },
    OH: {
      archetype: "The Adaptive Performer",
      description:
        "Highly responsive to immediate circumstances and people, rapidly changing approach according to feedback from the environment.",
      tendency: "Responsive, adaptive, environment-aware",
    },
  }),
  ESFP: makeExpressions("ESFP", {
    AC: {
      archetype: "The Fearless Performer",
      description:
        "Expressive, spontaneous, and comfortable being visible. Pursues experiences directly and confidently follows personal desires.",
      tendency: "Expressive, spontaneous, visible",
    },
    AH: {
      archetype: "The Magnetic Entertainer",
      description:
        "Warm, expressive, and highly socially responsive. Naturally creates energy and brings people into shared experiences.",
      tendency: "Warm, expressive, socially responsive",
    },
    OC: {
      archetype: "The Sensitive Performer",
      description:
        "Expressive but more internally evaluative, frequently noticing how experiences and social responses affect personal identity.",
      tendency: "Expressive, evaluative, identity-aware",
    },
    OH: {
      archetype: "The Emotional Connector",
      description:
        "Highly responsive to both immediate experiences and interpersonal atmosphere, creating connection through warmth and emotional presence.",
      tendency: "Emotional, warm, responsive",
    },
  }),
};
