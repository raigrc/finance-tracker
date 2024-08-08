"use client";
import { ChartConfig } from "@/components/ui/chart";
import ChartArea from "@/components/user/chart-area";
import { getMonthName } from "@/lib/get-month-name";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const UserNeedsChart = () => {
  const { data: session } = useSession();
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    const allBudget = session?.user.allbudgets;

    if (!allBudget) return;

    const transformedData = allBudget.map((budget) => ({
      savings: budget.savingsAmount,
      month: getMonthName(budget.month),
    }));

    setChartData(transformedData);
  }, [session]);

  const chartConfig = {
    savings: {
      label: "Savings",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <ChartArea
      title="Savings Chart"
      data={chartData}
      config={chartConfig}
      className="w-2/3"
    />
  );
};

export default UserNeedsChart;
