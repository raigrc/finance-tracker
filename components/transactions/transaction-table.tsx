import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/format-currency";
import { TransactionsTableProps } from "@/types";

const TransactionsTable = ({
  transactions,
  totalTransactions,
}: TransactionsTableProps) => {
  return (
    <>
      <h1>Number of Transactions: {totalTransactions}</h1>
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead className="w-1/6">Date</TableHead>
            <TableHead className="w-1/6 text-center">Description</TableHead>
            <TableHead className="w-1/6 text-center">Category</TableHead>
            <TableHead className="w-1/6 text-center">Type</TableHead>
            <TableHead className="w-1/6 text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            return (
              <TableRow key={transaction.id}>
                <TableCell className="w-1/6 py-3">
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="w-1/6 text-center">
                  {transaction.description}
                </TableCell>
                <TableCell className="w-1/6 text-center">
                  {transaction.category}
                </TableCell>
                <TableCell className="w-1/6 text-center">
                  {transaction.type}
                </TableCell>
                <TableCell className="w-1/6 text-right">
                  {formatCurrency(transaction.amount)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default TransactionsTable;
