import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True when Supabase env vars are missing — the portal runs on the local demo backend. */
export const isDemoMode = !url || !anonKey;

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (isDemoMode) throw new Error("Supabase is not configured (demo mode)");
  if (!client) {
    client = createClient(url!, anonKey!, {
      auth: { persistSession: true, detectSessionInUrl: true, autoRefreshToken: true },
    });
  }
  return client;
}
