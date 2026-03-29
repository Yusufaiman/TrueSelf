import { Dimension, PersonalityFamily } from "./types";

export interface PersonalityType {
  id: string;
  name: string;
  family: PersonalityFamily;
  tagline: string;
  shortDesc: string;
  deepDesc: string[];
  strengths: string[];
  blindSpots: string[];
  actions: string[];
  closingLine: string;
  dimensions: {
    primary: Dimension[];
    secondary: Dimension[];
  };
  formula: (scores: Record<Dimension, number>) => number;
  shadowType?: string;
  growthType?: string;
}

// All 12 dimensions for validation
const ALL_DIMENSIONS: Dimension[] = [
  "logic",
  "intuition",
  "reflection",
  "decisiveness",
  "emotionalSensitivity",
  "emotionalControl",
  "socialEnergy",
  "socialDepth",
  "discipline",
  "impulsiveness",
  "riskTolerance",
  "flexibility",
];

// Scoring formula helper - requires all 12 dimensions for proper normalization
const createFormula = (
  weights: Record<Dimension, number>,
): ((scores: Record<Dimension, number>) => number) => {
  // Validate that all 12 dimensions are provided
  const providedDimensions = Object.keys(weights) as Dimension[];
  const missingDimensions = ALL_DIMENSIONS.filter(
    (d) => !providedDimensions.includes(d),
  );
  if (missingDimensions.length > 0) {
    throw new Error(
      `createFormula expects all 12 dimensions, but only ${providedDimensions.length} are provided. ` +
        `Missing: ${missingDimensions.join(", ")}`,
    );
  }

  return (scores) => {
    let total = 0;
    let maxScore = 0;
    for (const [dimension, weight] of Object.entries(weights)) {
      const absWeight = Math.abs(weight);
      if (weight > 0) {
        total += (scores[dimension as Dimension] || 0) * weight;
      } else {
        total -= (scores[dimension as Dimension] || 0) * absWeight;
      }
      maxScore += 100 * absWeight;
    }
    return Math.max(0, Math.min(100, (total / maxScore) * 100));
  };
};

