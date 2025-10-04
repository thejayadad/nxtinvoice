import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { sendMagicLinkEmail } from "./auth/resend";
import { sendPasswordResetEmail } from "./auth/email-reset";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  // 🔸 keep ONE emailAndPassword block
  emailAndPassword: {
    enabled: true,

    // ✅ callback receives { user, url, token }
    async sendResetPassword({ user, url /*, token */ }) {
      await sendPasswordResetEmail({ to: user.email, url });
    },

    // Optional: notify after success
    // onPasswordReset: async ({ user }) => { console.log(`reset for ${user.email}`); },
  },

  plugins: [
    magicLink({
      expiresIn: 600,
      storeToken: "hashed",
      // magic-link callback includes `email`, `url`, `token`
      async sendMagicLink({ email, url /*, token */ }) {
        await sendMagicLinkEmail({ to: email, url });
      },
    }),
    nextCookies(),
  ],
});
