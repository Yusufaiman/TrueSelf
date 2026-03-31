// ==================== LIFE PATTERNS TYPES ====================
// Understanding repeated behaviors, habits, and cycles that shape your life over time

export type LifePatternFamily =
  | "habit-formation"
  | "decision-patterns"
  | "behavioral-cycles"
  | "productivity-patterns"
  | "self-sabotage"
  | "discipline-consistency"
  | "adaptation-patterns";

export interface LifePatternType {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  family: LifePatternFamily;
  fullDesc: string;
  behavior: string[];
  strengths: string[];
  blindSpots: string[];
  actionItems: string[];
}

// ==================== HABIT FORMATION FAMILY ====================
const habitFormationTypes: LifePatternType[] = [
  {
    id: "lp-hf-1",
    name: "The Builder",
    tagline: "Builds habits steadily over time",
    shortDesc:
      "You create and maintain habits through consistency. Progress is stable and sustainable.",
    family: "habit-formation",
    fullDesc:
      "You have a natural ability to build habits gradually and maintain them over time. You understand that strong habits are built through small, repeated actions. Your progress may feel slow, but it is solid and lasting.",
    behavior: [
      "You commit to consistent small actions",
      "You view habit building as a long term process",
      "You recover quickly if you miss one day",
      "You trust the process over quick results",
      "You celebrate incremental progress",
    ],
    strengths: [
      "Sustainable habit formation",
      "Long term consistency",
      "Ability to recover from slip ups",
      "Compound effects accumulate",
      "Low stress approach to change",
    ],
    blindSpots: [
      "May progress slower than you want",
      "Could miss opportunities for rapid change",
      "Might seem unmotivated to others",
      "Gradual progress feels invisible",
      "Impatient people may frustrate you",
    ],
    actionItems: [
      "Acknowledge that your slow progress is strength",
      "Track small wins regularly",
      "Help others understand compound effects",
      "Celebrate milestones even if small",
      "Share your consistency methods",
    ],
  },
  {
    id: "lp-hf-2",
    name: "The Starter",
    tagline: "Starts strong but struggles to sustain",
    shortDesc:
      "You begin new habits with energy but often find it difficult to maintain them long term.",
    family: "habit-formation",
    fullDesc:
      "You have tremendous initial motivation when starting new habits. You can generate excitement and commitment easily. The challenge comes with sustaining that energy past the initial phase. Your momentum naturally declines after the novelty wears off.",
    behavior: [
      "You start new habits with enthusiasm",
      "Your first weeks show strong progress",
      "Motivation fades after the initial phase",
      "You struggle with the boring middle part",
      "You are drawn to new challenges",
    ],
    strengths: [
      "Excellent at starting",
      "High initial motivation",
      "Willing to try new things",
      "Enthusiasm is contagious",
      "Spark enthusiasm in others",
    ],
    blindSpots: [
      "Struggle with routine maintenance",
      "Lose momentum in the middle",
      "do not experience compounding benefits",
      "May leave many unfinished habits",
      "Others doubt your follow through",
    ],
    actionItems: [
      "Expect and plan for motivation drop",
      "Find ways to re-energize the middle phase",
      "Pair habits with existing routines",
      "Create accountability partnerships",
      "Finish one before starting next",
    ],
  },
  {
    id: "lp-hf-3",
    name: "The Drifter",
    tagline: "Lacks structured habits",
    shortDesc:
      "Your behavior is more reactive than structured. You operate without consistent routines.",
    family: "habit-formation",
    fullDesc:
      "You tend to live more in the moment than by routine. Structure does not feel natural to you. You respond to what feels right in each moment rather than following a predetermined pattern. This creates freedom but also unpredictability.",
    behavior: [
      "You prefer spontaneity to routine",
      "You react to daily needs",
      "You lack consistent daily patterns",
      "You are pulled by circumstances",
      "You adapt rather than plan",
    ],
    strengths: [
      "Flexibility and adaptability",
      "Can respond quickly to change",
      "Do not feel confined by routine",
      "Creative problem solving",
      "Natural spontaneity",
    ],
    blindSpots: [
      "lack of structure affects consistency",
      "do not build compound habits",
      "Productivity varies widely",
      "Others see you as unreliable",
      "Hard to reach long term goals",
    ],
    actionItems: [
      "Start with very small structured habits",
      "Anchor habits to existing actions",
      "Use external systems instead of willpower",
      "Automate simple decisions",
      "Build scaffolding around key areas",
    ],
  },
  {
    id: "lp-hf-4",
    name: "The Rebuilder",
    tagline: "Constantly restarting habits",
    shortDesc:
      "You often fall off track but continue trying again. Your journey is defined by repeated resets.",
    family: "habit-formation",
    fullDesc:
      "You go through cycles of starting, maintaining, and then falling off. Rather than giving up, you restart. This creates a pattern of progress, plateau, drop, and reset. You are resilient but may not be reaching your full potential.",
    behavior: [
      "You fall off your habits periodically",
      "You restart multiple times",
      "You experience guilt about lapses",
      "You have strong comeback ability",
      "Your progress is nonlinear",
    ],
    strengths: [
      "Persistent comeback ability",
      "Do not give up permanently",
      "Each cycle builds slight improvement",
      "Resilience and bounce back power",
      "Understand failure is temporary",
    ],
    blindSpots: [
      "Energy lost in restart cycles",
      "Do not experience full compound benefits",
      "Others see pattern of failure",
      "Each reset erases progress",
      "Emotional toll of repeated starts",
    ],
    actionItems: [
      "Address root cause of falling off",
      "Build in buffer days for lapses",
      "Lower barriers to restart",
      "Find pattern triggers",
      "Create reset protocol instead of guilt",
    ],
  },
];

