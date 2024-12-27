"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Plus, Search, Settings2} from "lucide-react";
import useProperties from "./useProperties";
import {ResponsiveView} from "../common/responsive-view";
import {Skeleton} from "../ui/skeleton";
import {ErrorAlert} from "../common/error-alert";
import {PropertyCard} from "./component/property-card";
import {ScrollArea} from "../ui/scroll-area";

export function Properties() {
  const {
    searchTerm,
    properties,
    isLoading,
    isError,
    isUpdating,
    handleAddProperty,
    handleEditProperty,
    handleSearch,
  } = useProperties();

  return (
    <ResponsiveView
      trigger={
        <Button variant="outline">
          <Settings2 />
          Manage Properties
        </Button>
      }
    >
      {(() => {

        if (isError) {
          return <ErrorAlert message="Error fetching properties" />;
        }

        return (
          <div className="space-y-6 mx-4">
            <h2 className="text-2xl font-bold tracking-tight font-geist">
              Properties
            </h2>

            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button onClick={handleAddProperty} className="ml-2">
                  <Plus className="h-4 w-4" /> Add Property
                </Button>
              </div>
              {isLoading ? (
                <div className="flex flex-col h-full space-y-4">
                  <Skeleton className="h-5 w-[100%]" />
                  <Skeleton className="h-5 w-[100%]" />
                  <Skeleton className="h-5 w-[100%]" />
                  <Skeleton className="h-5 w-[100%]" />
                  <Skeleton className="h-5 w-[100%]" />
                  <Skeleton className="h-5 w-[100%]" />
                </div>
              ) : (
                <ScrollArea className="flex-1 max-h-[90vh] space-y-2">
                  {properties.map((property) => (
                    <PropertyCard
                      property={property}
                      onUpdate={handleEditProperty}
                      key={property.id}
                      onDelete={() => {}}
                      disabled={isUpdating}
                    />
                  ))}
                </ScrollArea>
              )}
            </div>
          </div>
        );
      })()}
    </ResponsiveView>
  );
}
