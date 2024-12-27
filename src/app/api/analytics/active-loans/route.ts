import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  const activeLoansCount = await prisma.loan.count({
    where: {
      status: "ACTIVE",
      isDeleted: false,
    },
  });

  return new NextResponse(JSON.stringify({ count: activeLoansCount }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}