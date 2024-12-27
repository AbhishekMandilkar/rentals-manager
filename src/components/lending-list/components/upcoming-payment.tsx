"use client"
import {useIsMobile} from "@/hooks/use-mobile";
import {formatCurrency} from "@/utils";
import { format } from "date-fns";
import React from "react";

const UpcomingPayment = (props: { dueDate: string; amount: number }) => {
  const { dueDate, amount } = props;

  const formattedDate = format(dueDate, "P");
  const formattedAmount = formatCurrency(amount);
  const isMobile = useIsMobile();

  if (isMobile) {
    <div className="space-y-1">
      <p className="text-sm font-medium leading-none text-muted-foreground">
        {formattedAmount}
      </p>
      <p className="text-xl font-semibold font-geist-mono">{formattedDate}</p>
    </div>;
  }

  return (
    <span className="flex items-center gap-1">
      <p className="font-geist-mono">{formattedAmount}</p>
      on
      <p className="font-geist">{formattedDate}</p>
    </span>
  );
};

export default React.memo(UpcomingPayment);
