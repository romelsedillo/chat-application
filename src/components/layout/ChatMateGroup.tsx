"use client";
import React, { useEffect, useState } from "react";
import ChatMate from "./ChatMate";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatData } from "@/utils/chatData";
import { userCollection } from "@/utils/UserCollection";
import { chatsCollection } from "@/utils/ChatsCollection";
import { useAuthStore } from "@/stores/useAuthStore";

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
}

const ChatMateGroup: React.FC<ChatMateGroupProps> = ({ onChatMateClick }) => {
  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(
    null
  );
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useAuthStore();

  const fetchUsers = async () => {
    try {
      const appWriteData = await userCollection();
      setUsers(appWriteData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from users table:", error);
    }
  };
  const fetchChats = async () => {
    try {
      const appWriteData = await chatsCollection();
      setChats(appWriteData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from users table:", error);
    }
  };
  useEffect(() => {
    fetchChats();
    fetchUsers();
  }, []);
  useEffect(() => {
    if (users.length > 0 && selectedChatIndex === null) {
      setSelectedChatIndex(0);
      onChatMateClick(users[0]);
    }
  }, [selectedChatIndex, onChatMateClick]);

  const handleChatClick = (chat: Chat, index: number) => {
    setSelectedChatIndex(index); // Update the selected chat index
    onChatMateClick(chat); // Notify the parent component
  };

  console.log(chats);
  console.log(loggedInUser?.$id);
  return (
    <ScrollArea className="h-[400px] w-full rounded-md">
      {chats
        // .filter(
        //   (chat) =>
        //     chat.users1_id && chat.users2_id === loggedInUser?.$id
        // chat.users1_id === loggedInUser?.$id &&
        // chat.users2_id === loggedInUser?.$id
        // )
        .map((chat, index) => (
          <div
            key={index}
            onClick={() => handleChatClick(chat, index)}
            className={`p-2 cursor-pointer rounded-md ${
              selectedChatIndex === index ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <ChatMate
              name={chat.user?.name}
              message={chat.lastMessage || "No messages yet"}
              profile={chat.profile}
            />
          </div>
        ))}
    </ScrollArea>
  );
};

export default ChatMateGroup;
