"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import { account } from "@/appwrite/appwrite";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/stores/useAuthStore";

export function ProfileOptions() {
  const { loading } = useAuthStore();

  const logout = async () => {
    try {
      await account.deleteSession("current");
      toast.success("Successfully logged out!");
      window.location.reload(); // Reload the page
    } catch (error: any) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer">
          <BsThreeDotsVertical className="h-4 w-4 text-gray-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <AiOutlineUser className="w-5 h-5 mr-1" />
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={logout}>
          <IoLogOutOutline className="w-5 h-5 mr-1" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
