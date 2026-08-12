"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const FinalCTASection: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 px-6 py-20 text-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-3xl font-black tracking-tight md:text-5xl">
          Start your TrueSelf profile today.
        </h2>

        {/* Subtext */}
        <p className="text-white/80 mt-4 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Begin with the 16-Type foundation, then let each assessment add real
          evidence to your overview, analytics, timeline, and recommendations.
        </p>

        {/* CTA Button */}
        <Link href="/assessment/trueself-16-type" className="inline-block mt-8">
          <button className="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2">
            Build my profile
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </Link>

        {/* Secondary line */}
        <p className="text-white/70 text-sm mt-3">
          Nine domains. One connected profile. Insights that update over time.
        </p>
      </div>
    </section>
  );
};
