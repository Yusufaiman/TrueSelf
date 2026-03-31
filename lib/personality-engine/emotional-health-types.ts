// ==================== EMOTIONAL HEALTH TYPES ====================
// Understanding how you experience emotions, respond to stress, and maintain emotional balance

export type EmotionalHealthFamily =
  | "emotional-awareness"
  | "emotional-regulation"
  | "stress-response"
  | "emotional-stability"
  | "energy-burnout"
  | "trauma-sensitivity"
  | "recovery-pattern";

export interface EmotionalHealthType {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  family: EmotionalHealthFamily;
  fullDesc: string;
  behavior: string[];
  strengths: string[];
  blindSpots: string[];
  actionItems: string[];
}

// ==================== EMOTIONAL AWARENESS FAMILY ====================
const emotionalAwarenessTypes: EmotionalHealthType[] = [
  {
    id: "eh-ea-1",
    name: "The Self Aware",
    tagline: "Understands inner emotional state clearly",
    shortDesc:
      "You recognize what you feel and why. This allows you to respond thoughtfully instead of reacting impulsively.",
    family: "emotional-awareness",
    fullDesc:
      "You have developed a clear understanding of your emotional landscape. You can identify feelings as they arise and understand the triggers and patterns behind them. This awareness creates space between your emotions and actions, allowing you to respond with intention rather than impulse.",
    behavior: [
      "You pause to identify what you are feeling",
      "You understand why you feel certain ways",
      "You can communicate your emotions clearly",
      "You notice emotional patterns in yourself",
    ],
    strengths: [
      "High emotional intelligence",
      "Ability to respond rather than react",
      "Better decision making",
      "Capacity for genuine self-reflection",
      "Improved relationships through clarity",
    ],
    blindSpots: [
      "May become overly analytical about emotions",
      "Could judge others for lack of awareness",
      "Might seem emotionally detached while analyzing",
      "Awareness does not guarantee action",
    ],
    actionItems: [
      "Share your emotional awareness with others",
      "Help others develop their own emotional vocabulary",
      "Use awareness to guide meaningful choices",
      "Balance analysis with emotional experience",
    ],
  },
  {
    id: "eh-ea-2",
    name: "The Confused Feeler",
    tagline: "Feels deeply but struggles to label emotions",
    shortDesc:
      "You experience strong emotions but often cannot clearly explain what you are feeling.",
    family: "emotional-awareness",
    fullDesc:
      "You feel emotions intensely but struggle to identify, name, or articulate them. You know something is happening inside but lack the clarity to understand it. This can lead to confusion about yourself and difficulty communicating your inner experience to others.",
    behavior: [
      "You feel strongly but cannot name the emotion",
      "You struggle to explain what is wrong",
      "Your emotions seem to come from nowhere",
      "You may act on feelings you do not understand",
    ],
    strengths: [
      "Deep emotional sensitivity",
      "Genuine emotional experience",
      "Creativity inspired by complex feelings",
      "Potential for significant growth",
      "Capacity to feel nuance and complexity",
    ],
    blindSpots: [
      "Confusion can manifest as unpredictability",
      "Difficulty in communication with others",
      "May make poor decisions based on unclear feelings",
      "Internal confusion creates stress",
      "Others may misinterpret your reactions",
    ],
    actionItems: [
      "Learn emotional vocabulary to name feelings",
      "Keep an emotion journal to track patterns",
      "Ask trusted people for perspective",
      "Practice pausing before acting on emotions",
      "Seek support in developing emotional clarity",
    ],
  },
  {
    id: "eh-ea-3",
    name: "The Detached Observer",
    tagline: "Sees emotions but feels distant",
    shortDesc:
      "You can identify emotions but feel disconnected from them, as if observing rather than experiencing.",
    family: "emotional-awareness",
    fullDesc:
      "You have intellectual awareness of emotions, both your own and others', but experience them from a distance. You can recognize what you feel, but there is a gap between the recognition and the actual feeling. This creates a sense of observing your own emotional life rather than living it.",
    behavior: [
      "You notice emotions but feel separate from them",
      "You can describe feelings but not feel them deeply",
      "You seem calm even in emotional situations",
      "You observe others' emotions clearly",
    ],
    strengths: [
      "Objective perspective on emotional situations",
      "Ability to think clearly under pressure",
      "Good at helping others without getting caught up",
      "Less likely to be overwhelmed",
      "Can offer calm support to others",
    ],
    blindSpots: [
      "Distance can be mistaken for coldness",
      "May not appreciate emotional depth",
      "Others may feel unseen in their emotions",
      "Missing out on emotional richness",
      "Could come across as uncaring",
    ],
    actionItems: [
      "Practice engaging with emotions rather than observing",
      "Allow yourself to feel without judgment",
      "Build connection through emotional engagement",
      "Understand that objectivity does not mean detachment",
      "Explore whether this distance is protective",
    ],
  },
  {
    id: "eh-ea-4",
    name: "The Suppressed",
    tagline: "Avoids emotional awareness",
    shortDesc:
      "You tend to push emotions aside instead of exploring them, which can create hidden tension.",
    family: "emotional-awareness",
    fullDesc:
      "You have developed a strategy of pushing emotions away or ignoring them altogether. This creates a surface-level stability but emotions do not disappear; they build underneath. You may not even realize what you are feeling because you have become skilled at not looking.",
    behavior: [
      "You avoid thinking about your emotions",
      "You quickly move past emotional moments",
      "You do not like to explore feelings",
      "You may say I am fine when you are not",
    ],
    strengths: [
      "Surface stability and composure",
      "Ability to keep going despite difficulty",
      "Does not dwell on pain",
      "Can appear strong and resilient",
      "Protective mechanism that serves sometimes",
    ],
    blindSpots: [
      "Emotions build under the surface",
      "Can suddenly overwhelm you",
      "Relationships suffer from lack of authenticity",
      "Health consequences from suppression",
      "Miss crucial emotional information",
    ],
    actionItems: [
      "Understand what you are suppressing and why",
      "Gradually allow yourself to feel small emotions",
      "Find safe places to explore feelings",
      "Recognize that emotions contain important data",
      "Build trust that feelings won't destroy you",
    ],
  },
];

