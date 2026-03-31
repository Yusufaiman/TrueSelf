// ==================== REALITY CHECK TYPES ====================
// Understanding how others see you and where self-perception may differ from reality

export type RealityCheckFamily =
  | "self-awareness"
  | "perception-gap"
  | "social-impact"
  | "authenticity"
  | "communication"
  | "behavioral-consistency"
  | "blind-spots"
  | "external-influence";

export interface RealityCheckType {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  family: RealityCheckFamily;
  identityStatement: string;
  fullDesc: string;
  behavioralPattern: string[];
  strength: string[];
  risk: string[];
  improvementDirection: string[];
}

// ==================== SELF AWARENESS FAMILY ====================
const selfAwarenessTypes: RealityCheckType[] = [
  {
    id: "rc-sa-1",
    name: "The Highly Self Aware",
    tagline: "Sees self clearly and accurately",
    shortDesc:
      "You understand your strengths, weaknesses, and patterns with clarity. Your internal view matches reality closely.",
    family: "self-awareness",
    identityStatement:
      "You see yourself with accuracy and accept both strengths and limitations",
    fullDesc:
      "You have developed strong self-knowledge. You understand your patterns, triggers, and blind spots. Most importantly, what you believe about yourself aligns with how you actually behave and how others perceive you. This clarity gives you advantage in growth and relationships.",
    behavioralPattern: [
      "You reflect on your actions and adjust accordingly",
      "You can name your strengths without exaggeration",
      "You acknowledge your limitations openly",
      "You accept feedback without defensiveness",
      "You learn from mistakes and adjust behavior",
    ],
    strength: [
      "Accurate self-assessment enables real growth",
      "People trust your self-awareness",
      "You make better decisions from clarity",
      "Relationships are more authentic",
      "Less energy wasted on denial or justification",
    ],
    risk: [
      "May be overly critical at times",
      "Can seem self-focused if not balanced with humility",
      "Awareness without action can create frustration",
    ],
    improvementDirection: [
      "Continue reflecting but also celebrate progress",
      "Use awareness to help others develop self-knowledge",
      "Balance introspection with action",
    ],
  },
  {
    id: "rc-sa-2",
    name: "The Partially Aware",
    tagline: "Understands some parts, misses others",
    shortDesc:
      "You are aware of certain traits but still overlook key behaviors that others notice.",
    family: "self-awareness",
    identityStatement:
      "You see some of yourself clearly, but significant blindspots remain",
    fullDesc:
      "You have developed some self-awareness but it is incomplete. You may understand your strengths well while missing your weaknesses, or vice versa. There are gaps between how you see yourself and how others experience you, though not as extreme as others.",
    behavioralPattern: [
      "You selectively reflect on certain areas",
      "You notice some patterns but miss others",
      "You accept some feedback but reject other criticism",
      "You have awareness about certain contexts but not others",
      "You improve in some areas while other patterns persist",
    ],
    strength: [
      "You are open to some level of reflection",
      "You can improve in areas where aware",
      "Some self-knowledge is better than none",
      "You are willing to learn in specific domains",
    ],
    risk: [
      "Partial awareness can be misleading",
      "You may think you see more than you do",
      "Blind spots create repeated mistakes",
      "Others may misunderstand your level of awareness",
    ],
    improvementDirection: [
      "Ask trusted people what you might be missing",
      "Create structured reflection practice",
      "Seek feedback specifically on blind spots",
      "Map where your awareness is strong and weak",
    ],
  },
  {
    id: "rc-sa-3",
    name: "The Misaligned",
    tagline: "Has a distorted self perception",
    shortDesc:
      "You believe you are one way, but your actions often show something different.",
    family: "self-awareness",
    identityStatement:
      "You believe you are one way, but your behavior shows something different",
    fullDesc:
      "You have a self-image that does not fully match how you actually behave. There is a gap between how you see yourself and how others experience you. This often happens when reflection is limited or when you rely too much on intention rather than action.",
    behavioralPattern: [
      "You describe yourself positively but actions do not consistently support it",
      "You may justify your behavior instead of evaluating it",
      "Your self-perception is based on intentions, not results",
      "You are surprised when others describe you differently",
      "You see inconsistency but do not connect it to yourself",
    ],
    strength: [
      "You have a defined internal identity and belief system",
      "You possess self-image (even if distorted)",
      "Potential to align through increased awareness",
    ],
    risk: [
      "You lose credibility because of inconsistency",
      "Others see you as inauthentic or dishonest",
      "Relationships suffer from misalignment",
      "Growth is limited because you do not see what needs change",
    ],
    improvementDirection: [
      "Focus on observing your actions instead of relying only on your intentions",
      "Ask for honest feedback and compare it with your self-perception",
      "Keep a behavior journal to see patterns",
      "Commit to aligning actions with your stated identity",
    ],
  },
  {
    id: "rc-sa-4",
    name: "The Unaware",
    tagline: "Lacks insight into own behavior",
    shortDesc:
      "You rarely reflect on yourself and struggle to see how you actually come across.",
    family: "self-awareness",
    identityStatement:
      "You operate without clear insight into how you actually come across to others",
    fullDesc:
      "You lack developed self-awareness. You rarely reflect on your behavior and its impact. You may not understand why people react to you the way they do. Others may understand you better than you understand yourself.",
    behavioralPattern: [
      "You act without much reflection on impact",
      "You are surprised by others reactions to you",
      "You do not see the connection between behavior and outcomes",
      "You rarely think about how you come across",
      "You struggle to describe your own patterns",
    ],
    strength: [
      "You are not burdened by self-doubt",
      "You move forward without overthinking",
      "You have significant room for growth",
      "You can improve dramatically with awareness",
    ],
    risk: [
      "You make repeated mistakes without learning",
      "People may avoid you because you do not see your impact",
      "Relationships suffer from lack of understanding",
      "You may hurt people without realizing it",
    ],
    improvementDirection: [
      "Start simple reflection: ask yourself why things happen",
      "Actively ask people for feedback on your impact",
      "Notice patterns in how people respond to you",
      "Read about personality and behavior patterns",
      "Find a coach or therapist to build awareness",
    ],
  },
];