// ==================== DECISION PATTERNS FAMILY ====================
const decisionPatternTypes: LifePatternType[] = [
  {
    id: "lp-dp-1",
    name: "The Decisive",
    tagline: "Makes clear and firm decisions",
    shortDesc:
      "You are able to make decisions confidently and move forward without excessive doubt.",
    family: "decision-patterns",
    fullDesc:
      "You trust your judgment and decide relatively quickly. Once you have decided, you move forward with confidence. You do not second guess yourself excessively. This allows you to act while others are still thinking.",
    behavior: [
      "You make decisions quickly",
      "You commit to your choice",
      "You do not ruminate after deciding",
      "You trust your gut",
      "You move forward confidently",
    ],
    strengths: [
      "Swift decision making",
      "Clear direction and focus",
      "Do not waste energy on doubt",
      "Others respect your conviction",
      "Able to move quickly",
    ],
    blindSpots: [
      "May not think through all options",
      "Could miss important information",
      "Confidence might become arrogance",
      "Others feel not heard in process",
      "Decisions may need revision",
    ],
    actionItems: [
      "Balance speed with reflection",
      "Solicit input before deciding",
      "Review past decisions objectively",
      "Build in pause for big decisions",
      "Remain open to revision",
    ],
  },
  {
    id: "lp-dp-2",
    name: "The Overthinker",
    tagline: "Analyzes decisions excessively",
    shortDesc:
      "You spend a lot of time thinking through options, sometimes delaying action due to uncertainty.",
    family: "decision-patterns",
    fullDesc:
      "You analyze decisions thoroughly. You consider multiple angles and implications. This depth is valuable but can lead to analysis paralysis. You may delay decisions while you gather more information or weigh options.",
    behavior: [
      "You think through many angles",
      "You gather extensive information",
      "You consider implications deeply",
      "You delay decisions",
      "You second guess your choices",
    ],
    strengths: [
      "Thorough analysis",
      "Consider many perspectives",
      "Avoid rash decisions",
      "Well thought out choices",
      "Details are not missed",
    ],
    blindSpots: [
      "Analysis can become paralysis",
      "Decisions get delayed",
      "Do not act on incomplete information",
      "Overthinking creates stress",
      "Others may move ahead without you",
    ],
    actionItems: [
      "Set decision deadlines",
      "Accept good enough decisions",
      "Distinguish analysis from procrastination",
      "Build confidence in your thinking",
      "Act with 70 percent information",
    ],
  },
  {
    id: "lp-dp-3",
    name: "The Impulsive",
    tagline: "Acts quickly without much reflection",
    shortDesc:
      "You make decisions based on the moment, which can lead to fast progress or mistakes.",
    family: "decision-patterns",
    fullDesc:
      "You decide and act quickly, often without deep reflection. You trust your instincts and move forward. This can lead to rapid progress or unexpected consequences. You learn through action rather than extensive planning.",
    behavior: [
      "You decide almost immediately",
      "You act before fully thinking",
      "You trust your impulses",
      "You learn through doing",
      "You create rapid momentum",
    ],
    strengths: [
      "Fast decision making",
      "Quick action and momentum",
      "Learn through experience",
      "Create possibilities through action",
      "Do not waste time deliberating",
    ],
    blindSpots: [
      "May not think consequences through",
      "Decisions sometimes backfire",
      "Others feel rushed or pressured",
      "May miss important information",
      "Impulsive choices have costs",
    ],
    actionItems: [
      "Build in small pause before acting",
      "Check impulses against values",
      "Get feedback before big decisions",
      "Reflect on past impulsive choices",
      "Balance speed with consideration",
    ],
  },
  {
    id: "lp-dp-4",
    name: "The Avoidant",
    tagline: "Avoids making decisions",
    shortDesc:
      "You delay or avoid decisions to escape discomfort, which can create stagnation.",
    family: "decision-patterns",
    fullDesc:
      "You find decision making uncomfortable and tend to delay or avoid it. You hope circumstances will decide for you or the choice will become obvious. This avoidance creates stagnation and prevents you from moving forward.",
    behavior: [
      "You delay making decisions",
      "You avoid the decision process",
      "You hope for clarity that never comes",
      "You let others decide for you",
      "You feel stuck in stagnation",
    ],
    strengths: [
      "Avoid hasty mistakes",
      "Do not force yourself",
      "Recognize uncertainty",
      "Willing to let situations develop",
      "Do not force clarity",
    ],
    blindSpots: [
      "Avoidance creates stagnation",
      "Opportunities pass you by",
      "Others make decisions for you",
      "do not move forward",
      "Discomfort builds instead of resolves",
    ],
    actionItems: [
      "Acknowledge avoidance pattern",
      "Understand discomfort is temporary",
      "Make decisions even imperfectly",
      "Start with smaller decisions",
      "Build decision making muscle",
    ],
  },
];

