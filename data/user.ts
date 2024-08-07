import { prisma } from "@/lib/prisma";
import { BudgetSummary } from "@/types";
import { Budget } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return user;
};

export const getSessionByUserId = async (id: string) => {
  const session = await prisma.session.findFirst({
    where: {
      userId: id,
    },
  });

  return session;
};

export const getTotalBudgetByUserId = async (
  id: string,
): Promise<BudgetSummary> => {
  const budgets = await prisma.budget.findMany({
    where: {
      userId: id,
    },
  });

  const totalAmount = budgets.reduce(
    (sum, budget) => sum + budget.totalAmount,
    0,
  );
  const totalSavings = budgets.reduce(
    (sum, budget) => sum + budget.savingsAmount,
    0,
  );
  const totalNeeds = budgets.reduce(
    (sum, budget) => sum + budget.needsAmount,
    0,
  );
  const totalWants = budgets.reduce(
    (sum, budget) => sum + budget.wantsAmount,
    0,
  );

  return { ...budgets, totalAmount, totalSavings, totalNeeds, totalWants };
};

export const getAllBudgetByUserId = async (id: string) => {
  const allBudget = await prisma.budget.findMany({
    where: {
      userId: id,
    },
    orderBy: [{ year: "asc" }, { month: "asc" }],
  });
  return allBudget;
};

export const getBudgetThisMonth = async (month: number) => {
  const budgetThisMonth = await prisma.budget.findFirst({
    where: {
      month,
    },
  });
  return budgetThisMonth;
};
