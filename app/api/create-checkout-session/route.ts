import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import { sanitizeReturnTo } from "@/lib/safe-redirect";
import { getSubscriptionEntitlement } from "@/lib/subscription-entitlement";
import {
  findStripeCustomerIdForUser,
  getPlanFromPriceId,
} from "@/lib/stripe-subscription-sync";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const { priceId, plan, returnTo } = await req.json();
    const resolvedPlan =
      plan === "monthly" || plan === "yearly"
        ? plan
        : getPlanFromPriceId(priceId);
    const monthlyPriceId =
      process.env.STRIPE_PRICE_ID_MONTHLY ||
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY;
    const yearlyPriceId =
      process.env.STRIPE_PRICE_ID_YEARLY ||
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY;
    const resolvedPriceId =
      resolvedPlan === "yearly" ? yearlyPriceId : monthlyPriceId;

    if (!resolvedPlan || !resolvedPriceId) {
      return NextResponse.json(
        { error: "Stripe pricing is not configured." },
        { status: 400 },
      );
    }

    if (priceId && priceId !== resolvedPriceId) {
      return NextResponse.json(
        { error: "Invalid price selected." },
        { status: 400 },
      );
    }

    const entitlement = await getSubscriptionEntitlement(user.id);
    if (entitlement.hasPro) {
      return NextResponse.json(
        {
          error: "You already have an active TrueSelf Pro membership.",
          redirectTo: sanitizeReturnTo(returnTo, "/dashboard/billing"),
          entitlement,
        },
        { status: 409 },
      );
    }

    const safeReturnTo = sanitizeReturnTo(returnTo, "/dashboard");
    const origin =
      process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin || "http://localhost:3000";
    const stripe = getStripeClient();
    const existingCustomerId = await findStripeCustomerIdForUser(user.id);
    const customer =
      existingCustomerId ||
      (
        await stripe.customers.create({
          email: user.email || undefined,
          metadata: {
            user_id: user.id,
          },
        })
      ).id;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer,
      client_reference_id: user.id,
      line_items: [
        {
          price: resolvedPriceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/paywall?returnTo=${encodeURIComponent(
        safeReturnTo,
      )}`,
      metadata: {
        user_id: user.id,
        plan: resolvedPlan,
        return_to: safeReturnTo,
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
          plan: resolvedPlan,
          return_to: safeReturnTo,
        },
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
