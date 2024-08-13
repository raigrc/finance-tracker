"use client";
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
      {budgets_table}
    </div>
  );
};

export default UserBudgetsPage;
