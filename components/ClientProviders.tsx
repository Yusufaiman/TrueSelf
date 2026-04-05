"use client";

import { ProfileProvider } from "@/lib/profile-context";
import { SubscriptionProvider } from "@/lib/subscription-context";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SubscriptionProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </SubscriptionProvider>
  );
}
