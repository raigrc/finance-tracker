import { auth } from "@/auth";
import { monthNow, yearNow } from "@/lib/dates";
import { prisma } from "@/lib/prisma";
import { Allocations } from "@/types";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await auth();
  try {
    //GET USER FOR TOTAL MONEY OR BALANCE
    const user = await prisma.user.findFirst({
      where: { id: session?.user.id },
    });

    const balance = user?.totalMoney;

    //GET INCOME
    const incomeData = await prisma.budget.aggregate({
      where: { userId: session?.user.id, month: monthNow, year: yearNow },
      _sum: {
        income: true,
      },
    });
    const incomeThisMonth = incomeData._sum.income || 0;

    //GET SAVINGS
    const budget = await prisma.budget.findFirst({
      where: { userId: session?.user.id, month: monthNow, year: yearNow },
    });

    const allocations = budget?.allocations as Allocations | undefined;
    const savingAllocation = allocations?.Savings;

    if (!savingAllocation) {
      return NextResponse.json(
        { error: "Allocation not found" },
        { status: 404 },
      );
    }

    const savingsThisMonth = (incomeThisMonth * savingAllocation) / 100;

    return NextResponse.json({
      balance,
      income: incomeThisMonth,
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
