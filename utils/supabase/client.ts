import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Supabase environment variables are not set. Client won't function properly.",
  );
}

const getConfigError = () => {
  if (!supabaseUrl) {
    return "Missing NEXT_PUBLIC_SUPABASE_URL.";
  }

  if (!supabaseKey) {
    return "Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.";
  }

  try {
    const url = new URL(supabaseUrl);

    if (!["http:", "https:"].includes(url.protocol)) {
      return "NEXT_PUBLIC_SUPABASE_URL must start with http:// or https://.";
    }
  } catch {
    return "NEXT_PUBLIC_SUPABASE_URL is not a valid URL.";
  }

  return null;
};

export const getSupabaseConfigError = () => getConfigError();

export const createClient = () => {
  const configError = getConfigError();

  if (configError) {
    throw new Error(`Supabase configuration error: ${configError}`);
  }

  return createBrowserClient(supabaseUrl!, supabaseKey!);
};
