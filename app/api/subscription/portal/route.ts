import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { sanitizeReturnTo } from "@/lib/safe-redirect";
import { getStripeClient } from "@/lib/stripe";
import { getSubscriptionEntitlement } from "@/lib/subscription-entitlement";
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

    const { returnTo } = await req.json().catch(() => ({ returnTo: null }));
    const safeReturnTo = sanitizeReturnTo(returnTo, "/dashboard/billing");
    const entitlement = await getSubscriptionEntitlement(user.id);

    if (!entitlement.stripeCustomerId) {
      return NextResponse.json(
        { error: "No Stripe customer found for this account." },
        { status: 404 },
      );
    }

    const origin =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.nextUrl.origin ||
      "http://localhost:3000";
    const stripe = getStripeClient();
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: entitlement.stripeCustomerId,
      return_url: `${origin}${safeReturnTo}`,
    });

    return NextResponse.json({ url: portalSession.url }, { status: 200 });
  } catch (error: any) {
    console.error("Stripe billing portal error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create billing portal session" },
      { status: 500 },
    );
  }
}
