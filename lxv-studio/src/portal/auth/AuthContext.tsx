import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isDemoMode, getSupabase } from "../data/supabaseClient";
import {
  DEMO_SESSION_KEY,
  demoGrantInitialAdmin,
  demoRoleFor,
} from "../data/demoRepository";
import { ADMIN_ROLES, type UserRole } from "../domain/types";

export interface PortalUser {
  id: string;
  email: string;
  role: UserRole;
}

interface AuthContextValue {
  user: PortalUser | null;
  loading: boolean;
  /** Any staff role (admin or super_admin). */
  isAdmin: boolean;
  isSuperAdmin: boolean;
  /** Sends a magic link (Supabase) or signs straight in (demo mode). */
  signInWithMagicLink: (email: string, redirectPath?: string) => Promise<{ demo: boolean }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchRole(userId: string): Promise<UserRole> {
  const supabase = await getSupabase();
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();
  return (data?.role as UserRole | undefined) ?? "client";
}

/** Demo sessions resolve synchronously from localStorage, so hydrate at mount. */
function initialDemoUser(): PortalUser | null {
  if (!isDemoMode) return null;
  const email = localStorage.getItem(DEMO_SESSION_KEY);
  return email ? { id: email, email, role: demoRoleFor(email) } : null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PortalUser | null>(initialDemoUser);
  const [loading, setLoading] = useState(!isDemoMode);

  useEffect(() => {
    if (isDemoMode) return;

    let cancelled = false;
    let unsubscribe: (() => void) | null = null;

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

    void getSupabase()
      .then((supabase) => {
        void supabase.auth.getSession().then(({ data }) => {
          void apply(data.session?.user ?? null).finally(() => {
            if (!cancelled) setLoading(false);
          });
        });
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
          void apply(session?.user ?? null);
        });
        unsubscribe = () => sub.subscription.unsubscribe();
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  const signInWithMagicLink = useCallback(
    async (email: string, redirectPath = "/portal") => {
      const normalized = email.trim().toLowerCase();
      if (isDemoMode) {
        localStorage.setItem(DEMO_SESSION_KEY, normalized);
        if (redirectPath.startsWith("/admin")) demoGrantInitialAdmin(normalized);
        setUser({ id: normalized, email: normalized, role: demoRoleFor(normalized) });
        return { demo: true };
      }
      const supabase = await getSupabase();
      const { error } = await supabase.auth.signInWithOtp({
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
      const supabase = await getSupabase();
      await supabase.auth.signOut();
    }
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin: user !== null && ADMIN_ROLES.includes(user.role),
      isSuperAdmin: user?.role === "super_admin",
      signInWithMagicLink,
      signOut,
    }),
    [user, loading, signInWithMagicLink, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
