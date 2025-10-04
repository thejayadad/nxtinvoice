

import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './prisma'
import { magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { sendMagicLinkEmail } from './auth/resend';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },

  },
  
  plugins: [
    magicLink({
      // 10-minute links; store token hashed
      expiresIn: 600,
      storeToken: "hashed",
      // send via Resend
      sendMagicLink: async ({ email, url }) => {
        await sendMagicLinkEmail({ to: email, url });
      },
      // disableSignUp: true, // if you want ML for existing users only
    }),
    nextCookies(), // helps auto-apply Set-Cookie in server actions
  ],
  emailAndPassword: {
    enabled: true,
  }
})


