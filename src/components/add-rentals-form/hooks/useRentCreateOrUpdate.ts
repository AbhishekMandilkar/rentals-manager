import { queryClient } from "@/components/providers/custom-proivider";
import { apiClient } from "@/lib/apiClient";
import { useMutation } from "react-query";
import { toast } from "sonner";
import {RentalFormValues} from "../rental-form-schema";

export const useRentCreateOrUpdate = () => {
  return useMutation({
    // Mutation function
    mutationFn: async (data: RentalFormValues) => {
      // Determine if it's create or update based on presence of ID
      const response = await apiClient.post("/api/rents", data);
      return response.data;
    },

    // Success handler
    onSuccess: (data, variables) => {
      // Invalidate and refetch rent-related queries
      queryClient.invalidateQueries({
        queryKey: ["rents"],
      });

      // Optionally, you can handle toast or other success notifications
      toast.success(
        variables.id ? "Rent updated successfully" : "Rent created successfully"
      );
    },

    onError: () => {
      toast.error("Failed to save rent information");
    },
  });
};
