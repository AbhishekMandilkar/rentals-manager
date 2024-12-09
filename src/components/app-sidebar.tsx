'use client'
import {Building2, Home, IndianRupee, WalletIcon} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup, SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import Link from "next/link";
import {usePathname} from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Lendings",
    url: "/lendings",
    icon: IndianRupee,
  },
  {
    title: "Rentals",
    url: "/rentals",
    icon: Building2,
  },
]

export function AppSidebar() {
  const router = usePathname();
  return (
    <Sidebar collapsible="icon" className="bg-gray-50">
      <SidebarHeader className="flex">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <WalletIcon className="size-8 bg-primary text-white p-1 rounded-md" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="text-lg truncate font-extrabold font-geist">
              Lend Rents
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={router === item.url}
                  className="bg-sidebar-background"
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span className="font-geist">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
