import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import bcryptjs from "bcryptjs";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
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
