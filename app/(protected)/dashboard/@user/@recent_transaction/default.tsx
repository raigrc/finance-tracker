import RecentTransactions from "@/components/dashboard/recent-transactions";
import React from "react";

const DefaultUserRecentTransactions = () => {
  return (
    <RecentTransactions
      title="Recent Transactions"
      description="showing 10 latest transactions"
      className="w-1/3"
    />
  );
};

export default DefaultUserRecentTransactions;
