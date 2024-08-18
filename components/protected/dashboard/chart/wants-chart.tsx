"use client";
import { ChartConfig } from "@/components/ui/chart";
import ChartArea from "@/components/protected/dashboard/chart-area";
import { getMonthName } from "@/lib/get-month-name";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const WantsChart = () => {
  const { data: session } = useSession();
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    const allBudget = session?.user.allbudgets;

    if (!allBudget) return;

    const transformedData = allBudget.map((budget) => ({
      wants: budget.wantsAmount,
      month: getMonthName(budget.month),
    }));

    setChartData(transformedData);
  }, [session]);

  const chartConfig = {
    wants: {
      label: "Wants",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <ChartArea
      title="Wants Chart"
      data={chartData}
      config={chartConfig}
      className="w-2/3"
    />
  );
};

export default WantsChart;
