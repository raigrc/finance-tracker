"use client";
import Header from "@/components/dashboard/header";
import TransactionFilter from "@/components/transactions/transaction-filter";
import React from "react";

const UserTransactionPage = ({
  transactions_table,
}: {
  transactions_table: React.ReactNode;
}) => {
  return (
    <>
      <div>
        <Header title="All Transactions" />
      </div>
      <div>
        <TransactionFilter />
        {transactions_table}
      </div>
    </>
  );
};

export default UserTransactionPage;
