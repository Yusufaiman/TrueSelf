"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Briefcase,
  CheckCircle2,
  Compass,
  HeartHandshake,
  Layers,
  Lightbulb,
  MessageCircle,
  Network,
  ShieldAlert,
  Sprout,
  Target,
  Users,
  X,
} from "lucide-react";
import type { TrueSelf16Profile } from "@/lib/trueself-16/types";
import {
  COGNITIVE_FUNCTIONS,
  FUNCTION_STACKS,
  ROLE_LABELS,
  TYPE_FAMILIES,
  TYPE_FAMILY_BY_CODE,
} from "@/lib/trueself-16/layers";
import { getTypeDetailData, type DetailCard } from "@/lib/trueself-16/type-detail-data";

type AccentColor = {
  accent: string;
  soft: string;
  border: string;
};

type TabKey = "overview" | "analytics" | "background" | "life" | "growth";

interface TypeDetailModalProps {
  profile: TrueSelf16Profile;
  color: AccentColor;
  onClose: () => void;
}

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "analytics", label: "Analytics" },
  { key: "background", label: "Background" },
  { key: "life", label: "Life" },
  { key: "growth", label: "Growth" },
];

const functionRoleSummary: Record<string, string> = {
  dominant:
    "The main lens. This is usually the most natural way this type reads life.",
  auxiliary:
    "The support system. This helps balance the dominant function and mature the pattern.",
  tertiary:
    "The playful edge. This may become useful with intention and practice.",
  inferior:
    "The growth edge. This may feel awkward under stress but points toward development.",
};

function SectionTitle({
  icon: Icon,
  title,
  color,
}: {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  title: string;
  color: AccentColor;
}) {
  return (
    <div className="mb-5 flex items-center gap-2">
      <Icon size={20} style={{ color: color.accent }} />
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
    </div>
  );
}

