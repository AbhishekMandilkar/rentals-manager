"use client";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavUser } from "./nav-user";

const AppHeader = () => {
  const isMobile = useIsMobile();
  if (!isMobile) {
    return null;
  }
  return (
    <div className="flex items-center justify-between w-full border-b py-2 px-4 sticky top-0 z-50 bg-background">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>
      {isMobile && <NavUser />}
    </div>
  );
};

export default AppHeader;