// ==================== EMOTIONAL REGULATION FAMILY ====================
const emotionalRegulationTypes: EmotionalHealthType[] = [
  {
    id: "eh-er-1",
    name: "The Regulated",
    tagline: "Handles emotions in a stable way",
    shortDesc:
      "You manage emotional highs and lows without losing control. You remain composed under pressure.",
    family: "emotional-regulation",
    fullDesc:
      "You have developed the ability to experience emotions without being swept away by them. You can feel intensely while maintaining functional control. This regulation allows you to act in alignment with your values even when emotions are strong.",
    behavior: [
      "You feel emotions but do not lose control",
      "You can slow down before reacting",
      "You manage stress without overwhelm",
      "You maintain perspective during difficulty",
    ],
    strengths: [
      "Emotional stability under pressure",
      "Ability to make sound decisions",
      "Others trust you in crises",
      "Less reactive to provocation",
      "Can help others regulate",
    ],
    blindSpots: [
      "Others might see you as cold",
      "May seem unaffected by important things",
      "Could hide genuine needs",
      "Others might not realize you are struggling",
      "May minimize emotional experiences",
    ],
    actionItems: [
      "Share your emotional experience more",
      "Let others see your humanity",
      "Use your regulation skills to help others",
      "Ensure regulation does not become suppression",
      "Practice expressing emotions while regulated",
    ],
  },
  {
    id: "eh-er-2",
    name: "The Reactive",
    tagline: "Emotions quickly take over",
    shortDesc:
      "You respond immediately based on how you feel, sometimes before thinking things through.",
    family: "emotional-regulation",
    fullDesc:
      "Your emotions are quick to take the steering wheel. You express, act, or respond based on what you feel in the moment. There is little filter between feeling and action. This creates authenticity but can also lead to consequences you later regret.",
    behavior: [
      "You respond immediately to emotional triggers",
      "You act before fully thinking things through",
      "Your mood influences your decisions",
      "You may say or do things you regret",
    ],
    strengths: [
      "Genuine emotional expression",
      "Authenticity and honesty",
      "Quick response to situations",
      "Passionate engagement with life",
      "People know how you feel",
    ],
    blindSpots: [
      "Impulsive actions with consequences",
      "Difficulty maintaining relationships",
      "Words spoken in heat cause damage",
      "Cannot slow down when needed",
      "Others feel unsafe around volatility",
    ],
    actionItems: [
      "Create space between emotion and action",
      "Practice pausing before reacting",
      "Develop self-awareness about triggers",
      "Use physical methods to slow down",
      "Make amends when necessary",
    ],
  },
  {
    id: "eh-er-3",
    name: "The Bottler",
    tagline: "Holds emotions inside",
    shortDesc:
      "You keep emotions contained and rarely express them, which may build internal pressure.",
    family: "emotional-regulation",
    fullDesc:
      "You have learned to keep your emotions to yourself. You feel them internally but do not show them or release them. This creates a controlled exterior but can build pressure underneath. You may appear calm or stable while struggling on the inside.",
    behavior: [
      "You do not express emotions outwardly",
      "You keep feelings to yourself",
      "You appear composed even when stressed",
      "You may not tell people you need help",
    ],
    strengths: [
      "Control in emotional situations",
      "Does not burden others",
      "Appears stable and reliable",
      "Can think clearly without expression",
      "Others see you as in control",
    ],
    blindSpots: [
      "Pressure builds internally",
      "Others do not know what you need",
      "Connections lack depth",
      "Health impacts from bottling",
      "Could explode unexpectedly",
    ],
    actionItems: [
      "Find safe people to share with",
      "Express emotions in small ways first",
      "Understand that sharing is strength",
      "Release emotions gradually before pressure builds",
      "Practice vulnerability with trusted people",
    ],
  },
  {
    id: "eh-er-4",
    name: "The Explosive",
    tagline: "Emotions build then release suddenly",
    shortDesc:
      "You appear calm, but emotions accumulate and eventually release intensely.",
    family: "emotional-regulation",
    fullDesc:
      "You contain emotions until they reach a critical point, then they release with intensity. To others, the explosion seems sudden when actually feelings have been building. You may swing between calm composure and sudden intensity.",
    behavior: [
      "You seem fine then suddenly become intense",
      "Emotions accumulate over time",
      "Small triggers can cause big reactions",
      "You may not express until overwhelmed",
    ],
    strengths: [
      "Can function normally much of the time",
      "Genuine emotional expression when it emerges",
      "Eventually release what is built up",
      "Have capacity for intense feeling",
      "Can recognize when you are reaching limit",
    ],
    blindSpots: [
      "Others feel blindsided by explosions",
      "Relationships suffer from unpredictability",
      "Damage occurs in intensity",
      "This pattern often repeats",
      "Others feel unsafe around the volatility",
    ],
    actionItems: [
      "Express emotions more frequently",
      "Notice what is building before explosion",
      "Release emotions in smaller increments",
      "Warn people before you reach limit",
      "Develop regular emotional release practices",
    ],
  },
];