// ==================== PERCEPTION GAP FAMILY ====================
const perceptionGapTypes: RealityCheckType[] = [
  {
    id: "rc-pg-1",
    name: "The Aligned",
    tagline: "Inner identity matches external perception",
    shortDesc: "People generally see you the way you see yourself.",
    family: "perception-gap",
    identityStatement:
      "The way you see yourself matches how others experience you",
    fullDesc:
      "You have achieved alignment between internal identity and external perception. What you believe about yourself is consistent with how others perceive you. This creates authenticity, credibility, and trust.",
    behavioralPattern: [
      "Your behavior reflects your values consistently",
      "People respond to you based on your actual character",
      "You do not need to manage perceptions heavily",
      "Relationships develop based on real understanding",
      "Others are rarely surprised by your actions",
    ],
    strength: [
      "Strong credibility and trustworthiness",
      "Less energy spent managing perception",
      "Relationships have solid foundation",
      "People know what to expect from you",
      "Authenticity creates connection",
    ],
    risk: [
      "Any negative trait is visible to others",
      "You cannot hide behind false perception",
      "Criticism is always directed at real behavior",
    ],
    improvementDirection: [
      "Maintain alignment by continuing self-awareness",
      "Use your alignment to help others find theirs",
      "Remember alignment is ongoing practice",
    ],
  },
  {
    id: "rc-pg-2",
    name: "The Overestimated",
    tagline: "Sees self higher than reality",
    shortDesc:
      "You believe you perform or behave better than how others actually experience you.",
    family: "perception-gap",
    identityStatement:
      "You see yourself performing better than how others actually experience you",
    fullDesc:
      "You tend to rate your abilities, behavior, or character higher than reality. This creates a perception gap where others may not see the same level of competence, awareness, or skill. You may be confident in areas where your execution is actually weaker.",
    behavioralPattern: [
      "You rate your clarity, skill, or discipline higher than results show",
      "You overstate your level of control or awareness",
      "You may exaggerate your positive qualities",
      "You do not see gaps between intention and execution",
      "You are surprised when others do not see your competence",
    ],
    strength: [
      "Confidence and belief in your ability",
      "You take action despite uncertainty",
      "You maintain positive self-regard",
      "You are not paralyzed by self-doubt",
    ],
    risk: [
      "Blind spots that slow growth",
      "You do not see what needs improvement",
      "Others may see you as overconfident or arrogant",
      "You miss feedback that could help you",
      "You may take on tasks beyond actual capability",
    ],
    improvementDirection: [
      "Start validating your self-perception with actual results",
      "Ask for specific feedback on areas where you rate yourself high",
      "Compare your self-assessment with concrete outcomes",
      "Create measurable ways to track real competence",
      "Welcome criticism as data, not attack",
    ],
  },
  {
    id: "rc-pg-3",
    name: "The Underestimated",
    tagline: "Sees self lower than reality",
    shortDesc:
      "You undervalue yourself. Others often see more potential in you than you see in yourself.",
    family: "perception-gap",
    identityStatement:
      "Others see more capability and potential in you than you see in yourself",
    fullDesc:
      "You undervalue yourself. You may have abilities, skills, or positive qualities that you do not fully recognize or credit. Others often see more potential or competence in you than you see in yourself. This gap between reality and your perception holds you back.",
    behavioralPattern: [
      "You downplay your accomplishments",
      "You do not fully credit your abilities",
      "You assume others are more capable",
      "You hesitate to take on challenges you could handle",
      "You do not pursue opportunities you are ready for",
    ],
    strength: [
      "You are humble and not arrogant",
      "You stay grounded and realistic",
      "You have room to grow into your potential",
      "You do not overreach beyond capability",
      "Others often appreciate your modesty",
    ],
    risk: [
      "You miss opportunities due to self-doubt",
      "You do not develop your potential fully",
      "You may feel stuck despite capability",
      "Others may have to convince you of your worth",
      "You hold yourself back unnecessarily",
    ],
    improvementDirection: [
      "Ask trusted people what they see in your abilities",
      "Document your accomplishments and results",
      "Challenge self-critical thoughts with evidence",
      "Take on challenges slightly beyond comfort zone",
      "Gradually build confidence through success",
    ],
  },
  {
    id: "rc-pg-4",
    name: "The Misread",
    tagline: "Frequently misunderstood by others",
    shortDesc:
      "Your intentions and your impact do not match. People interpret you differently than you expect.",
    family: "perception-gap",
    identityStatement:
      "Your intentions and how people interpret you rarely align",
    fullDesc:
      "You are frequently misunderstood by others. What you intend is not how people receive it. Your messages, actions, or presence create different interpretations than you expect. This creates confusion, conflict, or disconnection.",
    behavioralPattern: [
      "People often misinterpret your intentions",
      "What you mean gets received differently",
      "You have to frequently explain yourself",
      "Others make assumptions about you that are wrong",
      "Your tone or expression does not match your intent",
    ],
    strength: [
      "You learn to explain yourself more clearly",
      "You develop compassion for misunderstanding",
      "You become aware of communication gaps",
      "You work harder to be understood",
    ],
    risk: [
      "Repeated misunderstanding creates frustration",
      "People may avoid you due to confusion",
      "Relationships suffer from miscommunication",
      "You may be seen differently than you are",
      "Your message does not land as intended",
    ],
    improvementDirection: [
      "Ask people what they understood from you",
      "Notice patterns in how you are misread",
      "Adjust your communication style",
      "Check for understanding rather than assuming",
      "Notice gaps between intent and impact",
    ],
  },
];

