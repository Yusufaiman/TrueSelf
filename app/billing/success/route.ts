import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getStripeClient } from "@/lib/stripe";
import { sanitizeReturnTo } from "@/lib/safe-redirect";
import { getSubscriptionEntitlement } from "@/lib/subscription-entitlement";
import { retrieveAndSyncSubscription } from "@/lib/stripe-subscription-sync";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    redirect("/dashboard");
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/login?redirect=${encodeURIComponent("/dashboard")}`);
  }

  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["subscription", "customer"],
  });

  const metadataUserId = session.metadata?.user_id || session.metadata?.userId;
  const sessionUserId = session.client_reference_id || metadataUserId;

  if (sessionUserId !== user.id) {
    console.warn("[Billing Success] Checkout session user mismatch", {
      sessionId,
      sessionUserId,
      userId: user.id,
    });
    redirect("/dashboard");
  }

  if (session.mode === "subscription" && session.subscription) {
    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription.id;

    await retrieveAndSyncSubscription(subscriptionId, user.id);
  }

  const entitlement = await getSubscriptionEntitlement(user.id);
  const safeReturnTo = sanitizeReturnTo(session.metadata?.return_to, "/dashboard");

  if (!entitlement.hasPro) {
    redirect(`/paywall?returnTo=${encodeURIComponent(safeReturnTo)}`);
  }

  redirect(safeReturnTo);
}
