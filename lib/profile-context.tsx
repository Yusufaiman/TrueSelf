"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { getClientUser } from "@/utils/supabase/client-auth";

export interface UserProfile {
  id: string;
  name: string;
  avatar_url: string;
  bio: string;
  email: string;
}

interface ProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    try {
      const user = await getClientUser();
      if (!user) return;

      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        console.log("[ProfileContext] ✓ Profile refreshed:", data);
        setProfile({
          ...data,
          email: user.email || "",
        });
      } else if (error?.code !== "PGRST116") {
        console.error("[ProfileContext] Error fetching profile:", error);
      }
    } catch (err) {
      console.error("[ProfileContext] Error refreshing profile:", err);
    }
  }, []);

  const updateProfile = useCallback(
    async (data: Partial<UserProfile>) => {
      try {
        const user = await getClientUser();
        if (!user) throw new Error("No user logged in");

        console.log("[ProfileContext] Updating profile:", data);

        const supabase = createClient();
        const { error } = await supabase.from("profiles").upsert(
          {
            id: user.id,
            name: data.name,
            avatar_url: data.avatar_url,
            bio: data.bio,
          },
          { onConflict: "id" },
        );

        if (error) {
          throw error;
        }

        // Update local state immediately for better UX
        setProfile((prev) =>
          prev
            ? {
                ...prev,
                ...data,
              }
            : null,
        );

        console.log("[ProfileContext] ✓ Profile updated in Supabase");
        await refreshProfile();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : JSON.stringify(err);
        console.error(
          "[ProfileContext] ✗ Error updating profile:",
          errorMessage,
        );
        throw err;
      }
    },
    [refreshProfile],
  );

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const user = await getClientUser();
        if (!user) {
          setIsLoading(false);
          return;
        }

        const supabase = createClient();
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (data) {
          console.log("[ProfileContext] ✓ Initial profile loaded");
          setProfile({
            ...data,
            email: user.email || "",
          });
        } else if (error?.code === "PGRST116") {
          // No profile yet - set default
          console.log("[ProfileContext] No profile found, using defaults");
          setProfile({
            id: user.id,
            name: user.email?.split("@")[0] || "User",
            avatar_url: "",
            bio: "",
            email: user.email || "",
          });
        } else {
          console.error("[ProfileContext] Error loading profile:", error);
        }
      } catch (err) {
        console.error("[ProfileContext] Error in useEffect:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isLoading,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
}
