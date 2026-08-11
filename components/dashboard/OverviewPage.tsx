"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Compass,
  Fingerprint,
  Layers,
  Sparkles,
} from "lucide-react";
import { useDashboardProfile } from "@/hooks/useDashboardProfile";
import { useProfile } from "@/lib/profile-context";
import { SpiderChart } from "./SpiderChart";

function formatDate(dateString?: string) {
  if (!dateString) {
    return "No data";
  }

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function firstName(name?: string | null, email?: string | null) {
  if (name) {
    return name.split(" ")[0];
  }

  if (email) {
    return email.split("@")[0];
  }

  return "there";
}

export function OverviewPage() {
  const { profile } = useProfile();
  const { summary, loading } = useDashboardProfile();
  const hasResults = summary.completedTests > 0;
  const chartData = summary.domains.map((domain) => ({
    name: domain.name,
    value: domain.coverage,
  }));

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold text-slate-900">
            Welcome back, {firstName(profile?.name, profile?.email)}
          </h1>
          <Sparkles className="h-8 w-8 text-blue-500" />
        </div>
        <p className="mt-1 text-base text-slate-500">
          Your TrueSelf profile grows as you discover more about yourself.
        </p>
        <div className="mt-4 max-w-md">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-700">
              Profile completeness
            </span>
            <span className="font-bold text-blue-600">
              {summary.profileCompleteness}%
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
              style={{ width: `${summary.profileCompleteness}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {summary.profileDepthText}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Tests Completed</p>
            <CheckCircle2 className="h-5 w-5 text-blue-500" />
          </div>
          <p className="mt-4 text-4xl font-black text-slate-950">
            {summary.completedTests}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {summary.completedTests === 0
              ? "Start your first test"
              : "Completed assessments"}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">TrueSelf Type</p>
            <Fingerprint className="h-5 w-5 text-blue-500" />
          </div>
          <p className="mt-4 text-4xl font-black text-slate-950">
            {summary.corePersonality?.typeCode ?? "Not discovered"}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {summary.corePersonality?.typeName ??
              "Take the 16-Type Assessment"}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Profile Depth</p>
            <Layers className="h-5 w-5 text-blue-500" />
          </div>
          <p className="mt-4 text-4xl font-black text-slate-950">
            {summary.profileCompleteness}%
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {summary.profileSignals} profile signals discovered
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Last Discovery</p>
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
          <p className="mt-4 text-xl font-black text-slate-950">
            {summary.lastDiscovery
              ? summary.lastDiscovery.result?.title ||
                summary.lastDiscovery.result?.typeName ||
                summary.lastDiscovery.test_type
              : "No tests yet"}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {summary.lastDiscovery
              ? `Completed ${formatDate(summary.lastDiscovery.created_at)}`
              : "No data"}
          </p>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Your Core Personality
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Based only on your TrueSelf 16-Type Assessment.
            </p>
          </div>
          {!summary.corePersonality && (
            <Link
              href="/assessment/trueself-16-type"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Take assessment
              <ArrowRight size={16} />
            </Link>
          )}
        </div>

        {summary.corePersonality ? (
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-6xl font-black text-blue-600">
                {summary.corePersonality.typeCode}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {summary.corePersonality.typeName}
              </h3>
              <p className="mt-2 text-sm italic text-slate-500">
                {summary.corePersonality.tagline}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {summary.corePersonality.description}
              </p>
            </div>
            <div className="space-y-4">
              {summary.corePersonality.axisScores.map((axis) => (
                <div key={axis.axis}>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-semibold text-slate-900">{axis.axis}</p>
                    <p className="text-sm font-bold text-blue-600">
                      {axis.percent}% {axis.preferenceLabel}
                    </p>
                  </div>
                  <div className="grid grid-cols-[8rem_1fr_8rem] items-center gap-3">
                    <span className="text-xs font-medium text-slate-500">
                      {axis.leftLabel}
                    </span>
                    <div className="relative h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        style={{ width: `${axis.position}%` }}
                      />
                    </div>
                    <span className="text-right text-xs font-medium text-slate-500">
                      {axis.rightLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-50 p-8 text-center">
            <Fingerprint className="mx-auto mb-4 h-10 w-10 text-slate-400" />
            <p className="font-semibold text-slate-900">
              Your personality type hasn't been discovered yet.
            </p>
            <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
              Take the TrueSelf 16-Type Assessment to unlock your core type,
              axis percentages, and personality foundation.
            </p>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Your TrueSelf Map</h2>
        <p className="mt-1 text-sm text-slate-500">
          See how much of each part of yourself you've explored.
        </p>
        {hasResults ? (
          <div className="mt-4">
            <SpiderChart data={chartData} width={420} height={420} />
            <p className="border-t border-slate-100 pt-4 text-center text-xs text-slate-500">
              This chart shows discovery coverage, not how good you are in each
              domain.
            </p>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl bg-slate-50 p-8 text-center">
            <Compass className="mx-auto mb-4 h-10 w-10 text-slate-400" />
            <p className="font-semibold text-slate-900">
              Not enough data to build your map yet.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Complete your first test to start building domain coverage.
            </p>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Your Key Discoveries
        </h2>
        {summary.keyDiscoveries.length > 0 ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {summary.keyDiscoveries.map((discovery) => (
              <article
                key={discovery.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {discovery.label}
                </p>
                <p className="mt-2 font-bold text-slate-900">
                  {discovery.value}
                </p>
                {discovery.description && (
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {discovery.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500">
            No discoveries yet. Complete your first test to start building your
            TrueSelf profile.
          </p>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Emerging Strengths
          </h2>
          {summary.completedTests >= 2 ? (
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Strength evidence will become stronger as multiple completed
              assessments point to the same pattern.
            </p>
          ) : (
            <p className="mt-4 text-sm text-slate-500">Not enough data yet.</p>
          )}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Growth Areas</h2>
          {summary.completedTests >= 2 ? (
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Growth areas are shown when there is evidence from tests that
              actually measure development patterns.
            </p>
          ) : (
            <p className="mt-4 text-sm text-slate-500">Not enough data yet.</p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Recommended Next Tests
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {(summary.recommendations.length
            ? summary.recommendations
            : summary.domains.slice(0, 1)
          ).map((domain) => (
            <Link
              key={domain.id}
              href={domain.href}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white hover:shadow-sm"
            >
              <p className="font-bold text-slate-900">{domain.name}</p>
              <p className="mt-2 text-sm text-slate-500">
                {domain.completed
                  ? "Review this part of your profile."
                  : "+11% profile completeness"}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                Start Test
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