// ==================== SOCIAL IMPACT FAMILY ====================
const socialImpactTypes: RealityCheckType[] = [
  {
    id: "rc-si-1",
    name: "The Positive Presence",
    tagline: "Leaves a strong, positive impression",
    shortDesc: "People feel comfortable, respected, or inspired around you.",
    family: "social-impact",
    identityStatement:
      "You naturally create positive energy and comfortable space for others",
    fullDesc:
      "You leave a strong positive impression on people. When you enter a room, people feel welcomed, respected, or inspired. Your presence alone makes interactions better. Others seek you out, feel comfortable around you, and often feel better after being with you.",
    behavioralPattern: [
      "You naturally put people at ease",
      "People open up to you",
      "You create safe space for others",
      "Your energy is infectious",
      "People want to be around you",
    ],
    strength: [
      "You create strong connections easily",
      "People trust you naturally",
      "You inspire and motivate others",
      "Your relationships deepen quickly",
      "You are sought out for your presence",
    ],
    risk: [
      "People may depend on you too much",
      "Your boundaries may get blurred",
      "People may see you as savior figure",
    ],
    improvementDirection: [
      "Maintain your positive impact",
      "Set healthy boundaries while staying warm",
      "Use your presence to empower others",
      "Model healthy relationships",
    ],
  },
  {
    id: "rc-si-2",
    name: "The Neutral Presence",
    tagline: "Does not strongly affect others",
    shortDesc: "You blend in socially and rarely leave a lasting impression.",
    family: "social-impact",
    identityStatement:
      "You blend into social environments without creating strong impressions",
    fullDesc:
      "You are socially acceptable but do not create strong impressions. You do not leave people feeling particularly energized or impacted. People may not remember you strongly after interaction. You blend into background rather than stand out.",
    behavioralPattern: [
      "You do not draw much attention",
      "People do not seem strongly affected by you",
      "You are forgotten more quickly",
      "You do not influence group dynamics much",
      "People do not seek you out specifically",
    ],
    strength: [
      "You do not create negative impact",
      "You are socially acceptable",
      "Less visibility means less pressure",
      "People do not have strong negative reactions",
    ],
    risk: [
      "You do not make lasting impressions",
      "People may overlook your contributions",
      "You do not influence outcomes much",
      "Relationships may stay surface level",
      "Less memorable to others",
    ],
    improvementDirection: [
      "Develop stronger presence intentionally",
      "Find ways to make genuine connection",
      "Show more of your authentic self",
      "Build confidence in social settings",
      "Share your perspective with others",
    ],
  },
  {
    id: "rc-si-3",
    name: "The Intimidating",
    tagline: "Creates pressure or discomfort",
    shortDesc: "Others may feel judged, tense, or cautious around you.",
    family: "social-impact",
    identityStatement:
      "Your presence creates pressure or tension instead of comfort",
    fullDesc:
      "People may feel tense, judged, or cautious around you even if that is not your intention. Your tone, expression, or energy may come across as strong, critical, or unapproachable. People hesitate to be vulnerable or open around you.",
    behavioralPattern: [
      "Your tone comes across as serious",
      "Your expression seems critical or judging",
      "Your energy feels strong or overwhelming",
      "People choose words carefully around you",
      "You rarely see people relax completely around you",
    ],
    strength: [
      "You have authority and presence",
      "People take you seriously",
      "You can command attention and respect",
      "You are not seen as weak",
      "You have strong boundaries",
    ],
    risk: [
      "People may avoid being open with you",
      "People may lie to you to avoid conflict",
      "You miss information people hide",
      "Relationships stay guarded",
      "People fear your judgment",
    ],
    improvementDirection: [
      "Work on softening your delivery",
      "Practice finding warmth in your expression",
      "Intentionally make others feel safe",
      "Ask questions genuinely, not judgmentally",
      "Show vulnerability to invite openness",
    ],
  },
  {
    id: "rc-si-4",
    name: "The Draining",
    tagline: "Consumes more energy than you give",
    shortDesc: "Interactions with you may feel heavy or exhausting to others.",
    family: "social-impact",
    identityStatement:
      "Others feel depleted or exhausted after spending time with you",
    fullDesc:
      "Spending time with you takes more energy from people than it gives. People may feel drained after interaction. This can be due to negativity, neediness, complaints, or energy dynamics. People may enjoy you but feel relief when you are gone.",
    behavioralPattern: [
      "You focus heavily on your own needs",
      "You complain or vent frequently",
      "You drain energy from conversations",
      "You take more than you give",
      "People seem relieved when you leave",
    ],
    strength: [
      "You are honest about your struggles",
      "You do not hide your true self",
      "You allow people to see real you",
    ],
    risk: [
      "People avoid spending time with you",
      "You feel lonely despite efforts",
      "Relationships feel one-sided",
      "People come less frequently",
      "Your impact is negative",
    ],
    improvementDirection: [
      "Become aware of how much you take vs give",
      "Practice listening more than talking",
      "Share but also ask about others",
      "Address underlying negativity",
      "Give genuine care and interest to others",
    ],
  },
];

