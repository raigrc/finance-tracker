import { UserHeaderProps } from "@/types";
import React from "react";
import CurrentDateTime from "@/components/current-date-time";

const Header = ({ title }: UserHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="py-2 text-3xl font-bold tracking-tight drop-shadow-md">
        {title}
      </h1>
      <CurrentDateTime />
    </div>
  );
};

export default Header;
