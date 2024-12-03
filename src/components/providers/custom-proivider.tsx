"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {SidebarProvider} from "../ui/sidebar";

// Create a client
export const queryClient = new QueryClient();

const CustomProvider = (props: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>{props.children}</SidebarProvider>
    </QueryClientProvider>
  );
};

export default CustomProvider;
