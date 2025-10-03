// src/components/auth/card-wrapper.tsx
"use client";

import Link from "next/link";
import * as React from "react";

type Props = {
  children: React.ReactNode;
  bottomLinkLabel: string;   // e.g., "Need an account?" or "Already have an account?"
  bottomLinkHref: string;    // e.g., "/sign-up" or "/sign-in"
  SocialSlot?: React.ReactNode; // optional social login row
};

export function CardWrapper({
  children,
  bottomLinkHref,
  bottomLinkLabel,
  SocialSlot,
}: Props) {
  return (
    <div className="w-[400px] rounded-2xl border border-neutral-200 bg-white/60 p-6 shadow-sm backdrop-blur">
      {/* content */}
      <div className="space-y-6">{children}</div>

      {/* social (optional) */}
      {SocialSlot && (
        <div className="mt-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="text-xs uppercase tracking-wide text-neutral-400">or</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>
          {SocialSlot}
        </div>
      )}

      {/* bottom link */}
      <p className="mt-6 text-center text-sm text-neutral-600">
        {bottomLinkLabel}{" "}
        <Link
          href={bottomLinkHref}
          className="font-medium underline underline-offset-4"
        >
          {bottomLinkHref}
        </Link>
      </p>
    </div>
  );
}
