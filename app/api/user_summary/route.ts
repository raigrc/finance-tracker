import { auth } from "@/auth";
import { getBudgetThisMonth } from "@/data/budget";
import { transactionsPerCategory } from "@/data/transactions";
import { calculateNextOccurence } from "@/lib/calculate-next-occurence";
import { monthNow, yearNow } from "@/lib/dates";
import { prisma } from "@/lib/prisma";
import { Allocations } from "@/types";
import { isAfter, isBefore, isSameDay } from "date-fns";
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
    const userData = await prisma.user.findUnique({
      where: { id: userId },
    });
    const balance = userData?.totalMoney;

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
        userId,
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
    // const budget = await getBudgetThisMonth(userId, monthNow, yearNow);
    const budget = await prisma.budget.findFirst({
      where: { userId, month: monthNow, year: yearNow },
    });

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

    const recurringTransactions = await prisma.transaction.findMany({
      where: {
        userId,
        isRecurring: true,
        nextOccurrence: { lte: new Date() },
      },
    });

    for (const transaction of recurringTransactions) {
      const {
        id,
        userId,
        amount,
        category,
        type,
        description,
        frequency,
        nextOccurrence,
        endDate,
        month,
        year,
      } = transaction;
      await prisma.transaction.create({
        data: {
          userId,
          amount,
          category,
          type,
          description,
          startDate: nextOccurrence,
          endDate,
          nextOccurrence,
          date: new Date(),
        },
      });

      const newNextOccurrence = calculateNextOccurence(
        nextOccurrence!,
        frequency!,
      );

      await prisma.transaction.update({
        where: { id },
        data: {
          nextOccurrence: newNextOccurrence,
        },
      });

      const newBalance =
        transaction.type == "Income" ? balance! + amount : balance! - amount;

      const newBudget =
        transaction.type == "Income" ? budget?.income! + amount : null;

      const budgetThisTransaction = await getBudgetThisMonth(
        userId,
        month!,
        year!,
      );

      await prisma.$transaction([
        prisma.user.update({
          where: { id: userId },
          data: {
            totalMoney: newBalance,
          },
        }),

        prisma.budget.update({
          where: { id: budgetThisTransaction?.id },
          data: {
            income: newBudget!,
          },
        }),
      ]);
    }

    return NextResponse.json({
      balance,
      income: incomeThisMonth,
      expenses: expenseThisMonth,
      savings: savingsThisMonth,
    });
  } catch (error) {
    console.error("Error fetching user data", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
