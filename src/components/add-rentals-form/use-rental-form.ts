import { useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import {rentalFormSchema, RentalFormValues} from "./rental-form-schema"
import {useRentCreateOrUpdate} from "./hooks/useRentCreateOrUpdate"

export type RentalForm = UseFormReturn<RentalFormValues>

export const ContractDurations = [
  { value: '6', label: "6 Month" },
  { value: '12', label: "12 Month" },
  { value: '24', label: "24 Month" },
  { value: '36', label: "36 Month" },
]

export function useRentalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const {mutateAsync} = useRentCreateOrUpdate();

  const form = useForm<RentalFormValues>({
    resolver: zodResolver(rentalFormSchema),
    defaultValues: {
      tenantName: "John Doe",
      tenantAddress: "Pune",
      adhaarNumber: "121212121212",
      phoneNumber: "1111111111",
      rentalAmount: 1000,
      rentDueDay: parseInt(format(new Date(), "d")),
      propertyId: '',
      numberOfContractMonths: ContractDurations[1].value,
    },
  })

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetStep = () => {
    form.reset()
    setCurrentStep(1)
  }

  async function onSubmit(data: RentalFormValues) {
    setIsSubmitting(true)
    try {
      // Simulating API call
      await mutateAsync({
        ...data,
      })
      console.log("Form submitted:", data)
      // Reset form after successful submission
      form.reset()
      setCurrentStep(3)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("An error occurred while adding the rental. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return { form, isSubmitting, onSubmit, currentStep, nextStep, prevStep, resetStep }
}

