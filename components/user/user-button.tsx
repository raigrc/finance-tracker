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

const UserButton = () => {
  const { data: session, status } = useSession();

  const signOut = () => {
    logout();
  };

  return (
    <div className="flex items-center space-x-3">
      <DropdownMenu modal={false}>
        <h1>{session?.user.name}</h1>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={session?.user.image as string} />
            <AvatarFallback>
              <FaUserLarge />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
          <DropdownMenuLabel className="text-xs text-slate-400">
            {session?.user.email}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>
            <IoExitOutline size={16} className="mr-2" />
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
