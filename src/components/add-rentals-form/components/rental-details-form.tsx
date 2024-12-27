import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import {ContractDurations, RentalForm} from "../use-rental-form"
import useProperties from "@/components/properties/useProperties"



export function RentalDetailsForm({ form }: { form: RentalForm }) {
  const {properties, isFetching: isLoading} = useProperties({
    isRented: true,
  });

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Rental Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="rentalAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rental Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter rental amount"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rentDueDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rent Due Day of Month</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter day (1-30)"
                  min={1}
                  max={30}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500">
                Enter the day of the month when rent is due (1-30)
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propertyId"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Property</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        isLoading ? "Loading..." : "Select a property"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {properties.map((property) => (
                    <SelectItem
                      key={property.id}
                      value={property.id}
                    >
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numberOfContractMonths"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Contract Duration</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a property" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ContractDurations.map((duration) => (
                    <SelectItem
                      key={duration.value}
                      value={duration?.value}
                    >
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

