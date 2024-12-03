"use client";
import React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LoanForm } from "../loan-form/loan-form";


export function AddOrUpdateLendings(props: { id?: string, children?: React.ReactNode }) {
  const { id } = props;
  const isUpdate = id !== undefined;

  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const title = isUpdate ? "Edit Loan" : "Add Loan";
  const description = isUpdate
    ? `Make changes to your loan here. Click save when youre done.`
    : `Add a new loan here. Click save when youre done.`;

  const titleElem = isDesktop ? (
    <DialogTitle>{title}</DialogTitle>
  ) : (
    <DrawerTitle>{title}</DrawerTitle>
  );

  const descriptionElem = isDesktop ? (
    <DialogDescription>{description}</DialogDescription>
  ) : (
    <DrawerDescription>{description}</DrawerDescription>
  );

  const formElem = (
    <div className={isDesktop ? "" : "px-4"}>
      <LoanForm />
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
         {props.children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[40%]">
          <DialogHeader>
            {titleElem}
            {descriptionElem}
          </DialogHeader>
          {formElem}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {props.children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          {titleElem}
          {descriptionElem}
        </DrawerHeader>
        {formElem}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
