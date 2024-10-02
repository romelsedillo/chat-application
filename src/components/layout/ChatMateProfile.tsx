"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

// Define the type for chatMate props
interface ChatMateProfileProps {
  chatMate: {
    name: string;
    profile: string; // URL for the avatar
    role?: string; // Optional property
    address: string;
    gender: string;
    social: {
      facebook: string;
      twitter: string;
    };
    photos: string[]; // Array of photo URLs
  } | null; // Allow chatMate to be null
}

const ChatMateProfile: React.FC<ChatMateProfileProps> = ({ chatMate }) => {
  if (!chatMate) return <div>Select a chat mate to view profile.</div>;

  return (
    <div className="col-span-1 text-2xl text-center pt-6">
      <div className="w-full flex flex-col items-center justify-center mb-2">
        <Avatar className="h-20 w-20">
          <AvatarImage src={chatMate.profile} />
          <AvatarFallback>{chatMate.name?.[0] ?? "N/A"}</AvatarFallback>
        </Avatar>
        <h1 className="font-semibold">{chatMate.name}</h1>
        <p className="text-xs">{chatMate.role ?? "Unknown Role"}</p>
      </div>
      <Separator />
      <ScrollArea className="w-full p-2 h-[350px]">
        <div className="mb-2">
          <h6 className="text-left text-sm font-semibold">Basic info</h6>
          <p className="text-left text-xs font-medium ml-2">
            Address: {chatMate.address}
          </p>
          <p className="text-left text-xs font-medium ml-2">
            Gender: {chatMate.gender}
          </p>
        </div>
        <div>
          <h6 className="text-left font-semibold text-sm">Photos</h6>
          <div className="grid grid-cols-3 gap-2 mb-2 p-2">
            {chatMate.photos.map((src, index) => (
              <Image
                key={index}
                width={80}
                height={80}
                src={src}
                alt={`Photo ${index + 1}`}
                className="rounded"
              />
            ))}
          </div>
        </div>
        <div className="mb-2">
          <h6 className="text-left text-sm font-semibold">Social</h6>
          <div className="flex items-center gap-2 ml-2">
            <FaFacebook className="w-4 h-4 text-gray-600" />
            <Link
              href={chatMate.social.facebook}
              className="hover:underline text-xs text-blue-900"
            >
              Facebook
            </Link>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <FaXTwitter className="w-4 h-4 text-gray-600" />
            <Link
              href={chatMate.social.twitter}
              className="hover:underline text-xs text-blue-900"
            >
              Twitter
            </Link>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="rounded w-full">Block</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to block this person?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Blocking this user will prevent them from messaging or
                interacting with you. You can unblock them at any time in your
                account settings.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="rounded"
                onClick={() =>
                  toast("User blocked", {
                    description:
                      "This person has been successfully blocked and will no longer be able to interact with you.",
                    action: {
                      label: "Undo",
                      onClick: () => console.log("Undo"),
                    },
                  })
                }
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ScrollArea>
    </div>
  );
};

export default ChatMateProfile;
