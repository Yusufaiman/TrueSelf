/**
 * Subscription validation utilities
 * Used to check if users have active subscriptions
 */

export interface Subscription {
  id: string;
  user_id: string;
  status: "active" | "inactive" | "cancelled" | "past_due";
  plan: "monthly" | "yearly";
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Check if a subscription is active
 */
export function isSubscriptionActive(subscription: Subscription | null): boolean {
  if (!subscription) return false;
  return subscription.status === "active";
}

/**
 * Get subscription status for display
 */
export function getSubscriptionStatus(subscription: Subscription | null): {
  isActive: boolean;
  plan: string | null;
  status: string;
} {
  if (!subscription) {
    return {
      isActive: false,
      plan: null,
      status: "Not subscribed",
    };
  }

  return {
    isActive: subscription.status === "active",
    plan: subscription.plan === "yearly" ? "Yearly Plan" : "Monthly Plan",
    status: subscription.status,
  };
}

/**
 * Format next billing date
 */
export function formatNextBillingDate(dateString: string | null): string {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "N/A";
  }
}
