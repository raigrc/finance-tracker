"use server";

import { BudgetSchema } from "@/schemas";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getBudgetThisMonth } from "@/data/budget";
import { monthNow, yearNow } from "@/lib/dates";
import { getCurrentTotalMoney } from "@/data/user";

export const budget = async (values: z.infer<typeof BudgetSchema>) => {
  const budgetData = BudgetSchema.safeParse(values);

  if (!budgetData.success) return { error: "Invalid Fields!" };
  const {
    userId,
    totalAmount,
    needsPercentage,
    wantsPercentage,
    savingsPercentage,
    month,
    year,
  } = budgetData.data;
  const needsAmount = (totalAmount * needsPercentage) / 100;
  const wantsAmount = (totalAmount * wantsPercentage) / 100;
  const savingsAmount = (totalAmount * savingsPercentage) / 100;
  const totalPercentage = wantsPercentage + savingsPercentage + needsPercentage;

  if (totalPercentage !== 100)
    return { error: "Percentage must be add up to 100" };

  const existingBudgetThisMonth = await getBudgetThisMonth(userId, month, year);
  if (existingBudgetThisMonth)
    return { error: "You already have budget this month" };

  if (month < monthNow && yearNow)
    return { error: "Cannot add budget on the past month!" };

  const currentMoney = await getCurrentTotalMoney(userId);

  const overallMoney = (currentMoney?.overallMoney || 0) + totalAmount;

  try {
    await prisma.budget.create({
      data: {
        userId,
        overallMoney,
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

    const allBudget = await prisma.budget.findMany({
      where: {
        userId,
      },
    });

    console.log({ allBudget });
    console.log({ budgetData });
    return { success: "Successfully added budget!" };
  } catch {}
};
