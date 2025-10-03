// src/components/auth/social-row.tsx
"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export function SocialRow() {
  async function signIn(provider: "google" | "github") {
    const { error } = await authClient.signIn.social?.({ provider });
    if (error) toast.error(error.message ?? "Unable to sign in with provider.");
  }

  return (
    <div className="grid gap-3">
      <button
        type="button"
        onClick={() => signIn("google")}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-neutral-200  bg-white px-4 py-2 hover:bg-neutral-50"
      >
        <FcGoogle className="text-xl" />
        <span>Continue with Google</span>
      </button>
 </div>
  );
}
