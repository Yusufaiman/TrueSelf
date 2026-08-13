"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  Layers,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import { getClientUser } from "@/utils/supabase/client-auth";
import { useSubscription } from "@/lib/subscription-context";

interface User {
  id: string;
  email?: string;
}

type BillingCycle = "monthly" | "yearly";
type BillingPlan = {
  name: string;
  label: string;
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  cta: string;
  note: string;
};

const plans: Record<BillingCycle, BillingPlan> = {
  monthly: {
    name: "Monthly",
    label: "Flexible access",
    price: "RM9.90",
    period: "/month",
    description: "Full TrueSelf Pro access billed monthly.",
    cta: "Start Monthly",
    note: "Monthly flexibility. Cancel anytime.",
  },
  yearly: {
    name: "Yearly",
    label: "Best value",
    price: "RM59",
    originalPrice: "RM118.80/year",
    period: "/year",
    description: "Same access at the better yearly price.",
    cta: "Start Yearly",
    note: "Equivalent to RM4.92/month.",
  },
};

const includedGroups = [
  {
    title: "Complete profile system",
    items: [
      "All 9 connected TrueSelf assessments",
      "Whole-self profile synthesis",
      "Domain-specific result graphs",
    ],
  },
  {
    title: "Result depth",
    items: [
      "16-Type personality details",
      "Expression and Enneagram layers",
      "Strengths, blind spots, and growth notes",
    ],
  },
  {
    title: "Dashboard intelligence",
    items: [
      "Overview and analytics pages",
      "Cross-domain pattern reading",
      "Assessment history and retakes",
    ],
  },
  {
    title: "Reports",
    items: [
      "Downloadable TrueSelf PDFs",
      "Profile updates as data changes",
      "New assessment features as released",
    ],
  },
];

function formatDate(value: string | null) {
  if (!value) return "Not available yet";

  return new Intl.DateTimeFormat("en-MY", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatCurrency(amountPaid: number | null, currency: string | null) {
  if (typeof amountPaid !== "number") return "Not available";

  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: (currency || "myr").toUpperCase(),
  }).format(amountPaid / 100);
}

function getStatusCopy(
  status: string | null,
  isSubscribed: boolean,
  cancelAtPeriodEnd: boolean,
) {
  if (isSubscribed && cancelAtPeriodEnd) {
    return {
      label: "Active until period end",
      tone: "amber",
      description:
        "Your Pro access remains active until the current billing period ends.",
    };
  }

  if (isSubscribed) {
    return {
      label: status === "trialing" ? "Trial active" : "Active subscription",
      tone: "green",
      description:
        "Your TrueSelf Pro access is active and synced from your subscription record.",
    };
  }

  if (status === "past_due" || status === "unpaid") {
    return {
      label: "Payment needs attention",
      tone: "amber",
      description:
        "Your payment status is not active. Manage billing or restart Pro access.",
    };
  }

  return {
    label: "No active subscription",
    tone: "slate",
    description:
      "Choose Monthly or Yearly to unlock the full connected TrueSelf profile system.",
  };
}

