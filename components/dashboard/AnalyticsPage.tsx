"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CircleDashed,
  ExternalLink,
  Radar,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import {
  TEST_CATEGORIES,
  getColorClasses,
  getIcon,
  type TestCategory,
} from "@/config/testCategories";
import { useDashboardProfile } from "@/hooks/useDashboardProfile";
import type { ProfileDomain } from "@/lib/dashboard/profileSummary";
import {
  buildWholeSelfProfile,
  type WholeSelfProfile,
} from "@/lib/dashboard/wholeSelfProfile";
import { SpiderChart } from "./SpiderChart";

const DOMAIN_ACCENTS: Record<
  ProfileDomain,
  { accent: string; soft: string; border: string; text: string }
> = {
  personality: { accent: "#2563eb", soft: "#eff6ff", border: "#bfdbfe", text: "#1d4ed8" },
  identity: { accent: "#4f46e5", soft: "#eef2ff", border: "#c7d2fe", text: "#4338ca" },
  relationships: { accent: "#db2777", soft: "#fdf2f8", border: "#fbcfe8", text: "#be185d" },
  career: { accent: "#7c3aed", soft: "#f5f3ff", border: "#ddd6fe", text: "#6d28d9" },
  mind: { accent: "#0891b2", soft: "#ecfeff", border: "#a5f3fc", text: "#0e7490" },
  motivation: { accent: "#f97316", soft: "#fff7ed", border: "#fed7aa", text: "#ea580c" },
  growth: { accent: "#16a34a", soft: "#f0fdf4", border: "#bbf7d0", text: "#15803d" },
  "stress-emotions": { accent: "#e11d48", soft: "#fff1f2", border: "#fecdd3", text: "#be123c" },
  life: { accent: "#0d9488", soft: "#f0fdfa", border: "#99f6e4", text: "#0f766e" },
};

type AnalyticsBar = {
  label: string;
  value: number;
  detail?: string;
};

type AnalyticsChip = {
  label: string;
  value: string;
};

type DomainAnalytics = {
  title: string;
  subtitle: string;
  bars: AnalyticsBar[];
  chips: AnalyticsChip[];
  notes: string[];
};

type AnalyticsView = "profile" | "timeline";

type WholeSelfSnapshot = {
  date: string;
  label: string;
  profile: WholeSelfProfile;
};

type AxisChange = {
  label: string;
  start: number;
  end: number;
  delta: number;
};

function preferenceStrength(percent: number) {
  if (percent >= 80) return "Strong";
  if (percent >= 65) return "Moderate";
  if (percent >= 55) return "Slight";
  return "Balanced";
}

function numericScore(value: unknown) {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.min(100, Math.round(value)))
    : null;
}

function asStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function getLatestResultByDomain(results: any[]) {
  const map = new Map<ProfileDomain, any>();
  const domainByType: Record<string, ProfileDomain> = {
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

  results.forEach((result) => {
    const payload = result.result || {};
    const explicitDomain = payload.domain || payload.category;
    const domain =
      typeof explicitDomain === "string" && explicitDomain in DOMAIN_ACCENTS
        ? (explicitDomain as ProfileDomain)
        : domainByType[result.test_type];

    if (domain && !map.has(domain)) {
      map.set(domain, result);
    }
  });

  return map;
}

function getCategory(domainId: ProfileDomain) {
  return TEST_CATEGORIES.find((category) => category.id === domainId);
}

function getResultTitle(payload: any) {
  if (payload.typeCode && payload.typeName) {
    return `${payload.typeCode} - ${payload.typeName}`;
  }

  return (
    payload.title ||
    payload.pattern ||
    payload.primaryPattern?.name ||
    payload.pattern?.name ||
    payload.primaryType ||
    payload.label ||
    "Result ready"
  );
}

function formatMonth(dateValue: string) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatShortDate(dateValue: string) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function buildWholeSelfSnapshots(results: any[]): WholeSelfSnapshot[] {
  const sorted = [...results].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
  const snapshots: WholeSelfSnapshot[] = [];

  sorted.forEach((result, index) => {
    const cumulative = sorted.slice(0, index + 1);
    const profile = buildWholeSelfProfile([...cumulative].reverse());
    if (profile.profileReady) {
      snapshots.push({
        date: result.created_at,
        label: formatShortDate(result.created_at),
        profile,
      });
    }
  });

  return snapshots.filter((snapshot, index, list) => {
    if (index === 0) return true;
    const previous = list[index - 1];
    return (
      previous.label !== snapshot.label ||
      previous.profile.pattern.name !== snapshot.profile.pattern.name ||
      previous.profile.axes.some((axis) => {
        const current = snapshot.profile.axes.find((item) => item.key === axis.key);
        return current && current.score !== axis.score;
      })
    );
  });
}

function getAxisChanges(
  start?: WholeSelfProfile,
  end?: WholeSelfProfile,
): AxisChange[] {
  if (!start || !end) return [];

  return end.axes
    .map((axis) => {
      const startAxis = start.axes.find((item) => item.key === axis.key);
      if (!startAxis) return null;
      return {
        label: axis.label,
        start: startAxis.score,
        end: axis.score,
        delta: axis.score - startAxis.score,
      };
    })
    .filter((item): item is AxisChange => Boolean(item));
}

function changeBand(delta: number) {
  const magnitude = Math.abs(delta);
  if (magnitude >= 20) return "Major shift";
  if (magnitude >= 10) return "Meaningful shift";
  if (magnitude >= 5) return "Small shift";
  return "Stable";
}

function stabilityLabel(score: number | null) {
  if (score === null) return "No historical data";
  if (score >= 85) return "Highly Stable";
  if (score >= 70) return "Mostly Stable";
  if (score >= 50) return "Evolving";
  return "Significant Change";
}

function calculateProfileStability(changes: AxisChange[]) {
  if (!changes.length) return null;
  const averageDelta =
    changes.reduce((sum, change) => sum + Math.abs(change.delta), 0) /
    changes.length;
  return Math.max(0, Math.min(100, Math.round(100 - averageDelta * 2.5)));
}

function topAbsoluteChange(changes: AxisChange[]) {
  return [...changes].sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))[0];
}

function mostStableChange(changes: AxisChange[]) {
  return [...changes].sort((a, b) => Math.abs(a.delta) - Math.abs(b.delta))[0];
}

function dimensionBars(payload: any) {
  if (!payload.dimensions || typeof payload.dimensions !== "object") {
    return [];
  }

  return Object.values(payload.dimensions)
    .map((dimension: any) => {
      const value = numericScore(dimension?.score);
      if (value === null) return null;
      return {
        label: dimension.label || dimension.key || "Dimension",
        value,
        detail: dimension.band || dimension.highLabel || undefined,
      };
    })
    .filter(Boolean) as AnalyticsBar[];
}

