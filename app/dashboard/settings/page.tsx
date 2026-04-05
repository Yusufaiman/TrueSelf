import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SettingsPage } from "@/components/dashboard/SettingsPage";
import { RouteProtection } from "@/components/RouteProtection";

export const metadata = {
  title: "Settings - TrueSelf Dashboard",
  description: "Manage your account settings",
};

export default function SettingsPageRoute() {
  return (
    <RouteProtection>
      <DashboardLayout page="settings">
        <SettingsPage />
      </DashboardLayout>
    </RouteProtection>
  );
}
