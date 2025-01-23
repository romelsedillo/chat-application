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
import { useAuthStore } from "@/stores/useAuthStore";
import Loading from "@/components/layout/Loading";
import MyProfile2 from "@/components/layout/MyProfile2";

export default function Home() {
  const { loggedInUser, isLoggedIn, loading, checkUserSession } =
    useAuthStore();
  const [selectedChatMate, setSelectedChatMate] = useState(null);
  const [chatId, setChatId] = useState(null);

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
    return <Loading />;
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <Login />;
  }
  console.log(chatId);
  return (
    <div className="grid grid-cols-4 bg-white border rounded-xl">
      {/* left side */}
      <div className=" col-span-1 text-2xl text-center p-4 border-x">
        <div className="flex items-center justify-between">
          {/* user profile */}
          <Profile onChatMateClick={handleChatMateClick} />
        </div>

        {/* search bar */}
        <div className="py-4 w-full flex items-center justify-between">
          <Input placeholder="Search" className="rounded h-8 w-56" />
          <AddChatMate onChatMateClick={handleChatMateClick} />
        </div>

        {/* chat mate group */}
        <ChatMateGroup
          chatId={setChatId}
          onChatMateClick={handleChatMateClick}
        />
      </div>

      {selectedChatMate ? (
        <>
          {/* Middle: Chat box */}
          <ChatBox chatMate={selectedChatMate} chatId={selectedChatMate?.id} ChatId={chatId}/>

          {/* Right: Chat mate profile */}
          <ChatMateProfile chatMate={selectedChatMate} />
        </>
      ) : (
        <MyProfile2 />
        // <h1>Profile</h1>
      )}
    </div>
  );
}
