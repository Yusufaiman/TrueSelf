// ==================== MONEY TYPES ====================
// Understanding how you think, behave, and emotionally relate to money

export type MoneyFamily =
  | "money-mindset"
  | "spending-behavior"
  | "saving-security"
  | "earning-style"
  | "wealth-strategy"
  | "risk-investment"
  | "emotional-patterns"
  | "scarcity-abundance";

export interface MoneyType {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  family: MoneyFamily;
  fullDesc: string;
  thinking: string[];
  behavior: string[];
  strengths: string[];
  blindSpots: string[];
  actionItems: string[];
}

// ==================== MONEY MINDSET FAMILY ====================
const moneyMindsetTypes: MoneyType[] = [
  {
    id: "m-mm-1",
    name: "The Abundant Thinker",
    tagline: "Sees money as something that can grow",
    shortDesc:
      "You believe opportunities are everywhere. You focus on creating value and expanding your financial capacity over time.",
    family: "money-mindset",
    fullDesc:
      "You operate from a belief that money and opportunity are expandable. You see financial growth as possible through effort, creativity, and resourcefulness. You focus on what you can create rather than what you might lose.",
    thinking: [
      "Money can grow through effort and creativity",
      "Opportunities are abundant all around",
      "Financial growth is achievable through strategy",
      "Scarcity is a mindset, not reality",
      "Your earning capacity can always expand",
    ],
    behavior: [
      "You look for ways to create value",
      "You invest in growth opportunities",
      "You take initiative financially",
      "You focus on expanding capabilities",
      "You stay alert to new opportunities",
    ],
    strengths: [
      "Growth mindset",
      "Optimistic about financial potential",
      "Takes action toward goals",
      "Sees possibilities others miss",
      "Attracts opportunity through energy",
    ],
    blindSpots: [
      "May overestimate your capacity",
      "Can underestimate risks",
      "Might take unnecessary financial risks",
      "Could neglect current security",
      "May minimize realistic constraints",
    ],
    actionItems: [
      "Balance optimism with risk assessment",
      "Plan for failures and downturns",
      "Build security alongside growth",
      "Test ideas before large commitment",
      "Learn from financial mistakes",
    ],
  },
  {
    id: "m-mm-2",
    name: "The Scarcity Thinker",
    tagline: "Sees money as limited and fragile",
    shortDesc:
      "You often worry about losing money. Security feels more important than growth.",
    family: "money-mindset",
    fullDesc:
      "You operate from a fear of not having enough. Resources feel limited and fragile. You focus on protecting what you have rather than expanding. This mindset drives conservative decisions and constant vigilance.",
    thinking: [
      "Money is scarce and hard to keep",
      "I could lose everything at any moment",
      "Growth efforts feel risky and futile",
      "Safety is more important than opportunity",
      "You cannot trust financial stability",
    ],
    behavior: [
      "You prioritize saving over spending",
      "You avoid unnecessary risks",
      "You hold tightly to money",
      "You worry about future gaps",
      "You plan for disaster scenarios",
    ],
    strengths: [
      "Prepared for emergencies",
      "Strong safety awareness",
      "Protective of resources",
      "Cautious decision making",
      "Low likelihood of reckless spending",
    ],
    blindSpots: [
      "Worry limits growth opportunities",
      "Miss positive financial possibilities",
      "Excessive caution becomes limiting",
      "Stress impacts peace of mind",
      "Never feel financially secure",
    ],
    actionItems: [
      "Acknowledge scarcity pattern origins",
      "Build confidence through small wins",
      "Distinguish real vs. imagined risks",
      "Gradually take calculated risks",
      "Celebrate financial progress",
    ],
  },
  {
    id: "m-mm-3",
    name: "The Neutral Operator",
    tagline: "Treats money as a practical tool",
    shortDesc:
      "You make financial decisions logically. Money does not define your identity or emotions.",
    family: "money-mindset",
    fullDesc:
      "You view money through a practical lens. You make financial decisions based on logic and utility rather than emotion or identity. Money serves a function but does not define who you are.",
    thinking: [
      "Money is a tool to get what you need",
      "Financial decisions are logical problems",
      "Emotion should not influence money choices",
      "Money does not define my worth",
      "Efficiency and functionality matter most",
    ],
    behavior: [
      "You approach finances systematically",
      "You make objective financial decisions",
      "You are not driven by status or display",
      "You focus on practical outcomes",
      "You avoid emotional financial choices",
    ],
    strengths: [
      "Clear headed financial decisions",
      "Do not let emotion cloud judgment",
      "Consistent and rational approach",
      "Less vulnerable to financial impulsivity",
      "Objective problem solving",
    ],
    blindSpots: [
      "May miss enjoyment and quality of life",
      "Over optimize for efficiency",
      "Do not consider emotional needs",
      "Relationships may suffer from practicality",
      "Missing human element in decisions",
    ],
    actionItems: [
      "Balance logic with life enjoyment",
      "Include quality of life in decisions",
      "Consider emotional needs too",
      "Share your values in financial choices",
      "Find meaning in financial decisions",
    ],
  },
  {
    id: "m-mm-4",
    name: "The Identity Driven",
    tagline: "Self worth tied to financial status",
    shortDesc:
      "Your confidence and sense of value are influenced by how much you earn or achieve financially.",
    family: "money-mindset",
    fullDesc:
      "Your financial status shapes your identity and self worth. Earning more directly impacts your confidence. Financial setbacks feel like personal failures. You may use money and status as external validation of your value.",
    thinking: [
      "My income reflects my worth",
      "Financial success = personal success",
      "Status and achievement are connected",
      "Others judge me by what I have",
      "Money proves my capabilities",
    ],
    behavior: [
      "You pursue income growth aggressively",
      "You seek visible status symbols",
      "You tie self esteem to earnings",
      "You feel shame around financial setbacks",
      "You compare yourself to others financially",
    ],
    strengths: [
      "Highly motivated to earn",
      "Driven to achieve financial goals",
      "Ambitious and goal oriented",
      "Push yourself to higher levels",
      "Take financial growth seriously",
    ],
    blindSpots: [
      "Vulnerability to financial setback",
      "Over focus on external validation",
      "Difficulty separating worth from money",
      "Stress from constant performance drive",
      "Relationship strain from competition",
    ],
    actionItems: [
      "Separate identity from financial status",
      "Build self worth independent of money",
      "Find value beyond achievement",
      "Learn from financial setbacks",
      "Reduce comparison with others",
    ],
  },
];