// ==================== BEHAVIORAL CYCLES FAMILY ====================
const behavioralCyclesTypes: LifePatternType[] = [
  {
    id: "lp-bc-1",
    name: "The Consistent Cycle",
    tagline: "Maintains steady patterns",
    shortDesc:
      "Your behavior is stable and predictable. You follow routines without extreme fluctuations.",
    family: "behavioral-cycles",
    fullDesc:
      "Your patterns are stable and predictable. You maintain consistent behavior day to day without dramatic swings. Your baseline is relatively steady. This creates reliability but can also feel monotonous.",
    behavior: [
      "Your daily patterns are similar",
      "You avoid extreme swings",
      "You are predictable to others",
      "Your energy is relatively stable",
      "You maintain steady output",
    ],
    strengths: [
      "Stability and predictability",
      "Others can rely on you",
      "Sustainable pace",
      "Stress from unpredictability avoided",
      "Consistent performance",
    ],
    blindSpots: [
      "Can feel boring or repetitive",
      "May miss opportunities for variation",
      "Others may see you as rigid",
      "Could be resistant to change",
      "Lack of excitement or novelty",
    ],
    actionItems: [
      "Appreciate stability as strength",
      "Introduce planned variety",
      "Build in flexibility within structure",
      "Use consistency for deeper goals",
      "Do not confuse stable with stuck",
    ],
  },
  {
    id: "lp-bc-2",
    name: "The High Low Cycle",
    tagline: "Alternates between extremes",
    shortDesc:
      "You experience phases of high motivation followed by periods of low energy or inactivity.",
    family: "behavioral-cycles",
    fullDesc:
      "You move between phases of high energy and motivation followed by phases of low energy. This creates a cycle of productivity and rest. The swings can be extreme. You may operate at full capacity then need significant recovery.",
    behavior: [
      "You experience high energy phases",
      "You follow with low energy phases",
      "The cycle repeats regularly",
      "You produce much during high phases",
      "You recover during low phases",
    ],
    strengths: [
      "High productivity during peaks",
      "Significant output in high phases",
      "Built in recovery time",
      "Natural rhythm to approach",
      "Intense focus when energized",
    ],
    blindSpots: [
      "Unpredictability affects others",
      "Commitments uncertain during lows",
      "Energy swings can be extreme",
      "Others struggle to adapt",
      "May look unstable",
    ],
    actionItems: [
      "Map your cycle pattern",
      "Plan for both phases",
      "Build buffer time for lows",
      "Maximize high energy purposefully",
      "Do not force high energy phases",
    ],
  },
  {
    id: "lp-bc-3",
    name: "The Chaos Loop",
    tagline: "Unpredictable and unstable patterns",
    shortDesc:
      "Your behavior lacks structure, often shifting based on mood or external conditions.",
    family: "behavioral-cycles",
    fullDesc:
      "Your behavior is highly variable and lacks predictable patterns. You react to moods, circumstances, and external factors. Your day to day can vary dramatically. This creates challenge in planning and reliability.",
    behavior: [
      "Your behavior shifts frequently",
      "You lack predictable patterns",
      "You react to mood and circumstances",
      "Your output varies widely",
      "You are internally inconsistent",
    ],
    strengths: [
      "Flexible and adaptive",
      "Respond to current needs",
      "Not bound by rigid patterns",
      "Can adjust on the fly",
      "Natural responsiveness",
    ],
    blindSpots: [
      "Unpredictability affects relationships",
      "Others cannot rely on you",
      "Hard to reach long term goals",
      "Potential feedback gets lost",
      "Your own patterns confuse you",
    ],
    actionItems: [
      "Create anchor routines",
      "Identify true triggering patterns",
      "Build in minimum commitments",
      "Use external structure",
      "Track patterns to understand them",
    ],
  },
  {
    id: "lp-bc-4",
    name: "The Plateau",
    tagline: "Stuck in repeating neutral patterns",
    shortDesc:
      "You are not progressing or declining significantly. You remain in a steady but stagnant state.",
    family: "behavioral-cycles",
    fullDesc:
      "You have reached a stable state that feels neither good nor bad. You are not declining but also not growing. You maintain your current level without momentum in either direction. This stability can feel comfortable or frustrating.",
    behavior: [
      "Your behavior maintains status quo",
      "You do not grow or decline",
      "You stay in neutral zone",
      "You lack forward momentum",
      "You repeat the same patterns",
    ],
    strengths: [
      "Stability and no crisis",
      "Manageable and predictable",
      "Safe and secure",
      "Low stress environment",
      "Predictable outcomes",
    ],
    blindSpots: [
      "No growth or progress",
      "Potential unfulfilled",
      "Lack of momentum",
      "Begin to feel stuck",
      "Opportunities pass by untaken",
    ],
    actionItems: [
      "Understand why plateau exists",
      "Identify what could move you",
      "Introduce small challenges",
      "Set specific growth targets",
      "Break the neutral comfort zone",
    ],
  },
];

