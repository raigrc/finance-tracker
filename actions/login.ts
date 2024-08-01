"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const formData = LoginSchema.safeParse(values);

  if (!formData.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = formData.data;

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard"
  });

  return { success: "Success Login!" };
};
