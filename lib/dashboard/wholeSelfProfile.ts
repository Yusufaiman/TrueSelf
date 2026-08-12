import type { TestResult } from "@/utils/supabase/client-results";

export type WholeSelfAxisKey =
  | "self_clarity"
  | "social_orientation"
  | "emotional_attunement"
  | "cognitive_exploration"
  | "structure_execution"
  | "drive_agency"
  | "relational_connection"
  | "adaptability"
  | "inner_regulation"
  | "life_alignment";

export interface WholeSelfAxis {
  key: WholeSelfAxisKey;
  label: string;
  score: number;
  lowLabel: string;
  highLabel: string;
  kind: "descriptive" | "capacity";
  contributors: string[];
}

export interface WholeSelfPattern {
  name: string;
  narrative: string;
  signatureTraits: Array<{ title: string; description: string }>;
  naturalTensions: Array<{ title: string; description: string }>;
  convergence: Array<{ title: string; description: string }>;
  contradictions: Array<{ title: string; description: string }>;
  whatMattersMost: string[];
  operatingStyle: string[];
  atBest: string;
  underPressure: string;
}

export interface WholeSelfProfile {
  axes: WholeSelfAxis[];
  coverage: {
    completedDomains: number;
    totalDomains: number;
    label: string;
    percent: number;
  };
  confidence: number;
  profileReady: boolean;
  pattern: WholeSelfPattern;
}

const domainByType: Record<string, string> = {
  trueself_16_type: "personality",
  identity_profile: "identity",
  relationship_profile: "relationships",
  career_profile: "career",
  mind_profile: "mind",
  motivation_profile: "motivation",
  growth_profile: "growth",
  stress_emotions_profile: "stress-emotions",
  life_profile: "life",
};

const axisMeta: Record<
  WholeSelfAxisKey,
  {
    label: string;
    lowLabel: string;
    highLabel: string;
    kind: "descriptive" | "capacity";
  }
> = {
  self_clarity: {
    label: "Self-Clarity",
    lowLabel: "Still forming",
    highLabel: "Clear self-understanding",
    kind: "capacity",
  },
  social_orientation: {
    label: "Social Orientation",
    lowLabel: "Inward / selective",
    highLabel: "Outward / socially engaged",
    kind: "descriptive",
  },
  emotional_attunement: {
    label: "Emotional Attunement",
    lowLabel: "Detached / objective",
    highLabel: "Emotion-attuned",
    kind: "descriptive",
  },
  cognitive_exploration: {
    label: "Cognitive Exploration",
    lowLabel: "Concrete / grounded",
    highLabel: "Exploratory / abstract",
    kind: "descriptive",
  },
  structure_execution: {
    label: "Structure & Execution",
    lowLabel: "Flexible / emergent",
    highLabel: "Structured / execution-oriented",
    kind: "descriptive",
  },
  drive_agency: {
    label: "Drive & Agency",
    lowLabel: "Receptive / lower-pressure",
    highLabel: "Agentic / driven",
    kind: "capacity",
  },
  relational_connection: {
    label: "Relational Connection",
    lowLabel: "Independent / selective",
    highLabel: "Connection-oriented",
    kind: "capacity",
  },
  adaptability: {
    label: "Adaptability",
    lowLabel: "Stability-oriented",
    highLabel: "Adaptive",
    kind: "capacity",
  },
  inner_regulation: {
    label: "Inner Regulation",
    lowLabel: "More pressure-affected",
    highLabel: "Internally regulated",
    kind: "capacity",
  },
  life_alignment: {
    label: "Life Alignment",
    lowLabel: "Currently transitioning",
    highLabel: "Aligned",
    kind: "capacity",
  },
};

type Contributor = {
  value: number | null;
  weight: number;
  label: string;
};

function latestByDomain(results: TestResult[]) {
  const latest = new Map<string, TestResult>();

  results.forEach((result) => {
    const payload = result.result || {};
    const domain =
      typeof payload.domain === "string"
        ? payload.domain
        : typeof payload.category === "string"
          ? payload.category
          : domainByType[result.test_type];

    if (domain && !latest.has(domain)) {
      latest.set(domain, result);
    }
  });

  return latest;
}

function clampScore(value: unknown) {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.min(100, Math.round(value)))
    : null;
}

function dimension(payload: any, key: string) {
  return clampScore(payload?.dimensions?.[key]?.score);
}

