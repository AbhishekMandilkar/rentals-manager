import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadgeClass } from "../utils";
import { loanStatus } from "@prisma/client";
import UpcomingPayment from "./upcoming-payment";
import {Repayment} from "@/components/rentals/rental-columns";

interface BorrowerCardProps {
  borrowerName: string;
  amount: number;
  interestRate: number;
  status: loanStatus;
  actionView?: React.ReactNode;
  onClick?: () => void;
  repayments?: Repayment[];
}

const BorrowerCard: React.FC<BorrowerCardProps> = ({
  borrowerName,
  amount,
  status,
  interestRate,
  actionView,
  repayments,
  onClick
}) => {
  return (
    <Card className="cursor-pointer font-geist" onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 font-geist">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            {borrowerName}
          </h3>
        </div>
        <Badge variant="secondary" className={StatusBadgeClass[status]}>
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none text-muted-foreground">
              Amount
            </p>
            <p className="text-xl font-bold font-geist-mono">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(amount)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none text-muted-foreground">
              Interest Rate
            </p>
            <p className="text-xl font-semibold font-geist-mono">
              {interestRate || "12%"}
            </p>
          </div>
          {repayments && repayments.length > 0 && (
            <UpcomingPayment
              reypayment={repayments?.[0]}
            />
          )}
        </div>
      </CardContent>
      {actionView && (
        <CardFooter className="justify-end">{actionView}</CardFooter>
      )}
    </Card>
  );
};

export default BorrowerCard;
