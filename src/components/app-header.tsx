"use client";
import React from "react";
import {SidebarTrigger} from "./ui/sidebar";

const AppHeader = () => {
  return (
    <>
      <div className="flex items-center justify-between w-full border-b py-2 px-4 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
        </div>
        <div className="flex items-center gap-2">JW</div>
      </div>
    </>
  );
};

export default AppHeader;