// ==================== AUTHENTICITY FAMILY ====================
const authenticityTypes: RealityCheckType[] = [
  {
    id: "rc-au-1",
    name: "The Authentic",
    tagline: "Consistent and real across contexts",
    shortDesc: "You show up as yourself regardless of environment.",
    family: "authenticity",
    identityStatement:
      "You are genuinely yourself across different environments and people",
    fullDesc:
      "You are authentic. You show up as yourself regardless of who you are with or where you are. What people see is what they get. There is consistency between your private and public self. People appreciate your genuineness.",
    behavioralPattern: [
      "You do not change fundamentally based on context",
      "You express real thoughts and feelings",
      "You do not pretend to be different",
      "People see the same person in all contexts",
      "Your values guide you across situations",
    ],
    strength: [
      "You are trustworthy and credible",
      "People connect with the real you",
      "Less energy wasted on pretense",
      "You attract people who appreciate you as you are",
      "Relationships are based on reality",
    ],
    risk: [
      "Some contexts may not appreciate your authenticity",
      "You may be too honest in professional settings",
      "Not everyone will like the real you",
    ],
    improvementDirection: [
      "Maintain your authenticity",
      "Learn context-appropriate expression",
      "Balance authenticity with discretion",
      "Help others find their authentic voice",
    ],
  },
  {
    id: "rc-au-2",
    name: "The Adaptive",
    tagline: "Changes based on situation",
    shortDesc: "You adjust your behavior depending on who you are with.",
    family: "authenticity",
    identityStatement:
      "You flex your behavior strategically depending on context and company",
    fullDesc:
      "You adapt your behavior based on situation. You are different with friends than with family, different at work than at home. This is not dishonesty but flexibility. You adjust your expression to fit context while maintaining core values.",
    behavioralPattern: [
      "You change your presentation depending on audience",
      "You adjust tone and energy based on context",
      "Different people see different sides of you",
      "You are strategic about what you reveal",
      "You maintain core values across contexts",
    ],
    strength: [
      "You are socially skilled and flexible",
      "You navigate different environments well",
      "You know when to express what",
      "You are respected across different groups",
      "You maintain relationships across contexts",
    ],
    risk: [
      "Some may see you as inconsistent",
      "You may lose track of your core self",
      "People may not know the real you",
      "Your identity may feel fragmented",
    ],
    improvementDirection: [
      "Know your core values across adaptations",
      "Do not adapt so much you lose yourself",
      "Be aware of pattern in your adaptations",
      "Choose contexts where you can be more authentic",
    ],
  },
  {
    id: "rc-au-3",
    name: "The Masked",
    tagline: "Hides true self to fit expectations",
    shortDesc:
      "You often suppress your real thoughts or feelings to be accepted.",
    family: "authenticity",
    identityStatement:
      "You hide your true self to fit what you think others expect",
    fullDesc:
      "You suppress your real thoughts and feelings to fit expectations. You wear masks depending on social situations. Over time, this creates disconnection from your true identity. People may know your mask but not your real self.",
    behavioralPattern: [
      "You suppress real thoughts to avoid conflict",
      "You show different versions to different people",
      "You do what is expected rather than what you believe",
      "You do not express authentic preferences",
      "You fear rejection if you are real",
    ],
    strength: [
      "You are adaptable to expectations",
      "You maintain social harmony",
      "You avoid conflict through accommodation",
      "People generally like your mask",
    ],
    risk: [
      "Loss of authentic connection",
      "Identity confusion over time",
      "Relationships are not based on real you",
      "Resentment builds from suppression",
      "Chronic inauthenticity is exhausting",
    ],
    improvementDirection: [
      "Start expressing small parts of true self",
      "Find safe people where you can be real",
      "Notice which masks you have adopted",
      "Practice saying your actual opinion",
      "Gradually increase authenticity",
    ],
  },
  {
    id: "rc-au-4",
    name: "The Conflicted",
    tagline: "Struggles between multiple identities",
    shortDesc:
      "You feel torn between who you are and who you think you should be.",
    family: "authenticity",
    identityStatement:
      "You feel internal conflict between multiple versions of yourself",
    fullDesc:
      "You experience internal conflict about your identity. You feel torn between who you actually are and who you think you should be, or between different parts of yourself. This creates internal tension and confusion about authentic self.",
    behavioralPattern: [
      "You feel pulled in different directions",
      "You are unsure which version is real",
      "You struggle with identity consistency",
      "Different contexts activate different parts",
      "You feel internal contradiction",
    ],
    strength: [
      "You are aware of multiple sides of yourself",
      "You can understand different perspectives",
      "You have capacity for growth and change",
      "You are thoughtful about identity",
    ],
    risk: [
      "Internal conflict creates stress",
      "You may seem inconsistent to others",
      "Relationships suffer from unclear identity",
      "Decision-making becomes complicated",
      "You feel inauthentic no matter what",
    ],
    improvementDirection: [
      "Explore the different parts of yourself",
      "Understand where conflict comes from",
      "Integrate different parts into whole self",
      "Accept multiplicity as natural",
      "Find expression that honors all parts",
    ],
  },
];

