"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CiFaceSmile } from "react-icons/ci";

export function ChooseAnEmoji() {
  const [showEmojis, setShowEmojis] = useState(false);
  const selectEmoji = (emoji: string) => {
    console.log("Selected emoji:", emoji);
    setShowEmojis(false); // Close picker after selecting
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center hover:bg-gray-200 h-8 w-8 rounded-full">
          <CiFaceSmile />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="grid grid-cols-4 gap-2">
          {["😀", "😄", "😂", "😍", "😎", "😊", "😉", "😭", "😡", "👍"].map(
            (emoji) => (
              <button
                key={emoji}
                className="text-2xl hover:bg-gray-100 p-1 rounded-lg"
                onClick={() => selectEmoji(emoji)}
              >
                {emoji}
              </button>
            )
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
