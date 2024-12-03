import { loan } from '@prisma/client'

// Define the shape of the API response
export interface LoansResponse {
  data: loan[]
  meta: {
    page: number
    pageSize: number
    totalLoans: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

// Utility function to fetch loans with optional filtering and sorting
export async function fetchLoans(params?: {
  page?: number
  pageSize?: number
  borrowerName?: string
  status?: 'ACTIVE' | 'OVERDUE' | 'COMPLETED'
  minAmount?: number
  maxAmount?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}): Promise<LoansResponse> {
  // Convert params to query string
  const queryString = new URLSearchParams()

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value && value !== undefined) {
      queryString.append(key, String(value || ""));
    }
  })

  const response = await fetch(`/api/loans?${queryString}`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to fetch loans')
  }

  return response.json()
}