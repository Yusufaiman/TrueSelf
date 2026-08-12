"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Compass,
  Download,
  Flame,
  RotateCcw,
  Shield,
  Sparkles,
  Target,
} from "lucide-react";
import {
  CAREER_DIMENSION_ORDER,
  CAREER_DIMENSIONS,
} from "@/lib/career-fit/data";
import type { CareerFitResult } from "@/lib/career-fit/types";

export interface CareerResultTemplateProps {
  variant: "career-fit";
  result: CareerFitResult;
  onRetake: () => void;
}

export default function CareerResultTemplate({
  result,
  onRetake,
}: CareerResultTemplateProps) {
  const handleDownloadPdf = () => {
    const originalTitle = document.title;
    document.title = `TrueSelf Career - ${result.pattern.name}`;
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
            Career Fit describes preferred work environments, not ability or guaranteed success.
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

        <header className="mb-8 rounded-[2rem] border border-violet-200 bg-white p-8 text-center shadow-sm md:p-10">
          <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
            Career Fit
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            {result.pattern.name}
          </h1>
          <p className="mt-3 text-lg italic text-violet-600">
            {result.pattern.tagline}
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            {result.pattern.description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge icon={<Sparkles size={16} />}>
              Pattern fit · {result.pattern.matchScore}%
            </Badge>
            <Badge icon={<Target size={16} />}>
              Secondary · {result.secondaryPattern.name}
            </Badge>
            <Badge icon={<Shield size={16} />}>
              Confidence · {result.confidence}
            </Badge>
          </div>
        </header>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <SectionTitle icon={<Briefcase size={20} />} title="Your Work Profile" />
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            There is no single career score. These eight signals describe the
            work conditions that may fit you best.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {CAREER_DIMENSION_ORDER.map((dimension) => {
              const score = result.dimensions[dimension];
              const meta = CAREER_DIMENSIONS[dimension];
              return <DimensionCard key={dimension} score={score} meta={meta} />;
            })}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-4">
          <MetricCard title="Work Environment" value={result.workEnvironmentStyle} icon={<Briefcase size={20} />} />
          <MetricCard title="Problem Style" value={result.problemStyle} icon={<Target size={20} />} />
          <MetricCard title="Responsibility" value={result.responsibilityStyle} icon={<Compass size={20} />} />
          <MetricCard title="Growth Style" value={result.growthStyle} icon={<Flame size={20} />} />
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Best-Fit Work Environments" icon={<Sparkles size={20} />}>
            <List items={result.bestFitEnvironments} />
          </Panel>
          <Panel title="What May Drain You" icon={<AlertTriangle size={20} />}>
            <List items={result.drainers} />
          </Panel>
        </section>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <SectionTitle icon={<Briefcase size={20} />} title="Career Families" />
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            Fit percentages mean similarity to modeled work characteristics,
            not probability of success.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {result.careerFamilies.map((family) => (
              <article
                key={family.id}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-slate-950">{family.name}</h3>
                  <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                    {family.fit}%
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {family.why}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {family.examples.map((example) => (
                    <span
                      key={example}
                      className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <SectionTitle icon={<Target size={20} />} title="Career Matches" />
          <div className="mt-6 space-y-4">
            {result.occupationMatches.map((match) => (
              <article
                key={match.id}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">
                      {match.name}
                    </h3>
                    <p className="text-sm font-semibold text-violet-600">
                      {match.family}
                    </p>
                  </div>
                  <span className="rounded-full bg-violet-50 px-3 py-1 text-sm font-bold text-violet-700">
                    {match.fit}% fit
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  <strong>Why this matches:</strong> {match.why}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  <strong>Possible friction:</strong> {match.possibleFriction}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Strengths at Work" icon={<Sparkles size={20} />}>
            <TagList items={result.strengths} tone="violet" />
          </Panel>
          <Panel title="Potential Career Friction" icon={<AlertTriangle size={20} />}>
            <List items={result.frictionPoints} />
          </Panel>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Career Insights" icon={<Compass size={20} />}>
            <List
              items={
                result.insights.length
                  ? result.insights
                  : ["Your career preferences appear balanced or context-dependent, so stronger insights may emerge as you complete more TrueSelf assessments."]
              }
            />
          </Panel>
          <Panel title="Result Confidence" icon={<Shield size={20} />}>
            <p className="text-3xl font-black text-slate-950">
              {result.confidence}
            </p>
            <div className="mt-4 space-y-2">
              {result.confidenceNotes.map((note) => (
                <p key={note} className="text-sm leading-6 text-slate-600">
                  {note}
                </p>
              ))}
            </div>
          </Panel>
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
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 px-5 py-3 font-semibold text-white shadow-md transition hover:from-violet-600 hover:to-purple-600"
          >
            View dashboard
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}

function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
      {icon}
      {children}
    </span>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-violet-600">
      {icon}
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
    </div>
  );
}

function DimensionCard({
  score,
  meta,
}: {
  score: {
    label: string;
    score: number;
    band: string;
    lowLabel: string;
    highLabel: string;
    description: string;
    consistency: number;
    confidence: string;
  };
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
      <div className="mt-2 flex justify-between text-xs font-semibold text-slate-500">
        <span>{score.lowLabel}</span>
        <span>{score.highLabel}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {score.description}
      </p>
      <p className="mt-3 text-xs text-slate-500">
        Confidence: {score.confidence} · Consistency {score.consistency}%
      </p>
    </article>
  );
}

function MetricCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-violet-600">
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {title}
      </p>
      <p className="mt-2 text-xl font-black text-slate-950">{value}</p>
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

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
          <ArrowRight size={16} className="mt-1 shrink-0 text-violet-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TagList({ items, tone }: { items: string[]; tone: "violet" }) {
  const classes =
    tone === "violet" ? "bg-violet-50 text-violet-700" : "bg-slate-100 text-slate-700";

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-full px-3 py-1 text-sm font-semibold ${classes}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
