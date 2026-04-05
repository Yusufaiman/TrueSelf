/**
 * Hook to fetch and manage global profile data
 */

"use client";

import { useEffect, useState } from "react";
import { GlobalProfile } from "@/lib/psychology/dimensions";
import { getUserGlobalProfile } from "@/lib/psychology/profileEngine";

interface UseGlobalProfileReturn {
  profile: GlobalProfile | null;
  loading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
}

export function useGlobalProfile(
  userId: string | undefined,
): UseGlobalProfileReturn {
  const [profile, setProfile] = useState<GlobalProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const fetchedProfile = await getUserGlobalProfile(userId);
      setProfile(fetchedProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const refreshProfile = async () => {
    await fetchProfile();
  };

  return { profile, loading, error, refreshProfile };
}
