import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatMate = () => {
  return (
    <div className="flex items-center gap-4 py-2 capitalize">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-left">John Smith</h3>
        <p className="text-xs text-left">Hello. Good morning.</p>
      </div>
    </div>
  );
};

export default ChatMate;
