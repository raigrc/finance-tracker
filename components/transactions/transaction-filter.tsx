import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const TransactionFilter = ({
  onFilterChange,
  icon,
}: {
  onFilterChange: (filters: any) => void;
  icon: React.ReactNode;
}) => {
  const [needs, setNeeds] = useState<Checked>(true);
  const [wants, setWants] = useState<Checked>(true);
  const [savings, setSavings] = useState<Checked>(true);

  const [income, setIncome] = useState<Checked>(true);
  const [expense, setExpense] = useState<Checked>(true);

  useEffect(() => {
    onFilterChange({
      needs,
      wants,
      savings,
      income,
      expense,
    });
  }, [needs, wants, savings, income, expense]);
  return (
    <div className="space-x-3 py-4">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Button variant="outline">Category {icon}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={needs}
            onCheckedChange={setNeeds}
          >
            Needs
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={wants}
            onCheckedChange={setWants}
          >
            Wants
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={savings}
            onCheckedChange={setSavings}
          >
            Savings
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Button variant="outline">Type {icon}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={income}
            onCheckedChange={setIncome}
          >
            Income
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={expense}
            onCheckedChange={setExpense}
          >
            Expense
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TransactionFilter;
