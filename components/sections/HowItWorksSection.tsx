"use client";

import React from "react";
import { ClipboardList, Eye, Compass } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Answer simple questions",
    description:
      "Respond to questions about how you think and react in everyday situations",
    icon: ClipboardList,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    number: "02",
    title: "See your patterns",
    description:
      "We show you the patterns that shape your decisions and behavior",
    icon: Eye,
    bgColor: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    number: "03",
    title: "Understand what to do next",
    description:
      "Get clear guidance on what you should focus on moving forward",
    icon: Compass,
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-3">
          How it works
        </h2>

        {/* Subtext */}
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Three simple steps to understand yourself better
        </p>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full flex flex-col items-center text-center"
              >
                {/* Step Number - Light and subtle */}
                <div className="text-4xl font-bold text-gray-200 mb-2">
                  {step.number}
                </div>

                {/* Icon Container */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${step.bgColor}`}
                >
                  <IconComponent size={24} className={step.iconColor} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
