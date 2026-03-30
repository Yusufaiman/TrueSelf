// ==================== LIFE DIRECTION TYPES ====================
// Understanding where you are, how you decide, and where your life is heading

export type LifeDirectionFamily =
  | "clarity-state"
  | "decision-style"
  | "purpose-relationship"
  | "growth-trajectory"
  | "internal-external-control"
  | "life-phase";

export interface LifeDirectionType {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  family: LifeDirectionFamily;
  fullDesc: string;
  behavior: string[];
  strengths: string[];
  blindSpots: string[];
  lifeImplications: string[];
  actionItems: string[];
}

// ==================== CLARITY STATE FAMILY ====================
const clarityStateTypes: LifeDirectionType[] = [
  {
    id: "ld-cs-1",
    name: "The Clear Path",
    tagline: "Knows where they are going",
    shortDesc:
      "You have a strong sense of direction. Your decisions are guided by clear goals and long term vision. You rarely feel lost because you understand what you are building.",
    family: "clarity-state",
    fullDesc:
      "You possess a clear and compelling vision for your life. This clarity informs your daily decisions and long-term planning. You rarely second-guess major choices because they align with your understood direction. This does not mean your path is rigid—it means you move with intentionality.",
    behavior: [
      "Makes decisions that align with long-term vision",
      "Communicates goals clearly to others",
      "Evaluates opportunities against your clear direction",
      "Rarely changes course without reason",
      "Plans ahead with confidence",
    ],
    strengths: [
      "Sense of purpose and direction",
      "Ability to stay focused on goals",
      "Confidence in decision-making",
      "Attracts others with clear vision",
      "Less anxiety about the future",
    ],
    blindSpots: [
      "May become rigid or inflexible when plans change",
      "Might dismiss new opportunities that diverge from original vision",
      "Can overlook important personal needs in pursuit of goals",
      "May not fully adapt to unexpected life changes",
      "Could make others feel like they do not belong in your plan",
    ],
    lifeImplications: [
      "Your life feels intentional and purposeful",
      "You experience less decision fatigue because direction is clear",
      "Relationships work best when others understand your vision",
      "You may need to balance clarity with flexibility when life shifts",
    ],
    actionItems: [
      "Regularly revisit your vision to ensure it still resonates",
      "Build in flexibility points to adapt without losing direction",
      "Share your vision with key people in your life",
      "Allow room for evolution as you grow",
    ],
  },
  {
    id: "ld-cs-2",
    name: "The Searching",
    tagline: "Actively looking for direction",
    shortDesc:
      "You are aware that you do not have full clarity yet. You are exploring, questioning, and trying to understand what fits you.",
    family: "clarity-state",
    fullDesc:
      "You are in active exploration mode. You are not lost—you are searching. You understand that you have not found full alignment yet, and you are willing to explore different paths. This is not indecision; it is intentional discovery.",
    behavior: [
      "Tries different experiences to understand what fits",
      "Asks deep questions about what you want",
      "Feels comfortable with experimentation",
      "Takes calculated risks to explore",
      "Reflects on each experience",
    ],
    strengths: [
      "Openness to new possibilities",
      "Willingness to explore before committing",
      "Self-awareness about what you do not know",
      "Ability to learn from experiences",
      "Growth mindset",
    ],
    blindSpots: [
      "Can feel paralyzed by too many options",
      "May struggle to commit to anything when everything seems possible",
      "Others might perceive you as indecisive",
      "Can exhaust yourself with constant exploration",
      "Might avoid the discomfort of choosing",
    ],
    lifeImplications: [
      "Your life is in a season of discovery",
      "You need permission to explore without judgment",
      "The exploration itself is valuable, not just the destination",
      "You may make faster progress if you set exploration timelines",
    ],
    actionItems: [
      "Create a structured exploration plan with timelines",
      "Document what you learn from each experience",
      "Set decision points—moments where you commit to trying something",
      "Find others in similar search phases for support",
      "Accept that clarity will come through action, not just thinking",
    ],
  },
  {
    id: "ld-cs-3",
    name: "The Lost",
    tagline: "Uncertain and disconnected",
    shortDesc:
      "You feel unclear about where you are going. Decisions feel confusing, and you often move without strong alignment or confidence.",
    family: "clarity-state",
    fullDesc:
      "You feel a deep uncertainty about your direction. This can feel disorienting—decisions seem hard because you lack an internal compass. The difference between Lost and Searching is that Lost feels stuck, while Searching feels active. You may need support to move from lost to searching.",
    behavior: [
      "Feels confused when making decisions",
      "Often second-guesses choices",
      "Does not have a sense of long-term vision",
      "Moves reactively rather than intentionally",
      "Questions your own judgment",
    ],
    strengths: [
      "Openness to guidance and support",
      "Humility about what you do not know",
      "Potential for major transformation",
      "Can relate to others who are struggling",
      "Opportunity to build clarity from scratch",
    ],
    blindSpots: [
      "May lack confidence to make decisions",
      "Can become dependent on others' choices",
      "Might accept any direction just to end uncertainty",
      "Can feel hopeless about finding clarity",
      "May not recognize when small clarity is emerging",
    ],
    lifeImplications: [
      "You need support and structure to move forward",
      "Quick decisions may not serve you—clarity takes time",
      "You benefit from mentors or guides",
      "This phase, while difficult, is temporary",
      "Movement, even small, helps create clarity",
    ],
    actionItems: [
      "Seek mentorship or coaching to gain perspective",
      "Take small actions to test what resonates",
      "Do not pressure yourself to have all answers immediately",
      "Identify one area of clarity to build from",
      "Consider therapy or counseling if this feels overwhelming",
      "Track small moments when you feel more sure",
    ],
  },
  {
    id: "ld-cs-4",
    name: "The Drifting",
    tagline: "Moving without intention",
    shortDesc:
      "You go with the flow rather than choosing direction. You are not actively lost, but you are not intentionally moving toward anything specific.",
    family: "clarity-state",
    fullDesc:
      "You are not in crisis or confusion, but you are also not actively choosing your direction. You let life happen, circumstances guide you, or you follow what is available. This is neither good nor bad—it is a way of moving through life. But it can lead to disconnection from yourself.",
    behavior: [
      "Goes along with what is available",
      "Does not actively plan or set goals",
      "Says yes to opportunities without deep consideration",
      "Lets others influence your direction",
      "Prefers to avoid the weight of big decisions",
    ],
    strengths: [
      "Flexibility and adaptability",
      "Ability to enjoy the present moment",
      "Less anxiety about the future",
      "Can pivot easily when circumstances change",
      "Often feels peaceful or content",
    ],
    blindSpots: [
      "May end up in situations that do not truly fit you",
      "Can feel disconnected from your own life",
      "Might miss opportunities that require intentional pursuit",
      "Can become resentful later ('How did I get here?')",
      "May struggle to feel ownership of your choices",
    ],
    lifeImplications: [
      "You may be comfortable, but not aligned",
      "Waking up to your own role in your life takes courage",
      "You have the power to choose—it just requires activation",
      "Small intentional choices can create big shifts",
    ],
    actionItems: [
      "Pause and ask 'Do I actually want this?' before saying yes",
      "Identify one area where you want to be more intentional",
      "Set a small goal just to practice choosing direction",
      "Reflect on areas where drifting has cost you",
      "Connect with what you truly value, not what is convenient",
    ],
  },
];

