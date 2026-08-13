"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Check,
  Compass,
  Eye,
  Layers,
  Lock,
  Shield,
  Sparkles,
  UserRound,
  Zap,
} from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { sanitizeReturnTo } from "@/lib/safe-redirect";
import { getClientUser } from "@/utils/supabase/client-auth";

const plans = [
  {
    id: "monthly" as const,
    name: "Monthly",
    description: "Full access, billed monthly.",
    price: "RM9.90",
    period: "/month",
    cta: "Unlock My Results — RM9.90",
    note: "Instant access after payment • Cancel anytime",
    highlighted: false,
  },
  {
    id: "yearly" as const,
    name: "Yearly",
    description: "RM4.92/month · Save 50%",
    originalPrice: "RM118.80",
    price: "RM59",
    period: "/year",
    cta: "Unlock My Full Profile — RM59/year",
    note: "Instant access after payment",
    highlighted: true,
  },
];

const unlockGroups = [
  {
    title: "Personality",
    items: [
      "TrueSelf 16-Type result",
      "Four-axis profile: E/I, S/N, T/F, J/P",
      "Cognitive stack, expressions, enneagram, strengths, and blind spots",
    ],
  },
  {
    title: "Identity",
    items: [
      "Self-clarity, authenticity, and values alignment",
      "Core Self vs Social Self",
      "Expression gap, internal grounding, and identity stability",
    ],
  },
  {
    title: "Relationships",
    items: [
      "Relationship style and emotional closeness",
      "Communication openness, trust, independence, and care expression",
      "Conflict pattern and relationship security signals",
    ],
  },
  {
    title: "Career",
    items: [
      "Work environment fit and role characteristics",
      "Autonomy, structure, social work, and problem complexity",
      "Creativity, leadership drive, stability, and achievement signals",
    ],
  },
  {
    title: "Mind",
    items: [
      "Thinking and learning profile",
      "Analytical, intuitive, flexible, and deep processing signals",
      "Decision style, uncertainty tolerance, exploration, and focus",
    ],
  },
  {
    title: "Motivation",
    items: [
      "What actually moves you to act, persist, and keep going",
      "Growth, purpose, autonomy, progress, and recognition drivers",
      "Contribution, security, and challenge activation patterns",
    ],
  },
  {
    title: "Growth",
    items: [
      "Strengths, self-awareness, and development direction",
      "Feedback receptivity, recovery, discomfort tolerance, and discipline",
      "Adaptive change and reflective learning patterns",
    ],
  },
  {
    title: "Stress & Emotions",
    items: [
      "How you experience, regulate, and express emotional pressure",
      "Stress reactivity, recovery style, emotional clarity, and acceptance",
      "Coping flexibility and pressure response patterns",
    ],
  },
  {
    title: "Life",
    items: [
      "Life direction, meaning, balance, and agency",
      "Satisfaction, connection, lifestyle alignment, and future outlook",
      "How your current life state connects with the rest of your profile",
    ],
  },
  {
    title: "Whole-Self Dashboard",
    items: [
      "Overview, analytics, result graphs, and domain type library",
      "Cross-domain readings that connect repeated signals across tests",
      "Assessment history, retakes, downloadable reports, and change over time",
    ],
  },
];

type PlanId = (typeof plans)[number]["id"];
const OFFER_DURATION_MS = 10 * 60 * 1000;
const OFFER_STORAGE_KEY = "paywall_offer_expires_at";

function PaywallContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams.get("source") || "default";
  const returnTo = sanitizeReturnTo(
    searchParams.get("returnTo"),
    source === "result" ? "/dashboard/results" : "/dashboard",
  );
  const { isSubscribed, isLoading, checkSubscription } = useSubscription();

  const [selectedPlan, setSelectedPlan] = useState<PlanId>("yearly");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isIdentityExpanded, setIsIdentityExpanded] = useState(false);

  React.useEffect(() => {
    if (!isLoading && isSubscribed) {
      router.push(returnTo);
    }
  }, [isSubscribed, isLoading, router, returnTo]);

  const handleCheckout = async (plan: PlanId) => {
    try {
      setIsProcessing(true);
      setSelectedPlan(plan);

      const user = await getClientUser();
      if (!user) {
        router.push(`/auth/signup?plan=${plan}`);
        return;
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
          returnTo,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 409 && data.redirectTo) {
          await checkSubscription();
          router.push(data.redirectTo);
          return;
        }
        throw new Error(data.error || "Failed to create checkout session");
      }

      const data = await response.json();
      if (data.url) {
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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="mb-4 animate-spin">
            <div className="h-12 w-12 rounded-full border-4 border-blue-200 border-t-blue-600" />
          </div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  const selectedPlanData =
    plans.find((plan) => plan.id === selectedPlan) ?? plans[1];

  const scrollToPricing = () => {
    document.getElementById("unlock-pricing")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />

      <div className="border-b border-blue-100 bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-3 md:px-6">
          <PaywallUnlockOffer onUnlock={scrollToPricing} />
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <PaywallHero />

        <div className="mx-auto mb-12 flex max-w-3xl flex-col gap-6 md:mb-16">
          <ResultDiscoverySummary />

          <LockedResultPreview
            isExpanded={isIdentityExpanded}
            onToggle={() => setIsIdentityExpanded((value) => !value)}
          />

          <FreeInsightTeaser />

          <UnlockBridge />

          <PricingCard
            selectedPlan={selectedPlan}
            selectedPlanData={selectedPlanData}
            isProcessing={isProcessing}
            onSelectPlan={setSelectedPlan}
            onCheckout={handleCheckout}
          />

          <PaywallTrustRow />
        </div>

        <footer className="border-t border-slate-200 pt-8 text-center md:pt-12">
          <p className="mb-4 text-slate-600">
            Have questions?{" "}
            <Link
              href="/faq"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Check our FAQ
            </Link>{" "}
            or{" "}
            <Link
              href="/about"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              learn more
            </Link>
          </p>
          <p className="text-xs text-slate-500">
            Cancel anytime from your dashboard.
          </p>
        </footer>
      </main>
    </div>
  );
}

function PaywallHero() {
  return (
    <section className="mb-10 text-center md:mb-12">
      <div className="mb-6 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-900">
          <Zap size={16} className="text-blue-600" />
          <span className="text-sm font-semibold">100% Complete</span>
        </div>
      </div>

      <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
        Your Results Are Ready.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
        You&apos;ve completed the assessment. Now see what your answers reveal
        about who you are.
      </p>
      <p className="mx-auto mt-5 max-w-xl text-base italic leading-7 text-slate-500">
        You already gave the answers. Now discover what they say about you.
      </p>
    </section>
  );
}

function PaywallUnlockOffer({ onUnlock }: { onUnlock: () => void }) {
  const [remainingMs, setRemainingMs] = useState<number | null>(null);

  React.useEffect(() => {
    const getExpiresAt = () => {
      const stored = window.localStorage.getItem(OFFER_STORAGE_KEY);
      const parsed = stored ? Number(stored) : NaN;

      if (Number.isFinite(parsed)) {
        return parsed;
      }

      const nextExpiresAt = Date.now() + OFFER_DURATION_MS;
      window.localStorage.setItem(OFFER_STORAGE_KEY, String(nextExpiresAt));
      return nextExpiresAt;
    };

    const expiresAt = getExpiresAt();

    const updateRemaining = () => {
      setRemainingMs(Math.max(0, expiresAt - Date.now()));
    };

    updateRemaining();
    const interval = window.setInterval(updateRemaining, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const hasTimer = remainingMs !== null && remainingMs > 0;
  const isFinalMinute = hasTimer && remainingMs <= 60 * 1000;

  return (
    <section className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-center shadow-sm shadow-blue-100/50 md:px-5">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center md:text-left">
        <div>
          <h2 className="text-base font-black text-slate-950 md:text-lg">
            {hasTimer
              ? "Your profile is ready to unlock"
              : "Your complete profile is ready"}
          </h2>
          <p className="mt-1 text-xs leading-5 text-slate-600 md:text-sm">
            Get instant access to your complete TrueSelf profile.
          </p>
        </div>

        {hasTimer && (
          <div className="rounded-xl border border-orange-100 bg-orange-50 px-3 py-2 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wide text-orange-700">
              Offer ends in
            </p>
            <p
              className={`mt-0.5 text-xl font-black ${
                isFinalMinute ? "text-red-600" : "text-orange-600"
              }`}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {formatRemainingTime(remainingMs)}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={onUnlock}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600 md:w-auto"
        >
          <Lock size={15} />
          Unlock My Results
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}

function formatRemainingTime(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const two = (value: number) => String(value).padStart(2, "0");

  if (hours > 0) {
    return `${two(hours)}:${two(minutes)}:${two(seconds)}`;
  }

  return `${two(minutes)}:${two(seconds)}`;
}

function ResultDiscoverySummary() {
  return (
    <section className="rounded-[2rem] border border-blue-100 bg-white p-5 text-center shadow-sm md:p-6">
      <h2 className="text-xl font-black text-slate-950">
        We found patterns across your responses
      </h2>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {["6 Identity Dimensions", "3 Core Patterns", "Core Self", "Social Self"].map(
          (item) => (
            <span
              key={item}
              className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700"
            >
              {item}
            </span>
          ),
        )}
      </div>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600">
        Your profile is complete, including where your inner identity aligns
        with how you show up around others.
      </p>
    </section>
  );
}

function LockedResultPreview({
  isExpanded,
  onToggle,
}: {
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="relative rounded-[2rem] border border-indigo-200 bg-white p-5 shadow-lg shadow-blue-100/50 md:p-7">
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
        <Lock size={14} />
        Locked
      </div>

      <header className="rounded-[2rem] border border-indigo-100 bg-white p-6 text-center md:p-8">
        <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          Who You Really Are
        </span>
        <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
          Your Identity Profile
        </h3>
        <p className="mt-2 text-base italic text-indigo-600">
          Your real result is ready.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600">
          Identity describes how you understand, maintain, and express who you
          are.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <LockedBadge icon={<Sparkles size={16} />}>Match strength</LockedBadge>
          <LockedBadge icon={<Shield size={16} />}>Result confidence</LockedBadge>
        </div>
      </header>

      <section className="mt-5 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <SectionTitle icon={<Layers size={20} />} title="Your Identity Map" />
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          There is no single identity score. These six dimensions describe
          different parts of how your identity forms and expresses itself.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Self-Clarity",
            "Authenticity",
            "Values Alignment",
            "Social Adaptation",
            "External Influence",
            "Identity Stability",
          ].map((label) => (
            <LockedDimensionCard key={label} label={label} />
          ))}
        </div>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-3">
        <LockedMetricCard
          icon={<UserRound size={20} />}
          title="Core-Social Alignment"
          description="See how closely your inner identity matches the way you present yourself socially."
        />
        <LockedMetricCard
          icon={<Eye size={20} />}
          title="Expression Gap"
          description="Discover whether the person you show others matches your inner self."
        />
        <LockedMetricCard
          icon={<Compass size={20} />}
          title="Internal Grounding"
          description="Understand how strongly your identity is guided from within rather than by external influence."
        />
      </section>

      {isExpanded && (
        <>
          <section className="mt-5 grid gap-4 lg:grid-cols-2">
            <LockedPanel
              title="Core Self"
              icon={<Shield size={20} />}
              description="The inner reference point behind what feels true, important, and stable to you."
            />
            <LockedPanel
              title="Social Self"
              icon={<UserRound size={20} />}
              description="How your identity changes shape when you are around other people or expectations."
            />
          </section>

          <section className="mt-5 grid gap-4 lg:grid-cols-2">
            <LockedPanel
              title="What Grounds You"
              icon={<Sparkles size={20} />}
              description="The values, patterns, and inner anchors that help you feel like yourself."
            />
            <LockedPanel
              title="Where You Adapt"
              icon={<Layers size={20} />}
              description="The places where your behaviour shifts in response to context, pressure, or people."
            />
          </section>

          <section className="mt-5 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <SectionTitle icon={<Sparkles size={20} />} title="Identity Insights" />
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <LockedTextBlock />
              <LockedTextBlock />
            </div>
          </section>

          <section className="mt-5 rounded-[2rem] border border-indigo-100 bg-indigo-50 p-5 md:p-6">
            <SectionTitle icon={<Shield size={20} />} title="Result Confidence" />
            <div className="mt-4 space-y-2 blur-sm opacity-60">
              <div className="h-7 w-24 rounded-lg bg-slate-300" />
              <div className="h-3 w-full rounded-full bg-slate-300" />
              <div className="h-3 w-4/5 rounded-full bg-slate-300" />
            </div>
          </section>
        </>
      )}

      <div className="mt-5 flex flex-col items-center gap-3 border-t border-slate-200 pt-5 text-center">
        <p className="text-sm text-slate-500">
          Subscribe to unlock the full Identity result.
        </p>
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      </div>
    </article>
  );
}

function FreeInsightTeaser() {
  return (
    <section className="rounded-[2rem] border border-cyan-100 bg-cyan-50/60 p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-cyan-700">
            One thing we noticed
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Your identity has measurable internal and social patterns.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            We&apos;ve identified patterns connecting your internal identity
            with how you adapt and express yourself socially.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-cyan-100 bg-white p-4 md:min-w-52">
          <p className="text-sm font-bold text-slate-950">Expression Gap</p>
          <div className="mt-3 space-y-2 blur-sm opacity-60">
            <div className="h-8 w-24 rounded-lg bg-slate-300" />
            <div className="h-3 w-full rounded-full bg-slate-300" />
            <div className="h-3 w-4/5 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-cyan-800">
        Unlock your profile to see what this means for you.
      </p>
    </section>
  );
}

function UnlockBridge() {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-black tracking-tight text-slate-950">
        Your Full Profile Is One Step Away
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
        Your assessment is complete. Unlock your results to see how your
        identity, personality, values, relationships, emotions, and behaviour
        connect into one profile.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-bold text-slate-600">
        {["Instant access", "Full results", "All assessments", "Cancel anytime"].map(
          (item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 bg-white px-3 py-1"
            >
              {item}
            </span>
          ),
        )}
      </div>
    </section>
  );
}

function PricingCard({
  selectedPlan,
  selectedPlanData,
  isProcessing,
  onSelectPlan,
  onCheckout,
}: {
  selectedPlan: PlanId;
  selectedPlanData: (typeof plans)[number];
  isProcessing: boolean;
  onSelectPlan: (plan: PlanId) => void;
  onCheckout: (plan: PlanId) => void;
}) {
  return (
    <article
      id="unlock-pricing"
      className="scroll-mt-24 rounded-3xl border border-blue-200 bg-white p-6 shadow-xl shadow-blue-100/60 md:p-8"
    >
      <div className="rounded-full bg-slate-100 p-1">
        <div className="grid grid-cols-2 gap-1">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => onSelectPlan(plan.id)}
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
          <p className="text-sm font-bold text-blue-600">TrueSelf Membership</p>
          <h3 className="mt-2 text-3xl font-black text-slate-950">
            {selectedPlanData.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {selectedPlanData.description}
          </p>
        </div>

        {selectedPlanData.highlighted && (
          <span className="w-fit rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-1 text-xs font-black text-white shadow-sm">
            BEST VALUE
          </span>
        )}
      </div>

      <div className="mt-8 rounded-3xl bg-slate-50 p-6">
        {selectedPlanData.originalPrice && (
          <p className="mb-2 text-sm font-semibold text-slate-400 line-through">
            {selectedPlanData.originalPrice}/year
          </p>
        )}
        <div className="flex items-end gap-2">
          <span className="text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
            {selectedPlanData.price}
          </span>
          <span className="pb-2 text-slate-500">{selectedPlanData.period}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {selectedPlanData.highlighted
            ? "Equivalent to RM4.92/month. Save RM59.80 compared with monthly billing."
            : "Full access with monthly flexibility. Cancel anytime."}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onCheckout(selectedPlanData.id)}
        disabled={isProcessing}
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600 ${
          isProcessing ? "cursor-not-allowed opacity-75" : ""
        }`}
      >
        {isProcessing ? "Processing..." : selectedPlanData.cta}
        <ArrowRight size={18} />
      </button>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-slate-500">
        <Lock size={13} />
        <span>Secure payment powered by Stripe</span>
        <span>•</span>
        <span>{selectedPlanData.note}</span>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-600">
              Everything You Unlock
            </p>
            <h4 className="mt-1 text-2xl font-black text-slate-950">
              Complete TrueSelf access
            </h4>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-600">
            Both plans unlock the same 9-domain TrueSelf system. The only
            difference is billing frequency and price.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {unlockGroups.map((group) => (
            <section key={group.title} className="rounded-2xl bg-slate-50 p-4">
              <h5 className="font-black text-slate-950">{group.title}</h5>
              <div className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-cyan-600"
                      strokeWidth={3}
                    />
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

function PaywallTrustRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
      <span>Secure Stripe checkout</span>
      <span>•</span>
      <span>Instant access after payment</span>
      <span>•</span>
      <span>Cancel anytime</span>
    </div>
  );
}

function LockedBadge({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
      {icon}
      <span>{children}</span>
      <span className="blur-sm opacity-60">88%</span>
    </span>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 text-indigo-600">
      {icon}
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
    </div>
  );
}

function LockedDimensionCard({ label }: { label: string }) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-950">{label}</h3>
          <p className="mt-1 text-xs font-semibold text-indigo-600 blur-sm opacity-60">
            Balanced
          </p>
        </div>
        <p className="text-2xl font-black text-indigo-600 blur-sm opacity-60">
          74%
        </p>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
        <div className="h-full w-3/4 rounded-full bg-indigo-500 blur-sm opacity-60" />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600 blur-sm opacity-60">
        Your result explanation appears here after subscription.
      </p>
      <p className="mt-3 text-xs text-slate-500 blur-sm opacity-60">
        Confidence: High · Consistency 82%
      </p>
    </article>
  );
}

function LockedMetricCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
      <SectionTitle icon={icon} title={title} />
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-4 space-y-2 blur-sm opacity-60">
        <div className="h-8 w-28 rounded-lg bg-slate-300" />
        <div className="h-3 w-full rounded-full bg-slate-300" />
      </div>
    </article>
  );
}

function LockedPanel({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <SectionTitle icon={icon} title={title} />
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-4 space-y-3 blur-sm opacity-60">
        <div className="h-4 w-full rounded-full bg-slate-300" />
        <div className="h-4 w-4/5 rounded-full bg-slate-300" />
        <div className="flex flex-wrap gap-2">
          {["Signal one", "Signal two", "Signal three"].map((item) => (
            <span
              key={item}
              className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function LockedTextBlock() {
  return (
    <p className="rounded-[1.25rem] bg-indigo-50 p-4 text-sm leading-6 text-slate-700 blur-sm opacity-60">
      Your personalized identity insight appears here after subscription.
    </p>
  );
}

export default function PaywallPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mb-4 animate-spin">
              <div className="h-12 w-12 rounded-full border-4 border-blue-200 border-t-blue-600" />
            </div>
          </div>
        </div>
      }
    >
      <PaywallContent />
    </Suspense>
  );
}
