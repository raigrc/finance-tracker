"use server";

import { BudgetSchema } from "@/schemas";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { error } from "console";

export const budget = async (values: z.infer<typeof BudgetSchema>) => {
  const budgetData = BudgetSchema.safeParse(values);

  if (!budgetData.success) return { error: "Invalid Fields!" };
  const {
    userId,
    totalAmount,
    needsPercentage,
    wantsPercentage,
    savingsPercentage,
    needsAmount,
    wantsAmount,
    savingsAmount,
    month,
    year,
  } = budgetData.data;

  await prisma.budget.create({
    data: {
      userId,
      totalAmount,
      needsPercentage,
      wantsPercentage,
      savingsPercentage,
      needsAmount,
      wantsAmount,
      savingsAmount,
      month,
      year,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const allBudget = await prisma.budget.findMany({
    where: {
      userId,
    },
  });

  console.log(allBudget);

  if (!user || !user.totalMoney) {
    return { error: "User not found" };
  }
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      totalMoney: user?.totalMoney + totalAmount,
    },
  });
  console.log(budgetData);
};
