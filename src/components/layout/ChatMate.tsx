import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMateProps {
  name: string;
  message: string;
  profile: string;
}

const ChatMate: React.FC<ChatMateProps> = ({ name, message, profile }) => {
  return (
    <div className="flex items-center gap-4 py-3 px-2 capitalize w-full hover:bg-gray-200 cursor-pointer">
      <Avatar>
        <AvatarImage src={profile} alt={name} />
        <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-left">{name}</h3>
        <p className="text-xs text-left">{message}</p>
      </div>
    </div>
  );
};

export default ChatMate;
