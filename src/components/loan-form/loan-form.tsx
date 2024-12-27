"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoanFormValues, loanSchema } from "./schema";
import { useCreateOrUpdateLoan } from "./hooks/use-create-loans";
import { Prisma, repaymentMode } from "@prisma/client";
import { useEffect } from "react";
import {toast} from "sonner";

export function LoanForm(props: { onClose: () => void }) {
  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      borrowerName: "Abhishek",
      borrowerPhone: "9090909090",
      amount: 1000,
      interestRate: 12,
      repaymentMode: repaymentMode.ONETIME,
    },
  });

  const { mutateAsync, isLoading } = useCreateOrUpdateLoan();

  const isEmiModeSelected = form.getValues("repaymentMode") === "EMI";

  useEffect(() => {
    if (isEmiModeSelected) {
      form.resetField("repaymentDate");
    } else {
      form.resetField("tenure");
    }
  }, [form, isEmiModeSelected]);

  async function onSubmit(data: LoanFormValues) {
    try {
      const {
        amount,
        borrowerName,
        repaymentMode,
        interestRate,
        borrowerPhone,
        repaymentDate,
      } = data;
      await toast.promise(
        mutateAsync({
          amount,
          borrowerName,
          borrowerPhone: borrowerPhone || "",
          repaymentMode:
            repaymentMode as Prisma.loanCreateInput["repaymentMode"],
          interestRate,
          dateLent: new Date().toISOString(),
          status: "ACTIVE",
          tenure: data.tenure ? parseInt(data.tenure) : undefined,
          repaymentDate: repaymentDate?.toISOString(),
        }),
        {
          loading: "Creating loan...",
          success: "Loan created successfully",
          error: "Error creating loan",
        }
      );
      props?.onClose();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="borrowerName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Borrower Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="borrowerPhone"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Borrower Phone</FormLabel>
              <FormControl>
                <Input placeholder="91********" {...field} maxLength={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1000"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  className="[&::-webkit-inner-spin-button]:appearance-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interestRate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Interest Rate (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="5"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  className="[&::-webkit-inner-spin-button]:appearance-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repaymentMode"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Repayment Mode</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tenure" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={repaymentMode.ONETIME}>
                    One Time
                  </SelectItem>
                  <SelectItem value={repaymentMode.EMI}>EMI</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isEmiModeSelected && (
          <FormField
            control={form.control}
            name="repaymentDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Repayment Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date > new Date("2100-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {isEmiModeSelected && (
          <FormField
            control={form.control}
            name="tenure"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tenure (in months)</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a number of months" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="3">3 months</SelectItem>
                    <SelectItem value="6">6 months</SelectItem>
                    <SelectItem value="12">12 months</SelectItem>
                    <SelectItem value="18">18 months</SelectItem>
                    <SelectItem value="24">24 months</SelectItem>
                    <SelectItem value="30">30 months</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          className="col-span-2 mt-4 w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
          ) : (
            "Add Loan"
          )}
        </Button>
      </form>
    </Form>
  );
}
