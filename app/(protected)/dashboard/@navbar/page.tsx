"use client";
import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import UserButton from "@/components/user/user-button";
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
                className={`${navigationMenuTriggerStyle()} ${pathname === "/dashboard" ? "bg-background text-primary" : "bg-background/15 text-slate-400"}`}
              >
                Dashboard
              </NavigationMenuLink>
            </Link>
            <Link href="/user/transaction">
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${pathname === "/user/transaction" ? "bg-background text-primary" : "bg-background/15 text-slate-400"}`}
              >
                Transaction
              </NavigationMenuLink>
            </Link>
            <Link href="/user/budget">
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${pathname === "/user/budget" ? "bg-background text-primary" : "bg-background/15 text-slate-400"}`}
              >
                Budget
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
