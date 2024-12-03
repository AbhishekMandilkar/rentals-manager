import React from "react";

import { AddOrUpdateLendings } from "./add-or-update-lendings";
import PageHeader from "../common/page-header";
import { Button } from "../ui/button";
import { PlusIcon, Search } from "lucide-react";
import { Input } from "../ui/input";
import {LoanListing} from "../lending-list/lending-list";

const Lendings = () => {
  return (
    <div>
      <PageHeader
        headerTitle="Lendings"
        headerSubtitle="Manage your lendings"
        right={
          <div className="flex items-center gap-2">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <AddOrUpdateLendings>
              <Button>
                <PlusIcon />
                <p className="hidden md:block">Add</p>
              </Button>
            </AddOrUpdateLendings>
          </div>
        }
      />
      <div className="py-2 px-4">
        <LoanListing />
      </div>
    </div>
  );
};

export default Lendings;
