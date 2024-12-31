import { markRepaymentAsPaid } from "@/services/repayments/repayments";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const repaymentId = (await params)?.id;

    if (!repaymentId) {
      return NextResponse.json(
        { error: "Failed to mark repayment as paid" },
        { status: 400 }
      );
    }
    const result = await markRepaymentAsPaid({ id: repaymentId });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to mark repayment as paid" },
      { status: 500 }
    );
  }
}
