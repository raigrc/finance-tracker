"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { FaUserLarge } from "react-icons/fa6";
import { logout } from "@/actions/logout";
import LogoutButton from "./logout-button";
import { IoExitOutline } from "react-icons/io5";
import React from "react";

const UserButton: React.FC = React.memo(() => {
  const { data: session, status } = useSession();
  console.log("UserButton rendered");
  const signOut = () => {
    logout();
  };

  if (status == "loading") return <h1>Loading data...</h1>;

  return (
    <div className="flex items-center space-x-3">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={session?.user.image as string} />
            <AvatarFallback>
              <FaUserLarge />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="flex items-center space-x-3 p-2">
            <Avatar>
              <AvatarImage src={session?.user.image as string} />
              <AvatarFallback>
                <FaUserLarge />
              </AvatarFallback>
            </Avatar>
            <div>
              <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs text-slate-400">
                {session?.user.email}
              </DropdownMenuLabel>
            </div>
          </div>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <IoExitOutline size={16} className="mr-2" />
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

export default UserButton;
