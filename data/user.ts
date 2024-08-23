import { prisma } from "@/lib/prisma";

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
