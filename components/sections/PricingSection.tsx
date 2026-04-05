"use client";

import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getClientUser } from "@/utils/supabase/client-auth";
import { STRIPE_PRICES } from "@/lib/stripe-config";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  label: string;
  priceId: string;
}

export const PricingSection: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allFeatures = [
    "Access to 50+ psychological tests",
    "Full category access (8 dimensions)",
    "Deep psychological insights",
    "Personalized recommendations",
    "Progress tracking & trend analysis",
    "Pattern recognition & insight loops",
    "Emotional & decision analysis",
    "Priority access to new tests",
    "Faster result processing",
    "Premium UI experience",
  ];

  const plans: PricingPlan[] = [
    {
      name: "Monthly",
      price: "RM9.90",
      period: "/month",
      label: "Pay as you go - Cancel anytime",
      priceId: STRIPE_PRICES.MONTHLY,
    },
    {
      name: "Yearly",
      price: "RM59",
      period: "/year",
      label: "Best value - Lock in annual rate",
      priceId: STRIPE_PRICES.YEARLY,
    },
  ];

  const handleCheckout = async (plan: PricingPlan) => {
    try {
      setIsLoading(plan.name);
      setError(null);

      // Check if user is logged in
      const user = await getClientUser();
      if (!user) {
        router.push(`/auth/signup?plan=${plan.name.toLowerCase()}`);
        return;
      }

      if (!plan.priceId) {
        setError(
          "Stripe is not configured. Contact support or try again later.",
        );
        return;
      }

      // Create checkout session
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          userId: user.id,
          email: user.email,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create checkout session");
      }

      const { url } = await res.json();

      if (url) {
        window.location.href = url;
      } else {
        setError("Failed to create checkout session");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err.message || "Failed to process checkout");
    } finally {
      setIsLoading(null);
    }
  };

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
            One affordable price for complete access to every psychological test
            and deep personal insights inside TrueSelf.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`rounded-3xl border transition-all ${
                index === 1
                  ? "border-2 bg-gradient-to-br from-sky-50 to-cyan-50 shadow-lg hover:-translate-y-1"
                  : "border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1"
              }`}
              style={
                index === 1
                  ? { borderColor: "#4399E6" }
                  : { borderColor: "#e2e8f0" }
              }
            >
              {/* Badge for Yearly */}
              {index === 1 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="px-4 py-1.5 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: "#4399E6" }}
                  >
                    Save 50%
                  </div>
                </div>
              )}

              <div
                className={`p-8 md:p-10 space-y-6 ${index === 1 ? "pt-6" : ""}`}
              >
                {/* Title & Price */}
                <div>
                  <h4
                    className="text-2xl font-semibold"
                    style={{ color: "#545454" }}
                  >
                    {plan.name}
                  </h4>
                  <p
                    className="mt-2 text-sm"
                    style={
                      index === 1 ? { color: "#4399E6" } : { color: "#8b8b8b" }
                    }
                  >
                    {plan.label}
                  </p>

                  {/* Price */}
                  <div className="mt-8">
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-5xl font-bold"
                        style={{ color: "#545454" }}
                      >
                        {plan.price}
                      </span>
                      <span
                        className="text-base font-medium"
                        style={{ color: "#999999" }}
                      >
                        {plan.period}
                      </span>
                    </div>
                    {plan.name === "Yearly" && (
                      <p className="text-xs mt-2" style={{ color: "#999999" }}>
                        That's just RM4.92/month
                      </p>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4">
                  {allFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle
                        size={20}
                        style={{
                          color: index === 1 ? "#4399E6" : "#5CE1E6",
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

                {/* CTA Button */}
                <button
                  onClick={() => handleCheckout(plan)}
                  disabled={isLoading !== null || !plan.priceId}
                  className={`w-full py-3 px-6 rounded-lg text-base font-medium transition-all duration-200 ${
                    isLoading === plan.name
                      ? "opacity-75 cursor-not-allowed"
                      : ""
                  }`}
                  style={
                    index === 1
                      ? {
                          backgroundColor: "#4399E6",
                          color: "white",
                        }
                      : {
                          backgroundColor: "#ffffff",
                          color: "#545454",
                          border: "1px solid #e2e8f0",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (isLoading !== plan.name && plan.priceId) {
                      if (index === 1) {
                        e.currentTarget.style.backgroundColor = "#3188d4";
                        e.currentTarget.style.boxShadow =
                          "0 10px 25px rgba(67, 153, 230, 0.3)";
                      } else {
                        e.currentTarget.style.backgroundColor = "#f1f5f9";
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index === 1) {
                      e.currentTarget.style.backgroundColor = "#4399E6";
                      e.currentTarget.style.boxShadow = "none";
                    } else {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }
                  }}
                >
                  {isLoading === plan.name
                    ? "Processing..."
                    : `Get Started - ${plan.name}`}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-8 max-w-4xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-12 max-w-4xl mx-auto p-6 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-slate-700 text-center">
            💳 Secure checkout powered by Stripe. No hidden fees. Cancel
            anytime.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};
