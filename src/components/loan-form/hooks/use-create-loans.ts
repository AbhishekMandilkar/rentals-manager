import { useMutation } from "react-query";

import { Prisma } from "@prisma/client";
import { apiClient } from "@/lib/apiClient";
import { LOAN_TABLE_QUERY_KEY } from "@/components/lending-list/useLoanTable";
import { queryClient } from "@/components/providers/custom-proivider";

const createOrUpdateLoan = async (body: Prisma.loanCreateInput) => {
  const { data } = await apiClient.post("/api/loans", body);
  return data;
};

export const useCreateOrUpdateLoan = () => {
  return useMutation<Prisma.loanCreateInput, Error, Prisma.loanCreateInput>(
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
