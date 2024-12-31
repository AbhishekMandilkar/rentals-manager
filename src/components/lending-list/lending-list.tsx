"use client";

import { ChevronDown } from "lucide-react";
import { flexRender, Table as TanstackTable } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loan, useLoanTable } from "./useLoanTable";
import { LendingTableColumns } from "./lending-columns";
import { useIsMobile } from "@/hooks/use-mobile";
import BorrowerCard from "./components/borrower-card";
import {Repayment} from "../rentals/rental-columns";


const loadingView = (
  <div className="space-y-4">
    <Skeleton className="h-4 w-[100%]" />
    <Skeleton className="h-4 w-[90%]" />
    <Skeleton className="h-4 w-[80%]" />
    <Skeleton className="h-4 w-[70%]" />
    <Skeleton className="h-4 w-[60%]" />
  </div>
);

export function LoanListing() {
  // Use the custom hook
  const { isLoading, isError, table, onSearch } =
    useLoanTable(LendingTableColumns);
  const isMobile = useIsMobile();
  if (isError) {
    return (
      <div className="text-red-500">
        Error loading loans. Please try again later.
      </div>
    );
  }

  return (
    <>
      <TableHeaderView table={table} onSearch={onSearch} isMobile={isMobile} />
      {(() => {
        if (isLoading) {
          return loadingView;
        }

        if (isMobile) {
          return (
            <div className="flex flex-col gap-2">
              {table.getRowModel().rows?.map((row) => (
                <div key={row.id}>
                  <BorrowerCard
                    borrowerName={row.getValue("borrowerName")}
                    amount={row.getValue("amount")}
                    status={row.getValue("status")}
                    interestRate={row.getValue("interestRate")}
                    repayments={row.getValue<Repayment[]>("repayments")}
                  />
                </div>
              ))}
              <TablePaginationView table={table} />
            </div>
          );
        }

        return (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={LendingTableColumns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <TablePaginationView table={table} />
          </>
        );
      })()}
    </>
  );
}

const TablePaginationView = (props: { table: TanstackTable<Loan> }) => {
  const { table } = props;
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const TableHeaderView = (props: {
  table: TanstackTable<Loan>;
  onSearch: (value: string) => void;
  isMobile: boolean;
}) => {
  const { table, onSearch, isMobile } = props;
  return (
    <div className="flex items-center space-x-2 justify-between">
      <Input
        placeholder="Search borrowers..."
        defaultValue={
          (table.getColumn("borrowerName")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) => onSearch(event.target.value)}
        className="md:max-w-sm"
      />
      {!isMobile && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
