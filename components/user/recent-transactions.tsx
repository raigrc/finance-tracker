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

const RecentTransactions = ({
  title,
  description,
  width,
}: RecentTransactionProps) => {
  return (
    <Card className={`w-${width} h-full`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
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

export default RecentTransactions;
