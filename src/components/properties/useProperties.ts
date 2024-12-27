import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { useMutation, useQuery } from "react-query";
import { apiClient } from "@/lib/apiClient";
import { toast } from "sonner";
import { queryClient } from "../providers/custom-proivider";

export interface Property {
  id: string;
  name: string;
  active: boolean;
}

export const PROPERTIES_TABLE_QUERY_KEY = "properties";

const useProperties = (params?: {
  isRented?: boolean;
}) => {
  const { isRented } = params || {};
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { isLoading, isError, isFetching } = useQuery({
    queryKey: [PROPERTIES_TABLE_QUERY_KEY, searchTerm, isRented],
    queryFn: async () => {
      const response = await apiClient.get(`/api/properties`, {
        params: searchTerm
          ? {
              search: searchTerm,
              isRented: isRented,
            }
          : undefined,
      });
      if (response.status === 200) {
        return response.data;
      }
    },
    onSuccess: (data) => {
      setProperties(data || []);
    },
    onError: () => {
      console.log("Error fetching properties");
    },
  });

  const { mutateAsync, isLoading: isUpdating } = useMutation({
    mutationFn: async (data: Omit<Property, "active">) => {
      const response = await apiClient.put(`/api/properties`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(PROPERTIES_TABLE_QUERY_KEY);
    },
    onError: () => {
      toast.error("Error updating property");
    },
  });

  const debouncedSearch = useCallback(
    (search: string) => {
      debounce((search: string) => setSearchTerm(search), 300)(search);
    },
    [setSearchTerm]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleAddProperty = () => {
    // Implement add property logic
    console.log("Add new property");
  };

  const handleEditProperty = async (data: Omit<Property, "active">) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === data.id ? { ...property, ...data } : property
      )
    );
    toast.promise(mutateAsync(data), {
      loading: "Updating property...",
      success: "Property updated successfully",
      error: "Error updating property",
    });
  };

  return {
    searchTerm,
    properties,
    isLoading,
    isError,
    isUpdating,
    isFetching,
    handleSearch: (text: string) => setSearchTerm(text),
    handleAddProperty,
    handleEditProperty,
  };
};

export default useProperties;
