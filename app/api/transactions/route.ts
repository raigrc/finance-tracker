import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// Handle GET requests
export async function GET(req: NextRequest) {
  const session = await auth();
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page")) || 1;

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const hideNeeds = url.searchParams.get("needs");
  const hideWants = url.searchParams.get("wants");
  const hideSavings = url.searchParams.get("savings");
  const hideIncome = url.searchParams.get("income");
  const hideExpense = url.searchParams.get("expense");

  const whereClause: any = { userId: session.user.id };

  if (hideNeeds) whereClause.category = { not: "Needs" };
  if (hideWants) whereClause.category = { not: "Wants" };
  if (hideSavings) whereClause.category = { not: "Savings" };
  if (hideIncome) whereClause.type = { not: "INCOME" };
  if (hideExpense) whereClause.type = { not: "EXPENSE" };

  const transactions = await prisma.transaction.findMany({
    where: whereClause,
    skip: (page - 1) * 10,
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  const totalTransactions = await prisma.transaction.count({
    where: whereClause,
  });

  return NextResponse.json({
    transactions,
    total: totalTransactions,
    totalPages: Math.ceil(totalTransactions / 10),
  });
}
