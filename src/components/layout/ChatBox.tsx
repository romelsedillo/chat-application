import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ScrollArea } from "../ui/scroll-area";
import { StartAVoiceCall } from "./StartAVoiceCall";
import { StartAVideoCall } from "./StartAVideoCall";
import MessageInput from "./MessageInput";

// Define the type for chatMate props
interface ChatMate {
  name: string;
  profile?: string; // Optional URL for the avatar
}

interface ChatBoxProps {
  chatMate: ChatMate | null; // Allow chatMate to be null
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatMate }) => {
  const [messages, setMessages] = useState<
    { id: number; sender: "user" | "chatMate"; text: string }[]
  >([
    { id: 1, sender: "chatMate", text: "Hello, How are you?" },
    { id: 2, sender: "chatMate", text: "Are you there?" },
    { id: 3, sender: "user", text: "Yeah! I'm here." },
    { id: 4, sender: "user", text: "I'm good, how about you?" },
    {
      id: 5,
      sender: "chatMate",
      text: "I'm doing well too. What are you up to?",
    },
    { id: 6, sender: "user", text: "Just working on some projects." },
    { id: 7, sender: "user", text: "How about you?" },
    {
      id: 8,
      sender: "chatMate",
      text: "Just finished a meeting. It was exhausting!",
    },
  ]);

  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, sender: "user", text: input },
      ]);
      setInput("");
    }
  };

  return (
    <div className="col-span-2 h-full border-x flex flex-col">
      {/* Chat header */}
      <div className="flex items-center justify-between py-4 px-2">
        <div className="flex items-center gap-4 capitalize">
          <Avatar>
            <AvatarImage
              src={
                chatMate?.profile ||
                "https://i.pravatar.cc/150?u=a042581f4e29026704d"
              }
            />
            <AvatarFallback>{chatMate?.name?.[0] || "CN"}</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-medium">
            {chatMate?.name || "ChatMate Name"}
          </h3>
        </div>
        <div className="flex items-center justify-between gap-2">
          <StartAVoiceCall />
          <StartAVideoCall />
        </div>
      </div>
      <Separator />

      {/* Chat messages */}
      <ScrollArea className="flex-grow h-[200px]">
        <div className="flex flex-col gap-2 p-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 w-full ${
                message.sender === "user" ? "justify-end" : ""
              }`}
            >
              {message.sender === "chatMate" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={chatMate?.profile} />
                  <AvatarFallback>{chatMate?.name?.[0] || "CN"}</AvatarFallback>
                </Avatar>
              )}
              <p
                className={`p-4 rounded ${
                  message.sender === "user" ? "bg-blue-300" : "bg-gray-300"
                }`}
              >
                {message.text}
              </p>
              {message.sender === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message input */}
      <MessageInput input={input} setInput={setInput} handleSend={handleSend} />
    </div>
  );
};

export default ChatBox;
