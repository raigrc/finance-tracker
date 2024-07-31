"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const formData = RegisterSchema.safeParse(values);

  if (!formData.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password, name } = formData.data;

  const hashPassword = await bcryptjs.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashPassword,
      name,
    },
  });

  return { success: "Registration successful!" };
};
