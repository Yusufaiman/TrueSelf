"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tests = [
  {
    id: 1,
    title: "Your Mindset Type",
    description:
      "Uncover whether you have a fixed or growth mindset and how it influences your success.",
    duration: "5–7 min",
    questions: "10 questions",
    href: "/tests/mindset/mindset-type",
  },
  {
    id: 2,
    title: "What Beliefs Hold You Back",
    description:
      "Identify the limiting beliefs that are preventing you from reaching your potential.",
    duration: "7–9 min",
    questions: "14 questions",
    href: "/tests/mindset/limiting-beliefs",
  },
  {
    id: 3,
    title: "Your Self-Talk Pattern",
    description:
      "Discover the internal dialogue you use and whether it's empowering or undermining you.",
    duration: "6–8 min",
    questions: "12 questions",
    href: "/tests/mindset/self-talk-pattern",
  },
  {
    id: 4,
    title: "Your Resilience Level",
    description:
      "Measure how well you bounce back from challenges and setbacks in life.",
    duration: "7–9 min",
    questions: "15 questions",
    href: "/tests/mindset/resilience-level",
  },
];

export default function MindsetTestsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-100 via-indigo-50 to-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
              Mindset Tests
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Understand Your Mindset
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore your beliefs, self-talk patterns, resilience, and the
            mindset that shapes your life and decisions.
          </p>
        </div>
      </section>

      {/* Test Cards Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.map((test) => (
              <Link key={test.id} href={test.href}>
                <div className="group bg-white rounded-xl border border-slate-200 p-8 h-full flex flex-col transition-all duration-300 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer">
                  {/* Content */}
                  <div className="flex-1">
                    {/* Label */}
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                        Test {test.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {test.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {test.description}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                    <span>⏱ {test.duration}</span>
                    <span>•</span>
                    <span>{test.questions}</span>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                    Start Test
                    <ArrowRight size={16} />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-purple-500 to-violet-500 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to understand your mindset?
          </h2>
          <p className="text-purple-100 text-lg mb-8">
            Choose any test above to explore your beliefs, resilience, and inner
            dialogue.
          </p>
        </div>
      </section>
    </div>
  );
}
