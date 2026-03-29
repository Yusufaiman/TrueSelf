"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clipboard,
  ArrowLeft,
  Brain,
  Fingerprint,
  Users,
  Shield,
  Heart,
  Compass,
  Layers,
  MessageCircle,
  Activity,
  AlertCircle,
  Sparkles,
  Lightbulb,
  RotateCcw,
  Smile,
  Clock,
  Eye,
} from "lucide-react";

type AnswerValue = 1 | 2 | 3 | 4 | 5;

interface Question {
  id: number;
  text: string;
  dimension:
    | "selfAwareness"
    | "authenticity"
    | "externalInfluence"
    | "identityStability"
    | "emotionalAlignment"
    | "decisionClarity"
    | "innerConsistency"
    | "socialExpression";
  reverse?: boolean;
}

interface DimensionMetadata {
  label: string;
  colorClass: string;
  colorText: string;
  lightBgClass: string;
  icon: React.ReactNode;
}

const dimensionMetadata: Record<string, DimensionMetadata> = {
  selfAwareness: {
    label: "Self Awareness",
    colorClass: "bg-blue-500",
    colorText: "text-blue-600",
    lightBgClass: "bg-blue-50",
    icon: <Brain size={20} />,
  },
  authenticity: {
    label: "Authenticity",
    colorClass: "bg-emerald-500",
    colorText: "text-emerald-600",
    lightBgClass: "bg-emerald-50",
    icon: <Fingerprint size={20} />,
  },
  externalInfluence: {
    label: "External Influence",
    colorClass: "bg-amber-500",
    colorText: "text-amber-600",
    lightBgClass: "bg-amber-50",
    icon: <Users size={20} />,
  },
  identityStability: {
    label: "Identity Stability",
    colorClass: "bg-violet-500",
    colorText: "text-violet-600",
    lightBgClass: "bg-violet-50",
    icon: <Shield size={20} />,
  },
  emotionalAlignment: {
    label: "Emotional Alignment",
    colorClass: "bg-pink-500",
    colorText: "text-pink-600",
    lightBgClass: "bg-pink-50",
    icon: <Heart size={20} />,
  },
  decisionClarity: {
    label: "Decision Clarity",
    colorClass: "bg-indigo-500",
    colorText: "text-indigo-600",
    lightBgClass: "bg-indigo-50",
    icon: <Compass size={20} />,
  },
  innerConsistency: {
    label: "Inner Consistency",
    colorClass: "bg-cyan-500",
    colorText: "text-cyan-600",
    lightBgClass: "bg-cyan-50",
    icon: <Layers size={20} />,
  },
  socialExpression: {
    label: "Social Expression",
    colorClass: "bg-orange-500",
    colorText: "text-orange-600",
    lightBgClass: "bg-orange-50",
    icon: <MessageCircle size={20} />,
  },
};

const questions: Question[] = [
  // Self Awareness (SA) - Q1-Q5
  {
    id: 1,
    text: "I clearly understand what I want in life",
    dimension: "selfAwareness",
  },
  {
    id: 2,
    text: "I often feel unsure about who I really am",
    dimension: "selfAwareness",
    reverse: true,
  },
  {
    id: 3,
    text: "I can describe my personality without hesitation",
    dimension: "selfAwareness",
  },
  {
    id: 4,
    text: "I question my identity more than I'd like",
    dimension: "selfAwareness",
    reverse: true,
  },
  {
    id: 5,
    text: "I know what truly matters to me",
    dimension: "selfAwareness",
  },
  // Authenticity (AU) - Q6-Q10
  {
    id: 6,
    text: "I express my real thoughts even if others disagree",
    dimension: "authenticity",
  },
  {
    id: 7,
    text: "I act differently depending on who I'm with",
    dimension: "authenticity",
    reverse: true,
  },
  {
    id: 8,
    text: "I feel like I'm being my true self most of the time",
    dimension: "authenticity",
  },
  {
    id: 9,
    text: "I hide parts of myself to fit in",
    dimension: "authenticity",
    reverse: true,
  },
  {
    id: 10,
    text: "I feel comfortable being fully myself around others",
    dimension: "authenticity",
  },
  // External Influence (EI) - Q11-Q15
  {
    id: 11,
    text: "I care a lot about what others think of me",
    dimension: "externalInfluence",
    reverse: true,
  },
  {
    id: 12,
    text: "My decisions are influenced by people around me",
    dimension: "externalInfluence",
    reverse: true,
  },
  {
    id: 13,
    text: "I trust my own judgment over others",
    dimension: "externalInfluence",
  },
  {
    id: 14,
    text: "I feel pressure to meet expectations",
    dimension: "externalInfluence",
    reverse: true,
  },
  {
    id: 15,
    text: "I often adjust myself to avoid conflict",
    dimension: "externalInfluence",
    reverse: true,
  },
  // Identity Stability (IS) - Q16-Q20
  {
    id: 16,
    text: "My personality feels consistent across situations",
    dimension: "identityStability",
  },
  {
    id: 17,
    text: "I feel like a different person in different environments",
    dimension: "identityStability",
    reverse: true,
  },
  {
    id: 18,
    text: "I have a stable sense of self",
    dimension: "identityStability",
  },
  {
    id: 19,
    text: "My identity changes depending on who I'm around",
    dimension: "identityStability",
    reverse: true,
  },
  {
    id: 20,
    text: "I feel grounded in who I am",
    dimension: "identityStability",
  },
  // Emotional Alignment (EA) - Q21-Q25
  {
    id: 21,
    text: "My actions match how I truly feel",
    dimension: "emotionalAlignment",
  },
  {
    id: 22,
    text: "I often go against my own feelings",
    dimension: "emotionalAlignment",
    reverse: true,
  },
  {
    id: 23,
    text: "I feel disconnected from myself sometimes",
    dimension: "emotionalAlignment",
    reverse: true,
  },
  {
    id: 24,
    text: "I feel at peace with who I am",
    dimension: "emotionalAlignment",
  },
  {
    id: 25,
    text: "I feel like I'm living someone else's version of life",
    dimension: "emotionalAlignment",
    reverse: true,
  },
  // Decision Clarity (DC) - Q26-Q27
  {
    id: 26,
    text: "I feel like I'm living as my true self",
    dimension: "decisionClarity",
  },
  {
    id: 27,
    text: "I often feel lost even when things seem fine",
    dimension: "decisionClarity",
    reverse: true,
  },
  // Inner Consistency (IC) - Q28-Q30
  {
    id: 28,
    text: "I know who I am, but I don't always act like it",
    dimension: "innerConsistency",
    reverse: true,
  },
  {
    id: 29,
    text: "I feel aligned between what I think, feel, and do",
    dimension: "innerConsistency",
  },
  {
    id: 30,
    text: "I sometimes feel like I'm just playing a role",
    dimension: "innerConsistency",
    reverse: true,
  },
  // Social Expression (SE) - Q31-Q35
  {
    id: 31,
    text: "I can openly express my thoughts in social settings",
    dimension: "socialExpression",
  },
  {
    id: 32,
    text: "I feel comfortable being different from my social circles",
    dimension: "socialExpression",
  },
  {
    id: 33,
    text: "I hold back from sharing my real opinions with others",
    dimension: "socialExpression",
    reverse: true,
  },
  {
    id: 34,
    text: "I feel free to be myself around most people",
    dimension: "socialExpression",
  },
  {
    id: 35,
    text: "I suppress parts of myself to fit in socially",
    dimension: "socialExpression",
    reverse: true,
  },
];

