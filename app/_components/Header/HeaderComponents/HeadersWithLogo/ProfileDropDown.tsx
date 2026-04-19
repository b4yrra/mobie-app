"use client";

import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

type User = {
  firstName: string;
  lastName: string;
  imageUrl: string | null;
};

export const ProfileDropDown = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center gap-2 p-0 h-auto hover:bg-transparent focus-visible:ring-0"
        >
          {/* Avatar Logic */}
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="profile"
              className="w-[34px] h-[34px] rounded-full object-cover"
            />
          ) : (
            <CircleUser
              size={34}
              strokeWidth={1.2}
              className="text-white bg-blue-500 p-[2px] rounded-full"
            />
          )}

          {/* Name Display */}
          {user && (
            <span className="text-sm font-medium hidden sm:block">
              {user.firstName} {user.lastName}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user ? `${user.firstName} ${user.lastName}` : "Guest"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user ? "Personal Account" : "Please log in"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
