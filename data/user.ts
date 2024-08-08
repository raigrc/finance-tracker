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