function stage(payload: any, key: string) {
  return clampScore((payload?.stages || payload?.processingCycle)?.[key]?.score);
}

function axisPole(payload: any, axisKey: string, pole: string) {
  const axis = payload?.axisScores?.[axisKey];
  if (!axis) return null;

  if (axis.firstCode === pole) return clampScore(axis.firstPercent);
  if (axis.secondCode === pole) return clampScore(axis.secondPercent);
  return null;
}

function mean(values: Array<number | null>) {
  const available = values.filter((value): value is number => value !== null);
  if (!available.length) return null;
  return Math.round(
    available.reduce((sum, value) => sum + value, 0) / available.length,
  );
}

function weighted(contributors: Contributor[]) {
  const available = contributors.filter(
    (item): item is Contributor & { value: number } => item.value !== null,
  );

  if (!available.length) {
    return null;
  }

  const totalWeight = available.reduce((sum, item) => sum + item.weight, 0);
  return {
    score: Math.round(
      available.reduce((sum, item) => sum + item.value * item.weight, 0) /
        totalWeight,
    ),
    contributors: available.map((item) => item.label),
    availableWeight: totalWeight,
    totalWeight: contributors.reduce((sum, item) => sum + item.weight, 0),
  };
}

function buildAxis(
  key: WholeSelfAxisKey,
  contributors: Contributor[],
): WholeSelfAxis | null {
  const score = weighted(contributors);
  if (!score) return null;
  const meta = axisMeta[key];

  return {
    key,
    label: meta.label,
    score: score.score,
    lowLabel: meta.lowLabel,
    highLabel: meta.highLabel,
    kind: meta.kind,
    contributors: score.contributors,
  };
}

function topAxes(axes: WholeSelfAxis[]) {
  return [...axes].sort((a, b) => b.score - a.score);
}

function getAxis(axes: WholeSelfAxis[], key: WholeSelfAxisKey) {
  return axes.find((axis) => axis.key === key)?.score ?? null;
}

function orientationName(axes: WholeSelfAxis[]) {
  const cognitive = getAxis(axes, "cognitive_exploration") ?? 0;
  const structure = getAxis(axes, "structure_execution") ?? 0;
  const relation = getAxis(axes, "relational_connection") ?? 0;
  const drive = getAxis(axes, "drive_agency") ?? 0;
  const clarity = getAxis(axes, "self_clarity") ?? 0;

  let primary = "Explorer";
  if (structure >= 70 && drive >= 65) primary = "Builder";
  if (relation >= 72 && clarity >= 60) primary = "Connector";
  if (cognitive >= 72 && structure >= 62) primary = "Strategist";
  if (clarity >= 72 && relation >= 62) primary = "Guide";
  if (drive >= 75 && structure < 60) primary = "Driver";

  let modifier = "Adaptive";
  if ((getAxis(axes, "emotional_attunement") ?? 0) >= 70) modifier = "Attuned";
  if (structure >= 70) modifier = "Structured";
  if (cognitive >= 78) modifier = "Exploratory";
  if (relation >= 78) modifier = "Relational";
  if (clarity >= 75) modifier = "Purposeful";

  return `The ${modifier} ${primary}`;
}

function signatureTraits(axes: WholeSelfAxis[]) {
  return topAxes(axes)
    .filter((axis) => axis.score >= 65)
    .slice(0, 4)
    .map((axis) => ({
      title: axis.score >= 80 ? `Highly ${axis.highLabel}` : axis.highLabel,
      description: `${axis.label} is one of the strongest signals in your whole-self map, based on ${axis.contributors.slice(0, 3).join(", ")}.`,
    }));
}

function naturalTensions(axes: WholeSelfAxis[]) {
  const items: WholeSelfPattern["naturalTensions"] = [];
  const cognitive = getAxis(axes, "cognitive_exploration");
  const structure = getAxis(axes, "structure_execution");
  const drive = getAxis(axes, "drive_agency");
  const regulation = getAxis(axes, "inner_regulation");
  const connection = getAxis(axes, "relational_connection");
  const clarity = getAxis(axes, "self_clarity");
  const social = getAxis(axes, "social_orientation");

  if (cognitive !== null && structure !== null && cognitive - structure >= 25) {
    items.push({
      title: "Ideas may move faster than structure",
      description:
        "Your profile suggests stronger exploration than execution structure, so organizing possibilities into consistent systems may take deliberate effort.",
    });
  }
  if (drive !== null && regulation !== null && drive - regulation >= 25) {
    items.push({
      title: "Drive may outrun recovery",
      description:
        "You may push forward more naturally than you restore internal balance, especially when pressure stacks up.",
    });
  }
  if (connection !== null && clarity !== null && connection - clarity >= 25) {
    items.push({
      title: "Others may become louder than yourself",
      description:
        "Strong relational connection combined with lower self-clarity may make external expectations especially influential.",
    });
  }
  if (social !== null && connection !== null && connection - social >= 25) {
    items.push({
      title: "Contextual sociality",
      description:
        "You may be selective or inward in general energy while still valuing meaningful connection when the context feels right.",
    });
  }

  return items;
}

