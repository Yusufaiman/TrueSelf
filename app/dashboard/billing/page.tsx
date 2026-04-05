import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BillingPage } from "@/components/dashboard/BillingPage";
import { RouteProtection } from "@/components/RouteProtection";

export const metadata = {
  title: "Billing - TrueSelf Dashboard",
  description: "Manage your subscription and billing",
};

export default function BillingPageRoute() {
  return (
    <RouteProtection>
      <DashboardLayout page="billing">
        <BillingPage />
      </DashboardLayout>
    </RouteProtection>
  );
}
