import {LOAN_TABLE_QUERY_KEY} from "@/components/lending-list/useLoanTable";
import { queryClient } from "@/components/providers/custom-proivider";
import { RENTAL_TABLE_QUERY_KEY } from "@/components/rentals/useRentalTable";
import { useMutation } from "react-query";

interface MarkAsPaidResponse {
  id: string;
  amount: number;
  paidAt: Date;
  dueDate: Date;
}

export const useMarkRepaymentAsPaid = () => {
  return useMutation<MarkAsPaidResponse, Error, string>({
    mutationFn: async (repaymentId: string) => {
      const response = await fetch(
        `/api/repayments/${repaymentId}/mark-as-paid`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark repayment as paid");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RENTAL_TABLE_QUERY_KEY, LOAN_TABLE_QUERY_KEY] });
    },
  });
};

// Usage example:
// const { mutate: markAsPaid, isPending } = useMarkRepaymentAsPaid();
// markAsPaid(repaymentId);
