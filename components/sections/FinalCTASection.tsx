"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const FinalCTASection: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          You are closer than you think
        </h2>

        {/* Subtext */}
        <p className="text-white/80 mt-4 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          You already feel that something is not fully right.
          <br />
          You just need to understand what is really going on.
        </p>

        {/* CTA Button */}
        <Link href="/tests/identity" className="inline-block mt-8">
          <button className="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2">
            Start your first test
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </Link>

        {/* Secondary line */}
        <p className="text-white/70 text-sm mt-3">
          No signup needed. Get your results instantly.
        </p>
      </div>
    </section>
  );
};
