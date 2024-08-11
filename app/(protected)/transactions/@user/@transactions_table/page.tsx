"use client";
import PaginationTable from "@/components/transactions/pagination-table";
import TransactionsTable from "@/components/transactions/transaction-table";
import { Transaction } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserTransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const searchParams = useSearchParams();
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchData = async (page: number) => {
    const response = await fetch(`/api/transactions?page=${page}`);
    const data = await response.json();
    console.log(data);
    setTransactions(data.transactions);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
    fetchData(page);
  }, [searchParams]);
  return (
    <>
      <TransactionsTable transactions={transactions} />
      <PaginationTable totalPages={totalPages} currentPage={currentPage} />
    </>
  );
};

export default UserTransactionsTable;