// ==================== STRESS RESPONSE FAMILY ====================
const stressResponseTypes: EmotionalHealthType[] = [
  {
    id: "eh-sr-1",
    name: "The Adaptive",
    tagline: "Adjusts well under pressure",
    shortDesc:
      "You adapt to stressful situations and remain functional even in difficult conditions.",
    family: "stress-response",
    fullDesc:
      "When stress appears, you shift gears rather than freeze. You find ways to remain functional and keep moving forward even when circumstances are challenging. You are not immune to stress but handle it by adjusting your approach and finding solutions.",
    behavior: [
      "You adjust your approach when stress appears",
      "You stay focused on solutions",
      "You remain functional under pressure",
      "You find ways through difficulties",
    ],
    strengths: [
      "Can handle crisis situations",
      "Problem-solving under pressure",
      "Does not panic when things change",
      "Others rely on you in emergencies",
      "Maintains forward momentum",
    ],
    blindSpots: [
      "May not process emotions in crisis",
      "Could push too hard too long",
      "May dismiss others who struggle",
      "Might not recognize burnout coming",
      "Can seem uncaring about the difficulty",
    ],
    actionItems: [
      "Balance adaptation with processing",
      "Allow time to recover after stress",
      "Recognize signs of burnout",
      "Notice when others are not as adaptive",
      "Build in rest between stressful periods",
    ],
  },
  {
    id: "eh-sr-2",
    name: "The Anxious Reactor",
    tagline: "Stress triggers worry and tension",
    shortDesc:
      "Pressure leads to overthinking, fear, or constant mental noise.",
    family: "stress-response",
    fullDesc:
      "Stress activates anxiety in you. Pressure leads to worry, worst-case thinking, and inability to settle. Your mind becomes noisy with concerns and possible disasters. This can make stress feel larger than it actually is.",
    behavior: [
      "Stress triggers worry and overthinking",
      "You anticipate worst case scenarios",
      "You may feel physical tension",
      "Your mind runs with possibilities",
    ],
    strengths: [
      "Awareness of potential problems",
      "Can plan for contingencies",
      "Serious about preparation",
      "Takes threats seriously",
      "Can motivate yourself through fear",
    ],
    blindSpots: [
      "Anxiety can become paralyzing",
      "Overestimate likelihood of bad outcomes",
      "Physical tension has health impact",
      "Mental noise prevents clear thinking",
      "May create problems through overthinking",
    ],
    actionItems: [
      "Ground yourself when anxiety rises",
      "Test your worry predictions against reality",
      "Develop anxiety management techniques",
      "Practice distinguishing probability from possibility",
      "Find activities that settle your mind",
    ],
  },
  {
    id: "eh-sr-3",
    name: "The Shutdown",
    tagline: "Withdraws when overwhelmed",
    shortDesc:
      "When stress becomes too much, you disconnect, avoid, or lose motivation.",
    family: "stress-response",
    fullDesc:
      "Your response to overwhelming stress is to withdraw. You disconnect, avoid, or become unmotivated to engage. This protects you temporarily but prevents you from dealing with the stress directly. You may feel stuck or paralyzed under pressure.",
    behavior: [
      "You withdraw when overwhelmed",
      "You avoid the stressful situation",
      "You lose motivation and energy",
      "You disconnect from responsibilities",
    ],
    strengths: [
      "Instinct to protect yourself",
      "Can rest when truly overwhelmed",
      "Avoids aggressive responses",
      "Stops pushing when you need to",
      "Recognizes when you need break",
    ],
    blindSpots: [
      "Avoidance prevents solving problems",
      "Stress does not go away",
      "Responsibilities pile up",
      "Others may feel abandoned",
      "Situation worsens without action",
    ],
    actionItems: [
      "Build resilience gradually",
      "Take small steps rather than big ones",
      "Seek support to stay engaged",
      "Address stress while still manageable",
      "Develop coping that does not mean avoidance",
    ],
  },
  {
    id: "eh-sr-4",
    name: "The Overdriver",
    tagline: "Pushes harder under stress",
    shortDesc:
      "You respond to pressure by working more aggressively instead of slowing down.",
    family: "stress-response",
    fullDesc:
      "When stress appears, your response is to push harder. You believe the solution is effort. You work faster, longer, or more intensely. This can achieve results but at a cost to your well-being and sustainability.",
    behavior: [
      "You push harder when stressed",
      "You work longer hours",
      "You believe more effort solves problems",
      "You struggle to slow down",
    ],
    strengths: [
      "High productivity under pressure",
      "Can accomplish a lot",
      "Does not give up",
      "Gets things done",
      "Drives toward solutions",
    ],
    blindSpots: [
      "Unsustainable long-term",
      "Burnout risk is high",
      "Your health suffers",
      "Relationships neglected",
      "May miss better solutions",
    ],
    actionItems: [
      "Notice when pushing becomes harmful",
      "Practice slowing down deliberately",
      "Find non-effort solutions",
      "Build rest into your system",
      "Recognize that more is not always better",
    ],
  },
];

