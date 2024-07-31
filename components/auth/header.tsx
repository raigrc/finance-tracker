import { AuthHeaderProps } from "@/types";
import React from "react";

const AuthHeader = ({ label }: AuthHeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Finance Tracker</h1>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};

export default AuthHeader;
