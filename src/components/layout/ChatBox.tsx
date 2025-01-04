import React, { useState, useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "../ui/scroll-area"; // Use your ScrollArea
import { StartAVoiceCall } from "./StartAVoiceCall";
import { StartAVideoCall } from "./StartAVideoCall";
import MessageInput from "./MessageInput";
import { CgProfile } from "react-icons/cg";
import profileIcon from "@/images/profile-icon.jpg";
import Image from "next/image";

// Define the type for ChatMate and Conversation
interface ChatMate {
  name: string;
  profile?: string; // Optional URL for the avatar
  conversations: {
    id: number;
    sender: "user" | string; // Name or "user"
    message: string;
  }[];
}

interface ChatBoxProps {
  chatMate: ChatMate | null; // Allow chatMate to be null
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatMate }) => {
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState<string>("");

  // Create a ref for the scroll area
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {};

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      requestAnimationFrame(() => {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      });
    }
  }, [messages]); // Dependency array includes messages

  useEffect(() => {
    
  }, []);

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
              {chatMate?.name?.[0] || (
                // <CgProfile className="w-9 h-9 font-light" />
                <Image
                  height={400}
                  width={400}
                  src={profileIcon}
                  alt="profile"
                />
              )}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-medium">{chatMate?.name || ""}</h3>
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
        <div className="flex flex-col gap-2 p-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 w-full ${
                message.sender !== chatMate?.name ? "justify-end" : ""
              }`}
            >
              {message.sender === chatMate?.name && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={chatMate?.profile} />
                  <AvatarFallback>{chatMate?.name?.[0] || "CN"}</AvatarFallback>
                </Avatar>
              )}
              <p
                className={`p-4 text-xs mb-2 rounded ${
                  message.sender !== chatMate?.name
                    ? "bg-blue-300"
                    : "bg-gray-300"
                }`}
              >
                {message.message}
              </p>
              {/* {message.sender === "You" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              )} */}
            </div>
          ))}
        </div>
      </div>

      {/* Message input */}
      <MessageInput input={input} setInput={setInput} handleSend={handleSend} />
    </div>
  );
};

export default ChatBox;
