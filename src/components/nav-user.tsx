"use client";

import { BadgeCheckIcon, ChevronsUpDown, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth, useUser } from "@clerk/nextjs";
import React, { useMemo } from "react";
import { Button } from "./ui/button";
import UserCard from "./user-card/user-card";
import {toast} from "sonner";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const name = user?.fullName;
  const email = user?.emailAddresses[0]?.emailAddress;
  const avatar = user?.imageUrl;
  const nameFallBack =
    user?.firstName && user?.lastName
      ? `${user?.firstName?.[0]}${user?.lastName?.[0]}`
      : undefined;

  const dropdownActions = useMemo(() => {
    const items: {
      name: string;
      icon: React.ReactNode;
      onClick: () => void;
    }[] = [];

    // items.push({
    //   name: "Upgrade to Pro",
    //   icon: <Sparkles />,
    //   onClick: () => {
    //     console.log("upgrade to pro");
    //   },
    // });
    items.push({
      name: "Account",
      icon: <BadgeCheckIcon />,
      onClick: () =>
        toast("Coming soon"),
    });
    // items.push({
    //   name: "Billing",
    //   icon: <CreditCard />,
    //   onClick: () => {
    //     console.log("billing");
    //   },
    // });
    // items.push({
    //   name: "Notifications",
    //   icon: <Bell />,
    //   onClick: () => {
    //     console.log("notifications");
    //   },
    // });
    // items.push({
    //   name: "Log out",
    //   icon: <LogOut />,
    //   onClick: () => {
    //     console.log("logout");
    //   },
    // });

    return items;
  }, []);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const userCardView = () => {
    return (
      <>
        <UserCard
          avatar={avatar}
          nameFallBack={nameFallBack}
          name={name}
          email={email}
          avatarOnly={isMobile}
        />
      </>
    );
  };

  // Wrapper component changes based on isMobile
  const Wrapper = isMobile ? React.Fragment : SidebarMenu;
  const WrapperItem = isMobile ? React.Fragment : SidebarMenuItem;

  return (
    <Wrapper>
      <WrapperItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isMobile ? (
              <Button variant={"ghost"} className="px-0">{userCardView()}</Button>
            ) : (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {userCardView()}
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              {dropdownActions.map((item) => (
                <DropdownMenuItem
                  key={item.name}
                  onClick={item.onClick}
                  className="cursor-pointer"
                >
                  {item.icon}
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="cursor-pointer"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </WrapperItem>
    </Wrapper>
  );
}
