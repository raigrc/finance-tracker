"use client";
import BudgetsFilter from "@/components/budgets/budgets-filter";
import BudgetForm from "@/components/dashboard/budget-form";
import Header from "@/components/dashboard/header";
import React from "react";

const UserBudgetsPage = ({
  budgets_table,
}: {
  budgets_table: React.ReactNode;
}) => {
  return (
    <div>
      <Header title="All Budgets" />
      <div className="pt-10">
        <div className="flex items-center justify-between">
          <BudgetsFilter />
          <BudgetForm />
        </div>

        {budgets_table}
      </div>
    </div>
  );
};

export default UserBudgetsPage;
