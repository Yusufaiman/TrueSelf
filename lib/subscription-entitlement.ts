import "server-only";

import { createAdminClient } from "@/utils/supabase/admin";

export type SubscriptionPlan = "monthly" | "yearly";

export interface SubscriptionEntitlement {
  hasPro: boolean;
  userId: string;
  plan: SubscriptionPlan | null;
  status: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  billingInterval: string | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  amountPaid: number | null;
  currency: string | null;
  reason: "active" | "trialing" | "expired" | "inactive" | "none";
}

export const ENTITLED_STRIPE_STATUSES = new Set(["active", "trialing"]);

export function isCurrentSubscriptionEntitled(subscription: any) {
  if (!subscription) return false;
  if (!ENTITLED_STRIPE_STATUSES.has(subscription.status)) return false;

  if (!subscription.current_period_end) return false;

  return new Date(subscription.current_period_end).getTime() > Date.now();
}

export async function getSubscriptionEntitlement(
  userId: string,
): Promise<SubscriptionEntitlement> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .order("current_period_end", { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[Entitlement] Failed to read subscription:", error);
    return buildEmptyEntitlement(userId, "none");
  }

  if (!data) {
    return buildEmptyEntitlement(userId, "none");
  }

  const periodEndTime = data.current_period_end
    ? new Date(data.current_period_end).getTime()
    : 0;
  const status = String(data.status || "inactive");
  const hasEntitledStatus = ENTITLED_STRIPE_STATUSES.has(status);
  const hasUnexpiredPeriod = periodEndTime > Date.now();
  const hasPro = hasEntitledStatus && hasUnexpiredPeriod;

  return {
    hasPro,
    userId,
    plan: data.plan || null,
    status,
    stripeCustomerId: data.stripe_customer_id || null,
    stripeSubscriptionId: data.stripe_subscription_id || null,
    stripePriceId: data.stripe_price_id || null,
    billingInterval: data.billing_interval || null,
    currentPeriodStart: data.current_period_start || null,
    currentPeriodEnd: data.current_period_end || null,
    cancelAtPeriodEnd: Boolean(data.cancel_at_period_end),
    canceledAt: data.canceled_at || null,
    amountPaid: typeof data.amount_paid === "number" ? data.amount_paid : null,
    currency: data.currency || null,
    reason: hasPro
      ? status === "trialing"
        ? "trialing"
        : "active"
      : hasEntitledStatus && !hasUnexpiredPeriod
        ? "expired"
        : "inactive",
  };
}

function buildEmptyEntitlement(
  userId: string,
  reason: SubscriptionEntitlement["reason"],
): SubscriptionEntitlement {
  return {
    hasPro: false,
    userId,
    plan: null,
    status: null,
    stripeCustomerId: null,
    stripeSubscriptionId: null,
    stripePriceId: null,
    billingInterval: null,
    currentPeriodStart: null,
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
    canceledAt: null,
    amountPaid: null,
    currency: null,
    reason,
  };
}
