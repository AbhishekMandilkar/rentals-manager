import { useState, useCallback } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Rent } from "./rental-columns"
import debounce from "lodash/debounce"
import {useQuery} from "react-query"

export const RENTAL_TABLE_QUERY_KEY = 'RENTAL_LISTING_QUERY'

interface RentalResponse {
  rents: Rent[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }
}

async function fetchRentals({
  page,
  pageSize,
  name,
  contractEndDate,
  propertyId,
}: {
  page: number;
  pageSize: number;
  name?: string;
  contractEndDate?: 'asc' | 'desc';
  propertyId?: string;
}): Promise<RentalResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    ...(name && { name }),
    ...(contractEndDate && { contractEndDate }),
    ...(propertyId && { propertyId }),
  })

  const response = await fetch(`/api/rents?${params}`)
  if (!response.ok) {
    throw new Error('Failed to fetch rentals')
  }
  return response.json()
}

export function useRentalTable(columns: ColumnDef<Rent>[]) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // Parse query parameters with defaults
  const pageIndex = parseInt(searchParams.get('page') || '0', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
  const contractEndDate = searchParams.get('contractEndDate') as 'asc' | 'desc' | null
  const propertyId = searchParams.get('propertyId')
  const nameFilter = searchParams.get('name')

  // Initial states derived from URL query
  const initialSorting: SortingState = contractEndDate 
    ? [{ id: 'contractEndDate', desc: contractEndDate === 'desc' }] 
    : []

  const initialColumnFilters: ColumnFiltersState = nameFilter
    ? [{ id: 'name', value: nameFilter }]
    : []

  // State for table interactions
  const [sorting, setSorting] = useState<SortingState>(initialSorting)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialColumnFilters)
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // Create query string utility
  const createQueryString = useCallback((params: Record<string, string | number | undefined>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        newSearchParams.set(key, String(value))
      } else {
        newSearchParams.delete(key)
      }
    })

    return newSearchParams.toString()
  }, [searchParams])

  // Update URL when state changes
  const updateUrlQuery = useCallback((
    newSorting?: SortingState, 
    newFilters?: ColumnFiltersState, 
    newPageIndex?: number
  ) => {
    const queryParams: Record<string, string | number | undefined> = {}

    // Handle sorting
    if (newSorting && newSorting.length > 0) {
      if (newSorting[0].id === 'contractEndDate') {
        queryParams.contractEndDate = newSorting[0].desc ? 'desc' : 'asc'
      }
    }

    // Handle filters
    const nameFilter = newFilters?.find(f => f.id === 'name')
    if (nameFilter && nameFilter.value) {
      queryParams.name = nameFilter.value as string
    }

    // Handle pagination
    if (newPageIndex !== undefined && newPageIndex !== 0) {
      queryParams.page = newPageIndex
    }

    // Generate new query string and navigate
    router.push(`${pathname}?${createQueryString(queryParams)}`)
  }, [router, pathname, createQueryString])

  // Data fetching using react-query
  const { data, isLoading, isError } = useQuery<RentalResponse>({
    queryKey: [
      RENTAL_TABLE_QUERY_KEY,
      sorting, 
      columnFilters, 
      pageIndex, 
      pageSize
    ],
    queryFn: () => fetchRentals({
      page: pageIndex + 1,
      pageSize: pageSize,
      name: nameFilter || undefined,
      contractEndDate: sorting[0]?.id === 'contractEndDate' 
        ? (sorting[0].desc ? 'desc' : 'asc')
        : undefined,
      propertyId: propertyId || undefined
    }),
    keepPreviousData: true
  })

  // Table instance creation
  const table = useReactTable({
    data: data?.rents ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' 
        ? updater(sorting) 
        : updater
      setSorting(newSorting)
      updateUrlQuery(newSorting)
    },
    onColumnFiltersChange: (updater) => {
      const newFilters = typeof updater === 'function'
        ? updater(columnFilters)
        : updater
      setColumnFilters(newFilters)
      updateUrlQuery(sorting, newFilters)
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function'
        ? updater({ pageIndex, pageSize })
        : updater
      updateUrlQuery(sorting, columnFilters, newPagination.pageIndex)
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex, pageSize },
    },
    manualPagination: true,
    pageCount: data?.pagination.totalPages ?? 0,
  })

  // Debounced search
  const debouncedSearch = useCallback(
    (value: string) => {
      table.getColumn("name")?.setFilterValue(value);
    },
    [table]
  );

  const debounceFn = useCallback(
    debounce(debouncedSearch, 1000) as (value: string) => void,
    [debouncedSearch]
  );

  const onSearch = (value: string) => {
    debounceFn(value);
  };
  
  return {
    rentals: data?.rents,
    pagination: data?.pagination,
    isLoading,
    isError,
    table,
    onSearch
  }
}