function stageBars(payload: any) {
  const stages = payload.stages || payload.processingCycle;
  if (!stages || typeof stages !== "object") {
    return [];
  }

  return Object.values(stages)
    .map((stage: any) => {
      const value = numericScore(stage?.score);
      if (value === null) return null;
      return {
        label: stage.label || stage.key || "Stage",
        value,
        detail: "Stage",
      };
    })
    .filter(Boolean) as AnalyticsBar[];
}

function axisBars(payload: any) {
  if (!payload.axisScores || typeof payload.axisScores !== "object") {
    return [];
  }

  const axisLabels: Record<string, string> = {
    EI: "Energy",
    SN: "Information",
    TF: "Decision",
    JP: "Structure",
  };

  return Object.entries(payload.axisScores)
    .map(([key, axis]: [string, any]) => {
      const prefersFirst = axis.preference === axis.firstCode;
      const percent = numericScore(prefersFirst ? axis.firstPercent : axis.secondPercent);
      if (percent === null) return null;
      return {
        label: axisLabels[key] || key,
        value: percent,
        detail: `${axis.preferenceLabel || axis.preference} · ${preferenceStrength(percent)}`,
      };
    })
    .filter(Boolean) as AnalyticsBar[];
}

function driverBars(payload: any) {
  if (!Array.isArray(payload.primaryDrivers)) {
    return [];
  }

  return payload.primaryDrivers
    .map((driver: any) => {
      const value = numericScore(driver?.score);
      if (value === null) return null;
      return {
        label: driver.label || driver.key || "Driver",
        value,
        detail: "Primary driver",
      };
    })
    .filter(Boolean) as AnalyticsBar[];
}

function chip(label: string, value: unknown): AnalyticsChip | null {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  return { label, value };
}

function buildDomainAnalytics(domain: ProfileDomain, result?: any): DomainAnalytics | null {
  if (!result) return null;

  const payload = result.result || {};
  const title = getResultTitle(payload);
  const fallbackSubtitle =
    payload.tagline ||
    payload.description ||
    payload.currentStateSummary ||
    payload.primaryPattern?.tagline ||
    "Your completed assessment data is ready.";

  if (domain === "personality") {
    return {
      title,
      subtitle: payload.tagline || payload.description || fallbackSubtitle,
      bars: axisBars(payload),
      chips: [
        chip("Confidence", payload.confidence),
        chip("Closest type", payload.closestType),
        chip("Family", payload.family?.name || payload.family?.label),
      ].filter(Boolean) as AnalyticsChip[],
      notes: asStringArray(payload.strengths).slice(0, 3),
    };
  }

  if (domain === "identity") {
    return {
      title,
      subtitle: payload.tagline || payload.description || fallbackSubtitle,
      bars: dimensionBars(payload),
      chips: [
        chip("Core/Social", payload.coreSocialAlignment?.level),
        chip("Expression Gap", payload.expressionGap?.level),
        chip("Grounding", payload.internalGrounding?.level),
        chip("Confidence", payload.confidence),
      ].filter(Boolean) as AnalyticsChip[],
      notes: asStringArray(payload.insights).slice(0, 3),
    };
  }

  if (domain === "relationships") {
    return {
      title,
      subtitle: payload.tagline || payload.description || fallbackSubtitle,
      bars: dimensionBars(payload),
      chips: [
        chip("Closeness", payload.closenessStyle),
        chip("Communication", payload.communicationStyle),
        chip("Conflict", payload.conflictStyle),
        chip("Care", payload.careStyle),
      ].filter(Boolean) as AnalyticsChip[],
      notes: [
        ...asStringArray(payload.relationshipNeeds).slice(0, 2),
        ...asStringArray(payload.strengths).slice(0, 2),
      ],
    };
  }

  if (domain === "career") {
    return {
      title,
      subtitle: payload.primaryPattern?.tagline || payload.description || fallbackSubtitle,
      bars: dimensionBars(payload),
      chips: [
        chip("Environment", payload.workEnvironmentStyle),
        chip("Problem Style", payload.problemStyle),
        chip("Responsibility", payload.responsibilityStyle),
        chip("Growth", payload.growthStyle),
      ].filter(Boolean) as AnalyticsChip[],
      notes: asStringArray(payload.bestFitEnvironments).slice(0, 3),
    };
  }

  if (domain === "mind") {
    return {
      title,
      subtitle: payload.primaryPattern?.tagline || payload.description || fallbackSubtitle,
      bars: dimensionBars(payload),
      chips: [
        chip("Processing", payload.processingStyle),
        chip("Learning", payload.learningStyle),
        chip("Decision", payload.decisionStyle),
        chip("Uncertainty", payload.uncertaintyStyle),
      ].filter(Boolean) as AnalyticsChip[],
      notes: asStringArray(payload.cognitiveStrengths).slice(0, 3),
    };
  }

  if (domain === "motivation") {
    return {
      title,
      subtitle: payload.primaryPattern?.tagline || payload.description || fallbackSubtitle,
      bars: [...driverBars(payload), ...dimensionBars(payload)].slice(0, 8),
      chips: [
        chip("Primary", payload.primaryDrivers?.[0]?.label),
        chip("Secondary", payload.primaryDrivers?.[1]?.label),
        chip("Confidence", payload.confidence),
      ].filter(Boolean) as AnalyticsChip[],
      notes: [
        ...asStringArray(payload.activationProfile).slice(0, 2),
        ...asStringArray(payload.insights).slice(0, 2),
      ],
    };
  }

  if (domain === "growth") {
    return {
      title,
      subtitle: payload.cycleInsight || fallbackSubtitle,
      bars: [...stageBars(payload), ...dimensionBars(payload)].slice(0, 8),
      chips: [
        chip("Strength", payload.growthStrength?.label),
        chip("Bottleneck", payload.growthBottleneck?.label),
        chip("Confidence", payload.confidence),
      ].filter(Boolean) as AnalyticsChip[],
      notes: [
        ...asStringArray(payload.strengths).slice(0, 2),
        ...asStringArray(payload.developmentPath).slice(0, 2),
      ],
    };
  }

  if (domain === "stress-emotions") {
    return {
      title,
      subtitle: payload.stressResponsePattern?.description || fallbackSubtitle,
      bars: [...stageBars(payload), ...dimensionBars(payload)].slice(0, 8),
      chips: [
        chip("Pattern", payload.stressResponsePattern?.name),
        chip("Strength", payload.emotionalStrength?.label),
        chip("Bottleneck", payload.emotionalBottleneck?.label || "Balanced"),
        chip("Stress Sensitivity", payload.stressSensitivity?.band),
      ].filter(Boolean) as AnalyticsChip[],
      notes: [
        ...asStringArray(payload.processingInsights).slice(0, 2),
        ...asStringArray(payload.stressInsights).slice(0, 2),
      ],
    };
  }

  if (domain === "life") {
    return {
      title,
      subtitle: payload.currentStateSummary || payload.primaryPattern?.tagline || fallbackSubtitle,
      bars: [...stageBars(payload), ...dimensionBars(payload)].slice(0, 8),
      chips: [
        chip("Strength", payload.lifeStrength?.label),
        chip("Attention", payload.attentionArea?.label),
        chip("Secondary", payload.secondaryPattern?.name),
        chip("Confidence", payload.confidence),
      ].filter(Boolean) as AnalyticsChip[],
      notes: [
        ...(Array.isArray(payload.lifeGaps)
          ? payload.lifeGaps.map((item: any) => item.title).slice(0, 2)
          : []),
        ...asStringArray(payload.priorityPath).slice(0, 2),
      ],
    };
  }

  return {
    title,
    subtitle: fallbackSubtitle,
    bars: dimensionBars(payload),
    chips: [chip("Confidence", payload.confidence)].filter(Boolean) as AnalyticsChip[],
    notes: asStringArray(payload.insights).slice(0, 3),
  };
}

