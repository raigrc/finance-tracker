"use client";
import BudgetsFilter from "@/components/budgets/budgets-filter";
import Header from "@/components/dashboard/header";
import React from "react";

const UserBudgetsPage = ({
  budgets_table,
}: {
  budgets_table: React.ReactNode;
}) => {
  return (
    <div>
      <div>
        <Header title="All Budgets" />
      </div>
      <div>
        <BudgetsFilter />
        {budgets_table}
      </div>
    </div>
  );
};

export default UserBudgetsPage;
