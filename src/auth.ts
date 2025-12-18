import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import userModel from "@/models/user";
import db from "@/config/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.AUTH_SECRET!,
  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user }) {
      await db();
      const dbUser = await userModel.findOne({ email: user.email });
      return !!dbUser || "/reg";
    },

    async jwt({ token, user }) {
      if (user?.email) {
        await db();
        const dbUser = await userModel.findOne({ email: user.email });
        if (dbUser) {
          token.role = dbUser.role;
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role as string;
      return session;
    },
  },
});
