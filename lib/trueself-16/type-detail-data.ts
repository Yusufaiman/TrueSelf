import type {
  AxisKey,
  AxisPole,
  TrueSelf16Profile,
  TypeCode,
  TypeFamily,
} from "./types";
import { TYPE_FAMILIES, TYPE_FAMILY_BY_CODE } from "./layers";

export type DetailCard = {
  title: string;
  text: string;
};

export type HealthyMapping = {
  tendency: string;
  healthy: string;
  overextended: string;
};

export type AxisStructure = {
  axis: AxisKey;
  label: string;
  left: AxisPole;
  right: AxisPole;
  preferred: AxisPole;
  preferredLabel: string;
  description: string;
};

export type TypeDetailData = {
  overview: {
    summary: string;
    description: string;
    tendencies: string[];
  };
  analytics: {
    axes: AxisStructure[];
    family: {
      code: TypeFamily;
      name: string;
      description: string;
    };
    preferenceDescriptions: DetailCard[];
  };
  background: {
    introduction: string;
    naturalTemperament: string[];
    familyEnvironment: string;
    childhoodRoles: DetailCard[];
    reinforcingEnvironment: string[];
    challengingEnvironment: string[];
    developmentalPaths: DetailCard[];
    natureVsEnvironment: DetailCard[];
  };
  life: {
    relationships: string;
    communication: string;
    friendship: string;
    work: string;
    learning: string;
    stress: DetailCard[];
  };
  growth: {
    strengths: string[];
    blindSpots: DetailCard[];
    healthyVsOverextended: HealthyMapping[];
    growthPath: string[];
    misconceptions: string[];
  };
};

type TypeNotes = {
  tendencies: string[];
  naturalTemperament: string[];
  roles: DetailCard[];
  reinforcing: string[];
  challenging: string[];
  paths: DetailCard[];
  communication: string;
  friendship: string;
  learning: string;
  stress: DetailCard[];
  healthy: HealthyMapping[];
  growth: string[];
  misconceptions: string[];
};

const axisLabels: Record<AxisPole, string> = {
  E: "Extraversion",
  I: "Introversion",
  S: "Sensing",
  N: "Intuition",
  T: "Thinking",
  F: "Feeling",
  J: "Judging",
  P: "Perceiving",
};

const preferenceCopy: Record<AxisPole, string> = {
  E: "Energy tends to move outward through interaction, shared momentum, and external processing.",
  I: "Energy tends to be directed inward and restored through private time, reflection, or lower-stimulation settings.",
  S: "Attention tends to prioritize concrete information, direct experience, details, and practical reality.",
  N: "Attention tends to move toward patterns, possibilities, meanings, and what could develop next.",
  T: "Decisions tend to give strong weight to logic, consistency, principles, and clear analysis.",
  F: "Decisions tend to give strong weight to values, human impact, context, and relational consequences.",
  J: "Life tends to feel easier with structure, closure, plans, and clearer expectations.",
  P: "Life tends to feel easier with flexibility, optionality, adaptation, and room to respond as things unfold.",
};

function axesFor(typeCode: TypeCode): AxisStructure[] {
  const letters = {
    EI: typeCode[0] as AxisPole,
    SN: typeCode[1] as AxisPole,
    TF: typeCode[2] as AxisPole,
    JP: typeCode[3] as AxisPole,
  };

  return [
    {
      axis: "EI",
      label: "Energy",
      left: "E",
      right: "I",
      preferred: letters.EI,
      preferredLabel: axisLabels[letters.EI],
      description: preferenceCopy[letters.EI],
    },
    {
      axis: "SN",
      label: "Information",
      left: "S",
      right: "N",
      preferred: letters.SN,
      preferredLabel: axisLabels[letters.SN],
      description: preferenceCopy[letters.SN],
    },
    {
      axis: "TF",
      label: "Decision",
      left: "T",
      right: "F",
      preferred: letters.TF,
      preferredLabel: axisLabels[letters.TF],
      description: preferenceCopy[letters.TF],
    },
    {
      axis: "JP",
      label: "Life Structure",
      left: "J",
      right: "P",
      preferred: letters.JP,
      preferredLabel: axisLabels[letters.JP],
      description: preferenceCopy[letters.JP],
    },
  ];
}

const familyEnvironment: Record<TypeFamily, string> = {
  NT: "Environments that value independent thinking, competence, debate, experimentation, and strategic problem solving may reinforce Analyst-like preferences. The same family can still develop in warm, practical, artistic, or highly social homes.",
  NF: "Environments that value meaning, emotional awareness, ideals, personal growth, and understanding people may reinforce Diplomat-like preferences. The same pattern can also appear in less emotionally expressive settings.",
  SJ: "Environments that value reliability, responsibility, duty, routine, and practical contribution may reinforce Sentinel-like preferences. This does not mean every Sentinel had the same upbringing or family role.",
  SP: "Environments that value practical action, adaptability, direct experience, independence, and real-time problem solving may reinforce Explorer-like preferences. The same pattern can develop across very different homes and cultures.",
};

