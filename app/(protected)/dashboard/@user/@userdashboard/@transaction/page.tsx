import RecentTransactions from "@/components/user/recent-transactions";
import React from "react";

const DashboardTransaction = () => {
  return (
    <RecentTransactions
      title="Recent Transactions"
      description="showing 10 recent transactions"
      className="w-1/3"
    />
  );
};

export default DashboardTransaction;
