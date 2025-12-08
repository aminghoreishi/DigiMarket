import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import userModel from "@/models/user";
import db from "@/config/db";
import { sign } from "jsonwebtoken";
import { EncryptJWT } from "jose";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google()],

  secret: process.env.AUTH_SECRET!,

  session: { strategy: "jwt" },

  jwt: {
    async encode({ token }) {
      if (!token) return "";
      return await new EncryptJWT(token)
        .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
        .setIssuedAt()
        .setExpirationTime("30d") // یا 1y یا هر چی می‌خوای
        .encrypt(new TextEncoder().encode(process.env.AUTH_SECRET!));
    },
    async decode({ token }) {
      if (!token) return null;
      const { payload } = await import("jose").then(jose =>
        jose.jwtDecrypt(token, new TextEncoder().encode(process.env.AUTH_SECRET!), {
          algorithms: ["dir"],
          contentAlgorithms: ["A256GCM"],
        })
      );
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

  debug: process.env.NODE_ENV === "development",
});