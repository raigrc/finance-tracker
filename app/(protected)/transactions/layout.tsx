"use client";
import { useSession } from "next-auth/react";
import React from "react";

const TransactionsLayout = ({
  user,
  admin,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
}) => {
  const { data: session, status } = useSession();

  if (status == "loading") return <h1>Loading Data...</h1>;

  return <div>{session?.user.role == "ADMIN" ? admin : user}</div>;
};

export default TransactionsLayout;
