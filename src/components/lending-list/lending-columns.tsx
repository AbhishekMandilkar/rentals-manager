
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import TableHeaderView from "../common/table-header";
import { Badge } from "../ui/badge";
import { StatusBadgeClass } from "./utils";
import { formatCurrency, toTitleCase } from "@/utils";
import UpcomingPayment from "./components/upcoming-payment";
import {Loan} from "./useLoanTable";
import {Repayment} from "../rentals/rental-columns";


export const LendingTableColumns: ColumnDef<Loan>[] = [
  {
    accessorKey: "borrowerName",
    header: ({ column }) => {
      return (
        <TableHeaderView
          title="Name"
          onSortClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      );
    },
    cell: ({ row }) => <div>{row.getValue("borrowerName")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <TableHeaderView
          title="Amount"
          onSortClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = formatCurrency(amount);
      return <div className="font-geist-mono">{formatted}</div>;
    },
  },
  {
    accessorKey: "interestRate",
    header: "Interest Rate",
    cell: ({ row }) => {
      const interestRate = parseFloat(row.getValue("interestRate"));
      return <div>{interestRate.toFixed(2)}%</div>;
    },
  },

  {
    accessorKey: "repayments",
    header: "Upcoming Payment",
    cell: ({ row }) => {
      const payments = row.getValue<Repayment[]>("repayments");
      if (payments?.length) {
        return (
          <UpcomingPayment
            reypayment={payments[0]}
          />
        );
      }
    },
  },
  {
    accessorKey: "repaymentMode",
    header: "Repayment Type",
    cell: ({ row }) => <div>{toTitleCase(row.getValue("repaymentMode"))}</div>,
    size: 50
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof StatusBadgeClass;
      return (
        <Badge
          variant="secondary"
          className={`${StatusBadgeClass[status]} cursor-pointer`}
        >
          {status}
        </Badge>
      );
    },
    size: 100,
  },
  {
    id: "actions",
    header: "Actions",
    size: 50,
    cell: ({ row }) => {
      const loan = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(loan.id)}
            >
              Copy loan ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit loan</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
