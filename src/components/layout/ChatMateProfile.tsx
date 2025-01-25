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
import profileIcon from "@/images/profile-icon.jpg";

// Define the type for chatMate props
interface ChatMateProfileProps {
  chatMate: {
    name: string;
    profileUrl: string; // URL for the avatar
    role?: string; // Optional property
    address: string;
    gender: string;
    otherParticipantName: string;
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
    <div className="col-span-1 text-2xl text-center pt-6 border-x">
      <div className="w-full flex flex-col items-center justify-center mb-3">
        <Avatar>
          <AvatarImage src={chatMate?.profileUrl} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <h1 className="font-semibold capitalize">
          {chatMate?.name || chatMate?.otherParticipantName}
        </h1>
        <p className="text-xs">{chatMate.role ?? "Software Engineer"}</p>
      </div>
      <Separator />
      <ScrollArea className="w-full p-2 h-[350px]">
        <div className="mb-2">
          <h6 className="text-left text-sm font-semibold">Basic info</h6>
          <p className="text-left text-xs font-medium ml-2">
            Gender: {chatMate.gender || "female"}
          </p>
          <p className="text-left text-xs font-medium ml-2">
            Address: {chatMate.address || "123 Elm Street, Springfield"}
          </p>
        </div>
        <div className="mb-2">
          <h6 className="text-left font-semibold text-sm">Photos</h6>
          <div className="flex justify-evenly px-4">
            <Image
              src="https://i.pravatar.cc/150?u=a042521f4e29026704a"
              width={50}
              height={50}
              alt="Picture of the author"
              className="rounded"
            />
            <Image
              src="https://i.pravatar.cc/150?u=a042581f4e39026704a"
              width={50}
              height={50}
              alt="Picture of the author"
              className="rounded"
            />
            <Image
              src="https://i.pravatar.cc/150?u=a04258144e29026704a"
              width={50}
              height={50}
              alt="Picture of the author"
              className="rounded"
            />
            <Image
              src="https://i.pravatar.cc/150?u=a042581f4e59026704a"
              width={50}
              height={50}
              alt="Picture of the author"
              className="rounded"
            />
          </div>
        </div>
        <div className="mb-2">
          <h6 className="text-left text-sm font-semibold">Social</h6>
          <div className="flex items-center gap-2 ml-2">
            <FaFacebook className="w-4 h-4 text-gray-600" />
            <FaXTwitter className="w-4 h-4 text-gray-600" />
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
                  toast.error("User blocked", {
                    description: (
                      <span className="text-red-500">
                        Sorry :(. This feature is under development.
                      </span>
                    ),
                    action: {
                      label: "Cancel",
                      onClick: () => console.log("Cancelled"),
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
