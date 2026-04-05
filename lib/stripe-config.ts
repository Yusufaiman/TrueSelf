// Stripe Price IDs - These need to be created in your Stripe Dashboard
// After creating the prices, copy them here
export const STRIPE_PRICES = {
  MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY || "",
  YEARLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY || "",
};

// Validate that prices are configured
export function validateStripeConfig() {
  if (!STRIPE_PRICES.MONTHLY || !STRIPE_PRICES.YEARLY) {
    console.warn(
      "⚠️ Stripe price IDs not configured! Set NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY and NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY in .env.local",
    );
    return false;
  }
  return true;
}
