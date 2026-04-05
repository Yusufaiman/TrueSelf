"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import { useProfile } from "@/lib/profile-context";
import { getClientUser } from "@/utils/supabase/client-auth";

export function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { profile, updateProfile, isLoading } = useProfile();

  // Form state
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Initialize form with profile data
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.name || "");
      setBio(profile.bio || "");
      setAvatarUrl(profile.avatar_url || "");
    }
  }, [profile]);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const user = await getClientUser();
      if (!user) {
        router.push("/auth/login");
      }
    };
    checkAuth();
  }, [router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setMessage({ type: "error", text: "Display name cannot be empty" });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      console.log("[ProfilePage] Saving profile:", {
        name: displayName,
        bio,
        avatar_url: avatarUrl,
      });

      await updateProfile({
        name: displayName,
        bio: bio || "",
        avatar_url: avatarUrl || "",
      });

      setMessage({ type: "success", text: "Profile updated successfully!" });

      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : JSON.stringify(err);
      console.error("[ProfilePage] ✗ Error saving profile:", errorMessage);
      setMessage({
        type: "error",
        text: `Error: ${errorMessage}`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, use data URL. In production, upload to storage
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
            setMessage({ type: "success", text: "Avatar updated!" });
            setTimeout(() => setMessage(null), 3000);
          })
          .catch((err) => {
            console.error("[ProfilePage] Error uploading avatar:", err);
            setMessage({
              type: "error",
              text: "Failed to upload avatar",
            });
          });
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
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
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Profile</h1>
        <p className="text-slate-600">
          Manage your personal information and preferences
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <form onSubmit={handleSaveProfile} className="space-y-8">
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
                    {initials}
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
              rows={4}
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
              value={profile?.email || ""}
              disabled
              className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-600 cursor-not-allowed"
            />
            <p className="text-xs text-slate-500">
              Email cannot be changed here. Contact support if you need to
              change it.
            </p>
          </div>

          {/* Messages */}
          {message && (
            <div
              className={`flex items-center gap-3 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="text-green-600" size={20} />
              ) : (
                <AlertCircle className="text-red-600" size={20} />
              )}
              <span
                className={
                  message.type === "success" ? "text-green-800" : "text-red-800"
                }
              >
                {message.text}
              </span>
            </div>
          )}

          {/* Save Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
