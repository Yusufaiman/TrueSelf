import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  // Initialize Supabase client with service role (allows bypass of RLS)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 },
    );
  }

  try {
    // Handle checkout.session.completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const userId = session.metadata?.userId;

      if (!userId) {
        console.error("No userId in session metadata");
        return NextResponse.json(
          { error: "No userId in metadata" },
          { status: 400 },
        );
      }

      // Retrieve subscription details
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      // Determine plan type from price
      const priceId = (subscription as any).items.data[0]?.price.id;
      const plan =
        priceId === process.env.STRIPE_PRICE_ID_MONTHLY ? "monthly" : "yearly";

      // Upsert subscription record
      const { data, error } = await supabase.from("subscriptions").upsert(
        {
          user_id: userId,
          status: "active",
          plan,
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription,
          current_period_start: new Date(
            (subscription as any).current_period_start * 1000,
          ).toISOString(),
          current_period_end: new Date(
            (subscription as any).current_period_end * 1000,
          ).toISOString(),
          amount_paid:
            (subscription as any).items.data[0]?.price.unit_amount || 0,
        },
        { onConflict: "user_id" },
      );

      if (error) {
        console.error("Error upserting subscription:", error);
        return NextResponse.json(
          { error: "Failed to save subscription" },
          { status: 500 },
        );
      }

      console.log("✅ Subscription created for user:", userId);
    }

    // Handle invoice.payment_failed
    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as any;

      const { error } = await supabase
        .from("subscriptions")
        .update({ status: "past_due" })
        .eq("stripe_customer_id", invoice.customer);

      if (error) {
        console.error("Error updating subscription to past_due:", error);
      }

      console.log("⚠️ Payment failed for customer:", invoice.customer);
    }

    // Handle customer.subscription.deleted
    if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object as any;

      const { error } = await supabase
        .from("subscriptions")
        .update({ status: "cancelled" })
        .eq("stripe_subscription_id", sub.id);

      if (error) {
        console.error("Error updating subscription to cancelled:", error);
      }

      console.log("❌ Subscription cancelled:", sub.id);
    }

    // Handle customer.subscription.updated
    if (event.type === "customer.subscription.updated") {
      const sub = event.data.object as any;

      // Determine plan from price
      const priceId = sub.items.data[0]?.price.id;
      const plan =
        priceId === process.env.STRIPE_PRICE_ID_MONTHLY ? "monthly" : "yearly";

      const status = sub.status === "active" ? "active" : "inactive";

      const { error } = await supabase
        .from("subscriptions")
        .update({
          status,
          plan,
          current_period_start: new Date(
            sub.current_period_start * 1000,
          ).toISOString(),
          current_period_end: new Date(
            sub.current_period_end * 1000,
          ).toISOString(),
          cancel_at_period_end: sub.cancel_at_period_end,
        })
        .eq("stripe_subscription_id", sub.id);

      if (error) {
        console.error("Error updating subscription:", error);
      }

      console.log("🔄 Subscription updated:", sub.id);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
