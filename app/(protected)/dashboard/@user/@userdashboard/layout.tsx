"use client";
import BudgetForm from "@/components/dashboard/budget-form";
import Header from "@/components/dashboard/header";
import TransactionButton from "@/components/dashboard/transaction-form";
import DashboardHeadButtons from "@/components/dashboard/dashboard-head-buttons";
import React from "react";

const UserDashboard = ({
  chart,
  transaction,
  summary,
}: {
  chart?: React.ReactNode;
  transaction?: React.ReactNode;
  summary?: React.ReactNode;
}) => {
  return (
    <div>
      <Header title="Dashboard" />
      {summary}

      <div className="flex items-center justify-between">
        <DashboardHeadButtons />
        <div className="space-x-3">
          <TransactionButton />
          <BudgetForm />
        </div>
      </div>

      <div className="flex w-full space-x-3">
        {chart}
        {transaction}
      </div>
    </div>
  );
};

export default UserDashboard;
