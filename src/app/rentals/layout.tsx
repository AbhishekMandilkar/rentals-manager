import { AddRentalForm } from "@/components/add-rentals-form/add-rentals-form";
import PageHeader from "@/components/common/page-header";
import { ResponsiveView } from "@/components/common/responsive-view";
import { Properties } from "@/components/properties/properties";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rentals",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <PageHeader
        headerTitle="Rentals"
        right={
          <div className="flex items-center space-x-2">
            <Properties />
            <ResponsiveView
              trigger={
                <Button className="ml-auto">
                  <PlusIcon className="h-4 w-4" />
                  <p className="hidden md:block "> Add Rental</p>
                </Button>
              }
            >
              <ScrollArea className="px-4 max-h-[80vh] overflow-y-auto">
                <AddRentalForm />
              </ScrollArea>
            </ResponsiveView>
          </div>
        }
      />
      {children}
    </main>
  );
}
