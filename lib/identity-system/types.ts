/**
 * TrueSelf Identity System
 * 15 Expanded Identity Types with Psychological Definitions
 */

export type IdentityType =
  | "the-anchored"
  | "the-rooted-explorer"
  | "the-idealist"
  | "the-split"
  | "the-masked"
  | "the-shifter"
  | "the-detached"
  | "the-avoider"
  | "the-observer"
  | "the-becoming"
  | "the-rebuilder"
  | "the-seeker"
  | "the-performer"
  | "the-controller"
  | "the-drifter";

export interface DimensionScores {
  selfAwareness: number;
  authenticity: number;
  externalInfluence: number;
  identityStability: number;
  emotionalAlignment: number;
  decisionClarity: number;
  innerConsistency: number;
  socialExpression: number;
}

export interface Identity {
  id: IdentityType;
  name: string;
  tagline: string;
  tier: "grounded" | "conflicted" | "disconnected" | "growth" | "performance";
  corePattern: string;
  psychologicalTraits: string[];
  strengths: string[];
  weaknesses: string[];
  keyDimensions: {
    dimension: keyof DimensionScores;
    importance: "primary" | "secondary" | "tertiary";
    targetScore: number;
  }[];
  description: string;
  opposite?: IdentityType;
  relatedTypes?: IdentityType[];
}

