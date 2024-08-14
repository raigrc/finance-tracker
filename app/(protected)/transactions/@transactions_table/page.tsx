"use client";
import PaginationTable from "@/components/transactions/pagination-table";
import TransactionFilter from "@/components/transactions/transaction-filter";
import TransactionForm from "@/components/transactions/transaction-form";
import TransactionsTable from "@/components/transactions/transaction-table";
import { Transaction } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa6";

const UserTransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const searchParams = useSearchParams();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [filters, setFilters] = useState<any>({
    needs: true,
    wants: true,
    savings: true,
    income: true,
    expense: true,
  });

  console.log({ filters });

  const fetchData = async (page: number) => {
    const queryParams = new URLSearchParams({
      page: String(page),
      ...filters,
    });

    try {
      const response = await fetch(
        `/api/transactions?${queryParams.toString()}`,
      );
      console.log({ response });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      setTransactions(data.transactions);
      setTotalPages(data.totalPages);
      setTotalTransactions(data.total);
    } catch (error) {
      console.error("Error Fetching Transactions:", error);
    }
  };

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
    fetchData(page);
  }, [searchParams, filters]);
  return (
    <>
      <div className="flex items-center justify-between">
        <TransactionFilter icon={<FaCaretDown />} onFilterChange={setFilters} />
        <TransactionForm />
      </div>

      <TransactionsTable
        transactions={transactions}
        totalTransactions={totalTransactions}
      />
      <PaginationTable totalPages={totalPages} currentPage={currentPage} />
    </>
  );
};

export default UserTransactionsTable;
