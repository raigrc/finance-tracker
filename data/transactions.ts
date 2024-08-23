import { prisma } from "@/lib/prisma";

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

export const transactionsPerCategory = async (
  id: string | undefined,
  month: number,
  year: number,
  category: string,
) => {
  const transactionData = await prisma.transaction.aggregate({
    where: { userId: id, month, year, category },
    _sum: {
      amount: true,
    },
  });

  return transactionData._sum.amount || 0;
};
