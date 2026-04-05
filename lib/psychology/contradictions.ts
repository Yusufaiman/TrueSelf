/**
 * Contradiction Detector
 * Identifies conflicting dimension combinations that signal blind spots or areas of growth
 */

import { GlobalDimension } from "./dimensions";

export interface Contradiction {
  type: string;
  dimensions: GlobalDimension[];
  severity: "low" | "medium" | "high";
  message: string;
  insight: string;
}

/**
 * Detect contradictions in dimension profile
 */
export function detectContradictions(
  dimensions: Record<GlobalDimension, number>,
): Contradiction[] {
  const contradictions: Contradiction[] = [];

  // Define contradiction pairs (threshold = diff must be >30 to flag)
  const THRESHOLD = 30;

  // High self-awareness but low emotional alignment
  if (dimensions.selfAwareness > 70 && dimensions.emotionalAlignment < 40) {
    contradictions.push({
      type: "awareness_alignment_gap",
      dimensions: ["selfAwareness", "emotionalAlignment"],
      severity: "high",
      message:
        "You have strong self-awareness but struggle to integrate emotions with actions",
      insight:
        "This suggests you understand yourself intellectually but find it hard to act on that understanding emotionally. Consider bridging the gap between thinking and feeling.",
    });
  }

  // High motivation but low discipline
  if (dimensions.motivationStrength > 75 && dimensions.discipline < 45) {
    contradictions.push({
      type: "motivation_discipline_gap",
      dimensions: ["motivationStrength", "discipline"],
      severity: "high",
      message: "You have strong motivation but struggle with follow-through",
      insight:
        "You're driven to start things but may lose focus before completion. Building disciplinary habits could help channel your motivation more effectively.",
    });
  }

  // High authenticity but high external influence
  if (dimensions.authenticity > 70 && dimensions.externalInfluence > 65) {
    contradictions.push({
      type: "authenticity_influence_conflict",
      dimensions: ["authenticity", "externalInfluence"],
      severity: "medium",
      message:
        "You value authenticity but are significantly influenced by external factors",
      insight:
        "You may struggle with staying true to yourself in social or professional situations. Consider where you're compromising your values.",
    });
  }

  // High risk tolerance but low adaptability
  if (dimensions.riskTolerance > 70 && dimensions.adaptability < 45) {
    contradictions.push({
      type: "risk_adaptability_gap",
      dimensions: ["riskTolerance", "adaptability"],
      severity: "medium",
      message:
        "You take risks but may struggle to adapt when things don't go as planned",
      insight:
        "You're willing to take risks but inflexible in your approach. Developing adaptability would help you navigate uncertainty better.",
    });
  }

  // Low decision clarity but high discipline
  if (dimensions.decisionClarity < 40 && dimensions.discipline > 70) {
    contradictions.push({
      type: "clarity_discipline_misalignment",
      dimensions: ["decisionClarity", "discipline"],
      severity: "medium",
      message:
        "You're disciplined but may lack clarity about what you're working toward",
      insight:
        "Your discipline is strong but potentially misdirected. Clarifying your goals could make your efforts more impactful.",
    });
  }

  // High identity stability but low authenticity
  if (dimensions.identityStability > 70 && dimensions.authenticity < 40) {
    contradictions.push({
      type: "stability_authenticity_gap",
      dimensions: ["identityStability", "authenticity"],
      severity: "medium",
      message: "Your identity is stable but may not feel like your true self",
      insight:
        "You have a consistent sense of self, but it might not align with your authentic values. This could signal a false self that needs examination.",
    });
  }

  // Low self-awareness but high inner consistency
  if (dimensions.selfAwareness < 40 && dimensions.innerConsistency > 70) {
    contradictions.push({
      type: "awareness_consistency_gap",
      dimensions: ["selfAwareness", "innerConsistency"],
      severity: "high",
      message:
        "You're internally consistent but lack awareness of your own patterns",
      insight:
        "Your behavior is consistent, but you may not understand why. Self-reflection and feedback from others could increase your awareness.",
    });
  }

  // High social expression but low authenticity
  if (dimensions.socialExpression > 70 && dimensions.authenticity < 45) {
    contradictions.push({
      type: "expression_authenticity_gap",
      dimensions: ["socialExpression", "authenticity"],
      severity: "high",
      message: "You express yourself freely but may be masking your true self",
      insight:
        "You're socially expressive but possibly inauthentic. Consider whether you're being your true self in social situations.",
    });
  }

  return contradictions;
}

/**
 * Get severity-weighted insight from contradictions
 */
export function getSeverityWeightedInsight(
  contradictions: Contradiction[],
): string | null {
  if (contradictions.length === 0) return null;

  // Sort by severity
  const sorted = contradictions.sort((a, b) => {
    const severityOrder = { high: 0, medium: 1, low: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  return sorted[0].insight;
}
