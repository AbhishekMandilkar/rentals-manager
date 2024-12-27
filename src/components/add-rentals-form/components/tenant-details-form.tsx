import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import {RentalForm} from "../use-rental-form"

export function TenantDetailsForm({ form }: { form: RentalForm }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight font-geist">Tenant Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="tenantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tenant Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter tenant name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter 10-digit phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adhaarNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adhaar Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter 12-digit Adhaar number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tenantAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tenant Native Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter tenant address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

