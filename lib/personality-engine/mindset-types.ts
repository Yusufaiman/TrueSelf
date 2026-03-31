// ==================== MINDSET TYPES ====================
// Understanding how you think, interpret reality, and shape your decisions

export type MindsetFamily =
  | "growth-orientation"
  | "belief-system"
  | "self-perception"
  | "emotional-thinking"
  | "cognitive-style"
  | "resilience-pattern"
  | "control-perspective";

export interface MindsetType {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  family: MindsetFamily;
  fullDesc: string;
  howItShowsUp: string[];
  strengths: string[];
  blindSpots: string[];
  actionItems: string[];
}

// ==================== GROWTH ORIENTATION FAMILY ====================
const growthOrientationTypes: MindsetType[] = [
  {
    id: "m-go-1",
    name: "The Growth Builder",
    tagline: "Believes effort creates progress",
    shortDesc:
      "You see improvement as something built over time. Challenges feel like opportunities to develop rather than threats to avoid.",
    family: "growth-orientation",
    fullDesc:
      "You operate from a growth mindset. You believe that abilities can be developed through dedication and effort. Challenges excite you because they represent opportunities to expand your capabilities. Failure is not a reflection of your worth but feedback on your path. You thrive when learning and seeing tangible progress over time.",
    howItShowsUp: [
      "You take challenges as learning opportunities",
      "You are comfortable improving step by step",
      "You do not expect instant perfection",
      "You seek feedback to improve",
      "You celebrate effort, not just outcomes",
    ],
    strengths: [
      "Consistent progress over time",
      "Resilience in learning environments",
      "Open to feedback and growth",
      "Ability to persist through difficulty",
      "Creates long-term capability",
    ],
    blindSpots: [
      "May overlook the need for rest",
      "Can become overly focused on improvement",
      "Might dismiss natural talent",
      "Could push too hard too fast",
      "May not recognize when good enough is enough",
    ],
    actionItems: [
      "Balance growth with reflection",
      "Recognize progress, not just goals",
      "Avoid burnout from constant self-improvement",
      "Build rest into your development plan",
      "Celebrate small wins along the way",
    ],
  },
  {
    id: "m-go-2",
    name: "The Fixed Thinker",
    tagline: "Believes ability is static",
    shortDesc:
      "You tend to believe people are born with certain limits. Failure can feel like proof that something is not meant for you.",
    family: "growth-orientation",
    fullDesc:
      "You operate from a fixed mindset. You believe that abilities are largely innate. If something feels difficult, you may interpret it as a sign you lack natural talent. Failure feels personal because it seems to confirm what you suspect about your limitations. This creates a struggle with challenges because they threaten your self-image.",
    howItShowsUp: [
      "You avoid challenging tasks",
      "Failure feels deeply personal",
      "You compare yourself to others",
      "You may give up quickly",
      "You believe people are born smart or not",
    ],
    strengths: [
      "May seek stability over change",
      "Can focus on doing well at existing skills",
      "May set realistic expectations",
      "Can appreciate natural talent",
      "May avoid unnecessary risk",
    ],
    blindSpots: [
      "Miss opportunities to develop",
      "Interpret struggle as inability",
      "Avoid feedback that challenges beliefs",
      "May become stuck in comfort zone",
      "Could miss your true potential",
    ],
    actionItems: [
      "Notice when you assume something is fixed",
      "Reframe challenges as learning opportunities",
      "Seek one area to grow intentionally",
      "Document progress, even small",
      "Practice saying yes to one difficult thing",
    ],
  },
  {
    id: "m-go-3",
    name: "The Late Bloomer",
    tagline: "Believes growth takes time",
    shortDesc:
      "You are not rushed by timelines. You trust that your path will unfold gradually, even if others move faster.",
    family: "growth-orientation",
    fullDesc:
      "You operate from a patient growth mindset. You believe that everyone develops on their own timeline. You are not bothered by comparisons of pace because you trust your own unfolding. You see value in slow progress and deep development. This creates a peaceful relationship with growth where you can focus on your own path without external pressure.",
    howItShowsUp: [
      "You are not rushed by others' timelines",
      "You trust gradual development",
      "You do not compare pace with others",
      "You focus on personal progress",
      "You believe good things take time",
    ],
    strengths: [
      "Freedom from comparison and pressure",
      "Sustainable, long-term development",
      "Peace with your own pace",
      "Depth of understanding",
      "Less stress and burnout",
    ],
    blindSpots: [
      "May procrastinate without urgency",
      "Could miss important deadlines",
      "Might underestimate what is possible",
      "Can seem unmotivated to others",
      "May not push enough when growth requires it",
    ],
    actionItems: [
      "Trust your pace while setting milestones",
      "Build accountability alongside patience",
      "Distinguish between peace and passivity",
      "Create gentle deadlines for yourself",
      "Notice when patience becomes procrastination",
    ],
  },
  {
    id: "m-go-4",
    name: "The Perfection Driven",
    tagline: "Growth must be flawless",
    shortDesc:
      "You want progress, but only if it meets high standards. Mistakes feel difficult to accept.",
    family: "growth-orientation",
    fullDesc:
      "You combine growth mindset with high standards. You believe in your ability to improve, but you have exacting expectations for that improvement. Mistakes feel unacceptable because they represent failure to meet your standards. This creates drive for excellence but also perfectionism. You are willing to work hard, but struggle when results do not match your vision.",
    howItShowsUp: [
      "You drive yourself toward excellence",
      "Mistakes trigger frustration",
      "You set very high standards",
      "You may delay sharing unfinished work",
      "You re-do things to meet standards",
    ],
    strengths: [
      "High quality output",
      "Strong drive for excellence",
      "Attention to detail",
      "Willingness to refine and improve",
      "Commitment to mastery",
    ],
    blindSpots: [
      "Perfectionism slows progress",
      "May never feel satisfied",
      "Can be harsh on yourself and others",
      "Might avoid sharing for fear of judgment",
      "Struggle with good enough",
    ],
    actionItems: [
      "Define good enough for different contexts",
      "Practice shipping imperfect work",
      "Set standards based on purpose, not perfection",
      "Celebrate progress over perfection",
      "Learn to self-compassion over self-criticism",
    ],
  },
];

