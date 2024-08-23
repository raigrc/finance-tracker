"use server";

import { TransactionSchema } from "@/schemas";
import { z } from "zod";
import { getBudgetThisMonth } from "@/data/budget";
import { getUserBalance } from "@/data/user";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

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
  } = transactionData.data;

  const budgetThisMonth = await getBudgetThisMonth(userId, month, year);
  const balance = await getUserBalance(userId);
  if (!balance) return { error: "Cannot fetch the money" };

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

  // const budgetThisMonth = await getBudgetThisMonth(userId, month, year);
  // if (!budgetThisMonth) {
  //   return { error: "Cannot find budget for this month!" };
  // }

  // const currentMoney = await getCurrentTotalMoney(userId);

  // if (!currentMoney) return { error: "Cannot find budget for this month!" };

  // try {
  //   if (type == "INCOME") {
  //     switch (category) {
  //       case "Needs": {
  //         await updateIncomeNeeds(budgetThisMonth.id, amount);
  //         await increaseTotalMoney(currentMoney.id, amount);
  //         break;
  //       }
  //       case "Savings": {
  //         await updateIncomeSavings(budgetThisMonth.id, amount);
  //         await increaseTotalMoney(currentMoney.id, amount);
  //         break;
  //       }
  //       case "Wants": {
  //         await updateIncomeWants(budgetThisMonth.id, amount);
  //         await increaseTotalMoney(currentMoney.id, amount);
  //         break;
  //       }
  //       default: {
  //         return { error: "Category Error!" };
  //       }
  //     }

  //     await prisma.transaction.create({
  //       data: {
  //         userId,
  //         amount,
  //         category,
  //         type,
  //         month,
  //         year,
  //         description,
  //       },
  //     });
  //   } else {
  //     switch (category) {
  //       case "Needs": {
  //         if (budgetThisMonth.needsAmount < amount)
  //           return {
  //             error: "Your budget this month cannot afford what you want!",
  //           };
  //         await updateExpenseNeeds(budgetThisMonth.id, amount);
  //         await decreaseTotalMoney(currentMoney.id, amount);
  //         break;
  //       }
  //       case "Savings": {
  //         if (budgetThisMonth.savingsAmount < amount)
  //           return {
  //             error: "Your budget this month cannot afford what you want!",
  //           };
  //         await updateExpenseSavings(budgetThisMonth.id, amount);
  //         await decreaseTotalMoney(currentMoney.id, amount);
  //         break;
  //       }
  //       case "Wants": {
  //         if (budgetThisMonth.wantsAmount < amount)
  //           return {
  //             error: "Your budget this month cannot afford what you want!",
  //           };
  //         await updateExpenseWants(budgetThisMonth.id, amount);
  //         await decreaseTotalMoney(currentMoney.id, amount);
  //         break;
  //       }
  //       default: {
  //         return { error: "Category Error!" };
  //       }
  //     }

  //     await prisma.transaction.create({
  //       data: {
  //         userId,
  //         amount: -amount,
  //         category,
  //         type,
  //         month,
  //         year,
  //         description,
  //       },
  //     });
  //   }

  //   return { success: "Successful adding transaction!" };
  // } catch {}

  // console.log(transactionData);
};
