import prisma from "@/lib/prisma";

export async function GET() {
  const overduePaymentsCount = await prisma?.repayment?.count({
    where: {
      dueDate: {
        lt: new Date(),
      },
      paidAt: null,
      isDeleted: false,
    },
  });

  return new Response(JSON.stringify({ count: overduePaymentsCount }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}