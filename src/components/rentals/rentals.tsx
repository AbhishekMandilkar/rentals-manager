"use client";
import React from "react";

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
import { useRentalTable } from "./useRentalTable";
import { RentalTableColumns, Rent } from "./rental-columns";
import { useIsMobile } from "@/hooks/use-mobile";
import {formatCurrency} from "@/utils";

const loadingView = (
  <div className="space-y-4">
    <Skeleton className="h-4 w-[100%]" />
    <Skeleton className="h-4 w-[90%]" />
    <Skeleton className="h-4 w-[80%]" />
    <Skeleton className="h-4 w-[70%]" />
    <Skeleton className="h-4 w-[60%]" />
  </div>
);

function RentalListing() {
  const { isLoading, isError, table, onSearch } = useRentalTable(RentalTableColumns);
  const isMobile = useIsMobile();

  if (isError) {
    return (
      <div className="text-red-500">
        Error loading rentals. Please try again later.
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
                <RentalCard
                  key={row.id}
                  name={row.getValue("name")}
                  phone={row.getValue("phone")}
                  rent={row.getValue("rent")}
                  property={row.getValue("property")}
                  repayment={row.getValue("repayment")}
                  contractEndDate={row.getValue("contractEndDate")}
                />
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
                        colSpan={RentalTableColumns.length}
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

export default RentalListing;

interface RentalCardProps {
  name: string;
  phone: string;
  rent: number;
  property: { name: string } | undefined;
  repayment: { amount: number; dueDate: string } | undefined;
  contractEndDate: string;
}

const RentalCard = ({
  name,
  phone,
  rent,
  property,
  repayment,
  contractEndDate,
}: RentalCardProps) => {
  return (
    <div className="rounded-lg border p-4 space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{phone}</p>
        </div>
        <div className="text-right">
          <div className="font-geist-mono">{formatCurrency(rent)}</div>
          <div className="text-sm text-gray-500">
            {property?.name || "No property"}
          </div>
        </div>
      </div>
      {repayment && (
        <div className="pt-2 border-t">
          <div className="text-sm text-gray-500">Next Payment</div>
          <div className="flex justify-between">
            <div>{formatCurrency(repayment.amount)}</div>
            <div>{new Date(repayment.dueDate).toLocaleDateString()}</div>
          </div>
        </div>
      )}
      <div className="pt-2 border-t">
        <div className="text-sm text-gray-500">Contract Ends</div>
        <div>{new Date(contractEndDate).toLocaleDateString()}</div>
      </div>
    </div>
  );
};

const TablePaginationView = (props: { table: TanstackTable<Rent> }) => {
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
  table: TanstackTable<Rent>;
  onSearch: (value: string) => void;
  isMobile: boolean;
}) => {
  const { table, onSearch, isMobile } = props;
  return (
    <div className="flex items-center space-x-2 justify-between">
      <Input
        placeholder="Search tenants..."
        defaultValue={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
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
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
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