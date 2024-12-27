import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET() {
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