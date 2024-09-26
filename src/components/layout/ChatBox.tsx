import React from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoImageOutline } from "react-icons/io5";
import { LuCamera } from "react-icons/lu";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { CiFaceSmile } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { HiOutlinePhone } from "react-icons/hi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { MessageOption } from "./MessageOption";

const ChatBox = () => {
  return (
    <div className="col-span-2 h-full border-x flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between py-4 px-2">
          <div className="flex items-center gap-4 capitalize">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-medium">Melisa Smith</h3>
          </div>
          {/* icons */}
          <div className="flex items-center justify-between gap-2">
            <button className="w-8 h-8 p-1 hover:bg-gray-100 rounded-full flex items-center justify-center">
              <HiOutlinePhone className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 p-1 hover:bg-gray-100 rounded-full flex items-center justify-center">
              <HiOutlineVideoCamera className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 p-1 hover:bg-gray-100 rounded-full flex items-center justify-center">
              <IoIosInformationCircleOutline />
            </button>
          </div>
        </div>
        <Separator />
      </div>
      {/* chat field */}
      <div className="flex flex-col gap-4 items-start h-full py-4 px-2">
        <div className="flex items-start gap-4 w-full">
          <Avatar className="h-4 w-4">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="bg-gray-300 p-4 rounded">Hello, How are you?</p>
        </div>
        <div className="flex items-start gap-4 w-full">
          <Avatar className="h-4 w-4">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="bg-gray-300 p-4 rounded">Are you there?</p>
        </div>
        <div className="flex items-start justify-end gap-4 w-full">
          <MessageOption />
          <p className="bg-blue-300 p-4 rounded">Yeah! I&apos;m here.</p>
          <Avatar className="h-4 w-4">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-start justify-end gap-4 w-full">
          <p className="bg-blue-300 p-4 rounded">I&apos;m good.</p>
          <Avatar className="h-4 w-4">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="px-2 grid grid-cols-12 py-4">
        <div className="col-span-2 flex items-center">
          <button className="flex items-center justify-center hover:bg-gray-200 h-8 w-8 rounded-full">
            <IoImageOutline />
          </button>
          <button className="flex items-center justify-center hover:bg-gray-200 h-8 w-8 rounded-full">
            <LuCamera />
          </button>
          <button className="flex items-center justify-center hover:bg-gray-200 h-8 w-8 rounded-full">
            <HiOutlineMicrophone />
          </button>
        </div>
        <div className="col-span-8 flex items-center">
          <Input
            placeholder="Type a message"
            className=" h-12 w-[98%] rounded"
          />
        </div>
        <div className="col-span-2 flex items-center justify-between">
          <CiFaceSmile className="h-5 w-5" />
          <Button className="rounded">Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
