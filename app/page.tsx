"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { QuizCategoriesSection } from "@/components/sections/QuizCategoriesSection";
import { ValueSection } from "@/components/sections/ValueSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <QuizCategoriesSection />
      <ValueSection />
      <FinalCTASection />
    </>
  );
}
