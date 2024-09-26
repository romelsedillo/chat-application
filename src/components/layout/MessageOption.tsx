import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineProfile } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

export function MessageOption() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer">
          <BsThreeDotsVertical className="h-4 w-4 text-gray-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-4">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <AiOutlineUser className="w-5 h-5 mr-1" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IoSettingsOutline className="w-5 h-5 mr-1" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <IoLogOutOutline className="w-5 h-5 mr-1" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