export const PERSONALITY_TYPES: Record<string, PersonalityType> = {
  // ==================== THINKERS (8) ====================
  "strategic-architect": {
    id: "strategic-architect",
    name: "The Strategic Architect",
    family: "thinkers",
    tagline: "You think deeply, plan carefully, and build systems.",
    shortDesc:
      "Your mind works in frameworks. You analyze situations carefully, anticipate consequences, and build solid strategies. You trust structure, logic, and your own careful thinking.",
    deepDesc: [
      "You naturally break complex problems into components and understand how they interact.",
      "Your strength is translating thinking into action through careful planning and execution.",
      "You weigh options, consider ramifications, and commit fully when you decide.",
      "The risk: becoming rigid when systems stop serving you.",
    ],
    strengths: [
      "Strategic thinking",
      "System design",
      "Long-term planning",
      "Logical consistency",
    ],
    blindSpots: ["Adaptability", "Emotional nuance", "Spontaneity"],
    actions: [
      "Use your strategic ability toward meaningful goals, not just organizing tasks.",
      "Regularly check if your systems still serve your actual values.",
      "Find one area where you practice flexibility to stay relevant.",
      "Share your plans with someone who thinks differently.",
    ],
    closingLine:
      "Your ability to see the whole system is a gift. Use it to build, not to freeze everything.",
    dimensions: {
      primary: ["logic", "reflection", "discipline"],
      secondary: ["decisiveness", "emotionalControl"],
    },
    formula: createFormula({
      logic: 0.3,
      reflection: 0.25,
      discipline: 0.25,
      decisiveness: 0.2,
      impulsiveness: -0.1,
      intuition: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Overthinking Prisoner",
    growthType: "The Flexible Strategist",
  },

  "silent-analyst": {
    id: "silent-analyst",
    name: "The Silent Analyst",
    family: "thinkers",
    tagline: "You observe, analyze, and understand deeply from the sidelines.",
    shortDesc:
      "You prefer to watch and think rather than talk and act. This gives you clarity others lack. You work best alone, where you can focus on understanding.",
    deepDesc: [
      "Your superpower is observation. You notice what others miss because you're paying attention.",
      "You don't need external validation for your ideas. Your internal analysis is your compass.",
      "Your words carry weight because you speak thoughtfully, not frequently.",
      "The challenge: your insights stay locked inside. The world doesn't benefit unless you share.",
    ],
    strengths: [
      "Deep analysis",
      "Pattern recognition",
      "Calm observation",
      "Precision",
    ],
    blindSpots: ["Communication", "Networking", "Social energy", "Visibility"],
    actions: [
      "Write down your insights. Sharing in writing first is more comfortable.",
      "Find one person who values your perspective. Build trust with them first.",
      "Practice speaking up even when thought isn't perfectly formed.",
      "Join smaller groups where your voice has space.",
    ],
    closingLine:
      "The world needs your clarity. You don't have to be loud to be heard.",
    dimensions: {
      primary: ["logic", "reflection"],
      secondary: ["intuition", "discipline"],
    },
    formula: createFormula({
      logic: 0.3,
      reflection: 0.3,
      socialEnergy: -0.2,
      emotionalControl: 0.2,
      intuition: 0,
      decisiveness: 0,
      emotionalSensitivity: 0,
      socialDepth: 0,
      discipline: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Hidden Potential",
    growthType: "The Emotional Navigator",
  },

  "precision-mind": {
    id: "precision-mind",
    name: "The Precision Mind",
    family: "thinkers",
    tagline:
      "Accuracy, clarity, and attention to detail define everything you do.",
    shortDesc:
      "You notice when things are wrong, unclear, or imprecise. Details matter to you—not obsessively, but because accuracy builds trust.",
    deepDesc: [
      "Precision is respect. You care about getting things right.",
      "You catch errors others miss. This makes you invaluable.",
      "Your communication is clear and direct. You say what you mean.",
      'The challenge: you can judge others for being "careless" when they have different priorities.',
    ],
    strengths: [
      "Attention to detail",
      "Quality control",
      "Clarity",
      "Reliability",
      "Standardization",
    ],
    blindSpots: ["Big-picture thinking", "Letting go", "Flexibility", "Speed"],
    actions: [
      "Focus precision where it matters most. Not everything deserves 100% detail.",
      'Practice "good enough" on low-stakes tasks.',
      "Coach others on accuracy instead of criticizing.",
      "Celebrate outcomes precision creates.",
    ],
    closingLine:
      "Your precision makes the world more reliable. Channel it where it creates the most good.",
    dimensions: {
      primary: ["logic", "discipline"],
      secondary: ["emotionalControl", "reflection"],
    },
    formula: createFormula({
      logic: 0.35,
      discipline: 0.3,
      emotionalControl: 0.2,
      flexibility: -0.15,
      intuition: 0,
      reflection: 0,
      decisiveness: 0,
      emotionalSensitivity: 0,
      socialEnergy: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
    }),
    shadowType: "The Hidden Potential",
    growthType: "The Emotional Navigator",
  },

  "pattern-decoder": {
    id: "pattern-decoder",
    name: "The Pattern Decoder",
    family: "thinkers",
    tagline: "You see connections and patterns others don't.",
    shortDesc:
      "Your mind naturally connects dots. You see relationships between seemingly unrelated things. This gives you creative insights and predictive ability.",
    deepDesc: [
      "You see the pattern underlying events, not just individual events.",
      "Your insights often come suddenly because your subconscious pattern-matches.",
      "You're creative because you recombine patterns in new ways.",
      "The challenge: your pattern insights can feel fuzzy to others.",
    ],
    strengths: [
      "Pattern recognition",
      "Creative synthesis",
      "Intuitive insight",
      "Prediction",
      "Connection-making",
    ],
    blindSpots: [
      "Communication",
      "Logical articulation",
      "Detail focus",
      "Following through",
    ],
    actions: [
      "Learn to communicate intuitive insights with supporting logic.",
      "Keep a pattern journal to refine patterns over time.",
      "Collaborate with detail-oriented people who can validate and implement.",
      "Verify with evidence before betting the farm on intuition.",
    ],
    closingLine:
      "Your ability to see patterns is a strength. Help others understand the connections you see.",
    dimensions: {
      primary: ["intuition", "reflection"],
      secondary: ["logic", "flexibility"],
    },
    formula: createFormula({
      intuition: 0.35,
      reflection: 0.25,
      logic: 0.2,
      flexibility: 0.2,
      decisiveness: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      discipline: 0,
      impulsiveness: 0,
      riskTolerance: 0,
    }),
    shadowType: "The Lost Direction",
    growthType: "The Cold Visionary",
  },

  "systems-builder": {
    id: "systems-builder",
    name: "The Systems Builder",
    family: "thinkers",
    tagline: "You design, organize, and optimize how things work.",
    shortDesc:
      "You see how systems could be better. You think in terms of inputs, outputs, feedback loops, and optimization. You build frameworks that work.",
    deepDesc: [
      "When you encounter a problem, you design a system to prevent it happening again.",
      "Your strength is taking chaos and creating order through system design.",
      "You enjoy the intellectual satisfaction of a well-designed system.",
      "The challenge: not everything needs a system. Sometimes simplicity is better.",
    ],
    strengths: [
      "System design",
      "Process optimization",
      "Logical organization",
      "Scalability",
      "Efficiency",
    ],
    blindSpots: ["Human factors", "Emotions", "Simplicity", "Flexibility"],
    actions: [
      "Remember that humans are part of the system. Don't optimize at the expense of wellbeing.",
      "Practice simplification.",
      "Test systems with people before finalizing.",
      "Share how your systems work.",
    ],
    closingLine:
      "Your ability to build systems creates stability. Make sure your systems serve humanity.",
    dimensions: {
      primary: ["logic", "discipline"],
      secondary: ["reflection", "decisiveness"],
    },
    formula: createFormula({
      logic: 0.35,
      discipline: 0.3,
      reflection: 0.2,
      emotionalSensitivity: -0.15,
      intuition: 0,
      decisiveness: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Inner Storm",
    growthType: "The Calm Adjuster",
  },

  "rational-commander": {
    id: "rational-commander",
    name: "The Rational Commander",
    family: "thinkers",
    tagline:
      "You see clearly, decide decisively, and move forward with purpose.",
    shortDesc:
      "You think straight and fast. You gather data, make decisions, and execute. You're not one to overthink. People follow your lead because you lead with clarity and conviction.",
    deepDesc: [
      "Your clarity of mind is rare. While others weigh options, you've decided and moved.",
      "You don't need everyone's buy-in to act. You lead by example.",
      "Your decisiveness inspires confidence, even when others are uncertain.",
      "The challenge: you can miss nuance. Some situations are genuinely ambiguous.",
    ],
    strengths: [
      "Decision-making",
      "Clarity",
      "Leadership",
      "Action-orientation",
      "Conviction",
    ],
    blindSpots: [
      "Consideration",
      "Listening",
      "Emotional intelligence",
      "Patience",
    ],
    actions: [
      "Practice asking for input before deciding.",
      "Slow down occasionally.",
      "Listen to people who think differently.",
      "Remember that not everyone thrives under directive leadership.",
    ],
    closingLine:
      "Your clarity drives progress. Make sure you're taking people with you.",
    dimensions: {
      primary: ["logic", "decisiveness"],
      secondary: ["discipline", "emotionalControl"],
    },
    formula: createFormula({
      logic: 0.3,
      decisiveness: 0.35,
      discipline: 0.2,
      reflection: -0.15,
      intuition: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Emotional Reactor",
    growthType: "The Emotional Navigator",
  },

  "cold-visionary": {
    id: "cold-visionary",
    name: "The Cold Visionary",
    family: "thinkers",
    tagline: "You see the future with clarity, logic as your guide.",
    shortDesc:
      "You combine logical thinking with intuitive vision. You see where things are heading based on trends and patterns. Your predictions usually come true because they're grounded in analysis plus foresight.",
    deepDesc: [
      "Your superpower is seeing ahead through both logic and intuition.",
      "Others might call you detached, but you're driven by vision.",
      "Your vision is trustworthy because it's based on analysis, not emotion.",
      "The challenge: people might not connect emotionally with your vision.",
    ],
    strengths: [
      "Vision",
      "Foresight",
      "Logical prediction",
      "Innovation",
      "Long-term thinking",
    ],
    blindSpots: [
      "Emotional connection",
      "Present-moment focus",
      "Human needs",
      "Relationship building",
    ],
    actions: [
      "Connect your vision to people's actual needs and hopes.",
      "Don't ignore the present. People live now.",
      "Find emotionally intelligent partners to translate your vision.",
      "Teach others to think like you.",
    ],
    closingLine: "Your vision shapes the future. Help others see what you see.",
    dimensions: {
      primary: ["logic", "intuition"],
      secondary: ["reflection", "decisiveness"],
    },
    formula: createFormula({
      logic: 0.3,
      intuition: 0.3,
      reflection: 0.2,
      emotionalSensitivity: -0.2,
      decisiveness: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      discipline: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Lost Direction",
    growthType: "The Sensitive Visionary",
  },

  "calculated-planner": {
    id: "calculated-planner",
    name: "The Calculated Planner",
    family: "thinkers",
    tagline: "You plan every step with thoughtful precision.",
    shortDesc:
      "Planning comes naturally to you. You work backward from goals, anticipating obstacles and strategizing solutions. You handle complexity by breaking it into manageable steps.",
    deepDesc: [
      "Your plans account for possibilities others don't imagine.",
      "You enjoy the intellectual work of planning as much as execution.",
      "Your approach reduces risk and increases likelihood of success.",
      "The challenge: life rarely follows the plan exactly.",
    ],
    strengths: [
      "Planning",
      "Anticipation",
      "Risk reduction",
      "Goal-setting",
      "Problem prevention",
    ],
    blindSpots: [
      "Spontaneity",
      "Flexibility",
      "Living in the moment",
      "Intuitive leaps",
    ],
    actions: [
      "Schedule time for spontaneity.",
      "Let others deviate from your plan. They might find better paths.",
      "Remember planning has diminishing returns.",
      "Build contingencies but don't endlessly.",
    ],
    closingLine:
      "Your planning makes success possible. Know when to execute and let go.",
    dimensions: {
      primary: ["discipline", "reflection"],
      secondary: ["logic", "decisiveness"],
    },
    formula: createFormula({
      discipline: 0.35,
      reflection: 0.3,
      logic: 0.2,
      flexibility: -0.15,
      intuition: 0,
      decisiveness: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
    }),
    shadowType: "The Overthinking Prisoner",
    growthType: "The Flexible Strategist",
  },

  // ==================== FEELERS (8) ====================
  "emotional-navigator": {
    id: "emotional-navigator",
    name: "The Emotional Navigator",
    family: "feelers",
    tagline: "You feel deeply and help others through their emotions.",
    shortDesc:
      "You experience emotions fully and understand them well. You're comfortable on the emotional landscape most people avoid. You help others process their feelings and find their way.",
    deepDesc: [
      "You can feel what others feel without being overwhelmed.",
      "You know how to sit with difficult emotions without fixing them.",
      "People open up to you because you genuinely understand.",
      "The challenge: you can absorb others' emotions. Boundaries are essential.",
    ],
    strengths: [
      "Emotional intelligence",
      "Empathy",
      "Active listening",
      "Understanding",
      "Emotional guidance",
    ],
    blindSpots: [
      "Logic",
      "Detachment",
      "Boundary-setting",
      "Facing hard truths",
    ],
    actions: [
      "Protect your emotional energy.",
      "Balance emotional understanding with logical analysis.",
      "Set clear boundaries about what you can do for others.",
      "Process your own emotions first.",
    ],
    closingLine:
      "Your emotional depth is a gift. Use it to help others grow, not to rescue them.",
    dimensions: {
      primary: ["emotionalSensitivity", "emotionalControl"],
      secondary: ["socialDepth", "intuition"],
    },
    formula: createFormula({
      emotionalSensitivity: 0.3,
      emotionalControl: 0.3,
      socialDepth: 0.25,
      logic: -0.15,
      intuition: 0,
      reflection: 0,
      decisiveness: 0,
      socialEnergy: 0,
      discipline: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Inner Storm",
    growthType: "The Emotional Alchemist",
  },

  "deep-feeler": {
    id: "deep-feeler",
    name: "The Deep Feeler",
    family: "feelers",
    tagline: "You feel things with profound intensity.",
    shortDesc:
      "Your emotions run deep. You experience joy more fully, pain more acutely, and meaning more profoundly. Your intensity is your strength and your challenge.",
    deepDesc: [
      "You don't just have feelings—you have experiences.",
      "Your depth is rare in a world that values efficiency over feeling.",
      "You understand subtlety and nuance others miss.",
      "The challenge: you need spaces where you can exist fully.",
    ],
    strengths: [
      "Intensity",
      "Emotional depth",
      "Meaningful connection",
      "Artistry",
      "Authenticity",
    ],
    blindSpots: [
      "Resilience",
      "Shallow interaction",
      "Emotional regulation",
      "Practical thinking",
    ],
    actions: [
      "Find people who match your depth.",
      "Develop coping strategies for your intensity.",
      "Don't apologize for feeling deeply.",
      "Learn to regulate without suppressing.",
    ],
    closingLine:
      "You feel the world more fully than most. That's not weakness—it's truth.",
    dimensions: {
      primary: ["emotionalSensitivity", "socialDepth"],
      secondary: ["reflection", "intuition"],
    },
    formula: createFormula({
      emotionalSensitivity: 0.4,
      socialDepth: 0.3,
      reflection: 0.2,
      emotionalControl: -0.1,
      logic: 0,
      intuition: 0,
      decisiveness: 0,
      socialEnergy: 0,
      discipline: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Inner Storm",
    growthType: "The Emotional Alchemist",
  },

  "empathic-observer": {
    id: "empathic-observer",
    name: "The Empathic Observer",
    family: "feelers",
    tagline: "You understand people by watching and feeling.",
    shortDesc:
      "You're naturally attuned to others' experiences without needing explanation. Your quiet presence is often more helpful than words. You support by truly seeing people.",
    deepDesc: [
      "You read people's reality like others read books.",
      "Your empathy is active, not passive.",
      "You prefer small groups where deep understanding is possible.",
      "The challenge: people might not realize you're supporting them.",
    ],
    strengths: [
      "Empathy",
      "Observation",
      "Understanding",
      "Presence",
      "Sensitivity",
    ],
    blindSpots: [
      "Speaking up",
      "Self-advocacy",
      "Large groups",
      "Assertiveness",
    ],
    actions: [
      "Help others understand how much you understand.",
      "Don't assume people know about your support.",
      "Practice self-advocacy.",
      "Find people who value quiet support.",
    ],
    closingLine:
      "Your empathy is powerful, even when silent. Trust that your presence is enough.",
    dimensions: {
      primary: ["emotionalSensitivity", "socialDepth"],
      secondary: ["reflection", "intuition"],
    },
    formula: createFormula({
      emotionalSensitivity: 0.3,
      socialDepth: 0.35,
      socialEnergy: -0.15,
      emotionalControl: 0.2,
      logic: 0,
      intuition: 0,
      reflection: 0,
      decisiveness: 0,
      discipline: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Drained Mind",
    growthType: "The Emotional Navigator",
  },

  "inner-storm": {
    id: "inner-storm",
    name: "The Inner Storm",
    family: "feelers",
    tagline: "Your emotions are intense and turbulent.",
    shortDesc:
      "You feel everything vividly and struggle to regulate. Your inner world is stormy. This gives you creative intensity and emotional authenticity.",
    deepDesc: [
      "Your emotions aren't a bug—they're a feature.",
      "You react strongly because situations genuinely move you.",
      "Your emotional honesty is refreshing to people tired of pretense.",
      "The challenge: you need strategies to move through storms.",
    ],
    strengths: [
      "Authenticity",
      "Intensity",
      "Creative passion",
      "Emotional honesty",
      "Aliveness",
    ],
    blindSpots: [
      "Regulation",
      "Considering others",
      "Long-term stability",
      "Patience",
    ],
    actions: [
      "Develop emotional regulation tools.",
      "Give yourself permission to feel and add structure to expression.",
      "Find outlets for intensity.",
      "Build support system that understands.",
    ],
    closingLine:
      "Your intensity is real and valid. Learn to live with it gracefully.",
    dimensions: {
      primary: ["emotionalSensitivity", "impulsiveness"],
      secondary: ["emotionalControl", "intuition"],
    },
    formula: createFormula({
      emotionalSensitivity: 0.35,
      impulsiveness: 0.25,
      emotionalControl: -0.2,
      discipline: -0.2,
      logic: 0,
      intuition: 0,
      reflection: 0,
      decisiveness: 0,
      socialEnergy: 0,
      socialDepth: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Emotional Reactor",
    growthType: "The Emotional Alchemist",
  },

  "gentle-anchor": {
    id: "gentle-anchor",
    name: "The Gentle Anchor",
    family: "feelers",
    tagline: "You provide calm stability and emotional grounding.",
    shortDesc:
      "You're steady and emotionally grounded. People feel calmer around you because your presence is soothing. You provide the safety others need to be vulnerable.",
    deepDesc: [
      "Your calmness is contagious.",
      "You feel things but process internally.",
      "Your steadiness is a gift, but don't mistake it for being unaffected.",
      "The challenge: people might depend on your stability so much they miss your needs.",
    ],
    strengths: [
      "Stability",
      "Emotional grounding",
      "Presence",
      "Calmness",
      "Reliability",
    ],
    blindSpots: [
      "Emotional expression",
      "Sharing feelings",
      "Vulnerability",
      "Receiving support",
    ],
    actions: [
      "Let others support you too.",
      "Share your feelings more than feels natural.",
      "Remember your calmness shouldn't suppress your needs.",
      "Build relationships where you're not always the stable one.",
    ],
    closingLine:
      "Your steadiness is a blessing. Make sure you're also being seen and supported.",
    dimensions: {
      primary: ["emotionalControl", "socialDepth"],
      secondary: ["emotionalSensitivity", "discipline"],
    },
    formula: createFormula({
      emotionalControl: 0.35,
      socialDepth: 0.3,
      discipline: 0.2,
      emotionalSensitivity: -0.15,
      logic: 0,
      intuition: 0,
      reflection: 0,
      decisiveness: 0,
      socialEnergy: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Hidden Potential",
    growthType: "The Deep Feeler",
  },

  "sensitive-visionary": {
    id: "sensitive-visionary",
    name: "The Sensitive Visionary",
    family: "feelers",
    tagline: "You see a better future through the lens of emotion and meaning.",
    shortDesc:
      "You combine emotional depth with a vision for something better. You dream with feeling. Your vision is imbued with purpose and meaning.",
    deepDesc: [
      "Your vision has heart. This is rare and powerful.",
      "You see possibilities emotionally and intellectually.",
      "Your sensitivity gives your vision authenticity.",
      "The challenge: your sensitivity can paralyze when reality doesn't match vision.",
    ],
    strengths: [
      "Vision with purpose",
      "Emotional authenticity",
      "Meaning-making",
      "Inspiration",
      "Passion",
    ],
    blindSpots: [
      "Pragmatism",
      "Accepting current reality",
      "Accepting imperfection",
      "Compromise",
    ],
    actions: [
      "Ground your vision with practical steps.",
      "Find partners who are logical where you're emotional.",
      "Accept that reality will be messier than your vision.",
      "Share your vision without needing everyone to feel it.",
    ],
    closingLine:
      "Your vision matters because it has heart. Ground it in action.",
    dimensions: {
      primary: ["intuition", "emotionalSensitivity"],
      secondary: ["socialDepth", "reflection"],
    },
    formula: createFormula({
      intuition: 0.3,
      emotionalSensitivity: 0.3,
      socialDepth: 0.2,
      logic: -0.2,
      reflection: 0,
      decisiveness: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      discipline: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Lost Direction",
    growthType: "The Emotional Alchemist",
  },

  "heart-led-soul": {
    id: "heart-led-soul",
    name: "The Heart-Led Soul",
    family: "feelers",
    tagline: "Your heart leads, and your choices follow.",
    shortDesc:
      "You make decisions from your emotional truth. Logic matters less than how something feels. Your authenticity is magnetic. People feel your genuineness.",
    deepDesc: [
      "You trust your emotions as a guide.",
      "Your decisions might look illogical but are grounded in values.",
      "Your emotional authenticity is rare and precious.",
      "The challenge: you can make impulsive decisions driven by surface feeling.",
    ],
    strengths: [
      "Authenticity",
      "Heart-centered values",
      "Emotional honesty",
      "Intuitive wisdom",
      "Passion",
    ],
    blindSpots: [
      "Logic",
      "Long-term thinking",
      "Practical consequences",
      "Others' perspectives",
    ],
    actions: [
      "Honor your heart but pause before big decisions.",
      "Develop logical thinking.",
      "Recognize when emotions are temporary versus deeply true.",
      "Find people who honor your guidance.",
    ],
    closingLine:
      "Your heart is wise. Make sure it's your deepest truth, not your surface fear, speaking.",
    dimensions: {
      primary: ["emotionalSensitivity", "intuition"],
      secondary: ["impulsiveness", "socialDepth"],
    },
    formula: createFormula({
      emotionalSensitivity: 0.35,
      intuition: 0.3,
      logic: -0.2,
      discipline: -0.15,
      reflection: 0,
      decisiveness: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Emotional Reactor",
    growthType: "The Emotional Alchemist",
  },

  "emotional-alchemist": {
    id: "emotional-alchemist",
    name: "The Emotional Alchemist",
    family: "feelers",
    tagline: "You transform pain and emotion into wisdom and meaning.",
    shortDesc:
      "You don't just feel deeply—you transmute emotion into insight and growth. You take pain and turn it into wisdom. Your journey creates unusual clarity.",
    deepDesc: [
      "Your emotional depth is combined with ability to work with it constructively.",
      "You understand that resistance to pain is the problem.",
      "Your hard-won wisdom is worth more than easy optimism.",
      "The challenge: you can't help others until you've done your own work.",
    ],
    strengths: [
      "Emotional processing",
      "Wisdom through experience",
      "Helping transformation",
      "Authenticity",
      "Growth mindset",
    ],
    blindSpots: [
      "Simplicity",
      'Being "normal"',
      "Lightness",
      "Accepting limits",
    ],
    actions: [
      "Remember your journey of processing is the transformative tool.",
      "Help others find their own transformation.",
      "Keep growing even when you've learned much.",
      "Find people who honor both darkness and light.",
    ],
    closingLine:
      "Your journey through emotion is your greatest teacher. Keep transforming.",
    dimensions: {
      primary: ["emotionalSensitivity", "emotionalControl"],
      secondary: ["reflection", "socialDepth"],
    },
    formula: createFormula({
      emotionalSensitivity: 0.3,
      emotionalControl: 0.3,
      reflection: 0.25,
      discipline: 0.15,
      logic: 0,
      intuition: 0,
      decisiveness: 0,
      socialEnergy: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Drained Mind",
    growthType: "The Deep Feeler",
  },

  // ==================== DOERS (8) ====================
  "relentless-executor": {
    id: "relentless-executor",
    name: "The Relentless Executor",
    family: "doers",
    tagline: "You commit fully and see things through.",
    shortDesc:
      "You're driven by goals and the satisfaction of completing them. Once you commit, you're relentless. People count on you because when you say you'll do something, it gets done.",
    deepDesc: [
      "You have an internal motor that drives you forward.",
      "You take responsibility seriously.",
      "Your follow-through is rare and valuable.",
      "The challenge: you can push yourself too hard.",
    ],
    strengths: [
      "Follow-through",
      "Goal achievement",
      "Reliability",
      "Persistence",
      "Responsibility",
    ],
    blindSpots: [
      "Rest",
      "Knowing when to quit",
      "Flexibility",
      "Enjoyment of process",
    ],
    actions: [
      "Build rest into your plans.",
      "Learn when to quit.",
      "Enjoy the journey, not just completion.",
      "Help others understand your drive.",
    ],
    closingLine:
      "Your relentlessness achieves things. Make sure you're achieving for yourself.",
    dimensions: {
      primary: ["discipline", "decisiveness"],
      secondary: ["emotionalControl", "riskTolerance"],
    },
    formula: createFormula({
      discipline: 0.35,
      decisiveness: 0.3,
      emotionalControl: 0.2,
      flexibility: -0.15,
      logic: 0,
      intuition: 0,
      reflection: 0,
      emotionalSensitivity: 0,
      socialEnergy: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
    }),
    shadowType: "The Burnout Survivor",
    growthType: "The Momentum Builder",
  },

  "action-taker": {
    id: "action-taker",
    name: "The Action Taker",
    family: "doers",
    tagline:
      "You move toward what matters without waiting for perfect conditions.",
    shortDesc:
      "You're the person who does things while others think. You don't wait for certainty. You move, learn, and adjust. Your bias toward action creates momentum.",
    deepDesc: [
      "You understand that action creates clarity.",
      "You're not reckless, but you're not paralyzed by perfectionism.",
      "Your willingness to start makes dreams real.",
      "The challenge: sometimes more thinking prevents costly mistakes.",
    ],
    strengths: [
      "Initiative",
      "Momentum",
      "Learning by doing",
      "Resilience",
      "Courage",
    ],
    blindSpots: ["Planning", "Reflection", "Caution", "Listening"],
    actions: [
      "Pause occasionally to reflect on learning.",
      "Plan for high-stakes decisions.",
      "Listen to cautious voices.",
      "Document your learning.",
    ],
    closingLine:
      "Your willingness to act changes things. Make sure you're learning as you go.",
    dimensions: {
      primary: ["decisiveness", "riskTolerance"],
      secondary: ["impulsiveness", "emotionalControl"],
    },
    formula: createFormula({
      decisiveness: 0.3,
      riskTolerance: 0.3,
      impulsiveness: 0.15,
      reflection: -0.25,
      logic: 0,
      intuition: 0,
      discipline: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      flexibility: 0,
    }),
    shadowType: "The Emotional Reactor",
    growthType: "The Momentum Builder",
  },

  "fearless-mover": {
    id: "fearless-mover",
    name: "The Fearless Mover",
    family: "doers",
    tagline: "You embrace risk and move toward what excites you.",
    shortDesc:
      "You're comfortable with risk in ways most people aren't. You evaluate risk and move forward anyway. Your fearlessness opens doors and shows others what's possible.",
    deepDesc: [
      "You see risk differently.",
      "Your fearlessness is contagious.",
      "You live a fuller life because you risk failure.",
      "The challenge: you might minimize legitimate dangers.",
    ],
    strengths: [
      "Risk-taking",
      "Courage",
      "Resilience",
      "Adaptability",
      "Expansiveness",
    ],
    blindSpots: [
      "Caution",
      "Preserving resources",
      "Considering consequences",
      "Patience",
    ],
    actions: [
      "Find advisors more cautious than you.",
      "Distinguish calculated risk from recklessness.",
      "Document your failures.",
      "Help others feel brave.",
    ],
    closingLine:
      "Your courage expands what's possible. Keep questioning what risks are truly worth taking.",
    dimensions: {
      primary: ["riskTolerance", "decisiveness"],
      secondary: ["impulsiveness", "emotionalControl"],
    },
    formula: createFormula({
      riskTolerance: 0.4,
      decisiveness: 0.25,
      emotionalControl: 0.2,
      reflection: -0.15,
      logic: 0,
      intuition: 0,
      discipline: 0,
      emotionalSensitivity: 0,
      socialEnergy: 0,
      socialDepth: 0,
      impulsiveness: 0,
      flexibility: 0,
    }),
    shadowType: "The Emotional Reactor",
    growthType: "The Momentum Builder",
  },

  "momentum-builder": {
    id: "momentum-builder",
    name: "The Momentum Builder",
    family: "doers",
    tagline: "You create forward motion and inspire others to follow.",
    shortDesc:
      "You build momentum on projects. You start energetically, draw others in, and create waves of progress. Your enthusiasm becomes contagious. You keep projects moving.",
    deepDesc: [
      "You know that starting is the hardest part.",
      "You inspire through your own energy.",
      "You see setbacks as temporary disruptions.",
      "The challenge: your momentum can override thoughtfulness.",
    ],
    strengths: [
      "Building momentum",
      "Inspiring others",
      "Energy management",
      "Leadership",
      "Forward movement",
    ],
    blindSpots: [
      "Patience",
      "Introspection",
      "Consolidating gains",
      "Noticing who gets left behind",
    ],
    actions: [
      "Check that momentum heads toward something meaningful.",
      "Wait sometimes.",
      "Ensure momentum doesn't leave people behind.",
      "Learn to match others' pace sometimes.",
    ],
    closingLine:
      "Your momentum changes things. Make sure you're building toward something that matters.",
    dimensions: {
      primary: ["socialEnergy", "decisiveness"],
      secondary: ["impulsiveness", "flexibility"],
    },
    formula: createFormula({
      socialEnergy: 0.3,
      decisiveness: 0.3,
      discipline: 0.2,
      reflection: -0.2,
      logic: 0,
      intuition: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Overthinking Prisoner",
    growthType: "The Relentless Executor",
  },

  "risk-runner": {
    id: "risk-runner",
    name: "The Risk Runner",
    family: "doers",
    tagline: "You thrive when you're pushing limits and testing boundaries.",
    shortDesc:
      "You're drawn to high stakes and high reward. You're comfortable in chaos that paralyzes others. You make fast decisions under pressure. Adventure calls you.",
    deepDesc: [
      "You're wired differently.",
      "You excel in high-stress situations.",
      "Your comfort makes you adaptable.",
      "The challenge: you can become addicted to risk.",
    ],
    strengths: [
      "Risk management",
      "Decision-making under pressure",
      "Adventure",
      "Adaptability",
      "Crisis management",
    ],
    blindSpots: [
      "Settling down",
      "Building stability",
      "Deep relationships",
      "Long-term contentment",
    ],
    actions: [
      "Find meaningful outlets for risk.",
      "Develop deep relationships.",
      "Learn to find meaning in stability.",
      'Consider what "boring" actually means.',
    ],
    closingLine:
      "Your comfort with risk is valuable. Use it to build, not just to seek thrills.",
    dimensions: {
      primary: ["riskTolerance", "impulsiveness"],
      secondary: ["socialEnergy", "decisiveness"],
    },
    formula: createFormula({
      riskTolerance: 0.35,
      impulsiveness: 0.3,
      decisiveness: 0.2,
      emotionalControl: -0.15,
      logic: 0,
      intuition: 0,
      reflection: 0,
      emotionalSensitivity: 0,
      discipline: 0,
      socialEnergy: 0,
      socialDepth: 0,
      flexibility: 0,
    }),
    shadowType: "The Hidden Potential",
    growthType: "The Rational Commander",
  },

  "fast-decider": {
    id: "fast-decider",
    name: "The Fast Decider",
    family: "doers",
    tagline: "You decide quickly and move forward before others catch up.",
    shortDesc:
      "You make decisions quickly while others gather information. Your speed gives you an advantage. You don't second-guess. Your decisiveness creates forward motion.",
    deepDesc: [
      "Your fast decision-making is an asset in fast-moving situations.",
      "You move with 70% information and learn as you go.",
      "Your confidence is infectious.",
      "The challenge: some decisions need time.",
    ],
    strengths: [
      "Fast decision-making",
      "Confidence",
      "Action-orientation",
      "Leadership",
      "Momentum",
    ],
    blindSpots: ["Deliberation", "Listening", "Changing course", "Patience"],
    actions: [
      "Force artificial delays on important decisions.",
      "Listen to people who decide slowly.",
      "Be willing to reverse decisions.",
      "Help others understand your process.",
    ],
    closingLine: "Your decisiveness creates movement. Use it wisely.",
    dimensions: {
      primary: ["decisiveness", "impulsiveness"],
      secondary: ["emotionalControl", "riskTolerance"],
    },
    formula: createFormula({
      decisiveness: 0.4,
      impulsiveness: 0.2,
      reflection: -0.25,
      emotionalControl: 0.15,
      logic: 0,
      intuition: 0,
      emotionalSensitivity: 0,
      discipline: 0,
      socialEnergy: 0,
      socialDepth: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Overthinking Prisoner",
    growthType: "The Calculated Planner",
  },

  "hustle-driver": {
    id: "hustle-driver",
    name: "The Hustle Driver",
    family: "doers",
    tagline:
      "You push hard toward your goals and inspire others through effort.",
    shortDesc:
      "You work hard and push hard. You believe in effort and grind. You're building through relentless work. Your hustle is contagious and inspiring.",
    deepDesc: [
      "You understand there's no substitute for hard work.",
      "You're energized by effort itself.",
      "You inspire others by example.",
      "The challenge: you can burn out.",
    ],
    strengths: [
      "Effort",
      "Persistence",
      "Work ethic",
      "Resilience",
      "Inspiration",
    ],
    blindSpots: ["Rest", "Enjoyment", "Efficiency", "Balance"],
    actions: [
      "Build rest into work.",
      "Learn to work smart.",
      "Find meaning beyond grind.",
      "Help others find their balance.",
    ],
    closingLine:
      "Your hustle builds real things. Make sure it builds a life you want to live.",
    dimensions: {
      primary: ["discipline", "riskTolerance"],
      secondary: ["socialEnergy", "decisiveness"],
    },
    formula: createFormula({
      discipline: 0.35,
      riskTolerance: 0.2,
      socialEnergy: 0.2,
      emotionalControl: 0.25,
      logic: 0,
      intuition: 0,
      reflection: 0,
      decisiveness: 0,
      emotionalSensitivity: 0,
      socialDepth: 0,
      impulsiveness: 0,
      flexibility: 0,
    }),
    shadowType: "The Burnout Survivor",
    growthType: "The Relentless Executor",
  },

  "bold-initiator": {
    id: "bold-initiator",
    name: "The Bold Initiator",
    family: "doers",
    tagline: "You boldly begin things that others only imagine.",
    shortDesc:
      "You have the audacity to start. You see something that needs doing and you begin it. You attract others through bold confidence. You're the founder who says \"let's do it.\"",
    deepDesc: [
      "Your superpower is initiation.",
      "You're not afraid to be first or fail publicly.",
      "Your boldness gives others permission.",
      "The challenge: you can start a lot without finishing.",
    ],
    strengths: [
      "Initiation",
      "Boldness",
      "Visionary thinking",
      "Attracting others",
      "Novelty",
    ],
    blindSpots: ["Follow-through", "Details", "Patience", "Finishing strongly"],
    actions: [
      "Team up with finishers.",
      "Build systems for follow-through.",
      "Celebrate others' completion work.",
      "Stay involved after excitement fades.",
    ],
    closingLine:
      "Your boldness starts things. Partner with others to see them through.",
    dimensions: {
      primary: ["riskTolerance", "impulsiveness"],
      secondary: ["socialEnergy", "intuition"],
    },
    formula: createFormula({
      riskTolerance: 0.3,
      impulsiveness: 0.25,
      socialEnergy: 0.25,
      discipline: -0.2,
      logic: 0,
      intuition: 0,
      reflection: 0,
      decisiveness: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      socialDepth: 0,
      flexibility: 0,
    }),
    shadowType: "The Hidden Potential",
    growthType: "The Momentum Builder",
  },

  // ==================== ADAPTERS (8) ====================
  "adaptive-chameleon": {
    id: "adaptive-chameleon",
    name: "The Adaptive Chameleon",
    family: "adapters",
    tagline: "You adjust seamlessly to any situation or group.",
    shortDesc:
      "You're socially savvy and adapt naturally. You can be yourself in many settings. You blend without losing yourself. Your flexibility is your strength.",
    deepDesc: [
      "You understand social dynamics intuitively.",
      "Your adaptability comes from genuine interest.",
      "You're comfortable almost everywhere.",
      "The challenge: people might not know who you really are.",
    ],
    strengths: [
      "Adaptability",
      "Social awareness",
      "Flexibility",
      "Comfort in most contexts",
      "Navigation",
    ],
    blindSpots: [
      "Authenticity",
      "Taking a stand",
      "Consistency",
      "Deep identity",
    ],
    actions: [
      "Find at least one context where you don't adapt.",
      "Build relationships that need consistency.",
      "Use your adaptability intentionally.",
      "Help others understand your core.",
    ],
    closingLine:
      "Your adaptability makes you valuable anywhere. Make sure someone knows the real you.",
    dimensions: {
      primary: ["flexibility", "socialDepth"],
      secondary: ["socialEnergy", "intuition"],
    },
    formula: createFormula({
      flexibility: 0.3,
      socialDepth: 0.3,
      socialEnergy: 0.2,
      discipline: -0.2,
      logic: 0,
      intuition: 0,
      reflection: 0,
      decisiveness: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      impulsiveness: 0,
      riskTolerance: 0,
    }),
    shadowType: "The Self Doubter",
    growthType: "The Balanced Mind",
  },

  "social-shapeshifter": {
    id: "social-shapeshifter",
    name: "The Social Shapeshifter",
    family: "adapters",
    tagline: "You shift naturally between social roles and contexts.",
    shortDesc:
      "You're socially fluid. You can be professional with colleagues, wild with friends, deep with loved ones, and entertaining with strangers. Your social intelligence is high.",
    deepDesc: [
      "You understand authenticity includes many facets.",
      "You're multi-dimensional, not fake.",
      "Your social energy lets you build bridges.",
      'The challenge: people wonder which version is "real."',
    ],
    strengths: [
      "Social fluidity",
      "Context awareness",
      "Connection-building",
      "Charm",
      "Bridge-building",
    ],
    blindSpots: [
      "Depth",
      "Loyalty to one group",
      "Consistency",
      "Taking a stand",
    ],
    actions: [
      "Build a few deep relationships.",
      "Be transparent about your fluidity.",
      "Remember shapeshifting serves connection.",
      "Find causes you're loyal to.",
    ],
    closingLine:
      "Your social fluidity is a gift. Let some people know your core underneath.",
    dimensions: {
      primary: ["flexibility", "socialEnergy"],
      secondary: ["intuition", "emotionalControl"],
    },
    formula: createFormula({
      flexibility: 0.3,
      socialEnergy: 0.35,
      intuition: 0.2,
      reflection: -0.15,
      logic: 0,
      discipline: 0,
      decisiveness: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
    }),
    shadowType: "Unknown",
    growthType: "The Balanced Mind",
  },

  "balanced-mind": {
    id: "balanced-mind",
    name: "The Balanced Mind",
    family: "adapters",
    tagline: "You live in the middle ground with ease.",
    shortDesc:
      "You're not extreme in any direction. You balance thinking and feeling, action and reflection. You're the stabilizing force because you don't get pulled to extremes.",
    deepDesc: [
      "You naturally find the middle path.",
      "Your balance makes you steady in chaos.",
      "You understand extreme positions.",
      "The challenge: you can look passive to extreme people.",
    ],
    strengths: [
      "Balance",
      "Stability",
      "Understanding perspectives",
      "Moderation",
      "Equilibrium",
    ],
    blindSpots: ["Passion", "Taking sides", "Decisive commitment", "Intensity"],
    actions: [
      "Remember balance doesn't mean not standing for something.",
      "Know what you stand for.",
      "Use your balance to help others center.",
      "Find something that ignites passion.",
    ],
    closingLine:
      "Your balance steadies others. Use it as a platform to move toward what matters.",
    dimensions: {
      primary: ["flexibility", "emotionalControl"],
      secondary: ["logic", "discipline"],
    },
    formula: createFormula({
      flexibility: 0.25,
      emotionalControl: 0.25,
      logic: 0.25,
      discipline: 0.25,
      intuition: 0,
      reflection: 0,
      decisiveness: 0,
      emotionalSensitivity: 0,
      socialEnergy: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
    }),
    shadowType: "Unknown",
    growthType: "The Strategic Architect",
  },

  "flow-seeker": {
    id: "flow-seeker",
    name: "The Flow Seeker",
    family: "adapters",
    tagline: "You seek states of harmony and effortless action.",
    shortDesc:
      "You're happiest in flow—when action and intention align perfectly. You don't force things. You move with what's natural. Your ease is alignment.",
    deepDesc: [
      "Struggle usually means misalignment.",
      "In flow you move mountains effortlessly.",
      "You're intuitive about when to push.",
      "The challenge: you avoid necessary struggle.",
    ],
    strengths: [
      "Flow states",
      "Ease",
      "Intuitive navigation",
      "Alignment",
      "Grace",
    ],
    blindSpots: [
      "Pushing through difficulty",
      "Discipline",
      "Taking hard stands",
      "Discomfort",
    ],
    actions: [
      "Know not all necessary things are in flow.",
      "Develop capacity to be uncomfortable.",
      "Help others find flow.",
      "Verify alignment with logic sometimes.",
    ],
    closingLine:
      "Your ease is beautiful. Make sure it's moving toward something that matters.",
    dimensions: {
      primary: ["flexibility", "intuition"],
      secondary: ["socialEnergy", "emotionalControl"],
    },
    formula: createFormula({
      flexibility: 0.35,
      intuition: 0.3,
      discipline: -0.2,
      reflection: -0.15,
      logic: 0,
      decisiveness: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
    }),
    shadowType: "The Hidden Potential",
    growthType: "The Momentum Builder",
  },

  "situational-thinker": {
    id: "situational-thinker",
    name: "The Situational Thinker",
    family: "adapters",
    tagline: "You assess each situation freshly without rigid rules.",
    shortDesc:
      "You don't approach life with one philosophy. Each situation is different. Your thinking is contextual and nuanced. You find smart solutions that fit reality.",
    deepDesc: [
      "Rigid rules miss important context.",
      "Your ability to assess freshly gives flexibility.",
      "You hold multiple perspectives simultaneously.",
      "The challenge: people see you as unprincipled.",
    ],
    strengths: [
      "Contextual thinking",
      "Nuance",
      "Problem-solving",
      "Flexibility",
      "Integration",
    ],
    blindSpots: [
      "Clear principles",
      "Consistency",
      "Standing firm",
      "Simplicity",
    ],
    actions: [
      "Clarify your core principles.",
      "Use contextual thinking to solve.",
      "Help others understand your values.",
      "Find situations where thinking creates good outcomes.",
    ],
    closingLine:
      "Your contextual thinking solves real problems. Help others understand your principles.",
    dimensions: {
      primary: ["flexibility", "reflection"],
      secondary: ["logic", "intuition"],
    },
    formula: createFormula({
      flexibility: 0.3,
      reflection: 0.3,
      logic: 0.2,
      intuition: 0.2,
      decisiveness: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      discipline: 0,
      impulsiveness: 0,
      riskTolerance: 0,
    }),
    shadowType: "Unknown",
    growthType: "The Calculated Planner",
  },

  "calm-adjuster": {
    id: "calm-adjuster",
    name: "The Calm Adjuster",
    family: "adapters",
    tagline: "You adjust calmly to change and help others find steady ground.",
    shortDesc:
      "Change doesn't rattle you. You adjust pragmatically and with calm. People feel steadier around you as you handle change with grace. You're the ballast.",
    deepDesc: [
      "You don't resist change.",
      "Your calmness helps others feel safe.",
      "You don't need things to stay the same.",
      "The challenge: you can seem indifferent.",
    ],
    strengths: [
      "Calm adjustment",
      "Change management",
      "Stability",
      "Pragmatism",
      "Modeling grace",
    ],
    blindSpots: [
      "Emotion in transition",
      "Advocating for preferences",
      "Showing care",
      "Resistance when needed",
    ],
    actions: [
      "Show that calm includes caring.",
      "Sometimes advocate for preferences.",
      "Help others feel your stability.",
      "Find something worth adjusting toward.",
    ],
    closingLine:
      "Your calm steadies others through change. Make sure you're also steering toward something.",
    dimensions: {
      primary: ["flexibility", "emotionalControl"],
      secondary: ["socialEnergy", "discipline"],
    },
    formula: createFormula({
      flexibility: 0.35,
      emotionalControl: 0.35,
      socialEnergy: 0.2,
      impulsiveness: -0.1,
      logic: 0,
      intuition: 0,
      reflection: 0,
      decisiveness: 0,
      emotionalSensitivity: 0,
      socialDepth: 0,
      discipline: 0,
      riskTolerance: 0,
    }),
    shadowType: "The Hidden Potential",
    growthType: "The Relentless Executor",
  },

  "flexible-strategist": {
    id: "flexible-strategist",
    name: "The Flexible Strategist",
    family: "adapters",
    tagline: "You strategy plan with flexibility built in.",
    shortDesc:
      "You think strategically but don't stay rigid. You build flexibility into plans. You commit to direction while adjusting path. Your approach both thoughtful and adaptive.",
    deepDesc: [
      "The best strategy includes flexibility.",
      "You commit to direction while staying flexible short-term.",
      "You pivot without losing vision.",
      "The challenge: people might not see your strategy.",
    ],
    strengths: [
      "Strategic thinking",
      "Flexibility",
      "Adaptive planning",
      "Long-term vision",
      "Real-world execution",
    ],
    blindSpots: [
      "Rigorous planning",
      "Following exact plan",
      "Clear predetermined paths",
      "Prediction",
    ],
    actions: [
      "Make your strategy explicit.",
      "Build teams that appreciate flexibility.",
      "Use flexibility to test and learn.",
      "Remember strategy still needs direction.",
    ],
    closingLine:
      "Your flexible strategy works in the real world. Lead with clarity and adaptability.",
    dimensions: {
      primary: ["flexibility", "logic"],
      secondary: ["reflection", "discipline"],
    },
    formula: createFormula({
      flexibility: 0.3,
      logic: 0.3,
      reflection: 0.2,
      discipline: 0.2,
      intuition: 0,
      decisiveness: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
    }),
    shadowType: "Unknown",
    growthType: "The Strategic Architect",
  },

  "quiet-observer": {
    id: "quiet-observer",
    name: "The Quiet Observer",
    family: "adapters",
    tagline: "You understand through observation and accept what you see.",
    shortDesc:
      "You notice things. You watch, understand, and accept without needing to change everything. Your quiet presence and understanding are valuable. You see the whole picture.",
    deepDesc: [
      "Your observation gives clarity that active people miss.",
      "You understand systems through patient watching.",
      "Your acceptance means clear sight.",
      "The challenge: useful insights stay locked inside.",
    ],
    strengths: [
      "Observation",
      "Systems understanding",
      "Clear sight",
      "Patience",
      "Wisdom",
    ],
    blindSpots: [
      "Speaking up",
      "Active involvement",
      "Changing things",
      "Visibility",
    ],
    actions: [
      "Share your observations.",
      "Remember observation only valuable if it leads somewhere.",
      "Get involved sometimes.",
      "Build trust with one person.",
    ],
    closingLine:
      "Your clear sight is precious. Let it guide your actions, not just your thoughts.",
    dimensions: {
      primary: ["reflection", "flexibility"],
      secondary: ["socialDepth", "intuition"],
    },
    formula: createFormula({
      reflection: 0.3,
      flexibility: 0.3,
      socialEnergy: -0.2,
      socialDepth: 0.2,
      logic: 0,
      intuition: 0,
      decisiveness: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      discipline: 0,
      impulsiveness: 0,
      riskTolerance: 0,
    }),
    shadowType: "The Drained Mind",
    growthType: "The Empathic Observer",
  },

  // ==================== STRUGGLERS (8) ====================
  "overthinking-prisoner": {
    id: "overthinking-prisoner",
    name: "The Overthinking Prisoner",
    family: "strugglers",
    tagline: "Your mind runs in circles when it should be moving.",
    shortDesc:
      "You think deeply but sometimes thinking becomes a trap. You analyze your analysis. Decisions paralyze you. Your mind is your prison. You know what's happening but can't stop.",
    deepDesc: [
      "Your reflection is a strength become a cage.",
      "You can see the pattern but seeing doesn't stop it.",
      'You hold yourself hostage with "what ifs."',
      "You're stuck because you confused thinking with deciding.",
    ],
    strengths: [
      "Thoughtfulness",
      "Pattern recognition",
      "Awareness of complexity",
      "Consideration",
    ],
    blindSpots: [
      "Decisive action",
      "Accepting uncertainty",
      "Moving forward",
      "Completion",
    ],
    actions: [
      "Set deadlines for decisions.",
      "Accept that no decision is perfect.",
      "Practice with 70% information.",
      "Track your overthinking.",
      "Find someone to help you move.",
    ],
    closingLine:
      "Your mind is intelligent. Use it to decide, not to imprison yourself.",
    dimensions: {
      primary: ["reflection", "decisiveness"],
      secondary: ["discipline", "impulsiveness"],
    },
    formula: createFormula({
      reflection: 0.35,
      decisiveness: -0.25,
      discipline: -0.15,
      logic: 0.25,
      intuition: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Strategic Architect",
    growthType: "The Rational Commander",
  },

  "self-doubter": {
    id: "self-doubter",
    name: "The Self Doubter",
    family: "strugglers",
    tagline: "You question yourself and your abilities constantly.",
    shortDesc:
      "You have abilities but self-doubt whispers you're not enough. You achieve things then minimize them. You're capable but don't feel capable. Your doubt is louder than evidence.",
    deepDesc: [
      "Your doubt isn't based on actual inability.",
      "Others see capability. You see limitations.",
      "You carry evidence of success but are unconvinced.",
      "This gap is closeable.",
    ],
    strengths: [
      "Humility",
      "Continuous improvement",
      "Awareness of gaps",
      "Growth mindset",
    ],
    blindSpots: [
      "Self-confidence",
      "Taking credit",
      "Trusting yourself",
      "Moving forward",
    ],
    actions: [
      "Track your wins explicitly.",
      "Question your doubt voice.",
      "Build identity beyond capability.",
      "Find supporters who see you.",
    ],
    closingLine: "Your mind is intelligent. Stop using it to attack yourself.",
    dimensions: {
      primary: ["emotionalSensitivity", "reflection"],
      secondary: ["decisiveness", "discipline"],
    },
    formula: createFormula({
      emotionalSensitivity: 0.3,
      reflection: 0.25,
      decisiveness: -0.25,
      emotionalControl: -0.2,
      logic: 0,
      intuition: 0,
      socialEnergy: 0,
      socialDepth: 0,
      discipline: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Deep Feeler",
    growthType: "The Emotional Alchemist",
  },

  "hidden-potential": {
    id: "hidden-potential",
    name: "The Hidden Potential",
    family: "strugglers",
    tagline: "You have much to offer but struggle to bring it forward.",
    shortDesc:
      "You sense potential within yourself but something blocks you from fully expressing it. Your ideas are good but execution feels hard. You're talented but hidden. Your gifts are locked inside.",
    deepDesc: [
      "You have real gifts that don't show.",
      "The block is internal, not external.",
      "Discipline and follow-through feel impossible.",
      "You're sabotaging your own expression.",
    ],
    strengths: ["Intuition", "Creativity", "Self-awareness", "Potential"],
    blindSpots: ["Discipline", "Follow-through", "Visibility", "Consistency"],
    actions: [
      "Identify what blocks you.",
      "Start small and build momentum.",
      "Find accountability.",
      "Celebrate tiny progress.",
    ],
    closingLine: "You have gifts. The world needs them. Stop hiding.",
    dimensions: {
      primary: ["intuition", "discipline"],
      secondary: ["impulsiveness", "reflection"],
    },
    formula: createFormula({
      intuition: 0.3,
      discipline: -0.35,
      impulsiveness: 0.2,
      riskTolerance: -0.15,
      logic: 0,
      reflection: 0,
      decisiveness: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      flexibility: 0,
    }),
    shadowType: "The Momentum Builder",
    growthType: "The Bold Initiator",
  },

  "inner-conflict": {
    id: "inner-conflict",
    name: "The Inner Conflict",
    family: "strugglers",
    tagline:
      "You feel pulled in opposite directions and struggle to integrate.",
    shortDesc:
      "You're contradictory inside. Part of you wants X, part wants Y. You feel torn. This creates paralysis or oscillation. You're at war with yourself. Integration feels impossible.",
    deepDesc: [
      "Your contradictions are real, not imaginary.",
      "You're not broken, just genuinely conflicted.",
      "Both sides are valid.",
      "Integration starts with accepting both.",
    ],
    strengths: [
      "Complexity awareness",
      "Nuance appreciation",
      "Multiple perspectives",
      "Depth",
    ],
    blindSpots: ["Decision-making", "Commitment", "Peace", "Simplicity"],
    actions: [
      "Stop trying to choose. Find integration.",
      "Name both sides clearly.",
      "Find people who get your complexity.",
      "Seek professional support if stuck long-term.",
    ],
    closingLine:
      "Your conflict is real. Stop trying to choose. Find integration instead.",
    dimensions: {
      primary: ["reflection", "emotionalSensitivity"],
      secondary: ["emotionalSensitivity", "logic"],
    },
    formula: createFormula({
      reflection: 0.3,
      emotionalSensitivity: 0.25,
      logic: 0.25,
      flexibility: 0.2,
      intuition: 0,
      decisiveness: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      discipline: 0,
      impulsiveness: 0,
      riskTolerance: 0,
    }),
    shadowType: "Unknown",
    growthType: "The Balanced Mind",
  },

  "burnout-survivor": {
    id: "burnout-survivor",
    name: "The Burnout Survivor",
    family: "strugglers",
    tagline: "You pushed hard and paid the price for it.",
    shortDesc:
      "You gave everything and hit a wall. You're aware now that your relentless approach doesn't work. You're grieving what you lost. Recovery is happening but it's slow.",
    deepDesc: [
      "Burnout taught you something important.",
      "You're rebuilding differently now.",
      "Rest feels foreign but necessary.",
      "You're learning to live at a sustainable pace.",
    ],
    strengths: [
      "Hard-earned wisdom",
      "Changed perspective",
      "Resilience",
      "Authenticity",
    ],
    blindSpots: ["Trust in pace", "Fear of relapse", "Joy", "Confidence"],
    actions: [
      "Honor your recovery timeline.",
      "Set non-negotiable boundaries.",
      "Find sustainable practices.",
      "Help others avoid your path.",
    ],
    closingLine:
      "Your burnout was painful. But you're learning to live differently. That's growth.",
    dimensions: {
      primary: ["discipline", "emotionalControl"],
      secondary: ["emotionalSensitivity", "reflection"],
    },
    formula: createFormula({
      discipline: 0.3,
      emotionalControl: -0.2,
      emotionalSensitivity: 0.3,
      socialEnergy: -0.2,
      logic: 0,
      intuition: 0,
      reflection: 0,
      decisiveness: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Relentless Executor",
    growthType: "The Calm Adjuster",
  },

  "lost-direction": {
    id: "lost-direction",
    name: "The Lost Direction",
    family: "strugglers",
    tagline: "You sense you should be somewhere, but you don't know where.",
    shortDesc:
      "Your intuition says \"something's wrong\" but logic can't explain it. You're untethered. You have abilities but no clear direction. You're searching for your path.",
    deepDesc: [
      "Your confusion is real.",
      "Direction is possible when you stop searching.",
      "Your intuition has been right. Listen to it.",
      "Clarity comes through action, not thinking.",
    ],
    strengths: ["Self-awareness", "Intuition", "Openness", "Adaptability"],
    blindSpots: [
      "Decisiveness",
      "Commitment",
      "Clear goal-setting",
      "Confidence",
    ],
    actions: [
      "Stop waiting for perfect clarity.",
      "Name what matters to you.",
      "Take small steps in one direction.",
      "Trust your intuitive pulls.",
    ],
    closingLine: "You're not lost. You're finding your way. Trust the journey.",
    dimensions: {
      primary: ["intuition", "decisiveness"],
      secondary: ["discipline", "reflection"],
    },
    formula: createFormula({
      intuition: 0.3,
      decisiveness: -0.3,
      discipline: -0.2,
      reflection: 0.2,
      logic: 0,
      emotionalSensitivity: 0,
      emotionalControl: 0,
      socialEnergy: 0,
      socialDepth: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Cold Visionary",
    growthType: "The Sensitive Visionary",
  },

  "emotional-reactor": {
    id: "emotional-reactor",
    name: "The Emotional Reactor",
    family: "strugglers",
    tagline: "Your emotions drive your reactions in ways you later regret.",
    shortDesc:
      "You feel big emotions and react immediately. You say or do things in the heat of the moment that damage relationships. You know the pattern but can't seem to stop it.",
    deepDesc: [
      "Your emotions are real and valid.",
      "Your reactions don't have to be automatic.",
      "You can feel and still choose response.",
      "Change is possible with awareness and practice.",
    ],
    strengths: ["Emotional honesty", "Intensity", "Passion", "Authenticity"],
    blindSpots: [
      "Regulation",
      "Considering others",
      "Delayed response",
      "Repair",
    ],
    actions: [
      "Learn to pause between feeling and acting.",
      "Develop regulation practices.",
      "Repair relationships when you react.",
      "Track your triggers.",
    ],
    closingLine:
      "You feel deeply. Learn to respond thoughtfully. That's maturity.",
    dimensions: {
      primary: ["emotionalSensitivity", "emotionalControl"],
      secondary: ["impulsiveness", "reflection"],
    },
    formula: createFormula({
      emotionalSensitivity: 0.35,
      emotionalControl: -0.25,
      impulsiveness: 0.25,
      discipline: -0.15,
      logic: 0,
      intuition: 0,
      reflection: 0,
      decisiveness: 0,
      socialEnergy: 0,
      socialDepth: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Inner Storm",
    growthType: "The Gentle Anchor",
  },

  "drained-mind": {
    id: "drained-mind",
    name: "The Drained Mind",
    family: "strugglers",
    tagline: "You feel depleted despite plenty of rest.",
    shortDesc:
      "You care deeply and feel everything. Constant emotional work with others leaves you empty. You feel responsible for their wellbeing. You're depleted not from activity but from emotional load.",
    deepDesc: [
      "Your empathy is a strength but an exhausting one.",
      "You're taking on emotional responsibility that isn't yours.",
      "Depletion is a sign you need boundaries.",
      "Your feelings matter as much as others'.",
    ],
    strengths: ["Empathy", "Care", "Awareness", "Emotional depth"],
    blindSpots: ["Boundaries", "Self-care", "Saying no", "Receiving help"],
    actions: [
      "Set firm emotional boundaries.",
      "Name what isn't your responsibility.",
      "Prioritize your own wellbeing.",
      "Find people who support you.",
    ],
    closingLine:
      "You can be caring and also take care of yourself. Both matter.",
    dimensions: {
      primary: ["emotionalSensitivity", "socialDepth"],
      secondary: ["emotionalControl", "socialEnergy"],
    },
    formula: createFormula({
      emotionalSensitivity: 0.35,
      socialDepth: 0.3,
      emotionalControl: -0.15,
      socialEnergy: -0.2,
      logic: 0,
      intuition: 0,
      reflection: 0,
      decisiveness: 0,
      discipline: 0,
      impulsiveness: 0,
      riskTolerance: 0,
      flexibility: 0,
    }),
    shadowType: "The Deep Feeler",
    growthType: "The Gentle Anchor",
  },
};

// Get list of all personality types
export const getAllPersonalityTypes = (): PersonalityType[] => {
  return Object.values(PERSONALITY_TYPES);
};

// Get specific personality type by ID
export const getPersonalityType = (id: string): PersonalityType | undefined => {
  return PERSONALITY_TYPES[id];
};
