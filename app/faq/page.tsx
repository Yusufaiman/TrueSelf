"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "What is TrueSelf?",
    answer:
      "TrueSelf is a self discovery platform that helps you understand your patterns across identity, mindset, relationships, behavior, and more. It does not define you with a single label. It breaks you into multiple layers so you can see yourself clearly.",
  },
  {
    question: "Are these tests accurate?",
    answer:
      "The tests are designed to identify patterns, not give absolute definitions. Accuracy improves as you answer honestly. The goal is awareness, not perfection.",
  },
  {
    question: "How is this different from personality tests?",
    answer:
      "Most personality tests give you one type. TrueSelf gives you multiple types across different areas of your life. This creates a more realistic and complete understanding of who you are.",
  },
  {
    question: "How long does each test take?",
    answer:
      "Most tests take between 5 to 10 minutes depending on the number of questions.",
  },
  {
    question: "Can my results change over time?",
    answer:
      "Yes. Your patterns can evolve as your experiences, environment, and decisions change. TrueSelf reflects your current state, not a permanent label.",
  },
  {
    question: "Do I need to take all tests?",
    answer:
      "No. You can take tests based on what you want to understand. Each test reveals a different part of you.",
  },
  {
    question: "Is my data private?",
    answer:
      "Your responses are used only to generate your results. Your data is not shared publicly.",
  },
  {
    question: "What should I do after getting my results?",
    answer:
      "Use your results to reflect, not judge yourself. The goal is to understand your patterns so you can make better decisions moving forward.",
  },
  {
    question: "Is TrueSelf for everyone?",
    answer:
      "TrueSelf is for people who want clarity. If you are willing to understand yourself honestly, the system will be useful.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
  index,
}) => {
  return (
    <div className="border-b border-slate-200 last:border-b-0 group hover:bg-slate-50 transition-colors duration-200">
      <button
        onClick={onClick}
        className="w-full px-6 md:px-8 py-6 flex items-start gap-4 text-left"
      >
        {/* Number Badge */}
        <div className="flex-shrink-0 pt-1">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center text-sm font-bold">
            {index + 1}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow text-left">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
            {question}
          </h3>
        </div>

        {/* Chevron */}
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-slate-600 group-hover:text-slate-900 transition-all duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {/* Answer */}
      {isOpen && (
        <div className="px-6 md:px-8 pb-6 pt-0 pl-14 text-slate-600 leading-relaxed animate-in fade-in duration-200 border-l-2 border-blue-500 ml-4">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-blue-100 via-cyan-50 to-white py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to understand how TrueSelf works and what you
            will gain from it.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                index={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === idx}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-blue-500 to-cyan-500 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-4">
            <HelpCircle size={48} className="text-white opacity-80" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Start exploring TrueSelf and discover yourself. No signup required.
          </p>
          <Link href="/tests">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Take Your First Test
              <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
