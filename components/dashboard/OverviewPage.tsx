"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  CircleDashed,
  Layers,
} from "lucide-react";
import {
  TEST_CATEGORIES,
  getColorClasses,
  getIcon,
} from "@/config/testCategories";
import { useDashboardProfile } from "@/hooks/useDashboardProfile";
import type { ProfileDomain } from "@/lib/dashboard/profileSummary";
import { buildWholeSelfProfile } from "@/lib/dashboard/wholeSelfProfile";
import { useProfile } from "@/lib/profile-context";

function formatDate(dateString?: string) {
  if (!dateString) return "No data";

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function firstName(name?: string | null, email?: string | null) {
  if (name) return name.split(" ")[0];
  if (email) return email.split("@")[0];
  return "there";
}

function confidenceLabel(confidence: number) {
  if (confidence >= 80) return "High confidence";
  if (confidence >= 60) return "Moderate confidence";
  return "Limited confidence";
}

function categoryForDomain(domainId: ProfileDomain) {
  return TEST_CATEGORIES.find((category) => category.id === domainId);
}

export function OverviewPage() {
  const { profile } = useProfile();
  const { summary, loading } = useDashboardProfile();
  const wholeSelf = buildWholeSelfProfile(summary.results);
  const strongestAxes = [...wholeSelf.axes]
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  const nextDomains = summary.recommendations.length
    ? summary.recommendations
    : summary.domains.filter((domain) => domain.completed).slice(0, 3);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Welcome back, {firstName(profile?.name, profile?.email)}
          </h1>
          <p className="mt-1 max-w-2xl text-base text-slate-500">
            Here is the current snapshot of your TrueSelf profile, built from
            your completed assessment data.
          </p>
        </div>
        <Link
          href="/dashboard/analytics"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 font-semibold text-white shadow-md transition hover:shadow-lg"
        >
          View full analytics
          <ArrowRight size={18} />
        </Link>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <OverviewKpiCard
          icon={<Layers size={20} />}
          label="Profile Coverage"
          value={`${wholeSelf.coverage.completedDomains} / ${wholeSelf.coverage.totalDomains}`}
          detail={wholeSelf.coverage.label}
          accent="#0d9488"
        />
        <OverviewKpiCard
          icon={<CheckCircle2 size={20} />}
          label="Profile Confidence"
          value={`${wholeSelf.confidence}%`}
          detail={confidenceLabel(wholeSelf.confidence)}
          accent="#2563eb"
        />
        <OverviewKpiCard
          icon={<CircleDashed size={20} />}
          label="Current Pattern"
          value={
            wholeSelf.profileReady
              ? wholeSelf.pattern.name.replace(/^The\s+/i, "")
              : "Not enough data"
          }
          detail={
            wholeSelf.profileReady
              ? `Based on ${wholeSelf.coverage.completedDomains} domains`
              : "Complete at least 3 domains"
          }
          accent="#7c3aed"
        />
        <OverviewKpiCard
          icon={<Calendar size={20} />}
          label="Latest Discovery"
          value={
            summary.lastDiscovery
              ? summary.lastDiscovery.result?.title ||
                summary.lastDiscovery.result?.typeName ||
                summary.lastDiscovery.test_type
              : "No tests yet"
          }
          detail={
            summary.lastDiscovery
              ? formatDate(summary.lastDiscovery.created_at)
              : "Start your first test"
          }
          accent="#f97316"
        />
      </section>

      <section className="rounded-2xl border border-teal-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-teal-600" />
              <h2 className="text-xl font-bold text-slate-900">
                Your Profile Snapshot
              </h2>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              A compact read of your current whole-self pattern. For the full
              spider chart, timeline, and domain breakdowns, open Analytics.
            </p>
          </div>
          <span className="rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700">
            {wholeSelf.coverage.completedDomains}/{wholeSelf.coverage.totalDomains} domains
          </span>
        </div>

        {wholeSelf.profileReady ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-bold text-teal-700">
                Whole-Self Pattern
              </p>
              <h3 className="mt-2 text-3xl font-black text-slate-950">
                {wholeSelf.pattern.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {wholeSelf.pattern.narrative}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(wholeSelf.pattern.whatMattersMost.length
                  ? wholeSelf.pattern.whatMattersMost
                  : ["More evidence still forming"]
                ).map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-3 py-1 text-xs font-bold text-teal-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-950">
                Strongest Current Signals
              </h3>
              <div className="mt-5 space-y-4">
                {strongestAxes.map((axis) => (
                  <div key={axis.key}>
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {axis.label}
                        </p>
                        <p className="text-xs text-slate-500">
                          {axis.lowLabel} to {axis.highLabel}
                        </p>
                      </div>
                      <p className="text-sm font-black text-teal-700">
                        {axis.score}%
                      </p>
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
        ) : (
          <div className="mt-6 rounded-2xl bg-slate-50 p-8 text-center">
            <CircleDashed className="mx-auto mb-4 h-10 w-10 text-slate-400" />
            <p className="font-semibold text-slate-900">
              Your full profile snapshot is still forming.
            </p>
            <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
              Complete at least 3 different assessments to unlock a reliable
              whole-self pattern.
            </p>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Your Profile Domains
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Each domain contributes a different kind of evidence to your
              current profile.
            </p>
          </div>
          <Link
            href="/dashboard/analytics"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600"
          >
            Explore domain analytics
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {summary.domains.map((domain) => (
            <DomainSnapshotCard key={domain.id} domain={domain} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Key Discoveries
          </h2>
          {summary.keyDiscoveries.length > 0 ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {summary.keyDiscoveries.slice(0, 4).map((discovery) => (
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
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
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
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Recommended Next Step
          </h2>
          <div className="mt-5 space-y-3">
            {nextDomains.slice(0, 3).map((domain) => (
              <Link
                key={domain.id}
                href={domain.href}
                className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white hover:shadow-sm"
              >
                <p className="font-bold text-slate-900">{domain.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {domain.completed
                    ? "Review this part of your current profile."
                    : "Complete this domain to improve profile evidence."}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function OverviewKpiCard({
  icon,
  label,
  value,
  detail,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  accent: string;
}) {
  return (
    <section
      className="rounded-2xl border bg-white p-6 shadow-sm"
      style={{ borderColor: `${accent}44` }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <p
        className="mt-4 line-clamp-2 text-3xl font-black leading-tight"
        style={{ color: accent }}
      >
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-500">{detail}</p>
    </section>
  );
}

function DomainSnapshotCard({
  domain,
}: {
  domain: {
    id: ProfileDomain;
    name: string;
    completed: boolean;
    resultLabel?: string;
    discoveredInsights: number;
    href: string;
  };
}) {
  const category = categoryForDomain(domain.id);
  const Icon = category ? getIcon(category.icon) : CircleDashed;
  const colors = category ? getColorClasses(category.color) : null;

  return (
    <Link
      href={domain.completed ? "/dashboard/analytics" : domain.href}
      className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        colors?.border || "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${
            colors?.bg || "bg-slate-100"
          } ${colors?.text || "text-slate-500"}`}
        >
          <Icon size={19} />
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            domain.completed
              ? colors?.bg || "bg-slate-100"
              : "bg-slate-100"
          } ${domain.completed ? colors?.text || "text-slate-600" : "text-slate-500"}`}
        >
          {domain.completed ? "Data ready" : "Not yet"}
        </span>
      </div>
      <h3
        className={`mt-4 text-xl font-black ${
          colors?.text || "text-slate-900"
        }`}
      >
        {domain.name}
      </h3>
      <p className="mt-2 min-h-[3rem] text-sm leading-6 text-slate-600">
        {domain.resultLabel ||
          category?.description ||
          "Complete this assessment to add evidence."}
      </p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {domain.completed
          ? `${domain.discoveredInsights} profile signals`
          : "Awaiting assessment"}
      </p>
    </Link>
  );
}
