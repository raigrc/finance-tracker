"use client";
import Header from "@/components/protected/dashboard/header";
import React from "react";

const TransactionsPage = ({
  transactions_table,
}: {
  transactions_table: React.ReactNode;
}) => {
  return (
    <>
      <Header title="All Transactions" />
      {transactions_table}
    </>
  );
};

export default TransactionsPage;
