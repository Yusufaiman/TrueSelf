import type { LifeDimensionKey, LifeQuestion } from "./types";

export const LIFE_ASSESSMENT_VERSION = 1;

export const LIFE_DIMENSION_ORDER: LifeDimensionKey[] = [
  "life_direction",
  "meaning_fulfillment",
  "life_balance",
  "personal_agency",
  "life_satisfaction",
  "connection_belonging",
  "lifestyle_alignment",
  "future_outlook",
];

export const LIFE_DIMENSIONS: Record<
  LifeDimensionKey,
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
  life_direction: {
    label: "Life Direction",
    shortLabel: "Direction",
    description:
      "Clarity about where your life is heading, what you are prioritizing, and what chapter you are moving toward.",
    lowLabel: "Exploring Direction",
    highLabel: "Directionally Clear",
    color: "#2563eb",
    soft: "#dbeafe",
  },
  meaning_fulfillment: {
    label: "Meaning & Fulfillment",
    shortLabel: "Meaning",
    description:
      "How meaningful, worthwhile, and personally significant your current life feels.",
    lowLabel: "Seeking Greater Meaning",
    highLabel: "Meaningfully Engaged",
    color: "#7c3aed",
    soft: "#ede9fe",
  },
  life_balance: {
    label: "Life Balance",
    shortLabel: "Balance",
    description:
      "How sustainable your current distribution of time, energy, responsibility, and recovery feels.",
    lowLabel: "Uneven / Overextended Balance",
    highLabel: "Sustainable Balance",
    color: "#0d9488",
    soft: "#ccfbf1",
  },
  personal_agency: {
    label: "Personal Agency",
    shortLabel: "Agency",
    description:
      "How much you experience yourself as an active participant in shaping your life, while still respecting real circumstances.",
    lowLabel: "Circumstance-Constrained",
    highLabel: "Agentic / Self-Directed",
    color: "#ea580c",
    soft: "#ffedd5",
  },
  life_satisfaction: {
    label: "Life Satisfaction",
    shortLabel: "Satisfaction",
    description:
      "Your overall evaluation of life as it currently is, separate from temporary mood or personality.",
    lowLabel: "Seeking Change",
    highLabel: "Life-Satisfied",
    color: "#16a34a",
    soft: "#dcfce7",
  },
  connection_belonging: {
    label: "Connection & Belonging",
    shortLabel: "Connection",
    description:
      "Whether your current life provides meaningful human connection, support, and belonging.",
    lowLabel: "Seeking Greater Connection",
    highLabel: "Connected & Belonging",
    color: "#db2777",
    soft: "#fce7f3",
  },
  lifestyle_alignment: {
    label: "Lifestyle Alignment",
    shortLabel: "Alignment",
    description:
      "Whether your daily routines, time, and choices reflect what you say matters to you.",
    lowLabel: "Life-Priority Gap",
    highLabel: "Aligned Living",
    color: "#0891b2",
    soft: "#cffafe",
  },
  future_outlook: {
    label: "Future Outlook",
    shortLabel: "Future",
    description:
      "How much you can see meaningful possibilities, hope, and future chapters worth moving toward.",
    lowLabel: "Future-Uncertain",
    highLabel: "Future-Positive",
    color: "#f59e0b",
    soft: "#fef3c7",
  },
};

const question = (
  id: number,
  code: string,
  text: string,
  dimension: LifeDimensionKey,
  scoring: "direct" | "reverse",
  facet: string,
  displayOrder: number,
): LifeQuestion => ({
  id,
  code,
  text,
  dimension,
  scoring,
  facet,
  displayOrder,
});

