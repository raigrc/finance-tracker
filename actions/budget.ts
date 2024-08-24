"use server";

import { BudgetSchema } from "@/schemas";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getBudgetThisMonth } from "@/data/budget";
import { monthNow, yearNow } from "@/lib/dates";
import { auth } from "@/auth";
import { getUserBalance } from "@/data/user";

export const budget = async (values: z.infer<typeof BudgetSchema>) => {
  const session = await auth();
  const userId = session?.user.id as string;
  const budgetData = BudgetSchema.safeParse(values);

  if (!budgetData.success) return { error: "Invalid Fields!" };
  const { date, month, year, income, allocations } = budgetData.data;

  const totalAllocation =
    allocations.Needs + allocations.Savings + allocations.Wants;
  if (totalAllocation !== 100)
    return { error: "Total % must be equal to 100!" };

  const budgetThisMonth = await getBudgetThisMonth(userId, month, year);
  if (budgetThisMonth) return { error: "You already have budget this month!" };

  const balance = (await getUserBalance(userId)) || 0;
  if (balance === null) return { error: "Cannot fetch the money" };

  if (month < monthNow && year === yearNow)
    return { error: "You cannot add budget on the past month!" };

  try {
    await prisma.budget.create({
      data: {
        userId,
        date,
        month,
        year,
        income,
        allocations,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        totalMoney: balance + income,
      },
    });
    return { success: "Successfully added budget" };
  } catch (error) {
    console.error("an error has occured", error);
  }
};
