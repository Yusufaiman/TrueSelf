// Test script to verify trait pattern detection
import {
  buildTraitPattern,
  detectPattern,
  TRAIT_DESCRIPTIONS,
} from "./lib/personality-engine/trait-pattern-engine";
import { TraitScores } from "./lib/personality-engine/strengths-weaknesses-engine";

// Test case 1: High discipline & consistency, low adaptability
const testCase1: TraitScores = {
  strategic_thinking: 60,
  discipline: 80,
  emotional_awareness: 55,
  adaptability: 35,
  decision_making: 60,
  social_energy: 50,
  consistency: 80,
  risk_handling: 45,
};

// Test case 2: Fast action & risk, low consistency
const testCase2: TraitScores = {
  strategic_thinking: 50,
  discipline: 40,
  emotional_awareness: 50,
  adaptability: 70,
  decision_making: 78,
  social_energy: 65,
  consistency: 35,
  risk_handling: 75,
};

// Test case 3: High awareness, low discipline
const testCase3: TraitScores = {
  strategic_thinking: 55,
  discipline: 35,
  emotional_awareness: 80,
  adaptability: 60,
  decision_making: 50,
  social_energy: 70,
  consistency: 45,
  risk_handling: 50,
};

// Test case 4: Balanced profile
const testCase4: TraitScores = {
  strategic_thinking: 60,
  discipline: 65,
  emotional_awareness: 60,
  adaptability: 62,
  decision_making: 58,
  social_energy: 65,
  consistency: 60,
  risk_handling: 62,
};

console.log("=== Test Case 1: Strong Structure + Low Flexibility ===");
const result1 = buildTraitPattern(testCase1);
console.log(`Pattern: ${result1.pattern}`);
console.log(`Strengths: ${result1.strengths.length} items`);
console.log(`Weaknesses: ${result1.weaknesses.length} items`);
console.log(`Hidden Strengths: ${result1.hiddenStrengths}`);
console.log(`What to do: ${result1.whatToStartDoing.length} actions`);
console.log();

console.log("=== Test Case 2: Fast Action + Low Stability ===");
const result2 = buildTraitPattern(testCase2);
console.log(`Pattern: ${result2.pattern}`);
console.log(`Strengths: ${result2.strengths.length} items`);
console.log(`Weaknesses: ${result2.weaknesses.length} items`);
console.log(`Hidden Strengths: ${result2.hiddenStrengths}`);
console.log();

console.log("=== Test Case 3: High Awareness + Low Execution ===");
const result3 = buildTraitPattern(testCase3);
console.log(`Pattern: ${result3.pattern}`);
console.log(`Strengths: ${result3.strengths.length} items`);
console.log(`Weaknesses: ${result3.weaknesses.length} items`);
console.log(`Hidden Strengths: ${result3.hiddenStrengths}`);
console.log();

console.log("=== Test Case 4: Balanced but Unoptimized ===");
const result4 = buildTraitPattern(testCase4);
console.log(`Pattern: ${result4.pattern}`);
console.log(`Strengths: ${result4.strengths.length} items`);
console.log(`Weaknesses: ${result4.weaknesses.length} items`);
console.log(`Hidden Strengths: ${result4.hiddenStrengths}`);
console.log();

// Verify patterns are different
const patterns = [
  result1.pattern,
  result2.pattern,
  result3.pattern,
  result4.pattern,
];
const uniquePatterns = new Set(patterns);
console.log(
  `✓ Generated ${uniquePatterns.size} unique patterns from 4 test cases`,
);
console.log(`✓ All patterns: ${Array.from(uniquePatterns).join(", ")}`);