// ==================== DECISION STYLE FAMILY ====================
const decisionStyleTypes: LifeDirectionType[] = [
  {
    id: "ld-ds-1",
    name: "The Intentional Builder",
    tagline: "Chooses direction carefully",
    shortDesc:
      "You think before you move. You consider consequences, alignment, and long term impact before making decisions.",
    family: "decision-style",
    fullDesc:
      "You are deliberate in your decisions. You gather information, weigh options, and consider how each choice aligns with your larger vision or values. You are not impulsive—you respect the weight of decisions. This does not make you slow, it makes you intentional.",
    behavior: [
      "Takes time to evaluate options before deciding",
      "Considers long-term consequences",
      "Asks clarifying questions",
      "Seeks input from trusted people",
      "Commits fully once a decision is made",
    ],
    strengths: [
      "Makes thoughtful, well-informed decisions",
      "Less likely to have regrets",
      "Builds trust through consistency",
      "Can explain the reasoning behind your choices",
      "Reliable and stable in your path",
    ],
    blindSpots: [
      "May take too long to decide and miss opportunities",
      "Can overthink and create analysis paralysis",
      "Might not be able to adapt quickly when needed",
      "Could frustrate others who want faster decisions",
      "May be judgmental of those who decide differently",
    ],
    lifeImplications: [
      "Your life is built on solid ground, but sometimes slowly",
      "You need to balance thoroughness with timing",
      "Others may need to adapt to your decision pace",
      "Your biggest risk is inaction, not wrong action",
    ],
    actionItems: [
      "Set decision timelines to prevent endless deliberation",
      "Learn to make decisions with 80% information rather than 100%",
      "Practice trusting your gut alongside your analysis",
      "Recognize when 'good enough' is actually sufficient",
      "Build flexibility into commitments to handle unexpected changes",
    ],
  },
  {
    id: "ld-ds-2",
    name: "The Impulsive Mover",
    tagline: "Acts based on the moment",
    shortDesc:
      "You follow feelings, opportunities, or impulses. Your direction can shift quickly depending on your current state.",
    family: "decision-style",
    fullDesc:
      "You are spontaneous and reactive. You feel something and move. An opportunity appears and you take it. This makes you adaptable and alive, but it can also create instability. Your direction is guided more by energy and momentum than by deep planning.",
    behavior: [
      "Makes decisions based on feelings or excitement",
      "Says yes quickly to new opportunities",
      "Changes direction when something new attracts you",
      "Acts before fully thinking things through",
      "Relies on intuition rather than analysis",
    ],
    strengths: [
      "Ability to seize opportunities",
      "Lives with spontaneity and aliveness",
      "Quick adaptation to new situations",
      "Often finds interesting and unexpected paths",
      "Not held back by overthinking",
    ],
    blindSpots: [
      "May make decisions you later regret",
      "Can create instability in your own life",
      "Might struggle to follow through on commitments",
      "Could impulsively abandon good situations",
      "May not build long-term success because of constant pivoting",
    ],
    lifeImplications: [
      "Your life is dynamic but potentially chaotic",
      "You need structure to balance your spontaneity",
      "Some impulses are wisdom, others are avoidance—learn the difference",
      "Pausing even briefly can improve outcomes",
    ],
    actionItems: [
      "Before major decisions, pause for 24-48 hours",
      "Write down the pros and cons, even briefly",
      "Identify patterns in impulses—what do they say about you?",
      "Build accountability with someone you trust",
      "Practice staying with one path long enough to see results",
      "Use impulse energy for good—channel it into creativity and exploration",
    ],
  },
  {
    id: "ld-ds-3",
    name: "The External Follower",
    tagline: "Follows expectations and pressure",
    shortDesc:
      "Your decisions are influenced by family, society, or environment. You may not fully choose your own path.",
    family: "decision-style",
    fullDesc:
      "Your direction is largely outside-in. You follow expectations, family wishes, cultural norms, or social pressure. You may or may not realize how much external influence shapes your choices. This can create a life that looks good on paper but does not feel like yours.",
    behavior: [
      "Considers what others expect before deciding",
      "Feels uncomfortable going against family or cultural norms",
      "Chooses options that are approved by important people",
      "May suppress your own preferences for acceptance",
      "Seeks validation from authority figures",
    ],
    strengths: [
      "Respect for family and community values",
      "Good at meeting expectations",
      "Often makes socially acceptable choices",
      "Values harmony and fitting in",
      "Good at supporting others' visions",
    ],
    blindSpots: [
      "May lose touch with what you actually want",
      "Can create resentment toward those whose expectations you follow",
      "Might make choices that do not fit your real self",
      "Could feel unfulfilled even if externally successful",
      "May struggle with identity—who are you apart from expectations?",
    ],
    lifeImplications: [
      "Your success may feel hollow if it is not truly yours",
      "Authenticity requires distinguishing your voice from others'",
      "You have more power to choose than you may realize",
      "Your real life begins when you honor your own direction",
    ],
    actionItems: [
      "Identify whose expectations you are following",
      "Ask what you actually want, separate from others",
      "Take small steps to honor your own preferences",
      "Have conversations with key people about your needs",
      "Notice the difference between supporting others and losing yourself",
      "Build gradual autonomy in low-stakes areas first",
    ],
  },
  {
    id: "ld-ds-4",
    name: "The Adaptive Switcher",
    tagline: "Changes direction when needed",
    shortDesc:
      "You are flexible. You adjust your path when something no longer fits, without being stuck in past decisions.",
    family: "decision-style",
    fullDesc:
      "You are willing and able to pivot. When a path no longer works, you change. When circumstances shift, you adapt. You do not hold onto outdated decisions just because you made them. This is a strength—flexibility is powerful. But it can also create a sense of instability.",
    behavior: [
      "Willing to change course when something is not working",
      "Does not feel bound by past decisions",
      "Adapts quickly to new circumstances",
      "Can let go of outdated plans",
      "Moves toward what feels alive and relevant",
    ],
    strengths: [
      "Flexibility and responsiveness",
      "Ability to correct course",
      "Not stuck in sunk cost fallacy",
      "Finds relevance in changing times",
      "Can pivot without shame or regret",
    ],
    blindSpots: [
      "May switch too often and never build something substantial",
      "Could be perceived as flaky or unreliable",
      "Might not commit long enough to see real results",
      "Can leave others confused by constant changes",
      "May use adaptation as avoidance of difficulty",
    ],
    lifeImplications: [
      "Your strength is flexibility—use it wisely",
      "You need to distinguish between necessary pivots and escaping difficulty",
      "Building something requires staying with a path long enough",
      "Others need reassurance about your commitments",
    ],
    actionItems: [
      "Before pivoting, pause and ask: Am I adapting or avoiding?",
      "Set minimum timelines before allowing major changes",
      "Distinguish between small adjustments and full course changes",
      "Communicate your adaptability to others, with clarity on core commitments",
      "Use your flexibility as a feature, not an escape hatch",
    ],
  },
];

