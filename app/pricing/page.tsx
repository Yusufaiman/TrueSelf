"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PricingPage() {
  const plans = [
    {
      name: "Monthly",
      description: "Pay as you go",
      price: "RM9.90",
      period: "/month",
      cta: "Start Monthly Plan",
      microcopy: "No commitment. Cancel anytime.",
      features: [
        "Access to 50+ psychological tests",
        "Full category access (8 dimensions)",
        "Deep psychological insights",
        "Personalized recommendations",
        "Progress tracking & trend analysis",
        "Track changes in your patterns over time",
        "Downloadable PDF reports",
        "Shareable insights with others",
        "Detailed behavioral breakdown",
        "Pattern recognition & insight loops",
        "Emotional & decision analysis",
        "Priority access to new tests",
        "Faster result processing",
        "Premium UI experience",
      ],
      highlighted: false,
    },
    {
      name: "Yearly",
      description: "Best value",
      price: "RM59",
      period: "/year",
      cta: "Start Annual Plan",
      microcopy: "No commitment. Cancel anytime.",
      saveBadge: "Save 50%",
      features: [
        "Access to 50+ psychological tests",
        "Full category access (8 dimensions)",
        "Deep psychological insights",
        "Personalized recommendations",
        "Progress tracking & trend analysis",
        "Track changes in your patterns over time",
        "Downloadable PDF reports",
        "Shareable insights with others",
        "Detailed behavioral breakdown",
        "Pattern recognition & insight loops",
        "Emotional & decision analysis",
        "Priority access to new tests",
        "Faster result processing",
        "Premium UI experience",
        "Lifetime data history",
        "Continuous updates & new tests",
      ],
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-dark-grey mb-6">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-center text-soft-grey max-w-2xl mx-auto">
          Choose the plan that gives you full access to every test and insight
          inside TrueSelf. Unlock deep self-understanding at a price that works
          for you.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto px-6 pb-24 md:pb-32">
        <div className="grid md:grid-cols-2 gap-8 md:gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "border-2 border-blue-500 bg-white shadow-2xl relative md:scale-105 hover:shadow-cyan-500/20 hover:shadow-2xl"
                  : "border border-slate-200 bg-white shadow-lg hover:shadow-xl hover:border-cyan-400"
              }`}
            >
              {/* Badge */}
              {plan.saveBadge && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {plan.saveBadge}
                  </span>
                </div>
              )}

              {/* Plan Info */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-dark-grey mb-2">
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-6 ${plan.highlighted ? "text-cyan-600 font-semibold" : "text-soft-grey"}`}
                >
                  {plan.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-dark-grey">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-soft-grey">{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href="/tests/identity/who-you-really-are"
                  className="block mb-3"
                >
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-dark-grey"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </Link>

                {/* Microcopy */}
                <p className="text-xs text-soft-grey text-center">
                  {plan.microcopy}
                </p>
              </div>

              {/* Features List */}
              <div className="border-t border-slate-200 pt-8">
                <p className="text-sm font-semibold text-dark-grey mb-4">
                  What's included:
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check
                        size={20}
                        className={`${plan.highlighted ? "text-cyan-500" : "text-cyan-500"} flex-shrink-0 mt-0.5`}
                        strokeWidth={3}
                      />
                      <span className="text-sm text-soft-grey leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-dark-grey mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes, absolutely. No long-term contracts or hidden fees. Cancel your subscription anytime directly from your account settings.",
              },
              {
                q: "How do I access the tests after subscribing?",
                a: "After subscribing, you'll have immediate access to all 50+ tests across all 8 dimensions. Start with any category that interests you.",
              },
              {
                q: "Can I switch from Monthly to Yearly?",
                a: "Yes, you can upgrade to our yearly plan at any time. Your existing data and insights will transfer seamlessly, and you'll receive credit for your remaining monthly subscription.",
              },
              {
                q: "What's the difference between Monthly and Yearly?",
                a: "Both plans include full access to all tests and features. The yearly plan offers better value at a 50% discount and includes lifetime data history and priority access to continuous updates.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-cyan-300 transition-colors duration-200"
              >
                <h3 className="font-semibold text-dark-grey mb-2">{faq.q}</h3>
                <p className="text-soft-grey">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-dark-grey mb-4">
            Ready to understand yourself deeply?
          </h2>
          <p className="text-soft-grey text-lg mb-8 max-w-2xl mx-auto">
            Get full access to all 50+ psychological tests and unlock
            personalized insights that shape your path forward.
          </p>
          <Link href="/tests/identity/who-you-really-are">
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200">
              Start Your Journey
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
