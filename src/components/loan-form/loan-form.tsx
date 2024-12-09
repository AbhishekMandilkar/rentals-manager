"use client"

import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {CalendarIcon, Loader2} from 'lucide-react'
import {add, format} from "date-fns"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
    Form,
    FormControl, FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {LoanFormValues, loanSchema} from "./schema"
import {useCreateOrUpdateLoan} from "./hooks/use-create-loans"
import {Prisma} from "@prisma/client"



export function LoanForm() {
  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      borrowerName: "",
      borrowerPhone: "",
      amount: 0,
      interestRate: 0,
      dateRepayment: add(new Date(), {months: 1}),
      repaymentMode: "ONE_TIME",
    },
  })

  const { mutate, isLoading } = useCreateOrUpdateLoan();

  function onSubmit(data: LoanFormValues) {
    const {amount, borrowerName, repaymentMode, dateRepayment, interestRate, borrowerPhone} = data;
    mutate({
      amount,
      borrowerName,
      borrowerPhone: borrowerPhone || "",
      repaymentMode: repaymentMode as Prisma.loanCreateInput["repaymentMode"],
      dateRepayment,
      interestRate,
      dateLent: new Date(),
      status: 'ACTIVE',
      userId: crypto.randomUUID(),
    });
    // Here you would typically send the data to your API
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
          name="dateRepayment"
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
        <FormField
          control={form.control}
          name="repaymentMode"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Repayment Mode</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a repayment mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ONE_TIME">One Time</SelectItem>
                  <SelectItem value="EMI">EMI</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="md:col-span-2 mt-4" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}