// ==================== PURPOSE RELATIONSHIP FAMILY ====================
const purposeRelationshipTypes: LifeDirectionType[] = [
  {
    id: "ld-pr-1",
    name: "The Purpose Driven",
    tagline: "Guided by meaning",
    shortDesc:
      "You want your life to have purpose. Your decisions are shaped by what feels meaningful, not just practical.",
    family: "purpose-relationship",
    fullDesc:
      "Meaning matters deeply to you. Your decisions are evaluated not just on practicality but on whether they feed something deeper—contribution, legacy, alignment with values. Your life is shaped by the search for significance beyond comfort.",
    behavior: [
      "Evaluates choices based on meaning and alignment",
      "Seeks work or activities that feel purposeful",
      "Often thinks about impact and legacy",
      "Willing to sacrifice comfort for meaning",
      "Connects daily actions to larger purpose",
    ],
    strengths: [
      "Strong sense of direction and meaning",
      "Fulfillment beyond money or status",
      "Inspires others with your purpose",
      "Willing to take risks for what matters",
      "Creates life around meaning, not accident",
    ],
    blindSpots: [
      "May judge others who do not prioritize meaning the same way",
      "Can burn out by constantly pursuing purpose",
      "Might struggle with practical necessities if they feel meaningless",
      "Could become rigid about 'the right way' to live meaningfully",
      "May create unnecessary suffering in the name of purpose",
    ],
    lifeImplications: [
      "Your life has direction and depth, but also demands",
      "Purpose without sustainability leads to burnout",
      "You need balance between meaning and practical reality",
      "Your sense of purpose may evolve—stay open to it",
    ],
    actionItems: [
      "Define your purpose clearly, not vaguely",
      "Check in regularly to ensure purpose is authentic, not driven by should",
      "Build sustainable systems around your purpose",
      "Allow your purpose to evolve as you grow",
      "Find ways to honor purpose without sacrificing wellbeing",
    ],
  },
  {
    id: "ld-pr-2",
    name: "The Practical Realist",
    tagline: "Focused on what works",
    shortDesc:
      "You prioritize stability, practicality, and real world outcomes. Purpose matters, but not at the cost of function.",
    family: "purpose-relationship",
    fullDesc:
      "You care about what works. You are not opposed to meaning, but you are grounded in reality. You prioritize stability, paying bills, and tangible outcomes. Your life is built on solid ground, practical choices, and real impact—even if less philosophically grand.",
    behavior: [
      "Evaluates choices based on practical outcomes",
      "Prioritizes stability and security",
      "Makes decisions that work in real life",
      "Focuses on what can be controlled",
      "Builds sustainable systems",
    ],
    strengths: [
      "Stability and reliability",
      "Strong grasp of real-world demands",
      "Builds sustainable life systems",
      "Does not get lost in abstract meaning",
      "Others can depend on you",
    ],
    blindSpots: [
      "May feel disconnected from deeper meaning",
      "Could become cynical about purpose-driven people",
      "Might miss opportunities for growth in the name of stability",
      "Can prioritize security over aliveness",
      "May not feel deeply fulfilled despite stability",
    ],
    lifeImplications: [
      "Your life is grounded and reliable, but may lack depth",
      "Meaning is not the opposite of practicality—it can coexist",
      "Your stability is valuable; do not underestimate it",
      "Adding purpose to practicality could transform satisfaction",
    ],
    actionItems: [
      "Reflect on what would add meaning to your practical life",
      "Find small ways to weave purpose into existing structures",
      "Do not dismiss meaning just because it is not immediately practical",
      "Build systems that allow room for deeper alignment",
      "Ask: Is my life practical, or just safe?",
    ],
  },
  {
    id: "ld-pr-3",
    name: "The Meaning Seeker",
    tagline: "Still searching for purpose",
    shortDesc:
      "You feel there is something more, but you have not fully found it yet. You explore ideas, paths, and possibilities.",
    family: "purpose-relationship",
    fullDesc:
      "You sense that deeper meaning exists, but you have not crystallized it yet. You explore different philosophies, paths, and ideas. You are not lost—you are seeking. This is valuable work, but it can also feel unsettling to move through life without clear purpose.",
    behavior: [
      "Explores different philosophical or spiritual frameworks",
      "Reads, researches, and reflects on meaning",
      "Tries different approaches to find purpose",
      "Questions what gives life meaning",
      "Feels pulled toward something, but unclear what",
    ],
    strengths: [
      "Openness to different perspectives",
      "Willingness to question conventional answers",
      "Growth mindset about meaning",
      "Can relate to others on spiritual or philosophical journeys",
      "Potential for rich, deep understanding",
    ],
    blindSpots: [
      "Can feel lost or unsettled by lack of clear purpose",
      "May endlessly explore without committing to a path",
      "Could become scattered across too many interests",
      "Might feel envious of those with clear purpose",
      "Can intellectualize meaning instead of living it",
    ],
    lifeImplications: [
      "Your search is valid—purpose takes time to crystallize",
      "You may need to live your way into understanding, not just think",
      "Movement toward purpose is possible through action, not just reflection",
      "Your exploration itself has value",
    ],
    actionItems: [
      "Structure your exploration with intention, not just drifting",
      "Try living according to different purposes for periods of time",
      "Look for patterns in what moves you and what feels alive",
      "Do not wait for certainty—start building around emerging purpose",
      "Find mentors or communities exploring similar questions",
    ],
  },
  {
    id: "ld-pr-4",
    name: "The Detached",
    tagline: "Not driven by purpose",
    shortDesc:
      "You do not strongly rely on meaning to guide your life. You move based on situation rather than deeper purpose.",
    family: "purpose-relationship",
    fullDesc:
      "Purpose is not a primary driver for you. You move through life based on practicality, circumstances, or moment-to-moment interest. This is not apathy—it is a different way of engaging with life. You may find meaning in small things without needing grand purpose.",
    behavior: [
      "Does not actively seek or define life purpose",
      "Makes decisions based on pragmatism or interest",
      "Finds satisfaction in immediate experience rather than larger meaning",
      "Does not feel driven by legacy or deeper impact",
      "Comfortable without a grand narrative",
    ],
    strengths: [
      "Freedom from the burden of finding purpose",
      "Ability to enjoy life as it is",
      "Flexibility without existential weight",
      "Can be present without constant striving",
      "Less susceptible to burnout from purpose-seeking",
    ],
    blindSpots: [
      "May feel empty or disconnected over time",
      "Could struggle in moments requiring deep motivation",
      "Might not build toward anything meaningful",
      "Can become passive or reactive",
      "May feel lost if circumstances change",
    ],
    lifeImplications: [
      "You can have a good life without grand purpose",
      "Small meaningful moments matter",
      "Be aware if detachment masks depression or numbness",
      "Purpose might emerge unexpectedly—stay open",
    ],
    actionItems: [
      "Distinguish between healthy detachment and apathy or depression",
      "Explore if something small feels meaningful",
      "Try committing to something and see how it affects you",
      "Notice moments where you feel engaged or alive",
      "Purpose does not have to be grand—small meaning counts",
    ],
  },
];

