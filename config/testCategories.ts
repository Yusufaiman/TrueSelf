import {
  Brain,
  Briefcase,
  Compass,
  Dna,
  Flame,
  Heart,
  LucideIcon,
  Sprout,
  UserRound,
  Users,
  Zap,
} from "lucide-react";

export type IconType =
  | "dna"
  | "user"
  | "users"
  | "briefcase"
  | "brain"
  | "flame"
  | "sprout"
  | "heart"
  | "compass"
  | "zap";

export interface TestCategory {
  id: string;
  name: string;
  description: string;
  discover: string;
  icon: IconType;
  colorClass: string;
  color:
    | "blue"
    | "purple"
    | "orange"
    | "red"
    | "pink"
    | "indigo"
    | "violet"
    | "cyan"
    | "rose"
    | "amber"
    | "green"
    | "teal";
  href: string;
  testName: string;
  featuredHref?: string;
  journeyStage: "Master" | "Deepen" | "Apply" | "Develop";
  tests: string[];
}

export const TEST_CATEGORIES: TestCategory[] = [
  {
    id: "personality",
    name: "Personality",
    description: "Discover your core 16-type pattern and expression style",
    discover: "Core type, E/I, S/N, T/F, J/P, cognitive stack, and type expression.",
    icon: "dna",
    colorClass: "from-blue-500 to-cyan-500",
    color: "blue",
    href: "/assessment/trueself-16-type",
    testName: "TrueSelf 16-Type Assessment",
    featuredHref: "/assessment/trueself-16-type",
    journeyStage: "Master",
    tests: ["TrueSelf 16-Type Assessment"],
  },
  {
    id: "identity",
    name: "Identity",
    description: "Separate your real self from the persona people usually see",
    discover: "Core self, social self, social mask, self-concept, and personal values.",
    icon: "user",
    colorClass: "from-indigo-500 to-blue-500",
    color: "indigo",
    href: "/tests/identity/who-you-really-are",
    testName: "Who You Really Are",
    journeyStage: "Deepen",
    tests: ["Who You Really Are"],
  },
  {
    id: "relationships",
    name: "Relationships",
    description: "Understand how your personality connects and handles closeness",
    discover: "Love style, communication style, conflict style, compatibility, and friendship style.",
    icon: "users",
    colorClass: "from-pink-500 to-rose-500",
    color: "pink",
    href: "/tests/relationships/relationship-style",
    testName: "Relationship Style",
    journeyStage: "Apply",
    tests: ["Relationship Style"],
  },
  {
    id: "career",
    name: "Career",
    description: "Find the work environment and role style that fits you",
    discover: "Career fit, work style, leadership, team role, decision-making, and entrepreneurship.",
    icon: "briefcase",
    colorClass: "from-violet-500 to-purple-500",
    color: "violet",
    href: "/tests/career/career-fit",
    testName: "Career Fit",
    journeyStage: "Apply",
    tests: ["Career Fit"],
  },
  {
    id: "mind",
    name: "Mind",
    description: "See how you process information, learn, and solve problems",
    discover: "Thinking style, learning style, problem-solving, creativity, decisions, and attention.",
    icon: "brain",
    colorClass: "from-cyan-500 to-teal-500",
    color: "cyan",
    href: "/tests/mind/thinking-style",
    testName: "Thinking Style",
    journeyStage: "Apply",
    tests: ["Thinking Style"],
  },
  {
    id: "motivation",
    name: "Motivation",
    description: "Understand what gets you moving and what keeps you stuck",
    discover: "Achievement, discipline, risk, reward motivation, and procrastination pattern.",
    icon: "flame",
    colorClass: "from-orange-500 to-amber-500",
    color: "orange",
    href: "/tests/identity/what-drives-you",
    testName: "What Drives You",
    journeyStage: "Apply",
    tests: ["What Drives You"],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Turn your type into a practical development path",
    discover: "Strengths, blind spots, adaptability, resilience, comfort zone, and potential.",
    icon: "sprout",
    colorClass: "from-green-500 to-emerald-500",
    color: "green",
    href: "/tests/identity/strengths-weaknesses",
    testName: "Strengths & Blind Spots",
    journeyStage: "Develop",
    tests: ["Strengths & Blind Spots"],
  },
  {
    id: "stress-emotions",
    name: "Stress & Emotions",
    description: "Map how your personality shifts under pressure",
    discover: "Stress response, emotional processing, pressure style, burnout, expression, and recovery.",
    icon: "heart",
    colorClass: "from-red-500 to-pink-500",
    color: "red",
    href: "/tests/stress-emotions/stress-response",
    testName: "Stress Response",
    journeyStage: "Develop",
    tests: ["Stress Response"],
  },
  {
    id: "life",
    name: "Life",
    description: "Clarify the life direction and environment that feels aligned",
    discover: "Life direction, purpose, values alignment, lifestyle fit, change style, and priorities.",
    icon: "compass",
    colorClass: "from-slate-600 to-blue-600",
    color: "teal",
    href: "/tests/life/life-direction",
    testName: "Life Direction",
    journeyStage: "Develop",
    tests: ["Life Direction"],
  },
];

export const getColorClasses = (color: TestCategory["color"]) => {
  const colorMap: Record<
    TestCategory["color"],
    { bg: string; text: string; border: string }
  > = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-200",
    },
    red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
    pink: {
      bg: "bg-pink-50",
      text: "text-pink-600",
      border: "border-pink-200",
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-200",
    },
    violet: {
      bg: "bg-violet-50",
      text: "text-violet-600",
      border: "border-violet-200",
    },
    cyan: {
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      border: "border-cyan-200",
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-200",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
    },
    teal: {
      bg: "bg-teal-50",
      text: "text-teal-600",
      border: "border-teal-200",
    },
  };
  return colorMap[color];
};

export const getIcon = (iconType: IconType): LucideIcon => {
  const iconMap: Record<IconType, LucideIcon> = {
    dna: Dna,
    user: UserRound,
    users: Users,
    briefcase: Briefcase,
    brain: Brain,
    flame: Flame,
    sprout: Sprout,
    heart: Heart,
    compass: Compass,
    zap: Zap,
  };
  return iconMap[iconType];
};
