import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { FilterProps } from "@/types";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const BudgetsFilter = ({ onFilterChange, icon, budgets }: FilterProps) => {
  const [showYear, setShowYear] = useState<Checked>(true);
  const years = Array.from(
    new Set(budgets?.map((budget) => budget.year) || []),
  );

  useEffect(() => {
    onFilterChange({ showYear });
  }, [showYear]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">Year {icon}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {years.map((year) => {
            return (
              <DropdownMenuCheckboxItem
                key={year}
                checked={showYear}
                onCheckedChange={setShowYear}
              >
                {year}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default BudgetsFilter;
