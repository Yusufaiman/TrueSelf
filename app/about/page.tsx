"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  Zap,
  Eye,
  User,
  Users,
  Briefcase,
  Map,
  Brain,
  Heart,
  RefreshCw,
  Wallet,
  AlertCircle,
} from "lucide-react";

const dimensions = [
  {
    title: "Identity",
    description: "Understand who you are at your core",
    icon: User,
    slug: "identity",
    color: "#3b82f6",
    bgColor: "#dbeafe",
  },
  {
    title: "Relationships",
    description: "See how you connect and behave with others",
    icon: Users,
    slug: "relationships",
    color: "#ec4899",
    bgColor: "#fce7f3",
  },
  {
    title: "Career",
    description: "Discover how you work and what fits you",
    icon: Briefcase,
    slug: "career",
    color: "#6366f1",
    bgColor: "#e0e7ff",
  },
  {
    title: "Life Direction",
    description: "Understand where you are heading",
    icon: Map,
    slug: "life-direction",
    color: "#14b8a6",
    bgColor: "#ccfbf1",
  },
  {
    title: "Mindset",
    description: "Explore how you think and process reality",
    icon: Brain,
    slug: "mindset",
    color: "#9333ea",
    bgColor: "#f3e8ff",
  },
  {
    title: "Emotional Health",
    description: "Understand your emotional patterns and responses",
    icon: Heart,
    slug: "emotional-health",
    color: "#dc2626",
    bgColor: "#fee2e2",
  },
  {
    title: "Life Patterns",
    description: "Identify repeating behaviors and cycles",
    icon: RefreshCw,
    slug: "life-patterns",
    color: "#059669",
    bgColor: "#dcfce7",
  },
  {
    title: "Money",
    description: "See how you think and behave around money",
    icon: Wallet,
    slug: "money",
    color: "#b91c1c",
    bgColor: "#fecaca",
  },
  {
    title: "Reality Check",
    description: "Understand how others see you versus how you see yourself",
    icon: AlertCircle,
    slug: "reality-check",
    color: "#7c3aed",
    bgColor: "#ede9fe",
  },
];

const whatIsTrueSelf = [
  {
    title: "Multi-Dimensional",
    description:
      "TrueSelf is a structured self discovery system designed to help you understand yourself across multiple dimensions.",
    icon: <Layers size={24} />,
    color: "#3b82f6",
    bgColor: "#dbeafe",
  },
  {
    title: "Layered Understanding",
    description:
      "Instead of giving you a single label, TrueSelf breaks you into layers. Each test reveals a different part of how you think, behave, and respond.",
    icon: <Eye size={24} />,
    color: "#ec4899",
    bgColor: "#fce7f3",
  },
  {
    title: "Pattern Recognition",
    description:
      "You are not one type. You are a combination of patterns. TrueSelf helps you see those patterns clearly.",
    icon: <Zap size={24} />,
    color: "#f59e0b",
    bgColor: "#fef3c7",
  },
];

const howItWorks = [
  {
    title: "Take Assessments",
    description:
      "Answer structured questions designed to reveal your patterns across identity, mindset, relationships, and more.",
  },
  {
    title: "Discover Your Types",
    description:
      "Each result maps you into specific type systems based on real behavioral patterns, not generic personality labels.",
  },
  {
    title: "Understand Yourself Clearly",
    description:
      "You begin to see how your decisions, emotions, and behaviors connect across different areas of your life.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-blue-100 via-cyan-50 to-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Understand What TrueSelf Is Built For
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            TrueSelf helps you understand how you think, feel, and behave across
            different areas of your life. It brings clarity to patterns that are
            often invisible but shape your decisions, relationships, and
            direction.
          </p>
        </div>
      </section>

      {/* What is TrueSelf Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight text-center">
              What is TrueSelf
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto text-center mb-12">
              A structured system to understand yourself across multiple
              dimensions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whatIsTrueSelf.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col h-full shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                    style={{
                      backgroundColor: item.bgColor,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-24 bg-linear-to-b from-blue-500 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight text-center">
            How It Works
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto text-center mb-12">
            Three simple steps to understand yourself better
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 p-8 flex flex-col h-full hover:bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 text-white font-bold text-lg shadow-lg group-hover:shadow-cyan-500/50">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed flex-1">
                  {item.description}
                </p>
                <div className="mt-6 h-1 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes TrueSelf Different Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 tracking-tight">
              What Makes TrueSelf Different
            </h2>
            <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
              <p>Most systems try to define you with a single category.</p>
              <p>TrueSelf does the opposite.</p>
              <p>
                It separates your identity into multiple dimensions, including
                identity, personality, mindset, emotional health, life patterns,
                money behavior, and more.
              </p>
              <p>
                This allows you to see contradictions, gaps, and hidden patterns
                that traditional systems miss.
              </p>
              <p className="text-xl font-semibold text-slate-900 pt-4">
                The goal is not to label you.
              </p>
              <p className="text-xl font-semibold text-slate-900">
                The goal is to make you aware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dimensions Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight text-center">
            What You Can Explore
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto text-center mb-12">
            Choose a life area you want to understand better.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dimensions.map((dimension) => {
              const IconComponent = dimension.icon;
              return (
                <Link
                  key={dimension.slug}
                  href={`/tests/${dimension.slug}`}
                  className="block h-full group"
                >
                  <div className="bg-white rounded-xl p-6 h-full flex flex-col border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 cursor-pointer overflow-hidden relative">
                    {/* Gradient overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-400 pointer-events-none"
                      style={{ backgroundColor: dimension.color }}
                    />

                    {/* Icon Container */}
                    <div
                      className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg relative z-10"
                      style={{
                        backgroundColor: dimension.bgColor,
                      }}
                    >
                      <IconComponent
                        size={24}
                        style={{ color: dimension.color }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-grow relative z-10">
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-950 transition-colors duration-300">
                        {dimension.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {dimension.description}
                      </p>
                    </div>

                    {/* Explore Button */}
                    <button
                      className="mt-6 w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 group-hover:shadow-lg relative z-10 active:scale-95"
                      style={{
                        background: `linear-gradient(135deg, ${dimension.color}, ${dimension.color})`,
                        opacity: 0.9,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "0.9";
                      }}
                    >
                      Explore
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 tracking-tight">
              Why TrueSelf Exists
            </h2>
            <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
              <p>
                Most people move through life without fully understanding
                themselves.
              </p>
              <p>
                They repeat patterns, make decisions without clarity, and
                struggle to explain why they feel stuck.
              </p>
              <p className="text-xl font-semibold text-slate-900 pt-4">
                TrueSelf exists to give clarity.
              </p>
              <p>Not surface level insight, but structured understanding.</p>
              <p className="text-xl font-semibold text-slate-900 pt-2">
                When you understand yourself clearly, your decisions become
                clearer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-blue-500 to-cyan-500 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Understanding Yourself
          </h2>
          <Link href="/tests">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Your First Test
              <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
