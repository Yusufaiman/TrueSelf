import {
  User,
  Users,
  Briefcase,
  Map,
  Brain,
  Heart,
  RefreshCw,
  Wallet,
  AlertCircle,
  Zap,
  LucideIcon,
} from "lucide-react";

export type IconType = "user" | "users" | "briefcase" | "map" | "brain" | "heart" | "refresh" | "wallet" | "alert" | "zap";

export interface TestCategory {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  colorClass: string;
  color: "blue" | "purple" | "orange" | "red" | "pink" | "indigo" | "violet" | "cyan" | "rose" | "amber" | "green" | "gray";
  href: string;
  tests: string[];
}

export const TEST_CATEGORIES: TestCategory[] = [
  {
    id: "identity",
    name: "Identity",
    description: "Understand who you really are at your core",
    icon: "user",
    colorClass: "from-blue-500 to-blue-600",
    color: "blue",
    href: "/tests/identity",
    tests: [
      "Who You Really Are",
      "Your Core Personality Type",
      "What Drives You",
      "Your Strengths and Weaknesses",
    ],
  },
  {
    id: "relationships",
    name: "Relationships",
    description: "Understand how you connect with others",
    icon: "users",
    colorClass: "from-pink-500 to-pink-600",
    color: "pink",
    href: "/tests/relationships",
    tests: [
      "Your Relationship Style",
      "Connection Patterns",
      "Social Dynamics",
      "How You Show Up for Others",
    ],
  },
  {
    id: "career",
    name: "Career",
    description: "Discover the work and path that fits you",
    icon: "briefcase",
    colorClass: "from-indigo-500 to-indigo-600",
    color: "indigo",
    href: "/tests/career",
    tests: [
      "Your Ideal Career Path",
      "Work Style Profile",
      "Strengths at Work",
      "Career Alignment Test",
    ],
  },
  {
    id: "life-direction",
    name: "Life Direction",
    description: "Get clarity on where you are going",
    icon: "map",
    colorClass: "from-violet-500 to-violet-600",
    color: "violet",
    href: "/tests/life-direction",
    tests: [
      "Life Vision Assessment",
      "Purpose Clarity Test",
      "Values Alignment",
      "Direction & Goals",
    ],
  },
  {
    id: "mindset",
    name: "Mindset",
    description: "Understand how your mind operates",
    icon: "brain",
    colorClass: "from-cyan-500 to-cyan-600",
    color: "cyan",
    href: "/tests/mindset",
    tests: [
      "Growth vs Fixed Mindset",
      "Thinking Patterns",
      "Belief Systems",
      "Mental Flexibility",
    ],
  },
  {
    id: "emotional-health",
    name: "Emotional Health",
    description: "Understand your emotional patterns",
    icon: "heart",
    colorClass: "from-rose-500 to-rose-600",
    color: "rose",
    href: "/tests/emotional-health",
    tests: [
      "Emotional Awareness",
      "Stress Response Patterns",
      "Emotional Regulation",
      "Resilience Profile",
    ],
  },
  {
    id: "life-patterns",
    name: "Life Patterns",
    description: "See the loops that keep repeating",
    icon: "refresh",
    colorClass: "from-amber-500 to-amber-600",
    color: "amber",
    href: "/tests/life-patterns",
    tests: [
      "Recurring Patterns",
      "Behavioral Cycles",
      "Decision Patterns",
      "Life Theme Analysis",
    ],
  },
  {
    id: "money",
    name: "Money",
    description: "Understand your financial behavior",
    icon: "wallet",
    colorClass: "from-green-500 to-green-600",
    color: "green",
    href: "/tests/money",
    tests: [
      "Financial Personality",
      "Money Mindset",
      "Spending Patterns",
      "Wealth Values",
    ],
  },
  {
    id: "reality-check",
    name: "Reality Check",
    description: "See what might be holding you back",
    icon: "alert",
    colorClass: "from-gray-500 to-gray-600",
    color: "gray",
    href: "/tests/reality-check",
    tests: [
      "Blind Spots Assessment",
      "Reality vs Perception",
      "Limiting Beliefs",
      "Growth Blockers",
    ],
  },
];

export const getColorClasses = (color: TestCategory["color"]) => {
  const colorMap: Record<TestCategory["color"], { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
    orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
    red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
    pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200" },
    indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
    violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" },
    cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200" },
    rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200" },
    amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
    green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
    gray: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
  };
  return colorMap[color];
};

export const getIcon = (iconType: IconType): LucideIcon => {
  const iconMap: Record<IconType, LucideIcon> = {
    user: User,
    users: Users,
    briefcase: Briefcase,
    map: Map,
    brain: Brain,
    heart: Heart,
    refresh: RefreshCw,
    wallet: Wallet,
    alert: AlertCircle,
    zap: Zap,
  };
  return iconMap[iconType];
};