// ==================== BELIEF SYSTEM FAMILY ====================
const beliefSystemTypes: MindsetType[] = [
  {
    id: "m-bs-1",
    name: "The Empowered Believer",
    tagline: "Believes they can influence outcomes",
    shortDesc:
      "You feel that your actions matter. Even when things are difficult, you believe you can change your situation.",
    family: "belief-system",
    fullDesc:
      "You have a strong sense of agency. You believe your actions shape your outcomes. When faced with challenges, your instinct is to think about what you can do differently. You feel powerful in your own life because you trust that effort and decisions matter. This belief fuels motivation and resilience.",
    howItShowsUp: [
      "You ask what you can do differently",
      "You feel responsible for outcomes",
      "You take initiative",
      "You believe your effort matters",
      "You focus on solutions",
    ],
    strengths: [
      "Strong motivation to act",
      "Resilience when facing challenges",
      "Ability to take responsibility",
      "Proactive problem solving",
      "Sense of empowerment",
    ],
    blindSpots: [
      "May blame yourself for things outside control",
      "Could overestimate your responsibility",
      "Might ignore systemic barriers",
      "Can be harsh when others do not take action",
      "May miss when to ask for help",
    ],
    actionItems: [
      "Distinguish between responsibility and blame",
      "Learn what you can and cannot control",
      "Build systems, not just willpower",
      "Ask for help when needed",
      "Recognize structural challenges alongside effort",
    ],
  },
  {
    id: "m-bs-2",
    name: "The Doubter",
    tagline: "Questions their own ability",
    shortDesc:
      "You often hesitate because you are unsure if you are capable. This can limit action even when opportunity is present.",
    family: "belief-system",
    fullDesc:
      "You carry doubt about your own capability. Even when evidence suggests you can do something, you hesitate because you are unsure. This doubt creates a gap between opportunity and action. You may wait for permission, perfect conditions, or certainty before moving forward. The doubt is not always logical, which can be frustrating.",
    howItShowsUp: [
      "You hesitate before taking action",
      "You wait for certainty that never comes",
      "You look for permission",
      "You downplay your abilities",
      "You question whether you are capable",
    ],
    strengths: [
      "Humility and self-awareness",
      "Careful consideration before action",
      "Not recklessly overconfident",
      "Open to learning",
      "Willing to ask questions",
    ],
    blindSpots: [
      "Miss opportunities due to hesitation",
      "Underutilize your actual abilities",
      "Delay important decisions",
      "May seem indecisive to others",
      "Doubt prevents you from trying",
    ],
    actionItems: [
      "Track evidence of your capability",
      "Try one thing despite doubt",
      "Notice when doubt is protective vs limiting",
      "Build small wins to increase confidence",
      "Separate doubt from reality",
    ],
  },
  {
    id: "m-bs-3",
    name: "The Limiting Thinker",
    tagline: "Held back by internal beliefs",
    shortDesc:
      "You carry beliefs that quietly restrict your potential. These beliefs often feel true, even when they are not.",
    family: "belief-system",
    fullDesc:
      "You hold internal beliefs that silently limit your actions and possibilities. These beliefs feel true because you have held them for so long. They function like invisible rules that guide what you allow yourself to do. You may not even notice them because they are so familiar. They restrict your potential quietly, often without conscious awareness.",
    howItShowsUp: [
      "You have invisible rules about what is possible",
      "You avoid things without knowing why",
      "Certain paths feel closed off",
      "You make decisions based on assumptions",
      "You do not question limiting beliefs",
    ],
    strengths: [
      "Consistency in values",
      "Stability from clear beliefs",
      "May protect you from harmful paths",
      "Can provide structure",
      "Sincere in your convictions",
    ],
    blindSpots: [
      "Beliefs limit rather than expand",
      "You may not see the limiting beliefs",
      "Resistance to new possibilities",
      "Self-fulfilling prophecies",
      "Miss opportunities due to invisible rules",
    ],
    actionItems: [
      "Identify your limiting beliefs",
      "Question where each belief came from",
      "Test one limiting belief",
      "Notice what becomes possible when belief shifts",
      "Write down what opens up when you question limits",
    ],
  },
  {
    id: "m-bs-4",
    name: "The Rewriter",
    tagline: "Actively reshaping beliefs",
    shortDesc:
      "You are aware of your internal patterns and are actively trying to change how you think and see yourself.",
    family: "belief-system",
    fullDesc:
      "You have noticed your limiting beliefs and chosen to change them. You actively work to catch old patterns and replace them with new ones. This requires awareness and intention, but you are committed. You understand that beliefs are malleable and that you can reshape how you think. This is growth at the deepest level.",
    howItShowsUp: [
      "You notice old thought patterns",
      "You intentionally practice new beliefs",
      "You challenge your own assumptions",
      "You reflect on where beliefs came from",
      "You are willing to think differently",
    ],
    strengths: [
      "Genuine personal transformation",
      "Self-awareness and honesty",
      "Willingness to change",
      "Capacity for growth",
      "Freedom from old patterns",
    ],
    blindSpots: [
      "Changing beliefs takes time, may feel slow",
      "Old patterns can resurface",
      "Can be hard on yourself in the process",
      "May seem unstable to those attached to old you",
      "Requires ongoing effort, not one-time fix",
    ],
    actionItems: [
      "Celebrate your willingness to change",
      "Be patient with the process",
      "Track how new beliefs shape your life",
      "Find support for the journey",
      "Notice when old beliefs creep back",
    ],
  },
];