function ChipList({ items, color }: { items: string[]; color: AccentColor }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full px-3 py-1 text-sm font-semibold"
          style={{ backgroundColor: color.soft, color: color.accent }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function TextCards({
  items,
  columns = "md:grid-cols-2",
}: {
  items: DetailCard[];
  columns?: string;
}) {
  return (
    <div className={`grid gap-4 ${columns}`}>
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
        >
          <h4 className="font-bold text-slate-900">{item.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function BulletCards({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item}
          className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <p className="text-sm leading-6 text-slate-600">{item}</p>
        </div>
      ))}
    </div>
  );
}

function OverviewTab({
  profile,
  color,
}: {
  profile: TrueSelf16Profile;
  color: AccentColor;
}) {
  const detail = getTypeDetailData(profile);
  const stack = FUNCTION_STACKS[profile.code];

  return (
    <div className="space-y-6">
      <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <SectionTitle icon={Target} title="Personality overview" color={color} />
          <p className="text-sm leading-7 text-slate-700">
            {detail.overview.summary}
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {detail.overview.description}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <SectionTitle icon={Layers} title="Core tendencies" color={color} />
          <ChipList items={detail.overview.tendencies} color={color} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <SectionTitle icon={Brain} title="Cognitive function stack" color={color} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stack.map((item) => {
            const definition = COGNITIVE_FUNCTIONS[item.function];

            return (
              <article
                key={`${item.role}-${item.function}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {ROLE_LABELS[item.role]}
                </p>
                <p
                  className="mt-3 text-3xl font-black"
                  style={{ color: color.accent }}
                >
                  {item.function}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-900">
                  {definition.name}
                </p>
                <p className="mt-3 text-xs leading-5 text-slate-600">
                  {definition.summary}
                </p>
                <p className="mt-3 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-500">
                  {functionRoleSummary[item.role]}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function AnalyticsTab({
  profile,
  color,
}: {
  profile: TrueSelf16Profile;
  color: AccentColor;
}) {
  const detail = getTypeDetailData(profile);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <SectionTitle icon={BarChart3} title="Type axis profile" color={color} />
        <p className="mb-5 text-sm leading-6 text-slate-500">
          This is the structural pattern associated with this type. Your
          personal assessment may show stronger, softer, or more balanced
          preferences on each axis.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {detail.analytics.axes.map((axis) => (
            <article
              key={axis.axis}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-bold text-slate-900">{axis.label}</h4>
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={{ backgroundColor: color.soft, color: color.accent }}
                >
                  Preferred pole: {axis.preferredLabel}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-[2rem_1fr_2rem] items-center gap-3">
                <span className="text-xs font-bold text-slate-500">
                  {axis.left}
                </span>
                <div className="relative h-2.5 rounded-full bg-slate-200">
                  <div className="absolute left-1/2 top-0 h-full w-px bg-white" />
                  <div
                    className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm"
                    style={{
                      left: axis.preferred === axis.left ? "18%" : "82%",
                      backgroundColor: color.accent,
                    }}
                  />
                </div>
                <span className="text-right text-xs font-bold text-slate-500">
                  {axis.right}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <SectionTitle icon={Network} title="Personality family" color={color} />
          <p
            className="text-4xl font-black"
            style={{ color: color.accent }}
          >
            {detail.analytics.family.code}
          </p>
          <h4 className="mt-2 text-xl font-bold text-slate-900">
            {detail.analytics.family.name}
          </h4>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {detail.analytics.family.description}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <SectionTitle icon={Layers} title="Preference structure" color={color} />
          <TextCards items={detail.analytics.preferenceDescriptions} />
        </article>
      </section>
    </div>
  );
}

function BackgroundTab({
  profile,
  color,
}: {
  profile: TrueSelf16Profile;
  color: AccentColor;
}) {
  const detail = getTypeDetailData(profile);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <SectionTitle icon={ShieldAlert} title="Background introduction" color={color} />
        <p className="text-sm leading-7 text-slate-600">
          {detail.background.introduction}
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <SectionTitle icon={SparkIcon} title="Natural temperament" color={color} />
          <BulletCards items={detail.background.naturalTemperament} />
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <SectionTitle icon={Users} title="Family and early environment" color={color} />
          <p className="text-sm leading-7 text-slate-600">
            {detail.background.familyEnvironment}
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <SectionTitle icon={Users} title="Possible childhood roles" color={color} />
        <TextCards items={detail.background.childhoodRoles} columns="md:grid-cols-3" />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <SectionTitle icon={CheckCircle2} title="Environments that may reinforce this pattern" color={color} />
          <BulletCards items={detail.background.reinforcingEnvironment} />
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <SectionTitle icon={ShieldAlert} title="Environments that may challenge this pattern" color={color} />
          <BulletCards items={detail.background.challengingEnvironment} />
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <SectionTitle icon={Network} title="Different roads to the same type" color={color} />
        <TextCards items={detail.background.developmentalPaths} columns="md:grid-cols-3" />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <SectionTitle icon={Layers} title="Nature vs environment" color={color} />
        <TextCards items={detail.background.natureVsEnvironment} columns="md:grid-cols-3" />
      </section>
    </div>
  );
}

function SparkIcon(props: { size?: number; style?: React.CSSProperties }) {
  return <Lightbulb {...props} />;
}

function LifeTab({
  profile,
  color,
}: {
  profile: TrueSelf16Profile;
  color: AccentColor;
}) {
  const detail = getTypeDetailData(profile);
  const lifeCards = [
    { title: "Relationships", text: detail.life.relationships, icon: HeartHandshake },
    { title: "Communication", text: detail.life.communication, icon: MessageCircle },
    { title: "Friendship", text: detail.life.friendship, icon: Users },
    { title: "Work", text: detail.life.work, icon: Briefcase },
    { title: "Learning", text: detail.life.learning, icon: Brain },
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-5 md:grid-cols-2">
        {lifeCards.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <SectionTitle icon={Icon} title={item.title} color={color} />
              <p className="text-sm leading-7 text-slate-600">{item.text}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <SectionTitle icon={ShieldAlert} title="Under stress" color={color} />
        <TextCards items={detail.life.stress} columns="md:grid-cols-3" />
      </section>
    </div>
  );
}

function GrowthTab({
  profile,
  color,
}: {
  profile: TrueSelf16Profile;
  color: AccentColor;
}) {
  const detail = getTypeDetailData(profile);

  return (
    <div className="space-y-6">
      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <SectionTitle icon={Lightbulb} title="Natural strengths" color={color} />
          <p className="mb-4 text-sm leading-6 text-slate-500">
            Potential strengths associated with this pattern.
          </p>
          <ChipList items={detail.growth.strengths} color={color} />
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <SectionTitle icon={ShieldAlert} title="Potential blind spots" color={color} />
          <TextCards items={detail.growth.blindSpots} />
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <SectionTitle icon={BarChart3} title="Healthy vs overextended" color={color} />
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="grid grid-cols-3 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
            <div className="p-3">Natural tendency</div>
            <div className="border-l border-slate-200 p-3">Healthy expression</div>
            <div className="border-l border-slate-200 p-3">When overextended</div>
          </div>
          {detail.growth.healthyVsOverextended.map((item) => (
            <div
              key={item.tendency}
              className="grid grid-cols-3 border-t border-slate-200 text-sm"
            >
              <div className="p-3 font-semibold text-slate-900">
                {item.tendency}
              </div>
              <div className="border-l border-slate-200 p-3 text-slate-600">
                {item.healthy}
              </div>
              <div className="border-l border-slate-200 p-3 text-slate-600">
                {item.overextended}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <SectionTitle icon={Sprout} title="Growth path" color={color} />
          <BulletCards items={Array.from(new Set(detail.growth.growthPath))} />
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <SectionTitle icon={MessageCircle} title={`What people often misunderstand about ${profile.code}`} color={color} />
          <BulletCards items={detail.growth.misconceptions} />
        </article>
      </section>

      <section
        className="rounded-2xl border p-5"
        style={{ borderColor: color.border, backgroundColor: color.soft }}
      >
        <div className="flex gap-3">
          <Compass className="mt-1 h-5 w-5 shrink-0" style={{ color: color.accent }} />
          <div>
            <h3 className="font-bold text-slate-950">
              Your type is a map, not your biography.
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Two people can share the same personality type while having
              completely different childhoods, cultures, relationships, values,
              skills, and life experiences. Your type describes tendencies, not
              your limits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function TypeDetailModal({
  profile,
  color,
  onClose,
}: TypeDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const family = TYPE_FAMILIES[TYPE_FAMILY_BY_CODE[profile.code]];
  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);

  const tabPanel = useMemo(() => {
    if (activeTab === "overview") {
      return <OverviewTab profile={profile} color={color} />;
    }
    if (activeTab === "analytics") {
      return <AnalyticsTab profile={profile} color={color} />;
    }
    if (activeTab === "background") {
      return <BackgroundTab profile={profile} color={color} />;
    }
    if (activeTab === "life") {
      return <LifeTab profile={profile} color={color} />;
    }
    return <GrowthTab profile={profile} color={color} />;
  }, [activeTab, color, profile]);

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    let nextIndex = activeIndex;
    if (event.key === "ArrowRight") nextIndex = (activeIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    setActiveTab(tabs[nextIndex].key);
  };

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
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={{ backgroundColor: color.soft, color: color.accent }}
                >
                  {family.code} · {family.name}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  TrueSelf 16 Types
                </span>
              </div>
              <h2
                className="mt-3 text-4xl font-black tracking-tight md:text-6xl"
                style={{ color: color.accent }}
              >
                {profile.code}
              </h2>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {profile.name}
              </p>
              <p className="mt-1 text-sm italic text-slate-500">
                {profile.tagline}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
              aria-label="Close personality detail"
            >
              <X size={20} />
            </button>
          </div>

          <div
            role="tablist"
            aria-label={`${profile.code} detail sections`}
            className="mt-5 flex gap-2 overflow-x-auto pb-1"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  id={`${profile.code}-${tab.key}-tab`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`${profile.code}-${tab.key}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.key)}
                  onKeyDown={handleTabKeyDown}
                  className="shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition"
                  style={{
                    borderColor: isActive ? color.border : "#e2e8f0",
                    backgroundColor: isActive ? color.soft : "#ffffff",
                    color: isActive ? color.accent : "#475569",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          key={`${profile.code}-${activeTab}`}
          id={`${profile.code}-${activeTab}-panel`}
          role="tabpanel"
          aria-labelledby={`${profile.code}-${activeTab}-tab`}
          className="animate-fade-in p-5 md:p-8"
        >
          {tabPanel}
        </div>
      </div>
    </div>
  );
}