// ==================== GROWTH TRAJECTORY FAMILY ====================
const growthTrajectoryTypes: LifeDirectionType[] = [
  {
    id: "ld-gt-1",
    name: "The Consistent Climber",
    tagline: "Gradual and steady progress",
    shortDesc:
      "You grow step by step. You value consistency and long term development over sudden change.",
    family: "growth-trajectory",
    fullDesc:
      "Your life unfolds through steady progress. You believe in incremental improvement, compound growth, and the power of consistency. You are not waiting for a breakthrough—you are building one step at a time. This is sustainable growth, not flashy.",
    behavior: [
      "Focuses on steady improvement over time",
      "Values consistency and discipline",
      "Builds skills and capacities gradually",
      "Celebrates small wins and progress",
      "Does not expect breakthrough moments",
    ],
    strengths: [
      "Sustainable, long-term growth",
      "Strong foundation built through consistency",
      "Reliability and dependability",
      "Lasting results rather than fleeting change",
      "Resilience through gradual strengthening",
    ],
    blindSpots: [
      "May feel like progress is too slow",
      "Can become bored or impatient with incremental change",
      "Might miss the significance of small progress",
      "Could misjudge when bigger leaps are needed",
      "May be threatened by rapid change or disruption",
    ],
    lifeImplications: [
      "Your life is being built durably, though slowly",
      "Small steps compound into significant results",
      "Disruptions or major changes can feel destabilizing",
      "Your consistency is strength, but flexibility matters too",
    ],
    actionItems: [
      "Track small progress to see compound effects",
      "Build milestones that show the impact of consistency",
      "Remain open to when bigger leaps might be necessary",
      "Celebrate incremental growth more actively",
      "Balance consistency with readiness to adapt",
    ],
  },
  {
    id: "ld-gt-2",
    name: "The Reinventor",
    tagline: "Rebuilds life multiple times",
    shortDesc:
      "You go through phases of transformation. You are not afraid to reset and start again when needed.",
    family: "growth-trajectory",
    fullDesc:
      "Your life is marked by significant transformations. You shed old versions of yourself, start new chapters, and rebuild when needed. This is not instability—it is intentional evolution. You are not afraid of the discomfort of reinvention.",
    behavior: [
      "Goes through major life transitions and restructures",
      "Willing to let go of old identity",
      "Starts fresh when paths no longer fit",
      "Embraces uncertainty that comes with reinvention",
      "Sees life as chapters rather than one continuous narrative",
    ],
    strengths: [
      "Ability to transform and evolve",
      "Not bound to outdated versions of yourself",
      "Courage to begin again",
      "Fresh perspective from multiple life chapters",
      "Resilience through adaptability",
    ],
    blindSpots: [
      "Others may perceive you as unstable or flaky",
      "Reinventions can be exhausting",
      "May not build long-term stability or mastery",
      "Could use reinvention as escape from difficulty",
      "Family or relationships struggle with constant change",
    ],
    lifeImplications: [
      "Your life is dynamic and evolving, but potentially chaotic",
      "You need to distinguish between necessary reinvention and avoidance",
      "Anchoring relationships or values helps during transitions",
      "Your capacity to transform is rare and valuable",
    ],
    actionItems: [
      "Before each reinvention, explore what you are leaving behind and why",
      "Maintain some continuity (values, relationships) through changes",
      "Give yourself space to integrate each transformation",
      "Help others understand your process, not just the outcome",
      "Use your reinvention capacity intentionally, not reactively",
    ],
  },
  {
    id: "ld-gt-3",
    name: "The Stagnant",
    tagline: "Feels stuck in place",
    shortDesc:
      "You feel like your life is not moving forward. Even if time passes, your direction feels unchanged.",
    family: "growth-trajectory",
    fullDesc:
      "Your life feels static. Time passes, but you sense that you are not progressing. This can feel frustrating, hopeless, or numb. Stagnation is often a sign that something needs to change—but the first step is acknowledging the pattern.",
    behavior: [
      "Feels like life is not progressing",
      "Repeats similar patterns without change",
      "Struggles to initiate growth or development",
      "May feel resigned or hopeless",
      "Does not believe in your capacity to change",
    ],
    strengths: [
      "Awareness that something is stuck",
      "Potential for breakthrough once inertia breaks",
      "Can relate to others in difficult circumstances",
      "Stability, though not growth",
      "The fact that you recognize stagnation means you are ready",
    ],
    blindSpots: [
      "May lack energy or belief to change",
      "Could be depressed without recognizing it",
      "Might blame external circumstances instead of examining your role",
      "Can become resigned to being stuck",
      "May not see small movements as progress",
    ],
    lifeImplications: [
      "You need support to break the pattern",
      "Small actions often break inertia",
      "Your perception may be more hopeless than reality",
      "Healing requires movement, not just waiting",
    ],
    actionItems: [
      "Seek professional support if this feels like depression",
      "Identify one small thing you can change",
      "Take action, even if you do not believe it will work",
      "Track small shifts—you may not see progress you are making",
      "Consider external support, coaching, or community",
      "Break the pattern with a deliberate disruption",
    ],
  },
  {
    id: "ld-gt-4",
    name: "The Breakthrough Seeker",
    tagline: "Waiting for a major shift",
    shortDesc:
      "You believe your life will change significantly at some point. You are searching for that turning moment.",
    family: "growth-trajectory",
    fullDesc:
      "You sense that a major shift is coming or needed. You are waiting for or working toward a breakthrough moment that will change everything. This can be hopeful—or it can be avoidance of present responsibility.",
    behavior: [
      "Believes a major shift will change your life",
      "Searches for the catalyst or turning point",
      "May delay action, waiting for the right moment",
      "Focused on future transformation rather than present growth",
      "Feels pulled toward something bigger",
    ],
    strengths: [
      "Hope and sense of possibility",
      "Awareness that transformation is possible",
      "Openness to major change",
      "Can inspire others with vision of breakthrough",
      "Willingness to wait for the right timing",
    ],
    blindSpots: [
      "May delay taking action by waiting for the breakthrough",
      "Could become passive, waiting for external change",
      "Might not recognize when breakthroughs are already happening",
      "Could miss the smaller progress while waiting for the big one",
      "May use the breakthrough fantasy as escape",
    ],
    lifeImplications: [
      "Breakthroughs often come through action, not waiting",
      "Small breakthroughs build toward the big one",
      "You may be creating the conditions for your breakthrough already",
      "The breakthrough may be internal readiness, not external event",
    ],
    actionItems: [
      "Define what the breakthrough would actually look like",
      "Identify actions that would move you toward it",
      "Start building toward breakthrough through daily choices",
      "Recognize small breakthroughs as they happen",
      "Question whether you are waiting or actively moving",
      "Remember: breakthroughs come to prepared people",
    ],
  },
];