// ==================== EMOTIONAL STABILITY FAMILY ====================
const emotionalStabilityTypes: EmotionalHealthType[] = [
  {
    id: "eh-es-1",
    name: "The Grounded",
    tagline: "Emotionally steady and balanced",
    shortDesc:
      "Your emotional state is stable and not easily influenced by external changes.",
    family: "emotional-stability",
    fullDesc:
      "Your emotional baseline is relatively stable. External situations do not easily shake you. You maintain a consistent emotional tone even as circumstances change. This creates equilibrium but does not mean you do not feel.",
    behavior: [
      "Your emotions are stable",
      "External events do not destabilize you",
      "You maintain consistent perspective",
      "You are not easily rattled",
    ],
    strengths: [
      "Inner stability and peace",
      "Others find you calming",
      "Consistent and reliable",
      "Not prone to mood swings",
      "Can help ground others",
    ],
    blindSpots: [
      "Others may think you do not feel",
      "May seem unaffected by important things",
      "Others may not feel your support deeply",
      "Could appear emotionally flat",
      "Distance can be mistaken for indifference",
    ],
    actionItems: [
      "Show your emotional life more openly",
      "Allow important things to move you",
      "Share how you are affected",
      "Connect your stability with warmth",
      "Use your groundedness to reassure others",
    ],
  },
  {
    id: "eh-es-2",
    name: "The Fluctuating",
    tagline: "Experiences emotional ups and downs",
    shortDesc:
      "Your emotions shift frequently depending on situations and internal thoughts.",
    family: "emotional-stability",
    fullDesc:
      "Your emotional state moves up and down based on circumstances, thoughts, or interactions. You are responsive to your environment and your internal mental state. This creates liveliness but also inconsistency.",
    behavior: [
      "Your mood changes based on situations",
      "Thoughts affect your emotional state",
      "You move between high and low",
      "Small things can shift your mood",
    ],
    strengths: [
      "Emotional responsiveness to life",
      "Non-rigid emotional range",
      "Ability to feel full spectrum",
      "Natural emotional flow",
      "Not emotionally stuck",
    ],
    blindSpots: [
      "Others find unpredictability hard",
      "Relationships struggle with shifts",
      "Your mood may affect others",
      "Can be seen as unstable",
      "Difficult to plan with",
    ],
    actionItems: [
      "Develop awareness of triggers",
      "Practice stabilizing techniques",
      "Warn people about mood shifts",
      "Find patterns in your fluctuations",
      "Use your responsiveness consciously",
    ],
  },
  {
    id: "eh-es-3",
    name: "The Sensitive",
    tagline: "Feels deeply and intensely",
    shortDesc:
      "You are highly responsive to emotional stimuli and react strongly to experiences.",
    family: "emotional-stability",
    fullDesc:
      "You feel things intensely. Small situations can provoke strong emotional reactions. You are like an emotional tuning fork that responds strongly to the world around you. This sensitivity is a double-edged sword of depth and overwhelm.",
    behavior: [
      "You feel emotions very strongly",
      "Small events create big reactions",
      "You are affected by others' emotions",
      "You react deeply to stimuli",
    ],
    strengths: [
      "Deep emotional experience",
      "Strong empathy for others",
      "Meaningful engagement with life",
      "Awareness of nuance and depth",
      "Capacity for genuine feeling",
    ],
    blindSpots: [
      "Easily overwhelmed",
      "Strong reactions seem disproportionate",
      "Difficulty in harsh environments",
      "High sensitivity to criticism",
      "Stress impacts you more deeply",
    ],
    actionItems: [
      "Create emotional safety",
      "Build boundaries to manage input",
      "Find communities that honor sensitivity",
      "Develop grounding practices",
      "Use sensitivity as strength not weakness",
    ],
  },
  {
    id: "eh-es-4",
    name: "The Numb",
    tagline: "Feels disconnected or empty",
    shortDesc:
      "You may feel emotionally flat or distant even in meaningful situations.",
    family: "emotional-stability",
    fullDesc:
      "You experience emotional flatness or numbness. Situations that should provoke feeling do not. You may feel disconnected from your own emotional experience or the world around you. This can feel like protection but also as isolation.",
    behavior: [
      "You feel little emotion",
      "You feel emotionally disconnected",
      "Even meaningful things feel flat",
      "You go through motions without feeling",
    ],
    strengths: [
      "Emotional distance from pain",
      "Not easily hurt",
      "Can function in difficult situations",
      "Protective mechanism working",
      "Avoids overwhelming emotion",
    ],
    blindSpots: [
      "Missing depth of life",
      "Relationships feel shallow",
      "Others feel disconnected from you",
      "May be symptom of depression",
      "Protective but limiting",
    ],
    actionItems: [
      "Check if this is depression",
      "Gradually thaw emotional experience",
      "Find things that move you",
      "Reconnect with joy and meaning",
      "Seek support to process what is underneath",
    ],
  },
];

