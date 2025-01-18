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

const ChatBox = ({ chatMate, chatId }: { chatMate: any; chatId: string }) => {
  const [messagesData, setMessagesData] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { loggedInUser } = useAuthStore();
  const senderId = loggedInUser?.$id;

  const fetchMessages = async () => {
    if (!chatId) return;

    try {
      const appWriteData = await messagesCollection();
      const filteredMessages = appWriteData.filter(
        (message: any) => message.chatsId === chatId
      );
      setMessagesData(filteredMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
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
      fetchMessages();
    } else {
      setMessagesData([]);
    }
  }, [chatId]);

  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${databaseId}.collections.${messagesCollectionId}.documents`,
      (response) => {
        console.log("Real-time event received:", response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          const newMessage = response.payload;
          setMessagesData((prevMessages) => [...prevMessages, newMessage]);
          fetchMessages();
          console.log("New message received:", newMessage);
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
      // Temporarily clear the input and disable user actions
      const messageContent = inputMessage.trim();
      setInputMessage("");

      // Send the message
      await addMessage(chatId, senderId, messageContent);

      // Re-fetch the messages after sending
      await fetchMessages();

      // Ensure the scroll area goes to the bottom after reloading
      scrollToBottom();
    } catch (error) {
      console.error("Failed to send the message:", error);
    }
  };
  console.log(messagesData);
  return (
    <div className="col-span-2 h-full flex flex-col">
      <div className="flex items-center justify-between py-3 px-2">
        <div className="flex items-center gap-4 capitalize">
          <Avatar>
            <AvatarImage
              src={
                chatMate?.profile ||
                "https://i.pravatar.cc/150?u=a042581f4e21026704a"
              }
            />

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
        {chatId && messagesData.length > 0 ? (
          <div className="flex flex-col gap-2 p-2">
            {messagesData.map((message, index) => (
              <>
                <div
                  key={index}
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
                          ? "bg-gray-400 text-white"
                          : "bg-blue-400 text-white"
                      }`}
                    >
                      {message?.content || "No content available"}
                    </p>
                  </div>
                </div>
                <p className="text-[8px] text-center text-gray-600">
                  {formatTimestamp(message?.createdAt)}
                </p>
              </>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            {chatId ? "No messages yet." : "No chat selected"}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSendMessage}
        className="px-2 grid grid-cols-12 py-4"
      >
        <div className="col-span-2 flex items-start justify-evenly">
          <Emoji />
          <UploadFile />
        </div>
        <Input
          placeholder="Type a message"
          className="col-span-8 h-12 rounded border border-slate-700"
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
