"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getClientUser } from "@/utils/supabase/client-auth";
import { createClient } from "@/utils/supabase/client";

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscriptionPlan: "monthly" | "yearly" | null;
  isLoading: boolean;
  nextBillingDate: string | null;
  status: "active" | "inactive" | "cancelled" | "past_due" | null;
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
    "active" | "inactive" | "cancelled" | "past_due" | null
  >(null);

  const checkSubscription = async () => {
    try {
      const user = await getClientUser();
      if (!user) {
        setIsSubscribed(false);
        setSubscriptionPlan(null);
        setStatus(null);
        setIsLoading(false);
        return;
      }

      // Fetch subscription from Supabase
      const supabase = createClient();
      const { data: subscription, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error || !subscription) {
        console.warn("No subscription found:", error?.message);
        setIsSubscribed(false);
        setSubscriptionPlan(null);
        setStatus(null);
        setIsLoading(false);
        return;
      }

      // Check if subscription is active
      const isActive = subscription.status === "active";
      setIsSubscribed(isActive);
      setSubscriptionPlan(subscription.plan || null);
      setStatus(subscription.status);
      setNextBillingDate(subscription.current_period_end || null);

      console.log("✅ Subscription found:", {
        isActive,
        plan: subscription.plan,
        status: subscription.status,
      });
    } catch (err) {
      console.error("Error checking subscription:", err);
      setIsSubscribed(false);
      setSubscriptionPlan(null);
      setStatus(null);
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