// ==================== ENERGY & BURNOUT FAMILY ====================
const energyBurnoutTypes: EmotionalHealthType[] = [
  {
    id: "eh-eb-1",
    name: "The Energized",
    tagline: "Emotionally engaged and active",
    shortDesc:
      "You feel mentally and emotionally active, with energy to engage in life.",
    family: "energy-burnout",
    fullDesc:
      "You have emotional and mental fuel. You feel engaged with life and have energy to act, respond, and connect. You feel motivated and present. This energy is sustainable because you maintain balance.",
    behavior: [
      "You feel motivated and engaged",
      "You have energy for your life",
      "You are present in interactions",
      "You feel mentally active",
    ],
    strengths: [
      "Natural motivation",
      "Engagement with life",
      "Energy available for others",
      "Can inspire and motivate others",
      "Sustainable approach to life",
    ],
    blindSpots: [
      "May not understand those who struggle",
      "Could push others to match your energy",
      "Might minimize others' exhaustion",
      "Could be seen as privileged",
      "May not prepare for low energy",
    ],
    actionItems: [
      "Appreciate your energy level",
      "Help others build theirs",
      "Support those with low energy",
      "Maintain practices that sustain you",
      "Share what keeps you energized",
    ],
  },
  {
    id: "eh-eb-2",
    name: "The Drained",
    tagline: "Low emotional energy",
    shortDesc: "You feel tired, unmotivated, or emotionally exhausted.",
    family: "energy-burnout",
    fullDesc:
      "You feel a persistent tiredness or emotional depletion. The well is running low. You may not know why or what happened, but the energy is not there. This affects motivation, presence, and your ability to engage.",
    behavior: [
      "You feel tired and unmotivated",
      "You lack energy for engagement",
      "Everything feels effortful",
      "You struggle to show up",
    ],
    strengths: [
      "Awareness that something is wrong",
      "Slowing down consciously",
      "Capacity to rest",
      "Not pushing when depleted",
      "Honoring your limits",
    ],
    blindSpots: [
      "Untreated draining can worsen",
      "May impact responsibilities",
      "Others feel your low energy",
      "Could be sign of depression",
      "Draining can become chronic",
    ],
    actionItems: [
      "Identify what is draining you",
      "Build recovery and rest",
      "Check for underlying issues",
      "Reduce unnecessary demands",
      "Restore your sources of energy",
    ],
  },
  {
    id: "eh-eb-3",
    name: "The Burned Out",
    tagline: "Exhausted from prolonged pressure",
    shortDesc:
      "You have been under stress for too long and struggle to recover.",
    family: "energy-burnout",
    fullDesc:
      "You have been running on empty for an extended time. Burnout is not just tiredness; it is exhaustion from prolonged demand. Recovery feels distant and effort feels heavy. Simple things are now hard.",
    behavior: [
      "You feel deeply exhausted",
      "Recovery seems impossible",
      "Everything feels heavy",
      "You cannot summon energy",
    ],
    strengths: [
      "Awareness of burnout pattern",
      "Recognizing need for major change",
      "Capacity to reset if supported",
      "Understanding that rest is essential",
      "Knowing this cannot continue",
    ],
    blindSpots: [
      "Burnout affects functioning",
      "Could lead to health crisis",
      "Recovery takes significant time",
      "May lose perspective on solution",
      "Impact spreads to all areas",
    ],
    actionItems: [
      "Take burnout seriously",
      "Make significant life changes",
      "Seek professional help",
      "Remove what caused burnout",
      "Allow real recovery time",
    ],
  },
  {
    id: "eh-eb-4",
    name: "The Cyclical",
    tagline: "Energy rises and crashes",
    shortDesc:
      "You move between high energy phases and low energy periods repeatedly.",
    family: "energy-burnout",
    fullDesc:
      "Your energy follows a cycle. You have periods of high engagement and activity, then periods of low energy and withdrawal. This pattern repeats. You are not burned out but you are not stable either.",
    behavior: [
      "Your energy rises and falls",
      "You have active and rest phases",
      "You move between high and low",
      "Your patterns are somewhat predictable",
    ],
    strengths: [
      "Natural rhythm of activity and rest",
      "High energy when it comes",
      "Rest periods refresh you",
      "Accepting natural cycles",
      "Pattern awareness possible",
    ],
    blindSpots: [
      "Others cannot predict your availability",
      "Relationships struggle with cycles",
      "Low phases still take toll",
      "Could be sign of underlying pattern",
      "Cycles can be exhausting for others",
    ],
    actionItems: [
      "Plan for your cycles",
      "Help others understand pattern",
      "Maximize high energy phases",
      "Protect yourself in low phases",
      "Check if cycles are healthy rhythm",
    ],
  },
];

