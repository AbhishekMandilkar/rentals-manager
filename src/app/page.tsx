import React, { Suspense } from "react";
import AnalyticsPage from "@/components/analytics-dashboard/analytics-dashboard";
import {
  CardSkeleton,
  ChartSkeleton,
  TableSkeleton,
} from "@/components/analytics-dashboard/loading-skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function LoadingView() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartSkeleton />
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TableSkeleton />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const Page = () => {
  return (
    <Suspense fallback={<LoadingView />}>
      <AnalyticsPage />
    </Suspense>
  );
};

export default Page;
