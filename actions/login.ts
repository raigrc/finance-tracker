"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const formData = LoginSchema.safeParse(values);

  if (!formData.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = formData.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: "Success Login!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid credentials!" };
        }
        default: {
          return { error: "Something went wrong!" };
        }
      }
    }
  }
};
