
// src/components/auth/magic-link-form.tsx
"use client";

import * as React from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { LoginButton } from "./login-btn";

export function MagicLinkForm({
  callbackURL = "/dashboard",
  newUserCallbackURL = "/welcome",
}: {
  callbackURL?: string;
  newUserCallbackURL?: string;
}) {
  const [email, setEmail] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const { error } = await authClient.signIn.magicLink({
      email,
      callbackURL,
      newUserCallbackURL,
    });
    setPending(false);

    if (error) return toast.error(error.message || "Could not send link");
    setSent(true);
    toast.success("Check your email for a one-time sign-in link.");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
          placeholder="you@company.com"
          autoComplete="email"
        />
      </div>

      <LoginButton type="submit" loading={pending}>
        {sent ? "Resend link" : "Email me a magic link"}
      </LoginButton>

      <p className="text-xs text-neutral-500">
        We’ll email a secure, one-time link. No password needed.
      </p>
    </form>
  );
}
