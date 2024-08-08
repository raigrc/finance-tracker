"use client";
import Header from "@/components/user/header";
import DashboardHeadButtons from "@/components/user/user/dashboard-head-buttons";
import React from "react";

const UserDashboard = ({
  chart,
  transaction,
  summary,
}: {
  chart: React.ReactNode;
  transaction: React.ReactNode;
  summary: React.ReactNode;
}) => {
  return (
    <div>
      <Header title="Dashboard" />
      {summary}

      <DashboardHeadButtons />
      <div className="flex justify-between gap-x-3">
        {chart}
        {transaction}
      </div>
    </div>
  );
};

export default UserDashboard;
