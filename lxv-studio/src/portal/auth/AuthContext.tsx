import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isDemoMode, getSupabase } from "../data/supabaseClient";
import { DEMO_SESSION_KEY } from "../data/demoRepository";
import type { UserRole } from "../domain/types";

export interface PortalUser {
  id: string;
  email: string;
  role: UserRole;
}

interface AuthContextValue {
  user: PortalUser | null;
  loading: boolean;
  /** Sends a magic link (Supabase) or signs straight in (demo mode). */
  signInWithMagicLink: (email: string, redirectPath?: string) => Promise<{ demo: boolean }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_ADMIN_KEY = "lxv.portal.demo.admin";

async function fetchRole(userId: string): Promise<UserRole> {
  const { data } = await getSupabase()
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();
  return (data?.role as UserRole | undefined) ?? "client";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PortalUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      const email = localStorage.getItem(DEMO_SESSION_KEY);
      if (email) {
        const isAdmin = localStorage.getItem(DEMO_ADMIN_KEY) === email;
        setUser({ id: email, email, role: isAdmin ? "admin" : "client" });
      }
      setLoading(false);
      return;
    }

    const supabase = getSupabase();
    let cancelled = false;

    const apply = async (sessionUser: { id: string; email?: string } | null) => {
      if (!sessionUser?.email) {
        if (!cancelled) setUser(null);
        return;
      }
      const role = await fetchRole(sessionUser.id);
      if (!cancelled) {
        setUser({ id: sessionUser.id, email: sessionUser.email.toLowerCase(), role });
      }
    };

    supabase.auth.getSession().then(({ data }) => {
      void apply(data.session?.user ?? null).finally(() => {
        if (!cancelled) setLoading(false);
      });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      void apply(session?.user ?? null);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signInWithMagicLink = useCallback(
    async (email: string, redirectPath = "/portal") => {
      const normalized = email.trim().toLowerCase();
      if (isDemoMode) {
        localStorage.setItem(DEMO_SESSION_KEY, normalized);
        if (redirectPath.startsWith("/admin")) {
          localStorage.setItem(DEMO_ADMIN_KEY, normalized);
        }
        const isAdmin = localStorage.getItem(DEMO_ADMIN_KEY) === normalized;
        setUser({ id: normalized, email: normalized, role: isAdmin ? "admin" : "client" });
        return { demo: true };
      }
      const { error } = await getSupabase().auth.signInWithOtp({
        email: normalized,
        options: { emailRedirectTo: `${window.location.origin}${redirectPath}` },
      });
      if (error) throw error;
      return { demo: false };
    },
    [],
  );

  const signOut = useCallback(async () => {
    if (isDemoMode) {
      localStorage.removeItem(DEMO_SESSION_KEY);
    } else {
      await getSupabase().auth.signOut();
    }
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, signInWithMagicLink, signOut }),
    [user, loading, signInWithMagicLink, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
