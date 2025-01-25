import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileIcon from "@/images/profile-icon.jpg";
import Image from "next/image";

interface ChatMateProps {
  name: string;
  message: string;
  profile: string;
}

const ChatMate: React.FC<ChatMateProps> = ({
  name,
  message,
  profile,
  status,
}) => {
  return (
    <div className="flex items-center gap-4  p-1 capitalize w-full hover:bg-gray-200 cursor-pointer">
      <div className="relative p-1">
        <Avatar>
          <AvatarImage
            src={profile}
            alt={name}
            className="rounded-full h-9 w-9"
          />

          <AvatarFallback>
            <Image height={400} width={400} src={profileIcon} alt="profile" />
          </AvatarFallback>
        </Avatar>
        <div
          className={`absolute z-10 bottom-1 right-1 h-3 w-3 rounded-full border border-white ${
            status === "online" ? "bg-lime-400" : "bg-gray-400"
          }`}
        ></div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-left">{name}</h3>
        <p className="text-xs text-left">{message}</p>
      </div>
    </div>
  );
};

export default ChatMate;
