import { ErrorMessageProps } from "@/types";
import React from "react";
import { FaTriangleExclamation } from "react-icons/fa6";

const TransactionError = ({ message }: ErrorMessageProps) => {
  if (!message) return null;
  return (
    <div>
      <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
        <FaTriangleExclamation className="fill-destructive" />
        {message}
      </div>
    </div>
  );
};

export default TransactionError;
