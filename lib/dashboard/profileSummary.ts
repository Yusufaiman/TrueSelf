import { TEST_CATEGORIES } from "@/config/testCategories";
import type { TestResult } from "@/utils/supabase/client-results";

export const PROFILE_DOMAINS = [
  "personality",
  "identity",
  "relationships",
  "career",
  "mind",
  "motivation",
  "growth",
  "stress-emotions",
  "life",
] as const;

export type ProfileDomain = (typeof PROFILE_DOMAINS)[number];

export interface DomainCoverage {
  id: ProfileDomain;
  name: string;
  coverage: number;
  completed: boolean;
  resultLabel?: string;
  discoveredInsights: number;
  href: string;
}

export interface CorePersonalitySummary {
  typeCode: string;
  typeName: string;
  tagline?: string;
  description?: string;
  axisScores: Array<{
    axis: string;
    leftLabel: string;
    rightLabel: string;
    preferenceLabel: string;
    preferenceCode: string;
    percent: number;
    position: number;
  }>;
  confidence?: string;
}

export interface KeyDiscovery {
  id: string;
  label: string;
  value: string;
  description?: string;
  domain: string;
}

export interface DashboardProfileSummary {
  results: TestResult[];
  completedTests: number;
  completedDomains: number;
  totalDomains: number;
  profileCompleteness: number;
  profileDepthText: string;
  lastDiscovery: TestResult | null;
  corePersonality: CorePersonalitySummary | null;
  domains: DomainCoverage[];
  keyDiscoveries: KeyDiscovery[];
  recommendations: DomainCoverage[];
  profileSignals: number;
  evidenceConfidence: "Insufficient" | "Low" | "Medium" | "High";
}

const DOMAIN_BY_TEST_TYPE: Record<string, ProfileDomain> = {
  trueself_16_type: "personality",
  identity_profile: "identity",
  relationship_profile: "relationships",
  career_profile: "career",
  mind_profile: "mind",
  motivation_profile: "motivation",
  growth_profile: "growth",
  stress_emotions_profile: "stress-emotions",
  life_profile: "life",
  test_1: "identity",
  test_2: "personality",
  test_3: "motivation",
  test_4: "growth",
};

const DOMAIN_BY_CATEGORY_SLUG: Record<string, ProfileDomain> = {
  identity: "identity",
  relationships: "relationships",
  career: "career",
  mind: "mind",
  mindset: "mind",
  motivation: "motivation",
  growth: "growth",
  "stress-emotions": "stress-emotions",
  "emotional-health": "stress-emotions",
  life: "life",
  "life-direction": "life",
};

const DOMAIN_LABELS: Record<ProfileDomain, string> = {
  personality: "Personality",
  identity: "Identity",
  relationships: "Relationships",
  career: "Career",
  mind: "Mind",
  motivation: "Motivation",
  growth: "Growth",
  "stress-emotions": "Stress & Emotions",
  life: "Life",
};

function getDomainForResult(result: TestResult): ProfileDomain | null {
  if (DOMAIN_BY_TEST_TYPE[result.test_type]) {
    return DOMAIN_BY_TEST_TYPE[result.test_type];
  }

  const category = result.result?.category || result.result?.domain;
  if (typeof category === "string" && DOMAIN_BY_CATEGORY_SLUG[category]) {
    return DOMAIN_BY_CATEGORY_SLUG[category];
  }

  return null;
}

function getResultTitle(result: TestResult) {
  const payload = result.result || {};

  if (payload.typeCode && payload.typeName) {
    return `${payload.typeCode} - ${payload.typeName}`;
  }

  return (
    payload.title ||
    payload.pattern ||
    payload.primaryType ||
    payload.label ||
    result.test_type
  );
}

function countResultInsights(result: TestResult) {
  const payload = result.result || {};
  const countable = [
    payload.typeCode,
    payload.typeName,
    payload.family?.name,
    payload.variant,
    ...(Array.isArray(payload.strengths) ? payload.strengths : []),
    ...(Array.isArray(payload.blindSpots) ? payload.blindSpots : []),
    ...(Array.isArray(payload.growthPath) ? payload.growthPath : []),
    ...(Array.isArray(payload.suggestedNextSteps)
      ? payload.suggestedNextSteps
      : []),
    ...(Array.isArray(payload.insights) ? payload.insights : []),
  ].filter(Boolean);

  return Math.max(1, Math.min(8, countable.length));
}

