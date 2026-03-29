"use client";

import React from "react";
import { Settings, Lightbulb, Compass } from "lucide-react";

const values = [
  {
    title: "System",
    description:
      "Understand how your thoughts and actions connect instead of seeing things separately",
    icon: Settings,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Clarity",
    description: "See clearly why your life feels the way it does right now",
    icon: Lightbulb,
    bgColor: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    title: "Direction",
    description: "Know what to focus on next without guessing or overthinking",
    icon: Compass,
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
];

export const ValueSection: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          This is not just a personality test
        </h2>

        {/* Subtext */}
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
          We help you understand how you think, how you act, and why the same
          patterns keep showing up in your life.
        </p>

        {/* Feature Row */}
        <div className="grid md:grid-cols-3 gap-10 mt-12">
          {values.map((value) => {
            const IconComponent = value.icon;
            return (
              <div
                key={value.title}
                className="flex flex-col items-center justify-center text-center"
              >
                {/* Icon Container */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${value.bgColor}`}
                >
                  <IconComponent size={24} className={value.iconColor} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
