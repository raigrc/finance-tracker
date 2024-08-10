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
import { auth } from "@/auth";
import { getAllTransactionsByUserId } from "@/data/transactions";
import { useSession } from "next-auth/react";
import { Transaction } from "@prisma/client";
import { formatCurrency } from "@/lib/format-currency";

const TransactionsTable = async () => {
  const session = await auth();
  const userId = session?.user.id;
  const transactions = await getAllTransactionsByUserId(userId as string);

  return (
    <Table className="">
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
      <TableFooter></TableFooter>
    </Table>
  );
};

export default TransactionsTable;
