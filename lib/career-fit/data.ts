import type { CareerDimensionKey, CareerQuestion } from "./types";

export const CAREER_DIMENSION_ORDER: CareerDimensionKey[] = [
  "work_autonomy",
  "structure_preference",
  "social_work_orientation",
  "problem_complexity",
  "creative_orientation",
  "leadership_drive",
  "stability_orientation",
  "achievement_drive",
];

export const CAREER_DIMENSIONS: Record<
  CareerDimensionKey,
  {
    label: string;
    shortLabel: string;
    description: string;
    lowLabel: string;
    highLabel: string;
    color: string;
    soft: string;
  }
> = {
  work_autonomy: {
    label: "Work Autonomy",
    shortLabel: "Autonomy",
    description:
      "How much freedom, ownership, and self-direction you naturally prefer in how work gets done.",
    lowLabel: "Guided",
    highLabel: "Self-Directed",
    color: "#2563eb",
    soft: "#dbeafe",
  },
  structure_preference: {
    label: "Structure Preference",
    shortLabel: "Structure",
    description:
      "Preference for planning, predictable workflows, clear expectations, and defined processes.",
    lowLabel: "Flexible",
    highLabel: "Structured",
    color: "#7c3aed",
    soft: "#ede9fe",
  },
  social_work_orientation: {
    label: "Social Work Orientation",
    shortLabel: "Interaction",
    description:
      "How much collaboration, discussion, and meaningful human interaction contribute to engaging work.",
    lowLabel: "Independent",
    highLabel: "People-Interactive",
    color: "#db2777",
    soft: "#fce7f3",
  },
  problem_complexity: {
    label: "Problem Complexity",
    shortLabel: "Complexity",
    description:
      "How much cognitive challenge, ambiguity, analysis, and non-obvious problem solving you seek.",
    lowLabel: "Clear Execution",
    highLabel: "Complex Exploration",
    color: "#0891b2",
    soft: "#cffafe",
  },
  creative_orientation: {
    label: "Creative Orientation",
    shortLabel: "Creation",
    description:
      "Preference for creating, experimenting, improving, and developing original approaches.",
    lowLabel: "Optimization",
    highLabel: "Innovation",
    color: "#f97316",
    soft: "#ffedd5",
  },
  leadership_drive: {
    label: "Leadership Drive",
    shortLabel: "Leadership",
    description:
      "Desire to take responsibility, influence direction, coordinate people, and own collective outcomes.",
    lowLabel: "Contributor",
    highLabel: "Ownership",
    color: "#16a34a",
    soft: "#dcfce7",
  },
  stability_orientation: {
    label: "Stability Orientation",
    shortLabel: "Stability",
    description:
      "How much security, predictability, income continuity, and career steadiness matter to you.",
    lowLabel: "Opportunity",
    highLabel: "Stability",
    color: "#64748b",
    soft: "#f1f5f9",
  },
  achievement_drive: {
    label: "Achievement Drive",
    shortLabel: "Growth",
    description:
      "How strongly mastery, advancement, challenge, measurable progress, and growth motivate career satisfaction.",
    lowLabel: "Sustainable Pace",
    highLabel: "High Achievement",
    color: "#dc2626",
    soft: "#fee2e2",
  },
};

const question = (
  id: number,
  code: string,
  text: string,
  dimension: CareerDimensionKey,
  scoring: "direct" | "reverse",
  facet: string,
  displayOrder: number,
): CareerQuestion => ({
  id,
  code,
  text,
  dimension,
  scoring,
  facet,
  displayOrder,
});

