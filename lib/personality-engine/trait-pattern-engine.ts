/**
 * Trait Pattern Detection Engine for Test 4: Strengths & Weaknesses
 * Generates dynamic performance pattern titles and personalized content
 * Based on combination of trait scores
 */

import { StrengthsTrait } from "./strengths-weaknesses-questions";
import { TraitScores } from "./strengths-weaknesses-engine";

// Trait descriptions
export const TRAIT_DESCRIPTIONS = {
  strategic_thinking: {
    strength: "You think ahead and understand how things connect.",
    weakness: "You overthink and delay action.",
  },
  discipline: {
    strength: "You stay consistent and follow through.",
    weakness: "You struggle to stay consistent.",
  },
  emotional_awareness: {
    strength: "You understand your emotions and others well.",
    weakness: "You ignore or disconnect from emotions.",
  },
  adaptability: {
    strength: "You adjust easily to change.",
    weakness: "You struggle when things change.",
  },
  decision_making: {
    strength: "You make decisions quickly and confidently.",
    weakness: "You hesitate and overthink decisions.",
  },
  social_energy: {
    strength: "You connect easily with people.",
    weakness: "You withdraw or struggle socially.",
  },
  consistency: {
    strength: "You maintain steady habits and routines.",
    weakness: "You are inconsistent over time.",
  },
  risk_handling: {
    strength: "You are comfortable taking risks.",
    weakness: "You avoid risks or act impulsively.",
  },
};

// Level classification
function getLevel(score: number): "high" | "medium" | "low" {
  if (score >= 75) return "high";
  if (score >= 50) return "medium";
  return "low";
}

// Get top 2 traits
function getTopTraits(
  traits: TraitScores
): [StrengthsTrait, StrengthsTrait] {
  const sorted = Object.entries(traits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([key]) => key as StrengthsTrait);
  return [sorted[0], sorted[1] || sorted[0]] as [StrengthsTrait, StrengthsTrait];
}

// Get bottom 2 traits
function getWeakestTraits(
  traits: TraitScores
): [StrengthsTrait, StrengthsTrait | undefined] {
  const sorted = Object.entries(traits)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([key]) => key as StrengthsTrait);
  return [sorted[0], sorted[1] || sorted[0]] as [StrengthsTrait, StrengthsTrait | undefined];
}

// Format trait name for display
function formatTraitName(trait: StrengthsTrait): string {
  const map: Record<StrengthsTrait, string> = {
    strategic_thinking: "Strategic Thinking",
    discipline: "Discipline",
    emotional_awareness: "Emotional Awareness",
    adaptability: "Adaptability",
    decision_making: "Decision Making",
    social_energy: "Social Energy",
    consistency: "Consistency",
    risk_handling: "Risk Handling",
  };
  return map[trait];
}

// Pattern detection rules (specific to general)
export function detectPattern(traits: TraitScores): string {
  const levels = {
    strategic: getLevel(traits.strategic_thinking),
    discipline: getLevel(traits.discipline),
    emotion: getLevel(traits.emotional_awareness),
    adapt: getLevel(traits.adaptability),
    decision: getLevel(traits.decision_making),
    social: getLevel(traits.social_energy),
    consistency: getLevel(traits.consistency),
    risk: getLevel(traits.risk_handling),
  };

  // Rule 1: Strong Structure + Low Flexibility
  if (
    levels.discipline === "high" &&
    levels.consistency === "high" &&
    levels.adapt === "low"
  ) {
    return "Strong Structure + Low Flexibility";
  }

  // Rule 2: Fast Action + Low Stability
  if (
    levels.decision === "high" &&
    levels.risk === "high" &&
    levels.consistency === "low"
  ) {
    return "Fast Action + Low Stability";
  }

  // Rule 3: High Awareness + Low Execution
  if (levels.emotion === "high" && levels.discipline === "low") {
    return "High Awareness + Low Execution";
  }

  // Rule 4: High Adaptability + Low Direction
  if (levels.adapt === "high" && levels.strategic === "low") {
    return "High Adaptability + Low Direction";
  }

  // Rule 5: Strong Thinking + Weak Emotional Awareness
  if (levels.strategic === "high" && levels.emotion === "low") {
    return "Strong Thinking + Weak Emotional Awareness";
  }

  // Rule 6: High Discipline + High Pressure (constraint)
  if (
    levels.discipline === "high" &&
    levels.emotion === "low" &&
    levels.adapt === "low"
  ) {
    return "High Discipline + High Pressure";
  }

  // Rule 7: Balanced but Unoptimized
  const allMediumOrHigh = Object.values(traits).every((s) => s >= 50 && s <= 75);
  if (allMediumOrHigh) {
    return "Balanced but Unoptimized";
  }

  // Rule 8: Low Structure + Low Consistency
  if (levels.discipline === "low" && levels.consistency === "low") {
    return "Low Structure + Low Consistency";
  }

  // Rule 9: Socially Strong + Internally Unclear
  if (levels.social === "high" && levels.strategic === "low") {
    return "Socially Strong + Internally Unclear";
  }

  // Rule 10: Risk-Taking + Low Planning
  if (levels.risk === "high" && levels.strategic === "low") {
    return "Risk-Taking + Low Planning";
  }

  // Rule 11: Consistent but Passive
  if (levels.consistency === "high" && levels.decision === "low") {
    return "Consistent but Passive";
  }

  // Rule 12: High Potential + Low Activation
  const highCount = Object.values(traits).filter((s) => s >= 70).length;
  if (highCount >= 4 && levels.discipline === "low") {
    return "High Potential + Low Activation";
  }

  // Fallback: Dynamic title
  const [top] = getTopTraits(traits);
  const [weak] = getWeakestTraits(traits);
  return `${formatTraitName(top)} + Low ${formatTraitName(weak)}`;
}