const typeNotes: Record<TypeCode, TypeNotes> = {
  ISTJ: {
    tendencies: ["responsible", "observant", "practical", "consistent", "detail-aware", "standards-driven"],
    naturalTemperament: ["may observe before acting", "may notice what is proven and reliable", "may prefer clear expectations", "may remember details and commitments", "may trust practical experience", "may value consistency"],
    roles: [
      { title: "The Responsible One", text: "Some ISTJ-like people may become known for doing what was expected without needing much supervision." },
      { title: "The Rule Keeper", text: "They may feel safer when expectations are explicit and everyone understands the standard." },
      { title: "The Quiet Competent One", text: "They may contribute through reliability rather than constant visibility." },
    ],
    reinforcing: ["clear routines", "stable expectations", "responsibility that is recognized", "respect for precision", "predictable systems"],
    challenging: ["constant improvisation", "unclear rules", "rapid changes without explanation", "careless follow-through", "pressure to abandon proven methods"],
    paths: [
      { title: "Naturally Reinforced", text: "A naturally orderly person may grow more confident when reliability and careful work are appreciated." },
      { title: "Responsibility Adaptation", text: "Repeatedly being trusted with duties may strengthen an existing preference for structure and follow-through." },
      { title: "Contrasting Environment", text: "In chaotic settings, an ISTJ-like person may become even more self-structured internally while appearing reserved or guarded." },
    ],
    communication: "May communicate best with clear facts, direct expectations, and enough time to verify details before committing.",
    friendship: "May prefer dependable friendships built through trust, shared history, and steady support rather than constant novelty.",
    learning: "May learn well through examples, sequence, practice, and clear criteria for what counts as correct or complete.",
    stress: [
      { title: "Reliability", text: "May turn into over-responsibility when too much depends on them." },
      { title: "Detail awareness", text: "May become excessive checking or worry when stakes feel unclear." },
      { title: "Structure", text: "May become resistance when change arrives too quickly." },
    ],
    healthy: [
      { tendency: "Responsible", healthy: "Reliable", overextended: "Overburdened" },
      { tendency: "Detail-aware", healthy: "Thorough", overextended: "Overchecking" },
      { tendency: "Structured", healthy: "Organized", overextended: "Rigid" },
      { tendency: "Practical", healthy: "Grounded", overextended: "Dismissive of new ideas" },
      { tendency: "Consistent", healthy: "Trustworthy", overextended: "Resistant to adaptation" },
    ],
    growth: ["practice flexible planning", "ask for context before rejecting change", "delegate responsibility earlier", "try low-risk experimentation", "name needs before frustration builds"],
    misconceptions: ["Quiet does not mean passive.", "Traditional does not mean unimaginative.", "Structured does not mean incapable of adapting.", "Careful does not mean fearful."],
  },
  ISFJ: {
    tendencies: ["attentive", "dependable", "practical", "considerate", "stability-oriented", "duty-aware"],
    naturalTemperament: ["may observe before acting", "may notice practical details", "may remember personal information", "may prefer familiar routines", "may sense what people need", "may value stability"],
    roles: [
      { title: "The Helper", text: "Some ISFJ-like people may become known for noticing needs and quietly supporting others." },
      { title: "The Reliable One", text: "They may be trusted because they remember promises, routines, and practical details." },
      { title: "The Peacekeeper", text: "They may try to keep the atmosphere steady when people around them feel tense." },
    ],
    reinforcing: ["predictable routines", "clear responsibilities", "stable relationships", "encouragement of helpfulness", "politeness and consistency"],
    challenging: ["constant unpredictability", "unclear expectations", "high interpersonal conflict", "pressure for novelty", "being taken for granted"],
    paths: [
      { title: "Naturally Reinforced", text: "A naturally attentive person may become more confident when care, consistency, and reliability are valued." },
      { title: "Responsibility Adaptation", text: "Being repeatedly rewarded for helping may reinforce practical care and quiet responsibility." },
      { title: "Contrasting Environment", text: "In fast-changing settings, an ISFJ-like person may adapt by becoming externally composed while privately craving steadiness." },
    ],
    communication: "May communicate with care, context, and attention to how words will land. Clear requests and appreciation often help.",
    friendship: "May prefer loyal, emotionally safe friendships where support is mutual and history matters.",
    learning: "May learn best with practical examples, clear steps, repetition, and a sense of why the knowledge is useful.",
    stress: [
      { title: "Caring", text: "May become self-neglect when support is not reciprocated." },
      { title: "Detail memory", text: "May become replaying old concerns or worrying about what was missed." },
      { title: "Loyalty", text: "May make it hard to let go of roles that no longer fit." },
    ],
    healthy: [
      { tendency: "Caring", healthy: "Supportive", overextended: "Self-neglect" },
      { tendency: "Responsible", healthy: "Reliable", overextended: "Over-responsible" },
      { tendency: "Sensitive to others", healthy: "Considerate", overextended: "People-pleasing" },
      { tendency: "Stability-oriented", healthy: "Grounded", overextended: "Resistant to necessary change" },
      { tendency: "Detail-aware", healthy: "Thorough", overextended: "Excessive worry" },
    ],
    growth: ["communicate needs earlier", "practice boundaries without guilt", "allow safe change", "share responsibility", "separate care from obligation"],
    misconceptions: ["Quiet does not mean weak.", "Caring does not mean dependent.", "Structured does not mean incapable of adapting.", "Preferring familiarity does not mean lacking curiosity."],
  },
  INFJ: {
    tendencies: ["insightful", "private", "purpose-driven", "empathetic", "pattern-focused", "idealistic"],
    naturalTemperament: ["may search for meaning early", "may notice emotional undercurrents", "may need private processing", "may imagine long-range outcomes", "may prefer depth over breadth", "may feel pulled toward purpose"],
    roles: [
      { title: "The Insightful Observer", text: "Some INFJ-like people may become known for sensing what is happening beneath the surface." },
      { title: "The Quiet Counselor", text: "They may be approached for emotional insight before they feel fully ready for that role." },
      { title: "The Ideal Bearer", text: "They may hold a private picture of how life or people could become better." },
    ],
    reinforcing: ["space for reflection", "meaningful conversations", "values-based guidance", "creative solitude", "relationships with emotional depth"],
    challenging: ["surface-level environments", "constant noise", "cynicism toward ideals", "emotional chaos", "pressure to be constantly available"],
    paths: [
      { title: "Naturally Reinforced", text: "A reflective, meaning-oriented person may grow confident when insight and empathy are respected." },
      { title: "Responsibility Adaptation", text: "Being relied on emotionally may reinforce the tendency to read people carefully and anticipate needs." },
      { title: "Contrasting Environment", text: "In shallow or chaotic settings, an INFJ-like person may become guarded while privately developing a strong inner vision." },
    ],
    communication: "May communicate best through thoughtful, purposeful conversation and may need time to translate complex impressions into words.",
    friendship: "May prefer a few deep friendships with trust, sincerity, and mutual growth.",
    learning: "May learn well by understanding meaning, patterns, theory, and how ideas connect to human purpose.",
    stress: [
      { title: "Insight", text: "May become over-interpretation when too many signals feel meaningful." },
      { title: "Empathy", text: "May become emotional overload when boundaries are unclear." },
      { title: "Purpose", text: "May become perfectionism when reality does not match the ideal." },
    ],
    healthy: [
      { tendency: "Insightful", healthy: "Perceptive", overextended: "Over-interpreting" },
      { tendency: "Empathic", healthy: "Attuned", overextended: "Emotionally burdened" },
      { tendency: "Purpose-driven", healthy: "Focused", overextended: "Perfectionistic" },
      { tendency: "Private", healthy: "Reflective", overextended: "Withdrawn" },
      { tendency: "Idealistic", healthy: "Visionary", overextended: "Disappointed by reality" },
    ],
    growth: ["test insights in reality", "state needs directly", "build recovery time", "accept imperfect progress", "let trusted people see the process"],
    misconceptions: ["Private does not mean cold.", "Idealistic does not mean impractical.", "Empathic does not mean endlessly available.", "Insightful does not mean always correct."],
  },
  INTJ: {
    tendencies: ["strategic", "independent", "analytical", "future-focused", "system-minded", "self-directed"],
    naturalTemperament: ["may look for systems behind events", "may prefer independent mastery", "may think in long timelines", "may question inefficient methods", "may value competence", "may protect private goals"],
    roles: [
      { title: "The Strategist", text: "Some INTJ-like people may become known for seeing the long game before others do." },
      { title: "The Independent Learner", text: "They may prefer figuring things out privately and trusting their own framework." },
      { title: "The Standards Holder", text: "They may notice weak systems and quietly imagine better ones." },
    ],
    reinforcing: ["autonomy", "intellectual challenge", "respect for competence", "long-term projects", "efficient systems"],
    challenging: ["micromanagement", "illogical rules", "constant emotional pressure", "short-term thinking", "performative teamwork"],
    paths: [
      { title: "Naturally Reinforced", text: "A strategic child may grow confident when independent thinking and planning are encouraged." },
      { title: "Responsibility Adaptation", text: "Repeatedly solving complex problems alone may reinforce self-reliance and high standards." },
      { title: "Contrasting Environment", text: "In chaotic environments, an INTJ-like person may retreat into planning and internal control to create predictability." },
    ],
    communication: "May communicate in concise, strategic, and solution-focused ways. They may need reminders that emotional context also carries information.",
    friendship: "May prefer friendships built on respect, competence, honesty, and shared long-term interests.",
    learning: "May learn best through frameworks, independent research, complex problems, and understanding the underlying system.",
    stress: [
      { title: "Strategy", text: "May become over-control when outcomes feel threatened." },
      { title: "Independence", text: "May become isolation when support would help." },
      { title: "Standards", text: "May become impatience with slower processes." },
    ],
    healthy: [
      { tendency: "Strategic", healthy: "Visionary", overextended: "Controlling" },
      { tendency: "Analytical", healthy: "Clear-thinking", overextended: "Over-critical" },
      { tendency: "Independent", healthy: "Self-directed", overextended: "Isolated" },
      { tendency: "Future-focused", healthy: "Prepared", overextended: "Detached from present needs" },
      { tendency: "High standards", healthy: "Excellent", overextended: "Impatient" },
    ],
    growth: ["invite feedback earlier", "communicate the why", "practice emotional patience", "build collaborative trust", "leave room for imperfect data"],
    misconceptions: ["Reserved does not mean uncaring.", "Strategic does not mean manipulative.", "Independent does not mean anti-social.", "Direct does not mean hostile."],
  },
  ISTP: {
    tendencies: ["hands-on", "observant", "calm", "independent", "practical", "adaptive"],
    naturalTemperament: ["may learn by testing", "may notice how things work", "may stay calm in practical problems", "may prefer freedom", "may avoid unnecessary talk", "may trust direct experience"],
    roles: [
      { title: "The Troubleshooter", text: "Some ISTP-like people may become useful when something practical needs fixing." },
      { title: "The Quiet Observer", text: "They may watch first, understand the mechanism, then act." },
      { title: "The Independent Operator", text: "They may prefer solving problems without too many instructions." },
    ],
    reinforcing: ["hands-on learning", "freedom to experiment", "practical challenges", "low-pressure independence", "quick feedback"],
    challenging: ["emotional intensity", "excessive rules", "long theoretical discussions", "micromanagement", "forced disclosure"],
    paths: [
      { title: "Naturally Reinforced", text: "A practical experimenter may become confident when direct problem solving is encouraged." },
      { title: "Responsibility Adaptation", text: "Being useful in urgent situations may strengthen calm, independent action." },
      { title: "Contrasting Environment", text: "In highly emotional settings, an ISTP-like person may look detached while trying to stay internally steady." },
    ],
    communication: "May communicate through concise observations and practical suggestions rather than extended emotional processing.",
    friendship: "May value low-pressure friendships with freedom, shared activities, and respect for space.",
    learning: "May learn best through trial, tools, examples, and solving a real problem rather than absorbing abstract theory first.",
    stress: [
      { title: "Calm", text: "May become emotional detachment when feelings need attention." },
      { title: "Independence", text: "May become avoidance of help." },
      { title: "Action focus", text: "May become impatience with slower reflection." },
    ],
    healthy: [
      { tendency: "Practical", healthy: "Resourceful", overextended: "Dismissive of emotion" },
      { tendency: "Calm", healthy: "Composed", overextended: "Detached" },
      { tendency: "Independent", healthy: "Self-sufficient", overextended: "Hard to reach" },
      { tendency: "Adaptive", healthy: "Flexible", overextended: "Noncommittal" },
      { tendency: "Observant", healthy: "Precise", overextended: "Overly skeptical" },
    ],
    growth: ["name emotions simply", "share reasoning before acting", "commit to key responsibilities", "practice patience with people processes", "ask for support before withdrawing"],
    misconceptions: ["Calm does not mean emotionless.", "Independent does not mean uncaring.", "Practical does not mean shallow.", "Quiet does not mean disengaged."],
  },
  ISFP: {
    tendencies: ["authentic", "gentle", "sensory-aware", "values-led", "adaptable", "quietly expressive"],
    naturalTemperament: ["may notice beauty and tone", "may move by personal values", "may prefer gentle environments", "may resist being boxed in", "may learn through experience", "may express through action or taste"],
    roles: [
      { title: "The Quiet Individualist", text: "Some ISFP-like people may protect a private sense of identity even when they seem easygoing." },
      { title: "The Gentle Presence", text: "They may bring calm, acceptance, and sensitivity to the room." },
      { title: "The Taste Maker", text: "They may notice aesthetic, emotional, or sensory details others miss." },
    ],
    reinforcing: ["creative freedom", "emotional gentleness", "respect for individuality", "hands-on expression", "room to choose"],
    challenging: ["harsh criticism", "rigid expectations", "values conflict", "pressure to perform", "overly abstract environments"],
    paths: [
      { title: "Naturally Reinforced", text: "A sensitive, values-led person may flourish when individuality and craft are respected." },
      { title: "Responsibility Adaptation", text: "Being rewarded for being agreeable may reinforce gentleness, while private values remain strong." },
      { title: "Contrasting Environment", text: "In rigid settings, an ISFP-like person may comply externally while seeking private ways to stay authentic." },
    ],
    communication: "May communicate softly, personally, and through concrete examples. Harsh or overly forceful dialogue may shut them down.",
    friendship: "May prefer accepting friendships with emotional safety, shared experiences, and space to be authentic.",
    learning: "May learn well through practice, examples, sensory engagement, and personal relevance.",
    stress: [
      { title: "Gentleness", text: "May become avoidance when conflict needs to be addressed." },
      { title: "Values", text: "May become quiet stubbornness when authenticity feels threatened." },
      { title: "Flexibility", text: "May become difficulty building structure." },
    ],
    healthy: [
      { tendency: "Authentic", healthy: "Principled", overextended: "Withdrawn in disagreement" },
      { tendency: "Gentle", healthy: "Kind", overextended: "Conflict-avoidant" },
      { tendency: "Sensory-aware", healthy: "Present", overextended: "Distracted by comfort" },
      { tendency: "Flexible", healthy: "Adaptable", overextended: "Unstructured" },
      { tendency: "Values-led", healthy: "Sincere", overextended: "Hard to influence" },
    ],
    growth: ["communicate values directly", "build supportive routines", "practice constructive conflict", "turn taste into visible work", "separate criticism from rejection"],
    misconceptions: ["Gentle does not mean weak.", "Flexible does not mean careless.", "Private values do not mean no opinions.", "Creative does not mean unrealistic."],
  },
  INFP: {
    tendencies: ["values-led", "imaginative", "reflective", "empathetic", "idealistic", "meaning-seeking"],
    naturalTemperament: ["may feel guided by inner values", "may imagine better possibilities", "may need private emotional processing", "may care about authenticity", "may notice mismatches between ideals and reality", "may prefer meaningful work"],
    roles: [
      { title: "The Idealist", text: "Some INFP-like people may carry a private sense of how things should feel or become." },
      { title: "The Mediator", text: "They may try to understand multiple emotional realities before deciding." },
      { title: "The Quiet Dreamer", text: "They may develop a rich inner world before showing it outwardly." },
    ],
    reinforcing: ["creative space", "emotional validation", "moral reflection", "imagination", "meaningful autonomy"],
    challenging: ["cynicism", "constant practicality without meaning", "harsh judgment", "pressure to conform", "rushed decisions"],
    paths: [
      { title: "Naturally Reinforced", text: "A values-led dreamer may become confident when imagination and authenticity are supported." },
      { title: "Responsibility Adaptation", text: "Being asked to understand others may reinforce empathy and mediation." },
      { title: "Contrasting Environment", text: "In highly pragmatic settings, an INFP-like person may appear quiet while privately protecting ideals." },
    ],
    communication: "May communicate with nuance, sincerity, and concern for meaning. They may need time to find exact words for inner experience.",
    friendship: "May prefer emotionally honest friendships with acceptance, imagination, and room for individuality.",
    learning: "May learn best when material connects to meaning, values, story, or a bigger human question.",
    stress: [
      { title: "Idealism", text: "May become disappointment when reality feels too compromised." },
      { title: "Empathy", text: "May become emotional absorption." },
      { title: "Reflection", text: "May become overthinking and delayed action." },
    ],
    healthy: [
      { tendency: "Values-led", healthy: "Authentic", overextended: "Overly idealistic" },
      { tendency: "Imaginative", healthy: "Creative", overextended: "Unanchored" },
      { tendency: "Empathic", healthy: "Compassionate", overextended: "Emotionally overwhelmed" },
      { tendency: "Reflective", healthy: "Self-aware", overextended: "Stuck in thought" },
      { tendency: "Meaning-seeking", healthy: "Purposeful", overextended: "Dissatisfied with ordinary tasks" },
    ],
    growth: ["turn values into small actions", "build practical follow-through", "practice direct requests", "accept imperfect progress", "ground imagination in routines"],
    misconceptions: ["Sensitive does not mean fragile.", "Idealistic does not mean naive.", "Private does not mean disengaged.", "Flexible does not mean lacking conviction."],
  },
  INTP: {
    tendencies: ["analytical", "curious", "independent", "precise", "conceptual", "questioning"],
    naturalTemperament: ["may ask why systems work", "may prefer internal logic", "may need room to think", "may enjoy abstract models", "may question assumptions", "may detach to analyze"],
    roles: [
      { title: "The Questioner", text: "Some INTP-like people may become known for asking the question others skipped." },
      { title: "The Theory Builder", text: "They may privately build frameworks to make sense of complex ideas." },
      { title: "The Detached Observer", text: "They may step back emotionally to understand the structure of a problem." },
    ],
    reinforcing: ["intellectual freedom", "complex problems", "tolerance for questions", "independent study", "precision over speed"],
    challenging: ["forced certainty", "social pressure", "unquestioned rules", "emotional urgency", "repetitive execution"],
    paths: [
      { title: "Naturally Reinforced", text: "A conceptually curious person may grow confident when questioning and independent analysis are supported." },
      { title: "Responsibility Adaptation", text: "Being valued for clever solutions may reinforce mental independence and precision." },
      { title: "Contrasting Environment", text: "In emotionally demanding settings, an INTP-like person may appear distant while trying to think clearly." },
    ],
    communication: "May communicate through analysis, caveats, and exact definitions. They may need reminders that emotional clarity can matter as much as logical clarity.",
    friendship: "May prefer friendships with intellectual freedom, low pressure, humor, and respect for solitude.",
    learning: "May learn best through theory, systems, debate, independent research, and time to understand the underlying logic.",
    stress: [
      { title: "Analysis", text: "May become paralysis when action is needed." },
      { title: "Precision", text: "May become nitpicking under pressure." },
      { title: "Independence", text: "May become emotional disconnection." },
    ],
    healthy: [
      { tendency: "Analytical", healthy: "Clear-minded", overextended: "Overthinking" },
      { tendency: "Precise", healthy: "Accurate", overextended: "Nitpicky" },
      { tendency: "Independent", healthy: "Original", overextended: "Detached" },
      { tendency: "Curious", healthy: "Inventive", overextended: "Scattered" },
      { tendency: "Questioning", healthy: "Insightful", overextended: "Overly skeptical" },
    ],
    growth: ["ship imperfect ideas", "practice emotional presence", "build execution habits", "explain conclusions simply", "ask what people need, not only what is true"],
    misconceptions: ["Logical does not mean emotionless.", "Quiet does not mean uninterested.", "Questioning does not mean negative.", "Flexible does not mean unreliable."],
  },
  ESTP: {
    tendencies: ["bold", "practical", "energetic", "adaptable", "direct", "action-oriented"],
    naturalTemperament: ["may react quickly to the moment", "may learn by doing", "may enjoy direct challenge", "may read immediate opportunities", "may prefer action over theory", "may stay energized by movement"],
    roles: [
      { title: "The Operator", text: "Some ESTP-like people may become the person who acts when others hesitate." },
      { title: "The Risk Tester", text: "They may learn limits by engaging with them directly." },
      { title: "The Social Catalyst", text: "They may create energy through direct presence and confidence." },
    ],
    reinforcing: ["active environments", "quick feedback", "competition", "hands-on tasks", "freedom to improvise"],
    challenging: ["slow bureaucracy", "abstract theory without action", "over-control", "long delays", "emotional ambiguity"],
    paths: [
      { title: "Naturally Reinforced", text: "An action-first person may become confident when courage, presence, and practical results are encouraged." },
      { title: "Responsibility Adaptation", text: "Being rewarded for quick solutions may reinforce decisiveness and tactical thinking." },
      { title: "Contrasting Environment", text: "In restrictive environments, an ESTP-like person may appear restless while seeking outlets for autonomy and action." },
    ],
    communication: "May communicate directly, quickly, and concretely. They may respond well to honesty and immediate examples.",
    friendship: "May enjoy active, spontaneous friendships with humor, movement, and direct loyalty.",
    learning: "May learn best through practice, competition, real examples, and immediate application.",
    stress: [
      { title: "Action", text: "May become impulsiveness when reflection is needed." },
      { title: "Confidence", text: "May become dismissiveness of caution." },
      { title: "Adaptability", text: "May become avoidance of long-term consequences." },
    ],
    healthy: [
      { tendency: "Bold", healthy: "Courageous", overextended: "Reckless" },
      { tendency: "Direct", healthy: "Honest", overextended: "Blunt" },
      { tendency: "Practical", healthy: "Resourceful", overextended: "Short-term focused" },
      { tendency: "Adaptive", healthy: "Responsive", overextended: "Impulsive" },
      { tendency: "Energetic", healthy: "Motivating", overextended: "Restless" },
    ],
    growth: ["pause before high-stakes action", "consider long-term effects", "listen before solving", "build consistency", "make space for emotional complexity"],
    misconceptions: ["Bold does not mean careless.", "Practical does not mean unintellectual.", "Direct does not mean unkind.", "Spontaneous does not mean incapable of commitment."],
  },
  ESFP: {
    tendencies: ["expressive", "warm", "present-focused", "adaptable", "socially responsive", "experience-oriented"],
    naturalTemperament: ["may notice mood and atmosphere", "may seek shared experience", "may respond to the present moment", "may bring energy to groups", "may prefer practical expression", "may value enjoyment and connection"],
    roles: [
      { title: "The Energizer", text: "Some ESFP-like people may become the person who brings warmth and movement into a space." },
      { title: "The Connector", text: "They may notice who feels included and who needs encouragement." },
      { title: "The Moment Maker", text: "They may create memorable experiences through presence and responsiveness." },
    ],
    reinforcing: ["social warmth", "creative expression", "hands-on learning", "positive feedback", "room for spontaneity"],
    challenging: ["cold criticism", "rigid routines", "isolation", "overly abstract demands", "lack of appreciation"],
    paths: [
      { title: "Naturally Reinforced", text: "A lively, expressive person may thrive when warmth and practical creativity are welcomed." },
      { title: "Responsibility Adaptation", text: "Being valued for lifting the mood may reinforce social responsiveness and performance." },
      { title: "Contrasting Environment", text: "In emotionally flat settings, an ESFP-like person may tone down expression while still craving connection." },
    ],
    communication: "May communicate warmly, expressively, and through real examples. They may respond well to encouragement and clear emotional tone.",
    friendship: "May prefer active friendships with shared experiences, affection, humor, and visible loyalty.",
    learning: "May learn best through practice, demonstration, interaction, and immediate relevance.",
    stress: [
      { title: "Expressiveness", text: "May become distraction when feelings are intense." },
      { title: "People focus", text: "May become people-pleasing." },
      { title: "Present focus", text: "May avoid difficult long-term planning." },
    ],
    healthy: [
      { tendency: "Warm", healthy: "Encouraging", overextended: "Approval-seeking" },
      { tendency: "Expressive", healthy: "Engaging", overextended: "Distracted" },
      { tendency: "Present", healthy: "Responsive", overextended: "Avoidant of planning" },
      { tendency: "Adaptable", healthy: "Flexible", overextended: "Inconsistent" },
      { tendency: "Social", healthy: "Inclusive", overextended: "Overextended" },
    ],
    growth: ["build planning anchors", "practice saying no", "protect recovery time", "finish before chasing the next experience", "face uncomfortable patterns directly"],
    misconceptions: ["Expressive does not mean shallow.", "Social does not mean always confident.", "Fun-loving does not mean irresponsible.", "Present-focused does not mean lacking depth."],
  },
  ENFP: {
    tendencies: ["enthusiastic", "imaginative", "people-centered", "curious", "values-aware", "possibility-oriented"],
    naturalTemperament: ["may see potential quickly", "may enjoy people and ideas", "may resist being boxed in", "may search for meaning", "may connect across topics", "may feel energized by possibility"],
    roles: [
      { title: "The Possibility Finder", text: "Some ENFP-like people may become known for seeing what something or someone could become." },
      { title: "The Encourager", text: "They may naturally bring emotional energy and belief into people." },
      { title: "The Explorer", text: "They may move between ideas, communities, and interests while searching for aliveness." },
    ],
    reinforcing: ["creative freedom", "encouragement", "variety", "meaningful people", "space to explore"],
    challenging: ["rigid repetition", "cynicism", "micromanagement", "emotionally cold settings", "pressure to choose too early"],
    paths: [
      { title: "Naturally Reinforced", text: "A possibility-oriented person may grow confident when imagination and relational energy are welcomed." },
      { title: "Responsibility Adaptation", text: "Being valued for enthusiasm may reinforce inspiration, encouragement, and quick idea generation." },
      { title: "Contrasting Environment", text: "In rigid settings, an ENFP-like person may appear scattered while trying to protect freedom and meaning." },
    ],
    communication: "May communicate energetically, associatively, and through stories or possibilities. They may need help narrowing ideas into decisions.",
    friendship: "May prefer friendships that feel alive, honest, encouraging, and open to growth.",
    learning: "May learn best through exploration, discussion, meaning, creativity, and connecting ideas across domains.",
    stress: [
      { title: "Possibility", text: "May become idea-hopping when commitment is needed." },
      { title: "Empathy", text: "May become emotional overextension." },
      { title: "Freedom", text: "May resist helpful structure." },
    ],
    healthy: [
      { tendency: "Enthusiastic", healthy: "Inspiring", overextended: "Scattered" },
      { tendency: "Imaginative", healthy: "Creative", overextended: "Unfocused" },
      { tendency: "People-centered", healthy: "Encouraging", overextended: "Overextended" },
      { tendency: "Values-aware", healthy: "Authentic", overextended: "Reactive" },
      { tendency: "Open-ended", healthy: "Flexible", overextended: "Avoidant of closure" },
    ],
    growth: ["choose fewer priorities", "finish meaningful work", "use structure as support", "pause before promising", "turn inspiration into repeatable habits"],
    misconceptions: ["Energetic does not mean unserious.", "Flexible does not mean unreliable.", "Social does not mean emotionally simple.", "Optimistic does not mean unaware of pain."],
  },
  ENTP: {
    tendencies: ["inventive", "quick", "debate-friendly", "curious", "strategic", "possibility-driven"],
    naturalTemperament: ["may challenge assumptions", "may generate alternatives quickly", "may enjoy debate", "may connect unrelated ideas", "may resist stale routines", "may test boundaries intellectually"],
    roles: [
      { title: "The Challenger", text: "Some ENTP-like people may become known for questioning the default option." },
      { title: "The Idea Generator", text: "They may bring many possible angles before committing to one." },
      { title: "The Improviser", text: "They may thrive when a situation needs quick reframing." },
    ],
    reinforcing: ["open debate", "novel problems", "entrepreneurial freedom", "strategic play", "room to experiment"],
    challenging: ["rigid hierarchy", "repetitive maintenance", "punishment for questions", "excessive routine", "emotionally fragile discussion norms"],
    paths: [
      { title: "Naturally Reinforced", text: "A quick, possibility-driven person may become confident when questioning and invention are welcomed." },
      { title: "Responsibility Adaptation", text: "Being rewarded for clever pivots may reinforce improvisation and strategic debate." },
      { title: "Contrasting Environment", text: "In rigid settings, an ENTP-like person may appear provocative while trying to preserve intellectual freedom." },
    ],
    communication: "May communicate through challenge, humor, reframing, and rapid idea testing. They may need to clarify when debate is playful versus serious.",
    friendship: "May prefer friendships with mental energy, banter, freedom, and room for novelty.",
    learning: "May learn best through debate, experimentation, theoretical exploration, and solving unusual problems.",
    stress: [
      { title: "Debate", text: "May become provocation when connection needs care." },
      { title: "Novelty", text: "May become avoidance of maintenance." },
      { title: "Speed", text: "May skip emotional impact." },
    ],
    healthy: [
      { tendency: "Inventive", healthy: "Innovative", overextended: "Distractible" },
      { tendency: "Questioning", healthy: "Insightful", overextended: "Contrarian" },
      { tendency: "Quick", healthy: "Adaptive", overextended: "Impatient" },
      { tendency: "Debate-friendly", healthy: "Mentally engaging", overextended: "Provocative" },
      { tendency: "Possibility-driven", healthy: "Strategic", overextended: "Unfinished" },
    ],
    growth: ["finish selected ideas", "track emotional impact", "practice maintenance", "slow down for clarity", "choose depth after exploration"],
    misconceptions: ["Debate-friendly does not mean hostile.", "Playful does not mean unserious.", "Flexible does not mean incapable of discipline.", "Questioning does not mean disrespect."],
  },
  ESTJ: {
    tendencies: ["direct", "organized", "practical", "decisive", "accountable", "execution-focused"],
    naturalTemperament: ["may organize tasks quickly", "may prefer measurable results", "may speak directly", "may trust proven systems", "may take charge under pressure", "may value accountability"],
    roles: [
      { title: "The Organizer", text: "Some ESTJ-like people may become the person who turns confusion into a plan." },
      { title: "The Director", text: "They may naturally coordinate people, timelines, and standards." },
      { title: "The Enforcer", text: "They may feel responsible for keeping commitments real." },
    ],
    reinforcing: ["clear authority", "measurable goals", "practical responsibility", "respect for discipline", "systems that reward execution"],
    challenging: ["ambiguity", "lack of accountability", "slow consensus", "unstructured creativity", "unclear emotional expectations"],
    paths: [
      { title: "Naturally Reinforced", text: "A decisive organizer may grow confident when leadership and follow-through are respected." },
      { title: "Responsibility Adaptation", text: "Being put in charge repeatedly may reinforce structure, standards, and directness." },
      { title: "Contrasting Environment", text: "In disorganized settings, an ESTJ-like person may become more controlling while trying to create reliability." },
    ],
    communication: "May communicate directly with goals, expectations, and decisions. They may need to leave room for emotional processing.",
    friendship: "May value loyal, practical friendships built on reliability, honesty, and shared commitments.",
    learning: "May learn best through practical goals, structure, examples, measurable progress, and immediate application.",
    stress: [
      { title: "Leadership", text: "May become over-directing when outcomes feel threatened." },
      { title: "Standards", text: "May become impatience with people's process." },
      { title: "Efficiency", text: "May overlook emotional nuance." },
    ],
    healthy: [
      { tendency: "Organized", healthy: "Effective", overextended: "Controlling" },
      { tendency: "Direct", healthy: "Clear", overextended: "Harsh" },
      { tendency: "Responsible", healthy: "Accountable", overextended: "Overbearing" },
      { tendency: "Practical", healthy: "Grounded", overextended: "Dismissive of nuance" },
      { tendency: "Decisive", healthy: "Action-oriented", overextended: "Rushed" },
    ],
    growth: ["ask before directing", "include emotional context", "practice flexible standards", "listen for hidden constraints", "delegate without micromanaging"],
    misconceptions: ["Direct does not mean uncaring.", "Structured does not mean inflexible.", "Leadership does not mean needing control.", "Practical does not mean unimaginative."],
  },
  ESFJ: {
    tendencies: ["warm", "responsible", "socially aware", "supportive", "organized", "community-minded"],
    naturalTemperament: ["may notice group needs", "may value belonging", "may remember social details", "may organize support", "may prefer harmony", "may feel responsible for people"],
    roles: [
      { title: "The Connector", text: "Some ESFJ-like people may become the person who keeps people included and informed." },
      { title: "The Care Coordinator", text: "They may organize practical support when someone needs help." },
      { title: "The Social Steward", text: "They may protect rituals, relationships, and shared expectations." },
    ],
    reinforcing: ["family rituals", "community contribution", "recognition for care", "clear social expectations", "cooperative environments"],
    challenging: ["social coldness", "unspoken conflict", "individualism without reciprocity", "chaotic expectations", "lack of appreciation"],
    paths: [
      { title: "Naturally Reinforced", text: "A socially attentive person may grow confident when warmth, care, and community are valued." },
      { title: "Responsibility Adaptation", text: "Being expected to support others may reinforce care coordination and responsibility." },
      { title: "Contrasting Environment", text: "In emotionally distant settings, an ESFJ-like person may work harder to create belonging." },
    ],
    communication: "May communicate warmly, practically, and with attention to the relationship. They may appreciate clarity and reassurance.",
    friendship: "May prefer loyal friendships with regular contact, shared rituals, and visible care.",
    learning: "May learn well through examples, discussion, structure, encouragement, and practical relevance.",
    stress: [
      { title: "Support", text: "May become over-involvement." },
      { title: "Harmony", text: "May become avoidance of necessary conflict." },
      { title: "Responsibility", text: "May become resentment if care is not reciprocated." },
    ],
    healthy: [
      { tendency: "Warm", healthy: "Welcoming", overextended: "Approval-seeking" },
      { tendency: "Responsible", healthy: "Dependable", overextended: "Over-responsible" },
      { tendency: "Socially aware", healthy: "Considerate", overextended: "Overly concerned with opinion" },
      { tendency: "Organized care", healthy: "Supportive", overextended: "Controlling through help" },
      { tendency: "Harmony-focused", healthy: "Cooperative", overextended: "Conflict-avoidant" },
    ],
    growth: ["separate helping from fixing", "state needs directly", "allow disagreement", "protect personal priorities", "let others carry responsibility"],
    misconceptions: ["Warm does not mean shallow.", "Helpful does not mean dependent.", "Socially aware does not mean fake.", "Structured care does not mean controlling."],
  },
  ENFJ: {
    tendencies: ["inspiring", "empathetic", "expressive", "purpose-led", "people-developing", "organized"],
    naturalTemperament: ["may read people quickly", "may encourage growth", "may organize around a mission", "may communicate emotionally", "may value shared purpose", "may feel responsible for morale"],
    roles: [
      { title: "The Mentor", text: "Some ENFJ-like people may become the person who helps others see their potential." },
      { title: "The Motivator", text: "They may naturally gather people around a shared direction." },
      { title: "The Emotional Organizer", text: "They may sense what a group needs to feel aligned." },
    ],
    reinforcing: ["encouragement to lead", "emotionally expressive environments", "purpose-driven communities", "mentorship", "collaborative goals"],
    challenging: ["apathy", "emotional shutdown", "cynicism", "disconnected teams", "lack of shared purpose"],
    paths: [
      { title: "Naturally Reinforced", text: "A people-developing person may grow confident when empathy and leadership are encouraged." },
      { title: "Responsibility Adaptation", text: "Being relied on to motivate others may reinforce emotional leadership and high responsibility." },
      { title: "Contrasting Environment", text: "In disconnected settings, an ENFJ-like person may overfunction to create alignment." },
    ],
    communication: "May communicate with warmth, vision, and emotional clarity. They may need to avoid assuming they know what others need.",
    friendship: "May prefer friendships with emotional openness, shared growth, and mutual encouragement.",
    learning: "May learn best through discussion, meaning, teaching, collaboration, and seeing how knowledge helps people.",
    stress: [
      { title: "Empathy", text: "May become carrying too much of others' emotions." },
      { title: "Leadership", text: "May become over-guiding." },
      { title: "Purpose", text: "May become pressure to make everything meaningful." },
    ],
    healthy: [
      { tendency: "Inspiring", healthy: "Motivating", overextended: "Pressuring" },
      { tendency: "Empathic", healthy: "Attuned", overextended: "Over-involved" },
      { tendency: "Organized", healthy: "Coordinated", overextended: "Controlling" },
      { tendency: "Purpose-led", healthy: "Visionary", overextended: "Over-responsible" },
      { tendency: "Expressive", healthy: "Encouraging", overextended: "Emotionally intense" },
    ],
    growth: ["let others choose their path", "practice emotional boundaries", "rest without earning it", "ask instead of assuming", "accept imperfect alignment"],
    misconceptions: ["Warm does not mean lacking logic.", "Leading does not mean needing attention.", "Empathic does not mean endlessly available.", "Purposeful does not mean always intense."],
  },
  ENTJ: {
    tendencies: ["strategic", "assertive", "decisive", "ambitious", "systems-oriented", "leadership-focused"],
    naturalTemperament: ["may organize people around goals", "may think in outcomes", "may speak decisively", "may challenge inefficiency", "may pursue competence", "may see scalable systems"],
    roles: [
      { title: "The Commander", text: "Some ENTJ-like people may become the person who gives direction when a goal is unclear." },
      { title: "The Strategist", text: "They may quickly identify leverage points and next moves." },
      { title: "The Standard Raiser", text: "They may push systems and people toward stronger performance." },
    ],
    reinforcing: ["leadership opportunities", "ambitious goals", "competence-based feedback", "strategic autonomy", "high standards"],
    challenging: ["low accountability", "emotional ambiguity", "slow decision-making", "small thinking", "rules without purpose"],
    paths: [
      { title: "Naturally Reinforced", text: "A strategic, assertive person may grow confident when leadership and competence are welcomed." },
      { title: "Responsibility Adaptation", text: "Being placed in high-stakes roles may reinforce decisiveness and outcome focus." },
      { title: "Contrasting Environment", text: "In passive or unclear settings, an ENTJ-like person may become more forceful while trying to create direction." },
    ],
    communication: "May communicate directly, strategically, and with emphasis on goals. They may need to slow down for trust and emotional buy-in.",
    friendship: "May value friendships with honesty, ambition, competence, and mutual respect.",
    learning: "May learn best through challenge, strategy, debate, application, and measurable improvement.",
    stress: [
      { title: "Assertiveness", text: "May become intensity when trust is low." },
      { title: "Strategy", text: "May become over-control." },
      { title: "High standards", text: "May become dismissiveness of slower growth." },
    ],
    healthy: [
      { tendency: "Strategic", healthy: "Directional", overextended: "Controlling" },
      { tendency: "Assertive", healthy: "Confident", overextended: "Domineering" },
      { tendency: "Decisive", healthy: "Efficient", overextended: "Rushed" },
      { tendency: "Ambitious", healthy: "Purposeful", overextended: "Relentless" },
      { tendency: "Standards-driven", healthy: "Excellent", overextended: "Impatient" },
    ],
    growth: ["build emotional buy-in", "practice patience", "listen before optimizing", "value rest", "make room for softer perspectives"],
    misconceptions: ["Assertive does not mean uncaring.", "Ambitious does not mean selfish.", "Direct does not mean always angry.", "Strategic does not mean emotionless."],
  },
};

