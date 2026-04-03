"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Save,
  LogOut,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  getClientUser,
  updateProfile,
  changePassword,
  clientSignOut,
} from "@/utils/supabase/client-auth";

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    display_name?: string;
  };
}

export function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Edit Profile State
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getClientUser();
        if (!currentUser) {
          router.push("/auth/login");
          return;
        }
        setUser(currentUser);
        setEmail(currentUser.email || "");
        setDisplayName(
          currentUser.user_metadata?.display_name ||
            currentUser.email?.split("@")[0] ||
            "",
        );
      } catch (err) {
        console.error("Error fetching user:", err);
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || !email.trim()) {
      setProfileMessage({
        type: "error",
        text: "Please fill in all fields",
      });
      return;
    }

    setIsSavingProfile(true);
    setProfileMessage(null);

    try {
      const result = await updateProfile({
        displayName,
        email,
      });

      if (result.success) {
        setProfileMessage({
          type: "success",
          text: "Profile updated successfully!",
        });
        setTimeout(() => setProfileMessage(null), 3000);
      } else {
        setProfileMessage({
          type: "error",
          text: result.error || "Failed to update profile",
        });
      }
    } catch (err) {
      setProfileMessage({
        type: "error",
        text: "An error occurred",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "Please fill in all password fields",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "New passwords do not match",
      });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
      return;
    }

    setIsChangingPassword(true);

    try {
      const result = await changePassword(newPassword);

      if (result.success) {
        setPasswordMessage({
          type: "success",
          text: "Password changed successfully!",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordMessage(null), 3000);
      } else {
        setPasswordMessage({
          type: "error",
          text: result.error || "Failed to change password",
        });
      }
    } catch (err) {
      setPasswordMessage({
        type: "error",
        text: "An error occurred",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    const success = await clientSignOut();
    if (success) {
      router.push("/");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Manage your account preferences</p>
      </div>

      {/* Edit Profile Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Mail size={24} className="text-blue-600" />
          <h3 className="text-xl font-bold text-slate-900">Edit Profile</h3>
        </div>

        {profileMessage && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              profileMessage.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {profileMessage.type === "success" ? (
              <CheckCircle2 size={20} className="text-green-600" />
            ) : (
              <AlertCircle size={20} className="text-red-600" />
            )}
            <span
              className={
                profileMessage.type === "success"
                  ? "text-green-900"
                  : "text-red-900"
              }
            >
              {profileMessage.text}
            </span>
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={isSavingProfile}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {isSavingProfile ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Lock size={24} className="text-blue-600" />
          <h3 className="text-xl font-bold text-slate-900">Change Password</h3>
        </div>

        {passwordMessage && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              passwordMessage.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {passwordMessage.type === "success" ? (
              <CheckCircle2 size={20} className="text-green-600" />
            ) : (
              <AlertCircle size={20} className="text-red-600" />
            )}
            <span
              className={
                passwordMessage.type === "success"
                  ? "text-green-900"
                  : "text-red-900"
              }
            >
              {passwordMessage.text}
            </span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="New password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            disabled={isChangingPassword}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Lock size={18} />
            {isChangingPassword ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>

      {/* Logout Section */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-red-900">Sign Out</h3>
            <p className="text-red-700 text-sm mt-1">
              You will be logged out from your account
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