export const CAREER_FIT_QUESTIONS: CareerQuestion[] = [
  question(1, "WA01", "I perform best when I am trusted to decide how to approach my work.", "work_autonomy", "direct", "Execution Freedom", 1),
  question(7, "SP01", "I work better when priorities, deadlines, and expectations are clearly defined.", "structure_preference", "direct", "Expectation Clarity", 2),
  question(13, "SW01", "Regular interaction with other people makes work more engaging for me.", "social_work_orientation", "direct", "Social Engagement", 3),
  question(19, "PC01", "I enjoy work that requires me to figure out problems that do not have obvious answers.", "problem_complexity", "direct", "Ambiguous Problems", 4),
  question(25, "CR01", "I enjoy finding new ways to approach problems instead of always following established methods.", "creative_orientation", "direct", "Innovation", 5),
  question(31, "LD01", "I am comfortable taking responsibility for decisions that affect a group.", "leadership_drive", "direct", "Decision Responsibility", 6),
  question(37, "ST01", "Having a stable and predictable career environment is very important to me.", "stability_orientation", "direct", "Career Stability", 7),
  question(43, "AD01", "I am motivated by work that continually gives me something new to master.", "achievement_drive", "direct", "Mastery", 8),
  question(2, "WA02", "I prefer someone to give me clear instructions about how a task should be completed.", "work_autonomy", "reverse", "Direction Preference", 9),
  question(8, "SP02", "I enjoy work environments where priorities can change frequently without much advance planning.", "structure_preference", "reverse", "Fluidity", 10),
  question(14, "SW02", "I would be comfortable spending most of my working day completing tasks independently.", "social_work_orientation", "reverse", "Independent Work", 11),
  question(20, "PC02", "I prefer tasks where the correct approach is already known and straightforward.", "problem_complexity", "reverse", "Solution Clarity", 12),
  question(26, "CR02", "If an existing method works well, I usually see little reason to experiment with alternatives.", "creative_orientation", "reverse", "Established Methods", 13),
  question(32, "LD02", "I would usually rather contribute to a project than be the person responsible for directing it.", "leadership_drive", "reverse", "Contributor Preference", 14),
  question(38, "ST02", "I would accept substantial uncertainty if an opportunity offered enough potential for growth or reward.", "stability_orientation", "reverse", "Opportunity Risk", 15),
  question(44, "AD02", "Once I become comfortable in a role, I have little desire to keep increasing the level of challenge.", "achievement_drive", "reverse", "Challenge Seeking", 16),
  question(3, "WA03", "I enjoy having ownership over decisions within the work I am responsible for.", "work_autonomy", "direct", "Decision Ownership", 17),
  question(9, "SP03", "Having an organized workflow helps me stay focused and productive.", "structure_preference", "direct", "Workflow Structure", 18),
  question(15, "SW03", "I enjoy work that requires exchanging ideas with other people throughout the day.", "social_work_orientation", "direct", "Collaborative Thinking", 19),
  question(21, "PC03", "Difficult problems tend to hold my attention longer than simple, repetitive tasks.", "problem_complexity", "direct", "Cognitive Challenge", 20),
  question(27, "CR03", "Work becomes more engaging when I have opportunities to create or develop something new.", "creative_orientation", "direct", "Creation", 21),
  question(33, "LD03", "When a group lacks direction, I naturally feel inclined to help establish what should happen next.", "leadership_drive", "direct", "Direction Setting", 22),
  question(39, "ST03", "I value knowing that my income and work situation are likely to remain reasonably consistent.", "stability_orientation", "direct", "Financial Predictability", 23),
  question(45, "AD03", "Seeing clear progress in my skills or responsibilities is important to my sense of career satisfaction.", "achievement_drive", "direct", "Progress", 24),
  question(4, "WA04", "I feel more comfortable when important work decisions are made by someone with greater responsibility than me.", "work_autonomy", "reverse", "Decision Guidance", 25),
  question(10, "SP04", "I prefer deciding what to work on as situations develop rather than following a predetermined plan.", "structure_preference", "reverse", "Emergent Planning", 26),
  question(16, "SW04", "I generally prefer tasks that allow me to work without frequent interaction with others.", "social_work_orientation", "reverse", "Solo Preference", 27),
  question(22, "PC04", "I find work more satisfying when I can apply a clear method rather than repeatedly solve unfamiliar problems.", "problem_complexity", "reverse", "Established Solutions", 28),
  question(28, "CR04", "I would rather improve an existing solution than regularly start from an open-ended idea.", "creative_orientation", "reverse", "Optimization", 29),
  question(34, "LD04", "Managing other people's work is generally less appealing to me than focusing on my own responsibilities.", "leadership_drive", "reverse", "Management Preference", 30),
  question(40, "ST04", "An uncertain career path can be exciting to me when it creates possibilities that a safer path would not.", "stability_orientation", "reverse", "Uncertainty Tolerance", 31),
  question(46, "AD04", "Career advancement matters less to me than having a role that remains comfortable and manageable.", "achievement_drive", "reverse", "Advancement", 32),
  question(5, "WA05", "When I am given an objective, I usually prefer figuring out the best way to achieve it myself.", "work_autonomy", "direct", "Self-Direction", 33),
  question(11, "SP05", "Clear processes make it easier for me to do my best work.", "structure_preference", "direct", "Process Preference", 34),
  question(17, "SW05", "Working directly with teammates, clients, or other people often adds meaning to my work.", "social_work_orientation", "direct", "Human Interaction", 35),
  question(23, "PC05", "I enjoy breaking complicated problems into smaller parts until I understand how they work.", "problem_complexity", "direct", "Problem Decomposition", 36),
  question(29, "CR05", "I enjoy experimenting with ideas even when I do not yet know whether they will work.", "creative_orientation", "direct", "Experimentation", 37),
  question(35, "LD05", "The opportunity to influence the direction of a team or organization is motivating to me.", "leadership_drive", "direct", "Influence", 38),
  question(41, "ST05", "When comparing career opportunities, long-term security carries significant weight in my decision.", "stability_orientation", "direct", "Security Priority", 39),
  question(47, "AD05", "Reaching one professional goal usually makes me want to pursue another meaningful challenge.", "achievement_drive", "direct", "Goal Progression", 40),
  question(6, "WA06", "I would rather follow an established approach than have to decide for myself how the work should be done.", "work_autonomy", "reverse", "Method Guidance", 41),
  question(12, "SP06", "Too many procedures and predefined steps usually make work feel unnecessarily restrictive to me.", "structure_preference", "reverse", "Procedural Flexibility", 42),
  question(18, "SW06", "If I could complete my responsibilities successfully on my own, I would usually prefer minimal collaboration.", "social_work_orientation", "reverse", "Collaboration Need", 43),
  question(24, "PC06", "Constantly having to solve new and complicated problems would eventually become draining for me.", "problem_complexity", "reverse", "Complexity Tolerance", 44),
  question(30, "CR06", "Having too many possibilities for how something could be done can make work less appealing to me.", "creative_orientation", "reverse", "Open-Endedness", 45),
  question(36, "LD06", "Even if I had the ability to lead, I would generally prefer someone else to carry the responsibility for the group's overall outcome.", "leadership_drive", "reverse", "Responsibility Preference", 46),
  question(42, "ST06", "I would rather take a promising but uncertain path than remain in a secure situation with limited possibilities.", "stability_orientation", "reverse", "Risk-Opportunity Preference", 47),
  question(48, "AD06", "I would be satisfied staying at roughly the same professional level for a long time if the work suited my lifestyle.", "achievement_drive", "reverse", "Growth Intensity", 48),
].sort((a, b) => a.displayOrder - b.displayOrder);
