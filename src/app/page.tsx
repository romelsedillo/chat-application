"use client";

import { Input } from "@/components/ui/input";
import ChatMateGroup from "@/components/layout/ChatMateGroup";
import ChatBox from "@/components/layout/ChatBox";
import ChatMateProfile from "@/components/layout/ChatMateProfile";
import { Profile } from "@/components/layout/Profile";
import { ProfileOptions } from "@/components/layout/ProfileOptions";
import { AddChatMate } from "@/components/layout/AddChatMate";
import { useState, useEffect } from "react";
import Login from "@/components/layout/Login";
import { account } from "@/appwrite/appwrite";
import { useAuthStore } from "@/stores/useAuthStore";
import Loading from "@/components/layout/Loading";


export default function Home() {
  const { isLoggedIn, loading, checkUserSession } = useAuthStore();
  const [selectedChatMate, setSelectedChatMate] = useState(null);

  // Check user session when the component mounts
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // Handle chat mate click
  const handleChatMateClick = (chat) => {
    setSelectedChatMate(chat);
  };

  // Loading state
  if (loading) {
    return <Loading/>;
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="grid grid-cols-4 bg-white border rounded-xl ">
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
        <div className="py-4 w-full flex items-center justify-between">
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
