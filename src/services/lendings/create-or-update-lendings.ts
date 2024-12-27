import {RepaymentMode} from "@/components/loan-form/schema";
import {Resources} from "@/interfaces";
import {Prisma, PrismaClient, repaymentMode} from "@prisma/client";
import {addMonths, startOfMonth} from "date-fns";
import {NextResponse} from "next/server";

export async function createOrUpdateLoans(req: Request, prisma: PrismaClient) {
  const data = await req.json();
  try {
    // Destructure the incoming data from the request body
    const {
      borrowerName,
      borrowerPhone,
      amount,
      interestRate,
      status,
      repaymentMode,
      repaymentDate, // For ONETIME repayment
      tenure, // Tenure in months (from frontend)
    } = data;

    // Parse inputs for calculations
    const loanAmount = parseFloat(amount);
    const rate = parseFloat(interestRate);
    const lentDate = new Date().toISOString();

    const createData: Prisma.loanCreateInput = {
      borrowerName,
      borrowerPhone,
      amount: loanAmount,
      interestRate: rate,
      dateLent: lentDate,
      status,
      repaymentMode,
      userId: req.headers.get("userId") as string,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };


    const loan = await prisma.loan.create({
      data: createData,
    });

    if (!loan) {  
      throw new Error("Loan creation failed");
    }

    const repayments = getRepaymentData({
      repaymentMode,
      loanAmount,
      rate,
      lentDate,
      tenure,
      userId: req.headers.get("userId") as string,
      repaymentDate: repaymentDate as string,
      loanId: loan.id,
    });

    console.log(repayments);

    // Create repayments
    await prisma.repayment.createMany({
      data: repayments,
      skipDuplicates: true
    });

    return NextResponse.json(loan, {
      status: 200,
    });
  } catch (err: unknown) {
    throw new Error("Failed to create or update loan", err as ErrorOptions);
  }
}

const getRepaymentData = (params: {
  repaymentMode: repaymentMode;
  loanAmount: number;
  rate: number;
  lentDate: string;
  tenure: string;
  userId: string;
  repaymentDate?: string;
  loanId: string;
}) => {
  const {
    repaymentMode,
    loanAmount,
    rate,
    lentDate,
    tenure,
    userId,
    repaymentDate,
    loanId
  } = params;
  const repayments: Prisma.repaymentCreateManyInput[] = [];
  if (repaymentMode === RepaymentMode.EMI) {
    // Calculate monthly EMI amount and number of months
    const monthlyRate = rate / 12 / 100; // Monthly interest rate
    const totalMonths = parseInt(tenure, 10); // Convert tenure to integer
    const emiAmount =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    for (let i = 0; i < totalMonths; i++) {
      // Calculate due date by adding i months and setting to start of the month
      const dueDate = startOfMonth(addMonths(lentDate, i)).toISOString();

      repayments.push({
        dueDate: dueDate, // Directly use dueDate
        amount: parseFloat(emiAmount.toFixed(2)), // Round to 2 decimal places
        userId,
        resourceType: Resources.LOAN,
        resourceId: loanId,
        createdAt: new Date().toISOString(),
      });
    }
  } else if (repaymentMode === RepaymentMode.ONETIME && repaymentDate) {
    // For one-time repayment
    const oneTimeRepayment = {
      dueDate: repaymentDate,
      amount: loanAmount, 
      userId: userId,
      resourceType: Resources.LOAN,
      resourceId: loanId,
      createdAt: new Date().toISOString(),
    };

    repayments.push(oneTimeRepayment);
  }

  return repayments;
};
