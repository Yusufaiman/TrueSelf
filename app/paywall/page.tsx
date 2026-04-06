"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSubscription } from "@/hooks/useSubscription";
import { Lock, ChevronRight, Star, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

function PaywallContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams.get("source") || "default";
  const { isSubscribed, isLoading } = useSubscription();

  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if already subscribed
  React.useEffect(() => {
    if (!isLoading && isSubscribed) {
      router.push(source === "result" ? "/dashboard/results" : "/tests");
    }
  }, [isSubscribed, isLoading, router, source]);

  const handleCheckout = async (plan: "monthly" | "yearly") => {
    try {
      setIsProcessing(true);
      setSelectedPlan(plan);

      const priceId =
        plan === "yearly"
          ? process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY
          : process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY;

      if (!priceId) {
        alert("Pricing not configured. Contact support.");
        return;
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/paywall?source=${source}`,
        }),
      });

      const data = await response.json();

      if (data.sessionId) {
        // Redirect to Stripe Checkout
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
      } else if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to start checkout. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          </div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Dynamic headline based on source
  const getHeadline = () => {
    switch (source) {
      case "test-complete":
        return "You've Completed the Test";
      case "dashboard":
        return "Unlock Your Insights";
      case "result":
        return "Results Ready — Locked";
      default:
        return "One Step Away";
    }
  };

  const getSubheading = () => {
    switch (source) {
      case "test-complete":
        return "Your answers have been analyzed. Your results are ready — but reserved for subscribers.";
      case "dashboard":
        return "Your personal analytics and insights dashboard is available exclusively to subscribers.";
      case "result":
        return "You completed the test. Now unlock your full personality analysis and insights.";
      default:
        return "Unlock instant access to all your results, insights, and analytics.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* SECTION 1: URGENCY + HEADLINE */}
        <div className="mb-12 md:mb-16">
          {/* Progress badge */}
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-900">
              <Zap size={16} className="text-blue-600" />
              <span className="text-sm font-semibold">100% Complete</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-slate-900 mb-6">
            {getHeadline()}
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-center text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {getSubheading()}
          </p>

          {/* Emotional hook */}
          <p className="text-center text-slate-500 mt-6 text-base md:text-lg max-w-2xl mx-auto italic">
            "Most users discover patterns they've never noticed before. Don't
            leave your results unseen."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* LEFT: TEASER RESULT */}
          <div className="flex flex-col justify-center">
            <div className="relative">
              {/* Result card with blur effect */}
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg">
                {/* Locked badge */}
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-red-100 rounded-full text-red-700 text-sm font-semibold">
                  <Lock size={14} />
                  Locked
                </div>

                {/* Content preview */}
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    Your Identity Profile
                  </h3>
                  <p className="text-sm text-slate-500">
                    Detailed psychological analysis
                  </p>
                </div>

                {/* Blurred stats */}
                <div className="space-y-4 blur-sm opacity-60">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700 font-medium">
                      Authenticity
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full w-24"></div>
                      <span className="text-slate-600 font-semibold">68%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-700 font-medium">
                      Vulnerability
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full w-24"></div>
                      <span className="text-slate-600 font-semibold">45%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-700 font-medium">Connection</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full w-24"></div>
                      <span className="text-slate-600 font-semibold">72%</span>
                    </div>
                  </div>
                </div>

                {/* Unlock CTA */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-500">
                    Subscribe to see your full results
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: VALUE STACK + PRICING */}
          <div className="flex flex-col justify-center">
            {/* VALUE STACK */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                What You Unlock
              </h2>

              <div className="space-y-4">
                {[
                  "Full personality analysis with depth",
                  "Deep psychological breakdown of your patterns",
                  "Pattern recognition across all 40+ assessments",
                  "Access to entire test library without limits",
                  "Personal growth insights and recommendations",
                  "Complete dashboard & realtime analytics",
                  "Priority support from our team",
                  "Annual insights report (yearly plan)",
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <Star
                        size={16}
                        className="text-blue-500 fill-blue-500"
                      />
                    </div>
                    <p className="text-slate-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PRICING CARDS */}
            <div className="space-y-3">
              {/* Monthly Plan */}
              <button
                onClick={() => handleCheckout("monthly")}
                disabled={isProcessing && selectedPlan === "monthly"}
                className={`w-full p-5 rounded-xl border-2 text-left transition-all ${
                  selectedPlan === "monthly" && !isProcessing
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-blue-300"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900">Monthly</h3>
                    <p className="text-sm text-slate-500">Billed monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">$9.99</p>
                    <p className="text-xs text-slate-500">/month</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-600">
                    Full access to all features
                  </p>
                  {isProcessing && selectedPlan === "monthly" ? (
                    <div className="animate-spin">
                      <div className="w-4 h-4 rounded-full border-2 border-blue-200 border-t-blue-600"></div>
                    </div>
                  ) : (
                    <ChevronRight
                      size={18}
                      className="text-blue-500"
                    />
                  )}
                </div>
              </button>

              {/* Yearly Plan - RECOMMENDED */}
              <button
                onClick={() => handleCheckout("yearly")}
                disabled={isProcessing && selectedPlan === "yearly"}
                className={`relative w-full p-5 rounded-xl border-2 text-left transition-all ${
                  selectedPlan === "yearly" && !isProcessing
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-blue-300"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {/* Recommended badge */}
                <div className="absolute -top-3 left-4 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold">
                  BEST VALUE
                </div>

                <div className="flex items-start justify-between mb-3 pt-2">
                  <div>
                    <h3 className="font-bold text-slate-900">Yearly</h3>
                    <p className="text-sm text-slate-500">
                      Save 40% vs monthly
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">$71.88</p>
                    <p className="text-xs text-slate-500">/year</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-600">
                    Full access + annual insights report
                  </p>
                  {isProcessing && selectedPlan === "yearly" ? (
                    <div className="animate-spin">
                      <div className="w-4 h-4 rounded-full border-2 border-blue-200 border-t-blue-600"></div>
                    </div>
                  ) : (
                    <ChevronRight
                      size={18}
                      className="text-blue-500"
                    />
                  )}
                </div>
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex items-center justify-center gap-4 text-xs text-slate-500">
              <span>✓ Secure Stripe Checkout</span>
              <span>•</span>
              <span>✓ Cancel anytime</span>
              <span>•</span>
              <span>✓ 7-day trial*</span>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA + ALTERNATIVE */}
        <div className="text-center border-t border-slate-200 pt-8 md:pt-12">
          <p className="text-slate-600 mb-4">
            Have questions?{" "}
            <Link
              href="/faq"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Check our FAQ
            </Link>{" "}
            or{" "}
            <Link
              href="/about"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              learn more
            </Link>
          </p>
          <p className="text-xs text-slate-500">
            *First 7 days free, then full price. Cancel anytime from your
            dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaywallPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin mb-4">
              <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600"></div>
            </div>
          </div>
        </div>
      }
    >
      <PaywallContent />
    </Suspense>
  );
}
