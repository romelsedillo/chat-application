import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StartAVoiceCall } from "./StartAVoiceCall";
import { StartAVideoCall } from "./StartAVideoCall";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { messagesCollection } from "@/utils/MessagesCollection";
import addMessage from "@/utils/AddMessage";
import { useAuthStore } from "@/stores/useAuthStore";
import { client, databaseId, messagesCollectionId } from "@/appwrite/appwrite";
import { Emoji } from "./Emoji";
import { UploadFile } from "./UploadFile";
import { formatTimestamp } from "@/utils/formatTimestamp";
import addChat from "@/utils/AddChat";
import generateRandomString from "@/utils/generateRandomString";
import { chatsCollection } from "@/utils/ChatsCollection";
import { UpdateChat } from "@/utils/UpdateChat";
import { addMessageFirstTime } from "@/utils/AddMessageFirstTime";
import profileIcon from "@/images/profile-icon.jpg";

const ChatBox = ({
  chatMate,
  chatId,
  ChatId,
}: {
  chatMate: any;
  chatId: string;
  ChatId: string;
}) => {
  const [messagesData, setMessagesData] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [chats, setChats] = useState<Chat[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { loggedInUser } = useAuthStore();
  const senderId = loggedInUser?.$id;
  const chatMateId = chatMate?.id;
  const randomId = generateRandomString(20);

  const fetchChats = async () => {
    try {
      const appWriteData = await chatsCollection();
      setChats(appWriteData);
    } catch (error) {
      console.error("Error fetching data from users table:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchMessages = async (isInitialLoad = false) => {
    if (!chatId) return;

    if (isInitialLoad) {
      setLoading(true); // Only set loading for the initial load
    }

    try {
      const appWriteData = await messagesCollection();
      const filteredMessages = appWriteData.filter(
        (message: any) => message.chatsId === chatId
      );
      setMessagesData(filteredMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      if (isInitialLoad) {
        setLoading(false); // Turn off loading after the initial load
      }
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesData]);

  useEffect(() => {
    if (chatId) {
      fetchMessages(true); // Pass `true` to indicate it's the initial load
    } else {
      setMessagesData([]);
    }
  }, [chatId]);

  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${databaseId}.collections.${messagesCollectionId}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          const newMessage = response.payload;
          setMessagesData((prevMessages) => [...prevMessages, newMessage]);
          fetchMessages();
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim()) {
      console.log("Cannot send an empty message.");
      return;
    }

    try {
      const messageContent = inputMessage.trim();
      setInputMessage("");

      // Send the message
      if (ChatId === null || ChatId === undefined) {
        console.log("ChatId is null or undefined:", ChatId);
        await addChat(randomId, chatMateId, messageContent);
        await addMessageFirstTime(randomId, senderId, messageContent);
        fetchChats();
      } else {
        console.log("ChatId is not null or undefined:", ChatId);
        await UpdateChat(ChatId, messageContent);
        await addMessage(ChatId, senderId, messageContent);
        fetchChats();
      }

      // Instead of re-fetching all messages, append the new message directly

      // Ensure the scroll area goes to the bottom
      scrollToBottom();
    } catch (error) {
      console.error("Failed to send the message:", error);
    }
  };
  console.log(chatMate);
  return (
    <div className="col-span-2 h-full flex flex-col">
      <div className="flex items-center justify-between py-3 px-2">
        <div className="flex items-center gap-4 capitalize">
          <Avatar>
            <AvatarImage src={chatMate?.profileUrl || { profileIcon }} />
            <AvatarFallback>
              {chatMate?.otherParticipantName?.[0] || "CN"}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-medium">
            {chatMate?.otherParticipantName ||
              chatMate.name ||
              "Unknown Participant"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <StartAVoiceCall />
          <StartAVideoCall />
        </div>
      </div>

      <Separator />

      <div className="flex-grow h-[200px] overflow-y-auto" ref={scrollAreaRef}>
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : chatId && messagesData.length > 0 ? (
          <div className="flex flex-col gap-2 p-2">
            {messagesData.map((message, index) => (
              <React.Fragment key={index}>
                <div
                  className={`flex gap-4 w-full ${
                    message?.senderId === chatMate?.otherParticipantId
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div>
                    <p
                      className={`inline-block max-w-full px-5 py-3 text-xs rounded-full ${
                        message?.senderId === chatMate?.otherParticipantId
                          ? "bg-slate-400 text-white"
                          : "bg-blue-400 text-white"
                      }`}
                    >
                      {message?.content || "No content available"}
                    </p>
                  </div>
                </div>
                <p className="text-[8px] text-center text-gray-600">
                  {message?.createdAt
                    ? formatTimestamp(message.createdAt)
                    : "Loading..."}
                </p>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            {chatId ? "No messages yet." : "No chat selected"}
          </p>
        )}
      </div>
      <div className="flex w-full items-center justify-evenly">
        <div className="col-span-2 flex items-start justify-evenly">
          <Emoji />
          <UploadFile />
        </div>
        <form
          onSubmit={handleSendMessage}
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
    </div>
  );
};

export default ChatBox;