// ==================== SPENDING BEHAVIOR FAMILY ====================
const spendingBehaviorTypes: MoneyType[] = [
  {
    id: "m-sb-1",
    name: "The Intentional Spender",
    tagline: "Spends with clarity and purpose",
    shortDesc:
      "You are mindful with money. Every expense aligns with your priorities and values.",
    family: "spending-behavior",
    fullDesc:
      "You spend thoughtfully and with intention. Before purchasing, you consider alignment with your values and needs. Your spending reflects your priorities. Financial decisions feel authentic and aligned.",
    thinking: [
      "Spending should align with my values",
      "Every dollar has a purpose",
      "Mindful spending creates satisfaction",
      "I should know where my money goes",
      "Quality matters more than quantity",
    ],
    behavior: [
      "You think before spending",
      "You track and categorize spending",
      "You buy what aligns with values",
      "You avoid impulse purchases",
      "You choose quality over quantity",
    ],
    strengths: [
      "Financial awareness and control",
      "Spending aligns with values",
      "Reduced buyer's remorse",
      "Intentional life choices",
      "Clear priorities guide decisions",
    ],
    blindSpots: [
      "May be too restrictive",
      "Can miss spontaneous joy",
      "Over analyze spending decisions",
      "Others may see you as rigid",
      "Enjoyment sometimes sacrificed",
    ],
    actionItems: [
      "Allow spontaneous spending sometimes",
      "Include joy in spending plan",
      "Balance intention with pleasure",
      "Share spending philosophy with others",
      "Adjust criteria as life changes",
    ],
  },
  {
    id: "m-sb-2",
    name: "The Emotional Spender",
    tagline: "Spends based on feelings",
    shortDesc:
      "You often use money to manage emotions such as stress, boredom, or reward.",
    family: "spending-behavior",
    fullDesc:
      "Your spending is driven by emotion. You buy to feel better, escape stress, celebrate wins, or fill boredom. Money becomes a tool for emotional regulation. This creates financial unpredictability and sometimes regret.",
    thinking: [
      "Shopping helps when I feel down",
      "Spending is a form of self care",
      "I deserve to reward myself",
      "Buying makes me feel better",
      "Money is for enjoying life",
    ],
    behavior: [
      "You spend more when stressed or sad",
      "You buy to celebrate or reward",
      "You shop for comfort",
      "Your spending varies with mood",
      "You often buy things you do not need",
    ],
    strengths: [
      "You enjoy the pleasure of spending",
      "Reward yourself for achievements",
      "Willingness to use resources",
      "Life feels enjoyable",
      "Not overly restrictive",
    ],
    blindSpots: [
      "Spending patterns are unpredictable",
      "High likelihood of regret purchases",
      "Budget gets exceeded regularly",
      "Debt accumulation risk",
      "Using money as band aid for feelings",
    ],
    actionItems: [
      "Identify your emotional spending triggers",
      "Find alternative coping mechanisms",
      "Create spending limits by category",
      "Pause before emotional purchases",
      "Address underlying emotions",
    ],
  },
  {
    id: "m-sb-3",
    name: "The Restrained",
    tagline: "Holds back spending excessively",
    shortDesc:
      "You struggle to spend even when it would improve your life. Saving feels safer than using money.",
    family: "spending-behavior",
    fullDesc:
      "You hold back spending even when you could afford it. Spending creates anxiety. Using money feels like a loss. You would rather save than enjoy resources. This restraint protects financially but limits quality of life.",
    thinking: [
      "Spending money feels like waste",
      "Saving is always better than spending",
      "Using money is risky",
      "I should preserve every dollar",
      "Enjoyment is not worth the cost",
    ],
    behavior: [
      "You avoid spending even when needed",
      "You delay purchases indefinitely",
      "You feel guilty about spending",
      "You buy less than you deserve",
      "You sacrifice comfort for security",
    ],
    strengths: [
      "Strong savings discipline",
      "Financial security through restraint",
      "Low impulse buying",
      "Protective of resources",
      "Financial stability",
    ],
    blindSpots: [
      "Miss out on life quality",
      "Savings feel pointless if never used",
      "Relationships suffer from deprivation",
      "Spend-guilt cycle ineffective",
      "Over prioritize security",
    ],
    actionItems: [
      "Give yourself permission to spend",
      "Plan budget for enjoyment",
      "Start with small spending experiments",
      "Realize money can buy happiness",
      "Balance saving with living",
    ],
  },
  {
    id: "m-sb-4",
    name: "The Impulsive Buyer",
    tagline: "Spends quickly without planning",
    shortDesc:
      "You act fast on wants and desires. Decisions are often made in the moment.",
    family: "spending-behavior",
    fullDesc:
      "You buy quickly without extensive deliberation. Impulse and desire drive your spending. You see something, you want it, you buy it. This creates spontaneity and excitement but also financial chaos and regret.",
    thinking: [
      "I want it so I should have it",
      "Life is short, enjoy now",
      "Thinking too much kills the fun",
      "Opportunities might disappear",
      "Happiness is worth the cost",
    ],
    behavior: [
      "You make quick spending decisions",
      "You purchase without reflection",
      "You follow desires immediately",
      "You often exceed budget",
      "You accumulate things you do not use",
    ],
    strengths: [
      "Embrace life and enjoyment",
      "Take action fast",
      "Do not delay gratification",
      "Spontaneous and fun",
      "Life feels exciting",
    ],
    blindSpots: [
      "Financial chaos and regret",
      "Budget constantly exceeded",
      "Clutter from unused purchases",
      "Debt accumulation risks",
      "Future security compromised",
    ],
    actionItems: [
      "Implement 24 hour wait rule",
      "Track impulse purchases",
      "Set spending limits",
      "Create specific budgets",
      "Find non spending rewards",
    ],
  },
];

