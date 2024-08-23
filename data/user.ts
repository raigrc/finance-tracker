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

export const getCurrentTotalMoney = async (id: string) => {
  const currentTotal = await prisma.budget.findFirst({
    where: {
      userId: id,
    },
    orderBy: { createdAt: "desc" },
  });

  return currentTotal;
};

export const getUserBalance = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    orderBy: { createdAt: "desc" },
  });

  const balance = user?.totalMoney;
  return balance;
};

export const getUserIncome = async (
  id: string,
  month: number,
  year: number,
) => {
  const user = await prisma.budget.findFirst({
    where: { userId: id, month, year },
  });

  const income = user?.income;

  return income;
};
