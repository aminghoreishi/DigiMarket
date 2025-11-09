import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/config/db";
import userModel from "@/models/user";
import { sign } from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await db();
        const user = await userModel.findOne({ email: credentials?.email });
        if (!user) throw new Error("کاربر یافت نشد");
        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await db();
      if (account?.provider === "google") {
        const existingUser = await userModel.findOne({ email: user.email });
        if (!existingUser) {
          await userModel.create({
            fullName: user.name,
            email: user.email,
            password: "",
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.accessToken = sign(
          { email: user.email, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn: "60s" }
        );

        token.refreshToken = sign(
          { email: user.email },
          process.env.JWT_SECRET_REFRESH!,
          { expiresIn: "15d" }
        );
      }
      return token;
    },

    async session({ session, token, response }) {
      if (token.accessToken && token.refreshToken) {
        response?.cookies.set("token", token.accessToken as string, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60,
        });

        response?.cookies.set("refresh-token", token.refreshToken as string, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60, 
        });
      }

      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },

  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
      },
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};
