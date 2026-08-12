"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Compass,
  Download,
  HeartHandshake,
  Map,
  RotateCcw,
  Route,
  Shield,
  Sparkles,
  Target,
} from "lucide-react";
import { LIFE_DIMENSION_ORDER, LIFE_DIMENSIONS } from "@/lib/life-profile/data";
import type {
  LifeDimensionScore,
  LifeInsight,
  LifeProfileResult,
  LifeStageScore,
} from "@/lib/life-profile/types";

export interface LifeResultTemplateProps {
  variant: "life-profile";
  result: LifeProfileResult;
  onRetake: () => void;
}

export default function LifeResultTemplate({
  result,
  onRetake,
}: LifeResultTemplateProps) {
  const handleDownloadPdf = () => {
    const originalTitle = document.title;
    document.title = `TrueSelf Life - ${result.primaryPattern.name}`;
    window.print();
    window.setTimeout(() => {
      document.title = originalTitle;
    }, 500);
  };

  return (
    <main className="trueself-result-page min-h-screen bg-slate-50 px-6 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="pdf-hide mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-slate-500">
            Life is a current-state profile. It can change as your circumstances,
            priorities, and daily structure change.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Download size={17} />
              Download PDF
            </button>
            <button
              type="button"
              onClick={onRetake}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <RotateCcw size={17} />
              Retake
            </button>
          </div>
        </div>

        <header className="mb-8 rounded-[2rem] border border-teal-200 bg-white p-8 text-center shadow-sm md:p-10">
          <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
            Life Profile
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            {result.primaryPattern.name}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base font-semibold text-teal-700 md:text-lg">
            {result.primaryPattern.tagline}
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            {result.currentStateSummary}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge icon={<Sparkles size={16} />}>
              Strength · {result.lifeStrength.label}
            </Badge>
            <Badge icon={<Target size={16} />}>
              Attention · {result.attentionArea.label}
            </Badge>
            <Badge icon={<Shield size={16} />}>
              Confidence · {result.confidence}
            </Badge>
          </div>
        </header>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <SectionTitle icon={<Route size={20} />} title="Your Life Framework" />
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            Life is mapped as DIRECTION - ALIGNMENT - EXPERIENCE - FUTURE.
            These stages show how your current life fits together instead of
            reducing everything to one life score.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.values(result.stages).map((stage) => (
              <StageCard key={stage.key} stage={stage} />
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <SectionTitle icon={<Map size={20} />} title="Your Life Map" />
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            These eight dimensions describe the current state of your life. They
            are not a single score and are meant to be compared with each other.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {LIFE_DIMENSION_ORDER.map((dimension) => {
              const score = result.dimensions[dimension];
              const meta = LIFE_DIMENSIONS[dimension];
              return <DimensionCard key={dimension} score={score} meta={meta} />;
            })}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Where Life Is Strongest" icon={<Sparkles size={20} />}>
            <HighlightDimension score={result.lifeStrength} />
          </Panel>
          <Panel title="Area Worth Attention" icon={<Target size={20} />}>
            <HighlightDimension score={result.attentionArea} />
          </Panel>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Life Gaps" icon={<Compass size={20} />}>
            <InsightList
              items={result.lifeGaps}
              fallback="No major life gap was strongly indicated from these responses."
            />
          </Panel>
          <Panel title="Life Tensions" icon={<HeartHandshake size={20} />}>
            <InsightList
              items={result.lifeTensions}
              fallback="No major cross-dimension tension was strongly indicated from these responses."
            />
          </Panel>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Current Supports" icon={<Shield size={20} />}>
            <InsightList
              items={result.lifeSupports}
              fallback="Your current supports appear mixed or context-dependent."
            />
          </Panel>
          <Panel title="What May Be Worth Prioritizing" icon={<Target size={20} />}>
            <List items={result.priorityPath} />
          </Panel>
        </section>

        <section className="mb-8 rounded-[2rem] border border-teal-100 bg-teal-50 p-6 md:p-7">
          <SectionTitle icon={<CalendarClock size={20} />} title="Result Confidence & Recency" />
          <p className="mt-3 text-3xl font-black text-slate-950">
            {result.confidence}
          </p>
          <p className="mt-2 text-sm font-semibold text-teal-700">
            Completed {formatCompletedAt(result.completedAt)}
          </p>
          <div className="mt-4 space-y-2">
            {result.confidenceNotes.map((note) => (
              <p key={note} className="text-sm leading-6 text-slate-600">
                {note}
              </p>
            ))}
          </div>
        </section>

        <div className="pdf-hide mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw size={18} />
            Retake assessment
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-3 font-semibold text-white shadow-md transition hover:from-teal-600 hover:to-cyan-600"
          >
            View dashboard
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}

function formatCompletedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "recently";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Badge({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
      {icon}
      {children}
    </span>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-teal-600">
      {icon}
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
    </div>
  );
}

function StageCard({ stage }: { stage: LifeStageScore }) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-slate-950">{stage.label}</h3>
          <p className="mt-1 text-xs font-semibold text-slate-500">Life stage</p>
        </div>
        <p className="text-2xl font-black text-teal-600">{stage.score}%</p>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-teal-500"
          style={{ width: `${stage.score}%` }}
        />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{stage.description}</p>
    </article>
  );
}

function DimensionCard({
  score,
  meta,
}: {
  score: LifeDimensionScore;
  meta: { color: string; soft: string };
}) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-950">{score.label}</h3>
          <p className="mt-1 text-xs font-semibold" style={{ color: meta.color }}>
            {score.band}
          </p>
        </div>
        <p className="text-2xl font-black" style={{ color: meta.color }}>
          {score.score}%
        </p>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full"
          style={{ width: `${score.score}%`, backgroundColor: meta.color }}
        />
      </div>
      <div className="mt-2 flex justify-between gap-3 text-xs font-semibold text-slate-500">
        <span>{score.lowLabel}</span>
        <span className="text-right">{score.highLabel}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{score.description}</p>
      <p className="mt-3 text-xs text-slate-500">
        Confidence: {score.confidence} · Consistency {score.consistency}%
      </p>
    </article>
  );
}

function HighlightDimension({ score }: { score: LifeDimensionScore }) {
  const meta = LIFE_DIMENSIONS[score.key];

  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-black text-slate-950">{score.label}</h3>
          <p className="mt-1 text-sm font-semibold" style={{ color: meta.color }}>
            {score.band}
          </p>
        </div>
        <p className="text-3xl font-black" style={{ color: meta.color }}>
          {score.score}%
        </p>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{score.description}</p>
    </article>
  );
}

function Panel({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <SectionTitle icon={icon} title={title} />
      <div className="mt-5">{children}</div>
    </section>
  );
}

function InsightList({ items, fallback }: { items: LifeInsight[]; fallback: string }) {
  if (!items.length) {
    return <p className="text-sm leading-6 text-slate-600">{fallback}</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article key={item.id} className="rounded-[1.25rem] bg-slate-50 p-4">
          <h3 className="font-bold text-slate-950">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  const finalItems = items.length
    ? items
    : ["Your next priority may depend on context; start with the life area that feels most immediately workable."];

  return (
    <ul className="space-y-3">
      {finalItems.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
          <ArrowRight size={16} className="mt-1 shrink-0 text-teal-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