export function AnalyticsPage() {
  const { summary, loading } = useDashboardProfile();
  const [activeView, setActiveView] = useState<AnalyticsView>("profile");
  const [selectedGraph, setSelectedGraph] = useState<{
    domainId: ProfileDomain;
    title: string;
    analysis: DomainAnalytics;
    result?: any;
  } | null>(null);
  const hasResults = summary.completedTests > 0;
  const latestByDomain = getLatestResultByDomain(summary.results);
  const wholeSelfProfile = buildWholeSelfProfile(summary.results);
  const snapshots = buildWholeSelfSnapshots(summary.results);
  const firstSnapshot = snapshots[0];
  const latestSnapshot = snapshots[snapshots.length - 1];
  const timelineChanges = getAxisChanges(firstSnapshot?.profile, latestSnapshot?.profile);
  const profileStability = snapshots.length >= 2 ? calculateProfileStability(timelineChanges) : null;
  const primaryDomains = summary.domains
    .map((domain) => ({
      ...domain,
      result: latestByDomain.get(domain.id),
      analysis: buildDomainAnalytics(domain.id, latestByDomain.get(domain.id)),
    }));
  const completedAnalyses = primaryDomains.filter((domain) => domain.analysis);
  const topResultCards =
    activeView === "profile"
      ? [
          {
            label: "Profile Coverage",
            value: `${wholeSelfProfile.coverage.completedDomains} / ${wholeSelfProfile.coverage.totalDomains}`,
            detail: wholeSelfProfile.coverage.label,
            accent: "#0d9488",
          },
          {
            label: "Profile Confidence",
            value: `${wholeSelfProfile.confidence}%`,
            detail:
              wholeSelfProfile.confidence >= 80
                ? "High confidence"
                : wholeSelfProfile.confidence >= 60
                  ? "Moderate confidence"
                  : "Limited confidence",
            accent: "#2563eb",
          },
          {
            label: "Current Pattern",
            value: wholeSelfProfile.profileReady
              ? wholeSelfProfile.pattern.name.replace(/^The\s+/i, "")
              : "Not enough data",
            detail: wholeSelfProfile.profileReady
              ? `Based on ${wholeSelfProfile.coverage.completedDomains} domains`
              : "Complete more domains",
            accent: "#7c3aed",
          },
          {
            label: "Profile Stability",
            value: profileStability === null ? "No history" : `${profileStability}%`,
            detail: stabilityLabel(profileStability),
            accent: "#f97316",
          },
        ]
      : [
          {
            label: "Recorded Results",
            value: String(summary.completedTests),
            detail: "Assessment history",
            accent: "#2563eb",
          },
          {
            label: "Tracking Since",
            value: summary.results.length ? formatMonth(summary.results[summary.results.length - 1].created_at) : "No data",
            detail: "First assessment",
            accent: "#0d9488",
          },
          {
            label: "Most Changed",
            value: topAbsoluteChange(timelineChanges)?.label || "Not enough data",
            detail: topAbsoluteChange(timelineChanges)
              ? `${topAbsoluteChange(timelineChanges)!.delta > 0 ? "+" : ""}${topAbsoluteChange(timelineChanges)!.delta}%`
              : "Retake assessments",
            accent: "#db2777",
          },
          {
            label: "Most Stable",
            value: mostStableChange(timelineChanges)?.label || "Not enough data",
            detail: mostStableChange(timelineChanges)
              ? `${mostStableChange(timelineChanges)!.delta >= 0 ? "+" : ""}${mostStableChange(timelineChanges)!.delta}%`
              : "Retake assessments",
            accent: "#16a34a",
          },
        ];

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!hasResults) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600">
            Your analytics will appear as you complete assessments.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
          <TrendingUp className="mb-4 h-12 w-12 text-slate-400" />
          <p className="mb-2 text-lg font-medium text-slate-700">
            No analytics yet
          </p>
          <p className="mb-8 max-w-sm text-slate-500">
            Complete your first assessment to see your actual domain data here:
            axes, dimensions, patterns, styles, and stage graphs.
          </p>
          <Link
            href="/assessment/trueself-16-type"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-md"
          >
            Start with 16-Type
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Analytics</h1>
        <p className="mt-2 text-slate-600">
          {activeView === "profile"
            ? "Understand your current profile and how your patterns connect."
            : "See what stayed core, what developed, and what shifted over time."}
        </p>
        <div className="mt-5 inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          {(["profile", "timeline"] as AnalyticsView[]).map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => setActiveView(view)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                activeView === view
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {view === "profile" ? "Profile" : "Timeline"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {topResultCards.map((card) => (
          <AnalyticsKpiCard key={card.label} card={card} />
        ))}
      </div>

      {activeView === "profile" ? (
        <>
          <WholeSelfProfileSection profile={wholeSelfProfile} />

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Radar className="h-5 w-5 text-teal-600" />
                  <h2 className="text-xl font-bold text-slate-900">
                    Your 9 Domains
                  </h2>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Each card shows measured scores from one completed assessment.
                  Open a card to see the full domain detail.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                {completedAnalyses.length} result profiles
              </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {completedAnalyses.map((domain) => (
                <GraphPanel
                  key={domain.id}
                  domainId={domain.id}
                  title={domain.name}
                  analysis={domain.analysis!}
                  result={domain.result}
                  onOpen={() =>
                    setSelectedGraph({
                      domainId: domain.id,
                      title: domain.name,
                      analysis: domain.analysis!,
                      result: domain.result,
                    })
                  }
                />
              ))}
            </div>
          </section>

          <CrossDomainInsightsSection profile={wholeSelfProfile} />
        </>
      ) : (
        <TimelineView
          snapshots={snapshots}
          changes={timelineChanges}
          completedAnalyses={completedAnalyses}
          results={summary.results}
        />
      )}

      {selectedGraph && (
        <AnalyticsDetailModal
          item={selectedGraph}
          onClose={() => setSelectedGraph(null)}
        />
      )}
    </div>
  );
}

