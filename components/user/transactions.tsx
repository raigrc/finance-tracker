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

const TransactionArea = () => {
  return (
    <Card className="h-full w-1/3">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Showing 10 recent transactions</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button variant="link">
          <Link href="">show all</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionArea;