// ==================== SELF PERCEPTION FAMILY ====================
const selfPerceptionTypes: MindsetType[] = [
  {
    id: "m-sp-1",
    name: "The Confident Self",
    tagline: "Strong sense of self",
    shortDesc:
      "You trust who you are. Your decisions are not heavily shaken by external opinions or comparison.",
    family: "self-perception",
    fullDesc:
      "You have a stable, positive sense of self. You know who you are and what matters to you. External validation is nice but not necessary. You are not easily shaken by criticism or comparison because your self-worth is internally grounded. This creates freedom to act authentically and make decisions based on your values rather than others' opinions.",
    howItShowsUp: [
      "You make decisions based on your values",
      "External criticism does not destabilize you",
      "You are comfortable being yourself",
      "You do not compare yourself much to others",
      "You trust your own judgment",
    ],
    strengths: [
      "Authentic self-expression",
      "Grounded decision making",
      "Freedom from comparison",
      "Resilience to criticism",
      "Natural leadership",
    ],
    blindSpots: [
      "May dismiss valid feedback",
      "Could come across as arrogant",
      "Might not see blind spots",
      "Can miss perspective from others",
      "May seem unmovable to some",
    ],
    actionItems: [
      "Remain open to feedback despite confidence",
      "Distinguish between arrogance and confidence",
      "Stay curious about other perspectives",
      "Use your confidence to uplift others",
      "Remember that confidence can grow or shrink",
    ],
  },
  {
    id: "m-sp-2",
    name: "The Self Doubter",
    tagline: "Questions self worth",
    shortDesc:
      "You often feel unsure about your value. This affects how you speak, act, and show up in opportunities.",
    family: "self-perception",
    fullDesc:
      "You carry doubt about your own worth. Even when others see your value, you question it internally. This doubt affects how you show up. You may speak softly, hold back, or diminish your accomplishments. The doubt is not based on lack of ability but on a deeper uncertainty about your inherent worth. This creates a disconnect between what you can do and what you believe about yourself.",
    howItShowsUp: [
      "You downplay your accomplishments",
      "You question your value",
      "You may speak quietly",
      "You hold back in opportunities",
      "You need external reassurance",
    ],
    strengths: [
      "Humility and modesty",
      "Openness to growth",
      "Can relate to others' struggles",
      "Less arrogance",
      "Seek to improve",
    ],
    blindSpots: [
      "Doubt limits your potential",
      "You may not claim opportunities",
      "Your doubt affects what others believe",
      "You miss recognizing your actual value",
      "Doubt becomes self-fulfilling",
    ],
    actionItems: [
      "Track evidence of your value",
      "Practice claiming your accomplishments",
      "Question where doubt comes from",
      "Build small experiences of success",
      "Separate doubt from reality",
    ],
  },
  {
    id: "m-sp-3",
    name: "The Overthinker",
    tagline: "Analyzes self constantly",
    shortDesc:
      "You reflect deeply, sometimes too much. This can create clarity but also paralysis.",
    family: "self-perception",
    fullDesc:
      "You naturally analyze yourself. You are self-aware and reflective. You think about why you do things, what it means, and what you should do differently. This capacity for reflection is valuable, but it can also become overwhelming. You can get caught in loops of analysis where thinking replaces action. Your internal commentary can be loud and sometimes critical.",
    howItShowsUp: [
      "You analyze your own behavior",
      "You think deeply about decisions",
      "You may get stuck in your head",
      "You are aware of your patterns",
      "You can be self-critical",
    ],
    strengths: [
      "High self-awareness",
      "Ability to learn from experience",
      "Capacity for introspection",
      "Can identify patterns",
      "Thoughtful decision making",
    ],
    blindSpots: [
      "Analysis paralysis",
      "Can become overly self-critical",
      "Thinking replaces action",
      "Internal commentary can be harsh",
      "May miss the present in thinking about it",
    ],
    actionItems: [
      "Set time limits on reflection",
      "Practice moving from thinking to doing",
      "Notice when analysis becomes avoidance",
      "Use reflection for insight, not judgment",
      "Balance thinking with experience",
    ],
  },
  {
    id: "m-sp-4",
    name: "The Identity Shifter",
    tagline: "Changes based on context",
    shortDesc:
      "You adapt your sense of self depending on where you are and who you are with.",
    family: "self-perception",
    fullDesc:
      "You shift your identity based on context. With family, you are one way. In professional settings, another. With friends, yet another. This adaptability is valuable for fitting in, but it can also create fragmentation. You may lose track of which version is the real you or feel like you have no solid center. The constant shifting can be exhausting or feel inauthentic.",
    howItShowsUp: [
      "You are different with different people",
      "You adapt to your environment",
      "You may lose track of your core self",
      "You are a chameleon",
      "You mirror the people around you",
    ],
    strengths: [
      "High adaptability",
      "Ability to fit in",
      "Good at reading context",
      "Can relate to different people",
      "Flexibility",
    ],
    blindSpots: [
      "May lose sense of authentic self",
      "Can feel inauthentic",
      "Others may not know real you",
      "Constantly shifting is exhausting",
      "May not know your own values",
    ],
    actionItems: [
      "Identify core values beneath contexts",
      "Find your authentic self",
      "Practice being yourself in safe settings",
      "Distinguish between adaptation and inauthenticity",
      "Build a strong center while remaining flexible",
    ],
  },
];

