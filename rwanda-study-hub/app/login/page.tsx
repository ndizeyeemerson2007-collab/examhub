"use client";

import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Signing in...");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setStatus(error.message);
      return;
    }

    await fetch("/api/auth/ensure", { method: "POST" });
    setStatus("Signed in successfully. Redirecting...");
    window.location.href = "/";
  };

  const handleSignUp = async () => {
    setStatus("Creating account...");
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setStatus(error.message);
      return;
    }
    if (data.session) {
      await fetch("/api/auth/ensure", { method: "POST" });
    }
    setStatus("Account created. Check your email for verification.");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Sign in to MaximizeHub</h1>
          <p className="mt-3 text-sm text-slate-600">
            Use your school email and password. Student accounts are created automatically. Admin accounts must be provisioned with role admin in Supabase.
          </p>

          <form onSubmit={handleSignIn} className="mt-8 space-y-6">
            <label className="block text-sm font-medium text-slate-700">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
              />
            </label>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                <FontAwesomeIcon icon={faRightToBracket} />
                Sign in
              </button>
              <button type="button" onClick={handleSignUp} className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400">
                <FontAwesomeIcon icon={faUserPlus} />
                Create account
              </button>
            </div>
          </form>
          {status && <p className="mt-4 text-sm text-slate-600">{status}</p>}
        </div>
      </section>
    </main>
  );
}
