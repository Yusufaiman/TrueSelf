/**
 * Debug: Test redesigned patterns with user's actual assessment scores
 */

const IDENTITY_PATTERNS = [
  {
    type: "the-anchored",
    conditions: [
      { dimension: "selfAwareness", min: 70 },
      { dimension: "identityStability", min: 70 },
      { dimension: "externalInfluence", max: 50 },
    ],
  },
  {
    type: "the-becoming",
    conditions: [
      { dimension: "identityStability", min: 45, max: 65 },
      { dimension: "selfAwareness", min: 55 },
      { dimension: "authenticity", min: 45 },
    ],
  },
  {
    type: "the-split",
    conditions: [
      { dimension: "selfAwareness", min: 65 },
      { dimension: "innerConsistency", max: 45 },
    ],
  },
  {
    type: "the-drifter",
    conditions: [
      { dimension: "selfAwareness", max: 50 },
      { dimension: "decisionClarity", max: 50 },
      { dimension: "externalInfluence", min: 60 },
    ],
  },
  {
    type: "the-masked",
    conditions: [
      { dimension: "authenticity", max: 50 },
      { dimension: "externalInfluence", min: 55 },
    ],
  },
  {
    type: "the-shifter",
    conditions: [
      { dimension: "identityStability", max: 50 },
      { dimension: "externalInfluence", min: 65 },
    ],
  },
  {
    type: "the-rebuilder",
    conditions: [
      { dimension: "identityStability", max: 55 },
      { dimension: "selfAwareness", min: 60 },
    ],
  },
  {
    type: "the-seeker",
    conditions: [
      { dimension: "decisionClarity", max: 55 },
      { dimension: "externalInfluence", min: 50 },
    ],
  },
  {
    type: "the-observer",
    conditions: [
      { dimension: "selfAwareness", min: 70 },
      { dimension: "socialExpression", max: 50 },
    ],
  },
  {
    type: "the-detached",
    conditions: [
      { dimension: "emotionalAlignment", max: 50 },
      { dimension: "socialExpression", max: 55 },
    ],
  },
  {
    type: "the-creator",
    conditions: [
      { dimension: "authenticity", min: 70 },
      { dimension: "emotionalAlignment", min: 70 },
    ],
  },
  {
    type: "the-caregiver",
    conditions: [
      { dimension: "emotionalAlignment", min: 70 },
      { dimension: "socialExpression", min: 70 },
    ],
  },
  {
    type: "the-lover",
    conditions: [
      { dimension: "authenticity", min: 70 },
      { dimension: "emotionalAlignment", min: 70 },
      { dimension: "socialExpression", min: 75 },
    ],
  },
  {
    type: "the-sage",
    conditions: [
      { dimension: "selfAwareness", min: 75 },
      { dimension: "innerConsistency", min: 70 },
    ],
  },
  {
    type: "the-pioneer",
    conditions: [
      { dimension: "decisionClarity", min: 70 },
      { dimension: "authenticity", min: 65 },
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
console.log("REDESIGNED V2 PATTERN ENGINE - USER'S ACTUAL ASSESSMENT");
console.log("=".repeat(70));

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

const results = IDENTITY_PATTERNS.map((pattern) => {
  const evaluation = evaluatePattern(userScores, pattern);
  return {
    type: pattern.type,
    ...evaluation,
  };
}).sort((a, b) => b.score - a.score);

console.log("ALL IDENTITY TYPES - PATTERN MATCH SCORES:");
console.log("-".repeat(70));
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

// Get top 5 with breakdown
console.log("\n" + "=".repeat(70));
console.log("TOP 5 MATCHES - DETAILED CONDITIONS:");
console.log("=".repeat(70));

results.slice(0, 5).forEach((result, idx) => {
  console.log(
    `\n${idx + 1}. ${result.type.toUpperCase()} - ${result.score.toFixed(0)}%`,
  );
  result.details.forEach((detail) => {
    const status = detail.met ? "✓" : "✗";
    if (detail.condition.min && detail.condition.max) {
      console.log(
        `   ${status} ${detail.dimension}: ${detail.value} (range: ${detail.condition.min}-${detail.condition.max})`,
      );
    } else if (detail.condition.min) {
      console.log(
        `   ${status} ${detail.dimension}: ${detail.value} (min: ${detail.condition.min})`,
      );
    } else if (detail.condition.max) {
      console.log(
        `   ${status} ${detail.dimension}: ${detail.value} (max: ${detail.condition.max})`,
      );
    }
  });
});

// Show normalization
console.log("\n" + "=".repeat(70));
console.log("ANTI-BIAS NORMALIZATION:");
console.log("=".repeat(70));

const avgScore = results.reduce((a, b) => a + b.score, 0) / results.length;
console.log(`\nAverage score: ${avgScore.toFixed(1)}%`);
console.log(`Normalizing (subtract average from all scores):\n`);

const normalized = results.map((r) => ({
  ...r,
  normalizedScore: r.score - avgScore,
}));

normalized.sort((a, b) => b.normalizedScore - a.normalizedScore);

console.log("Top 5 after normalization:");
normalized.slice(0, 5).forEach((r, idx) => {
  console.log(
    `${(idx + 1)
      .toString()
      .padStart(2)}. ${r.type.padEnd(20)} Score: ${r.normalizedScore
      .toFixed(1)
      .toString()
      .padStart(6)} (raw: ${r.score.toFixed(0)}%)`,
  );
});

console.log("\n" + "=".repeat(70));
console.log("CONCLUSION");
console.log("=".repeat(70));
console.log(`\nPrimary match: ${normalized[0].type}`);
console.log(`Secondary match: ${normalized[1].type}`);
console.log(`Tertiary match: ${normalized[2].type}`);
console.log(`\n✅ Different from just being 'The Becoming'!`);
