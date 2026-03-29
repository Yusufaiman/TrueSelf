"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const PricingSection: React.FC = () => {
  const monthlyFeatures = [
    "Access all tests",
    "Full category access",
    "Detailed insights",
    "Progress tracking",
    "Clear personal insights",
  ];

  const yearlyFeatures = [
    "Access all tests",
    "Full category access",
    "Detailed insights",
    "Progress tracking",
    "Better long-term value",
  ];

  return (
    <SectionWrapper id="pricing" className="bg-white py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-tight"
            style={{ color: "#545454" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-base md:text-lg" style={{ color: "#8b8b8b" }}>
            Choose the plan that gives you full access to every test and insight
            inside TrueSelf.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <div
            className="rounded-3xl border border-slate-200 bg-white shadow-sm p-8 md:p-10 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            style={{
              borderColor: "#e2e8f0",
            }}
          >
            <div>
              <h3
                className="text-2xl font-semibold"
                style={{ color: "#545454" }}
              >
                Monthly
              </h3>
              <p className="mt-2 text-sm" style={{ color: "#8b8b8b" }}>
                Pay as you go
              </p>

              {/* Price */}
              <div className="mt-8">
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-5xl font-bold"
                    style={{ color: "#545454" }}
                  >
                    RM9.90
                  </span>
                  <span
                    className="text-base font-medium"
                    style={{ color: "#999999" }}
                  >
                    /month
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="mt-8 space-y-4">
                {monthlyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      style={{
                        color: "#5CE1E6",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#545454" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <button
              className="w-full mt-8 py-3 px-6 rounded-lg text-base font-medium transition-all duration-200"
              style={{
                backgroundColor: "#ffffff",
                color: "#545454",
                border: "1px solid #e2e8f0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
              }}
            >
              Get Started
            </button>
          </div>

          {/* Yearly Plan (Featured) */}
          <div
            className="rounded-3xl border-2 bg-gradient-to-br from-sky-50 to-cyan-50 shadow-lg p-8 md:p-10 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 relative"
            style={{
              borderColor: "#4399E6",
            }}
          >
            {/* Badge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: "#4399E6" }}
              >
                Save 51%
              </div>
            </div>

            <div>
              <h3
                className="text-2xl font-semibold"
                style={{ color: "#545454" }}
              >
                Yearly
              </h3>
              <p
                className="mt-2 text-sm font-medium"
                style={{ color: "#4399E6" }}
              >
                Best value
              </p>

              {/* Price */}
              <div className="mt-8">
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-5xl font-bold"
                    style={{ color: "#545454" }}
                  >
                    RM59
                  </span>
                  <span
                    className="text-base font-medium"
                    style={{ color: "#999999" }}
                  >
                    /year
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="mt-8 space-y-4">
                {yearlyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      style={{
                        color: "#4399E6",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#545454" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <button
              className="w-full mt-8 py-3 px-6 rounded-lg text-base font-medium text-white transition-all duration-200"
              style={{
                backgroundColor: "#4399E6",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#3188d4";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(67, 153, 230, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#4399E6";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Start Annual Plan
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