// ==================== PRODUCTIVITY PATTERNS FAMILY ====================
const productivityPatternTypes: LifePatternType[] = [
  {
    id: "lp-pp-1",
    name: "The Deep Worker",
    tagline: "Focuses intensely for long periods",
    shortDesc:
      "You are able to enter deep focus and produce meaningful work without distraction.",
    family: "productivity-patterns",
    fullDesc:
      "You have the ability to enter deep work states where distractions fade and productivity soars. You can sustain focus for extended periods. You produce significant meaningful output when in this state.",
    behavior: [
      "You achieve deep focus states",
      "You eliminate distractions effectively",
      "You sustain attention for hours",
      "You produce meaningful work",
      "You prefer uninterrupted blocks",
    ],
    strengths: [
      "Deep focus capability",
      "High quality output",
      "Sustained concentration",
      "Complex problem solving",
      "Creative depth",
    ],
    blindSpots: [
      "May miss immediate responsiveness",
      "Others feel sidelined during focus",
      "Withdrawal from interruptions",
      "Hard to break from focus",
      "May neglect other areas",
    ],
    actionItems: [
      "Protect focus time intentionally",
      "Communicate focus windows",
      "Balance deep work with responsiveness",
      "Schedule collaborative time",
      "Use focus for highest impact work",
    ],
  },
  {
    id: "lp-pp-2",
    name: "The Distracted",
    tagline: "Struggles to maintain focus",
    shortDesc:
      "You are easily pulled away by distractions, making it difficult to complete tasks.",
    family: "productivity-patterns",
    fullDesc:
      "You find it challenging to maintain focus. Your attention gets pulled in multiple directions. You may start tasks but have trouble completing them. Distractions are a constant pull.",
    behavior: [
      "You are pulled by distractions easily",
      "You struggle to focus for long",
      "You start tasks but get pulled away",
      "Your attention is scattered",
      "You jump between activities",
    ],
    strengths: [
      "Responsive to environment",
      "Notice changing priorities",
      "Flexible attention",
      "Quick to help others",
      "Aware of bigger context",
    ],
    blindSpots: [
      "Difficulty completing tasks",
      "Scattered output",
      "Low productivity",
      "Hard to track progress",
      "Others see you as unfocused",
    ],
    actionItems: [
      "Remove environmental distractions",
      "Use timers and focus blocks",
      "Check notifications less often",
      "Create distraction barriers",
      "Build focus muscle gradually",
    ],
  },
  {
    id: "lp-pp-3",
    name: "The Busy but Stuck",
    tagline: "Always active but not progressing",
    shortDesc:
      "You stay occupied but do not see meaningful results. Effort does not translate into progress.",
    family: "productivity-patterns",
    fullDesc:
      "You are constantly doing things. You fill your time with activity. Yet you do not see meaningful forward progress. Your effort does not translate into results. You feel busy but stuck.",
    behavior: [
      "You stay constantly occupied",
      "You fill time with activity",
      "You lack meaningful progress",
      "You feel stuck despite effort",
      "Your activity does not compound",
    ],
    strengths: [
      "Industrious and hardworking",
      "Stay engaged and active",
      "Do not sit idle",
      "Willing to work",
      "Maintain momentum",
    ],
    blindSpots: [
      "Activity without progress",
      "Effort without results",
      "Feel trapped in busy ness",
      "Hard to see real advancement",
      "Exhaustion from empty effort",
    ],
    actionItems: [
      "Audit where time actually goes",
      "Identify high impact activities",
      "Cut low value busy work",
      "Focus on fewer things deeply",
      "Measure results not activity",
    ],
  },
  {
    id: "lp-pp-4",
    name: "The Minimalist Performer",
    tagline: "Does only what is necessary",
    shortDesc:
      "You focus on essential tasks and avoid unnecessary work, but may miss opportunities for growth.",
    family: "productivity-patterns",
    fullDesc:
      "You have learned to do only what is truly necessary. You are efficient and do not waste effort on non essentials. This creates efficiency but may limit growth. You may not take on stretching challenges.",
    behavior: [
      "You focus only on essentials",
      "You avoid unnecessary work",
      "You are efficient with effort",
      "You limit stretching challenges",
      "You find the minimum viable approach",
    ],
    strengths: [
      "Efficiency and focus",
      "Do not waste effort",
      "Clear priorities",
      "Sustainable pace",
      "Effective resource use",
    ],
    blindSpots: [
      "Limited growth from stretch",
      "May miss opportunity for development",
      "Could be seen as unmotivated",
      "Growth plateaus",
      "Do not build new capacities",
    ],
    actionItems: [
      "Balance efficiency with growth",
      "Include some stretching work",
      "Build new skills gradually",
      "Use efficiency for more impact",
      "Take on occasional challenges",
    ],
  },
];

