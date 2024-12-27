import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TableHeaderView from "../common/table-header";
import {formatCurrency} from "@/utils";
import UpcomingPayment from "../lending-list/components/upcoming-payment";

// Define the interfaces based on the schema
interface Property {
  id: string;
  name: string;
}

interface Repayment {
  id: string;
  amount: number;
  dueDate: string;
  paidAt: string | null;
}

export interface Rent {
  id: string;
  name: string;
  phone: string;
  rent: number;
  contractEndDate: string;
  property?: Property;
  repayment?: Repayment;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  propertyId?: string;
}

export const RentalTableColumns: ColumnDef<Rent>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <TableHeaderView
          title="Tenant Name"
          onSortClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "property",
    header: "Property",
    cell: ({ row }) => {
      const property = row.getValue("property") as Property | undefined;
      return <div>{property?.name || "No property assigned"}</div>;
    },
  },
  {
    accessorKey: "rent",
    header: ({ column }) => {
      return (
        <TableHeaderView
          title="Rent Amount"
          onSortClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue<number>("rent");
      const formatted = formatCurrency(amount);
      return <div className="font-geist-mono">{formatted}</div>;
    },
  },
  {
    accessorKey: "repayment",
    header: "Upcoming Payment",
    cell: ({ row }) => {
      const payment = row.getValue<Repayment | undefined>("repayment");
      if (payment) {
        return (
          <UpcomingPayment
            amount={payment.amount}
            dueDate={payment.dueDate}
          />
        );
      }
      return null;
    },
  },
  {
    accessorKey: "contractEndDate",
    header: ({ column }) => {
      return (
        <TableHeaderView
          title="Contract End"
          onSortClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>("contractEndDate"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const rent = row.original;

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
              onClick={() => navigator.clipboard.writeText(rent.id)}
            >
              Copy rental ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit rental</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];