// ==================== INTERNAL VS EXTERNAL CONTROL FAMILY ====================
const internalExternalControlTypes: LifeDirectionType[] = [
  {
    id: "ld-iec-1",
    name: "The Self Directed",
    tagline: "Guided from within",
    shortDesc:
      "You make decisions based on your own values and thinking. You trust your internal judgment.",
    family: "internal-external-control",
    fullDesc:
      "You have a strong internal locus of control. Your direction comes from your own values, judgment, and sense of alignment. You do not need external validation or permission. You trust your own compass.",
    behavior: [
      "Makes decisions based on internal values",
      "Does not need external validation",
      "Trusts your own judgment",
      "Sets your own standards and paths",
      "Self-reliant and independent",
    ],
    strengths: [
      "Strong sense of agency and autonomy",
      "Independence and self-trust",
      "Clear values driving your choices",
      "Authentic life aligned with your own truth",
      "Resilience through internal grounding",
    ],
    blindSpots: [
      "May dismiss valuable input from others",
      "Can be stubborn or unwilling to adjust",
      "Might struggle to ask for help",
      "Could become isolated through excessive self-reliance",
      "May miss important perspectives by only trusting yourself",
    ],
    lifeImplications: [
      "Your life is authentically yours, guided by your values",
      "You may sometimes miss wisdom from others",
      "Relationships work best when you can also trust others",
      "Your strength is independence—use it wisely",
    ],
    actionItems: [
      "Continue trusting yourself while remaining open to input",
      "Distinguish between staying true to yourself and being closed to growth",
      "Identify areas where outside perspective could strengthen decisions",
      "Build communities with others who share your values",
      "Balance self-direction with collaboration",
    ],
  },
  {
    id: "ld-iec-2",
    name: "The Influenced",
    tagline: "Shaped by environment",
    shortDesc:
      "Your direction is influenced by people, trends, or surroundings. You adapt based on external input.",
    family: "internal-external-control",
    fullDesc:
      "Your direction is responsive to environment. You are influenced by people around you, cultural trends, circumstances, and external opportunities. This makes you adaptable and relational, but also sometimes unmoored.",
    behavior: [
      "Takes cues from environment",
      "Influenced by people and trends around you",
      "Adapts direction based on surroundings",
      "Responsive to others' energy and ideas",
      "Flexible in your approach and commitments",
    ],
    strengths: [
      "Adaptability and responsiveness",
      "Good at reading and responding to environments",
      "Relational and connected to others",
      "Can adjust to changing circumstances",
      "Often find opportunities through external awareness",
    ],
    blindSpots: [
      "May lose sense of your own values or preferences",
      "Can be overly reactive to external pressure",
      "Might not have strong internal compass",
      "Could feel lost without external structure or input",
      "May struggle to make decisions independently",
    ],
    lifeImplications: [
      "You are relational and adaptable, which is valuable",
      "You also need to develop internal clarity",
      "Not all external input deserves to shape your direction",
      "Building internal anchors helps with stability",
    ],
    actionItems: [
      "Identify your core values separate from environment",
      "Practice choosing independently, even in small ways",
      "Build trusted internal voices alongside external input",
      "Question which external influences truly serve you",
      "Develop clarity about what you want, apart from surroundings",
    ],
  },
  {
    id: "ld-iec-3",
    name: "The Conflicted",
    tagline: "Pulled between inner and outer",
    shortDesc:
      "You feel tension between what you want and what is expected. This creates confusion in your direction.",
    family: "internal-external-control",
    fullDesc:
      "You are caught between two forces: your own desires and external expectations. This creates internal conflict. Your direction is unclear because part of you wants one thing while another part wants to honor expectations. This tension is real and requires resolution.",
    behavior: [
      "Feels torn between internal desires and external expectations",
      "Struggles with conflicting pressures",
      "May feel paralyzed by competing demands",
      "Swings between following self and honoring others",
      "Creates internal confusion and indecision",
    ],
    strengths: [
      "Awareness of the conflict itself",
      "Ability to see both sides",
      "Care for both yourself and others",
      "Potential for integration and authentic choices",
      "Capacity for growth through resolving conflict",
    ],
    blindSpots: [
      "Conflict can feel immobilizing",
      "Might try to appease both sides without true resolution",
      "Could become resentful toward those whose expectations conflict with you",
      "May not take decisive action because of inner division",
      "Can stay in limbo indefinitely",
    ],
    lifeImplications: [
      "You cannot honor both forces equally—some integration is needed",
      "Clarity requires making choice about which voice guides you",
      "The conflict itself is draining and unsustainable",
      "Resolution comes through honest conversation and choice",
    ],
    actionItems: [
      "Name the conflicting forces clearly",
      "Have honest conversations with people whose expectations matter",
      "Explore which parts are your authentic voice vs. internalized pressure",
      "Make deliberate choices rather than trying to appease everyone",
      "Accept that honoring yourself may disappoint others",
      "Seek support (therapy, coaching) to resolve internal conflict",
    ],
  },
  {
    id: "ld-iec-4",
    name: "The Dependent",
    tagline: "Relies on others for direction",
    shortDesc:
      "You struggle to decide independently. You look to others for clarity and guidance.",
    family: "internal-external-control",
    fullDesc:
      "Your direction comes from outside yourself. You look to others—mentors, parents, partners, authority figures—to tell you what to do or who to be. This can provide stability, but it also means your life is not fully yours.",
    behavior: [
      "Looks to others for guidance before deciding",
      "Struggles to trust your own judgment",
      "Defers to others' wisdom or input",
      "Feels uncomfortable making independent decisions",
      "Seeks approval and direction",
    ],
    strengths: [
      "Willingness to learn from others",
      "Respect for guidance and wisdom",
      "Ability to follow clear direction",
      "Good at asking for help",
      "Often builds strong mentoring relationships",
    ],
    blindSpots: [
      "May lose sense of your own voice or preferences",
      "Can become overly dependent on specific people",
      "Might struggle when mentors or guides are unavailable",
      "Could make choices that do not fit you because others said so",
      "May not develop your own discernment",
    ],
    lifeImplications: [
      "You need mentors and guidance, which is healthy",
      "You also need to develop your own internal authority",
      "Your life must eventually be guided by you",
      "Building independence is gradual but necessary",
    ],
    actionItems: [
      "Start making small decisions independently",
      "Build trust in your own judgment through experimentation",
      "Seek mentors who teach you to trust yourself, not just follow them",
      "Practice listening to your own voice alongside others' wisdom",
      "Gradually expand areas where you decide independently",
      "Understand that you can honor others while trusting yourself",
    ],
  },
];