function TopInsightCard({
  domainId,
  name,
  analysis,
  result,
}: {
  domainId: ProfileDomain;
  name: string;
  analysis: DomainAnalytics;
  result?: any;
}) {
  const accent = DOMAIN_ACCENTS[domainId];

  return (
    <Link
      href={result ? `/dashboard/results/${result.id}` : "/tests"}
      className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderColor: accent.border }}
    >
      <p className="text-sm font-semibold" style={{ color: accent.text }}>
        {name}
      </p>
      <p className="mt-4 text-2xl font-black text-slate-950">
        {analysis.title}
      </p>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
        {analysis.subtitle}
      </p>
    </Link>
  );
}

function AnalyticsKpiCard({
  card,
}: {
  card: { label: string; value: string; detail: string; accent: string };
}) {
  return (
    <article
      className="rounded-2xl border bg-white p-6 shadow-sm"
      style={{ borderColor: `${card.accent}44` }}
    >
      <p className="text-sm font-semibold text-slate-600">{card.label}</p>
      <p
        className="mt-4 line-clamp-2 text-3xl font-black leading-tight"
        style={{ color: card.accent }}
      >
        {card.value}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{card.detail}</p>
    </article>
  );
}

function WholeSelfProfileSection({ profile }: { profile: WholeSelfProfile }) {
  const chartData = profile.axes.map((axis) => ({
    name: axis.label,
    value: axis.score,
  }));
  const strongestAxes = [...profile.axes].sort((a, b) => b.score - a.score).slice(0, 4);
  const softestAxis = [...profile.axes].sort((a, b) => a.score - b.score)[0];

  if (!profile.profileReady) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Radar className="h-5 w-5 text-teal-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Your Whole-Self Profile
          </h2>
        </div>
        <div className="mt-5 rounded-2xl bg-slate-50 p-6">
          <p className="text-lg font-bold text-slate-950">
            Not enough data to build your whole-self map yet.
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Complete at least 3 different assessments so TrueSelf can compare
            patterns across personality, identity, relationships, career, mind,
            motivation, growth, stress, and life.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700">
              {profile.coverage.completedDomains}/{profile.coverage.totalDomains} domains
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700">
              {profile.axes.length}/10 whole-self axes available
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-teal-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Radar className="h-5 w-5 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Your Whole-Self Profile
            </h2>
          </div>
          <p className="mt-2 max-w-full break-words text-sm leading-6 text-slate-500">
            A synthesis of your completed assessments. This map describes how
            your patterns connect; it is not a score of how good or complete you are.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700">
            {profile.coverage.completedDomains}/{profile.coverage.totalDomains} domains
          </span>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
            {profile.confidence}% confidence
          </span>
        </div>
      </div>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
          <div className="min-w-0">
            <p className="text-sm font-bold text-teal-700">
              Whole-Self Pattern
            </p>
            <h3 className="mt-1 break-words text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
              {profile.pattern.name}
            </h3>
            <p className="mt-3 max-w-full break-words text-sm leading-6 text-slate-600">
              {profile.pattern.narrative}
            </p>
          </div>

          <div className="mt-5 flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-white p-2 sm:min-h-[420px] sm:p-4">
            <div className="sm:hidden">
              <SpiderChart
                data={chartData}
                width={300}
                height={300}
                color="#0d9488"
                fillOpacity={0.16}
              />
            </div>
            <div className="hidden sm:block">
              <SpiderChart
                data={chartData}
                width={420}
                height={420}
                color="#0d9488"
                fillOpacity={0.16}
              />
            </div>
          </div>
        </article>

        <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold text-slate-950">
              Ten Whole-Self Axes
            </h3>
            <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
              {profile.coverage.label}
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {profile.axes.map((axis) => (
              <div key={axis.key}>
                <div className="mb-1.5 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {axis.label}
                    </p>
                    <p className="text-xs text-slate-500">
                      {axis.lowLabel} to {axis.highLabel}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-teal-700">
                      {axis.score}%
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      {axis.kind}
                    </p>
                  </div>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-500"
                    style={{ width: `${axis.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-950">Who You Are</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {profile.pattern.narrative}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {strongestAxes.map((axis) => (
              <span
                key={axis.key}
                className="rounded-full bg-white px-3 py-1 text-xs font-bold text-teal-700"
              >
                {axis.label}: {axis.score}%
              </span>
            ))}
            {softestAxis && (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
                Softest signal: {softestAxis.label}
              </span>
            )}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-bold text-slate-950">
            How You Tend to Operate
          </h3>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {profile.pattern.operatingStyle.map((step, index) => (
              <span key={`${step}-${index}`} className="inline-flex items-center gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-teal-700">
                  {step}
                </span>
                {index < profile.pattern.operatingStyle.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-slate-300" />
                )}
              </span>
            ))}
          </div>
        </article>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <WholeSelfList
          title="Signature Traits"
          items={
            profile.pattern.signatureTraits.length
              ? profile.pattern.signatureTraits
              : [
                  {
                    title: "Balanced overall pattern",
                    description:
                      "Your strongest whole-self signals are still forming as more assessments add evidence.",
                  },
                ]
          }
        />
        <WholeSelfList
          title="Natural Tensions"
          items={
            profile.pattern.naturalTensions.length
              ? profile.pattern.naturalTensions
              : [
                  {
                    title: "No major tension detected yet",
                    description:
                      "Your current data does not show a strong gap between major whole-self axes.",
                  },
                ]
          }
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-bold text-slate-950">
            What Seems to Matter Most
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {(profile.pattern.whatMattersMost.length
              ? profile.pattern.whatMattersMost
              : ["More evidence needed"]
            ).map((item) => (
              <span
                key={item}
                className="rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700"
              >
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-bold text-slate-950">
            When You're at Your Best
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {profile.pattern.atBest}
          </p>
        </article>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <WholeSelfList title="Convergences" items={profile.pattern.convergence} />
        <article className="rounded-2xl border border-rose-100 bg-rose-50 p-5">
          <h3 className="text-lg font-bold text-slate-950">Under Pressure</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {profile.pattern.underPressure}
          </p>
          {profile.pattern.contradictions.length > 0 && (
            <div className="mt-4 space-y-3">
              {profile.pattern.contradictions.map((item) => (
                <div key={item.title} className="rounded-2xl bg-white p-4">
                  <p className="font-bold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  );
}

function WholeSelfList({
  title,
  items,
}: {
  title: string;
  items: Array<{ title: string; description: string }>;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-bold text-slate-950">{title}</h3>
      {items.length ? (
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-bold text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
          More completed assessments are needed before this part becomes useful.
        </p>
      )}
    </article>
  );
}

function CrossDomainInsightsSection({ profile }: { profile: WholeSelfProfile }) {
  const hasConvergence = profile.pattern.convergence.length > 0;
  const hasContradictions = profile.pattern.contradictions.length > 0;
  const hasTensions = profile.pattern.naturalTensions.length > 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-teal-600" />
        <h2 className="text-xl font-bold text-slate-900">
          Cross-Domain Insights
        </h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        These insights compare repeated signals across your completed domains.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <InsightColumn
          title="Convergences"
          empty="No strong cross-domain convergence yet."
          items={hasConvergence ? profile.pattern.convergence : []}
          accent="teal"
        />
        <InsightColumn
          title="Natural Tensions"
          empty="No major whole-self tension detected yet."
          items={hasTensions ? profile.pattern.naturalTensions : []}
          accent="orange"
        />
        <InsightColumn
          title="Contradictions"
          empty="No meaningful contradiction detected yet."
          items={hasContradictions ? profile.pattern.contradictions : []}
          accent="rose"
        />
      </div>
    </section>
  );
}

function InsightColumn({
  title,
  items,
  empty,
  accent,
}: {
  title: string;
  items: Array<{ title: string; description: string }>;
  empty: string;
  accent: "teal" | "orange" | "rose";
}) {
  const colors = {
    teal: "border-teal-100 bg-teal-50 text-teal-700",
    orange: "border-orange-100 bg-orange-50 text-orange-700",
    rose: "border-rose-100 bg-rose-50 text-rose-700",
  };

  return (
    <article className={`rounded-2xl border p-5 ${colors[accent]}`}>
      <h3 className="font-bold text-slate-950">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.length ? (
          items.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-4">
              <p className="font-bold text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </div>
          ))
        ) : (
          <p className="rounded-2xl bg-white p-4 text-sm leading-6 text-slate-500">
            {empty}
          </p>
        )}
      </div>
    </article>
  );
}

function TimelineView({
  snapshots,
  changes,
  completedAnalyses,
  results,
}: {
  snapshots: WholeSelfSnapshot[];
  changes: AxisChange[];
  completedAnalyses: Array<{
    id: ProfileDomain;
    name: string;
    analysis: DomainAnalytics | null;
    result?: any;
  }>;
  results: any[];
}) {
  const first = snapshots[0];
  const latest = snapshots[snapshots.length - 1];
  const biggest = topAbsoluteChange(changes);
  const stable = mostStableChange(changes);
  const selectedAxes = (changes.length
    ? [...changes].sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)).slice(0, 3)
    : latest?.profile.axes.slice(0, 3) || []
  ).map((item: any) => item.label);

  if (snapshots.length < 2) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <TrendingUp className="mx-auto mb-4 h-12 w-12 text-slate-400" />
        <h2 className="text-2xl font-black text-slate-950">
          Timeline needs more history
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
          Retake assessments over time to compare what stayed core, what developed,
          and what changed because of your current life state.
        </p>
      </section>
    );
  }

  const stableTraits = changes.filter((change) => Math.abs(change.delta) <= 4);
  const developingTraits = changes.filter((change) => change.delta >= 5);
  const variableTraits = changes.filter((change) => Math.abs(change.delta) >= 10);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              <h2 className="text-xl font-bold text-slate-900">
                Your Whole-Self Over Time
              </h2>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              Selected axes only, so the graph stays readable.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
            All time
          </span>
        </div>

        <TimelineLineChart
          snapshots={snapshots}
          axisLabels={selectedAxes}
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-teal-600" />
          <h2 className="text-xl font-bold text-slate-900">Then vs Now</h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  {formatMonth(first.date)}
                </p>
                <p className="mt-1 text-2xl font-black text-slate-950">
                  {first.profile.pattern.name}
                </p>
              </div>
              <ArrowRight className="hidden h-6 w-6 text-slate-300 md:block" />
              <div>
                <p className="text-sm font-bold text-teal-600">
                  {formatMonth(latest.date)}
                </p>
                <p className="mt-1 text-2xl font-black text-slate-950">
                  {latest.profile.pattern.name}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {changes.map((change) => (
                <div
                  key={change.label}
                  className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 rounded-2xl bg-white p-3 text-sm"
                >
                  <span className="font-bold text-slate-900">{change.label}</span>
                  <span className="text-slate-500">{change.start}%</span>
                  <ArrowRight className="h-4 w-4 text-slate-300" />
                  <span
                    className={`font-black ${
                      change.delta > 0
                        ? "text-emerald-600"
                        : change.delta < 0
                          ? "text-rose-600"
                          : "text-slate-500"
                    }`}
                  >
                    {change.end}% ({change.delta > 0 ? "+" : ""}{change.delta})
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-bold text-slate-950">
              Your Profile: Then vs Now
            </h3>
            <div className="mt-4 flex min-h-[420px] items-center justify-center rounded-[1.5rem] bg-white p-4">
              <RadarComparisonChart start={first.profile} end={latest.profile} />
            </div>
          </article>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-4">
        <TimelineChangeCard
          title="Biggest Growth"
          change={changes.filter((item) => item.delta > 0).sort((a, b) => b.delta - a.delta)[0]}
          empty="No growth trend yet"
        />
        <TimelineChangeCard
          title="Biggest Shift"
          change={biggest}
          empty="No major shift yet"
        />
        <TimelineChangeCard
          title="Most Stable"
          change={stable}
          empty="No stable trait yet"
        />
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-teal-700">Emerging Pattern</p>
          <h3 className="mt-2 text-lg font-black text-slate-950">
            {biggest ? biggest.label : "Still forming"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {biggest
              ? `${biggest.label} shows a ${changeBand(biggest.delta).toLowerCase()} from your first usable snapshot to now.`
              : "Retake assessments to reveal a clear direction of change."}
          </p>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <TraitGroup title="Stable Traits" items={stableTraits} empty="No stable axis identified yet." />
        <TraitGroup title="Developing Traits" items={developingTraits} empty="No developing axis identified yet." />
        <TraitGroup title="Variable Traits" items={variableTraits} empty="No variable axis identified yet." />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <CircleDashed className="h-5 w-5 text-teal-600" />
          <h2 className="text-xl font-bold text-slate-900">Domain Timeline</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {completedAnalyses.map((domain) => {
            const accent = DOMAIN_ACCENTS[domain.id];
            const count = countResultsForDomain(results, domain.id);
            return (
              <article
                key={domain.id}
                className="rounded-2xl border bg-white p-5 shadow-sm"
                style={{ borderColor: accent.border }}
              >
                <p className="text-sm font-bold" style={{ color: accent.text }}>
                  {domain.name}
                </p>
                <h3 className="mt-2 text-lg font-black text-slate-950">
                  {domain.analysis?.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Last updated {domain.result ? formatMonth(domain.result.created_at) : "Unknown"} · {count} assessment{count === 1 ? "" : "s"}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function TimelineLineChart({
  snapshots,
  axisLabels,
}: {
  snapshots: WholeSelfSnapshot[];
  axisLabels: string[];
}) {
  const width = 820;
  const height = 320;
  const padding = { top: 28, right: 36, bottom: 42, left: 44 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const colors = ["#0d9488", "#2563eb", "#db2777", "#f97316"];

  const pointFor = (value: number, index: number) => ({
    x: padding.left + (index / Math.max(snapshots.length - 1, 1)) * chartWidth,
    y: padding.top + chartHeight - (value / 100) * chartHeight,
  });

  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-slate-50 p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
        {[0, 25, 50, 75, 100].map((value) => {
          const y = padding.top + chartHeight - (value / 100) * chartHeight;
          return (
            <g key={value}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="4 5"
              />
              <text x={padding.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#94a3b8">
                {value}
              </text>
            </g>
          );
        })}
        {axisLabels.map((axisLabel, axisIndex) => {
          const points = snapshots
            .map((snapshot, snapshotIndex) => {
              const axis = snapshot.profile.axes.find((item) => item.label === axisLabel);
              if (!axis) return null;
              return pointFor(axis.score, snapshotIndex);
            })
            .filter((point): point is { x: number; y: number } => Boolean(point));
          const path = points
            .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
            .join(" ");
          const color = colors[axisIndex % colors.length];
          return (
            <g key={axisLabel}>
              <path d={path} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {points.map((point, index) => (
                <circle key={`${axisLabel}-${index}`} cx={point.x} cy={point.y} r="4" fill={color} stroke="#fff" strokeWidth="2" />
              ))}
              <text x={width - padding.right} y={points[points.length - 1]?.y || 0} dx="8" dy="4" fontSize="12" fontWeight="700" fill={color}>
                {axisLabel}
              </text>
            </g>
          );
        })}
        {snapshots.map((snapshot, index) => {
          const x = padding.left + (index / Math.max(snapshots.length - 1, 1)) * chartWidth;
          return (
            <text key={snapshot.date} x={x} y={height - 16} textAnchor="middle" fontSize="11" fill="#64748b">
              {snapshot.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function RadarComparisonChart({
  start,
  end,
}: {
  start: WholeSelfProfile;
  end: WholeSelfProfile;
}) {
  const size = 380;
  const center = size / 2;
  const radius = 132;
  const axes = end.axes;
  const point = (score: number, index: number) => {
    const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
    const distance = (score / 100) * radius;
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance,
    };
  };
  const polygon = (profile: WholeSelfProfile) =>
    axes
      .map((axis, index) => {
        const score = profile.axes.find((item) => item.key === axis.key)?.score ?? 0;
        const current = point(score, index);
        return `${current.x},${current.y}`;
      })
      .join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-auto w-full max-w-[420px]">
      {[25, 50, 75, 100].map((level) => (
        <circle
          key={level}
          cx={center}
          cy={center}
          r={(level / 100) * radius}
          fill="none"
          stroke="#e2e8f0"
          strokeDasharray="4 5"
        />
      ))}
      {axes.map((axis, index) => {
        const endPoint = point(100, index);
        const labelPoint = point(112, index);
        return (
          <g key={axis.key}>
            <line x1={center} y1={center} x2={endPoint.x} y2={endPoint.y} stroke="#e2e8f0" />
            <text x={labelPoint.x} y={labelPoint.y} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">
              {axis.label.split(" ")[0]}
            </text>
          </g>
        );
      })}
      <polygon points={polygon(start)} fill="#94a3b8" fillOpacity="0.16" stroke="#64748b" strokeWidth="2" />
      <polygon points={polygon(end)} fill="#0d9488" fillOpacity="0.2" stroke="#0d9488" strokeWidth="3" />
      <g transform="translate(16 20)">
        <rect x="0" y="0" width="92" height="44" rx="18" fill="#fff" />
        <circle cx="16" cy="15" r="5" fill="#64748b" />
        <text x="28" y="19" fontSize="12" fontWeight="700" fill="#475569">Then</text>
        <circle cx="16" cy="31" r="5" fill="#0d9488" />
        <text x="28" y="35" fontSize="12" fontWeight="700" fill="#0f766e">Now</text>
      </g>
    </svg>
  );
}

function TimelineChangeCard({
  title,
  change,
  empty,
}: {
  title: string;
  change?: AxisChange;
  empty: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{title}</p>
      <h3 className="mt-2 text-lg font-black text-slate-950">
        {change ? change.label : empty}
      </h3>
      {change && (
        <>
          <p
            className={`mt-2 text-2xl font-black ${
              change.delta > 0 ? "text-emerald-600" : change.delta < 0 ? "text-rose-600" : "text-slate-500"
            }`}
          >
            {change.delta > 0 ? "+" : ""}
            {change.delta}%
          </p>
          <p className="mt-2 text-sm text-slate-500">{changeBand(change.delta)}</p>
        </>
      )}
    </article>
  );
}

function TraitGroup({
  title,
  items,
  empty,
}: {
  title: string;
  items: AxisChange[];
  empty: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-bold text-slate-950">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.length ? (
          items.slice(0, 5).map((item) => (
            <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-bold text-slate-900">{item.label}</p>
              <p className="mt-1 text-sm text-slate-500">
                {item.start}% to {item.end}% ({item.delta > 0 ? "+" : ""}{item.delta})
              </p>
            </div>
          ))
        ) : (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
            {empty}
          </p>
        )}
      </div>
    </article>
  );
}

function countResultsForDomain(results: any[], domainId: ProfileDomain) {
  const domainByType: Record<string, ProfileDomain> = {
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

  return results.filter((result) => {
    const payload = result.result || {};
    const explicitDomain = payload.domain || payload.category;
    const domain =
      typeof explicitDomain === "string" && explicitDomain in DOMAIN_ACCENTS
        ? (explicitDomain as ProfileDomain)
        : domainByType[result.test_type];
    return domain === domainId;
  }).length;
}

function GraphPanel({
  domainId,
  title,
  analysis,
  result,
  onOpen,
}: {
  domainId: ProfileDomain;
  title: string;
  analysis: DomainAnalytics;
  result?: any;
  onOpen: () => void;
}) {
  const accent = DOMAIN_ACCENTS[domainId];
  const bars = analysis.bars.length ? analysis.bars : [];
  const chartData = bars.map((bar) => ({
    name: bar.label,
    value: bar.value,
  }));

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      className="block w-full cursor-pointer rounded-2xl border bg-slate-50 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{ borderColor: accent.border }}
      aria-label={`Open ${title} analytics detail`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold" style={{ color: accent.text }}>
            {title}
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-950">
            {analysis.title}
          </h3>
        </div>
        <span
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: accent.soft, color: accent.accent }}
        >
          <ExternalLink size={16} />
        </span>
      </div>

      {bars.length ? (
        <div className="flex h-[300px] w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-white p-3">
          <SpiderChart
            data={chartData}
            width={280}
            height={280}
            color={accent.accent}
            fillOpacity={0.18}
          />
        </div>
      ) : (
        <p className="rounded-2xl bg-white p-4 text-sm text-slate-500">
          This result does not expose graphable scores yet.
        </p>
      )}
    </article>
  );
}

function AnalyticsDetailModal({
  item,
  onClose,
}: {
  item: {
    domainId: ProfileDomain;
    title: string;
    analysis: DomainAnalytics;
    result?: any;
  };
  onClose: () => void;
}) {
  const accent = DOMAIN_ACCENTS[item.domainId];
  const category = getCategory(item.domainId);
  const Icon = category ? getIcon(category.icon) : Radar;
  const chartData = item.analysis.bars.map((bar) => ({
    name: bar.label,
    value: bar.value,
  }));
  const detailSections = buildModalDetailSections(item.result?.result || {});

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="types-modal-scrollbar-hidden scrollbar-hidden max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
                  style={{ backgroundColor: accent.soft, color: accent.accent }}
                >
                  <Icon size={14} />
                  {item.title}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  TrueSelf Analytics
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
                {item.analysis.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {item.analysis.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
              aria-label="Close analytics detail"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-6 p-5 md:p-8">
          <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <SectionTitle icon={<Radar size={20} />} title="Spider Chart" accent={accent.accent} />
              <div className="mt-4 flex min-h-[360px] items-center justify-center rounded-[1.5rem] bg-white p-4">
                {chartData.length ? (
                  <SpiderChart
                    data={chartData}
                    width={360}
                    height={360}
                    color={accent.accent}
                    fillOpacity={0.18}
                  />
                ) : (
                  <p className="text-sm text-slate-500">
                    This result does not expose graphable scores yet.
                  </p>
                )}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <SectionTitle icon={<BarChart3 size={20} />} title="Measured Scores" accent={accent.accent} />
              {item.analysis.bars.length ? (
                <div className="mt-4 space-y-4">
                  {item.analysis.bars.map((bar) => (
                    <ScoreBar
                      key={`${bar.label}-${bar.detail}`}
                      bar={bar}
                      accent={accent.accent}
                    />
                  ))}
                </div>
              ) : (
                <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                  No score breakdown is available for this result.
                </p>
              )}
            </article>
          </section>

          {item.analysis.chips.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <SectionTitle icon={<Sparkles size={20} />} title="Styles & Patterns" accent={accent.accent} />
              <div className="mt-4 flex flex-wrap gap-2">
                {item.analysis.chips.map((chipItem) => (
                  <span
                    key={`${chipItem.label}-${chipItem.value}`}
                    className="rounded-full px-3 py-1 text-sm font-semibold"
                    style={{ backgroundColor: accent.soft, color: accent.text }}
                  >
                    {chipItem.label}: {chipItem.value}
                  </span>
                ))}
              </div>
            </section>
          )}

          {item.analysis.notes.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <SectionTitle icon={<Sparkles size={20} />} title="Key Details" accent={accent.accent} />
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {item.analysis.notes.map((note) => (
                  <article
                    key={note}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-sm leading-6 text-slate-600">{note}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {detailSections.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <SectionTitle icon={<BarChart3 size={20} />} title="Full Result Detail" accent={accent.accent} />
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {detailSections.map((section) => (
                  <article
                    key={section.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <h3 className="font-bold text-slate-950">{section.title}</h3>
                    <div className="mt-3 space-y-2">
                      {section.items.map((entry) => (
                        <p key={entry} className="text-sm leading-6 text-slate-600">
                          {entry}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            {item.result && (
              <Link
                href={`/dashboard/results/${item.result.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold text-white shadow-md transition"
                style={{ backgroundColor: accent.accent }}
              >
                View full result page
                <ArrowRight size={18} />
              </Link>
            )}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-2" style={{ color: accent }}>
      {icon}
      <h3 className="text-lg font-bold text-slate-950">{title}</h3>
    </div>
  );
}

function readableText(value: unknown) {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  return null;
}

function objectInsightItems(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        const title = readableText(record.title) || readableText(record.name);
        const description =
          readableText(record.description) || readableText(record.text);
        if (title && description) return `${title}: ${description}`;
        if (title) return title;
        if (description) return description;
      }
      return null;
    })
    .filter((item): item is string => Boolean(item));
}

