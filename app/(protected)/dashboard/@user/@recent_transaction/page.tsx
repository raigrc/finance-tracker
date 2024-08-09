import RecentTransactions from "@/components/dashboard/recent-transactions";
import React from "react";

const UserRecentTransactions = () => {
  return (
    <RecentTransactions
      title="Recent Transactions"
      description="showing 10 latest transactions"
      className="w-1/3"
    />
  );
};

export default UserRecentTransactions;
