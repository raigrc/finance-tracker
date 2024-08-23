import { auth } from "@/auth";
import { getBudgetThisMonth } from "@/data/budget";
import { transactionsPerCategory } from "@/data/transactions";
import { monthNow, yearNow } from "@/lib/dates";
import { prisma } from "@/lib/prisma";
import { Allocations } from "@/types";
import { NextResponse } from "next/server";

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
    const savingAllocation = allocations?.Savings;
    if (!savingAllocation) {
      return NextResponse.json(
        { error: "Allocation not found" },
        { status: 404 },
      );
    }

    //GET AGGREGATED TRANSACTIONS, CATEGORY = SAVINGS
    const savingsTransaction = await transactionsPerCategory(
      userId,
      monthNow,
      yearNow,
      "Savings",
    );
    const savingsThisMonth =
      (incomeThisMonth * savingAllocation) / 100 - savingsTransaction;

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
