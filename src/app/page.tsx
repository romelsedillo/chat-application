"use client";

import { Input } from "@/components/ui/input";
import ChatMateGroup from "@/components/layout/ChatMateGroup";
import ChatBox from "@/components/layout/ChatBox";
import ChatMateProfile from "@/components/layout/ChatMateProfile";
import { Profile } from "@/components/layout/Profile";
import { ProfileOptions } from "@/components/layout/ProfileOptions";
import { AddChatMate } from "@/components/layout/AddChatMate";
import { useState } from "react";

export default function Home() {
  const [selectedChatMate, setSelectedChatMate] = useState(null);

  const handleChatMateClick = (chat) => {
    setSelectedChatMate(chat); // When a chat mate is clicked, set the selected chat mate
  };

  return (
    <div className="grid grid-cols-4 bg-white border rounded-xl">
      {/* left side */}
      <div className=" col-span-1 text-2xl text-center p-4">
        <div className="flex items-center justify-between">
          {/* user profile */}
          <Profile />
          {/* profile options */}
          <div className="flex items-center gap-1">
            <ProfileOptions />
          </div>
        </div>

        {/* search bar */}
        <div className="py-8 w-full flex items-center justify-between">
          <Input placeholder="Search" className="rounded h-8 w-56" />
          <AddChatMate />
        </div>

        {/* chat mate group */}
        <ChatMateGroup onChatMateClick={handleChatMateClick} />
      </div>

      {/* middle: chat box */}
      <ChatBox chatMate={selectedChatMate} />

      {/* right: chat mate profile */}
      <ChatMateProfile chatMate={selectedChatMate} />
    </div>
  );
}
