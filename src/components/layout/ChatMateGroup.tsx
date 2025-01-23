"use client";
import React, { useEffect, useState } from "react";
import ChatMate from "./ChatMate";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatsCollection } from "@/utils/ChatsCollection";

// Define the type for individual chat objects
interface Chat {
  name: string;
  message: string;
  profile: string;
  users1_id: string;
  users2_id: string;
  conversations: {
    message: string;
  }[];
}

// Define the props type for the ChatMateGroup component
interface ChatMateGroupProps {
  onChatMateClick: (chat: Chat) => void;
  chatId: (chat: Chat) => void;
}

const ChatMateGroup: React.FC<ChatMateGroupProps> = ({
  chatId,
  onChatMateClick,
}) => {
  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(
    null
  );
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch chat data
  const fetchChats = async () => {
    try {
      const appWriteData = await chatsCollection();
      setChats(appWriteData);
    } catch (error) {
      console.error("Error fetching data from users table:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // useEffect(() => {
  //   if (chats.length > 0 && selectedChatIndex === null) {
  //     setSelectedChatIndex(0);
  //     onChatMateClick(chats[0]);
  //   }
  // }, [chats, selectedChatIndex, onChatMateClick]);

  const handleChatClick = (chat: Chat, index: number) => {
    setSelectedChatIndex(index); // Update the selected chat index
    onChatMateClick(chat);
    chatId(chat.id);
  };
  return (
    <ScrollArea className="h-[400px] w-full rounded-md">
      {loading ? (
        <p className="text-center text-gray-500">Loading. Please wait...</p>
      ) : chats.length > 0 ? (
        chats.map((chat, index) => (
          <div
            key={index}
            onClick={() => handleChatClick(chat, index)}
            className={`p-2 cursor-pointer rounded-md ${
              selectedChatIndex === index ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <ChatMate
              name={chat.otherParticipantName || "Unknown"}
              message={chat.lastMessage || "No messages yet"}
              profile={chat.profile}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No chats available.</p>
      )}
    </ScrollArea>
  );
};

export default ChatMateGroup;
