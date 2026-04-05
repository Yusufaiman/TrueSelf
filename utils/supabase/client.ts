import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Supabase environment variables are not set. Client won't function properly.",
  );
}

export const createClient = () => {
  // Handle missing environment variables during build/prerender
  if (!supabaseUrl || !supabaseKey) {
    return createBrowserClient(
      "http://localhost:54321",
      "anon-key-placeholder",
    );
  }
  return createBrowserClient(supabaseUrl, supabaseKey);
};