// ==================== COMMUNICATION PROJECTION FAMILY ====================
const communicationTypes: RealityCheckType[] = [
  {
    id: "rc-cp-1",
    name: "The Clear Communicator",
    tagline: "Easy to understand and direct",
    shortDesc: "Your message is simple, structured, and rarely misunderstood.",
    family: "communication",
    identityStatement:
      "What you communicate is easy to understand and rarely misinterpreted",
    fullDesc:
      "You communicate with clarity. Your message comes across simply and directly. People understand not just what you say but what you mean. You are rarely misunderstood. Your communication style creates understanding and connection.",
    behavioralPattern: [
      "You structure your thoughts clearly",
      "You speak simply without jargon",
      "You explain concepts well",
      "You confirm understanding",
      "Your message lands as intended",
    ],
    strength: [
      "People understand you easily",
      "Relationships have less conflict",
      "You influence others effectively",
      "You are trusted to explain things",
      "Communication creates connection not confusion",
    ],
    risk: [
      "You may be seen as simple thinker",
      "Complex nuance may be lost",
      "Some may find your style boring",
    ],
    improvementDirection: [
      "Maintain clarity while adding nuance",
      "Adapt clarity to different audiences",
      "Use your skill to help others communicate",
    ],
  },
  {
    id: "rc-cp-2",
    name: "The Miscommunicator",
    tagline: "Often misunderstood",
    shortDesc: "What you say and what others hear are not always aligned.",
    family: "communication",
    identityStatement:
      "What you intend to communicate rarely matches what people understand",
    fullDesc:
      "You frequently experience miscommunication. What you say and what people hear are often different. You may think you are clear but people misunderstand. Your words might be misinterpreted due to tone, context, or expression.",
    behavioralPattern: [
      "People frequently ask for clarification",
      "Your message gets distorted",
      "You have to repeat yourself often",
      "People miss your point regularly",
      "You are surprised by how you were understood",
    ],
    strength: [
      "You are patient in explaining",
      "You develop awareness of communication gaps",
      "You practice clarity repeatedly",
      "You learn through trial and error",
    ],
    risk: [
      "Repeated miscommunication creates frustration",
      "People may stop trying to understand",
      "Ideas do not land as intended",
      "Relationships may suffer",
      "You may give up trying to explain",
    ],
    improvementDirection: [
      "Ask people what they understood",
      "Identify specific words or patterns that confuse",
      "Slow down when explaining",
      "Use multiple ways to express same idea",
      "Get feedback on clarity before sending",
    ],
  },
  {
    id: "rc-cp-3",
    name: "The Reserved",
    tagline: "Holds back expression",
    shortDesc:
      "You think deeply but share very little, which makes others unsure about you.",
    family: "communication",
    identityStatement: "You keep your thoughts and feelings largely private",
    fullDesc:
      "You are reserved in expression. You do not share much about your thoughts, feelings, or perspectives. People know little about your inner world. This creates distance and makes it hard for others to understand or connect with you.",
    behavioralPattern: [
      "You rarely volunteer information",
      "You answer questions minimally",
      "You do not share thoughts unprompted",
      "You keep feelings private",
      "You hold back your perspective",
    ],
    strength: [
      "You are thoughtful before speaking",
      "You do not gossip or overshare",
      "You maintain privacy",
      "You do not create drama",
      "You are careful with your words",
    ],
    risk: [
      "People do not know the real you",
      "Others feel shut out",
      "Relationships stay surface",
      "People may misinterpret silence",
      "You create distance when you want connection",
    ],
    improvementDirection: [
      "Share small thoughts to start",
      "Practice being slightly less guarded",
      "Let people see your perspective",
      "Express feelings more openly",
      "Balance caution with connection",
    ],
  },
  {
    id: "rc-cp-4",
    name: "The Overexpressive",
    tagline: "Says more than necessary",
    shortDesc: "You communicate a lot, sometimes without filtering or clarity.",
    family: "communication",
    identityStatement:
      "You express thoughts and feelings freely, sometimes without filtering",
    fullDesc:
      "You are open in expression. You share thoughts, feelings, and ideas freely. You do not hold back much. Sometimes this openness is refreshing; sometimes it can be overwhelming. You may share more than others are ready to hear.",
    behavioralPattern: [
      "You talk freely without much filtering",
      "You share details others do not ask for",
      "You express feelings readily",
      "You do not pause before speaking",
      "Your communication can feel overwhelming",
    ],
    strength: [
      "You are authentic and open",
      "People know your thoughts and feelings",
      "You do not create false distance",
      "Your enthusiasm is infectious",
      "You are easy to know",
    ],
    risk: [
      "You may overshare inappropriately",
      "Too much sharing can overwhelm",
      "Confidential information may leak",
      "People may feel unable to tell you secrets",
      "Your words may create unintended consequences",
    ],
    improvementDirection: [
      "Learn to pause before speaking",
      "Notice when you are sharing too much",
      "Develop filtering skill",
      "Read social cues to adjust expression",
      "Practice thoughtful communication",
    ],
  },
];