function buildModalDetailSections(payload: any) {
  const sections: Array<{ title: string; items: string[] }> = [];

  const overview = [
    readableText(payload.description),
    readableText(payload.tagline),
    readableText(payload.currentStateSummary),
    readableText(payload.cycleInsight),
    readableText(payload.stressResponsePattern?.description),
    readableText(payload.primaryPattern?.description),
    readableText(payload.pattern?.description),
  ].filter((item): item is string => Boolean(item));

  if (overview.length) {
    sections.push({
      title: "Overview",
      items: Array.from(new Set(overview)).slice(0, 5),
    });
  }

  const dimensions = payload.dimensions && typeof payload.dimensions === "object"
    ? Object.values(payload.dimensions)
        .map((dimension: any) => {
          const score = numericScore(dimension?.score);
          if (score === null) return null;
          return `${dimension.label || dimension.key}: ${score}%${dimension.band ? ` - ${dimension.band}` : ""}`;
        })
        .filter((item): item is string => Boolean(item))
    : [];

  if (dimensions.length) {
    sections.push({
      title: "Dimensions",
      items: dimensions,
    });
  }

  const stages = (payload.stages || payload.processingCycle) &&
    typeof (payload.stages || payload.processingCycle) === "object"
    ? Object.values(payload.stages || payload.processingCycle)
        .map((stage: any) => {
          const score = numericScore(stage?.score);
          if (score === null) return null;
          return `${stage.label || stage.key}: ${score}%${stage.description ? ` - ${stage.description}` : ""}`;
        })
        .filter((item): item is string => Boolean(item))
    : [];

  if (stages.length) {
    sections.push({
      title: payload.processingCycle ? "Processing Cycle / Stages" : "Stages",
      items: stages,
    });
  }

  const styleItems = [
    readableText(payload.closenessStyle) && `Closeness: ${payload.closenessStyle}`,
    readableText(payload.communicationStyle) && `Communication: ${payload.communicationStyle}`,
    readableText(payload.conflictStyle) && `Conflict: ${payload.conflictStyle}`,
    readableText(payload.careStyle) && `Care: ${payload.careStyle}`,
    readableText(payload.workEnvironmentStyle) && `Work Environment: ${payload.workEnvironmentStyle}`,
    readableText(payload.problemStyle) && `Problem Style: ${payload.problemStyle}`,
    readableText(payload.processingStyle) && `Processing: ${payload.processingStyle}`,
    readableText(payload.learningStyle) && `Learning: ${payload.learningStyle}`,
    readableText(payload.decisionStyle) && `Decision: ${payload.decisionStyle}`,
    readableText(payload.uncertaintyStyle) && `Uncertainty: ${payload.uncertaintyStyle}`,
    readableText(payload.lifeStrength?.label) && `Life Strength: ${payload.lifeStrength.label}`,
    readableText(payload.attentionArea?.label) && `Area Worth Attention: ${payload.attentionArea.label}`,
    readableText(payload.growthStrength?.label) && `Growth Strength: ${payload.growthStrength.label}`,
    readableText(payload.growthBottleneck?.label) && `Growth Bottleneck: ${payload.growthBottleneck.label}`,
    readableText(payload.emotionalStrength?.label) && `Emotional Strength: ${payload.emotionalStrength.label}`,
    readableText(payload.emotionalBottleneck?.label) && `Emotional Bottleneck: ${payload.emotionalBottleneck.label}`,
  ].filter((item): item is string => Boolean(item));

  if (styleItems.length) {
    sections.push({
      title: "Styles & Patterns",
      items: styleItems,
    });
  }

  const arraySections: Array<{ title: string; value: unknown }> = [
    { title: "Strengths", value: payload.strengths },
    { title: "Blind Spots", value: payload.blindSpots },
    { title: "Growth Path", value: payload.growthPath },
    { title: "Insights", value: payload.insights },
    { title: "Relationship Needs", value: payload.relationshipNeeds },
    { title: "Best Fit Environments", value: payload.bestFitEnvironments },
    { title: "Cognitive Strengths", value: payload.cognitiveStrengths },
    { title: "Activation Profile", value: payload.activationProfile },
    { title: "Motivation Tensions", value: payload.motivationTensions },
    { title: "Processing Insights", value: payload.processingInsights },
    { title: "Stress Insights", value: payload.stressInsights },
    { title: "Coping Insights", value: payload.copingInsights },
    { title: "Support Path", value: payload.supportPath },
    { title: "Priority Path", value: payload.priorityPath },
    { title: "Life Gaps", value: payload.lifeGaps },
    { title: "Life Tensions", value: payload.lifeTensions },
    { title: "Life Supports", value: payload.lifeSupports },
  ];

  arraySections.forEach((section) => {
    const items = [
      ...asStringArray(section.value),
      ...objectInsightItems(section.value),
    ];
    if (items.length) {
      sections.push({
        title: section.title,
        items: Array.from(new Set(items)).slice(0, 8),
      });
    }
  });

  if (Array.isArray(payload.primaryDrivers) && payload.primaryDrivers.length) {
    sections.push({
      title: "Primary Drivers",
      items: payload.primaryDrivers
        .map((driver: any) => {
          const score = numericScore(driver?.score);
          return `${driver.label || driver.key || "Driver"}${score !== null ? `: ${score}%` : ""}`;
        })
        .slice(0, 8),
    });
  }

  if (Array.isArray(payload.confidenceNotes) && payload.confidenceNotes.length) {
    sections.push({
      title: "Confidence Notes",
      items: asStringArray(payload.confidenceNotes).slice(0, 5),
    });
  }

  return sections;
}