const answerOptions = [
  {
    value: 1 as AnswerValue,
    label: "Strongly Disagree",
    color: "#EF4444",
    bgClass: "bg-red-500",
  },
  {
    value: 2 as AnswerValue,
    label: "Disagree",
    color: "#F97316",
    bgClass: "bg-orange-500",
  },
  {
    value: 3 as AnswerValue,
    label: "Neutral",
    color: "#9CA3AF",
    bgClass: "bg-gray-400",
  },
  {
    value: 4 as AnswerValue,
    label: "Agree",
    color: "#22C55E",
    bgClass: "bg-green-500",
  },
  {
    value: 5 as AnswerValue,
    label: "Strongly Agree",
    color: "#14B8A6",
    bgClass: "bg-teal-500",
  },
];

interface Dimensions {
  selfAwareness: number;
  authenticity: number;
  externalInfluence: number;
  identityStability: number;
  emotionalAlignment: number;
  decisionClarity: number;
  innerConsistency: number;
  socialExpression: number;
}

type ResultType =
  | "aligned"
  | "double"
  | "quiet"
  | "shifter"
  | "seeker"
  | "distant"
  | "drifter"
  | "guarded"
  | "fragmented"
  | "becoming";

function calculateDimensions(answers: (AnswerValue | null)[]): Dimensions {
  // Helper to apply reverse scoring
  const scoreAnswer = (
    value: AnswerValue | null,
    reverse: boolean = false,
  ): number => {
    if (value === null) return 0;
    return reverse ? 6 - value : value;
  };

  // Group questions by dimension and calculate scores
  const dimensionScores: Record<string, number[]> = {
    selfAwareness: [],
    authenticity: [],
    externalInfluence: [],
    identityStability: [],
    emotionalAlignment: [],
    decisionClarity: [],
    innerConsistency: [],
    socialExpression: [],
  };

  // Collect scores for each dimension
  questions.forEach((q, index) => {
    const scored = scoreAnswer(answers[index], q.reverse);
    dimensionScores[q.dimension].push(scored);
  });

  // Calculate dimension scores (0-10 scale)
  const calculateScore = (scores: number[]) => {
    if (scores.length === 0) return 0;
    const sum = scores.reduce((a, b) => a + b, 0);
    const max = scores.length * 5; // max possible for that dimension
    return (sum / max) * 10;
  };

  const result = {
    selfAwareness: calculateScore(dimensionScores.selfAwareness),
    authenticity: calculateScore(dimensionScores.authenticity),
    externalInfluence: calculateScore(dimensionScores.externalInfluence),
    identityStability: calculateScore(dimensionScores.identityStability),
    emotionalAlignment: calculateScore(dimensionScores.emotionalAlignment),
    decisionClarity: calculateScore(dimensionScores.decisionClarity),
    innerConsistency: calculateScore(dimensionScores.innerConsistency),
    socialExpression: calculateScore(dimensionScores.socialExpression),
  };

  // Debug logging
  if (typeof window !== "undefined") {
    console.log("DIMENSION SCORES (0-10 scale):", {
      selfAwareness: result.selfAwareness.toFixed(1),
      authenticity: result.authenticity.toFixed(1),
      externalInfluence: result.externalInfluence.toFixed(1),
      identityStability: result.identityStability.toFixed(1),
      emotionalAlignment: result.emotionalAlignment.toFixed(1),
      decisionClarity: result.decisionClarity.toFixed(1),
      innerConsistency: result.innerConsistency.toFixed(1),
    });
  }

  return result;
}

