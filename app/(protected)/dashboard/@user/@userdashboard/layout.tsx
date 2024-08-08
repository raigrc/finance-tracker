"use client";
import BudgetForm from "@/components/user/budget-form";
import Header from "@/components/user/header";
import TransactionButton from "@/components/user/transaction-form";
import DashboardHeadButtons from "@/components/user/dashboard-head-buttons";
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
