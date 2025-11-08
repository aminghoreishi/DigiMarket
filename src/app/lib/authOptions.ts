import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/config/db";
import userModel from "@/models/user";

export const authOptions = {
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
    async session({ session }) {
      return session;
    },
  },
};
