import React from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MessageOption } from "./MessageOption";
import { AttachAFile } from "./AttachAFile";
import { ChooseAnEmoji } from "./ChooseAnEmoji";
import { SendAVoiceClip } from "./SendAVoiceClip";
import { ScrollArea } from "../ui/scroll-area";
import { StartAVoiceCall } from "./StartAVoiceCall";
import { StartAVideoCall } from "./StartAVideoCall";

const ChatBox = () => {
  return (
    <div className="col-span-2 h-full border-x flex flex-col">
      <div className="">
        <div className="flex items-center justify-between py-4 px-2">
          <div className="flex items-center gap-4 capitalize">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-medium">Melisa Smith</h3>
          </div>
          {/* icons */}
          <div className="flex items-center justify-between gap-2">
            <StartAVoiceCall />
            <StartAVideoCall />
          </div>
        </div>
        <Separator />
      </div>
      {/* Chat field */}
      <ScrollArea>
        <div className="flex flex-col gap-2 items-start h-[360px] py-2 px-2">
          <div className="flex items-start gap-4 w-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <AvatarFallback>JB</AvatarFallback>
            </Avatar>
            <p className="bg-gray-300 p-4 rounded">Hello, How are you?</p>
          </div>
          <div className="flex items-start gap-4 w-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <AvatarFallback>JB</AvatarFallback>
            </Avatar>
            <p className="bg-gray-300 p-4 rounded">Are you there?</p>
          </div>
          <div className="flex items-start justify-end gap-4 w-full">
            <MessageOption />
            <p className="bg-blue-300 p-4 rounded">Yeah! I&apos;m here.</p>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-start justify-end gap-4 w-full">
            <p className="bg-blue-300 p-4 rounded">
              I&apos;m good, how about you?
            </p>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-start gap-4 w-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <AvatarFallback>JB</AvatarFallback>
            </Avatar>
            <p className="bg-gray-300 p-4 rounded">
              I&apos;m doing well too. What are you up to?
            </p>
          </div>
          <div className="flex items-start justify-end gap-4 w-full">
            <p className="bg-blue-300 p-4 rounded">
              Just working on some projects.
            </p>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-start justify-end gap-4 w-full">
            <p className="bg-blue-300 p-4 rounded">How about you?</p>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-start gap-4 w-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <AvatarFallback>JB</AvatarFallback>
            </Avatar>
            <p className="bg-gray-300 p-4 rounded">
              Just finished a meeting. It was exhausting!
            </p>
          </div>
        </div>
      </ScrollArea>

      <div className="px-2 grid grid-cols-12 py-4">
        <div className="col-span-2 flex items-center justify-evenly">
          <AttachAFile />
          <SendAVoiceClip />
          <ChooseAnEmoji />
        </div>
        <div className="col-span-10 flex items-center justify-between px-2">
          <Input placeholder="Type a message" className=" h-12 rounded" />
          <Button className="rounded ml-4">Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
