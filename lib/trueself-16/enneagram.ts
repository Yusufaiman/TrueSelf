import type { EnneagramCode, TypeCode } from "./types";

export type EnneagramExpression = {
  code: EnneagramCode;
  title: string;
  description: string;
  focus: string[];
};

export type EnneagramCorePattern = {
  drive: string;
  fear: string;
  decision: string;
  pressure: string;
  socialStyle: string;
  contribution: string[];
};

export const ENNEAGRAM_CORE_PATTERNS: Record<EnneagramCode, EnneagramCorePattern> = {
  "1w9": {
    drive: "Responsibility, correctness, and internal consistency",
    fear: "Being wrong, careless, or out of alignment with their standards",
    decision: "Principle and standards",
    pressure: "May become critical, tense, or quietly resentful",
    socialStyle: "Reserved, composed, and standards-aware",
    contribution: ["Correctness", "Composure", "Improvement", "Internal standards"],
  },
  "1w2": {
    drive: "Doing what is right while being useful to others",
    fear: "Failing others or falling short of responsibility",
    decision: "Duty and improvement",
    pressure: "May become over-responsible or corrective",
    socialStyle: "Helpful, principled, and duty-aware",
    contribution: ["Responsibility", "Service", "Improvement", "Moral clarity"],
  },
  "2w1": {
    drive: "To support, protect, and be meaningfully helpful",
    fear: "Being unneeded, selfish, or failing to care properly",
    decision: "Care and responsibility",
    pressure: "May over-give, self-neglect, or become quietly disappointed",
    socialStyle: "Warm, supportive, and conscientious",
    contribution: ["Care", "Service", "Attunement", "Responsibility"],
  },
  "2w3": {
    drive: "To connect, uplift, and have positive influence",
    fear: "Being unwanted, unnoticed, or unable to create value for people",
    decision: "Relational impact",
    pressure: "May over-adapt, perform helpfulness, or seek reassurance",
    socialStyle: "Expressive, encouraging, and people-oriented",
    contribution: ["Warmth", "Connection", "Influence", "Encouragement"],
  },
  "3w2": {
    drive: "Achievement, recognition, and interpersonal effectiveness",
    fear: "Being unsuccessful, overlooked, or not valued for contribution",
    decision: "Impact and reputation",
    pressure: "May become image-conscious, hurried, or approval-driven",
    socialStyle: "Polished, engaging, and goal-focused",
    contribution: ["Achievement", "Influence", "Adaptability", "Visible impact"],
  },
  "3w4": {
    drive: "Achievement, distinction, and meaningful accomplishment",
    fear: "Being insignificant, ordinary, or failing to become something valuable",
    decision: "Outcome and identity",
    pressure: "May become competitive, self-critical, or overly identified with success",
    socialStyle: "Ambitious, focused, and selectively expressive",
    contribution: ["Ambition", "Distinction", "Execution", "Personal vision"],
  },
  "4w3": {
    drive: "Authentic identity with visible expression",
    fear: "Being emotionally unseen, ordinary, or without a meaningful identity",
    decision: "Authenticity and expression",
    pressure: "May become self-comparing, intense, or emotionally performative",
    socialStyle: "Expressive, personal, and impression-aware",
    contribution: ["Authenticity", "Expression", "Identity", "Creative impact"],
  },
  "4w5": {
    drive: "Authenticity, emotional depth, and private meaning",
    fear: "Having no distinct identity or being misunderstood at the core",
    decision: "Inner truth",
    pressure: "May withdraw, intensify feelings, or over-identify with difference",
    socialStyle: "Private, reflective, and emotionally nuanced",
    contribution: ["Depth", "Originality", "Inner meaning", "Sensitivity"],
  },
  "5w4": {
    drive: "Understanding, independence, and original insight",
    fear: "Being overwhelmed, incapable, or intellectually dependent",
    decision: "Conceptual understanding",
    pressure: "May withdraw, over-analyze, or detach from practical demands",
    socialStyle: "Independent, private, and intellectually individualistic",
    contribution: ["Knowledge", "Originality", "Depth", "Independence"],
  },
  "5w6": {
    drive: "Competence, verification, and self-sufficiency",
    fear: "Being unprepared, incapable, or without enough knowledge to handle reality",
    decision: "Analysis and evidence",
    pressure: "May become cautious, detached, or trapped in research",
    socialStyle: "Analytical, observant, and reserved",
    contribution: ["Competence", "Preparation", "Analysis", "Technical confidence"],
  },
  "6w5": {
    drive: "Security, preparedness, and dependable understanding",
    fear: "Being unsupported, unprepared, or unable to handle what happens",
    decision: "Risk and trust",
    pressure: "May overthink risks, seek certainty, or hesitate before acting",
    socialStyle: "Loyal, careful, and questioning",
    contribution: ["Security seeking", "Risk awareness", "Preparation", "Analytical caution"],
  },
  "6w7": {
    drive: "Security, belonging, and practical support",
    fear: "Being unsupported, unsafe, or disconnected from trusted people",
    decision: "Trust and practical reassurance",
    pressure: "May become scattered, anxious, or reassurance-seeking",
    socialStyle: "Loyal, sociable, and contingency-aware",
    contribution: ["Loyalty", "Belonging", "Warm caution", "Practical optimism"],
  },
  "7w6": {
    drive: "Freedom, possibility, connection, and options",
    fear: "Being trapped, limited, or stuck in emotional heaviness",
    decision: "Opportunity and optionality",
    pressure: "May become scattered, avoidant, or constantly option-seeking",
    socialStyle: "Energetic, curious, and socially responsive",
    contribution: ["Possibility", "Variety", "Optimism", "Social momentum"],
  },
  "7w8": {
    drive: "Freedom, stimulation, independence, and immediate possibility",
    fear: "Being controlled, limited, or deprived of options",
    decision: "Opportunity and autonomy",
    pressure: "May become impulsive, restless, or resistant to constraint",
    socialStyle: "Bold, energetic, and assertive",
    contribution: ["Freedom", "Action", "Assertiveness", "Experimentation"],
  },
  "8w7": {
    drive: "Autonomy, strength, intensity, and control over outcomes",
    fear: "Being controlled, weak, dependent, or unable to protect what matters",
    decision: "Power and direct action",
    pressure: "May become confrontational, impatient, or overly forceful",
    socialStyle: "Direct, protective, and dominant",
    contribution: ["Autonomy", "Force", "Boundary testing", "Direct challenge"],
  },
  "8w9": {
    drive: "Autonomy, control, steadiness, and protection",
    fear: "Being controlled, disrupted, or forced into vulnerability",
    decision: "Control and stability",
    pressure: "May become stubborn, withdrawn, or quietly immovable",
    socialStyle: "Firm, steady, and self-contained",
    contribution: ["Autonomy", "Composure", "Control", "Protective stability"],
  },
  "9w1": {
    drive: "Peace, inner stability, and aligned harmony",
    fear: "Conflict, disconnection, or being pushed out of internal steadiness",
    decision: "Harmony and quiet principle",
    pressure: "May avoid conflict, numb preferences, or delay needed action",
    socialStyle: "Gentle, receptive, and stabilizing",
    contribution: ["Harmony", "Patience", "Perspective", "Gentle standards"],
  },
  "9w8": {
    drive: "Peace, autonomy, and low-pressure independence",
    fear: "Being controlled, disturbed, or pulled into unwanted conflict",
    decision: "Comfort and personal boundaries",
    pressure: "May disengage, become stubborn, or quietly resist pressure",
    socialStyle: "Relaxed, grounded, and surprisingly firm",
    contribution: ["Calm", "Autonomy", "Steadiness", "Boundary strength"],
  },
};

