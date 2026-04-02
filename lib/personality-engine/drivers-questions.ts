// What Drives You - Test 3
// 16 Questions to identify internal psychological drivers

export type DriverType =
  | "growth"
  | "control"
  | "meaning"
  | "freedom"
  | "emotional"
  | "validation";

export interface DriverQuestion {
  id: number;
  text: string;
  driver: DriverType;
}

export const DRIVER_QUESTIONS: DriverQuestion[] = [
  // Growth Driver (Q1-Q3)
  {
    id: 1,
    text: "I feel most motivated when I see myself improving over time.",
    driver: "growth",
  },
  {
    id: 2,
    text: "I constantly think about who I could become in the future.",
    driver: "growth",
  },
  {
    id: 3,
    text: "I feel frustrated when I know I am not reaching my full potential.",
    driver: "growth",
  },

  // Control Driver (Q4-Q6)
  {
    id: 4,
    text: "I prefer having clear direction rather than figuring things out as I go.",
    driver: "control",
  },
  {
    id: 5,
    text: "I feel uncomfortable when things are uncertain or unpredictable.",
    driver: "control",
  },
  {
    id: 6,
    text: "I make decisions carefully to avoid mistakes or loss of control.",
    driver: "control",
  },

  // Meaning Driver (Q7-Q9)
  {
    id: 7,
    text: "I often question the deeper meaning behind my actions and choices.",
    driver: "meaning",
  },
  {
    id: 8,
    text: "I am driven to understand myself and the world more deeply.",
    driver: "meaning",
  },
  {
    id: 9,
    text: "I feel lost when I do not have a clear sense of purpose.",
    driver: "meaning",
  },

  // Freedom Driver (Q10-Q12)
  {
    id: 10,
    text: "I prefer flexibility over strict plans or routines.",
    driver: "freedom",
  },
  {
    id: 11,
    text: "I feel alive when I am exploring new paths or possibilities.",
    driver: "freedom",
  },
  {
    id: 12,
    text: "I dislike feeling restricted or controlled by structure.",
    driver: "freedom",
  },

  // Emotional Driver (Q13-Q14)
  {
    id: 13,
    text: "My emotions strongly influence the decisions I make.",
    driver: "emotional",
  },
  {
    id: 14,
    text: "I often act based on how I feel in the moment.",
    driver: "emotional",
  },

  // Validation Driver (Q15-Q16)
  {
    id: 15,
    text: "I care about how others see and perceive me.",
    driver: "validation",
  },
  {
    id: 16,
    text: "I feel driven to meet expectations from people around me.",
    driver: "validation",
  },
];
