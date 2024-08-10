import { SuccessMessageProps } from "@/types";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

const BudgetSuccess = ({ message }: SuccessMessageProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <FaCircleCheck className="fill-emerald-500" />
      {message}
    </div>
  );
};

export default BudgetSuccess;
