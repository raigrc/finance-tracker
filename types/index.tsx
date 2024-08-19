import { ChartConfig } from "@/components/ui/chart";
import { Budget, Transaction, User } from "@prisma/client";
import { IconType } from "react-icons/lib";

export interface AuthHeaderProps {
  label: string;
}

export interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonHref: string;
  backButtonLabel: string;
  showSocial?: boolean;
}

export interface BackButtonProps {
  label: string;
  href: string;
}

export interface ErrorMessageProps {
  message: string | undefined;
}

export interface SuccessMessageProps {
  message: string | undefined;
}

export interface CardDashboardProps {
  headerTitle: string;
  headerIcon: React.ReactNode;
  content: string | number;
  footerTitle?: string;
  footerValue?: string | number;
  iconColor?: string;
}

export interface UserHeaderProps {
  title: string;
}

export interface BudgetSummary {
  totalAmount: number;
  totalSavings: number;
  totalNeeds: number;
  totalWants: number;
}

export interface ChartAreaProps {
  title: string;
  description?: string;
  data: Budget[];
  config: ChartConfig;
  className?: string | undefined;
}

export interface RecentTransactionProps {
  title: string;
  description?: string;
  className?: string | undefined;
}

export interface PaginationProps {
  totalPages: number | undefined;
  currentPage: number | undefined;
}

export interface TransactionsTableProps {
  transactions: Transaction[];
  totalTransactions: number | undefined;
}

export interface BudgetsTableProps {
  budgets: Budget[];
  totalBudgets: number | undefined;
}

export interface FilterProps {
  onFilterChange: (filter: any) => void;
  icon: React.ReactNode;
  budgets?: Budget[];
}

export interface UserBudgetProps {
  balance: number;
  income: number;
  savings: number;
}

export interface Allocations {
  Savings: number;
  Needs: number;
  Wants: number;
}
