"use client";
import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import UserButton from "@/components/dashboard/user-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-between flex">
        <div className="flex items-center gap-x-2">
          <NavigationMenuItem>
            <h1 className="text-3xl text-primary">F. Tracker</h1>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/dashboard">
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${pathname.includes("/dashboard") ? "bg-background text-primary" : "bg-background/15 text-slate-400"}`}
              >
                Dashboard
              </NavigationMenuLink>
            </Link>
            <Link href="/transactions">
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${pathname.includes("/transactions") ? "bg-background text-primary" : "bg-background/15 text-slate-400"}`}
              >
                Transactions
              </NavigationMenuLink>
            </Link>
            <Link href="/budgets">
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${pathname.includes("/budgets") ? "bg-background text-primary" : "bg-background/15 text-slate-400"}`}
              >
                Budgets
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </div>

        <NavigationMenuItem>
          <UserButton />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavBar;
