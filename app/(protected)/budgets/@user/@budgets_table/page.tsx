"use client";
import BudgetsTable from "@/components/budgets/budgets-table";
import PaginationTable from "@/components/transactions/pagination-table";
import { Budget } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserBudgetsTable = () => {
  const searchParams = useSearchParams();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalBudgets, setTotalBudgets] = useState<number>(0);

  const fetchData = async (page: number) => {
    const response = await fetch(`api/budgets?page=${page}`);
    const data = await response.json();
    console.log(data);
    setBudgets(data.budgets);
    setTotalBudgets(data.total);
    setTotalPage(data.totalPages);
  };

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
    fetchData(page);
  }, [searchParams]);
  return (
    <>
      <BudgetsTable budgets={budgets} totalBudgets={totalBudgets} />
      <PaginationTable totalPages={totalPage} currentPage={currentPage} />
    </>
  );
};

export default UserBudgetsTable;
