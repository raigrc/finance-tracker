"use server";

import { BudgetSchema } from "@/schemas";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getBudgetThisMonth } from "@/data/budget";
import { monthNow, yearNow } from "@/lib/dates";
import { getCurrentTotalMoney, getUserTotalMoney } from "@/data/user";
import { auth } from "@/auth";
import { error } from "console";

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

  const user = await getUserTotalMoney(userId);
  if (!user || user?.totalMoney === null)
    return { error: "Cannot fetch the money" };

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
        totalMoney: user.totalMoney + income,
      },
    });
    return { success: "Successfully added budget" };
  } catch (error) {
    console.error("an error has occured", error);
  }

  // const {
  //   userId,
  //   totalAmount,
  //   needsPercentage,
  //   wantsPercentage,
  //   savingsPercentage,
  //   month,
  //   year,
  // } = budgetData.data;
  // const needsAmount = (totalAmount * needsPercentage) / 100;
  // const wantsAmount = (totalAmount * wantsPercentage) / 100;
  // const savingsAmount = (totalAmount * savingsPercentage) / 100;
  // const totalPercentage = wantsPercentage + savingsPercentage + needsPercentage;

  // if (totalPercentage !== 100)
  //   return { error: "Percentage must be add up to 100" };

  // const existingBudgetThisMonth = await getBudgetThisMonth(userId, month, year);
  // if (existingBudgetThisMonth)
  //   return { error: "You already have budget this month" };

  // if (month < monthNow && year == yearNow)
  //   return { error: "Cannot add budget on the past month!" };

  // const currentMoney = await getCurrentTotalMoney(userId);
  // const overallMoney = (currentMoney?.overallMoney || 0) + totalAmount;

  // try {
  //   await prisma.budget.create({
  //     data: {
  //       userId,
  //       overallMoney,
  //       totalAmount,
  //       needsPercentage,
  //       wantsPercentage,
  //       savingsPercentage,
  //       needsAmount,
  //       wantsAmount,
  //       savingsAmount,
  //       month,
  //       year,
  //     },
  //   });

  //   const allBudget = await prisma.budget.findMany({
  //     where: {
  //       userId,
  //     },
  //   });

  //   console.log({ allBudget });
  //   console.log({ budgetData });
  //   return { success: "Successfully added budget!" };
  // } catch {}
};
