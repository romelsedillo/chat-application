import React from "react";
import ChatMate from "./ChatMate";
import { ScrollArea } from "@/components/ui/scroll-area";

const chatData = [
  {
    name: "Jake Brown",
    message: "Hello Good morning",
    profile: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    name: "Liam Anderson",
    message: "How are you doing today?",
    profile: "https://i.pravatar.cc/150?u=a042581f4e29026701e",
  },
  {
    name: "Emma Johnson",
    message: "Can we meet at 3 PM?",
    profile: "https://i.pravatar.cc/150?u=a042581f4e29026702b",
  },
  {
    name: "Sophia Davis",
    message: "I'll send the files shortly.",
    profile: "https://i.pravatar.cc/150?u=a042581f4e29026703a",
  },
  {
    name: "Oliver Martinez",
    message: "Looking forward to the meeting.",
    profile: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
  },
  {
    name: "Mia Garcia",
    message: "Let’s catch up later.",
    profile: "https://i.pravatar.cc/150?u=a042581f4e29026705c",
  },
  {
    name: "Noah Wilson",
    message: "Good evening, any updates?",
    profile: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
  },
  {
    name: "Isabella Taylor",
    message: "I'll be late by 10 minutes.",
    profile: "https://i.pravatar.cc/150?u=a042581f4e29026707e",
  },
  {
    name: "Mason White",
    message: "What time is the meeting tomorrow?",
    profile: "https://i.pravatar.cc/150?u=a042581f4e29026708f",
  },
  {
    name: "Ava Thomas",
    message: "Thanks for the quick response!",
    profile: "https://i.pravatar.cc/150?u=a042581f4e29026709g",
  },
  {
    name: "James Jackson",
    message: "I'll check it and get back to you.",
    profile: "https://i.pravatar.cc/150?u=a042581f4e29026710h",
  },
  {
    name: "Lucas Harris",
    message: "Could we reschedule for tomorrow?",
    profile: "https://i.pravatar.cc/150?u=a042581f4e29026711i",
  },
];


const ChatMateGroup = () => {
  return (
    <ScrollArea className="h-[340px] w-full rounded-md">
      {chatData.map((chat, index) => (
        <ChatMate
          key={index}
          name={chat.name}
          message={chat.message}
          profile={chat.profile}
        />
      ))}
    </ScrollArea>
  );
};

export default ChatMateGroup;
