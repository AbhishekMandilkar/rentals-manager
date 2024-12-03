import { NextRequest, NextResponse } from "next/server";
import { loanStatus, Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id,
      borrowerName,
      borrowerPhone,
      amount,
      interestRate,
      dateLent,
      dateRepayment,
      status,
      repaymentMode,
      userId,
      isDeleted,
    }: Prisma.loanCreateInput = body;

    // Validate required fields
    if (
      !borrowerName ||
      !borrowerPhone ||
      !amount ||
      !interestRate ||
      !dateLent ||
      !dateRepayment ||
      !status ||
      !repaymentMode ||
      !userId
    ) {
      return NextResponse.json(
        { message: "All required fields must be provided." },
        { status: 400 }
      );
    }

    const loan = await prisma.loan.upsert({
      where: { id: id || "" }, // Use `id` if provided, otherwise create a new entry
      update: {
        borrowerName,
        borrowerPhone,
        amount,
        interestRate,
        dateLent: new Date(dateLent),
        dateRepayment: new Date(dateRepayment),
        status,
        repaymentMode,
        isDeleted: isDeleted ?? false,
      },
      create: {
        borrowerName,
        borrowerPhone,
        amount,
        interestRate,
        dateLent: new Date(dateLent),
        dateRepayment: new Date(dateRepayment),
        status,
        repaymentMode,
        userId,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(loan, { status: 200 });
  } catch (error) {
    console.error("Error upserting loan:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: JSON.stringify(error) },
      { status: 500 }
    );
  }
}

// Validation schema for query parameters
const LoanQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().optional().default(10),
  borrowerName: z.string().optional(),
  status: z
    .enum([loanStatus.ACTIVE, loanStatus.OVERDUE, loanStatus.REPAID])
    .optional(),
  sortBy: z
    .enum([
      "borrowerName",
      "amount",
      "interestRate",
      "dateRepayment",
      "status",
      "dateLent",
    ])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export async function GET(request: NextRequest) {
  try {
    // Parse and validate query parameters
    const searchParams = request.nextUrl.searchParams;
    const queryParams = Object.fromEntries(searchParams.entries());

    const validatedParams = LoanQuerySchema.parse({
      page: queryParams.page,
      pageSize: queryParams.pageSize,
      borrowerName: queryParams.borrowerName,
      status: queryParams.status,
      minAmount: queryParams.minAmount,
      maxAmount: queryParams.maxAmount,
      sortBy: queryParams.sortBy,
      sortOrder: queryParams.sortOrder,
    });

    // Construct where clause for filtering
    const whereClause: Prisma.loanFindManyArgs["where"] = {
      isDeleted: false, // Only return non-deleted loans
    };

    // Add borrower name filter (case-insensitive)
    if (validatedParams.borrowerName) {
      whereClause.borrowerName = {
        contains: validatedParams.borrowerName,
        mode: "insensitive",
      };
    }

    // Add status filter
    if (validatedParams.status) {
      whereClause.status = validatedParams.status;
    }

    // Determine sorting
    const orderBy: Prisma.loanFindManyArgs["orderBy"] = validatedParams.sortBy
      ? { [validatedParams.sortBy]: validatedParams.sortOrder }
      : { createdAt: "desc" };

    // Pagination
    const page = validatedParams.page;
    const pageSize = validatedParams.pageSize;

    // Fetch loans with pagination and filtering
    const [totalLoans, loans] = await Promise.all([
      prisma.loan.count({ where: whereClause }),
      prisma.loan.findMany({
        where: whereClause,
        orderBy,
        take: pageSize,
        skip: (page - 1) * pageSize,
      }),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalLoans / pageSize);

    return NextResponse.json(
      {
        data: loans,
        meta: {
          page,
          pageSize,
          totalLoans,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching loans:", error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid query parameters",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: "Failed to fetch loans",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}