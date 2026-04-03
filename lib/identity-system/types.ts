/**
 * TrueSelf Identity System - Refactored
 * 15 Identity Types with Weighted Scoring and Image Mappings
 */

export type IdentityType =
  | "the-anchored"
  | "the-becoming"
  | "the-caregiver"
  | "the-creator"
  | "the-detached"
  | "the-drifter"
  | "the-lover"
  | "the-masked"
  | "the-observer"
  | "the-pioneer"
  | "the-rebuilder"
  | "the-sage"
  | "the-seeker"
  | "the-shifter"
  | "the-split";

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
  image: string;
  opposite?: IdentityType;
  relatedTypes?: IdentityType[];
}

export const IDENTITIES: Record<IdentityType, Identity> = {
  "the-anchored": {
    id: "the-anchored",
    name: "The Anchored",
    tagline: "Stable, self-aware, and living aligned with your values.",
    tier: "grounded",
    corePattern: "Stable, self-aware, authentic within chosen life framework.",
    psychologicalTraits: [
      "Consistent identity across contexts",
      "Clear values",
      "Lives with integrity",
      "Resistant to external pressure",
      "Stable sense of self",
    ],
    strengths: [
      "Stability and reliability",
      "Authenticity",
      "Resilience",
      "Purposeful living",
      "Personal integrity",
    ],
    weaknesses: [
      "Resistance to growth",
      "Rigidity",
      "May judge others",
    ],
    keyDimensions: [
      { dimension: "identityStability", importance: "primary", targetScore: 90 },
      { dimension: "authenticity", importance: "primary", targetScore: 85 },
      { dimension: "selfAwareness", importance: "primary", targetScore: 85 },
      { dimension: "innerConsistency", importance: "secondary", targetScore: 90 },
      { dimension: "externalInfluence", importance: "secondary", targetScore: 15 },
    ],
    description: "You know who you are and live that truth consistently.",
    image: "/assets/identity types/the-anchored.jpg",
    opposite: "the-shifter",
    relatedTypes: ["the-creator", "the-sage"],
  },

  "the-becoming": {
    id: "the-becoming",
    name: "The Becoming",
    tagline: "You're actively building your identity.",
    tier: "growth",
    corePattern: "Actively constructing identity; in transition but conscious.",
    psychologicalTraits: [
      "Self-aware about growing",
      "Intentional about change",
      "In transition consciously",
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
      "Unfinished feeling",
    ],
    keyDimensions: [
      { dimension: "selfAwareness", importance: "primary", targetScore: 65 },
      { dimension: "identityStability", importance: "primary", targetScore: 50 },
      { dimension: "innerConsistency", importance: "secondary", targetScore: 55 },
      { dimension: "emotionalAlignment", importance: "secondary", targetScore: 60 },
      { dimension: "decisionClarity", importance: "tertiary", targetScore: 55 },
    ],
    description: "You know you're changing and you're okay with it.",
    image: "/assets/identity types/the-becoming.jpg",
    relatedTypes: ["the-seeker", "the-rebuilder"],
  },

  "the-caregiver": {
    id: "the-caregiver",
    name: "The Caregiver",
    tagline: "Your identity is rooted in supporting others.",
    tier: "grounded",
    corePattern: "Identity defined by care, support, and service to others.",
    psychologicalTraits: [
      "Empathetic and attentive",
      "Purpose through helping",
      "Emotionally tuned in",
      "Self-sacrificing",
      "Relationship-focused",
    ],
    strengths: [
      "Deep empathy",
      "Nurturing ability",
      "Loyalty",
      "Emotional intelligence",
      "Service-oriented",
    ],
    weaknesses: [
      "Over-giving",
      "Boundary issues",
      "Self-neglect",
      "Codependency risk",
    ],
    keyDimensions: [
      { dimension: "emotionalAlignment", importance: "primary", targetScore: 85 },
      { dimension: "socialExpression", importance: "primary", targetScore: 80 },
      { dimension: "authenticity", importance: "secondary", targetScore: 75 },
      { dimension: "selfAwareness", importance: "secondary", targetScore: 70 },
      { dimension: "externalInfluence", importance: "tertiary", targetScore: 60 },
    ],
    description: "Your sense of self is inseparable from caring for others.",
    image: "/assets/identity types/the-caregiver.jpg",
    relatedTypes: ["the-lover", "the-creator"],
  },

  "the-creator": {
    id: "the-creator",
    name: "The Creator",
    tagline: "Your identity is expressed through creation and innovation.",
    tier: "grounded",
    corePattern: "Identity defined by creative expression and bringing ideas to life.",
    psychologicalTraits: [
      "Creatively driven",
      "Self-expressive",
      "Vision-oriented",
      "Playful experimentation",
      "Authentic expression",
    ],
    strengths: [
      "Creative thinking",
      "Original expression",
      "Courage to be different",
      "Innovation",
      "Authenticity through art",
    ],
    weaknesses: [
      "Practical struggles",
      "Perfectionism",
      "Sensitivity to criticism",
      "Lack of structure",
    ],
    keyDimensions: [
      { dimension: "authenticity", importance: "primary", targetScore: 85 },
      { dimension: "selfAwareness", importance: "primary", targetScore: 75 },
      { dimension: "socialExpression", importance: "secondary", targetScore: 75 },
      { dimension: "emotionalAlignment", importance: "secondary", targetScore: 80 },
      { dimension: "externalInfluence", importance: "tertiary", targetScore: 40 },
    ],
    description: "You know yourself through what you create.",
    image: "/assets/identity types/the-creator.jpg",
    relatedTypes: ["the-caregiver", "the-seeker"],
  },

  "the-detached": {
    id: "the-detached",
    name: "The Detached",
    tagline: "Observant but emotionally disconnected from yourself.",
    tier: "disconnected",
    corePattern: "Identity experienced as intellectual rather than felt.",
    psychologicalTraits: [
      "Intellectual self-awareness",
      "Emotional disconnection",
      "Avoids vulnerability",
      "Observant from distance",
      "Analytical about self",
    ],
    strengths: [
      "Clarity through distance",
      "Objectivity",
      "Non-reactivity",
      "Strategic thinking",
      "Analytical insight",
    ],
    weaknesses: [
      "Emotional disconnection",
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
    description: "You understand yourself intellectually but feel disconnected.",
    image: "/assets/identity types/the-detached.jpg",
    relatedTypes: ["the-observer"],
  },

  "the-drifter": {
    id: "the-drifter",
    name: "The Drifter",
    tagline: "Going with the flow, unexamined and reactive.",
    tier: "performance",
    corePattern: "No active engagement with identity; passive acceptance.",
    psychologicalTraits: [
      "Goes with flow",
      "Unexamined identity",
      "Reactive to circumstances",
      "Low agency",
      "Low self knowledge",
    ],
    strengths: [
      "Low anxiety",
      "Adaptability",
      "Flexibility",
      "Peace in lack of direction",
    ],
    weaknesses: [
      "No agency",
      "No purpose",
      "Easily influenced",
      "Lack of growth",
      "Unexamined living",
    ],
    keyDimensions: [
      { dimension: "selfAwareness", importance: "primary", targetScore: 25 },
      { dimension: "externalInfluence", importance: "primary", targetScore: 70 },
      { dimension: "decisionClarity", importance: "secondary", targetScore: 20 },
      { dimension: "authenticity", importance: "secondary", targetScore: 35 },
      { dimension: "identityStability", importance: "tertiary", targetScore: 35 },
    ],
    description: "You're not really thinking about who you are—just drifting.",
    image: "/assets/identity types/the-drifter.jpg",
    relatedTypes: ["the-shifter"],
  },

  "the-lover": {
    id: "the-lover",
    name: "The Lover",
    tagline: "Your identity is rooted in connection and intimacy.",
    tier: "grounded",
    corePattern: "Identity defined by depth of relationship and emotional connection.",
    psychologicalTraits: [
      "Deeply relational",
      "Emotionally expressive",
      "Seeks authentic connection",
      "Sensitive and attuned",
      "Committed and loyal",
    ],
    strengths: [
      "Emotional depth",
      "Authenticity in relationships",
      "Loyalty and commitment",
      "Emotional awareness",
      "Capacity for intimacy",
    ],
    weaknesses: [
      "Codependency risk",
      "Emotional intensity",
      "Difficulty with solitude",
      "Merging identity with others",
    ],
    keyDimensions: [
      { dimension: "emotionalAlignment", importance: "primary", targetScore: 80 },
      { dimension: "authenticity", importance: "primary", targetScore: 80 },
      { dimension: "socialExpression", importance: "secondary", targetScore: 85 },
      { dimension: "selfAwareness", importance: "secondary", targetScore: 70 },
      { dimension: "externalInfluence", importance: "tertiary", targetScore: 65 },
    ],
    description: "You know yourself through meaningful relationships.",
    image: "/assets/identity types/the-lover.jpg",
    relatedTypes: ["the-caregiver", "the-creator"],
  },

  "the-masked": {
    id: "the-masked",
    name: "The Masked",
    tagline: "Intentionally hidden behind a strategic presentation.",
    tier: "conflicted",
    corePattern: "Intentional gap between external and internal reality.",
    psychologicalTraits: [
      "Performs strategically",
      "Knows true self but hides it",
      "Calculates presentation",
      "Protective of real identity",
      "Strategic compartmentalization",
    ],
    strengths: [
      "Social adaptability",
      "Strategic self-presentation",
      "Reading others",
      "Protection of self",
      "Professional effectiveness",
    ],
    weaknesses: [
      "Isolation from real connection",
      "Identity fatigue",
      "Authenticity deficit",
      "Loneliness",
      "Risk of losing real self",
    ],
    keyDimensions: [
      { dimension: "authenticity", importance: "primary", targetScore: 30 },
      { dimension: "socialExpression", importance: "primary", targetScore: 60 },
      { dimension: "externalInfluence", importance: "primary", targetScore: 70 },
      { dimension: "identityStability", importance: "secondary", targetScore: 45 },
      { dimension: "innerConsistency", importance: "secondary", targetScore: 25 },
    ],
    description: "You know who you really are, but you don't show it.",
    image: "/assets/identity types/the-masked.jpg",
    relatedTypes: ["the-shifter"],
  },

  "the-observer": {
    id: "the-observer",
    name: "The Observer",
    tagline: "You watch yourself with clarity but don't participate.",
    tier: "disconnected",
    corePattern: "Highly self-aware but detached. Watches self from distance.",
    psychologicalTraits: [
      "Metacognitive awareness",
      "Self-watching",
      "Detached from experience",
      "Analytical about behavior",
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
      "Isolation",
    ],
    keyDimensions: [
      { dimension: "selfAwareness", importance: "primary", targetScore: 80 },
      { dimension: "emotionalAlignment", importance: "primary", targetScore: 30 },
      { dimension: "innerConsistency", importance: "secondary", targetScore: 40 },
      { dimension: "socialExpression", importance: "secondary", targetScore: 25 },
      { dimension: "authenticity", importance: "tertiary", targetScore: 35 },
    ],
    description: "You see yourself clearly but experience life as a spectator.",
    image: "/assets/identity types/the-observer.jpg",
    relatedTypes: ["the-detached"],
  },

  "the-pioneer": {
    id: "the-pioneer",
    name: "The Pioneer",
    tagline: "Your identity is forged by breaking new ground.",
    tier: "growth",
    corePattern: "Identity defined by courage, innovation, and charting new paths.",
    psychologicalTraits: [
      "Courageous and bold",
      "Pioneering spirit",
      "Takes calculated risks",
      "Visionary thinking",
      "Action-oriented",
    ],
    strengths: [
      "Boldness and courage",
      "Innovation",
      "Action capacity",
      "Vision realization",
      "Resilience",
    ],
    weaknesses: [
      "Recklessness risk",
      "Impatience",
      "Forging ahead alone",
      "Difficulty with collaboration",
    ],
    keyDimensions: [
      { dimension: "decisionClarity", importance: "primary", targetScore: 75 },
      { dimension: "selfAwareness", importance: "primary", targetScore: 70 },
      { dimension: "authenticity", importance: "secondary", targetScore: 75 },
      { dimension: "identityStability", importance: "secondary", targetScore: 65 },
      { dimension: "externalInfluence", importance: "tertiary", targetScore: 30 },
    ],
    description: "You define yourself by what you dare to build.",
    image: "/assets/identity types/the-pioneer.jpg",
    relatedTypes: ["the-creator", "the-seeker"],
  },

  "the-rebuilder": {
    id: "the-rebuilder",
    name: "The Rebuilder",
    tagline: "Reconstructing after loss or disruption.",
    tier: "growth",
    corePattern: "Reconstructing after loss, crisis, or major change.",
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
    description: "You're consciously putting yourself back together.",
    image: "/assets/identity types/the-rebuilder.jpg",
    relatedTypes: ["the-becoming"],
  },

  "the-sage": {
    id: "the-sage",
    name: "The Sage",
    tagline: "Your identity is rooted in wisdom and understanding.",
    tier: "grounded",
    corePattern: "Identity defined by wisdom, reflection, and clear seeing.",
    psychologicalTraits: [
      "Contemplative",
      "Wisdom-seeking",
      "Deeply reflective",
      "Emotionally intelligent",
      "Clear-sighted",
    ],
    strengths: [
      "Wisdom",
      "Emotional clarity",
      "Non-judgment",
      "Deep understanding",
      "Calm presence",
    ],
    weaknesses: [
      "Detachment",
      "Over-thinking",
      "Difficulty with action",
      "Can appear cold",
      "Isolation",
    ],
    keyDimensions: [
      { dimension: "emotionalAlignment", importance: "primary", targetScore: 75 },
      { dimension: "selfAwareness", importance: "primary", targetScore: 85 },
      { dimension: "innerConsistency", importance: "secondary", targetScore: 80 },
      { dimension: "authenticity", importance: "secondary", targetScore: 75 },
      { dimension: "externalInfluence", importance: "tertiary", targetScore: 20 },
    ],
    description: "You understand yourself and the world with clarity.",
    image: "/assets/identity types/the-sage.jpg",
    relatedTypes: ["the-observer", "the-creator"],
  },

  "the-seeker": {
    id: "the-seeker",
    name: "The Seeker",
    tagline: "Actively exploring to find your authentic self.",
    tier: "growth",
    corePattern: "Intentionally exploring to discover authentic identity.",
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
      { dimension: "externalInfluence", importance: "primary", targetScore: 75 },
      { dimension: "authenticity", importance: "secondary", targetScore: 50 },
      { dimension: "decisionClarity", importance: "secondary", targetScore: 30 },
      { dimension: "identityStability", importance: "tertiary", targetScore: 35 },
    ],
    description: "You're on a journey to find the real you.",
    image: "/assets/identity types/the-seeker.jpg",
    relatedTypes: ["the-becoming", "the-pioneer"],
  },

  "the-shifter": {
    id: "the-shifter",
    name: "The Shifter",
    tagline: "Your identity changes with your environment.",
    tier: "conflicted",
    corePattern: "Unstable identity; shifts based on context.",
    psychologicalTraits: [
      "Chameleon-like adaptation",
      "Difficulty finding core self",
      "Reactive to relationships",
      "Context-dependent identity",
      "High external dependence",
    ],
    strengths: [
      "Adaptability",
      "Empathy through mirroring",
      "Social flexibility",
      "Can fit anywhere",
    ],
    weaknesses: [
      "No core sense of self",
      "Chronic confusion",
      "Dependent on feedback",
      "Difficulty with independence",
      "Exhausting adaptation",
    ],
    keyDimensions: [
      { dimension: "identityStability", importance: "primary", targetScore: 20 },
      { dimension: "externalInfluence", importance: "primary", targetScore: 85 },
      { dimension: "selfAwareness", importance: "secondary", targetScore: 35 },
      { dimension: "authenticity", importance: "secondary", targetScore: 25 },
      { dimension: "innerConsistency", importance: "tertiary", targetScore: 25 },
    ],
    description: "You become different people in different contexts.",
    image: "/assets/identity types/the-shifter.jpg",
    opposite: "the-anchored",
    relatedTypes: ["the-masked"],
  },

  "the-split": {
    id: "the-split",
    name: "The Split",
    tagline: "Aware of your contradictions, struggling to integrate them.",
    tier: "conflicted",
    corePattern: "Contradictory self-images; aware of internal conflict.",
    psychologicalTraits: [
      "Aware of contradictions",
      "Feels genuinely torn",
      "Internal debate constant",
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
      "Difficult relationships",
      "Exhausting conflict",
    ],
    keyDimensions: [
      { dimension: "selfAwareness", importance: "primary", targetScore: 70 },
      { dimension: "innerConsistency", importance: "primary", targetScore: 30 },
      { dimension: "identityStability", importance: "secondary", targetScore: 30 },
      { dimension: "emotionalAlignment", importance: "secondary", targetScore: 45 },
      { dimension: "decisionClarity", importance: "tertiary", targetScore: 35 },
    ],
    description: "You're aware you're genuinely conflicted.",
    image: "/assets/identity types/the-split.jpg",
    relatedTypes: ["the-becoming", "the-rebuilder"],
  },
};

export const IDENTITY_TIERS = {
  grounded: ["the-anchored", "the-caregiver", "the-creator", "the-lover", "the-sage"],
  conflicted: ["the-split", "the-masked", "the-shifter"],
  disconnected: ["the-detached", "the-observer"],
  growth: ["the-becoming", "the-rebuilder", "the-seeker", "the-pioneer"],
  performance: ["the-drifter"],
};

export const IDENTITY_COLORS: Record<IdentityType, string> = {
  "the-anchored": "bg-blue-500",
  "the-becoming": "bg-emerald-500",
  "the-caregiver": "bg-pink-500",
  "the-creator": "bg-purple-500",
  "the-detached": "bg-gray-500",
  "the-drifter": "bg-zinc-500",
  "the-lover": "bg-rose-500",
  "the-masked": "bg-indigo-500",
  "the-observer": "bg-cyan-500",
  "the-pioneer": "bg-orange-500",
  "the-rebuilder": "bg-amber-500",
  "the-sage": "bg-violet-500",
  "the-seeker": "bg-lime-500",
  "the-shifter": "bg-pink-500",
  "the-split": "bg-orange-500",
};
