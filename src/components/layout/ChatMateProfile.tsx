import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const ChatMateProfile = () => {
  return (
    <div className=" col-span-1 text-2xl text-center pt-6">
      <div className="w-full flex flex-col items-center justify-center mb-2">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="font-semibold">Melisa Smith</h1>
        <p className="text-xs">DevOps Engineer</p>
      </div>
      <Separator/>
    </div>
  );
};

export default ChatMateProfile;
