"use client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TenantDetailsForm } from "./components/tenant-details-form";
import { RentalDetailsForm } from "./components/rental-details-form";
import { useRentalForm } from "./use-rental-form";
import {CircleCheck} from "lucide-react";

export function AddRentalForm() {
  const {
    form,
    isSubmitting,
    onSubmit,
    currentStep,
    nextStep,
    prevStep,
    resetStep,
  } = useRentalForm();

  const handleNextStep = async () => {
    const isValid = await form.trigger([
      "tenantName",
      "adhaarNumber",
      "phoneNumber",
    ]);
    if (isValid) {
      nextStep();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-1">
        {currentStep === 1 && (
          <div className="space-y-8">
            <TenantDetailsForm form={form} />
            <Button type="button" onClick={handleNextStep} className="w-full">
              Next
            </Button>
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-8">
            <RentalDetailsForm form={form} />
            <div className="flex justify-between">
              <Button type="button" onClick={prevStep} variant="outline">
                Previous
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Rental"}
              </Button>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <>
            <div className="flex flex-col items-center justify-center bg-background">
              <div className="text-center flex flex-col items-center">
                <CircleCheck className="size-32 text-green-500" />
                <h1 className="text-2xl font-bold my-4 font-geist">
                  Rental Added Successfully!
                </h1>
                <p className="text-md text-muted-foreground font-geist-mono">
                  Your new rental has been added to the system.
                </p>
                <Button asChild onClick={resetStep} variant="outline">
                  Add Another Rental
                </Button>
              </div>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}
