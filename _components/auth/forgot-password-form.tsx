// src/components/auth/forgot-password-form.tsx
"use client";

import * as React from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { LoginButton } from "./login-btn";

export function ForgotPasswordForm() {
  const [email, setEmail] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);

    const { error } = await authClient.requestPasswordReset({ email });
    setPending(false);

    if (error) {
      toast.error(error.message || "Could not send reset email");
      return;
    }
    setSent(true);
    toast.success("Reset link sent. Check your inbox.");
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
        {sent ? "Resend link" : "Send reset link"}
      </LoginButton>
    </form>
  );
}
