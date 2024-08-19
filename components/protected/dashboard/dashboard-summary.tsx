import CardDashboard from "@/components/protected/dashboard/card-dashboard";
import { FaCoins, FaMoneyBill, FaPiggyBank, FaWallet } from "react-icons/fa6";
import { formatCurrency } from "@/lib/format-currency";
import { getBudgetThisMonth, getTotalBudgetByUserId } from "@/data/budget";
import { auth } from "@/auth";
import { monthNow, yearNow } from "@/lib/dates";
import { UserBudgetProps } from "@/types";

const DashboardSummary = ({ totalMoney }: UserBudgetProps) => {
  return (
    <div className="flex justify-between space-x-3 pb-10">
      <CardDashboard
        headerTitle="Balance"
        headerIcon={<FaCoins />}
        iconColor="bg-yellow-500/75"
        content={`${formatCurrency(totalMoney)}`}
      />
      <CardDashboard
        headerTitle={`Income`}
        headerIcon={<FaMoneyBill />}
        iconColor="bg-emerald-500/75"
        content={`${formatCurrency(1)}`}
      />
      <CardDashboard
        headerTitle={`Expense`}
        headerIcon={<FaWallet />}
        iconColor="bg-rose-500/75"
        content={`${formatCurrency(2)}`}
      />
      <CardDashboard
        headerTitle={`Savings`}
        headerIcon={<FaPiggyBank />}
        iconColor="bg-sky-500/75"
        content={`${formatCurrency(3)}`}
      />
    </div>
  );
};

export default DashboardSummary;
