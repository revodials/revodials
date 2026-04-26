"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/app/componensts/overview";
import { RecentSales } from "@/app/componensts/recent-sales";
import { AdminPanelDataFetch } from "../actions/adminAnalytics";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const getCurrentMonthYear = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear());
  const [year, month] = selectedMonth.split("-");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["AdminData" + month + year],
    queryFn: () => AdminPanelDataFetch(month, year),
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600">
        Error loading admin data: {isError}
      </div>
    );
  }

  return (
    <>
      <div className="flex-col flex w-full">
        <div className="flex-1 space-y-4 p-3 lg:p-8 pt-6 w-full">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col space-y-2 w-auto">
              <h2 className="text-md font-semibold tracking-tight">
                Select month
              </h2>
              <Input
                type="month"
                placeholder="Select month"
                className="w-full p-2 border rounded"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between  space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sales
                </CardTitle>
                {/* icon */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    data?.totalSales?.toLocaleString("en-PK")
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Sales of this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                {/* icon */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    data?.users?.length
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total orders
                </CardTitle>
                {/* icon */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    data?.totalOrders
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Orders
                </CardTitle>
                {/* icon */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    data?.totalPendingOrders
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
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
                {isLoading ? (
                  <Skeleton className="h-[43vh] w-full" />
                ) : (
                  <Overview numbers={month} total={data?.totalSales || 0} />
                )}
              </CardContent>
            </Card>
            <Card className="col-span-4 lg:col-span-3">
              <CardHeader>
                <CardTitle>Users details</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <ScrollArea className={"h-[60vh]"}>
                  {isLoading ? (
                    <Skeleton className="h-[45vh] w-full" />
                  ) : (
                    <RecentSales data={data?.users} />
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
