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
import { FaCaretDown } from "react-icons/fa6";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const TransactionFilter = ({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) => {
  const [showNeeds, setShowNeeds] = useState<Checked>(true);
  const [showWants, setShowWants] = useState<Checked>(true);
  const [showSavings, setShowSavings] = useState<Checked>(true);

  const [showIncome, setShowIncome] = useState<Checked>(true);
  const [showExpense, setShowExpense] = useState<Checked>(true);

  useEffect(() => {
    onFilterChange({
      showNeeds,
      showWants,
      showSavings,
      showIncome,
      showExpense,
    });
  }, [showNeeds, showWants, showSavings, showIncome, showExpense]);
  return (
    <div className="space-x-3 py-4">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Button variant="ghost">
            Category <FaCaretDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={showNeeds}
            onCheckedChange={setShowNeeds}
          >
            Needs
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showWants}
            onCheckedChange={setShowWants}
          >
            Wants
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showSavings}
            onCheckedChange={setShowSavings}
          >
            Savings
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Button variant="ghost">
            Type <FaCaretDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={showIncome}
            onCheckedChange={setShowIncome}
          >
            Income
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showExpense}
            onCheckedChange={setShowExpense}
          >
            Expense
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TransactionFilter;
