import { BackButtonProps } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <div className="flex items-center justify-center w-full">
      <Button variant="link">
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
};

export default BackButton;
