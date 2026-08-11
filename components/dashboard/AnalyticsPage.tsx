"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Layers,
  LineChart,
  TrendingUp,
} from "lucide-react";
import { useDashboardProfile } from "@/hooks/useDashboardProfile";
import { SpiderChart } from "./SpiderChart";

function preferenceStrength(percent: number) {
  if (percent >= 80) {
    return "Strong preference";
  }

  if (percent >= 65) {
    return "Moderate preference";
  }

  return "Balanced";
}

export function AnalyticsPage() {
  const { summary, loading } = useDashboardProfile();
  const hasResults = summary.completedTests > 0;

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
            Complete your first assessment before TrueSelf starts looking for
            patterns across your profile.
          </p>
          <Link
            href="/assessment/trueself-16-type"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-md"
          >
            Start with 16-Type
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="mb-2 text-4xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600">
          Deeper patterns across your completed TrueSelf assessments.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Tests Completed</p>
          <p className="mt-4 text-4xl font-black text-slate-950">
            {summary.completedTests}
          </p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600">
            Domains Explored
          </p>
          <p className="mt-4 text-4xl font-black text-slate-950">
            {summary.completedDomains}/{summary.totalDomains}
          </p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Profile Signals</p>
          <p className="mt-4 text-4xl font-black text-slate-950">
            {summary.profileSignals}
          </p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Profile Coverage</p>
          <p className="mt-4 text-4xl font-black text-slate-950">
            {summary.profileCompleteness}%
          </p>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Personality Structure
          </h2>
        </div>
        {summary.corePersonality ? (
          <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-6xl font-black text-blue-600">
                {summary.corePersonality.typeCode}
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {summary.corePersonality.typeName}
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Axis</th>
                    <th className="px-4 py-3 font-semibold">Result</th>
                    <th className="px-4 py-3 font-semibold">Strength</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.corePersonality.axisScores.map((axis) => (
                    <tr key={axis.axis} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {axis.axis}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {axis.preferenceLabel} {axis.percent}%
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {preferenceStrength(axis.percent)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-500">
            No personality structure yet. Complete the TrueSelf 16-Type
            Assessment to unlock this section.
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Cognitive Profile
          </h2>
        </div>
        <p className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-500">
          No cognitive profile data yet. Complete the Mind test when it is
          available to measure thinking style, learning style, and processing
          patterns.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <Layers className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Your Profile Domains
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <SpiderChart
            data={summary.domains.map((domain) => ({
              name: domain.name,
              value: domain.coverage,
            }))}
            width={380}
            height={380}
          />
          <div className="space-y-3">
            {summary.domains.map((domain) => (
              <div
                key={domain.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-slate-900">{domain.name}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                    {domain.completed ? "Explored" : "Missing"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {domain.completed
                    ? `${domain.discoveredInsights} insights discovered`
                    : "No data yet"}
                </p>
                {domain.resultLabel && (
                  <p className="mt-2 text-sm font-semibold text-blue-600">
                    {domain.resultLabel}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Cross-Test Patterns
          </h2>
          {summary.completedDomains >= 3 ? (
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">
                  Evidence building
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  TrueSelf has enough domain coverage to start comparing
                  repeated signals, but detailed pattern extraction will become
                  stronger as more standardized tests are added.
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-4 rounded-2xl bg-slate-50 p-6 text-sm text-slate-500">
              Not enough data yet. Complete at least 3 domains before TrueSelf
              looks for repeated patterns.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Consistency Analysis
          </h2>
          {summary.completedDomains >= 3 ? (
            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">
                Confidence: {summary.evidenceConfidence}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Based on {summary.completedTests} assessments,{" "}
                {summary.completedDomains} domains, and {summary.profileSignals}{" "}
                profile signals.
              </p>
            </div>
          ) : (
            <p className="mt-4 rounded-2xl bg-slate-50 p-6 text-sm text-slate-500">
              Not enough data to measure consistency. Complete more assessments
              that measure related traits.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <LineChart className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Change Over Time
          </h2>
        </div>
        <p className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-500">
          Change tracking appears after you retake assessments that measure
          traits suitable for tracking over time.
        </p>
      </section>
    </div>
  );
}
