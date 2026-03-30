// Relationship Types System
// Comprehensive system for understanding relationship patterns, attachment styles, and emotional dynamics

export type RelationshipFamily =
  | "attachment"
  | "emotional-roles"
  | "communication"
  | "toxic-patterns"
  | "healthy-patterns"
  | "attraction"
  | "conflict";

export interface RelationshipType {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  behavior: string[];
  strengths: string[];
  blindSpots: string[];
  actionItems: string[];
  family: RelationshipFamily;
}

const RELATIONSHIP_TYPES: RelationshipType[] = [
  // ATTACHMENT FAMILY
  {
    id: "rel-sec",
    name: "The Secure",
    tagline: "Stable, trusting, and emotionally balanced",
    shortDesc:
      "You feel comfortable with closeness and independence. You trust people without losing yourself. Your relationships tend to be stable, grounded, and built on mutual respect.",
    fullDesc:
      "You have a naturally secure attachment style. You feel comfortable with both intimacy and independence, and you don't experience excessive anxiety about relationships. You trust easily but not naively, and you can rely on others while maintaining your own identity. Your relationships tend to be stable, grounded, and based on mutual respect and clear communication.",
    behavior: [
      "Comfortable expressing emotions and needs",
      "Trust others without excessive doubt",
      "Can handle criticism without defensive reactions",
      "Maintain healthy independence and interdependence",
      "Recover quickly from conflicts",
    ],
    strengths: [
      "Emotionally resilient and balanced",
      "Creates stable, trusting relationships",
      "Good at communicating needs clearly",
      "Can support others without losing yourself",
      "Navigate conflicts constructively",
    ],
    blindSpots: [
      "May underestimate others' emotional fragility",
      "Might not understand anxious patterns deeply",
      "Can seem detached to highly emotional partners",
      "May take too long to address serious issues",
    ],
    actionItems: [
      "Maintain your emotional balance as a model",
      "Help others develop security",
      "Continue open communication in relationships",
      "Model healthy boundaries for others",
    ],
    family: "attachment",
  },
  {
    id: "rel-anx",
    name: "The Anxious",
    tagline: "Deeply attached, but often uncertain",
    shortDesc:
      "You value connection deeply, but often worry about losing it. You may overthink, seek reassurance, and feel uneasy when things seem distant or unclear.",
    fullDesc:
      "You have an anxious attachment style. You crave closeness and feel very invested in your relationships, but this often comes with worry about being abandoned or not being valued enough. You may need frequent reassurance and can become anxious when there's distance or unclear communication. Despite this, your capacity for deep emotional connection is one of your greatest strengths.",
    behavior: [
      "Seek frequent reassurance and connection",
      "Overthink small changes in relationships",
      "May become clingy or demanding of attention",
      "Quick to sense rejection or distance",
      "Struggle with independence or alone time",
    ],
    strengths: [
      "Deep emotional capacity and empathy",
      "Highly invested in relationship success",
      "Intuitive to partner's emotional needs",
      "Willing to work on relationship issues",
      "Natural communicators of feelings",
    ],
    blindSpots: [
      "May create the distance you fear through anxiety",
      "Can overwhelm partners with needs",
      "Difficulty trusting reassurance",
      "May lose sense of self in relationships",
      "Can interpret neutrality as rejection",
    ],
    actionItems: [
      "Build self-soothing and self-reassurance skills",
      "Develop independent interests and identity",
      "Practice believing reassurance when given",
      "Work on tolerating uncertainty gradually",
      "Find secure partners who can meet your needs",
    ],
    family: "attachment",
  },
  {
    id: "rel-avo",
    name: "The Avoidant",
    tagline: "Independent, guarded, and distant",
    shortDesc:
      "You prefer emotional distance and self reliance. You may struggle with vulnerability and often pull away when relationships become too intense or demanding.",
    fullDesc:
      "You have an avoidant attachment style. You value independence highly and may feel uncomfortable with too much closeness or emotional expression. You tend to rely on yourself and can feel suffocated by demands for intimacy. This isn't about not caring—it's about how you're wired to experience connection differently, often prioritizing autonomy.",
    behavior: [
      "Pull back when relationships get too close",
      "Suppress emotional expression",
      "Maintain emotional distance as protection",
      "Struggle to express vulnerability",
      "Become defensive when questioned about feelings",
    ],
    strengths: [
      "Strong sense of independence",
      "Don't easily lose yourself in relationships",
      "Can maintain perspective during emotional times",
      "Self-reliant and resourceful",
      "Good at maintaining boundaries",
    ],
    blindSpots: [
      "Others experience you as cold or rejecting",
      "May use distance to avoid real issues",
      "Difficulty receiving support",
      "Risk of loneliness despite independence",
      "Partners may feel unloved or unimportant",
    ],
    actionItems: [
      "Practice vulnerability in small doses",
      "Learn what safety looks like in closeness",
      "Challenge beliefs about independence vs. connection",
      "Explore your fear of intimacy",
      "Develop skills for emotional expression",
    ],
    family: "attachment",
  },
  {
    id: "rel-fear",
    name: "The Fearful",
    tagline: "Wanting closeness, but fearing it",
    shortDesc:
      "You crave connection but are also afraid of getting hurt. You may move between closeness and distance, creating push and pull dynamics in relationships.",
    fullDesc:
      "You have a fearful-avoidant attachment style. You desperately want closeness and connection, but the fear of being hurt creates an internal conflict. This results in push-pull dynamics where you move between wanting to be close and needing to protect yourself. The constant uncertainty can be exhausting for both you and your partners.",
    behavior: [
      "Alternate between seeking closeness and pulling away",
      "Create push-pull dynamics in relationships",
      "Act contradictorily based on fear vs. desire",
      "Test partners' loyalty and commitment",
      "Struggle with trust and vulnerability simultaneously",
    ],
    strengths: [
      "Understand both connection and independence needs",
      "Can relate to many different attachment styles",
      "Highly aware of relationship dynamics",
      "Strong desire to connect and contribute",
      "Capacity for deep transformation",
    ],
    blindSpots: [
      "Confusing behavior destabilizes partners",
      "May create the rejection you fear",
      "Difficulty building stable relationships",
      "Others may feel whiplashed by changes",
      "Internal conflict exhausts you emotionally",
    ],
    actionItems: [
      "Work on trauma and deeper fears with support",
      "Develop consistent self-soothing practices",
      "Build tolerance for vulnerability gradually",
      "Find secure partners who can handle inconsistency",
      "Address core beliefs about safety in relationships",
    ],
    family: "attachment",
  },

  // EMOTIONAL ROLES FAMILY
  {
    id: "rel-giver",
    name: "The Giver",
    tagline: "Always giving, rarely receiving",
    shortDesc:
      "You show love through effort and sacrifice. You often prioritize others, sometimes at the cost of your own emotional needs.",
    fullDesc:
      "You express love primarily through giving, helping, and sacrificing. You feel most valued when you're needed and can be instrumental in your partner's life. This generosity is beautiful, but it can lead to resentment if you never receive, and partners may not feel they can truly support you in return.",
    behavior: [
      "Prioritize partner's needs over your own",
      "Offer help before being asked",
      "Feel responsible for partner's happiness",
      "Struggle to receive support from others",
      "May enable unhealthy patterns in partners",
    ],
    strengths: [
      "Deeply caring and nurturing",
      "Create supportive, safe environments",
      "Willing to sacrifice for relationships",
      "Attentive to partner's needs",
      "Build strong bonds through service",
    ],
    blindSpots: [
      "Resentment builds when giving is one-way",
      "May attract takers who exploit generosity",
      "Your needs become invisible",
      "Partner may feel inadequate or controlled",
      "Risk of burnout and emotional exhaustion",
    ],
    actionItems: [
      "Practice asking for and receiving help",
      "Establish healthy boundaries around giving",
      "Communicate your needs clearly",
      "Choose partners who also give",
      "Value yourself as much as you value others",
    ],
    family: "emotional-roles",
  },
  {
    id: "rel-fixer",
    name: "The Fixer",
    tagline: "Trying to heal others through love",
    shortDesc:
      "You are drawn to people who need help. You believe love can fix problems, and you often take responsibility for others' struggles.",
    fullDesc:
      "You see potential in broken people and believe that with enough love and effort, you can help them heal. You're drawn to projects, and people who need fixing feel like meaningful projects. While your intentions are pure, this pattern often leads to codependency and neglects the fact that people must heal themselves.",
    behavior: [
      "Attracted to people with significant problems",
      "Take on their emotional baggage as your own",
      "Believe you can love them into wholeness",
      "Ignore red flags in favor of potential",
      "Sacrifice your own wellbeing for their healing",
    ],
    strengths: [
      "Deep compassion and empathy",
      "Willing to work through challenges",
      "See potential in others",
      "Committed to relationship growth",
      "Often help others make positive changes",
    ],
    blindSpots: [
      "Enable unhealthy patterns rather than fixing them",
      "Neglect signs of toxicity",
      "Create codependent dynamics",
      "Your needs are forgotten",
      "They may never actually want to change",
    ],
    actionItems: [
      "Accept that you cannot fix another person",
      "Choose partners who are actively working on themselves",
      "Set boundaries on how much you give",
      "Recognize and avoid red flags",
      "Work on why you feel compelled to fix others",
    ],
    family: "emotional-roles",
  },
  {
    id: "rel-dependent",
    name: "The Dependent",
    tagline: "Needing connection to feel stable",
    shortDesc:
      "You rely heavily on others for emotional support. Being alone feels uncomfortable, and your sense of security often depends on your relationships.",
    fullDesc:
      "You struggle with independence and your emotional stability is heavily tied to your relationships. Being alone feels unsafe or empty, and you may jump from relationship to relationship to maintain that sense of security. Your wellbeing becomes entangled with your partner's presence.",
    behavior: [
      "Difficulty being alone for extended periods",
      "Depend on partner for emotional regulation",
      "Make major decisions based on partner's input",
      "Fear abandonment creates controlling behaviors",
      "May neglect friendships and other relationships",
    ],
    strengths: [
      "Deeply committed to relationships",
      "Good at partnership and collaboration",
      "Willing to adapt for relationships",
      "Value connection highly",
      "Can be supportive of partners' needs",
    ],
    blindSpots: [
      "Loss of sense of self",
      "Vulnerability to manipulation and control",
      "Relationships feel desperate rather than chosen",
      "Difficulty managing emotions alone",
      "May attract controlling partners",
    ],
    actionItems: [
      "Build a strong, independent identity",
      "Develop self-soothing and emotional regulation",
      "Cultivate friendships and other relationships",
      "Practice spending time alone comfortably",
      "Work on internal sources of worth",
    ],
    family: "emotional-roles",
  },
  {
    id: "rel-indep",
    name: "The Independent Lover",
    tagline: "Connected, but self grounded",
    shortDesc:
      "You value relationships but do not lose yourself in them. You maintain boundaries and identity while still being emotionally available.",
    fullDesc:
      "You have the rare ability to be fully present in relationships while maintaining your sense of self. You don't need relationships to feel whole, but you choose them because you want to enhance your life. This balance allows you to be both independent and genuinely intimate.",
    behavior: [
      "Maintain your own interests and identity",
      "Clear about your needs and boundaries",
      "Can be alone without discomfort",
      "Choose relationships consciously",
      "Support partner's independence as well",
    ],
    strengths: [
      "Emotionally stable and secure",
      "Create balanced, healthy partnerships",
      "Respect both your needs and partner's",
      "Can handle conflict maturely",
      "Model healthy relationships for others",
    ],
    blindSpots: [
      "Partners may perceive distance as coldness",
      "May seem too independent to vulnerable partners",
      "Can underestimate others' emotional needs",
      "Might struggle to understand dependency",
    ],
    actionItems: [
      "Continue modeling healthy independence",
      "Help partners develop their own identity",
      "Communicate your capacity for closeness",
      "Create safe space for others' vulnerability",
      "Balance autonomy with genuine intimacy",
    ],
    family: "emotional-roles",
  },

  // COMMUNICATION FAMILY
  {
    id: "rel-direct",
    name: "The Direct Communicator",
    tagline: "Clear, honest, and straightforward",
    shortDesc:
      "You express your thoughts openly and clearly. You prefer honesty over guessing and are comfortable addressing difficult conversations.",
    fullDesc:
      "You believe in clear, direct communication. You say what you mean, ask for what you need, and don't play games. You see communication as the foundation of healthy relationships and aren't afraid to have difficult conversations. Others may sometimes perceive you as blunt, but your directness builds trust.",
    behavior: [
      "Express thoughts and feelings openly",
      "Ask directly for what you need",
      "Address issues as they arise",
      "Avoid playing games or manipulation",
      "Speak truth even when uncomfortable",
    ],
    strengths: [
      "Build relationships on honesty",
      "Resolve issues quickly",
      "Clear expectations and understanding",
      "Prevent resentment buildup",
      "Partners know exactly where they stand",
    ],
    blindSpots: [
      "May come across as harsh or insensitive",
      "Others may feel attacked by directness",
      "Can lack emotional softness",
      "May not recognize when timing is poor",
      "Sensitive partners may feel hurt",
    ],
    actionItems: [
      "Pair directness with kindness",
      "Learn to read emotional capacity of others",
      "Develop empathy for indirect communicators",
      "Use softer language without losing honesty",
      "Recognize when others need gentleness",
    ],
    family: "communication",
  },
  {
    id: "rel-passive",
    name: "The Passive",
    tagline: "Quiet, reserved, and accommodating",
    shortDesc:
      "You avoid conflict and often keep your feelings to yourself. You tend to prioritize peace over expressing your true thoughts.",
    fullDesc:
      "You prefer harmony over confrontation. You keep your feelings to yourself, accommodate others' needs, and avoid difficult conversations. While your peacefulness is valuable, unexpressed needs and resentment can build silently, creating distance in relationships.",
    behavior: [
      "Keep feelings to yourself",
      "Accommodate others' needs over your own",
      "Avoid conflict at all costs",
      "Struggle to express disagreement",
      "Hide frustration behind politeness",
    ],
    strengths: [
      "Calm presence in relationships",
      "Don't escalate conflicts unnecessarily",
      "Good listeners who hear others out",
      "Considerate of others' feelings",
      "Create peaceful environments",
    ],
    blindSpots: [
      "Resentment builds silently",
      "Partners never know your true feelings",
      "Problems go unaddressed and worsen",
      "You may become withdrawn or distant",
      "Can attract controlling or dominating partners",
    ],
    actionItems: [
      "Practice expressing needs gently",
      "Start with small expressions of disagreement",
      "Learn that conflict is healthy",
      "Develop your voice gradually",
      "Find partners who can hear gentler communication",
    ],
    family: "communication",
  },
  {
    id: "rel-passive-agg",
    name: "The Passive Aggressive",
    tagline: "Indirect and emotionally hidden",
    shortDesc:
      "You struggle to express emotions directly. Instead, your feelings show through tone, behavior, or subtle reactions.",
    fullDesc:
      "You find direct expression difficult or unsafe, so your emotions leak out indirectly. You may become quiet, sarcastic, or your behavior shifts subtly to express what you won't say directly. Partners sense something is wrong but can't pinpoint it, creating confusion and mistrust.",
    behavior: [
      "Express feelings indirectly through behavior",
      "Use sarcasm or subtle jabs",
      "Give silent treatment for unhappiness",
      "Withdraw affection when upset",
      "Make subtle digs or comments",
    ],
    strengths: [
      "Avoid direct conflict",
      "Protect yourself from confrontation",
      "Express feelings (albeit indirectly)",
      "Often creative in communication",
    ],
    blindSpots: [
      "Partners feel confused and frustrated",
      "Creates distrust and defensiveness",
      "Issues never actually resolve",
      "Others feel attacked indirectly",
      "Real problems remain hidden",
    ],
    actionItems: [
      "Identify what you're feeling but hiding",
      "Practice direct, gentle expression",
      "Build safety to be vulnerable",
      "Address your fear of direct conflict",
      "Learn that honesty strengthens relationships",
    ],
    family: "communication",
  },
  {
    id: "rel-reactor",
    name: "The Emotional Reactor",
    tagline: "Feeling deeply, reacting quickly",
    shortDesc:
      "You feel things intensely and your reactions are immediate. Your emotions drive conversations, which can make them intense and unpredictable.",
    fullDesc:
      "You experience emotions deeply and react quickly to them. Your conversations can become intense, emotional, and hard to follow for those who process differently. While your passion is genuine, reactive communication can escalate conflicts rather than resolve them.",
    behavior: [
      "React immediately based on emotions",
      "Conversations become intense quickly",
      "May say things you regret when emotional",
      "Difficulty staying calm during conflicts",
      "Jump to conclusions based on feelings",
    ],
    strengths: [
      "Deep emotional authenticity",
      "Passionate and engaged in relationships",
      "Express emotions openly",
      "Highly attuned to emotional nuances",
      "Don't hide what you're really feeling",
    ],
    blindSpots: [
      "Intensity overwhelms partners",
      "React before thinking",
      "Create unnecessary conflict escalation",
      "Others become defensive",
      "Hard to find resolution when emotions run high",
    ],
    actionItems: [
      "Develop pause between feeling and reaction",
      "Practice naming emotions without acting on them",
      "Learn grounding techniques",
      "Create space before responding",
      "Channel intensity into productive dialogue",
    ],
    family: "communication",
  },
  {
    id: "rel-avoider",
    name: "The Avoider",
    tagline: "Escaping difficult conversations",
    shortDesc:
      "You tend to withdraw when things get uncomfortable. You prefer silence or distance over confrontation.",
    fullDesc:
      "When relationships become difficult, your instinct is to withdraw or escape. You avoid conversations about problems, hoping they'll resolve on their own or disappear. This avoidance prevents real connection and allows issues to fester.",
    behavior: [
      "Withdraw when conversations get difficult",
      "Leave or change the subject",
      "Hope problems go away on their own",
      "Refuse to discuss relationship issues",
      "Use busyness as escape",
    ],
    strengths: [
      "Keep immediate peace",
      "Don't engage in blame or accusations",
      "Don't say things in anger",
      "Give space for cooling down",
    ],
    blindSpots: [
      "Nothing ever actually resolves",
      "Problems accumulate and worsen",
      "Partner feels forever stuck",
      "Creates distance and loneliness",
      "Unmet needs poison the relationship",
    ],
    actionItems: [
      "Identify what you're avoiding",
      "Practice small difficult conversations",
      "Build confidence in handling conflict",
      "Learn that avoidance creates worse problems",
      "Find partners who can help create safety",
    ],
    family: "communication",
  },

  // TOXIC PATTERNS FAMILY
  {
    id: "rel-ctrl",
    name: "The Controller",
    tagline: "Seeking control to feel secure",
    shortDesc:
      "You try to manage situations or people to reduce uncertainty. Control gives you a sense of safety, even if it creates tension.",
    fullDesc:
      "You need to control your environment and often the people in it to feel safe. You manage conversations, decisions, and your partner's behavior to reduce uncertainty. While you may feel this is necessary for safety, your partner experiences it as oppressive and suffocating.",
    behavior: [
      "Manage partner's decisions and behavior",
      "Need to know everything",
      "Make unilateral decisions",
      "Isolate partner from others",
      "Use logic or criticism to dominate",
    ],
    strengths: [
      "Take initiative and responsibility",
      "Create structure and order",
      "Planned and organized in life",
      "Make quick decisions",
    ],
    blindSpots: [
      "Partner feels trapped and suffocated",
      "Creates resentment and distance",
      "Control never actually guarantees safety",
      "Drives partner away",
      "Relationships become transactional",
    ],
    actionItems: [
      "Identify the core fear behind control",
      "Learn to tolerate uncertainty",
      "Practice trusting your partner",
      "Develop security without controlling",
      "Work with a professional on roots of control",
    ],
    family: "toxic-patterns",
  },
  {
    id: "rel-ghoster",
    name: "The Ghoster",
    tagline: "Disappearing when it gets hard",
    shortDesc:
      "You disappear or withdraw completely when relationships get difficult. You avoid confrontation by removing yourself entirely.",
    fullDesc:
      "When relationships become challenging or demanding, your response is to ghost or completely withdraw. You may end relationships without explanation or simply disappear emotionally. This leaves partners confused and hurt, unable to understand what happened.",
    behavior: [
      "Disappear without explanation",
      "Stop responding to communication",
      "End relationships abruptly",
      "Become emotionally unavailable",
      "Avoid all confrontation",
    ],
    strengths: [
      "Protect yourself from pain",
      "Don't engage in harmful conflict",
      "Make clean breaks",
    ],
    blindSpots: [
      "Leave partners confused and traumatized",
      "Destroy trust for others involved",
      "Never resolve your own patterns",
      "Become known for unreliability",
      "Cannot build real intimacy",
    ],
    actionItems: [
      "Develop courage to face difficult conversations",
      "Learn people deserve explanations",
      "Practice staying in discomfort",
      "Address fear of rejection",
      "Build capacity for conflict",
    ],
    family: "toxic-patterns",
  },
  {
    id: "rel-overthink",
    name: "The Overthinker",
    tagline: "Trapped in constant analysis",
    shortDesc:
      "You analyze everything deeply. Small actions or words can become big concerns in your mind.",
    fullDesc:
      "Your mind never stops analyzing your relationships. Small comments, slight changes in tone, or minor inconsistencies mushroom into major concerns in your mind. You create narratives and scenarios that may have no basis in reality, but feel completely real to you.",
    behavior: [
      "Obsess over small words or actions",
      "Create worst-case scenarios",
      "Analyze conversations repeatedly",
      "Interpret neutral actions negatively",
      "Seek constant reassurance",
    ],
    strengths: [
      "Notice subtle relationship dynamics",
      "Think deeply about compatibility",
      "Aware of underlying issues",
      "Consider multiple perspectives",
    ],
    blindSpots: [
      "Create problems that don't exist",
      "Drain yourself and your partner",
      "Miss actual problems amid noise",
      "Drive partner away with constant analysis",
      "Create self-fulfilling prophecies",
    ],
    actionItems: [
      "Learn to quiet your mind",
      "Test your interpretations against reality",
      "Practice acceptance and trust",
      "Use grounding techniques",
      "Set limits on analysis time",
    ],
    family: "toxic-patterns",
  },
  {
    id: "rel-saboteur",
    name: "The Self Saboteur",
    tagline: "Destroying what could work",
    shortDesc:
      "You unconsciously create problems in relationships. When things feel too stable, you may pull away or create distance.",
    fullDesc:
      "Just when a relationship seems to be going well, you unconsciously sabotage it. You pick fights, withdraw affection, or create drama. Stability feels unsafe, so you manufacture problems. This pattern prevents you from ever having the secure relationship you actually want.",
    behavior: [
      "Create problems when things are good",
      "Pick fights without real cause",
      "Withdraw when partner gets close",
      "Sabotage good situations",
      "Test partner's commitment destructively",
    ],
    strengths: [
      "Protect yourself from potential hurt",
      "Aware enough to recognize the pattern",
      "Can change if willing",
    ],
    blindSpots: [
      "Never experience the stability you want",
      "Damage good relationships",
      "Partner becomes confused and hurt",
      "Create the ending you feared",
      "Can't explain why you sabotage",
    ],
    actionItems: [
      "Identify when you start sabotaging",
      "Understand what safety would feel like",
      "Work through trauma from past relationships",
      "Learn to tolerate goodness and stability",
      "Practice staying when things are good",
    ],
    family: "toxic-patterns",
  },
  {
    id: "rel-jealous",
    name: "The Jealous Guard",
    tagline: "Always watching for threats",
    shortDesc:
      "You are highly alert in relationships. You fear betrayal and often question loyalty or intentions.",
    fullDesc:
      "You are constantly on guard for threats to your relationship. You fear betrayal deeply and monitor your partner, checking their phone, questioning their activities, or trying to control their social connections. This hypervigilance comes from fear, but it erodes trust and intimacy.",
    behavior: [
      "Monitor partner's activities closely",
      "Question every interaction with others",
      "Feel threatened by partner's friendships",
      "Check phone or social media",
      "Create rules around behavior",
    ],
    strengths: [
      "Deeply care about the relationship",
      "Aware of relationship threats",
      "Want to protect what matters",
      "Take relationships seriously",
    ],
    blindSpots: [
      "Monitoring destroys trust",
      "Partner feels controlled and mistrusted",
      "Self-fulfilling prophecy of infidelity",
      "Drive partner away through jealousy",
      "Never feel truly secure",
    ],
    actionItems: [
      "Identify core fear of betrayal",
      "Work on your own insecurity",
      "Practice trusting your partner",
      "Understand monitoring is abuse",
      "Address past relationship trauma",
    ],
    family: "toxic-patterns",
  },

  // HEALTHY PATTERNS FAMILY
  {
    id: "rel-support",
    name: "The Supporter",
    tagline: "Present, stable, and encouraging",
    shortDesc:
      "You provide emotional support without controlling. You create a safe and stable environment for others.",
    fullDesc:
      "You show up for people consistently and offer support without expecting anything in return. You create an environment where others feel safe to be themselves. You encourage growth without pushing, and you hold space for their emotions while maintaining your own boundaries.",
    behavior: [
      "Show up consistently for partners",
      "Offer support without strings",
      "Create emotionally safe spaces",
      "Encourage partner's growth",
      "Celebrate partner's successes",
    ],
    strengths: [
      "Build deep, stable relationships",
      "Help others feel valued and safe",
      "Create trusting partnerships",
      "Support without enabling",
      "Model healthy relationships",
    ],
    blindSpots: [
      "Partner may take support for granted",
      "Might not ask for reciprocal support",
      "Can become slightly caretaking",
      "May attract those who need support",
    ],
    actionItems: [
      "Continue your healthy patterns",
      "Model these behaviors for others",
      "Ensure reciprocal support in relationships",
      "Help partners develop independence",
      "Share your own vulnerabilities too",
    ],
    family: "healthy-patterns",
  },
  {
    id: "rel-comm",
    name: "The Communicator",
    tagline: "Open, honest, and understanding",
    shortDesc:
      "You believe in clarity and mutual understanding. You are willing to listen, express, and resolve issues constructively.",
    fullDesc:
      "You are skilled at expressing yourself clearly while also listening deeply to others. You can discuss difficult topics without becoming defensive or attacking. You see communication as the foundation of healthy relationships and invest in understanding your partner's perspective.",
    behavior: [
      "Express yourself clearly and kindly",
      "Listen without defensive reactions",
      "Ask clarifying questions",
      "Seek mutual understanding",
      "Resolve conflicts constructively",
    ],
    strengths: [
      "Prevent miscommunication",
      "Build understanding and intimacy",
      "Resolve issues before they escalate",
      "Create safe dialog",
      "Model healthy communication",
    ],
    blindSpots: [
      "May expect all partners to communicate equally",
      "Can't understand why others avoid discussion",
      "Might be frustrated with less skilled communicators",
    ],
    actionItems: [
      "Teach communication skills to your partner",
      "Be patient with less skilled communicators",
      "Maintain your healthy patterns",
      "Continue growing in understanding",
      "Help others develop communication skills",
    ],
    family: "healthy-patterns",
  },
  {
    id: "rel-balanced",
    name: "The Balanced Partner",
    tagline: "Giving and receiving equally",
    shortDesc:
      "You understand balance in relationships. You know when to give and when to step back.",
    fullDesc:
      "You've mastered the art of balance. You know how to give without losing yourself, receive without becoming dependent, support without controlling, and maintain independence while being intimate. You understand that healthy relationships are not about sacrifice but about mutual growth.",
    behavior: [
      "Give and receive equally",
      "Maintain your own identity",
      "Support without losing yourself",
      "Allow partner independence",
      "Navigate conflicts maturely",
    ],
    strengths: [
      "Create truly balanced partnerships",
      "Model healthy relationships",
      "Navigate all relationship needs",
      "Support without enabling",
      "Build genuine intimacy",
    ],
    blindSpots: [
      "Balance may feel cold to highly emotional partners",
      "Others may see you as detached",
      "May seem too logical occasionally",
    ],
    actionItems: [
      "Teach balance to your partner",
      "Model these patterns consistently",
      "Help others find their own balance",
      "Continue developing self-awareness",
      "Share these principles with others",
    ],
    family: "healthy-patterns",
  },
  {
    id: "rel-grounded",
    name: "The Grounded",
    tagline: "Calm in storms, steady through change",
    shortDesc:
      "You remain calm during conflict. You do not easily become shaken by temporary emotions.",
    fullDesc:
      "You have an inner stability that allows you to remain calm, present, and rational even when relationships become turbulent. You can hold space for partner's emotions without being swept away by them. This grounding creates safety and helps de-escalate conflicts naturally.",
    behavior: [
      "Stay calm during emotional moments",
      "Think clearly under stress",
      "Support partner without losing yourself",
      "Respond rather than react",
      "Maintain perspective during conflicts",
    ],
    strengths: [
      "Create stability in relationships",
      "De-escalate conflicts naturally",
      "Help partners feel safe",
      "Model emotional regulation",
      "Navigate crises with clarity",
    ],
    blindSpots: [
      "May seem emotionally distant",
      "Others may feel they can't shake you",
      "Can appear unmoved by their distress",
    ],
    actionItems: [
      "Share your own emotions more openly",
      "Help others develop grounding skills",
      "Teach emotional regulation",
      "Model these behaviors",
      "Continue deepening your own practice",
    ],
    family: "healthy-patterns",
  },

  // ATTRACTION FAMILY
  {
    id: "rel-toxic-mag",
    name: "The Toxic Magnet",
    tagline: "Attracted to chaos and intensity",
    shortDesc:
      "You often find yourself in unhealthy relationships. Even when patterns repeat, you feel drawn to similar dynamics.",
    fullDesc:
      "You have a pattern of attracting or being attracted to unhealthy relationships. The intensity feels like passion, the drama feels like engagement, and the dysfunction feels familiar. Each time promises to be different, but similar dynamics repeat. This pattern suggests deeper work is needed to understand what you're seeking.",
    behavior: [
      "Attracted to dramatic or chaotic partners",
      "Ignore red flags and warning signs",
      "Feel excitement in turbulent relationships",
      "Repeat similar unhealthy patterns",
      "Stay in relationships despite abuse",
    ],
    strengths: [
      "Willingness to stay and work through issues",
      "Capacity for forgiveness",
      "Ability to see potential in others",
      "Resilient despite repeated hurt",
    ],
    blindSpots: [
      "Cannot recognize healthy as exciting",
      "Repeat pattern with different people",
      "Normalize dysfunction",
      "Miss genuine warning signs",
      "Sabotage your own happiness",
    ],
    actionItems: [
      "Understand what need dysfunction meets",
      "Work with therapist on attraction patterns",
      "Learn to recognize red flags",
      "Build tolerance for healthy stability",
      "Heal past trauma driving the pattern",
    ],
    family: "attraction",
  },
  {
    id: "rel-seeker",
    name: "The Care Seeker",
    tagline: "Attracted to caretakers",
    shortDesc:
      "You attract or are drawn to people who want to care for or control you.",
    fullDesc:
      "You often find yourself in relationships where your partner wants to take care of you, fix you, or manage your life. Part of you appreciates the care, but it also comes with control. You attract caretakers because something in your presentation or behavior signals that you need managing.",
    behavior: [
      "Attract caretakers and controllers",
      "Appreciate care but feel controlled",
      "Present as needing help",
      "Don't fully claim your power",
      "Accept control as part of care",
    ],
    strengths: [
      "Allow others to contribute",
      "Don't take on everything alone",
      "Receive support from partners",
      "Understand interdependence",
    ],
    blindSpots: [
      "Care comes with control",
      "Lose sense of your own power",
      "Attract unhealthy dynamics",
      "Enable controlling partners",
      "Never develop full independence",
    ],
    actionItems: [
      "Claim your own power and competence",
      "Learn to self-care",
      "Stop attracting controllers",
      "Develop independence gradually",
      "Choose partners who respect your power",
    ],
    family: "attraction",
  },
  {
    id: "rel-challenger",
    name: "The Challenger",
    tagline: "Attracted to strong personalities",
    shortDesc:
      "You are drawn to intensity and challenge. Your relationships often feel dynamic and emotionally charged.",
    fullDesc:
      "You find stability or calm boring. You're attracted to strong personalities, intensity, and the push-pull of challenging relationships. The tension feels alive, but it also often means instability and unresolved conflict. You confuse intensity with genuine connection.",
    behavior: [
      "Seek out intense, strong partners",
      "Feel bored with stable relationships",
      "Love the challenge and push-pull",
      "Exciting conflict over calm resolution",
      "Attracted to dominant personalities",
    ],
    strengths: [
      "Enjoy passionate engagement",
      "Not afraid of strong personalities",
      "Can handle intensity",
      "Attracted to complex partners",
      "Relationships feel alive and dynamic",
    ],
    blindSpots: [
      "Confuse intensity with intimacy",
      "Never experience peace or safety",
      "Attract narcissists and controllers",
      "Relationships remain unstable",
      "Overlook genuine connection",
    ],
    actionItems: [
      "Learn that intensity ≠ love",
      "Develop appreciation for stability",
      "Work on what bores you about peace",
      "Find healthy challenge and growth",
      "Choose partners with depth, not drama",
    ],
    family: "attraction",
  },
  {
    id: "rel-safe",
    name: "The Safe Connector",
    tagline: "Drawn to stability and calm",
    shortDesc:
      "You prefer relationships that feel peaceful and secure. You avoid unnecessary drama.",
    fullDesc:
      "You are attracted to calm, stable, and secure relationships. You appreciate partners who are emotionally balanced and don't bring unnecessary drama. You choose connection over intensity, and safety over excitement. This creates the foundation for real intimacy.",
    behavior: [
      "Choose stable, grounded partners",
      "Avoid drama and intensity",
      "Prefer peaceful communication",
      "Value security and trust",
      "Build relationships gradually",
    ],
    strengths: [
      "Build genuinely stable relationships",
      "Avoid toxic dynamics",
      "Create safe environments",
      "Allow deep trust to develop",
      "Choose healthy partners",
    ],
    blindSpots: [
      "May find healthy relationships boring",
      "Could overlook missing passion",
      "Might be too cautious",
      "Can lack excitement",
    ],
    actionItems: [
      "Continue choosing stable partners",
      "Learn that stability allows passion",
      "Balance safety with growth",
      "Appreciate calm for what it enables",
      "Model these choices for others",
    ],
    family: "attraction",
  },

  // CONFLICT FAMILY
  {
    id: "rel-fighter",
    name: "The Fighter",
    tagline: "Facing problems head on",
    shortDesc:
      "You address conflict directly. You believe problems should be solved, not avoided.",
    fullDesc:
      "You confront issues immediately and directly. You see conflict as something to be resolved through discussion and action, not avoided or ignored. Your willingness to face problems means issues get resolved, though your directness can sometimes feel aggressive to conflict-avoidant partners.",
    behavior: [
      "Address conflict immediately",
      "Face problems directly",
      "Want to solve things now",
      "Don't let issues fester",
      "Can be intense in confrontation",
    ],
    strengths: [
      "Problems actually get resolved",
      "Create openness in relationships",
      "Don't let resentment build",
      "Willing to face hard truths",
      "Prevent small issues from becoming big",
    ],
    blindSpots: [
      "Can overwhelm conflict-avoidant partners",
      "Intensity may escalate rather than resolve",
      "May not give space for processing",
      "Partner feels attacked",
    ],
    actionItems: [
      "Pair directness with timing and kindness",
      "Learn to read partner's capacity",
      "Create safety before challenging",
      "Let others process at their pace",
      "Balance speed with compassion",
    ],
    family: "conflict",
  },
  {
    id: "rel-peace",
    name: "The Peacemaker",
    tagline: "Keeping harmony at all costs",
    shortDesc:
      "You try to maintain peace, even if it means suppressing your own needs.",
    fullDesc:
      "You will do almost anything to keep peace. You minimize conflict, smooth over disagreements, and suppress your own needs to maintain harmony. While peacefulness is valuable, unexpressed issues create hidden resentment and distance that peace actually prevents.",
    behavior: [
      "Avoid conflict at all costs",
      "Give in to keep peace",
      "Smooth over disagreements",
      "Suppress your own needs",
      "Minimize problems",
    ],
    strengths: [
      "Keep immediate harmony",
      "Don't escalate tensions",
      "Others feel safe around you",
      "Create calm environments",
      "Good at mediation",
    ],
    blindSpots: [
      "Real issues never resolve",
      "Resentment builds secretly",
      "Partner doesn't know your needs",
      "Can become passive aggressive",
      "Harmony is actually false",
    ],
    actionItems: [
      "Learn that healthy conflict is good",
      "Express needs in soft ways",
      "Build confidence in your voice",
      "Understand that peace requires honesty",
      "Practice small confrontations",
    ],
    family: "conflict",
  },
  {
    id: "rel-analyzer",
    name: "The Analyzer",
    tagline: "Solving conflict through logic",
    shortDesc:
      "You approach conflict rationally. You focus on understanding rather than reacting emotionally.",
    fullDesc:
      "When conflict arises, you step back and think. You analyze the situation logically, look for solutions, and try to understand root causes. This rationality helps prevent escalation, though it can feel cold to partners who need emotional validation first.",
    behavior: [
      "Think before responding emotionally",
      "Analyze situations logically",
      "Look for root causes",
      "Propose solutions calmly",
      "Separate emotion from issue",
    ],
    strengths: [
      "Prevent emotional escalation",
      "Find rational solutions",
      "Keep perspective during conflict",
      "Address real issues",
      "Calm analysis helps resolution",
    ],
    blindSpots: [
      "Partner feels emotions are invalid",
      "Too much logic can feel cold",
      "May miss emotional needs",
      "Partner needs validation first",
      "Can seem uncaring about their feelings",
    ],
    actionItems: [
      "Validate emotions first, then analyze",
      "Learn that feelings are data too",
      "Balance logic with empathy",
      "Acknowledge before you solve",
      "Help partner feel heard emotionally",
    ],
    family: "conflict",
  },
  {
    id: "rel-withdraw",
    name: "The Withdrawer",
    tagline: "Stepping back when things heat up",
    shortDesc:
      "You tend to withdraw or shut down when conflict arises. You need space and time away.",
    fullDesc:
      "Your instinct during conflict is to withdraw and create distance. You need time alone to process, and you struggle with intense conversation. While your need for space is valid, withdrawal can leave your partner feeling abandoned and unresolved.",
    behavior: [
      "Withdraw when conflict starts",
      "Need significant time to process",
      "Shut down during confrontation",
      "Leave or escape conversations",
      "Process internally, don't share",
    ],
    strengths: [
      "Don't say things in anger",
      "Give space for cooling off",
      "Don't escalate through reaction",
      "Process thoroughly",
    ],
    blindSpots: [
      "Partner feels abandoned",
      "Issues never actually resolve",
      "Creates more anxiety in partner",
      "Withdraw perpetuates distance",
      "Partner feels ignored",
    ],
    actionItems: [
      "Learn to stay present even when uncomfortable",
      "Communicate your need for space",
      "Create time limits on breaks",
      "Return to conversation",
      "Build tolerance for discomfort",
    ],
    family: "conflict",
  },
];

export function getRelationshipTypesByFamily(
  family: RelationshipFamily,
): RelationshipType[] {
  return RELATIONSHIP_TYPES.filter((type) => type.family === family);
}

export function getAllRelationshipTypes(): RelationshipType[] {
  return RELATIONSHIP_TYPES;
}

export function getRelationshipType(id: string): RelationshipType | undefined {
  return RELATIONSHIP_TYPES.find((type) => type.id === id);
}