function getLatestByDomain(results: TestResult[]) {
  const latest = new Map<ProfileDomain, TestResult>();

  results.forEach((result) => {
    const domain = getDomainForResult(result);
    if (!domain || latest.has(domain)) {
      return;
    }

    latest.set(domain, result);
  });

  return latest;
}

function getCorePersonality(results: TestResult[]): CorePersonalitySummary | null {
  const result = results.find((item) => item.test_type === "trueself_16_type");
  const payload = result?.result;

  if (!payload?.typeCode || !payload?.typeName || !payload?.axisScores) {
    return null;
  }

  const axisEntries = [
    ["EI", "Energy"],
    ["SN", "Information"],
    ["TF", "Decision"],
    ["JP", "Structure"],
  ] as const;

  return {
    typeCode: payload.typeCode,
    typeName: payload.typeName,
    tagline: payload.tagline,
    description: payload.description,
    confidence: payload.confidence,
    axisScores: axisEntries
      .map(([key, label]) => {
        const axis = payload.axisScores[key];
        if (!axis) {
          return null;
        }

        const prefersFirst = axis.preference === axis.firstCode;
        const percent = prefersFirst ? axis.firstPercent : axis.secondPercent;

        return {
          axis: label,
          leftLabel: axis.firstLabel,
          rightLabel: axis.secondLabel,
          preferenceLabel: axis.preferenceLabel,
          preferenceCode: axis.preference,
          percent,
          position: prefersFirst ? axis.firstPercent : axis.firstPercent,
        };
      })
      .filter(Boolean) as CorePersonalitySummary["axisScores"],
  };
}

function buildKeyDiscoveries(results: TestResult[]): KeyDiscovery[] {
  const discoveries: KeyDiscovery[] = [];

  results.forEach((result) => {
    const domain = getDomainForResult(result);
    if (!domain) {
      return;
    }

    const payload = result.result || {};

    if (result.test_type === "trueself_16_type" && payload.typeCode) {
      discoveries.push({
        id: result.id,
        label: "Core Personality",
        value: `${payload.typeCode} - ${payload.typeName}`,
        description: payload.tagline,
        domain: DOMAIN_LABELS[domain],
      });
      return;
    }

    discoveries.push({
      id: result.id,
      label: DOMAIN_LABELS[domain],
      value: getResultTitle(result),
      description: payload.description,
      domain: DOMAIN_LABELS[domain],
    });
  });

  return discoveries.slice(0, 6);
}

export function buildDashboardProfileSummary(
  results: TestResult[],
): DashboardProfileSummary {
  const latestByDomain = getLatestByDomain(results);
  const completedDomains = latestByDomain.size;
  const totalDomains = PROFILE_DOMAINS.length;
  const profileCompleteness = Math.round((completedDomains / totalDomains) * 100);
  const profileSignals = results.reduce(
    (sum, result) => sum + countResultInsights(result),
    0,
  );

  const domains = PROFILE_DOMAINS.map((domain) => {
    const category = TEST_CATEGORIES.find((item) => item.id === domain);
    const result = latestByDomain.get(domain);

    return {
      id: domain,
      name: DOMAIN_LABELS[domain],
      coverage: result ? 100 : 0,
      completed: Boolean(result),
      resultLabel: result ? getResultTitle(result) : undefined,
      discoveredInsights: result ? countResultInsights(result) : 0,
      href: category?.href ?? "/tests",
    };
  });

  const recommendations = domains.filter((domain) => !domain.completed).slice(0, 3);
  const lastDiscovery = results[0] ?? null;

  let evidenceConfidence: DashboardProfileSummary["evidenceConfidence"] =
    "Insufficient";
  if (completedDomains >= 7) {
    evidenceConfidence = "High";
  } else if (completedDomains >= 4) {
    evidenceConfidence = "Medium";
  } else if (completedDomains >= 2) {
    evidenceConfidence = "Low";
  }

  return {
    results,
    completedTests: results.length,
    completedDomains,
    totalDomains,
    profileCompleteness,
    profileDepthText: `${completedDomains} of ${totalDomains} domains explored`,
    lastDiscovery,
    corePersonality: getCorePersonality(results),
    domains,
    keyDiscoveries: buildKeyDiscoveries(results),
    recommendations,
    profileSignals,
    evidenceConfidence,
  };
}