// ==================== TRAUMA & SENSITIVITY FAMILY ====================
const traumaSensitivityTypes: EmotionalHealthType[] = [
  {
    id: "eh-ts-1",
    name: "The Guarded",
    tagline: "Protects self from emotional harm",
    shortDesc:
      "You are cautious about opening up and tend to protect yourself emotionally.",
    family: "trauma-sensitivity",
    fullDesc:
      "You have learned to guard yourself emotionally. You are careful about who you trust and what you reveal. This protection makes sense based on your history, but it can also keep others at distance and prevent deeper connection.",
    behavior: [
      "You are cautious about opening up",
      "You protect yourself emotionally",
      "You may not share vulnerably",
      "You assess safety before opening",
    ],
    strengths: [
      "Self-protective boundaries",
      "Careful about who you trust",
      "Do not give your power away",
      "Awareness of emotional safety",
      "Protective of your inner world",
    ],
    blindSpots: [
      "Others experience you as distant",
      "Connections remain surface level",
      "Missed opportunities for closeness",
      "Protection becomes isolation",
      "Trust is hard to build",
    ],
    actionItems: [
      "Gradually expand your trust",
      "Practice vulnerability with safe people",
      "Understand your protective patterns",
      "Balance protection with connection",
      "Heal what made you guarded",
    ],
  },
  {
    id: "eh-ts-2",
    name: "The Triggered",
    tagline: "Strong reactions to specific situations",
    shortDesc:
      "Certain situations cause intense emotional responses linked to past experiences.",
    family: "trauma-sensitivity",
    fullDesc:
      "Specific situations or behaviors activate strong emotional reactions in you. These reactions are connected to past experiences. A trigger can feel like the past is happening now even if the current situation is safe.",
    behavior: [
      "You have strong reactions to specific triggers",
      "Reactions feel disproportionate",
      "Past experiences affect present",
      "You feel defensive in safe situations",
    ],
    strengths: [
      "Your system is protecting you",
      "Aware of your triggers",
      "Taking reactions seriously",
      "Recognizing pattern impact",
      "Can learn to manage triggers",
    ],
    blindSpots: [
      "Reactions can damage relationships",
      "Others feel blamed for triggers",
      "Current situation gets mixed with past",
      "Hypervigilance exhausts you",
      "Triggers limit your safety",
    ],
    actionItems: [
      "Identify your specific triggers",
      "Process underlying trauma",
      "Teach people about your triggers",
      "Develop trigger management",
      "Work toward healing past events",
    ],
  },
  {
    id: "eh-ts-3",
    name: "The Hyperaware",
    tagline: "Highly alert to emotional signals",
    shortDesc: "You notice subtle changes in tone, behavior, and environment.",
    family: "trauma-sensitivity",
    fullDesc:
      "You are highly attuned to emotional and behavioral cues in others. You notice tone shifts, subtle changes, and unspoken tension. This sensitivity gives you insight but can also create hypervigilance and anxiety.",
    behavior: [
      "You notice subtle emotional shifts",
      "You pick up on tone changes",
      "You read between lines",
      "You anticipate others' needs",
    ],
    strengths: [
      "Emotional intelligence",
      "Ability to sense others' needs",
      "Good at reading situations",
      "Can adjust to emotional context",
      "Helpful to emotionally struggling people",
    ],
    blindSpots: [
      "Hypervigilance creates stress",
      "May misinterpret neutral cues",
      "Constant scanning is exhausting",
      "Others feel examined",
      "Your own emotional needs neglected",
    ],
    actionItems: [
      "Distinguish real signals from projection",
      "Build confidence in your reading",
      "Take breaks from awareness",
      "Use sensitivity to help not control",
      "Remember you cannot read minds",
    ],
  },
  {
    id: "eh-ts-4",
    name: "The Healing",
    tagline: "Actively processing past wounds",
    shortDesc:
      "You are aware of your past experiences and are working to grow from them.",
    family: "trauma-sensitivity",
    fullDesc:
      "You have acknowledged past wounds and are actively doing the work to heal and integrate them. This is not easy but you are committed. You understand how the past affects you and you are intentionally building a different future.",
    behavior: [
      "You process past experiences",
      "You work on healing patterns",
      "You reflect on your history",
      "You seek support for integration",
    ],
    strengths: [
      "Courage to face your past",
      "Commitment to healing",
      "Wisdom from processing",
      "Capacity for genuine change",
      "Authenticity from integration",
    ],
    blindSpots: [
      "Healing is slow process",
      "Old patterns may resurface",
      "You may be hard on yourself",
      "Progress is not linear",
      "Past still affects present sometimes",
    ],
    actionItems: [
      "Continue your healing work",
      "Celebrate progress not perfection",
      "Extend compassion to yourself",
      "Build support around healing",
      "Integrate lessons from past",
    ],
  },
];

