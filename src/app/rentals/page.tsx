import React, {Suspense} from "react";
import RentalListing from "@/components/rentals/rentals";

const Page = () => {
  return (
    <Suspense>
      <RentalListing />
    </Suspense>
  );
};

export default Page;
