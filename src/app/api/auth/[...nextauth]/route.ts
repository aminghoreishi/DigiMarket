import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/config/db";
import userModel from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // اگر می‌خواهی با ایمیل/رمز هم کار کند
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
        // بررسی رمز (با bcrypt)
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await db();

      // اگه با گوگل اومده
      if (account?.provider === "google") {
        const existingUser = await userModel.findOne({ email: user.email });
        if (!existingUser) {
          await userModel.create({
            fullName: user.name,
            email: user.email,
            password: "", // چون گوگل رمز ندارد
          });
        }
      }

      return true;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/login", // در صورت تمایل
  },
});

export { handler as GET, handler as POST };