export const IDENTITIES: Record<IdentityType, Identity> = {
  "the-anchored": {
    id: "the-anchored",
    name: "The Anchored",
    tagline: "Stable, self-aware, and living aligned with your values.",
    tier: "grounded",
    corePattern:
      "Stable, self-aware, authentic within chosen life framework. Knows who they are and lives accordingly.",
    psychologicalTraits: [
      "Consistent identity across contexts",
      "Clear values and principles",
      "Lives with integrity",
      "Resistant to external pressure",
      "Stable sense of self",
    ],
    strengths: [
      "Stability and reliability",
      "Authenticity",
      "Resilience in change",
      "Purposeful living",
      "Personal integrity",
    ],
    weaknesses: [
      "Resistance to growth",
      "Rigidity in beliefs",
      "Inflexibility to change",
      "May judge others for different values",
      "Potential for stagnation",
    ],
    keyDimensions: [
      { dimension: "identityStability", importance: "primary", targetScore: 90 },
      { dimension: "authenticity", importance: "primary", targetScore: 85 },
      { dimension: "selfAwareness", importance: "primary", targetScore: 85 },
      { dimension: "innerConsistency", importance: "secondary", targetScore: 90 },
      { dimension: "externalInfluence", importance: "secondary", targetScore: 15 },
    ],
    description:
      "You know who you are and you live that truth consistently. Your values aren't questioned daily—they're lived. You feel grounded across different situations because your core identity doesn't shift with your environment. People trust you because you're reliable and authentic.",
    opposite: "the-shifter",
    relatedTypes: ["the-rooted-explorer", "the-idealist"],
  },

  "the-rooted-explorer": {
    id: "the-rooted-explorer",
    name: "The Rooted Explorer",
    tagline: "Stable at your core, curious in your growth.",
    tier: "grounded",
    corePattern:
      "Stable core identity with active growth mindset. Explores possibilities without losing grounding.",
    psychologicalTraits: [
      "Knows core values but explores options",
      "Confident enough to be curious",
      "Integrates new experiences into stable self",
      "Growth-oriented but not lost",
      "Adaptable within coherence",
    ],
    strengths: [
      "Adaptability with clarity",
      "Growth-oriented resilience",
      "Experimentation without losing self",
      "Integrated learning",
      "Balanced stability and flexibility",
    ],
    weaknesses: [
      "Can overcommit to exploration",
      "May dilute focus across interests",
      "Risk of expanding too widely",
      "Balancing act can be tiring",
    ],
    keyDimensions: [
      { dimension: "identityStability", importance: "primary", targetScore: 75 },
      { dimension: "decisionClarity", importance: "primary", targetScore: 80 },
      { dimension: "selfAwareness", importance: "secondary", targetScore: 80 },
      { dimension: "authenticity", importance: "secondary", targetScore: 75 },
      { dimension: "externalInfluence", importance: "tertiary", targetScore: 75 },
    ],
    description:
      "You have a stable sense of who you are, but you're not afraid to explore and grow. You try new things, learn from experiences, and integrate them into your identity without losing your core. Change doesn't destabilize you—it enriches you.",
    opposite: "the-avoider",
    relatedTypes: ["the-anchored", "the-seeker"],
  },

  "the-idealist": {
    id: "the-idealist",
    name: "The Idealist",
    tagline: "Driven by purpose and vision.",
    tier: "grounded",
    corePattern: "Identity shaped by values and vision. Principled living with clear purpose.",
    psychologicalTraits: [
      "Values-driven decision making",
      "Strong internal compass",
      "Future-oriented thinking",
      "Principled action",
      "Mission-focused",
    ],
    strengths: [
      "Purpose-driven living",
      "Inspirational to others",
      "Principled action",
      "Clear value alignment",
      "Strong conviction",
    ],
    weaknesses: [
      "Perfectionism",
      "Disappointment when reality doesn't match vision",
      "Rigid values",
      "Judgmental of others' choices",
      "Can be dogmatic",
    ],
    keyDimensions: [
      { dimension: "decisionClarity", importance: "primary", targetScore: 85 },
      { dimension: "authenticity", importance: "primary", targetScore: 80 },
      { dimension: "selfAwareness", importance: "secondary", targetScore: 80 },
      { dimension: "emotionalAlignment", importance: "secondary", targetScore: 75 },
      { dimension: "socialExpression", importance: "tertiary", targetScore: 70 },
    ],
    description:
      "Your identity is inseparable from your purpose. You have a clear vision of what matters and you live it. You inspire others through your commitment to your values, though you sometimes struggle when reality doesn't match your ideals.",
    opposite: "the-drifter",
    relatedTypes: ["the-anchored", "the-becoming"],
  },

  "the-split": {
    id: "the-split",
    name: "The Split",
    tagline: "Aware of your contradictions, struggling to integrate them.",
    tier: "conflicted",
    corePattern:
      "Contradictory self-images or values; aware of internal conflict, sometimes paralyzed by it.",
    psychologicalTraits: [
      "Aware of contradictions",
      "Feels genuinely torn",
      "Internal debate is constant",
      "Struggles with integration",
      "Self-awareness of paradox",
    ],
    strengths: [
      "Self-awareness of complexity",
      "Nuance and depth",
      "Avoids false certainty",
      "Can hold multiple perspectives",
    ],
    weaknesses: [
      "Decision paralysis",
      "Identity confusion",
      "Emotional volatility",
      "Difficult relationships due to inconsistency",
      "Exhausting internal conflict",
    ],
    keyDimensions: [
      { dimension: "selfAwareness", importance: "primary", targetScore: 70 },
      { dimension: "innerConsistency", importance: "primary", targetScore: 30 },
      { dimension: "identityStability", importance: "secondary", targetScore: 30 },
      { dimension: "emotionalAlignment", importance: "secondary", targetScore: 45 },
      { dimension: "decisionClarity", importance: "tertiary", targetScore: 35 },
    ],
    description:
      "You're painfully aware of your contradictions. Part of you wants one thing, another part wants something different. You're not confused about who you are—you're aware you're genuinely conflicted. This makes decisions hard and identity unstable.",
    relatedTypes: ["the-rebuilder", "the-becoming"],
  },

  "the-masked": {
    id: "the-masked",
    name: "The Masked",
    tagline: "Intentionally hidden behind a strategic presentation.",
    tier: "conflicted",
    corePattern:
      "Intentional gap between external presentation and internal reality. Knows true self exists but strategically hides it.",
    psychologicalTraits: [
      "Performs different roles strategically",
      "Knows true self but hides it",
      "Calculates social presentation",
      "Protective of real identity",
      "Strategic compartmentalization",
    ],
    strengths: [
      "Social adaptability",
      "Strategic self-presentation",
      "Reading others well",
      "Protection of vulnerable self",
      "Professional effectiveness",
    ],
    weaknesses: [
      "Isolation from real connection",
      "Identity fatigue from performing",
      "Authenticity deficit",
      "Loneliness despite company",
      "Risk of losing real self",
    ],
    keyDimensions: [
      { dimension: "authenticity", importance: "primary", targetScore: 30 },
      { dimension: "socialExpression", importance: "primary", targetScore: 60 },
      { dimension: "externalInfluence", importance: "primary", targetScore: 70 },
      { dimension: "identityStability", importance: "secondary", targetScore: 45 },
      { dimension: "innerConsistency", importance: "secondary", targetScore: 25 },
    ],
    description:
      "You know who you really are, but you don't show it to the world. You've learned that presenting a different version of yourself is safer or more effective. The real you exists, but it's hidden behind a mask you wear strategically.",
    relatedTypes: ["the-performer", "the-detached"],
  },

  "the-shifter": {
    id: "the-shifter",
    name: "The Shifter",
    tagline: "Your identity changes with your environment.",
    tier: "conflicted",
    corePattern:
      "Unstable identity; shifts based on context and relationships. Chameleon-like, difficulty finding true self.",
    psychologicalTraits: [
      "Chameleon-like adaptation",
      "Difficulty finding core self",
      "Reactive to relationships",
      "Context-dependent identity",
      "High dependence on external feedback",
    ],
    strengths: [
      "Adaptability",
      "Empathy through mirroring",
      "Social flexibility",
      "Can fit into any group",
    ],
    weaknesses: [
      "No core sense of self",
      "Chronic confusion about identity",
      "Dependent on others' feedback",
      "Difficulty making independent decisions",
      "Exhausting constant adaptation",
    ],
    keyDimensions: [
      { dimension: "identityStability", importance: "primary", targetScore: 20 },
      { dimension: "externalInfluence", importance: "primary", targetScore: 85 },
      { dimension: "selfAwareness", importance: "secondary", targetScore: 35 },
      { dimension: "authenticity", importance: "secondary", targetScore: 25 },
      { dimension: "innerConsistency", importance: "tertiary", targetScore: 25 },
    ],
    description:
      "You become different people in different contexts. Not strategically—it happens automatically. You mirror the people around you, adapt to the situation, and rarely feel like yourself. Finding your core identity feels impossible.",
    opposite: "the-anchored",
    relatedTypes: ["the-drifter", "the-avoider"],
  },

  "the-detached": {
    id: "the-detached",
    name: "The Detached",
    tagline: "Observant but emotionally disconnected from yourself.",
    tier: "disconnected",
    corePattern:
      "Identity experienced as intellectual rather than felt. Observant but disconnected from emotions.",
    psychologicalTraits: [
      "Intellectual self-awareness",
      "Emotional disconnection",
      "Avoids vulnerability",
      "Observant from distance",
      "Analytical about self",
    ],
    strengths: [
      "Clarity through distance",
      "Objectivity about self",
      "Non-reactivity",
      "Strategic thinking",
      "Analytical insight",
    ],
    weaknesses: [
      "Emotional disconnection",
      "Lack of empathy",
      "Isolation",
      "Difficulty with intimacy",
      "Missing emotional truth",
    ],
    keyDimensions: [
      { dimension: "emotionalAlignment", importance: "primary", targetScore: 25 },
      { dimension: "selfAwareness", importance: "primary", targetScore: 50 },
      { dimension: "authenticity", importance: "secondary", targetScore: 35 },
      { dimension: "socialExpression", importance: "secondary", targetScore: 25 },
      { dimension: "innerConsistency", importance: "tertiary", targetScore: 20 },
    ],
    description:
      "You understand yourself intellectually but feel disconnected from your own emotions. You're aware of yourself from a distance, like an observer watching your own life. Relationships feel difficult because you struggle to feel and express emotions.",
    relatedTypes: ["the-observer", "the-avoider"],
  },

  "the-avoider": {
    id: "the-avoider",
    name: "The Avoider",
    tagline: "You don't want to know; distraction is easier.",
    tier: "disconnected",
    corePattern:
      "Avoids self-reflection and introspection. Identity remains unexamined by preference.",
    psychologicalTraits: [
      "Avoids self-reflection",
      "Action-oriented over introspection",
      "Uncomfortable with vulnerability",
      "Focuses on external distractions",
      "Resists self-knowledge",
    ],
    strengths: [
      "Low anxiety about identity questions",
      "Action-focused",
      "Doesn't overthink",
      "Can move forward quickly",
    ],
    weaknesses: [
      "Blind spots",
      "Repeated patterns",
      "Lack of growth",
      "Surface relationships",
      "Unexamined trauma/issues",
    ],
    keyDimensions: [
      { dimension: "selfAwareness", importance: "primary", targetScore: 20 },
      { dimension: "innerConsistency", importance: "primary", targetScore: 40 },
      { dimension: "decisionClarity", importance: "secondary", targetScore: 35 },
      { dimension: "authenticity", importance: "secondary", targetScore: 30 },
      { dimension: "emotionalAlignment", importance: "tertiary", targetScore: 35 },
    ],
    description:
      "You don't want to look too closely at yourself. Introspection feels uncomfortable, so you stay busy, distracted, or focused on external things. Your identity isn't developed by choice—it's simply what's convenient.",
    opposite: "the-rooted-explorer",
    relatedTypes: ["the-drifter", "the-detached"],
  },

  "the-observer": {
    id: "the-observer",
    name: "The Observer",
    tagline: "You watch yourself with clarity but don't participate.",
    tier: "disconnected",
    corePattern:
      "Highly self-aware but metacognitive and detached. Watches self from distance without integration.",
    psychologicalTraits: [
      "Metacognitive awareness",
      "Self-watching",
      "Detached from experience",
      "Analytical about own behavior",
      "Separate from participation",
    ],
    strengths: [
      "Self-insight",
      "Non-judgment",
      "Clarity about patterns",
      "Objectivity",
      "Wise perspective",
    ],
    weaknesses: [
      "Passivity",
      "Lack of integration",
      "Emotional distance",
      "Doesn't act on insight",
      "Isolation through observation",
    ],
    keyDimensions: [
      { dimension: "selfAwareness", importance: "primary", targetScore: 80 },
      { dimension: "emotionalAlignment", importance: "primary", targetScore: 30 },
      { dimension: "innerConsistency", importance: "secondary", targetScore: 40 },
      { dimension: "socialExpression", importance: "secondary", targetScore: 25 },
      { dimension: "authenticity", importance: "tertiary", targetScore: 35 },
    ],
    description:
      "You have remarkable clarity about yourself—you see your patterns, your reactions, your tendencies. But you experience yourself as a spectator, not a participant. You observe, understand, but struggle to integrate this knowledge into action.",
    relatedTypes: ["the-detached", "the-rebuilder"],
  },

  "the-becoming": {
    id: "the-becoming",
    name: "The Becoming",
    tagline: "You're actively building your identity.",
    tier: "growth",
    corePattern:
      "Actively constructing identity; in transition but conscious of it. Intentional about growth.",
    psychologicalTraits: [
      "Self-aware about growing",
      "Intentional about change",
      "In transition but conscious",
      "Integrating new understanding",
      "Self-directed change",
    ],
    strengths: [
      "Growth-oriented",
      "Self-directed change",
      "Resilience in transition",
      "Learning capacity",
      "Intentional development",
    ],
    weaknesses: [
      "Temporary instability",
      "Uncertain about fundamentals",
      "Can be confusing to others",
      "Unfinished feeling",
      "Ongoing discomfort",
    ],
    keyDimensions: [
      { dimension: "selfAwareness", importance: "primary", targetScore: 65 },
      { dimension: "identityStability", importance: "primary", targetScore: 50 },
      { dimension: "innerConsistency", importance: "secondary", targetScore: 55 },
      { dimension: "emotionalAlignment", importance: "secondary", targetScore: 60 },
      { dimension: "decisionClarity", importance: "tertiary", targetScore: 55 },
    ],
    description:
      "You know you're changing and you're okay with it. You're actively building who you want to become, integrating new understanding, and moving intentionally toward growth. It's not the most stable place, but it's where growth happens.",
    relatedTypes: ["the-seeker", "the-rebuilder"],
  },

  "the-rebuilder": {
    id: "the-rebuilder",
    name: "The Rebuilder",
    tagline: "Reconstructing after loss or disruption.",
    tier: "growth",
    corePattern:
      "Reconstructing identity after loss, crisis, or major change. Learning to be again.",
    psychologicalTraits: [
      "Post-disruption state",
      "Learning to be again",
      "Intentional reassembly",
      "Processing change",
      "Grief and growth simultaneously",
    ],
    strengths: [
      "Resilience",
      "Humility from crisis",
      "Wisdom from experience",
      "Compassion from struggle",
      "Deep transformation",
    ],
    weaknesses: [
      "Fragility",
      "Grief",
      "Temporary instability",
      "Fear of relapse",
      "Energy depletion",
    ],
    keyDimensions: [
      { dimension: "identityStability", importance: "primary", targetScore: 35 },
      { dimension: "selfAwareness", importance: "primary", targetScore: 60 },
      { dimension: "innerConsistency", importance: "secondary", targetScore: 40 },
      { dimension: "emotionalAlignment", importance: "secondary", targetScore: 50 },
      { dimension: "authenticity", importance: "tertiary", targetScore: 55 },
    ],
    description:
      "You've been through a disruption—loss, crisis, major change—and you're consciously putting yourself back together. This is painful but purposeful. You're learning who you are in the aftermath and building something real.",
    relatedTypes: ["the-becoming", "the-split"],
  },

  "the-seeker": {
    id: "the-seeker",
    name: "The Seeker",
    tagline: "Actively exploring to find your authentic self.",
    tier: "growth",
    corePattern: "Intentionally exploring to discover authentic identity. Experimental and open.",
    psychologicalTraits: [
      "Intentional exploration",
      "Open to possibilities",
      "Experimenting with identity",
      "Curious about self",
      "Flexible about options",
    ],
    strengths: [
      "Openness",
      "Curiosity",
      "Flexibility",
      "Growth mindset",
      "Exploration capacity",
    ],
    weaknesses: [
      "Lack of commitment",
      "Decision indecision",
      "Scattered focus",
      "Difficulty settling",
      "Ungrounded feeling",
    ],
    keyDimensions: [
      { dimension: "selfAwareness", importance: "primary", targetScore: 55 },
      { dimension: "externalInfluence", importance: "primary", targetScore: 85 },
      { dimension: "authenticity", importance: "secondary", targetScore: 50 },
      { dimension: "decisionClarity", importance: "secondary", targetScore: 30 },
      { dimension: "identityStability", importance: "tertiary", targetScore: 35 },
    ],
    description:
      "You're on a journey to find the real you. You try different things, explore different identities, and stay open to where the journey leads. It's uncertain, but the exploration feels necessary and authentic.",
    opposite: "the-controller",
    relatedTypes: ["the-becoming", "the-rooted-explorer"],
  },

  "the-performer": {
    id: "the-performer",
    name: "The Performer",
    tagline: "Identity performed for approval and appearance.",
    tier: "performance",
    corePattern:
      "Identity performed for external validation and appearance. Self-conscious, role-oriented.",
    psychologicalTraits: [
      "Self-conscious presentation",
      "Role-oriented behavior",
      "Seeks approval through appearance",
      "Calculates reactions",
      "Anxiety about image",
    ],
    strengths: [
      "Social awareness",
      "Adaptability",
      "Entertainment value",
      "Championship capacity",
      "Reading audiences",
    ],
    weaknesses: [
      "Inauthenticity",
      "Image anxiety",
      "Shallow connections",
      "Exhaustion from performing",
      "Approval dependency",
    ],
    keyDimensions: [
      { dimension: "externalInfluence", importance: "primary", targetScore: 80 },
      { dimension: "socialExpression", importance: "primary", targetScore: 80 },
      { dimension: "authenticity", importance: "secondary", targetScore: 30 },
      { dimension: "emotionalAlignment", importance: "secondary", targetScore: 35 },
      { dimension: "identityStability", importance: "tertiary", targetScore: 45 },
    ],
    description:
      "You've learned that your value comes from how others perceive you. So you perform—a version calculated to get approval. You're socially skilled and entertaining, but the real you is hidden behind the role.",
    relatedTypes: ["the-masked", "the-shifter"],
  },

  "the-controller": {
    id: "the-controller",
    name: "The Controller",
    tagline: "Controlling identity to prevent chaos.",
    tier: "performance",
    corePattern: "Identity controlled to prevent uncertainty and chaos. Perfectionist and protective.",
    psychologicalTraits: [
      "Rigid self-management",
      "Perfectionism",
      "Control-oriented",
      "Anxiety-driven",
      "Protective mechanisms",
    ],
    strengths: [
      "Organization",
      "Discipline",
      "Preventive thinking",
      "Reliability",
      "Consistency",
    ],
    weaknesses: [
      "Rigidity",
      "Anxiety-driven",
      "Inability to adapt",
      "Over-control",
      "Emotional suppression",
    ],
    keyDimensions: [
      { dimension: "identityStability", importance: "primary", targetScore: 80 },
      { dimension: "innerConsistency", importance: "primary", targetScore: 75 },
      { dimension: "externalInfluence", importance: "primary", targetScore: 20 },
      { dimension: "emotionalAlignment", importance: "secondary", targetScore: 40 },
      { dimension: "authenticity", importance: "secondary", targetScore: 60 },
    ],
    description:
      "You maintain your identity through tight control. You manage every aspect to prevent chaos or uncertainty. You're disciplined and reliable, but the effort is exhausting and you struggle when things don't go according to plan.",
    opposite: "the-seeker",
    relatedTypes: ["the-anchored", "the-performer"],
  },

  "the-drifter": {
    id: "the-drifter",
    name: "The Drifter",
    tagline: "Going with the flow, unexamined and reactive.",
    tier: "performance",
    corePattern: "No active engagement with identity; passive acceptance. Reactive to circumstances.",
    psychologicalTraits: [
      "Goes with flow",
      "Unexamined identity",
      "Reactive to circumstances",
      "Low agency",
      "Unconscious drift",
    ],
    strengths: [
      "Low anxiety",
      "Adaptability",
      "Peace with inconsistency",
      "Flexibility",
      "Reduced stress",
    ],
    weaknesses: [
      "No agency",
      "No purposeful growth",
      "Easily influenced",
      "Lack of direction",
      "Unexamined living",
    ],
    keyDimensions: [
      { dimension: "selfAwareness", importance: "primary", targetScore: 25 },
      { dimension: "externalInfluence", importance: "primary", targetScore: 70 },
      { dimension: "decisionClarity", importance: "secondary", targetScore: 20 },
      { dimension: "authenticity", importance: "secondary", targetScore: 35 },
      { dimension: "identityStability", importance: "tertiary", targetScore: 35 },
    ],
    description:
      "You're not really thinking about who you are—you're just living day to day, going with whatever comes. No internal compass, no purposeful direction, just drifting based on circumstances and what others suggest.",
    opposite: "the-idealist",
    relatedTypes: ["the-avoider", "the-shifter"],
  },
};

export const IDENTITY_TIERS = {
  grounded: ["the-anchored", "the-rooted-explorer", "the-idealist"],
  conflicted: ["the-split", "the-masked", "the-shifter"],
  disconnected: ["the-detached", "the-avoider", "the-observer"],
  growth: ["the-becoming", "the-rebuilder", "the-seeker"],
  performance: ["the-performer", "the-controller", "the-drifter"],
};

export const IDENTITY_COLORS: Record<IdentityType, string> = {
  "the-anchored": "bg-blue-500",
  "the-rooted-explorer": "bg-teal-500",
  "the-idealist": "bg-purple-500",
  "the-split": "bg-orange-500",
  "the-masked": "bg-indigo-500",
  "the-shifter": "bg-pink-500",
  "the-detached": "bg-gray-500",
  "the-avoider": "bg-slate-500",
  "the-observer": "bg-cyan-500",
  "the-becoming": "bg-emerald-500",
  "the-rebuilder": "bg-amber-500",
  "the-seeker": "bg-lime-500",
  "the-performer": "bg-rose-500",
  "the-controller": "bg-violet-500",
  "the-drifter": "bg-zinc-500",
};
