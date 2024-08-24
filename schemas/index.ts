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
  category: z.string().optional(),
  type: z.enum(["Income", "Expense"]),
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number(),
  description: z.string().optional(),
  recurring: z.boolean(),
  frequency: z
    .enum(["Daily", "Weekly", "Monthly"], {
      message: "Please select frequency",
    })
    .optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  nextOccurrence: z.date().optional(),
  date: z.date(),
});

export const BudgetSchema = z.object({
  date: z.date(),
  month: z.coerce.number({ message: "Invalid Month!" }).min(1).max(12),
  year: z.coerce.number({ message: "Invalid format!" }),
  income: z.coerce.number().min(1),
  allocations: z.object({
    Savings: z.coerce.number().min(1).max(100),
    Needs: z.coerce.number().min(1).max(100),
    Wants: z.coerce.number().min(1).max(100),
  }),
  // FOR FUTURE FEATURES
  // subCategory: z.object({
  //   Needs: z.record(z.string(), z.coerce.number().min(1).max(100)),
  //   Wants: z.record(z.string(), z.coerce.number().min(1).max(100)),
  // }),
});
