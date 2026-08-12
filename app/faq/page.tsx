"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Dna,
  HelpCircle,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const faqs = [
  {
    category: "Profile",
    question: "What is TrueSelf?",
    answer:
      "TrueSelf is a connected whole-self profile system. Each assessment measures one part of you, then the dashboard and analytics connect those results into one profile across personality, identity, relationships, career, mind, motivation, growth, stress, and life.",
  },
  {
    category: "Assessments",
    question: "Why are there nine assessments?",
    answer:
      "One test cannot explain your whole life. TrueSelf uses nine focused assessments so each domain contributes clean data: personality, identity, relationships, career, mind, motivation, growth, stress and emotions, and life direction.",
  },
  {
    category: "Data",
    question: "What does each assessment add to my profile?",
    answer:
      "Each assessment saves its own result type, measured dimensions, scores, interpretation, profile signals, and supporting detail. That lets TrueSelf show domain-specific insights without mixing everything into one vague average.",
  },
  {
    category: "Analytics",
    question: "What is the difference between Overview and Analytics?",
    answer:
      "Overview is the quick snapshot of your current profile. Analytics is the deeper view: result graphs, domain patterns, whole-self reading, cross-domain signals, and change over time when you retake assessments.",
  },
  {
    category: "Personality",
    question: "Where does the 16-type assessment fit?",
    answer:
      "The 16-type assessment is the personality foundation. It measures Energy, Information, Decision, and Structure, then stores the axis scores, confidence, facets, nearest type, and associated type pattern. It does not replace the other eight domains.",
  },
  {
    category: "Types",
    question: "Are all type libraries only about personality?",
    answer:
      "No. The Types page now includes type systems for all major domains, not just 16 personality types. You can browse identity patterns, relationship patterns, career patterns, mind patterns, motivation patterns, growth patterns, stress patterns, and life patterns too.",
  },
  {
    category: "Dashboard",
    question: "Why do some areas say not enough data?",
    answer:
      "TrueSelf avoids pretending it knows something before you have answered enough relevant questions. Empty states are intentional: they keep your profile honest until real assessment data exists.",
  },
  {
    category: "Graphs",
    question: "What do the spider charts mean?",
    answer:
      "Each spider chart shows measured scores from one completed assessment. A Relationship graph shows relationship dimensions; a Mind graph shows thinking and learning dimensions; a Stress graph shows stress and emotion dimensions. The chart belongs to that domain.",
  },
  {
    category: "Timeline",
    question: "What changes over time?",
    answer:
      "Some patterns are relatively stable, while current-state areas can develop. Timeline insights appear when you retake assessments, helping you see whether motivation, stress response, growth, life direction, or other measurable dimensions have shifted.",
  },
  {
    category: "Privacy",
    question: "Is my data private?",
    answer:
      "Your answers are used to generate and store your results in your account. They are not shown publicly. The dashboard and analytics use your completed results to build your profile summary, graphs, recommendations, and timeline.",
  },
];

const highlights = [
  {
    title: "One connected profile",
    description: "Every completed assessment contributes to the same TrueSelf profile.",
    icon: Dna,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Nine focused domains",
    description: "Each domain measures its own result instead of copying one generic test.",
    icon: Layers,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    title: "Evidence-based analytics",
    description: "Graphs, patterns, and timeline insights come from completed result data.",
    icon: BarChart3,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

interface FAQItemProps {
  category: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({
  category,
  question,
  answer,
  isOpen,
  onClick,
  index,
}) => {
  return (
    <article className="border-b border-slate-200 last:border-b-0">
      <button
        onClick={onClick}
        className="group flex w-full items-start gap-4 px-5 py-6 text-left transition hover:bg-slate-50 md:px-7"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-black text-blue-600">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {category}
          </span>
          <h3 className="mt-3 text-lg font-bold text-slate-950 transition group-hover:text-blue-600">
            {question}
          </h3>
        </div>
        <ChevronDown
          size={20}
          className={`mt-2 shrink-0 text-slate-500 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-5 pb-6 pl-[4.5rem] text-sm leading-7 text-slate-600 md:px-7 md:pl-[5.25rem]">
          {answer}
        </div>
      )}
    </article>
  );
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 via-cyan-50/60 to-white px-6 py-20 text-center md:py-24">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <Sparkles size={16} />
            TrueSelf FAQ
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Questions about your connected TrueSelf profile.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            How assessments, domain results, profile signals, analytics,
            result graphs, and timeline insights work together as one
            whole-self system.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {highlights.map((item) => {
            const IconComponent = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${item.bg} ${item.color}`}
                >
                  <IconComponent size={22} />
                </div>
                <h2 className="mt-5 text-xl font-bold text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={faq.question}
                index={idx}
                category={faq.category}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === idx}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-white/80" />
          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
            Your clearest answers come from your own data.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/85">
            Start with one assessment, then keep adding domains so TrueSelf can
            connect your results into a fuller profile.
          </p>
          <Link
            href="/assessment/trueself-16-type"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-600 shadow-md transition hover:bg-blue-50"
          >
            Start your first assessment
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
