import { repaymentMode } from "@prisma/client";
import * as z from "zod";

export const RepaymentMode = repaymentMode;

export const loanSchema = z
  .object({
    borrowerName: z.string().min(1, "Borrower name is required"),
    borrowerPhone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .optional(),
    amount: z.number().positive("Amount must be positive"),
    interestRate: z
      .number()
      .min(0, "Interest rate must be non-negative")
      .max(100, "Interest rate cannot exceed 100%"),
    repaymentDate: z.date().optional(),
    repaymentMode: z.enum([RepaymentMode.ONETIME, RepaymentMode.EMI]),
    tenure: z.string().optional(),
  })
  .superRefine(({ repaymentMode, tenure, repaymentDate }, ctx) => {
    if (repaymentMode === RepaymentMode.EMI && !tenure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["tenure"],
        message: "Tenure is required for EMI repayment",
      });
    }

    if (repaymentMode === RepaymentMode.ONETIME && !repaymentDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["repaymentDate"],
        message: "Repayment date is required for One Time repayment",
      });
    }

    return true;
  });

export type LoanFormValues = z.infer<typeof loanSchema>;
