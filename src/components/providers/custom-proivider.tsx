"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {SidebarProvider} from "../ui/sidebar";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import LandingPage from "../landing-page/landing-page";

// Create a client
export const queryClient = new QueryClient();

const CustomProvider = (props: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>{props.children}</SidebarProvider>
        </QueryClientProvider>
      </SignedIn>
    </ClerkProvider>
  );
};

export default CustomProvider;