// ==================== RECOVERY PATTERN FAMILY ====================
const recoveryPatternTypes: EmotionalHealthType[] = [
  {
    id: "eh-rp-1",
    name: "The Fast Recoverer",
    tagline: "Returns to baseline quickly",
    shortDesc: "You bounce back quickly after emotional stress.",
    family: "recovery-pattern",
    fullDesc:
      "After emotional difficulty, you are able to return to your baseline relatively quickly. Whether through natural resilience or coping skills, you do not stay down for long. This allows you to keep moving forward.",
    behavior: [
      "You recover quickly from emotional hits",
      "You return to baseline fast",
      "You do not dwell",
      "You move forward readily",
    ],
    strengths: [
      "Natural resilience",
      "Do not stay stuck",
      "Can help others recover",
      "Move forward after difficulty",
      "Others feel your recovery",
    ],
    blindSpots: [
      "May seem not to care",
      "Might minimize others' struggle",
      "Could recover before truly processing",
      "Recovery may be avoidance",
      "Others feel left behind",
    ],
    actionItems: [
      "Ensure recovery includes processing",
      "Support those with slower recovery",
      "Use your resilience to uplift others",
      "Do not assume others recover as fast",
      "Balance bouncing back with depth",
    ],
  },
  {
    id: "eh-rp-2",
    name: "The Slow Processor",
    tagline: "Needs time to recover",
    shortDesc:
      "You take longer to emotionally recover and process experiences.",
    family: "recovery-pattern",
    fullDesc:
      "You need time to process emotional experiences. You cannot rush the integration. You move slowly through difficulty. This takes patience but creates deeper understanding.",
    behavior: [
      "You take time to recover",
      "You process slowly",
      "You need space after difficulty",
      "You integrate gradually",
    ],
    strengths: [
      "Deep processing creates understanding",
      "Thoughtful integration",
      "Do not force your healing",
      "Authentic recovery",
      "Build real change",
    ],
    blindSpots: [
      "Recovery feels endless",
      "Others may pressure you",
      "Difficulty in fast-paced environments",
      "Long recovery feels like weakness",
      "Others may lose patience",
    ],
    actionItems: [
      "Trust your timeline",
      "Ask for space you need",
      "Communicate your pace",
      "Build support for slow recovery",
      "Recognize your depth as strength",
    ],
  },
  {
    id: "eh-rp-3",
    name: "The Avoidant Recoverer",
    tagline: "Distracts instead of processing",
    shortDesc: "You cope by avoiding emotions through distraction or activity.",
    family: "recovery-pattern",
    fullDesc:
      "Your recovery strategy is not to process but to move away. You distract yourself, stay busy, or find ways to not think about what happened. This provides temporary relief but the unprocessed emotion remains.",
    behavior: [
      "You distract from emotional pain",
      "You stay busy to avoid feeling",
      "You move on quickly",
      "You do not address emotions",
    ],
    strengths: [
      "Can function despite difficulty",
      "Does not dwell on pain",
      "Keeps moving forward",
      "Activity-based coping",
      "Does not get stuck",
    ],
    blindSpots: [
      "Emotions do not disappear",
      "May surface later",
      "Avoidance prevents healing",
      "Distractions have limits",
      "Real recovery does not happen",
    ],
    actionItems: [
      "Gradually face emotions",
      "Balance activity with reflection",
      "Find safe ways to process",
      "Understand avoidance patterns",
      "Move from distraction to healing",
    ],
  },
  {
    id: "eh-rp-4",
    name: "The Reflective Healer",
    tagline: "Recovers through understanding",
    shortDesc:
      "You process emotions by reflecting and making meaning out of them.",
    family: "recovery-pattern",
    fullDesc:
      "You recover by understanding. You reflect on what happened, explore your emotional response, and make meaning from the experience. This contemplative approach creates integration and growth.",
    behavior: [
      "You reflect on experiences",
      "You explore your emotions",
      "You make meaning from difficulty",
      "You integrate lessons learned",
    ],
    strengths: [
      "Deep understanding from reflection",
      "Genuine integration and growth",
      "Wisdom from difficult experiences",
      "Can help others process",
      "Real transformation possible",
    ],
    blindSpots: [
      "Reflection can become rumination",
      "Overthinking instead of acting",
      "May get stuck in analysis",
      "Processing takes time",
      "Others may want faster closure",
    ],
    actionItems: [
      "Balance reflection with action",
      "Establish reflection practices",
      "Share insights with others",
      "Trust your reflective process",
      "Use wisdom from experience",
    ],
  },
];

// ==================== PUBLIC API ====================

export function getEmotionalHealthTypesByFamily(
  family: EmotionalHealthFamily,
): EmotionalHealthType[] {
  const allTypes = [
    ...emotionalAwarenessTypes,
    ...emotionalRegulationTypes,
    ...stressResponseTypes,
    ...emotionalStabilityTypes,
    ...energyBurnoutTypes,
    ...traumaSensitivityTypes,
    ...recoveryPatternTypes,
  ];
  return allTypes.filter((type) => type.family === family);
}

export function getAllEmotionalHealthTypes(): EmotionalHealthType[] {
  return [
    ...emotionalAwarenessTypes,
    ...emotionalRegulationTypes,
    ...stressResponseTypes,
    ...emotionalStabilityTypes,
    ...energyBurnoutTypes,
    ...traumaSensitivityTypes,
    ...recoveryPatternTypes,
  ];
}

export function getEmotionalHealthType(
  id: string,
): EmotionalHealthType | undefined {
  const allTypes = getAllEmotionalHealthTypes();
  return allTypes.find((type) => type.id === id);
}
