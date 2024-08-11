import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page")) || 1;

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const budgets = await prisma.budget.findMany({
    where: { userId: session.user.id },
    take: 10,
    skip: (page - 1) * 10,
    orderBy: [{ month: "asc" }, { year: "asc" }],
  });

  const totalBudget = await prisma.budget.count({
    where: { userId: session.user.id },
  });

  return NextResponse.json({
    budgets,
    total: totalBudget,
    totalPages: Math.ceil(totalBudget / 10),
    page,
  });
}
