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
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            Understand how your life actually works
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-slate-600">
            You've tried to change, but the same patterns keep repeating.
            <br />
            Now it's time to understand why.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <button
              onClick={() =>
                (window.location.href = "/tests/identity/who-you-really-are")
              }
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2"
            >
              Discover Your Real Self
              <ArrowRight size={20} />
            </button>
            <p className="text-sm text-slate-500">
              No signup required. Get your results instantly.
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
