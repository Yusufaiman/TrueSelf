"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Waves } from "@/components/ui/Waves";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white min-h-screen flex flex-col">
      {/* Animated Waves Background - positioned absolutely */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Waves
          backgroundColor="#ffffff"
          strokeColor="rgba(56, 189, 248, 0.25)"
          className="h-full w-full"
        />
      </div>

      {/* Content Container */}
      <SectionWrapper
        id="home"
        className="relative z-10 flex-1 flex flex-col justify-center py-20 md:py-32"
      >
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center w-full space-y-8 animate-fade-in">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur">
            Whole-Self Profile System
          </span>

          {/* Main Title */}
          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
            Understand the patterns that make you, you.
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
            TrueSelf turns your personality, identity, relationships, career,
            mind, motivation, growth, stress, and life data into one connected
            profile with clear analytics and a timeline of how you change.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <button
              onClick={() =>
                (window.location.href = "/assessment/trueself-16-type")
              }
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2"
            >
              Start building your profile
              <ArrowRight size={20} />
            </button>
            <p className="text-sm text-slate-500">
              Begin with the 16-Type foundation, then unlock the full self-map.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* CSS for fade-in animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};
