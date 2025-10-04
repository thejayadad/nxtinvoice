// src/lib/auth-client.ts
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    nextCookies(),       // ✅ keep this (handles cookies in Next.js)
    magicLinkClient(),   // ✅ add this for client-side magic link support
  ],
});