export function BillingPage() {
  const router = useRouter();
  const {
    isSubscribed,
    subscriptionPlan,
    status,
    isLoading,
    nextBillingDate,
    cancelAtPeriodEnd,
    billingInterval,
    currentPeriodStart,
    canceledAt,
    amountPaid,
    currency,
    stripeCustomerId,
    stripeSubscriptionId,
    checkSubscription,
  } = useSubscription();
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const [isCheckoutLoading, setIsCheckoutLoading] =
    useState<BillingCycle | null>(null);
  const [isPortalLoading, setIsPortalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getClientUser();
        if (!currentUser) {
          router.push("/auth/login?redirect=/dashboard/billing");
          return;
        }
        setUser(currentUser);
      } catch (err) {
        console.error("Error checking auth:", err);
        router.push("/auth/login");
      } finally {
        setIsLoadingUser(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (subscriptionPlan === "monthly" || subscriptionPlan === "yearly") {
      setBillingCycle(subscriptionPlan);
    }
  }, [subscriptionPlan]);

  const selectedPlan = plans[billingCycle];
  const currentPlan = subscriptionPlan ? plans[subscriptionPlan] : null;
  const statusCopy = useMemo(
    () => getStatusCopy(status, isSubscribed, cancelAtPeriodEnd),
    [cancelAtPeriodEnd, isSubscribed, status],
  );
  const canManageInStripe = Boolean(stripeCustomerId);

  const handleCheckout = async (plan: BillingCycle) => {
    try {
      setIsCheckoutLoading(plan);
      setError(null);

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
          returnTo: "/dashboard/billing",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409 && data.redirectTo) {
          await checkSubscription();
          router.push(data.redirectTo);
          return;
        }
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err.message || "Failed to start checkout.");
    } finally {
      setIsCheckoutLoading(null);
    }
  };

  const handleManageBilling = async () => {
    try {
      setIsPortalLoading(true);
      setError(null);

      const res = await fetch("/api/subscription/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          returnTo: "/dashboard/billing",
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to open billing portal");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error("Billing portal error:", err);
      setError(err.message || "Failed to open billing portal.");
    } finally {
      setIsPortalLoading(false);
    }
  };

  if (isLoadingUser || isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            Billing
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Manage your TrueSelf Pro membership, current plan, renewal date,
            and subscription details.
          </p>
        </div>

        <button
          type="button"
          onClick={checkSubscription}
          className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
        >
          <RefreshCcw size={16} />
          Refresh status
        </button>
      </div>

      <section
        className={`rounded-3xl border p-6 shadow-sm ${
          statusCopy.tone === "green"
            ? "border-emerald-200 bg-emerald-50"
            : statusCopy.tone === "amber"
              ? "border-amber-200 bg-amber-50"
              : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-black ${
                statusCopy.tone === "green"
                  ? "bg-emerald-100 text-emerald-700"
                  : statusCopy.tone === "amber"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              <CheckCircle2 size={16} />
              {statusCopy.label}
            </div>
            <h2 className="mt-4 text-3xl font-black text-slate-950">
              {currentPlan ? `${currentPlan.name} Plan` : "TrueSelf Pro"}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
              {statusCopy.description}
            </p>
          </div>

          <div className="rounded-3xl bg-white/75 p-5 text-left shadow-sm md:min-w-52 md:text-right">
            <p className="text-sm font-bold text-slate-500">
              {cancelAtPeriodEnd ? "Access ends" : "Next renewal"}
            </p>
            <p className="mt-1 text-2xl font-black text-slate-950">
              {formatDate(nextBillingDate)}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {currentPlan
                ? `${currentPlan.price}${currentPlan.period}`
                : "No active price"}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-blue-200 bg-white p-6 shadow-xl shadow-blue-100/50 md:p-8">
        <div className="rounded-2xl bg-slate-100 p-1">
          <div className="grid grid-cols-2 gap-1">
            {(["monthly", "yearly"] as BillingCycle[]).map((planKey) => {
              const plan = plans[planKey];
              const isSelected = billingCycle === planKey;
              const isCurrent = subscriptionPlan === planKey && isSubscribed;

              return (
                <button
                  key={planKey}
                  type="button"
                  onClick={() => setBillingCycle(planKey)}
                  className={`rounded-2xl px-4 py-3 text-sm font-black transition ${
                    isSelected
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {plan.name}
                  {isCurrent && (
                    <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-emerald-700">
                      CURRENT
                    </span>
                  )}
                  {planKey === "yearly" && !isCurrent && (
                    <span className="ml-2 rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-black text-cyan-700">
                      SAVE 50%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm font-black text-blue-600">
            TrueSelf Membership
          </p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-3xl font-black text-slate-950">
                {selectedPlan.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {selectedPlan.description}
              </p>
            </div>
            {billingCycle === "yearly" && (
              <span className="w-fit rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-xs font-black text-white">
                BEST VALUE
              </span>
            )}
          </div>

          <div className="mt-7 rounded-3xl bg-slate-50 p-6">
            {selectedPlan.originalPrice && (
              <p className="mb-2 text-sm font-semibold text-slate-400 line-through">
                {selectedPlan.originalPrice}
              </p>
            )}
            <div className="flex items-end gap-2">
              <span className="text-5xl font-black tracking-tight text-slate-950">
                {selectedPlan.price}
              </span>
              <span className="pb-2 text-slate-500">
                {selectedPlan.period}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {selectedPlan.note}
            </p>
          </div>

          {isSubscribed ? (
            <button
              type="button"
              onClick={handleManageBilling}
              disabled={isPortalLoading || !canManageInStripe}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-bold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPortalLoading ? "Opening Stripe..." : "Manage or Change Plan"}
              <ExternalLink size={17} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleCheckout(billingCycle)}
              disabled={isCheckoutLoading !== null}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-bold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCheckoutLoading === billingCycle
                ? "Processing..."
                : selectedPlan.cta}
              <ArrowRight size={17} />
            </button>
          )}

          <p className="mt-3 text-center text-xs text-slate-500">
            Secure payment powered by Stripe. Billing updates sync back to
            TrueSelf automatically.
          </p>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black text-blue-600">
                Everything your plan unlocks
              </p>
              <h4 className="mt-1 text-2xl font-black text-slate-950">
                Complete TrueSelf access
              </h4>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-600">
              Both plans unlock the same 9-domain profile system. Your billing
              choice only changes the renewal schedule and price.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {includedGroups.map((group) => (
              <article key={group.title} className="rounded-2xl bg-slate-50 p-4">
                <h5 className="font-black text-slate-950">{group.title}</h5>
                <div className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <Check
                        size={15}
                        className="mt-1 shrink-0 text-cyan-600"
                        strokeWidth={3}
                      />
                      <p className="text-sm leading-6 text-slate-600">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-700">{error}</p>
        </div>
      )}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-950">
              Subscription details
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information is synced from your latest subscription record.
            </p>
          </div>
          {canManageInStripe && (
            <button
              type="button"
              onClick={handleManageBilling}
              disabled={isPortalLoading}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Open Stripe billing
              <ExternalLink size={15} />
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <DetailCard
            icon={<CreditCard size={17} />}
            label="Billing email"
            value={user?.email || "Not available"}
          />
          <DetailCard
            icon={<ShieldCheck size={17} />}
            label="Subscription status"
            value={status || "inactive"}
            detail={cancelAtPeriodEnd ? "Cancels at period end" : "Auto-renewal enabled"}
          />
          <DetailCard
            icon={<Calendar size={17} />}
            label="Current period"
            value={`${formatDate(currentPeriodStart)} - ${formatDate(
              nextBillingDate,
            )}`}
            detail={
              cancelAtPeriodEnd
                ? "Access remains until the end date."
                : "Your subscription renews at the end date."
            }
          />
          <DetailCard
            icon={<CreditCard size={17} />}
            label="Latest amount"
            value={formatCurrency(amountPaid, currency)}
            detail={
              billingInterval
                ? `Billing interval: ${billingInterval}`
                : "Billing interval will appear after Stripe sync."
            }
          />
          <DetailCard
            icon={<RefreshCcw size={17} />}
            label="Canceled at"
            value={canceledAt ? formatDate(canceledAt) : "Not canceled"}
          />
          <DetailCard
            icon={<Layers size={17} />}
            label="Stripe subscription"
            value={
              stripeSubscriptionId
                ? `${stripeSubscriptionId.slice(0, 10)}...`
                : "Not available"
            }
            detail={
              stripeCustomerId
                ? `Customer: ${stripeCustomerId.slice(0, 10)}...`
                : undefined
            }
          />
        </div>
      </section>
    </div>
  );
}

function DetailCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-1 break-words text-base font-black text-slate-950">
            {value}
          </p>
          {detail && (
            <p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p>
          )}
        </div>
      </div>
    </article>
  );
}
