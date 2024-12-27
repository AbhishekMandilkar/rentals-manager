import {useMutation} from "react-query";

import {apiClient} from "@/lib/apiClient";
import {LOAN_TABLE_QUERY_KEY} from "@/components/lending-list/useLoanTable";
import {queryClient} from "@/components/providers/custom-proivider";
import {repaymentMode} from "@prisma/client";

export enum LoanTenure {
  THREE_MONTHS = '3',
  SIX_MONTHS = '6',
  TWELVE_MONTHS = '12',
  EIGHTEEN_MONTHS = '18',
  TWENTY_FOUR_MONTHS = '24',
  THIRTY_MONTHS = '30',
}


export interface LoanRequestBody {
  id?: string; // Optional: The loan ID for updating existing loans
  borrowerName: string; // Borrower's name
  borrowerPhone: string; // Borrower's phone number
  amount: number | string; // Loan amount (number or string to handle parsing from JSON)
  interestRate: number | string; // Interest rate (number or string for parsing)
  dateLent: string; // ISO string for the loan date
  status: string; // Loan status
  repaymentMode: repaymentMode; // Enum-like constraint for repayment modes
  repaymentDate?: string; // Optional: Required only for ONETIME repayment (ISO date string)
  tenure?: number; // Optional: Loan tenure in months (required for EMI repayment)
}


const createOrUpdateLoan = async (body: LoanRequestBody) => {
  const { data } = await apiClient.post("/api/loans", body);
  return data;
};

export const useCreateOrUpdateLoan = () => {
  return useMutation<LoanRequestBody, Error, LoanRequestBody>(
    createOrUpdateLoan,
    {
      onSuccess: () => {
        // invalidate the query cache for 'books'
        queryClient.invalidateQueries(LOAN_TABLE_QUERY_KEY);
      },
      onError: () => {
        // handle error
      },
    }
  );
};
