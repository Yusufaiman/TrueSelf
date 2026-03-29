// ============================================================
// PERSONALITY TEST ENGINE - CORE TYPES
// ============================================================

// 12 Personality Dimensions for scoring
export type Dimension =
  | "logic"
  | "intuition"
  | "reflection"
  | "decisiveness"
  | "emotionalSensitivity"
  | "emotionalControl"
  | "socialEnergy"
  | "socialDepth"
  | "discipline"
  | "impulsiveness"
  | "riskTolerance"
  | "flexibility";

// 5 Personality Families
export type PersonalityFamily =
  | "thinkers"
  | "feelers"
  | "doers"
  | "adapters"
  | "strugglers";

export interface PersonalityType {
  id: string;
  family: PersonalityFamily;
  title: string;
  tagline: string;
  shortDesc: string;
  deepDesc: string[];
  emotionalExperience: string;
  strengths: string[];
  blindSpots: string[];
  actions: string[];
  closingLine: string;
  secondaryTypes?: string[];
  shadowType?: string;
  growthType?: string;
}

export const PERSONALITY_TYPES: Record<string, PersonalityType> = {
  // THINKERS (8 types)
  "strategic-architect": {
    id: "strategic-architect",
    family: "thinkers",
    title: "The Strategic Architect",
    tagline: "You think deeply, plan carefully, and build systems.",
    shortDesc:
      "Your mind works in frameworks. You analyze situations carefully, anticipate consequences, and build solid strategies. You trust structure, logic, and your own careful thinking. You're the person who sees the full system and how all the pieces fit together.",
    deepDesc: [
      "You naturally break complex problems into components and understand how they interact. This systematic thinking is rare and valuable.",
      "Your strength is not just thinking—it's translating thinking into action through careful planning and execution.",
      "You're not impulsive. You weigh options, consider ramifications, and commit fully when you decide.",
      "People rely on you because your thinking is reliable, thorough, and grounded in reality.",
      "The risk: becoming rigid. Adapt your systems as the world changes, or you'll miss new opportunities.",
    ],
    emotionalExperience:
      "You feel grounded when you understand the system. There's a peace that comes from having a solid plan and knowing your role in it.",
    strengths: [
      "Strategic thinking",
      "System design",
      "Long-term planning",
      "Logical consistency",
      "Foresight",
    ],
    blindSpots: [
      "Adaptability",
      "Emotional nuance",
      "Spontaneity",
      "Quick pivoting",
    ],
    actions: [
      "Use your strategic ability to set meaningful long-term goals, not just organize tasks.",
      "Regularly check if your systems still serve your actual values, or just serve the system itself.",
      "Find one area where you practice flexibility—learning to adapt helps you stay relevant.",
      "Share your plans with someone who thinks differently. They may see what your logic misses.",
      "Remember: the best strategy adapts when reality changes.",
    ],
    closingLine:
      "Your ability to see the whole system is a gift. Use it to build, not to freeze everything in place.",
  },

  "silent-analyst": {
    id: "silent-analyst",
    family: "thinkers",
    title: "The Silent Analyst",
    tagline: "You observe, analyze, and understand deeply from the sidelines.",
    shortDesc:
      "You prefer to watch and think rather than talk and act. This gives you clarity others lack. You see patterns, connections, and deeper meanings. You work best alone or in small groups, where you can focus on understanding rather than performing.",
    deepDesc: [
      "Your superpower is observation. You notice what others miss because you're paying attention instead of filling silence.",
      "You don't need external validation for your ideas. Your internal analysis is your compass.",
      "You process information internally before speaking, which means your words carry weight when you do speak.",
      "The challenge: your insights stay locked inside. The world doesn't benefit from what you see unless you find ways to share it.",
      "You're not shy necessarily—you're selective. You speak when you have something meaningful to say.",
    ],
    emotionalExperience:
      "You feel peaceful in silence and thoughtfulness. Large groups or constant interaction feel draining rather than energizing.",
    strengths: [
      "Deep analysis",
      "Pattern recognition",
      "Calm observation",
      "Independent thinking",
      "Precision",
    ],
    blindSpots: ["Communication", "Networking", "Social energy", "Visibility"],
    actions: [
      "Write down your insights. Sharing them in writing first is more comfortable than speaking.",
      "Find one person who values your perspective. Build trust with them first.",
      "Practice speaking up even when your thought isn't perfectly formed. Perfection isn't required.",
      "Join smaller groups or one-on-ones where your voice has space to exist.",
      "Remember: your perspective matters, even if you share it quietly.",
    ],
    closingLine:
      "The world needs your clarity. You don't have to be loud to be heard.",
  },

  "precision-mind": {
    id: "precision-mind",
    family: "thinkers",
    title: "The Precision Mind",
    tagline:
      "Accuracy, clarity, and attention to detail define everything you do.",
    shortDesc:
      "You notice when things are wrong, unclear, or imprecise. Details matter to you—not obsessively, but because accuracy builds trust. You're reliable because you care about getting things right. Your work reflects your high standards.",
    deepDesc: [
      "Precision isn't perfectionism for you—it's respect. You respect the work, the people relying on it, and yourself enough to do it right.",
      "You catch errors others miss. This makes you invaluable in any system that depends on accuracy.",
      "Your communication is clear and direct. You say what you mean, and you mean what you say.",
      'The challenge: you can judge others for being "careless" when they just have different priorities.',
      "You lead by example. People trust your work because it's consistently excellent.",
    ],
    emotionalExperience:
      "You feel satisfied when work is done right. Sloppy execution bothers you more than it should.",
    strengths: [
      "Attention to detail",
      "Quality control",
      "Clarity",
      "Reliability",
      "Standardization",
    ],
    blindSpots: ["Big-picture thinking", "Letting go", "Flexibility", "Speed"],
    actions: [
      "Focus your precision where it matters most. Not everything deserves 100% of your detail-oriented energy.",
      'Practice "good enough" on low-stakes tasks. Delegate perfection to high-impact work.',
      "Coach others on accuracy instead of criticizing carelessly. People learn better from support than judgment.",
      "Celebrate the outcomes precision creates, not just the precision itself.",
      "Remember: excellence is about impact, not just accuracy.",
    ],
    closingLine:
      "Your precision makes the world more reliable. Channel it where it creates the most good.",
  },

  "pattern-decoder": {
    id: "pattern-decoder",
    family: "thinkers",
    title: "The Pattern Decoder",
    tagline: "You see connections and patterns others don't.",
    shortDesc:
      'Your mind naturally connects dots. You see relationships between seemingly unrelated things. This gives you creative insights and predictive ability. You\'re the person who suddenly understands "why" when everyone else is still asking "what."',
    deepDesc: [
      "You don't just see individual events—you see the pattern underlying them. This intuitive integration of information is a rare gift.",
      "Your insights often come suddenly because your subconscious is constantly pattern-matching.",
      "You're creative not because you invent from nothing, but because you recombine patterns in new ways.",
      'The challenge: your pattern insights can feel fuzzy to others. You "just know" without being able to fully explain why.',
      "Trust your pattern recognition. It's usually right, even when you can't articulate the logic.",
    ],
    emotionalExperience:
      'You feel alive when you suddenly see the pattern. That "aha" moment is deeply satisfying.',
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
      "Learn to communicate your intuitive insights with supporting logic. People need both to trust you.",
      "Keep a pattern journal. Document the patterns you see—you'll refine them over time.",
      "Collaborate with detail-oriented people who can validate and implement your insights.",
      "Trust your pattern sense, but verify with evidence before betting the farm on it.",
      "Remember: your insight is valuable. Invest time in making it understandable to others.",
    ],
    closingLine:
      "Your ability to see patterns is a strength. Help others understand the connections you see.",
  },

  "systems-builder": {
    id: "systems-builder",
    family: "thinkers",
    title: "The Systems Builder",
    tagline: "You design, organize, and optimize how things work.",
    shortDesc:
      "You see how systems could be better. You're drawn to understanding and improving processes, whether they're at work or in your own life. You think in terms of inputs, outputs, feedback loops, and optimization. You build frameworks that work.",
    deepDesc: [
      "You naturally think in systems. When you encounter a problem, you don't just solve it—you design a system to prevent it happening again.",
      "Your strength is taking chaos and creating order through thoughtful system design.",
      "You enjoy the intellectual satisfaction of a well-designed system more than the results it produces.",
      "The challenge: not everything needs a system. Sometimes simplicity is better than optimization.",
      "You're most satisfied when you can see the system working efficiently.",
    ],
    emotionalExperience:
      "You feel calm when processes are optimized and flowing. Inefficiency creates tension for you.",
    strengths: [
      "System design",
      "Process optimization",
      "Logical organization",
      "Scalability",
      "Efficiency",
    ],
    blindSpots: ["Human factors", "Emotions", "Simplicity", "Flexibility"],
    actions: [
      "Remember that humans are part of the system. Don't optimize at the expense of people's wellbeing.",
      "Practice simplification. Just because you can add complexity doesn't mean you should.",
      "Test systems with people before finalizing them. You might miss something important.",
      "Share how your systems work. Help others understand and improve them.",
      "Remember: a system serves its purpose. If the purpose changes, the system should too.",
    ],
    closingLine:
      "Your ability to build systems creates stability for others. Make sure your systems serve humanity.",
  },

  "rational-commander": {
    id: "rational-commander",
    family: "thinkers",
    title: "The Rational Commander",
    tagline:
      "You see clearly, decide decisively, and move forward with purpose.",
    shortDesc:
      "You think straight and fast. You gather data, make decisions, and execute. You're not one to overthink or second-guess. People follow your lead because you lead with clarity and conviction. You're the person others turn to when they need someone to decide.",
    deepDesc: [
      "Your clarity of mind is rare. While others are still weighing options, you've already decided and moved forward.",
      "You don't need everyone's buy-in to act. You lead by example and let results speak for themselves.",
      "Your decisiveness inspired confidence in others, even when they're uncertain.",
      "The challenge: you can miss nuance. Your style works for clear decisions, but some situations are genuinely ambiguous.",
      "You're most effective in situations that need clear direction and fast execution.",
    ],
    emotionalExperience:
      "You feel powerful and grounded when you're in control and directing action. Uncertainty frustrates you.",
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
      "Practice asking for input before deciding. You might miss important perspective by moving too fast.",
      "Slow down occasionally. Rushing decisions costs more than the time you save.",
      "Listen to people who think differently. They keep you from making avoidable mistakes.",
      "Remember that not everyone thrives under directive leadership. Adjust your style for different people.",
      "Remember: good leadership considers the people following, not just the direction.",
    ],
    closingLine:
      "Your clarity drives progress. Make sure you're taking people with you.",
  },

  "cold-visionary": {
    id: "cold-visionary",
    family: "thinkers",
    title: "The Cold Visionary",
    tagline: "You see the future with clarity, logic as your guide.",
    shortDesc:
      "You combine logical thinking with intuitive vision. You can see where things are heading based on trends and patterns. Your predictions usually come true because they're grounded in sound analysis plus foresight. You inspire others with a vision built on logic.",
    deepDesc: [
      "Your superpower is seeing ahead. You combine cold logic with future-oriented thinking.",
      "Others might call you detached or unemotional, but you're simply not driven by feelings—you're driven by vision.",
      "Your vision is trustworthy because it's not based on hope or emotion. It's based on analysis.",
      "The challenge: people might not connect emotionally with your vision. You need to help them feel it, not just understand it.",
      "You're most satisfied when you're building toward a vision that actually comes true.",
    ],
    emotionalExperience:
      "You feel energized by vision and possibility. The future pulls you forward, sometimes more than the present.",
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
      "Work on connecting your vision to people's actual needs and hopes. Help them see how your vision serves them.",
      "Don't get so focused on the future that you ignore the present. People live now, not then.",
      "Find emotionally intelligent partners who can translate your vision into human terms.",
      "Share your vision and teach others to think like you. Multiply your impact.",
      "Remember: great vision needs great execution and human connection to succeed.",
    ],
    closingLine: "Your vision shapes the future. Help others see what you see.",
  },

  "calculated-planner": {
    id: "calculated-planner",
    family: "thinkers",
    title: "The Calculated Planner",
    tagline: "You plan every step with thoughtful precision.",
    shortDesc:
      "Planning comes naturally to you. You work backward from goals, anticipating obstacles and strategizing solutions. You're prepared because you prepare thoroughly. Others appreciate your reliability and foresight. You handle complexity by breaking it into manageable steps.",
    deepDesc: [
      "Your plans account for possibilities others don't imagine. You're rarely surprised because you've already thought it through.",
      "You enjoy the intellectual work of planning as much as the execution.",
      "Your approach reduces risk and increases likelihood of success, which people value.",
      "The challenge: life rarely follows the plan. You need to be prepared for that too.",
      "You're most satisfied when your careful planning leads to predictable success.",
    ],
    emotionalExperience:
      "You feel secure when you have a solid plan. Uncertainty makes you anxious until you've planned for it.",
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
      "Schedule time for spontaneity. Not everything good is planned.",
      "Let others deviate from your plan. They might find better paths.",
      "Remember that planning has diminishing returns. At some point, execute.",
      "Build contingencies for your contingencies, but not endlessly.",
      "Remember: a perfect plan that's not executed beats no plan, but executed plans beat perfect plans.",
    ],
    closingLine:
      "Your planning makes success possible. Know when to execute and let go.",
  },

  // FEELERS (8 types)
  "emotional-navigator": {
    id: "emotional-navigator",
    family: "feelers",
    title: "The Emotional Navigator",
    tagline: "You feel deeply and help others through their emotions.",
    shortDesc:
      "You experience emotions fully and understand them well. You're comfortable on the emotional landscape most people avoid. You help others process their feelings and find their way through difficult emotional terrain. Emotional awareness is your strength.",
    deepDesc: [
      "You can feel what others feel without being overwhelmed by it. This is a rare skill.",
      "You know how to sit with difficult emotions—yours and others'—without trying to fix or escape them.",
      "People open up to you because you genuinely understand and don't judge.",
      "The challenge: you can absorb others' emotions and lose yourself. Maintaining healthy boundaries is essential.",
      "You're most alive when you're helping others find emotional clarity.",
    ],
    emotionalExperience:
      "Your emotions are vibrant and textured. You experience a full spectrum and can articulate nuances others miss.",
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
      "Protect your emotional energy. You can't help others if you're emotionally drained.",
      "Learn to balance emotional understanding with logical analysis. Both matter.",
      "Set clear boundaries about what you can and cannot do for others.",
      "Process your own emotions before trying to help others. Your energy is contagious.",
      "Remember: helping doesn't mean carrying their burden. You can be empathetic without enabling.",
    ],
    closingLine:
      "Your emotional depth is a gift. Use it to help others grow, not to rescue them.",
  },

  "deep-feeler": {
    id: "deep-feeler",
    family: "feelers",
    title: "The Deep Feeler",
    tagline: "You feel things with profound intensity.",
    shortDesc:
      "Your emotions run deep. You experience joy more fully, pain more acutely, and meaning more profoundly than most. This gives you rich inner life and deep insights, but it also means you're vulnerable to overwhelm. Your intensity is your strength and your challenge.",
    deepDesc: [
      "You don't just have feelings—you have experiences. Even simple events can move you deeply.",
      "Your depth is rare in a world that values efficiency over feeling.",
      "You understand subtlety and nuance that others miss because you're attuned to the emotional wavelengths.",
      "The challenge: the world isn't designed for people who feel this much. You need to find spaces where you can exist fully.",
      "You're most yourself when you're with people or in situations that honor your depth.",
    ],
    emotionalExperience:
      "Everything feels like it matters. You live in color while others live in black and white.",
    strengths: [
      "Intensity",
      "Emotional depth",
      "Meaningful connection",
      "Artistry",
      "Authenticity",
    ],
    blindSpots: [
      "Resilience",
      "Coping with shallow interaction",
      "Emotional regulation",
      "Practical thinking",
    ],
    actions: [
      "Find people who match your depth. Surface relationships will drain you.",
      "Develop coping strategies for your intensity. Journaling, art, or therapy help.",
      "Don't apologize for feeling things deeply. It's not a flaw.",
      "Learn to regulate without suppressing. You can feel fully and still function.",
      "Remember: your depth is your gift. Protect it carefully.",
    ],
    closingLine:
      "You feel the world more fully than most. That's not weakness—it's truth.",
  },

  "empathic-observer": {
    id: "empathic-observer",
    family: "feelers",
    title: "The Empathic Observer",
    tagline: "You understand people by watching and feeling.",
    shortDesc:
      "You're naturally attuned to others' experiences without needing them to explain. You observe, you feel their reality, and you understand. You prefer this to talking about it. Your quiet presence is often more helpful than words. You support people by truly seeing them.",
    deepDesc: [
      "You don't need explicit information to understand people. You read them like others read books.",
      "Your empathy is active, not passive. You feel into situations and offer understanding.",
      "You prefer small groups or one-on-one connections where deep understanding is possible.",
      "The challenge: people might not realize you're supporting them because you do it quietly.",
      "You're most satisfied when your quiet presence helps someone feel less alone.",
    ],
    emotionalExperience:
      "You feel others' reality as if it's your own. Connection is your primary emotional experience.",
    strengths: [
      "Empathy",
      "observation",
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
      "Help others understand how much you understand. Speak occasionally.",
      "Don't assume people know about your support. Sometimes people need to hear it.",
      "Practice self-advocacy. Your empathy shouldn't come at cost of your own needs.",
      "Find people who value quiet support. Not everyone will, and that's okay.",
      "Remember: your quiet understanding matters, even if it's not loud.",
    ],
    closingLine:
      "Your empathy is powerful, even when it's silent. Trust that your presence is enough.",
  },

  "inner-storm": {
    id: "inner-storm",
    family: "feelers",
    title: "The Inner Storm",
    tagline: "Your emotions are intense and turbulent.",
    shortDesc:
      "You feel everything vividly and struggle to regulate those feelings. Your inner world is stormy. This gives you creative intensity and emotional authenticity, but it also means you're vulnerable to overwhelm and reactivity. Finding stability is your ongoing practice.",
    deepDesc: [
      "Your emotions aren't a bug in your system—they're a feature. But they're intense and hard to manage.",
      "You react strongly to situations because they genuinely move you. Your responses are authentic, even if they're big.",
      "Your emotional honesty is refreshing to people tired of pretense, even if it's overwhelming sometimes.",
      "The challenge: you need strategies to move through your storms without being destroyed by them.",
      "You're most grounded when you have healthy outlets and supportive people.",
    ],
    emotionalExperience:
      "Life feels intense and immediate. You experience emotional weather that others don't seem to feel.",
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
      "Develop emotional regulation tools. Therapy, mindfulness, or coaching help.",
      "Give yourself permission to feel, but add structure to how you express it.",
      "Find outlets for your intensity. Creative practices, physical activity, or nature help.",
      "Build a support system that understands your storms and doesn't judge them.",
      "Remember: your intensity doesn't make you broken. You just need the right tools.",
    ],
    closingLine:
      "Your emotional intensity is real and valid. Learn to live with it gracefully.",
  },

  "gentle-anchor": {
    id: "gentle-anchor",
    family: "feelers",
    title: "The Gentle Anchor",
    tagline: "You provide calm stability and emotional grounding.",
    shortDesc:
      "You're steady and emotionally grounded. People feel calmer around you because your presence is soothing. You're not expressively emotional, but you're deeply feeling. You provide the safety others need to be vulnerable. You're the rock many rely on.",
    deepDesc: [
      "Your calmness is contagious. People settle when you enter the room.",
      "You feel things, but you process them internally. Your emotions are private and contained.",
      "Your steadiness is a gift, but don't mistake it for being unaffected. You feel deeply.",
      "The challenge: people might depend on your stability so much they don't see your needs.",
      "You're most satisfied when others feel safe and grounded around you.",
    ],
    emotionalExperience:
      "Your emotions are deep but quiet. You experience fullness without drama.",
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
      "Let others support you too. You can be strong and still ask for help.",
      "Share your feelings more than feels natural. People want to know you too.",
      "Remember that your calmness shouldn't require you to suppress your needs.",
      "Build relationships where you're not always the stable one.",
      "Remember: you can provide stability and still be human.",
    ],
    closingLine:
      "Your steadiness is a blessing. Make sure you're also being seen and supported.",
  },

  "sensitive-visionary": {
    id: "sensitive-visionary",
    family: "feelers",
    title: "The Sensitive Visionary",
    tagline: "You see a better future through the lens of emotion and meaning.",
    shortDesc:
      "You combine emotional depth with a vision for something better. You're not coldly logical—you dream with feeling. Your vision is imbued with purpose and meaning. You inspire others not just with where you're going, but with why it matters.",
    deepDesc: [
      "Your vision has heart. This is rare and powerful.",
      "You see possibilities not just logically but emotionally. You feel what the future could be.",
      "Your sensitivity gives your vision authenticity and meaning.",
      "The challenge: your sensitivity can paralyze you when reality doesn't match your vision.",
      "You're most alive when you're moving toward something that feels deeply meaningful.",
    ],
    emotionalExperience:
      "You feel pulled toward a vision that matters. This sense of purpose is your emotional North Star.",
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
      "Ground your vision with practical steps. Otherwise, it stays a dream.",
      "Find partners who are logical where you are emotional. Balance matters.",
      "Accept that reality will be messier and less meaningful than your vision. That's okay.",
      "Share your vision, but don't need everyone to feel it the way you do.",
      "Remember: great visions change the world because they have both passion and pragmatism.",
    ],
    closingLine:
      "Your vision matters because it has heart. Ground it in action.",
  },

  "heart-led-soul": {
    id: "heart-led-soul",
    family: "feelers",
    title: "The Heart-Led Soul",
    tagline: "Your heart leads, and your choices follow.",
    shortDesc:
      "You make decisions and live your life from your emotional truth. Logic matters less than how something feels. Your authenticity is magnetic. People feel your genuineness and are drawn to it. You live with your whole heart open.",
    deepDesc: [
      "You trust your emotions as a guide. When something doesn't feel right, you honor that.",
      "Your decisions might look illogical to others, but they're logically grounded in your values.",
      "Your emotional authenticity is rare and precious in a world that values rational masks.",
      "The challenge: you can make impulsive decisions driven by feeling in the moment.",
      "You're most aligned when your external life matches your internal emotional truth.",
    ],
    emotionalExperience:
      "Everything is processed through the heart. This is how you navigate the world.",
    strengths: [
      "Authenticity",
      "Heart-centered values",
      "Emotional honesty",
      "Intuitive wisdom",
      "Passion for life",
    ],
    blindSpots: [
      "Logic",
      "Long-term thinking",
      "Practical consequences",
      "Others' perspectives",
    ],
    actions: [
      "Honor your heart, but also pause before big decisions. Let emotions settle.",
      "Develop your logical thinking. Both reason and feeling matter.",
      "Recognize when your emotions are temporary versus deeply true.",
      "Find people who honor your emotional guidance even if they process differently.",
      "Remember: following your heart is powerful. Make sure it's your deepest truth, not your surface feeling.",
    ],
    closingLine:
      "Your heart is wise. Make sure it's your voice, not your fear, speaking.",
  },

  "emotional-alchemist": {
    id: "emotional-alchemist",
    family: "feelers",
    title: "The Emotional Alchemist",
    tagline: "You transform pain and emotion into wisdom and meaning.",
    shortDesc:
      "You don't just feel deeply—you transmute emotion into insight and growth. You take your own pain and others' pain and turn it into wisdom. Your journey through emotional complexity gives you unusual clarity about human experience. You help others find meaning in difficulty.",
    deepDesc: [
      "Your emotional depth is combined with the ability to work with it constructively.",
      "You understand that pain isn't the problem—resistance to pain is. You've learned to metabolize emotion.",
      "Your hard-won wisdom is worth far more than easy optimism.",
      "The challenge: you can't help others until you've done your own work. Keep working on yourself.",
      "You're most alive when you're transforming struggle into something meaningful.",
    ],
    emotionalExperience:
      "You feel pain and meaning simultaneously. They're not separate for you.",
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
      "Remember that your journey of processing emotion is the transformative tool. Don't shortcut it.",
      "Help others find their own transformation, not adopt yours.",
      "Keep growing even when you've learned a lot. Alchemy is ongoing.",
      "Find people who honor the darkness while pursuing the light.",
      "Remember: your pain is part of your wisdom. Don't try to erase it.",
    ],
    closingLine:
      "Your journey through emotion is your greatest teacher. Keep transforming.",
  },

  // DOERS (8 types)
  "relentless-executor": {
    id: "relentless-executor",
    family: "doers",
    title: "The Relentless Executor",
    tagline: "You commit fully and see things through.",
    shortDesc:
      "You're driven by goals and the satisfaction of completing them. Once you commit, you're relentless. You don't get distracted or give up. People count on you because when you say you'll do something, it gets done. Completion is your drug.",
    deepDesc: [
      "You have an internal motor that drives you forward. You don't need external motivation.",
      "You take responsibility seriously. If you committed, nothing stops you.",
      "Your follow-through is rare and valuable in a world full of abandoned projects.",
      "The challenge: you can push yourself too hard. Completion at the cost of health isn't victory.",
      "You're most satisfied when you've achieved your goals through sheer will and effort.",
    ],
    emotionalExperience:
      "You feel alive when you're working toward completion. Stalled progress creates anxiety.",
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
      "Build rest into your plans. Pushing yourself to burnout defeats the purpose.",
      "Learn when to quit. Not every goal is worth the cost.",
      "Enjoy the journey toward completion, not just the destination.",
      "Help others understand your drive. Not everyone is motivated this way.",
      "Remember: you can be driven and also take care of yourself.",
    ],
    closingLine:
      "Your relentlessness achieves things. Make sure you're achieving for yourself, not just for completion.",
  },

  "action-taker": {
    id: "action-taker",
    family: "doers",
    title: "The Action Taker",
    tagline:
      "You move toward what matters without waiting for perfect conditions.",
    shortDesc:
      "You're the person who does things while others are still thinking about them. You don't wait for certainty or permission. You move, you learn, you adjust. Your bias toward action creates momentum that others feed off. You get things done by doing them.",
    deepDesc: [
      "You understand that action creates clarity. You learn by doing.",
      "You're not reckless, but you're not paralyzed by perfectionism either.",
      "Your willingness to start is what makes your dreams become real.",
      "The challenge: sometimes more thinking would prevent costly mistakes.",
      "You're most energized when you're moving toward big goals.",
    ],
    emotionalExperience:
      "Inaction feels like suffocation. Movement, even uncertain movement, feels right.",
    strengths: [
      "Initiative",
      "Momentum",
      "Learning by doing",
      "Resilience",
      "Courage",
    ],
    blindSpots: ["Planning", "Reflection", "Caution", "Listening"],
    actions: [
      "Pause occasionally to reflect on what you're learning.",
      "Plan for high-stakes decisions even if planning goes against your nature.",
      "Listen to cautious voices around you. They might protect you from preventable problems.",
      "Document your learning. You learn fast, but you might forget lessons.",
      "Remember: action is powerful. Make it purposeful action, not just motion.",
    ],
    closingLine:
      "Your willingness to act changes things. Make sure you're learning as you go.",
  },

  "fearless-mover": {
    id: "fearless-mover",
    family: "doers",
    title: "The Fearless Mover",
    tagline: "You embrace risk and move toward what excites you.",
    shortDesc:
      "You're comfortable with risk in a way most people aren't. You don't act recklessly—you calculate risk and move forward anyway. You're the person who attempts things others think are impossible. Your fearlessness opens doors and shows others what's possible.",
    deepDesc: [
      "You see risk differently than most people. You evaluate it and move through it.",
      "Your fearlessness is contagious. People around you feel braver.",
      "You live a fuller life because you're willing to risk failure.",
      "The challenge: you might minimize legitimate dangers. Some caution actually protects you.",
      "You're most alive when you're pushing boundaries and attempting big things.",
    ],
    emotionalExperience:
      "You feel energized by possibility and risk. Safety constraints feel suffocating.",
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
      "Find advisors who are more cautious than you. They help you avoid stupid risks.",
      "Distinguish calculated risk from recklessness. Both are possible.",
      "Document your failures. They teach more than successes.",
      "Help others feel brave, but don't push them to risks that don't fit them.",
      "Remember: fearlessness is powerful. Make sure it's directed toward meaningful goals.",
    ],
    closingLine:
      "Your courage expands what's possible. Keep questioning what risks are truly worth taking.",
  },

  "momentum-builder": {
    id: "momentum-builder",
    family: "doers",
    title: "The Momentum Builder",
    tagline: "You create forward motion and inspire others to follow.",
    shortDesc:
      "You build momentum on projects and goals. You start things energetically, draw others in, and create waves of progress. You're the person whose enthusiasm becomes contagious. You understand that momentum is its own fuel. You keep projects moving.",
    deepDesc: [
      "You know that the hardest part is starting, and once you start, momentum takes over.",
      "You inspire through your own energy and forward motion.",
      "You see setbacks as temporary disruptions in momentum, not permanent failures.",
      "The challenge: your momentum can override thoughtfulness. Sometimes you need to stop and reconsider.",
      "You're most satisfied when you're building momentum and taking others with you.",
    ],
    emotionalExperience:
      "You feel alive when there's momentum. Stillness feels like death to you.",
    strengths: [
      "Building momentum",
      "Inspiring others",
      "Energy management",
      "Leadership",
      "Keep forward movement",
    ],
    blindSpots: [
      "Patience",
      "Introspection",
      "Consolidating gains",
      "Noticing who gets left behind",
    ],
    actions: [
      "Check occasionally that your momentum is toward something meaningful, not just movement for movement's sake.",
      "Wait sometimes. Consolidation matters as much as momentum.",
      "Ensure your momentum doesn't leave people behind. Include people as you move.",
      "Learn to lead with others' pace sometimes, not just your own.",
      "Remember: momentum is powerful. Make sure it's toward a destination, not just away from standing still.",
    ],
    closingLine:
      "Your momentum changes things. Make sure you're building toward something that matters.",
  },

  "risk-runner": {
    id: "risk-runner",
    family: "doers",
    title: "The Risk Runner",
    tagline: "You thrive when you're pushing limits and testing boundaries.",
    shortDesc:
      "You're drawn to situations with high stakes and high reward. You seek out risk not recklessly, but as where life feels most alive. You're comfortable in chaos that paralyzes others. You can make fast decisions under pressure. Adventure calls you.",
    deepDesc: [
      "You're wired differently. What feels risky to others feels normal to you.",
      "You excel in high-stress situations where quick decisions matter.",
      "Your comfort with risk and uncertainty makes you adaptable.",
      "The challenge: you can become addicted to risk and crisis. Calm feels boring.",
      "You're most alive when you're in the thick of something challenging.",
    ],
    emotionalExperience:
      "You feel most real in high-risk situations. Normal life often feels too slow and safe.",
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
      "Find meaningful outlets for your risk tolerance. Channel it toward goals that matter, not just adrenaline.",
      "Develop deep relationships so that people matter more than adventure.",
      "Learn to find meaning in stability. Not all challenge is external.",
      'Consider that what you call "boring" others call "healthy."',
      "Remember: risk is a tool, not a lifestyle.",
    ],
    closingLine:
      "Your comfort with risk is valuable. Use it to build, not just to seek thrills.",
  },

  "fast-decider": {
    id: "fast-decider",
    family: "doers",
    title: "The Fast Decider",
    tagline: "You decide quickly and move forward before others catch up.",
    shortDesc:
      "You make decisions quickly while others are still gathering information. Your speed gives you an advantage. You don't second-guess yourself. You commit fully to decisions and move forward. Hesitation is foreign to you. Your decisiveness creates forward motion.",
    deepDesc: [
      "Your fast decision-making is an asset in fast-moving situations.",
      "You don't need certainty to move. You move with 70% information and learn as you go.",
      "Your confidence is infectious. People follow your lead partly because you move so decisively.",
      "The challenge: some decisions need time. Your speed can cause preventable problems.",
      "You're most satisfied when your fast decisions lead to good outcomes.",
    ],
    emotionalExperience:
      "You feel powerful when you're deciding and moving. Deliberation feels like weakness.",
    strengths: [
      "Fast decision-making",
      "Confidence",
      "Action-orientation",
      "Leadership",
      "Momentum",
    ],
    blindSpots: ["Deliberation", "Listening", "Changing course", "Patience"],
    actions: [
      "Force yourself to wait on important decisions. Create artificial delays.",
      "Listen to people who decide slowly. They see angles you might miss.",
      "Be willing to reverse decisions when evidence emerges. Speed doesn't mean rightness.",
      "Help others understand your decision-making process, not just your conclusions.",
      "Remember: fast decisions work in dynamic situations. Not all situations are dynamic.",
    ],
    closingLine: "Your decisiveness creates movement. Use it wisely.",
  },

  "hustle-driver": {
    id: "hustle-driver",
    family: "doers",
    title: "The Hustle Driver",
    tagline:
      "You push hard toward your goals and inspire others through effort.",
    shortDesc:
      "You work hard and push hard. You believe in effort, grind, and earning your way. You're not waiting for luck or perfect circumstances. You're building through relentless work. Your hustle is contagious and inspiring. You achieve through determination.",
    deepDesc: [
      "You understand that there's no substitute for hard work. Luck might help, but work is reliable.",
      "You're energized by the effort itself, not just the rewards.",
      "You inspire others by your example. If you can do this, maybe they can try harder too.",
      "The challenge: you can burn out. Not all hustle leads somewhere meaningful.",
      "You're most satisfied when your hard work produces real results.",
    ],
    emotionalExperience:
      "You feel alive when you're working hard toward something. Rest feels like giving up.",
    strengths: [
      "Effort",
      "Persistence",
      "Work ethic",
      "Resilience",
      "Inspiration",
    ],
    blindSpots: ["Rest", "Enjoyment", "Efficiency", "Balance"],
    actions: [
      "Build rest into your work. Sustainable hustle beats burnout.",
      "Learn to work smart, not just hard. Effort alone isn't victory.",
      "Find meaning beyond the grind. Why are you working so hard?",
      "Help others find their balance. Your hustle is your journey.",
      "Remember: hard work is powerful. Make sure it's working toward something you actually want.",
    ],
    closingLine:
      "Your hustle builds real things. Make sure it builds a life you want to live.",
  },

  "bold-initiator": {
    id: "bold-initiator",
    family: "doers",
    title: "The Bold Initiator",
    tagline: "You boldly begin things that others only imagine.",
    shortDesc:
      "You have the audacity to start. You see something that needs doing and you start it, even if you don't have all the pieces. You attract others to your vision and projects through your bold confidence. You're the founder, the starter, the one who says \"let's do it.\"",
    deepDesc: [
      "Your superpower is initiation. You can take an idea from abstract to actual.",
      "You're not afraid to be first or to fail publicly trying.",
      "Your boldness gives others permission to be bold too.",
      "The challenge: you can start a lot without finishing much. Completion is not your strength.",
      "You're most alive when you're initiating new things and bringing people along.",
    ],
    emotionalExperience:
      "You feel excited by possibility and novelty. Routine feels like a cage.",
    strengths: [
      "Initiation",
      "Boldness",
      "Visionary thinking",
      "Attracting others",
      "Novelty",
    ],
    blindSpots: ["Follow-through", "Details", "Patience", "Finishing strongly"],
    actions: [
      "Team up with finishers. You need people to take your initiatives to completion.",
      "Build systems for follow-through even though it's not natural to you.",
      "Celebrate others' completion work as much as your initiation work.",
      "Stay involved with projects, even after the exciting part is over.",
      "Remember: bold initiation is valuable. Add follow-through and you're unstoppable.",
    ],
    closingLine:
      "Your boldness starts things. Partner with others to see them through.",
  },

  // ADAPTERS (8 types)
  "adaptive-chameleon": {
    id: "adaptive-chameleon",
    family: "adapters",
    title: "The Adaptive Chameleon",
    tagline: "You adjust seamlessly to any situation or group.",
    shortDesc:
      "You're socially savvy and naturally adapt to different contexts. You can be yourself in many different settings. You blend in wherever you are, but you're not losing yourself—you're showing different facets. Your flexibility is your strength. You navigate complex social terrain easily.",
    deepDesc: [
      "You understand social dynamics intuitively and adjust to them without effort.",
      "Your adaptability comes from genuine interest in different people and contexts, not inauthenticity.",
      "You're comfortable almost everywhere because you can bend to fit.",
      "The challenge: people might not know who you really are underneath the adaptation.",
      "You're most satisfied when you're navigating complex situations smoothly.",
    ],
    emotionalExperience:
      "You feel flexible and at ease in different contexts. You're comfortable with multiplicity.",
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
      "Find at least one context where you don't adapt—where you're fully yourself.",
      "Remember that lasting relationships need you to be consistent, not just adaptable.",
      "Use your adaptability intentionally. Know when you're adapting and why.",
      "Help others understand your core underneath your flexibility.",
      "Remember: adaptability is powerful. Make sure your core is also being expressed.",
    ],
    closingLine:
      "Your adaptability makes you valuable anywhere. Make sure someone knows the real you.",
  },

  "social-shapeshifter": {
    id: "social-shapeshifter",
    family: "adapters",
    title: "The Social Shapeshifter",
    tagline: "You shift naturally between social roles and contexts.",
    shortDesc:
      "You're socially fluid. You can be professional with colleagues, wild with friends, deep with loved ones, and entertaining with strangers. You don't feel fake doing this—you're just showing different parts of yourself appropriately. Your social intelligence is high. You know how to be.",
    deepDesc: [
      "You understand that authenticity includes having many facets.",
      "You're not two-faced—you're multi-dimensional and you show the right dimension in each context.",
      "Your social energy allows you to move between groups and build bridges.",
      'The challenge: people might wonder which version is "real."',
      "You're most alive when you're in the thick of social complexity.",
    ],
    emotionalExperience:
      "Social contexts feel like a game you understand. You navigate them with ease and pleasure.",
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
      "Build a few deep relationships where you don't shift. You need some stability.",
      "Be transparent about your fluidity. Help people understand it's not fakeness.",
      "Remember that your shapeshifting skills serve others best when they know who you fundamentally are.",
      "Find causes or people you're loyal to underneath your fluidity.",
      "Remember: your social skill is valuable. Use it to connect, not to manipulate.",
    ],
    closingLine:
      "Your social fluidity is a gift. Let at least some people know your core underneath.",
  },

  "balanced-mind": {
    id: "balanced-mind",
    family: "adapters",
    title: "The Balanced Mind",
    tagline: "You live in the middle ground with ease.",
    shortDesc:
      "You're not extreme in any direction. You balance thinking and feeling, action and reflection, social and solitary. You're the stabilizing force in chaotic situations because you don't get pulled to extremes. Your equilibrium is rare. You're the voice of moderation and sense.",
    deepDesc: [
      "You naturally find the middle path. Extremes don't appeal to you.",
      "Your balance makes you steady and reliable in the midst of chaos.",
      "You can understand extreme positions because you're not trapped in any.",
      "The challenge: your balance can look like passivity or indecision to extreme people.",
      "You're most satisfied when things are running smoothly and everyone's balanced.",
    ],
    emotionalExperience:
      "You feel fine most of the time. Stability is your comfort zone.",
    strengths: [
      "Balance",
      "Stability",
      "Understanding perspectives",
      "Moderation",
      "Equilibrium",
    ],
    blindSpots: ["Passion", "Taking sides", "Decisive commitment", "Intensity"],
    actions: [
      "Remember that balance doesn't mean not taking a stand. Know what you stand for.",
      "Don't confuse your balance with lack of conviction. Seek conviction without extremism.",
      "Use your balance to help others find their center, not to stay centered yourself.",
      "Find something that ignites passion in you, even if it's not extreme.",
      "Remember: balance is valuable. Use it as a platform to stand for something.",
    ],
    closingLine:
      "Your balance steadies others. Use it as a foundation to move toward what matters.",
  },

  "flow-seeker": {
    id: "flow-seeker",
    family: "adapters",
    title: "The Flow Seeker",
    tagline: "You seek states of harmony and effortless action.",
    shortDesc:
      "You're happiest when you're in flow—when action and intention align perfectly. You don't force things. You move with what's natural and easy. You trust the process more than the plan. Your ease is not laziness—it's alignment. You navigate life more gracefully than most.",
    deepDesc: [
      "You understand that struggle usually means misalignment, not lack of effort.",
      "When you're in flow, you can move mountains without it feeling like work.",
      "You're intuitive about when to push and when to be patient.",
      "The challenge: you can avoid necessary struggle by seeking only comfortable flow.",
      "You're most alive when everything is aligned and moving smoothly.",
    ],
    emotionalExperience:
      "You feel satisfied when things are flowing. Resistance creates discomfort for you.",
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
      "Know that not all necessary things are in flow. Sometimes you have to push.",
      "Develop the capacity to be uncomfortable and still move forward.",
      "Help others find flow, but don't make them feel bad for struggling.",
      "Trust your alignment instinct, but verify with logic sometimes.",
      "Remember: flow is valuable. Use it toward meaningful goals, not just comfortable ones.",
    ],
    closingLine:
      "Your ease of movement is beautiful. Make sure it's moving toward something that matters.",
  },

  "situational-thinker": {
    id: "situational-thinker",
    family: "adapters",
    title: "The Situational Thinker",
    tagline: "You assess each situation freshly without rigid rules.",
    shortDesc:
      "You don't approach life with a one-size-fits-all philosophy. Each situation is different, and you respond accordingly. Your thinking is contextual and nuanced. You're not bound by rigid principles. Your flexibility in judgment is a strength. You find smart solutions that fit the actual situation.",
    deepDesc: [
      "You understand that rigid rules miss important context.",
      "Your ability to assess situations freshly gives you flexibility others lack.",
      "You can hold multiple perspectives simultaneously without needing to resolve them.",
      "The challenge: people might see you as unprincipled when you're actually principled but flexible.",
      "You're most satisfied when you find solutions that actually fit the real situation.",
    ],
    emotionalExperience:
      "You feel comfortable with complexity and nuance. Binary thinking feels naive to you.",
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
      "Clarify your core principles so people know what you actually stand for.",
      "Use your contextual thinking to solve problems, not to avoid commitments.",
      "Help others understand that flexibility doesn't mean having no values.",
      "Find situations where your contextual thinking creates good outcomes.",
      "Remember: your nuance is valuable. Help others understand your logic.",
    ],
    closingLine:
      "Your contextual thinking solves real problems. Help others understand your principles.",
  },

  "calm-adjuster": {
    id: "calm-adjuster",
    family: "adapters",
    title: "The Calm Adjuster",
    tagline: "You adjust calmly to change and help others find steady ground.",
    shortDesc:
      "Change doesn't rattle you. You approach shifts with pragmatism and calm. You adjust to new circumstances without drama or complaint. People feel steadier around you because you handle change with grace. Your calm is your stability tool. You're the ballast.",
    deepDesc: [
      "You don't resist change. You assess it and adjust.",
      "Your calmness in transition helps others feel safe.",
      "You don't need things to stay the same to feel grounded.",
      "The challenge: you can seem like you don't care. Your calm adjustment might look like indifference.",
      "You're most satisfied when everyone around you has adjusted smoothly.",
    ],
    emotionalExperience:
      "You feel grounded even when everything's shifting. Change is normal, not threatening.",
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
      "Show that your calm includes caring about outcomes, not just acceptance.",
      "Sometimes advocating for your preferences is healthy, not disruptive.",
      "Help others feel your stability. They need to know you're steady, not indifferent.",
      "Find something worth adapting toward, not just away from.",
      "Remember: your calm is powerful. Make sure it includes intentional choice.",
    ],
    closingLine:
      "Your calm steadies others through change. Make sure you're also steering toward something.",
  },

  "flexible-strategist": {
    id: "flexible-strategist",
    family: "adapters",
    title: "The Flexible Strategist",
    tagline: "You strategy plan with flexibility built in.",
    shortDesc:
      "You think strategically, but you're not rigid about it. You build flexibility into your plans. You can commit to a direction while adjusting the path. You balance structure with flow. Your approach is both thoughtful and adaptive. You create strategies that actually work in the real world.",
    deepDesc: [
      "You understand that the best strategy includes flexibility.",
      "You can commit to long-term direction while being short-term flexible.",
      "Your ability to pivot without losing vision serves you well.",
      "The challenge: people might not see your strategy because it looks flexible.",
      "You're most satisfied when your flexible strategy achieves the long-term goal.",
    ],
    emotionalExperience:
      "You feel confident moving forward with your strategy, knowing you'll adjust as needed.",
    strengths: [
      "Strategic thinking",
      "Flexibility",
      "Adaptive planning",
      "Long-term vision",
      "Real-world execution",
    ],
    blindSpots: [
      "Rigorous planning",
      "Following the exact plan",
      "Clear predetermined paths",
      "Detailed prediction",
    ],
    actions: [
      "Make your strategy explicit so others understand where you're heading.",
      "Build your team with people who appreciate flexible strategy.",
      "Use your flexibility to test and learn, not to avoid commitment.",
      "Remember that flexible strategy still needs clear direction.",
      "Remember: your approach works. Help others understand your thinking.",
    ],
    closingLine:
      "Your flexible strategy works in the real world. Lead others with clarity and adaptability.",
  },

  "quiet-observer": {
    id: "quiet-observer",
    family: "adapters",
    title: "The Quiet Observer",
    tagline: "You understand through observation and accept what you see.",
    shortDesc:
      "You notice things. You watch, understand, and accept without needing to change everything. You're the person who sees clearly and says little. Your quiet presence and understanding are more valuable than active intervention. You're comfortable on the sidelines, understanding the whole picture.",
    deepDesc: [
      "Your observation gives you clarity that active people miss.",
      "You understand systems and people through patient watching.",
      "Your acceptance doesn't mean approval—it means clear sight.",
      "The challenge: useful insights stay locked in your mind. Share them.",
      "You're most satisfied when you understand something deeply.",
    ],
    emotionalExperience:
      "You feel at ease observing. You don't need to be in the center to feel satisfied.",
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
      "Share your observations with people who will listen.",
      "Remember that observation is valuable only if it leads somewhere.",
      "Get involved sometimes. The world needs your perspective in action.",
      "Build trust with one person. Share your sight with them.",
      "Remember: your clarity is valuable. Let it inform your choices.",
    ],
    closingLine:
      "Your clear sight is precious. Let it guide your actions, not just your thoughts.",
  },

  // STRUGGLERS (8 types)
  "overthinking-prisoner": {
    id: "overthinking-prisoner",
    family: "strugglers",
    title: "The Overthinking Prisoner",
    tagline: "Your mind runs in circles when it should be moving.",
    shortDesc:
      "You think deeply, but sometimes that thinking becomes a trap. You analyze, then analyze your analysis. Decisions paralyze you because you've imagined too many outcomes. Your mind is your prison. You know what's happening, but you can't seem to stop. ",
    deepDesc: [
      "Your reflection is a strength, but it's become a cage.",
      "You can see the patterns in your overthinking, but seeing doesn't stop it.",
      'You hold yourself hostage with "what ifs" and possible outcomes.',
      "The good news: you can escape this. It starts with deciding to move even when uncertain.",
      "You're stuck not because you're broken, but because you've confused thinking with deciding.",
    ],
    emotionalExperience:
      "You feel stuck between analysis and decision. Movement feels impossible.",
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
      "Set a deadline for decisions. Analyze until the deadline, then decide.",
      "Accept that no decision is perfect. Good enough and done beats perfect and never.",
      "Practice moving with 70% information. You'll learn the rest as you go.",
      "Track your overthinking. Notice when you're analyzing versus when you're repeating.",
      "Find someone who can help you move. Sometimes you need external push.",
    ],
    closingLine:
      "Your mind is intelligent. Use it to decide, not to imprison yourself.",
  },

  "self-doubter": {
    id: "self-doubter",
    family: "strugglers",
    title: "The Self Doubter",
    tagline: "You question yourself and your abilities constantly.",
    shortDesc:
      "You have abilities, but self-doubt whispers that you're not enough. You achieve things, but then minimize them. You're capable, but you don't feel capable. Your doubt is louder than your evidence. You're stuck in a gap between who you are and who you believe you are.",
    deepDesc: [
      "Your self-doubt isn't based on actual inability—it's based on internal messaging.",
      "Others see your capability. You see your limitations.",
      "You carry evidence of success but are unconvinced.",
      "The good news: this gap is closeable. It starts with accepting your doubt while moving anyway.",
      "You're not broken. You're just running an old program that no longer serves you.",
    ],
    emotionalExperience:
      "You feel small and uncertain even when objective evidence suggests otherwise.",
    strengths: [
      "Humility",
      "Willingness to improve",
      "Capacity for growth",
      "Self-awareness",
    ],
    blindSpots: ["Self-belief", "Taking credit", "Confidence", "Risk-taking"],
    actions: [
      "Keep evidence of your successes. Review them when doubt arrives.",
      "Accept doubt as a feeling, not a fact. You can feel doubt and act anyway.",
      "Take action despite doubt. Your confidence grows through action, not before it.",
      "Find people who believe in you. Their belief helps build yours.",
      "Celebrate small wins. You earn confidence through visible progress.",
    ],
    closingLine:
      "Your doubt is real, but it doesn't have to be true. Move forward anyway.",
  },

  "hidden-potential": {
    id: "hidden-potential",
    family: "strugglers",
    title: "The Hidden Potential",
    tagline: "You have capability that you're not expressing.",
    shortDesc:
      "You feel like you could do much more, but something blocks you. You have ideas and ability, but they don't translate into action. You envision bigger things than you're creating. You're like a car with the parking brake on. The capacity is there. The expression is stuck.",
    deepDesc: [
      "Your potential isn't hidden—it's blocked. Somewhere between vision and action, something stops you.",
      "You're not lazy. You're not incapable. Something is getting in the way.",
      "Others see your potential and wonder why you're not running with it.",
      "The good news: releasing potential is often simpler than building it.",
      "You're not broken. You're just not expressing what's already there.",
    ],
    emotionalExperience:
      "You feel frustrated by the gap between what could be and what is.",
    strengths: [
      "Inner potential",
      "Vision",
      "Capability",
      "Self-awareness of possibility",
    ],
    blindSpots: [
      "Execution",
      "Taking action",
      "Releasing blockers",
      "Expression",
    ],
    actions: [
      "Identify what blocks your expression. Is it fear? Discipline? Permission?",
      "Start small. Release potential in small ways before big ones.",
      "Find someone who believes in your potential. Share it with them.",
      "Do one thing today that expresses your hidden potential.",
      "Remember: potential expressed is more valuable than potential hidden.",
    ],
    closingLine: "Your potential is real. Start expressing it today.",
  },

  "inner-conflict": {
    id: "inner-conflict",
    family: "strugglers",
    title: "The Inner Conflict",
    tagline: "You're at war with yourself.",
    shortDesc:
      "Different parts of you want different things. Your head says one thing, your heart another. You don't lack capacity—you lack alignment. You're fighting yourself, which leaves you exhausted and stuck. Your journey is learning to integrate these conflicting parts.",
    deepDesc: [
      "You're not crazy. You're just hosting contradictions.",
      "Part of you has legitimate needs that conflict with other legitimate needs.",
      "Your struggle isn't weakness—it's complexity.",
      "The good news: integration is possible. It starts with accepting all parts.",
      "You're not broken. You're in the process of becoming whole.",
    ],
    emotionalExperience:
      "You feel torn, exhausted, and confused about who you actually are.",
    strengths: ["Self-awareness", "Complexity", "Nuance", "Depth"],
    blindSpots: [
      "Integration",
      "Self-acceptance",
      "Taking a direction",
      "Wholeness",
    ],
    actions: [
      "Stop fighting your internal contradictions and start listening to them.",
      "What is each conflicting part trying to protect or achieve?",
      "Find the integration point where multiple needs can be honored.",
      "Work with a therapist or coach. Integration is often easier with help.",
      "Remember: your contradictions are trying to make you whole, not crazy.",
    ],
    closingLine: "Your conflict is real and valid. Integration is possible.",
  },

  "burnout-survivor": {
    id: "burnout-survivor",
    family: "strugglers",
    title: "The Burnout Survivor",
    tagline: "You've run yourself empty and you're trying to rebuild.",
    shortDesc:
      "You pushed hard, then pushed harder, until you broke. Now you're trying to rebuild, but you're scared and depleted. You're capable and disciplined, but your system overheated. You're learning the hard way that there are limits. You're rebuilding differently now.",
    deepDesc: [
      "You weren't failed by lack of effort. You failed by ignoring limits.",
      "Your recovery is evidence of your strength, not your weakness.",
      "You're wiser now. You've learned what costs more than it's worth.",
      "The good news: burnout survivors have hard-won wisdom about what actually matters.",
      "You're not struggling now because you're weak. You're rebuilding because you're smart.",
    ],
    emotionalExperience:
      "You feel exhausted, wary, and cautious about committing hard again.",
    strengths: ["Awareness of limits", "Wisdom", "Resilience", "Perspective"],
    blindSpots: ["Trust in yourself", "Energy", "Ambition", "Forward momentum"],
    actions: [
      "Rest isn't laziness. Rest is the foundation of sustainable progress.",
      "Set boundaries that protect you, not limits that confine you.",
      "Start rebuilding slowly. Sustainable beats spectacular every time.",
      "Help others learn from your burnout before they burn out.",
      "Remember: you can be both ambitious and sustainable. You're learning how.",
    ],
    closingLine: "Your recovery is your greatest achievement. Protect it.",
  },

  "lost-direction": {
    id: "lost-direction",
    family: "strugglers",
    title: "The Lost Direction",
    tagline: "You don't know where you're heading or why.",
    shortDesc:
      "You're moving, but you're not sure why or toward what. Life is happening, and you're passive in it. You lack clear direction or purpose. Others seem to have a compass, but yours is spinning. You're capable, but capability without direction is just motion.",
    deepDesc: [
      "You're not broken. You're just not connected to what matters.",
      "Direction comes from knowing what matters, not from external instruction.",
      "You can build a direction, but it starts with paying attention to yourself.",
      "The good news: you already have the tools to find direction. You've just stopped using them.",
      "You're stuck not because you lack potential, but because you lack connection.",
    ],
    emotionalExperience:
      "You feel wandering, unmotivated, and uncertain about what to work toward.",
    strengths: [
      "Openness",
      "Flexibility",
      "Lack of attachment to wrong path",
      "Starting fresh",
    ],
    blindSpots: ["Purpose", "Direction", "Commitment", "Knowing what matters"],
    actions: [
      "Start noticing what pulls your attention. What do you think about? What matters to you?",
      "Give yourself permission to want things. Direction comes from knowing what you want.",
      "Try different paths without judgment. Direction builds through exploration.",
      "Connect with people who know what they want. Their clarity might inspire yours.",
      "Remember: direction is found through attention to yourself, not external direction.",
    ],
    closingLine:
      "Your direction is waiting inside you. Start paying attention.",
  },

  "emotional-reactor": {
    id: "emotional-reactor",
    family: "strugglers",
    title: "The Emotional Reactor",
    tagline: "Your emotions run you instead of you running them.",
    shortDesc:
      "You feel sharply and react quickly. Your emotions drive your behavior before you can think. You're not stable—you're reactive. You're capable of anything in the moment, but you regret your reactions later. You're trying to catch up with yourself. Your emotions are your terrain to master.",
    deepDesc: [
      "Your reactivity isn't weakness. It's sensitivity without the tools to manage it.",
      "You're not broken. You're just running an old wiring system.",
      "Your intense emotion is real and valid. The challenge is choosing your response.",
      "The good news: emotional regulation is learnable. It starts with awareness.",
      "You're trying to navigate the world without the tools you need.",
    ],
    emotionalExperience:
      "Your emotions feel bigger than you. You're at their mercy, not in charge.",
    strengths: ["Authenticity", "Sensitivity", "Passion", "Depth of feeling"],
    blindSpots: [
      "Regulation",
      "Response control",
      "Considering consequences",
      "Calmness",
    ],
    actions: [
      "Develop regulation tools. Therapy, mindfulness, exercise, or coached breathing help.",
      "Notice the gap between feeling and reacting. That gap is where your power is.",
      "Take a pause before responding to big emotions. Even 10 seconds helps.",
      "Find people who understand your reactivity and help you stay grounded.",
      "Remember: your emotions are valid. Your reactions are choices. Learn the difference.",
    ],
    closingLine:
      "Your emotions are powerful. Learn to channel them instead of being run by them.",
  },

  "drained-mind": {
    id: "drained-mind",
    family: "strugglers",
    title: "The Drained Mind",
    tagline: "You feel exhausted even when you've done nothing.",
    shortDesc:
      "You're tired in bones-deep ways. You think too much, feel too much, connect too much, and you're paying the price in exhaustion. You're capable and caring, but you're not recovering. You're stuck in a cycle of depletion. Your challenge is figuring out how to stop the drain.",
    deepDesc: [
      "You're not depressed necessarily—you're just exhausted by the way you process life.",
      "Your awareness and sensitivity, while valuable, costs you energy.",
      "You give a lot to others and yourself, with little refueling.",
      "The good news: energy management is learnable. It starts with protecting boundaries.",
      "You're not failing. You're just running an unsustainable pattern.",
    ],
    emotionalExperience:
      "You feel tired even at rest. Life feels like it's requiring more energy than you have.",
    strengths: ["Awareness", "Sensitivity", "Caring", "Depth"],
    blindSpots: ["Boundaries", "Saying no", "Resting", "Self-protection"],
    actions: [
      "Build non-negotiable rest time. This isn't optional—it's essential.",
      "Examine your commitments. You probably can't do all of them.",
      "Set boundaries that protect your energy. No feels more responsible than overcommitting.",
      "Find people who understand your depletion and help you rest.",
      "Remember: you can't pour from an empty cup. Rest is not selfish.",
    ],
    closingLine: "Your depletion is real. Protect your energy fiercely.",
  },
};

export function getTypeDescription(
  typeId: string,
): PersonalityType | undefined {
  return PERSONALITY_TYPES[typeId];
}

export function getAllTypes(): PersonalityType[] {
  return Object.values(PERSONALITY_TYPES);
}

export function getTypesByFamily(family: PersonalityFamily): PersonalityType[] {
  return Object.values(PERSONALITY_TYPES).filter((t) => t.family === family);
}
