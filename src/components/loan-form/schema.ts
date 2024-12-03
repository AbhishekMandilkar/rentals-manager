import * as z from "zod";

export const loanSchema = z.object({
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
  dateRepayment: z.date(),
  repaymentMode: z.enum(["ONE_TIME", "EMI"]),
});

export type LoanFormValues = z.infer<typeof loanSchema>;