// ==================== SAVING & SECURITY FAMILY ====================
const savingSecurityTypes: MoneyType[] = [
  {
    id: "m-ss-1",
    name: "The Security Builder",
    tagline: "Focused on financial safety",
    shortDesc:
      "You prioritize savings and stability. You want to feel protected from uncertainty.",
    family: "saving-security",
    fullDesc:
      "You build wealth primarily for security. Your goal is a financial buffer against the unexpected. You want emergency funds, safety nets, and protection. Security feels more valuable than growth potential.",
    thinking: [
      "Safety is my highest financial priority",
      "Emergency funds prevent disaster",
      "Financial buffers reduce stress",
      "Unexpected events always happen",
      "Security enables peace of mind",
    ],
    behavior: [
      "You build emergency savings",
      "You prioritize safety nets",
      "You avoid risky investments",
      "You maintain financial buffers",
      "You plan for uncertainty",
    ],
    strengths: [
      "Financial resilience to shocks",
      "Peace of mind through security",
      "Prepared for emergencies",
      "Low financial stress",
      "Able to help others",
    ],
    blindSpots: [
      "May over prioritize safety",
      "Missing growth opportunities",
      "Excessive risk avoidance",
      "Accumulation without purpose",
      "Security never feels sufficient",
    ],
    actionItems: [
      "Define what security looks like",
      "Allocate portion for growth",
      "Balance protection with progress",
      "Invest surplus responsibly",
      "Acknowledge your progress",
    ],
  },
  {
    id: "m-ss-2",
    name: "The Minimal Saver",
    tagline: "Lives more in the present than the future",
    shortDesc: "You prefer using money now rather than storing it for later.",
    family: "saving-security",
    fullDesc:
      "You prioritize present enjoyment over future security. Why save for later when you could use money today? Saving feels restrictive. Living now feels more important than preparing for uncertainty.",
    thinking: [
      "Life is now, not tomorrow",
      "Future is uncertain anyway",
      "Enjoyment should not wait",
      "Saving is sacrificing today",
      "I should use money while I can",
    ],
    behavior: [
      "You spend most of what you earn",
      "You save only when necessary",
      "You prioritize experiences",
      "You do not maintain emergency fund",
      "You live paycheck to paycheck",
    ],
    strengths: [
      "Enjoy life now",
      "Experience focused",
      "Not constrained by worry",
      "Live authentically",
      "Relationships often richer",
    ],
    blindSpots: [
      "Vulnerable to financial crisis",
      "No safety net for emergencies",
      "Stress from lack of security",
      "Limited options in hardship",
      "Cannot help others",
    ],
    actionItems: [
      "Start small savings habit",
      "Build minimal emergency fund",
      "Protect yourself from crisis",
      "Find balance between now and later",
      "Understand future consequences",
    ],
  },
  {
    id: "m-ss-3",
    name: "The Over Saver",
    tagline: "Saves out of fear rather than strategy",
    shortDesc:
      "You hold onto money tightly and rarely feel financially secure.",
    family: "saving-security",
    fullDesc:
      "You save excessively driven by underlying fear. No amount of savings feels sufficient. You hold onto money out of anxiety rather than strategy. Spending feels threatening even when you have substantial reserves.",
    thinking: [
      "I can never have enough saved",
      "Something terrible could happen",
      "I need to save for every possibility",
      "Spending is a threat",
      "Security is the only priority",
    ],
    behavior: [
      "You save obsessively",
      "You struggle to spend even when needed",
      "You refuse enjoyment for saving",
      "You accumulate without purpose",
      "You feel anxious about spending",
    ],
    strengths: [
      "Strong financial reserves",
      "Significant security built",
      "Rarely in financial crisis",
      "Can help others generously",
      "Protected from uncertainty",
    ],
    blindSpots: [
      "Never feel secure despite savings",
      "Quality of life diminished",
      "Relationships suffer from deprivation",
      "Savings have no purpose",
      "Fear drives rather than strategy",
    ],
    actionItems: [
      "Address underlying fear patterns",
      "Define sufficient security",
      "Give yourself permission to spend",
      "Use savings purposefully",
      "Enjoy what you have built",
    ],
  },
  {
    id: "m-ss-4",
    name: "The Balanced Planner",
    tagline: "Balances saving and living",
    shortDesc:
      "You manage money in a way that supports both present enjoyment and future security.",
    family: "saving-security",
    fullDesc:
      "You strike a healthy balance between saving and enjoying. You prepare for the future without sacrificing the present. You feel secure enough to spend and enjoy enough to feel fulfilled. Your approach is sustainable and healthy.",
    thinking: [
      "Balance is key to financial health",
      "Present and future both matter",
      "I can enjoy and still save",
      "Security enables peace of mind",
      "Life is about both now and later",
    ],
    behavior: [
      "You maintain emergency savings",
      "You allocate for both spending and saving",
      "You enjoy intentional experiences",
      "You plan for future while living now",
      "You make balanced decisions",
    ],
    strengths: [
      "Balance between security and enjoyment",
      "Healthy financial life",
      "Peace of mind without deprivation",
      "Sustainable long term approach",
      "Relationships not strained",
    ],
    blindSpots: [
      "May seem boring to extremists",
      "Middle ground sometimes feels compromise",
      "Not maximizing any single goal",
      "Risk of drifting without clear focus",
      "May lack passion",
    ],
    actionItems: [
      "Clarify your specific goals",
      "Regularly review and adjust",
      "Continue balanced approach",
      "Build on your success",
      "Help others find balance",
    ],
  },
];

