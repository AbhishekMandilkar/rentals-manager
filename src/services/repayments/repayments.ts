import prisma from "@/lib/prisma";

export const getResourceRepayments = async ({
  resourceId,
  resourceType,
  userId,
}: {
  resourceId: string;
  resourceType: string;
  userId: string;
}) => {
  const repayments = await prisma.repayment.findMany({
    where: {
      resourceId,
      resourceType,
      userId,
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      dueDate: true,
      amount: true,
      resourceId: true,
    },
  });

  return repayments;
};

export const getResourceRepaymentsMap = async ({
  resourceIds,
  resourceType,
  userId,
}: {
  resourceIds: string[];
  resourceType: string;
  userId: string;
}) => {
  const repayments = await prisma.repayment.findMany({
    where: {
      resourceId: {
        in: resourceIds,
      },
      resourceType: resourceType,
      userId,
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      dueDate: true,
      amount: true,
      resourceId: true,
    },
  });
  const repaymentMap = new Map<string, typeof repayments>();

  repayments.forEach((repayment) => {
    if (repaymentMap.has(repayment.resourceId)) {
      const existingRepayment = repaymentMap.get(repayment.resourceId) || [];
      existingRepayment?.push(repayment);
      repaymentMap.set(repayment.resourceId, existingRepayment);
    } else {
      repaymentMap.set(repayment.resourceId, [repayment]);
    }
  });

  return repaymentMap;
};
