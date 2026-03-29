"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  Users,
  Briefcase,
  Map,
  Brain,
  Heart,
  RefreshCw,
  Wallet,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "Identity",
    description:
      "Understand who you are and how you think, act, and make decisions",
    icon: User,
    slug: "identity",
    color: "#3b82f6",
    bgColor: "#dbeafe",
  },
  {
    title: "Relationships",
    description:
      "See how you connect with others and why certain patterns repeat",
    icon: Users,
    slug: "relationships",
    color: "#ec4899",
    bgColor: "#fce7f3",
  },
  {
    title: "Career",
    description:
      "Explore the kind of work that fits your strengths and direction",
    icon: Briefcase,
    slug: "career",
    color: "#6366f1",
    bgColor: "#e0e7ff",
  },
  {
    title: "Life Direction",
    description:
      "Get clarity on where your life is heading and what to focus on",
    icon: Map,
    slug: "life-direction",
    color: "#14b8a6",
    bgColor: "#ccfbf1",
  },
  {
    title: "Mindset",
    description:
      "Understand how your thinking shapes your actions and outcomes",
    icon: Brain,
    slug: "mindset",
    color: "#9333ea",
    bgColor: "#f3e8ff",
  },
  {
    title: "Emotional Health",
    description: "Learn how your emotions affect your daily life and decisions",
    icon: Heart,
    slug: "emotional-health",
    color: "#dc2626",
    bgColor: "#fee2e2",
  },
  {
    title: "Life Patterns",
    description:
      "Discover the hidden patterns that keep repeating in your life",
    icon: RefreshCw,
    slug: "life-patterns",
    color: "#059669",
    bgColor: "#dcfce7",
  },
  {
    title: "Money",
    description:
      "Understand your behavior around money and how it affects growth",
    icon: Wallet,
    slug: "money",
    color: "#b91c1c",
    bgColor: "#fecaca",
  },
  {
    title: "Reality Check",
    description: "See a more honest view of yourself, including blind spots",
    icon: AlertCircle,
    slug: "reality-check",
    color: "#7c3aed",
    bgColor: "#ede9fe",
  },
];

export const QuizCategoriesSection: React.FC = () => {
  return (
    <section id="quizzes" className="w-full py-20 md:py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
            Test Categories
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Choose a life area you want to understand better.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/tests/${category.slug}`}
                className="block h-full group"
              >
                <div className="bg-white rounded-xl p-6 h-full flex flex-col border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 cursor-pointer overflow-hidden relative">
                  {/* Gradient overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-400 pointer-events-none"
                    style={{ backgroundColor: category.color }}
                  />

                  {/* Icon Container - Enhanced */}
                  <div
                    className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg relative z-10"
                    style={{
                      backgroundColor: category.bgColor,
                    }}
                  >
                    <IconComponent
                      size={24}
                      style={{ color: category.color }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-grow relative z-10">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-950 transition-colors duration-300">
                      {category.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {category.description}
                    </p>
                  </div>

                  {/* Explore Button - Enhanced with gradient */}
                  <button
                    className="mt-6 w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 group-hover:shadow-lg relative z-10 active:scale-95"
                    style={{
                      background: `linear-gradient(135deg, ${category.color}, ${category.color})`,
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
  );
};
