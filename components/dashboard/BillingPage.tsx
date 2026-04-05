"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getClientUser } from "@/utils/supabase/client-auth";
import { useSubscription } from "@/lib/subscription-context";

interface User {
  id: string;
  email?: string;
}

const PLANS = [
  {
    name: "Monthly",
    price: "RM9.90",
    period: "/month",
    label: "Pay as you go",
    badge: null,
    isCurrentPlan: false,
    features: [
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
    ],
  },
  {
    name: "Yearly",
    price: "RM59",
    period: "/year",
    label: "Best value",
    badge: "Save 50%",
    isCurrentPlan: false,
    features: [
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
    ],
  },
];

export function BillingPage() {
  const router = useRouter();
  const { subscriptionPlan, status, isLoading, nextBillingDate } =
    useSubscription();
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getClientUser();
        if (!currentUser) {
          router.push("/auth/login");
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

  const updatedPlans = PLANS.map((plan) => ({
    ...plan,
    isCurrentPlan: subscriptionPlan === plan.name.toLowerCase(),
  }));

  if (isLoadingUser || isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Billing</h1>
        <p className="text-slate-600">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Plan Status */}
      {status === "active" && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={20} className="text-green-600" />
                <p className="text-sm font-medium text-green-700">
                  Active Subscription
                </p>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {subscriptionPlan === "monthly" ? "Monthly" : "Yearly"} Plan
              </h2>
              <p className="text-slate-600">
                {nextBillingDate
                  ? `Next billing date: ${new Date(nextBillingDate).toLocaleDateString()}`
                  : "Your subscription will renew automatically"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-slate-900">
                {subscriptionPlan === "monthly" ? "RM9.90" : "RM59"}
              </p>
              <p className="text-sm text-slate-600">
                {subscriptionPlan === "monthly" ? "per month" : "per year"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Status Alert */}
      {status && status !== "active" && (
        <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6 flex gap-4">
          <AlertCircle
            size={20}
            className="text-yellow-600 flex-shrink-0 mt-0.5"
          />
          <div>
            <h3 className="font-semibold text-yellow-900">
              {status === "past_due"
                ? "Payment Issue"
                : status === "cancelled"
                  ? "Subscription Cancelled"
                  : "Subscription Inactive"}
            </h3>
            <p className="text-sm text-yellow-800 mt-1">
              {status === "past_due"
                ? "Your payment failed. Please update your billing information."
                : status === "cancelled"
                  ? "Your subscription has been cancelled."
                  : "Your subscription is not active. Please resubscribe to access premium features."}
            </p>
          </div>
        </div>
      )}

      {/* Choose Your Plan */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Available Plans
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {updatedPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border-2 transition-all ${
                plan.isCurrentPlan
                  ? "border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg ring-2 ring-blue-500/10"
                  : "border-slate-200 bg-white"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-t-[10px] text-center">
                  {plan.badge}
                </div>
              )}

              <div className={`p-6 space-y-6 ${plan.badge ? "pt-6" : ""}`}>
                {/* Title & Price */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold text-slate-900">
                      {plan.name}
                    </h4>
                    {plan.isCurrentPlan && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                        Current Plan
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{plan.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-slate-900">
                      {plan.price}
                    </span>
                    <span className="text-slate-600">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check
                        size={18}
                        className="text-blue-600 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                {plan.isCurrentPlan ? (
                  <button
                    disabled
                    className="w-full bg-slate-200 text-slate-600 cursor-not-allowed px-6 py-3 rounded-lg font-medium"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => (window.location.href = "/pricing")}
                    className="w-full bg-slate-200 hover:bg-slate-300 text-slate-900 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Change Plan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Details */}
      {status === "active" && (
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={20} className="text-blue-600" />
            <h3 className="font-semibold text-slate-900">
              Subscription Details
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-xs font-medium text-slate-500 mb-1">
                Billing Email
              </p>
              <p className="font-semibold text-slate-900">{user?.email}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-xs font-medium text-slate-500 mb-1">
                Next Renewal
              </p>
              <p className="font-semibold text-slate-900">
                {nextBillingDate
                  ? new Date(nextBillingDate).toLocaleDateString()
                  : "Coming soon"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Help */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-3">Need Help?</h3>
        <p className="text-sm text-slate-700 mb-4">
          For billing issues or questions about your subscription, please
          contact our support team.
        </p>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          Contact Support →
        </button>
      </div>
    </div>
  );
}
