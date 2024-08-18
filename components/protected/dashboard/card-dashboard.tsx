import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardDashboardProps } from "@/types";

const CardDashboard = ({
  headerTitle,
  headerIcon,
  content,
  footerTitle,
  footerValue,
  iconColor,
}: CardDashboardProps) => {
  return (
    <Card className={`w-full shadow-md`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm tracking-wide">{headerTitle}</CardTitle>
        <CardDescription
          className={`rounded-full p-2 text-lg text-white ${iconColor}`}
        >
          {headerIcon}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-2xl">{content}</h1>
      </CardContent>
      <CardFooter>
        <CardDescription>
          {footerTitle}: <span>{footerValue}</span>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default CardDashboard;
