"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Check,
  HelpCircle,
  Layers,
  RefreshCcw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { getClientUser } from "@/utils/supabase/client-auth";
import { useSubscription } from "@/hooks/useSubscription";

const includedFeatures = [
  "All 9 connected TrueSelf assessments",
  "Complete 16-Type Personality Profile",
  "Personalized Whole-Self Profile",
  "10 Whole-Self Axes",
  "Deep insights across every domain",
  "Cross-domain analytics and result graphs",
  "Unlimited assessment retakes",
  "Track how you change over time",
  "Complete assessment history",
  "Personalized insights and next steps",
  "Downloadable TrueSelf reports",
  "New assessments and features as they are released",
];

const valueCards = [
  {
    title: "Discover",
    description:
      "Start with your personality foundation, then explore identity, relationships, career, mind, motivation, growth, stress, and life.",
    icon: Layers,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Connect",
    description:
      "TrueSelf reads your results together so your dashboard can show how patterns repeat, conflict, or support each other.",
    icon: BarChart3,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    title: "Evolve",
    description:
      "Retake assessments over time and see what stays stable, what develops, and what changes with your life.",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const pricingFaqs = [
  {
    q: "Is there a free plan?",
    a: "No. TrueSelf is a paid membership built around the complete connected profile experience.",
  },
  {
    q: "Do Monthly and Yearly include the same features?",
    a: "Yes. Both include full TrueSelf access. Yearly simply gives you the same membership at a better price.",
  },
  {
    q: "Can I retake assessments?",
    a: "Yes. Retakes are included, and they help TrueSelf build timeline insights as your results develop.",
  },
  {
    q: "Will my previous results be saved?",
    a: "Yes. Your assessment history supports your dashboard, analytics, result graphs, and change-over-time view.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel from your account settings without a long-term contract.",
  },
  {
    q: "Is TrueSelf clinical or diagnostic?",
    a: "No. TrueSelf is designed for self-reflection and personal insight. It is not a clinical or diagnostic assessment.",
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"Monthly" | "Yearly">(
    "Yearly"
  );
  const {
    isSubscribed,
    subscriptionPlan,
    nextBillingDate,
    cancelAtPeriodEnd,
    checkSubscription,
  } = useSubscription();

  const handleCheckout = async (planName: string) => {
    try {
      setIsLoading(planName);
      setError(null);

      const user = await getClientUser();
      if (!user) {
        router.push(`/auth/signup?plan=${planName.toLowerCase()}`);
        return;
      }

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: planName.toLowerCase(),
          returnTo: "/dashboard",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 409 && data.redirectTo) {
          await checkSubscription();
          router.push(data.redirectTo);
          return;
        }
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

  const plans = [
    {
      name: "Monthly",
      label: "Flexibility",
      description: "Full access, billed monthly.",
      price: "RM9.90",
      period: "/month",
      cta: "Start Monthly",
      note: "Cancel anytime.",
      highlighted: false,
    },
    {
      name: "Yearly",
      label: "Best value",
      description: "RM4.92/month · Save 50%",
      originalPrice: "RM118.80",
      price: "RM59",
      period: "/year",
      cta: "Start Yearly",
      note: "Same full access. Better value.",
      highlighted: true,
    },
  ];

  const selectedPlan =
    plans.find((plan) => plan.name === billingCycle) ?? plans[1];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 via-cyan-50/60 to-white px-6 py-20 text-center md:py-24">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <Sparkles size={16} />
            One membership · Full access
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Build your connected TrueSelf profile.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Unlock the complete TrueSelf experience: 9 connected assessments,
            whole-self analytics, result graphs, timeline insights, retakes, and
            downloadable reports.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              {isSubscribed
                ? "Your TrueSelf Pro membership is active."
                : "Choose how you want to pay."}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {isSubscribed
                ? `${subscriptionPlan === "yearly" ? "Yearly" : "Monthly"} access is active${
                    nextBillingDate
                      ? ` until ${new Date(nextBillingDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}`
                      : ""
                  }${cancelAtPeriodEnd ? ". It will not renew after this period." : "."}`
                : "Monthly and Yearly unlock the same product. Yearly is simply the better value."}
            </p>
          </div>

          <article className="mx-auto mt-12 max-w-3xl rounded-3xl border border-blue-200 bg-white p-6 shadow-xl shadow-blue-100/60 md:p-8">
            <div className="rounded-full bg-slate-100 p-1">
              <div className="grid grid-cols-2 gap-1">
                {plans.map((plan) => {
                  const isSelected = billingCycle === plan.name;

                  return (
                    <button
                      key={plan.name}
                      type="button"
                      onClick={() =>
                        setBillingCycle(plan.name as "Monthly" | "Yearly")
                      }
                      className={`rounded-full px-4 py-3 text-sm font-bold transition ${
                        isSelected
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {plan.name}
                      {plan.highlighted && (
                        <span className="ml-2 rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-black text-cyan-700">
                          SAVE 50%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-bold text-blue-600">
                  TrueSelf Membership
                </p>
                <h3 className="mt-2 text-3xl font-black text-slate-950">
                  {selectedPlan.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {selectedPlan.description}
                </p>
              </div>

              {selectedPlan.highlighted && (
                <span className="w-fit rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-1 text-xs font-black text-white shadow-sm">
                  BEST VALUE
                </span>
              )}
            </div>

            <div className="mt-8 rounded-3xl bg-slate-50 p-6">
              {selectedPlan.originalPrice && (
                <p className="mb-2 text-sm font-semibold text-slate-400 line-through">
                  {selectedPlan.originalPrice}/year
                </p>
              )}
              <div className="flex items-end gap-2">
                <span className="text-6xl font-black tracking-tight text-slate-950">
                  {selectedPlan.price}
                </span>
                <span className="pb-2 text-slate-500">
                  {selectedPlan.period}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {selectedPlan.highlighted
                  ? "Equivalent to RM4.92/month. Same full access, better value."
                  : "Full access with monthly flexibility. Cancel anytime."}
              </p>
            </div>

            <button
              onClick={() => handleCheckout(selectedPlan.name)}
              disabled={isLoading !== null || isSubscribed}
              className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600 ${
                isLoading === selectedPlan.name || isSubscribed
                  ? "cursor-not-allowed opacity-75"
                  : ""
              }`}
            >
              {isSubscribed
                ? "Membership Active"
                : isLoading === selectedPlan.name
                  ? "Processing..."
                  : selectedPlan.cta}
              <ArrowRight size={18} />
            </button>

            <p className="mt-3 text-center text-xs text-slate-500">
              {selectedPlan.note}
            </p>

            <div className="mt-8 border-t border-slate-200 pt-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-blue-600">
                    Everything included
                  </p>
                  <h4 className="mt-1 text-2xl font-black text-slate-950">
                    Complete TrueSelf access
                  </h4>
                </div>
                <p className="max-w-sm text-sm leading-6 text-slate-600">
                  No separate tiers. No locked domains. Your billing choice only
                  changes how you pay.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {includedFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3"
                  >
                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-cyan-600"
                      strokeWidth={3}
                    />
                    <p className="text-sm font-medium leading-6 text-slate-700">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {error && (
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              <RefreshCcw size={16} className="text-blue-600" />
              Discover · Connect · Track
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              More than access to assessments.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              TrueSelf helps you understand who you are today, how the
              different parts of you connect, and how your patterns change over
              time.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {valueCards.map((item) => {
              const IconComponent = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${item.bg} ${item.color}`}
                  >
                    <IconComponent size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
              <HelpCircle size={16} className="text-blue-600" />
              Pricing FAQ
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Clear membership, no confusing tiers.
            </h2>
          </div>

          <div className="mt-10 grid gap-4">
            {pricingFaqs.map((faq) => (
              <article
                key={faq.q}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-950">{faq.q}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {faq.a}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Start building your TrueSelf profile.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/85">
            Your membership unlocks the full profile system: assessments,
            analytics, history, retakes, reports, and next steps.
          </p>
          <Link
            href="/tests"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-600 shadow-md transition hover:bg-blue-50"
          >
            Explore the assessments
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
