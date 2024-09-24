import React from "react";
import ChatMate from "./ChatMate";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
const ChatMateGroup = () => {
  return (
    <ScrollArea className="h-[340px] w-full rounded-md border">
      <ChatMate />
      <Separator />
      <ChatMate />
      <Separator />
      <ChatMate />
      <Separator />
      <ChatMate />
      <Separator />
      <ChatMate />
      <Separator />
      <ChatMate />
      <Separator />
      <ChatMate />
      <Separator />
      <ChatMate />
      <Separator />
      <ChatMate />
      <Separator />
      <ChatMate />
      <Separator />
      <ChatMate />
    </ScrollArea>
  );
};

export default ChatMateGroup;
