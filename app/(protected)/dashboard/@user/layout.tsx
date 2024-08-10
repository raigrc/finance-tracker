"use client";
import BudgetForm from "@/components/dashboard/budget-form";
import DashboardHeadButtons from "@/components/dashboard/dashboard-head-buttons";
import Header from "@/components/dashboard/header";
import TransactionButton from "@/components/transactions/transaction-form";
import React from "react";

const UserLayout = ({
  summary,
  chart,
  recent_transaction,
}: {
  summary: React.ReactNode;
  chart: React.ReactNode;
  recent_transaction: React.ReactNode;
}) => {
  return (
    <div>
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
          {recent_transaction}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
