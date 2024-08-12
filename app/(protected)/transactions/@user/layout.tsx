"use client";
import Header from "@/components/dashboard/header";
import TransactionForm from "@/components/transactions/transaction-form";
import React from "react";

const UserTransactionPage = ({
  transactions_table,
}: {
  transactions_table: React.ReactNode;
}) => {
  return (
    <>
      <Header title="All Transactions" />
      <div className="">
        <div className="flex items-center justify-between">
          
        </div>

        {transactions_table}
      </div>
    </>
  );
};

export default UserTransactionPage;
