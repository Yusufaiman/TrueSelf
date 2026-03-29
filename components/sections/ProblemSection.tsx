"use client";

import React from "react";
import { Brain, Repeat2, Zap, Compass, Users, Cloud } from "lucide-react";
import { ArrowRight } from "lucide-react";

const situations = [
  {
    icon: Brain,
    title: "You overthink everything",
    description:
      "You struggle to make decisions because you keep thinking too much",
  },
  {
    icon: Repeat2,
    title: "You keep repeating the same patterns",
    description: "Things change on the outside but the outcome stays the same",
  },
  {
    icon: Zap,
    title: "You feel tired even when you did not do much",
    description: "Your energy feels low without a clear reason",
  },
  {
    icon: Compass,
    title: "You are unsure about your direction",
    description: "You are not fully clear where your life is heading",
  },
  {
    icon: Users,
    title: "Your relationships feel complicated",
    description: "Things feel heavier than they should be",
  },
  {
    icon: Cloud,
    title: "You feel empty even when things seem okay",
    description: "Everything looks fine but something still feels missing",
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="w-full py-20 md:py-24 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center tracking-tight">
          Something feels off, but you can't explain why
        </h2>

        {/* Subtext */}
        <p className="text-white/80 text-center max-w-2xl mx-auto mt-6 leading-relaxed text-base md:text-lg">
          You have tried to figure things out.
          <br />
          You think more, you reflect more, but nothing really changes.
          <br />
          It is not because you are not trying.
          <br />
          You just have not seen the full picture yet.
        </p>

        {/* Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {situations.map((situation, index) => {
            const IconComponent = situation.icon;
            return (
              <div
                key={index}
                className="bg-white text-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Icon */}
                <div className="bg-blue-100 text-blue-500 p-2 rounded-md w-fit mb-4">
                  <IconComponent size={24} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {situation.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {situation.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center mt-12">
          <button
            onClick={() => (window.location.href = "/tests/identity")}
            className="bg-white text-blue-600 font-medium px-8 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            Start understanding yourself
            <ArrowRight size={18} />
          </button>
          <p className="text-white/70 text-sm text-center mt-3">
            Get your results instantly. No signup needed.
          </p>
        </div>
      </div>
    </section>
  );
};