export const LIFE_QUESTIONS: LifeQuestion[] = [
  question(1, "LIF-LD01", "I have a reasonably clear sense of the direction I want my life to move in.", "life_direction", "direct", "Direction Clarity", 1),
  question(2, "LIF-MF01", "There are meaningful parts of my current life that make my effort feel worthwhile.", "meaning_fulfillment", "direct", "Meaning", 2),
  question(3, "LIF-LB01", "The way I divide my time and energy generally feels sustainable.", "life_balance", "direct", "Sustainability", 3),
  question(4, "LIF-PA01", "I feel that my choices can meaningfully influence the direction of my life.", "personal_agency", "direct", "Personal Influence", 4),
  question(5, "LIF-LS01", "Overall, there are many things about my current life that I feel satisfied with.", "life_satisfaction", "direct", "Overall Satisfaction", 5),
  question(6, "LIF-CB01", "I have people or communities in my life where I feel that I genuinely belong.", "connection_belonging", "direct", "Belonging", 6),
  question(7, "LIF-LA01", "The way I spend most of my time generally reflects what is important to me.", "lifestyle_alignment", "direct", "Priority Alignment", 7),
  question(8, "LIF-FO01", "When I think about my future, I can see possibilities that I genuinely look forward to.", "future_outlook", "direct", "Positive Anticipation", 8),
  question(9, "LIF-LS02", "My current life feels significantly different from the life I would like to be living.", "life_satisfaction", "reverse", "Desired-Current Gap", 9),
  question(10, "LIF-LD02", "I often feel unsure about what I am actually working toward in life.", "life_direction", "reverse", "Direction Uncertainty", 10),
  question(11, "LIF-CB02", "Even when I am around other people, I can sometimes feel disconnected from meaningful belonging.", "connection_belonging", "reverse", "Social Disconnection", 11),
  question(12, "LIF-FO02", "It is sometimes difficult for me to imagine my life becoming meaningfully better than it is now.", "future_outlook", "reverse", "Future Possibility", 12),
  question(13, "LIF-LB02", "One area of my life often consumes so much energy that other important areas are neglected.", "life_balance", "reverse", "Life Imbalance", 13),
  question(14, "LIF-LA02", "There is often a noticeable gap between what I say matters to me and how I actually live.", "lifestyle_alignment", "reverse", "Value-Behavior Gap", 14),
  question(15, "LIF-MF02", "Much of what I do can sometimes feel disconnected from anything that truly matters to me.", "meaning_fulfillment", "reverse", "Meaning Disconnection", 15),
  question(16, "LIF-PA02", "My life often feels shaped more by circumstances than by decisions I am able to make.", "personal_agency", "reverse", "Circumstantial Control", 16),
  question(17, "LIF-PA03", "When an important part of my life is not working, I usually believe there is something I can do to influence what happens next.", "personal_agency", "direct", "Change Agency", 17),
  question(18, "LIF-LA03", "My regular routines generally support the kind of life I want to build.", "lifestyle_alignment", "direct", "Routine Alignment", 18),
  question(19, "LIF-MF03", "At least some of the things I spend my time on give me a genuine sense of fulfillment.", "meaning_fulfillment", "direct", "Fulfillment", 19),
  question(20, "LIF-CB03", "There are people in my current life with whom I can feel genuinely connected rather than simply socially present.", "connection_belonging", "direct", "Meaningful Connection", 20),
  question(21, "LIF-FO03", "Even when I am uncertain about exactly what will happen, I can usually see reasons to keep moving forward.", "future_outlook", "direct", "Forward Orientation", 21),
  question(22, "LIF-LS03", "When I look at my life as a whole right now, I feel reasonably positive about where I am.", "life_satisfaction", "direct", "Current Evaluation", 22),
  question(23, "LIF-LD03", "I can identify the things I want to prioritize in this chapter of my life.", "life_direction", "direct", "Priority Clarity", 23),
  question(24, "LIF-LB03", "I usually have enough room in my life for both responsibilities and some form of recovery or personal time.", "life_balance", "direct", "Recovery Space", 24),
  question(25, "LIF-LB04", "My responsibilities often leave too little energy for other parts of life that matter to me.", "life_balance", "reverse", "Energy Imbalance", 25),
  question(26, "LIF-FO04", "Thinking far ahead can sometimes make the future feel more uncertain than promising to me.", "future_outlook", "reverse", "Future Uncertainty", 26),
  question(27, "LIF-PA04", "I sometimes feel that important parts of my future depend mostly on factors outside my control.", "personal_agency", "reverse", "External Constraint", 27),
  question(28, "LIF-MF04", "I sometimes go through my responsibilities without feeling much personal significance in what I am doing.", "meaning_fulfillment", "reverse", "Personal Significance", 28),
  question(29, "LIF-LA04", "I often spend large amounts of time on things that are not among my real priorities.", "lifestyle_alignment", "reverse", "Time Misalignment", 29),
  question(30, "LIF-LD04", "When I think about the next few years, it is difficult for me to picture what I want to be moving toward.", "life_direction", "reverse", "Future Direction", 30),
  question(31, "LIF-CB04", "I sometimes feel that few people in my life really understand the person behind what others normally see.", "connection_belonging", "reverse", "Feeling Understood", 31),
  question(32, "LIF-LS04", "I often think that important parts of my life should be very different from how they are now.", "life_satisfaction", "reverse", "Change Desire", 32),
  question(33, "LIF-CB05", "I feel that I have at least some relationships where my presence genuinely matters.", "connection_belonging", "direct", "Relational Significance", 33),
  question(34, "LIF-LS05", "Even though some things could improve, I can appreciate the life I currently have.", "life_satisfaction", "direct", "Current Appreciation", 34),
  question(35, "LIF-LD05", "Even if my plans change, I generally know what kind of life I am trying to build.", "life_direction", "direct", "Life Trajectory", 35),
  question(36, "LIF-LB05", "The different areas of my life generally coexist without constantly competing for all of my attention.", "life_balance", "direct", "Demand Balance", 36),
  question(37, "LIF-PA05", "I generally see myself as someone who can actively shape at least part of what my life becomes.", "personal_agency", "direct", "Life Ownership", 37),
  question(38, "LIF-FO05", "I believe there are meaningful experiences, opportunities, or chapters of life still ahead of me.", "future_outlook", "direct", "Future Possibility", 38),
  question(39, "LIF-MF05", "My current life contains experiences, responsibilities, or relationships that feel deeply worthwhile to me.", "meaning_fulfillment", "direct", "Worthwhile Living", 39),
  question(40, "LIF-LA05", "The choices I make in everyday life usually move me toward the things I consider important.", "lifestyle_alignment", "direct", "Daily Alignment", 40),
  question(41, "LIF-LA06", "When I look at how I actually live, some of my most important priorities receive less attention than I believe they should.", "lifestyle_alignment", "reverse", "Priority Neglect", 41),
  question(42, "LIF-MF06", "Even when I accomplish what I need to do, I can be left wondering what any of it really means to me.", "meaning_fulfillment", "reverse", "Achievement-Meaning Gap", 42),
  question(43, "LIF-FO06", "I sometimes struggle to find things about my longer-term future that I genuinely feel excited about.", "future_outlook", "reverse", "Future Engagement", 43),
  question(44, "LIF-CB06", "I often wish I had a stronger sense of community or meaningful connection than I currently do.", "connection_belonging", "reverse", "Connection Gap", 44),
  question(45, "LIF-LS06", "If I could redesign major parts of my current life, I would want many of them to be substantially different.", "life_satisfaction", "reverse", "Life Discrepancy", 45),
  question(46, "LIF-PA06", "Even when I know what I would like to change, I often feel that I have very little ability to affect the situation.", "personal_agency", "reverse", "Perceived Powerlessness", 46),
  question(47, "LIF-LB06", "I often feel that keeping one part of my life under control requires sacrificing another important part.", "life_balance", "reverse", "Life Trade-Off", 47),
  question(48, "LIF-LD06", "Different possibilities often pull me in so many directions that I struggle to know which one deserves my attention.", "life_direction", "reverse", "Direction Conflict", 48),
].sort((a, b) => a.displayOrder - b.displayOrder);
