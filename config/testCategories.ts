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
    description: "Understand your core self, social self, and expression gap",
    discover: "Self-clarity, authenticity, values alignment, social adaptation, external influence, and identity stability.",
    icon: "user",
    colorClass: "from-indigo-500 to-blue-500",
    color: "indigo",
    href: "/assessment/identity-who-you-really-are",
    testName: "Who You Really Are",
    journeyStage: "Deepen",
    tests: ["Who You Really Are"],
  },
  {
    id: "relationships",
    name: "Relationships",
    description: "Understand how you connect, communicate, trust, and handle conflict",
    discover: "Emotional closeness, communication openness, trust, independence, care expression, relationship security, and conflict pattern.",
    icon: "users",
    colorClass: "from-pink-500 to-rose-500",
    color: "pink",
    href: "/assessment/relationship-style",
    testName: "Relationship Style",
    journeyStage: "Apply",
    tests: ["Relationship Style"],
  },
  {
    id: "career",
    name: "Career",
    description: "Find the work environment and role characteristics that fit how you work",
    discover: "Autonomy, structure, social work, problem complexity, creativity, leadership drive, stability, and achievement.",
    icon: "briefcase",
    colorClass: "from-violet-500 to-purple-500",
    color: "violet",
    href: "/assessment/career-fit",
    testName: "Career Fit",
    journeyStage: "Apply",
    tests: ["Career Fit"],
  },
  {
    id: "mind",
    name: "Mind",
    description: "See how your mind processes, learns, decides, and handles uncertainty",
    discover: "Analytical processing, intuitive processing, flexibility, depth, deliberation, uncertainty tolerance, learning exploration, and focus.",
    icon: "brain",
    colorClass: "from-cyan-500 to-teal-500",
    color: "cyan",
    href: "/assessment/mind-profile",
    testName: "Mind Profile",
    journeyStage: "Apply",
    tests: ["Mind Profile"],
  },
  {
    id: "motivation",
    name: "Motivation",
    description: "Understand what actually moves you to act, persist, and keep going",
    discover: "Growth, purpose, autonomy, progress, recognition, contribution, security, and challenge activation.",
    icon: "flame",
    colorClass: "from-orange-500 to-amber-500",
    color: "orange",
    href: "/assessment/motivation-profile",
    testName: "Motivation Profile",
    journeyStage: "Apply",
    tests: ["Motivation Profile"],
  },
  {
    id: "growth",
    name: "Growth",
    description: "See how you respond to feedback, setbacks, discomfort, and change",
    discover: "Growth mindset, self-awareness, feedback receptivity, recovery, discomfort tolerance, adaptive change, discipline, and reflective learning.",
    icon: "sprout",
    colorClass: "from-green-500 to-emerald-500",
    color: "green",
    href: "/assessment/growth-profile",
    testName: "Growth Profile",
    journeyStage: "Develop",
    tests: ["Growth Profile"],
  },
  {
    id: "stress-emotions",
    name: "Stress & Emotions",
    description: "Understand how you experience, regulate, express, and recover from emotional pressure",
    discover: "Emotional awareness, clarity, regulation, stress reactivity, recovery, expression, acceptance, and coping flexibility.",
    icon: "heart",
    colorClass: "from-red-500 to-pink-500",
    color: "red",
    href: "/assessment/stress-emotions-profile",
    testName: "Stress & Emotions Profile",
    journeyStage: "Develop",
    tests: ["Stress & Emotions Profile"],
  },
  {
    id: "life",
    name: "Life",
    description: "See how your current life fits together across direction, alignment, experience, and future",
    discover: "Life direction, meaning, balance, agency, satisfaction, connection, lifestyle alignment, and future outlook.",
    icon: "compass",
    colorClass: "from-slate-600 to-blue-600",
    color: "teal",
    href: "/assessment/life-profile",
    testName: "Life Profile",
    journeyStage: "Develop",
    tests: ["Life Profile"],
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