// ==================== BEHAVIORAL CONSISTENCY FAMILY ====================
const consistencyTypes: RealityCheckType[] = [
  {
    id: "rc-bc-1",
    name: "The Consistent",
    tagline: "Actions align with words",
    shortDesc:
      "You are predictable in a positive way. People know what to expect from you.",
    family: "behavioral-consistency",
    identityStatement:
      "Your actions consistently align with what you say and believe",
    fullDesc:
      "You are consistent. Your behavior aligns with your words. People can predict your response because your actions are reliable. Your values guide your behavior consistently. People trust you because you follow through.",
    behavioralPattern: [
      "You do what you say you will do",
      "Your actions align with your values",
      "You are predictable positively",
      "You maintain consistency across time",
      "People can count on you",
    ],
    strength: [
      "You build strong trust",
      "People rely on you",
      "Your reputation is solid",
      "You have integrity",
      "Relationships are stable",
    ],
    risk: [
      "You may seem inflexible",
      "You may not adapt when needed",
      "People may not see other sides",
    ],
    improvementDirection: [
      "Maintain consistency while building flexibility",
      "Balance principle with pragmatism",
      "Show growth within consistency",
    ],
  },
  {
    id: "rc-bc-2",
    name: "The Situational",
    tagline: "Behavior changes depending on context",
    shortDesc: "You act differently based on environment or people.",
    family: "behavioral-consistency",
    identityStatement:
      "Your behavior changes significantly depending on who you are with or where you are",
    fullDesc:
      "Your behavior shifts based on situation. You may be professional at work and wild at home. You act one way with family and another with friends. Context heavily determines your actions. This can be strategic or it can feel inconsistent.",
    behavioralPattern: [
      "You change behavior dramatically by context",
      "Different people see different behavior",
      "Your values seem to shift with setting",
      "You are strategic about behavior",
      "Context determines your choices",
    ],
    strength: [
      "You are socially intelligent",
      "You can navigate different environments",
      "You are adaptable",
      "You know what behavior fits context",
    ],
    risk: [
      "People may see you as inconsistent",
      "Others may not know what to expect",
      "Trust may suffer from unpredictability",
      "Values may seem unclear",
    ],
    improvementDirection: [
      "Maintain core values across contexts",
      "Understand when you shift behavior",
      "Ensure adaptations serve real purpose",
      "Build consistency in core values",
    ],
  },
  {
    id: "rc-bc-3",
    name: "The Contradictory",
    tagline: "Actions and words do not match",
    shortDesc: "You may say one thing but do another.",
    family: "behavioral-consistency",
    identityStatement:
      "Your actions do not align with what you say you believe",
    fullDesc:
      "Your behavior contradicts your words. You say one thing but do another. You may proclaim values but act against them. This creates confusion and lack of trust. Others cannot rely on you.",
    behavioralPattern: [
      "You say one thing but do another",
      "Your actions contradict your values",
      "You do not follow through",
      "Your behavior surprises people negatively",
      "You make excuses for contradictions",
    ],
    strength: [
      "You are aware enough to acknowledge contradiction",
      "You have potential to align",
    ],
    risk: [
      "People do not trust you",
      "Your credibility suffers",
      "Relationships suffer",
      "Relationships feel unsafe",
      "People take you less seriously",
    ],
    improvementDirection: [
      "Identify specific contradictions",
      "Understand why contradiction exists",
      "Align actions with stated values",
      "Build integrity through follow-through",
      "Adjust expectations to match reality",
    ],
  },
  {
    id: "rc-bc-4",
    name: "The Unstable",
    tagline: "Hard to predict behavior",
    shortDesc:
      "Your responses and decisions vary widely without clear pattern.",
    family: "behavioral-consistency",
    identityStatement:
      "Your behavior is unpredictable, making it difficult for others to anticipate your reactions",
    fullDesc:
      "Your behavior is hard to predict. Your responses vary widely. People do not know what to expect from you. You may be kind one moment and harsh the next. This unpredictability creates anxiety for people around you.",
    behavioralPattern: [
      "Your moods affect your behavior dramatically",
      "Your reactions vary widely",
      "People do not know what version they will get",
      "Your behavior seems random",
      "You are emotionally reactive",
    ],
    strength: [
      "You are responsive to emotion",
      "People cannot take you for granted",
      "You are not locked into one pattern",
    ],
    risk: [
      "People feel anxious around you",
      "Trust is hard to build",
      "People walk on eggshells",
      "Relationships feel unsafe",
      "Your unpredictability creates tension",
    ],
    improvementDirection: [
      "Notice what triggers behavior changes",
      "Manage your emotional reactivity",
      "Build stability in your responses",
      "Communicate when you are struggling",
      "Work on emotional regulation",
    ],
  },
];