// ==================== EMOTIONAL THINKING FAMILY ====================
const emotionalThinkingTypes: MindsetType[] = [
  {
    id: "m-et-1",
    name: "The Emotion Driven",
    tagline: "Decisions guided by feelings",
    shortDesc:
      "You rely heavily on how you feel. Your emotional state plays a big role in your actions and direction.",
    family: "emotional-thinking",
    fullDesc:
      "You make decisions from your emotional center. How you feel is important data to you. If something feels right, you move forward. If it feels off, you hesitate or stop. Your emotions are often accurate about situations, but they can also mislead. You are in touch with your inner experience, which is valuable, but sometimes feeling something is not the best guide for action.",
    howItShowsUp: [
      "You decide based on how you feel",
      "Your mood affects your choices",
      "You trust your gut",
      "Your emotions guide your path",
      "You are tuned in to feelings",
    ],
    strengths: [
      "Connection to inner experience",
      "Authenticity",
      "Emotional intelligence",
      "Can read emotional environment",
      "Trusts intuition",
    ],
    blindSpots: [
      "Emotions can be misleading",
      "Mood affects important decisions",
      "Can ignore practical reality",
      "Others may see you as unpredictable",
      "May miss logical considerations",
    ],
    actionItems: [
      "Feel your emotions, then think",
      "Distinguish between gut and preference",
      "Check emotions against facts",
      "Build decision framework beyond feeling",
      "Practice balancing emotion and logic",
    ],
  },
  {
    id: "m-et-2",
    name: "The Rational Controller",
    tagline: "Controls emotions through logic",
    shortDesc:
      "You prioritize logic over feelings. You manage emotions rather than letting them lead.",
    family: "emotional-thinking",
    fullDesc:
      "You operate primarily from logic. You use thinking to manage emotions. When feelings arise, your instinct is to reason through them. You believe logic is more reliable than emotion. This creates stability and rational decision making, but it can also create distance from your emotional experience. You may not know what you feel because you quickly move to what you think.",
    howItShowsUp: [
      "You reason through emotions",
      "You prioritize logic",
      "You manage feelings with thinking",
      "You may seem unemotional",
      "You take emotion out of decisions",
    ],
    strengths: [
      "Stable decision making",
      "Less influenced by mood",
      "Rational problem solving",
      "Consistency",
      "Clear thinking under stress",
    ],
    blindSpots: [
      "May disconnect from emotions",
      "Logic can mask real feelings",
      "Others may feel you are cold",
      "Miss emotional needs",
      "Efficiency over emotional connection",
    ],
    actionItems: [
      "Practice identifying what you feel",
      "Notice when logic is avoidance",
      "Balance thinking with feeling",
      "Listen to emotions as data",
      "Build emotional awareness alongside logic",
    ],
  },
  {
    id: "m-et-3",
    name: "The Suppressor",
    tagline: "Pushes emotions aside",
    shortDesc:
      "You avoid dealing with emotions directly. This can create stability on the surface but tension underneath.",
    family: "emotional-thinking",
    fullDesc:
      "You tend to push emotions away. When feelings arise, your strategy is to move past them or ignore them. This creates a surface-level stability, but emotions do not disappear. They build up underneath. You may not talk about how you feel or may say I am fine when you are not. This suppression is protective but also isolating.",
    howItShowsUp: [
      "You avoid talking about feelings",
      "You push emotions down",
      "You seem fine on the surface",
      "You do not deal with difficult emotions",
      "You may not even know what you feel",
    ],
    strengths: [
      "Surface-level stability",
      "Do not burden others",
      "Ability to function through difficulty",
      "Protective mechanism",
      "Can seem unshakeable",
    ],
    blindSpots: [
      "Emotions build up underground",
      "Can explode unexpectedly",
      "Health consequences from suppression",
      "Miss emotional connections",
      "Isolation from others",
    ],
    actionItems: [
      "Practice naming what you feel",
      "Find safe people to share with",
      "Understand why you suppress",
      "Allow emotions to surface",
      "Process feelings before they build up",
    ],
  },
  {
    id: "m-et-4",
    name: "The Balanced Processor",
    tagline: "Integrates emotion and logic",
    shortDesc:
      "You are able to feel and think at the same time. This helps you make grounded and aware decisions.",
    family: "emotional-thinking",
    fullDesc:
      "You have integrated your emotional and logical sides. You can feel something and think about it simultaneously. You use both as sources of information. Emotions inform you about what matters, and logic helps you figure out what to do. This integration creates grounded decision making. You are neither ruled by emotion nor disconnected from it.",
    howItShowsUp: [
      "You feel and think simultaneously",
      "You use emotions as data",
      "You make grounded decisions",
      "You consider both heart and head",
      "You are emotionally aware and logical",
    ],
    strengths: [
      "Integrated decision making",
      "Awareness of emotions and logic",
      "Ability to grounded choices",
      "Can help others find balance",
      "Emotional intelligence",
    ],
    blindSpots: [
      "Can seem overly cautious",
      "May take longer to decide",
      "Others may want faster clarity",
      "Can get stuck between two sides",
      "May seem indecisive in moments requiring certainty",
    ],
    actionItems: [
      "Trust your integrated approach",
      "Use both sides to inform decisions",
      "Help others develop integration",
      "Notice when balance shifts",
      "Continue developing both capacities",
    ],
  },
];

