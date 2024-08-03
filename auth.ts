import NextAuth, { User, type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import authConfig from "@/auth.config";
import { UserRole } from "@prisma/client";
import { getSessionByUserId, getUserById } from "./data/user";
import { v4 as uuidv4 } from "uuid";

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
  },
  ...authConfig,
  callbacks: {
    async session({ session, token, user }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user && token.role) {
        session.user.role = token.role as UserRole;
      }

      session.expires = token.expires as Date & string;

      console.log({ session });

      return session;
    },
    async jwt({ token, user }) {
      const now = new Date();
      const expires = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
      );
      if (user) {
        token.sub = user.id;
        token.role = user.role;

        console.log({ expires });

        token.iat = Math.floor(Date.now() / 1000);
        token.exp = Math.floor(expires.getTime() / 1000);

        if (!token.sub) return token;

        const sessionToken = uuidv4();
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

        token.expires = expires;

        if (token.exp && Date.now() / 1000 > token.exp) {
          // await prisma.session.deleteMany({});
          return {};
        }

        console.log({ userData: user });
      }

      console.log({ token, expires });

      return token;
    },
  },
});
