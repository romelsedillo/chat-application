import React, { useEffect, useState } from "react";
import ChatMate from "./ChatMate";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatData } from "@/utils/chatData";

// Define the type for individual chat objects
interface Chat {
  name: string;
  message: string;
  profile: string;
  conversations: {
    message: string;
  }[];
}

// Define the props type for the ChatMateGroup component
interface ChatMateGroupProps {
  onChatMateClick: (chat: Chat) => void;
}

const ChatMateGroup: React.FC<ChatMateGroupProps> = ({ onChatMateClick }) => {
  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(null);

  // Set the first chat as selected by default on initial render
  useEffect(() => {
    if (chatData.length > 0 && selectedChatIndex === null) {
      setSelectedChatIndex(0);
      onChatMateClick(chatData[0]);
    }
  }, [selectedChatIndex, onChatMateClick]);

  const handleChatClick = (chat: Chat, index: number) => {
    setSelectedChatIndex(index); // Update the selected chat index
    onChatMateClick(chat); // Notify the parent component
  };

  return (
    <ScrollArea className="h-[400px] w-full rounded-md">
      {chatData.map((chat, index) => (
        <div
          key={index}
          onClick={() => handleChatClick(chat, index)}
          className={`p-2 cursor-pointer rounded-md ${
            selectedChatIndex === index ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          <ChatMate
            name={chat.name}
            message={chat.conversations?.[0]?.message || "No messages yet"}
            profile={chat.profile}
          />
        </div>
      ))}
    </ScrollArea>
  );
};

export default ChatMateGroup;
