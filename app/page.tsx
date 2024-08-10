import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full flex items-center justify-center">
      <Link href="/login">
        <Button size="lg" asChild>Login</Button>
      </Link>
    </div>
  );
}
