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

// Define the type for ChatMate
interface ChatMate {
  id: string;
  name: string;
  profile?: string; // Optional URL for the avatar
  user1?: { $id: string; name: string };
}

interface Message {
  id: string;
  senderId: string;
  chatsId: string;
  sender: string;
  content: string;
}

interface ChatBoxProps {
  chatMate: ChatMate | null; // Allow chatMate to be null
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatMate, chatId }) => {
  const [messagesData, setMessagesData] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const { loggedInUser } = useAuthStore();
  const chatsId = chatId;
  const senderId = loggedInUser?.$id;

  // Fetch messages from the collection
  const fetchDataMessages = async () => {
    try {
      const appWriteData = await messagesCollection();
      setMessagesData(appWriteData);
    } catch (error) {
      console.error("Error fetching data from messages collection:", error);
    } finally {
      setLoading(false);
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

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();

    console.log(chatsId, senderId, inputMessage);

    // Ensure the message is not just whitespace
    if (!inputMessage.trim()) {
      console.log("Cannot send an empty message.");
      return;
    }

    try {
      // Optional: Add loading state if needed
      console.log("Sending message...");

      // Await if addMessage is asynchronous
      await addMessage(chatsId, senderId, inputMessage.trim());

      console.log(`Message sent: ${inputMessage.trim()}`);

      // Clear the input field after successful message sending
      setInputMessage("");
    } catch (error) {
      console.error("Failed to send the message:", error);
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

  useEffect(() => {
    fetchDataMessages();
    fetchChats();
  }, []);
  console.log(chatMate);
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
                <Image
                  height={400}
                  width={400}
                  src={profileIcon}
                  alt="profile"
                />
              )}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-medium">
            {chatMate?.user2?.name || chatMate?.name || ""}
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
        ) : (
          <div className="flex flex-col gap-2 p-2">
            {chatId ? (
              messagesData
                .filter(
                  (message) =>
                    message.chatsId === chatId ||
                    message.senderId === loggedInUser?.$id
                )
                .map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-4 w-full ${
                      message.senderId === loggedInUser?.$id
                        ? "justify-end"
                        : ""
                    }`}
                  >
                    {/* Show avatar only for chatMate's messages */}
                    {message.senderId === chatMate?.user1?.$id && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={chatMate?.profile} />
                        <AvatarFallback>
                          {chatMate?.name?.[0] || "CN"}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    {/* Message bubble */}
                    <p
                      className={`p-4 text-xs mb-2 rounded ${
                        message.senderId === loggedInUser?.$id
                          ? "bg-blue-300 text-white" // Outgoing messages style
                          : "bg-gray-300 text-black" // Incoming messages style
                      }`}
                    >
                      {message.content}
                    </p>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">No chat selected</p>
            )}
          </div>
        )}
      </div>

      {/* Message input */}
      <form
        onSubmit={handleSendMessage}
        className="px-2 grid grid-cols-12 py-4"
      >
        <Input
          placeholder="Type a message"
          className="col-span-10 h-12 rounded border border-slate-700"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Button
          className="col-span-2 rounded ml-4"
          type="submit"
          disabled={!inputMessage.trim()}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;
