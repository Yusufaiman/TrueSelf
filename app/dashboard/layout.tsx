"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSubscription } from "@/hooks/useSubscription";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { isSubscribed, isLoading } = useSubscription();

  // If not subscribed and subscription check is complete, redirect to paywall
  React.useEffect(() => {
    if (!isLoading && !isSubscribed) {
      console.log("[Dashboard] Redirecting non-subscriber to paywall");
      router.push("/paywall?source=dashboard");
    }
  }, [isSubscribed, isLoading, router]);

  // Show loading state while checking subscription
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          </div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If not subscribed, show nothing (component will redirect)
  if (!isSubscribed) {
    return null;
  }

  // Render dashboard for subscribed users
  return <>{children}</>;
}
