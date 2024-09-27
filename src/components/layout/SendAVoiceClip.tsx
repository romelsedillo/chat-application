import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HiOutlineMicrophone } from "react-icons/hi2";

export function SendAVoiceClip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex items-center justify-center hover:bg-gray-200 h-8 w-8 rounded-full">
            <HiOutlineMicrophone />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Send a voice clip</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
