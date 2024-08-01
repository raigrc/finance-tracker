import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import bcryptjs from "bcryptjs";
import { prisma } from "./lib/prisma";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const formData = LoginSchema.safeParse(credentials);

        if (formData.success) {
          const { email, password } = formData.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordMatched = await bcryptjs.compare(
            password,
            user.password,
          );

          if (passwordMatched) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