// ==================== EARNING STYLE FAMILY ====================
const earningStyleTypes: MoneyType[] = [
  {
    id: "m-es-1",
    name: "The Climber",
    tagline: "Focused on steady income growth",
    shortDesc:
      "You aim to increase your earnings step by step through structured progress.",
    family: "earning-style",
    fullDesc:
      "Your focus is on steady, predictable income growth. You follow a structured path upward. You invest in skills and advancement. Growth is deliberate and planned through traditional progression.",
    thinking: [
      "Income should grow steadily",
      "Advancement comes through skill and effort",
      "Long term planning brings growth",
      "Structure provides stability",
      "Progress should be measurable",
    ],
    behavior: [
      "You seek promotions and raises",
      "You invest in skill development",
      "You follow career paths",
      "You plan financial growth",
      "You work toward higher positions",
    ],
    strengths: [
      "Steady income progression",
      "Clear advancement path",
      "Measurable progress",
      "Predictable growth",
      "Stability maintained",
    ],
    blindSpots: [
      "May miss opportunities outside structure",
      "Could be limited by rigid paths",
      "Fast growth opportunities missed",
      "Dependent on employer",
      "May lack flexibility",
    ],
    actionItems: [
      "Keep eyes open for opportunities",
      "Build skills beyond job requirements",
      "Maintain flexibility to jump",
      "Network beyond current role",
      "Consider multiple growth paths",
    ],
  },
  {
    id: "m-es-2",
    name: "The Opportunist",
    tagline: "Finds and takes income opportunities",
    shortDesc: "You are flexible and open to multiple ways of making money.",
    family: "earning-style",
    fullDesc:
      "You stay alert for income opportunities. You are comfortable with multiple income streams. You pivot when something better appears. Your earning strategy is flexible and responsive to opportunity.",
    thinking: [
      "Money can come from many sources",
      "Opportunities are everywhere",
      "Flexibility is my advantage",
      "Fast action captures opportunity",
      "Multiple streams are safer",
    ],
    behavior: [
      "You explore different income sources",
      "You take side opportunities",
      "You maintain multiple income streams",
      "You change when beneficial",
      "You network actively",
    ],
    strengths: [
      "Multiple income streams",
      "Flexibility and adaptability",
      "Income growth potential",
      "Not dependent on single source",
      "See and take opportunities",
    ],
    blindSpots: [
      "Scattered across too many efforts",
      "Lack focus and mastery",
      "Unstable income",
      "Others may see you as unfocused",
      "Deep expertise may suffer",
    ],
    actionItems: [
      "Prioritize your highest value opportunities",
      "Build depth alongside breadth",
      "Create some income stability",
      "Focus your strongest efforts",
      "Build reputation in key areas",
    ],
  },
  {
    id: "m-es-3",
    name: "The Stabilizer",
    tagline: "Prefers consistent and predictable income",
    shortDesc:
      "You value stability and reliability over fast financial growth.",
    family: "earning-style",
    fullDesc:
      "You prioritize consistency and predictability in income. You prefer knowing what you will earn. Fast growth is less appealing than steady, dependable income. Your approach is conservative and security focused.",
    thinking: [
      "Predictable income brings peace",
      "Stability matters more than growth",
      "Reliable is better than fast",
      "I value security over opportunity",
      "Consistency is its own reward",
    ],
    behavior: [
      "You stay in stable positions",
      "You avoid risky ventures",
      "You prefer salary over commission",
      "You prioritize job security",
      "You avoid uncertainty",
    ],
    strengths: [
      "Predictable income",
      "Low financial stress",
      "Reliable planning possible",
      "Peace of mind",
      "Loyalty valued",
    ],
    blindSpots: [
      "May miss high growth opportunities",
      "Risk aversion limits potential",
      "Could be stuck in mediocre situation",
      "Change feels threatening",
      "Income may stagnate",
    ],
    actionItems: [
      "Evaluate if stability serves you",
      "Take calculated risks gradually",
      "Seek growth within security",
      "Develop confidence in new situations",
      "Build skills for transitions",
    ],
  },
  {
    id: "m-es-4",
    name: "The Explorer",
    tagline: "Still searching for the right earning path",
    shortDesc:
      "You are trying different ways to earn but have not yet found clarity.",
    family: "earning-style",
    fullDesc:
      "You are in search mode financially. You are trying different earning approaches but not yet settled. The right path feels unclear. You may feel uncertain about career direction or income potential.",
    thinking: [
      "I am still figuring out my earning path",
      "Many options feel possible but unclear",
      "The right fit is out there somewhere",
      "I need to explore more",
      "Clarity will come with experience",
    ],
    behavior: [
      "You change jobs or roles frequently",
      "You try different income approaches",
      "You do not feel settled",
      "You explore various opportunities",
      "You seek clarity and fit",
    ],
    strengths: [
      "Open to multiple paths",
      "Learning and growing",
      "Not locked into wrong situation",
      "Discovering capabilities",
      "Building diverse experience",
    ],
    blindSpots: [
      "Lack of focus and direction",
      "Unstable income and career",
      "Others may see you as indecisive",
      "Hard to build expertise",
      "Uncertainty creates stress",
    ],
    actionItems: [
      "Reflect on what energizes you",
      "Identify your core strengths",
      "Test hypotheses about fit",
      "Build on what works",
      "Create structure while exploring",
    ],
  },
];