const commonIntro =
  "No single childhood or environment creates a personality type. Personality develops through a complex interaction between natural temperament, relationships, culture, experiences, and the ways a person learns to adapt to the world.";

function blindSpotCards(profile: TrueSelf16Profile): DetailCard[] {
  return profile.blindSpots.map((spot) => ({
    title: spot,
    text: `This may emerge when a useful ${profile.name} tendency is stretched too far or used without enough balance.`,
  }));
}

export function getTypeDetailData(profile: TrueSelf16Profile): TypeDetailData {
  const notes = typeNotes[profile.code];
  const familyCode = TYPE_FAMILY_BY_CODE[profile.code];
  const family = TYPE_FAMILIES[familyCode];
  const axes = axesFor(profile.code);

  return {
    overview: {
      summary: profile.description,
      description: `${profile.name} patterns may show up through ${notes.tendencies.slice(0, 3).join(", ")}, while still looking different across different people and life histories.`,
      tendencies: notes.tendencies,
    },
    analytics: {
      axes,
      family: {
        code: family.code,
        name: family.name,
        description: family.summary,
      },
      preferenceDescriptions: axes.map((axis) => ({
        title: `${axis.preferred} - ${axis.preferredLabel}`,
        text: axis.description,
      })),
    },
    background: {
      introduction: commonIntro,
      naturalTemperament: notes.naturalTemperament,
      familyEnvironment: familyEnvironment[familyCode],
      childhoodRoles: notes.roles,
      reinforcingEnvironment: notes.reinforcing,
      challengingEnvironment: notes.challenging,
      developmentalPaths: notes.paths,
      natureVsEnvironment: [
        {
          title: "May Come Naturally",
          text: notes.naturalTemperament.slice(0, 4).join("; "),
        },
        {
          title: "May Be Strongly Shaped by Life",
          text: "Confidence, communication, trust, emotional expression, discipline, coping behavior, and social style.",
        },
        {
          title: "Can Continue to Develop",
          text: notes.growth.slice(0, 5).join("; "),
        },
      ],
    },
    life: {
      relationships: profile.relationshipStyle,
      communication: notes.communication,
      friendship: notes.friendship,
      work: profile.workStyle,
      learning: notes.learning,
      stress: notes.stress,
    },
    growth: {
      strengths: profile.strengths,
      blindSpots: blindSpotCards(profile),
      healthyVsOverextended: notes.healthy,
      growthPath: [...profile.growthPath, ...notes.growth],
      misconceptions: notes.misconceptions,
    },
  };
}
