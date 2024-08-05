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
}: CardDashboardProps) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="tracking-wide text-sm">{headerTitle}</CardTitle>
        <CardDescription className="text-lg">{headerIcon}</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-2xl">{content}</h1>
      </CardContent>
    </Card>
  );
};

export default CardDashboard;
