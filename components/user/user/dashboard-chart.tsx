import { ChartConfig } from "@/components/ui/chart";
import { getMonthName } from "@/lib/get-month-name";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ChartArea from "../chart-area";

const DashboardChart = () => {
  const { data: session } = useSession();
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    const allBudget = session?.user.allbudgets;

    if (!allBudget) return;

    const transformedData = allBudget.map((budget) => ({
      month: getMonthName(budget.month),
      needs: budget.needsAmount,
      wants: budget.wantsAmount,
      savings: budget.savingsAmount,
    }));

    setChartData(transformedData);
  }, [session]);

  const chartConfig = {
    needs: {
      label: "Needs",
      color: "hsl(var(--chart-1))",
    },
    wants: {
      label: "Wants",
      color: "hsl(var(--chart-2))",
    },
    savings: {
      label: "Savings",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;
  return <ChartArea title="Chart - Needs, Wants, Savings" data={chartData} config={chartConfig} />;
};

export default DashboardChart;
