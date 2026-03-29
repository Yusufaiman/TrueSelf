"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tests = [
  {
    id: 1,
    title: "Your Relationship Pattern",
    description:
      "Discover the recurring patterns in your relationships and what drives them.",
    duration: "6–8 min",
    questions: "12 questions",
    href: "/tests/relationships/relationship-pattern",
  },
  {
    id: 2,
    title: "Why Your Relationships Don't Work",
    description:
      "Understand the hidden reasons your relationships may fail or feel unfulfilling.",
    duration: "7–9 min",
    questions: "14 questions",
    href: "/tests/relationships/why-dont-work",
  },
  {
    id: 3,
    title: "Your Attachment Style",
    description:
      "Learn how you form emotional bonds and how it affects your relationships.",
    duration: "6–8 min",
    questions: "11 questions",
    href: "/tests/relationships/attachment-style",
  },
  {
    id: 4,
    title: "Your Behavior in Relationships",
    description:
      "See how you act, respond, and influence dynamics in your relationships.",
    duration: "7–9 min",
    questions: "13 questions",
    href: "/tests/relationships/behavior-relationships",
  },
  {
    id: 5,
    title: "Your Communication Style",
    description:
      "Understand how you express yourself and how it impacts connection.",
    duration: "6–8 min",
    questions: "12 questions",
    href: "/tests/relationships/communication-style",
  },
  {
    id: 6,
    title: "The Kind of People You Attract",
    description:
      "Explore the type of people you naturally attract and why it keeps happening.",
    duration: "8–10 min",
    questions: "15 questions",
    href: "/tests/relationships/people-attract",
  },
];

export default function RelationshipsTestsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rose-100 via-pink-50 to-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-sm font-semibold text-rose-600 uppercase tracking-wider">
              Relationship Tests
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Understand Your Relationship Patterns
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover how you connect with others, why certain patterns repeat,
            and what shapes your relationships. Unlock deeper understanding of
            your connection style.
          </p>
        </div>
      </section>

      {/* Test Cards Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.map((test) => (
              <Link key={test.id} href={test.href}>
                <div className="group bg-white rounded-xl border border-slate-200 p-8 h-full flex flex-col transition-all duration-300 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-500/10 cursor-pointer">
                  {/* Content */}
                  <div className="flex-1">
                    {/* Label */}
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
                        Test {test.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-rose-600 transition-colors">
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
                  <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
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
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to understand your relationships?
          </h2>
          <p className="text-pink-100 text-lg mb-8">
            Choose any test above to explore your connection patterns and
            relationship dynamics.
          </p>
        </div>
      </section>
    </div>
  );
}
