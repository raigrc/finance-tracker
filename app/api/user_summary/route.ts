import { auth } from "@/auth";
import { getBudgetThisMonth } from "@/data/budget";
import { transactionsPerCategory } from "@/data/transactions";
import { monthNow, yearNow } from "@/lib/dates";
import { prisma } from "@/lib/prisma";
import { Allocations } from "@/types";
import {
  addMonths,
  addWeeks,
  Day,
  differenceInWeeks,
  eachMonthOfInterval,
  eachWeekOfInterval,
  format,
  getDate,
  getDay,
  getISODay,
  getWeeksInMonth,
  isAfter,
  isBefore,
  isSameDay,
  nextDay,
  startOfWeek,
} from "date-fns";
import { NextResponse } from "next/server";
//TODO: MAKE ONE PRISMA CALL, INCLUDE ALL
export const GET = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
  }

  const userId = session.user.id;
  try {
    //GET USER FOR TOTAL MONEY OR BALANCE
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    const balance = user?.totalMoney;

    //GET INCOME
    const incomeData = await prisma.budget.aggregate({
      where: { userId, month: monthNow, year: yearNow },
      _sum: {
        income: true,
      },
    });
    const incomeThisMonth = incomeData._sum.income || 0;

    //GET EXPENSES
    const expenseData = await prisma.transaction.aggregate({
      where: {
        userId: userId,
        month: monthNow,
        year: yearNow,
        type: "Expense",
      },
      _sum: {
        amount: true,
      },
    });
    const expenseThisMonth = expenseData._sum.amount || 0;

    //GET SAVINGS
    const budget = await getBudgetThisMonth(userId, monthNow, yearNow);
    const allocations = budget?.allocations as Allocations | undefined;
    const savingAllocation = allocations?.Savings || 0;

    //GET AGGREGATED TRANSACTION AMOUNT, CATEGORY = SAVINGS
    const savingsTransaction = await transactionsPerCategory(
      userId,
      monthNow,
      yearNow,
      "Savings",
    );
    const savingsThisMonth =
      (incomeThisMonth * savingAllocation) / 100 - savingsTransaction;

    // //TODO: recurring transactions logic
    const transactions = await prisma.transaction.findMany({
      where: { userId, isRecurring: true },
    });

    const recurrinngTransactions = transactions.map((transaction) => {
      let dates: Date[] = [];
      let startDate = new Date(transaction.startDate as Date);
      const endDate = new Date(transaction.endDate as Date);

      switch (transaction.frequency) {
        case "Weekly": {
          while (isBefore(startDate, endDate)) {
            dates.push(startDate);
            startDate = addWeeks(startDate, 1);
          }
          break;
        }
        case "Monthly": {
          while (isBefore(startDate, endDate)) {
            dates.push(new Date(startDate));
            startDate = addMonths(startDate, 1);
          }
          break;
        }
      }
      return { dates };
    });

    // const recurringTransactions = transactions.map((transaction) => {
    //   let datesToProcess: Date[] = [];
    //   const today = new Date();
    //   const { frequency, startDate, amount, endDate, type } = transaction;

    //   switch (frequency) {
    //     case "Weekly": {
    //       while (isBefore(startDate as Date, endDate as Date)) {
    //         datesToProcess.map((dates) => addWeeks(dates, 1));
    //       }
    //       break;
    //     }
    //     case "Monthly": {
    //       datesToProcess = eachMonthOfInterval({
    //         start: startDate as Date,
    //         end: endDate as Date,
    //       });
    //       break;
    //     }
    //   }
    //   return datesToProcess;
    // });

    return NextResponse.json({
      balance,
      income: incomeThisMonth,
      expenses: expenseThisMonth,
      savings: savingsThisMonth,
      transactions,
      recurrinngTransactions,
    });
  } catch (error) {
    console.error("Error fetching user data", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
