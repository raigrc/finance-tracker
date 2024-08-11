import { prisma } from "@/lib/prisma";
import { PaginationProps } from "@/types";
import Link from "next/link";

export const updateIncomeNeeds = async (id: string, amount: number) => {
  const incomeNeeds = await prisma.budget.update({
    where: {
      id,
    },
    data: {
      needsAmount: { increment: amount },
      totalAmount: { increment: amount },
      overallMoney: { increment: amount },
    },
  });

  return incomeNeeds;
};
export const updateIncomeSavings = async (id: string, amount: number) => {
  const incomeSavings = await prisma.budget.update({
    where: {
      id,
    },
    data: {
      savingsAmount: { increment: amount },
      totalAmount: { increment: amount },
      overallMoney: { increment: amount },
    },
  });
  return incomeSavings;
};
export const updateIncomeWants = async (id: string, amount: number) => {
  const incomeWants = await prisma.budget.update({
    where: {
      id,
    },
    data: {
      wantsAmount: { increment: amount },
      totalAmount: { increment: amount },
      overallMoney: { increment: amount },
    },
  });
  return incomeWants;
};

export const updateExpenseNeeds = async (id: string, amount: number) => {
  const expenseNeeds = await prisma.budget.update({
    where: {
      id,
    },
    data: {
      needsAmount: { decrement: amount },
      totalAmount: { decrement: amount },
      overallMoney: { decrement: amount },
    },
  });
  return expenseNeeds;
};
export const updateExpenseSavings = async (id: string, amount: number) => {
  const expenseSavings = await prisma.budget.update({
    where: {
      id,
    },
    data: {
      savingsAmount: { decrement: amount },
      totalAmount: { decrement: amount },
      overallMoney: { decrement: amount },
    },
  });
  return expenseSavings;
};
export const updateExpenseWants = async (id: string, amount: number) => {
  const expenseWants = await prisma.budget.update({
    where: {
      id,
    },
    data: {
      wantsAmount: { decrement: amount },
      totalAmount: { decrement: amount },
      overallMoney: { decrement: amount },
    },
  });

  return expenseWants;
};

export const increaseTotalMoney = async (id: string, amount: number) => {
  const updateTotal = await prisma.budget.update({
    where: {
      id,
    },
    data: {
      overallMoney: { decrement: amount },
    },
  });

  return updateTotal;
};

export const decreaseTotalMoney = async (id: string, amount: number) => {
  const updateTotal = await prisma.budget.update({
    where: {
      id,
    },
    data: {
      overallMoney: { decrement: amount },
    },
  });

  return updateTotal;
};

export const getAllTransactionsByUserId = async (id: string) => {
  const allTransactions = await prisma.transaction.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return allTransactions;
};

export const getTenTransactionsByUserId = async (id: string, page: number) => {
  const transactions = await prisma.transaction.findMany({
    where: { userId: id },
    skip: (page - 1) * 10,
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  const totalTransactions = await prisma.transaction.count({
    where: {
      userId: id,
    },
  });

  return {
    transactions,
    total: totalTransactions,
    totalPages: Math.ceil(totalTransactions / 10),
  };
};