// ==================== BLIND SPOTS FAMILY ====================
const blindSpotsTypes: RealityCheckType[] = [
  {
    id: "rc-bs-1",
    name: "The Reflective",
    tagline: "Actively identifies personal flaws",
    shortDesc: "You regularly reflect and improve yourself.",
    family: "blind-spots",
    identityStatement:
      "You actively work to identify and address your own flaws",
    fullDesc:
      "You are reflective about yourself. You regularly examine your behavior and look for areas to improve. You seek feedback and take it seriously. You address flaws intentionally. This creates ongoing growth and development.",
    behavioralPattern: [
      "You regularly reflect on your behavior",
      "You seek feedback actively",
      "You examine your motivations",
      "You acknowledge your limitations",
      "You work on improvement deliberately",
    ],
    strength: [
      "You grow continuously",
      "You address issues before they become problems",
      "You inspire others to reflect",
      "You build genuine self-awareness",
      "Your relationships improve through growth",
    ],
    risk: [
      "You may become overly self-critical",
      "Constant reflection can create self-doubt",
    ],
    improvementDirection: [
      "Balance reflection with self-compassion",
      "Celebrate improvements you make",
      "Share learning with others",
    ],
  },
  {
    id: "rc-bs-2",
    name: "The Defensive",
    tagline: "Rejects criticism quickly",
    shortDesc:
      "You struggle to accept feedback and tend to justify your actions.",
    family: "blind-spots",
    identityStatement:
      "You protect yourself by rejecting or minimizing criticism",
    fullDesc:
      "You find it difficult to accept feedback. You tend to justify your behavior rather than reflect on it. Criticism triggers defensiveness. This creates resistance to growth. Others learn not to give you honest feedback.",
    behavioralPattern: [
      "You explain away criticism",
      "You deny problems quickly",
      "You blame external factors",
      "You redirect feedback",
      "You shut down criticism",
    ],
    strength: [
      "You maintain strong sense of self",
      "You do not let criticism paralyze you",
      "You are resilient to judgment",
    ],
    risk: [
      "You stagnate without self-reflection",
      "People stop giving honest feedback",
      "Flaws persist because you do not see them",
      "Growth opportunities are missed",
      "Relationships suffer from resistance",
    ],
    improvementDirection: [
      "Listen to criticism without reacting",
      "Consider truth in feedback",
      "Ask clarifying questions instead of defending",
      "Separate feedback from judgment",
      "Practice reflecting before responding",
    ],
  },
  {
    id: "rc-bs-3",
    name: "The Unaware Blind",
    tagline: "Does not see own flaws",
    shortDesc: "You genuinely do not notice your own negative patterns.",
    family: "blind-spots",
    identityStatement:
      "You are genuinely unaware of your own negative patterns and impacts",
    fullDesc:
      "You have significant blind spots. You genuinely do not see your own flaws. Your negative behavior patterns are invisible to you. Others may be frustrated because you do not acknowledge what they clearly see.",
    behavioralPattern: [
      "You are unaware of your negative impact",
      "You do not see your own patterns",
      "You are surprised by feedback",
      "You do not perceive your own flaws",
      "You lack insight into behavior",
    ],
    strength: [
      "You are not burdened by self-awareness of flaws",
      "You move forward without self-doubt",
      "Others may not judge you internally as much",
    ],
    risk: [
      "You cannot improve what you do not see",
      "Others become frustrated",
      "You miss critical feedback",
      "Flaws persist and grow",
      "Relationships suffer from your blindness",
    ],
    improvementDirection: [
      "Actively ask trusted people for honest feedback",
      "Notice patterns others point out",
      "Do not dismiss feedback out of hand",
      "Work with mentor or coach to build awareness",
      "Practice observing your impact on others",
    ],
  },
  {
    id: "rc-bs-4",
    name: "The Overcritical",
    tagline: "Sees too many flaws in self",
    shortDesc:
      "You focus too much on your weaknesses and may distort reality negatively.",
    family: "blind-spots",
    identityStatement:
      "You focus excessively on your flaws and underestimate your strengths",
    fullDesc:
      "You are aware of flaws but overemphasize them. You see problems everywhere in yourself. You focus on weaknesses and minimize strengths. Your self-perception is skewed toward negative. This creates unnecessary suffering and limits action.",
    behavioralPattern: [
      "You focus primarily on flaws",
      "You magnify small weaknesses",
      "You downplay strengths",
      "You ruminate on mistakes",
      "You are self-critical excessively",
    ],
    strength: [
      "You are aware of areas to improve",
      "You do not have false confidence",
      "You take responsibilities seriously",
    ],
    risk: [
      "Excessive self-criticism limits action",
      "You may have distorted self-image",
      "Depression or anxiety may develop",
      "Others may not see issues you see",
      "You do not move forward due to self-doubt",
    ],
    improvementDirection: [
      "Balance critique with acknowledgment of strengths",
      "Get reality check from trusted people",
      "Notice exaggerations in self-criticism",
      "Practice self-compassion",
      "Focus on growth not perfection",
    ],
  },
];

