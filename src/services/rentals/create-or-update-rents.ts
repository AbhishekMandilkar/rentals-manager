import { rentalFormSchema } from "@/components/add-rentals-form/rental-form-schema";
import { APIRequestParams, Resources } from "@/interfaces";
import { Prisma } from "@prisma/client";
import {
  addMonths,
  setDate,
  parseISO,
  startOfToday,
  startOfMonth,
  isAfter,
} from "date-fns";

export const createOrUpdateRents = async (params: APIRequestParams) => {
  const { prisma, userId, body } = params;
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Validate the incoming request body
    const validatedData = rentalFormSchema.parse(body);

    // Determine if this is an insert or update based on presence of ID
    const { id } = validatedData;

    const contractEndDate = addMonths(
      new Date(),
      parseInt(validatedData.numberOfContractMonths)
    );
    const rentContractEndDateWithDueMonth = setDate(
      contractEndDate,
      validatedData.rentDueDay
    ).toISOString();

    let result;
    await prisma.$transaction(
      async (tx) => {
        if (id) {
          // Update existing rent entry
          result = await tx.rent.update({
            where: {
              id: validatedData.id,
            },
            data: {
              name: validatedData.tenantName,
              phone: validatedData.phoneNumber,
              rent: validatedData.rentalAmount,
              propertyId: validatedData.propertyId,
              updatedAt: new Date(),
              userId: userId,
            },
          });
        } else {
          // Create new rent entry
          result = await tx.rent.create({
            data: {
              name: validatedData.tenantName,
              phone: validatedData.phoneNumber,
              rent: validatedData.rentalAmount,
              property: {
                connect: {
                  id: validatedData?.propertyId,
                },
              },
              userId: userId,
              isDeleted: false,
              contractEndDate: rentContractEndDateWithDueMonth,
            },
          });
          const repayments =
            createRentPaymentsForEachMonthUntilContractEndDateWithAmountAndSelectedDateOfMonth(
              {
                rentDueDay: validatedData.rentDueDay,
                rentContractEndDate: rentContractEndDateWithDueMonth,
                rentId: result.id,
                amount: validatedData.rentalAmount,
                userId: userId,
              }
            );

          await prisma.repayment.createMany({
            data: repayments,
          });
        }
      },
      {
        // wait for 3 mins
        maxWait: 180000,
        timeout: 180000,
      }
    );

    return {
      message: id
        ? "Rent entry updated successfully"
        : "Rent entry created successfully",
      data: result,
    };
  } catch {
    throw new Error("Some thing went wrong");
  }
};

const createRentPaymentsForEachMonthUntilContractEndDateWithAmountAndSelectedDateOfMonth =
  (params: {
    rentDueDay: number;
    rentContractEndDate: string;
    rentId: string;
    amount: number;
    userId: string;
  }): Prisma.repaymentCreateInput[] => {
    const { rentContractEndDate, rentId, rentDueDay, amount, userId } = params;

    if (rentDueDay < 1 || rentDueDay > 31) {
      throw new Error("Rent due day must be between 1 and 31");
    }

    const rentPaymentEntries: Prisma.repaymentCreateInput[] = [];

    const endDate = parseISO(rentContractEndDate);

    // Start from the next month after the current date
    let paymentDate = setDate(
      startOfMonth(addMonths(startOfToday(), 1)),
      rentDueDay
    );
    if (!isAfter(paymentDate, startOfToday())) {
      paymentDate = setDate(
        addMonths(startOfMonth(startOfToday()), 1),
        rentDueDay
      );
    }

    while (!isAfter(paymentDate, endDate)) {
      rentPaymentEntries.push({
        dueDate: paymentDate.toISOString(),
        amount: amount,
        resourceId: rentId,
        resourceType: Resources.RENT,
        userId,
      });

      // Move to the next month
      paymentDate = addMonths(paymentDate, 1);
    }

    return rentPaymentEntries;
  };
