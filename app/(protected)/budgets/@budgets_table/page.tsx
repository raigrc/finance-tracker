"use client";
import BudgetsFilter from "@/components/protected/budgets/budgets-filter";
import BudgetsTable from "@/components/protected/budgets/budgets-table";
import BudgetForm from "@/components/protected/dashboard/budget-form";
import PaginationTable from "@/components/protected/transactions/pagination-table";
import { Budget } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa6";

const UserBudgetsTable = () => {
  const searchParams = useSearchParams();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalBudgets, setTotalBudgets] = useState<number>(0);
  const [filters, setFilters] = useState({});
  console.log({ filters });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async (page: number) => {
    setIsLoading(true);
    const response = await fetch(`api/budgets?page=${page}`);
    const data = await response.json();
    console.log(data);
    setBudgets(data.budgets);
    setTotalBudgets(data.total);
    setTotalPage(data.totalPages);
    setIsLoading(false);
  };

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
    fetchData(page);
  }, [searchParams]);

  if (isLoading) {
    return <h1 className="text-center">Loading Data...</h1>; // Show loading state
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <BudgetsFilter
          onFilterChange={setFilters}
          icon={<FaCaretDown />}
          budgets={budgets}
        />
        <BudgetForm />
      </div>
      <BudgetsTable budgets={budgets} totalBudgets={totalBudgets} />
      <PaginationTable totalPages={totalPage} currentPage={currentPage} />
    </>
  );
};

export default UserBudgetsTable;
