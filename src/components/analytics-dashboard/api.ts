import { startOfMonth } from "date-fns";
import prisma from "@/lib/prisma";

const monthlyIncomePromise = (userId: string) =>
  new Promise<number | null>(async (resolve) => {
    const startOfCurrentMonth = startOfMonth(new Date());
    const endOfCurrentMonth = new Date(startOfCurrentMonth);

    const repayments = await prisma.repayment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        dueDate: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
        isDeleted: false,
        userId: userId,
      },
    });
    resolve(repayments._sum.amount);
  });

const rentedShops = (userId: string) => {
  return prisma.properties.count({
    where: {
      userId: userId,
      rent: {
        some: {
          isDeleted: false,
        },
      },
    },
  });
};

const fetchAnalytics = async (userId: string) => {
  const resp = await Promise.all([
    prisma.loan.count({
      where: {
        status: "ACTIVE",
        isDeleted: false,
        userId: userId,
      },
    }),
    prisma?.repayment?.count({
      where: {
        dueDate: {
          lt: new Date(),
        },
        paidAt: null,
        isDeleted: false,
        userId: userId,
      },
    }),
    monthlyIncomePromise(userId),
    rentedShops(userId),
  ]);
  console.log(resp);
  return resp;
};

export default fetchAnalytics;