// ==================== SELF SABOTAGE FAMILY ====================
const selfSabotageTypes: LifePatternType[] = [
  {
    id: "lp-ss-1",
    name: "The Procrastinator",
    tagline: "Delays important actions",
    shortDesc:
      "You postpone tasks even when you know they matter, often due to discomfort or fear.",
    family: "self-sabotage",
    fullDesc:
      "You delay important actions even when you know they are important. Something about starting creates resistance. You postpone through distraction or avoidance. Often the pressure of a deadline finally pushes you forward.",
    behavior: [
      "You delay starting important tasks",
      "You feel resistance to beginning",
      "You use distractions to delay",
      "You wait until pressure builds",
      "You often act last minute",
    ],
    strengths: [
      "Perform well under pressure",
      "Can generate urgency",
      "Last minute push ability",
      "Do work when necessary",
      "Adaptable to deadlines",
    ],
    blindSpots: [
      "Create unnecessary stress",
      "Quality suffers from rush",
      "Others see you as unreliable",
      "Missed opportunities",
      "Energy wasted on guilt",
    ],
    actionItems: [
      "Understand what causes resistance",
      "Break tasks into smaller steps",
      "Start before you feel ready",
      "Build in buffer time",
      "Reduce reliance on pressure",
    ],
  },
  {
    id: "lp-ss-2",
    name: "The Self Doubter Loop",
    tagline: "Undermines own progress",
    shortDesc:
      "You question your ability and pull back just when progress begins.",
    family: "self-sabotage",
    fullDesc:
      "As you make progress, doubt creeps in. You begin to question your ability. Just when momentum builds, you pull back. You sabotage your own progress through self doubt. You may not even realize you are doing it.",
    behavior: [
      "You make progress then doubt",
      "You question your ability",
      "You pull back when succeeding",
      "You sabotage from within",
      "You undermine your own work",
    ],
    strengths: [
      "Realistic about challenges",
      "Do not overestimate abilities",
      "Humble and grounded",
      "Aware of risks",
      "Cautious and careful",
    ],
    blindSpots: [
      "Self doubt becomes sabotage",
      "Pull back just when succeeding",
      "Miss opportunities from doubt",
      "Create unnecessary obstacles",
      "Underestimate your abilities",
    ],
    actionItems: [
      "Notice when doubt appears",
      "Challenge doubt with evidence",
      "Build confidence gradually",
      "Track your actual capabilities",
      "Push through doubt discomfort",
    ],
  },
  {
    id: "lp-ss-3",
    name: "The Fear Avoider",
    tagline: "Avoids risk and uncertainty",
    shortDesc:
      "You choose safety over growth, which can limit long term potential.",
    family: "self-sabotage",
    fullDesc:
      "You are motivated by safety and avoiding risk. Growth requires uncertainty and some risk. You choose the known over the unknown. This protects you from some harms but limits your potential.",
    behavior: [
      "You avoid uncertain situations",
      "You choose safety over growth",
      "You stick with known approaches",
      "You fear failure or loss",
      "You do not venture beyond comfort",
    ],
    strengths: [
      "Avoid serious mistakes",
      "Do not take unnecessary risks",
      "Protect what you have",
      "Cautious and careful",
      "Think before leaping",
    ],
    blindSpots: [
      "Limit growth potential",
      "Miss opportunities from fear",
      "Stagnate in safety",
      "Never discover capabilities",
      "Opportunities pass by",
    ],
    actionItems: [
      "Understand your fear patterns",
      "Take small calculated risks",
      "Build confidence through small wins",
      "Learn that failure is temporary",
      "Balance safety with growth",
    ],
  },
  {
    id: "lp-ss-4",
    name: "The Perfection Trap",
    tagline: "Stuck chasing flawless results",
    shortDesc:
      "You delay action because outcomes are not perfect, which prevents completion.",
    family: "self-sabotage",
    fullDesc:
      "Perfect becomes the enemy of good. You hold work to such high standards that completion becomes difficult. You delay finishing because it is not perfect yet. This perfectionism prevents you from shipping.",
    behavior: [
      "You hold high quality standards",
      "You delay finishing work",
      "You keep revising endlessly",
      "Perfect outcomes never come",
      "You struggle to ship",
    ],
    strengths: [
      "High quality standards",
      "Attention to detail",
      "Thorough work",
      "Care about outcomes",
      "Excellence oriented",
    ],
    blindSpots: [
      "Perfect prevents completion",
      "Endless revision cycle",
      "Miss deadline from perfectionism",
      "Work never ships",
      "Others see you as unmotivated",
    ],
    actionItems: [
      "Define good enough clearly",
      "Set completion deadlines",
      "Release work before perfect",
      "iterate based on feedback",
      "Accept 80 percent excellence",
    ],
  },
];

