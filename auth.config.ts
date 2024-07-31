import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default { providers: [
  Credentials
] } satisfies NextAuthConfig;
