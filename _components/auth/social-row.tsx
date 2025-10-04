// src/components/auth/social-row.tsx
"use client";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

export function SocialRow() {
  const onGoogle = async () => {
    const { error } = await authClient.signIn.social({ provider: "google" });
    if (error) toast.error(error.message ?? "Google sign-in failed");
  };

  return (
    <button
      type="button"
      onClick={onGoogle}
      className="flex w-full items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 hover:bg-neutral-50"
    >
      <FcGoogle className="text-xl" />
      <span>Continue with Google</span>
    </button>
  );
}
