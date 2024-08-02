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

export const getSessionByUserId = async (id: string) => {
  const session = await prisma.session.findFirst({
    where: {
      userId: id
    },
  });

  return session;
};
