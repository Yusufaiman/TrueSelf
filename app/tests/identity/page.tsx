"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tests = [
  {
    id: 1,
    title: "Who You Really Are",
    description:
      "See who you are at your core, beyond outside pressure and expectations.",
    duration: "5–7 min",
    questions: "10 questions",
    href: "/tests/identity/who-you-really-are",
  },
  {
    id: 2,
    title: "Your Core Personality Type",
    description:
      "Understand how you naturally think, decide, and respond to situations.",
    duration: "8–10 min",
    questions: "15 questions",
    href: "/tests/identity/personality-type",
  },
  {
    id: 3,
    title: "What Drives You",
    description:
      "Discover what truly motivates your choices and actions in life.",
    duration: "6–8 min",
    questions: "12 questions",
    href: "/tests/identity/what-drives-you",
  },
  {
    id: 4,
    title: "Your Strengths and Weaknesses",
    description: "Learn what you do best and what might be holding you back.",
    duration: "7–9 min",
    questions: "14 questions",
    href: "/tests/identity/strengths-weaknesses",
  },
  {
    id: 5,
    title: "Your Real Self vs Your Current Self",
    description:
      "See the gap between who you are now and who you could become.",
    duration: "9–11 min",
    questions: "18 questions",
    href: "/tests/identity/real-vs-current-self",
  },
];

export default function IdentityTestsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-100 via-cyan-50 to-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Identity Tests
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Understand Who You Really Are
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore your personality, patterns, and what shapes the way you
            think, feel, and act. Each test reveals another layer of your true
            self.
          </p>
        </div>
      </section>

      {/* Test Cards Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.map((test) => (
              <Link key={test.id} href={test.href}>
                <div className="group bg-white rounded-xl border border-slate-200 p-8 h-full flex flex-col transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer">
                  {/* Content */}
                  <div className="flex-1">
                    {/* Label */}
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                        Test {test.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
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
                  <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
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
      <section className="bg-gradient-to-r from-blue-500 to-cyan-500 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to explore yourself?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Choose any test above to start your journey of self-discovery.
          </p>
        </div>
      </section>
    </div>
  );
}
