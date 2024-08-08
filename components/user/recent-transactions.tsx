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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { formatCurrency } from "@/lib/format-currency";

const RecentTransactions = ({
  title,
  description,
  className,
}: RecentTransactionProps) => {
  const { data: session } = useSession();
  const transactions = session?.user.alltransactions;
  if (!transactions) return session?.user.alltransactions;
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <Table>
          <TableHeader>
            <TableHead className="text-left">Type</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => {
              return (
                <TableRow key={transaction.id}>
                  <TableCell className="text-left">
                    {transaction.type}
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction.category}
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
        <Button variant="link">
          <Link href="">show all</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentTransactions;