// ==================== DISCIPLINE & CONSISTENCY FAMILY ====================
const disciplineConsistencyTypes: LifePatternType[] = [
  {
    id: "lp-dc-1",
    name: "The Disciplined",
    tagline: "Follows through regardless of mood",
    shortDesc:
      "You act based on commitment rather than emotion. You continue even when motivation is low.",
    family: "discipline-consistency",
    fullDesc:
      "You have the ability to follow through regardless of your emotional state. You act based on commitment and values, not just feelings. When you commit, you maintain that commitment even when motivation fades.",
    behavior: [
      "You follow through on commitments",
      "Emotion does not derail you",
      "You act regardless of mood",
      "You maintain long term continuity",
      "You trust your commitment",
    ],
    strengths: [
      "Reliable follow through",
      "Commit and deliver",
      "Fulfill promises",
      "Others trust your word",
      "Sustain effort over time",
    ],
    blindSpots: [
      "Might ignore feelings",
      "Could push too hard",
      "May not honor needs",
      "Risk burnout from pushing",
      "May seem robotic",
    ],
    actionItems: [
      "Balance discipline with self care",
      "Honor your emotions too",
      "Do not push through real burnout",
      "Check with your body and needs",
      "Adjust commitments when necessary",
    ],
  },
  {
    id: "lp-dc-2",
    name: "The Mood Based",
    tagline: "Acts based on how you feel",
    shortDesc:
      "Your consistency depends on your emotional state. When you feel good, you perform. When you do not, you stop.",
    family: "discipline-consistency",
    fullDesc:
      "Your follow through directly depends on how you feel. When you feel good, energized, or inspired, you maintain consistency. When you feel down, tired, or unmotivated, you stop. This creates unpredictable patterns.",
    behavior: [
      "Your performance depends on mood",
      "Good mood drives action",
      "Bad mood stops action",
      "Consistency varies with feelings",
      "You respond to emotion",
    ],
    strengths: [
      "Honor your authentic state",
      "Do not force when unwell",
      "Respect your emotional needs",
      "Perform best when engaged",
      "Genuine follow through",
    ],
    blindSpots: [
      "Inconsistent reliability",
      "Commitments dependent on feeling",
      "Others cannot predict you",
      "Hard to maintain long term",
      "Difficult during low periods",
    ],
    actionItems: [
      "Build minimum commitment",
      "Find emotional triggers for action",
      "Create structure to reduce mood impact",
      "Work on emotional resilience",
      "Separate emotion from commitment",
    ],
  },
  {
    id: "lp-dc-3",
    name: "The Inconsistent",
    tagline: "Struggles with follow through",
    shortDesc: "You find it difficult to maintain consistent action over time.",
    family: "discipline-consistency",
    fullDesc:
      "You struggle with maintaining consistency. Something about sticking with things does not come naturally. You may start strong but fade. Or you may struggle from the beginning. Consistency is not your natural pattern.",
    behavior: [
      "You struggle with consistency",
      "You do not follow through reliably",
      "You tire of maintaining effort",
      "You lack staying power",
      "You are internally inconsistent",
    ],
    strengths: [
      "Flexible and adaptable",
      "Do not rigidly stick",
      "Change when needed",
      "Adjust approaches",
      "Not locked into patterns",
    ],
    blindSpots: [
      "Cannot rely on yourself",
      "Others do not trust you",
      "Do not achieve goals",
      "Hard to build on progress",
      "Potential goes unrealized",
    ],
    actionItems: [
      "Understand what prevents consistency",
      "Start with smaller commitments",
      "Build accountability structures",
      "Find your natural rhythm",
      "Use systems to maintain efforts",
    ],
  },
  {
    id: "lp-dc-4",
    name: "The Structured Executor",
    tagline: "Relies on systems and routines",
    shortDesc:
      "You use structure and planning to maintain consistency instead of relying on motivation.",
    family: "discipline-consistency",
    fullDesc:
      "You maintain consistency through structure and systems rather than willpower or motivation. You have routines, processes, and external scaffolding that keep you moving. You build your environment to support follow through.",
    behavior: [
      "You create systems and routines",
      "You rely on structure not motivation",
      "You build supporting processes",
      "You use external accountability",
      "You maintain through systems",
    ],
    strengths: [
      "System based consistency",
      "Do not rely on willpower",
      "Sustainable approach",
      "Others can support your systems",
      "Reliable follow through",
    ],
    blindSpots: [
      "Systems can become rigid",
      "lose flexibility",
      "Over rely on structure",
      "May break when system fails",
      "Do not develop internal discipline",
    ],
    actionItems: [
      "Keep systems flexible",
      "Build in adaptation capability",
      "Regularly review and update systems",
      "Do not become overly dependent",
      "Develop internal discipline too",
    ],
  },
];

