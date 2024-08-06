import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Passowrd is required" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must be less than 32 characters" })
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

export const TransactionSchema = z.object({
  amount: z.coerce
    .number({ message: "Invalid format!" })
    .min(1, { message: "Amount is required" }),
  category: z.string({ message: "Category is required!" }),
  type: z.enum(["INCOME", "EXPENSE"]),
  description: z.string().optional(),
});

export const BudgetSchema = z
  .object({
    userId: z.string(),
    totalAmount: z.coerce.number().min(1),
    needsPercentage: z.coerce.number(),
    wantsPercentage: z.coerce.number(),
    savingsPercentage: z.coerce.number(),
    needsAmount: z.coerce.number(),
    wantsAmount: z.coerce.number(),
    savingsAmount: z.coerce.number(),
    month: z.coerce.number().min(1).max(12),
    year: z.coerce.number(),
  })
  .refine(
    (data) =>
      data.needsPercentage + data.savingsPercentage + data.wantsPercentage ===
      100,
    {
      message: "Percentage must be add up to 100",
      path: ["needsPercentage", "savingsPercentage", "wantsPercentage"],
    },
  );
