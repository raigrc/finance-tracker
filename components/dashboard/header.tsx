import { UserHeaderProps } from "@/types";
import React from "react";
import dynamic from "next/dynamic";

const CurrentDateTime = dynamic(
  () => import("@/components/current-date-time"),
  { ssr: false },
);

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