// ==================== WEALTH STRATEGY FAMILY ====================
const wealthStrategyTypes: MoneyType[] = [
  {
    id: "m-ws-1",
    name: "The Long Term Builder",
    tagline: "Builds wealth slowly and consistently",
    shortDesc:
      "You think in years, not months. You focus on sustainable financial growth.",
    family: "wealth-strategy",
    fullDesc:
      "Your wealth building is a long term play. You think in decades. You focus on compound growth, sustainable practices, and patience. Fast results are less important than solid progress.",
    thinking: [
      "Wealth is built over years",
      "Compound effects matter",
      "Consistency beats speed",
      "Patience is my advantage",
      "Small steps add up",
    ],
    behavior: [
      "You invest consistently",
      "You hold long term positions",
      "You focus on compound growth",
      "You ignore short term noise",
      "You maintain discipline",
    ],
    strengths: [
      "Significant wealth accumulation",
      "Less stress from volatility",
      "Compound effects work in your favor",
      "Patient approach sustainable",
      "Solid long term results",
    ],
    blindSpots: [
      "May miss short term opportunities",
      "Progress feels slow",
      "Others may out pace you early",
      "Patience tested by market swings",
      "Long wait for payoff",
    ],
    actionItems: [
      "Celebrate incremental progress",
      "Track wealth growth over years",
      "Maintain discipline through volatility",
      "Review strategy periodically",
      "Stay committed to long term",
    ],
  },
  {
    id: "m-ws-2",
    name: "The Fast Mover",
    tagline: "Chases rapid financial results",
    shortDesc: "You aim for quick wins and faster financial progress.",
    family: "wealth-strategy",
    fullDesc:
      "You want financial results fast. You pursue aggressive strategies. You chase rapid gains. Time is money and you want yours quickly. You are willing to take risks for faster outcomes.",
    thinking: [
      "Fast results are possible",
      "Why wait years for wealth",
      "Aggressive strategies work",
      "Speed is my advantage",
      "Big wins are achievable",
    ],
    behavior: [
      "You seek aggressive investments",
      "You chase hot opportunities",
      "You make quick decisions",
      "You aim for rapid gains",
      "You trade frequently",
    ],
    strengths: [
      "Aggressive growth potential",
      "Do not settle for slow progress",
      "Takes action quickly",
      "Possibility of big wins",
      "Does not waste time waiting",
    ],
    blindSpots: [
      "High risk of losses",
      "Emotional trading decisions",
      "Miss stability for speed",
      "Burnout from constant action",
      "Big losses possible",
    ],
    actionItems: [
      "Balance aggression with protection",
      "Learn from losses soberly",
      "Build compound strategy",
      "Diversify aggressive bets",
      "Add stability anchors",
    ],
  },
  {
    id: "m-ws-3",
    name: "The Passive Builder",
    tagline: "Builds systems that generate income",
    shortDesc:
      "You prefer automation and long term income streams that require less active effort.",
    family: "wealth-strategy",
    fullDesc:
      "Your wealth building philosophy centers on systems and passive income. You build things that generate money without constant work. Automation and passive streams appeal to you. You want money to work while you do other things.",
    thinking: [
      "Money should work for me",
      "Automation is powerful",
      "Passive income is ideal",
      "Systems do the heavy lifting",
      "Compound effects without effort",
    ],
    behavior: [
      "You invest in passive income",
      "You build automated systems",
      "You focus on infrastructure",
      "You automate processes",
      "You leverage previous work",
    ],
    strengths: [
      "Income without constant effort",
      "Scalable wealth building",
      "Less active work required",
      "Compound passive growth",
      "Freedom and flexibility",
    ],
    blindSpots: [
      "Takes significant upfront effort",
      "Passive income is hard to build",
      "May procrastinate on setup",
      "Income lags while building",
      "Systems require maintenance",
    ],
    actionItems: [
      "Commit to creating systems",
      "Start passive income projects",
      "Build infrastructure intentionally",
      "Invest in automation",
      "Be patient with passive development",
    ],
  },
  {
    id: "m-ws-4",
    name: "The Undefined",
    tagline: "Lacks a clear financial direction",
    shortDesc: "You move without a structured strategy for building wealth.",
    family: "wealth-strategy",
    fullDesc:
      "You do not have a clear wealth building strategy. You are between approaches or unsure what direction to take. Your actions feel unguided. You may be waiting for clarity or not yet committed to a path.",
    thinking: [
      "I am not sure what strategy fits",
      "Many approaches seem possible",
      "Clarity has not yet come",
      "I need to figure out my approach",
      "Direction is still unclear",
    ],
    behavior: [
      "You do not follow a clear strategy",
      "Your actions seem random",
      "You have not committed to an approach",
      "You are still exploring",
      "You lack direction",
    ],
    strengths: [
      "Open to learning",
      "Not locked into wrong approach",
      "Flexibility in direction",
      "Room to discover what works",
      "Can pivot easily",
    ],
    blindSpots: [
      "Lack of direction creates stress",
      "Miss consistent execution",
      "Years may pass without progress",
      "Others may out pace you",
      "Wealth building delayed",
    ],
    actionItems: [
      "Clarify what wealth means to you",
      "Evaluate different strategies",
      "Test and measure what works",
      "Commit to a direction",
      "Build on initial success",
    ],
  },
];

