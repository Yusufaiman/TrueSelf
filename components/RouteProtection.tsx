"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getClientUser } from "@/utils/supabase/client-auth";
import { useSubscription } from "@/lib/subscription-context";

interface RouteProtectionProps {
  children: React.ReactNode;
  requiredPlan?: "monthly" | "yearly" | "any";
}

export const RouteProtection: React.FC<RouteProtectionProps> = ({
  children,
  requiredPlan = "any",
}) => {
  const router = useRouter();
  const { isSubscribed, subscriptionPlan, isLoading } = useSubscription();
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const user = await getClientUser();

        // Redirect to login if not authenticated
        if (!user) {
          router.push("/auth/login?redirect=" + window.location.pathname);
          return;
        }

        // Check subscription status
        if (!isSubscribed) {
          router.push("/pricing?upgrade=required");
          return;
        }

        // Check specific plan requirement if specified
        if (
          requiredPlan !== "any" &&
          subscriptionPlan !== null &&
          subscriptionPlan !== requiredPlan
        ) {
          router.push("/pricing?plan=" + requiredPlan);
          return;
        }

        setIsAuthorized(true);
      } catch (err) {
        console.error("Error checking access:", err);
        router.push("/auth/login");
      }
    };

    if (!isLoading) {
      checkAccess();
    }
  }, [isLoading, isSubscribed, subscriptionPlan, requiredPlan, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
};