function DomainAnalyticsCard({
  domainId,
  domainName,
  category,
  result,
  analysis,
  href,
}: {
  domainId: ProfileDomain;
  domainName: string;
  category?: TestCategory;
  result?: any;
  analysis: DomainAnalytics | null;
  href: string;
}) {
  const accent = DOMAIN_ACCENTS[domainId];
  const Icon = category ? getIcon(category.icon) : CircleDashed;
  const colorClasses = category ? getColorClasses(category.color) : null;

  return (
    <article
      className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderColor: accent.border }}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${
            colorClasses?.bg || "bg-slate-100"
          } ${colorClasses?.text || "text-slate-500"}`}
        >
          <Icon size={21} />
        </span>
        <span
          className="rounded-full px-3 py-1 text-xs font-bold"
          style={{ backgroundColor: accent.soft, color: accent.text }}
        >
          {analysis ? "Data Ready" : "No Data"}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-black" style={{ color: accent.accent }}>
        {domainName}
      </h3>
      <p className="mt-2 font-bold text-slate-950">
        {analysis?.title || category?.testName || "No result yet"}
      </p>
      <p className="mt-2 min-h-[4.5rem] text-sm leading-6 text-slate-600">
        {analysis?.subtitle || category?.discover || "Complete this assessment to unlock analytics."}
      </p>

      {analysis && analysis.chips.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {analysis.chips.slice(0, 4).map((item) => (
            <span
              key={`${item.label}-${item.value}`}
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: accent.soft, color: accent.text }}
            >
              {item.label}: {item.value}
            </span>
          ))}
        </div>
      )}

      {analysis && analysis.bars.length > 0 && (
        <div className="mt-5 space-y-3">
          {analysis.bars.slice(0, 4).map((bar) => (
            <ScoreBar key={`${bar.label}-${bar.detail}`} bar={bar} accent={accent.accent} compact />
          ))}
        </div>
      )}

      {analysis && analysis.notes.length > 0 && (
        <div className="mt-4 space-y-2">
          {analysis.notes.slice(0, 3).map((note) => (
            <p key={note} className="text-xs leading-5 text-slate-500">
              {note}
            </p>
          ))}
        </div>
      )}

      <Link
        href={result ? `/dashboard/results/${result.id}` : href}
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold"
        style={{ color: accent.accent }}
      >
        {result ? "View full result" : "Start test"}
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}

function ScoreBar({
  bar,
  accent,
  compact = false,
}: {
  bar: AnalyticsBar;
  accent: string;
  compact?: boolean;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <div>
          <p className={`${compact ? "text-xs" : "text-sm"} font-bold text-slate-900`}>
            {bar.label}
          </p>
          {bar.detail && (
            <p className="text-xs text-slate-500">{bar.detail}</p>
          )}
        </div>
        <p className={`${compact ? "text-xs" : "text-sm"} font-black`} style={{ color: accent }}>
          {bar.value}%
        </p>
      </div>
      <div className={`${compact ? "h-2" : "h-2.5"} overflow-hidden rounded-full bg-white`}>
        <div
          className="h-full rounded-full"
          style={{ width: `${bar.value}%`, backgroundColor: accent }}
        />
      </div>
    </div>
  );
}

function PatternRow({ title, detail }: { title: string; detail: string }) {
  return (
    <article className="rounded-2xl bg-slate-50 p-4">
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
    </article>
  );
}