// ==================== RISK & INVESTMENT FAMILY ====================
const riskInvestmentTypes: MoneyType[] = [
  {
    id: "m-ri-1",
    name: "The Calculated Risk Taker",
    tagline: "Takes risks with logic and planning",
    shortDesc:
      "You assess situations carefully before making financial decisions.",
    family: "risk-investment",
    fullDesc:
      "You take financial risks but with careful analysis. You understand odds and tradeoffs. You make informed decisions. Risk is acceptable when you understand and have planned for it.",
    thinking: [
      "Risk should be understood",
      "Rewards must justify risk",
      "Analysis informs good decisions",
      "Upside and downside matter",
      "Smart risk brings growth",
    ],
    behavior: [
      "You research before investing",
      "You understand risk tradeoffs",
      "You diversify your risks",
      "You make informed decisions",
      "You have risk limits",
    ],
    strengths: [
      "Balanced risk and reward",
      "Growth with protection",
      "Informed decision making",
      "Manageable risk levels",
      "Sustainable growth",
    ],
    blindSpots: [
      "Analysis can delay action",
      "May miss intuitive opportunities",
      "Perfectionism in research",
      "Over confidence in analysis",
      "May play too safe",
    ],
    actionItems: [
      "Balance analysis with action",
      "Set decision deadlines",
      "Learn from actual results",
      "Trust your research",
      "Take some intuitive risks",
    ],
  },
  {
    id: "m-ri-2",
    name: "The Risk Avoider",
    tagline: "Avoids financial uncertainty",
    shortDesc: "You prefer safety even if it limits potential growth.",
    family: "risk-investment",
    fullDesc:
      "Risk feels unacceptable to you. You prefer certainty and safety. Financial uncertainty creates significant anxiety. You prioritize protection over growth potential. Your approach is very conservative.",
    thinking: [
      "Risk means potential loss",
      "Safety is paramount",
      "Loss feels worse than gains",
      "Uncertainty is unacceptable",
      "Protection is priority",
    ],
    behavior: [
      "You avoid all risk",
      "You keep safe positions",
      "You avoid investing",
      "You hold cash",
      "You do not take financial risks",
    ],
    strengths: [
      "No financial losses",
      "Low stress and anxiety",
      "Capital protected",
      "Peace of mind",
      "Safe and predictable",
    ],
    blindSpots: [
      "Significant growth missed",
      "Inflation erodes purchasing power",
      "Cash returns inflation",
      "Long term wealth limited",
      "Opportunity cost large",
    ],
    actionItems: [
      "Understand risk tradeoffs",
      "Learn about diversified investments",
      "Take small calculated risks",
      "Build confidence gradually",
      "Balance safety with growth",
    ],
  },
  {
    id: "m-ri-3",
    name: "The Speculator",
    tagline: "Chases high risk, high reward",
    shortDesc:
      "You are drawn to big opportunities even if they come with uncertainty.",
    family: "risk-investment",
    fullDesc:
      "You are attracted to high risk opportunities with potential for big rewards. You think big. You are willing to accept losses for big wins. Your approach is aggressive and speculative.",
    thinking: [
      "Big wins are possible",
      "High risk means high reward",
      "Playing it safe gets small returns",
      "Bold moves create wealth",
      "Risk is worth the upside",
    ],
    behavior: [
      "You chase high risk opportunities",
      "You pursue speculative positions",
      "You accept big potential losses",
      "You swing for the fences",
      "You are aggressive in investing",
    ],
    strengths: [
      "Potential for significant gains",
      "Ambitious and bold",
      "Do not let fear limit you",
      "Possible big wins",
      "Entrepreneurial mindset",
    ],
    blindSpots: [
      "Potential for significant losses",
      "Emotional decision making",
      "Risk assessment poor",
      "Gambler's mindset risk",
      "Can lose wealth quickly",
    ],
    actionItems: [
      "Separate core from speculation",
      "Protect base first",
      "Limit speculative portion",
      "Learn risk management",
      "Track and analyze results",
    ],
  },
  {
    id: "m-ri-4",
    name: "The Hesitant",
    tagline: "Struggles to act on opportunities",
    shortDesc: "You understand potential but delay taking action due to doubt.",
    family: "risk-investment",
    fullDesc:
      "You see opportunities but struggle to act. Doubt and uncertainty paralyze you. You know what could work but cannot commit. Your hesitation prevents you from pursuing opportunities.",
    thinking: [
      "This could work but what if",
      "I am not sure if I should",
      "What if I am wrong",
      "Maybe I should wait",
      "I am not ready yet",
    ],
    behavior: [
      "You identify opportunities",
      "You fail to act on them",
      "You get stuck in analysis",
      "You delay decisions",
      "You watch others succeed",
    ],
    strengths: [
      "Recognize opportunities",
      "Cautious approach",
      "Do not rashly act",
      "Aware of risks",
      "Thoughtful evaluation",
    ],
    blindSpots: [
      "Miss opportunities from delay",
      "Watch others succeed",
      "Regret from inaction",
      "Confidence erodes",
      "Wealth building stalls",
    ],
    actionItems: [
      "Take small action steps",
      "Build confidence through doing",
      "Accept learning through mistakes",
      "Set decision deadlines",
      "Track successful risks taken",
    ],
  },
];

