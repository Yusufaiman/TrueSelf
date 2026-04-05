import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AnalyticsPage } from "@/components/dashboard/AnalyticsPage";
import { RouteProtection } from "@/components/RouteProtection";

export const metadata = {
  title: "Analytics - TrueSelf Dashboard",
  description: "View your test analytics and insights",
};

export default function AnalyticsPageRoute() {
  return (
    <RouteProtection>
      <DashboardLayout page="analytics">
        <AnalyticsPage />
      </DashboardLayout>
    </RouteProtection>
  );
}
