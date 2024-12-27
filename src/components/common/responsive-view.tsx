"use client";
import React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export function ResponsiveView(props: {
  children?: React.ReactNode;
  title?: string;
  trigger?: React.ReactNode;
  onClose?: () => void;
}) {
  const { title, children, trigger } = props;

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const titleElem = isDesktop ? (
    <SheetTitle>{title}</SheetTitle>
  ) : (
    <DrawerTitle>{title}</DrawerTitle>
  );

  if (isDesktop) {
    return (
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent className="xl:w-[40%] xl:max-w-none sm:w-[400px] sm:max-w-[540px]">
          {titleElem && (
            <SheetHeader>{titleElem}</SheetHeader>
          )}
          {children}
        </SheetContent>
        <SheetFooter></SheetFooter>
      </Sheet>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="min-h-[80vh]">
        {titleElem && (
          <DrawerHeader className="text-left">{titleElem}</DrawerHeader>
        )}
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
