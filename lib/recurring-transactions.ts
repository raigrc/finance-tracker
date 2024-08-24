import { auth } from "@/auth";
import { prisma } from "./prisma";
import { error } from "console";
import { eachWeekOfInterval } from "date-fns";

export const processRecurringTransactions = async () => {
  const session = await auth();
  if (!session || !session.user) return { error: "Unauthorized!" };

  const transactions = await prisma.transaction.findMany({
    where: { userId: session.user.id, isRecurring: true },
  });

  for (const transaction of transactions) {
    const { frequency, startDate, endDate, amount, type } = transaction;
    let datesToProcess = [];

    if (frequency === "Weekly") {
      datesToProcess = eachWeekOfInterval({
        start: startDate as Date,
        end: endDate as Date,
      });

      console.log(datesToProcess);
    }
  }
};
