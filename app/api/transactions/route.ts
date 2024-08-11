import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// Handle GET requests
export async function GET(req: NextRequest) {
  const session = await auth();
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page"));

  console.log(`Received page number in API: ${page}`);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const transactions = await prisma.transaction.findMany({
    where: { userId: session.user.id },
    skip: (page - 1) * 10,
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  const totalTransactions = await prisma.transaction.count({
    where: { userId: session.user.id },
  });

  return NextResponse.json({
    transactions,
    total: totalTransactions,
    totalPages: Math.ceil(totalTransactions / 10),
    page,
  });
}
