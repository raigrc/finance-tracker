import NextAuth, { User, type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import authConfig from "@/auth.config";
import { Budget, UserRole } from "@prisma/client";
import {
  getBudgetByUserId,
  getSessionByUserId,
  getUserById,
} from "./data/user";
import { v4 as uuidv4 } from "uuid";
import { BudgetSummary } from "./types";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
      totalMoney: GLfloat;
      budget?: BudgetSummary;
    } & DefaultSession["user"];
  }
  // interface User {
  //   role: UserRole;
  // }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token as any;

      if (!token.sub) return session;

      const userBudget = await getBudgetByUserId(token.sub);
      session.user.budget = userBudget as BudgetSummary;

      console.log(session);
      return session;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
});
