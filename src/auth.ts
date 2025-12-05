import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import userModel from "@/models/user";
import db from "@/config/db";
import { sign } from "jsonwebtoken";
import { EncryptJWT, jwtDecrypt } from "jose";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.AUTH_SECRET!,

  session: { strategy: "jwt" },

  jwt: {
    async encode({ token }) {
      if (!token) return "";
      const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);
      const encrypted = await new EncryptJWT(token)
        .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
        .encrypt(secret);
      return encrypted;
    },

    async decode({ token }) {
      if (!token) return null;
      const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);
      const { payload } = await jwtDecrypt(token, secret, {
        algorithms: ["dir"],
      });
      return payload;
    },
  },

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
          token.accessToken = sign(
            { email: dbUser.email, role: dbUser.role },
            process.env.JWT_SECRET!,
            { expiresIn: "60s" }
          );
          token.refreshToken = sign(
            { email: dbUser.email },
            process.env.JWT_SECRET_REFRESH!,
            { expiresIn: "15d" }
          );
          await userModel.updateOne(
            { email: dbUser.email },
            { refreshToken: token.refreshToken }
          );
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role as string;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },

  debug: true,
});
