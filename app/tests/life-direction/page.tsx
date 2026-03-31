"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tests = [
  {
    id: 1,
    title: "What You Should Do in Life",
    description:
      "Discover the path that aligns with your strengths, interests, and deeper purpose.",
    duration: "5–7 min",
    questions: "10 questions",
    href: "/tests/life-direction/life-path",
    pills: ["Life Direction Types", "Purpose Path"],
  },
  {
    id: 2,
    title: "What Matters Most to You",
    description:
      "Understand your core values and what truly drives your decisions and happiness.",
    duration: "6–8 min",
    questions: "12 questions",
    href: "/tests/life-direction/core-values",
    pills: ["Value Types", "Priority System"],
  },
  {
    id: 3,
    title: "What You Should Focus On Now",
    description:
      "Get clarity on your current priorities and what deserves your attention right now.",
    duration: "5–7 min",
    questions: "11 questions",
    href: "/tests/life-direction/focus-priorities",
    pills: ["Focus Mapping", "Decision Clarity"],
  },
  {
    id: 4,
    title: "Why You Feel Stuck in Life",
    description:
      "Uncover the hidden reasons you're feeling stuck and what's holding you back.",
    duration: "7–9 min",
    questions: "13 questions",
    href: "/tests/life-direction/feeling-stuck",
    pills: ["Life Blocks", "Internal Conflict"],
  },
];

export default function LifeDirectionTestsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-100 via-cyan-50 to-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">
              Life Direction Tests
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Find Your Direction in Life
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Gain clarity on what truly matters, where you're heading, and what
            you should focus on next.
          </p>
        </div>
      </section>

      {/* Test Cards Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.map((test) => (
              <Link key={test.id} href={test.href}>
                <div className="group bg-white rounded-xl border border-slate-200 p-8 h-full flex flex-col transition-all duration-300 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-500/10 cursor-pointer">
                  {/* Content */}
                  <div className="flex-1">
                    {/* Label */}
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                        Test {test.id}
                      </span>
                    </div>
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
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

                  {/* Pills */}
                  {test.pills && test.pills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {test.pills.map((pill, idx) => (
                        <span
                          key={idx}
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            idx === 0
                              ? "bg-cyan-100 text-cyan-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
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
      <section className="bg-gradient-to-r from-teal-500 to-cyan-500 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to find clarity?
          </h2>
          <p className="text-teal-100 text-lg mb-8">
            Choose any test above to explore your values, priorities, and life
            direction.
          </p>
        </div>
      </section>
    </div>
  );
}