// ==================== LIFE PHASE FAMILY ====================
const lifePhaseTypes: LifeDirectionType[] = [
  {
    id: "ld-lp-1",
    name: "The Starting Point",
    tagline: "At the beginning",
    shortDesc:
      "You are just entering a new phase. Everything feels open, but also uncertain.",
    family: "life-phase",
    fullDesc:
      "You are at the beginning of something—a new chapter, a fresh start, an opening phase. This phase is characterized by possibility and uncertainty. You have not yet established your footing, but everything is still possible.",
    behavior: [
      "Feels like you are starting something new",
      "Everything feels open and undefined",
      "Experiences both excitement and uncertainty",
      "Exploring what is possible",
      "Not yet fully initiated into this new phase",
    ],
    strengths: [
      "Openness and possibility",
      "Lack of entrenched patterns",
      "Potential to build from scratch",
      "Energy and newness",
      "Can choose direction without as much baggage",
    ],
    blindSpots: [
      "Can feel disorienting or unstable",
      "Might lack the structure or wisdom from experience",
      "Can be paralyzed by all the possibilities",
      "May underestimate challenges ahead",
      "Uncertainty can be anxiety-producing",
    ],
    lifeImplications: [
      "This phase is temporary—you will establish footing",
      "Use the openness to choose wisely",
      "Uncertainty is part of starting, not a sign something is wrong",
      "Community and mentorship matter in this phase",
    ],
    actionItems: [
      "Use the openness to explore rather than panic",
      "Find mentors or models for the phase you are entering",
      "Set some initial anchors while remaining open",
      "Document what you learn in this beginning phase",
      "Connect with others also at starting points",
    ],
  },
  {
    id: "ld-lp-2",
    name: "The Building Phase",
    tagline: "Actively creating your life",
    shortDesc:
      "You are focused on progress. You are putting in effort to build something meaningful.",
    family: "life-phase",
    fullDesc:
      "You are in active creation mode. You are not establishing or reflecting—you are building. This phase demands effort, focus, and sustained energy. You are constructing something—skills, relationships, structures, impact.",
    behavior: [
      "Focused on progress and building",
      "Putting in significant effort and energy",
      "Working toward specific goals",
      "Creating structures and systems",
      "Momentum and forward movement",
    ],
    strengths: [
      "Momentum and progress",
      "Clear focus and direction",
      "Effort producing visible results",
      "Sense of purpose through building",
      "Energy and drive",
    ],
    blindSpots: [
      "Can burn out from sustained effort",
      "Might neglect other areas while focused on building",
      "Can lose sight of why you are building",
      "May not pause to rest or integrate",
      "Could sacrifice wellbeing for productivity",
    ],
    lifeImplications: [
      "This phase is demanding but finite",
      "You need to pace yourself sustainably",
      "Building without rest leads to burnout",
      "The pace cannot be maintained indefinitely",
    ],
    actionItems: [
      "Build milestones and rest points into your progress",
      "Define what 'done' looks like for this building phase",
      "Maintain basic wellbeing practices despite busyness",
      "Connect with others in building phases for support",
      "Regularly check in on why you are building",
      "Plan for transition when this building phase completes",
    ],
  },
  {
    id: "ld-lp-3",
    name: "The Transition Phase",
    tagline: "Moving between stages",
    shortDesc:
      "You are shifting from one phase to another. This can feel unstable but necessary.",
    family: "life-phase",
    fullDesc:
      "You are between chapters. You are no longer fully in the last phase but not yet settled in the next. This is inherently unstable but also necessary. Transitions are not failures or problems—they are part of natural development.",
    behavior: [
      "Feels between two states or phases",
      "Experiences displacement as one phase ends",
      "Exploring what comes next",
      "Not fully established in new direction",
      "May feel confused or unmoored",
    ],
    strengths: [
      "Openness to change",
      "Letting go of what no longer fits",
      "Ability to navigate uncertainty",
      "Potential for growth through transition",
      "Flexibility and responsiveness",
    ],
    blindSpots: [
      "Transition can feel very unstable",
      "Might overcommit while trying to stabilize",
      "Can become anxious about landing on new ground",
      "May try to rush through transition",
      "Could feel lost or purposeless in between",
    ],
    lifeImplications: [
      "Transitions are natural, not signs of failure",
      "You need support and patience during transitions",
      "The between phase has its own wisdom",
      "Rushing transition often prolongs it",
    ],
    actionItems: [
      "Allow yourself to actually be between—no rushing",
      "Seek support and community during transition",
      "Reflect on what you are leaving and what you are moving toward",
      "Honor the grief of the ending phase",
      "Stay open to what the transition is teaching",
      "Create small anchors of stability amid change",
    ],
  },
  {
    id: "ld-lp-4",
    name: "The Reflection Phase",
    tagline: "Looking back and reassessing",
    shortDesc:
      "You are evaluating your past and questioning your current direction. You want to realign.",
    family: "life-phase",
    fullDesc:
      "You are pausing to look back. Something is prompting evaluation—a milestone, a loss, dissatisfaction, or just time passing. You are questioning whether your current direction still fits. This is not crisis; it is necessary evaluation.",
    behavior: [
      "Looking back at your path and choices",
      "Questioning whether current direction still fits",
      "Reflecting on lessons and patterns",
      "Considering what needs to change",
      "Seeking realignment rather than just continuation",
    ],
    strengths: [
      "Wisdom from reflection",
      "Ability to course correct",
      "Learning from past experience",
      "Intentional realignment before crisis",
      "Consciousness about your own path",
    ],
    blindSpots: [
      "Can become self-critical or questioning",
      "Reflection without action can feel paralyzed",
      "Might overcorrect based on past regrets",
      "Can second-guess good decisions",
      "May lose confidence in self",
    ],
    lifeImplications: [
      "Reflection is healthy and necessary",
      "Insights must eventually lead to action",
      "Realignment does not negate past value",
      "This phase should lead to new clarity",
    ],
    actionItems: [
      "Reflect thoroughly, without being critical",
      "Identify what you want to keep and what to change",
      "Distinguish between adjustments and major shifts",
      "Create a realignment plan to move forward",
      "Move from reflection into action",
      "Connect with others also in reflection phases",
    ],
  },
  {
    id: "ld-lp-5",
    name: "The Established",
    tagline: "Stable and defined",
    shortDesc:
      "You have built a life structure that feels clear and stable. Your focus is now maintaining or refining it.",
    family: "life-phase",
    fullDesc:
      "You have established your life. Your direction is clear, your structure is solid, your path is defined. You are not searching or building anymore—you are living within what you have created. Your focus now is maintenance, refinement, and depth.",
    behavior: [
      "Clear, established life direction",
      "Stable structures and systems",
      "Focus on maintaining and refining",
      "Living from a grounded place",
      "Long-term thinking about small improvements",
    ],
    strengths: [
      "Stability and clarity",
      "Freedom to focus on depth rather than breadth",
      "Security in established structures",
      "Ability to refine and optimize",
      "Peace and grounding",
    ],
    blindSpots: [
      "Can become rigid or resistant to change",
      "Might miss important shifts in life or self",
      "Can lose aliveness by over-maintaining",
      "May not notice when established structure no longer fits",
      "Could become complacent",
    ],
    lifeImplications: [
      "You have earned the stability you have",
      "Maintaining does not mean staying frozen",
      "Continued growth happens within stability",
      "Openness to evolution prevents rigidity",
    ],
    actionItems: [
      "Maintain structures while remaining open to evolution",
      "Build in regular reflection even in stability",
      "Notice if established structure begins to feel limiting",
      "Allow for refinement and growth within what is established",
      "Stay connected to why you built what you built",
    ],
  },
];

// ==================== PUBLIC API ====================

export function getLifeDirectionTypesByFamily(
  family: LifeDirectionFamily,
): LifeDirectionType[] {
  const allTypes = [
    ...clarityStateTypes,
    ...decisionStyleTypes,
    ...purposeRelationshipTypes,
    ...growthTrajectoryTypes,
    ...internalExternalControlTypes,
    ...lifePhaseTypes,
  ];
  return allTypes.filter((type) => type.family === family);
}

export function getAllLifeDirectionTypes(): LifeDirectionType[] {
  return [
    ...clarityStateTypes,
    ...decisionStyleTypes,
    ...purposeRelationshipTypes,
    ...growthTrajectoryTypes,
    ...internalExternalControlTypes,
    ...lifePhaseTypes,
  ];
}

export function getLifeDirectionType(
  id: string,
): LifeDirectionType | undefined {
  const allTypes = getAllLifeDirectionTypes();
  return allTypes.find((type) => type.id === id);
}
