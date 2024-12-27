"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CreditCard, Building, BarChart3 } from "lucide-react";
import { NavItems } from "./app-config";

export function BottomNavbar(props: { activeTab?: string }) {
  const { activeTab } = props;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50 shadow-sm">
      <div className="flex justify-around p-2 user-select-none">
        {NavItems.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className={`flex flex-col items-center pt-2 pb-1 px-3 ${
              activeTab === item.url ? "text-primary" : "text-gray-500"
            }`}
          >
            <div className="relative">
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-xs mt-1">{item.title}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
