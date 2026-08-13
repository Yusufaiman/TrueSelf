import "server-only";

import Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe";
import { createAdminClient } from "@/utils/supabase/admin";

type StripeSubscriptionLike = Stripe.Subscription & {
  current_period_start?: number;
  current_period_end?: number;
};

function getConfiguredPriceIds() {
  return {
    monthly:
      process.env.STRIPE_PRICE_ID_MONTHLY ||
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY ||
      "",
    yearly:
      process.env.STRIPE_PRICE_ID_YEARLY ||
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY ||
      "",
  };
}

export function getPlanFromPriceId(priceId: string | null | undefined) {
  const prices = getConfiguredPriceIds();

  if (priceId && priceId === prices.monthly) return "monthly";
  if (priceId && priceId === prices.yearly) return "yearly";

  return null;
}

export async function findStripeCustomerIdForUser(userId: string) {
  const supabase = createAdminClient();

  const { data } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .not("stripe_customer_id", "is", null)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data?.stripe_customer_id || null;
}

export async function syncStripeSubscription(
  subscription: StripeSubscriptionLike,
  fallbackUserId?: string | null,
) {
  const supabase = createAdminClient();
  const firstItem = subscription.items.data[0];
  const price = firstItem?.price;
  const priceId = price?.id || null;
  const productId =
    typeof price?.product === "string" ? price.product : price?.product?.id;

  let userId =
    subscription.metadata?.user_id ||
    subscription.metadata?.userId ||
    fallbackUserId ||
    null;

  if (!userId) {
    const { data: existing } = await supabase
      .from("subscriptions")
      .select("user_id")
      .eq("stripe_subscription_id", subscription.id)
      .maybeSingle();

    userId = existing?.user_id || null;
  }

  if (!userId) {
    console.warn("[Stripe Sync] Subscription has no TrueSelf user:", {
      subscriptionId: subscription.id,
      customer: subscription.customer,
    });
    return null;
  }

  const periodStart =
    subscription.current_period_start || (firstItem as any)?.current_period_start;
  const periodEnd =
    subscription.current_period_end || (firstItem as any)?.current_period_end;
  const plan =
    getPlanFromPriceId(priceId) ||
    (price?.recurring?.interval === "year" ? "yearly" : "monthly");

  const payload = {
    user_id: userId,
    stripe_customer_id:
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id,
    stripe_subscription_id: subscription.id,
    stripe_price_id: priceId,
    stripe_product_id: productId || null,
    plan,
    billing_interval: price?.recurring?.interval || null,
    status: subscription.status,
    current_period_start: periodStart
      ? new Date(periodStart * 1000).toISOString()
      : null,
    current_period_end: periodEnd
      ? new Date(periodEnd * 1000).toISOString()
      : null,
    cancel_at_period_end: subscription.cancel_at_period_end,
    canceled_at: subscription.canceled_at
      ? new Date(subscription.canceled_at * 1000).toISOString()
      : null,
    amount_paid: price?.unit_amount || 0,
    currency: price?.currency || "myr",
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("subscriptions")
    .upsert(payload, { onConflict: "user_id" })
    .select("*")
    .single();

  if (error) {
    console.error("[Stripe Sync] Failed to upsert subscription:", error);
    throw error;
  }

  return data;
}

export async function retrieveAndSyncSubscription(
  subscriptionId: string,
  fallbackUserId?: string | null,
) {
  const stripe = getStripeClient();
  const subscription = (await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["items.data.price.product"],
  })) as StripeSubscriptionLike;

  return syncStripeSubscription(subscription, fallbackUserId);
}
