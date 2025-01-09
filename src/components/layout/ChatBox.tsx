import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StartAVoiceCall } from "./StartAVoiceCall";
import { StartAVideoCall } from "./StartAVideoCall";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import profileIcon from "@/images/profile-icon.jpg";
import { messagesCollection } from "@/utils/MessagesCollection";
import addMessage from "@/utils/AddMessage";
import { chatsCollection } from "@/utils/ChatsCollection";
import { useAuthStore } from "@/stores/useAuthStore";

const ChatBox: React.FC<ChatBoxProps> = ({ chatMate, chatId }) => {
  const [messagesData, setMessagesData] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  // Fetch messages for the selected chat
  const fetchMessages = async () => {
    if (!chatId) return;

    setLoading(true);
    try {
      const appWriteData = await messagesCollection();
      const filteredMessages = appWriteData.filter(
        (message: Message) => message.chatsId === chatId
      );
      setMessagesData(filteredMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to the bottom of the chat when messages update
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      requestAnimationFrame(() => {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      });
    }
  }, [messagesData]);

  // Fetch messages when chatId changes
  useEffect(() => {
    if (chatId) {
      fetchMessages();
    } else {
      setMessagesData([]); // Clear messages if no chat is selected
    }
  }, [chatId]);

  return (
    <div className="col-span-2 h-full border-x flex flex-col">
      {/* Chat header */}
      <div className="flex items-center justify-between py-3 px-2">
        <div className="flex items-center gap-4 capitalize">
          <Avatar>
            <AvatarImage
              src={
                chatMate?.profile ||
                "https://i.pravatar.cc/150?u=a042581f4e29026704d"
              }
            />
            <AvatarFallback>
              {chatMate?.otherParticipantName?.[0] || "CN"}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-medium">
            {chatMate?.otherParticipantName || "Unknown Participant"}
          </h3>
        </div>
        <div className="flex items-center justify-between gap-2">
          <StartAVoiceCall />
          <StartAVideoCall />
        </div>
      </div>

      <Separator />

      {/* Chat messages */}
      <div
        className="flex-grow h-[200px] overflow-y-auto scroll-smooth focus:scroll-auto"
        ref={scrollAreaRef}
      >
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : chatId && messagesData.length > 0 ? (
          <div className="flex flex-col gap-2 p-2">
            {messagesData.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 w-full ${
                  message.senderId === chatMate?.otherParticipantId
                    ? "justify-end"
                    : ""
                }`}
              >
                {message.senderId === chatMate?.otherParticipantId && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={chatMate?.profile} />
                    <AvatarFallback>
                      {chatMate?.otherParticipantName?.[0] || "CN"}
                    </AvatarFallback>
                  </Avatar>
                )}

                <p
                  className={`p-4 text-xs mb-2 rounded ${
                    message.senderId === chatMate?.otherParticipantId
                      ? "bg-blue-300 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            {chatId ? "No messages yet." : "No chat selected"}
          </p>
        )}
      </div>

      {/* Message input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!inputMessage.trim() || !chatId) return;
          // Handle sending a message
        }}
        className="px-2 grid grid-cols-12 py-4"
      >
        <Input
          placeholder="Type a message"
          className="col-span-10 h-12 rounded border border-slate-700"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={!chatId}
        />
        <Button
          className="col-span-2 rounded ml-4"
          type="submit"
          disabled={!inputMessage.trim() || !chatId}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;
