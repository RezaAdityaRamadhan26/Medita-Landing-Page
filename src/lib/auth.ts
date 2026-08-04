import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@medita.com" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        // If OTP is provided, verify 6-digit code for 2FA login
        if (credentials.otp) {
          if (!user.otpCode || user.otpCode !== credentials.otp) {
            return null;
          }
          if (!user.otpExpiresAt || new Date() > user.otpExpiresAt) {
            return null;
          }

          // Clear OTP after successful verification
          await prisma.user.update({
            where: { id: user.id },
            data: { otpCode: null, otpExpiresAt: null },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        // We require OTP verification for admin login
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-key-for-dev",
};
