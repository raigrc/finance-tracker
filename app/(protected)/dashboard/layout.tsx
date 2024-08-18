"use client";
import BudgetForm from "@/components/protected/dashboard/budget-form";
import DashboardHeadButtons from "@/components/protected/dashboard/dashboard-head-buttons";
import Header from "@/components/protected/dashboard/header";
import TransactionForm from "@/components/protected/transactions/transaction-form";
import React from "react";

const DashboardLayout = ({
  summary,
  chart,
  recent_transaction,
}: {
  summary: React.ReactNode;
  chart: React.ReactNode;
  recent_transaction: React.ReactNode;
}) => {
  return (
    <div className="w-full">
      <Header title="Dashboard" />
      {summary}

      <div className="flex items-center justify-between">
        <DashboardHeadButtons />
        <div className="space-x-3">
          <TransactionForm />
          <BudgetForm />
        </div>
      </div>

      <div className="flex w-full space-x-3">
        {chart}
        {recent_transaction}
      </div>
    </div>
  );
};

export default DashboardLayout;
