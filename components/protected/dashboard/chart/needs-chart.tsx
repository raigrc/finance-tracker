"use client";
import { ChartConfig } from "@/components/ui/chart";
import ChartArea from "@/components/protected/dashboard/chart-area";
import { getMonthName } from "@/lib/get-month-name";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const NeedsChart = () => {
  const { data: session, status } = useSession();

  if (status == "loading") return <h1>Loading...</h1>;
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    const allBudget = session?.user.allbudgets;

    if (!allBudget) return;

    const transformedData = allBudget.map((budget) => ({
      needs: budget.needsAmount,
      month: getMonthName(budget.month),
    }));

    setChartData(transformedData);
  }, [session]);

  const chartConfig = {
    needs: {
      label: "Needs",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <ChartArea
      title="Needs Chart"
      data={chartData}
      config={chartConfig}
      className="w-2/3"
    />
  );
};

export default NeedsChart;
