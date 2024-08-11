import React, { Suspense, lazy } from "react";
import {
  Table,
  TableCaption,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BudgetsTableProps } from "@/types";
import { getMonthName } from "@/lib/get-month-name";

const BudgetsTable = ({ totalBudgets, budgets }: BudgetsTableProps) => {
  return (
    <>
      <h1>Number of Budgets: {totalBudgets}</h1>
      <Table className="table-fixed">
        <TableHeader className="">
          <TableRow>
            <TableHead className="py-4 text-left">Month</TableHead>
            <TableHead className="text-center">Year</TableHead>
            <TableHead className="text-center">Needs</TableHead>
            <TableHead className="text-center">Wants</TableHead>
            <TableHead className="text-center">Savings</TableHead>
            <TableHead className="text-center">Allocation %</TableHead>
            <TableHead className="text-right">Total Money</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<h1>Loading Data...</h1>}>
            {budgets.map((budget) => {
              return (
                <TableRow key={budget.id}>
                  <TableCell className="py-3 text-left">
                    {getMonthName(budget.month)}
                  </TableCell>
                  <TableCell className="text-center">{budget.year}</TableCell>
                  <TableCell className="text-center">
                    {budget.needsAmount}
                  </TableCell>
                  <TableCell className="text-center">
                    {budget.wantsAmount}
                  </TableCell>
                  <TableCell className="text-center">
                    {budget.savingsAmount}
                  </TableCell>
                  <TableCell className="text-center">
                    {budget.needsPercentage}/{budget.wantsPercentage}/
                    {budget.savingsPercentage}
                  </TableCell>
                  <TableCell className="text-right">
                    {budget.overallMoney}
                  </TableCell>
                </TableRow>
              );
            })}
          </Suspense>
        </TableBody>
      </Table>
    </>
  );
};

export default BudgetsTable;
