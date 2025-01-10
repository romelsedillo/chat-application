import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StartAVoiceCall } from "./StartAVoiceCall";
import { StartAVideoCall } from "./StartAVideoCall";
import { messagesCollection } from "@/utils/MessagesCollection";
import addMessage from "@/utils/AddMessage";
import { useAuthStore } from "@/stores/useAuthStore";
import { Separator } from "@/components/ui/separator";
import { client, databaseId, messagesCollectionId } from "@/appwrite/appwrite";

const ChatBox2 = (chatMate) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messagesData, setMessagesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { loggedInUser } = useAuthStore();
  const senderId = loggedInUser?.$id;
  const chatId = "677dfa9d0025198d40b8";

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const appWriteData = await messagesCollection();
      setMessagesData(appWriteData);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

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
          console.log("New message received:", newMessage);
          setMessagesData((prevMessages) => [...prevMessages, newMessage]);
        }
      }
    );
    if (chatId) {
      fetchMessages();
    } else {
      setMessagesData([]);
    }
    return () => {
      console.log("Unsubscribed from real-time updates");
      unsubscribe();
    };
  }, [chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log(chatId, senderId, inputMessage.trim());
    if (!inputMessage.trim()) {
      console.log("Cannot send an empty message.");
      return;
    }

    try {
      const newMessage = await addMessage(
        chatId,
        senderId,
        inputMessage.trim()
      );
      setInputMessage("");
    } catch (error) {
      console.error("Failed to send the message:", error);
    }
  };
  return (
    <div className="col-span-2 h-full border-x flex flex-col">
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
              {chatMate?.otherParticipantName?.[0] || "CN"}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-medium">
            {chatMate?.otherParticipantName || "Unknown Participant"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <StartAVoiceCall />
          <StartAVideoCall />
        </div>
      </div>
      <Separator />
      <div>
        {messagesData.map((message, index) => (
          <div key={index} className={`flex items-start gap-4 w-full`}>
            <p className={`p-4 text-xs mb-2 rounded bg-blue-400 `}>
              {message?.content}
            </p>
          </div>
        ))}
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
  );
};

export default ChatBox2;
