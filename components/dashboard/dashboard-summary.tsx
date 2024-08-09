import CardDashboard from "@/components/dashboard/card-dashboard";
import { FaGamepad, FaHouse, FaUser } from "react-icons/fa6";
import { TbMoneybag } from "react-icons/tb";
import { MdOutlineSavings } from "react-icons/md";
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
        headerTitle="Total Money"
        headerIcon={<TbMoneybag />}
        content={`${formatCurrency(userBudget.totalAmount)}`}
        footerTitle="Overall Money"
        footerValue=""
      />
      <CardDashboard
        headerTitle={`Total Needs`}
        headerIcon={<FaHouse />}
        content={`${formatCurrency(userBudget.totalNeeds)}`}
        footerTitle="Available this month"
        footerValue={budgetThisMonth?.needsAmount as number}
      />
      <CardDashboard
        headerTitle={`Total Want`}
        headerIcon={<FaGamepad />}
        content={`${formatCurrency(userBudget.totalWants)}`}
        footerTitle="Available this month"
        footerValue={budgetThisMonth?.wantsAmount as number}
      />
      <CardDashboard
        headerTitle={`Total Savings`}
        headerIcon={<MdOutlineSavings />}
        content={`${formatCurrency(userBudget.totalSavings)}`}
        footerTitle="Available this month"
        footerValue={budgetThisMonth?.savingsAmount as number}
      />
    </div>
  );
};

export default DashboardSummary;
