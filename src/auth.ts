import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  debug: process.env.NODE_ENV === "development",  // Auto-debug in dev
  // Optional: Force HTTPS in prod
  basePath: undefined,
  baseUrl: process.env.NEXTAUTH_URL || "http://localhost:3000",
})