// ==================== COGNITIVE STYLE FAMILY ====================
const cognitiveStyleTypes: MindsetType[] = [
  {
    id: "m-cs-1",
    name: "The Strategic Thinker",
    tagline: "Thinks ahead and plans",
    shortDesc:
      "You naturally think in systems and long term outcomes. You prefer structured thinking over randomness.",
    family: "cognitive-style",
    fullDesc:
      "You naturally think strategically. You see systems, patterns, and long-term outcomes. You think ahead and plan accordingly. You prefer order and structure because they allow you to think clearly. You are comfortable with complexity as long as it is organized. This creates reliable planning, but it can also make you resistant to spontaneity.",
    howItShowsUp: [
      "You think strategically",
      "You plan ahead",
      "You see systems",
      "You prefer structure",
      "You think long term",
    ],
    strengths: [
      "Good planning",
      "Can see consequences",
      "Systems thinking",
      "Strategic advantage",
      "Reliable outcomes",
    ],
    blindSpots: [
      "Can be rigid",
      "May miss spontaneity",
      "Everyone cannot think this way",
      "Overplanning can slow action",
      "Miss beauty of unplanned moments",
    ],
    actionItems: [
      "Build flexibility into plans",
      "Practice spontaneity",
      "Help others appreciate structure",
      "Notice when planning becomes avoidance",
      "Balance strategy with presence",
    ],
  },
  {
    id: "m-cs-2",
    name: "The Reactive Thinker",
    tagline: "Responds in the moment",
    shortDesc:
      "You deal with situations as they come. You are flexible, but sometimes lack long term direction.",
    family: "cognitive-style",
    fullDesc:
      "You are present-focused and reactive. You deal with situations as they arise. You are flexible and adaptable to what comes. You prefer freedom from rigid plans. You thrive in dynamic environments that require quick responses. This creates responsiveness but can lack long-term direction. You may struggle with planning because it feels constraining.",
    howItShowsUp: [
      "You respond to what is happening",
      "You are flexible",
      "You dislike excessive planning",
      "You go with the flow",
      "You are spontaneous",
    ],
    strengths: [
      "Flexibility and adaptability",
      "Presence",
      "Quick response",
      "Can thrive in chaos",
      "Spontaneity and fun",
    ],
    blindSpots: [
      "Lack of long-term direction",
      "May seem unfocused",
      "Miss opportunities you could plan for",
      "Others may see you as undisciplined",
      "Can be inefficient",
    ],
    actionItems: [
      "Build some planning structure",
      "Create long-term vision",
      "Use reactivity as strength",
      "Notice when lack of plan costs you",
      "Balance presence with purpose",
    ],
  },
  {
    id: "m-cs-3",
    name: "The Pattern Recognizer",
    tagline: "Sees connections easily",
    shortDesc:
      "You quickly notice patterns in behavior, people, and situations. This gives you insight others might miss.",
    family: "cognitive-style",
    fullDesc:
      "You naturally see patterns. You notice connections between seemingly unrelated things. You can read situations quickly because you recognize recurring patterns. This gives you insight and intuition about what is happening. You can predict behavior because you see the patterns underneath. This is valuable, but you can also see patterns that are not there.",
    howItShowsUp: [
      "You notice patterns quickly",
      "You see connections others miss",
      "You predict based on patterns",
      "You understand dynamics fast",
      "You see through surface appearances",
    ],
    strengths: [
      "Quick insight",
      "Intuition about situations",
      "Can see hidden dynamics",
      "Pattern prediction",
      "Deep understanding quickly",
    ],
    blindSpots: [
      "Can see patterns that do not exist",
      "May create false connections",
      "Can be overly interpretive",
      "May jump to conclusions",
      "Others may not see what you see",
    ],
    actionItems: [
      "Test patterns before acting",
      "Check your interpretations",
      "Distinguish between real and projected patterns",
      "Use pattern insight carefully",
      "Build evidence for your pattern seeing",
    ],
  },
  {
    id: "m-cs-4",
    name: "The Simplifier",
    tagline: "Breaks things into clarity",
    shortDesc:
      "You focus on making things easy to understand. You cut through complexity and get to the core.",
    family: "cognitive-style",
    fullDesc:
      "You naturally simplify. You can take complex ideas and break them into clear components. You cut through unnecessary complexity. You focus on the core. This is valuable for clarity and communication, but sometimes things are complex and need to stay that way. You may oversimplify, losing important nuance.",
    howItShowsUp: [
      "You simplify complex ideas",
      "You cut to the core",
      "You make things clear",
      "You break things down",
      "You focus on essentials",
    ],
    strengths: [
      "Clarity and simplicity",
      "Good communication",
      "Ability to distill meaning",
      "Help others understand",
      "Efficient thinking",
    ],
    blindSpots: [
      "May oversimplify",
      "Lose important nuance",
      "Some things need complexity",
      "May seem like you are missing depth",
      "Others may feel diminished",
    ],
    actionItems: [
      "When simplifying, preserve nuance",
      "Know when complex is necessary",
      "Use simplification as tool, not default",
      "Test if you have oversimplified",
      "Learn when simple is not enough",
    ],
  },
];

