"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getClientUser } from "@/utils/supabase/client-auth";

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscriptionPlan: "monthly" | "yearly" | null;
  isLoading: boolean;
  nextBillingDate: string | null;
  status:
    | "active"
    | "trialing"
    | "inactive"
    | "cancelled"
    | "canceled"
    | "past_due"
    | "unpaid"
    | "incomplete"
    | null;
  cancelAtPeriodEnd: boolean;
  billingInterval: string | null;
  currentPeriodStart: string | null;
  canceledAt: string | null;
  amountPaid: number | null;
  currency: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  checkSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined,
);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<
    "monthly" | "yearly" | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nextBillingDate, setNextBillingDate] = useState<string | null>(null);
  const [status, setStatus] = useState<
    | "active"
    | "trialing"
    | "inactive"
    | "cancelled"
    | "canceled"
    | "past_due"
    | "unpaid"
    | "incomplete"
    | null
  >(null);
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false);
  const [billingInterval, setBillingInterval] = useState<string | null>(null);
  const [currentPeriodStart, setCurrentPeriodStart] = useState<string | null>(
    null,
  );
  const [canceledAt, setCanceledAt] = useState<string | null>(null);
  const [amountPaid, setAmountPaid] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);
  const [stripeSubscriptionId, setStripeSubscriptionId] = useState<
    string | null
  >(null);

  const checkSubscription = async () => {
    try {
      setIsLoading(true);
      const user = await getClientUser();
      if (!user) {
        setIsSubscribed(false);
        setSubscriptionPlan(null);
        setStatus(null);
        setCancelAtPeriodEnd(false);
        setBillingInterval(null);
        setCurrentPeriodStart(null);
        setCanceledAt(null);
        setAmountPaid(null);
        setCurrency(null);
        setStripeCustomerId(null);
        setStripeSubscriptionId(null);
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/subscription/entitlement", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to check subscription entitlement.");
      }

      const entitlement = await response.json();
      setIsSubscribed(Boolean(entitlement.hasPro));
      setSubscriptionPlan(entitlement.plan || null);
      setStatus(entitlement.status || null);
      setNextBillingDate(entitlement.currentPeriodEnd || null);
      setCancelAtPeriodEnd(Boolean(entitlement.cancelAtPeriodEnd));
      setBillingInterval(entitlement.billingInterval || null);
      setCurrentPeriodStart(entitlement.currentPeriodStart || null);
      setCanceledAt(entitlement.canceledAt || null);
      setAmountPaid(
        typeof entitlement.amountPaid === "number"
          ? entitlement.amountPaid
          : null,
      );
      setCurrency(entitlement.currency || null);
      setStripeCustomerId(entitlement.stripeCustomerId || null);
      setStripeSubscriptionId(entitlement.stripeSubscriptionId || null);
    } catch (err) {
      console.error("Error checking subscription:", err);
      setIsSubscribed(false);
      setSubscriptionPlan(null);
      setStatus(null);
      setCancelAtPeriodEnd(false);
      setBillingInterval(null);
      setCurrentPeriodStart(null);
      setCanceledAt(null);
      setAmountPaid(null);
      setCurrency(null);
      setStripeCustomerId(null);
      setStripeSubscriptionId(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, []);

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed,
        subscriptionPlan,
        isLoading,
        nextBillingDate,
        status,
        cancelAtPeriodEnd,
        billingInterval,
        currentPeriodStart,
        canceledAt,
        amountPaid,
        currency,
        stripeCustomerId,
        stripeSubscriptionId,
        checkSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider",
    );
  }
  return context;
};