// Get strengths (≥70)
export function getStrengths(traits: TraitScores): StrengthsTrait[] {
  return (Object.entries(traits) as [StrengthsTrait, number][])
    .filter(([_, score]) => score >= 70)
    .map(([trait]) => trait);
}

// Get weaknesses (≤45)
export function getWeaknesses(traits: TraitScores): StrengthsTrait[] {
  return (Object.entries(traits) as [StrengthsTrait, number][])
    .filter(([_, score]) => score <= 45)
    .map(([trait]) => trait);
}

// Get hidden strengths (60-70)
export function getHiddenStrengths(traits: TraitScores): StrengthsTrait[] {
  return (Object.entries(traits) as [StrengthsTrait, number][])
    .filter(([_, score]) => score >= 60 && score < 70)
    .map(([trait]) => trait);
}

// Generate core insight
export function generateCoreInsight(
  strengths: StrengthsTrait[],
  weaknesses: StrengthsTrait[]
): string {
  if (strengths.length === 0 || weaknesses.length === 0) {
    return "Your profile reveals a distinctive balance of traits that shapes how you perform and interact with challenges.";
  }

  const topStrength = formatTraitName(strengths[0]);
  const topWeakness = formatTraitName(weaknesses[0]);

  return `You rely heavily on ${topStrength}, but your ${topWeakness} creates imbalance in how you perform. Understanding this dynamic is key to your growth.`;
}

// Generate what's really going on
export function generateWhatIsReallyGoing(
  pattern: string,
  strengths: StrengthsTrait[]
): string {
  if (strengths.length === 0) {
    return "Your pattern reveals a profile that needs intentional development across multiple areas.";
  }

  return `Your pattern "${pattern}" indicates that ${formatTraitName(strengths[0])} is your natural strength. This creates a unique behavioral style, with growth opportunities in other areas.`;
}

// Generate how you perform
export function generateHowYouPerform(
  strengths: StrengthsTrait[],
  traits: TraitScores
): string[] {
  const result = [];

  if (strengths.length >= 2) {
    result.push(
      `You perform best when leveraging your ${formatTraitName(strengths[0])} and ${formatTraitName(strengths[1])}.`
    );
  } else if (strengths.length === 1) {
    result.push(`You perform best when using ${formatTraitName(strengths[0])}.`);
  } else {
    result.push("You have balanced performance across most situations.");
  }

  result.push(
    "Your pattern shows consistent traits that define how you handle challenges."
  );
  result.push(
    "You perform optimally in environments that align with your natural strengths."
  );

  return result;
}

// Generate blind spots
export function generateBlindSpots(weaknesses: StrengthsTrait[]): string[] {
  if (weaknesses.length === 0) {
    return [
      "Your overall balance means there are few critical blind spots.",
      "Monitor areas where overconfidence could limit growth.",
    ];
  }

  return weaknesses
    .slice(0, 2)
    .map(
      (trait) =>
        `Your ${formatTraitName(trait)} may limit your performance if left unaddressed.`
    );
}

// Generate important insights
export function generateImportantInsights(
  pattern: string,
  strengths: StrengthsTrait[],
  weaknesses: StrengthsTrait[],
  traits: TraitScores
): string[] {
  const insights: string[] = [];

  if (strengths.length > 0 && weaknesses.length > 0) {
    insights.push(
      `Right now, your strength in ${formatTraitName(strengths[0])} is not fully balanced by ${formatTraitName(weaknesses[0])}.`
    );
  }

  insights.push(
    "Growth will come from improving your weaker areas without losing your strengths."
  );

  // Specific pattern insights
  if (pattern.includes("High")) {
    insights.push("Your high performance in some areas can mask development needs.");
  }

  if (pattern.includes("Low")) {
    insights.push("Begin by focusing on one low area rather than trying to improve all at once.");
  }

  return insights;
}

