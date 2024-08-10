"use server";

import { TransactionSchema } from "@/schemas";
import { z } from "zod";
import { getBudgetThisMonth } from "@/data/budget";
import { getCurrentTotalMoney } from "@/data/user";
import {
  decreaseTotalMoney,
  increaseTotalMoney,
  updateExpenseNeeds,
  updateExpenseSavings,
  updateExpenseWants,
  updateIncomeNeeds,
  updateIncomeSavings,
  updateIncomeWants,
} from "@/data/transactions";
import { prisma } from "@/lib/prisma";
import { error } from "console";

export const transaction = async (
  values: z.infer<typeof TransactionSchema>,
) => {
  const transactionData = TransactionSchema.safeParse(values);

  if (!transactionData.success) return { error: "Invalid Fields!" };

  const { userId, amount, category, type, month, year, description } =
    transactionData.data;

  const budgetThisMonth = await getBudgetThisMonth(userId, month, year);
  if (!budgetThisMonth) return { error: "Cannot find budget for this month!" };

  const currentMoney = await getCurrentTotalMoney(userId);

  if (!currentMoney) return { error: "Cannot find budget for this month!" };

  try {
    if (type == "INCOME") {
      switch (category) {
        case "Needs": {
          await updateIncomeNeeds(budgetThisMonth.id, amount);
          await increaseTotalMoney(currentMoney.id, amount);
          break;
        }
        case "Savings": {
          await updateIncomeSavings(budgetThisMonth.id, amount);
          await increaseTotalMoney(currentMoney.id, amount);
          break;
        }
        case "Wants": {
          await updateIncomeWants(budgetThisMonth.id, amount);
          await increaseTotalMoney(currentMoney.id, amount);
          break;
        }
        default: {
          return { error: "Category Error!" };
        }
      }

      await prisma.transaction.create({
        data: {
          userId,
          amount,
          category,
          type,
          month,
          year,
          description,
        },
      });
    } else {
      switch (category) {
        case "Needs": {
          if (budgetThisMonth.needsAmount < amount)
            return {
              error: "Your budget this month cannot afford what you want!",
            };
          await updateExpenseNeeds(budgetThisMonth.id, amount);
          await decreaseTotalMoney(currentMoney.id, amount);
          break;
        }
        case "Savings": {
          if (budgetThisMonth.savingsAmount < amount)
            return {
              error: "Your budget this month cannot afford what you want!",
            };
          await updateExpenseSavings(budgetThisMonth.id, amount);
          await decreaseTotalMoney(currentMoney.id, amount);
          break;
        }
        case "Wants": {
          if (budgetThisMonth.wantsAmount < amount)
            return {
              error: "Your budget this month cannot afford what you want!",
            };
          await updateExpenseWants(budgetThisMonth.id, amount);
          await decreaseTotalMoney(currentMoney.id, amount);
          break;
        }
        default: {
          return { error: "Category Error!" };
        }
      }

      await prisma.transaction.create({
        data: {
          userId,
          amount: -amount,
          category,
          type,
          month,
          year,
          description,
        },
      });
    }

    return { success: "Successful adding transaction!" };
  } catch {}

  console.log(transactionData);
};