// ==================== EXTERNAL INFLUENCE FAMILY ====================
const externalInfluenceTypes: RealityCheckType[] = [
  {
    id: "rc-ei-1",
    name: "The Independent",
    tagline: "Not easily shaped by others",
    shortDesc: "You maintain your identity regardless of external pressure.",
    family: "external-influence",
    identityStatement:
      "You maintain your sense of self regardless of what others think or pressure",
    fullDesc:
      "You are independent. External pressure does not easily shape you. You maintain your identity and values despite influence. You make decisions based on your own judgment. Others do not easily sway you.",
    behavioralPattern: [
      "You stand by your decisions",
      "You do not conform to pressure",
      "You maintain your values",
      "You make independent choices",
      "You are not swayed by opinion",
    ],
    strength: [
      "You maintain authentic identity",
      "You do not compromise values easily",
      "You lead rather than follow",
      "Your identity is strong",
      "You make principled decisions",
    ],
    risk: [
      "You may seem stubborn",
      "You might miss valuable input",
      "You may isolate yourself",
      "Relationships may feel one-sided",
    ],
    improvementDirection: [
      "Maintain independence while staying open",
      "Balance conviction with flexibility",
      "Listen to others while trusting yourself",
    ],
  },
  {
    id: "rc-ei-2",
    name: "The Influenced",
    tagline: "Easily shaped by environment",
    shortDesc:
      "Your behavior and decisions are strongly affected by people around you.",
    family: "external-influence",
    identityStatement:
      "You are significantly impacted by people around you and your environment",
    fullDesc:
      "You are easily influenced by your environment and the people around you. Your behavior, decisions, and even values shift based on who you are with. You are responsive to external input, which can be positive or problematic depending on influence.",
    behavioralPattern: [
      "You shift behavior based on company",
      "You adopt opinions of people around you",
      "You go along with group",
      "You change your mind based on input",
      "You are highly responsive to environment",
    ],
    strength: [
      "You are open to influence and learning",
      "You are flexible and adaptable",
      "You collaborate well",
      "You are influenced by positive people",
    ],
    risk: [
      "You may lose your sense of self",
      "You are easily led astray",
      "Bad influences harm you",
      "Your identity is unclear",
      "You do not know your own mind",
    ],
    improvementDirection: [
      "Develop awareness of your core values",
      "Choose your influences carefully",
      "Build confidence in your own judgment",
      "Practice saying no to influence",
      "Maintain some autonomy",
    ],
  },
  {
    id: "rc-ei-3",
    name: "The Approval Seeker",
    tagline: "Needs validation from others",
    shortDesc: "You rely on external approval to feel confident.",
    family: "external-influence",
    identityStatement:
      "You depend on others approval to feel secure about yourself",
    fullDesc:
      "You seek approval and validation from others. Your confidence relies heavily on external feedback. You adjust behavior to gain approval. This creates dependency on others and vulnerability to their judgment. Your well-being is tied to external validation.",
    behavioralPattern: [
      "You seek reassurance frequently",
      "You adjust behavior for approval",
      "You overthink others opinions",
      "You need external validation",
      "You are easily discouraged by criticism",
    ],
    strength: [
      "You are aware of social dynamics",
      "You work hard to please others",
      "You are responsive to feedback",
    ],
    risk: [
      "Loss of independence",
      "Identity confusion",
      "Anxiety about others opinions",
      "Relationships become unhealthy",
      "You lose yourself in pursuit of approval",
    ],
    improvementDirection: [
      "Build internal validation",
      "Reduce reliance on external approval",
      "Develop self-trust",
      "Practice self-approval",
      "Find people who approve unconditionally",
    ],
  },
  {
    id: "rc-ei-4",
    name: "The Detached Observer",
    tagline: "Observes but does not engage deeply",
    shortDesc:
      "You stay distant from social influence and rarely let others affect you.",
    family: "external-influence",
    identityStatement:
      "You observe others and environments but stay emotionally detached from influence",
    fullDesc:
      "You maintain distance from social dynamics. You observe others but do not engage deeply. You are isolated from influence but also from connection. You stay separate and do not let others affect you easily. This creates protection but also loneliness.",
    behavioralPattern: [
      "You watch rather than participate",
      "You maintain emotional distance",
      "You do not let people affect you",
      "You observe group dynamics",
      "You stay on periphery",
    ],
    strength: [
      "You are not vulnerable to group pressure",
      "You see dynamics others miss",
      "You are protective of yourself",
      "You have perspective",
    ],
    risk: [
      "You feel disconnected from others",
      "Loneliness from distance",
      "Relationships stay surface",
      "You miss connection opportunities",
      "Isolation becomes pattern",
    ],
    improvementDirection: [
      "Balance observation with participation",
      "Allow selective vulnerability",
      "Engage more deeply in relationships",
      "Take interpersonal risks",
      "Move from detachment toward connection",
    ],
  },
];

// ==================== PUBLIC API ====================

export function getRealityCheckTypesByFamily(
  family: RealityCheckFamily,
): RealityCheckType[] {
  const allTypes = [
    ...selfAwarenessTypes,
    ...perceptionGapTypes,
    ...socialImpactTypes,
    ...authenticityTypes,
    ...communicationTypes,
    ...consistencyTypes,
    ...blindSpotsTypes,
    ...externalInfluenceTypes,
  ];
  return allTypes.filter((type) => type.family === family);
}

export function getAllRealityCheckTypes(): RealityCheckType[] {
  return [
    ...selfAwarenessTypes,
    ...perceptionGapTypes,
    ...socialImpactTypes,
    ...authenticityTypes,
    ...communicationTypes,
    ...consistencyTypes,
    ...blindSpotsTypes,
    ...externalInfluenceTypes,
  ];
}

export function getRealityCheckType(id: string): RealityCheckType | undefined {
  const allTypes = getAllRealityCheckTypes();
  return allTypes.find((type) => type.id === id);
}
