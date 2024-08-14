"use client";
import Header from "@/components/dashboard/header";
import dynamic from "next/dynamic";
import React from "react";

const BudgetsPage = ({ budgets_table }: { budgets_table: React.ReactNode }) => {
  return (
    <div>
      <Header title="All Budgets" />
      {budgets_table}
    </div>
  );
};

export default BudgetsPage;
