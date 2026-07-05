import type { SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True when Supabase env vars are missing — the portal runs on the local demo backend. */
export const isDemoMode = !url || !anonKey;

let clientPromise: Promise<SupabaseClient> | null = null;

/**
 * Lazily loads @supabase/supabase-js so the library ships in its own async
 * chunk: marketing-page visitors never download it, only portal/CRM users do.
 */
export function getSupabase(): Promise<SupabaseClient> {
  if (isDemoMode) {
    return Promise.reject(new Error("Supabase is not configured (demo mode)"));
  }
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) =>
      createClient(url!, anonKey!, {
        auth: { persistSession: true, detectSessionInUrl: true, autoRefreshToken: true },
      }),
    );
  }
  return clientPromise;
}
