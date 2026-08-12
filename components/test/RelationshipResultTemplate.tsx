"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Download,
  Heart,
  MessageCircle,
  RotateCcw,
  Shield,
  Sparkles,
  Split,
  Users,
} from "lucide-react";
import {
  CONFLICT_RELATIONSHIP_DIMENSIONS,
  PRIMARY_RELATIONSHIP_DIMENSIONS,
  RELATIONSHIP_DIMENSIONS,
} from "@/lib/relationship-profile/data";
import type { RelationshipStyleResult } from "@/lib/relationship-profile/types";

export interface RelationshipResultTemplateProps {
  variant: "relationship-style";
  result: RelationshipStyleResult;
  onRetake: () => void;
}

export default function RelationshipResultTemplate({
  result,
  onRetake,
}: RelationshipResultTemplateProps) {
  const handleDownloadPdf = () => {
    const originalTitle = document.title;
    document.title = `TrueSelf Relationship - ${result.pattern.name}`;
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
            Relationship style describes tendencies, not relationship worth.
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

        <header className="mb-8 rounded-[2rem] border border-pink-200 bg-white p-8 text-center shadow-sm md:p-10">
          <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700">
            Relationship Style
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            {result.pattern.name}
          </h1>
          <p className="mt-3 text-lg italic text-pink-600">
            {result.pattern.tagline}
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            {result.pattern.description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge icon={<Sparkles size={16} />}>
              Match strength · {result.pattern.matchScore}%
            </Badge>
            <Badge icon={<Shield size={16} />}>
              Result confidence · {result.confidence}
            </Badge>
          </div>
        </header>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <SectionTitle icon={<Heart size={20} />} title="Relationship Map" />
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            These dimensions are descriptive. High or low scores are not
            automatically good or bad without context.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PRIMARY_RELATIONSHIP_DIMENSIONS.map((dimension) => {
              const score = result.dimensions[dimension];
              const meta = RELATIONSHIP_DIMENSIONS[dimension];
              return <DimensionCard key={dimension} score={score} meta={meta} />;
            })}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-4">
          <MetricCard title="Closeness Style" value={result.closenessStyle} icon={<Heart size={20} />} />
          <MetricCard title="Communication Style" value={result.communicationStyle} icon={<MessageCircle size={20} />} />
          <MetricCard title="Independence Style" value={result.independenceStyle} icon={<Split size={20} />} />
          <MetricCard title="Care Style" value={result.careStyle} icon={<Users size={20} />} />
        </section>

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <SectionTitle icon={<AlertTriangle size={20} />} title="How You Handle Conflict" />
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            Conflict scores show tendency intensity. For example, high avoidance
            means stronger avoidance tendency, not a moral judgement.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {CONFLICT_RELATIONSHIP_DIMENSIONS.map((dimension) => {
              const score = result.dimensions[dimension];
              const meta = RELATIONSHIP_DIMENSIONS[dimension];
              return <DimensionCard key={dimension} score={score} meta={meta} compact />;
            })}
          </div>
          <div className="mt-5 rounded-[1.5rem] bg-pink-50 p-5">
            <p className="text-sm font-semibold text-pink-700">
              Conflict style
            </p>
            <p className="mt-2 text-2xl font-black text-slate-950">
              {result.conflictStyle}
            </p>
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="What You Need From Relationships" icon={<Shield size={20} />}>
            <List items={result.relationshipNeeds.length ? result.relationshipNeeds : ["More relationship data is needed before stronger needs can be inferred."]} />
          </Panel>
          <Panel title="Relationship Strengths" icon={<Sparkles size={20} />}>
            <List items={result.strengths} />
          </Panel>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Possible Friction Points" icon={<AlertTriangle size={20} />}>
            <List items={result.frictionPoints} />
          </Panel>
          <Panel title="Relationship Insights" icon={<MessageCircle size={20} />}>
            <List items={result.insights.length ? result.insights : ["Your relationship profile appears mixed or context-dependent, so stronger insights may emerge as more tests are completed."]} />
          </Panel>
        </section>

        <section className="mb-8 rounded-[2rem] border border-pink-100 bg-pink-50 p-6 md:p-7">
          <SectionTitle icon={<Shield size={20} />} title="Result Confidence" />
          <p className="mt-3 text-3xl font-black text-slate-950">
            {result.confidence}
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
            href="/tests/career"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 font-semibold text-white shadow-md transition hover:from-pink-600 hover:to-rose-600"
          >
            Continue to Career Fit
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}

function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-700">
      {icon}
      {children}
    </span>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-pink-600">
      {icon}
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
    </div>
  );
}

function DimensionCard({
  score,
  meta,
  compact = false,
}: {
  score: { label: string; score: number; band: string; description: string; consistency: number; confidence: string };
  meta: { color: string; soft: string };
  compact?: boolean;
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
      {!compact && (
        <p className="mt-4 text-sm leading-6 text-slate-600">
          {score.description}
        </p>
      )}
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
      <div className="flex items-center gap-2 text-pink-600">
        {icon}
        <h3 className="font-bold text-slate-950">{title}</h3>
      </div>
      <p className="mt-4 text-2xl font-black text-slate-950">{value}</p>
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
      <div className="mt-4">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <p key={item} className="rounded-[1.25rem] bg-pink-50 p-4 text-sm leading-6 text-slate-700">
          {item}
        </p>
      ))}
    </div>
  );
}