function convergence(axes: WholeSelfAxis[]) {
  return topAxes(axes)
    .filter((axis) => axis.contributors.length >= 3 && axis.score >= 65)
    .slice(0, 3)
    .map((axis) => ({
      title: `${axis.label} - strong evidence`,
      description: `Multiple assessments point toward ${axis.highLabel.toLowerCase()}: ${axis.contributors.slice(0, 4).join(", ")}.`,
    }));
}

function contradictions(axes: WholeSelfAxis[]) {
  const items: WholeSelfPattern["contradictions"] = [];
  const social = getAxis(axes, "social_orientation");
  const connection = getAxis(axes, "relational_connection");
  const structure = getAxis(axes, "structure_execution");
  const adaptability = getAxis(axes, "adaptability");

  if (social !== null && connection !== null && social < 45 && connection > 65) {
    items.push({
      title: "Inward energy, meaningful connection",
      description:
        "You may not be broadly social, but connection still appears important when it is meaningful.",
    });
  }
  if (
    structure !== null &&
    adaptability !== null &&
    structure > 65 &&
    adaptability > 65
  ) {
    items.push({
      title: "Structured but adaptive",
      description:
        "You may like structure without being rigid; you can adjust when the situation requires it.",
    });
  }

  return items;
}

function whatMattersMost(latest: Map<string, TestResult>, axes: WholeSelfAxis[]) {
  const motivation: any = latest.get("motivation")?.result || {};
  const career: any = latest.get("career")?.result || {};
  const identity: any = latest.get("identity")?.result || {};
  const life: any = latest.get("life")?.result || {};
  const items: string[] = [];

  if (Array.isArray(motivation.primaryDrivers)) {
    motivation.primaryDrivers.slice(0, 3).forEach((driver: any) => {
      if (typeof driver.label === "string") items.push(driver.label);
    });
  }
  if ((dimension(career, "work_autonomy") ?? 0) >= 65) items.push("Autonomy");
  if ((dimension(career, "creative_expression") ?? 0) >= 65) {
    items.push("Creative Freedom");
  }
  if ((dimension(identity, "values_alignment") ?? 0) >= 65) {
    items.push("Values Alignment");
  }
  if ((dimension(life, "connection_belonging") ?? 0) >= 65) {
    items.push("Meaningful Connection");
  }
  if ((getAxis(axes, "cognitive_exploration") ?? 0) >= 70) {
    items.push("Exploration");
  }

  return Array.from(new Set(items)).slice(0, 5);
}

function operatingStyle(axes: WholeSelfAxis[]) {
  const cognitive = getAxis(axes, "cognitive_exploration") ?? 0;
  const connection = getAxis(axes, "relational_connection") ?? 0;
  const structure = getAxis(axes, "structure_execution") ?? 0;
  const adaptability = getAxis(axes, "adaptability") ?? 0;
  const drive = getAxis(axes, "drive_agency") ?? 0;

  return [
    cognitive >= 60 ? "Explore" : "Ground",
    connection >= 60 ? "Connect" : "Focus",
    structure >= 60 ? "Structure" : "Experiment",
    adaptability >= 60 ? "Adapt" : "Stabilize",
    drive >= 60 ? "Move" : "Reflect",
  ];
}

function narrative(name: string, axes: WholeSelfAxis[]) {
  const strongest = topAxes(axes).slice(0, 3).map((axis) => axis.label);
  const lowest = [...axes].sort((a, b) => a.score - b.score)[0];

  return `Your whole-self pattern currently reads as ${name}. The clearest signals are ${strongest.join(", ")}, which suggests these are major ways your personality, motivation, relationships, thinking, growth, stress response, and life state fit together. ${lowest ? `${lowest.label} is comparatively softer, so that area may need more context before treating it as a fixed truth.` : ""}`;
}

