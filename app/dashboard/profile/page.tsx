import { redirect } from "next/navigation";

export const metadata = {
  title: "Account Settings - TrueSelf Dashboard",
  description: "Manage your account settings",
};

export default function ProfilePageRoute() {
  // Profile has been merged into Settings
  redirect("/dashboard/settings");
}
