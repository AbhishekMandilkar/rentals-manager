
import {AddOrUpdateLendings} from "./add-or-update-lendings";
import PageHeader from "../common/page-header";
import {Button} from "../ui/button";
import {PlusIcon} from "lucide-react";
import {LoanListing} from "../lending-list/lending-list";

const Lendings = () => {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <PageHeader
        headerTitle="Lendings"
        headerSubtitle="Manage your lendings"
        right={
          <div className="flex items-center gap-2">
            <AddOrUpdateLendings>
              <Button>
                <PlusIcon />
                <p className="hidden md:block">Add</p>
              </Button>
            </AddOrUpdateLendings>
          </div>
        }
      />
      <LoanListing />
    </div>
  );
};

export default Lendings;
