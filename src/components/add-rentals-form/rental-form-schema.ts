import * as z from "zod"

export const rentalFormSchema = z.object({
  tenantName: z.string().min(2, "Name must be at least 2 characters"),
  tenantAddress: z.string().optional(),
  adhaarNumber: z.string().regex(/^\d{12}$/, "Adhaar number must be 12 digits"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  rentalAmount: z.number().min(1, "Rental amount must be greater than 0"),
  rentDueDay: z.number().min(1).max(31, "Day must be between 1 and 31"),
  propertyId: z.string(),
  id: z.string().optional(),
  // mandatory for adding new rent
  numberOfContractMonths: z.string().min(1, "Number of months must be greater than 0"),
})

export type RentalFormValues = z.infer<typeof rentalFormSchema>

