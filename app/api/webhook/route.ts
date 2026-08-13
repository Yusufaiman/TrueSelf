import { getStripeClient } from "@/lib/stripe";
import {
  retrieveAndSyncSubscription,
  syncStripeSubscription,
} from "@/lib/stripe-subscription-sync";
import { createAdminClient } from "@/utils/supabase/admin";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const stripe = getStripeClient();
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

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
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;
        const userId =
          session.client_reference_id ||
          session.metadata?.user_id ||
          session.metadata?.userId ||
          null;

        if (subscriptionId) {
          await retrieveAndSyncSubscription(subscriptionId, userId);
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await syncStripeSubscription(
          event.data.object as Stripe.Subscription,
          null,
        );
        break;
      }

      case "invoice.paid":
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId =
          typeof (invoice as any).subscription === "string"
            ? (invoice as any).subscription
            : (invoice as any).subscription?.id;

        if (subscriptionId) {
          await retrieveAndSyncSubscription(subscriptionId, null);
        } else if (event.type === "invoice.payment_failed" && invoice.customer) {
          const supabase = createAdminClient();
          await supabase
            .from("subscriptions")
            .update({
              status: "past_due",
              updated_at: new Date().toISOString(),
            })
            .eq(
              "stripe_customer_id",
              typeof invoice.customer === "string"
                ? invoice.customer
                : invoice.customer.id,
            );
        }
        break;
      }

      default:
        break;
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
