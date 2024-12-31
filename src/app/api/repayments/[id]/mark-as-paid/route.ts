import { markRepaymentAsPaid } from "@/services/repayments/repayments";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await markRepaymentAsPaid({ id: params.id });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to mark repayment as paid" },
      { status: 500 }
    );
  }
}