// ==================== RESILIENCE PATTERN FAMILY ====================
const resiliencePatternTypes: MindsetType[] = [
  {
    id: "m-rp-1",
    name: "The Resilient",
    tagline: "Recovers quickly from setbacks",
    shortDesc:
      "You are able to bounce back from failure and stress. You do not stay stuck for long.",
    family: "resilience-pattern",
    fullDesc:
      "You have natural resilience. When facing setback or stress, you recover relatively quickly. You do not stay stuck in difficulty. You can feel the impact and move forward. This might be because you process emotions quickly or because you are naturally optimistic or because you have strong resources. Whatever the reason, you bounce back. This is a resource others may not have.",
    howItShowsUp: [
      "You bounce back from challenges",
      "You do not stay stuck long",
      "You see failure as temporary",
      "You recover from stress",
      "You move forward after setback",
    ],
    strengths: [
      "Quick recovery",
      "Do not stay stuck",
      "Can face challenges",
      "Ability to persist",
      "Others find you inspiring",
    ],
    blindSpots: [
      "May seem to recover too quickly",
      "Others may not understand your speed",
      "May not process deeply enough",
      "Can minimize others' struggles",
      "May seem not to care",
    ],
    actionItems: [
      "Balance quick recovery with processing",
      "Help others understand your resilience",
      "Do not minimize others' struggle",
      "Notice if quickness is avoidance",
      "Share your resilience with others",
    ],
  },
  {
    id: "m-rp-2",
    name: "The Avoider",
    tagline: "Avoids discomfort and failure",
    shortDesc:
      "You tend to step away from situations that feel too difficult or uncertain.",
    family: "resilience-pattern",
    fullDesc:
      "You avoid discomfort. When things feel difficult or uncertain, your instinct is to step away or avoid. This protects you from pain in the moment, but it also prevents growth. You may miss opportunities because they carry risk. You may not develop capacity for handling difficulty because you do not practice it. Avoidance feels safe, but it is limiting.",
    howItShowsUp: [
      "You step away from difficulty",
      "You avoid uncertain situations",
      "You prefer comfort",
      "You do not face challenges",
      "You stay in safety zone",
    ],
    strengths: [
      "Self-protection",
      "Comfort seeking",
      "Do not push unnecessarily",
      "Know your limits",
      "Preserve energy",
    ],
    blindSpots: [
      "Miss opportunities for growth",
      "Never build resilience",
      "Stay stuck in comfort zone",
      "Potential unrealized",
      "Safe but limited",
    ],
    actionItems: [
      "Face one small discomfort",
      "Build resilience gradually",
      "Expand comfort zone slowly",
      "Understand what you are avoiding",
      "Practice handling difficulty",
    ],
  },
  {
    id: "m-rp-3",
    name: "The Overwhelmed",
    tagline: "Struggles under pressure",
    shortDesc:
      "Stress affects you deeply. When things stack up, it becomes hard to function clearly.",
    family: "resilience-pattern",
    fullDesc:
      "You are sensitive to stress and pressure. When multiple demands hit, you become overwhelmed. Your functioning decreases as stress increases. This is not weakness but reality of your system. You may need more support, more breaks, or less pressure to function well. You are not resilient in the traditional sense, but you may be sensitive, creative, or deeply feeling.",
    howItShowsUp: [
      "You feel overwhelmed easily",
      "Pressure affects functioning",
      "You need breaks",
      "Stress depletes you",
      "You need support",
    ],
    strengths: [
      "Awareness of limits",
      "Can ask for help",
      "Sensitive to nuance",
      "Feel deeply",
      "Know what helps",
    ],
    blindSpots: [
      "Feel broken or weak",
      "May not manage demands",
      "Need more support than others",
      "Can fall apart under pressure",
      "Overwhelm can be debilitating",
    ],
    actionItems: [
      "Build stress management practices",
      "Create support systems",
      "Manage demands more carefully",
      "Know your overwhelm signs",
      "Think of yourself as sensitive, not broken",
    ],
  },
  {
    id: "m-rp-4",
    name: "The Endurer",
    tagline: "Pushes through regardless",
    shortDesc:
      "You continue even when things are difficult. You rely on discipline more than emotion.",
    family: "resilience-pattern",
    fullDesc:
      "You have strong discipline. You can push through difficulty through sheer will. You do not rely on feeling good to keep going. You can function even when stressed. This is a strength that allows you to accomplish much. However, it can also mask burnout. You can push beyond healthy limits because you do not listen to signals. You may not rest even when you need to.",
    howItShowsUp: [
      "You push through difficult times",
      "You rely on discipline",
      "You keep going",
      "You do not quit",
      "You function through stress",
    ],
    strengths: [
      "Strong discipline",
      "Can accomplish much",
      "Do not give up",
      "Reliable under pressure",
      "Can persist",
    ],
    blindSpots: [
      "May push beyond healthy limits",
      "Can burn out without noticing",
      "Do not listen to body signals",
      "May sacrifice health for goals",
      "Endurance has limits",
    ],
    actionItems: [
      "Build rest into your life",
      "Listen to fatigue signals",
      "Distinguish pushing through from ignoring needs",
      "Learn when to stop",
      "Balance discipline with self-care",
    ],
  },
];