function determineResultType(dimensions: Dimensions): ResultType {
  const {
    selfAwareness: sa,
    authenticity: au,
    externalInfluence: ei,
    identityStability: is,
    emotionalAlignment: ea,
    decisionClarity: dc,
    innerConsistency: ic,
    socialExpression: se,
  } = dimensions;

  // Convert to percentages and score levels
  const toPercent = (score: number) =>
    Math.min(100, Math.max(0, Math.round((score / 10) * 100)));
  const toLevel = (percent: number): "low" | "mid" | "high" => {
    if (percent < 45) return "low";
    if (percent < 70) return "mid";
    return "high";
  };

  const scores = { sa, au, ei, is, ea, dc, se, ic };
  const levels = Object.fromEntries(
    Object.entries(scores).map(([k, v]) => [k, toLevel(toPercent(v))]),
  ) as Record<string, "low" | "mid" | "high">;

  // Count matching conditions for each identity
  const matches: Record<ResultType, number> = {
    aligned: 0,
    double: 0,
    quiet: 0,
    shifter: 0,
    seeker: 0,
    distant: 0,
    drifter: 0,
    guarded: 0,
    fragmented: 0,
    becoming: 0,
  };

  // THE ALIGNED: High authenticity, consistency, alignment; Low external influence
  if (
    levels.au === "high" &&
    levels.ic === "high" &&
    levels.ea === "high" &&
    levels.ei === "low"
  )
    matches.aligned += 3;
  if (levels.au === "high" || levels.ic === "high") matches.aligned += 1;

  // THE DOUBLE: High self-awareness but low/mid authenticity; Mid consistency
  if (
    levels.sa === "high" &&
    (levels.au === "low" || levels.au === "mid") &&
    levels.ic === "mid"
  )
    matches.double += 3;
  if (levels.sa === "high" && levels.au !== "high") matches.double += 1;

  // THE QUIET: Low social expression, low authenticity; Mid/High external influence
  if (
    levels.se === "low" &&
    levels.au === "low" &&
    (levels.ei === "mid" || levels.ei === "high")
  )
    matches.quiet += 3;
  if (levels.se === "low" && levels.au === "low") matches.quiet += 1;

  // THE SHIFTER: High external influence; Low/Mid identity stability
  if (levels.ei === "high" && (levels.is === "low" || levels.is === "mid"))
    matches.shifter += 3;
  if (levels.ei === "high") matches.shifter += 1;

  // THE SEEKER: Mid self-awareness; Low decision clarity; Low identity stability
  if (levels.sa === "mid" && levels.dc === "low" && levels.is === "low")
    matches.seeker += 3;
  if ((levels.dc === "low" || levels.is === "low") && levels.sa !== "high")
    matches.seeker += 1;

  // THE DISTANT: High self-awareness; Low emotional alignment
  if (levels.sa === "high" && levels.ea === "low") matches.distant += 3;
  if (levels.sa === "high" && levels.ea !== "high") matches.distant += 1;

  // THE DRIFTER: Low decision clarity; Low identity stability; Low/Mid self-awareness
  if (
    levels.dc === "low" &&
    levels.is === "low" &&
    (levels.sa === "low" || levels.sa === "mid")
  )
    matches.drifter += 3;
  if (levels.dc === "low" && levels.is === "low") matches.drifter += 1;

  // THE GUARDED: Low social expression; Mid authenticity; Low/Mid emotional alignment
  if (
    levels.se === "low" &&
    levels.au === "mid" &&
    (levels.ea === "low" || levels.ea === "mid")
  )
    matches.guarded += 3;
  if (levels.se === "low" && levels.ea !== "high") matches.guarded += 1;

  // THE FRAGMENTED: Low inner consistency; Low identity stability; Low emotional alignment
  if (levels.ic === "low" && levels.is === "low" && levels.ea === "low")
    matches.fragmented += 3;
  if (levels.ic === "low" && levels.is === "low") matches.fragmented += 1;

  // THE BECOMING: All mid-range, no strong extremes
  const midCount = Object.values(levels).filter((l) => l === "mid").length;
  const extremeCount = Object.values(levels).filter(
    (l) => l === "low" || l === "high",
  ).length;
  if (midCount >= 5 && extremeCount <= 3) matches.becoming += 3;
  if (extremeCount <= 4) matches.becoming += 1;

  // Find highest match score
  const maxScore = Math.max(...Object.values(matches));

  // Debug logging
  if (typeof window !== "undefined") {
    console.log({
      scores: Object.fromEntries(
        Object.entries(scores).map(([k, v]) => [k, toPercent(v)]),
      ),
      levels,
      matches,
      maxScore,
      selectedIdentity: Object.entries(matches).find(
        ([_, v]) => v === maxScore,
      )?.[0],
    });
  }

  // If no strong match, return "becoming"
  if (maxScore < 2) return "becoming";

  // Return identity with highest match count
  const selected = Object.entries(matches).find(([_, v]) => v === maxScore);
  return (selected?.[0] as ResultType) || "becoming";
}

