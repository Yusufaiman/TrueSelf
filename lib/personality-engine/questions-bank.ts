/**
 * 40-Question Bank for "Your Core Personality Type" Test
 *
 * Questions are divided into 5 phases:
 * Phase 1: Thinking Style (Q1–Q8)
 * Phase 2: Decision Making (Q9–Q16)
 * Phase 3: Emotional Response (Q17–Q24)
 * Phase 4: Social Behavior (Q25–Q32)
 * Phase 5: Self-Control & Habits (Q33–Q40)
 */

export interface Question {
  id: number;
  text: string;
  weights: {
    logic?: number;
    intuition?: number;
    reflection?: number;
    decisiveness?: number;
    emotionalSensitivity?: number;
    emotionalControl?: number;
    socialEnergy?: number;
    socialDepth?: number;
    discipline?: number;
    impulsiveness?: number;
    riskTolerance?: number;
    flexibility?: number;
  };
  reverse: boolean;
}

export const QUESTIONS_BANK: Question[] = [
  // ==================== PHASE 1: THINKING STYLE ====================
  {
    id: 1,
    text: "I prefer to understand things deeply rather than accept them at face value.",
    weights: { reflection: 2, intuition: 1 },
    reverse: false,
  },
  {
    id: 2,
    text: "I often act first and think about the consequences later.",
    weights: { impulsiveness: 2, reflection: 1 },
    reverse: true,
  },
  {
    id: 3,
    text: "I see patterns and connections that others don't notice.",
    weights: { intuition: 2, logic: 1 },
    reverse: false,
  },
  {
    id: 4,
    text: "I trust facts and data more than gut feelings.",
    weights: { logic: 2, intuition: 1 },
    reverse: false,
  },
  {
    id: 5,
    text: "I frequently question my own thinking and assumptions.",
    weights: { reflection: 2, decisiveness: -1 },
    reverse: false,
  },
  {
    id: 6,
    text: "I would rather apply proven methods than try untested approaches.",
    weights: { logic: 1, flexibility: -1 },
    reverse: false,
  },
  {
    id: 7,
    text: "I find it easy to get lost in my own thoughts.",
    weights: { reflection: 2, socialEnergy: -1 },
    reverse: false,
  },
  {
    id: 8,
    text: "I naturally break complex problems into smaller, manageable pieces.",
    weights: { logic: 2, discipline: 1 },
    reverse: false,
  },

  // ==================== PHASE 2: DECISION MAKING ====================
  {
    id: 9,
    text: "I make decisions quickly without needing all the information.",
    weights: { decisiveness: 2, impulsiveness: 1 },
    reverse: false,
  },
  {
    id: 10,
    text: "I consider many different perspectives before making a choice.",
    weights: { reflection: 2, flexibility: 1 },
    reverse: false,
  },
  {
    id: 11,
    text: "Once I've decided something, I commit fully to that decision.",
    weights: { decisiveness: 2, discipline: 1 },
    reverse: false,
  },
  {
    id: 12,
    text: "I often second-guess my decisions after I've made them.",
    weights: { reflection: 2, decisiveness: -1 },
    reverse: true,
  },
  {
    id: 13,
    text: "I'm comfortable taking risks if the potential reward is high.",
    weights: { riskTolerance: 2, decisiveness: 1 },
    reverse: false,
  },
  {
    id: 14,
    text: "I prefer to plan things out carefully before taking action.",
    weights: { discipline: 2, reflection: 1 },
    reverse: false,
  },
  {
    id: 15,
    text: "I adapt my decisions based on new information that comes up.",
    weights: { flexibility: 2, decisiveness: 1 },
    reverse: false,
  },
  {
    id: 16,
    text: "I trust my intuition more than I trust analysis.",
    weights: { intuition: 2, logic: -1 },
    reverse: false,
  },

  // ==================== PHASE 3: EMOTIONAL RESPONSE ====================
  {
    id: 17,
    text: "I feel emotions intensely and often let them show.",
    weights: { emotionalSensitivity: 2, emotionalControl: -1 },
    reverse: false,
  },
  {
    id: 18,
    text: "I stay calm even when situations are stressful or chaotic.",
    weights: { emotionalControl: 2, emotionalSensitivity: -1 },
    reverse: false,
  },
  {
    id: 19,
    text: "I notice and absorb the moods and feelings of people around me.",
    weights: { emotionalSensitivity: 2, socialDepth: 1 },
    reverse: false,
  },
  {
    id: 20,
    text: "I prefer to keep my feelings private rather than share them openly.",
    weights: { emotionalControl: 2, socialDepth: -1 },
    reverse: false,
  },
  {
    id: 21,
    text: "Small setbacks or criticisms affect my mood significantly.",
    weights: { emotionalSensitivity: 2, emotionalControl: -1 },
    reverse: true,
  },
  {
    id: 22,
    text: "I process my emotions best by talking about them with others.",
    weights: { socialDepth: 2, emotionalControl: 1 },
    reverse: false,
  },
  {
    id: 23,
    text: "I often find myself getting stressed about things that might never happen.",
    weights: { reflection: 2, emotionalControl: -1 },
    reverse: true,
  },
  {
    id: 24,
    text: "I feel a strong sense of purpose and meaning in what I do.",
    weights: { intuition: 1, emotionalSensitivity: 1, socialDepth: 1 },
    reverse: false,
  },

  // ==================== PHASE 4: SOCIAL BEHAVIOR ====================
  {
    id: 25,
    text: "I enjoy meeting new people and being in social situations.",
    weights: { socialEnergy: 2, flexibility: 1 },
    reverse: false,
  },
  {
    id: 26,
    text: "I prefer deep, one-on-one conversations to large group settings.",
    weights: { socialDepth: 2, socialEnergy: -1 },
    reverse: false,
  },
  {
    id: 27,
    text: "I'm comfortable being the center of attention.",
    weights: { socialEnergy: 2, emotionalControl: 1 },
    reverse: false,
  },
  {
    id: 28,
    text: "I naturally understand other people's perspectives without them explaining.",
    weights: { socialDepth: 2, intuition: 1 },
    reverse: false,
  },
  {
    id: 29,
    text: "Group activities energize me.",
    weights: { socialEnergy: 2, emotionalControl: 1 },
    reverse: false,
  },
  {
    id: 30,
    text: "I care deeply about how my actions affect others.",
    weights: { socialDepth: 2, emotionalSensitivity: 1 },
    reverse: false,
  },
  {
    id: 31,
    text: "I often feel misunderstood by the people around me.",
    weights: { socialDepth: 1, emotionalSensitivity: 1, socialEnergy: -1 },
    reverse: true,
  },
  {
    id: 32,
    text: "I'm good at adjusting my behavior to fit different social contexts.",
    weights: { flexibility: 2, socialEnergy: 1 },
    reverse: false,
  },

  // ==================== PHASE 5: SELF-CONTROL & HABITS ====================
  {
    id: 33,
    text: "I have strong self-discipline and follow through on my commitments.",
    weights: { discipline: 2, decisiveness: 1 },
    reverse: false,
  },
  {
    id: 34,
    text: "I often act on impulses without considering the long-term consequences.",
    weights: { impulsiveness: 2, discipline: -1 },
    reverse: true,
  },
  {
    id: 35,
    text: "I enjoy taking on challenges and pushing my limits.",
    weights: { riskTolerance: 2, decisiveness: 1 },
    reverse: false,
  },
  {
    id: 36,
    text: "I prefer stability and predictability in my life.",
    weights: { discipline: 1, flexibility: -1 },
    reverse: false,
  },
  {
    id: 37,
    text: "I struggle to maintain consistency with my habits and goals.",
    weights: { discipline: -2, impulsiveness: 1 },
    reverse: true,
  },
  {
    id: 38,
    text: "I adapt easily when my plans change unexpectedly.",
    weights: { flexibility: 2, discipline: -1 },
    reverse: false,
  },
  {
    id: 39,
    text: "I set high expectations for myself and others.",
    weights: { discipline: 2, logic: 1 },
    reverse: false,
  },
  {
    id: 40,
    text: "I'm more comfortable with spontaneity than with structure.",
    weights: { impulsiveness: 1, flexibility: 2, discipline: -1 },
    reverse: false,
  },
];