// ==================== EMOTIONAL PATTERNS FAMILY ====================
const emotionalPatternsTypes: MoneyType[] = [
  {
    id: "m-ep-1",
    name: "The Money Anxious",
    tagline: "Feels constant stress about money",
    shortDesc:
      "You frequently worry about financial stability and future risks.",
    family: "emotional-patterns",
    fullDesc:
      "Money creates significant anxiety for you. You worry frequently about financial security and future risks. This anxiety affects your wellbeing. You may struggle to take action due to fear.",
    thinking: [
      "Something could go wrong financially",
      "I am not doing enough",
      "Financial disaster feels close",
      "I cannot trust stability",
      "Worry protects me",
    ],
    behavior: [
      "You worry about finances constantly",
      "You check accounts frequently",
      "You catastrophize scenarios",
      "You struggle to relax",
      "You feel financial stress",
    ],
    strengths: [
      "Aware of financial issues",
      "Prepared for problems",
      "Alert to risks",
      "Thorough planning",
      "Do not miss problems",
    ],
    blindSpots: [
      "Chronic stress impacts health",
      "Anxiety prevents good decisions",
      "Relationships affected",
      "Peace of mind missing",
      "Worry does not produce solutions",
    ],
    actionItems: [
      "Address root causes of anxiety",
      "Build financial knowledge",
      "Create actual safety net",
      "Distinguish real from imagined risks",
      "Practice financial mindfulness",
    ],
  },
  {
    id: "m-ep-2",
    name: "The Money Avoidant",
    tagline: "Avoids dealing with finances",
    shortDesc: "You delay checking or managing money, even when necessary.",
    family: "emotional-patterns",
    fullDesc:
      "You avoid dealing with finances. Looking at accounts, paying bills, or planning feels overwhelming. You delay and avoid. This avoidance creates bigger problems down the line.",
    thinking: [
      "Money stuff is overwhelming",
      "I do not want to look",
      "Someone else should handle it",
      "I cannot deal with this",
      "Checking makes it worse",
    ],
    behavior: [
      "You avoid checking accounts",
      "You delay bills",
      "You ignore financial documents",
      "You do not plan",
      "You escape financial responsibility",
    ],
    strengths: [
      "Do not obsess over money",
      "Less stress from constant checking",
      "Able to disengage",
      "Do not carry financial worry",
      "Avoid decision paralysis",
    ],
    blindSpots: [
      "Problems grow from avoidance",
      "Overspending unchecked",
      "Bills missed",
      "Debt accumulates",
      "No financial awareness",
    ],
    actionItems: [
      "Identify avoidance triggers",
      "Create simple checking routine",
      "Automate what you can",
      "Start with small step",
      "Build financial courage",
    ],
  },
  {
    id: "m-ep-3",
    name: "The Money Controller",
    tagline: "Needs full control over finances",
    shortDesc:
      "You track everything and prefer certainty over unpredictability.",
    family: "emotional-patterns",
    fullDesc:
      "You need financial control. You track everything closely. Uncertainty feels unacceptable. You want complete visibility and command over money. This creates security but may limit flexibility.",
    thinking: [
      "I need to track everything",
      "Control equals safety",
      "Uncertainty is unacceptable",
      "I must know exact numbers",
      "Detail is necessary",
    ],
    behavior: [
      "You tracks finances closely",
      "You control all decisions",
      "You need full visibility",
      "You monitor constantly",
      "You resist delegation",
    ],
    strengths: [
      "Complete financial awareness",
      "Excellent oversight",
      "Problems detected early",
      "Nothing gets missed",
      "Strong financial grip",
    ],
    blindSpots: [
      "Over control limits flexibility",
      "Relationships suffer from control",
      "Stress from constant monitoring",
      "Difficulty with delegation",
      "Excessive detail can paralyze",
    ],
    actionItems: [
      "Build trust in systems",
      "Delegate some tasks",
      "Accept reasonable uncertainty",
      "Share financial decisions",
      "Reduce obsessive monitoring",
    ],
  },
  {
    id: "m-ep-4",
    name: "The Detached",
    tagline: "Emotionally disconnected from money",
    shortDesc:
      "You do not feel strongly about money and rarely engage deeply with it.",
    family: "emotional-patterns",
    fullDesc:
      "Money does not trigger strong emotions for you. You feel disconnected from financial matters. You neither stress nor deeply engage. This creates emotional distance and sometimes neglect.",
    thinking: [
      "Money is not that important",
      "I do not care much about it",
      "It is just a tool",
      "Financial details bore me",
      "I prefer not to think about it",
    ],
    behavior: [
      "You rarely think about money",
      "You do not engage with finances",
      "You neglect financial management",
      "You avoid financial decisions",
      "You are disconnected",
    ],
    strengths: [
      "No financial anxiety",
      "Not obsessed with money",
      "Emotional freedom",
      "Less stress",
      "Can focus on other things",
    ],
    blindSpots: [
      "Financial neglect",
      "Miss important decisions",
      "Lack of optimization",
      "Potential squandered",
      "No financial growth",
    ],
    actionItems: [
      "Connect to your financial goals",
      "Find meaning in money purpose",
      "Build basic financial habits",
      "Engage more intentionally",
      "Create financial clarity",
    ],
  },
];

