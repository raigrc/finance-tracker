import { BudgetMessageProps } from "@/types";
import React from "react";
import { FaTriangleExclamation } from "react-icons/fa6";

const BudgetError = ({ message }: BudgetMessageProps) => {
  if (!message) return null;
  
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <FaTriangleExclamation className="fill-destructive" />
      {message}
    </div>
  );
};

export default BudgetError;
