import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSubscriptionEntitlement } from "@/lib/subscription-entitlement";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        hasPro: false,
        plan: null,
        status: null,
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
      },
      { status: 200 },
    );
  }

  const entitlement = await getSubscriptionEntitlement(user.id);

  return NextResponse.json(entitlement, { status: 200 });
}
