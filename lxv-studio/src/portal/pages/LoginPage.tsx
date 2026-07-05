import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, MailCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Logo } from "@/src/components/ui/Logo";
import { Button } from "@/src/components/ui/Button";
import { useAuth } from "../auth/AuthContext";
import { inputClass } from "../components/ui";
import { isDemoMode } from "../data";

/**
 * Passwordless sign-in: the user enters their email and receives a magic
 * link (Supabase Auth). In demo mode they're signed in immediately.
 * The same page powers /portal/login and /admin/login via the `admin` prop.
 */
export function LoginPage({ admin = false }: { admin?: boolean }) {
  const { user, loading, signInWithMagicLink } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const target =
    (location.state as { from?: string } | null)?.from ?? (admin ? "/admin" : "/portal");

  if (!loading && user && !sent) {
    // Already signed in — clients with admin role may still visit /portal.
    if (!admin || user.role === "admin") return <Navigate to={target} replace />;
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { demo } = await signInWithMagicLink(email, target);
      if (demo) {
        navigate(target, { replace: true });
      } else {
        setSent(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the sign-in link.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(255,0,127,0.15),transparent_70%)]" />

      <header className="border-b border-white/5">
        <div className="container mx-auto flex items-center justify-between px-6 py-5">
          <Link to="/" aria-label="Luxavian — back to home">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-neon-pink">
              {admin ? (
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              )}
              {admin ? "Admin CRM" : "Client Portal"}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              {admin ? "Sign in to the studio" : "Welcome back"}
            </h1>
            <p className="mt-3 text-sm text-gray-400">
              {sent
                ? "Check your inbox — your secure sign-in link is on its way."
                : "No passwords here. Enter your email and we'll send you a secure sign-in link."}
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15">
                  <MailCheck className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                </span>
                <p className="text-sm font-medium text-white">Magic link sent to {email}</p>
                <p className="text-xs text-gray-500">
                  The link signs you in instantly and expires after a short while.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-2 text-xs text-gray-400 underline-offset-2 hover:text-white hover:underline"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => void submit(e)} noValidate>
                <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={inputClass}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
                />
                {error && (
                  <p id="login-error" role="alert" className="mt-2 text-xs text-red-400">
                    {error}
                  </p>
                )}
                <Button type="submit" disabled={busy} className="mt-5 w-full gap-2">
                  {busy ? "Sending…" : isDemoMode ? "Sign in" : "Send magic link"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                {isDemoMode && (
                  <p className="mt-3 text-center text-xs text-amber-300/80">
                    Demo mode: you'll be signed in immediately, no email required.
                  </p>
                )}
              </form>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-gray-600">
            {admin ? (
              <>
                Looking for your project? <Link to="/portal/login" className="text-gray-400 hover:text-white">Client sign-in</Link>
              </>
            ) : (
              <>
                New here? <Link to="/consultation" className="text-gray-400 hover:text-white">Start with a free consultation</Link>
              </>
            )}
          </p>
        </div>
      </main>
    </div>
  );
}
