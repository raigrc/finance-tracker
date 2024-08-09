import React from "react";

import RecentTransactions from "@/components/dashboard/recent-transactions";

const UserRecentTransaction = () => {
  return (
    <RecentTransactions
      title="Recent Transactions"
      description="showing 10 latest transactions"
      className="w-1/3"
    />
  );
};

export default UserRecentTransaction;
