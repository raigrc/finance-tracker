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

export interface CardDashboardProps {
  headerTitle: string;
  headerIcon: React.ReactNode;
  content: string | number;
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
