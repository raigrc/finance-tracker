import CardDashboard from "@/components/protected/dashboard/card-dashboard";
import { FaCoins, FaMoneyBill, FaPiggyBank, FaWallet } from "react-icons/fa6";

import { formatCurrency } from "@/lib/format-currency";
import { getBudgetThisMonth, getTotalBudgetByUserId } from "@/data/budget";
import { auth } from "@/auth";
import { monthNow, yearNow } from "@/lib/dates";

const DashboardSummary = async () => {
  const session = await auth();
  const userId = session?.user.id;
  const userBudget = await getTotalBudgetByUserId(userId as string);

  const budgetThisMonth = await getBudgetThisMonth(
    userId as string,
    monthNow as number,
    yearNow as number,
  );

  return (
    <div className="flex justify-between space-x-3 pb-10">
      <CardDashboard
        headerTitle="Total Amount"
        headerIcon={<FaCoins />}
        iconColor="bg-yellow-500/75"
        content={`${formatCurrency(userBudget.totalAmount)}`}
        footerTitle="Overall Money"
        footerValue=""
      />
      <CardDashboard
        headerTitle={`Income`}
        headerIcon={<FaMoneyBill />}
        iconColor="bg-emerald-500/75"
        content={`${formatCurrency(userBudget.totalNeeds)}`}
        footerTitle="Available this month"
        footerValue={budgetThisMonth?.needsAmount as number}
      />
      <CardDashboard
        headerTitle={`Expense`}
        headerIcon={<FaWallet />}
        iconColor="bg-rose-500/75"
        content={`${formatCurrency(userBudget.totalWants)}`}
        footerTitle="Available this month"
        footerValue={budgetThisMonth?.wantsAmount as number}
      />
      <CardDashboard
        headerTitle={`Savings`}
        headerIcon={<FaPiggyBank />}
        iconColor="bg-sky-500/75"
        content={`${formatCurrency(userBudget.totalSavings)}`}
        footerTitle="Available this month"
        footerValue={budgetThisMonth?.savingsAmount as number}
      />
    </div>
  );
};

export default DashboardSummary;
