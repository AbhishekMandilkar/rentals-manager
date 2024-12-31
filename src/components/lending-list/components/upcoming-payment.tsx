"use client";
import { Repayment } from "@/components/rentals/rental-columns";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMarkRepaymentAsPaid } from "@/hooks/use-mark-repayments-paid";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatCurrency } from "@/utils";
import { format } from "date-fns";
import { CheckIcon, Loader2Icon } from "lucide-react";
import React from "react";

const UpcomingPayment = (props: { reypayment: Repayment }) => {
  const { mutate: markAsPaid, isLoading } = useMarkRepaymentAsPaid();
  const { reypayment } = props;

  const { dueDate, amount, id } = reypayment || {};

  const formattedDate = format(dueDate, "P");
  const formattedAmount = formatCurrency(amount);
  const isMobile = useIsMobile();

  const handleMarkPaid = () => {
    markAsPaid(id);
  };

  if (isMobile) {
    <div className="space-y-1">
      <p className="text-sm font-medium leading-none text-muted-foreground">
        {formattedAmount}
      </p>
      <p className="text-xl font-semibold font-geist-mono">{formattedDate}</p>
    </div>;
  }

  return (
    <div className="flex items-center gap-2 min-w-[300px]">
      <span className="flex items-center gap-1">
        <p className="font-geist-mono">{formattedAmount}</p>
        <span className="text-muted-foreground">on</span>
        <p className="font-geist">{formattedDate}</p>
      </span>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handleMarkPaid}
            disabled={isLoading}
            className="text-xs text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            {isLoading ? (
              <Loader2Icon className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CheckIcon className="h-3.5 w-3.5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Mark as paid</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default React.memo(UpcomingPayment);
