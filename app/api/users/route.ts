import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const users = await prisma.user.findMany({});

  return NextResponse.json({ users });
};
