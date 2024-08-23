import { BudgetSummary } from "@/types";
import { prisma } from "@/lib/prisma";

// export const getTotalBudgetByUserId = async (
//   id: string,
// ): Promise<BudgetSummary> => {
//   const budgets = await prisma.budget.findMany({
//     where: {
//       userId: id,
//     },
//   });

//   const totalAmount = budgets.reduce(
//     (sum, budget) => sum + budget.totalAmount,
//     0,
//   );
//   const totalSavings = budgets.reduce(
//     (sum, budget) => sum + budget.savingsAmount,
//     0,
//   );
//   const totalNeeds = budgets.reduce(
//     (sum, budget) => sum + budget.needsAmount,
//     0,
//   );
//   const totalWants = budgets.reduce(
//     (sum, budget) => sum + budget.wantsAmount,
//     0,
//   );

//   return { ...budgets, totalAmount, totalSavings, totalNeeds, totalWants };
// };

// export const getAllBudgetByUserId = async (id: string) => {
//   const allBudget = await prisma.budget.findMany({
//     where: {
//       userId: id,
//     },
//     orderBy: [{ year: "asc" }, { month: "asc" }],
//   });

//   return allBudget;
// };

export const getBudgetThisMonth = async (
  id: string | undefined,
  month: number,
  year: number,
) => {
  const budgetThisMonth = await prisma.budget.findFirst({
    where: {
      userId: id,
      month,
      year,
    },
  });
  return budgetThisMonth;
};

export const getBudgetCheck = async (id: string) => {
  const allBudget = await prisma.budget.findMany({
    where: {
      userId: id,
    },
    orderBy: [{ year: "asc" }, { month: "asc" }],
  });

  await new Promise((resolve) => setTimeout(resolve, 10000));

  return allBudget;
};
