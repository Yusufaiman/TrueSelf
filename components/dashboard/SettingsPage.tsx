"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  Upload,
  AlertCircle,
  CheckCircle2,
  LogOut,
  Trash2,
} from "lucide-react";
import { useProfile } from "@/lib/profile-context";
import {
  getClientUser,
  changePassword,
  clientSignOut,
} from "@/utils/supabase/client-auth";
import { Button } from "@/components/ui/Button";

interface User {
  id: string;
  email?: string;
}

export function SettingsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { profile, updateProfile, isLoading: profileLoading } = useProfile();

  // User state
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Profile form state
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Messages
  const [profileMessage, setProfileMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Initialize form with profile and user data
  useEffect(() => {
    const initializeData = async () => {
      try {
        const currentUser = await getClientUser();
        if (!currentUser) {
          router.push("/auth/login");
          return;
        }
        setUser(currentUser);

        // Load profile data
        if (profile) {
          setDisplayName(profile.name || "");
          setBio(profile.bio || "");
          setAvatarUrl(profile.avatar_url || "");
        }
      } catch (err) {
        console.error("Error initializing:", err);
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [router, profile]);

  // Update form when profile changes
  useEffect(() => {
    if (profile && !isSavingProfile) {
      setDisplayName(profile.name || "");
      setBio(profile.bio || "");
      setAvatarUrl(profile.avatar_url || "");
    }
  }, [profile, isSavingProfile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setProfileMessage({
        type: "error",
        text: "Display name cannot be empty",
      });
      return;
    }

    setIsSavingProfile(true);
    setProfileMessage(null);

    try {
      await updateProfile({
        name: displayName,
        bio: bio || "",
        avatar_url: avatarUrl || "",
      });

      setProfileMessage({
        type: "success",
        text: "Profile updated successfully!",
      });
      setTimeout(() => setProfileMessage(null), 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : JSON.stringify(err);
      console.error("[Settings] Error saving profile:", errorMessage);
      setProfileMessage({
        type: "error",
        text: `Error: ${errorMessage}`,
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setAvatarUrl(dataUrl);

        // Save avatar immediately
        updateProfile({
          name: displayName,
          bio: bio || "",
          avatar_url: dataUrl,
        })
          .then(() => {
            setProfileMessage({ type: "success", text: "Avatar updated!" });
            setTimeout(() => setProfileMessage(null), 3000);
          })
          .catch((err) => {
            console.error("[Settings] Error uploading avatar:", err);
            setProfileMessage({
              type: "error",
              text: "Failed to upload avatar",
            });
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (!newPassword || !confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "Please fill in all password fields",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "Passwords do not match",
      });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage({
        type: "error",
        text: "Password must be at least 8 characters",
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

  if (isLoading || profileLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Account Settings
        </h1>
        <p className="text-slate-600">
          Manage your account information and security
        </p>
      </div>

      {/* SECTION A: Profile Information */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">
          Profile Information
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Avatar Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-900">
              Profile Picture
            </label>
            <div className="flex items-center gap-6">
              {/* Avatar Display */}
              <div className="flex-shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                    {initials || "?"}
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium"
                >
                  <Upload size={18} />
                  Change Picture
                </button>
                <p className="text-xs text-slate-500 mt-2">
                  JPG, PNG or GIF • Max 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-200"></div>

          {/* Display Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-900"
            >
              Display Name
            </label>
            <input
              id="name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            />
            <p className="text-xs text-slate-500">
              How you appear to others on TrueSelf
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-slate-900"
            >
              Bio (Optional)
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a bit about yourself..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none"
            />
            <p className="text-xs text-slate-500">
              Optional. Maximum 500 characters.
            </p>
          </div>

          {/* Email (Read-only) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              Email Address
            </label>
            <input
              type="email"
              value={profile?.email || user?.email || ""}
              disabled
              className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-600 cursor-not-allowed"
            />
            <p className="text-xs text-slate-500">
              Email cannot be changed here. Contact support if you need
              assistance.
            </p>
          </div>

          {/* Messages */}
          {profileMessage && (
            <div
              className={`flex items-center gap-3 p-4 rounded-lg ${
                profileMessage.type === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {profileMessage.type === "success" ? (
                <CheckCircle2 className="text-green-600" size={20} />
              ) : (
                <AlertCircle className="text-red-600" size={20} />
              )}
              <span
                className={
                  profileMessage.type === "success"
                    ? "text-green-800"
                    : "text-red-800"
                }
              >
                {profileMessage.text}
              </span>
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            disabled={isSavingProfile}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {isSavingProfile ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* SECTION B: Account Security */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Lock size={20} className="text-blue-600" />
          Account Security
        </h3>

        <div className="space-y-6">
          {/* Change Password */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-4">
              Change Password
            </label>

            {passwordMessage && (
              <div
                className={`mb-4 p-4 rounded-lg flex items-center gap-3 ${
                  passwordMessage.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {passwordMessage.type === "success" ? (
                  <CheckCircle2 className="text-green-600" size={20} />
                ) : (
                  <AlertCircle className="text-red-600" size={20} />
                )}
                <span
                  className={
                    passwordMessage.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }
                >
                  {passwordMessage.text}
                </span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={isChangingPassword}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {isChangingPassword ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* SECTION C: Danger Zone */}
      <div className="bg-red-50 rounded-xl border border-red-200 p-6">
        <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
          <AlertCircle size={20} />
          Account Control
        </h3>

        <div className="space-y-4">
          {/* Logout */}
          <div>
            <p className="text-sm text-red-700 mb-3">
              Sign out of your account
            </p>
            <Button
              onClick={handleLogout}
              className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>

          {/* Delete Account */}
          <div className="pt-4 border-t border-red-200">
            <p className="text-sm text-red-700 mb-3">
              Permanently delete your account and all data. This cannot be
              undone.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
              <Trash2 size={18} />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
