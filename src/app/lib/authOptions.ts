// lib/authOptions.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "@/config/db";
import userModel from "@/models/user";
import { sign } from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await db();
      if (account?.provider === "google") {
        const existingUser = await userModel.findOne({ email: user.email });
        if (!existingUser) {
          await userModel.create({
            fullName: user.name || "کاربر گوگل",
            email: user.email,
            password: "",
            provider: "google",
            role: "USER",
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const payload = {
          userId: user._id.toString(),
          email: user.email,
          role: user.role,
        };

        // Access Token
        token.accessToken = sign(payload, process.env.JWT_SECRET!, {
          expiresIn: "60s",
        });

        // Refresh Token
        const refreshToken = sign(
          { userId: user._id.toString() },
          process.env.JWT_SECRET_REFRESH!,
          { expiresIn: "15d" }
        );

        token.refreshToken = refreshToken;

        // ذخیره در دیتابیس
        try {
          await userModel.findByIdAndUpdate(user._id, { refreshToken });
        } catch (err) {
          console.error("خطا در ذخیره refreshToken:", err);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60, // 15 روز
  },

  pages: {
    signIn: "/reg",
  },

  cookies: {
    refreshToken: {
      name: "refresh-token",
      options: {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 24 * 60 * 60,
      },
    },
  },
};
