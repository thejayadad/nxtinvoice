// src/components/auth/aux-links.tsx
"use client";

import Link from "next/link";

export function ForgotPasswordLink() {
  return (
    <div className="text-right">
      <Link
        href="/forgot-password"
        className="text-sm text-neutral-600 underline underline-offset-4 hover:text-neutral-800"
      >
        Forgot password?
      </Link>
    </div>
  );
}

export function VerifyEmailHint() {
  return (
    <p className="text-xs text-neutral-500">
      We’ll send a verification email after sign-up. Didn’t get it?{" "}
      <Link href="/verify-email" className="underline underline-offset-4">
        Resend verification
      </Link>
      .
    </p>
  );
}
