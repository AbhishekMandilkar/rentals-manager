"use client";
import { Building2, Home, IndianRupee, WalletIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavUser } from "./nav-user";
import {useIsMobile} from "@/hooks/use-mobile";
import {NavItems} from "./app-config";
import {BottomNavbar} from "./app-navbar";


export function AppSidebar() {
  const router = usePathname();
  const isMobile = useIsMobile();
  const pathname = usePathname()

  if (isMobile) {
    return <BottomNavbar activeTab={pathname} />;
  }

  return (
    <Sidebar collapsible="icon">
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
            {NavItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={router === item.url}
                  className="bg-sidebar-background"
                >
                  <Link href={item.url}>
                    <item.icon
                      className={`${
                        pathname === item.url
                          ? "text-primary"
                          : "text-sidebar-foreground"
                      }`}
                      size={20}
                    />
                    <span
                      className={`font-geist ${
                        pathname === item.url
                          ? "text-primary"
                          : "text-sidebar-foreground"
                      }`}
                    >
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
