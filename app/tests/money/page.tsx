"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tests = [
  {
    id: 1,
    title: "Your Money Mindset",
    description:
      "Uncover your beliefs and attitudes about money and how they impact your financial behavior.",
    duration: "6–8 min",
    questions: "12 questions",
    href: "/tests/money/money-mindset",
  },
  {
    id: 2,
    title: "Your Money Relationship",
    description:
      "Understand your emotional relationship with money and what triggers financial stress.",
    duration: "7–9 min",
    questions: "14 questions",
    href: "/tests/money/money-relationship",
  },
  {
    id: 3,
    title: "Your Spending Patterns",
    description:
      "Discover your spending behaviors, triggers, and whether you have healthy financial habits.",
    duration: "6–8 min",
    questions: "13 questions",
    href: "/tests/money/spending-patterns",
  },
  {
    id: 4,
    title: "Money Fears & Blocks",
    description:
      "Identify the fears and limiting beliefs that hold you back from financial abundance.",
    duration: "7–9 min",
    questions: "15 questions",
    href: "/tests/money/money-blocks",
  },
];

export default function MoneyTestsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-100 via-emerald-50 to-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">
              Money Tests
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Understand Your Money Mindset
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore your beliefs, behaviors, and fears around money and
            financial abundance.
          </p>
        </div>
      </section>

      {/* Test Cards Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.map((test) => (
              <Link key={test.id} href={test.href}>
                <div className="group bg-white rounded-xl border border-slate-200 p-8 h-full flex flex-col transition-all duration-300 hover:border-green-300 hover:shadow-lg hover:shadow-green-500/10 cursor-pointer">
                  {/* Content */}
                  <div className="flex-1">
                    {/* Label */}
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">
                        Test {test.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-green-600 transition-colors">
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
                  <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
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
      <section className="bg-gradient-to-r from-green-500 to-emerald-500 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to improve your money mindset?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Choose any test above to explore your relationship with money and
            financial beliefs.
          </p>
        </div>
      </section>
    </div>
  );
}
