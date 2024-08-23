import CardDashboard from "@/components/protected/dashboard/card-dashboard";
import { FaCoins, FaMoneyBill, FaPiggyBank, FaWallet } from "react-icons/fa6";
import { formatCurrency } from "@/lib/format-currency";
import { UserBudgetProps } from "@/types";

const DashboardSummary = ({
  balance = 0,
  income = 0,
  expenses = 0,
  savings = 0,
}: UserBudgetProps) => {
  return (
    <div className="flex justify-between space-x-3 pb-10">
      <CardDashboard
        headerTitle="Balance"
        headerIcon={<FaCoins />}
        iconColor="bg-yellow-500/75"
        content={`${formatCurrency(balance)}`}
      />
      <CardDashboard
        headerTitle={`Income`}
        headerIcon={<FaMoneyBill />}
        iconColor="bg-emerald-500/75"
        content={`${formatCurrency(income)}`}
      />
      <CardDashboard
        headerTitle={`Expense`}
        headerIcon={<FaWallet />}
        iconColor="bg-rose-500/75"
        content={`${formatCurrency(expenses)}`}
      />
      <CardDashboard
        headerTitle={`Savings`}
        headerIcon={<FaPiggyBank />}
        iconColor="bg-sky-500/75"
        content={`${formatCurrency(savings)}`}
      />
    </div>
  );
};

export default DashboardSummary;