// ==================== ADAPTATION PATTERNS FAMILY ====================
const adaptationPatternTypes: LifePatternType[] = [
  {
    id: "lp-ap-1",
    name: "The Adaptive",
    tagline: "Adjusts easily to change",
    shortDesc:
      "You are flexible and able to shift direction when circumstances change.",
    family: "adaptation-patterns",
    fullDesc:
      "You naturally adjust to new situations and changes. You are flexible and responsive. When circumstances shift, you shift with them. You do not resist change but flow with it.",
    behavior: [
      "You adjust to new situations",
      "You accept change readily",
      "You shift direction easily",
      "You are internally flexible",
      "You flow with circumstances",
    ],
    strengths: [
      "Natural adaptability",
      "Flexibility and responsiveness",
      "Thrive in change",
      "Do not resist",
      "Go with the flow",
    ],
    blindSpots: [
      "May lack clear direction",
      "Could be seen as not standing firm",
      "Shift too easily",
      "Lack internal compass",
      "May follow others lead",
    ],
    actionItems: [
      "Balance flexibility with values",
      "Maintain core commitments",
      "Adapt without losing direction",
      "Stand firm when it matters",
      "Use flexibility appropriately",
    ],
  },
  {
    id: "lp-ap-2",
    name: "The Resistant",
    tagline: "Struggles with change",
    shortDesc:
      "You prefer stability and may resist adapting to new situations or environments.",
    family: "adaptation-patterns",
    fullDesc:
      "You prefer things to remain stable and familiar. Change makes you uncomfortable. You may resist new situations or take longer to adjust. Stability feels safe. Change feels disruptive.",
    behavior: [
      "You prefer stability",
      "You resist change",
      "You take time to adjust",
      "You hold onto familiar",
      "You struggle with disruption",
    ],
    strengths: [
      "Stable and grounded",
      "Do not chase every new thing",
      "Commit to what works",
      "Value continuity",
      "Consistent approach",
    ],
    blindSpots: [
      "Miss opportunities from change",
      "Struggle when change forced",
      "Slow to adapt",
      "May get left behind",
      "Risk stagnation",
    ],
    actionItems: [
      "Understand change fear",
      "Take small adaptation steps",
      "Build confidence in flexibility",
      "Recognize when change is needed",
      "Practice gradual transition",
    ],
  },
  {
    id: "lp-ap-3",
    name: "The Opportunist",
    tagline: "Seizes opportunities quickly",
    shortDesc:
      "You are quick to take advantage of changes and new possibilities.",
    family: "adaptation-patterns",
    fullDesc:
      "You notice when things change and quickly see opportunities. You are ready to shift and take advantage. Your responsiveness to change is swift. You spot possibilities others miss.",
    behavior: [
      "You notice changes quickly",
      "You identify opportunities",
      "You act on new possibilities",
      "You pivot direction",
      "You seize the moment",
    ],
    strengths: [
      "Quick opportunity spotting",
      "Swift action",
      "Gain advantage from change",
      "Responsive and alert",
      "Create possibilities",
    ],
    blindSpots: [
      "May jump too hastily",
      "Spread yourself thin",
      "Lose focus from many opportunities",
      "Others feel whiplash",
      "May miss depth for breadth",
    ],
    actionItems: [
      "Evaluate opportunities carefully",
      "Distinguish real from false opportunities",
      "Balance action with strategy",
      "Do not abandon current commitments",
      "Focus where it matters most",
    ],
  },
  {
    id: "lp-ap-4",
    name: "The Stuck Pattern",
    tagline: "Repeats the same behaviors",
    shortDesc:
      "You find yourself repeating similar actions and outcomes, even when they are not effective.",
    family: "adaptation-patterns",
    fullDesc:
      "You repeat the same patterns even when they do not work. You know something is not working but continue the same approach. Breaking the pattern feels difficult. You seem stuck in a behavioral loop.",
    behavior: [
      "You repeat the same patterns",
      "You do not adapt even when failing",
      "You know patterns do not work",
      "You continue anyway",
      "You cannot seem to shift",
    ],
    strengths: [
      "Consistent in your approach",
      "Do not adopt every new thing",
      "Stick with what you know",
      "Loyal to your methods",
      "Persistent",
    ],
    blindSpots: [
      "Repeat ineffective patterns",
      "Miss opportunities to evolve",
      "Stay trapped in cycles",
      "Cannot break free",
      "Results remain the same",
    ],
    actionItems: [
      "Acknowledge stuck patterns",
      "Identify underlying pattern",
      "Get perspective from others",
      "Take one small different action",
      "Build new pattern gradually",
    ],
  },
];

// ==================== PUBLIC API ====================

export function getLifePatternTypesByFamily(
  family: LifePatternFamily,
): LifePatternType[] {
  const allTypes = [
    ...habitFormationTypes,
    ...decisionPatternTypes,
    ...behavioralCyclesTypes,
    ...productivityPatternTypes,
    ...selfSabotageTypes,
    ...disciplineConsistencyTypes,
    ...adaptationPatternTypes,
  ];
  return allTypes.filter((type) => type.family === family);
}

export function getAllLifePatternTypes(): LifePatternType[] {
  return [
    ...habitFormationTypes,
    ...decisionPatternTypes,
    ...behavioralCyclesTypes,
    ...productivityPatternTypes,
    ...selfSabotageTypes,
    ...disciplineConsistencyTypes,
    ...adaptationPatternTypes,
  ];
}

export function getLifePatternType(id: string): LifePatternType | undefined {
  const allTypes = getAllLifePatternTypes();
  return allTypes.find((type) => type.id === id);
}
