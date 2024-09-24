import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import ChatMateGroup from "@/components/layout/ChatMateGroup";
import ChatBox from "@/components/layout/ChatBox";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import ChatMateProfile from "@/components/layout/ChatMateProfile";
import { Profile } from "@/components/layout/Profile";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ProfileOptions } from "@/components/layout/ProfileOptions";

export default function Home() {
  return (
    <div className="grid grid-cols-4 bg-white border rounded-xl">
      {/* right side */}
      <div className=" col-span-1 text-2xl text-center p-4">
        <div className="flex items-center justify-between">
          {/* user */}
          <Profile />
          {/* user */}
          <div className="flex items-center gap-1">
            <ProfileOptions />
            {/* <button className="w-8 h-8 p-1 hover:bg-gray-100 rounded-full flex items-center justify-center">
              <BsThreeDotsVertical className="h-4 w-4 text-gray-600" />
            </button> */}
            {/* <button className="w-8 h-8 p-1 hover:bg-gray-100 rounded-full flex items-center justify-center">
              <BsThreeDots className="h-4 w-4 text-gray-600" />
            </button> */}
            {/* <button className="w-8 h-8 p-1 hover:bg-gray-100 rounded-full flex items-center justify-center">
              <HiOutlineVideoCamera className="w-4 h-4 text-gray-600" />
            </button> */}
            {/* <button className="w-7 h-7 p-1 hover:bg-gray-100 rounded-full flex items-center justify-center">
              <FiEdit className="w-4 h-4 text-gray-600" />
            </button> */}
          </div>
        </div>
        {/* search bar */}
        <div className="py-8 w-full flex items-center justify-between">
          <Input placeholder="Search" className="rounded h-8 w-56" />
          <button className="bg-slate-200 w-8 h-8 flex items-center justify-center rounded">
            <PlusIcon />
          </button>
        </div>
        {/* search bar */}
        <ChatMateGroup />
      </div>
      {/* right side */}

      <ChatBox />
      <ChatMateProfile />
    </div>
  );
}