// Generate what to start doing
export function generateWhatToStartDoing(
  weaknesses: StrengthsTrait[],
  hidden: StrengthsTrait[]
): string[] {
  const actions: string[] = [];

  if (weaknesses.length > 0) {
    actions.push(
      `Focus on improving your ${formatTraitName(weaknesses[0])} through small daily actions.`
    );
  }

  if (weaknesses.length > 1) {
    actions.push(
      `Be aware of how your ${formatTraitName(weaknesses[0])} affects your decisions.`
    );
  }

  actions.push("Practice balancing your natural strengths with intentional growth.");

  if (hidden.length > 0) {
    actions.push(
      `Develop your emerging strength in ${formatTraitName(hidden[0])}.`
    );
  }

  return actions;
}

// Get resonating identity types
export function getResonatingIdentities(traits: TraitScores): string[] {
  const identities: string[] = [];

  if (traits.discipline >= 75 && traits.consistency >= 75) {
    identities.push("the-anchored");
  }

  if (traits.adaptability >= 75) {
    identities.push("the-shifter");
  }

  if (traits.emotional_awareness >= 75) {
    identities.push("the-seeker");
  }

  if (traits.consistency <= 45 && traits.decision_making <= 45) {
    identities.push("the-drifter");
  }

  if (traits.emotional_awareness >= 65 && traits.adaptability >= 60) {
    identities.push("the-becoming");
  }

  if (traits.decision_making <= 45 && traits.consistency <= 45) {
    identities.push("the-split");
  }

  if (traits.discipline >= 75 && traits.adaptability <= 45) {
    identities.push("the-controller");
  }

  return identities.slice(0, 3);
}

// Get related personality types
export function getRelatedPersonalities(traits: TraitScores): string[] {
  const types: string[] = [];

  if (traits.strategic_thinking >= 75) {
    types.push("The Strategic Architect");
  }

  if (traits.discipline >= 75) {
    types.push("The Relentless Executor");
  }

  if (traits.emotional_awareness >= 75) {
    types.push("The Emotional Navigator");
  }

  if (traits.adaptability >= 75) {
    types.push("The Adaptive Chameleon");
  }

  if (traits.decision_making >= 75) {
    types.push("The Fast Decider");
  }

  if (traits.risk_handling >= 75) {
    types.push("The Risk Runner");
  }

  if (traits.social_energy >= 75) {
    types.push("The Social Shapeshifter");
  }

  if (traits.consistency >= 75) {
    types.push("The Systems Builder");
  }

  return types.slice(0, 3);
}

// Build complete output
export interface TraitPatternResult {
  pattern: string;
  strengths: string[];
  weaknesses: string[];
  hiddenStrengths: string[];
  insight: string;
  whatIsReallyGoing: string;
  howYouPerform: string[];
  blindSpots: string[];
  importantInsights: string[];
  whatToStartDoing: string[];
  identityResonance: string[];
  relatedPersonalities: string[];
}

export function buildTraitPattern(traits: TraitScores): TraitPatternResult {
  const pattern = detectPattern(traits);
  const strengthTraits = getStrengths(traits);
  const weaknessTraits = getWeaknesses(traits);
  const hiddenTraits = getHiddenStrengths(traits);

  return {
    pattern,
    strengths: strengthTraits.map(
      (trait) => TRAIT_DESCRIPTIONS[trait].strength
    ),
    weaknesses: weaknessTraits.map(
      (trait) => TRAIT_DESCRIPTIONS[trait].weakness
    ),
    hiddenStrengths: hiddenTraits.map((trait) => formatTraitName(trait)),
    insight: generateCoreInsight(strengthTraits, weaknessTraits),
    whatIsReallyGoing: generateWhatIsReallyGoing(pattern, strengthTraits),
    howYouPerform: generateHowYouPerform(strengthTraits, traits),
    blindSpots: generateBlindSpots(weaknessTraits),
    importantInsights: generateImportantInsights(
      pattern,
      strengthTraits,
      weaknessTraits,
      traits
    ),
    whatToStartDoing: generateWhatToStartDoing(weaknessTraits, hiddenTraits),
    identityResonance: getResonatingIdentities(traits),
    relatedPersonalities: getRelatedPersonalities(traits),
  };
}
