import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { RecentTransactionProps } from "@/types";
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
import { auth } from "@/auth";
import { getAllTransactionsByUserId } from "@/data/transactions";

const RecentTransactions = async ({
  title,
  description,
  className,
}: RecentTransactionProps) => {
  const session = await auth();
  const transactions = await getAllTransactionsByUserId(
    session?.user.id as string,
  );
  if (!transactions) return null;
  return (
    <Card className={`relative ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Category</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 &&
              transactions.map((transaction) => {
                return (
                  <TableRow key={transaction.id}>
                    <TableCell className="py-3 text-left">
                      {transaction.category}
                    </TableCell>
                    <TableCell className="text-center">
                      {transaction.description}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button variant="link" asChild>
          <Link href="/transactions">show all</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentTransactions;
