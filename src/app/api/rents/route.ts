// app/api/rents/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createOrUpdateRents } from "@/services/rentals/create-or-update-rents";
import prisma from "@/lib/prisma";
import { searchRents } from "@/services/rentals/search-rentals";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const userId = req.headers.get("userId");

    if (!userId) {
      throw new Error("UnAuthorised");
    }

    const data = await createOrUpdateRents({
      prisma,
      userId,
      body,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation Error",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    // Handle Prisma errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Internal Server Error",
          error: error.message,
        },
        { status: 500 }
      );
    }

    // Fallback error handler
    return NextResponse.json(
      {
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = req.headers.get("userId") as string;

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const name = searchParams.get("name") || undefined;
  const propertyId = searchParams.get("propertyId") || undefined;
  const sortContractEndDate =
    (searchParams.get("sortContractEndDate") as "asc" | "desc") || "asc";
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);

  try {
    const result = await searchRents(
      userId,
      {
        name,
        propertyId,
        contractEndDate: sortContractEndDate,
        page,
        pageSize,
      },
      prisma
    );

    return NextResponse.json(result);
  } catch (e) {
    // Error handling
    return NextResponse.json(
      { error: "Failed to retrieve rents" },
      { status: 500 }
    );
  }
}
