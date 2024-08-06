import React from "react";
import ChartArea from "../chart-area";
import TransactionArea from "../transactions";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardAnalytics = () => {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex flex-row space-x-3">
        <ChartArea />
        <TransactionArea />
      </div>
    </div>
  );
};

export default DashboardAnalytics;
