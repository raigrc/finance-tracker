import NextAuth, { User, type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import authConfig from "@/auth.config";
import { UserRole } from "@prisma/client";
import { getSessionByUserId, getUserById } from "./data/user";
import { uuid } from "uuidv4";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
  interface User {
    role: UserRole;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  ...authConfig,
  callbacks: {
    async session({ session, token, user }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      // if (session.user && token.role) {
      //   session.user.role = token.role as UserRole;
      // }

      // console.log({ session });

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;

        const sessionToken = uuid();
        const expires = new Date(Date.now() + 30 * 24 * 60 * 60);

        if (!token.sub) return token;

        const sessionTokenData = await getSessionByUserId(token.sub);

        if (sessionTokenData) {
          await prisma.session.delete({
            where: {
              sessionToken: sessionTokenData.sessionToken,
            },
          });
        }

        await prisma.session.create({
          data: {
            sessionToken,
            userId: token.sub,
            expires,
          },
        });
        console.log({ user });

        console.log({ token });
      }

      return token;
    },
  },
});