// ==================== CONTROL PERSPECTIVE FAMILY ====================
const controlPerspectiveTypes: MindsetType[] = [
  {
    id: "m-cp-1",
    name: "The Internal Controller",
    tagline: "Believes life is self driven",
    shortDesc:
      "You believe your life is shaped by your actions. Responsibility sits with you.",
    family: "control-perspective",
    fullDesc:
      "You have strong internal locus of control. You believe your actions shape your outcomes. You take responsibility for your life. This creates motivation and agency. You feel powerful in your own life. However, it can also create burden. You may feel responsible for things outside your control. You may be hard on yourself for outcomes you cannot fully control.",
    howItShowsUp: [
      "You take responsibility",
      "You believe you shape outcomes",
      "You focus on what you can control",
      "You do not blame others",
      "You feel responsible",
    ],
    strengths: [
      "Strong agency",
      "Take responsibility",
      "Motivated to act",
      "Powerful in own life",
      "Drive for outcomes",
    ],
    blindSpots: [
      "May blame yourself too much",
      "Overestimate your responsibility",
      "Ignore external obstacles",
      "Harsh self-judgment",
      "Miss systemic factors",
    ],
    actionItems: [
      "Distinguish between responsibility and blame",
      "Notice systemic factors",
      "Develop self-compassion",
      "Use responsibility wisely",
      "Know what is outside your control",
    ],
  },
  {
    id: "m-cp-2",
    name: "The External Blamer",
    tagline: "Sees outside forces as dominant",
    shortDesc:
      "You feel that circumstances, luck, or people control outcomes more than you do.",
    family: "control-perspective",
    fullDesc:
      "You have external locus of control. You believe outcomes are largely determined by external factors. Luck, circumstances, other people. You may feel powerless because you see control as outside you. This creates a victim mentality sometimes. But it can also be realistic awareness of systemic barriers. You are not always wrong, but you may miss your own agency.",
    howItShowsUp: [
      "You blame circumstances",
      "You feel controlled by situations",
      "You see others as responsible",
      "You feel luck matters most",
      "You may feel helpless",
    ],
    strengths: [
      "Awareness of systemic issues",
      "Do not blame yourself only",
      "Realistic about obstacles",
      "Can ask for help",
      "See bigger picture",
    ],
    blindSpots: [
      "Miss your own power",
      "Feel helpless",
      "Not take action",
      "Victim mentality",
      "Do not develop agency",
    ],
    actionItems: [
      "Notice where you have power",
      "Take one action despite obstacles",
      "Balance systemic awareness with agency",
      "Build sense of control gradually",
      "Distinguish between acceptance and helplessness",
    ],
  },
  {
    id: "m-cp-3",
    name: "The Balanced Realist",
    tagline: "Understands both control and limits",
    shortDesc:
      "You recognize what you can control and what you cannot. This creates grounded decision making.",
    family: "control-perspective",
    fullDesc:
      "You have integrated perspective on control. You acknowledge factors outside your control while taking responsibility for what is within your control. This creates grounded decision making and peace. You are neither helpless nor omnipotent. You can accept external limits while maximizing your agency. This is wisdom.",
    howItShowsUp: [
      "You focus on what you control",
      "You accept what you cannot",
      "You do not blame yourself for everything",
      "You take responsibility wisely",
      "You are grounded",
    ],
    strengths: [
      "Grounded perspective",
      "Appropriate responsibility",
      "Peace about control",
      "Wise decision making",
      "Emotional regulation",
    ],
    blindSpots: [
      "Can seem uncommitted to either side",
      "Others may want more blame or agency",
      "Can seem passive",
      "May miss opportunities to push harder",
      "May seem to accept too much",
    ],
    actionItems: [
      "Trust your balanced perspective",
      "Help others find balance",
      "Continue developing wisdom",
      "Notice if balance shifts",
      "Share your perspective when helpful",
    ],
  },
  {
    id: "m-cp-4",
    name: "The Power Seeker",
    tagline: "Wants full control over life",
    shortDesc:
      "You aim to take control of everything around you. You are driven to reduce uncertainty.",
    family: "control-perspective",
    fullDesc:
      "You want power and control. You are driven to reduce uncertainty and take control of your environment. You may try to control situations, people, outcomes. This comes from a need for safety through control. It gives you agency, but it can also create rigidity and conflict with others. You may not accept limits because limits feel like loss of control. You may be exhausting to be around if others feel controlled.",
    howItShowsUp: [
      "You want to be in control",
      "You manage situations tightly",
      "You do not like surprises",
      "You may try to control others",
      "You seek certainty",
    ],
    strengths: [
      "Get things done",
      "Organized and efficient",
      "Reduce chaos",
      "Protective of self and others",
      "Strong agency",
    ],
    blindSpots: [
      "Cannot control everything",
      "Others feel controlled",
      "Rigidity when losing control",
      "Cannot accept limits",
      "Anxiety when uncertain",
    ],
    actionItems: [
      "Identify what control costs",
      "Practice letting go",
      "Notice impact on relationships",
      "Learn to accept uncertainty",
      "Distinguish caring from controlling",
    ],
  },
];

// ==================== PUBLIC API ====================

export function getMindsetTypesByFamily(family: MindsetFamily): MindsetType[] {
  const allTypes = [
    ...growthOrientationTypes,
    ...beliefSystemTypes,
    ...selfPerceptionTypes,
    ...emotionalThinkingTypes,
    ...cognitiveStyleTypes,
    ...resiliencePatternTypes,
    ...controlPerspectiveTypes,
  ];
  return allTypes.filter((type) => type.family === family);
}

export function getAllMindsetTypes(): MindsetType[] {
  return [
    ...growthOrientationTypes,
    ...beliefSystemTypes,
    ...selfPerceptionTypes,
    ...emotionalThinkingTypes,
    ...cognitiveStyleTypes,
    ...resiliencePatternTypes,
    ...controlPerspectiveTypes,
  ];
}

export function getMindsetType(id: string): MindsetType | undefined {
  const allTypes = getAllMindsetTypes();
  return allTypes.find((type) => type.id === id);
}
