import React from "react";
import ChatMate from "./ChatMate";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatData } from "@/utils/chatData";

// Define the type for individual chat objects
interface Chat {
  name: string;
  message: string;
  profile: string;
}

// Define the props type for the ChatMateGroup component
interface ChatMateGroupProps {
  onChatMateClick: (chat: Chat) => void;
}

const ChatMateGroup: React.FC<ChatMateGroupProps> = ({ onChatMateClick }) => {
  return (
    <ScrollArea className="h-[340px] w-full rounded-md">
      {chatData.map((chat, index) => (
        <div key={index} onClick={() => onChatMateClick(chat)}>
          <ChatMate
            name={chat.name}
            message={chat.message}
            profile={chat.profile}
          />
        </div>
      ))}
    </ScrollArea>
  );
};

export default ChatMateGroup;
