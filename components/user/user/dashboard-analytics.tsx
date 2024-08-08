import React from "react";
import ChartArea from "../chart-area";
import TransactionArea from "../recent-transactions";
import { usePathname } from "next/navigation";
import DashboardChart from "./dashboard-chart";

const DashboardAnalytics = () => {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex flex-row space-x-3">
        {/* <ChartArea /> */}
        <DashboardChart/>
        <TransactionArea title="" />
      </div>
    </div>
  );
};

export default DashboardAnalytics;
