/**
 * Debug: Simulate Assessment Results
 * User's actual scores from screenshot
 */

const IDENTITY_PATTERNS = [
  {
    type: "the-anchored",
    conditions: [
      { dimension: "selfAwareness", min: 75 },
      { dimension: "identityStability", min: 75 },
      { dimension: "innerConsistency", min: 70 },
      { dimension: "authenticity", min: 70 },
    ],
  },
  {
    type: "the-becoming",
    conditions: [
      { dimension: "selfAwareness", min: 60, max: 80 },
      { dimension: "identityStability", min: 50, max: 70 },
      { dimension: "externalInfluence", max: 40 },
    ],
  },
  {
    type: "the-split",
    conditions: [
      { dimension: "selfAwareness", min: 70 },
      { dimension: "innerConsistency", max: 40 },
      { dimension: "identityStability", max: 45 },
    ],
  },
  {
    type: "the-drifter",
    conditions: [
      { dimension: "selfAwareness", max: 45 },
      { dimension: "decisionClarity", max: 40 },
      { dimension: "externalInfluence", min: 70 },
    ],
  },
  {
    type: "the-masked",
    conditions: [
      { dimension: "authenticity", max: 45 },
      { dimension: "externalInfluence", min: 65 },
      { dimension: "socialExpression", max: 50 },
    ],
  },
  {
    type: "the-shifter",
    conditions: [
      { dimension: "identityStability", max: 40 },
      { dimension: "externalInfluence", min: 70 },
      { dimension: "selfAwareness", max: 50 },
    ],
  },
  {
    type: "the-rebuilder",
    conditions: [
      { dimension: "identityStability", max: 50 },
      { dimension: "selfAwareness", min: 65 },
      { dimension: "authenticity", min: 50 },
    ],
  },
  {
    type: "the-seeker",
    conditions: [
      { dimension: "decisionClarity", max: 45 },
      { dimension: "externalInfluence", min: 60 },
      { dimension: "identityStability", max: 55 },
    ],
  },
  {
    type: "the-observer",
    conditions: [
      { dimension: "selfAwareness", min: 75 },
      { dimension: "emotionalAlignment", max: 45 },
      { dimension: "socialExpression", max: 45 },
    ],
  },
  {
    type: "the-detached",
    conditions: [
      { dimension: "emotionalAlignment", max: 40 },
      { dimension: "socialExpression", max: 45 },
      { dimension: "authenticity", max: 50 },
    ],
  },
  {
    type: "the-creator",
    conditions: [
      { dimension: "authenticity", min: 75 },
      { dimension: "emotionalAlignment", min: 70 },
      { dimension: "selfAwareness", min: 70 },
    ],
  },
  {
    type: "the-caregiver",
    conditions: [
      { dimension: "emotionalAlignment", min: 75 },
      { dimension: "socialExpression", min: 75 },
      { dimension: "externalInfluence", min: 45, max: 70 },
    ],
  },
  {
    type: "the-lover",
    conditions: [
      { dimension: "authenticity", min: 75 },
      { dimension: "emotionalAlignment", min: 75 },
      { dimension: "socialExpression", min: 75 },
    ],
  },
  {
    type: "the-sage",
    conditions: [
      { dimension: "selfAwareness", min: 80 },
      { dimension: "innerConsistency", min: 75 },
      { dimension: "emotionalAlignment", min: 70 },
    ],
  },
  {
    type: "the-pioneer",
    conditions: [
      { dimension: "decisionClarity", min: 75 },
      { dimension: "authenticity", min: 70 },
      { dimension: "externalInfluence", max: 50 },
    ],
  },
];

function evaluatePattern(profile, pattern) {
  let matched = 0;
  let total = 0;
  const details = [];

  pattern.conditions.forEach((condition) => {
    const value = profile[condition.dimension];
    let conditionMet = true;

    if (condition.min !== undefined && value < condition.min) {
      conditionMet = false;
    }

    if (condition.max !== undefined && value > condition.max) {
      conditionMet = false;
    }

    if (conditionMet) {
      matched += 1;
    }

    total += 1;
    details.push({
      dimension: condition.dimension,
      value,
      condition,
      met: conditionMet,
    });
  });

  return {
    score: (matched / total) * 100,
    matched,
    total,
    details,
  };
}

console.log("\n" + "=".repeat(70));
console.log("DEBUG: USER'S ACTUAL ASSESSMENT RESULTS");
console.log("=".repeat(70));

// User's actual scores from the screenshot
const userScores = {
  selfAwareness: 58,
  authenticity: 46,
  externalInfluence: 58,
  identityStability: 58,
  emotionalAlignment: 46,
  decisionClarity: 50,
  innerConsistency: 50,
  socialExpression: 50,
};

console.log("\nUser Scores:", userScores);
console.log("\n" + "-".repeat(70));
console.log("PATTERN MATCHING RESULTS:");
console.log("-".repeat(70));

const results = IDENTITY_PATTERNS.map((pattern) => {
  const evaluation = evaluatePattern(userScores, pattern);
  return {
    type: pattern.type,
    ...evaluation,
  };
}).sort((a, b) => b.score - a.score);

// Show all results
results.forEach((r, idx) => {
  const matchSymbol =
    r.matched === r.total ? "✓ FULL" : r.matched > 0 ? "◐ PARTIAL" : "✗ NONE";
  console.log(
    `${(idx + 1)
      .toString()
      .padStart(2)}. ${r.type.padEnd(20)} ${matchSymbol.padEnd(10)} ${r.score
      .toFixed(0)
      .padStart(3)}% (${r.matched}/${r.total})`,
  );
});

// Show top 3 with breakdown
console.log("\n" + "=".repeat(70));
console.log("TOP 3 MATCHES - DETAILED BREAKDOWN:");
console.log("=".repeat(70));

results.slice(0, 3).forEach((result, idx) => {
  console.log(
    `\n${idx + 1}. ${result.type.toUpperCase()} - ${result.score.toFixed(0)}%`,
  );
  console.log("   Conditions:");
  result.details.forEach((detail) => {
    const status = detail.met ? "✓" : "✗";
    if (detail.condition.min && detail.condition.max) {
      console.log(
        `   ${status} ${detail.dimension}: ${detail.value} (must be ${detail.condition.min}-${detail.condition.max})`,
      );
    } else if (detail.condition.min) {
      console.log(
        `   ${status} ${detail.dimension}: ${detail.value} (must be ≥${detail.condition.min})`,
      );
    } else if (detail.condition.max) {
      console.log(
        `   ${status} ${detail.dimension}: ${detail.value} (must be ≤${detail.condition.max})`,
      );
    }
  });
});

// Anti-bias normalization
console.log("\n" + "=".repeat(70));
console.log("ANTI-BIAS NORMALIZATION (V2 Engine):");
console.log("=".repeat(70));

const avgScore = results.reduce((a, b) => a + b.score, 0) / results.length;
console.log(`\nAverage score across all types: ${avgScore.toFixed(1)}%`);
console.log(`Subtracting ${avgScore.toFixed(1)}% from all scores...\n`);

const normalized = results.map((r) => ({
  ...r,
  normalizedScore: r.score - avgScore,
}));

normalized.sort((a, b) => b.normalizedScore - a.normalizedScore);

console.log("Normalized Rankings:");
normalized.slice(0, 5).forEach((r, idx) => {
  console.log(
    `${(idx + 1)
      .toString()
      .padStart(2)}. ${r.type.padEnd(20)} ${r.normalizedScore
      .toFixed(1)
      .toString()
      .padStart(6)} (raw: ${r.score.toFixed(0)}%)`,
  );
});