const resultContent: Record<ResultType, any> = {
  aligned: {
    title: "The Aligned",
    tagline: "You feel like yourself, and you live like it.",
    shortDesc:
      "Your internal world and external world are moving in the same direction. You understand yourself, accept yourself, and live that truth. It's rare, and it matters.",
    deepDesc: [
      "There's a kind of peace that comes from not fighting yourself. You've done the work to know who you are, and you've chosen to honor that in how you move through the world.",
      "Your decisions come from your own compass, not from approval-seeking or obligation. When you do compromise, it's a conscious choice, not a default mode.",
      "You're not rigid about who you are. You grow and evolve. But your core remains stable because it's genuinely yours.",
      "People might not always understand your choices, but they recognize something: you know who you are, and you're okay with it.",
      "This alignment is worth protecting. It's also worth maintaining with intention.",
    ],
    patterns: [
      "You feel mostly comfortable in your own skin",
      "You can disagree with others without losing yourself",
      "You make decisions that feel true to you, even if they're unpopular",
      "When you notice yourself being inauthentic, it bothers you enough to address it",
      "People describe you as having integrity",
    ],
    emotionalExperience:
      "Most days feel like you're living a life that belongs to you. There's an ease underneath everything, not because life is easy, but because you're not at war with yourself about who you should be.",
    reality: [
      "You've probably made difficult choices to get here",
      "Alignment requires ongoing attention, not just one-time work",
      "You still experience doubt and confusion. It just doesn't shake your foundation.",
      "This is attractive to people, even if they can't quite name why",
    ],
    strengths: [
      "Self-knowledge",
      "Authenticity under pressure",
      "Decision clarity",
      "Internal peace",
      "Ability to live your values",
    ],
    risks:
      "Complacency. If you assume alignment is permanent, you might drift from it slowly without noticing. Self-awareness requires ongoing check-ins.",
    actions: [
      "Keep a regular practice of reflection. Monthly check-ins on what matters to you.",
      "Notice when you're compromising and ask why. Is it aligned or automatic?",
      "Help others find their alignment. Your example matters more than you know.",
      "Protect your peace by maintaining boundaries with people who demand you be someone else.",
      "Stay curious about yourself. Alignment evolves as you do.",
    ],
    closingLine:
      "Your alignment is a choice you make every day. Keep making it.",
  },

  double: {
    title: "The Double",
    tagline: "You know what you feel, but you don't always follow through.",
    shortDesc:
      "You have strong self-awareness. You know what you want, what you feel, what matters to you. But somewhere between knowing and expressing, something shifts. There's a gap.",
    deepDesc: [
      "Your inner world is clear: you know what you believe, what you want, what feels right. The problem isn't confusion—it's that you're not fully showing it.",
      "You've mastered the art of reading the room, adjusting your expression, keeping the peace. So much so that it's become automatic. You probably don't notice you're doing it anymore.",
      "The energy cost is real. You're using significant emotional effort to maintain a version of yourself that's only partially you.",
      'You feel relief when someone "gets" the real version of you. That relief tells you something important: the gap is real, and closing it would matter.',
      "The opportunity here is clear: you already know who you are. You just need to get brave about showing it.",
    ],
    patterns: [
      "You know what you think before you speak, then edit it",
      "You feel like people only know part of you",
      "You're relieved when you can be more authentic with someone",
      "You think more than you speak",
      "You feel like you're performing sometimes",
    ],
    emotionalExperience:
      "There's a quiet tension. Not overwhelming, but constant. Like you're watching yourself in situations more than living them. It's tiring without being dramatic.",
    reality: [
      "People like you more when they know the real you, not less",
      "Your self-awareness is a strength. Use it to close the gap, not maintain it.",
      "The vulnerability of showing more wouldn't break you. It might strengthen you.",
      "Most people wish they had your level of self-knowledge. Don't waste it.",
    ],
    strengths: [
      "Self-awareness",
      "Thoughtfulness",
      "Ability to read situations",
      "Emotional intelligence",
      "Capacity for genuine reflection",
    ],
    risks:
      "Over time, maintaining this gap becomes your default. You might eventually feel like you're always performing, even in intimate relationships.",
    actions: [
      "Pick one low-stakes situation this week. Say something you normally edit. Notice what actually happens.",
      "Find one person where you practice being more fully yourself. Start there.",
      "Before you speak, ask yourself: am I editing because I need to, or out of habit?",
      "Notice the relief when someone sees you. That's your data that the gap is costing you.",
      "Start small. You don't need to be fully transparent with everyone. Just more true with someone.",
    ],
    closingLine:
      "You don't need to find yourself. You need to start showing who you already know you are.",
  },

  quiet: {
    title: "The Quiet",
    tagline: "You hold back parts of yourself, even when they matter.",
    shortDesc:
      "You've learned to be small. To edit yourself. To adjust for others. It's not that you don't have opinions or feelings. It's that expressing them doesn't feel safe enough.",
    deepDesc: [
      "There's a difference between being quiet and being suppressed. You're the second. You're actively holding back, watching yourself carefully.",
      "Something in your world—maybe people, maybe experience, maybe just patterns you picked up—told you that your full self isn't safe. So you learned to protect yourself by minimizing.",
      "You probably don't even realize how much energy this takes. Constant calibration. Constant self-monitoring. It's subtle but exhausting.",
      "The cost is that you feel unseen. Even when people are kind, they don't really know you. And maybe that's how you want it. Or maybe you're tired of it.",
      "The good news is that if you were trained out of being yourself, you can be trained back in. But it requires finding or creating safe spaces first.",
    ],
    patterns: [
      "You monitor what you say carefully before you say it",
      "You feel safer observing than participating",
      "One-on-one conversations feel safer than groups",
      "You're more yourself with certain people, whoever they are",
      "You feel relief when someone proves to be safe",
    ],
    emotionalExperience:
      "There's a constant low level of guardedness. Even in situations that seem safe, part of you is scanning for danger. It's like you're never fully relaxed.",
    reality: [
      "Your quietness isn't a personality trait. It's a protective strategy.",
      "Being quieter doesn't make people respect you more. Usually the opposite.",
      "Safe people will notice if you slowly share more. They won't punish you for it.",
      "You're more interesting than you're showing. That energy you're using to protect yourself? It's energy you could use to express.",
    ],
    strengths: [
      "Good judgment about safety",
      "Thoughtfulness",
      "Ability to listen",
      "Self-awareness in relationships",
      "Protective instincts",
    ],
    risks:
      "The longer you suppress, the more you lose touch with your full self. Eventually you might forget that the suppressed parts are even there.",
    actions: [
      "Identify one person or space where you feel slightly more safe. Spend time there intentionally.",
      "In that safe space, share one small thing that's true about you. Something true, not filtered.",
      "Notice how the people who matter respond to more of you. Most respond with interest, not rejection.",
      "Build slowly. You don't need to be transparent with everyone. Just a little more true with someone.",
      "When you do share more, notice how it feels. That information matters.",
    ],
    closingLine:
      "You don't need to change who you are. You need to find and create spaces where being yourself feels survivable.",
  },

  shifter: {
    title: "The Shifter",
    tagline: "You adapt easily, but sometimes lose your center.",
    shortDesc:
      "You're genuinely skilled at moving with different people and contexts. You read situations well and adjust. The strength is real. But constant adaptation has a cost: you're not sure where the real \"you\" ends and the adapting begins.",
    deepDesc: [
      "You're probably good in social situations. People feel comfortable around you because you're comfortable with them. You're flexible, responsive, easy to work with.",
      "But flexibility without an anchor is just drifting. And you might be drifting more than you realize.",
      "Over time, adapting becomes your default. You respond to what people need from you. You adjust your opinions, preferences, even emotions to fit the context. It's so automatic you barely notice.",
      "The problem is internal: you're losing clarity about what you actually want, independent of the context you're in.",
      "The good news: these adapting skills are valuable. You just need to anchor them to something real about yourself first.",
    ],
    patterns: [
      "Different people describe you very differently, and they're all right",
      "Your opinions and preferences shift around people",
      "You're good at fitting in anywhere",
      "You feel more solid in some environments than others",
      "You sometimes surprise yourself with how different you are in different contexts",
    ],
    emotionalExperience:
      "There's a kind of groundlessness. You feel capable and adaptive, but underneath there's a question: who am I when I'm not adjusting to someone else?",
    reality: [
      "Adaptability is a real strength that you should keep",
      "But it only works well when you have a core to return to",
      "People respect you more when you have actual opinions, not mirrors",
      "Clarity about yourself would make you even better at relationships, not worse",
    ],
    strengths: [
      "Adaptability",
      "Social intelligence",
      "Emotional attunement",
      "Flexibility",
      "Ability to work with different types of people",
    ],
    risks:
      "You might become so adapted that you lose track of what you actually want. Then you're just responding to life instead of living it.",
    actions: [
      "Spend time alone asking: what do I actually want, independent of anyone else?",
      "Notice your genuine opinions vs. your adaptive ones. Start expressing the genuine ones.",
      "Build one area of your life around what you truly want, not what works for others.",
      "Practice staying consistent in one belief or preference across different contexts. See what happens.",
      "Your adaptability is a gift. Use it, but don't let it become your only skill.",
    ],
    closingLine:
      "You can be adaptive and whole at the same time. The key is knowing where you end and the adaptation begins.",
  },

  seeker: {
    title: "The Seeker",
    tagline: "You're still figuring things out, and that's where you are.",
    shortDesc:
      "You don't have all the answers yet, and you know it. You're exploring, learning, trying different things. It's not confusion exactly—it's an active search. The searching is the current reality.",
    deepDesc: [
      "You're in a season of exploration. Maybe you're young. Maybe you've just left a life that wasn't yours. Maybe you're in transition. Whatever the reason, you're still building your map.",
      "This isn't a failure state. Seeking is a legitimate way to be. It's actually where clarity comes from—through exploration, not through thinking harder.",
      "You probably experience some anxiety around not knowing. That's normal. But the antidote isn't more thinking. It's more experiencing.",
      "Your advantage right now is openness. You're not locked into one way of being. Use that.",
      "The goal isn't to get to a finished version of yourself faster. It's to explore with intention and notice what resonates.",
    ],
    patterns: [
      "You're trying different things to see what fits",
      "You feel uncertain about who you are, but okay with it",
      "You're interested in many different possibilities",
      "You don't need everything figured out right now",
      "You feel like you're building yourself intentionally",
    ],
    emotionalExperience:
      "There's room to breathe here. Not urgent. Not lost. Just... open. Like you're available to what comes next.",
    reality: [
      "Most people who know who they are started here",
      "Your clarity will come from doing, not from thinking",
      "You don't need to have it figured out to move forward",
      "Exploration is productive. It's not wasting time.",
    ],
    strengths: [
      "Openness",
      "Willingness to explore",
      "Lack of rigid self-image",
      "Capacity to try new things",
      "Self-awareness about not knowing",
    ],
    risks:
      "If you stay in this mode indefinitely without building any clarity, you might feel adrift. The seeking needs to lead somewhere eventually.",
    actions: [
      "Explore intentionally. What are you curious about? What matters to you? Follow that.",
      "Keep some kind of record. Journal, notes, whatever. Look for patterns in what resonates with you.",
      "Try things. Don't just think about them. Your body and experience will teach you more than your thoughts.",
      "Notice what you return to. What do you pick even when you have options? That's data.",
      "Give yourself permission to explore without judgment. This is supposed to be open.",
    ],
    closingLine:
      "You don't need to have arrived anywhere. You just need to pay attention as you go.",
  },

  distant: {
    title: "The Distant",
    tagline: "You understand yourself, but feel slightly removed from it.",
    shortDesc:
      "You have real self-awareness. You know quite a bit about who you are. But there's a distance between that knowledge and actually feeling at home in yourself. It's like you're observing your own life.",
    deepDesc: [
      "You've got the self-knowledge part down. You can describe who you are pretty accurately. But there's something underneath: a lack of peace with it.",
      "Maybe you don't like certain parts of yourself. Maybe you've internalized criticism that made you ashamed of some aspect of who you are. Maybe you just feel disconnected from your own life.",
      "Whatever the reason, there's a subtle exhaustion. You're living your life, but you're not quite inhabiting it. There's distance between the observer and the observed.",
      "This might show up as perfectionism, or constant self-judgment, or the feeling that you should be different than you are.",
      "The pathway forward isn't more self-knowledge. It's self-acceptance. You need to close the distance, not increase it.",
    ],
    patterns: [
      "You're your own harshest critic",
      "You achieve things but don't feel satisfied",
      "You feel like you're watching your life instead of living it",
      "You have high standards for yourself that feel impossible",
      "You feel like something's missing even when things are going well",
    ],
    emotionalExperience:
      "There's an undercurrent of dissatisfaction. Not depression exactly, but a persistent sense that you're not quite where you need to be.",
    reality: [
      "Self-knowledge without self-acceptance creates suffering, not growth",
      "You're probably harder on yourself than anyone else is",
      "Accepting who you are doesn't mean staying static",
      "The distance you feel is something you can close",
    ],
    strengths: [
      "Self-awareness",
      "Drive to improve",
      "Ability to see your flaws clearly",
      "Capacity for growth",
      "Honesty with yourself",
    ],
    risks:
      "If you stay in this self-judgment loop, you risk burnout. Constant self-improvement that never feels adequate is exhausting.",
    actions: [
      "Notice what parts of yourself you reject. Just notice, without judgment.",
      "Challenge the critic. Who taught you these standards? Are they actually yours?",
      "Practice one act of self-compassion daily. Something small and genuine.",
      "When you achieve something, actually feel it. Don't immediately move to the next goal.",
      "Find one person you can be genuinely with. Not performing, just being.",
    ],
    closingLine:
      "You can't love a life you're afraid to live. Start by accepting who you are.",
  },

  drifter: {
    title: "The Drifter",
    tagline: "You move through life without a clear anchor yet.",
    shortDesc:
      "Life is happening, and you're moving through it. But without strong internal direction or clarity about who you are or where you're headed. You're not lost—you're just not anchored.",
    deepDesc: [
      "There's no crisis here. You're functioning. Moving forward in some way. But there's no real compass guiding you.",
      "Without clarity about yourself or your values, you drift toward whatever's in front of you. A job appears, you take it. A relationship forms, you go with it. A friend wants to do something, you go along.",
      "There's nothing inherently wrong with this, but it means you're being shaped by circumstances instead of by intention.",
      "Over time, drifting without an anchor creates a subtle anxiety. You don't have any real certainty about anything.",
      "The good news: anchoring yourself is learnable. It's about starting to notice what matters to you and building from there.",
    ],
    patterns: [
      "You're not sure what you really want",
      "You go where opportunities appear",
      "You feel like things happen to you rather than you happening to things",
      "You don't have strong opinions about your own life",
      "You're not sure who you are or where you're headed",
    ],
    emotionalExperience:
      "There's a kind of passivity. Not depression, but a sense of not being the driver of your own life.",
    reality: [
      "Self-knowledge is built through attention, not through thinking",
      "You can't make intentional choices without knowing what matters to you",
      "Clarity comes from deciding what matters, not from having everything figured out",
      "It's not too late to start directing your own life",
    ],
    strengths: [
      "Flexibility",
      "Openness to change",
      "Ability to go with the flow",
      "Lack of rigid self-image",
      "Adaptability",
    ],
    risks:
      "Without anchoring yourself soon, you might wake up years from now realizing you've built a life that doesn't actually feel like yours.",
    actions: [
      "Start noticing what feels good to you. What activities pull your attention? Do them more.",
      "Ask yourself some basic questions: What matters to me? What do I spend time thinking about? What would I choose if I weren't going with the flow?",
      "Make one intentional choice. Not a huge life decision, just something small that's aligned with what you actually want.",
      "Notice when you're drifting and when you're choosing. Start choosing more often.",
      "Build one area of your life with intention. Let that be your anchor.",
    ],
    closingLine:
      "Your life will shape itself by default, or you can shape it intentionally. Start small with intention.",
  },

  guarded: {
    title: "The Guarded",
    tagline: "You protect yourself, even when it keeps people out.",
    shortDesc:
      "You've learned to be careful. To protect yourself. To not fully expose who you are. It keeps you safe. But it also keeps you alone.",
    deepDesc: [
      "Something taught you to be guarded. Maybe painful experiences, maybe patterns from your past, maybe just what you picked up about how to navigate the world.",
      "Now protection is your default. You let people see some things, but not others. You're careful about trust.",
      "The problem is that protection without openness creates isolation. You feel somewhat unsafe even when you're actually safe.",
      "This likely affects your relationships. People sense the guardedness and keep a distance. Then you feel misunderstood, which confirms that you needed to be guarded.",
      "The opportunity is learning to be cautious without being closed. To trust gradually instead of completely or not at all.",
    ],
    patterns: [
      "You're careful about who you trust",
      "You share selectively",
      "You feel safer alone than in groups",
      "You monitor conversations for signs of judgment",
      "You have safety vetting processes for people",
    ],
    emotionalExperience:
      "There's tension between wanting connection and needing protection. It's exhausting.",
    reality: [
      "Closedness keeps you safe from rejection, but also from connection",
      "Real safety comes from choosing safe people, not from staying closed",
      "Trust is built gradually. You don't have to expose everything at once.",
      "People can handle more of you than you think they can",
    ],
    strengths: [
      "Good judgment about safety",
      "Self-protective instinct",
      "Ability to identify risk",
      "Caution in relationships",
      "Awareness of boundaries",
    ],
    risks:
      "If you never learn to open up, you'll be alone in rooms full of people.",
    actions: [
      "Identify one person who has earned your trust. Practice opening up slightly more with them.",
      "Notice your vetting process. Is it actually protecting you, or just keeping you isolated?",
      "Share something true in low stakes situations. See what happens.",
      "Notice when you're safe and stay in that awareness. Use it to gradually loosen the guard.",
      "Remember: people who matter will appreciate the real you more than the protected version.",
    ],
    closingLine:
      "Safety and openness can coexist. You just need to practice being both.",
  },

  fragmented: {
    title: "The Fragmented",
    tagline: "Parts of you feel disconnected from each other.",
    shortDesc:
      "You feel like different parts of yourself don't quite fit together. There's internal contradiction. Inconsistency. Like you're multiple people instead of one person whole.",
    deepDesc: [
      "You might feel like your values contradict your actions. Or like what you think doesn't match what you feel. Or like different parts of you want different things.",
      "This creates internal conflict that's constant. You're at war with yourself about who you are or what you want.",
      "The fragmentation might be situation-based—you're one way at work and completely different at home. Or it might be deeper—you don't know who you actually are when you're alone.",
      "This level of internal inconsistency is exhausting. You're never quite settled because different parts of you keep pulling in different directions.",
      "Wholeness comes from integrating these parts, not from eliminating them. But first, you need to see them clearly.",
    ],
    patterns: [
      "You feel like different people in different contexts",
      "Your values and actions often contradict each other",
      "You're not consistent in your beliefs or opinions",
      "You feel torn between different parts of yourself",
      "Internal conflict is a constant experience",
    ],
    emotionalExperience:
      "There's a restlessness. An inability to feel settled because different parts are always in conflict.",
    reality: [
      "Fragmentation is often a response to past experiences",
      "Your different parts are trying to protect you, not sabotage you",
      "Integration is possible. It starts with acknowledging all the parts.",
      "Wholeness is built gradually, not forced",
    ],
    strengths: [
      "Awareness of internal complexity",
      "Flexibility across contexts",
      "Multiple perspectives",
      "Understanding of nuance",
      "Self-awareness about conflict",
    ],
    risks:
      "If the fragmentation continues without integration, you might make choices that contradict each other, creating more internal chaos.",
    actions: [
      "Map your different parts. What does each one want? Which contexts bring out which parts?",
      "Don't try to eliminate any parts. They're there for a reason. Understand why.",
      "Look for the values underneath the different parts. There are usually common threads.",
      "Start integrating. Make choices that honor multiple parts of yourself, not just one.",
      "This work might benefit from therapy or coaching. Integration is complex; support helps.",
    ],
    closingLine:
      "You're not broken. You're just trying to hold multiple truths at once. Let them coexist.",
  },

  becoming: {
    title: "The Becoming",
    tagline: "You're not fully there yet, but you're growing into yourself.",
    shortDesc:
      "You're in a middle space. Not fully settled, but not completely lost. You're actively becoming yourself, and the process itself is the point right now.",
    deepDesc: [
      "You don't have everything figured out, and you're not expecting to. You're in a process of becoming, and you're okay with that.",
      "You have some clarity in certain areas and uncertainty in others. You're building on what you know while staying open to what you don't.",
      "There's a kind of intentionality to your unconsciousness. You're not just drifting. You're exploring with awareness.",
      "This is actually a beautiful place to be. You have enough self-knowledge to have direction, and enough openness to evolve.",
      "The work now is to keep building, keep learning, keep noticing what resonates with who you want to become.",
    ],
    patterns: [
      "You're learning about yourself as you go",
      "Some parts of your life feel clear, others feel open",
      "You're building yourself intentionally",
      "You can hold uncertainty without panic",
      "You're genuinely curious about who you're becoming",
    ],
    emotionalExperience:
      "There's a sense of possibility mixed with some uncertainty. It feels okay. Like you're in the right place for where you are.",
    reality: [
      "Being in process is a legitimate way to be",
      "You don't need to have arrived anywhere to move forward",
      "Growth is happening even when it doesn't feel dramatic",
      "The becoming is the point. Don't rush past it.",
    ],
    strengths: [
      "Self-awareness in progress",
      "Openness to growth",
      "Intentionality",
      "Flexibility",
      "Comfort with process",
    ],
    risks:
      "The only risk is stopping the work. Keep becoming. Keep noticing. Keep building.",
    actions: [
      "Keep your attention on your own becoming. What's calling to you right now?",
      "Notice patterns in what interests you. That's data about who you're becoming.",
      "Take small steps in the direction of who you want to be",
      "Build supportive structures. Find people who get what you're doing.",
      "Check in regularly. Are you moving toward who you want to become?",
    ],
    closingLine:
      "The best version of yourself isn't somewhere else. It's being built here, now, by you.",
  },
};