export const ENNEAGRAM_EXPRESSIONS_BY_TYPE: Record<TypeCode, EnneagramExpression[]> = {
  INTJ: [
    {
      code: "5w6",
      title: "Strategic Architect",
      description:
        "Seeks mastery through knowledge, preparation, and independent analysis. Often builds competence before acting and prefers well-understood systems.",
      focus: ["Mastery", "Preparation", "Analysis"],
    },
    {
      code: "5w4",
      title: "Independent Visionary",
      description:
        "Combines analytical depth with originality and personal insight. Often seeks understanding that feels both intellectually rigorous and uniquely their own.",
      focus: ["Depth", "Originality", "Private insight"],
    },
    {
      code: "1w9",
      title: "Principled Strategist",
      description:
        "Driven to improve systems while maintaining composure and objectivity. Often holds strong internal standards without needing constant external recognition.",
      focus: ["Standards", "Systems", "Composure"],
    },
    {
      code: "3w4",
      title: "Driven Visionary",
      description:
        "Combines strategic thinking with ambition and individual distinction. Often wants ideas to become meaningful, measurable accomplishments.",
      focus: ["Achievement", "Vision", "Distinction"],
    },
  ],
  INTP: [
    {
      code: "5w4",
      title: "Conceptual Explorer",
      description:
        "Driven to understand complex ideas while maintaining intellectual independence. Often explores unconventional theories and develops highly personal frameworks.",
      focus: ["Conceptual depth", "Independence", "Original frameworks"],
    },
    {
      code: "5w6",
      title: "Analytical Investigator",
      description:
        "Seeks competence through careful analysis, verification, and systematic understanding. Often wants sufficient knowledge before committing to conclusions.",
      focus: ["Verification", "Competence", "Systematic analysis"],
    },
    {
      code: "9w1",
      title: "Quiet Thinker",
      description:
        "Combines intellectual curiosity with a preference for inner stability. Often avoids unnecessary confrontation while privately developing nuanced perspectives.",
      focus: ["Inner stability", "Nuance", "Low-conflict thinking"],
    },
    {
      code: "6w5",
      title: "Skeptical Analyst",
      description:
        "Uses knowledge and questioning to reduce uncertainty. Often examines assumptions carefully before trusting a system, idea, or decision.",
      focus: ["Skepticism", "Uncertainty reduction", "Assumption testing"],
    },
  ],
  ENTJ: [
    {
      code: "8w7",
      title: "Commanding Builder",
      description:
        "Driven by autonomy, strength, and the ability to shape outcomes. Often approaches challenges directly and turns ambitious ideas into action.",
      focus: ["Autonomy", "Direct challenge", "Execution"],
    },
    {
      code: "3w4",
      title: "Strategic Achiever",
      description:
        "Combines achievement orientation with strategic ambition and personal distinction. Often measures progress through meaningful accomplishments.",
      focus: ["Achievement", "Strategy", "Distinction"],
    },
    {
      code: "8w9",
      title: "Steady Commander",
      description:
        "Assertive and independent while comparatively composed. Often prefers maintaining control through stability rather than constant confrontation.",
      focus: ["Control", "Stability", "Composed authority"],
    },
    {
      code: "3w2",
      title: "Influential Achiever",
      description:
        "Pursues success while remaining attentive to relationships, reputation, and influence. Often excels at mobilizing people around goals.",
      focus: ["Influence", "Goals", "Mobilizing people"],
    },
  ],
  ENTP: [
    {
      code: "7w8",
      title: "Bold Explorer",
      description:
        "Pursues possibility, stimulation, and freedom with an assertive edge. Often challenges limitations and rapidly turns curiosity into experimentation.",
      focus: ["Possibility", "Freedom", "Experimentation"],
    },
    {
      code: "7w6",
      title: "Inventive Explorer",
      description:
        "Energetic and possibility-driven while maintaining stronger social awareness and contingency thinking. Often generates options before committing.",
      focus: ["Options", "Social awareness", "Contingency thinking"],
    },
    {
      code: "8w7",
      title: "Provocative Challenger",
      description:
        "Combines intellectual experimentation with independence and assertiveness. Often enjoys testing boundaries, assumptions, and established systems.",
      focus: ["Independence", "Boundary testing", "Challenge"],
    },
    {
      code: "3w4",
      title: "Innovative Achiever",
      description:
        "Channels creativity toward achievement and distinction. Often wants novel ideas to produce visible impact rather than remain theoretical.",
      focus: ["Innovation", "Visible impact", "Achievement"],
    },
  ],
  INFJ: [
    {
      code: "4w5",
      title: "Insightful Individualist",
      description:
        "Searches for authentic identity and meaning through deep reflection. Often combines emotional sensitivity with intellectual depth.",
      focus: ["Authenticity", "Meaning", "Depth"],
    },
    {
      code: "1w9",
      title: "Quiet Idealist",
      description:
        "Guided by internal principles and a desire to improve things without unnecessary conflict. Often holds themselves to demanding ethical standards.",
      focus: ["Principle", "Improvement", "Ethical standards"],
    },
    {
      code: "9w1",
      title: "Harmonious Idealist",
      description:
        "Seeks peace while remaining guided by strong internal values. Often understands multiple perspectives and tries to reconcile differences.",
      focus: ["Peace", "Values", "Perspective"],
    },
    {
      code: "5w4",
      title: "Reflective Visionary",
      description:
        "Combines introspection, conceptual depth, and individuality. Often needs substantial private space to understand people and complex ideas.",
      focus: ["Private space", "Conceptual depth", "Individuality"],
    },
  ],
  INFP: [
    {
      code: "4w5",
      title: "Inner Individualist",
      description:
        "Strongly oriented toward authenticity, personal meaning, and emotional depth. Often explores identity through imagination and introspection.",
      focus: ["Authenticity", "Identity", "Imagination"],
    },
    {
      code: "9w1",
      title: "Gentle Idealist",
      description:
        "Values harmony while maintaining deeply held personal principles. Often seeks peaceful environments where authenticity can exist without pressure.",
      focus: ["Harmony", "Personal principles", "Gentle authenticity"],
    },
    {
      code: "4w3",
      title: "Expressive Individualist",
      description:
        "Combines emotional individuality with a stronger desire to communicate identity outwardly and create visible personal expression.",
      focus: ["Expression", "Identity", "Visible creativity"],
    },
    {
      code: "6w5",
      title: "Reflective Loyalist",
      description:
        "Values security and trusted relationships while approaching uncertainty thoughtfully. Often processes concerns privately before acting.",
      focus: ["Trust", "Security", "Private processing"],
    },
  ],
  ENFJ: [
    {
      code: "2w3",
      title: "Inspirational Guide",
      description:
        "Finds meaning in supporting others while also seeking effectiveness and positive influence. Often naturally mobilizes people around shared growth.",
      focus: ["Support", "Influence", "Shared growth"],
    },
    {
      code: "3w2",
      title: "Charismatic Achiever",
      description:
        "Combines ambition with interpersonal awareness. Often wants to succeed in ways that create recognition, connection, and positive impact.",
      focus: ["Ambition", "Recognition", "Connection"],
    },
    {
      code: "2w1",
      title: "Principled Helper",
      description:
        "Motivated to support others while maintaining strong ideas about responsibility and what people genuinely need.",
      focus: ["Support", "Responsibility", "Care"],
    },
    {
      code: "1w2",
      title: "Purposeful Mentor",
      description:
        "Driven by improvement and service. Often sees potential in others and feels responsible for helping that potential develop.",
      focus: ["Improvement", "Service", "Potential"],
    },
  ],
  ENFP: [
    {
      code: "7w6",
      title: "Enthusiastic Explorer",
      description:
        "Seeks possibility, freedom, connection, and new experiences while maintaining stronger concern for belonging and security.",
      focus: ["Possibility", "Connection", "Belonging"],
    },
    {
      code: "7w8",
      title: "Free-Spirited Explorer",
      description:
        "Pursues possibilities with greater independence and assertiveness. Often resists restrictions and follows opportunities enthusiastically.",
      focus: ["Independence", "Opportunity", "Freedom"],
    },
    {
      code: "4w3",
      title: "Expressive Visionary",
      description:
        "Combines individuality and emotional authenticity with outward expression. Often wants their ideas and identity to leave a meaningful impression.",
      focus: ["Authenticity", "Expression", "Meaningful impression"],
    },
    {
      code: "2w3",
      title: "Energetic Connector",
      description:
        "Draws energy from relationships and positive influence. Often expresses care enthusiastically and enjoys helping people discover possibilities.",
      focus: ["Care", "Connection", "Possibilities"],
    },
  ],
  ISTJ: [
    {
      code: "1w9",
      title: "Principled Organizer",
      description:
        "Driven by responsibility, correctness, and stable standards. Often prefers improving systems carefully rather than disrupting them unnecessarily.",
      focus: ["Correctness", "Standards", "Responsibility"],
    },
    {
      code: "6w5",
      title: "Reliable Guardian",
      description:
        "Seeks security through preparation, competence, and dependable structures. Often anticipates problems before they occur.",
      focus: ["Security", "Preparation", "Reliability"],
    },
    {
      code: "1w2",
      title: "Responsible Reformer",
      description:
        "Combines strong standards with a practical sense of duty toward others. Often feels responsible for ensuring things are done properly.",
      focus: ["Duty", "Standards", "Usefulness"],
    },
    {
      code: "5w6",
      title: "Systematic Specialist",
      description:
        "Approaches responsibility through knowledge and technical competence. Often prefers mastering established systems before making decisions.",
      focus: ["Competence", "Knowledge", "Established systems"],
    },
  ],
  ISFJ: [
    {
      code: "6w5",
      title: "Devoted Guardian",
      description:
        "Seeks stability through loyalty, preparation, and dependable relationships. Often quietly anticipates what others may need.",
      focus: ["Loyalty", "Preparation", "Dependable care"],
    },
    {
      code: "2w1",
      title: "Caring Protector",
      description:
        "Expresses care through responsibility, practical support, and service. Often feels fulfilled when others feel safe and supported.",
      focus: ["Care", "Service", "Protection"],
    },
    {
      code: "9w1",
      title: "Gentle Stabilizer",
      description:
        "Prioritizes harmony and consistency while maintaining clear internal standards. Often reduces tension through patience and dependable support.",
      focus: ["Harmony", "Consistency", "Patience"],
    },
    {
      code: "1w2",
      title: "Conscientious Caregiver",
      description:
        "Combines responsibility and care with a strong desire to do what is right for the people around them.",
      focus: ["Responsibility", "Care", "Doing right"],
    },
  ],
  ESTJ: [
    {
      code: "1w2",
      title: "Responsible Director",
      description:
        "Driven to create order, uphold standards, and improve performance while remaining attentive to collective responsibility.",
      focus: ["Order", "Standards", "Performance"],
    },
    {
      code: "8w9",
      title: "Steady Authority",
      description:
        "Values control, independence, and dependable execution. Often leads firmly without seeking unnecessary confrontation.",
      focus: ["Control", "Execution", "Firm leadership"],
    },
    {
      code: "3w4",
      title: "Performance Builder",
      description:
        "Combines efficiency and ambition with a desire for distinction. Often defines progress through tangible accomplishments.",
      focus: ["Efficiency", "Ambition", "Results"],
    },
    {
      code: "6w5",
      title: "Structured Guardian",
      description:
        "Builds security through planning, rules, accountability, and preparation. Often takes responsibility seriously when others depend on them.",
      focus: ["Planning", "Accountability", "Security"],
    },
  ],
  ESFJ: [
    {
      code: "2w3",
      title: "Social Caregiver",
      description:
        "Finds meaning through relationships, contribution, and positive interpersonal influence. Often notices what others need quickly.",
      focus: ["Relationships", "Contribution", "Influence"],
    },
    {
      code: "2w1",
      title: "Devoted Supporter",
      description:
        "Combines warmth and service with a strong sense of responsibility. Often helps because caring feels like something they ought to do.",
      focus: ["Warmth", "Service", "Responsibility"],
    },
    {
      code: "3w2",
      title: "Community Achiever",
      description:
        "Pursues accomplishment through relationships, contribution, and social effectiveness. Often wants success to benefit their wider community.",
      focus: ["Community", "Accomplishment", "Social effectiveness"],
    },
    {
      code: "6w7",
      title: "Loyal Connector",
      description:
        "Values dependable relationships and belonging while bringing warmth and social energy to groups.",
      focus: ["Belonging", "Dependability", "Social warmth"],
    },
  ],
  ISTP: [
    {
      code: "5w6",
      title: "Technical Investigator",
      description:
        "Builds independence through competence and practical understanding. Often prefers observing and mastering a situation before becoming involved.",
      focus: ["Competence", "Observation", "Practical mastery"],
    },
    {
      code: "5w4",
      title: "Independent Specialist",
      description:
        "Combines technical curiosity with individuality. Often develops specialized skills and unconventional ways of understanding problems.",
      focus: ["Specialization", "Curiosity", "Unconventional skill"],
    },
    {
      code: "9w8",
      title: "Calm Independent",
      description:
        "Values autonomy and inner stability. Usually relaxed until boundaries are crossed, at which point they can become unexpectedly firm.",
      focus: ["Autonomy", "Calm", "Boundaries"],
    },
    {
      code: "8w9",
      title: "Controlled Challenger",
      description:
        "Independent, resilient, and difficult to pressure. Often prefers quiet control over overt displays of dominance.",
      focus: ["Resilience", "Control", "Independence"],
    },
  ],
  ISFP: [
    {
      code: "9w1",
      title: "Gentle Individualist",
      description:
        "Seeks internal harmony while remaining faithful to personal values. Often expresses identity quietly through choices, aesthetics, and actions.",
      focus: ["Harmony", "Values", "Quiet identity"],
    },
    {
      code: "4w5",
      title: "Sensitive Creator",
      description:
        "Deeply values authenticity and individual expression. Often processes emotional experiences through creativity and private reflection.",
      focus: ["Authenticity", "Creativity", "Private reflection"],
    },
    {
      code: "4w3",
      title: "Expressive Creator",
      description:
        "Combines personal authenticity with a stronger drive to externalize identity and create something meaningful or recognizable.",
      focus: ["Expression", "Identity", "Meaning"],
    },
    {
      code: "9w8",
      title: "Independent Peacemaker",
      description:
        "Generally easygoing and harmony-oriented while maintaining a surprisingly strong need for personal autonomy.",
      focus: ["Peace", "Autonomy", "Grounded presence"],
    },
  ],
  ESTP: [
    {
      code: "8w7",
      title: "Bold Challenger",
      description:
        "Pursues autonomy, intensity, and direct engagement with the world. Often responds quickly to obstacles and dislikes being controlled.",
      focus: ["Autonomy", "Intensity", "Direct action"],
    },
    {
      code: "7w8",
      title: "Adventurous Realist",
      description:
        "Seeks stimulation, freedom, and immediate possibilities with confidence and assertiveness. Often learns through direct experience.",
      focus: ["Stimulation", "Freedom", "Direct experience"],
    },
    {
      code: "3w2",
      title: "Dynamic Achiever",
      description:
        "Combines action orientation with competitiveness and interpersonal influence. Often adapts quickly to opportunities for success.",
      focus: ["Action", "Competition", "Influence"],
    },
    {
      code: "7w6",
      title: "Social Adventurer",
      description:
        "Seeks excitement and variety while remaining comparatively attentive to people, alliances, and practical risks.",
      focus: ["Excitement", "Alliances", "Practical risk"],
    },
  ],
  ESFP: [
    {
      code: "7w6",
      title: "Joyful Explorer",
      description:
        "Drawn toward experience, connection, variety, and enjoyment. Often creates energy by bringing people into the present moment.",
      focus: ["Experience", "Connection", "Enjoyment"],
    },
    {
      code: "7w8",
      title: "Bold Entertainer",
      description:
        "Combines spontaneity and enjoyment with stronger independence and assertiveness. Often follows opportunities immediately rather than waiting.",
      focus: ["Spontaneity", "Independence", "Immediate opportunity"],
    },
    {
      code: "2w3",
      title: "Warm Performer",
      description:
        "Gains meaning from connecting with and uplifting others while enjoying visible positive feedback and social engagement.",
      focus: ["Connection", "Uplifting others", "Positive feedback"],
    },
    {
      code: "3w2",
      title: "Charismatic Performer",
      description:
        "Combines adaptability and expressiveness with achievement orientation. Often reads the room quickly and adjusts to create impact.",
      focus: ["Adaptability", "Expression", "Impact"],
    },
  ],
};
