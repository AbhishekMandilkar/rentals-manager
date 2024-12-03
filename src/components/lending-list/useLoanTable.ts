import { useState,  useCallback } from "react"
import { useQuery } from "react-query"
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
import { loan } from "@prisma/client"
import { fetchLoans, LoansResponse } from "./utils"

export function useLoanTable(columns: ColumnDef<loan>[]) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // Parse query parameters with defaults
  const pageIndex = parseInt(searchParams.get('page') || '0', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
  const sortBy = searchParams.get('sortBy')
  const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc'
  const borrowerNameFilter = searchParams.get('borrowerName')

  // Initial states derived from URL query
  const initialSorting: SortingState = sortBy 
    ? [{ id: sortBy, desc: sortOrder === 'desc' }] 
    : []

  const initialColumnFilters: ColumnFiltersState = borrowerNameFilter
    ? [{ id: 'borrowerName', value: borrowerNameFilter }]
    : []

  // State for table interactions
  const [sorting, setSorting] = useState<SortingState>(initialSorting)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialColumnFilters)
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // Create query string utility
  const createQueryString = useCallback((params: Record<string, string | number | undefined>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    
    // Add or update params
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
      queryParams.sortBy = newSorting[0].id
      queryParams.sortOrder = newSorting[0].desc ? 'desc' : 'asc'
    }

    // Handle filters
    const borrowerFilter = newFilters?.find(f => f.id === 'borrowerName')
    if (borrowerFilter && borrowerFilter.value) {
      queryParams.borrowerName = borrowerFilter.value as string
    }

    // Handle pagination
    if (newPageIndex !== undefined && newPageIndex !== 0) {
      queryParams.page = newPageIndex
    }

    // Generate new query string and navigate
    router.push(`${pathname}?${createQueryString(queryParams)}`)
  }, [router, pathname, createQueryString])

  // Data fetching using react-query
  const { data, isLoading, isError } = useQuery<LoansResponse>({
    queryKey: [
      'loans', 
      sorting, 
      columnFilters, 
      pageIndex, 
      pageSize
    ],
    queryFn: () => fetchLoans({
      page: pageIndex + 1,
      pageSize: pageSize,
      borrowerName: borrowerNameFilter || undefined,
      sortBy: sorting[0]?.id,
      sortOrder: sorting[0]?.desc ? 'desc' : 'asc'
    }),
    keepPreviousData: true
  })

  // Table instance creation
  const table = useReactTable({
    data: data?.data ?? [],
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
    pageCount: data?.meta.totalPages ?? 0,
  })

  return {
    loans: data?.data,
    meta: data?.meta,
    isLoading,
    isError,
    table,
  }
}