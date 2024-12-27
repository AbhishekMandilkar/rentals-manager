import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "./components/overview";
import { RecentTransactions } from "./components/recent-transactions";
import { LoanDistribution } from "./components/loan-distribution";
import { RentalOccupancy } from "./components/rental-occupancy"
import PageHeader from "../common/page-header";

export default async function AnalyticsPage() {
  const [activeLoans, overduePayments] = await Promise.all([
    fetch("http://localhost:3000/api/analytics/active-loans").then((res) =>
      res.json()
    ),
    fetch("http://localhost:3000/api/analytics/overdue-payments").then((res) =>
      res.json()
    ),
    //   fetch("http://localhost:3000/api/analytics/monthly-income").then((res) =>
    //     res.json()
    //   ),

    //   fetch("http://localhost:3000/api/analytics/rented-shops").then((res) =>
    //     res.json()
    //   ),
  ]);
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <PageHeader headerTitle="Analytics" />
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lending">Lending</TabsTrigger>
          <TabsTrigger value="rental">Rental</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Monthly Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Loans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeLoans?.count}</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Rented Shops
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14</div>
                <p className="text-xs text-muted-foreground">
                  +1 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Overdue Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overduePayments?.count}</div>
                <p className="text-xs text-muted-foreground">
                  -2 from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  You made 265 transactions this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="lending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Loan Distribution</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <LoanDistribution />
              </CardContent>
            </Card>
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>Top Borrowers</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add a table or list of top borrowers here */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="rental" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Rental Occupancy</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <RentalOccupancy />
              </CardContent>
            </Card>
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>Top Tenants</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add a table or list of top tenants here */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
