// MessageInput.tsx

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AttachAFile } from "./AttachAFile";
import { ChooseAnEmoji } from "./ChooseAnEmoji";
import { SendAVoiceClip } from "./SendAVoiceClip";

interface MessageInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  input,
  setInput,
  handleSend,
}) => {
  return (
    <div className="px-2 grid grid-cols-12 py-4">
      <div className="col-span-2 flex items-center justify-evenly">
        <AttachAFile />
        <SendAVoiceClip />
        <ChooseAnEmoji />
      </div>
      <div className="col-span-10 flex items-center justify-between px-2">
        <Input
          placeholder="Type a message"
          className="h-12 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button className="rounded ml-4" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
