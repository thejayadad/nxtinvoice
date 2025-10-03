// src/components/auth/auth-form.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { ForgotPasswordLink, VerifyEmailHint } from "./aux-links";
import { LoginButton } from "./login-btn";

type Mode = "signin" | "signup";

type Props = {
  mode: Mode;
  redirectTo?: string;
};

export function AuthForm({ mode, redirectTo = "/dashboard" }: Props) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setError(null);
    setPending(true);

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const result =
      mode === "signup"
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password, rememberMe: true });

    setPending(false);

    if (result.error) {
      setError(result.error.message || "Something went wrong.");
      return;
    }

    if (mode === "signup") {
      toast.success("Account created! Please sign in.");
      router.push("/sign-in");
      return;
    }

    toast.success(`Welcome, ${email}! You’re signed in.`);
    router.replace(redirectTo);
  }

  return (
    <form action={onSubmit} className="space-y-4">
      {mode === "signup" && (
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 outline-none focus:ring-2"
            placeholder="Ada Lovelace"
            autoComplete="name"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-neutral-200  px-3 py-2 outline-none focus:ring-2"
          placeholder="you@company.com"
          autoComplete="email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
          required
          className="mt-1 w-full rounded-md border border-neutral-200  px-3 py-2 outline-none focus:ring-2"
          placeholder="••••••••"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
        />
        {mode === "signup" ? (
          <div className="mt-1">
            <VerifyEmailHint />
          </div>
        ) : (
          <div className="mt-1">
            <ForgotPasswordLink />
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <LoginButton type="submit" loading={pending}>
        {mode === "signup" ? "Create account" : "Sign in"}
      </LoginButton>
    </form>
  );
}
