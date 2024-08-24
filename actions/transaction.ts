"use server";

import { TransactionSchema } from "@/schemas";
import { z } from "zod";
import { getBudgetThisMonth } from "@/data/budget";
import { getUserBalance } from "@/data/user";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { calculateNextOccurence } from "@/lib/calculate-next-occurence";

export const transaction = async (
  values: z.infer<typeof TransactionSchema>,
) => {
  const session = await auth();
  const userId = session?.user.id as string;
  if (!session?.user && userId) return { error: "Unauthorized!" };
  const transactionData = TransactionSchema.safeParse(values);

  if (!transactionData.success) return { error: "Invalid Fields!" };
  console.log({ transactionData });
  const {
    date,
    amount,
    category,
    type,
    month,
    year,
    description,
    recurring,
    frequency,
    startDate,
    endDate,
    nextOccurrence,
  } = transactionData.data;

  const budgetThisMonth = await getBudgetThisMonth(userId, month, year);
  const balance = await getUserBalance(userId);
  if (!balance) return { error: "Cannot fetch the money" };

  let next = nextOccurrence;
  next = calculateNextOccurence(startDate as Date, frequency as string);
  try {
    if (budgetThisMonth) {
      const budgetId = budgetThisMonth.id;
      const income = budgetThisMonth.income;

      await prisma.transaction.create({
        data: {
          userId,
          amount,
          category,
          type,
          month,
          year,
          description,
          isRecurring: recurring,
          frequency,
          startDate,
          endDate,
          nextOccurrence: next,
          date,
        },
      });
      if (type === "Income") {
        await prisma.user.update({
          where: { id: userId },
          data: {
            totalMoney: balance + amount,
          },
        });

        await prisma.budget.update({
          where: { id: budgetId },
          data: { income: income + amount },
        });
      } else if (type === "Expense") {
        await prisma.user.update({
          where: { id: userId },
          data: {
            totalMoney: balance - amount,
          },
        });
      } else {
        return { error: "Invalid type input!" };
      }

      return { success: "Successfully added transaction" };
    } else {
      return { error: "There is no budget this month!" };
    }
  } catch (error) {
    console.error("An error has occured!", error);
  }
};
