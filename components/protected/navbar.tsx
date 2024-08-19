"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import UserButton from "@/components/protected/dashboard/user-button";
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
            <Link href="/goals">
              <NavigationMenuLink
                className={`bg- ${navigationMenuTriggerStyle()} ${pathname.includes("/goals") ? "bg-background text-primary" : "bg-background/15 text-slate-400"}`}
              >
                Goals
              </NavigationMenuLink>
            </Link>
            <Link href="/reports">
              <NavigationMenuLink
                className={`bg- ${navigationMenuTriggerStyle()} ${pathname.includes("/reports") ? "bg-background text-primary" : "bg-background/15 text-slate-400"}`}
              >
                Reports
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
