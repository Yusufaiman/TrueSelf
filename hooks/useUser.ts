/**
 * Hook to get current authenticated user
 */

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface User {
  id: string;
  email?: string;
  user_metadata?: any;
}

interface UseUserReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const supabase = createClient();
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          throw authError;
        }

        if (authUser) {
          setUser({
            id: authUser.id,
            email: authUser.email,
            user_metadata: authUser.user_metadata,
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to get user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return { user, loading, error };
}