// ==================== SCARCITY VS ABUNDANCE FAMILY ====================
const scarcityAbundanceTypes: MoneyType[] = [
  {
    id: "m-sa-1",
    name: "The Growth Expander",
    tagline: "Always seeks to increase capacity",
    shortDesc: "You focus on scaling income and opportunities.",
    family: "scarcity-abundance",
    fullDesc:
      "You are focused on expansion and growth. You seek to increase your capacity constantly. You look for ways to earn more and create more. Growth feels natural and exciting to you.",
    thinking: [
      "More is possible",
      "I can expand my capacity",
      "Opportunities exist to grow",
      "Scaling is natural",
      "Abundance mindset wins",
    ],
    behavior: [
      "You seek growth opportunities",
      "You expand your capabilities",
      "You pursue more income",
      "You look for scalability",
      "You think big",
    ],
    strengths: [
      "Growth focused",
      "Expanded capacity",
      "See possibilities",
      "Ambitious",
      "Forward thinking",
    ],
    blindSpots: [
      "May neglect consolidation",
      "Spread too thin",
      "Never satisfied",
      "Risk overextension",
      "Base may suffer",
    ],
    actionItems: [
      "Balance growth with stability",
      "Consolidate gains",
      "Build strong base",
      "Think long term",
      "Protect what you have",
    ],
  },
  {
    id: "m-sa-2",
    name: "The Protector",
    tagline: "Focused on keeping what you have",
    shortDesc: "You prioritize protection over expansion.",
    family: "scarcity-abundance",
    fullDesc:
      "Your focus is on protecting what you have. You are defensive financially. Keeping and preserving feels more important than growing. Loss prevention matters more than opportunity pursuit.",
    thinking: [
      "I need to protect what I have",
      "Loss is worse than missing gain",
      "Preservation is priority",
      "Safe approach is best",
      "Keep what you have",
    ],
    behavior: [
      "You focus on protection",
      "You avoid risky situations",
      "You preserve capital",
      "You hold onto assets",
      "You play defense",
    ],
    strengths: [
      "Assets protected",
      "Defensive strength",
      "Lower loss risk",
      "Preservation focused",
      "Stability maintained",
    ],
    blindSpots: [
      "Growth foregone",
      "Opportunity missed",
      "Inflation erodes",
      "Stagnation risk",
      "May fall behind",
    ],
    actionItems: [
      "Add some growth portfolio",
      "Balance protection with expansion",
      "Invest preserved capital",
      "Seek moderate growth",
      "Build on what you have",
    ],
  },
  {
    id: "m-sa-3",
    name: "The Oscillator",
    tagline: "Switches between scarcity and abundance",
    shortDesc: "You sometimes feel confident, sometimes fearful.",
    family: "scarcity-abundance",
    fullDesc:
      "You swing between abundance thinking and scarcity thinking. Sometimes you feel expansive, sometimes constrained. Your mindset shifts with circumstances and emotion. This creates inconsistency.",
    thinking: [
      "Sometimes growth feels possible",
      "Sometimes I feel limited",
      "My confidence fluctuates",
      "Feelings shift my perspective",
      "I am not consistent",
    ],
    behavior: [
      "You oscillate between approaches",
      "You expand then contract",
      "Your mindset shifts",
      "You are inconsistent",
      "You respond to emotion",
    ],
    strengths: [
      "Can shift perspectives",
      "Not locked in one view",
      "Adaptable thinking",
      "Flexible approach",
      "Can choose both",
    ],
    blindSpots: [
      "Inconsistency creates confusion",
      "Hard to build strategy",
      "Emotional swings impact decisions",
      "Sent mixed messages",
      "Progress gets disrupted",
    ],
    actionItems: [
      "Identify your oscillation triggers",
      "Build stability in thinking",
      "Create consistent philosophy",
      "Manage emotional swings",
      "Choose foundational approach",
    ],
  },
  {
    id: "m-sa-4",
    name: "The Blocked",
    tagline: "Feels stuck financially",
    shortDesc: "You feel limited and unsure how to move forward.",
    family: "scarcity-abundance",
    fullDesc:
      "You feel stuck financially. Movement feels difficult. You see barriers and limitations. You are unsure what to do. Progress feels blocked. You may feel trapped or helpless.",
    thinking: [
      "I am stuck",
      "Nothing I do helps",
      "The system is against me",
      "I cannot move forward",
      "I am limited",
    ],
    behavior: [
      "You feel stuck",
      "You do not see options",
      "You feel helpless",
      "You do not take action",
      "You feel blocked",
    ],
    strengths: [
      "Aware of challenges",
      "Recognize systemic issues",
      "Do not blame yourself only",
      "Can be realistic",
      "Honest about situation",
    ],
    blindSpots: [
      "Stuck feeling prevents action",
      "Helplessness disempowers",
      "Miss available options",
      "Inaction creates stagnation",
      "Stuck becomes identity",
    ],
    actionItems: [
      "Identify what is truly blocking",
      "List available micro actions",
      "Take smallest possible step",
      "Build momentum through action",
      "Shift from stuck to stuck",
    ],
  },
];

// ==================== PUBLIC API ====================

export function getMoneyTypesByFamily(family: MoneyFamily): MoneyType[] {
  const allTypes = [
    ...moneyMindsetTypes,
    ...spendingBehaviorTypes,
    ...savingSecurityTypes,
    ...earningStyleTypes,
    ...wealthStrategyTypes,
    ...riskInvestmentTypes,
    ...emotionalPatternsTypes,
    ...scarcityAbundanceTypes,
  ];
  return allTypes.filter((type) => type.family === family);
}

export function getAllMoneyTypes(): MoneyType[] {
  return [
    ...moneyMindsetTypes,
    ...spendingBehaviorTypes,
    ...savingSecurityTypes,
    ...earningStyleTypes,
    ...wealthStrategyTypes,
    ...riskInvestmentTypes,
    ...emotionalPatternsTypes,
    ...scarcityAbundanceTypes,
  ];
}

export function getMoneyType(id: string): MoneyType | undefined {
  const allTypes = getAllMoneyTypes();
  return allTypes.find((type) => type.id === id);
}