export function buildWholeSelfProfile(results: TestResult[]): WholeSelfProfile {
  const latest = latestByDomain(results);
  const personality: any = latest.get("personality")?.result || {};
  const identity: any = latest.get("identity")?.result || {};
  const relationships: any = latest.get("relationships")?.result || {};
  const career: any = latest.get("career")?.result || {};
  const mind: any = latest.get("mind")?.result || {};
  const motivation: any = latest.get("motivation")?.result || {};
  const growth: any = latest.get("growth")?.result || {};
  const stress: any = latest.get("stress-emotions")?.result || {};
  const life: any = latest.get("life")?.result || {};

  const axes = [
    buildAxis("self_clarity", [
      { value: dimension(identity, "self_clarity"), weight: 0.3, label: "Identity Self-Clarity" },
      { value: dimension(identity, "identity_stability"), weight: 0.25, label: "Identity Stability" },
      { value: dimension(identity, "authenticity"), weight: 0.2, label: "Authenticity" },
      { value: dimension(life, "life_direction"), weight: 0.15, label: "Life Direction" },
      { value: dimension(life, "lifestyle_alignment"), weight: 0.1, label: "Lifestyle Alignment" },
    ]),
    buildAxis("social_orientation", [
      { value: axisPole(personality, "EI", "E"), weight: 0.25, label: "Personality E/I" },
      { value: dimension(relationships, "communication_openness"), weight: 0.2, label: "Relationship Communication" },
      { value: dimension(relationships, "relational_orientation"), weight: 0.2, label: "Relational Orientation" },
      { value: dimension(career, "social_work"), weight: 0.2, label: "Career Social Work" },
      { value: dimension(identity, "social_adaptation"), weight: 0.15, label: "Identity Social Adaptation" },
    ]),
    buildAxis("emotional_attunement", [
      { value: axisPole(personality, "TF", "F"), weight: 0.2, label: "Personality T/F" },
      { value: stage(stress, "notice"), weight: 0.2, label: "Emotional Notice" },
      { value: stage(stress, "understand"), weight: 0.2, label: "Emotional Understand" },
      { value: stage(stress, "allow"), weight: 0.15, label: "Emotional Allow" },
      { value: dimension(relationships, "emotional_connection"), weight: 0.25, label: "Relationship Emotion" },
    ]),
    buildAxis("cognitive_exploration", [
      { value: axisPole(personality, "SN", "N"), weight: 0.25, label: "Personality S/N" },
      { value: dimension(mind, "conceptual_depth"), weight: 0.2, label: "Mind Depth" },
      { value: dimension(mind, "intuitive_processing"), weight: 0.2, label: "Mind Intuitive Processing" },
      { value: dimension(mind, "learning_exploration"), weight: 0.15, label: "Learning Exploration" },
      { value: dimension(career, "creative_expression"), weight: 0.1, label: "Career Creativity" },
      { value: mean([stage(growth, "see"), stage(growth, "adapt")]), weight: 0.1, label: "Growth See/Adapt" },
    ]),
    buildAxis("structure_execution", [
      { value: axisPole(personality, "JP", "J"), weight: 0.2, label: "Personality J/P" },
      { value: dimension(career, "structure_preference"), weight: 0.2, label: "Career Structure" },
      { value: dimension(growth, "self_discipline"), weight: 0.2, label: "Growth Discipline" },
      { value: stage(growth, "continue"), weight: 0.15, label: "Growth Continue" },
      { value: dimension(mind, "decision_deliberation"), weight: 0.1, label: "Mind Decision" },
      { value: dimension(life, "lifestyle_alignment"), weight: 0.15, label: "Lifestyle Alignment" },
    ]),
    buildAxis("drive_agency", [
      { value: dimension(motivation, "achievement_drive"), weight: 0.2, label: "Achievement Drive" },
      { value: dimension(motivation, "growth_drive"), weight: 0.15, label: "Growth Drive" },
      { value: dimension(motivation, "autonomy_drive"), weight: 0.15, label: "Autonomy Drive" },
      { value: dimension(career, "achievement_drive"), weight: 0.15, label: "Career Achievement" },
      { value: dimension(career, "leadership_drive"), weight: 0.15, label: "Leadership Drive" },
      { value: dimension(life, "personal_agency"), weight: 0.15, label: "Personal Agency" },
      { value: stage(growth, "continue"), weight: 0.05, label: "Growth Continue" },
    ]),
    buildAxis("relational_connection", [
      { value: dimension(relationships, "trust_orientation"), weight: 0.2, label: "Relationship Trust" },
      { value: dimension(relationships, "care_expression"), weight: 0.2, label: "Care Expression" },
      { value: dimension(relationships, "emotional_connection"), weight: 0.2, label: "Emotional Connection" },
      { value: dimension(relationships, "communication_openness"), weight: 0.15, label: "Communication" },
      { value: dimension(life, "connection_belonging"), weight: 0.2, label: "Life Connection" },
      { value: axisPole(personality, "TF", "F"), weight: 0.05, label: "Personality Feeling" },
    ]),
    buildAxis("adaptability", [
      { value: stage(growth, "adapt"), weight: 0.25, label: "Growth Adapt" },
      { value: stage(growth, "accept"), weight: 0.15, label: "Growth Accept" },
      { value: dimension(mind, "uncertainty_tolerance"), weight: 0.2, label: "Uncertainty Tolerance" },
      { value: dimension(stress, "stress_recovery"), weight: 0.15, label: "Stress Recovery" },
      { value: axisPole(personality, "JP", "P"), weight: 0.15, label: "Personality Flexibility" },
      { value: dimension(career, "problem_complexity"), weight: 0.1, label: "Career Problem Solving" },
    ]),
    buildAxis("inner_regulation", [
      { value: stage(stress, "regulate"), weight: 0.25, label: "Stress Regulate" },
      { value: stage(stress, "recover"), weight: 0.2, label: "Stress Recover" },
      { value: stage(stress, "understand"), weight: 0.15, label: "Stress Understand" },
      { value: dimension(growth, "setback_recovery"), weight: 0.2, label: "Setback Recovery" },
      { value: dimension(life, "life_balance"), weight: 0.2, label: "Life Balance" },
    ]),
    buildAxis("life_alignment", [
      { value: dimension(life, "lifestyle_alignment"), weight: 0.25, label: "Lifestyle Alignment" },
      { value: dimension(life, "meaning_fulfillment"), weight: 0.2, label: "Meaning & Fulfillment" },
      { value: dimension(life, "life_direction"), weight: 0.15, label: "Life Direction" },
      { value: dimension(life, "life_satisfaction"), weight: 0.15, label: "Life Satisfaction" },
      { value: dimension(identity, "values_alignment"), weight: 0.15, label: "Identity Values" },
      { value: dimension(motivation, "purpose_meaning"), weight: 0.1, label: "Purpose Motivation" },
    ]),
  ].filter(Boolean) as WholeSelfAxis[];

  const completedDomains = latest.size;
  const totalDomains = 9;
  const profileReady = completedDomains >= 3 && axes.length >= 6;
  const name = orientationName(axes);
  const tensions = naturalTensions(axes);
  const pattern: WholeSelfPattern = {
    name,
    narrative: narrative(name, axes),
    signatureTraits: signatureTraits(axes),
    naturalTensions: tensions,
    convergence: convergence(axes),
    contradictions: contradictions(axes),
    whatMattersMost: whatMattersMost(latest, axes),
    operatingStyle: operatingStyle(axes),
    atBest:
      "You appear most naturally effective when your strongest whole-self signals are supported by the environment around you, especially when there is enough room for your preferred way of thinking, connecting, acting, and recovering.",
    underPressure:
      (getAxis(axes, "inner_regulation") ?? 100) < 55
        ? "Under pressure, your profile suggests that internal regulation may need more deliberate support before your usual strengths come fully back online."
        : "Under pressure, your profile suggests that you may be able to regain internal balance when there is enough space, recovery, and clarity around the next step.",
  };

  return {
    axes,
    coverage: {
      completedDomains,
      totalDomains,
      percent: Math.round((completedDomains / totalDomains) * 100),
      label:
        completedDomains >= 9
          ? "Complete Whole-Self Profile"
          : completedDomains >= 6
            ? "Strong Profile Coverage"
            : completedDomains >= 3
              ? "Developing Profile"
              : "Not enough data yet",
    },
    confidence: Math.min(
      95,
      Math.round((completedDomains / totalDomains) * 65 + (axes.length / 10) * 30),
    ),
    profileReady,
    pattern,
  };
}
