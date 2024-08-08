import { ChartConfig } from "@/components/ui/chart";
import { Budget } from "@prisma/client";
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

export interface RegisterMessageProps {
  message: string | undefined;
}

export interface BudgetMessageProps {
  message: string | undefined;
}

export interface CardDashboardProps {
  headerTitle: string;
  headerIcon: React.ReactNode;
  content: string | number;
  footerTitle: string;
  footerValue: string | number;
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
  width?: string;
}

export interface RecentTransactionProps {
  title: string;
  description?: string;
  width?: string;
}
