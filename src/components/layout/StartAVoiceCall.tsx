import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HiOutlinePhone } from "react-icons/hi";

export function StartAVoiceCall() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex items-center justify-center hover:bg-gray-200 h-8 w-8 rounded-full">
            <HiOutlinePhone className="w-5 h-5 text-gray-600" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Start a voice call</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