export default function WhoYouReallyArePage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(AnswerValue | null)[]>(
    Array(questions.length).fill(null),
  );
  const [showRestartModal, setShowRestartModal] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSelectAnswer = (value: AnswerValue) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentAnswer === null) return;

    if (isLastQuestion) {
      setIsCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Enter key support for next question
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        !hasStarted &&
        !isCompleted &&
        currentAnswer !== null
      ) {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentAnswer,
    currentQuestionIndex,
    isLastQuestion,
    hasStarted,
    isCompleted,
  ]);

  // RESULTS SCREEN
  if (isCompleted) {
    const dimensions = calculateDimensions(answers);
    const resultType = determineResultType(dimensions);
    const content = resultContent[resultType];

    const dimensionsList = [
      { key: "selfAwareness", value: dimensions.selfAwareness },
      { key: "authenticity", value: dimensions.authenticity },
      { key: "externalInfluence", value: dimensions.externalInfluence },
      { key: "identityStability", value: dimensions.identityStability },
      { key: "emotionalAlignment", value: dimensions.emotionalAlignment },
      { key: "decisionClarity", value: dimensions.decisionClarity },
      { key: "innerConsistency", value: dimensions.innerConsistency },
      { key: "socialExpression", value: dimensions.socialExpression },
    ];

    return (
      <div className="min-h-screen bg-slate-50 py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Top Badge */}
          <div className="flex justify-center mb-6">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
              Identity Profile
            </span>
          </div>

          {/* Main Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              You are
            </h1>
            <h2
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ color: "#4399E6" }}
            >
              {content.title}
            </h2>
            <p className="text-lg md:text-xl text-slate-500 italic mb-4">
              "{content.tagline}"
            </p>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {content.shortDesc}
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="w-full max-w-md mx-auto h-48 rounded-xl bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center mb-12">
            <p className="text-slate-400 text-sm">Result image placeholder</p>
          </div>

          {/* Dimensions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {dimensionsList.map((dim, idx) => {
              const metadata =
                dimensionMetadata[dim.key as keyof typeof dimensionMetadata];
              const percentage = Math.min(
                100,
                Math.max(0, Math.round((dim.value / 10) * 100)),
              );

              return (
                <div
                  key={idx}
                  className={`${metadata.lightBgClass} border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-200`}
                >
                  {/* Top Row: Icon + Label + Percentage */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-8 h-8 rounded-md ${metadata.lightBgClass} flex items-center justify-center`}
                      >
                        <div className={`${metadata.colorText} w-4 h-4`}>
                          {metadata.icon}
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">
                        {metadata.label}
                      </span>
                    </div>
                    <span
                      className={`${metadata.lightBgClass} px-3 py-1 rounded-lg text-slate-900 font-bold text-lg`}
                    >
                      {percentage}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 rounded-full bg-white border border-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${metadata.colorClass}`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* What's Really Going On */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={20} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                What's really going on
              </h3>
            </div>
            <div className="space-y-3">
              {content.deepDesc.map((paragraph: string, idx: number) => (
                <p key={idx} className="text-sm text-slate-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Patterns Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Layers size={20} className="text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                Patterns you might recognize
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {content.patterns.map((pattern: string, idx: number) => {
                const patternIcons = [
                  Brain,
                  RotateCcw,
                  Users,
                  Smile,
                  Clock,
                  Eye,
                ];
                const IconComponent = patternIcons[idx % patternIcons.length];
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3 items-start hover:shadow-sm transition-shadow"
                  >
                    <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <IconComponent size={14} className="text-slate-600" />
                    </div>
                    <p className="text-sm text-slate-600">{pattern}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How It Feels */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-12">
            <div className="flex items-center gap-2 mb-3">
              <Heart size={20} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                How this feels
              </h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {content.emotionalExperience}
            </p>
          </div>

          {/* Reality Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={20} className="text-red-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                What you might not realize
              </h3>
            </div>
            <div className="space-y-3">
              {content.reality.map((point: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3 items-start"
                >
                  <AlertCircle
                    size={16}
                    className="text-red-500 mt-0.5 flex-shrink-0"
                  />
                  <p className="text-sm text-slate-700">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-emerald-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                Your hidden strengths
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {content.strengths.map((strength: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-start gap-2"
                >
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 mt-0.5 flex-shrink-0"
                  />
                  <p className="text-xs text-slate-700 font-medium">
                    {strength}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* If Nothing Changes */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 mb-12">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={20} className="text-white" />
              <h3 className="text-lg font-semibold">If nothing changes</h3>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              {content.risks}
            </p>
          </div>

          {/* Actions Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Compass size={20} className="text-indigo-600" />
              <h3 className="text-lg font-semibold text-slate-900">
                What you should start doing
              </h3>
            </div>
            <div className="space-y-3">
              {content.actions.map((action: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 items-start"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                    <span className="text-xs font-bold text-blue-600">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="pt-0.5 flex-1">
                    <p className="text-sm text-slate-700">{action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Statement */}
          <div
            className="rounded-2xl p-8 mb-8 text-center"
            style={{ backgroundColor: "#4399E6" }}
          >
            <p className="text-white text-lg font-semibold italic">
              "{content.closingLine}"
            </p>
          </div>

          {/* CTA Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Want to understand yourself deeper?
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Unlock deeper insights about your patterns
            </p>
            <button
              onClick={() => {
                setIsCompleted(false);
                setHasStarted(false);
                setCurrentQuestionIndex(0);
                setAnswers(Array(questions.length).fill(null));
              }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Retake Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // GUIDELINES SCREEN
  if (!hasStarted) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6 py-12 bg-white">
        <div className="max-w-xl w-full rounded-3xl border border-slate-200 shadow-sm bg-white px-8 md:px-10 py-10 md:py-12 text-center">
          {/* Icon Container */}
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(67, 153, 230, 0.08)" }}
            >
              <Clipboard size={32} style={{ color: "#4399E6" }} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mt-5">
            Test guidelines
          </h1>

          {/* Guidelines List */}
          <div className="mt-5 space-y-4 text-sm md:text-base text-slate-600">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={20}
                style={{ color: "#5CE1E6" }}
                className="flex-shrink-0 mt-0.5"
              />
              <p className="text-left">
                Answer each statement based on your personal opinion
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={20}
                style={{ color: "#5CE1E6" }}
                className="flex-shrink-0 mt-0.5"
              />
              <p className="text-left">
                You cannot skip questions, but you can return to them later
              </p>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={() => setHasStarted(true)}
            className="w-full mt-6 px-6 py-3.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Start test
          </button>
        </div>
      </div>
    );
  }

  // TEST SCREEN
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Restart Modal */}
        {showRestartModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Restart test?
              </h2>
              <p className="text-slate-600 mb-8">
                You will lose your current progress.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowRestartModal(false)}
                  className="px-4 py-2 rounded-lg border-2 border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setAnswers(Array(questions.length).fill(null));
                    setShowRestartModal(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg transition"
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top Controls: Back + Restart */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
                title="Go to previous question"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
          </div>
          <button
            onClick={() => setShowRestartModal(true)}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
            title="Restart test"
          >
            <RotateCcw size={16} />
            Restart
          </button>
        </div>

        {/* Progress Section */}
        <div className="mb-10">
          {/* Progress Text */}
          <div className="flex justify-between items-center mb-3 text-sm">
            <span className="text-gray-600">{Math.round(progress)}%</span>
            <span className="text-gray-600">
              Step {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                backgroundImage: "linear-gradient(to right, #3b82f6, #06b6d4)",
              }}
            />
          </div>
        </div>

        {/* Question - Moved ABOVE Answer Scale */}
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed">
            {currentQuestion.text}
          </h2>
        </div>

        {/* Instruction Text */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600">
            Choose how accurately each statement reflects you.
          </p>
        </div>

        {/* Answer Scale - PERFECTLY LINEAR */}
        <div className="flex justify-between items-center gap-2 mb-12 px-4">
          {answerOptions.map((option) => (
            <div
              key={option.value}
              className="flex flex-col items-center gap-3"
            >
              {/* Circle Button */}
              <button
                onClick={() => handleSelectAnswer(option.value)}
                className="flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all border-gray-300 hover:border-gray-400 hover:scale-110 bg-white"
                style={
                  currentAnswer === option.value
                    ? {
                        borderColor: option.color,
                        boxShadow: `0 0 0 2px white, 0 0 0 4px ${option.color}`,
                      }
                    : {}
                }
                title={option.label}
              >
                {/* Inner dot when selected */}
                {currentAnswer === option.value && (
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                )}
              </button>

              {/* Label */}
              <span className="text-xs text-gray-600 text-center whitespace-normal max-w-[55px]">
                {option.label}
              </span>
            </div>
          ))}
        </div>

        {/* Navigation Button */}
        <button
          onClick={handleNext}
          disabled={currentAnswer === null}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            currentAnswer === null
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md hover:shadow-lg hover:scale-105"
          }`}
        >
          {isLastQuestion ? "Complete Test" : "Next"}
        </button>

        {/* Keyboard Hint */}
        {currentAnswer !== null && (
          <p className="text-xs text-slate-400 text-center mt-3">
            Press Enter to continue
          </p>
        )}

        {/* Progress indicator dots */}
        <div className="flex justify-center gap-1 mt-10">
          {questions.map((_, index) => (
            <div
              key={index}
              className="h-2 rounded-full transition-all"
              style={{
                width: index <= currentQuestionIndex ? "24px" : "8px",
                backgroundColor:
                  index <= currentQuestionIndex ? "#4399E6" : "#D1D5DB",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
